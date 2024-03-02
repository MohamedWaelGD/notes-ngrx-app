import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Note } from '../../models/note.model';
import { notesActions } from '../../store';
import { selectLoadingAction, selectError, selectSelectedNoteId, selectCurrentNote } from '../../store/notes.reducer';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-modify-note-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './modify-note-page.component.html',
  styleUrl: './modify-note-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('formAnim', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0
        }),
        animate(200, style({
          height: '*',
          opacity: 1
        })),
        animate(200)
      ])
    ])
  ]
})
export class ModifyNotePageComponent implements OnInit, OnDestroy {
  modifyNoteForm!: FormGroup;
  loadingAction$!: Observable<boolean>;
  error$!: Observable<string>;
  currentNote$!: Subscription;
  selectedNoteId$!: Subscription;

  isAdd = signal(false);

  private fb = inject(FormBuilder);
  private store = inject(Store);

  ngOnInit(): void {
    this.modifyNoteForm = this.fb.group({
      id: [],
      title: ['', [Validators.required, Validators.maxLength(15)]],
      description: ['', [Validators.maxLength(1000)]],
    });
    this.loadingAction$ = this.store.select(selectLoadingAction);
    this.error$ = this.store.select(selectError);
    this.selectedNoteId$ = this.store
      .select(selectSelectedNoteId)
      .pipe(
        tap((selectedNoteId) => {
          if (selectedNoteId === '0' || selectedNoteId === null) {
            this.modifyNoteForm.reset();
            this.isAdd.set(true);
          } else this.isAdd.set(false);
        })
      )
      .subscribe();
    this.currentNote$ = this.store
      .select(selectCurrentNote)
      .pipe(
        tap((currentNote) => {
          if (currentNote) this.modifyNoteForm.patchValue(currentNote);
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.selectedNoteId$?.unsubscribe();
    this.currentNote$?.unsubscribe();
  }

  getTitleError() {
    const controller = this.modifyNoteForm.get('name');
    if (!controller?.touched || !controller.errors) return '';

    if (controller.errors['required']) return 'Field is required';
    if (controller.errors['maxlength'])
      return 'Field should be at least 15 Characters';

    return '';
  }

  getDescriptionError() {
    const controller = this.modifyNoteForm.get('description');
    if (!controller?.touched || !controller.errors) return '';

    if (controller.errors['maxlength'])
      return 'Field should be at least 1000 Characters';


    return '';
  }

  onSubmit() {
    if (this.modifyNoteForm.invalid || !this.modifyNoteForm.dirty) {
      this.modifyNoteForm.markAllAsTouched();
      return;
    }

    const note = this.modifyNoteForm.getRawValue() as Note;
    if (note.id === '0' || note.id === null) {
      this.store.dispatch(
        notesActions.add({
          note: {
            id: '0',
            title: note.title,
            description: note.description,
          },
        })
      );
    } else {
      this.store.dispatch(notesActions.edit({ note }));
    }
  }
}

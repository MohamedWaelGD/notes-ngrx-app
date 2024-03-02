import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { NotesCardsComponent } from './components/notes-cards/notes-cards.component';
import { notesActions } from '../../store';
import { selectLoadingAction, selectLoadingData, selectNotes } from '../../store/notes.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes-page',
  standalone: true,
  imports: [
    CommonModule,
    NotesCardsComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule
  ],
  templateUrl: './notes-page.component.html',
  styleUrl: './notes-page.component.scss',
})
export class NotesPageComponent implements OnInit {

  private store = inject(Store);
  private router = inject(Router);
  notes = this.store.select(selectNotes);
  loadingAction = this.store.select(selectLoadingAction);
  loadingData = this.store.select(selectLoadingData);

  ngOnInit(): void {
    this.store.dispatch(notesActions.load());
  }

  onEditNote(id: string) {
    this.store.dispatch(notesActions.select({ id }));
    this.router.navigate(['/modify']);
  }

  onDeleteNote(id: string) {
    this.store.dispatch(notesActions.delete({ id }));
  }
}

import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  computed,
  input,
  model,
  signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Note } from '../../../../models/note.model';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-notes-cards',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './notes-cards.component.html',
  styleUrl: './notes-cards.component.scss',
  animations: [
    trigger('filterAnim', [
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate(
          200,
          style({
            opacity: 1,
          })
        ),
        animate(200),
      ]),
    ]),
    trigger('skeletonAnim', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.5)',
          'margin-bottom': 0,
        }),
        animate(
          50,
          style({
            height: '*',
            'margin-bottom': '*',
          })
        ),
        animate(70),
      ]),
    ]),
    trigger('itemAnim', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.5)',
          'margin-bottom': 0,
        }),
        animate(
          50,
          style({
            height: '*',
            'margin-bottom': '*',
          })
        ),
        animate(70),
      ]),
      transition('* => void', [
        animate(
          50,
          style({
            transform: 'scale(1.05)',
          })
        ),
        animate(
          50,
          style({
            transform: 'scale(1)',
            opacity: 0.75,
          })
        ),
        animate(
          '120ms ease-out',
          style({
            transform: 'scale(0.5)',
            opacity: 0,
          })
        ),
        animate(
          '150ms ease-out',
          style({
            height: 0,
            'margin-bottom': '0',
          })
        ),
      ]),
    ]),
    trigger('listAnim', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({
              opacity: 0,
              height: 0,
            }),
            stagger(100, [animate('200ms ease')]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class NotesCardsComponent {
  notes = input.required<Note[] | null>();
  isLoadingData = input<boolean | null>();
  isLoadingAction = input<boolean | null>();
  search = model('');
  notesFiltered = computed<Note[] | undefined>(() => {
    return this.notes()?.filter(
      (e) =>
        this.compareFilter(e.title, this.search()) ||
        this.compareFilter(e.description!, this.search())
    );
  });

  @Output() editNote = new EventEmitter<string>();
  @Output() deleteNote = new EventEmitter<string>();

  private compareFilter(str1: string, str2: string) {
    return str1.toLowerCase().includes(str2.toLowerCase());
  }
}

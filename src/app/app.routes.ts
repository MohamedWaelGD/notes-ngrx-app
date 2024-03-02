import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { noteState, notesReducer } from './features/store';
import { EffectsModule } from '@ngrx/effects';
import { NotesEffects } from './features/store/notes.effects';

export const routes: Routes = [
  {
    path: '',
    providers: [
      importProvidersFrom([
        StoreModule.forFeature(noteState, notesReducer),
        EffectsModule.forFeature(NotesEffects),
      ]),
    ],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/pages/notes-page/notes-page.component').then(
            (c) => c.NotesPageComponent
          ),
      },
      {
        path: 'modify',
        loadComponent: () =>
          import('./features/pages/modify-note-page/modify-note-page.component').then(
            (c) => c.ModifyNotePageComponent
          ),
      },
    ],
  },
];

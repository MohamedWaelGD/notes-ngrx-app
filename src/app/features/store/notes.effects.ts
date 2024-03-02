import { Injectable, inject } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { notesActions } from './notes.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, concatMap, exhaustMap, map, mergeMap, of, tap } from 'rxjs';

@Injectable()
export class NotesEffects {
  private actions$ = inject(Actions);
  private notesService = inject(NotesService);
  private snackBar = inject(MatSnackBar);

  loadNotes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(notesActions.load),
      mergeMap(() =>
        this.notesService.getNotes().pipe(
          map((notes) => notesActions.loadSuccess({ notes })),
          catchError((error) => of(notesActions.loadFailure({ error })))
        )
      )
    );
  });

  addNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(notesActions.add),
      concatMap((action) =>
        this.notesService.addNote(action.note).pipe(
          map((note) => notesActions.addSuccess({ note })),
          tap(() => this.snackBar.open('Note Added', 'Close')),
          catchError((error) => of(notesActions.addFailure({ error })))
        )
      )
    );
  });

  editNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(notesActions.edit),
      concatMap((action) =>
        this.notesService.editNote(action.note).pipe(
          map((note) => notesActions.editSuccess({ note })),
          tap(() => this.snackBar.open('Note Edited', 'Close')),
          catchError((error) => of(notesActions.editFailure({ error })))
        )
      )
    );
  });

  deleteNote$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(notesActions.delete),
      exhaustMap((action) =>
        this.notesService.deleteNote(action.id).pipe(
          map((notes) => notesActions.deleteSuccess({ notes })),
          tap(() => this.snackBar.open('Note Deleted', 'Close')),
          catchError((error) => of(notesActions.deleteFailure({ error })))
        )
      )
    );
  });
}

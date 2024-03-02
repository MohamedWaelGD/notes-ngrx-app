import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';
import { v4 } from 'uuid';
import { Observable, delay, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  private localName = 'NOTES-APP-LOCAL';
  private delayTimeMS = 1000;

  getNotes(): Observable<Note[]> {
    let data = localStorage.getItem(this.localName);
    if (!data) return of([]);

    let json = JSON.parse(data);
    if (!json) return of([]);

    if (Array.isArray(json)) {
      return of(json).pipe(delay(this.delayTimeMS));
    }

    return of([json]).pipe(delay(this.delayTimeMS));
  }

  addNote(note: Note): Observable<Note> {
    return this.getNotes().pipe(
      delay(this.delayTimeMS),
      switchMap((notes) => {
        let newNote: Note = {
          ...note,
          id: v4(),
        };

        notes.push(newNote);

        localStorage.setItem(this.localName, JSON.stringify(notes));

        return of(newNote);
      })
    );
  }

  editNote(note: Note): Observable<Note> {
    return this.getNotes().pipe(
      delay(this.delayTimeMS),
      switchMap((notes) => {
        let noteInLocalIndex = notes.findIndex((e) => e.id === note.id);

        if (noteInLocalIndex === -1) {
          throw 'Note not found to update';
        }

        notes[noteInLocalIndex] = note;

        localStorage.setItem(this.localName, JSON.stringify(notes));

        return of(note);
      })
    );
  }

  deleteNote(id: string): Observable<Note[]> {
    return this.getNotes().pipe(
      delay(this.delayTimeMS),
      switchMap((notes) => {
        let noteInLocalIndex = notes.findIndex((e) => e.id === id);

        if (noteInLocalIndex === -1) {
          throw 'Note not found to update';
        }

        notes = notes.filter((e) => e.id !== id);
        
        localStorage.setItem(this.localName, JSON.stringify(notes));

        return of(notes);
      })
    );
  }
}

import { notesActions } from './notes.actions';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { Note } from '../models/note.model';

export interface NoteState {
  notes: Note[];
  selectedNoteId: string | null;
  loadingData: boolean;
  loadingAction: boolean;
  error: string;
}

const initialState: NoteState = {
  notes: [],
  selectedNoteId: '0',
  loadingData: false,
  loadingAction: false,
  error: '',
};

const feature = createFeature({
  name: 'notes',
  reducer: createReducer(
    initialState,
    on(notesActions.load, (state) => ({
      ...state,
      error: '',
      loadingData: true,
    })),
    on(notesActions.loadSuccess, (state, action) => ({
      ...state,
      notes: action.notes,
      loadingData: false,
    })),
    on(notesActions.loadFailure, (state, action) => ({
      ...state,
      notes: [],
      error: action.error,
      loadingData: false,
    })),
    on(notesActions.initNote, (state, action) => ({
      ...state,
      error: '',
      loadingAction: false,
      selectedNoteId: '0',
    })),
    on(notesActions.add, (state, action) => ({
      ...state,
      error: '',
      loadingAction: true,
      selectedNoteId: '0',
    })),
    on(notesActions.addSuccess, (state, action) => ({
      ...state,
      loadingAction: false,
      selectedNoteId: action.note.id,
      notes: [...state.notes, action.note],
    })),
    on(notesActions.addFailure, (state, action) => ({
      ...state,
      error: action.error,
      loadingAction: false,
    })),
    on(notesActions.select, (state, action) => ({
      ...state,
      selectedNoteId: action.id,
    })),
    on(notesActions.edit, (state, action) => ({
      ...state,
      error: '',
      loadingAction: true,
    })),
    on(notesActions.editSuccess, (state, action) => {
      const updatedNotes = state.notes.map((note) =>
        action.note.id === note.id ? action.note : note
      );
      return {
        ...state,
        loadingAction: false,
        selectedNoteId: action.note.id,
        notes: updatedNotes,
      };
    }),
    on(notesActions.editFailure, (state, action) => ({
      ...state,
      error: action.error,
      loadingAction: false,
    })),
    on(notesActions.delete, (state) => ({
      ...state,
      error: '',
      loadingAction: true,
    })),
    on(notesActions.deleteSuccess, (state, action) => ({
      ...state,
      loadingAction: false,
      notes: [...action.notes],
    })),
    on(notesActions.deleteFailure, (state, action) => ({
      ...state,
      error: action.error,
      loadingAction: false,
    }))
  ),
});

export const notesFeature = {
  ...feature,
  selectCurrentNote: createSelector(
    feature.selectSelectedNoteId,
    feature.selectNotes,
    (selectedNoteId, notes) => notes.find((e) => e.id === selectedNoteId)
  ),
};

export const {
  name,
  reducer,
  selectLoadingData,
  selectLoadingAction,
  selectError,
  selectSelectedNoteId,
  selectNotes,
  selectNotesState,
  selectCurrentNote,
} = notesFeature;

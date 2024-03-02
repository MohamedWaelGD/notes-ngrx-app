import * as AppState from '../../store/app.state';
import { NoteState as NotesState } from './notes.reducer';
export { notesActions } from './notes.actions';
export { name as noteState, reducer as notesReducer } from './notes.reducer';

export interface State extends AppState.State {
  notes: NotesState;
}

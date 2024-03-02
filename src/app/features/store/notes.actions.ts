import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { Note } from "../models/note.model";

export const notesActions = createActionGroup({
    source: 'Notes',
    events: {
        'Load': emptyProps,
        'Load Success': props<{ notes: Note[] }>(),
        'Load Failure': props<{ error: string }>(),
        'Init Note': emptyProps(),
        'Add': props<{ note: Note }>(),
        'Add Success': props<{ note: Note }>(),
        'Add Failure': props<{ error: string }>(),
        'Select': props<{ id: string }>(),
        'Edit': props<{ note: Note }>(),
        'Edit Success': props<{ note: Note }>(),
        'Edit Failure': props<{ error: string }>(),
        'Delete': props<{ id: string }>(),
        'Delete Success': props<{ notes: Note[] }>(),
        'Delete Failure': props<{ error: string }>(),
    }
})
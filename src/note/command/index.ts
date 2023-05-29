import { CreateNoteHandler } from './create-note/create-note.handler';
import { EditNoteHandler } from './edit-note/edit-note.handler';

export const NoteCommandHandlers = [CreateNoteHandler, EditNoteHandler];

export * from './create-note/create-note.command';
export * from './edit-note/edit-note.command';

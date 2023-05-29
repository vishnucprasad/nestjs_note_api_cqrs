import { DeleteNoteHandler } from './delete-note/delete-note.handler';
import { GetNoteHandler } from './get-note/get-note.handler';
import { GetNotesHandler } from './get-notes/get-notes.handler';

export const NoteQueryHandlers = [
  GetNotesHandler,
  GetNoteHandler,
  DeleteNoteHandler,
];

export * from './get-notes/get-notes.query';
export * from './get-note/get-note.query';
export * from './delete-note/delete-note.query';

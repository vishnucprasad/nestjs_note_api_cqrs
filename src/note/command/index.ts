import { CreateNoteHandler } from './create-note/create-note.handler';

export const NoteCommandHandlers = [CreateNoteHandler];

export * from './create-note/create-note.command';

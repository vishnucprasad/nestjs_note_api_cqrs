export class DeleteNoteQuery {
  constructor(public readonly userId: string, public readonly noteId: string) {}
}

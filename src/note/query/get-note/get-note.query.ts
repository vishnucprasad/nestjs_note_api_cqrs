export class GetNoteQuery {
  constructor(public readonly userId: string, public readonly noteId: string) {}
}

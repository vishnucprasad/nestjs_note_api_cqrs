export class GetNotesQuery {
  constructor(public readonly userId: string, public readonly tag?: string) {}
}

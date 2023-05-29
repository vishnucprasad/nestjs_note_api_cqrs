import { EditNoteDto } from 'src/note/dto';

export class EditNoteCommand {
  constructor(
    public readonly userId: string,
    public readonly noteId: string,
    public readonly dto: EditNoteDto,
  ) {}
}

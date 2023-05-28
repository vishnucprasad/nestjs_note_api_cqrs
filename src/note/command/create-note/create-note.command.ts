import { CreateNoteDto } from '../../../note/dto';

export class CreateNoteCommand {
  constructor(
    public readonly userId: string,
    public readonly dto: CreateNoteDto,
  ) {}
}

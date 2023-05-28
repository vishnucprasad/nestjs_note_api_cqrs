import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetNoteQuery } from './get-note.query';
import { NoteDto } from '../../../note/dto';
import { NoteDtoRepository } from '../../../note/repository/note-dto.repository';

@QueryHandler(GetNoteQuery)
export class GetNoteHandler implements IQueryHandler<GetNoteQuery> {
  constructor(private readonly noteDtoRepository: NoteDtoRepository) {}

  async execute(query: GetNoteQuery): Promise<NoteDto> {
    const { userId, noteId } = query;
    return await this.noteDtoRepository.findNoteById(userId, noteId);
  }
}

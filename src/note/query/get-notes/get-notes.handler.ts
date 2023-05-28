import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetNotesQuery } from './get-notes.query';
import { NoteDto } from '../../../note/dto';
import { NoteDtoRepository } from '../../../note/repository/note-dto.repository';

@QueryHandler(GetNotesQuery)
export class GetNotesHandler implements IQueryHandler<GetNotesQuery> {
  constructor(private readonly noteDtoRepository: NoteDtoRepository) {}

  async execute(query: GetNotesQuery): Promise<NoteDto[]> {
    return await this.noteDtoRepository.findNotesByUserId(query.userId);
  }
}

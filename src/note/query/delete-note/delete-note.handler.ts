import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { DeleteNoteQuery } from './delete-note.query';
import { NoteDtoRepository } from '../../../note/repository/note-dto.repository';

@QueryHandler(DeleteNoteQuery)
export class DeleteNoteHandler implements IQueryHandler<DeleteNoteQuery> {
  constructor(private readonly noteDtoRepository: NoteDtoRepository) {}

  async execute(query: DeleteNoteQuery): Promise<void> {
    const { userId, noteId } = query;
    await this.noteDtoRepository.findNoteByIdAndDelete(userId, noteId);
  }
}

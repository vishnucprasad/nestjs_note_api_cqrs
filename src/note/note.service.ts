import { Injectable } from '@nestjs/common';
import { CreateNoteDto, EditNoteDto, NoteDto } from './dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateNoteCommand } from './command';
import { Note } from './domain';
import { DeleteNoteQuery, GetNoteQuery, GetNotesQuery } from './query';
import { EditNoteCommand } from './command/edit-note/edit-note.command';

@Injectable()
export class NoteService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async getNotes(userId: string) {
    return await this.queryBus.execute<GetNotesQuery, NoteDto[]>(
      new GetNotesQuery(userId),
    );
  }

  async getNote(userId: string, noteId: string) {
    return await this.queryBus.execute<GetNoteQuery, NoteDto[]>(
      new GetNoteQuery(userId, noteId),
    );
  }

  async createNote(userId: string, dto: CreateNoteDto) {
    return await this.commandBus.execute<CreateNoteCommand, Note>(
      new CreateNoteCommand(userId, dto),
    );
  }

  async editNote(uerId: string, noteId: string, dto: EditNoteDto) {
    return await this.commandBus.execute<EditNoteCommand, NoteDto>(
      new EditNoteCommand(uerId, noteId, dto),
    );
  }

  async deleteNote(userId: string, noteId: string) {
    return await this.queryBus.execute<DeleteNoteQuery, void>(
      new DeleteNoteQuery(userId, noteId),
    );
  }
}

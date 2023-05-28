import { Injectable } from '@nestjs/common';
import { CreateNoteDto, NoteDto } from './dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateNoteCommand } from './command';
import { Note } from './domain';
import { GetNoteQuery, GetNotesQuery } from './query';

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
}

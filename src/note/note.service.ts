import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateNoteCommand } from './command';
import { Note } from './domain';

@Injectable()
export class NoteService {
  constructor(private readonly commandBus: CommandBus) {}

  async createNote(userId: string, dto: CreateNoteDto) {
    return await this.commandBus.execute<CreateNoteCommand, Note>(
      new CreateNoteCommand(userId, dto),
    );
  }
}

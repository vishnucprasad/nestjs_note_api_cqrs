import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateNoteCommand } from './create-note.command';
import { NoteFactory } from 'src/note/domain/note.factory';
import { Note } from 'src/note/domain';

@CommandHandler(CreateNoteCommand)
export class CreateNoteHandler implements ICommandHandler<CreateNoteCommand> {
  constructor(
    private readonly noteFactory: NoteFactory,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: CreateNoteCommand): Promise<Note> {
    const { userId, dto } = command;

    const note = this.eventPublisher.mergeObjectContext(
      await this.noteFactory.create(userId, dto.title, dto.content),
    );

    note.commit();
    return note;
  }
}

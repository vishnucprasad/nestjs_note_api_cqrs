import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { EditNoteCommand } from './edit-note.command';
import { NoteEntityRepository } from 'src/note/repository';
import { ObjectId } from 'mongodb';
import { FilterQuery } from 'mongoose';
import { NoteSchema } from 'src/note/schema';
import { NoteDto } from 'src/note/dto';

@CommandHandler(EditNoteCommand)
export class EditNoteHandler implements ICommandHandler<EditNoteCommand> {
  constructor(
    private readonly noteEntityRepository: NoteEntityRepository,
    private readonly eventPublisher: EventPublisher,
  ) {}

  async execute(command: EditNoteCommand): Promise<NoteDto> {
    const { userId, noteId, dto } = command;

    const note = await this.eventPublisher.mergeObjectContext(
      await this.noteEntityRepository.findOne({
        _id: new ObjectId(noteId),
        user: new ObjectId(userId),
      } as FilterQuery<NoteSchema>),
    );

    note.editNote(dto);
    await this.noteEntityRepository.findOneAndUpdateById(noteId, note);
    note.commit;

    return {
      _id: new ObjectId(note.getId()),
      user: new ObjectId(note.getUser()),
      title: note.getTitle(),
      content: note.getContent(),
      tags: note.getTags(),
    };
  }
}

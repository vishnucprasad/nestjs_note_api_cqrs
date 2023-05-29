import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EditNoteCommand } from './edit-note.command';
import { NoteEntityRepository } from '../../../note/repository';
import { ObjectId } from 'mongodb';
import { FilterQuery } from 'mongoose';
import { NoteSchema } from '../../../note/schema';
import { NoteDto } from '../../../note/dto';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(EditNoteCommand)
export class EditNoteHandler implements ICommandHandler<EditNoteCommand> {
  constructor(private readonly noteEntityRepository: NoteEntityRepository) {}

  async execute(command: EditNoteCommand): Promise<NoteDto> {
    const { userId, noteId, dto } = command;

    const note = await this.noteEntityRepository.findOne({
      _id: new ObjectId(noteId),
      user: new ObjectId(userId),
    } as FilterQuery<NoteSchema>);

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    note.editNote(dto);
    await this.noteEntityRepository.findOneAndUpdateById(noteId, note);

    return {
      _id: new ObjectId(note.getId()),
      user: new ObjectId(note.getUser()),
      title: note.getTitle(),
      content: note.getContent(),
      tags: note.getTags(),
    };
  }
}

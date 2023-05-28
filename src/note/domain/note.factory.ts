import { Injectable } from '@nestjs/common';
import { EntityFactory } from 'src/database';
import { Note } from './note';
import { ObjectId } from 'mongodb';
import { NoteEntityRepository } from '../repository';

@Injectable()
export class NoteFactory implements EntityFactory<Note> {
  constructor(private readonly noteEntityRepository: NoteEntityRepository) {}

  async create(user: string, title: string, content: string): Promise<Note> {
    const note = new Note(
      new ObjectId().toHexString(),
      new ObjectId(user).toHexString(),
      title,
      content,
    );

    await this.noteEntityRepository.create(note);
    return note;
  }
}

import { Injectable } from '@nestjs/common';
import { EntitySchemaFactory } from 'src/database';
import { NoteSchema } from './note.schema';
import { Note } from '../domain';
import { ObjectId } from 'mongodb';

@Injectable()
export class NotSchemaFactory implements EntitySchemaFactory<NoteSchema, Note> {
  create(note: Note): NoteSchema {
    return {
      _id: new ObjectId(note.getId()),
      user: new ObjectId(note.getUser()),
      title: note.getTitle(),
      content: note.getContent(),
      tags: note.getTags(),
    };
  }
  createFromSchema(noteSchema: NoteSchema): Note {
    return new Note(
      noteSchema._id.toHexString(),
      noteSchema.user.toHexString(),
      noteSchema.title,
      noteSchema.content,
      noteSchema.tags,
    );
  }
}

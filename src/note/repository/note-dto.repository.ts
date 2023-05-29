import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { NoteSchema } from '../schema';
import { NoteDto } from '../dto';

@Injectable()
export class NoteDtoRepository {
  constructor(
    @InjectModel(NoteSchema.name)
    private readonly noteModel: Model<NoteSchema>,
  ) {}

  async findNotesByUserId(userId: string, tag?: string): Promise<NoteDto[]> {
    const query = tag
      ? ({
          user: new ObjectId(userId),
          $expr: {
            $in: [tag, '$tags'],
          },
        } as FilterQuery<NoteSchema>)
      : ({
          user: new ObjectId(userId),
        } as FilterQuery<NoteSchema>);

    return await this.noteModel.find(query, {}, { lean: true });
  }

  async findNoteById(userId: string, id: string): Promise<NoteDto> {
    const note = await this.noteModel.findOne(
      {
        _id: new ObjectId(id),
        user: new ObjectId(userId),
      } as FilterQuery<NoteSchema>,
      {},
      { lean: true },
    );

    if (!note) {
      throw new NotFoundException('Note not found');
    }

    return note;
  }

  async findNoteByIdAndDelete(userId: string, id: string): Promise<void> {
    const note = await this.noteModel.findOneAndDelete({
      _id: new ObjectId(id),
      user: new ObjectId(userId),
    } as FilterQuery<NoteSchema>);

    if (!note) {
      throw new NotFoundException('Note not found');
    }
  }
}

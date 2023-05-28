import { Injectable } from '@nestjs/common';
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

  async findNotesByUserId(userId: string): Promise<NoteDto[]> {
    return await this.noteModel.find(
      { user: new ObjectId(userId) } as FilterQuery<NoteSchema>,
      {},
      { lean: true },
    );
  }
}

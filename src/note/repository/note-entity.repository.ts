import { Injectable } from '@nestjs/common';
import { BaseEntityRepository } from '../../database';
import { NotSchemaFactory, NoteSchema } from '../schema';
import { Note } from '../domain';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class NoteEntityRepository extends BaseEntityRepository<
  NoteSchema,
  Note
> {
  constructor(
    @InjectModel(NoteSchema.name)
    readonly userModel: Model<NoteSchema>,
    readonly userSchemaFactory: NotSchemaFactory,
  ) {
    super(userModel, userSchemaFactory);
  }
}

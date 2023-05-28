import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from '../../database';
import { ObjectId } from 'mongodb';

@Schema({
  versionKey: false,
  timestamps: true,
  collection: 'notes',
})
export class NoteSchema extends IdentifiableEntitySchema {
  @Prop({ required: true })
  public readonly user: ObjectId;

  @Prop({ required: true })
  public readonly title: string;

  @Prop({ required: true })
  public readonly content: string;
}

import { Prop, Schema } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { IdentifiableEntitySchema } from 'src/database';

@Schema({
  versionKey: false,
  timestamps: true,
  collection: 'refreshtokens',
})
export class RefreshTokenSchema extends IdentifiableEntitySchema {
  @Prop({ unique: true, required: true })
  public readonly user: ObjectId;

  @Prop({ required: true })
  public readonly token: string;
}

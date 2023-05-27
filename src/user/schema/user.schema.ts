import { Prop, Schema } from '@nestjs/mongoose';
import { IdentifiableEntitySchema } from '../../database';

@Schema({
  versionKey: false,
  timestamps: true,
  collection: 'users',
})
export class UserSchema extends IdentifiableEntitySchema {
  @Prop({ unique: true, required: true })
  public readonly email: string;

  @Prop({ required: true })
  public readonly hash: string;

  @Prop()
  public readonly firstName?: string;

  @Prop()
  public readonly lastName?: string;
}

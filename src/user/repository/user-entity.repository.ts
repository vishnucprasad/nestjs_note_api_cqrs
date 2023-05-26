import { Injectable } from '@nestjs/common';
import { BaseEntityRepository } from '../../database';
import { UserSchema } from '../schema/user.schema';
import { User } from '../domain';
import { InjectModel } from '@nestjs/mongoose';
import { UserSchemaFactory } from '../schema/user-schema.factory';
import { Model } from 'mongoose';

@Injectable()
export class UserEntityRepository extends BaseEntityRepository<
  UserSchema,
  User
> {
  constructor(
    @InjectModel(UserSchema.name)
    readonly userModel: Model<UserSchema>,
    readonly userSchemaFactory: UserSchemaFactory,
  ) {
    super(userModel, userSchemaFactory);
  }
}

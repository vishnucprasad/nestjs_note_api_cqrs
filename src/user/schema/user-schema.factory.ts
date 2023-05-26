import { Injectable } from '@nestjs/common';
import { EntitySchemaFactory } from 'src/database';
import { UserSchema } from './user.schema';
import { User } from '../domain';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserSchemaFactory
  implements EntitySchemaFactory<UserSchema, User>
{
  create(user: User): UserSchema {
    return {
      _id: new ObjectId(user.getId()),
      email: user.getEmail(),
      hash: user.getHash(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
    };
  }
  createFromSchema(userSchema: UserSchema): User {
    return new User(
      userSchema._id.toHexString(),
      userSchema.email,
      userSchema.hash,
      userSchema.firstName,
      userSchema.lastName,
    );
  }
}

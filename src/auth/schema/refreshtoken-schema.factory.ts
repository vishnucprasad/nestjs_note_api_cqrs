import { Injectable } from '@nestjs/common';
import { EntitySchemaFactory } from 'src/database';
import { RefreshToken } from '../domain';
import { ObjectId } from 'mongodb';
import { RefreshTokenSchema } from './refreshtoken.schema';

@Injectable()
export class RefreshTokenSchemaFactory
  implements EntitySchemaFactory<RefreshTokenSchema, RefreshToken>
{
  create(refreshtoken: RefreshToken): RefreshTokenSchema {
    return {
      _id: new ObjectId(refreshtoken.getId()),
      user: new ObjectId(refreshtoken.getUser()),
      token: refreshtoken.getToken(),
    };
  }
  createFromSchema(refreshTokenSchema: RefreshTokenSchema): RefreshToken {
    return new RefreshToken(
      refreshTokenSchema._id.toHexString(),
      refreshTokenSchema.user.toHexString(),
      refreshTokenSchema.token,
    );
  }
}

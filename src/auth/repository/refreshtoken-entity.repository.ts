import { Injectable } from '@nestjs/common';
import { BaseEntityRepository } from '../../database';
import { RefreshTokenSchema } from '../schema/refreshtoken.schema';
import { RefreshToken } from '../domain';
import { InjectModel } from '@nestjs/mongoose';
import { RefreshTokenSchemaFactory } from '../schema/refreshtoken-schema.factory';
import { Model } from 'mongoose';

@Injectable()
export class RefreshTokenEntityRepository extends BaseEntityRepository<
  RefreshTokenSchema,
  RefreshToken
> {
  constructor(
    @InjectModel(RefreshTokenSchema.name)
    readonly refreshTokenModel: Model<RefreshTokenSchema>,
    readonly refreshTokenSchemaFactory: RefreshTokenSchemaFactory,
  ) {
    super(refreshTokenModel, refreshTokenSchemaFactory);
  }
}

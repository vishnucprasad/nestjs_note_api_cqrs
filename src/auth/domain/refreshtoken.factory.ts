import { Injectable } from '@nestjs/common';
import { EntityFactory } from '../../database';
import { RefreshToken } from './refreshtoken';
import { RefreshTokenEntityRepository } from '../repository';
import { ObjectId } from 'mongodb';

@Injectable()
export class RefreshTokenFactory implements EntityFactory<RefreshToken> {
  constructor(
    private readonly refreshtokenEntityRepository: RefreshTokenEntityRepository,
  ) {}

  async create(user: string, token: string): Promise<RefreshToken> {
    const refreshToken = new RefreshToken(
      new ObjectId().toHexString(),
      new ObjectId(user).toHexString(),
      token,
    );

    await this.refreshtokenEntityRepository.create(refreshToken);
    return refreshToken;
  }
}

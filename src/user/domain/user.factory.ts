import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { EntityFactory } from '../../database';
import { User } from './user';
import { UserEntityRepository } from '../repository';
import { ObjectId } from 'mongodb';

@Injectable()
export class UserFactory implements EntityFactory<User> {
  constructor(private readonly userEntityRepository: UserEntityRepository) {}

  async create(email: string, password: string): Promise<User> {
    try {
      const hash = await argon.hash(password);
      const user = new User(new ObjectId().toHexString(), email, hash);

      await this.userEntityRepository.create(user);
      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new ForbiddenException(
          'An account with this email address already exists',
        );
      }

      throw error;
    }
  }
}

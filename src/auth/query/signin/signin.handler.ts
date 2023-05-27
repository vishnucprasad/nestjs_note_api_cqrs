import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import * as argon from 'argon2';
import { SigninQuery } from './signin.query';
import { UserDtoRepository } from '../../../user/repository';
import { UnauthorizedException } from '@nestjs/common';
import { UserDto } from '../../../user/dto';

@QueryHandler(SigninQuery)
export class SigninHandler implements IQueryHandler<SigninQuery> {
  constructor(private readonly userDtoRepository: UserDtoRepository) {}

  async execute(query: SigninQuery): Promise<Omit<UserDto, 'hash'>> {
    const user = await this.userDtoRepository.findUserByEmail(query.dto.email);

    const passwordMatch = await argon.verify(user.hash, query.dto.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }
}

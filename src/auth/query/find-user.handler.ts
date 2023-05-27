import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { FindUserQuery } from './find-user.query';
import { UserDtoRepository } from '../../user/repository';
import { UserDto } from 'src/user/dto';

@QueryHandler(FindUserQuery)
export class FindUserHandler implements IQueryHandler<FindUserQuery> {
  constructor(private readonly userDtoRepository: UserDtoRepository) {}

  async execute(query: FindUserQuery): Promise<Omit<UserDto, 'hash'>> {
    const user = await this.userDtoRepository.findUserById(query.userId);
    delete user.hash;
    return user;
  }
}

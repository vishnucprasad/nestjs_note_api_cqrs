import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SignoutQuery } from './signout.query';
import { RefreshTokenDtoRepository } from 'src/auth/repository';

@QueryHandler(SignoutQuery)
export class SignoutHandler implements IQueryHandler<SignoutQuery> {
  constructor(
    private readonly refreshTokenDtoRepository: RefreshTokenDtoRepository,
  ) {}

  async execute(query: SignoutQuery): Promise<any> {
    await this.refreshTokenDtoRepository.deleteRefreshTokenByUserId(
      query.userId,
    );
  }
}

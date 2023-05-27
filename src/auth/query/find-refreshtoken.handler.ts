import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindRefreshTokenQuery } from './find-refreshtoken.query';
import { RefreshTokenDtoRepository } from '../repository';
import { RefreshTokenDto } from '../dto';

@QueryHandler(FindRefreshTokenQuery)
export class FindRefreshTokenHandler
  implements IQueryHandler<FindRefreshTokenQuery>
{
  constructor(
    private readonly refreshTokenDtoRepository: RefreshTokenDtoRepository,
  ) {}

  async execute(query: FindRefreshTokenQuery): Promise<RefreshTokenDto> {
    return await this.refreshTokenDtoRepository.findRefreshToken(
      query.refreshToken,
    );
  }
}

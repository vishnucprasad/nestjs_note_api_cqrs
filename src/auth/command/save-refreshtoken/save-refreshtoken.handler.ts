import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SaveRefreshTokenCommand } from './save-refreshtoken.command';
import { RefreshTokenFactory } from '../../domain';
import { RefreshTokenEntityRepository } from '../../repository';
import { ObjectId } from 'mongodb';
import { FilterQuery } from 'mongoose';
import { RefreshTokenSchema } from 'src/auth/schema';

@CommandHandler(SaveRefreshTokenCommand)
export class SaveRefreshTokenHandler
  implements ICommandHandler<SaveRefreshTokenCommand>
{
  constructor(
    private readonly refreshTokenEntityRepository: RefreshTokenEntityRepository,
    private readonly refreshTokenFactory: RefreshTokenFactory,
  ) {}

  async execute(command: SaveRefreshTokenCommand): Promise<void> {
    const refreshToken = await this.refreshTokenEntityRepository.findOne({
      user: new ObjectId(command.dto.user),
    } as FilterQuery<RefreshTokenSchema>);

    if (refreshToken) {
      refreshToken.updateRefreshToken(command.dto.token);

      await this.refreshTokenEntityRepository.findOneAndUpdateById(
        refreshToken.getId(),
        refreshToken,
      );

      return refreshToken.commit();
    }

    await this.refreshTokenFactory.create(command.dto.user, command.dto.token);
  }
}

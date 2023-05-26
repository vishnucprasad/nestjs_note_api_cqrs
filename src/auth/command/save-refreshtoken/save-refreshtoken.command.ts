import { SaveRefreshTokenDto } from 'src/auth/dto';

export class SaveRefreshTokenCommand {
  constructor(public readonly dto: SaveRefreshTokenDto) {}
}

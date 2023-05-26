import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto';
import { SaveRefreshTokenCommand, SignupCommand } from './command';
import { User } from '../user/domain';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  async signup(dto: AuthDto) {
    const user = await this.commandBus.execute<SignupCommand, User>(
      new SignupCommand(dto),
    );

    const accessToken = await this.signAccessToken(user.getId());
    const refreshToken = await this.signRefreshToken(user.getId());

    await this.commandBus.execute<SaveRefreshTokenCommand, void>(
      new SaveRefreshTokenCommand({ user: user.getId(), token: refreshToken }),
    );

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async signAccessToken(userId: string): Promise<string> {
    const payload = {
      sub: userId,
    };

    const secret = this.config.get('ACCESS_TOKEN_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '10m',
      secret,
    });

    return token;
  }

  async signRefreshToken(userId: string): Promise<string> {
    const payload = {
      sub: userId,
    };

    const secret = this.config.get('REFRESH_TOKEN_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '60d',
      secret,
    });

    return token;
  }
}

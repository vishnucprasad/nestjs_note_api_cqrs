import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto';
import { SaveRefreshTokenCommand, SignupCommand } from './command';
import { User } from '../user/domain';
import { SigninQuery } from './queries';
import { UserDto } from '../user/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  async signup(dto: AuthDto): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
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

  async signin(dto: AuthDto): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    const user = await this.queryBus.execute<SigninQuery, UserDto>(
      new SigninQuery(dto),
    );

    const accessToken = await this.signAccessToken(user._id.toHexString());
    const refreshToken = await this.signRefreshToken(user._id.toHexString());

    await this.commandBus.execute<SaveRefreshTokenCommand, void>(
      new SaveRefreshTokenCommand({
        user: user._id.toHexString(),
        token: refreshToken,
      }),
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

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueryBus } from '@nestjs/cqrs';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDto } from '../../user/dto';
import { FindUserQuery } from '../query';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly config: ConfigService,
    private readonly queryBus: QueryBus,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: { sub: string }): Promise<UserDto> {
    return await this.queryBus.execute<FindUserQuery, UserDto>(
      new FindUserQuery(payload.sub),
    );
  }
}

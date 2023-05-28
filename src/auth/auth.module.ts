import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CqrsModule } from '@nestjs/cqrs';
import { UserSchemaFactory } from '../user/schema';
import { UserDtoRepository, UserEntityRepository } from '../user/repository';
import { UserFactory } from '../user/domain';
import { AuthCommandHandlers } from './command';
import { JwtModule } from '@nestjs/jwt';
import {
  RefreshTokenDtoRepository,
  RefreshTokenEntityRepository,
} from './repository';
import { RefreshTokenFactory } from './domain';
import { RefreshTokenSchema, RefreshTokenSchemaFactory } from './schema';
import { AuthQueryHandlers } from './query';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategy';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: RefreshTokenSchema.name,
        schema: SchemaFactory.createForClass(RefreshTokenSchema),
      },
    ]),
    UserModule,
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserEntityRepository,
    UserSchemaFactory,
    UserFactory,
    UserDtoRepository,
    RefreshTokenEntityRepository,
    RefreshTokenSchemaFactory,
    RefreshTokenFactory,
    RefreshTokenDtoRepository,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    ...AuthCommandHandlers,
    ...AuthQueryHandlers,
  ],
})
export class AuthModule {}

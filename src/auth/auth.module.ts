import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { UserSchema, UserSchemaFactory } from '../user/schema';
import { UserDtoRepository, UserEntityRepository } from '../user/repository';
import { UserFactory } from '../user/domain';
import { AuthCommandHandlers } from './command';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenEntityRepository } from './repository';
import { RefreshTokenFactory } from './domain';
import { RefreshTokenSchema, RefreshTokenSchemaFactory } from './schema';
import { AuthQueryHandlers } from './queries';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: UserSchema.name,
        schema: SchemaFactory.createForClass(UserSchema),
      },
      {
        name: RefreshTokenSchema.name,
        schema: SchemaFactory.createForClass(RefreshTokenSchema),
      },
    ]),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserEntityRepository,
    UserSchemaFactory,
    UserFactory,
    RefreshTokenEntityRepository,
    UserDtoRepository,
    RefreshTokenSchemaFactory,
    RefreshTokenFactory,
    ...AuthCommandHandlers,
    ...AuthQueryHandlers,
  ],
})
export class AuthModule {}
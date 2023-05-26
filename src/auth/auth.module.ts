import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { UserSchema, UserSchemaFactory } from 'src/user/schema';
import { UserEntityRepository } from 'src/user/repository';
import { UserFactory } from 'src/user/domain';
import { AuthCommandHandlers } from './command';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenEntityRepository } from './repository';
import { RefreshTokenFactory } from './domain';
import { RefreshTokenSchema, RefreshTokenSchemaFactory } from './schema';

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
    RefreshTokenSchemaFactory,
    RefreshTokenFactory,
    ...AuthCommandHandlers,
  ],
})
export class AuthModule {}

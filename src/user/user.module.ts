import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserCommandHandlers } from './command';
import { UserEntityRepository } from './repository';
import { UserFactory } from './domain';
import { UserSchema, UserSchemaFactory } from './schema';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([
      {
        name: UserSchema.name,
        schema: SchemaFactory.createForClass(UserSchema),
      },
    ]),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserEntityRepository,
    UserSchemaFactory,
    UserFactory,
    ...UserCommandHandlers,
  ],
  exports: [MongooseModule],
})
export class UserModule {}

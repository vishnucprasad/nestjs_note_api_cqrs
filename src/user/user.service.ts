import { Injectable } from '@nestjs/common';
import { EditUserDto } from './dto';
import { CommandBus } from '@nestjs/cqrs';
import { EditUserCommand } from './command';
import { User } from './domain';

@Injectable()
export class UserService {
  constructor(private readonly commandBus: CommandBus) {}

  async editUser(userId: string, dto: EditUserDto) {
    return await this.commandBus.execute<EditUserCommand, User>(
      new EditUserCommand(userId, dto),
    );
  }
}

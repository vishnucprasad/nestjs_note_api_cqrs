import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignupCommand } from './signup.command';
import { User, UserFactory } from '../../../user/domain';

@CommandHandler(SignupCommand)
export class SignupHandler implements ICommandHandler<SignupCommand> {
  constructor(private readonly userFactory: UserFactory) {}

  async execute(command: SignupCommand): Promise<User> {
    const user = await this.userFactory.create(
      command.dto.email,
      command.dto.password,
    );

    return user;
  }
}

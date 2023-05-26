import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { SignupCommand } from './signup.command';
import { User, UserFactory } from '../../../user/domain';

@CommandHandler(SignupCommand)
export class SignupHandler implements ICommandHandler<SignupCommand> {
  constructor(
    private readonly userFactory: UserFactory,
    private readonly eventpublisher: EventPublisher,
  ) {}

  async execute(command: SignupCommand): Promise<User> {
    const user = this.eventpublisher.mergeObjectContext(
      await this.userFactory.create(command.dto.email, command.dto.password),
    );
    user.commit();
    return user;
  }
}

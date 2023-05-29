import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EditUserCommand } from './edit-user.command';
import { UserEntityRepository } from '../../../user/repository';
import { UserDto } from '../../../user/dto';
import { ObjectId } from 'mongodb';

@CommandHandler(EditUserCommand)
export class EditUserHandler implements ICommandHandler<EditUserCommand> {
  constructor(private readonly userEntityRepository: UserEntityRepository) {}

  async execute(command: EditUserCommand): Promise<Omit<UserDto, 'hash'>> {
    const { userId, dto } = command;

    const user = await this.userEntityRepository.findOneById(userId);

    await user.editUser(dto);
    await this.userEntityRepository.findOneAndUpdateById(userId, user);

    return {
      _id: new ObjectId(user.getId()),
      email: user.getEmail(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
    };
  }
}

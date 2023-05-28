import { EditUserDto } from '../../../user/dto';

export class EditUserCommand {
  constructor(
    public readonly userId: string,
    public readonly dto: EditUserDto,
  ) {}
}

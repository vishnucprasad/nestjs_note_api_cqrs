import { UserDto } from '../../user/dto';

export class FindUserQuery {
  constructor(public readonly userId: string) {}
}

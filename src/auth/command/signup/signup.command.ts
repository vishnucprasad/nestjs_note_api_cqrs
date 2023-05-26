import { AuthDto } from 'src/auth/dto';

export class SignupCommand {
  constructor(public readonly dto: AuthDto) {}
}

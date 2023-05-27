import { AuthDto } from '../../dto';

export class SigninQuery {
  constructor(public readonly dto: AuthDto) {}
}

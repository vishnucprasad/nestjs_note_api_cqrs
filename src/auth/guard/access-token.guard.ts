import { AuthGuard } from '@nestjs/passport';

export class AccessGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}

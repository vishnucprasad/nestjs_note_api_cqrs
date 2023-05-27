import { AuthGuard } from '@nestjs/passport';

export class RefreshGuard extends AuthGuard('refresh-jwt') {
  constructor() {
    super();
  }
}

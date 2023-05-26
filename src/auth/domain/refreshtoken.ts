import { AggregateRoot } from '@nestjs/cqrs';

export class RefreshToken extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly user: string,
    private token: string,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getUser(): string {
    return this.user;
  }

  getToken(): string {
    return this.token;
  }

  updateRefreshToken(token: string): void {
    this.token = token;
  }
}

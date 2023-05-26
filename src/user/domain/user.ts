import { AggregateRoot } from '@nestjs/cqrs';

export class User extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private email: string,
    private hash: string,
    private firstName?: string,
    private lastName?: string,
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getEmail(): string {
    return this.email;
  }

  getHash(): string {
    return this.hash;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }
}

import { AggregateRoot } from '@nestjs/cqrs';
import * as argon from 'argon2';
import { EditUserDto } from '../dto';

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

  async editUser(dto: EditUserDto): Promise<void> {
    if (dto.password) {
      this.hash = await argon.hash(dto.password);
    }

    this.email = dto.email ? dto.email : this.email;
    this.firstName = dto.firstName ? dto.firstName : this.firstName;
    this.lastName = dto.lastName ? dto.lastName : this.lastName;
  }
}

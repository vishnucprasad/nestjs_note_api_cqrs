import { AggregateRoot } from '@nestjs/cqrs';

export class Note extends AggregateRoot {
  constructor(
    private readonly _id: string,
    private readonly user: string,
    private title: string,
    private content: string,
    private tags: string[],
  ) {
    super();
  }

  getId(): string {
    return this._id;
  }

  getUser(): string {
    return this.user;
  }

  getTitle(): string {
    return this.title;
  }

  getContent(): string {
    return this.content;
  }

  getTags(): string[] {
    return this.tags;
  }
}

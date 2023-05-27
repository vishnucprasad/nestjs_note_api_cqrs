import { ObjectId } from 'mongodb';

export class UserDto {
  readonly _id: ObjectId;
  readonly email: string;
  hash: string;
  readonly firstName?: string;
  readonly lastName?: string;
}

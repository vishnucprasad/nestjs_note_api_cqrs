import { ObjectId } from 'mongodb';

export class RefreshTokenDto {
  readonly _id: ObjectId;
  readonly user: ObjectId;
  readonly token: string;
}

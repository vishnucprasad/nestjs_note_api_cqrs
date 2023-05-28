import { ObjectId } from 'mongodb';

export class NoteDto {
  readonly _id: ObjectId;
  readonly user: ObjectId;
  readonly title: string;
  readonly content: string;
}

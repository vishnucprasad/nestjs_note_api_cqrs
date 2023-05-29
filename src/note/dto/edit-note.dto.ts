import { IsArray, IsOptional, IsString } from 'class-validator';

export class EditNoteDto {
  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @IsOptional()
  readonly content?: string;

  @IsArray()
  @IsOptional()
  readonly tags?: string[];
}

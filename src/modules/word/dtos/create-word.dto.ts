import { IsOptional, IsString, Matches } from 'class-validator';

export class CreateWordDto {
  @IsString()
  @Matches(/^[\D',\-]+$/)
  word: string;

  @IsString()
  @Matches(/^[\D',\-]+$/)
  translation: string;

  @IsString()
  @IsOptional()
  example?: string;
}

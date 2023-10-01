import { IsUUID, IsString, Matches, IsNotEmpty } from 'class-validator';

export class CreateDictionaryDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(\w+\s*)*$/) // bad one, investigate lazy regex
  dictionaryName: string;

  @IsUUID()
  @IsNotEmpty()
  nativeLanguageId: string;

  @IsUUID()
  @IsNotEmpty()
  learnLanguageId: string;
}

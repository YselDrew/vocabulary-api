import { IsUUID, IsString, Matches, IsNotEmpty } from 'class-validator';

export class CreateVocabularyDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^(\w+\s*)*$/) // bad one, investigate lazy regex
  vocabularyName: string;

  @IsUUID()
  @IsNotEmpty()
  nativeLanguageId: string;

  @IsUUID()
  @IsNotEmpty()
  learnLanguageId: string;
}

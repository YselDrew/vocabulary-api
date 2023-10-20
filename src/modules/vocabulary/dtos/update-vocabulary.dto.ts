import { IsOptional } from 'class-validator';
import { CreateVocabularyDto } from './create-vocabulary.dto';

export class UpdateVocabularyDto extends CreateVocabularyDto {
  @IsOptional()
  vocabularyName: string;

  @IsOptional()
  nativeLanguageId: string;

  @IsOptional()
  learnLanguageId: string;
}

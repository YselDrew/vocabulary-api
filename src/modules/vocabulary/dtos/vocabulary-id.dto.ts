import { IsUUID } from 'class-validator';

export class VocabularyIdDto {
  @IsUUID()
  vocabularyId: string;
}

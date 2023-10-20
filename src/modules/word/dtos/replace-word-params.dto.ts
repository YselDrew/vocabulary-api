import { IsUUID } from 'class-validator';
import { VocabularyIdDto } from 'src/modules/vocabulary/dtos/vocabulary-id.dto';

export class ReplaceWordParamsDto extends VocabularyIdDto {
  @IsUUID()
  wordId: string;
}

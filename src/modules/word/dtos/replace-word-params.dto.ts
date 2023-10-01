import { IsUUID } from 'class-validator';
import { DictionaryIdDto } from 'src/modules/dictionary/dtos/dictionary-id.dto';

export class ReplaceWordParamsDto extends DictionaryIdDto {
  @IsUUID()
  wordId: string;
}

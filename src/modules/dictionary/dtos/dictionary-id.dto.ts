import { IsUUID } from 'class-validator';

export class DictionaryIdDto {
  @IsUUID()
  dictionaryId: string;
}

import { IsOptional } from 'class-validator';

import { CreateDictionaryDto } from './create-dictionary.dto';

export class UpdateDictionaryDto extends CreateDictionaryDto {
  @IsOptional()
  dictionaryName: string;

  @IsOptional()
  nativeLanguageId: string;

  @IsOptional()
  learnLanguageId: string;
}

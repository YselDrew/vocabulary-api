import { ApiProperty } from '@nestjs/swagger';

export class LanguageResponseDto {
  @ApiProperty()
  languageId: string;

  @ApiProperty()
  languageName: string;
}

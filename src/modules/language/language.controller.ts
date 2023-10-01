import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LanguageService } from './language.service';
import { GetLanguageListSwaggerDecorator } from './swagger/get-language-list-swagger.decorator';
import { SelectLanguageListQueryResponse } from './types/language.types';

@ApiTags('Languages')
@Controller('/languages')
export class LanguageController {
  constructor(private languageService: LanguageService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @GetLanguageListSwaggerDecorator()
  getList(): Promise<SelectLanguageListQueryResponse[]> {
    return this.languageService.getList();
  }
}

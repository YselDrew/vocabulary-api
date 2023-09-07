import { Injectable } from '@nestjs/common';

import { LanguagesRepository } from './language.repository';
import { SelectLanguageListQueryResponse } from './types/language.types';

@Injectable()
export class LanguageService {
  constructor(private languageRepository: LanguagesRepository) {}

  getList(): Promise<SelectLanguageListQueryResponse[]> {
    return this.languageRepository.getList();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Language } from './language.entity';
import { SelectLanguageListQueryResponse } from './types/language.types';

@Injectable()
export class LanguagesRepository extends Repository<Language> {
  constructor(
    @InjectRepository(Language)
    private repository: LanguagesRepository,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  getList(): Promise<SelectLanguageListQueryResponse[]> {
    return this.createQueryBuilder()
      .select(['language_id AS "languageId"', 'language_name AS "languageName"'])
      .getRawMany();
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Dictionary } from './dictionary.entity';
import { CreateDictionary, SelectDictionaryListQueryResult, UpdateDictionaryOptions } from './types/dictionary.types';
import { Language } from '../language/language.entity';

@Injectable()
export class DictionariesRepository extends Repository<Dictionary> {
  constructor(
    @InjectRepository(Dictionary)
    private repository: DictionariesRepository,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async insertOne(dictionary: CreateDictionary): Promise<void> {
    await this.save(dictionary);
  }

  async selectMany(): Promise<SelectDictionaryListQueryResult[]> {
    return this.createQueryBuilder('d')
      .select([
        'dictionary_id AS "dictionaryId"',
        'dictionary_name AS "dictionaryName"',
        `json_build_object(
          'languageId', nl.language_id,
          'languageName', nl.language_name
        ) AS "nativeLanguage"`,
        `json_build_object(
          'languageId', ll.language_id,
          'languageName', ll.language_name
        ) AS "learnLanguage"`,
      ])
      .leftJoin(Language, 'nl', 'nl.language_id = d.native_language_id')
      .leftJoin(Language, 'll', 'll.language_id = d.learn_language_id')
      .getRawMany();
  }

  async updateOne({ dictionaryId, ...dictionary }: UpdateDictionaryOptions): Promise<void> {
    await this.update(dictionaryId, dictionary);
  }

  async deleteOne(dictionaryId: string): Promise<void> {
    await this.delete(dictionaryId);
  }
}

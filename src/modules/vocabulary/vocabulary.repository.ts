import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateVocabulary, SelectVocabularyListQueryResult, UpdateVocabularyOptions } from './types/vocabulary.types';
import { Vocabulary } from './vocabulary.entity';
import { Language } from '../language/language.entity';
import { Word } from '../word/word.entity';

@Injectable()
export class VocabulariesRepository extends Repository<Vocabulary> {
  constructor(
    @InjectRepository(Vocabulary)
    private repository: VocabulariesRepository,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async insertOne(vocabulary: CreateVocabulary): Promise<void> {
    await this.save(vocabulary);
  }

  selectMany(): Promise<SelectVocabularyListQueryResult[]> {
    return this.createQueryBuilder('d')
      .select([
        'vocabulary_id AS "vocabularyId"',
        'vocabulary_name AS "vocabularyName"',
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

  async updateOne({ vocabularyId, ...vocabulary }: UpdateVocabularyOptions): Promise<void> {
    await this.update(vocabularyId, vocabulary);
  }

  async deleteOne(vocabularyId: string): Promise<void> {
    await this.delete(vocabularyId);
  }

  hasWords(vocabularyId: string): Promise<boolean> {
    return this.createQueryBuilder('d')
      .innerJoin(Word, 'w', 'w.vocabulary_id = d.vocabulary_id')
      .where('d.vocabulary_id = :vocabularyId', { vocabularyId })
      .getExists();
  }
}

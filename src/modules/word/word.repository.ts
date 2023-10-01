import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DEFAULT_WORD_LIST_LIMIT,
  DEFAULT_WORD_LIST_OFFSET,
  SortOrder,
  sortWordListMap,
} from 'src/constants/sort-order';
import { Repository } from 'typeorm';

import { DeleteWordOptions, GetWordListOptions, InsertWordsOptions, ReplaceWordOptions } from './types/word.types';
import { Word } from './word.entity';

@Injectable()
export class WordsRepository extends Repository<Word> {
  constructor(
    @InjectRepository(Word)
    private repository: WordsRepository,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  async insertMany(words: InsertWordsOptions[]): Promise<void> {
    await this.insert(words);
  }

  async selectManyAndCount({
    dictionaryId,
    sortOrder = SortOrder.DESC,
    sortField,
    limit = DEFAULT_WORD_LIST_LIMIT,
    offset = DEFAULT_WORD_LIST_OFFSET,
  }: GetWordListOptions): Promise<any> {
    const sortBy = sortWordListMap[sortField] || sortWordListMap.createdAt;

    const baseQuery = this.createQueryBuilder()
      .select([
        'word_id AS "wordId"',
        'dictionary_id AS "dictionaryId"',
        'word',
        'translation',
        'example',
        'created_at AS "createdAt"',
      ])
      .where('dictionary_id = :dictionaryId', { dictionaryId })
      .orderBy(sortBy, sortOrder);

    const [total, words] = await Promise.all([
      baseQuery.getCount(),
      baseQuery.limit(limit).offset(offset).getRawMany(),
    ]);

    return { total, words };
  }

  async updateOne({ wordId, ...word }: ReplaceWordOptions): Promise<void> {
    await this.update(wordId, word);
  }

  async deleteOne({ dictionaryId, wordId }: DeleteWordOptions): Promise<void> {
    await this.delete({ dictionaryId, wordId });
  }
}

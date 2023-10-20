import { Injectable } from '@nestjs/common';

import { WordValidationService } from './word-validation.service';
import {
  CreateWordsOptions,
  DeleteWordOptions,
  GetWordListOptions,
  InsertWordsOptions,
  ReplaceWordOptions,
} from '../types/word.types';
import { WordsRepository } from '../word.repository';

@Injectable()
export class WordService {
  constructor(
    private wordValidationService: WordValidationService,
    private wordRepository: WordsRepository,
  ) {}

  async createMany(createWordsOptions: CreateWordsOptions): Promise<void> {
    await this.wordValidationService.validateOnCreate(createWordsOptions);

    const { vocabularyId, words } = createWordsOptions;
    const insertWordsOptions: InsertWordsOptions[] = words.map((word) => ({ vocabularyId, ...word }));

    await this.wordRepository.insertMany(insertWordsOptions);
  }

  async getList(getWordListOptions: GetWordListOptions): Promise<any> {
    return this.wordRepository.selectManyAndCount(getWordListOptions);
  }

  async replaceOne(replaceWordOptions: ReplaceWordOptions): Promise<void> {
    await this.wordValidationService.valdiateOnReplace(replaceWordOptions);

    await this.wordRepository.updateOne(replaceWordOptions);
  }

  async deleteOne(deleteWordOptions: DeleteWordOptions): Promise<void> {
    await this.wordValidationService.validateOnDelete(deleteWordOptions);

    await this.wordRepository.deleteOne(deleteWordOptions);
  }
}

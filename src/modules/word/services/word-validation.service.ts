import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DictionaryValidationService } from 'src/modules/dictionary/services/dictionary-validation.service';

import { CreateWordsOptions, DeleteWordOptions, ReplaceWordOptions } from '../types/word.types';
import { WordsRepository } from '../word.repository';

@Injectable()
export class WordValidationService {
  constructor(
    private wordRepository: WordsRepository,
    private dictionaryValidationService: DictionaryValidationService,
  ) {}

  async validateOnCreate({ dictionaryId }: CreateWordsOptions): Promise<void> {
    await this.dictionaryValidationService.validateDictionaryExist(dictionaryId);
  }

  async valdiateOnReplace({ dictionaryId, wordId }: ReplaceWordOptions): Promise<void> {
    await this.validateDictionaryAndWord(dictionaryId, wordId);
  }

  async validateOnDelete({ dictionaryId, wordId }: DeleteWordOptions): Promise<void> {
    await this.validateDictionaryAndWord(dictionaryId, wordId);
  }

  async validateDictionaryAndWord(dictionaryId: string, wordId: string): Promise<void> {
    await this.dictionaryValidationService.validateDictionaryExist(dictionaryId);

    await this.validateWordExist(wordId);
  }

  async validateWordExist(wordId: string): Promise<void> {
    const doesExist = await this.wordRepository.exist({ where: { wordId } });

    if (!doesExist) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Word does not exist',
      });
    }
  }
}

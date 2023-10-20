import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { VocabularyValidationService } from 'src/modules/vocabulary/services/vocabulary-validation.service';

import { CreateWordsOptions, DeleteWordOptions, ReplaceWordOptions } from '../types/word.types';
import { WordsRepository } from '../word.repository';

@Injectable()
export class WordValidationService {
  constructor(
    private wordRepository: WordsRepository,
    private vocabularyValidationService: VocabularyValidationService,
  ) {}

  async validateOnCreate({ vocabularyId }: CreateWordsOptions): Promise<void> {
    await this.vocabularyValidationService.validateVocabularyExist(vocabularyId);
  }

  async valdiateOnReplace({ vocabularyId, wordId }: ReplaceWordOptions): Promise<void> {
    await this.validateVocabularyAndWord(vocabularyId, wordId);
  }

  async validateOnDelete({ vocabularyId, wordId }: DeleteWordOptions): Promise<void> {
    await this.validateVocabularyAndWord(vocabularyId, wordId);
  }

  async validateVocabularyAndWord(vocabularyId: string, wordId: string): Promise<void> {
    await this.vocabularyValidationService.validateVocabularyExist(vocabularyId);

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

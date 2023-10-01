import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { DictionariesRepository } from '../dictionary.repository';
import { UpdateDictionaryOptions } from '../types/dictionary.types';
import { WordValidationService } from 'src/modules/word/services/word-validation.service';

@Injectable()
export class DictionaryValidationService {
  constructor(private dictionaryRepository: DictionariesRepository) {}

  async validateOnUpdate({ dictionaryId, nativeLanguageId, learnLanguageId }: UpdateDictionaryOptions): Promise<void> {
    await this.validateDictionaryExist(dictionaryId);

    const dictionaryHasWords = await this.dictionaryRepository.hasWords(dictionaryId);
    const isChangingLanguage = Boolean(nativeLanguageId || learnLanguageId);

    if (dictionaryHasWords && isChangingLanguage) {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        error: 'Dictionary is not empty',
      });
    }
  }

  async validateOnDelete(dictionaryId: string): Promise<void> {
    await this.validateDictionaryExist(dictionaryId);
  }

  async validateDictionaryExist(dictionaryId: string): Promise<void> {
    const doesExist = await this.dictionaryRepository.exist({ where: { dictionaryId } });

    if (!doesExist) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Dictionary does not exist',
      });
    }
  }
}

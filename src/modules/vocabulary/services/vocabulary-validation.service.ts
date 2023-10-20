import { ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { VocabulariesRepository } from '../vocabulary.repository';
import { UpdateVocabularyOptions } from '../types/vocabulary.types';

@Injectable()
export class VocabularyValidationService {
  constructor(private vocabularyRepository: VocabulariesRepository) {}

  async validateOnUpdate({ vocabularyId, nativeLanguageId, learnLanguageId }: UpdateVocabularyOptions): Promise<void> {
    await this.validateVocabularyExist(vocabularyId);

    const vocabularyHasWords = await this.vocabularyRepository.hasWords(vocabularyId);
    const isChangingLanguage = Boolean(nativeLanguageId || learnLanguageId);

    if (vocabularyHasWords && isChangingLanguage) {
      throw new ConflictException({
        status: HttpStatus.CONFLICT,
        error: 'Vocabulary is not empty',
      });
    }
  }

  async validateOnDelete(vocabularyId: string): Promise<void> {
    await this.validateVocabularyExist(vocabularyId);
  }

  async validateVocabularyExist(vocabularyId: string): Promise<void> {
    const doesExist = await this.vocabularyRepository.exist({ where: { vocabularyId } });

    if (!doesExist) {
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        error: 'Vocabulary does not exist',
      });
    }
  }
}

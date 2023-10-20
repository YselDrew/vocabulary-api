import { Injectable } from '@nestjs/common';

import { VocabularyValidationService } from './vocabulary-validation.service';
import {
  CreateVocabularyOptions,
  SelectVocabularyListQueryResult,
  UpdateVocabularyOptions,
} from '../types/vocabulary.types';
import { VocabulariesRepository } from '../vocabulary.repository';

@Injectable()
export class VocabularyService {
  constructor(
    private vocabularyValidationService: VocabularyValidationService,
    private vocabularyRepository: VocabulariesRepository,
  ) {}

  async createOne(createVocabularyOptions: CreateVocabularyOptions): Promise<void> {
    await this.vocabularyRepository.insertOne(createVocabularyOptions);
  }

  async getList(): Promise<SelectVocabularyListQueryResult[]> {
    return this.vocabularyRepository.selectMany();
  }

  async updateOne(updateVocabularyOptions: UpdateVocabularyOptions): Promise<void> {
    await this.vocabularyValidationService.validateOnUpdate(updateVocabularyOptions);

    await this.vocabularyRepository.updateOne(updateVocabularyOptions);
  }

  async deleteOne(vocabularyId: string): Promise<void> {
    await this.vocabularyValidationService.validateOnDelete(vocabularyId);

    await this.vocabularyRepository.deleteOne(vocabularyId);
  }
}

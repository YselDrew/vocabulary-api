import { Injectable } from '@nestjs/common';

import { DictionaryValidationService } from './dictionary-validation.service';
import { DictionariesRepository } from '../dictionary.repository';
import {
  CreateDictionaryOptions,
  SelectDictionaryListQueryResult,
  UpdateDictionaryOptions,
} from '../types/dictionary.types';

@Injectable()
export class DictionaryService {
  constructor(
    private dictionaryValidationService: DictionaryValidationService,
    private dictionaryRepository: DictionariesRepository,
  ) {}

  async createOne(createDictionaryOptions: CreateDictionaryOptions): Promise<void> {
    await this.dictionaryRepository.insertOne(createDictionaryOptions);
  }

  async getList(): Promise<SelectDictionaryListQueryResult[]> {
    return this.dictionaryRepository.selectMany();
  }

  async updateOne(updateDictionaryOptions: UpdateDictionaryOptions): Promise<void> {
    await this.dictionaryValidationService.validateOnUpdate(updateDictionaryOptions);

    await this.dictionaryRepository.updateOne(updateDictionaryOptions);
  }

  async deleteOne(dictionaryId: string): Promise<void> {
    await this.dictionaryValidationService.validateOnDelete(dictionaryId);

    await this.dictionaryRepository.deleteOne(dictionaryId);
  }
}

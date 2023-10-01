import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { DictionariesRepository } from '../dictionary.repository';
import { UpdateDictionaryOptions } from '../types/dictionary.types';

@Injectable()
export class DictionaryValidationService {
  constructor(private dictionaryRepository: DictionariesRepository) {}

  async validateOnUpdate({ dictionaryId }: UpdateDictionaryOptions): Promise<void> {
    await this.validateDictionaryExist(dictionaryId);
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

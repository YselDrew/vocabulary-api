import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateVocabularyDto } from './dtos/create-vocabulary.dto';
import { DeleteVocabularyParamsDto } from './dtos/delete-vocabulary-params.dto';
import { UpdateVocabularyParamsDto } from './dtos/update-vocabulary-params.dto';
import { UpdateVocabularyDto } from './dtos/update-vocabulary.dto';
import { VocabularyService } from './services/vocabulary.service';
import { SelectVocabularyListQueryResult } from './types/vocabulary.types';

@ApiTags('Vocabularies')
@Controller('/vocabularies')
export class VocabularyController {
  constructor(private vocabularyService: VocabularyService) {}

  @Post()
  async createOne(@Body() createVocabularyDto: CreateVocabularyDto): Promise<void> {
    await this.vocabularyService.createOne(createVocabularyDto);
  }

  @Get()
  getList(): Promise<SelectVocabularyListQueryResult[]> {
    return this.vocabularyService.getList();
  }

  @Patch('/:vocabularyId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateOne(
    @Param() { vocabularyId }: UpdateVocabularyParamsDto,
    @Body() updateVocabularyDto: UpdateVocabularyDto,
  ): Promise<void> {
    await this.vocabularyService.updateOne({ vocabularyId, ...updateVocabularyDto });
  }

  @Delete('/:vocabularyId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param() { vocabularyId }: DeleteVocabularyParamsDto): Promise<void> {
    await this.vocabularyService.deleteOne(vocabularyId);
  }
}

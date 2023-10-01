import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CreateDictionaryDto } from './dtos/create-dictionary.dto';
import { DeleteDictionaryParamsDto } from './dtos/delete-dictionary-params.dto';
import { UpdateDictionaryParamsDto } from './dtos/update-dictionary-params.dto';
import { UpdateDictionaryDto } from './dtos/update-dictionary.dto';
import { DictionaryService } from './services/dictionary.service';
import { SelectDictionaryListQueryResult } from './types/dictionary.types';

@ApiTags('Dictionaries')
@Controller('/dictionaries')
export class DictionaryController {
  constructor(private dictionaryService: DictionaryService) {}

  @Post()
  async createOne(@Body() createDictionaryDto: CreateDictionaryDto): Promise<void> {
    await this.dictionaryService.createOne(createDictionaryDto);
  }

  @Get()
  getList(): Promise<SelectDictionaryListQueryResult[]> {
    return this.dictionaryService.getList();
  }

  @Patch('/:dictionaryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateOne(
    @Param() { dictionaryId }: UpdateDictionaryParamsDto,
    @Body() updateDictionaryDto: UpdateDictionaryDto,
  ): Promise<void> {
    await this.dictionaryService.updateOne({ dictionaryId, ...updateDictionaryDto });
  }

  @Delete('/:dictionaryId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param() { dictionaryId }: DeleteDictionaryParamsDto): Promise<void> {
    await this.dictionaryService.deleteOne(dictionaryId);
  }
}

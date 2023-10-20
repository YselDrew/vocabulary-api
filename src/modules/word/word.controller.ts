import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ArrayValidationPipe } from 'src/pipes/array-validation.pipe';

import { CreateWordParamsDto } from './dtos/create-word-params.dto';
import { CreateWordDto } from './dtos/create-word.dto';
import { DeleteWordParamsDto } from './dtos/delete-word-params.dto';
import { GetWordListParamsDto } from './dtos/get-word-list-params.dto';
import { GetWordListQueryDto } from './dtos/get-word-list-query.dto';
import { ReplaceWordParamsDto } from './dtos/replace-word-params.dto';
import { ReplaceWordDto } from './dtos/replace-word.dto';
import { WordService } from './services/word.service';

@ApiTags('Words')
@Controller('/vocabularies/:vocabularyId/words')
export class WordController {
  constructor(private wordService: WordService) {}

  @Post()
  async createMany(
    @Param() { vocabularyId }: CreateWordParamsDto,
    // This approach requires enhancement
    @Body(ArrayValidationPipe(CreateWordDto)) createWordsDto: CreateWordDto[],
  ): Promise<void> {
    await this.wordService.createMany({ vocabularyId, words: createWordsDto });
  }

  @Get()
  getList(
    @Param() { vocabularyId }: GetWordListParamsDto,
    @Query() getWordListQueryDto: GetWordListQueryDto,
  ): Promise<any> {
    return this.wordService.getList({ vocabularyId, ...getWordListQueryDto });
  }

  @Put('/:wordId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async replaceOne(
    @Param() { vocabularyId, wordId }: ReplaceWordParamsDto,
    @Body() replaceWordDto: ReplaceWordDto,
  ): Promise<void> {
    await this.wordService.replaceOne({ vocabularyId, wordId, ...replaceWordDto });
  }

  @Delete('/:wordId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOne(@Param() deleteWordParamsDto: DeleteWordParamsDto): Promise<void> {
    await this.wordService.deleteOne(deleteWordParamsDto);
  }
}

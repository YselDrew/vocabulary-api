import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WordValidationService } from './services/word-validation.service';
import { WordService } from './services/word.service';
import { WordController } from './word.controller';
import { Word } from './word.entity';
import { WordsRepository } from './word.repository';
import { DictionaryModule } from '../dictionary/dictionary.module';

@Module({
  imports: [TypeOrmModule.forFeature([Word]), DictionaryModule],
  controllers: [WordController],
  providers: [WordService, WordValidationService, WordsRepository],
  exports: [],
})
export class WordModule {}

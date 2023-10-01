import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DictionaryController } from './dictionary.controller';
import { Dictionary } from './dictionary.entity';
import { DictionariesRepository } from './dictionary.repository';
import { DictionaryValidationService } from './services/dictionary-validation.service';
import { DictionaryService } from './services/dictionary.service';
import { WordModule } from '../word/word.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Dictionary]), WordModule],
  controllers: [DictionaryController],
  providers: [DictionaryService, DictionaryValidationService, DictionariesRepository],
  exports: [DictionaryValidationService],
})
export class DictionaryModule {}

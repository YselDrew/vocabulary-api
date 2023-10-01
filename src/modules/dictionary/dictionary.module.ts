import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DictionaryController } from './dictionary.controller';
import { Dictionary } from './dictionary.entity';
import { DictionariesRepository } from './dictionary.repository';
import { DictionaryValidationService } from './services/dictionary-validation.service';
import { DictionaryService } from './services/dictionary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dictionary])],
  controllers: [DictionaryController],
  providers: [DictionaryService, DictionaryValidationService, DictionariesRepository],
  exports: [DictionaryValidationService],
})
export class DictionaryModule {}

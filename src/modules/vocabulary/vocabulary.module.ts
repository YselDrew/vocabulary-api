import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VocabularyController } from './vocabulary.controller';
import { Vocabulary } from './vocabulary.entity';
import { VocabulariesRepository } from './vocabulary.repository';
import { VocabularyValidationService } from './services/vocabulary-validation.service';
import { VocabularyService } from './services/vocabulary.service';
import { WordModule } from '../word/word.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Vocabulary]), WordModule],
  controllers: [VocabularyController],
  providers: [VocabularyService, VocabularyValidationService, VocabulariesRepository],
  exports: [VocabularyValidationService],
})
export class VocabularyModule {}

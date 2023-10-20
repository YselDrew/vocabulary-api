import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from '../../database/database.config';
import { LanguageModule } from '../language/language.module';
import { VocabularyModule } from '../vocabulary/vocabulary.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), LanguageModule, VocabularyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

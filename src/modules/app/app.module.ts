import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { dataSourceOptions } from '../../database/database.config';
import { DictionaryModule } from '../dictionary/dictionary.module';
import { LanguageModule } from '../language/language.module';
import { WordModule } from '../word/word.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), LanguageModule, DictionaryModule, WordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

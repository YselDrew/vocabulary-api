import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LanguageController } from './language.controller';
import { Language } from './language.entity';
import { LanguagesRepository } from './language.repository';
import { LanguageService } from './language.service';

@Module({
  imports: [TypeOrmModule.forFeature([Language])],
  controllers: [LanguageController],
  providers: [LanguageService, LanguagesRepository],
  exports: [],
})
export class LanguageModule {}

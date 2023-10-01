import { Language } from '../../language/language.entity';
import { Dictionary } from '../dictionary.entity';

/*
  Create Dictionary
*/
export type CreateDictionary = Pick<Dictionary, 'dictionaryName' | 'nativeLanguageId' | 'learnLanguageId'>;

export type CreateDictionaryOptions = CreateDictionary;

/*
  Get Dictionary List
*/
export type SelectDictionaryListQueryResult = Pick<Dictionary, 'dictionaryId' | 'dictionaryName'> & {
  nativeLanguage: SelectDictionaryListLanguage;
  learnLanguage: SelectDictionaryListLanguage;
};

export type SelectDictionaryListLanguage = Pick<Language, 'languageId' | 'languageName'>;

/*
  Update Dictionary
*/
export type UpdateDictionaryOptions = Pick<Dictionary, 'dictionaryId'> & {
  dictionaryName?: string;
  nativeLanguageId?: string;
  learnLanguageId?: string;
};

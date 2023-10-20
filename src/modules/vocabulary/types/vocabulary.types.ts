import { Language } from '../../language/language.entity';
import { Vocabulary } from '../vocabulary.entity';

/*
  Create Vocabulary
*/
export type CreateVocabulary = Pick<Vocabulary, 'vocabularyName' | 'nativeLanguageId' | 'learnLanguageId'>;

export type CreateVocabularyOptions = CreateVocabulary;

/*
  Get Vocabulary List
*/
export type SelectVocabularyListQueryResult = Pick<Vocabulary, 'vocabularyId' | 'vocabularyName'> & {
  nativeLanguage: SelectVocabularyListLanguage;
  learnLanguage: SelectVocabularyListLanguage;
};

export type SelectVocabularyListLanguage = Pick<Language, 'languageId' | 'languageName'>;

/*
  Update Vocabulary
*/
export type UpdateVocabularyOptions = Pick<Vocabulary, 'vocabularyId'> & {
  vocabularyName?: string;
  nativeLanguageId?: string;
  learnLanguageId?: string;
};

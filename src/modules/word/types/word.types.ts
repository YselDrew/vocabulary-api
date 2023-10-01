import { SortOrder } from 'src/constants/sort-order';
import { Dictionary } from 'src/modules/dictionary/dictionary.entity';

import { GetWordListSortValue } from '../constants/word.constants';
import { Word } from '../word.entity';

/*
  Create Words
*/
export type CreateWordsOptions = Pick<Dictionary, 'dictionaryId'> & {
  words: CreateWord[];
};

export type InsertWordsOptions = CreateWord & Pick<Dictionary, 'dictionaryId'>;

export type CreateWord = Pick<Word, 'word' | 'translation'> & {
  example?: string;
};

/*
  Get Word List
*/
export type GetWordListOptions = Pick<Dictionary, 'dictionaryId'> & PaginationOptions & SortOptions;

export type PaginationOptions = {
  limit?: number;
  offset?: number;
};

export type SortOptions = {
  sortOrder?: SortOrder;
  sortField?: GetWordListSortValue;
};

/*
  Replace Word
*/
export type ReplaceWordOptions = Pick<Word, 'wordId'> & InsertWordsOptions;

/*
  Delete Word
*/
export type DeleteWordOptions = Pick<Word, 'wordId'> & Pick<Dictionary, 'dictionaryId'>;

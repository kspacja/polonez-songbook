import { useContext } from 'react';
import { MatchInfo } from 'minisearch';
import HighlightContext from '../highlightText';

export interface SearchResultReturnValue {
  match: MatchInfo;
  terms: string[];
  searchValue: string;
}

export function useSearchResult() {
  const {
    searchResult: { match = {}, terms = [] },
    searchValue = '',
  } = useContext(HighlightContext) || { searchResult: {} };

  return { match, terms, searchValue };
}

import { SearchResult } from 'minisearch';
import { createContext } from 'react';

interface HighlightContext {
  searchResult: SearchResult;
  searchValue: string;
}

export default createContext<HighlightContext>(null);

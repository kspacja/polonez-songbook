import { SearchResult } from 'minisearch';

export default function getDefaultResultItem<T>(item: T) {
  return {
    item,
    searchResult: {} as SearchResult,
  };
}

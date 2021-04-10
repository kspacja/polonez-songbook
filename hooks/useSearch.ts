import { useCallback, useState, useMemo } from 'react';
import MiniSearch, { SearchResult } from 'minisearch';
import { debounce } from 'lodash';

export interface ListItem<T> {
  searchResult: SearchResult;
  item: T;
}

function shouldSearch(value: string) {
  return value.length > 2;
}

export default function useSearch<T>(
  searchInstance: MiniSearch<T>,
  mapResultToListItem: (SearchResult) => ListItem<T>,
  defaultList: ListItem<T>[]
): [ListItem<T>[], (value) => void, boolean, string] {
  const [searchInProgress, setSearchInProgress] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const searchFor = useCallback(
    debounce(
      (value: string) => {
        if (shouldSearch(value)) {
          setSearchResult(searchInstance.search(value));
        } else {
          setSearchResult([]);
        }
        setSearchInProgress(false);
      },
      300,
      { leading: true }
    ),
    []
  );

  const foundList = useMemo(() => searchResult.map(mapResultToListItem), [
    searchValue,
    searchResult,
  ]);

  const list =
    shouldSearch(searchValue) && (!searchInProgress || foundList.length > 0)
      ? foundList
      : defaultList;

  const handleChange = useCallback(
    (value) => {
      setSearchInProgress(true);
      setSearchValue(value);
      searchFor(value);
    },
    [setSearchInProgress, setSearchValue, searchFor]
  );

  return [list, handleChange, searchInProgress, searchValue];
}

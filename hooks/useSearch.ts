import { useCallback, useState, useMemo, useEffect } from 'react';
import MiniSearch, { SearchResult } from 'minisearch';
import { debounce } from 'lodash';

declare global {
  interface Window {
    gtag: (...args: any[]) => any;
  }
}

export interface ListItem<T> {
  searchResult: SearchResult;
  item: T;
}

export interface GAListItem {
  item_id?: string;
  item_name?: string;
}

function shouldSearch(value: string) {
  return value.length > 2;
}

export default function useSearch<T>(
  searchInstance: MiniSearch<T>,
  mapResultToListItem: (SearchResult) => ListItem<T>,
  defaultList: ListItem<T>[],
  mapResultToGAListItem: (SearchResult) => GAListItem
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

  useEffect(() => {
    if (shouldSearch(searchValue)) {
      window.gtag('event', 'view_item_list', {
        search_term: searchValue,
        items: searchResult.map((item: SearchResult) => ({
          ...mapResultToGAListItem(item),
          search_result_params: JSON.stringify(item),
        })),
      });
    }
  }, [searchResult]);

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

import { useCallback, useState, useMemo, useEffect, useRef } from 'react';
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

const SUSPENDED_LIST_LENGTH = 10;

export function shouldSearch(value: string) {
  return value.length > 2;
}

function useGATracking(
  searchResult: SearchResult[],
  searchValue: string,
  mapResultToGAListItem: (SearchResult) => GAListItem
) {
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
}

function useSuspens<T>(
  foundList: ListItem<T>[],
  searchInProgress: boolean,
  searchValue: string,
  defaultList: ListItem<T>[]
): [list: ListItem<T>[], count: number] {
  const [suspended, setSuspended] = useState(false);
  const lastInProgress = useRef(false);
  const [currentList, setCurrentList] = useState(defaultList);

  const unsus = useCallback(() => {
    setSuspended(false);
  }, [setSuspended]);

  useEffect(() => {
    if (lastInProgress.current && !searchInProgress) {
      setCurrentList(foundList);

      document.addEventListener('scroll', unsus, { once: true });
    }
    lastInProgress.current = searchInProgress;
  }, [foundList, searchInProgress]);

  useEffect(() => {
    if (!shouldSearch(searchValue)) {
      setCurrentList(defaultList);
    }
    setSuspended(true);
  }, [searchValue]);

  useEffect(() => {
    document.addEventListener('scroll', unsus, { once: true });

    return () => {
      document.removeEventListener('scroll', unsus);
    };
  }, []);

  const list = shouldSearch(searchValue) ? currentList : defaultList;

  return [
    list.slice(0, suspended ? SUSPENDED_LIST_LENGTH : list.length),
    list.length,
  ];
}

export default function useSearch<T>(
  searchInstance: MiniSearch<T>,
  mapResultToListItem: (SearchResult) => ListItem<T>,
  defaultList: ListItem<T>[],
  mapResultToGAListItem: (SearchResult) => GAListItem
): [
  list: ListItem<T>[],
  handleChangeSearchValue: (value) => void,
  searchInProgress: boolean,
  searchValue: string,
  listCount: number
] {
  const [searchInProgress, setSearchInProgress] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const searchFor = useCallback(
    debounce((value: string) => {
      setSearchResult(searchInstance.search(value));
      setSearchInProgress(false);
    }, 300),
    []
  );

  useGATracking(searchResult, searchValue, mapResultToGAListItem);

  const foundList = useMemo(() => searchResult.map(mapResultToListItem), [
    searchValue,
    searchResult,
  ]);

  const [suspendedList, count] = useSuspens(
    foundList,
    searchInProgress,
    searchValue,
    defaultList
  );

  const handleChange = useCallback(
    (value) => {
      setSearchValue(value);
      if (shouldSearch(value)) {
        searchFor(value);
        setSearchInProgress(true);
      }
    },
    [setSearchInProgress, setSearchValue, searchFor]
  );

  return [suspendedList, handleChange, searchInProgress, searchValue, count];
}

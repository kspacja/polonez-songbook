import { useCallback, useState, useMemo } from 'react';
import { SearchResult } from 'minisearch';
import { debounce } from 'lodash';
import allSongwriters, { songwritersSearch, songwritersMap } from 'songwriters';
import { Container, SearchInput, Loader } from './styles';
import { SongwriterCard } from 'components/Songwriter';
import HighlightTextContext from 'contexts/highlightText';

const songwriters = allSongwriters.map((songwriter) => {
  return {
    songwriter,
    searchResult: {} as SearchResult,
  };
});

function shouldSearch(value: string) {
  return value.length > 2;
}

export default function Home() {
  const [searchInProgress, setSearchInProgress] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResult[]>([]);
  const searchFor = useCallback(
    debounce(
      (value: string) => {
        if (shouldSearch(value)) {
          setSearchResult(songwritersSearch.search(value));
        }
        setSearchInProgress(false);
      },
      300,
      { leading: true }
    ),
    []
  );

  const foundSongwriters = useMemo(
    () =>
      searchResult.map((searchResult) => {
        return {
          songwriter: songwritersMap[searchResult.slug],
          searchResult,
        };
      }),
    [searchValue, searchResult]
  );

  console.log(searchResult);

  const list = shouldSearch(searchValue) ? foundSongwriters : songwriters;

  return (
    <Container>
      <SearchInput
        type="text"
        onChange={(event) => {
          const { value } = event.target;
          setSearchInProgress(true);
          setSearchValue(value);
          searchFor(value);
        }}
        placeholder="Odszukaj po nazwisku lub esensjonalnej piosence..."
      />
      <Loader $loading={searchInProgress} />
      {list.map(({ songwriter, searchResult }) => (
        <HighlightTextContext.Provider
          key={songwriter.slug}
          value={{ searchResult, searchValue }}
        >
          <SongwriterCard songwriter={songwriter} />
        </HighlightTextContext.Provider>
      ))}
      {list.length === 0 && 'No, nie udało się nic znaleźć'}
    </Container>
  );
}

import { SearchResult } from 'minisearch';
import allSongwriters, { songwritersSearch, songwritersMap } from 'songwriters';
import getDefaultResultItem from 'utils/getDefaultResultItem';

import { SongwriterCard } from 'components/Songwriter';
import HighlightTextContext from 'contexts/highlightText';
import useSearch from 'hooks/useSearch';

import { Container, SearchInput, Loader } from './styles';

const songwriters = allSongwriters.map(getDefaultResultItem);

function mapResultToSongwriter(searchResult) {
  return {
    item: songwritersMap[searchResult.slug],
    searchResult,
  };
}

function mapResultToGA(searchResult: SearchResult) {
  return {
    item_id: searchResult.slug,
  };
}

export default function Home() {
  const [list, handleChange, searchInProgress, searchValue] = useSearch(
    songwritersSearch,
    mapResultToSongwriter,
    songwriters,
    mapResultToGA
  );

  return (
    <Container>
      <SearchInput
        type="text"
        onChange={(event) => {
          const { value } = event.target;
          handleChange(value);
        }}
        data-tip="Jeśli szukasz całego wyrazenia, zamknij je w cudzysłów"
        placeholder="Odszukaj po nazwisku lub esensjonalnej piosence..."
      />
      <Loader $loading={searchInProgress} />
      {list.map(({ item: songwriter, searchResult }) => (
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

import React from 'react';
import { SearchResult } from 'minisearch';
import allSongwriters, { songwritersSearch, songwritersMap } from 'songwriters';
import getDefaultResultItem from 'utils/getDefaultResultItem';

import { SongwriterCard } from 'components/Songwriter';
import HighlightTextContext from 'contexts/highlightText';
import useSearch from 'hooks/useSearch';

import { Container, SearchInput, Loader, Counter } from './styles';

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
  const [
    list,
    handleChange,
    searchInProgress,
    searchValue,
    listCount,
  ] = useSearch(
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
      <Counter>(Długość listy: {listCount})</Counter>
      {list.map(({ item: songwriter, searchResult }) => (
        <HighlightTextContext.Provider
          key={songwriter.slug}
          value={{
            searchResult,
            searchValue: searchValue.length > 2 ? searchValue : '',
          }}
        >
          <SongwriterCard songwriter={songwriter} />
        </HighlightTextContext.Provider>
      ))}
      {listCount === 0 && 'No, nie udało się nic znaleźć'}
    </Container>
  );
}

import React from 'react';
import { SearchResult } from 'minisearch';
import allSongwriters, { songwritersMap } from 'songwriters';
import { songwritersSearch } from 'songwriters/search';
import getDefaultResultItem from 'utils/getDefaultResultItem';

import SearchInput from 'components/SearchInput';
import { SongwriterCard } from 'components/Songwriter';
import HighlightTextContext from 'contexts/highlightText';
import useSearch from 'hooks/useSearch';

import { Container, Loader } from './styles';

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

function SongwriterWithContext({ songwriter, searchResult, searchValue }) {
  return (
    <HighlightTextContext.Provider
      value={{
        searchResult,
        searchValue: searchValue.length > 2 ? searchValue : '',
      }}
    >
      <SongwriterCard songwriter={songwriter} />
    </HighlightTextContext.Provider>
  );
}

export default function Home() {
  const [list, handleChange, searchInProgress, searchValue, listCount] =
    useSearch(
      songwritersSearch,
      mapResultToSongwriter,
      songwriters,
      mapResultToGA
    );

  console.log(list.length);

  return (
    <Container>
      <SearchInput
        value={searchValue}
        handleChange={handleChange}
        tipText="Jeśli szukasz całego wyrazenia, zamknij je w cudzysłów"
        placeholder="Odszukaj po nazwisku lub esensjonalnej piosence..."
      />
      <Loader $loading={searchInProgress} />
      {list.map(({ item: songwriter, searchResult }) => (
        <SongwriterWithContext
          key={songwriter.slug}
          songwriter={songwriter}
          searchResult={searchResult}
          searchValue={searchValue}
        />
      ))}
      {listCount === 0 && 'No, nie udało się nic znaleźć'}
    </Container>
  );
}

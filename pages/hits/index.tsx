import { useState } from 'react';

import allHits, { hitsSearch } from 'hits';

import getDefaultResultItem from 'utils/getDefaultResultItem';
import { HitSong } from 'types';
import { SongHead } from 'components/Song';
import { Button, AccordionContent } from 'components/styled';
import Breadcrumbs from 'components/Breadcrumbs';
import { Container, SearchInput, Loader } from 'pages/styles';
import useSearch from 'hooks/useSearch';
import HighlightTextContext from 'contexts/highlightText';

import { List, Description } from './styles';

const hits = allHits.map(getDefaultResultItem);

function mapResult(searchResult) {
  return {
    item: searchResult,
    searchResult,
  };
}

export default function SongwriterView() {
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const [
    list,
    handleChange,
    searchInProgress,
    searchValue,
  ] = useSearch<HitSong>(hitsSearch, mapResult, hits);

  return (
    <Container>
      <Breadcrumbs
        path={[{ href: '/', text: 'Strona główna' }, { text: 'Strzały w 10' }]}
      />

      <Description>
        <Button onClick={() => setDescriptionOpen((isOpen) => !isOpen)}>
          Czym są Strzały w 10?
        </Button>
        <AccordionContent $maxHeight={300} $isOpen={descriptionOpen}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionContent>
      </Description>

      <SearchInput
        type="text"
        onChange={(event) => {
          const { value } = event.target;
          handleChange(value);
        }}
        placeholder="Odszukaj po songwriterze, wykonawcy czy piosence..."
      />
      <Loader $loading={searchInProgress} />

      <List>
        {list.map(({ item, searchResult }) => {
          return (
            <HighlightTextContext.Provider
              key={item.mediaUrl}
              value={{ searchResult, searchValue }}
            >
              <SongHead song={item} />
            </HighlightTextContext.Provider>
          );
        })}

        {list.length === 0 && 'No, nie udało się nic znaleźć'}
      </List>
    </Container>
  );
}

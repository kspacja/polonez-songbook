import { useState } from 'react';
import Link from 'next/link';

import { Songwriter } from 'types';
import { useSearchResult } from 'contexts/highlightText/hooks';
import { hasMatch } from 'contexts/highlightText/utils';

import PlaylistSongs from 'components/PlaylistSongs';
import { SongwriterThumbnail } from 'components/Songwriter';
import { SongHead } from 'components/Song';

import HighlightText from 'contexts/highlightText/component';

import {
  Container,
  Name,
  TopList,
  ShortTop,
  HeadContainer,
  AccordionButton,
} from './styles';

type CardProps = {
  songwriter: Songwriter;
};

/*
 * @TODO:
 * 1. Refactor playlists songs list
 * 3. Refactor highlighting
 */
export default function Card({ songwriter }: CardProps) {
  const [isTopListOpen, setIsTopListOpen] = useState<boolean>(false);
  const searchResult = useSearchResult();
  const hasTopsMatch = hasMatch(searchResult, 'tops');
  const hasNameMatch = hasMatch(searchResult, 'name');
  const hasPlaylistsSongsMatch = hasMatch(searchResult, 'playlistsSongs');

  return (
    <Container>
      <HeadContainer>
        <SongwriterThumbnail songwriter={songwriter} size={75} />
        <div style={{ flex: 2 }}>
          <Link href={`/songwriter/${songwriter.slug}`} passHref>
            <Name>
              <HighlightText>{songwriter.name}</HighlightText>
            </Name>
          </Link>
          <AccordionButton
            onClick={() => setIsTopListOpen((isOpen) => !isOpen)}
          >
            Esensjonalne piosenki
          </AccordionButton>
        </div>
      </HeadContainer>
      <ShortTop $isOpen={isTopListOpen || (!hasNameMatch && hasTopsMatch)}>
        <TopList>
          {songwriter.tops.map((song) => {
            return (
              <li key={song.mediaUrl}>
                <SongHead song={song} />
              </li>
            );
          })}
        </TopList>
      </ShortTop>
      {!hasNameMatch && hasPlaylistsSongsMatch && (
        <PlaylistSongs playlistsSongs={songwriter.playlistsSongs} />
      )}
    </Container>
  );
}

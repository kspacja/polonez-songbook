import { useLayoutEffect, useState } from 'react';
import { Transition } from 'react-spring';
import Link from 'next/link';

import { Songwriter } from 'types';
import { useSearchResult } from 'contexts/highlightText/hooks';
import { hasMatch } from 'contexts/highlightText/utils';
import HighlightText from 'contexts/highlightText/component';

import isSongwriterInProgress from 'utils/isSongwriterInProgress';

import PlaylistSongs from 'components/PlaylistSongs';
import { SongwriterThumbnail } from 'components/Songwriter';
import { SongHead } from 'components/Song';
import { Button, AccordionContent } from 'components/styled';

import { Container, Name, TopList, HeadContainer, Inprogress } from './styles';

type CardProps = {
  songwriter: Songwriter;
};

export default function Card({ songwriter }: CardProps) {
  const [isTopListOpen, setIsTopListOpen] = useState<boolean>(false);
  const searchResult = useSearchResult();
  const hasTopsMatch = hasMatch(searchResult, 'tops');
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
          {!isSongwriterInProgress(songwriter) ? (
            <Button onClick={() => setIsTopListOpen((isOpen) => !isOpen)}>
              Esensjonalne piosenki
            </Button>
          ) : (
            <Inprogress>Trwają prace...</Inprogress>
          )}
        </div>
      </HeadContainer>
      <Transition
        items={isTopListOpen || hasTopsMatch}
        from={{ maxHeight: 0 }}
        enter={{ maxHeight: 350 }}
        leave={{ maxHeight: 0 }}
      >
        {(style, item) =>
          item && (
            <AccordionContent style={{ maxHeight: style.maxHeight }}>
              <TopList>
                {songwriter.tops.map((song) => {
                  return (
                    <li key={song.mediaUrl}>
                      <SongHead song={song} />
                    </li>
                  );
                })}
              </TopList>
            </AccordionContent>
          )
        }
      </Transition>
      {hasPlaylistsSongsMatch && <PlaylistSongs songwriter={songwriter} />}
    </Container>
  );
}

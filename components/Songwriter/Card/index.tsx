import { useState, useContext } from 'react';
import { Songwriter } from 'types';
import { SongwriterThumbnail } from 'components/Songwriter';
import { SongHead } from 'components/Song';
import HighlightContext from 'contexts/highlightText';
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

function hasMatch(path: string) {
  const {
    searchResult: { match = {}, terms = [] },
  } = useContext(HighlightContext) || { searchResult: {} };

  return terms.some((term) => {
    return match[term].includes(path);
  });
}

export default function Card({ songwriter }: CardProps) {
  const [isTopListOpen, setIsTopListOpen] = useState<boolean>(false);
  const hasTopsMatch = hasMatch('tops');

  return (
    <Container>
      <HeadContainer>
        <SongwriterThumbnail songwriter={songwriter} size={75} />
        <div style={{ flex: 2 }}>
          <Name href={`/songwriter/${songwriter.slug}`}>
            <HighlightText path="name">{songwriter.name}</HighlightText>
          </Name>
          <AccordionButton
            onClick={() => setIsTopListOpen((isOpen) => !isOpen)}
          >
            Esensjonalne piosenki
          </AccordionButton>
        </div>
      </HeadContainer>
      <ShortTop $isOpen={isTopListOpen || hasTopsMatch}>
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
    </Container>
  );
}

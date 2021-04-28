import React from 'react';
import { Song, HitSong } from 'types';

import icons from 'icons/_mediaIcons';
import useTooltip from 'hooks/useTooltip';
import getMediaName from 'utils/getMediaName';
import HighlightText from 'contexts/highlightText/component';
import { SongArtistAndTitle } from '../index';

import { Container, Title, Icon, Songwriter, Lyrics } from './styles';

type HeadProps = {
  song: Song | HitSong;
};

export default function Head({ song }: HeadProps) {
  useTooltip();
  const { mediaUrl, songwriter, lyrics, year } = song as HitSong;
  const mediaName = getMediaName(mediaUrl);
  const IconComp = icons[mediaName];

  return (
    <Container>
      {songwriter && (
        <Songwriter>
          <HighlightText>{songwriter}:</HighlightText>
        </Songwriter>
      )}
      <a href={mediaUrl || '#'} target="_blank" rel="noopener noreferrer">
        <SongArtistAndTitle song={song} TitleComp={Title} />{' '}
        {year && <HighlightText>({String(year)})</HighlightText>}
      </a>
      {IconComp && (
        <Icon data-tip={mediaName}>
          <IconComp size={21} />
        </Icon>
      )}
      {lyrics && (
        <Lyrics>
          sł: <HighlightText>{lyrics}</HighlightText>
        </Lyrics>
      )}
    </Container>
  );
}

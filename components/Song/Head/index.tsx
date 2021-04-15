import React from 'react';
import { Song, HitSong } from 'types';

import icons from 'icons/_mediaIcons';
import getMediaName from 'utils/getMediaName';
import HighlightText from 'contexts/highlightText/component';
import { SongArtistAndTitle } from '../index';

import { Container, Title, Icon, Songwriter } from './styles';

type HeadProps = {
  song: Song | HitSong;
};

export default function Head({ song }: HeadProps) {
  const { mediaUrl, songwriter } = song as HitSong;
  const IconComp = icons[getMediaName(mediaUrl)];

  return (
    <Container>
      {songwriter && (
        <Songwriter>
          <HighlightText>{songwriter}:</HighlightText>
        </Songwriter>
      )}
      <a href={mediaUrl} target="_blank" rel="noopener noreferrer">
        <SongArtistAndTitle song={song} TitleComp={Title} />
      </a>
      <Icon>
        <IconComp size={21} />
      </Icon>
    </Container>
  );
}

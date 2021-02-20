import React from 'react';
import { Song } from 'types';

import icons from 'icons/_mediaIcons';
import getMediaName from 'utils/getMediaName';
import { SongArtistAndTitle } from '../index';

import { Container, Title, Icon } from './styles';

type HeadProps = {
  song: Song;
};

export default function Head({ song }: HeadProps) {
  const { mediaUrl } = song;
  const IconComp = icons[getMediaName(mediaUrl)];

  return (
    <Container>
      <a href={mediaUrl} target="_blank" rel="noopener noreferrer">
        <SongArtistAndTitle song={song} TitleComp={Title} />
      </a>
      <Icon>
        <IconComp size={21} />
      </Icon>
    </Container>
  );
}

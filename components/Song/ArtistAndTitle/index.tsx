import React from 'react';
import { Song } from 'types';
import { getArtistWithSeparator } from 'utils/getArtistAndTitle';
import HighlightText from 'contexts/highlightText/component';

type ArtistAndTitleProps = {
  song: Song;
  TitleComp?: React.ComponentType;
};

export default function ArtistAndTitle({
  song: { artist, title },
  TitleComp = React.Fragment,
}: ArtistAndTitleProps) {
  return (
    <>
      <HighlightText>{getArtistWithSeparator(artist)}</HighlightText>
      <TitleComp>
        <HighlightText>{title}</HighlightText>
      </TitleComp>
    </>
  );
}

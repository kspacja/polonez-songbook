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
      <HighlightText path="tops">
        {getArtistWithSeparator(artist)}
      </HighlightText>
      <TitleComp>
        <HighlightText path="tops">{title}</HighlightText>
      </TitleComp>
    </>
  );
}

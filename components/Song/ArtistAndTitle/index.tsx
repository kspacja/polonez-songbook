import React from 'react';
import { Song } from 'types';

type ArtistAndTitleProps = {
  song: Song;
  TitleComp?: React.ComponentType;
};

function getArtistWithSeparator(artist: Song['artist']) {
  return `${artist}: `;
}

export function getArtistAndTitle({ artist, title }: Song) {
  return `${getArtistWithSeparator(artist)}${title}`;
}

export default function ArtistAndTitle({
  song: { artist, title },
  TitleComp = React.Fragment,
}: ArtistAndTitleProps) {
  return (
    <>
      {getArtistWithSeparator(artist)}
      <TitleComp>{title}</TitleComp>
    </>
  );
}

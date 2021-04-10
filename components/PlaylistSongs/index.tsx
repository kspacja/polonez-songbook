import React, { useMemo } from 'react';
import HighlightText from 'contexts/highlightText/component';
import { AlbumTrack, Songwriter } from 'types';
import { useSearchResult } from 'contexts/highlightText/hooks';

import {
  PlaylistSongList,
  PlaylistSongListHeader,
  PlaylistSong,
} from './styles';

import getHighlightRanges from 'contexts/highlightText/getHighlightsRanges';

export interface PlaylistSongsProps {
  songwriter: Songwriter;
}

export default function PlaylistSongs({ songwriter }: PlaylistSongsProps) {
  const { searchValue, terms } = useSearchResult();

  const songsWithHighlightRanges = useMemo(
    () =>
      songwriter.playlistsSongs
        .map(({ artist, title, album }: AlbumTrack) => ({
          titleAndAlbum: `${title} (${album})`,
          artist,
        }))
        .map(({ artist, titleAndAlbum }) => ({
          artist,
          titleAndAlbum,
          artistHighlightRanges:
            artist !== songwriter.name
              ? getHighlightRanges(artist, searchValue, terms)
              : [],
          highlightRanges: getHighlightRanges(
            titleAndAlbum,
            searchValue,
            terms
          ),
        }))
        .filter(
          ({ highlightRanges, artistHighlightRanges }) =>
            highlightRanges.length > 0 || artistHighlightRanges.length > 0
        ),
    [searchValue]
  );

  return (
    <PlaylistSongList>
      {songsWithHighlightRanges.length > 0 && (
        <PlaylistSongListHeader>
          Znalezione w playlistach:
        </PlaylistSongListHeader>
      )}
      {songsWithHighlightRanges.map(
        (
          { titleAndAlbum, highlightRanges, artist, artistHighlightRanges },
          index
        ) => (
          <PlaylistSong key={`${titleAndAlbum}-${index}`}>
            <HighlightText highlightRanges={artistHighlightRanges}>
              {artist}:{' '}
            </HighlightText>
            <HighlightText highlightRanges={highlightRanges}>
              {titleAndAlbum}
            </HighlightText>
          </PlaylistSong>
        )
      )}
    </PlaylistSongList>
  );
}

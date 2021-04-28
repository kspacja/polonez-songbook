import React, { useMemo } from 'react';
import HighlightText from 'contexts/highlightText/component';
import { AlbumTrack, Songwriter } from 'types';
import { useSearchResult } from 'contexts/highlightText/hooks';

import {
  PlaylistSongList,
  PlaylistSongListHeader,
  PlaylistSong,
  Info,
} from './styles';

import getHighlightRanges from 'contexts/highlightText/getHighlightsRanges';
import useTooltip from 'hooks/useTooltip';

export interface PlaylistSongsProps {
  songwriter: Songwriter;
}

export default function PlaylistSongs({ songwriter }: PlaylistSongsProps) {
  useTooltip();

  const { searchValue, terms } = useSearchResult();

  const songsWithHighlightRanges = useMemo(
    () =>
      songwriter.playlistsSongs
        .map(({ artist, title, album, year }: AlbumTrack) => ({
          titleAndAlbum: `${title} (${album})`,
          artist,
          year,
        }))
        .map(({ artist, titleAndAlbum, year }) => ({
          artist,
          year,
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
          Znalezione w playlistach:{' '}
          <Info data-tip="Piosenki na tej liście pochodzą ze spotify. <br/>Dla tego tez brakuje autorów słów, a lata mogą niedokładne">
            [info]
          </Info>
        </PlaylistSongListHeader>
      )}
      {songsWithHighlightRanges.map(
        (
          {
            titleAndAlbum,
            highlightRanges,
            artist,
            artistHighlightRanges,
            year,
          },
          index
        ) => (
          <PlaylistSong key={`${titleAndAlbum}-${index}`}>
            <HighlightText highlightRanges={artistHighlightRanges}>
              {artist}:{' '}
            </HighlightText>
            <HighlightText highlightRanges={highlightRanges}>
              {titleAndAlbum}
            </HighlightText>
            {year && ` [${year}]`}
          </PlaylistSong>
        )
      )}
    </PlaylistSongList>
  );
}

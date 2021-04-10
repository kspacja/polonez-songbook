import React, { useMemo } from 'react';
import HighlightText from 'contexts/highlightText/component';
import { AlbumTrack } from 'types/index';
import { useSearchResult } from 'contexts/highlightText/hooks';

import {
  PlaylistSongList,
  PlaylistSongListHeader,
  PlaylistSong,
} from './styles';
import getHighlightRanges from 'contexts/highlightText/getHighlightsRanges';

export interface PlaylistSongsProps {
  playlistsSongs: AlbumTrack[];
}

export default function PlaylistSongs({ playlistsSongs }: PlaylistSongsProps) {
  const { searchValue, terms } = useSearchResult();

  const songsWithHighlightRanges = useMemo(
    () =>
      playlistsSongs
        .map(
          ({ artist, title, album }: AlbumTrack) =>
            `${artist}: ${title} (${album})`
        )
        .map((text) => ({
          text,
          highlightRanges: getHighlightRanges(text, searchValue, terms),
        }))
        .filter(({ highlightRanges }) => highlightRanges.length > 0),
    [searchValue, playlistsSongs]
  );

  return (
    <PlaylistSongList>
      <PlaylistSongListHeader>Znalezione w playlistach:</PlaylistSongListHeader>
      {songsWithHighlightRanges.map(({ text, highlightRanges }, index) => (
        <PlaylistSong key={`${text}-${index}`}>
          <HighlightText highlightRanges={highlightRanges}>
            {text}
          </HighlightText>
        </PlaylistSong>
      ))}
    </PlaylistSongList>
  );
}

import { Song, Playlist } from 'types';
import { getArtistAndTitle } from 'components/Song/ArtistAndTitle';

import MediaWidget from './MediaWidget';

type FactoryProps = {
  getUrl: (id: string) => string;
  pattern: RegExp;
  addonAttrs: {
    [name: string]: string | boolean;
  };
};

type SongWidgetProps = {
  song: Song;
};

export function SongWidgetFactory({
  getUrl,
  pattern,
  addonAttrs,
}: FactoryProps) {
  return function Widget({ song }: SongWidgetProps) {
    const title = getArtistAndTitle(song);

    return (
      <MediaWidget
        mediaUrl={song.mediaUrl}
        pattern={pattern}
        getSrcUrl={getUrl}
        title={title}
        iframeAttrs={{
          title,
          width: '100%',
          height: '80',
          ...addonAttrs,
        }}
      />
    );
  };
}

type PlaylistWidgetProps = {
  playlist: Playlist;
};

export function PlaylistWidgetFactory({
  getUrl,
  pattern,
  addonAttrs,
}: FactoryProps) {
  return function Widget({ playlist }: PlaylistWidgetProps) {
    return (
      <MediaWidget
        mediaUrl={playlist.mediaUrl}
        pattern={pattern}
        getSrcUrl={getUrl}
        iframeAttrs={{
          title: `Playlista ${playlist.name} stworzona ${playlist.author}`,
          width: '100%',
          height: '500',
          ...addonAttrs,
        }}
      />
    );
  };
}

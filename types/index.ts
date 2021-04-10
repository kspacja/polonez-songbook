export interface Track {
  artist: string;
  title: string;
}

export interface Song extends Track {
  mediaUrl: string;
}

export interface AlbumTrack extends Track {
  album: string;
}

export interface Playlist {
  author: string;
  mediaUrl: string;
  name: string;
}

export interface Songwriter {
  name: string;
  slug: string;
  tops: Song[];
  playlists: Playlist[];
  description: string;
  playlistsSongs: AlbumTrack[];
}

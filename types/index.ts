export interface Track {
  artist: string;
  title: string;
  lyrics?: string;
  year?: number | string;
}

export interface Song extends Track {
  mediaUrl: string;
}

export interface AlbumTrack extends Track {
  album: string;
}

export interface HitSong extends Song {
  id: string;
  songwriter: string;
}

export interface Playlist {
  author: string;
  mediaUrl: string;
  name: string;
}

export interface Songwriter {
  id: string;
  name: string;
  slug: string;
  tops: Song[];
  playlists: Playlist[];
  description: string | string[];
  playlistsSongs: AlbumTrack[];
}

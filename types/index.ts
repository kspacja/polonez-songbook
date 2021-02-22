export type Song = {
  artist: string;
  title: string;
  mediaUrl: string;
};

export type Playlist = {
  author: string;
  mediaUrl: string;
  name: string;
};

export type Songwriter = {
  name: string;
  slug: string;
  tops: Song[];
  playlists: Playlist[];
  description: string;
};

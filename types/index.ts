export type Song = {
  artist: string;
  title: string;
  link: string;
};

export type Songwriter = {
  name: string;
  tops: Song[];
};

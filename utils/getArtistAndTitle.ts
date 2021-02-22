import { Song } from 'types';

export function getArtistWithSeparator(artist: Song['artist']) {
  return `${artist}: `;
}

export default function getArtistAndTitle({ artist, title }: Song) {
  return `${getArtistWithSeparator(artist)}${title}`;
}

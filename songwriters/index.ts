import snakeCase from 'lodash/snakeCase';
import MiniSearch from 'minisearch';
import getPhrases from 'utils/getPhrases';
import { Songwriter, Song } from 'types';
import spotifyPlaylists from './spotify-playlists.auto.json';
import getTokens from 'utils/getTokens';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const songwritersFile = require.context('./', true, /^\.\/[^.]+\.json$/);

const songwriters: Songwriter[] = songwritersFile
  .keys()
  .map((file) => {
    return songwritersFile(file);
  })
  .map((writer) => {
    const slug = snakeCase(writer.name);
    return {
      ...writer,
      id: slug,
      slug: slug,
      playlistsSongs: spotifyPlaylists[slug],
    };
  })
  .sort((swA, swB) => {
    return swA.name.localeCompare(swB.name);
  });

export default songwriters;

export const songwritersMap: {
  [key: string]: Songwriter;
} = songwriters.reduce(
  (map, writer) => ({
    ...map,
    [writer.slug]: writer,
  }),
  {}
);

const splitTops = /; |;/g;

export const songwritersSearch = new MiniSearch({
  fields: ['name', 'tops', 'playlistsSongs'],
  storeFields: ['slug'],
  tokenize: (text: string, fieldName) => {
    const tokens = getTokens(text);
    switch (fieldName) {
      case 'name':
        return [...tokens, text];
      case 'tops':
      case 'playlistsSongs':
        return [...tokens, ...text.split(splitTops)];
      default:
        return tokens;
    }
  },
  searchOptions: {
    boost: { name: 2 },
    prefix: true,
    fuzzy: 0.15,
    tokenize: getPhrases,
  },
  extractField: (document: Songwriter, fieldName) => {
    switch (fieldName) {
      case 'tops':
        return document.tops
          .map((song: Song) => {
            return `${song.artist};${song.title};${song.lyrics}`;
          })
          .join('; ');
      case 'playlistsSongs':
        return document.playlistsSongs
          .map(({ artist, title, album }) => `${artist};${title};${album}`)
          .join('; ');
      default:
        return document[fieldName];
    }
  },
});

songwritersSearch.addAll(songwriters);

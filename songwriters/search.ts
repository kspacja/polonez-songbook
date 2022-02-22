import MiniSearch from 'minisearch';
import getPhrases from 'utils/getPhrases';
import { Songwriter, Song } from 'types';
import getTokens from 'utils/getTokens';

import songwriters from 'songwriters';

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
    boost: { name: 10 },
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
          ?.map(({ artist, title, album }) => `${artist};${title};${album}`)
          .join('; ');
      default:
        return document[fieldName];
    }
  },
});

songwritersSearch.addAll(songwriters);

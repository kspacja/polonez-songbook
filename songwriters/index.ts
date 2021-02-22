import snakeCase from 'lodash/snakeCase';
import MiniSearch from 'minisearch';
import { Songwriter } from 'types';
import getArtistAndTitle from 'utils/getArtistAndTitle';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const songwritersFile = require.context('./', true, /\.json$/);

const songwriters: Songwriter[] = songwritersFile
  .keys()
  .map((file) => {
    return songwritersFile(file);
  })
  .map((writer) => ({
    ...writer,
    id: snakeCase(writer.name),
    slug: snakeCase(writer.name),
  }));

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

export const songwritersSearch = new MiniSearch({
  fields: ['name', 'tops'],
  storeFields: ['slug'],
  searchOptions: {
    boost: { name: 2 },
    combineWith: 'AND',
    prefix: true,
    fuzzy: 0.3,
  },
  extractField: (document: Songwriter, fieldName) => {
    switch (fieldName) {
      case 'tops':
        return document.tops.map(getArtistAndTitle).join('; ');
      default:
        return document[fieldName];
    }
  },
});

songwritersSearch.addAll(songwriters);

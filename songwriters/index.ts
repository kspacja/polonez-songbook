import snakeCase from 'lodash/snakeCase';
import { Songwriter } from 'types';

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

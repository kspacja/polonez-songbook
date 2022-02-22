import snakeCase from 'lodash/snakeCase';
import { Songwriter, Song } from 'types';
import spotifyPlaylists from './spotify-playlists.auto.json';

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
  // .filter((writer) => isSongwriterInProgress(writer))
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

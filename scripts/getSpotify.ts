import fs from 'fs';
import path from 'path';
import SpotifyWebApi from 'spotify-web-api-node';
import { Songwriter } from '../types';
import isSongwriterInProgress from '../utils/isSongwriterInProgress';

import getMediaName from '../utils/getMediaName';

const spotifyApi = new SpotifyWebApi({
  clientId: '00cc042d6fbf4d1d9b1fa460afb216e4',
  clientSecret: '47ddf0bb420e4658a79fe38b8f6cb2a1',
});

const songwritersDir = path.join(__dirname, '../songwriters');
const mainLabel = 'Complated in';

async function main() {
  console.log('Getting spotify playlists...');
  console.time(mainLabel);
  const playlists = fs
    .readdirSync(songwritersDir)
    .filter((file) => file.match(/(?<!\.auto)\.json$/))
    .map((file) => ({
      file,
      fileContent: fs.readFileSync(path.join(songwritersDir, file), {
        encoding: 'utf-8',
      }),
    }))
    .map(({ file, fileContent }) => {
      const songwriter = JSON.parse(fileContent) as Songwriter;

      return {
        slug: file.replace(/\.json/, ''),
        playlists: songwriter.playlists,
        inProgress: isSongwriterInProgress(songwriter),
      };
    })
    .reduce((playlistsWithSlug, { playlists, slug, inProgress }) => {
      return [
        ...playlistsWithSlug,
        ...playlists.map((pl) => ({ url: pl.mediaUrl, slug, inProgress })),
      ];
    }, [])
    .filter(
      ({ url, inProgress }) => getMediaName(url) === 'spotify' && !inProgress
    )
    .map(({ slug, url }) => ({
      slug,
      playlistId: url.replace(/(.+)\/([^/]+)$/, '$2'),
    }));

  const data = await spotifyApi.clientCredentialsGrant();

  console.log('The access token expires in ' + data.body['expires_in']);
  console.log('The access token is ' + data.body['access_token']);

  // Save the access token so that it's used in future calls
  spotifyApi.setAccessToken(data.body['access_token']);

  const playlistTracksMap = {};

  for (const { slug, playlistId } of playlists) {
    const label = `Playlist: ${slug}(${playlistId})`;
    console.time(label);
    const playlistTracksResponse = await spotifyApi.getPlaylistTracks(
      playlistId
    );
    console.timeEnd(label);

    const playlistTracksResponseBody = playlistTracksResponse.body;

    const items =
      playlistTracksResponseBody.items ||
      playlistTracksResponseBody.tracks.items;

    const playlistTracks = items
      .map(({ track: { name, album, artists } }) => ({
        name,
        album: album.name,
        year: album.release_date.replace(/-\d{2}-\d{2}/, ''),
        artist: artists.map(({ name }) => name).join('; '),
      }))
      .map(({ artist, name, album, year }) => ({
        artist,
        year: Number(year),
        title: name,
        album: album
          .replace('- 2011 Remaster ', '')
          .replace('- 2011 Remastered Version ', ''),
      }));

    if (!playlistTracksMap[slug]) {
      playlistTracksMap[slug] = [];
    }

    playlistTracksMap[slug].push(...playlistTracks);
  }

  const fileName = path.join(songwritersDir, 'spotify-playlists.auto.json');
  const fileNameSavingLabel = `Saving to ${fileName}`;
  console.time(fileNameSavingLabel);
  fs.writeFileSync(fileName, JSON.stringify(playlistTracksMap, null, 2));
  console.timeEnd(fileNameSavingLabel);
  console.timeEnd(mainLabel);
}

main();

export {};

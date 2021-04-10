// eslint-disable-next-line @typescript-eslint/no-var-requires
import fs from 'fs';
import path from 'path';
import SpotifyWebApi from 'spotify-web-api-node';

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
    .map(({ file, fileContent }) => ({
      slug: file.replace(/\.json/, ''),
      playlists: JSON.parse(fileContent).playlists,
    }))
    .reduce((playlistsWithSlug, { playlists, slug }) => {
      return [
        ...playlistsWithSlug,
        ...playlists.map((pl) => ({ url: pl.mediaUrl, slug })),
      ];
    }, [])
    .filter(({ url }) => getMediaName(url) === 'spotify')
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

    const playlistTracks = playlistTracksResponse.body.items
      .map(({ track: { name, album, artists } }) => ({
        name,
        album: album.name,
        artist: artists.map(({ name }) => name).join('; '),
      }))
      .map(({ artist, name, album }) => ({
        artist,
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

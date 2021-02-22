import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';

import { songwritersMap } from 'songwriters';
import MediaWidget from 'components/MediaWidgets';
import { SongwriterThumbnail } from 'components/Songwriter';
import getMediaName from 'utils/getMediaName';

import {
  Name,
  TopsColumn,
  PlaylistColumn,
  TextsColumn,
  Container,
  Text,
  Bar,
  BottomBar,
  ColumnContainer,
  Anchor,
} from './styles';

import Playlists from './playlists';

export default function SongwriterView() {
  const {
    query: { slug },
    isFallback,
    isReady,
  } = useRouter();

  if (isFallback || !isReady) {
    return 'Wczytywanko...';
  }

  const songwriter = songwritersMap[slug as string];

  if (!songwriter) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <Container>
      <Bar>
        <SongwriterThumbnail songwriter={songwriter} size={50} />
        <Name>{songwriter.name}</Name>
      </Bar>

      <BottomBar>
        <ul>
          <li>
            <a href="#tops">Esensja</a>
          </li>
          <li>
            <a href="#playlists">Playlisty</a>
          </li>
          <li>
            <a href="#short-note">Krótka notka</a>
          </li>
          <li>
            <a href="#sth-more">Coś więcej</a>
          </li>
        </ul>
      </BottomBar>

      <ColumnContainer>
        <TopsColumn>
          <h2>Esensja</h2>
          <Anchor id="tops" />
          {songwriter.tops.map((song) => {
            const Widget = MediaWidget.song[getMediaName(song.mediaUrl)];
            return <Widget key={song.mediaUrl} song={song} />;
          })}
        </TopsColumn>

        <PlaylistColumn>
          <h2>Playlisty</h2>
          <Anchor id="playlists" />

          <Playlists playlists={songwriter.playlists} />
        </PlaylistColumn>

        <TextsColumn>
          <h2 id="short-note">Krótka notka</h2>
          <Anchor id="short-note" />
          <Text>{songwriter.description}</Text>
        </TextsColumn>
      </ColumnContainer>
    </Container>
  );
}

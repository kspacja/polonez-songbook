import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';

import { songwritersMap } from 'songwriters';
import MediaWidget from 'components/MediaWidgets';
import Playlists from 'components/Playlists';

import { SongwriterThumbnail } from 'components/Songwriter';
import getMediaName from 'utils/getMediaName';

import {
  Name,
  TopsColumn,
  PlaylistColumn,
  TextsColumn,
  Container,
  Text,
  ColumnContainer,
  Anchor,
  Header,
} from './styles';
import Navigation from 'components/Navigation';

const navigationItems = [
  { href: '#tops', text: 'Esensja' },
  { href: '#playlists', text: 'Playlisty' },
  { href: '#short-note', text: 'Coś jeszcze?' },
];

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
      <Header>
        <SongwriterThumbnail songwriter={songwriter} size={75} />
        <div>
          <Name>{songwriter.name}</Name>
          <a href="#playlists">Playlisty</a> |{' '}
          <a href="#short-note">Coś jeszcze?</a>
        </div>
      </Header>

      <Navigation items={navigationItems} />

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
          <h2 id="short-note">Coś jeszcze</h2>
          <Anchor id="short-note" />
          <Text>{songwriter.description}</Text>
        </TextsColumn>
      </ColumnContainer>
    </Container>
  );
}

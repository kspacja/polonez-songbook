import { useRouter } from 'next/router';
import DefaultErrorPage from 'next/error';

import { songwritersMap } from 'songwriters';
import getMediaName from 'utils/getMediaName';

import Link from 'components/Link';
import MediaWidget from 'components/MediaWidgets';
import Playlists from 'components/Playlists';

import { SongwriterThumbnail } from 'components/Songwriter';
import Breadcrumbs from 'components/Breadcrumbs';
import Navigation from 'components/Navigation';
import Feedback from 'components/Feedback';
import { Container } from 'pages/styles';

import {
  Name,
  TopsColumn,
  PlaylistColumn,
  TextsColumn,
  Text,
  ColumnContainer,
  Anchor,
  Header,
} from './styles';

const FEEDBACK_HINT = (
  <>
    Masz ciekawy artykuł o tym songwriterze, jego płycie, piosence? <br />
    Widzisz błąd, literówkę? Napisz do mnie!
  </>
);

const navigationItems = [
  { href: '#tops', text: 'Esensja' },
  { href: '#playlists', text: 'Playlisty' },
  { href: '#short-note', text: 'Coś jeszcze?' },
];

export default function SongwriterView() {
  const {
    query: { slug },
  } = useRouter();

  const songwriter = songwritersMap[slug as string];

  let description = songwriter.description;
  description =
    typeof description === 'string'
      ? description
      : description.join('\n\n------------\n\n');

  if (!songwriter) {
    return <DefaultErrorPage statusCode={404} />;
  }

  return (
    <Container>
      <Breadcrumbs
        path={[
          { href: '/', text: 'Strona główna' },
          { text: songwriter.name, label: 'Songwriter' },
        ]}
      />
      <Header>
        <SongwriterThumbnail songwriter={songwriter} size={75} />
        <div>
          <Name>{songwriter.name}</Name>
          <Link href="#playlists">Playlisty</Link> |{' '}
          <Link href="#short-note">Coś jeszcze?</Link>
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
          <Text>{description}</Text>
        </TextsColumn>

        <Feedback
          feedbackHint={FEEDBACK_HINT}
          metaData={`[Songwriter: ${songwriter.name}]`}
        />
      </ColumnContainer>
    </Container>
  );
}

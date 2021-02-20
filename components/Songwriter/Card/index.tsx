import { Songwriter } from 'types';
import { SongwriterThumbnail } from 'components/Songwriter';
import { SongHead } from 'components/Song';

import { Container, Name, TopList, ShortTop, Icon } from './styles';

type CardProps = {
  songwriter: Songwriter;
};

export default function Card({ songwriter }: CardProps) {
  return (
    <Container>
      <SongwriterThumbnail songwriter={songwriter} />
      <div>
        <Name href={`/songwriter/${songwriter.slug}`}>{songwriter.name}</Name>
        <ShortTop>
          Esensjonale piosenki:
          <TopList>
            {songwriter.tops.map((song) => {
              return (
                <li key={song.mediaUrl}>
                  <SongHead song={song} />
                </li>
              );
            })}
          </TopList>
        </ShortTop>
      </div>
    </Container>
  );
}

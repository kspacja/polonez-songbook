import songwriters from 'songwriters';
import { Container } from './styles';
import { SongwriterCard } from 'components/Songwriter';

export default function Home() {
  return (
    <Container>
      {songwriters.map((writer) => (
        <SongwriterCard key={writer.name} songwriter={writer} />
      ))}
    </Container>
  );
}

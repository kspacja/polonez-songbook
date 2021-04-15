import Feedback from 'components/Feedback';
import { Container } from 'pages/styles';

export default function About() {
  return (
    <Container>
      <Feedback
        feedbackHint="Widzisz błąd, literówkę? Napisz do mnie!"
        metaData={`[About]`}
      />
    </Container>
  );
}

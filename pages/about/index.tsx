import Feedback from 'components/Feedback';
import { Container } from 'pages/styles';
import Breadcrumbs from 'components/Breadcrumbs';

export default function About() {
  return (
    <Container>
      <Breadcrumbs
        path={[{ href: '/', text: 'Strona główna' }, { text: 'O projekcie' }]}
      />

      <Feedback
        feedbackHint="Widzisz błąd, literówkę? Napisz do mnie!"
        metaData={`[About]`}
      />
    </Container>
  );
}

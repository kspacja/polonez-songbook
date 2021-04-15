import { Container, Loader } from 'pages/styles';

export default function PageLoading() {
  return (
    <>
      <Loader $loading $fixed />
      <Container>
        <h3>Wczytywanko...</h3>
      </Container>
    </>
  );
}

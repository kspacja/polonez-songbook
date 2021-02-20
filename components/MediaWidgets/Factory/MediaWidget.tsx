import { Container, Wrapper } from './styles';

type MediaWidgetProps = {
  mediaUrl: string;
  iframeAttrs?: {
    title: string;
    [name: string]: string | boolean;
  };
  getSrcUrl: (string) => string;
  pattern: RegExp;
  title?: string;
};

export default function MediaWidget({
  mediaUrl,
  pattern,
  getSrcUrl,
  title,
  iframeAttrs,
}: MediaWidgetProps) {
  const match = mediaUrl.match(pattern) || { groups: { id: null } };
  const { id } = match.groups;

  if (id === null) {
    return null;
  }

  return (
    <Wrapper>
      {title}
      <Container>
        <iframe
          title={iframeAttrs.title}
          src={getSrcUrl(id)}
          frameBorder="0"
          {...iframeAttrs}
        />
      </Container>
    </Wrapper>
  );
}

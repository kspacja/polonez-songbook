import HighlightText from 'contexts/highlightText/component';
import { Container, Wrapper, Songwriter } from './styles';

type MediaWidgetProps = {
  mediaUrl: string;
  iframeAttrs?: {
    title: string;
    [name: string]: string | boolean;
  };
  getSrcUrl: (string) => string;
  pattern: RegExp;
  title?: string;
  songwriter?: string;
};

export default function MediaWidget({
  mediaUrl,
  pattern,
  getSrcUrl,
  title,
  songwriter,
  iframeAttrs,
}: MediaWidgetProps) {
  const match = mediaUrl.match(pattern) || { groups: { id: null } };
  const { id } = match.groups;

  if (id === null) {
    return null;
  }

  return (
    <Wrapper>
      <Songwriter>
        <HighlightText>{songwriter}</HighlightText>
      </Songwriter>
      <HighlightText>{title}</HighlightText>{' '}
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

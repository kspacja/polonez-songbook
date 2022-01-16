import HighlightText from 'contexts/highlightText/component';
import { Container, Wrapper, Songwriter, Lyrics } from './styles';

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
  lyrics?: string;
  year?: number | string;
};

export default function MediaWidget({
  mediaUrl,
  pattern,
  getSrcUrl,
  title,
  songwriter,
  year,
  lyrics,
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
      <HighlightText>{title}</HighlightText> {year && `(${year})`}
      {lyrics && <Lyrics>sł: {lyrics}</Lyrics>}
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

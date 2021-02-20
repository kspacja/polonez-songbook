import { ChildrenProp } from 'react-markdown';
import gfm from 'remark-gfm';

import { StyledMarkdown } from './styles';

interface MarkdownProps extends ChildrenProp {
  className?: string;
}

export default function Markdown({ children, className }: MarkdownProps) {
  return (
    // eslint-disable-next-line react/no-children-prop
    <StyledMarkdown children={children} className={className} plugins={[gfm]} />
  );
}

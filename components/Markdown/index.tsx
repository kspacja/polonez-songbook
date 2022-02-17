import gfm from 'remark-gfm';

import { StyledMarkdown } from './styles';

interface MarkdownProps {
  className?: string;
  children: string;
}

export default function Markdown({ children, className }: MarkdownProps) {
  return (
    <StyledMarkdown
      children={children}
      className={className}
      remarkPlugins={[gfm]}
    />
  );
}

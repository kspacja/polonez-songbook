import styled from 'styled-components';

import ReactMarkdown from 'react-markdown';

export const StyledMarkdown = styled(ReactMarkdown)`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }
`;

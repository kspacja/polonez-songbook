import styled from 'styled-components';
import hexToRgba from 'utils/hexToRgba';

export const Highlight = styled.span`
  background: ${(props) => hexToRgba(props.theme.outline, 0.5)};
`;

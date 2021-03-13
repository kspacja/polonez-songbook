import styled, { keyframes } from 'styled-components';
import hexToRgba from 'utils/hexToRgba';

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
  max-width: calc(500px + 2rem);
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: solid 1px #ccc;
  border-radius: 0;

  &:focus {
    outline: none;
  }
`;

const rotate = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(300%);
  }
}
`;

interface LoaderProps {
  $loading: boolean;
}

export const Loader = styled.div<LoaderProps>`
  height: 4px;
  position: relative;
  overflow: hidden;

  &,
  &:before {
    background: ${(props) =>
      props.$loading ? hexToRgba(props.theme.outline, 0.5) : '#fff'};
  }

  &:before {
    content: '';
    animation: ${rotate} 2s linear infinite both;
    width: 40%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
  }
`;

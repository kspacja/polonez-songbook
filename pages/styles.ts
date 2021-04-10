import styled, { css, keyframes } from 'styled-components';
import color from 'utils/color';
import hexToRgba from 'utils/hexToRgba';

const container = css`
  margin: 0 auto;
  padding: 0 1rem;
  max-width: calc(500px + 2rem);
`;

export const Container = styled.div`
  ${container}
`;

export const Header = styled.h1`
  display: flex;
  align-items: center;

  font-size: 1.5rem;
  font-style: italic;
  font-weight: normal;

  ${container};
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.65rem;
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

export const Image = styled.figure`
  width: 65px;
  height: 65px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  margin-right: 1rem;
`;

export const HeaderText = styled.div`
  border-bottom: solid 1px ${color('details')};
  padding: 0.5rem;
  flex: 1;
`;

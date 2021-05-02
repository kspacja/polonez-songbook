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
  padding-bottom: 3rem;
`;

export const Header = styled.h1`
  display: flex;
  align-items: center;

  font-size: 1.5rem;
  font-style: italic;
  font-weight: normal;

  ${container};
  margin-top: 1rem;
  padding-bottom: 0;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: solid 1px ${color('border')};
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
  $fixed?: boolean;
}

export const Loader = styled.div<LoaderProps>`
  height: ${(props) => (props.$fixed ? 8 : 4)}px;
  position: ${(props) => (props.$fixed ? 'fixed' : 'relative')};
  bottom: ${(props) => (props.$fixed ? 27 : 0)}px;
  width: 100%;
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

export const Navigation = styled.ul`
  ${container};
  list-style: none;
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-bottom: 1rem;

  li {
    font-style: italic;
    font-size: 0.9rem;
  }

  li:after {
    content: '|';
    padding: 0 0.25rem;
  }

  li:last-child:after {
    content: '';
  }
`;

export const Counter = styled.div`
  font-size: 0.7rem;
  text-align: right;
`;

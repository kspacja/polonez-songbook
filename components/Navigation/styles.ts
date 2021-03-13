import styled from 'styled-components';
import color from 'utils/color';

export const NavContainer = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    display: none;
  }

  ul > li {
    font-size: 0.95em;

    &:after {
      content: '|';
      font-size: 1.1em;
      color: ${color('fontInvert')};
      padding: 0 0.5em;
    }

    &:last-child:after {
      content: '';
      padding-right: 0;
    }
  }

  a {
    color: ${color('fontInvert')};
    white-space: nowrap;
  }
`;

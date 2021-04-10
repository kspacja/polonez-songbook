import styled from 'styled-components';
import color from 'utils/color';

import { animated } from 'react-spring';

export const NavContainer = styled.nav`
  position: fixed;
  bottom: 3rem;
  left: 1.5rem;
  z-index: 10;

  a {
    color: ${color('fontInvert')};
    white-space: nowrap;
  }
`;

export const Trigger = styled.div`
  cursor: pointer;

  background: ${color('details')};
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  box-shadow: 0 0.2rem 0.5rem ${color('shadow')};

  position: relative;
`;

export const MenuList = styled(animated.ul)`
  list-style: none;
  padding: 0.5rem;
  margin: 0;

  background: ${color('details')};
  box-shadow: 0 0.2rem 0.5rem ${color('shadow')};
  border-radius: 5px;

  position: absolute;
  bottom: 3rem;

  ul > li {
    font-size: 0.95rem;
  }
`;

interface BurgerLineProps {
  index: number;
}

export const BurgerLine = styled(animated.div)`
  position: absolute;
  height: 3px;
  background: ${color('fontInvert')};
  left: 0.65rem;
  top: ${(props: BurgerLineProps) => 0.75 + props.index * 0.45}rem;
  border-radius: 3px;
`;

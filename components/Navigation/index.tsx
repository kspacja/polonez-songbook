import { useState, useCallback } from 'react';
import { useSprings, useSpring } from 'react-spring';
import Link from 'components/Link';
import { NavContainer, Trigger, BurgerLine, MenuList } from './styles';

function initRight(index: number) {
  const rightValue = 0.65 + (index % 2 === 0 ? 0.6 - index * 0.15 : 0);
  return `${rightValue}rem`;
}

function hoverRight(index: number) {
  const rightValue =
    0.65 + (index % 2 !== 0 ? 0.6 - index * 0.15 : index * 0.1);
  return `${rightValue}rem`;
}

const LINES = 3;

interface NavigationProps {
  items: { href: string; text: string }[];
}

export default function Navigation({ items }: NavigationProps) {
  const [isOpen, setOpen] = useState(false);

  const [springs, set] = useSprings(LINES, (index: number) => ({
    right: initRight(index),
    config: {
      tension: 200,
      friction: 10,
    },
  }));

  const menuListStyle = useSpring({
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0px)' : 'translateY(200%)',
    config: {
      tension: 150,
      friction: 20,
    },
  });

  const handleFocus = useCallback(
    () => set((index: number) => ({ right: hoverRight(index) })),
    [set]
  );

  const handleBlur = useCallback(
    () => set((index: number) => ({ right: initRight(index) })),
    [set]
  );

  return (
    <NavContainer>
      <Trigger
        onMouseEnter={handleFocus}
        onMouseLeave={handleBlur}
        onClick={() => {
          setOpen((open) => !open);
          isOpen ? handleBlur() : handleFocus();
        }}
      >
        {springs.map((style, index) => (
          <BurgerLine key={index} index={index} style={style} />
        ))}
      </Trigger>
      <MenuList style={menuListStyle}>
        {items.map(({ href, text }) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
          <li key={href} onClick={() => setOpen((open) => !open)}>
            <Link href={href}>{text}</Link>
          </li>
        ))}
      </MenuList>
    </NavContainer>
  );
}

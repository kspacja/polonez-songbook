import styled from 'styled-components';
import color from 'utils/color';

interface ButtonProps {
  $fontSize?: number;
}

export const Button = styled.button`
  background: ${color('idle')};
  width: 100%;
  cursor: pointer;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  margin-bottom: 0.5rem;
  padding: 0.1rem 0.5rem;
  font-size: ${(props: ButtonProps) => props.$fontSize || 1}rem;

  &:focus {
    outline-color: ${color('outline')};
  }

  &:hover {
    background: ${color('hover')};
  }
`;

interface AccordionContentProps {
  $isOpen: boolean;
  $maxHeight: number;
}

export const AccordionContent = styled.div`
  width: 100%;
  overflow: hidden;
  transition: max-height 0.1s ease;
  max-height: ${(props: AccordionContentProps) =>
    props.$isOpen ? props.$maxHeight : 0}px;
`;

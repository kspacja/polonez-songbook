import styled from 'styled-components';

export const Container = styled.div`
  background: ${(props) => props.theme.card};
  padding: 1.25rem 0 0;
  position: relative;
`;

export const HeadContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Name = styled.a`
  font-size: 1.5rem;
  margin-top: -0.2rem;
`;

export const TopList = styled.ul`
  padding: 0.5rem;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    padding-left: 0;
  }
`;

interface ShortTopProps {
  $isOpen: boolean;
}

export const ShortTop = styled.div`
  overflow: hidden;
  transition: max-height 0.1s ease;
  max-height: ${(props: ShortTopProps) => (props.$isOpen ? 200 : 0)}px;
`;

export const AccordionButton = styled.button`
  background: ${(props) => props.theme.button.idle};
  width: 100%;
  cursor: pointer;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);

  &:focus {
    outline-color: ${(props) => props.theme.outline};
  }

  &:hover {
    background: ${(props) => props.theme.button.hover};
  }
`;

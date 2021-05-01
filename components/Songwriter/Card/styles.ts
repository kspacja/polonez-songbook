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

export const Inprogress = styled.div`
  font-size: 0.8rem;
`;

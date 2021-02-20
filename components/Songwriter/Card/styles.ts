import styled from 'styled-components';

export const Container = styled.div`
  background: ${(props) => props.theme.card};
  padding: 1.25em 1.5em;
  margin-bottom: 1em;

  display: flex;
`;

export const Name = styled.a`
  font-size: 1.5em;
`;

export const Icon = styled.span``;

export const TopList = styled.ul`
  padding: 0.5em 0 0 1em;
  margin: 0;
  list-style: none;

  @media (max-width: 600px) {
    padding-left: 0;
  }
`;

export const ShortTop = styled.div`
  margin-top: 0.5em;
`;

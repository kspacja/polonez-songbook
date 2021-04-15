import styled from 'styled-components';

export const Container = styled.div`
  background: ${(props) => props.theme.card};
  margin-top: 0.25rem;
`;

export const Wrapper = styled.div`
  padding-bottom: 1.25rem;
`;

export const Songwriter = styled.em`
  display: block;
  font-size: 1.3rem;
`;

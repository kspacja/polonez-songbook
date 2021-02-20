import styled from 'styled-components';

export const Icon = styled.span``;

export const Container = styled.div`
  padding: 0.25em 0;

  @media (max-width: 500px) {
    padding-right: 25px;
    position: relative;

    ${Icon} {
      position: absolute;
      top: 0.75em;
      right: 0;
    }
  }

  a {
    vertical-align: top;
    margin-right: 0.5em;
    width: 100%;
  }
`;

export const Title = styled.span`
  @media (max-width: 500px) {
    display: block;
  }
`;

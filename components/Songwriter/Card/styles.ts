import styled from 'styled-components';

export const Container = styled.div`
  background: ${(props) => props.theme.card};
  border-radius: 1em;
  padding: 1em;
  margin-bottom: 1em;

  display: flex;
`;

export const Image = styled.div`
  margin-right: 1em;
  position: relative;
  width: 150px;
  height: 150px;
  min-width: 100px;

  border-radius: 0.5em;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

export const Name = styled.a`
  font-size: 1.25em;
`;

export const Icon = styled.span``;

export const TopList = styled.ul`
  padding: 0.5em 0 0 1em;
  margin: 0;
  list-style: none;

  li {
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
  }

  a {
    vertical-align: top;
    margin-right: 0.5em;
    width: 100%;
  }

  @media (max-width: 600px) {
    padding-left: 0;
  }
`;

export const ShortTop = styled.div`
  margin-top: 0.5em;
`;

export const Title = styled.span`
  @media (max-width: 500px) {
    display: block;
  }
`;

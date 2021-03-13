import styled from 'styled-components';
import Markdown from 'components/Markdown';
import color from 'utils/color';

export const Container = styled.article`
  margin: 0 auto;
  padding: 1em;
  max-width: calc(500px + 2em);
`;

const BarBase = styled.div`
  background: ${color('details')};

  position: fixed;
  left: 0;
  right: 0;
  z-index: 2;

  display: flex;
  align-items: center;
  padding: 1em 2em;
`;

export const Bar = styled(BarBase)`
  top: 0;
`;

export const Text = styled(Markdown)`
  background: ${color('textBg')};
  padding: 1.25em;
  margin: 1em 0;
  line-height: 1.25;
  text-align: justify;
  border-left: solid 1px ${color('details')};

  p {
    margin: 0;
  }
`;

export const Name = styled.h1`
  color: ${color('fontInvert')};
  font-size: 1.5em;
  line-height: 1.5;
  font-weight: 300;
  margin: 0;
`;

export const ColumnContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  @media (max-width: 760px) {
    display: block;
  }
`;

const Column = styled.div`
  width: 100%;
`;

export const PlaylistColumn = styled(Column)``;

export const TopsColumn = styled(Column)``;

export const TextsColumn = styled(Column)``;

export const Anchor = styled.div`
  position: relative;
  height: 0;
  width: 100%;

  top: -10em;
`;

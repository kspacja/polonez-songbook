import styled from 'styled-components';
import Markdown from 'components/Markdown';
import color from 'utils/color';

export const Container = styled.article``;

const BarBase = styled.div`
  background: ${color('details')};

  position: fixed;
  left: 0;
  right: 0;
  z-index: 2;

  display: flex;
  align-items: center;
  padding: 1rem 2rem;
`;

export const Bar = styled(BarBase)`
  top: 0;
`;

export const Text = styled(Markdown)`
  background: ${color('textBg')};
  padding: 1.25rem;
  margin: 1rem 0;
  font-size: 0.8rem;
  line-height: 1.25;
  border-left: solid 1px ${color('details')};

  p {
    margin: 0;
  }

  ul {
    list-style: '☞  ';
    padding: 0 0 0 1rem;
    margin: 0 0 0 0.5rem;
  }
`;

export const Name = styled.h1`
  font-size: 1.5rem;
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

  top: -5rem;
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem 1.25rem;
  background: ${color('others')};
  border: solid 1px ${color('details')};
  border-width: 1px 0;

  ul {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;

    li:after {
      content: ' |';
      padding-right: 0.25rem;
    }

    li:last-child:after {
      display: none;
    }
  }
`;

export const Inprogress = styled.div`
  width: 100%;
  height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2rem;
  font-style: italic;
`;

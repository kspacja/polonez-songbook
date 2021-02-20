import styled from 'styled-components';
import Markdown from 'components/Markdown';
import Tabs from 'rc-tabs';

const color = (color: string) => (props) => props.theme[color];

export const Container = styled.article`
  min-height: 100vh;
  padding: 6em 2em 3em;
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

export const BottomBar = styled(BarBase)`
  bottom: 0;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    display: flex;
  }

  ul > li {
    font-size: 0.95em;

    &:after {
      content: '|';
      font-size: 1.1em;
      color: ${color('fontInvert')};
      padding: 0 0.5em;
    }

    &:last-child:after {
      content: '';
      padding-right: 0;
    }
  }

  a {
    color: ${color('fontInvert')};
    white-space: nowrap;
  }
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
  padding-right: 2em;
  min-width: 320px;

  @media (max-width: 760px) {
    padding-right: 0;
  }
`;

export const PlaylistColumn = styled(Column)`
  flex: 1;
`;

export const TopsColumn = styled(Column)`
  width: 320px;

  @media (max-width: 760px) {
    width: 100%;
  }
`;

export const TextsColumn = styled(Column)`
  flex: 2;

  @media (max-width: 1200px) {
    width: 100%;
  }
`;

export const Anchor = styled.div`
  position: relative;
  height: 0;
  width: 100%;

  top: -10em;
`;

export const StyledTabs = styled(Tabs)`
  margin-bottom: 1em;

  .rc-tabs {
    &-nav-list {
      display: flex;
      padding-bottom: 1em;
    }

    &-nav-operations-hidden {
      display: none;
    }

    &-tab-btn {
      cursor: pointer;
      padding: 0.25em 0.5em;

      background: ${color('textBg')};
      margin-right: 0.5em;

      &:focus {
        outline: none;
        background: ${color('focused')};
      }
    }

    &-tab-active .rc-tabs-tab-btn {
      border-bottom: solid 1px ${color('details')};
    }
  }
`;

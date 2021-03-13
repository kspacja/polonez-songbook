import styled from 'styled-components';
import Tabs from 'rc-tabs';
import color from 'utils/color';

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

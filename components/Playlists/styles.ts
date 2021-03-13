import styled from 'styled-components';
import Tabs from 'rc-tabs';
import color from 'utils/color';

export const StyledTabs = styled(Tabs)`
  margin-bottom: 1rem;

  .rc-tabs {
    &-nav-list {
      display: flex;
      padding-bottom: 1rem;
    }

    &-nav-operations-hidden {
      display: none;
    }

    &-tab-btn {
      cursor: pointer;
      padding: 0.25rem 0.5rem;

      background: ${color('textBg')};
      margin-right: 0.5rem;

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

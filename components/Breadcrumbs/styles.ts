import styled from 'styled-components';

export const BreadcrumbsList = styled.ul`
  padding: 0;
  margin: 0 0 1rem;
  list-style: none;

  font-size: 0.9rem;

  display: flex;
  width: 100%;
  overflow-x: auto;

  li {
    white-space: nowrap;
  }

  li:after {
    content: ' ≫';
    margin-right: 0.3rem;
  }

  li:last-child:after {
    content: '';
  }
`;

export const BreadcrumbsCurrent = styled.span`
  font-weight: 500;
`;

export const BreadcrumbsCurrentLabel = styled.em`
  font-weight: normal;

  &:after {
    content: ':';
    margin-right: 0.3rem;
  }
`;

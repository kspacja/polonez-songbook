import styled from 'styled-components';

type BaseIconProps = {
  $width: number;
  $height: number;
};

export const BaseIcon = styled.div`
  display: inline-block;
  width: ${(props: BaseIconProps) => props.$width}px;
  height: ${(props: BaseIconProps) => props.$height}px;

  path {
    fill: ${(props) => props.theme.icons};
  }
`;

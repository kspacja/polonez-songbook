import styled from 'styled-components';

export interface ImageProps {
  width?: number;
  height?: number;
}

export const Image = styled.figure`
  margin-right: 1.5rem;
  position: relative;
  width: ${(props: ImageProps) => props.width}px;
  height: ${(props: ImageProps) => props.height}px;
  min-width: 50px;
  overflow: hidden;
`;

import styled from 'styled-components';

export interface ImageProps {
  width?: number;
  height?: number;
}

export const Image = styled.figure`
  margin-right: 1.5em;
  position: relative;
  width: ${(props: ImageProps) => props.width}px;
  height: ${(props: ImageProps) => props.height}px;
  min-width: 50px;

  border-radius: 0.2em;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.25);
  overflow: hidden;
`;

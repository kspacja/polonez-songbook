import styled from 'styled-components';

export interface ImageProps {
  width?: number;
  height?: number;
  $loaded?: boolean;
}

export const Image = styled.figure`
  margin-right: 1.5rem;
  position: relative;
  width: ${(props: ImageProps) => props.width}px;
  height: ${(props: ImageProps) => props.height}px;
  min-width: ${(props: ImageProps) => props.width}px;
  overflow: hidden;
  transition: opacity 0.3s ease;
  opacity: ${(props: ImageProps) => (props.$loaded ? 1 : 0)};
`;

import { useState } from 'react';
import NextImage from 'next/Image';
import { Image, ImageProps } from './styles';
import { Songwriter } from 'types';

interface ThumbnailProps extends ImageProps {
  songwriter: Songwriter;
  size?: number;
}

export default function Thumbnail({
  songwriter,
  size = 150,
  width = size,
  height = size,
}: ThumbnailProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image $loaded={loaded} width={width} height={height}>
      <NextImage
        src={`/images/${songwriter.slug}.jpg`}
        layout="fill"
        alt={songwriter.name}
        title={songwriter.name}
        objectFit="cover"
        objectPosition="left top"
        onLoad={() => {
          setLoaded(true);
        }}
      />
    </Image>
  );
}

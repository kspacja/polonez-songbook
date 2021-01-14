import { Songwriter } from 'types';
import NextImage from 'next/Image';
import snakeCase from 'lodash/snakeCase';
import {
  Container,
  Name,
  Image,
  TopList,
  ShortTop,
  Title,
  Icon,
} from './styles';
import getMediaName from 'utils/getMediaName';

type CardProps = {
  songwriter: Songwriter;
};

export default function Card({ songwriter }: CardProps) {
  return (
    <Container>
      <Image>
        <NextImage
          src={`/images/${snakeCase(songwriter.name)}.jpg`}
          layout="fill"
          objectFit="cover"
          objectPosition="left top"
        />
      </Image>
      <div>
        <Name href="/songwriter">{songwriter.name}</Name>
        <ShortTop>
          Esensjonale piosenki:
          <TopList>
            {songwriter.tops.map(({ link, artist, title }) => (
              <li key={link}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {artist}: <Title>{title}</Title>
                </a>
                <Icon>
                  <NextImage
                    src={`/svgs/${getMediaName(link)}.svg`}
                    width="17"
                    height="17"
                  />
                </Icon>
              </li>
            ))}
          </TopList>
        </ShortTop>
      </div>
    </Container>
  );
}

import { BaseIcon } from './_styled';

type IconProps = {
  size?: number;
  width?: number;
  height?: number;
};

export default function _icon(Component: React.ComponentType) {
  return function Icon({ size, width = size, height = size }: IconProps) {
    return (
      <BaseIcon $width={width} $height={height}>
        <Component />
      </BaseIcon>
    );
  };
}

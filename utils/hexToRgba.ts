import hexToRgba from 'hex-to-rgba';

export default function hexToRgbaWrapper(color: string, alpha: number) {
  return hexToRgba(color || '#fff', alpha);
}

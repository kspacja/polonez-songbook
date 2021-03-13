export default function color(color: string) {
  return (props) => props.theme[color];
}

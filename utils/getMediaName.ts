type Pattern = [string, RegExp];

const PATTERNS: Pattern[] = [
  ['youtube', /(\.|\/)youtu/],
  ['spotify', /open\.spotify/],
  ['bandcamp', /bandcamp\.com/],
];

export default function getMediaName(link: string) {
  for (const [name, regExp] of PATTERNS) {
    if (regExp.test(link)) {
      return name;
    }
  }

  return 'telegram';
}

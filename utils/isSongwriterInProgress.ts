import { Songwriter } from 'types';

export default function isSongwriterInProgress(songwriter: Songwriter) {
  return songwriter.tops.length > 2;
}

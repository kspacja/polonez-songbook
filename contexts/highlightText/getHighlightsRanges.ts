import { memoize } from 'lodash';
import getPhrases from 'utils/getPhrases';

function mergeRanges(ranges: [number, number][]) {
  let curBegin: number | null = null;
  let curEnd: number | null = null;
  const result: number[] = [];

  ranges.forEach(([begin, end]) => {
    if (curBegin === null) {
      curBegin = begin;
    }

    if (curEnd === null) {
      curEnd = end;
    }

    if (begin > curEnd) {
      result.push(curBegin, curEnd);
      curBegin = begin;
      curEnd = end;
    }

    if (end > curEnd) {
      curEnd = end;
    }
  });

  if (curBegin !== null && curEnd !== null) {
    result.push(curBegin, curEnd);
  }

  return result;
}

const createRegExpTerm = memoize((term: string) => {
  return new RegExp(`["')(]?${term}[,.:;"'?!)(]?`, 'i');
});

export default function getHighlightRanges(
  text: string,
  searchValue = '',
  terms = [] as string[]
): number[] {
  if (searchValue.length <= 2) {
    return [];
  }

  const termsCopy = [...terms];
  const phrases = getPhrases(searchValue);

  const phrasesRegExps = phrases.map(createRegExpTerm);

  const positions = phrasesRegExps
    .map((re) => {
      const match = re.exec(text);
      return match
        ? ([match.index, match.index + match[0].length] as [number, number])
        : null;
    })
    .filter((range) => range)
    .sort(([beginA], [beginB]) => beginA - beginB);

  const highlights = mergeRanges(positions);

  // If search result are fuzzy, simple searchValue is not enough
  // Let's check through terms
  if (termsCopy.length > 0 && highlights.length === 0) {
    const term = `"${termsCopy.shift()}"`;
    return getHighlightRanges(text, term, termsCopy);
  }

  return highlights;
}

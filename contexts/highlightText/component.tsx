import { MatchInfo } from 'minisearch';
import { useContext, useMemo } from 'react';
import HighlightContext from './';

import { Highlight } from './styles';

interface HighlightTextProps {
  path: string;
  children: string;
}

function highlightToken(token: string, searchValue: string, index: number) {
  const values = searchValue.split(' ');

  const valueRegExp = values
    .map((v) => new RegExp(v, 'i'))
    .find((rx) => rx.test(token));

  const [match] = token.match(valueRegExp) || [];
  const key = `${token}-${index}`;

  if (!match) {
    return (
      <span key={key}>
        <Highlight>{token}</Highlight>{' '}
      </span>
    );
  } else {
    const [head, tail] = token.split(valueRegExp);
    return (
      <span key={key}>
        {head}
        <Highlight>{match}</Highlight>
        {tail}{' '}
      </span>
    );
  }
}

function getHighlightedTokens(
  text: string,
  path: string,
  match: MatchInfo,
  searchValue: string
) {
  const termsRegExps = Object.keys(match)
    .filter((term) => match[term].includes(path))
    .map((term) => new RegExp(`["')(]?${term}[,.:;"'?!)(]?`, 'i'));

  const tokens = text.split(' ');

  return tokens.map((token, index) => {
    return termsRegExps.some((regExp) => regExp.test(token))
      ? highlightToken(token, searchValue, index)
      : token + ' ';
  });
}

export default function HighlightText({ children, path }: HighlightTextProps) {
  const { searchResult, searchValue = '' } = useContext(HighlightContext) || {};
  const { match } = searchResult || {};

  const highlightedTokens = useMemo(
    () => getHighlightedTokens(children, path, match || {}, searchValue),
    [children, path, match]
  );

  return <>{highlightedTokens}</>;
}

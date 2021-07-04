import { random } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import getHighlightRanges from './getHighlightsRanges';
import { useSearchResult } from './hooks';
import { Highlight } from './styles';

export interface HighlightTextProps {
  children?: string | string[];
  highlightRanges?: number[];
}

function stripHtml(html: string) {
  const tmp =
    typeof document !== 'undefined'
      ? document.createElement('div')
      : { innerHTML: '', textContent: '', innerText: '' };

  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || tmp.innerHTML || '';
}

function getHighlightedText(text: string, highlightRanges: number[]) {
  let cursor = 0;
  let isTagClose = false;

  if (highlightRanges.length === 0) {
    return text;
  }

  let highlightedText = Array.from(text)
    .map((letter, index) => {
      let prefix = '';

      if (highlightRanges[cursor] === index) {
        cursor += 1;
        const tagStart = isTagClose ? '/' : '';
        prefix = `<${tagStart}em>`;
        isTagClose = !isTagClose;
      }

      return prefix + letter;
    })
    .join('');

  if (highlightRanges[cursor] >= text.length) {
    highlightedText += '</em>';
  }

  return highlightedText;
}

function getHighlights(
  text: string,
  searchValue: string,
  terms: string[],
  highlightRanges: number[]
) {
  const highlights =
    searchValue.length > 2
      ? highlightRanges || getHighlightRanges(text, searchValue, terms)
      : [];

  return getHighlightedText(text, highlights);
}

export default function HighlightText({
  children = [],
  highlightRanges,
}: HighlightTextProps) {
  const { match, searchValue, terms } = useSearchResult();

  let text = typeof children === 'string' ? children : children.join('');
  text = useMemo(() => stripHtml(text), [text]);

  const [highlightedText, setHighlightedText] = useState(text);

  useEffect(() => {
    const anFram = setTimeout(() => {
      setHighlightedText(
        getHighlights(text, searchValue, terms, highlightRanges)
      );
    }, random(0, 15) * 10);

    return () => {
      clearTimeout(anFram);
    };
  }, [match, children, searchValue]);

  return <Highlight dangerouslySetInnerHTML={{ __html: highlightedText }} />;
}

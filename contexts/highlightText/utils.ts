import { SearchResultReturnValue } from './hooks';

export function hasMatch(
  { match, terms }: SearchResultReturnValue,
  path: string
) {
  return terms.some((term) => {
    return match[term].includes(path);
  });
}

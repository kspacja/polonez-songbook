const phrasePattern = /(("([^"]+)")|[^\n ]+)/g;

function getTokenLength(token: string) {
  return token.replace(/[,.:;]/, '').length;
}

export default function getPhrases(query: string) {
  const match = query.match(phrasePattern);

  if (!match) {
    return [];
  }

  return match
    .map((token) => token.replace(/["]/g, ''))
    .reduce((newTokens, nextToken, index) => {
      const tokenLength = getTokenLength(nextToken);
      if (tokenLength > 2 || newTokens.length === 0 || index === 0) {
        return [...newTokens, nextToken];
      } else {
        const lastToken = newTokens[newTokens.length - 1];
        return [...newTokens, `${lastToken} ${nextToken}`];
      }
    }, [] as string[])
    .filter((token) => token.length > 2);
}

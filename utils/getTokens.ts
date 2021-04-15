const splitPattern = /[,(){}:;,."' ]/g;

export default function getTokens(text: string) {
  return text.split(splitPattern).filter((token) => token.length > 0);
}

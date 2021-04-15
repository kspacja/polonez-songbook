import { HitSong } from 'types/index';

import hitsData from './data.json';
import MiniSearch from 'minisearch';
import getPhrases from 'utils/getPhrases';
import getTokens from 'utils/getTokens';

const hits = hitsData.hits.map((hit: HitSong) => ({
  ...hit,
  id: hit.mediaUrl,
}));

export const hitsSearch = new MiniSearch({
  fields: ['artist', 'title', 'songwriter'],
  storeFields: ['artist', 'title', 'songwriter', 'mediaUrl'],
  tokenize: (text: string) => {
    const tokens = getTokens(text);
    return [...tokens, text];
  },
  searchOptions: {
    boost: { name: 2 },
    prefix: true,
    fuzzy: 0.15,
    tokenize: getPhrases,
  },
});

hitsSearch.addAll(hits);

export default hits;

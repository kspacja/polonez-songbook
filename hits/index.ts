import { HitSong } from 'types/index';
import snakeCase from 'lodash/snakeCase';
import hitsData from './data.json';
import MiniSearch from 'minisearch';
import getPhrases from 'utils/getPhrases';
import getTokens from 'utils/getTokens';

const hits: HitSong[] = hitsData.hits.map((hit) => ({
  ...hit,
  id: hit.mediaUrl || snakeCase(hit.songwriter),
}));

export const hitsSearch = new MiniSearch({
  fields: ['artist', 'title', 'songwriter', 'lyrics', 'year'],
  storeFields: ['artist', 'title', 'songwriter', 'mediaUrl', 'lyrics', 'year'],
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

/*
 * reg exp to create song-json
 * https://regex101.com/r/UN4bdV/1
 */

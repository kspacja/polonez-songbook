import { load as cheerioLoad } from 'cheerio';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

import { Songwriter } from '../types';

const SONGWRITER_PATTERN = /^\w+\.json$/;
const HEADER_PATTERN =
  /\d+\. ([\węąłóźżśćńŁŻŹŃĆŚ&/!. ]+) (\–|\-) ([\węąłóźżśćńŁŻŚŹŃĆ&,’() ]+)/;

function removeInitial(text = '') {
  return text
    .trim()
    .replace(/^[A-ZŁŻŹŚŃĆ]\. ?([A-ZŁŻŚŹŃĆ]\.)?( „[\węąłóźżśćńŁŻŚŹŃĆ]+”)? /, '');
}

function textToFeature(text: string) {
  const trimedText = text.trim();

  if (trimedText.startsWith('muz i sł')) {
    const name = removeInitial(trimedText.replace(/muz i sł(:|\.) /, ''));

    return {
      songwriter: name,
      lyrics: name,
    };
  }

  if (trimedText.startsWith('muz')) {
    return {
      songwriter: removeInitial(trimedText.replace(/muz(:|\.) /, '')),
    };
  }

  if (trimedText.startsWith('sł')) {
    return {
      lyrics: removeInitial(trimedText.replace(/sł(:|\.) /, '')),
    };
  }

  if (trimedText.startsWith('prod i sł')) {
    const name = removeInitial(trimedText.replace(/prod i sł(:|\.) /, ''));

    return {
      producer: name,
      lyrics: name,
    };
  }

  if (trimedText.startsWith('prod')) {
    return {
      producer: removeInitial(trimedText.replace(/prod(:|\.) /, '')),
    };
  }

  if (!isNaN(trimedText as any)) {
    return {
      year: Number(trimedText),
    };
  }
}

function parseScreengaresSong(header: string, subtitle: string, url: string) {
  const matches = header.match(HEADER_PATTERN);

  if (matches === null) {
    throw new Error(`Song element header does not fit to pattern: ${header}`);
  }

  const [, artist, , title] = matches;

  const normalizedSubtitle = subtitle
    .replace(/\]|\[/g, '')
    .split(/;|,/)
    .map((pharse) => pharse.trim());

  const features = normalizedSubtitle.reduce((song, text) => {
    return {
      ...song,
      ...textToFeature(text),
    };
  }, {});

  return {
    url,
    artist: artist.trim(),
    title: title.trim(),
    ...features,
  };
}

const surnameSlugMap = new Map<string, string>();

fs.readdirSync('songwriters')
  .filter((fileName) => SONGWRITER_PATTERN.test(fileName))
  .map((fileName) => ({
    fileName,
    fileJSON: JSON.parse(
      fs.readFileSync(path.join('songwriters', fileName), 'utf-8')
    ) as Songwriter,
  }))
  .map(({ fileName, fileJSON }) => {
    const names = fileJSON.name.split(' ');

    return {
      slug: fileName.replace('.json', ''),
      name: names[names.length - 1].toLowerCase(),
    };
  })
  .forEach(({ slug, name }) => {
    surnameSlugMap.set(name, slug);
  });

function* getScreengaresUrls(lastId = 349, first = 316) {
  let id = first;

  while (id <= lastId) {
    yield `http://www.screenagers.pl/index.php?service=xtras&action=show&id=${id}`;
    id += 1;
  }
}

interface Song {
  url: string;
  artist: string;
  title: string;
  year?: number;
  producer?: string;
  songwriter?: string;
  lyrics?: string;
}

async function run() {
  const songs: Array<Song> = [];

  for (let url of getScreengaresUrls()) {
    const response = await fetch(url);
    const text = await response.text();

    const $ = cheerioLoad(text);
    const songsElements = $('.main-service-xtras-doc-pos-text');

    let elementsNumber = songsElements.length;

    if (elementsNumber === 0) {
      const firstP = $('#main-service-xtras-doc-paragraph')
        .find('.dummy')
        .first()
        .text();

      const [header, subtitle] = firstP.split('\n');

      if (header && subtitle) {
        songs.push(parseScreengaresSong(header, subtitle, url));
        elementsNumber = 1;
      }
    }

    console.log('Site:', url, 'songs:', elementsNumber);

    songsElements.each((i, el) => {
      const $el = $(el);
      const header = $el.find('h3').text();
      const subtitle = $el.find('.main-service-xtras-doc-pos-subtitle').text();

      songs.push(parseScreengaresSong(header, subtitle, url));
    });
  }

  const songsMap = {} as { [key: string]: Song[] };
  songs.forEach((song) => {
    if (song.songwriter) {
      const songwriterSlug = surnameSlugMap.get(song.songwriter.toLowerCase());

      if (!songwriterSlug) {
        return;
      }

      if (!songsMap[songwriterSlug]) {
        songsMap[songwriterSlug] = [];
      }

      let urlsMap = songsMap[songwriterSlug];
      urlsMap.push(song);
    }
  });

  fs.writeFileSync(
    'songwriters/features.auto.json',
    JSON.stringify(songsMap, null, 2)
  );
  console.log('Saved!');
}

run();

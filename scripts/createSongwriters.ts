import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import snakeCase from 'lodash/snakeCase';

import fs from 'fs';
import path from 'path';

const songwritersDir = path.join(__dirname, '../songwriters');

const { argv } = yargs(hideBin(process.argv))
  .usage('Usage: $0 [options]')
  .example('$0 -n "Jan Nowak"', 'Create songwriters files for given names')
  .alias('n', 'names')
  .array('n')
  .describe('n', 'Songwriters names')

  .example('$0 -f list.txt', 'Create songwriters files from given file')
  .alias('f', 'file')
  .nargs('f', 1)
  .string('f')
  .describe('f', 'File with simple list of names')

  .conflicts('n', 'f')
  .check((argv) => {
    if (argv.names || argv.file) {
      return true;
    }
    throw '--------------------------------------\n|   --names or --file is required    | \n--------------------------------------';
  });

function getSongwriterFileTemplate(name: string) {
  return `
  {
    "name": "${name}",
    "description": [
      "Akapit 1",
      "Akapit 2 z linkiem https://google.pl"
    ],
    "playlists": [{
      "author": "Krzysztof Ciach",
      "mediaUrl": "https://open.spotify.com/playlist/5Zs90pY4M270XHGCK5TfF9",
      "name": "[2021] do odsłuchu"
    }],
    "tops": [
      {
        "artist": "Ariana Grande ft. Mac Miller",
        "title": "The Way",
        "mediaUrl": "https://www.youtube.com/watch?v=_sV0S8qWSy0",
        "lyrics": "Johnson Novak",
        "year": 2010
      }
    ]
  }`.trimStart();
}

let names = argv.n;

if (argv.f) {
  const fileContent = fs.readFileSync(argv.f, 'utf-8');
  names = fileContent.split('\n');
}

names.forEach((name) => {
  const stringName = String(name);
  const slug = snakeCase(stringName);
  const filePath = path.join(songwritersDir, `${slug}.json`);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, getSongwriterFileTemplate(stringName));
    console.log(`File ${filePath} for songwriter ${stringName} is created`);
  } else {
    console.warn(`Cannot create ${filePath} because it exists`);
  }
});

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadEncyclopedia() {
  const dataPath = path.join(__dirname, '..', 'data');

  const files = fs
    .readdirSync(dataPath)
    .filter(file => file.endsWith('.json'));

  const encyclopedia = {};

  for (const file of files) {
    const filePath = path.join(dataPath, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const entries = JSON.parse(fileContents);

    Object.assign(encyclopedia, entries);
  }

  return encyclopedia;
}

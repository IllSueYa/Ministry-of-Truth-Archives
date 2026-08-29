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

    let entries;

    try {
      entries = JSON.parse(fileContents);
    } catch (error) {
      throw new Error(
        `Failed to parse ${file}: ${error.message}`
      );
    }

    for (const [key, entry] of Object.entries(entries)) {
      if (!entry || typeof entry !== 'object') {
        throw new Error(
          `Invalid encyclopedia entry "${key}" in ${file}`
        );
      }

      if (!entry.title || typeof entry.title !== 'string') {
        throw new Error(
          `Entry "${key}" in ${file} is missing a valid title`
        );
      }

      if (!entry.description || typeof entry.description !== 'string') {
        throw new Error(
          `Entry "${key}" in ${file} is missing a valid description`
        );
      }

      if (encyclopedia[key]) {
        throw new Error(
          `Duplicate encyclopedia entry "${key}" found in ${file}`
        );
      }

      encyclopedia[key] = entry;
    }
  }

  return encyclopedia;
}

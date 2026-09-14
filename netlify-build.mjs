import { cp, copyFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const file of ['index.html', 'style.css', 'script.js']) {
  await copyFile(join(root, file), join(dist, file));
}

await cp(join(root, 'img'), join(dist, 'img'), { recursive: true });

console.log('Netlify static build completed.');

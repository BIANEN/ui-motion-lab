import { access, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Assets are downloaded locally for study, not included in the public source archive.
const commit = '51ac2f562b0af38624da939c7b4e39ba4e6e5b08';
const dir = fileURLToPath(new URL('../source/public/img/', import.meta.url));
const base = `https://raw.githubusercontent.com/gaspoorf/curve-gallery/${commit}/public/img`;
await mkdir(dir, { recursive: true });
for (let index = 1; index <= 19; index++) {
  const filepath = path.join(dir, `${index}.webp`);
  try { await access(filepath); console.log(`Already present: ${index}.webp`); continue; }
  catch { /* download if missing */ }
  const response = await fetch(`${base}/${index}.webp`, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`Failed to download ${index}.webp: HTTP ${response.status}`);
  await writeFile(filepath, Buffer.from(await response.arrayBuffer()));
  console.log(`Downloaded ${index}.webp`);
}
console.log('Ready. Keep third-party assets local unless you have redistribution rights.');

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const sourcePath = resolve(projectRoot, 'config', 'commerce.json');
const targetJsonDir = resolve(projectRoot, 'public', 'assets', 'data');
const targetJsDir = resolve(projectRoot, 'public', 'assets', 'js');
const targetJsonPath = resolve(targetJsonDir, 'commerce.json');
const targetJsPath = resolve(targetJsDir, 'commerce-data.js');

try {
  await Promise.all([
    mkdir(targetJsonDir, { recursive: true }),
    mkdir(targetJsDir, { recursive: true })
  ]);

  const data = await readFile(sourcePath, 'utf8');
  await writeFile(targetJsonPath, data);

  const jsPayload = `window.__COMMERCE = ${data};\n` +
    "window.dispatchEvent(new CustomEvent('commerce-ready', { detail: window.__COMMERCE }));\n";
  await writeFile(targetJsPath, jsPayload);

  console.log('Commerce config synced to public/assets/data/commerce.json and public/assets/js/commerce-data.js');
} catch (error) {
  console.error('Failed to sync commerce config:', error);
  process.exitCode = 1;
}

import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(fileURLToPath(new URL('../', import.meta.url)));
const outputDir = resolve(projectRoot, 'dist');

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(resolve(projectRoot, 'index.html'), resolve(outputDir, 'index.html'));
await cp(resolve(projectRoot, 'css'), resolve(outputDir, 'css'), { recursive: true });
await cp(resolve(projectRoot, 'js'), resolve(outputDir, 'js'), { recursive: true });

console.log('Build estático gerado em dist/.');

import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gunzipSync } from 'node:zlib';
import { spawnSync } from 'node:child_process';

const root = resolve(fileURLToPath(new URL('.', import.meta.url)));
const payloadRoot = resolve(root, '../../.prototype-upload/narrative-interaction-lab-v002');
const temporaryRoot = await mkdtemp(join(tmpdir(), 'narrative-interaction-lab-v002-'));

const payloads = {
  'app.js': ['app.js.gz.b64.00'],
  'story.mjs': ['story.mjs.gz.b64.00', 'story.mjs.gz.b64.01', 'story.mjs.gz.b64.02', 'story.mjs.gz.b64.03'],
  'styles.css': ['styles.css.gz.b64'],
  'validate.mjs': ['validate.mjs.gz.b64'],
};

try {
  await cp(root, temporaryRoot, { recursive: true });

  for (const [destination, parts] of Object.entries(payloads)) {
    const encoded = (await Promise.all(parts.map((name) => readFile(resolve(payloadRoot, name), 'utf8')))).join('').replace(/\s+/g, '');
    const source = gunzipSync(Buffer.from(encoded, 'base64'));
    await writeFile(resolve(temporaryRoot, destination), source);
  }

  const result = spawnSync(process.execPath, [resolve(temporaryRoot, 'validate.mjs')], {
    cwd: temporaryRoot,
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

test('core modules contain no fixture-specific names or object coordinates', () => {
  const files = ['src/engine.js', 'src/create-app.js', 'src/vn.js', 'src/render.js'];
  const source = files.map((file) => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
  for (const forbidden of ['Ari', 'Nia', 'ROOM 4', 'parcel', 'panelHeld', 'ariTarget']) {
    assert.equal(source.includes(forbidden), false, `core leaked fixture term: ${forbidden}`);
  }
});

test('ordinary UI contains no dashboard, objective list, log, or developer panel', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8').toLowerCase();
  for (const forbidden of ['developer state', 'nearby possibilities', 'room tone', 'objective list', 'event log']) {
    assert.equal(html.includes(forbidden), false);
  }
});

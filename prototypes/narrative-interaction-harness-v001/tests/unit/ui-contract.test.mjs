import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

test('ordinary harness UI contains no dashboard, objective list, log, or developer panel', () => {
  const html = fs.readFileSync(new URL('../../index.html', import.meta.url), 'utf8').toLowerCase();
  for (const forbidden of ['side-card', 'objective-list', 'event-log', 'debugstate', 'nearby possibilities']) {
    assert.equal(html.includes(forbidden), false, `unexpected player-facing ${forbidden}`);
  }
});

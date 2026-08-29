import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { launchBrowser, sleep, waitForHttp } from '../../narrative-interaction-harness-v002/tests/e2e/cdp.mjs';

const scenarioRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = 4199;
const rootUrl = `http://127.0.0.1:${port}/`;
let server;
let counter = 0;

before(async () => {
  server = spawn(process.execPath, ['server.mjs'], {
    cwd: scenarioRoot,
    env: { ...process.env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  await waitForHttp(rootUrl);
});

after(() => server?.kill('SIGTERM'));

async function withBrowser(fn) {
  counter += 1;
  const browser = await launchBrowser({ debugPort: 9560 + counter });
  try {
    await browser.client.send('Emulation.setDeviceMetricsOverride', {
      width: 1440, height: 900, deviceScaleFactor: 1, mobile: false,
    });
    await browser.navigate(rootUrl);
    await fn(browser.client);
  } finally {
    await browser.close();
  }
}

async function advance(client, count = 1) {
  for (let i = 0; i < count; i += 1) await client.press('enter');
}

test('intended rendered route preserves recovered UX and completes a reciprocal two-photo exchange', async () => {
  await withBrowser(async (client) => {
    const initial = await client.text('#situation');
    assert.match(initial, /instant camera with two shots left/i);
    await sleep(2600);
    assert.equal(await client.text('#situation'), initial, 'important context must persist');

    await client.press('e');
    await client.waitForExpression("!document.querySelector('#vn').hidden");
    const metrics = await client.evaluate(`(() => {
      const shell = document.querySelector('.shell').getBoundingClientRect();
      const card = document.querySelector('.vn-card').getBoundingClientRect();
      const textSize = parseFloat(getComputedStyle(document.querySelector('#vn-text')).fontSize);
      return { shellWidth: shell.width, cardWidth: card.width, cardHeight: card.height, cardTop: card.top, textSize };
    })()`);
    assert.ok(metrics.shellWidth >= 1100, JSON.stringify(metrics));
    assert.ok(metrics.cardWidth >= 940, JSON.stringify(metrics));
    assert.ok(metrics.cardHeight >= 540, JSON.stringify(metrics));
    assert.ok(metrics.cardTop < 180, JSON.stringify(metrics));
    assert.ok(metrics.textSize >= 26, JSON.stringify(metrics));

    await advance(client, 2);
    await client.press('2'); // official player photo
    await advance(client); // response -> map
    await client.waitForExpression("document.querySelector('#vn').hidden");
    let state = await client.evaluate('window.__HARNESS__.state()');
    assert.equal(state.stage, 'first_print');
    assert.match(state.facts.playerPhoto, /electable/);
    assert.equal(state.actors.tabitha.target.x, 385);
    assert.equal(state.actors.tabitha.target.y, 397);
    assert.match(await client.text('#situation'), /One shot remains/);

    await client.press('e'); // use last shot
    await advance(client); // Tabitha line
    await client.press('1'); // candid Tabitha
    await advance(client); // response -> map
    await client.waitForExpression("document.querySelector('#vn').hidden");
    state = await client.evaluate('window.__HARNESS__.state()');
    assert.equal(state.stage, 'two_prints');
    assert.equal(state.facts.playerDirectedTabitha, true);
    assert.match(state.facts.tabithaPhoto, /objecting/);
    assert.equal(state.actors.tabitha.target.x, 385);
    assert.equal(state.actors.tabitha.target.y, 397);

    await client.press('e'); // trade prints, highest priority
    await client.waitForExpression('window.__HARNESS__.state().ended');
    state = await client.evaluate('window.__HARNESS__.state()');
    assert.equal(state.ending, 'trade');
    assert.equal(state.facts.ownership, 'trade');
    const audit = await client.evaluate('window.__HARNESS__.audit()');
    assert.equal(audit.passed, true, JSON.stringify(audit));
  });
});

test('player can reverse the order and Tabitha follows the player’s direction', async () => {
  await withBrowser(async (client) => {
    await client.press('e');
    await advance(client, 2);
    await client.press('4'); // no, you first
    await advance(client); // response -> direct_tabitha_first
    await advance(client); // Well?
    await client.press('2'); // EXIT sign
    await advance(client); // response -> map

    let state = await client.evaluate('window.__HARNESS__.state()');
    assert.equal(state.facts.order, 'player_first');
    assert.equal(state.facts.firstSubject, 'tabitha');
    assert.equal(state.facts.playerDirectedTabitha, true);
    assert.match(state.facts.tabithaPhoto, /EXIT sign/);

    await client.press('e');
    await advance(client);
    await client.press('3'); // player pulls face
    await advance(client);
    state = await client.evaluate('window.__HARNESS__.state()');
    assert.equal(state.stage, 'two_prints');
    assert.match(state.facts.playerPhoto, /ruining the photo/);
  });
});

test('focused interaction can be cancelled and resumed without Tabitha advancing anywhere', async () => {
  await withBrowser(async (client) => {
    await client.press('e');
    await client.waitForExpression("!document.querySelector('#vn').hidden");
    await client.press('escape');
    await client.waitForExpression("document.querySelector('#vn').hidden");
    let state = await client.evaluate('window.__HARNESS__.state()');
    assert.equal(state.stage, 'photo_paused');
    assert.equal(state.actors.tabitha.target.x, 385);
    assert.match(await client.text('#situation'), /still beside you/i);
    assert.equal((await client.evaluate('window.__HARNESS__.prompt()')).id, 'resume_photo');

    await client.press('e');
    await client.waitForExpression("!document.querySelector('#vn').hidden");
    state = await client.evaluate('window.__HARNESS__.state()');
    assert.equal(state.currentVN, 'opening');
  });
});

test('rapid interaction input cannot consume the opening affordance twice', async () => {
  await withBrowser(async (client) => {
    await client.press('e');
    await client.press('e');
    const state = await client.evaluate('window.__HARNESS__.state()');
    assert.equal(state.actionUses.start_camera, 1);
    assert.equal(state.currentVN, 'opening');
  });
});

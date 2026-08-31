import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { launchBrowser, sleep, waitForHttp } from '../../narrative-interaction-harness-v002/tests/e2e/cdp.mjs';

const scenarioRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = 4210;
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
  const browser = await launchBrowser({ debugPort: 9620 + counter });
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

async function state(client) {
  return client.evaluate('window.__HARNESS__.state()');
}

async function walkTo(client, targetX, targetY, tolerance = 18) {
  for (let i = 0; i < 80; i += 1) {
    const current = await state(client);
    const dx = targetX - current.player.x;
    const dy = targetY - current.player.y;
    if (Math.abs(dx) <= tolerance && Math.abs(dy) <= tolerance) return current;
    let key;
    if (Math.abs(dx) > Math.abs(dy)) key = dx > 0 ? 'd' : 'a';
    else key = dy > 0 ? 's' : 'w';
    await client.hold(key, 150);
    await sleep(24);
  }
  const current = await state(client);
  throw new Error(`Could not walk to ${targetX},${targetY}; ended at ${current.player.x},${current.player.y}`);
}

async function assertCompanionNear(client, maxDistance = 105) {
  await sleep(220);
  const current = await state(client);
  const distance = Math.hypot(
    current.actors.tabitha.x - current.player.x,
    current.actors.tabitha.y - current.player.y,
  );
  assert.ok(distance <= maxDistance, `Tabitha fell ${distance.toFixed(1)}px behind the player`);
}

async function measureRecoveredUX(client) {
  return client.evaluate(`(() => {
    const shell = document.querySelector('.shell').getBoundingClientRect();
    return { shellWidth: shell.width, stageHeight: document.querySelector('.stage').getBoundingClientRect().height };
  })()`);
}

async function measureVN(client) {
  return client.evaluate(`(() => {
    const card = document.querySelector('.vn-card').getBoundingClientRect();
    const textSize = parseFloat(getComputedStyle(document.querySelector('#vn-text')).fontSize);
    return { cardWidth: card.width, cardHeight: card.height, cardTop: card.top, textSize };
  })()`);
}

test('high-street route requires real movement, preserves accompaniment, uses the shop stop and arrives together', async () => {
  await withBrowser(async (client) => {
    const initial = await client.text('#situation');
    assert.match(initial, /walking to the station/i);
    await sleep(2600);
    assert.equal(await client.text('#situation'), initial, 'important context must persist');

    const ux = await measureRecoveredUX(client);
    assert.ok(ux.shellWidth >= 1100, JSON.stringify(ux));
    assert.ok(ux.stageHeight >= 540, JSON.stringify(ux));

    await walkTo(client, 285, 340);
    await assertCompanionNear(client);
    await walkTo(client, 300, 185);
    await assertCompanionNear(client);
    await walkTo(client, 420, 185);
    let current = await state(client);
    assert.equal(current.facts.route, 'high_street');
    assert.match(await client.text('#situation'), /high street/i);
    await assertCompanionNear(client);

    await walkTo(client, 500, 185);
    assert.match(await client.text('#feedback'), /corner shop|eat something/i);
    await walkTo(client, 575, 95);
    assert.equal((await client.evaluate('window.__HARNESS__.prompt()')).id, 'shop_stop');
    await client.press('e');
    await client.waitForExpression("!document.querySelector('#vn').hidden");

    const vn = await measureVN(client);
    assert.ok(vn.cardWidth >= 940, JSON.stringify(vn));
    assert.ok(vn.cardHeight >= 540, JSON.stringify(vn));
    assert.ok(vn.cardTop < 180, JSON.stringify(vn));
    assert.ok(vn.textSize >= 26, JSON.stringify(vn));

    await client.press('enter');
    await client.press('1');
    await client.press('enter');
    await client.waitForExpression("document.querySelector('#vn').hidden");
    await sleep(280);
    current = await state(client);
    assert.equal(current.facts.stop, 'shop_salt');
    await assertCompanionNear(client);

    await walkTo(client, 575, 185);
    await walkTo(client, 805, 185);
    await assertCompanionNear(client);
    await walkTo(client, 875, 250);
    assert.equal((await client.evaluate('window.__HARNESS__.prompt()')).id, 'enter_station');
    await client.press('e');
    await client.waitForExpression('window.__HARNESS__.state().ended');

    current = await state(client);
    assert.equal(current.ending, 'arrived_together');
    assert.equal(current.facts.route, 'high_street');
    assert.ok(current.player.x - 130 > 650, 'run must require substantial spatial travel');
    const audit = await client.evaluate('window.__HARNESS__.audit()');
    assert.equal(audit.passed, true, JSON.stringify(audit));
  });
});

test('quiet route exposes a private stop and explicit separation without chasing Tabitha', async () => {
  await withBrowser(async (client) => {
    await walkTo(client, 300, 380);
    await walkTo(client, 420, 380);
    let current = await state(client);
    assert.equal(current.facts.route, 'cut_through');
    assert.match(await client.text('#situation'), /quieter|hear each other/i);
    await assertCompanionNear(client);

    await walkTo(client, 510, 380);
    assert.match(await client.text('#feedback'), /pocket park|five minutes/i);
    await walkTo(client, 595, 472);
    assert.equal((await client.evaluate('window.__HARNESS__.prompt()')).id, 'park_stop');
    await client.press('e');
    await client.waitForExpression("!document.querySelector('#vn').hidden");
    await client.press('enter');
    await client.press('3');
    await client.press('enter');
    await client.waitForExpression("document.querySelector('#vn').hidden");
    await sleep(280);
    current = await state(client);
    assert.equal(current.facts.stop, 'park_quiet');

    await walkTo(client, 595, 385);
    await walkTo(client, 805, 385);
    await assertCompanionNear(client);
    await walkTo(client, 875, 392);
    assert.equal((await client.evaluate('window.__HARNESS__.prompt()')).id, 'peel_off');
    await client.press('e');
    current = await state(client);
    assert.equal(current.stage, 'separating');
    assert.equal(current.facts.accompanying, false);
    assert.deepEqual(current.actors.tabitha.target, { x: 888, y: 250 });

    await client.waitForExpression("window.__HARNESS__.prompt()?.id === 'leave_forecourt'", 4000);
    const afterSeparation = await state(client);
    const separationDistance = Math.hypot(
      afterSeparation.actors.tabitha.x - afterSeparation.player.x,
      afterSeparation.actors.tabitha.y - afterSeparation.player.y,
    );
    assert.ok(separationDistance > 115, 'explicit goodbye should visibly separate the pair');
    await client.press('e');
    await client.waitForExpression('window.__HARNESS__.state().ended');
    current = await state(client);
    assert.equal(current.ending, 'separated_forecourt');
  });
});

test('Tabitha suggestion can be declined by continuing to walk, without a rejection menu', async () => {
  await withBrowser(async (client) => {
    await walkTo(client, 285, 340);
    await walkTo(client, 300, 185);
    await walkTo(client, 500, 185);
    let current = await state(client);
    assert.equal(current.facts.suggestionIssued, true);
    assert.equal(current.facts.stop, null);
    await walkTo(client, 735, 185);
    current = await state(client);
    assert.equal(current.facts.suggestionPassed, true);
    assert.equal(current.facts.stop, null);
    assert.match(await client.text('#feedback'), /shop falls behind|starvation route/i);
    assert.equal((await client.evaluate('window.__HARNESS__.prompts()')).some((item) => item.id === 'shop_stop'), false);
    await assertCompanionNear(client);
  });
});

test('optional-stop focused interaction can be cancelled and resumed while the pair stay together', async () => {
  await withBrowser(async (client) => {
    await walkTo(client, 285, 340);
    await walkTo(client, 300, 185);
    await walkTo(client, 500, 185);
    await walkTo(client, 575, 95);
    await client.press('e');
    await client.waitForExpression("!document.querySelector('#vn').hidden");
    await client.press('escape');
    await client.waitForExpression("document.querySelector('#vn').hidden");
    let current = await state(client);
    assert.equal(current.stage, 'stop_paused');
    assert.equal(current.memory.pausedVN, 'shop');
    assert.equal((await client.evaluate('window.__HARNESS__.prompt()')).id, 'resume_stop');
    await assertCompanionNear(client);

    await sleep(280);
    await client.press('e');
    await client.waitForExpression("!document.querySelector('#vn').hidden");
    current = await state(client);
    assert.equal(current.currentVN, 'shop');
  });
});

import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { launchBrowser, sleep, waitForHttp } from '../../narrative-interaction-harness-v002/tests/e2e/cdp.mjs';

const scenarioRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const port = 4211;
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
  const browser = await launchBrowser({ debugPort: 9680 + counter });
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

async function walkTo(client, targetX, targetY, tolerance = 16) {
  for (let i = 0; i < 90; i += 1) {
    const current = await state(client);
    const dx = targetX - current.player.x;
    const dy = targetY - current.player.y;
    if (Math.abs(dx) <= tolerance && Math.abs(dy) <= tolerance) return current;
    const key = Math.abs(dx) > Math.abs(dy)
      ? (dx > 0 ? 'd' : 'a')
      : (dy > 0 ? 's' : 'w');
    await client.hold(key, 145);
    await sleep(22);
  }
  const current = await state(client);
  throw new Error(`Could not walk to ${targetX},${targetY}; ended at ${current.player.x},${current.player.y}`);
}

async function settle(client, ms = 420) {
  await sleep(ms);
  return state(client);
}

function formationOffsets(current) {
  return {
    dx: current.actors.tabitha.x - current.player.x,
    dy: current.actors.tabitha.y - current.player.y,
    distance: Math.hypot(
      current.actors.tabitha.x - current.player.x,
      current.actors.tabitha.y - current.player.y,
    ),
  };
}

test('high-street journey visibly walks together, refreshes bottom narration and acknowledges ignored suggestion', async () => {
  await withBrowser(async (client) => {
    const metrics = await client.evaluate(`(() => {
      const stage = document.querySelector('.stage').getBoundingClientRect();
      const live = document.querySelector('.live-narration').getBoundingClientRect();
      const feedback = document.querySelector('#feedback').getBoundingClientRect();
      const style = getComputedStyle(document.querySelector('#feedback'));
      return {
        stageLeft: stage.left, stageRight: stage.right, stageTop: stage.top, stageBottom: stage.bottom,
        liveCenter: live.left + live.width / 2,
        stageCenter: stage.left + stage.width / 2,
        feedbackTop: feedback.top,
        feedbackBottom: feedback.bottom,
        feedbackSize: parseFloat(style.fontSize),
      };
    })()`);
    assert.ok(Math.abs(metrics.liveCenter - metrics.stageCenter) < 5, JSON.stringify(metrics));
    assert.ok(metrics.feedbackTop > metrics.stageTop + 250, JSON.stringify(metrics));
    assert.ok(metrics.feedbackBottom < metrics.stageBottom - 70, JSON.stringify(metrics));
    assert.ok(metrics.feedbackSize >= 18, JSON.stringify(metrics));

    await walkTo(client, 285, 340);
    await walkTo(client, 300, 185);
    await walkTo(client, 392, 185, 10);
    let current = await settle(client, 520);
    assert.equal(current.facts.route, 'high_street');
    assert.equal(current.memory.formationMode, 'single_file');
    let offsets = formationOffsets(current);
    assert.ok(offsets.dx < -22, JSON.stringify(offsets));
    assert.ok(Math.abs(offsets.dy) < 28, JSON.stringify(offsets));
    assert.match(await client.text('#feedback'), /single file/i);

    await walkTo(client, 445, 185, 10);
    current = await settle(client, 520);
    assert.equal(current.memory.formationMode, 'side_by_side');
    offsets = formationOffsets(current);
    assert.ok(Math.abs(offsets.dx) < 28, JSON.stringify(offsets));
    assert.ok(Math.abs(offsets.dy) > 22, JSON.stringify(offsets));
    assert.ok(offsets.distance < 65, JSON.stringify(offsets));
    assert.match(await client.text('#feedback'), /12 MIN|comes back alongside/i);

    const promptAtDisplay = await client.evaluate('window.__HARNESS__.prompts()');
    assert.equal(promptAtDisplay.some((item) => item.id === 'read_bus_display'), true);
    await client.press('e');
    await sleep(280);
    assert.match(await client.text('#feedback'), /Time is circular/);

    await walkTo(client, 505, 185);
    await sleep(180);
    assert.match(await client.text('#feedback'), /eat something|corner shop/i);

    await walkTo(client, 718, 185, 10);
    await sleep(220);
    current = await state(client);
    assert.equal(current.facts.suggestionPassed, true);
    assert.equal(current.facts.ignoredSuggestionAcknowledged, true);
    assert.match(await client.text('#feedback'), /No crisps\. Severe administration/);
    assert.equal(current.facts.stop, null);

    await walkTo(client, 805, 185);
    await walkTo(client, 875, 250);
    assert.equal((await client.evaluate('window.__HARNESS__.prompt()')).id, 'enter_station');
    await client.press('e');
    await client.waitForExpression('window.__HARNESS__.state().ended');
    current = await state(client);
    assert.equal(current.ending, 'arrived_together');
    assert.ok(current.facts.journeyBeatCount >= 4, JSON.stringify(current.facts));
    const audit = await client.evaluate('window.__HARNESS__.audit()');
    assert.equal(audit.passed, true, JSON.stringify(audit));
  });
});

test('quiet route compresses formation, supports shared park stop and offers a later fox micro-action', async () => {
  await withBrowser(async (client) => {
    await walkTo(client, 300, 380);
    await walkTo(client, 392, 380, 10);
    let current = await settle(client, 500);
    assert.equal(current.facts.route, 'cut_through');
    assert.equal(current.memory.formationMode, 'single_file');

    await walkTo(client, 447, 385, 10);
    current = await settle(client, 500);
    assert.equal(current.memory.formationMode, 'side_by_side');
    let offsets = formationOffsets(current);
    assert.ok(Math.abs(offsets.dy) > 20, JSON.stringify(offsets));
    assert.match(await client.text('#feedback'), /upstairs window|visible/i);

    await walkTo(client, 510, 385);
    assert.match(await client.text('#feedback'), /Five minutes|pocket park/i);
    await walkTo(client, 595, 472);
    assert.equal((await client.evaluate('window.__HARNESS__.prompt()')).id, 'park_stop');
    await client.press('e');
    await client.waitForExpression("!document.querySelector('#vn').hidden");
    await client.press('enter');
    await client.press('3');
    await client.press('enter');
    await client.waitForExpression("document.querySelector('#vn').hidden");
    await sleep(300);

    current = await state(client);
    assert.equal(current.facts.stop, 'park_quiet');
    await walkTo(client, 595, 385);
    await walkTo(client, 748, 385, 12);
    await sleep(220);
    current = await state(client);
    assert.equal(current.facts.foxPresent, true);
    const foxPrompts = await client.evaluate('window.__HARNESS__.prompts()');
    assert.equal(foxPrompts.some((item) => item.id === 'stop_for_fox'), true);
    await client.press('e');
    await sleep(260);
    assert.match(await client.text('#feedback'), /interrupted a meeting/);
    current = await state(client);
    assert.equal(current.facts.foxStopped, true);

    await walkTo(client, 805, 385);
    await walkTo(client, 875, 392);
    assert.equal((await client.evaluate('window.__HARNESS__.prompt()')).id, 'peel_off');
    await client.press('e');
    await client.waitForExpression("window.__HARNESS__.prompt()?.id === 'leave_forecourt'", 4500);
    const separated = await state(client);
    const separationDistance = Math.hypot(
      separated.actors.tabitha.x - separated.player.x,
      separated.actors.tabitha.y - separated.player.y,
    );
    assert.ok(separationDistance > 115);
  });
});

test('optional journey micro-actions remain optional rather than becoming route gates', async () => {
  await withBrowser(async (client) => {
    await walkTo(client, 285, 340);
    await walkTo(client, 300, 185);
    await walkTo(client, 455, 185);
    let current = await state(client);
    assert.equal(current.facts.busDisplayChecked, false);
    await walkTo(client, 690, 185);
    current = await state(client);
    assert.equal(current.facts.busDisplayChecked, false);
    assert.equal(current.facts.route, 'high_street');
    assert.ok(current.player.x > 620, 'ignoring the micro-action must not block movement');
  });
});

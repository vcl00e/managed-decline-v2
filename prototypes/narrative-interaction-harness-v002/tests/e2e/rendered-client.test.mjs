import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { launchBrowser, sleep, waitForHttp } from './cdp.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const port = 4182;
let server;
let browserCounter = 0;

before(async () => {
  server = spawn(process.execPath, ['server.mjs'], {
    cwd: root,
    env: { ...process.env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  await waitForHttp(`http://127.0.0.1:${port}/`);
});

after(() => server?.kill('SIGTERM'));

async function withPage(scenarioId, callback) {
  const browser = await launchBrowser({ debugPort: 9440 + browserCounter++ });
  try {
    await browser.navigate(
      `http://127.0.0.1:${port}/?scenario=${encodeURIComponent(scenarioId)}`,
      { fixtureRoot: root, scenarioId },
    );
    await callback(browser.client);
  } finally {
    await browser.close();
  }
}

async function moveNear(client, target, radius = 92) {
  for (let step = 0; step < 18; step += 1) {
    const state = await client.evaluate('window.__HARNESS__.state()');
    const dx = target.x - state.player.x;
    const dy = target.y - state.player.y;
    if (Math.hypot(dx, dy) <= radius) return;
    const horizontal = Math.abs(dx) >= Math.abs(dy);
    const key = horizontal ? (dx >= 0 ? 'd' : 'a') : (dy >= 0 ? 's' : 'w');
    const distance = horizontal ? Math.abs(dx) : Math.abs(dy);
    await client.hold(key, Math.max(80, Math.min(520, ((distance - radius * 0.55) / 190) * 1000)));
    await sleep(40);
  }
  throw new Error(`Could not move near ${JSON.stringify(target)}`);
}

async function waitPrompt(client, id) {
  await client.waitForExpression(`window.__HARNESS__.prompt()?.id === ${JSON.stringify(id)}`);
}

async function advanceTurns(client, count) {
  for (let index = 0; index < count; index += 1) {
    await client.press('enter');
    await sleep(60);
  }
}

test('panel fixture completes through the generic rendered client', async () => {
  await withPage('panel-fixture', async (client) => {
    await moveNear(client, { x: 248, y: 332 });
    await waitPrompt(client, 'help_hold');
    await client.press('e');
    await sleep(300);
    await waitPrompt(client, 'read_label');
    await client.press('e');
    await client.waitForExpression('!document.querySelector("#vn").hidden');
    await advanceTurns(client, 2);
    await client.press('1');
    await advanceTurns(client, 2);
    await client.waitForExpression('window.__HARNESS__.state().stage === "follow_ari"');
    await moveNear(client, { x: 690, y: 206 }, 108);
    await waitPrompt(client, 'follow_ari');
    await client.press('e');
    await client.waitForExpression('window.__HARNESS__.state().ended');
    const audit = await client.evaluate('window.__HARNESS__.audit()');
    assert.equal(audit.passed, true);
    const state = await client.evaluate('window.__HARNESS__.state()');
    assert.equal(state.ending, 'door_reached');
  });
});

test('parcel fixture completes through the same generic rendered client', async () => {
  await withPage('parcel-fixture', async (client) => {
    await moveNear(client, { x: 244, y: 326 });
    await waitPrompt(client, 'lift_parcel');
    await client.press('e');
    await sleep(300);
    await waitPrompt(client, 'read_address');
    await client.press('e');
    await client.waitForExpression('!document.querySelector("#vn").hidden');
    await advanceTurns(client, 2);
    await client.press('1');
    await advanceTurns(client, 2);
    await client.waitForExpression('window.__HARNESS__.state().stage === "follow_nia"');
    await moveNear(client, { x: 650, y: 188 }, 110);
    await waitPrompt(client, 'reach_lift');
    await client.press('e');
    await client.waitForExpression('window.__HARNESS__.state().ended');
    const state = await client.evaluate('window.__HARNESS__.state()');
    assert.equal(state.ending, 'lift_reached');
    assert.equal((await client.evaluate('window.__HARNESS__.audit()')).passed, true);
  });
});

test('rapid and repeated input cannot replay a consumed affordance', async () => {
  await withPage('panel-fixture', async (client) => {
    await moveNear(client, { x: 248, y: 332 });
    await waitPrompt(client, 'help_hold');
    await client.press('e');
    await client.press('e', { repeat: true });
    await client.press('e');
    await client.press('e');
    await sleep(500);
    const state = await client.evaluate('window.__HARNESS__.state()');
    assert.equal(state.actionUses.help_hold, 1);
    assert.equal(state.fictionalMinutes, 3);
    assert.equal((await client.evaluate('window.__HARNESS__.prompt().id')), 'read_label');
  });
});

test('cancelled focused interaction returns to a live resumable prompt', async () => {
  await withPage('panel-fixture', async (client) => {
    await moveNear(client, { x: 248, y: 332 });
    await client.press('e');
    await sleep(300);
    await client.press('e');
    await client.waitForExpression('!document.querySelector("#vn").hidden');
    await client.press('escape');
    await client.waitForExpression('window.__HARNESS__.state().stage === "exchange_paused"');
    await waitPrompt(client, 'resume_exchange');
    await sleep(280);
    await client.press('e');
    await client.waitForExpression('!document.querySelector("#vn").hidden');
    const state = await client.evaluate('window.__HARNESS__.state()');
    assert.equal(state.currentVN, 'ari_question');
    assert.equal(state.mode, 'vn');
  });
});

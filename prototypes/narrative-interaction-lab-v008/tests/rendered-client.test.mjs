import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  launchBrowser,
  sleep,
  waitForHttp,
} from '../../narrative-interaction-harness-v002/tests/e2e/cdp.mjs';

const scenarioRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const harnessRoot = path.resolve(scenarioRoot, '../narrative-interaction-harness-v002');
const port = 4188;
let server;
let browserCounter = 0;

before(async () => {
  server = spawn(process.execPath, ['server.mjs'], {
    cwd: scenarioRoot,
    env: { ...process.env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  await waitForHttp(`http://127.0.0.1:${port}/`);
});

after(() => server?.kill('SIGTERM'));

function asDataModule(source) {
  return `data:text/javascript;base64,${Buffer.from(source, 'utf8').toString('base64')}`;
}

function replaceImport(source, specifier, targetUrl) {
  return source.replaceAll(`from '${specifier}'`, `from '${targetUrl}'`)
    .replaceAll(`from \"${specifier}\"`, `from \"${targetUrl}\"`);
}

async function injectV008(client) {
  const readHarness = (relative) => fs.readFileSync(path.join(harnessRoot, relative), 'utf8');
  const readScenario = (relative) => fs.readFileSync(path.join(scenarioRoot, relative), 'utf8');

  const contractUrl = asDataModule(readHarness('src/scenario-contract.js'));
  const traceUrl = asDataModule(readHarness('src/trace-audit.js'));
  const renderUrl = asDataModule(readHarness('src/render.js'));
  const vnUrl = asDataModule(readHarness('src/vn.js'));
  const engineUrl = asDataModule(replaceImport(readHarness('src/engine.js'), './scenario-contract.js', contractUrl));

  let createApp = readHarness('src/create-app.js');
  createApp = replaceImport(createApp, './engine.js', engineUrl);
  createApp = replaceImport(createApp, './render.js', renderUrl);
  createApp = replaceImport(createApp, './trace-audit.js', traceUrl);
  createApp = replaceImport(createApp, './vn.js', vnUrl);
  const createAppUrl = asDataModule(createApp);

  let scenarioSource = readScenario('scenario.js');
  scenarioSource = replaceImport(
    scenarioSource,
    '../narrative-interaction-harness-v002/src/scenario-contract.js',
    contractUrl,
  );
  const scenarioUrl = asDataModule(scenarioSource);
  const bootstrapUrl = asDataModule(`
    import { mountScenarioApp } from '${createAppUrl}';
    import { v008Scenario } from '${scenarioUrl}';
    mountScenarioApp({ scenario: v008Scenario });
  `);

  let html = readScenario('index.html');
  html = html.replace(
    '<link rel="stylesheet" href="/narrative-interaction-harness-v002/styles.css">',
    `<style>${readHarness('styles.css')}</style>`,
  );
  html = html.replace(
    '<link rel="stylesheet" href="styles.css">',
    `<style>${readScenario('styles.css')}</style>`,
  );
  html = html.replace('<script type="module" src="app.js"></script>', `<script type="module" src="${bootstrapUrl}"></script>`);
  await client.send('Page.navigate', { url: 'about:blank' });
  await client.evaluate(`document.open(); document.write(${JSON.stringify(html)}); document.close(); true`);
}

async function withPage(callback) {
  const browser = await launchBrowser({ debugPort: 9490 + browserCounter++ });
  try {
    const client = browser.client;
    const loaded = client.waitFor('Page.loadEventFired');
    await client.send('Page.navigate', { url: `http://127.0.0.1:${port}/` });
    await loaded;
    const currentUrl = await client.evaluate('location.href');
    if (currentUrl.startsWith('chrome-error://')) await injectV008(client);
    await client.waitForExpression('window.__HARNESS__');
    await callback(client);
  } finally {
    await browser.close();
  }
}

async function moveNear(client, target, radius = 92) {
  for (let step = 0; step < 20; step += 1) {
    const state = await client.evaluate('window.__HARNESS__.state()');
    const dx = target.x - state.player.x;
    const dy = target.y - state.player.y;
    if (Math.hypot(dx, dy) <= radius) return;
    const horizontal = Math.abs(dx) >= Math.abs(dy);
    const key = horizontal ? (dx >= 0 ? 'd' : 'a') : (dy >= 0 ? 's' : 'w');
    const distance = horizontal ? Math.abs(dx) : Math.abs(dy);
    await client.hold(key, Math.max(80, Math.min(520, ((distance - radius * 0.55) / 190) * 1000)));
    await sleep(35);
  }
  throw new Error(`Could not move near ${JSON.stringify(target)}`);
}

async function waitPrompt(client, id) {
  await client.waitForExpression(`window.__HARNESS__.prompt()?.id === ${JSON.stringify(id)}`);
}

async function enterVNAtKiosk(client) {
  await moveNear(client, { x: 394, y: 278 });
  await waitPrompt(client, 'join_kiosk');
  await client.press('e');
  await client.waitForExpression('!document.querySelector("#vn").hidden');
}

async function advance(client, count) {
  for (let index = 0; index < count; index += 1) {
    await client.press('enter');
    await sleep(55);
  }
}

async function playToPlacement(client, choices = { first: '3', outtake: '3', note: '2' }) {
  await enterVNAtKiosk(client);
  await advance(client, 3);
  await client.press(choices.first);
  await advance(client, choices.first === '4' ? 2 : 1);
  await advance(client, 3);
  await client.press(choices.outtake);
  await advance(client, 2);
  await client.waitForExpression('window.__HARNESS__.state().stage === "reach_printer"');
  await moveNear(client, { x: 622, y: 292 }, 105);
  await waitPrompt(client, 'take_printout');
  await client.press('e');
  await client.waitForExpression('!document.querySelector("#vn").hidden');
  await advance(client, 3);
  await client.press(choices.note);
  await advance(client, choices.note === '4' ? 2 : 1);
  await client.waitForExpression('window.__HARNESS__.state().stage === "place_sheet"');
}

test('intended v008 route completes map to VN to map residue through real input', async () => {
  await withPage(async (client) => {
    await playToPlacement(client);
    await moveNear(client, { x: 794, y: 210 }, 105);
    await waitPrompt(client, 'pin_sheet');
    await client.press('e');
    await client.waitForExpression('window.__HARNESS__.state().ended');
    const state = await client.evaluate('window.__HARNESS__.state()');
    assert.equal(state.ending, 'noticeboard');
    assert.equal(state.facts.note, 'biscuits');
    assert.equal((await client.evaluate('window.__HARNESS__.audit()')).passed, true);
  });
});

test('rapid input cannot replay the kiosk affordance', async () => {
  await withPage(async (client) => {
    await moveNear(client, { x: 394, y: 278 });
    await waitPrompt(client, 'join_kiosk');
    await client.press('e');
    await client.press('e', { repeat: true });
    await client.press('e');
    await client.press('e');
    await sleep(450);
    const state = await client.evaluate('window.__HARNESS__.state()');
    assert.equal(state.actionUses.join_kiosk, 1);
    assert.equal(state.fictionalMinutes, 1);
    assert.equal(state.mode, 'vn');
  });
});

test('cancel and resume returns to the same kiosk screen', async () => {
  await withPage(async (client) => {
    await enterVNAtKiosk(client);
    await client.press('escape');
    await client.waitForExpression('window.__HARNESS__.state().stage === "kiosk_paused"');
    await waitPrompt(client, 'resume_kiosk');
    await sleep(280);
    await client.press('e');
    await client.waitForExpression('!document.querySelector("#vn").hidden');
    const state = await client.evaluate('window.__HARNESS__.state()');
    assert.equal(state.currentVN, 'question');
  });
});

test('the player can leave immediately without entering a route package', async () => {
  await withPage(async (client) => {
    await moveNear(client, { x: 42, y: 472 }, 80);
    await waitPrompt(client, 'leave_early');
    await client.press('e');
    await client.waitForExpression('window.__HARNESS__.state().ended');
    const state = await client.evaluate('window.__HARNESS__.state()');
    assert.equal(state.ending, 'left_early');
    assert.equal(state.facts.kioskJoined, false);
  });
});

test('an alternative visible-controls route gives the physical artefact to Tabitha', async () => {
  await withPage(async (client) => {
    await playToPlacement(client, { first: '4', outtake: '4', note: '4' });
    await client.waitForExpression('Math.hypot(window.__HARNESS__.state().actors.tabitha.x - 446, window.__HARNESS__.state().actors.tabitha.y - 418) < 8');
    await moveNear(client, { x: 446, y: 418 }, 90);
    await waitPrompt(client, 'give_sheet');
    await client.press('e');
    await client.waitForExpression('window.__HARNESS__.state().ended');
    const state = await client.evaluate('window.__HARNESS__.state()');
    assert.equal(state.ending, 'tabitha');
    assert.equal(state.facts.note, 'tabitha');
    assert.equal((await client.evaluate('window.__HARNESS__.audit()')).passed, true);
  });
});

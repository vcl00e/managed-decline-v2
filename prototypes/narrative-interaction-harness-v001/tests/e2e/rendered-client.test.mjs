import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { auditTracePayload } from '../../src/trace-audit.js';
import { launchBrowser, sleep, waitForHttp } from './cdp.mjs';

const port = 4181;
const fixtureRoot = fileURLToPath(new URL('../..', import.meta.url));
let server;
let browser;

async function freshPage() {
  await browser.navigate(`http://127.0.0.1:${port}/?run=${Date.now()}`, { fixtureRoot });
  await browser.client.evaluate('window.__HARNESS__.reset()');
  await browser.client.waitForExpression("document.querySelector('#debrief').hidden");
}

async function moveToPanel() {
  await browser.client.hold('d', 650);
  await browser.client.waitForExpression("document.querySelector('#interaction-prompt').textContent.includes('Help Ari')");
}

async function advanceToChoices() {
  await browser.client.press('enter');
  await sleep(40);
  await browser.client.press('enter');
  await browser.client.waitForExpression("document.querySelectorAll('#vn-choices button[data-choice]').length === 2");
}

test.before(async () => {
  server = spawn(process.execPath, ['server.mjs'], {
    cwd: new URL('../..', import.meta.url),
    env: { ...process.env, PORT: String(port) },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  await waitForHttp(`http://127.0.0.1:${port}/`);
  browser = await launchBrowser({ debugPort: 9334 });
});

test.after(async () => {
  await browser?.close();
  server?.kill('SIGTERM');
});

test('intended rendered route completes through real keyboard input', async () => {
  await freshPage();
  await moveToPanel();

  await browser.client.press('e');
  await browser.client.waitForExpression("document.querySelector('#interaction-prompt').textContent.includes('Read the exposed label')");
  await sleep(280);
  await browser.client.press('e');
  await browser.client.waitForExpression("!document.querySelector('#vn').hidden");

  await advanceToChoices();
  await browser.client.press('enter');
  await browser.client.waitForExpression("window.__HARNESS__.state().stage === 'follow_ari' && document.querySelector('#vn-text').textContent === 'It moves.'");
  await browser.client.press('enter');
  await browser.client.waitForExpression("document.querySelector('#vn-text').textContent === 'Then come on.'");
  await browser.client.press('enter');
  await browser.client.waitForExpression("document.querySelector('#vn').hidden && window.__HARNESS__.state().stage === 'follow_ari'");

  await browser.client.hold('d', 2350);
  await browser.client.hold('w', 760);
  await browser.client.waitForExpression("document.querySelector('#interaction-prompt').textContent.includes('Follow Ari')");
  await browser.client.press('e');
  await browser.client.waitForExpression("window.__HARNESS__.state().ended === true");

  const state = await browser.client.evaluate('window.__HARNESS__.state()');
  assert.equal(state.ending, 'door_reached');
  const report = auditTracePayload(state);
  assert.equal(report.passed, true, JSON.stringify(report, null, 2));
});

test('rapid repeated interaction input cannot consume or chain stale affordances', async () => {
  await freshPage();
  await moveToPanel();

  await browser.client.keyDown('e');
  await browser.client.waitForExpression("window.__HARNESS__.state().actionUses.help_hold === 1");
  for (let index = 0; index < 12; index += 1) {
    await browser.client.send('Input.dispatchKeyEvent', {
      type: 'keyDown',
      key: 'e',
      code: 'KeyE',
      windowsVirtualKeyCode: 69,
      nativeVirtualKeyCode: 69,
      text: 'e',
      autoRepeat: true,
    });
  }
  await browser.client.keyUp('e');

  await browser.client.waitForExpression("document.querySelector('#interaction-prompt').textContent.includes('Read the exposed label')");
  const state = await browser.client.evaluate('window.__HARNESS__.state()');
  assert.equal(state.actionUses.help_hold, 1);
  assert.equal(state.actionUses.read_label, undefined);
  assert.equal(state.fictionalMinutes, 3);
  assert.equal(await browser.client.text('#interaction-prompt'), 'E — Read the exposed label');

  const ignored = state.trace.filter((event) => event.type === 'input_ignored');
  assert.ok(ignored.length >= 1);
});

test('cancelled focused interaction returns to the live space and can resume once', async () => {
  await freshPage();
  await moveToPanel();
  await browser.client.press('e');
  await sleep(280);
  await browser.client.press('e');
  await browser.client.waitForExpression("!document.querySelector('#vn').hidden");
  await browser.client.press('escape');
  await browser.client.waitForExpression("document.querySelector('#vn').hidden && document.querySelector('#interaction-prompt').textContent.includes('Continue the interrupted exchange')");
  assert.equal(await browser.client.text('#interaction-prompt'), 'E — Continue the interrupted exchange');

  await sleep(280);
  await browser.client.press('e');
  await browser.client.waitForExpression("!document.querySelector('#vn').hidden");
  const state = await browser.client.evaluate('window.__HARNESS__.state()');
  assert.equal(state.actionUses.resume_exchange, 1);
});

test('uninformed visible-prompt policy can complete a run without internal route knowledge', async () => {
  await freshPage();

  for (let step = 0; step < 100 && !(await browser.client.evaluate('window.__HARNESS__.state().ended')); step += 1) {
    const vnVisible = await browser.client.evaluate("!document.querySelector('#vn').hidden");
    if (vnVisible) {
      const choiceCount = await browser.client.evaluate("document.querySelectorAll('#vn-choices button[data-choice]').length");
      if (choiceCount) {
        await browser.client.press('tab');
        await browser.client.press('enter');
      } else await browser.client.press('enter');
      await sleep(40);
      continue;
    }

    const visiblePrompt = await browser.client.text('#interaction-prompt');
    if (visiblePrompt) {
      await browser.client.press('e');
      await sleep(280);
    } else {
      await browser.client.hold('d', 120);
    }
  }

  const state = await browser.client.evaluate('window.__HARNESS__.state()');
  assert.equal(state.ended, true, 'visible-prompt policy exceeded its step budget');
  assert.equal(state.ending, 'left_alone');
  assert.equal(auditTracePayload(state).passed, true);
});

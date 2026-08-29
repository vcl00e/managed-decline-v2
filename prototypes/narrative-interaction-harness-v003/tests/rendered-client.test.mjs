import test from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { launchBrowser, sleep, waitForHttp } from '../../narrative-interaction-harness-v002/tests/e2e/cdp.mjs';

const ROOT_URL = 'http://127.0.0.1:4190/';

async function withApp(fn) {
  const server = spawn(process.execPath, ['server.mjs'], { cwd: new URL('..', import.meta.url), stdio: 'ignore' });
  let browser;
  try {
    await waitForHttp(ROOT_URL);
    browser = await launchBrowser({ debugPort: 9490 + Math.floor(Math.random() * 100) });
    await browser.client.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    await browser.navigate(ROOT_URL);
    await fn(browser.client);
  } finally {
    await browser?.close();
    server.kill('SIGTERM');
  }
}

test('rendered control restores large focused VN and persistent context', async () => {
  await withApp(async (client) => {
    const initialSituation = await client.text('#situation');
    assert.match(initialSituation, /Tabitha is sitting beside you/);
    await sleep(2600);
    assert.equal(await client.text('#situation'), initialSituation, 'important situation text must not expire');

    await client.press('e');
    await client.waitForExpression("!document.querySelector('#vn').hidden");
    const metrics = await client.evaluate(`(() => {
      const card = document.querySelector('.vn-card').getBoundingClientRect();
      const text = getComputedStyle(document.querySelector('#vn-text'));
      const shell = document.querySelector('.shell').getBoundingClientRect();
      return { cardWidth: card.width, cardHeight: card.height, cardTop: card.top, textSize: parseFloat(text.fontSize), shellWidth: shell.width };
    })()`);
    assert.ok(metrics.shellWidth >= 1100, JSON.stringify(metrics));
    assert.ok(metrics.cardWidth >= 940, JSON.stringify(metrics));
    assert.ok(metrics.cardHeight >= 540, JSON.stringify(metrics));
    assert.ok(metrics.cardTop < 180, JSON.stringify(metrics));
    assert.ok(metrics.textSize >= 26, JSON.stringify(metrics));

    for (let i = 0; i < 3; i++) await client.press('enter');
    await client.press('1');
    await client.press('enter');
    for (let i = 0; i < 3; i++) await client.press('enter');
    await client.press('1');
    await client.press('enter');
    for (let i = 0; i < 3; i++) await client.press('enter');
    await client.press('1');
    await client.press('enter');

    await client.waitForExpression("document.querySelector('#vn').hidden");
    const state = await client.evaluate('window.__HARNESS__.state()');
    assert.equal(state.stage, 'control_residue');
    assert.equal(state.actors.tabitha.target.x, 360);
    assert.equal(state.actors.tabitha.target.y, 410);
    assert.match(await client.text('#situation'), /Tabitha stays beside you/);
    assert.match(await client.text('#feedback'), /still beside you/);
  });
});

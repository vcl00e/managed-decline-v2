import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

function executableExists(command) {
  if (!command) return false;
  if (command.includes('/')) return fs.existsSync(command);
  return spawnSync('bash', ['-lc', `command -v ${JSON.stringify(command)}`], { encoding: 'utf8' }).status === 0;
}

export function findChromium() {
  const candidates = [
    process.env.CHROMIUM_PATH,
    'google-chrome',
    'google-chrome-stable',
    'chromium',
    'chromium-browser',
  ].filter(Boolean);
  const found = candidates.find(executableExists);
  if (!found) throw new Error('No Chromium/Chrome executable found. Set CHROMIUM_PATH.');
  return found;
}

export async function waitForHttp(url, timeoutMs = 10000) {
  const deadline = Date.now() + timeoutMs;
  let lastError;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url);
      if (response.ok) return response;
    } catch (error) {
      lastError = error;
    }
    await sleep(80);
  }
  throw new Error(`Timed out waiting for ${url}: ${lastError?.message ?? 'unknown error'}`);
}

export class CDPClient {
  constructor(webSocketUrl) {
    this.socket = new WebSocket(webSocketUrl);
    this.nextId = 1;
    this.pending = new Map();
    this.waiters = new Map();
    this.ready = new Promise((resolve, reject) => {
      this.socket.addEventListener('open', resolve, { once: true });
      this.socket.addEventListener('error', reject, { once: true });
    });
    this.socket.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        if (message.error) pending.reject(new Error(message.error.message));
        else pending.resolve(message.result);
        return;
      }
      const queue = this.waiters.get(message.method);
      if (queue?.length) queue.shift()(message.params);
    });
  }

  async send(method, params = {}) {
    await this.ready;
    const id = this.nextId++;
    const result = new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
    this.socket.send(JSON.stringify({ id, method, params }));
    return result;
  }

  waitFor(method, timeoutMs = 10000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`Timed out waiting for CDP event ${method}`)), timeoutMs);
      const wrapped = (value) => {
        clearTimeout(timer);
        resolve(value);
      };
      const queue = this.waiters.get(method) ?? [];
      queue.push(wrapped);
      this.waiters.set(method, queue);
    });
  }

  async evaluate(expression) {
    const result = await this.send('Runtime.evaluate', {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text ?? 'Runtime evaluation failed');
    return result.result.value;
  }

  async waitForExpression(expression, timeoutMs = 7000) {
    const deadline = Date.now() + timeoutMs;
    while (Date.now() < deadline) {
      if (await this.evaluate(`Boolean(${expression})`)) return;
      await sleep(50);
    }
    throw new Error(`Timed out waiting for expression: ${expression}`);
  }

  async text(selector) {
    return this.evaluate(`document.querySelector(${JSON.stringify(selector)})?.textContent ?? ''`);
  }

  async press(key, options = {}) {
    const mapping = keyMapping(key);
    await this.send('Input.dispatchKeyEvent', { type: 'keyDown', ...mapping, autoRepeat: Boolean(options.repeat) });
    if (options.holdMs) await sleep(options.holdMs);
    await this.send('Input.dispatchKeyEvent', { type: 'keyUp', ...mapping });
  }

  async keyDown(key) {
    await this.send('Input.dispatchKeyEvent', { type: 'keyDown', ...keyMapping(key), autoRepeat: false });
  }

  async keyUp(key) {
    await this.send('Input.dispatchKeyEvent', { type: 'keyUp', ...keyMapping(key) });
  }

  async hold(key, milliseconds) {
    await this.keyDown(key);
    await sleep(milliseconds);
    await this.keyUp(key);
  }

  close() {
    this.socket.close();
  }
}

function keyMapping(key) {
  const lower = key.toLowerCase();
  const special = {
    enter: { key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13 },
    escape: { key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27, nativeVirtualKeyCode: 27 },
    tab: { key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 },
    '1': { key: '1', code: 'Digit1', windowsVirtualKeyCode: 49, nativeVirtualKeyCode: 49, text: '1', unmodifiedText: '1' },
    '2': { key: '2', code: 'Digit2', windowsVirtualKeyCode: 50, nativeVirtualKeyCode: 50, text: '2', unmodifiedText: '2' },
    arrowup: { key: 'ArrowUp', code: 'ArrowUp', windowsVirtualKeyCode: 38, nativeVirtualKeyCode: 38 },
    arrowdown: { key: 'ArrowDown', code: 'ArrowDown', windowsVirtualKeyCode: 40, nativeVirtualKeyCode: 40 },
    arrowleft: { key: 'ArrowLeft', code: 'ArrowLeft', windowsVirtualKeyCode: 37, nativeVirtualKeyCode: 37 },
    arrowright: { key: 'ArrowRight', code: 'ArrowRight', windowsVirtualKeyCode: 39, nativeVirtualKeyCode: 39 },
  };
  if (special[lower]) return special[lower];
  const upper = lower.toUpperCase();
  return {
    key: lower,
    code: `Key${upper}`,
    windowsVirtualKeyCode: upper.charCodeAt(0),
    nativeVirtualKeyCode: upper.charCodeAt(0),
    text: lower,
  };
}


function asDataModule(source) {
  return `data:text/javascript;base64,${Buffer.from(source, 'utf8').toString('base64')}`;
}

function replaceImport(source, specifier, targetUrl) {
  return source.replaceAll(`from '${specifier}'`, `from '${targetUrl}'`)
    .replaceAll(`from "${specifier}"`, `from "${targetUrl}"`);
}

export async function injectFixture(client, rootInput) {
  const root = rootInput instanceof URL ? fileURLToPath(rootInput) : String(rootInput);
  const read = (relative) => fs.readFileSync(path.join(root, relative), 'utf8');

  const scenarioUrl = asDataModule(read('src/scenario.js'));
  const traceAuditUrl = asDataModule(read('src/trace-audit.js'));
  const engineUrl = asDataModule(replaceImport(read('src/engine.js'), './scenario.js', scenarioUrl));
  const vnUrl = asDataModule(replaceImport(read('src/vn.js'), './scenario.js', scenarioUrl));

  let appSource = read('app.js');
  appSource = replaceImport(appSource, './src/engine.js', engineUrl);
  appSource = replaceImport(appSource, './src/scenario.js', scenarioUrl);
  appSource = replaceImport(appSource, './src/trace-audit.js', traceAuditUrl);
  appSource = replaceImport(appSource, './src/vn.js', vnUrl);
  const appUrl = asDataModule(appSource);

  let html = read('index.html');
  html = html.replace('<link rel="stylesheet" href="styles.css">', `<style>${read('styles.css')}</style>`);
  html = html.replace('<script type="module" src="app.js"></script>', `<script type="module" src="${appUrl}"></script>`);

  await client.send('Page.navigate', { url: 'about:blank' });
  await client.evaluate(`document.open(); document.write(${JSON.stringify(html)}); document.close(); true`);
}

export async function launchBrowser({ debugPort = 9333 } = {}) {
  const executable = findChromium();
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'md-harness-chrome-'));
  const processHandle = spawn(executable, [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--remote-allow-origins=*',
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${profile}`,
    'about:blank',
  ], { stdio: ['ignore', 'pipe', 'pipe'] });

  await waitForHttp(`http://127.0.0.1:${debugPort}/json/version`);
  const targets = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json();
  const target = targets.find((item) => item.type === 'page');
  if (!target) throw new Error('Chromium did not expose a page target.');
  const client = new CDPClient(target.webSocketDebuggerUrl);
  await client.ready;
  await client.send('Page.enable');
  await client.send('Runtime.enable');

  async function navigate(url, { fixtureRoot = null } = {}) {
    const loaded = client.waitFor('Page.loadEventFired');
    await client.send('Page.navigate', { url });
    await loaded;
    const currentUrl = await client.evaluate('location.href');
    if (currentUrl.startsWith('chrome-error://') && fixtureRoot) {
      await injectFixture(client, fixtureRoot);
    }
    await client.waitForExpression('window.__HARNESS__');
  }

  async function close() {
    client.close();
    processHandle.kill('SIGTERM');
    await sleep(80);
    fs.rmSync(profile, { recursive: true, force: true });
  }

  return { client, navigate, close, processHandle };
}

export { sleep };

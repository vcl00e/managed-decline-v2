import { createRuntime } from './src/engine.js';
import { WORLD } from './src/scenario.js';
import { auditTracePayload } from './src/trace-audit.js';
import { createVNView } from './src/vn.js';

const $ = (selector) => document.querySelector(selector);
const canvas = $('#world');
const context = canvas.getContext('2d');
const notice = $('#notice');
const prompt = $('#interaction-prompt');
const hudStage = $('#hud-stage');
const hudTime = $('#hud-time');
const debrief = $('#debrief');
const endingCopy = $('#ending-copy');
const keys = new Set();
let noticeTimer = null;
let interactionLockedUntil = 0;
const runtime = createRuntime(globalThis.crypto?.randomUUID?.());

function showNotice(text, duration = 2200) {
  notice.textContent = text;
  notice.classList.add('visible');
  clearTimeout(noticeTimer);
  noticeTimer = setTimeout(() => notice.classList.remove('visible'), duration);
}

function showDebrief() {
  const audit = auditTracePayload(runtime.snapshot());
  endingCopy.textContent = audit.passed
    ? `Ending: ${runtime.state.ending}. Trace audit passed.`
    : `Ending: ${runtime.state.ending}. Trace audit found ${audit.errorCount} error(s).`;
  debrief.hidden = false;
}

function afterStateChange() {
  const last = runtime.state.visibleChanges.at(-1);
  if (last) showNotice(last.detail);
  if (runtime.state.mode === 'vn' && runtime.state.currentVN && !vn.active) {
    vn.open(runtime.state.currentVN);
  }
  if (runtime.state.ended) showDebrief();
}

const vn = createVNView({
  root: $('#vn'),
  title: $('#vn-title'),
  speaker: $('#vn-speaker'),
  text: $('#vn-text'),
  choices: $('#vn-choices'),
  runtime,
  onStateChange: afterStateChange,
});

function interact() {
  const now = performance.now();
  if (now < interactionLockedUntil) {
    runtime.state.trace.push({
      index: runtime.state.trace.length,
      type: 'input_ignored',
      fictionalTime: runtime.state.fictionalTime,
      reason: 'interaction_lock',
    });
    return;
  }
  interactionLockedUntil = now + 240;
  const current = runtime.prompt();
  if (!current) return;
  const result = runtime.performAction(current.id);
  if (result.accepted) afterStateChange();
}

function updateMovement(deltaSeconds) {
  if (runtime.state.mode !== 'world' || runtime.state.ended) return;
  let x = 0;
  let y = 0;
  if (keys.has('a') || keys.has('arrowleft')) x -= 1;
  if (keys.has('d') || keys.has('arrowright')) x += 1;
  if (keys.has('w') || keys.has('arrowup')) y -= 1;
  if (keys.has('s') || keys.has('arrowdown')) y += 1;
  if (!x && !y) return;
  const length = Math.hypot(x, y);
  runtime.movePlayer((x / length) * 185 * deltaSeconds, (y / length) * 185 * deltaSeconds);
}

function draw() {
  const state = runtime.state;
  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, '#afb9aa');
  gradient.addColorStop(1, '#d3c5aa');
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = '#e8dfcf';
  context.fillRect(170, 72, 610, 300);
  context.strokeStyle = '#847a68';
  context.lineWidth = 3;
  context.strokeRect(170, 72, 610, 300);

  context.fillStyle = '#766b59';
  context.fillRect(WORLD.panel.x - 42, WORLD.panel.y - 56, 84, 72);
  context.fillStyle = state.facts.panelHeld ? '#e6d7ac' : '#9a6f4c';
  context.fillRect(WORLD.panel.x - 35, WORLD.panel.y - 50, 70, 58);
  context.fillStyle = '#342f28';
  context.font = '11px system-ui';
  context.textAlign = 'center';
  context.fillText(state.facts.labelRead ? 'ROOM 4' : 'LOOSE PANEL', WORLD.panel.x, WORLD.panel.y - 20);

  context.fillStyle = '#685e50';
  context.fillRect(WORLD.door.x - 38, WORLD.door.y - 74, 76, 120);
  context.fillStyle = '#d8c7a6';
  context.fillRect(WORLD.door.x - 30, WORLD.door.y - 66, 60, 104);

  drawPerson(state.ari.x, state.ari.y, '#637b63', 'ARI', 18);
  drawPerson(state.player.x, state.player.y, '#242621', 'YOU', 15);

  context.fillStyle = '#47443c';
  context.font = '12px system-ui';
  context.textAlign = 'left';
  context.fillText('internal fixture: consumed affordance → VN → spatial consequence', 184, 100);
}

function drawPerson(x, y, color, label, radius) {
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fillStyle = color;
  context.fill();
  context.strokeStyle = '#fffaf0';
  context.lineWidth = 3;
  context.stroke();
  context.fillStyle = '#fff';
  context.font = 'bold 9px system-ui';
  context.textAlign = 'center';
  context.fillText(label, x, y + 3);
}

function updateHUD() {
  const current = runtime.prompt();
  prompt.textContent = current ? `E — ${current.label}` : '';
  hudStage.textContent = runtime.state.stage.replaceAll('_', ' ');
  hudTime.textContent = runtime.state.fictionalTime;
}

function reset() {
  runtime.reset(globalThis.crypto?.randomUUID?.());
  debrief.hidden = true;
  $('#vn').hidden = true;
  keys.clear();
  interactionLockedUntil = 0;
  showNotice('Move toward Ari and use the contextual prompt.', 2600);
}

window.addEventListener('keydown', (event) => {
  const key = event.key.toLowerCase();
  if (vn.active) {
    if (key === 'escape') {
      runtime.cancelVN();
      vn.close();
      afterStateChange();
      runtime.state.trace.push({
        index: runtime.state.trace.length,
        type: 'input_event',
        fictionalTime: runtime.state.fictionalTime,
        context: 'vn',
        key,
        handled: true,
      });
      event.preventDefault();
      return;
    }
    const handled = vn.handleKey(key);
    runtime.state.trace.push({
      index: runtime.state.trace.length,
      type: 'input_event',
      fictionalTime: runtime.state.fictionalTime,
      context: 'vn',
      key,
      handled,
    });
    if (handled) event.preventDefault();
    return;
  }
  if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
    keys.add(key);
    event.preventDefault();
  }
  if ((key === 'e' || key === 'enter') && event.repeat) {
    runtime.state.trace.push({
      index: runtime.state.trace.length,
      type: 'input_ignored',
      fictionalTime: runtime.state.fictionalTime,
      reason: 'key_repeat',
      key,
    });
    event.preventDefault();
    return;
  }
  if (key === 'e' || key === 'enter') {
    interact();
    event.preventDefault();
  }
});
window.addEventListener('keyup', (event) => keys.delete(event.key.toLowerCase()));
window.addEventListener('blur', () => keys.clear());

$('#reset').addEventListener('click', reset);
$('#run-again').addEventListener('click', reset);
$('#export').addEventListener('click', () => {
  const payload = [{ savedAt: new Date().toISOString(), state: runtime.snapshot() }];
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const anchor = document.createElement('a');
  anchor.href = URL.createObjectURL(blob);
  anchor.download = 'interaction-harness-v001-trace.json';
  anchor.click();
  URL.revokeObjectURL(anchor.href);
});

let previous = performance.now();
function frame(now) {
  const delta = Math.min(0.05, (now - previous) / 1000);
  previous = now;
  updateMovement(delta);
  runtime.tickNpc(delta);
  updateHUD();
  draw();
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
showNotice('Move toward Ari and use the contextual prompt.', 2600);

window.__HARNESS__ = {
  state: () => runtime.snapshot(),
  prompt: () => runtime.prompt(),
  audit: () => auditTracePayload(runtime.snapshot()),
  reset,
};

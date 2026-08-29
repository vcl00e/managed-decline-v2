import { createRuntime } from './engine.js';
import { drawScenario } from './render.js';
import { auditTracePayload } from './trace-audit.js';
import { createVNView } from './vn.js';

const MOVEMENT_KEYS = new Set([
  'w', 'a', 's', 'd',
  'arrowup', 'arrowdown', 'arrowleft', 'arrowright',
]);

export function mountScenarioApp({ scenario, root = document }) {
  const $ = (selector) => root.querySelector(selector);
  const canvas = $('#world');
  const context = canvas.getContext('2d');
  const notice = $('#notice');
  const prompt = $('#interaction-prompt');
  const hudStage = $('#hud-stage');
  const hudTime = $('#hud-time');
  const title = $('#scenario-title');
  const subtitle = $('#scenario-subtitle');
  const debrief = $('#debrief');
  const endingCopy = $('#ending-copy');
  const keys = new Set();
  let noticeTimer = null;
  let interactionLockedUntil = 0;
  let promptIndex = 0;
  let endedShown = false;
  const runtime = createRuntime(scenario, globalThis.crypto?.randomUUID?.());

  canvas.width = scenario.world.width;
  canvas.height = scenario.world.height;
  title.textContent = scenario.title;
  subtitle.textContent = scenario.subtitle ?? '';
  document.title = scenario.browserTitle ?? scenario.title;

  function showNotice(text, duration = 2200) {
    if (!text) return;
    notice.textContent = text;
    notice.classList.add('visible');
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => notice.classList.remove('visible'), duration);
  }

  function showDebrief() {
    if (endedShown) return;
    endedShown = true;
    const audit = auditTracePayload(runtime.snapshot(), scenario.auditOptions);
    const ending = scenario.endingSummary?.(runtime.state)
      ?? `Ending: ${runtime.state.ending}.`;
    endingCopy.textContent = audit.passed
      ? `${ending} Trace audit passed.`
      : `${ending} Trace audit found ${audit.errorCount} error(s).`;
    debrief.hidden = false;
  }

  function afterStateChange() {
    promptIndex = 0;
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

  function selectedPrompt() {
    const prompts = runtime.prompts();
    if (!prompts.length) return null;
    promptIndex %= prompts.length;
    return prompts[promptIndex];
  }

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
    interactionLockedUntil = now + (scenario.interactionLockMs ?? 240);
    const current = selectedPrompt();
    if (!current) return;
    const result = runtime.performAction(current.id);
    if (result.accepted) afterStateChange();
  }

  function cyclePrompt() {
    const prompts = runtime.prompts();
    if (prompts.length <= 1) return;
    promptIndex = (promptIndex + 1) % prompts.length;
    updateHUD();
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
    const speed = scenario.player?.speed ?? 185;
    runtime.movePlayer((x / length) * speed * deltaSeconds, (y / length) * speed * deltaSeconds);
  }

  function updateHUD() {
    const current = selectedPrompt();
    const count = runtime.prompts().length;
    prompt.textContent = current
      ? `${count > 1 ? 'TAB — cycle  ·  ' : ''}E — ${current.label}`
      : '';
    hudStage.textContent = scenario.stageLabel?.(runtime.state)
      ?? runtime.state.stage.replaceAll('_', ' ');
    hudTime.textContent = runtime.state.fictionalTime;
  }

  function reset() {
    runtime.reset(globalThis.crypto?.randomUUID?.());
    debrief.hidden = true;
    endedShown = false;
    if (vn.active) vn.close({ notify: false });
    $('#vn').hidden = true;
    keys.clear();
    interactionLockedUntil = 0;
    promptIndex = 0;
    showNotice(scenario.startingNotice ?? 'Move through the space and use contextual prompts.', 2800);
  }

  window.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if (vn.active) {
      if (key === 'escape') {
        runtime.cancelVN();
        vn.close({ notify: false });
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

    if (MOVEMENT_KEYS.has(key)) {
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
    if (key === 'tab') {
      cyclePrompt();
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

  $('#reset')?.addEventListener('click', reset);
  $('#run-again')?.addEventListener('click', reset);
  $('#export')?.addEventListener('click', () => {
    const payload = [{ savedAt: new Date().toISOString(), state: runtime.snapshot() }];
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const anchor = document.createElement('a');
    anchor.href = URL.createObjectURL(blob);
    anchor.download = `${scenario.id}-trace.json`;
    anchor.click();
    URL.revokeObjectURL(anchor.href);
  });

  let previous = performance.now();
  function frame(now) {
    const delta = Math.min(0.05, (now - previous) / 1000);
    previous = now;
    updateMovement(delta);
    runtime.tickActors(delta);
    updateHUD();
    drawScenario(context, scenario, runtime.state);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  showNotice(scenario.startingNotice ?? 'Move through the space and use contextual prompts.', 2800);

  const inspection = {
    scenarioId: scenario.id,
    state: () => runtime.snapshot(),
    prompt: () => selectedPrompt(),
    prompts: () => runtime.prompts(),
    audit: () => auditTracePayload(runtime.snapshot(), scenario.auditOptions),
    reset,
  };
  window.__HARNESS__ = inspection;
  window.__NARRATIVE_HARNESS__ = inspection;
  return { runtime, reset, inspection };
}

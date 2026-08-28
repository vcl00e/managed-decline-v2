import { createWorldRuntime } from './world.js';
import { createVNController } from './vn.js';
import { record, routeValueSummary } from './model.js';

const $ = (selector) => document.querySelector(selector);

const runtime = createWorldRuntime({
  canvas: $('#world'),
  hudZone: $('#hud-zone'),
  hudTime: $('#hud-time'),
  promptEl: $('#interaction-prompt'),
  noticeEl: $('#notice'),
  situationEl: $('#situation'),
});

const debrief = $('#debrief');
const summary = $('#debrief-summary');
const form = $('#debrief-form');

function persist(extra = null) {
  if (extra) record(runtime.state, 'debrief', extra);
  const runs = JSON.parse(localStorage.getItem('md-v007c-runs') || '[]');
  const payload = { savedAt: new Date().toISOString(), state: runtime.state };
  const index = runs.findIndex((run) => run.state?.runId === runtime.state.runId);
  if (index >= 0) runs[index] = payload;
  else runs.push(payload);
  localStorage.setItem('md-v007c-runs', JSON.stringify(runs));
}

function showDebrief() {
  runtime.setPaused(true);
  runtime.setInputContext('debrief');
  const value = routeValueSummary(runtime.state);
  const lines = [];

  const tabitha = value.experiences.tabitha_companionship;
  const group = value.experiences.radio_group;
  const priya = value.experiences.priya_companionship;
  const observer = value.experiences.observer_evening;

  if (tabitha.fulfilled.length) {
    const planText = value.tabitha.plan === 'breakfast'
      ? 'made breakfast plans for tomorrow'
      : value.tabitha.plan === 'notice_walk'
        ? 'turned the noticeboard into a private joke and a station-walk plan'
        : value.tabitha.plan === 'building_walk'
          ? 'made plans to see the old library together tomorrow'
          : 'spent a particular part of the evening together';
    lines.push(`You and Tabitha ${planText}.`);
  }
  if (group.fulfilled.length) lines.push('You became part of the radio group’s rhythm and what happened around it.');
  if (priya.fulfilled.length) lines.push('You and Priya found a quieter form of company inside the same evening.');
  if (observer.fulfilled.length) lines.push('You watched the room form, split and adapt without becoming its centre.');
  if (!lines.length) lines.push('You left without committing to one of the evening’s promoted social experiences.');

  summary.replaceChildren(...lines.map((text) => {
    const item = document.createElement('li');
    item.textContent = text;
    return item;
  }));

  debrief.hidden = false;
  persist();
}

const vn = createVNController({
  vn: $('#vn'),
  titleEl: $('#vn-title'),
  speakerEl: $('#vn-speaker'),
  textEl: $('#vn-text'),
  choicesEl: $('#vn-choices'),
  portraitEl: $('#vn-portrait'),
  runtime,
  onRunEnd: showDebrief,
});

runtime.setSceneHandler((sceneId) => vn.start(sceneId));
runtime.setEndHandler(showDebrief);

let last = performance.now();
function frame(now) {
  const deltaTime = Math.min(0.05, (now - last) / 1000);
  last = now;
  runtime.tick(deltaTime);
  runtime.draw();
  requestAnimationFrame(frame);
}
requestAnimationFrame((time) => {
  last = time;
  requestAnimationFrame(frame);
});

window.addEventListener('keydown', (event) => {
  const tag = document.activeElement?.tagName?.toLowerCase();
  if (['input', 'textarea', 'select'].includes(tag)) return;

  const key = event.key.toLowerCase();
  if (vn.active) {
    if (vn.handleKey(key)) event.preventDefault();
    return;
  }

  if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
    runtime.setKey(key, true);
    event.preventDefault();
  }
  if ((key === 'e' || key === 'enter') && !event.repeat) {
    runtime.interact();
    event.preventDefault();
  }
  if (key === 'tab' && !event.repeat) {
    runtime.cycleTarget();
    event.preventDefault();
  }
});

window.addEventListener('keyup', (event) => runtime.setKey(event.key.toLowerCase(), false));
window.addEventListener('blur', () => runtime.clearKeys());

$('#finish-run').onclick = showDebrief;
$('#reset-run').onclick = () => {
  debrief.hidden = true;
  form.reset();
  runtime.reset();
};

$('#export-trace').onclick = () => {
  const runs = JSON.parse(localStorage.getItem('md-v007c-runs') || '[]');
  const blob = new Blob([JSON.stringify(runs, null, 2)], { type: 'application/json' });
  const anchor = document.createElement('a');
  anchor.href = URL.createObjectURL(blob);
  anchor.download = `managed-decline-v007c-traces-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(anchor.href);
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  persist(Object.fromEntries(new FormData(form).entries()));
  runtime.showNotice('Debrief saved locally.');
});

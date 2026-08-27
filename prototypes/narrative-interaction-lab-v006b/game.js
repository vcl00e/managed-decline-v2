import { record, getOutcomeSummary } from './model.js';
import { createWorldRuntime } from './world.js';
import { createVNController } from './vn.js';

const $ = (s) => document.querySelector(s);
const runtime = createWorldRuntime({
  canvas: $('#world'),
  hudRoom: $('#hud-room'),
  hudTime: $('#hud-time'),
  promptEl: $('#interaction-prompt'),
  noticeEl: $('#notice'),
  situationEl: $('#situation'),
});
const debrief = $('#debrief'), summary = $('#debrief-summary'), form = $('#debrief-form');

function persist(extra = null) {
  if (extra) record(runtime.state, 'debrief', extra);
  const runs = JSON.parse(localStorage.getItem('md-v006b-runs') || '[]');
  const payload = { savedAt: new Date().toISOString(), state: runtime.state };
  const i = runs.findIndex((r) => r.state?.runId === runtime.state.runId);
  if (i >= 0) runs[i] = payload; else runs.push(payload);
  localStorage.setItem('md-v006b-runs', JSON.stringify(runs));
}

function showDebrief() {
  runtime.state.ended = true;
  runtime.setPaused(true);
  runtime.setInputContext('debrief');
  const lines = getOutcomeSummary(runtime.state);
  summary.replaceChildren(...lines.map((x) => {
    const li = document.createElement('li'); li.textContent = x; return li;
  }));
  debrief.hidden = false;
  record(runtime.state, 'run_ended', { outcome: lines });
  persist();
}

const vn = createVNController({
  vn: $('#vn'),
  titleEl: $('#vn-title'),
  speakerEl: $('#vn-speaker'),
  textEl: $('#vn-text'),
  choicesEl: $('#vn-choices'),
  runtime,
  onCompleteRun: showDebrief,
});
runtime.setSceneHandler((kind) => vn.start(kind));

let last = performance.now();
function frame(now) {
  const dt = Math.min(.05, (now - last) / 1000);
  last = now;
  runtime.tick(dt);
  runtime.draw();
  requestAnimationFrame(frame);
}
requestAnimationFrame((t) => { last = t; requestAnimationFrame(frame); });

window.addEventListener('keydown', (e) => {
  const tag = document.activeElement?.tagName?.toLowerCase();
  if (['input', 'textarea', 'select'].includes(tag)) return;
  const key = e.key.toLowerCase();
  if (vn.active) { if (vn.handleKey(key)) e.preventDefault(); return; }
  if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) {
    runtime.setKey(key, true); e.preventDefault();
  }
  if ((key === 'e' || key === 'enter') && !e.repeat) { runtime.interact(); e.preventDefault(); }
  if (key === 'tab' && !e.repeat) { runtime.cycleTarget(); e.preventDefault(); }
});
window.addEventListener('keyup', (e) => runtime.setKey(e.key.toLowerCase(), false));
window.addEventListener('blur', () => runtime.clearKeys());

$('#finish-run').onclick = () => { if (vn.active) vn.close({ cancelled: true }); showDebrief(); };
$('#reset-run').onclick = () => { debrief.hidden = true; form.reset(); runtime.reset(); };
$('#export-trace').onclick = () => {
  const runs = JSON.parse(localStorage.getItem('md-v006b-runs') || '[]');
  const blob = new Blob([JSON.stringify(runs, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `managed-decline-v006b-traces-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(a.href);
};
form.addEventListener('submit', (e) => {
  e.preventDefault();
  persist(Object.fromEntries(new FormData(form).entries()));
  runtime.showNotice('Debrief saved locally.');
});

import { CHARACTERS, ZONES, VN_SCENES } from './scenario.js';
import { createInitialState, applyChoice, addTrace, canOpenScene, triggerPriyaArrival, exportRun } from './model.js';

const canvas = document.querySelector('#world');
const ctx = canvas.getContext('2d');
const actionsEl = document.querySelector('#actions');
const ambientEl = document.querySelector('#ambient');
const situationEl = document.querySelector('#situationText');
const timeEl = document.querySelector('#timeLabel');
const phaseEl = document.querySelector('#phaseLabel');
const debugEl = document.querySelector('#debugState');
const overlay = document.querySelector('#vnOverlay');
const vnSpeaker = document.querySelector('#vnSpeaker');
const vnLine = document.querySelector('#vnLine');
const vnChoices = document.querySelector('#vnChoices');
const vnHint = document.querySelector('#vnHint');
const vnPortraits = document.querySelector('#vnPortraits');
const aftermathEl = document.querySelector('#aftermath');
const residueCards = document.querySelector('#residueCards');
const interpretationTrace = document.querySelector('#interpretationTrace');
const debriefEl = document.querySelector('#debrief');
const debriefForm = document.querySelector('#debriefForm');
const exportPreview = document.querySelector('#exportPreview');

let state = createInitialState();
let selectedAction = 0;
let currentActions = [];
let vn = null;
let ambientLines = [];
let lastAmbientKey = '';
let debriefData = {};

const keyState = new Set();

function distance(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
function near(x, y, radius = 105) { return distance(state.player, {x,y}) <= radius; }

function situationCopy() {
  const copy = {
    arrival: 'You and Tabitha have reached a small community hall. Music and badly levelled radio audio leak through the door.',
    warmup: 'The night is already happening without needing you. Maya and Alex are at the radio table; Tabitha is taking the room in.',
    group_warmup: 'You are part of a small group now. People are talking to each other rather than waiting for you to pick a topic.',
    priya_arrival: 'Priya has arrived at the entrance. She knows you, but not this crowd.',
    mixed_group: 'The group has expanded. The interesting question is less “who can I talk to?” than how you want to occupy the room.',
    free_social: 'The evening has loosened up. Tabitha has drifted outside; Priya is lingering near the tea table; the radio crowd is still going.',
    wind_down: 'The hall is being closed by policy rather than by physics. Everyone is deciding what “one more drink” actually means.',
    aftermath: 'Sunday morning. Nobody scored the evening. It simply left traces.'
  };
  return copy[state.phase] || 'The evening continues.';
}

function addAmbient(text) {
  if (!text || ambientLines[0] === text) return;
  ambientLines.unshift(text);
  ambientLines = ambientLines.slice(0, 10);
  ambientEl.innerHTML = ambientLines.map(line => `<p>${escapeHtml(line)}</p>`).join('');
}

function ambientForPhase() {
  const pools = {
    arrival: ['From inside: “No, that is the weather ident.”', 'A bus exhales at the kerb and leaves again.'],
    warmup: ['Maya: “If it peaks red again, simply believe less strongly in audio engineering.”', 'Alex drags a cable six inches and looks as though this has solved something.'],
    group_warmup: ['Tabitha and Maya are arguing about whether a jingle can be “administratively loud.”', 'Alex: “I am not adding another compression preset called FINAL FINAL.”'],
    priya_arrival: ['The outer door opens, pauses, then opens again with more commitment.'],
    mixed_group: ['Priya asks Maya a question about the programme. Maya answers Alex instead, then realises and starts again.', 'Tabitha laughs at something you did not hear.'],
    free_social: ['A track is playing quietly through one good speaker and one speaker that has given up.', 'Maya and Alex are discussing whether the caretaker counts as on-air talent now.'],
    wind_down: ['Someone has started packing cables with the solemnity of a state funeral.', 'Outside, somebody is already arguing for chips.']
  };
  const pool = pools[state.phase];
  if (!pool) return;
  const key = `${state.phase}:${Math.floor(state.player.x/120)}:${Math.floor(state.player.y/120)}`;
  if (key === lastAmbientKey) return;
  lastAmbientKey = key;
  addAmbient(pool[Math.abs(Math.floor(state.player.x + state.player.y)) % pool.length]);
}

function getActions() {
  if (state.flags.aftermath) return [];
  const a = [];
  const tab = state.characters.tabitha;
  const maya = state.characters.maya;
  const priya = state.characters.priya;
  const elliot = state.characters.elliot;

  if (canOpenScene(state, 'arrival_tabitha') && near(tab.x, tab.y, 120)) {
    a.push(action('arrival_tabitha', 'Start the evening with Tabitha', 'A short one-to-one moment before going in.'));
  }
  if (canOpenScene(state, 'join_radio_group') && (near(maya.x, maya.y, 150) || insideZone('main'))) {
    a.push(action('join_radio_group', 'Join Maya, Alex and Tabitha', 'Step into the existing conversation; you do not need to drive it.'));
  }
  if (canOpenScene(state, 'priya_arrives') && priya.visible && (near(priya.x, priya.y, 150) || insideZone('main'))) {
    const closeToPriya = near(priya.x, priya.y, 150);
    a.push(action('priya_arrives', closeToPriya ? 'Meet Priya at the entrance' : 'Stay put while Priya joins the room', closeToPriya ? 'Decide how, or whether, to fold her into the group.' : 'She is capable of joining people without being collected by the protagonist.'));
  }
  if (canOpenScene(state, 'kebab_story') && (near(maya.x, maya.y, 170) || insideZone('main'))) {
    a.push(action('kebab_story', 'Stay with the group conversation', 'A low-stakes audience choice: whose story is it to tell?'));
  }
  if (canOpenScene(state, 'tabitha_side_yard') && near(tab.x, tab.y, 150)) {
    a.push(action('tabitha_side_yard', 'Follow Tabitha outside', 'Let the group fall away for a quieter one-to-one moment.'));
  }
  if (canOpenScene(state, 'priya_quiet') && near(priya.x, priya.y, 150)) {
    a.push(action('priya_quiet', 'Talk with Priya by the tea table', 'A smaller conversation inside the same evening.'));
  }
  if (canOpenScene(state, 'closing_notice') && (near(elliot.x, elliot.y, 180) || insideZone('main'))) {
    a.push(action('closing_notice', 'Listen to the caretaker’s announcement', 'A modest practical disturbance; nobody has appointed you to solve it.'));
  }
  if (canOpenScene(state, 'final_choice') && (insideZone('main') || insideZone('side') || near(maya.x, maya.y, 220))) {
    a.push(action('final_choice', 'See where the night goes next', 'Choose the social texture you actually want, not a “best” route.'));
  }
  return a;
}

function action(sceneId, label, note) { return { sceneId, label, note, run: () => openScene(sceneId) }; }
function insideZone(id) {
  const z = ZONES[id];
  return state.player.x >= z.x && state.player.x <= z.x + z.w && state.player.y >= z.y && state.player.y <= z.y + z.h;
}

function postSceneWorldUpdate(sceneId) {
  if (sceneId === 'arrival_tabitha') {
    state.characters.tabitha.x = 445; state.characters.tabitha.y = 265;
    addAmbient('Tabitha heads in ahead of you and is already reacting to something Maya has said.');
  }
  if (sceneId === 'join_radio_group' && !state.flags.priyaArrived) {
    triggerPriyaArrival(state);
    addAmbient('Priya appears in the doorway, reads the “Community Resilience Hub” sign twice, and spots you.');
  }
  if (sceneId === 'priya_arrives') {
    state.characters.priya.x = 615;
    state.characters.priya.y = 300;
    addAmbient('Priya ends up in the group without a formal transition. Maya is already asking her something.');
  }
  if (sceneId === 'kebab_story') {
    state.characters.priya.x = 600;
    state.characters.priya.y = 330;
    addAmbient('Tabitha slips out to the side yard while Maya starts another track. Priya hovers near the tea table.');
  }
  if (sceneId === 'tabitha_side_yard') {
    addAmbient('From inside, Alex is explaining something to Priya with the confidence of a man who has just learned it himself.');
  }
  if (sceneId === 'priya_quiet') {
    addAmbient('Tabitha catches your eye from outside and raises a paper cup in acknowledgement.');
  }
  if (sceneId === 'closing_notice') {
    state.characters.tabitha.x = 705; state.characters.tabitha.y = 330;
    state.characters.priya.x = 620; state.characters.priya.y = 340;
    state.characters.maya.x = 535; state.characters.maya.y = 215;
    addAmbient('The room does not stop being enjoyable just because everyone is now carrying one cable.');
  }
  if (sceneId === 'final_choice') showAftermath();
}

function openScene(sceneId) {
  if (!canOpenScene(state, sceneId)) return;
  const scene = VN_SCENES[sceneId];
  vn = { sceneId, scene, lineIndex: 0, choosing: false };
  overlay.classList.remove('hidden');
  renderVN();
  addTrace(state, 'vn_open', { sceneId });
}

function renderVN() {
  const [speaker, line] = vn.scene.lines[vn.lineIndex];
  vnSpeaker.textContent = speaker;
  vnLine.textContent = line;
  vnChoices.innerHTML = '';
  vnPortraits.innerHTML = portraitsForScene(vn.sceneId).map(id => {
    const c = CHARACTERS[id];
    return `<div class="portrait" style="background:${c.color}">${c.short}</div>`;
  }).join('');

  const atEnd = vn.lineIndex >= vn.scene.lines.length - 1;
  if (atEnd) {
    vn.choosing = true;
    vn.scene.choices.forEach((choice, i) => {
      const b = document.createElement('button');
      b.className = 'vn-choice';
      b.textContent = `${i+1}. ${choice.text}`;
      b.addEventListener('click', () => chooseVN(i));
      vnChoices.appendChild(b);
    });
    vnHint.textContent = 'Choose 1–4';
  } else {
    vn.choosing = false;
    vnHint.textContent = 'Enter to continue';
  }
}

function portraitsForScene(sceneId) {
  if (sceneId === 'arrival_tabitha' || sceneId === 'tabitha_side_yard') return ['tabitha'];
  if (sceneId === 'priya_quiet') return ['priya'];
  if (sceneId === 'closing_notice') return ['elliot','maya','alex','tabitha'];
  if (sceneId === 'join_radio_group') return ['maya','alex','tabitha'];
  return ['maya','alex','tabitha','priya'];
}

function advanceVN() {
  if (!vn || vn.choosing) return;
  vn.lineIndex += 1;
  renderVN();
}

function chooseVN(index) {
  if (!vn || !vn.choosing) return;
  const choice = vn.scene.choices[index];
  if (!choice) return;
  const sceneId = vn.sceneId;
  applyChoice(state, sceneId, choice);
  addTrace(state, 'vn_choice', { sceneId, choiceId: choice.id, text: choice.text });
  overlay.classList.add('hidden');
  vn = null;
  postSceneWorldUpdate(sceneId);
  selectedAction = 0;
  renderAll();
}

function drawWorld() {
  const g = ctx.createLinearGradient(0,0,900,520);
  g.addColorStop(0, '#b9c1b4'); g.addColorStop(1, '#d8c8ad');
  ctx.fillStyle = g; ctx.fillRect(0,0,900,520);

  drawZone(ZONES.main, '#eadfcf', '#9d8d78');
  drawZone(ZONES.radio, '#d7c9b8', '#8c7965');
  drawZone(ZONES.forecourt, '#bbc1b3', '#788477');
  drawZone(ZONES.side, '#aeb9a4', '#74816f');

  ctx.fillStyle = '#6f665b'; ctx.font = '13px system-ui';
  ctx.fillText('COMMUNITY HALL', 250, 82);
  ctx.fillText('forecourt', 28, 340);
  ctx.fillText('side yard', 675, 250);
  ctx.fillText('radio corner', 488, 108);

  rect(315,190,118,58,'#b28c68'); rect(300,320,82,38,'#9d795e');
  rect(495,145,105,28,'#6e6257'); rect(690,390,92,22,'#8a765d');
  for (const [id, cState] of Object.entries(state.characters)) {
    if (!cState.visible) continue;
    const c = CHARACTERS[id];
    ctx.beginPath(); ctx.arc(cState.x,cState.y,18,0,Math.PI*2); ctx.fillStyle=c.color; ctx.fill();
    ctx.lineWidth=3; ctx.strokeStyle='#fffaf2'; ctx.stroke();
    ctx.fillStyle='#282522'; ctx.font='bold 11px system-ui'; ctx.textAlign='center'; ctx.fillText(c.short,cState.x,cState.y+4); ctx.textAlign='start';
  }

  ctx.beginPath(); ctx.arc(state.player.x,state.player.y,15,0,Math.PI*2); ctx.fillStyle='#272522'; ctx.fill();
  ctx.lineWidth=4; ctx.strokeStyle='#fff'; ctx.stroke();
  ctx.fillStyle='#fff'; ctx.font='bold 10px system-ui'; ctx.textAlign='center'; ctx.fillText('YOU',state.player.x,state.player.y+4); ctx.textAlign='start';

  const actions = getActions();
  if (actions.length) {
    ctx.beginPath(); ctx.arc(state.player.x,state.player.y,27,0,Math.PI*2); ctx.strokeStyle='#8b4f48'; ctx.lineWidth=2; ctx.setLineDash([5,5]); ctx.stroke(); ctx.setLineDash([]);
  }
}
function drawZone(z, fill, stroke) { ctx.fillStyle=fill; ctx.strokeStyle=stroke; ctx.lineWidth=2; ctx.fillRect(z.x,z.y,z.w,z.h); ctx.strokeRect(z.x,z.y,z.w,z.h); }
function rect(x,y,w,h,fill) { ctx.fillStyle=fill; ctx.fillRect(x,y,w,h); }

function renderActions() {
  currentActions = getActions();
  if (selectedAction >= currentActions.length) selectedAction = 0;
  if (!currentActions.length) {
    actionsEl.innerHTML = '<p class="situation">Nothing needs your input here. You can simply move, listen, or go somewhere else.</p>';
    return;
  }
  actionsEl.innerHTML = '';
  currentActions.forEach((a, i) => {
    const b = document.createElement('button');
    b.className = `action ${i===selectedAction ? 'selected' : ''}`;
    b.innerHTML = `${escapeHtml(a.label)}<small>${escapeHtml(a.note)}</small>`;
    b.addEventListener('click', () => { selectedAction=i; a.run(); });
    actionsEl.appendChild(b);
  });
}

function renderState() {
  situationEl.textContent = situationCopy();
  timeEl.textContent = state.fictionalTime;
  phaseEl.textContent = state.phase.replaceAll('_',' ');
  debugEl.textContent = JSON.stringify({ phase: state.phase, tags: state.tags, conduct: state.conduct.slice(-6), flags: state.flags }, null, 2);
}
function renderAll() { drawWorld(); renderActions(); renderState(); ambientForPhase(); }

function showAftermath() {
  aftermathEl.classList.remove('hidden');
  residueCards.innerHTML = state.residue.map(r => `<article class="residue-card"><p>${escapeHtml(r.text)}</p></article>`).join('');
  interpretationTrace.textContent = JSON.stringify(state.interpretations, null, 2);
  aftermathEl.scrollIntoView({behavior:'smooth', block:'start'});
}

function escapeHtml(str) { return String(str).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

function movePlayer(dt) {
  if (vn || state.flags.aftermath) return;
  let dx=0,dy=0;
  if (keyState.has('ArrowLeft') || keyState.has('a')) dx--;
  if (keyState.has('ArrowRight') || keyState.has('d')) dx++;
  if (keyState.has('ArrowUp') || keyState.has('w')) dy--;
  if (keyState.has('ArrowDown') || keyState.has('s')) dy++;
  if (!dx && !dy) return;
  const len=Math.hypot(dx,dy); const speed=190;
  state.player.x=Math.max(15,Math.min(885,state.player.x+(dx/len)*speed*dt));
  state.player.y=Math.max(15,Math.min(505,state.player.y+(dy/len)*speed*dt));
  renderAll();
}

window.addEventListener('keydown', e => {
  const key = e.key.length===1 ? e.key.toLowerCase() : e.key;
  if (vn) {
    if (e.key === 'Enter' && !vn.choosing) { e.preventDefault(); advanceVN(); return; }
    if (/^[1-4]$/.test(e.key) && vn.choosing) { e.preventDefault(); chooseVN(Number(e.key)-1); return; }
    return;
  }
  if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','w','a','s','d'].includes(key)) { keyState.add(key); e.preventDefault(); }
  if (e.key === 'Tab') { e.preventDefault(); if (currentActions.length) { selectedAction=(selectedAction+1)%currentActions.length; renderActions(); } }
  if ((e.key === 'e' || e.key === 'E' || e.key === 'Enter') && currentActions[selectedAction]) { e.preventDefault(); currentActions[selectedAction].run(); }
});
window.addEventListener('keyup', e => { const key=e.key.length===1?e.key.toLowerCase():e.key; keyState.delete(key); });
window.addEventListener('blur', () => keyState.clear());

let last=performance.now();
function frame(now) { const dt=Math.min(.04,(now-last)/1000); last=now; movePlayer(dt); drawWorld(); requestAnimationFrame(frame); }
requestAnimationFrame(frame);

document.querySelector('#openDebrief').addEventListener('click', () => { debriefEl.classList.remove('hidden'); debriefEl.scrollIntoView({behavior:'smooth'}); });
debriefForm.addEventListener('submit', e => {
  e.preventDefault();
  debriefData = Object.fromEntries(new FormData(debriefForm).entries());
  addTrace(state, 'debrief_complete', { answers: debriefData });
  const run = exportRun(state, debriefData);
  const json = JSON.stringify(run, null, 2);
  exportPreview.value = json;
  const blob = new Blob([json], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href=url; a.download=`managed-decline-v007-${new Date().toISOString().replaceAll(':','-')}.json`; a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
});
document.querySelector('#copyRun').addEventListener('click', async () => {
  const json=JSON.stringify(exportRun(state, debriefData),null,2); exportPreview.value=json;
  try { await navigator.clipboard.writeText(json); } catch {}
});

addTrace(state, 'run_start', { scenario: 'Friday Night' });
addAmbient('You have arrived with Tabitha. Nobody is waiting for you to trigger the evening.');
renderAll();

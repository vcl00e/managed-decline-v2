import {
  createState, record, learn, openFrontDoor, openBedroom, chooseTarget,
} from './model.js';
import { WORLD, CHARACTERS, SCHEDULE } from './scenario.js';

export function createWorldRuntime({ canvas, hudRoom, hudTime, promptEl, noticeEl }) {
  const ctx = canvas.getContext('2d');
  let state;
  let scheduled;
  let keys;
  let inputContext;
  let sceneHandler = () => {};
  let currentTargetId = null;
  let targetCycleIndex = 0;
  let lastCandidatesKey = '';
  let noticeTimer = null;
  const camera = { x: 0, y: 0 };

  const npc = {
    tabitha: { ...CHARACTERS.tabitha },
    alex: { ...CHARACTERS.alex },
    priya: { ...CHARACTERS.priya },
  };
  const doors = {
    front: { id: 'front-door', x: 44, y: 92, open: false },
    bedroom: { id: 'bedroom-door', x: 650, y: 445, open: false },
  };

  function reset() {
    state = createState();
    state.runId = globalThis.crypto?.randomUUID?.() || `run-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    scheduled = new Set();
    keys = new Set();
    inputContext = 'world';
    currentTargetId = null;
    targetCycleIndex = 0;
    lastCandidatesKey = '';
    Object.assign(npc.tabitha, { x: 840, y: 455, target: { x: 840, y: 455 }, visible: true, mood: 'packing' });
    Object.assign(npc.alex, { x: 790, y: 215, target: { x: 790, y: 215 }, visible: true, mood: 'tidying' });
    Object.assign(npc.priya, { x: 72, y: 90, target: { x: 72, y: 90 }, visible: false, mood: 'outside' });
    doors.front.open = false;
    doors.bedroom.open = false;
    promptEl.textContent = '';
    showNotice('Thursday, 18:42. Tabitha is moving out tonight.');
    record(state, 'run_started');
  }

  function showNotice(text, ms = 3200) {
    noticeEl.textContent = text;
    noticeEl.classList.add('visible');
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => noticeEl.classList.remove('visible'), ms);
  }

  function roomAt(x, y) {
    return WORLD.rooms.find((r) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h)?.id || 'hall';
  }

  function collides(x, y) {
    const r = 14;
    if (x < 48 || y < 48 || x > WORLD.width - 48 || y > WORLD.height - 48) return true;
    if (WORLD.obstacles.some((o) => x + r > o.x && x - r < o.x + o.w && y + r > o.y && y - r < o.y + o.h)) return true;
    if (x > 610 && x < 650 && !(y > 120 && y < 205) && !(y > 435 && y < 500)) return true;
    if (y > 330 && y < 370 && x > 650 && !(x > 760 && x < 835)) return true;
    return false;
  }

  function setKey(key, down) {
    if (inputContext !== 'world') return;
    if (down) keys.add(key); else keys.delete(key);
  }

  function clearKeys() { keys.clear(); }
  function setInputContext(value) { inputContext = value; if (value !== 'world') clearKeys(); }
  function setPaused(value) { state.paused = value; }
  function setSceneHandler(fn) { sceneHandler = fn; }

  function movePlayer(dt) {
    let dx = 0, dy = 0;
    if (keys.has('w') || keys.has('arrowup')) dy--;
    if (keys.has('s') || keys.has('arrowdown')) dy++;
    if (keys.has('a') || keys.has('arrowleft')) dx--;
    if (keys.has('d') || keys.has('arrowright')) dx++;
    if (!dx && !dy) return;
    const len = Math.hypot(dx, dy); dx /= len; dy /= len;
    state.player.facing = { x: dx, y: dy };
    const nx = state.player.x + dx * 175 * dt;
    const ny = state.player.y + dy * 175 * dt;
    if (!collides(nx, state.player.y)) state.player.x = nx;
    if (!collides(state.player.x, ny)) state.player.y = ny;
    state.player.room = roomAt(state.player.x, state.player.y);
  }

  function moveNpc(person, dt, speed) {
    if (!person.visible || !person.target) return;
    const dx = person.target.x - person.x, dy = person.target.y - person.y;
    const d = Math.hypot(dx, dy);
    if (d < 2) return;
    person.x += (dx / d) * Math.min(d, speed * dt);
    person.y += (dy / d) * Math.min(d, speed * dt);
  }

  function tick(dt) {
    if (state.paused || state.ended) return;
    state.worldTime += dt;
    movePlayer(dt);
    moveNpc(npc.tabitha, dt, 82);
    moveNpc(npc.alex, dt, 88);
    moveNpc(npc.priya, dt, 78);
    for (const ev of SCHEDULE) {
      if (state.worldTime >= ev.t && !scheduled.has(ev.id)) {
        scheduled.add(ev.id);
        handleEvent(ev.id);
      }
    }
    if (Math.floor(state.worldTime * 2) % 8 === 0 && Math.random() < 0.04) {
      record(state, 'position', { x: Math.round(state.player.x), y: Math.round(state.player.y), room: state.player.room });
    }
  }

  function handleEvent(id) {
    record(state, 'world_event', { id });
    if (id === 'tabitha_call') {
      npc.tabitha.target = { x: 770, y: 445 }; npc.tabitha.mood = 'calling';
      showNotice('From the bedroom: “You made it. Come here before Britain assigns you a role.”');
    } else if (id === 'priya_knock') {
      npc.priya.visible = true; npc.priya.mood = 'waiting';
      showNotice(state.player.room === 'hall' ? 'Three quick knocks at the front door.' : 'A knock carries through the flat from the hall.');
    } else if (id === 'alex_opens_front' && !state.flags.priyaInside) {
      openFrontDoor(state, 'alex'); doors.front.open = true;
      npc.priya.target = { x: 220, y: 145 }; npc.priya.mood = 'arriving';
      state.flags.priyaArrivalMissed = state.player.room !== 'hall';
      showNotice(state.flags.priyaArrivalMissed ? 'Voices in the hall: Alex has let Priya in.' : 'Alex reaches the door first and lets Priya in.');
    } else if (id === 'priya_tour' && state.flags.priyaInside) {
      npc.alex.target = { x: 725, y: 205 }; npc.priya.target = { x: 720, y: 205 };
      showNotice('Alex starts showing Priya the kitchen without waiting for the agent.');
    } else if (id === 'tabitha_to_room') {
      npc.tabitha.target = { x: 970, y: 430 }; npc.tabitha.mood = 'photographing';
      showNotice('A camera shutter from Tabitha’s room.');
    } else if (id === 'priya_room_question' && state.flags.priyaInside) {
      npc.priya.target = { x: 610, y: 465 }; npc.alex.target = { x: 565, y: 465 };
      showNotice('Priya, in the hall: “Is that the room?”');
    } else if (id === 'alex_opens_bedroom' && state.flags.priyaInside && !doors.bedroom.open) {
      openBedroom(state, 'alex'); doors.bedroom.open = true; npc.priya.target = { x: 730, y: 455 };
      showNotice('Alex waves Priya into Tabitha’s room for the viewing.');
    } else if (id === 'agent_delay') {
      state.flags.agentDelayKnown = true; learn(state, 'agent_delayed', 'group_message');
      showNotice('Alex’s phone: “Graham (agent): delayed approx. 25 mins. Please commence viewing if agreeable.”', 4800);
    } else if (id === 'viewing_convergence' && !state.flags.viewingSceneDone && state.flags.priyaInside) {
      state.flags.viewingSceneDone = true; sceneHandler('viewing');
    } else if (id === 'tabitha_departure' && !state.flags.departureSceneDone) {
      state.flags.departureSceneDone = true; sceneHandler('departure');
    }
  }

  function interactions() {
    const list = [];
    if (!state.flags.tabithaSceneDone) list.push({
      id: 'talk-tabitha', x: npc.tabitha.x, y: npc.tabitha.y, range: 96, priority: 18, label: 'Talk to Tabitha',
      action: () => { state.flags.tabithaSceneDone = true; learn(state, 'damp_report_exists', 'tabitha'); sceneHandler('tabitha'); },
    });
    if (scheduled.has('priya_knock') && !state.flags.priyaInside) list.push({
      id: 'front-door', x: doors.front.x, y: doors.front.y, range: 82, priority: 25, label: 'Open the front door',
      action: () => { openFrontDoor(state, 'player'); doors.front.open = true; npc.priya.target = { x: 220, y: 145 }; showNotice('Priya: “Hi — sorry, I’m early. The bus did something unprecedented.”'); },
    });
    if (state.flags.priyaInside && state.worldTime >= 72 && !doors.bedroom.open) list.push({
      id: 'bedroom-door', x: doors.bedroom.x, y: doors.bedroom.y, range: 90, priority: 22, label: "Wave Priya into Tabitha's room",
      action: () => { openBedroom(state, 'player'); doors.bedroom.open = true; npc.priya.target = { x: 730, y: 455 }; showNotice(state.worldTime < 82 ? 'You wave Priya in before Tabitha has come back out.' : 'You wave Priya into the room for the viewing.'); },
    });
    if (!state.flags.dampInspected && state.worldTime >= 55) list.push({
      id: 'damp', x: 1090, y: 410, range: 80, priority: 14, label: 'Look at the damp patch',
      action: () => { state.flags.dampInspected = true; learn(state, 'damp_is_substantial', 'direct_observation'); record(state, 'situated_action', { id: 'inspect_damp' }); showNotice('The paint is bubbled and soft at the edge. This is not a tasteful shadow.'); },
    });
    if (state.flags.dampInspected && !state.flags.dampPhotoTaken) list.push({
      id: 'photo-damp', x: 1090, y: 410, range: 80, priority: 12, label: 'Take a photo of the damp',
      action: () => { state.flags.dampPhotoTaken = true; learn(state, 'damp_photo', 'player_phone'); record(state, 'situated_action', { id: 'photograph_damp' }); showNotice('Photo saved. It is now evidence, not just a thing you saw.'); },
    });
    return list;
  }

  function updateTarget() {
    const candidates = interactions();
    const key = candidates.map((c) => c.id).sort().join('|');
    if (key !== lastCandidatesKey) { targetCycleIndex = 0; lastCandidatesKey = key; }
    const target = candidates.find((c) => c.id === currentTargetId) || chooseTarget(state.player, candidates, currentTargetId);
    if (!target || !Number.isFinite(Math.hypot(target.x - state.player.x, target.y - state.player.y)) || Math.hypot(target.x - state.player.x, target.y - state.player.y) > (target.range ?? 92)) {
      currentTargetId = chooseTarget(state.player, candidates, currentTargetId)?.id ?? null;
    } else currentTargetId = target.id;
    const selected = candidates.find((c) => c.id === currentTargetId) || null;
    promptEl.textContent = selected ? `E — ${selected.label}${candidates.filter((c) => Math.hypot(c.x-state.player.x,c.y-state.player.y) <= (c.range??92)).length > 1 ? '   ·   Tab cycles' : ''}` : '';
    return selected;
  }

  function interact() {
    if (inputContext !== 'world') return;
    const target = updateTarget();
    if (target) { record(state, 'interaction', { id: target.id }); target.action(); }
  }

  function cycleTarget() {
    const near = interactions().filter((c) => Math.hypot(c.x - state.player.x, c.y - state.player.y) <= (c.range ?? 92));
    if (near.length < 2) return;
    targetCycleIndex = (targetCycleIndex + 1) % near.length;
    currentTargetId = near[targetCycleIndex].id;
    record(state, 'target_cycle', { target: currentTargetId });
  }

  function applyWorldChoice(choiceId) {
    if (choiceId === 'viewing_show_photo' || choiceId === 'viewing_tell_plainly') {
      npc.priya.target = { x: 760, y: 190 }; npc.priya.mood = 'reconsidering';
      npc.alex.target = { x: 745, y: 215 }; npc.alex.mood = 'strained';
    } else if (choiceId.startsWith('viewing_')) {
      npc.priya.target = { x: 820, y: 455 }; npc.priya.mood = 'viewing';
    } else if (choiceId === 'departure_go') {
      npc.tabitha.target = { x: 95, y: 115 }; npc.tabitha.mood = 'leaving';
    } else if (choiceId === 'departure_stay') {
      npc.tabitha.target = { x: 95, y: 115 }; npc.alex.target = { x: 760, y: 190 };
    }
  }

  function drawDoor(open, x, y, w, h) { ctx.fillStyle = open ? '#706a5f' : '#8a806f'; ctx.fillRect(x, y, w, h); }
  function drawNpc(p, color) {
    if (!p.visible) return;
    ctx.fillStyle = color; ctx.beginPath(); ctx.arc(p.x, p.y, 15, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#171915'; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = '#f4efe4'; ctx.font = '600 12px system-ui'; ctx.fillText(p.name, p.x-24, p.y-23);
    ctx.fillStyle = '#b9b1a5'; ctx.font = '10px system-ui'; ctx.fillText(p.mood || '', p.x-24, p.y+32);
  }

  function draw() {
    const scale = devicePixelRatio || 1, cw = canvas.clientWidth, ch = canvas.clientHeight;
    if (canvas.width !== Math.floor(cw*scale) || canvas.height !== Math.floor(ch*scale)) { canvas.width = Math.floor(cw*scale); canvas.height = Math.floor(ch*scale); }
    ctx.setTransform(scale,0,0,scale,0,0); ctx.clearRect(0,0,cw,ch);
    camera.x = Math.max(0, Math.min(WORLD.width-cw, state.player.x-cw/2));
    camera.y = Math.max(0, Math.min(WORLD.height-ch, state.player.y-ch/2));
    ctx.save(); ctx.translate(-camera.x,-camera.y); ctx.fillStyle='#171915'; ctx.fillRect(0,0,WORLD.width,WORLD.height);
    for (const r of WORLD.rooms) {
      ctx.fillStyle = r.id==='bedroom' ? '#322b26' : r.id==='kitchen' ? '#26312d' : r.id==='hall' ? '#2c2c27' : '#302d29';
      ctx.fillRect(r.x,r.y,r.w,r.h); ctx.strokeStyle='#777066'; ctx.lineWidth=4; ctx.strokeRect(r.x,r.y,r.w,r.h);
      ctx.fillStyle='#b8b0a3'; ctx.font='12px system-ui'; ctx.fillText(r.name,r.x+12,r.y+20);
    }
    for (const o of WORLD.obstacles) { ctx.fillStyle='#4a463f'; ctx.fillRect(o.x,o.y,o.w,o.h); ctx.fillStyle='#777066'; ctx.font='11px system-ui'; ctx.fillText(o.label,o.x+8,o.y+16); }
    ctx.fillStyle = state.flags.dampInspected ? '#5f6652' : '#525747'; ctx.beginPath(); ctx.ellipse(1090,410,22,36,-0.4,0,Math.PI*2); ctx.fill();
    drawDoor(doors.front.open,14,76,16,44); ctx.fillStyle=doors.bedroom.open?'#a89a73':'#6d675c'; ctx.fillRect(642,438,6,64);
    drawNpc(npc.tabitha,'#d7a7b1'); drawNpc(npc.alex,'#9db6c7'); drawNpc(npc.priya,'#b4c98e');
    ctx.fillStyle='#f3eee3'; ctx.beginPath(); ctx.arc(state.player.x,state.player.y,14,0,Math.PI*2); ctx.fill(); ctx.strokeStyle='#1b1b18'; ctx.lineWidth=3; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(state.player.x,state.player.y); ctx.lineTo(state.player.x+state.player.facing.x*22,state.player.y+state.player.facing.y*22); ctx.stroke();
    const target = updateTarget();
    if (target) { ctx.strokeStyle='#f0e2a7'; ctx.lineWidth=3; ctx.beginPath(); ctx.arc(target.x,target.y,24,0,Math.PI*2); ctx.stroke(); }
    ctx.restore();
    hudRoom.textContent = WORLD.rooms.find((r)=>r.id===state.player.room)?.name || state.player.room;
    const m = 42 + Math.floor(state.worldTime/60), s = Math.floor(state.worldTime%60);
    hudTime.textContent = `18:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  reset();
  return { get state(){return state;}, reset, tick, draw, setKey, clearKeys, setPaused, setInputContext, setSceneHandler, interact, cycleTarget, applyWorldChoice, showNotice };
}

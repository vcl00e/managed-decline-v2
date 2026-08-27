import {
  createState,
  record,
  learn,
  setPhase,
  advanceFiction,
  openFrontDoor,
  openBedroom,
  chooseViewingPosition,
  resolveAmbientViewing,
  chooseTarget,
} from './model.js';
import { WORLD, CHARACTERS } from './scenario.js';

export function createWorldRuntime({ canvas, hudRoom, hudTime, promptEl, noticeEl, situationEl }) {
  const ctx = canvas.getContext('2d');
  let state;
  let keys;
  let inputContext;
  let sceneHandler = () => {};
  let currentTargetId = null;
  let targetCycleIndex = 0;
  let lastCandidatesKey = '';
  let noticeTimer = null;
  let phaseMarks = new Set();
  const camera = { x: 0, y: 0 };

  const npc = {
    tabitha: { ...CHARACTERS.tabitha },
    alex: { ...CHARACTERS.alex },
    priya: { ...CHARACTERS.priya },
  };
  const doors = {
    front: { id: 'front-door', ...WORLD.points.frontDoor, open: false },
    bedroom: { id: 'bedroom-door', ...WORLD.points.bedroomThreshold, open: false },
  };

  function reset() {
    state = createState();
    state.runId = globalThis.crypto?.randomUUID?.() || `run-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    keys = new Set();
    inputContext = 'world';
    currentTargetId = null;
    targetCycleIndex = 0;
    lastCandidatesKey = '';
    phaseMarks = new Set();
    Object.assign(npc.tabitha, {
      x: 735, y: 420, target: { x: 735, y: 420 }, visible: true, mood: 'packing', speech: '', speechUntil: 0,
    });
    Object.assign(npc.alex, {
      x: 355, y: 330, target: { x: 355, y: 330 }, visible: true, mood: 'tidying', speech: '', speechUntil: 0,
    });
    Object.assign(npc.priya, {
      x: 75, y: 100, target: { x: 75, y: 100 }, visible: false, mood: 'outside', speech: '', speechUntil: 0,
    });
    doors.front.open = false;
    doors.bedroom.open = false;
    promptEl.textContent = '';
    situationEl.textContent = 'Tabitha is packing in her room.';
    showNotice('Thursday, 18:42. You told Tabitha you would walk her to the station once she is packed.', 5200);
    record(state, 'run_started', { preexistingCommitment: 'walk-to-station' });
  }

  function showNotice(text, ms = 3200) {
    noticeEl.textContent = text;
    noticeEl.classList.add('visible');
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => noticeEl.classList.remove('visible'), ms);
  }

  function setSituation(text) {
    situationEl.textContent = text || '';
  }

  function roomAt(x, y) {
    const exact = WORLD.rooms.find((r) => x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h)?.id;
    if (exact) return exact;
    if (x >= 270 && x <= 370 && y > 210 && y < 250) return y < 230 ? 'hall' : 'living';
    if (x > 530 && x < 570 && y >= 385 && y <= 475) return 'living';
    return state?.player?.room || 'living';
  }

  function collides(x, y) {
    const r = 14;
    if (x < 48 || y < 48 || x > WORLD.width - 48 || y > WORLD.height - 48) return true;
    if (x > 530 && y < 250) return true;
    if (y > 210 && y < 250 && x < 530 && !(x > 270 && x < 370)) return true;
    if (x > 530 && x < 570 && y > 250 && !(y > 385 && y < 475)) return true;
    if (WORLD.obstacles.some((o) => x + r > o.x && x - r < o.x + o.w && y + r > o.y && y - r < o.y + o.h)) return true;
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
    const nx = state.player.x + dx * 190 * dt;
    const ny = state.player.y + dy * 190 * dt;
    if (!collides(nx, state.player.y)) state.player.x = nx;
    if (!collides(state.player.x, ny)) state.player.y = ny;
    state.player.room = roomAt(state.player.x, state.player.y);
  }

  function moveNpc(person, dt, speed = 105) {
    if (!person.visible || !person.target) return;
    const dx = person.target.x - person.x, dy = person.target.y - person.y;
    const d = Math.hypot(dx, dy);
    if (d < 2) return;
    person.x += (dx / d) * Math.min(d, speed * dt);
    person.y += (dy / d) * Math.min(d, speed * dt);
  }

  function atTarget(person, tolerance = 10) {
    if (!person.target) return true;
    return Math.hypot(person.target.x - person.x, person.target.y - person.y) <= tolerance;
  }

  function speak(id, text, duration = 4.5) {
    const person = npc[id];
    if (!person) return;
    person.speech = text;
    person.speechUntil = state.worldTime + duration;
    record(state, 'ambient_speech', { speaker: id, text });
  }

  function mark(name, after, fn) {
    if (state.phaseElapsed < after || phaseMarks.has(name)) return false;
    phaseMarks.add(name);
    fn();
    return true;
  }

  function transition(next, reason = null) {
    setPhase(state, next, reason);
    phaseMarks = new Set();
    enterPhase(next);
  }

  function enterPhase(phase) {
    if (phase === 'tabitha') {
      setSituation('Tabitha is packing in her room.');
    } else if (phase === 'arrival_grace') {
      advanceFiction(state, 1);
      setSituation('The viewing has not started yet.');
    } else if (phase === 'arrival_window') {
      npc.priya.visible = true;
      npc.priya.mood = 'waiting outside';
      setSituation('Someone is waiting at the front door.');
      showNotice('Three quick knocks at the front door.');
      speak('tabitha', 'That will be Priya.');
    } else if (phase === 'greeting') {
      setSituation('Priya is inside. The viewing is beginning.');
      npc.priya.target = { x: 175, y: 135 };
      npc.alex.target = { x: 220, y: 145 };
      if (state.flags.frontDoorOpenedByPlayer) {
        speak('priya', 'Hi — sorry, I am early. The bus did something unprecedented.');
      } else {
        speak('alex', 'Priya? Come in. Graham is still not here.');
      }
    } else if (phase === 'viewing_position') {
      advanceFiction(state, 1);
      setSituation('Alex and Priya are starting the viewing.');
      npc.alex.target = { x: 365, y: 330 };
      npc.priya.target = { x: 405, y: 330 };
      speak('alex', 'We can start in here while we wait for Graham.');
    } else if (phase === 'tour_live') {
      setSituation('The viewing is moving through the flat.');
      npc.alex.target = { x: 495, y: 420 };
      npc.priya.target = { x: 475, y: 455 };
      if (state.flags.viewingPosition === 'join') speak('priya', 'The living room is bigger than the photos. That never happens.');
      if (state.flags.viewingPosition === 'tabitha') speak('tabitha', 'Thank you for not supervising my extraction.');
      if (state.flags.viewingPosition === 'listen') showNotice('From the living room, Alex starts explaining how the tenancy handover is supposed to work.', 4200);
    } else if (phase === 'room_question') {
      setSituation("Priya has reached Tabitha's doorway.");
      speak('priya', 'Is that the room?');
      showNotice('Alex’s phone: “Graham (agent): delayed approx. 25 mins. Please continue viewing if agreeable.”', 5200);
      state.flags.agentDelayKnown = true;
      learn(state, 'agent_delayed', 'group_message');
    } else if (phase === 'room_waiting') {
      setSituation('The viewing is waiting at the bedroom threshold.');
      speak('tabitha', 'One minute. I am trying to make the floor legally visible.');
    } else if (phase === 'room_live') {
      advanceFiction(state, 1);
      setSituation("The viewing has reached Tabitha's room.");
      npc.priya.target = { x: 625, y: 420 };
      npc.alex.target = { x: 600, y: 455 };
      npc.tabitha.target = { x: 785, y: 455 };
    } else if (phase === 'viewing_vn') {
      setSituation('The room conversation has become the focus.');
    } else if (phase === 'ambient_resolution') {
      setSituation('Alex is answering Priya without you taking over the conversation.');
      speak('alex', 'There was a leak. It was reported. The source is meant to be fixed; the internal damage is not.');
    } else if (phase === 'aftermath') {
      advanceFiction(state, 2);
      setSituation('The viewing has changed shape.');
      if (state.flags.priyaFeelsWarned) {
        npc.priya.target = { x: 385, y: 335 };
        npc.priya.mood = 'checking the report';
        speak('priya', 'I am going to ask Graham for the inspection report before I decide anything.');
      } else {
        npc.priya.target = { x: 390, y: 335 };
        npc.priya.mood = 'waiting for the agent';
        speak('priya', 'I think I need to speak to Graham before I decide.');
      }
      npc.alex.target = { x: 430, y: 350 };
      npc.alex.mood = state.flags.alexFeltUndermined ? 'strained' : 'handling the viewing';
    } else if (phase === 'departure_ready') {
      setSituation('Tabitha is leaving for the station.');
      npc.tabitha.target = { x: 600, y: 430 };
      npc.tabitha.mood = 'leaving';
      speak('tabitha', 'I need to go now or National Rail wins.');
      showNotice('Tabitha shoulders her bag and heads for the hall.', 4000);
    } else if (phase === 'departure_vn') {
      setSituation('Tabitha is at the point of leaving.');
    }
  }

  function resolveArrival(actor, choice) {
    if (state.flags.priyaInside) return;
    openFrontDoor(state, actor, choice);
    doors.front.open = true;
    npc.priya.visible = true;
    npc.priya.mood = 'arriving';
    transition('greeting', 'front door resolved');
  }

  function selectViewingPosition(value, inferred = false) {
    chooseViewingPosition(state, value, inferred);
    transition('tour_live', 'player position in viewing established');
  }

  function openRoom(actor, access) {
    openBedroom(state, actor, access);
    doors.bedroom.open = true;
    transition('room_live', `bedroom access: ${access}`);
  }

  function ambientResolve(mode) {
    resolveAmbientViewing(state, mode);
    transition('ambient_resolution', `viewing left to Alex: ${mode}`);
  }

  function updatePhase() {
    if (state.phase === 'tabitha') {
      if (state.flags.tabithaSceneDone) transition('arrival_grace', 'Tabitha conversation completed');
      return;
    }
    if (state.phase === 'arrival_grace') {
      mark('knock', 1.2, () => transition('arrival_window', 'compressed to Priya arrival'));
      return;
    }
    if (state.phase === 'arrival_window') {
      mark('alex-warning', 6, () => speak('alex', 'I can get that if you are staying with Tabitha.'));
      mark('alex-opens', 9, () => resolveArrival('alex', 'alex-default'));
      return;
    }
    if (state.phase === 'greeting') {
      mark('start-viewing', 1.8, () => transition('viewing_position', 'greeting complete'));
      return;
    }
    if (state.phase === 'viewing_position') {
      mark('priya-smalltalk', 3.2, () => speak('priya', 'So it is you staying on the tenancy?'));
      mark('infer-position', 7, () => {
        if (state.flags.viewingPosition) return;
        const dAlex = Math.hypot(state.player.x - npc.alex.x, state.player.y - npc.alex.y);
        const value = state.player.room === 'bedroom' ? 'tabitha' : state.player.room === 'hall' ? 'listen' : dAlex < 180 ? 'join' : 'listen';
        selectViewingPosition(value, true);
      });
      return;
    }
    if (state.phase === 'tour_live') {
      if (atTarget(npc.alex) && atTarget(npc.priya)) transition('room_question', 'tour reached bedroom threshold');
      return;
    }
    if (state.phase === 'room_question') {
      mark('alex-asks', 4.5, () => speak('alex', 'Tabitha — okay if we come in?'));
      mark('alex-default-room', 7.5, () => {
        if (!doors.bedroom.open) openRoom('alex', 'alex');
      });
      return;
    }
    if (state.phase === 'room_waiting') {
      mark('open-after-wait', 1.4, () => openRoom('alex', 'wait'));
      return;
    }
    if (state.phase === 'room_live') {
      mark('priya-damp-question', 1.0, () => speak('priya', 'The advert said “historic moisture ingress”. Is that this wall?', 6));
      mark('priya-to-alex', 6.2, () => speak('priya', 'Alex? What actually happened here?'));
      mark('alex-answers', 9.0, () => {
        if (!state.flags.viewingSceneDone && !state.flags.viewingResolvedAmbient) ambientResolve('default');
      });
      return;
    }
    if (state.phase === 'viewing_vn') {
      if (state.flags.viewingSceneDone && !state.paused) transition('aftermath', 'focused conversation completed');
      return;
    }
    if (state.phase === 'ambient_resolution') {
      mark('priya-response', 1.7, () => speak('priya', 'Okay. Please forward me the report before I decide.'));
      mark('ambient-done', 3.2, () => transition('aftermath', 'ambient conversation resolved'));
      return;
    }
    if (state.phase === 'aftermath') {
      mark('departure', 2.8, () => transition('departure_ready', 'viewing aftermath established'));
      return;
    }
    if (state.phase === 'departure_ready') {
      mark('tabitha-calls', 6, () => speak('tabitha', 'Are you coming, or are you staying here?'));
    }
  }

  function tick(dt) {
    if (state.paused || state.ended) return;
    state.worldTime += dt;
    state.phaseElapsed += dt;
    movePlayer(dt);
    moveNpc(npc.tabitha, dt, 108);
    moveNpc(npc.alex, dt, 112);
    moveNpc(npc.priya, dt, 108);
    updatePhase();
    if (Math.floor(state.worldTime * 2) % 8 === 0 && Math.random() < 0.04) {
      record(state, 'position', { x: Math.round(state.player.x), y: Math.round(state.player.y), room: state.player.room });
    }
  }

  function interactions() {
    const list = [];

    if (state.phase === 'tabitha' && !state.flags.tabithaSceneDone) list.push({
      id: 'talk-tabitha', x: npc.tabitha.x, y: npc.tabitha.y, range: 100, priority: 22, label: 'Go in and talk to Tabitha',
      action: () => sceneHandler('tabitha'),
    });

    if (state.phase === 'arrival_window' && !state.flags.priyaInside) {
      list.push({
        id: 'front-door', x: doors.front.x, y: doors.front.y, range: 88, priority: 26, label: 'Answer the front door',
        action: () => resolveArrival('player', 'answer'),
      });
      list.push({
        id: 'stay-for-door', x: npc.tabitha.x, y: npc.tabitha.y, range: 105, priority: 18, label: 'Stay with Tabitha; let Alex answer',
        action: () => resolveArrival('alex', 'stay-with-tabitha'),
      });
    }

    if (state.phase === 'viewing_position' && !state.flags.viewingPosition) {
      list.push({
        id: 'join-viewing', x: (npc.alex.x + npc.priya.x) / 2, y: (npc.alex.y + npc.priya.y) / 2, range: 110, priority: 20, label: 'Join Alex and Priya',
        action: () => selectViewingPosition('join'),
      });
      list.push({
        id: 'stay-tabitha', x: npc.tabitha.x, y: npc.tabitha.y, range: 108, priority: 19, label: 'Stay with Tabitha while they start',
        action: () => selectViewingPosition('tabitha'),
      });
      list.push({
        id: 'listen-viewing', x: WORLD.points.listeningSpot.x, y: WORLD.points.listeningSpot.y, range: 92, priority: 17, label: 'Hang back and listen',
        action: () => selectViewingPosition('listen'),
      });
    }

    if (state.phase === 'room_question' && !doors.bedroom.open) {
      list.push({
        id: 'wave-priya-in', x: doors.bedroom.x, y: doors.bedroom.y, range: 96, priority: 22, label: "Wave Priya into Tabitha's room now",
        action: () => openRoom('player', 'early'),
      });
      list.push({
        id: 'give-tabitha-minute', x: doors.bedroom.x, y: doors.bedroom.y, range: 96, priority: 24, label: 'Ask them to give Tabitha a minute',
        action: () => {
          record(state, 'room_access_choice', { value: 'wait' });
          transition('room_waiting', 'player protected bedroom threshold');
        },
      });
      list.push({
        id: 'let-alex-room', x: npc.alex.x, y: npc.alex.y, range: 98, priority: 16, label: 'Let Alex handle the room',
        action: () => openRoom('alex', 'alex'),
      });
    }

    const canInspect = state.flags.tabithaSceneDone && !state.flags.dampInspected;
    if (canInspect) list.push({
      id: 'damp', x: WORLD.points.damp.x, y: WORLD.points.damp.y, range: 82, priority: 14, label: 'Look at the damp patch',
      action: () => {
        state.flags.dampInspected = true;
        learn(state, 'damp_is_substantial', 'direct_observation');
        record(state, 'situated_action', { id: 'inspect_damp' });
        showNotice('The paint is bubbled and soft at the edge. This is not a tasteful shadow.');
      },
    });
    if (state.flags.dampInspected && !state.flags.dampPhotoTaken) list.push({
      id: 'photo-damp', x: WORLD.points.damp.x, y: WORLD.points.damp.y, range: 82, priority: 13, label: 'Take a photo of the damp',
      action: () => {
        state.flags.dampPhotoTaken = true;
        learn(state, 'damp_photo', 'player_phone');
        record(state, 'situated_action', { id: 'photograph_damp' });
        showNotice('Photo saved. It is now evidence, not just a thing you saw.');
      },
    });

    if (state.phase === 'room_live' && !state.flags.viewingSceneDone && !state.flags.viewingResolvedAmbient) {
      list.push({
        id: 'join-room-conversation', x: (npc.alex.x + npc.priya.x) / 2, y: (npc.alex.y + npc.priya.y) / 2, range: 120, priority: 25, label: 'Join the conversation about the room',
        action: () => {
          transition('viewing_vn', 'player joined the important conversation');
          sceneHandler('viewing');
        },
      });
      list.push({
        id: 'listen-doorway', x: doors.bedroom.x, y: doors.bedroom.y, range: 98, priority: 18, label: 'Listen from the doorway without joining',
        action: () => ambientResolve('listen'),
      });
      list.push({
        id: 'let-alex-answer', x: npc.alex.x, y: npc.alex.y, range: 104, priority: 17, label: 'Let Alex answer without taking over',
        action: () => ambientResolve('withdraw'),
      });
    }

    if (state.phase === 'departure_ready' && !state.flags.departureSceneDone) list.push({
      id: 'departure-tabitha', x: npc.tabitha.x, y: npc.tabitha.y, range: 112, priority: 30, label: 'Catch Tabitha before she leaves',
      action: () => {
        transition('departure_vn', 'player addressed Tabitha at departure');
        sceneHandler('departure');
      },
    });

    return list;
  }

  function updateTarget() {
    const candidates = interactions();
    const key = candidates.map((c) => c.id).sort().join('|');
    if (key !== lastCandidatesKey) { targetCycleIndex = 0; lastCandidatesKey = key; }
    const target = candidates.find((c) => c.id === currentTargetId) || chooseTarget(state.player, candidates, currentTargetId);
    if (!target || Math.hypot(target.x - state.player.x, target.y - state.player.y) > (target.range ?? 92)) {
      currentTargetId = chooseTarget(state.player, candidates, currentTargetId)?.id ?? null;
    } else currentTargetId = target.id;
    const selected = candidates.find((c) => c.id === currentTargetId) || null;
    const nearbyCount = candidates.filter((c) => Math.hypot(c.x - state.player.x, c.y - state.player.y) <= (c.range ?? 92)).length;
    promptEl.textContent = selected ? `E — ${selected.label}${nearbyCount > 1 ? '   ·   Tab cycles' : ''}` : '';
    return selected;
  }

  function interact() {
    if (inputContext !== 'world') return;
    const target = updateTarget();
    if (target) {
      record(state, 'interaction', { id: target.id });
      target.action();
    }
  }

  function cycleTarget() {
    const near = interactions().filter((c) => Math.hypot(c.x - state.player.x, c.y - state.player.y) <= (c.range ?? 92));
    if (near.length < 2) return;
    targetCycleIndex = (targetCycleIndex + 1) % near.length;
    currentTargetId = near[targetCycleIndex].id;
    record(state, 'target_cycle', { target: currentTargetId });
  }

  function sceneCompleted(kind) {
    if (kind === 'tabitha') {
      state.flags.tabithaSceneDone = true;
      if (!state.knowledge.damp_report_exists) learn(state, 'damp_report_exists', 'tabitha');
    } else if (kind === 'viewing') {
      state.flags.viewingSceneDone = true;
    } else if (kind === 'departure') {
      state.flags.departureSceneDone = true;
    }
    record(state, 'vn_scene_completed', { kind });
  }

  function sceneCancelled(kind) {
    record(state, 'vn_scene_cancelled', { kind });
    if (kind === 'viewing' && state.phase === 'viewing_vn') transition('room_live', 'focused conversation cancelled');
    else if (kind === 'departure' && state.phase === 'departure_vn') transition('departure_ready', 'departure conversation cancelled');
    else if (kind === 'tabitha') setSituation('Tabitha is still packing in her room.');
  }

  function applyWorldChoice(choiceId) {
    if (choiceId === 'viewing_show_photo' || choiceId === 'viewing_tell_plainly') {
      npc.priya.mood = 'reconsidering';
      npc.alex.mood = 'strained';
    } else if (choiceId === 'viewing_let_alex_frame' || choiceId === 'viewing_not_my_call') {
      npc.priya.mood = 'checking the report';
      npc.alex.mood = 'handling the tenancy';
    } else if (choiceId === 'departure_go') {
      npc.tabitha.target = { x: 85, y: 105 };
      npc.tabitha.mood = 'leaving with you';
    } else if (choiceId === 'departure_stay') {
      npc.tabitha.target = { x: 85, y: 105 };
      npc.tabitha.mood = 'leaving alone';
      npc.alex.target = { x: 390, y: 340 };
    }
  }

  function wrapLines(text, maxWidth) {
    const words = text.split(/\s+/);
    const lines = [];
    let line = '';
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else line = test;
    }
    if (line) lines.push(line);
    return lines.slice(0, 4);
  }

  function drawNpc(p, color) {
    if (!p.visible) return;
    ctx.fillStyle = color;
    ctx.beginPath(); ctx.arc(p.x, p.y, 15, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#171915'; ctx.lineWidth = 3; ctx.stroke();
    ctx.fillStyle = '#f4efe4'; ctx.font = '600 12px system-ui'; ctx.fillText(p.name, p.x - 24, p.y - 23);
    ctx.fillStyle = '#b9b1a5'; ctx.font = '10px system-ui'; ctx.fillText(p.mood || '', p.x - 24, p.y + 32);

    if (p.speech && p.speechUntil > state.worldTime) {
      ctx.font = '12px system-ui';
      const lines = wrapLines(p.speech, 190);
      const width = Math.max(110, ...lines.map((line) => ctx.measureText(line).width + 18));
      const height = 16 + lines.length * 16;
      const x = Math.max(35, Math.min(WORLD.width - width - 20, p.x - width / 2));
      const y = Math.max(35, p.y - 58 - height);
      ctx.fillStyle = '#f0eadfff'; ctx.fillRect(x, y, width, height);
      ctx.strokeStyle = '#575248'; ctx.lineWidth = 1; ctx.strokeRect(x, y, width, height);
      ctx.fillStyle = '#1b1b18';
      lines.forEach((line, i) => ctx.fillText(line, x + 9, y + 18 + i * 16));
    }
  }

  function draw() {
    const scale = devicePixelRatio || 1, cw = canvas.clientWidth, ch = canvas.clientHeight;
    if (canvas.width !== Math.floor(cw * scale) || canvas.height !== Math.floor(ch * scale)) {
      canvas.width = Math.floor(cw * scale); canvas.height = Math.floor(ch * scale);
    }
    ctx.setTransform(scale, 0, 0, scale, 0, 0); ctx.clearRect(0, 0, cw, ch);
    camera.x = Math.max(0, Math.min(WORLD.width - cw, state.player.x - cw / 2));
    camera.y = Math.max(0, Math.min(WORLD.height - ch, state.player.y - ch / 2));
    ctx.save(); ctx.translate(-camera.x, -camera.y);
    ctx.fillStyle = '#171915'; ctx.fillRect(0, 0, WORLD.width, WORLD.height);

    for (const r of WORLD.rooms) {
      ctx.fillStyle = r.id === 'bedroom' ? '#322b26' : r.id === 'hall' ? '#2c2c27' : '#2d302b';
      ctx.fillRect(r.x, r.y, r.w, r.h);
      ctx.strokeStyle = '#777066'; ctx.lineWidth = 4; ctx.strokeRect(r.x, r.y, r.w, r.h);
      ctx.fillStyle = '#b8b0a3'; ctx.font = '12px system-ui'; ctx.fillText(r.name, r.x + 12, r.y + 20);
    }
    for (const o of WORLD.obstacles) {
      ctx.fillStyle = '#4a463f'; ctx.fillRect(o.x, o.y, o.w, o.h);
      ctx.fillStyle = '#777066'; ctx.font = '11px system-ui'; ctx.fillText(o.label, o.x + 8, o.y + 16);
    }

    ctx.fillStyle = state.flags.dampInspected ? '#68705a' : '#505647';
    ctx.beginPath(); ctx.ellipse(WORLD.points.damp.x, WORLD.points.damp.y, 22, 36, -0.4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = doors.front.open ? '#706a5f' : '#8a806f'; ctx.fillRect(14, 78, 16, 48);
    ctx.fillStyle = doors.bedroom.open ? '#a89a73' : '#6d675c'; ctx.fillRect(548, 388, 7, 88);

    drawNpc(npc.tabitha, '#d7a7b1');
    drawNpc(npc.alex, '#9db6c7');
    drawNpc(npc.priya, '#b4c98e');

    ctx.fillStyle = '#f3eee3'; ctx.beginPath(); ctx.arc(state.player.x, state.player.y, 14, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#1b1b18'; ctx.lineWidth = 3; ctx.stroke();
    ctx.beginPath(); ctx.moveTo(state.player.x, state.player.y);
    ctx.lineTo(state.player.x + state.player.facing.x * 22, state.player.y + state.player.facing.y * 22); ctx.stroke();

    const target = updateTarget();
    if (target) {
      ctx.strokeStyle = '#f0e2a7'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(target.x, target.y, 24, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.restore();

    hudRoom.textContent = WORLD.rooms.find((r) => r.id === state.player.room)?.name || state.player.room;
    const total = 18 * 60 + 42 + state.fictionMinute;
    hudTime.textContent = `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
  }

  reset();
  enterPhase('tabitha');
  return {
    get state() { return state; },
    reset: () => { reset(); enterPhase('tabitha'); },
    tick,
    draw,
    setKey,
    clearKeys,
    setPaused,
    setInputContext,
    setSceneHandler,
    interact,
    cycleTarget,
    applyWorldChoice,
    sceneCompleted,
    sceneCancelled,
    showNotice,
  };
}

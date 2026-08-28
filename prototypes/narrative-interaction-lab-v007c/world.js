import { CHARACTERS, OBSERVATIONS, WORLD } from './scenario.js';
import {
  activeExperienceSnapshot,
  createState,
  finishRun,
  getAvailableInteractions,
  observeClosure,
  observeCrosscurrents,
  observeRadio,
  observeRoom,
  stayWithGroup,
  record,
  shareNotice,
} from './model.js';

export function createWorldRuntime({
  canvas,
  hudZone,
  hudTime,
  promptEl,
  noticeEl,
  situationEl,
}) {
  const ctx = canvas.getContext('2d');
  let state;
  let keys;
  let inputContext = 'world';
  let paused = false;
  let currentTarget = 0;
  let sceneHandler = () => {};
  let endHandler = () => {};
  let noticeTimer = null;
  const npc = {};

  function reset() {
    state = createState();
    state.runId = globalThis.crypto?.randomUUID?.() || `run-${Date.now()}`;
    for (const [id, person] of Object.entries(state.characters)) npc[id] = { ...person };
    keys = new Set();
    inputContext = 'world';
    paused = false;
    currentTarget = 0;
    showNotice('Friday, 19:03. You arrived with Tabitha. Maya and Alex are already inside.', 4400);
    setSituation('The hall is open. Nothing is demanding you yet.');
    record(state, 'run_started');
  }

  function showNotice(text, milliseconds = 3200) {
    noticeEl.textContent = text;
    noticeEl.classList.add('visible');
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(() => noticeEl.classList.remove('visible'), milliseconds);
  }

  function setSituation(text) {
    situationEl.textContent = text || '';
  }

  function zoneAt(x, y) {
    for (const zone of Object.values(WORLD.zones)) {
      if (x >= zone.x && x <= zone.x + zone.w && y >= zone.y && y <= zone.y + zone.h) {
        return zone.id;
      }
    }
    return state.player.zone;
  }

  function collides(x, y) {
    const radius = 14;
    if (x < 38 || y < 38 || x > WORLD.width - 38 || y > WORLD.height - 38) return true;
    return WORLD.obstacles.some(
      (obstacle) => x + radius > obstacle.x
        && x - radius < obstacle.x + obstacle.w
        && y + radius > obstacle.y
        && y - radius < obstacle.y + obstacle.h,
    );
  }

  function setKey(key, down) {
    if (inputContext !== 'world') return;
    if (down) keys.add(key);
    else keys.delete(key);
  }

  function clearKeys() {
    keys.clear();
  }

  function setInputContext(value) {
    inputContext = value;
    if (value !== 'world') clearKeys();
  }

  function setPaused(value) {
    paused = value;
  }

  function setSceneHandler(handler) {
    sceneHandler = handler;
  }

  function setEndHandler(handler) {
    endHandler = handler;
  }

  function movePlayer(deltaTime) {
    if (paused || inputContext !== 'world') return;
    let dx = 0;
    let dy = 0;
    if (keys.has('w') || keys.has('arrowup')) dy -= 1;
    if (keys.has('s') || keys.has('arrowdown')) dy += 1;
    if (keys.has('a') || keys.has('arrowleft')) dx -= 1;
    if (keys.has('d') || keys.has('arrowright')) dx += 1;
    if (!dx && !dy) return;

    const length = Math.hypot(dx, dy);
    dx /= length;
    dy /= length;
    state.player.facing = { x: dx, y: dy };

    const nextX = state.player.x + dx * 190 * deltaTime;
    const nextY = state.player.y + dy * 190 * deltaTime;
    if (!collides(nextX, state.player.y)) state.player.x = nextX;
    if (!collides(state.player.x, nextY)) state.player.y = nextY;
    state.player.zone = zoneAt(state.player.x, state.player.y);
  }

  function moveNpc(person, deltaTime) {
    if (!person.visible || !person.target) return;
    const dx = person.target.x - person.x;
    const dy = person.target.y - person.y;
    const distance = Math.hypot(dx, dy);
    if (distance < 2) return;
    person.x += (dx / distance) * Math.min(distance, 100 * deltaTime);
    person.y += (dy / distance) * Math.min(distance, 100 * deltaTime);
  }

  function syncNpc() {
    for (const [id, source] of Object.entries(state.characters)) {
      if (!npc[id]) npc[id] = { ...source };
      npc[id].visible = source.visible;
      npc[id].mood = source.mood;
      npc[id].target = { ...(source.target || { x: source.x, y: source.y }) };
    }
  }

  const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
  const nearPoint = (point, range = 110) => distance(state.player, point) <= range;
  const nearNpc = (id, range = 130) => npc[id]?.visible && distance(state.player, npc[id]) <= range;

  function candidate(id, label) {
    return { id, label };
  }

  function candidates() {
    const ids = getAvailableInteractions(state, state.player.zone);
    const result = [];

    for (const id of ids) {
      if (id === 'tabitha_opening' && nearNpc('tabitha', 120)) {
        result.push(candidate(id, 'Spend a moment with Tabitha'));
      } else if (id === 'noticeboard' && nearPoint(WORLD.points.noticeboard, 120)) {
        result.push(candidate(id, 'Look at the noticeboard with Tabitha'));
      } else if (id === 'tabitha_private' && nearNpc('tabitha', 155)) {
        result.push(candidate(id, 'Talk with Tabitha'));
      } else if (id === 'tabitha_callback' && nearNpc('tabitha', 175)) {
        result.push(candidate(id, 'Sit on the low wall with Tabitha'));
      } else if (id === 'radio_group' && nearNpc('maya', 185)) {
        result.push(candidate(id, 'Join Maya and Alex'));
      } else if (id === 'group_ambient' && nearNpc('maya', 205)) {
        result.push(candidate(id, 'Stay for the next track'));
      } else if (id === 'priya_private' && nearNpc('priya', 165)) {
        result.push(candidate(id, 'Talk with Priya'));
      } else if (id === 'mixed_story' && nearNpc('maya', 185)) {
        result.push(candidate(id, 'Stay for the group story'));
      } else if (id === 'closing' && nearNpc('elliot', 220)) {
        result.push(candidate(id, 'Listen to Elliot and Maya'));
      } else if (id === 'observe_radio' && nearNpc('maya', 220)) {
        result.push(candidate(id, 'Listen from the edge'));
      } else if (id === 'observe_room' && nearPoint(WORLD.points.roomEdge, 230)) {
        result.push(candidate(id, 'Watch how the room settles'));
      } else if (id === 'observe_crosscurrents' && nearPoint(WORLD.points.roomEdge, 250)) {
        result.push(candidate(id, 'Watch the room split into smaller circles'));
      } else if (id === 'observe_closure' && nearNpc('elliot', 250)) {
        result.push(candidate(id, 'Watch what everyone does with the closure'));
      } else if (id === 'leave_tabitha' && (nearNpc('tabitha', 175) || nearPoint(WORLD.points.exit, 120))) {
        result.push(candidate(id, 'Leave with Tabitha'));
      } else if (id === 'leave_solo' && nearPoint(WORLD.points.exit, 120)) {
        result.push(candidate(id, 'Head home'));
      } else if (id === 'leave_priya' && nearPoint(WORLD.points.exit, 120)) {
        result.push(candidate(id, 'Go for chips with Priya'));
      } else if (id === 'leave_maya' && nearPoint(WORLD.points.exit, 120)) {
        result.push(candidate(id, 'Go on with Maya and the radio crowd'));
      }
    }

    return result;
  }

  function cycleTarget() {
    const available = candidates();
    if (!available.length) return;
    currentTarget = (currentTarget + 1) % available.length;
    renderPrompt();
  }

  function interact() {
    const available = candidates();
    if (!available.length) return;
    const chosen = available[Math.min(currentTarget, available.length - 1)];

    switch (chosen.id) {
      case 'noticeboard':
        shareNotice(state);
        state.characters.tabitha.target = { x: 195, y: 390 };
        showNotice('Tabitha: “Social Connection Drop-In — booking essential.” You both stare at it for a second.');
        afterWorldChange();
        return;

      case 'group_ambient':
        stayWithGroup(state);
        showNotice(OBSERVATIONS.group_followup.notice, 4400);
        afterWorldChange();
        return;

      case 'observe_radio':
        observeRadio(state);
        showNotice(OBSERVATIONS.radio_first.notice);
        afterWorldChange();
        return;

      case 'observe_room':
        observeRoom(state);
        showNotice(OBSERVATIONS.room_second.notice, 4800);
        afterWorldChange();
        return;

      case 'observe_crosscurrents':
        observeCrosscurrents(state);
        showNotice(OBSERVATIONS.crosscurrents.notice, 4800);
        afterWorldChange();
        return;

      case 'observe_closure':
        observeClosure(state);
        showNotice(OBSERVATIONS.closure_third.notice, 4800);
        afterWorldChange();
        return;

      case 'leave_tabitha':
        finishRun(state, {
          id: 'end_tabitha',
          text: 'You leave the hall with Tabitha.',
          tags: ['left_with_tabitha', 'one_to_one_payoff'],
        });
        afterWorldChange();
        endHandler();
        return;

      case 'leave_solo':
        finishRun(state, { id: 'end_solo', text: 'You head home alone.', tags: ['left_solo'] });
        afterWorldChange();
        endHandler();
        return;

      case 'leave_priya':
        finishRun(state, { id: 'end_priya', text: 'You go for chips with Priya.', tags: ['went_chips_priya'] });
        afterWorldChange();
        endHandler();
        return;

      case 'leave_maya':
        finishRun(state, { id: 'end_maya', text: 'You continue with Maya and the radio crowd.', tags: ['joined_afterparty'] });
        afterWorldChange();
        endHandler();
        return;

      default:
        sceneHandler(chosen.id);
    }
  }

  function activeSituationText(active) {
    if (!active) return 'The evening continues around whatever company you choose.';

    if (active.id === 'tabitha_companionship') {
      if (active.stage === 'development') return 'You and Tabitha are still outside together. The noticeboard has become the next shared thing in front of you.';
      if (active.stage === 'participation') return 'The noticeboard joke has opened a more personal conversation with Tabitha.';
      if (active.stage === 'payoff') return 'Something specific has formed between you and Tabitha. She has drifted round the side rather than disappearing into the room.';
      if (active.stage === 'residue') return 'The private plan remains real. You can stay, rejoin the room, or leave together.';
    }

    if (active.id === 'radio_group') {
      return 'The radio corner is active. You can remain at the edge, participate, or walk away.';
    }

    if (active.id === 'priya_companionship') {
      return 'Priya has found a quieter pocket of the evening. The radio crowd is not required.';
    }

    if (active.id === 'observer_evening') {
      if (active.stage === 'development') return 'You are learning the room’s rhythm without becoming its centre.';
      if (active.stage === 'payoff') return 'The people in the hall are rearranging themselves without waiting for you.';
      if (active.stage === 'residue') return 'You have seen how the night changes when the building begins closing.';
    }

    return 'The evening continues around whatever company you choose.';
  }

  function afterWorldChange() {
    syncNpc();
    const visible = state.visibleChanges.at(-1);
    if (visible) showNotice(visible.detail, 3800);
    setSituation(activeSituationText(activeExperienceSnapshot(state)));
  }

  function renderPrompt() {
    const available = candidates();
    if (currentTarget >= available.length) currentTarget = 0;
    promptEl.textContent = available.length ? `E — ${available[currentTarget].label}` : '';
  }

  function tick(deltaTime) {
    movePlayer(deltaTime);
    syncNpc();
    for (const person of Object.values(npc)) moveNpc(person, deltaTime);
    renderPrompt();
    hudZone.textContent = WORLD.zones[state.player.zone]?.label || state.player.zone;
    hudTime.textContent = state.fictionalTime;
  }

  function drawZone(zone, fill, stroke) {
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 2;
    ctx.fillRect(zone.x, zone.y, zone.w, zone.h);
    ctx.strokeRect(zone.x, zone.y, zone.w, zone.h);
  }

  function box(x, y, width, height, fill) {
    ctx.fillStyle = fill;
    ctx.fillRect(x, y, width, height);
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const gradient = ctx.createLinearGradient(0, 0, 900, 520);
    gradient.addColorStop(0, '#aeb7aa');
    gradient.addColorStop(1, '#d8c7a9');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 900, 520);

    drawZone(WORLD.zones.main, '#eadfcf', '#8c7e6b');
    drawZone(WORLD.zones.radio, '#d2c3af', '#806d59');
    drawZone(WORLD.zones.forecourt, '#b8c1b1', '#74806f');
    drawZone(WORLD.zones.side, '#aab6a0', '#6e7a68');

    ctx.fillStyle = '#6a6258';
    ctx.font = '13px system-ui';
    ctx.fillText('COMMUNITY HALL', 250, 82);
    ctx.fillText('forecourt', 30, 338);
    ctx.fillText('side yard', 680, 245);
    ctx.fillText('radio corner', 490, 107);

    box(312, 190, 118, 58, '#ad8763');
    box(300, 320, 82, 38, '#96735a');
    box(496, 145, 105, 28, '#6d6257');
    box(690, 390, 92, 22, '#88735b');

    ctx.fillStyle = '#705e4d';
    ctx.fillRect(WORLD.points.noticeboard.x - 18, WORLD.points.noticeboard.y - 32, 36, 54);
    ctx.fillStyle = '#eee4cb';
    ctx.fillRect(WORLD.points.noticeboard.x - 14, WORLD.points.noticeboard.y - 28, 28, 46);
    ctx.fillStyle = '#403b35';
    ctx.font = '9px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('NOTICE', WORLD.points.noticeboard.x, WORLD.points.noticeboard.y - 3);
    ctx.textAlign = 'start';

    for (const [id, person] of Object.entries(npc)) {
      if (!person.visible) continue;
      const character = CHARACTERS[id];
      ctx.beginPath();
      ctx.arc(person.x, person.y, 18, 0, Math.PI * 2);
      ctx.fillStyle = character.color;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#fffaf2';
      ctx.stroke();
      ctx.fillStyle = '#292622';
      ctx.font = 'bold 10px system-ui';
      ctx.textAlign = 'center';
      ctx.fillText(character.short, person.x, person.y + 4);
      ctx.textAlign = 'start';
    }

    ctx.beginPath();
    ctx.arc(state.player.x, state.player.y, 15, 0, Math.PI * 2);
    ctx.fillStyle = '#272522';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#fff';
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 10px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText('YOU', state.player.x, state.player.y + 4);
    ctx.textAlign = 'start';
  }

  reset();
  return {
    get state() { return state; },
    tick,
    draw,
    interact,
    cycleTarget,
    setKey,
    clearKeys,
    setInputContext,
    setPaused,
    setSceneHandler,
    setEndHandler,
    showNotice,
    afterWorldChange,
    reset,
  };
}

export const INITIAL_STATE = Object.freeze({
  worldTime: 0,
  paused: false,
  ended: false,
  player: { x: 330, y: 550, facing: { x: 0, y: -1 }, room: 'living' },
  currentTargetId: null,
  flags: {
    tabithaSceneDone: false,
    tabithaAskedQuiet: false,
    playerPromisedQuiet: false,
    playerRefusedPromise: false,
    playerPrioritisedPriya: false,
    frontDoorOpenedByPlayer: false,
    frontDoorOpenedByAlex: false,
    priyaInside: false,
    priyaArrivalMissed: false,
    dampInspected: false,
    dampPhotoTaken: false,
    bedroomOpenedByPlayer: false,
    bedroomOpenedByAlex: false,
    bedroomOpenedEarly: false,
    agentDelayKnown: false,
    viewingSceneDone: false,
    dampDisclosed: false,
    dampSourceDisclosed: null,
    alexFeltUndermined: false,
    tabithaFeltExposed: false,
    priyaFeelsWarned: false,
    priyaLeavesViewing: false,
    departureSceneDone: false,
    playerLeavesWithTabitha: false,
    playerStaysAtFlat: false,
  },
  knowledge: {},
  commitments: [],
  trace: [],
});

export function createState() {
  return structuredClone(INITIAL_STATE);
}

export function record(state, type, data = {}) {
  state.trace.push({ t: Number(state.worldTime.toFixed(1)), type, ...data });
}

export function learn(state, fact, source) {
  if (!state.knowledge[fact]) state.knowledge[fact] = [];
  if (!state.knowledge[fact].includes(source)) state.knowledge[fact].push(source);
  record(state, 'knowledge', { fact, source });
}

export function knowsFrom(state, fact, source) {
  return Boolean(state.knowledge[fact]?.includes(source));
}

export function addCommitment(state, id, text, to) {
  if (!state.commitments.some((c) => c.id === id)) {
    state.commitments.push({ id, text, to, status: 'open' });
    record(state, 'commitment_created', { id, to });
  }
}

export function resolveCommitment(state, id, status) {
  const c = state.commitments.find((item) => item.id === id);
  if (c) {
    c.status = status;
    record(state, 'commitment_resolved', { id, status });
  }
}

export function openFrontDoor(state, actor) {
  if (state.flags.priyaInside) return;
  state.flags.priyaInside = true;
  state.flags.frontDoorOpenedByPlayer = actor === 'player';
  state.flags.frontDoorOpenedByAlex = actor === 'alex';
  record(state, 'front_door_opened', { actor });
}

export function openBedroom(state, actor) {
  if (state.flags.bedroomOpenedByPlayer || state.flags.bedroomOpenedByAlex) return;
  state.flags.bedroomOpenedByPlayer = actor === 'player';
  state.flags.bedroomOpenedByAlex = actor === 'alex';
  state.flags.bedroomOpenedEarly = state.worldTime < 82;
  record(state, 'bedroom_opened', { actor, early: state.flags.bedroomOpenedEarly });
}

export function applyChoice(state, choiceId) {
  switch (choiceId) {
    case 'tabitha_quiet':
      state.flags.playerPromisedQuiet = true;
      state.flags.tabithaAskedQuiet = true;
      addCommitment(state, 'keep-it-quiet', 'Avoid turning the viewing into a public fight unless circumstances force it.', 'Tabitha');
      break;
    case 'tabitha_priya':
      state.flags.playerPrioritisedPriya = true;
      break;
    case 'tabitha_here_for_you':
      addCommitment(state, 'leave-with-tabitha', 'Be present for Tabitha rather than becoming the flat’s fixer.', 'Tabitha');
      break;
    case 'tabitha_no_promise':
      state.flags.playerRefusedPromise = true;
      break;
    case 'viewing_tell_plainly':
      state.flags.dampDisclosed = true;
      state.flags.dampSourceDisclosed = 'player_observation';
      state.flags.priyaFeelsWarned = true;
      state.flags.alexFeltUndermined = true;
      if (state.flags.playerPromisedQuiet) resolveCommitment(state, 'keep-it-quiet', 'broken-for-disclosure');
      break;
    case 'viewing_show_photo':
      state.flags.dampDisclosed = true;
      state.flags.dampSourceDisclosed = 'player_photo';
      state.flags.priyaFeelsWarned = true;
      state.flags.alexFeltUndermined = true;
      state.flags.tabithaFeltExposed = true;
      if (state.flags.playerPromisedQuiet) resolveCommitment(state, 'keep-it-quiet', 'broken-publicly');
      break;
    case 'viewing_let_alex_frame':
      state.flags.dampDisclosed = true;
      state.flags.dampSourceDisclosed = 'alex';
      state.flags.priyaFeelsWarned = true;
      if (state.flags.playerPromisedQuiet) resolveCommitment(state, 'keep-it-quiet', 'kept');
      break;
    case 'viewing_not_my_call':
      if (state.flags.playerPromisedQuiet) resolveCommitment(state, 'keep-it-quiet', 'kept-by-withdrawal');
      break;
    case 'viewing_hide':
      state.flags.priyaFeelsWarned = false;
      if (state.flags.playerPromisedQuiet) resolveCommitment(state, 'keep-it-quiet', 'kept');
      break;
    case 'departure_go':
      state.flags.playerLeavesWithTabitha = true;
      state.flags.playerStaysAtFlat = false;
      resolveCommitment(state, 'leave-with-tabitha', 'kept');
      break;
    case 'departure_stay':
      state.flags.playerStaysAtFlat = true;
      state.flags.playerLeavesWithTabitha = false;
      resolveCommitment(state, 'leave-with-tabitha', 'broken-for-flat');
      break;
    default:
      throw new Error(`Unknown choice: ${choiceId}`);
  }
  record(state, 'choice', { choiceId });
}

export function scoreTarget(player, entity, previousId = null) {
  const dx = entity.x - player.x;
  const dy = entity.y - player.y;
  const distance = Math.hypot(dx, dy);
  if (distance > (entity.range ?? 92)) return -Infinity;
  const len = distance || 1;
  const facing = (dx / len) * player.facing.x + (dy / len) * player.facing.y;
  const facingBonus = Math.max(-0.25, facing) * 70;
  const sticky = entity.id === previousId ? 28 : 0;
  const priority = entity.priority ?? 0;
  return 130 - distance + facingBonus + sticky + priority;
}

export function chooseTarget(player, entities, previousId = null) {
  let best = null;
  let bestScore = -Infinity;
  for (const entity of entities) {
    if (entity.enabled === false) continue;
    const score = scoreTarget(player, entity, previousId);
    if (score > bestScore) {
      best = entity;
      bestScore = score;
    }
  }
  return bestScore > -Infinity ? best : null;
}

export function getOutcomeSummary(state) {
  const f = state.flags;
  const lines = [];
  if (f.playerLeavesWithTabitha) lines.push('You left with Tabitha instead of staying to manage the viewing.');
  if (f.playerStaysAtFlat) lines.push('You stayed at the flat after Tabitha left.');
  if (f.priyaFeelsWarned) lines.push('Priya leaves the evening knowing the damp is a real unresolved condition, not a cosmetic footnote.');
  else lines.push('Priya never receives a clear warning from you about the damp.');
  if (f.alexFeltUndermined) lines.push('Alex thinks you made an already precarious handover harder, even if your reason was defensible.');
  if (f.tabithaFeltExposed) lines.push('Tabitha thinks you used something she was trying to leave behind as evidence in somebody else’s argument.');
  if (f.playerPromisedQuiet && f.dampDisclosed) lines.push('Your promise to keep the evening quiet did not survive contact with the viewing.');
  if (f.bedroomOpenedEarly) lines.push('The room was opened before Tabitha was ready; everyone remembers who made that boundary porous.');
  return lines;
}

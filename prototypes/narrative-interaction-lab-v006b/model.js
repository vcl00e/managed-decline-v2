export const INITIAL_STATE = Object.freeze({
  worldTime: 0,
  fictionMinute: 0,
  phase: 'tabitha',
  phaseElapsed: 0,
  paused: false,
  ended: false,
  player: { x: 300, y: 520, facing: { x: 0, y: -1 }, room: 'living' },
  currentTargetId: null,
  flags: {
    tabithaSceneDone: false,
    tabithaAskedQuiet: false,
    playerPromisedQuiet: false,
    playerRefusedPromise: false,
    playerPrioritisedPriya: false,
    priyaInside: false,
    frontDoorOpenedByPlayer: false,
    frontDoorOpenedByAlex: false,
    arrivalChoice: null,
    viewingPosition: null,
    viewingPositionInferred: false,
    roomAccess: null,
    bedroomOpenedByPlayer: false,
    bedroomOpenedByAlex: false,
    bedroomOpenedEarly: false,
    dampInspected: false,
    dampPhotoTaken: false,
    agentDelayKnown: false,
    viewingSceneDone: false,
    viewingResolvedAmbient: false,
    listenedAtDoorway: false,
    dampDisclosed: false,
    dampSourceDisclosed: null,
    alexFeltUndermined: false,
    tabithaFeltExposed: false,
    priyaFeelsWarned: false,
    priyaLeavesViewing: false,
    departureSceneDone: false,
    playerLeavesWithTabitha: false,
    playerStaysAtFlat: false
  },
  knowledge: {},
  commitments: [
    {
      id: 'walk-to-station',
      text: 'Walk Tabitha to the station when she leaves.',
      to: 'Tabitha',
      status: 'open',
      preexisting: true
    }
  ],
  trace: []
});

export function createState() {
  return structuredClone(INITIAL_STATE);
}

export function record(state, type, data = {}) {
  state.trace.push({ t: Number(state.worldTime.toFixed(1)), phase: state.phase, type, ...data });
}

export function setPhase(state, phase, reason = null) {
  const from = state.phase;
  state.phase = phase;
  state.phaseElapsed = 0;
  record(state, 'phase_change', { from, to: phase, ...(reason ? { reason } : {}) });
}

export function advanceFiction(state, minutes = 1) {
  state.fictionMinute += minutes;
  record(state, 'fiction_time_advanced', { minutes, fictionMinute: state.fictionMinute });
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

export function getCommitment(state, id) {
  return state.commitments.find((item) => item.id === id) || null;
}

export function resolveCommitment(state, id, status) {
  const c = getCommitment(state, id);
  if (c && c.status === 'open') {
    c.status = status;
    record(state, 'commitment_resolved', { id, status });
  }
}

export function openFrontDoor(state, actor, choice = actor) {
  if (state.flags.priyaInside) return;
  state.flags.priyaInside = true;
  state.flags.frontDoorOpenedByPlayer = actor === 'player';
  state.flags.frontDoorOpenedByAlex = actor === 'alex';
  state.flags.arrivalChoice = choice;
  record(state, 'front_door_opened', { actor, choice });
}

export function openBedroom(state, actor, access = actor === 'player' ? 'early' : 'alex') {
  if (state.flags.bedroomOpenedByPlayer || state.flags.bedroomOpenedByAlex) return;
  state.flags.bedroomOpenedByPlayer = actor === 'player';
  state.flags.bedroomOpenedByAlex = actor === 'alex';
  state.flags.roomAccess = access;
  state.flags.bedroomOpenedEarly = access === 'early';
  record(state, 'bedroom_opened', { actor, access, early: state.flags.bedroomOpenedEarly });
}

export function chooseViewingPosition(state, value, inferred = false) {
  if (state.flags.viewingPosition) return;
  state.flags.viewingPosition = value;
  state.flags.viewingPositionInferred = inferred;
  record(state, inferred ? 'positioning_inferred' : 'positioning_choice', { situation: 'viewing', value });
}

export function resolveAmbientViewing(state, mode) {
  state.flags.viewingResolvedAmbient = true;
  state.flags.dampDisclosed = true;
  state.flags.dampSourceDisclosed = 'alex';
  state.flags.priyaFeelsWarned = true;
  state.flags.listenedAtDoorway = mode === 'listen';
  if (state.flags.playerPromisedQuiet) resolveCommitment(state, 'keep-it-quiet', 'kept');
  record(state, 'ambient_viewing_resolved', { mode });
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
      state.flags.dampDisclosed = true;
      state.flags.dampSourceDisclosed = 'alex';
      state.flags.priyaFeelsWarned = true;
      if (state.flags.playerPromisedQuiet) resolveCommitment(state, 'keep-it-quiet', 'kept-by-withdrawal');
      break;
    case 'viewing_hide':
      state.flags.priyaFeelsWarned = false;
      if (state.flags.playerPromisedQuiet) resolveCommitment(state, 'keep-it-quiet', 'kept');
      break;
    case 'departure_go':
      state.flags.playerLeavesWithTabitha = true;
      state.flags.playerStaysAtFlat = false;
      resolveCommitment(state, 'walk-to-station', 'kept');
      break;
    case 'departure_stay':
      state.flags.playerStaysAtFlat = true;
      state.flags.playerLeavesWithTabitha = false;
      resolveCommitment(state, 'walk-to-station', 'broken-to-stay-at-flat');
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
  if (f.playerLeavesWithTabitha) lines.push('You left the flat with Tabitha and kept the station walk you had already promised.');
  if (f.playerStaysAtFlat) lines.push('You stayed at the flat and let Tabitha make the station alone.');
  if (f.priyaFeelsWarned) lines.push('Priya leaves the viewing knowing the damp is a real unresolved condition, not a cosmetic footnote.');
  else lines.push('Priya still has to decide without a clear warning from you or the people in the flat.');
  if (f.viewingPosition === 'tabitha') lines.push('When the viewing started, you initially stayed with Tabitha instead of supervising it.');
  if (f.viewingPosition === 'join') lines.push('You chose to join Alex and Priya as the viewing moved through the flat.');
  if (f.viewingPosition === 'listen') lines.push('You hung back and treated the viewing as something to listen to rather than take over.');
  const quiet = getCommitment(state, 'keep-it-quiet');
  if (quiet?.status?.startsWith('broken')) lines.push('The qualified promise to keep the evening quiet was broken by the way you disclosed the damp.');
  else if (quiet && quiet.status !== 'open') lines.push('You kept the qualified promise to avoid turning the viewing into a public fight.');
  if (f.alexFeltUndermined) lines.push('Alex thinks your intervention made an already precarious handover harder, even if your reason was defensible.');
  if (f.tabithaFeltExposed) lines.push('Tabitha thinks you turned something she was trying to leave behind into evidence.');
  if (f.bedroomOpenedEarly) lines.push('Priya was waved into Tabitha’s room before Tabitha was ready.');
  if (f.roomAccess === 'wait') lines.push('You made the viewing wait at the bedroom threshold long enough for Tabitha to finish.');
  return lines;
}

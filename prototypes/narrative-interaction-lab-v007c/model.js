import { CHARACTERS, EXPERIENCES, OBSERVATIONS } from './scenario.js';
import {
  activateExperience,
  advanceExperience,
  allExperienceCoverage,
  canSurfaceUnrelated,
  completeExperience,
  createExperienceState,
  experienceStage,
  getActiveExperience,
  getExperience,
  hasExperienceEvent,
} from './experience.js';

const clonePerson = (character) => ({
  x: character.start.x,
  y: character.start.y,
  target: { ...character.start },
  visible: character.id !== 'priya',
  mood: 'normal',
  speech: '',
  speechUntil: 0,
});

export function createState() {
  return {
    runId: null,
    fictionalTime: '19:03',
    minute: 0,
    beat: 0,
    ended: false,
    paused: false,
    player: { x: 118, y: 420, facing: { x: 1, y: 0 }, zone: 'forecourt' },
    characters: Object.fromEntries(
      Object.values(CHARACTERS).map((character) => [character.id, clonePerson(character)]),
    ),
    experiences: createExperienceState(EXPERIENCES),
    flags: {
      withTabitha: false,
      tabithaPlan: null,
      privateMotif: null,
      privateContextReincorporated: false,
      priyaArrived: false,
      priyaSettled: false,
      closureActive: false,
      chipsAvailable: false,
      afterpartyAvailable: false,
      observerClosureSeen: false,
    },
    tags: {},
    conduct: [],
    seenScenes: [],
    visibleChanges: [],
    trace: [],
    interpretations: {},
    residue: [],
  };
}

export function record(state, type, payload = {}) {
  state.trace.push({
    index: state.trace.length,
    type,
    beat: state.beat,
    fictionalTime: state.fictionalTime,
    ...payload,
  });
}

export function addVisibleChange(state, kind, detail) {
  const item = {
    index: state.visibleChanges.length,
    kind,
    detail,
    beat: state.beat,
  };
  state.visibleChanges.push(item);
  record(state, 'visible_change', item);
  return item;
}

function addTags(state, tags = []) {
  for (const item of tags) state.tags[item] = (state.tags[item] ?? 0) + 1;
}

export function recordConduct(state, id, tags = [], audience = []) {
  const item = {
    id,
    tags,
    audience,
    privacy: audience.length > 1 ? 'public' : audience.length === 1 ? 'private' : 'none',
  };
  state.conduct.push(item);
  addTags(state, tags);
  record(state, 'conduct', item);
  return item;
}

function recordExperienceChange(state, result) {
  if (!result?.changed) return;
  record(state, 'experience_change', {
    experienceId: result.id,
    eventId: result.eventId ?? null,
    status: result.history.status,
    stage: result.history.stage,
    fulfilled: [...result.history.fulfilled],
  });
}

function applyExperienceEvents(state, events = []) {
  for (const item of events) {
    const result = advanceExperience(
      state,
      EXPERIENCES,
      item.id,
      item.event,
      item.fulfills ?? [],
    );
    recordExperienceChange(state, result);
  }
}

export function advanceBeat(state, minutes = 7, reason = 'meaningful beat') {
  if (state.ended) return;
  state.beat += 1;
  state.minute += minutes;
  const total = 19 * 60 + 3 + state.minute;
  state.fictionalTime = `${String(Math.floor(total / 60) % 24).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
  record(state, 'beat_advanced', { minutes, reason });
  progressWorld(state);
}

export function applySceneChoice(state, sceneId, choice) {
  if (!state.seenScenes.includes(sceneId)) state.seenScenes.push(sceneId);
  recordConduct(state, choice.id, choice.tags ?? [], defaultAudience(sceneId, state));
  applyExperienceEvents(state, choice.experienceEvents ?? []);
  applyEffect(state, choice.effect);
  if (!state.ended) {
    const minutes = sceneId === 'tabitha_private' || sceneId === 'closing' ? 10 : 6;
    advanceBeat(state, minutes, `scene:${sceneId}`);
  }
  return choice.responses ?? [];
}

function defaultAudience(sceneId, state) {
  if (['tabitha_opening', 'tabitha_private', 'tabitha_callback'].includes(sceneId)) {
    return ['tabitha'];
  }
  if (sceneId === 'priya_private') return ['priya'];
  if (sceneId === 'radio_group') {
    return ['maya', 'alex', ...(state.characters.tabitha.mood === 'inside' ? ['tabitha'] : [])];
  }
  if (sceneId === 'mixed_story') return ['maya', 'alex', 'tabitha', 'priya'];
  if (sceneId === 'closing') return ['maya', 'alex', 'priya', 'elliot'];
  return [];
}

function applyEffect(state, effect) {
  const characters = state.characters;
  switch (effect) {
    case 'tabitha_stays_with_player':
      state.flags.withTabitha = true;
      characters.tabitha.mood = 'with you';
      characters.tabitha.target = { x: 185, y: 390 };
      addVisibleChange(
        state,
        'relationship-space',
        'Tabitha stays outside with you and turns toward the noticeboard.',
      );
      break;

    case 'tabitha_goes_inside':
      state.flags.withTabitha = false;
      characters.tabitha.mood = 'inside';
      characters.tabitha.target = { x: 430, y: 290 };
      addVisibleChange(
        state,
        'position',
        'Tabitha heads into the hall with you free to follow or remain outside.',
      );
      break;

    case 'plan_breakfast':
      state.flags.withTabitha = true;
      state.flags.tabithaPlan = 'breakfast';
      state.flags.privateMotif = 'laminated menus';
      characters.tabitha.mood = 'open / amused';
      characters.tabitha.target = { x: 710, y: 350 };
      addVisibleChange(
        state,
        'arrangement',
        'Breakfast tomorrow is now a real plan between you and Tabitha.',
      );
      break;

    case 'plan_notice_walk':
      state.flags.withTabitha = true;
      state.flags.tabithaPlan = 'notice_walk';
      state.flags.privateMotif = 'notice ranking';
      characters.tabitha.mood = 'conspiratorial';
      characters.tabitha.target = { x: 710, y: 350 };
      addVisibleChange(
        state,
        'motif',
        'The two of you now have a private notice-ranking bit and a station-walk plan.',
      );
      break;

    case 'plan_building_walk':
      state.flags.withTabitha = true;
      state.flags.tabithaPlan = 'building_walk';
      state.flags.privateMotif = 'old civic buildings';
      characters.tabitha.mood = 'enthusiastic / trying not to show it';
      characters.tabitha.target = { x: 710, y: 350 };
      addVisibleChange(
        state,
        'arrangement',
        'Tabitha offers to show you the old library and its absurd ventilation tower tomorrow.',
      );
      break;

    case 'end_tabitha_walk':
      state.flags.withTabitha = true;
      finishRun(state, {
        id: 'end_tabitha',
        text: 'You leave the hall with Tabitha.',
        tags: ['left_with_tabitha', 'one_to_one_payoff'],
      });
      break;

    case 'rejoin_together':
      state.flags.withTabitha = true;
      state.flags.privateContextReincorporated = true;
      characters.tabitha.mood = 'inside';
      characters.tabitha.target = { x: 445, y: 285 };
      addVisibleChange(
        state,
        'position',
        'You and Tabitha head back into the hall together, carrying the private context with you.',
      );
      break;

    case 'linger_with_tabitha':
      state.flags.withTabitha = true;
      characters.tabitha.mood = 'quiet company';
      addVisibleChange(
        state,
        'behaviour',
        'The two of you stay on the low wall; the evening continues without demanding anything from you.',
      );
      break;

    case 'group_welcome':
      state.flags.afterpartyAvailable = true;
      addVisibleChange(
        state,
        'group',
        'Maya folds you into the banter; the group remains optional and permeable.',
      );
      break;

    case 'group_observer':
      addVisibleChange(
        state,
        'group',
        'Maya and Alex keep talking to each other while you listen at the edge.',
      );
      break;

    case 'group_with_tabitha':
      state.flags.privateContextReincorporated = Boolean(state.flags.privateMotif);
      addVisibleChange(
        state,
        'position',
        'You remain beside Tabitha at the edge of the radio group.',
      );
      break;

    case 'priya_relaxes':
      characters.priya.mood = 'more at ease';
      addVisibleChange(
        state,
        'behaviour',
        'Priya stops scanning the room and settles into the conversation.',
      );
      break;

    case 'priya_chips_plan':
      state.flags.chipsAvailable = true;
      characters.priya.mood = 'has a plan';
      addVisibleChange(
        state,
        'arrangement',
        'You and Priya now have a concrete chips plan for later.',
      );
      break;

    case 'tabitha_public_warmth':
      characters.tabitha.mood = 'comfortable';
      addVisibleChange(
        state,
        'dialogue',
        'Tabitha visibly appreciates how you handled her story in front of the group.',
      );
      break;

    case 'tabitha_steps_away':
      state.flags.withTabitha = false;
      characters.tabitha.mood = 'annoyed';
      characters.tabitha.target = { x: 730, y: 350 };
      addVisibleChange(state, 'position', 'Tabitha steps out of the group immediately.');
      break;

    case 'maya_handles_closure':
      addVisibleChange(
        state,
        'world',
        'Maya handles the closure without recruiting you into a task.',
      );
      break;

    case 'helped_one_box':
      state.flags.afterpartyAvailable = true;
      addVisibleChange(state, 'world', 'You move one box; the rest continues without becoming a job.');
      break;

    case 'ready_to_leave':
      addVisibleChange(state, 'affordance', 'Leaving is now the obvious next option, not an objective.');
      break;

    default:
      break;
  }
}

export function shareNotice(state) {
  if (hasExperienceEvent(state, 'tabitha_companionship', 'notice_shared')) return;
  recordConduct(state, 'shared_noticeboard', ['shared_observation_tabitha'], ['tabitha']);
  recordExperienceChange(
    state,
    advanceExperience(state, EXPERIENCES, 'tabitha_companionship', 'notice_shared'),
  );
  state.flags.privateMotif = 'community resilience';
  addVisibleChange(
    state,
    'shared_activity',
    'You and Tabitha read the noticeboard together; “Social Connection Drop-In — booking essential” becomes the favourite.',
  );
  advanceBeat(state, 5, 'shared noticeboard');
}

export function observeRadio(state) {
  if (hasExperienceEvent(state, 'observer_evening', 'radio_observed')) return;
  recordConduct(state, 'observed_radio', ['comfortable_observer'], []);
  recordExperienceChange(
    state,
    advanceExperience(state, EXPERIENCES, 'observer_evening', 'radio_observed'),
  );
  addVisibleChange(state, 'observation', OBSERVATIONS.radio_first.visible);
  advanceBeat(state, 7, 'observed radio group');
}

export function stayWithGroup(state) {
  if (hasExperienceEvent(state, 'radio_group', 'group_ambient')) return;
  recordConduct(state, 'stayed_with_radio_group', ['group_continuity'], ['maya', 'alex']);
  recordExperienceChange(
    state,
    advanceExperience(state, EXPERIENCES, 'radio_group', 'group_ambient'),
  );
  addVisibleChange(state, 'group', OBSERVATIONS.group_followup.visible);
  advanceBeat(state, 7, 'radio group develops');
}

export function observeRoom(state) {
  if (hasExperienceEvent(state, 'observer_evening', 'room_observed')) return;
  ensurePriyaArrival(state, 'observer noticed arrival');
  ensurePriyaSettled(state, 'observer watched self-settling');
  recordConduct(state, 'observed_room_rhythm', ['read_social_rhythm'], []);
  recordExperienceChange(
    state,
    advanceExperience(state, EXPERIENCES, 'observer_evening', 'room_observed'),
  );
  addVisibleChange(state, 'observation', OBSERVATIONS.room_second.visible);
  advanceBeat(state, 8, 'observed room rhythm');
}

export function observeCrosscurrents(state) {
  if (hasExperienceEvent(state, 'observer_evening', 'crosscurrents_observed')) return;
  recordConduct(state, 'observed_crosscurrents', ['read_social_rhythm'], []);
  recordExperienceChange(
    state,
    advanceExperience(state, EXPERIENCES, 'observer_evening', 'crosscurrents_observed'),
  );
  if (state.characters.tabitha.mood === 'inside') {
    state.characters.tabitha.mood = 'taking air';
    state.characters.tabitha.target = { x: 720, y: 350 };
  }
  addVisibleChange(state, 'observation', OBSERVATIONS.crosscurrents.visible);
  advanceBeat(state, 7, 'observed social crosscurrents');
}

export function observeClosure(state) {
  if (hasExperienceEvent(state, 'observer_evening', 'closure_observed')) return;
  recordConduct(state, 'observed_closure', ['observed_world_change'], []);
  recordExperienceChange(
    state,
    advanceExperience(state, EXPERIENCES, 'observer_evening', 'closure_observed'),
  );
  state.flags.observerClosureSeen = true;
  addVisibleChange(state, 'observation', OBSERVATIONS.closure_third.visible);
  advanceBeat(state, 8, 'observed closure response');
}

function ensurePriyaArrival(state, reason = 'world progression') {
  if (state.flags.priyaArrived) return;
  state.flags.priyaArrived = true;
  const priya = state.characters.priya;
  priya.visible = true;
  priya.mood = 'arrived';
  priya.target = { x: 105, y: 408 };
  addVisibleChange(state, 'arrival', 'Priya arrives. She does not require you to collect her.');
  record(state, 'npc_initiative', { character: 'priya', action: 'arrived', reason });
}

function ensurePriyaSettled(state, reason = 'world progression') {
  if (state.flags.priyaSettled) return;
  ensurePriyaArrival(state, reason);
  state.flags.priyaSettled = true;
  const priya = state.characters.priya;
  priya.mood = 'settled independently';
  priya.target = { x: 610, y: 330 };
  addVisibleChange(
    state,
    'npc_initiative',
    'Priya heads inside under her own steam and starts talking to Maya.',
  );
  record(state, 'npc_initiative', { character: 'priya', action: 'self_settled', reason });
}

export function progressWorld(state) {
  const canInterrupt = canSurfaceUnrelated(state, EXPERIENCES);
  const playerSocial = ['main', 'radio'].includes(state.player.zone)
    || hasExperienceEvent(state, 'radio_group', 'joined_group')
    || hasExperienceEvent(state, 'observer_evening', 'radio_observed');

  if (canInterrupt) {
    if (playerSocial && state.beat >= 1 && state.characters.tabitha.mood === 'normal') {
      state.characters.tabitha.mood = 'inside';
      state.characters.tabitha.target = { x: 445, y: 285 };
      addVisibleChange(
        state,
        'npc_initiative',
        'Tabitha heads inside under her own steam; ignoring her does not freeze her evening.',
      );
    }

    const arrivalThreshold = playerSocial ? 1 : 2;
    if (state.beat >= arrivalThreshold) ensurePriyaArrival(state);
    if (state.beat >= arrivalThreshold + 1) ensurePriyaSettled(state);
  }

  if (canInterrupt && state.beat >= 3 && !state.flags.closureActive) {
    state.flags.closureActive = true;
    state.characters.elliot.mood = 'closing up';
    addVisibleChange(
      state,
      'world',
      'Elliot starts closing part of the hall. The evening can continue elsewhere or end.',
    );
  }
}

export function getAvailableInteractions(state, zone) {
  if (state.ended) return [];
  const interactions = [];

  const tabithaStage = experienceStage(state, 'tabitha_companionship');
  const radioStage = experienceStage(state, 'radio_group');
  const priyaStage = experienceStage(state, 'priya_companionship');
  const observerStage = experienceStage(state, 'observer_evening');

  if (zone === 'forecourt' && tabithaStage === 'unstarted' && !state.seenScenes.includes('tabitha_opening')) {
    interactions.push('tabitha_opening');
  }

  if (
    state.flags.withTabitha
    && tabithaStage === 'development'
    && !hasExperienceEvent(state, 'tabitha_companionship', 'notice_shared')
    && ['forecourt', 'side'].includes(zone)
  ) {
    interactions.push('noticeboard');
  }

  if (
    tabithaStage === 'participation'
    && !state.seenScenes.includes('tabitha_private')
    && ['forecourt', 'side'].includes(zone)
  ) {
    interactions.push('tabitha_private');
  }

  if (
    tabithaStage === 'payoff'
    && !state.seenScenes.includes('tabitha_callback')
    && zone === 'side'
  ) {
    interactions.push('tabitha_callback');
  }

  if (
    tabithaStage === 'residue'
    && state.flags.withTabitha
    && ['forecourt', 'side'].includes(zone)
  ) {
    interactions.push('leave_tabitha');
  }

  if (
    ['main', 'radio'].includes(zone)
    && radioStage === 'unstarted'
    && !state.seenScenes.includes('radio_group')
  ) {
    interactions.push('radio_group');
  }

  if (
    ['main', 'radio'].includes(zone)
    && radioStage === 'development'
    && !hasExperienceEvent(state, 'radio_group', 'group_ambient')
  ) {
    interactions.push('group_ambient');
  }

  if (
    ['main', 'radio'].includes(zone)
    && state.flags.priyaSettled
    && priyaStage === 'unstarted'
    && !state.seenScenes.includes('priya_private')
  ) {
    interactions.push('priya_private');
  }

  if (
    ['main', 'radio'].includes(zone)
    && hasExperienceEvent(state, 'radio_group', 'joined_group')
    && state.flags.priyaSettled
    && !state.seenScenes.includes('mixed_story')
    && state.characters.tabitha.mood === 'inside'
  ) {
    interactions.push('mixed_story');
  }

  if (
    ['main', 'radio'].includes(zone)
    && state.flags.closureActive
    && !state.seenScenes.includes('closing')
  ) {
    interactions.push('closing');
  }

  if (['main', 'radio'].includes(zone) && observerStage === 'unstarted') {
    interactions.push('observe_radio');
  }
  if (['main', 'radio', 'forecourt'].includes(zone) && observerStage === 'development') {
    interactions.push('observe_room');
  }
  if (
    ['main', 'radio', 'forecourt'].includes(zone)
    && observerStage === 'payoff'
    && !hasExperienceEvent(state, 'observer_evening', 'crosscurrents_observed')
  ) {
    interactions.push('observe_crosscurrents');
  }
  if (
    ['main', 'radio', 'side'].includes(zone)
    && observerStage === 'payoff'
    && state.flags.closureActive
    && hasExperienceEvent(state, 'observer_evening', 'crosscurrents_observed')
  ) {
    interactions.push('observe_closure');
  }

  if (zone === 'forecourt' && state.beat >= 1) interactions.push('leave_solo');
  if (zone === 'forecourt' && state.flags.chipsAvailable) interactions.push('leave_priya');
  if (zone === 'forecourt' && state.flags.afterpartyAvailable) interactions.push('leave_maya');

  return [...new Set(interactions)];
}

export function finishRun(state, choice) {
  if (state.ended) return;

  if (choice.id === 'end_tabitha') {
    const history = getExperience(state, 'tabitha_companionship');
    if (history.stage !== 'complete') {
      recordExperienceChange(
        state,
        advanceExperience(state, EXPERIENCES, 'tabitha_companionship', 'left_together'),
      );
    }
  } else if (choice.id === 'end_priya') {
    const history = getExperience(state, 'priya_companionship');
    if (history.stage === 'payoff' && !hasExperienceEvent(state, 'priya_companionship', 'plan_formed')) {
      recordExperienceChange(
        state,
        advanceExperience(state, EXPERIENCES, 'priya_companionship', 'plan_formed'),
      );
    }
    if (['payoff', 'residue'].includes(getExperience(state, 'priya_companionship').stage)) {
      recordExperienceChange(
        state,
        advanceExperience(state, EXPERIENCES, 'priya_companionship', 'left_together'),
      );
    }
  } else if (choice.id === 'end_maya') {
    const history = getExperience(state, 'radio_group');
    if (['development', 'payoff', 'residue'].includes(history.stage)) {
      recordExperienceChange(
        state,
        advanceExperience(state, EXPERIENCES, 'radio_group', 'afterparty'),
      );
    }
  } else if (choice.id === 'end_solo') {
    const observer = getExperience(state, 'observer_evening');
    if (['development', 'payoff', 'residue'].includes(observer.stage)) {
      recordExperienceChange(
        state,
        advanceExperience(state, EXPERIENCES, 'observer_evening', 'observer_left'),
      );
    }
  }

  recordConduct(state, choice.id, choice.tags ?? [], []);
  state.ended = true;
  finalizeInterpretations(state, choice.id);
  addVisibleChange(state, 'ending', choice.text);
  record(state, 'run_ended', { ending: choice.id });
}

export function finalizeInterpretations(state, endingId) {
  const tags = state.tags;
  let tabitha = 'easy_company';
  const tabithaEvidence = [];

  if (tags.private_reassurance_tabitha) {
    tabitha = 'someone_i_can_make_unstructured_plans_with';
    tabithaEvidence.push('private reassurance / breakfast plan');
  }
  if (tags.private_tease_tabitha) {
    tabitha = 'shares_my_private_joke';
    tabithaEvidence.push('laminated permission / notice motif');
  }
  if (tags.private_curiosity_tabitha) {
    tabitha = 'interested_in_me_beyond_the_public_story';
    tabithaEvidence.push('asked about the person beyond the campaign');
  }
  if (tags.crossed_tabitha_teasing_line) {
    tabitha = 'private_warmth_complicated_by_public_exposure';
    tabithaEvidence.push('public boundary crossed');
  }
  if (endingId === 'end_tabitha') tabithaEvidence.push('left together');

  let priya = 'familiar_face';
  const priyaEvidence = [];
  if (tags.shared_uncertainty_priya || tags.reassured_priya) {
    priya = 'easy_to_be_new_with';
    priyaEvidence.push('private easing conduct');
  }
  if (tags.new_arrangement_priya || endingId === 'end_priya') {
    priya = 'someone_i_have_a_clear_plan_with';
    priyaEvidence.push('chips plan');
  }

  let maya = 'pleasant_guest';
  const mayaEvidence = [];
  if (tags.group_participation) {
    maya = 'fits_the_room';
    mayaEvidence.push('joined banter');
  }
  if (endingId === 'end_maya') {
    maya = 'becoming_part_of_radio_crowd';
    mayaEvidence.push('continued with group');
  }

  state.interpretations = {
    tabitha: { read: tabitha, evidence: tabithaEvidence },
    priya: { read: priya, evidence: priyaEvidence },
    maya: { read: maya, evidence: mayaEvidence },
  };

  const residue = [{ id: 'hall_known', text: 'The hall is now somewhere you recognise.' }];
  if (state.flags.tabithaPlan === 'breakfast') {
    residue.push({ id: 'tabitha_breakfast', text: 'You and Tabitha have breakfast plans for tomorrow.' });
  }
  if (state.flags.tabithaPlan === 'notice_walk') {
    residue.push({ id: 'tabitha_notice_motif', text: 'The notice-ranking walk has become a private plan between you and Tabitha.' });
  }
  if (state.flags.tabithaPlan === 'building_walk') {
    residue.push({ id: 'tabitha_building_walk', text: 'Tabitha has offered to show you the old library and its ventilation tower tomorrow.' });
  }
  if (state.flags.chipsAvailable) {
    residue.push({ id: 'priya_chips', text: 'Priya expects the chips plan to happen.' });
  }
  if (endingId === 'end_maya') {
    residue.push({ id: 'radio_invite', text: 'Maya includes you in the next radio-night message.' });
  }
  if (state.flags.observerClosureSeen) {
    residue.push({ id: 'outside_broadcast_memory', text: 'You saw the radio night continue after the building officially became unavailable.' });
  }

  state.residue = residue;
  record(state, 'interpretations_finalized', {
    interpretations: state.interpretations,
    residue,
  });
}

export function activeExperienceSnapshot(state) {
  const active = getActiveExperience(state, EXPERIENCES);
  if (!active) return null;
  return {
    id: active.definition.id,
    mode: active.definition.mode,
    playerDesire: active.definition.playerDesire,
    stage: active.history.stage,
    status: active.history.status,
  };
}

export function routeValueSummary(state) {
  const coverage = allExperienceCoverage(state, EXPERIENCES);
  return {
    active: activeExperienceSnapshot(state),
    experiences: coverage,
    tabitha: {
      plan: state.flags.tabithaPlan,
      motif: state.flags.privateMotif,
      reincorporated: state.flags.privateContextReincorporated,
      endedTogether: state.conduct.some((item) => item.id === 'end_tabitha'),
    },
    priya: {
      arrived: state.flags.priyaArrived,
      settled: state.flags.priyaSettled,
      chipsPlan: state.flags.chipsAvailable,
    },
    group: {
      afterparty: state.flags.afterpartyAvailable,
    },
  };
}

export function exportRun(state, debrief = {}) {
  return {
    prototype: 'narrative-interaction-lab-v007c',
    scenario: 'Friday Night — active social experiences',
    exportedAt: new Date().toISOString(),
    state,
    coverage: allExperienceCoverage(state, EXPERIENCES),
    debrief,
  };
}

export { activateExperience, completeExperience, experienceStage, getExperience };

import { CHARACTER_POSITIONS } from './scenario.js';

export function createInitialState() {
  return {
    phase: 'arrival',
    fictionalTime: '19:03',
    player: { x: 120, y: 420 },
    characters: {
      tabitha: { ...CHARACTER_POSITIONS.tabitha, visible: true },
      maya: { ...CHARACTER_POSITIONS.maya, visible: true },
      alex: { ...CHARACTER_POSITIONS.alex, visible: true },
      priya: { ...CHARACTER_POSITIONS.priya, visible: false },
      elliot: { ...CHARACTER_POSITIONS.elliot, visible: true }
    },
    flags: {
      arrivalSceneDone: false,
      joinedRadio: false,
      priyaArrived: false,
      priyaSceneDone: false,
      kebabStoryDone: false,
      tabithaOutside: false,
      tabithaPrivateDone: false,
      priyaPrivateAvailable: false,
      priyaPrivateDone: false,
      closingDone: false,
      finalDone: false,
      aftermath: false
    },
    conduct: [],
    tags: {},
    seenScenes: [],
    interpretations: {},
    residue: [],
    trace: []
  };
}

export function addTrace(state, type, payload = {}) {
  state.trace.push({ index: state.trace.length, type, phase: state.phase, fictionalTime: state.fictionalTime, ...payload });
}

export function recordConduct(state, event) {
  const normalized = {
    id: event.id,
    actor: event.actor ?? 'player',
    targets: event.targets ?? [],
    audience: event.audience ?? [],
    channel: event.channel ?? 'physical',
    privacy: event.privacy ?? (event.audience?.length ? 'public' : 'private'),
    tags: event.tags ?? []
  };
  state.conduct.push(normalized);
  for (const tag of normalized.tags) state.tags[tag] = (state.tags[tag] ?? 0) + 1;
  addTrace(state, 'conduct', normalized);
  return normalized;
}

export function applyChoice(state, sceneId, choice) {
  state.seenScenes.push(sceneId);
  const audience = choice.audience ?? defaultAudienceForScene(sceneId);
  recordConduct(state, {
    id: choice.id,
    targets: choice.targets ?? inferTargets(choice.tags ?? []),
    audience,
    privacy: audience.length >= 2 ? 'public' : 'private',
    tags: choice.tags ?? []
  });
  advanceAfterScene(state, sceneId, choice.id);
}

function inferTargets(tags) {
  const result = [];
  if (tags.some(t => t.includes('tabitha'))) result.push('tabitha');
  if (tags.some(t => t.includes('priya'))) result.push('priya');
  if (tags.some(t => t.includes('radio') || t.includes('group') || t.includes('social'))) result.push('maya');
  return result;
}

function defaultAudienceForScene(sceneId) {
  if (sceneId === 'join_radio_group') return ['tabitha', 'maya', 'alex'];
  if (['priya_arrives', 'kebab_story', 'closing_notice', 'final_choice'].includes(sceneId)) {
    return ['tabitha', 'maya', 'alex', 'priya'];
  }
  if (sceneId === 'tabitha_side_yard') return ['tabitha'];
  if (sceneId === 'priya_quiet') return ['priya'];
  if (sceneId === 'arrival_tabitha') return ['tabitha'];
  return [];
}

export function advanceAfterScene(state, sceneId, choiceId) {
  switch (sceneId) {
    case 'arrival_tabitha':
      state.flags.arrivalSceneDone = true;
      state.phase = 'warmup';
      state.fictionalTime = '19:08';
      break;
    case 'join_radio_group':
      state.flags.joinedRadio = true;
      state.phase = 'group_warmup';
      state.fictionalTime = '19:18';
      break;
    case 'priya_arrives':
      state.flags.priyaSceneDone = true;
      state.phase = 'mixed_group';
      state.fictionalTime = '19:31';
      state.flags.priyaPrivateAvailable = true;
      break;
    case 'kebab_story':
      state.flags.kebabStoryDone = true;
      state.phase = 'free_social';
      state.fictionalTime = '20:02';
      state.flags.tabithaOutside = true;
      state.characters.tabitha.x = 735;
      state.characters.tabitha.y = 350;
      break;
    case 'tabitha_side_yard':
      state.flags.tabithaPrivateDone = true;
      state.phase = 'free_social';
      state.fictionalTime = '20:22';
      break;
    case 'priya_quiet':
      state.flags.priyaPrivateDone = true;
      state.phase = 'free_social';
      state.fictionalTime = '20:29';
      break;
    case 'closing_notice':
      state.flags.closingDone = true;
      state.phase = 'wind_down';
      state.fictionalTime = '21:34';
      break;
    case 'final_choice':
      state.flags.finalDone = true;
      state.phase = 'aftermath';
      state.fictionalTime = '10:14 next day';
      state.flags.aftermath = true;
      finalizeInterpretations(state, choiceId);
      break;
  }
  addTrace(state, 'phase_change', { sceneId, choiceId, to: state.phase });
}

export function triggerPriyaArrival(state) {
  if (state.flags.priyaArrived) return false;
  state.flags.priyaArrived = true;
  state.characters.priya.visible = true;
  state.characters.priya.x = 105;
  state.characters.priya.y = 405;
  state.phase = 'priya_arrival';
  addTrace(state, 'situation_change', { id: 'priya_arrives' });
  return true;
}

export function canOpenScene(state, sceneId) {
  switch (sceneId) {
    case 'arrival_tabitha': return !state.flags.arrivalSceneDone;
    case 'join_radio_group': return state.flags.arrivalSceneDone && !state.flags.joinedRadio;
    case 'priya_arrives': return state.flags.priyaArrived && !state.flags.priyaSceneDone;
    case 'kebab_story': return state.flags.priyaSceneDone && !state.flags.kebabStoryDone;
    case 'tabitha_side_yard': return state.flags.tabithaOutside && !state.flags.tabithaPrivateDone;
    case 'priya_quiet': return state.flags.priyaPrivateAvailable && !state.flags.priyaPrivateDone;
    case 'closing_notice': return state.flags.kebabStoryDone && !state.flags.closingDone;
    case 'final_choice': return state.flags.closingDone && !state.flags.finalDone;
    default: return false;
  }
}

export function finalizeInterpretations(state, endingChoiceId) {
  const t = state.tags;
  const tabithaEvidence = [];
  let tabithaRead = 'easy_company';
  if (t.crossed_tabitha_teasing_line) {
    tabithaRead = 'fun_until_you_make_me_the_story';
    tabithaEvidence.push('crossed_tabitha_teasing_line');
  } else if (t.respected_story_ownership || t.protected_tabitha_line || t.backed_tabitha_publicly) {
    tabithaRead = 'knows_where_the_line_is';
    if (t.respected_story_ownership) tabithaEvidence.push('respected_story_ownership');
    if (t.protected_tabitha_line) tabithaEvidence.push('protected_tabitha_line');
    if (t.backed_tabitha_publicly) tabithaEvidence.push('backed_tabitha_publicly');
  }
  if (t.noticed_tabitha || t.chose_quiet_time_tabitha) {
    tabithaRead = tabithaRead === 'fun_until_you_make_me_the_story' ? 'annoying_but_you_did_notice_me' : 'drifts_but_comes_back';
    tabithaEvidence.push(t.noticed_tabitha ? 'noticed_tabitha' : 'chose_quiet_time_tabitha');
  }
  if (endingChoiceId === 'leave_tabitha') {
    tabithaEvidence.push('left_with_tabitha');
    if (tabithaRead === 'easy_company') tabithaRead = 'chose_the_walk_home';
  }

  const mayaEvidence = [];
  let mayaRead = 'pleasant_guest';
  if (t.social_bridge || t.introduced_priya) {
    mayaRead = 'makes_the_room_easier';
    mayaEvidence.push('introduced_priya');
  }
  if (t.group_participation || t.played_along) {
    mayaRead = mayaRead === 'makes_the_room_easier' ? 'fits_the_room_and_connects_people' : 'fits_the_room';
    mayaEvidence.push('group_participation');
  }
  if (t.helped_radio_move || t.improvised_socially) {
    mayaRead = 'someone_to_include_next_time';
    mayaEvidence.push(t.helped_radio_move ? 'helped_radio_move' : 'improvised_socially');
  }
  if (endingChoiceId === 'afterparty_maya') {
    mayaRead = 'becoming_part_of_the_radio_crowd';
    mayaEvidence.push('joined_afterparty');
  }

  const priyaEvidence = [];
  let priyaRead = 'familiar_face_in_a_new_room';
  if (t.introduced_priya || t.included_priya) {
    priyaRead = 'made_room_for_me';
    priyaEvidence.push(t.introduced_priya ? 'introduced_priya' : 'included_priya');
  }
  if (t.gave_priya_space) {
    priyaRead = 'trusted_me_to_land_on_my_feet';
    priyaEvidence.push('gave_priya_space');
  }
  if (t.reassured_priya || t.shared_uncertainty_priya) {
    priyaRead = 'easy_to_be_new_with';
    priyaEvidence.push(t.reassured_priya ? 'reassured_priya' : 'shared_uncertainty_priya');
  }
  if (endingChoiceId === 'chips_priya' || t.invited_priya_chips) {
    priyaRead = 'chose_more_time_with_me';
    priyaEvidence.push(endingChoiceId === 'chips_priya' ? 'went_chips_priya' : 'invited_priya_chips');
  }

  state.interpretations = {
    tabitha: { read: tabithaRead, evidence: tabithaEvidence },
    maya: { read: mayaRead, evidence: mayaEvidence },
    priya: { read: priyaRead, evidence: priyaEvidence }
  };

  const residue = [];
  if (endingChoiceId === 'afterparty_maya' || mayaRead.includes('radio') || mayaRead.includes('include')) {
    residue.push({ id: 'radio_invite', text: 'Maya adds you to the small radio-night group chat.' });
    residue.push({ id: 'maya_flat_access', text: 'Maya’s flat becomes a socially plausible place for you to visit.' });
  }
  if (endingChoiceId === 'leave_tabitha' || tabithaRead === 'drifts_but_comes_back' || tabithaRead === 'chose_the_walk_home') {
    residue.push({ id: 'tabitha_photo', text: 'Tabitha sends you a blurry photo from the walk home with no explanation.' });
  }
  if (endingChoiceId === 'chips_priya' || priyaRead === 'chose_more_time_with_me') {
    residue.push({ id: 'priya_followup', text: 'Priya messages about trying the radio night again next week.' });
  }
  if (t.social_bridge || t.introduced_priya) {
    residue.push({ id: 'priya_maya_recognition', text: 'Priya and Maya now recognise each other without needing you as the link.' });
  }
  if (t.crossed_tabitha_teasing_line) {
    residue.push({ id: 'kebab_callback', text: 'The kebab-shop story is now part of the group’s shared memory; Tabitha is not thrilled.' });
  } else if (t.respected_story_ownership || t.backed_tabitha_publicly) {
    residue.push({ id: 'veto_motif', text: '“Veto stands” becomes a private joke between you and Tabitha.' });
  }
  residue.push({ id: 'hall_known', text: 'The hall and its radio corner now feel like somewhere you know, not just somewhere you visited.' });
  state.residue = residue;
  addTrace(state, 'interpretations_finalized', { interpretations: state.interpretations, residue: state.residue });
}

export function exportRun(state, debrief = {}) {
  return {
    prototype: 'narrative-interaction-lab-v007',
    scenario: 'Friday Night',
    exportedAt: new Date().toISOString(),
    conduct: state.conduct,
    interpretations: state.interpretations,
    residue: state.residue,
    debrief,
    trace: state.trace
  };
}

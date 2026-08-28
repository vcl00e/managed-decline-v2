import test from 'node:test';
import assert from 'node:assert/strict';
import { SCENES } from '../scenario.js';
import {
  advanceBeat,
  applySceneChoice,
  createState,
  finishRun,
  getAvailableInteractions,
  observeClosure,
  observeCrosscurrents,
  observeRadio,
  observeRoom,
  stayWithGroup,
  routeValueSummary,
  shareNotice,
} from '../model.js';

const choice = (sceneId, choiceId) => SCENES[sceneId].choices.find((item) => item.id === choiceId);

test('Tabitha experience delivers its complete promised arc without group content', () => {
  const state = createState();
  applySceneChoice(state, 'tabitha_opening', choice('tabitha_opening', 'open_stay'));
  shareNotice(state);
  applySceneChoice(state, 'tabitha_private', choice('tabitha_private', 'private_no_score'));
  applySceneChoice(state, 'tabitha_callback', choice('tabitha_callback', 'callback_stay'));
  finishRun(state, { id: 'end_tabitha', text: 'Leave together.', tags: ['left_with_tabitha'] });

  const summary = routeValueSummary(state);
  assert.equal(summary.experiences.tabitha_companionship.status, 'complete');
  assert.deepEqual(summary.experiences.tabitha_companionship.missing, []);
  assert.equal(summary.tabitha.plan, 'building_walk');
  assert.equal(state.seenScenes.includes('radio_group'), false);
});

test('group experience can develop without requiring the private route', () => {
  const state = createState();
  state.player.zone = 'main';
  applySceneChoice(state, 'radio_group', choice('radio_group', 'group_joke'));
  stayWithGroup(state);
  assert.equal(state.flags.priyaSettled, true);
  assert.equal(state.characters.tabitha.mood, 'inside');
  assert.ok(getAvailableInteractions(state, 'main').includes('mixed_story'));

  applySceneChoice(state, 'mixed_story', choice('mixed_story', 'story_veto'));
  finishRun(state, { id: 'end_maya', text: 'Continue with Maya.', tags: ['joined_afterparty'] });

  const summary = routeValueSummary(state);
  assert.equal(summary.experiences.radio_group.status, 'complete');
  assert.deepEqual(summary.experiences.radio_group.missing, []);
  assert.equal(state.seenScenes.includes('tabitha_private'), false);
});

test('Priya-selective experience can produce a concrete plan without radio-group participation', () => {
  const state = createState();
  state.player.zone = 'main';
  observeRadio(state);
  observeRoom(state);
  assert.equal(state.flags.priyaSettled, true);
  applySceneChoice(state, 'priya_private', choice('priya_private', 'priya_chips'));
  finishRun(state, { id: 'end_priya', text: 'Get chips.', tags: ['went_chips_priya'] });

  const summary = routeValueSummary(state);
  assert.equal(summary.experiences.priya_companionship.status, 'complete');
  assert.deepEqual(summary.experiences.priya_companionship.missing, []);
  assert.equal(state.seenScenes.includes('radio_group'), false);
});

test('observer experience contains multiple observations and a contained payoff', () => {
  const state = createState();
  state.player.zone = 'main';
  observeRadio(state);
  observeRoom(state);
  observeCrosscurrents(state);
  assert.equal(state.flags.closureActive, true);
  observeClosure(state);
  finishRun(state, { id: 'end_solo', text: 'Head home.', tags: ['left_solo'] });

  const summary = routeValueSummary(state);
  assert.equal(summary.experiences.observer_evening.status, 'complete');
  assert.deepEqual(summary.experiences.observer_evening.missing, []);
  assert.equal(state.seenScenes.length, 0);
});

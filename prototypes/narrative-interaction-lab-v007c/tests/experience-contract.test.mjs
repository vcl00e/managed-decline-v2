import test from 'node:test';
import assert from 'node:assert/strict';
import { EXPERIENCES, SCENES } from '../scenario.js';
import {
  applySceneChoice,
  createState,
  finishRun,
  observeClosure,
  observeCrosscurrents,
  observeRadio,
  observeRoom,
  stayWithGroup,
  routeValueSummary,
  shareNotice,
  advanceBeat,
} from '../model.js';

const choice = (sceneId, choiceId) => SCENES[sceneId].choices.find((item) => item.id === choiceId);

test('every promoted experience has an explicit desire, promise and transition arc', () => {
  for (const experience of Object.values(EXPERIENCES)) {
    assert.ok(experience.playerDesire.length > 10);
    assert.ok(experience.promise.length >= 3);
    assert.ok(Object.keys(experience.transitions).length >= 3);
  }
});

test('Tabitha contract structurally includes entry, shared activity, private development, payoff and residue', () => {
  const state = createState();
  applySceneChoice(state, 'tabitha_opening', choice('tabitha_opening', 'open_notice'));
  shareNotice(state);
  applySceneChoice(state, 'tabitha_private', choice('tabitha_private', 'private_permission'));
  applySceneChoice(state, 'tabitha_callback', choice('tabitha_callback', 'callback_walk'));
  const coverage = routeValueSummary(state).experiences.tabitha_companionship;
  assert.deepEqual(coverage.missing, []);
  assert.ok(state.seenScenes.includes('tabitha_private'));
  assert.ok(state.flags.tabithaPlan);
  assert.ok(state.residue.some((item) => item.id === 'tabitha_notice_motif'));
});

test('observer contract is not implemented as a single time skip', () => {
  const state = createState();
  state.player.zone = 'main';
  observeRadio(state);
  observeRoom(state);
  observeCrosscurrents(state);
  observeClosure(state);
  finishRun(state, { id: 'end_solo', text: 'Head home.', tags: ['left_solo'] });
  const coverage = routeValueSummary(state).experiences.observer_evening;
  assert.equal(coverage.events.length, 5);
  assert.deepEqual(coverage.missing, []);
  assert.ok(state.visibleChanges.filter((item) => item.kind === 'observation').length >= 3);
});

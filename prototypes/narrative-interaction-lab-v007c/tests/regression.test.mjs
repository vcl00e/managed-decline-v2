import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { SCENES } from '../scenario.js';
import {
  advanceBeat,
  applySceneChoice,
  createState,
  getAvailableInteractions,
  observeRadio,
  shareNotice,
} from '../model.js';

const choice = (sceneId, choiceId) => SCENES[sceneId].choices.find((item) => item.id === choiceId);

test('ordinary UI contains no dashboard, action log or developer panel', () => {
  const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8').toLowerCase();
  for (const forbidden of ['side-card', 'room tone', 'debugstate', 'nearby possibilities']) {
    assert.equal(html.includes(forbidden), false);
  }
});

test('private intention develops instead of asking for repeated stay confirmation', () => {
  const state = createState();
  applySceneChoice(state, 'tabitha_opening', choice('tabitha_opening', 'open_stay'));
  assert.ok(getAvailableInteractions(state, 'forecourt').includes('noticeboard'));
  assert.equal(getAvailableInteractions(state, 'forecourt').includes('stay_again'), false);
  shareNotice(state);
  assert.ok(getAvailableInteractions(state, 'forecourt').includes('tabitha_private'));
});

test('unrelated arrivals do not invade the unfinished Tabitha experience', () => {
  const state = createState();
  applySceneChoice(state, 'tabitha_opening', choice('tabitha_opening', 'open_stay'));
  shareNotice(state);
  applySceneChoice(state, 'tabitha_private', choice('tabitha_private', 'private_no_reason'));
  assert.equal(state.flags.priyaArrived, false);
  assert.equal(state.flags.closureActive, false);
});

test('switching to group play preserves private context rather than resetting it', () => {
  const state = createState();
  applySceneChoice(state, 'tabitha_opening', choice('tabitha_opening', 'open_stay'));
  shareNotice(state);
  applySceneChoice(state, 'tabitha_private', choice('tabitha_private', 'private_permission'));
  applySceneChoice(state, 'tabitha_callback', choice('tabitha_callback', 'callback_inside'));
  state.player.zone = 'main';
  applySceneChoice(state, 'radio_group', choice('radio_group', 'group_tabitha'));

  assert.equal(state.flags.privateContextReincorporated, true);
  assert.equal(state.flags.privateMotif, 'notice ranking');
  assert.equal(state.experiences.histories.tabitha_companionship.status, 'suspended');
  assert.equal(state.experiences.activeId, 'radio_group');
});

test('observer play advances without entering focused group dialogue', () => {
  const state = createState();
  state.player.zone = 'main';
  observeRadio(state);
  assert.equal(state.seenScenes.includes('radio_group'), false);
  assert.equal(state.beat, 1);
});

test('quiet route cannot terminate after one short interaction', () => {
  const state = createState();
  applySceneChoice(state, 'tabitha_opening', choice('tabitha_opening', 'open_stay'));
  assert.equal(getAvailableInteractions(state, 'forecourt').includes('leave_tabitha'), false);
  advanceBeat(state, 7, 'attempted shortcut');
  assert.equal(getAvailableInteractions(state, 'forecourt').includes('leave_tabitha'), false);
});

test('route progress is carried by the shared experience lifecycle rather than route-specific completion flags', () => {
  const state = createState();
  for (const legacy of [
    'tabithaOpeningDone',
    'noticeShared',
    'tabithaPrivateDone',
    'tabithaCallbackDone',
    'radioGroupSceneDone',
    'priyaPrivateDone',
    'mixedStoryDone',
  ]) {
    assert.equal(Object.hasOwn(state.flags, legacy), false);
  }
  assert.ok(state.experiences.histories.tabitha_companionship);
  assert.ok(state.experiences.histories.radio_group);
  assert.ok(state.experiences.histories.priya_companionship);
  assert.ok(state.experiences.histories.observer_evening);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { EXPERIENCES } from '../scenario.js';
import {
  activateExperience,
  advanceExperience,
  canSurfaceUnrelated,
  createExperienceState,
  experienceCoverage,
  getExperience,
} from '../experience.js';

function makeState() {
  return { experiences: createExperienceState(EXPERIENCES) };
}

test('active experience progresses through a declared arc', () => {
  const state = makeState();
  advanceExperience(state, EXPERIENCES, 'tabitha_companionship', 'opening_complete');
  assert.equal(getExperience(state, 'tabitha_companionship').stage, 'development');
  advanceExperience(state, EXPERIENCES, 'tabitha_companionship', 'notice_shared');
  assert.equal(getExperience(state, 'tabitha_companionship').stage, 'participation');
  advanceExperience(state, EXPERIENCES, 'tabitha_companionship', 'private_complete');
  assert.equal(getExperience(state, 'tabitha_companionship').stage, 'payoff');
});

test('changing social focus suspends rather than erases prior experience', () => {
  const state = makeState();
  advanceExperience(state, EXPERIENCES, 'tabitha_companionship', 'opening_complete');
  activateExperience(state, EXPERIENCES, 'radio_group', 'player entered hall');
  assert.equal(getExperience(state, 'tabitha_companionship').status, 'suspended');
  assert.equal(getExperience(state, 'tabitha_companionship').stage, 'development');
  assert.equal(state.experiences.activeId, 'radio_group');
});

test('low interruption tolerance protects an unfinished private experience', () => {
  const state = makeState();
  advanceExperience(state, EXPERIENCES, 'tabitha_companionship', 'opening_complete');
  assert.equal(canSurfaceUnrelated(state, EXPERIENCES), false);
  advanceExperience(state, EXPERIENCES, 'tabitha_companionship', 'notice_shared');
  advanceExperience(state, EXPERIENCES, 'tabitha_companionship', 'private_complete');
  assert.equal(canSurfaceUnrelated(state, EXPERIENCES), false);
  advanceExperience(state, EXPERIENCES, 'tabitha_companionship', 'callback_complete');
  assert.equal(canSurfaceUnrelated(state, EXPERIENCES), true);
});

test('experience coverage distinguishes promised and fulfilled value', () => {
  const state = makeState();
  advanceExperience(state, EXPERIENCES, 'observer_evening', 'radio_observed');
  const coverage = experienceCoverage(state, EXPERIENCES, 'observer_evening');
  assert.ok(coverage.fulfilled.includes('npc_to_npc_observation'));
  assert.ok(coverage.missing.includes('social_rhythm'));
  assert.ok(coverage.missing.includes('contained_payoff'));
});

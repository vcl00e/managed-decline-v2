import test from 'node:test';
import assert from 'node:assert/strict';
import { createState, learn, knowsFrom, chooseTarget, openBedroom, applyChoice } from '../model.js';

test('knowledge preserves provenance rather than flattening fact possession', () => {
  const state = createState();
  learn(state, 'damp_report_exists', 'tabitha');
  assert.equal(knowsFrom(state, 'damp_report_exists', 'tabitha'), true);
  assert.equal(knowsFrom(state, 'damp_report_exists', 'agent_email'), false);
});

test('targeting strongly prefers what the player is facing', () => {
  const player = { x: 100, y: 100, facing: { x: 1, y: 0 } };
  const entities = [
    { id: 'front', x: 155, y: 100, range: 100 },
    { id: 'behind', x: 60, y: 100, range: 100 },
  ];
  assert.equal(chooseTarget(player, entities)?.id, 'front');
});

test('target hysteresis stabilises close candidates', () => {
  const player = { x: 100, y: 100, facing: { x: 0, y: -1 } };
  const entities = [
    { id: 'a', x: 95, y: 50, range: 100 },
    { id: 'b', x: 105, y: 49, range: 100 },
  ];
  assert.equal(chooseTarget(player, entities, 'a')?.id, 'a');
});

test('opening the bedroom before the authored threshold is recorded as early', () => {
  const state = createState();
  state.worldTime = 76;
  openBedroom(state, 'player');
  assert.equal(state.flags.bedroomOpenedByPlayer, true);
  assert.equal(state.flags.bedroomOpenedEarly, true);
});

test('a promise can later be broken by disclosure', () => {
  const state = createState();
  applyChoice(state, 'tabitha_quiet');
  applyChoice(state, 'viewing_tell_plainly');
  assert.equal(state.flags.playerPromisedQuiet, true);
  assert.equal(state.flags.dampDisclosed, true);
  assert.equal(state.commitments.find((c) => c.id === 'keep-it-quiet')?.status, 'broken-for-disclosure');
});

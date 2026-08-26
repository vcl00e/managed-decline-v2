import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createState,
  applyChoice,
  chooseTarget,
  chooseViewingPosition,
  resolveAmbientViewing,
  getCommitment,
  getOutcomeSummary,
} from '../model.js';

test('pre-existing station walk is tracked as an open commitment', () => {
  const state = createState();
  assert.equal(getCommitment(state, 'walk-to-station')?.status, 'open');
});

test('leaving with Tabitha keeps the station commitment', () => {
  const state = createState();
  applyChoice(state, 'departure_go');
  assert.equal(getCommitment(state, 'walk-to-station')?.status, 'kept');
  assert.equal(state.flags.playerLeavesWithTabitha, true);
});

test('staying at the flat visibly breaks the station commitment', () => {
  const state = createState();
  applyChoice(state, 'departure_stay');
  assert.equal(getCommitment(state, 'walk-to-station')?.status, 'broken-to-stay-at-flat');
  assert.match(getOutcomeSummary(state).join('\n'), /stayed at the flat/i);
});

test('letting Alex frame the damp keeps a qualified quiet promise', () => {
  const state = createState();
  applyChoice(state, 'tabitha_quiet');
  applyChoice(state, 'viewing_let_alex_frame');
  assert.equal(getCommitment(state, 'keep-it-quiet')?.status, 'kept');
  assert.doesNotMatch(getOutcomeSummary(state).join('\n'), /broken by the way/i);
});

test('declining authority still allows Alex to warn Priya', () => {
  const state = createState();
  applyChoice(state, 'viewing_not_my_call');
  assert.equal(state.flags.priyaFeelsWarned, true);
  assert.equal(state.flags.dampSourceDisclosed, 'alex');
});

test('ambient non-intervention resolves the practical disclosure without inventing player speech', () => {
  const state = createState();
  resolveAmbientViewing(state, 'listen');
  assert.equal(state.flags.viewingResolvedAmbient, true);
  assert.equal(state.flags.dampSourceDisclosed, 'alex');
  assert.equal(state.flags.listenedAtDoorway, true);
});

test('viewing position is recorded once and can be inferred separately', () => {
  const state = createState();
  chooseViewingPosition(state, 'tabitha');
  chooseViewingPosition(state, 'join', true);
  assert.equal(state.flags.viewingPosition, 'tabitha');
  assert.equal(state.flags.viewingPositionInferred, false);
});

test('targeting favours facing and target stability', () => {
  const player = { x: 0, y: 0, facing: { x: 1, y: 0 } };
  const entities = [
    { id: 'front', x: 60, y: 0, range: 100 },
    { id: 'side', x: 40, y: 45, range: 100 },
  ];
  assert.equal(chooseTarget(player, entities)?.id, 'front');
  assert.equal(chooseTarget(player, entities, 'side')?.id, 'side');
});

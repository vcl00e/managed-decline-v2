import test from 'node:test';
import assert from 'node:assert/strict';
import { createInitialState, applyChoice, triggerPriyaArrival, finalizeInterpretations, recordConduct } from '../model.js';

test('v007 begins as open life rather than a crisis', () => {
  const state = createInitialState();
  assert.equal(state.phase, 'arrival');
  assert.equal(state.flags.priyaArrived, false);
  assert.deepEqual(state.residue, []);
});

test('Priya arrives causally rather than on a fixed timer', () => {
  const state = createInitialState();
  assert.equal(triggerPriyaArrival(state), true);
  assert.equal(triggerPriyaArrival(state), false);
  assert.equal(state.characters.priya.visible, true);
  assert.equal(state.phase, 'priya_arrival');
});

test('conduct preserves audience and privacy', () => {
  const state = createInitialState();
  recordConduct(state, { id:'tell_story', targets:['tabitha'], audience:['tabitha','maya','alex','priya'], tags:['told_group_story'] });
  assert.equal(state.conduct[0].privacy, 'public');
  assert.equal(state.conduct[0].audience.length, 4);
});

test('Tabitha interprets respecting her public line across the pattern', () => {
  const state = createInitialState();
  recordConduct(state, { id:'veto', targets:['tabitha'], audience:['tabitha','maya','alex','priya'], tags:['backed_tabitha_publicly'] });
  recordConduct(state, { id:'follow', targets:['tabitha'], audience:['tabitha'], tags:['noticed_tabitha'] });
  finalizeInterpretations(state, 'leave_tabitha');
  assert.equal(state.interpretations.tabitha.read, 'drifts_but_comes_back');
  assert.ok(state.interpretations.tabitha.evidence.includes('backed_tabitha_publicly'));
  assert.ok(state.interpretations.tabitha.evidence.includes('noticed_tabitha'));
  assert.ok(state.interpretations.tabitha.evidence.includes('left_with_tabitha'));
});

test('same evening can produce different social residue without success/failure', () => {
  const a = createInitialState();
  recordConduct(a, { id:'intro', tags:['introduced_priya','social_bridge'] });
  finalizeInterpretations(a, 'afterparty_maya');
  const b = createInitialState();
  recordConduct(b, { id:'quiet', tags:['chose_quiet_time_tabitha'] });
  finalizeInterpretations(b, 'leave_tabitha');
  assert.notDeepEqual(a.residue.map(r=>r.id), b.residue.map(r=>r.id));
  assert.ok(a.residue.some(r=>r.id==='radio_invite'));
  assert.ok(b.residue.some(r=>r.id==='tabitha_photo'));
});

test('choice tags accumulate as evidence rather than a relationship score', () => {
  const state = createInitialState();
  applyChoice(state, 'arrival_tabitha', { id:'arrival_warm', tags:['warm_to_tabitha'] });
  assert.equal(state.tags.warm_to_tabitha, 1);
  assert.equal('trust' in state, false);
  assert.equal('relationshipScore' in state, false);
});

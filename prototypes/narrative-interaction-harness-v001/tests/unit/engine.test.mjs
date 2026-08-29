import test from 'node:test';
import assert from 'node:assert/strict';
import { createRuntime } from '../../src/engine.js';
import { WORLD } from '../../src/scenario.js';

function moveNear(runtime, point) {
  runtime.state.player.x = point.x;
  runtime.state.player.y = point.y;
}

test('a consumed contextual action disappears and cannot advance time twice', () => {
  const runtime = createRuntime('unit-consumed');
  moveNear(runtime, WORLD.panel);
  assert.equal(runtime.prompt()?.id, 'help_hold');

  const first = runtime.performAction('help_hold');
  assert.equal(first.accepted, true);
  assert.equal(runtime.prompt()?.id, 'read_label');
  assert.equal(runtime.state.fictionalMinutes, 3);

  const second = runtime.performAction('help_hold');
  assert.equal(second.accepted, false);
  assert.equal(second.reason, 'stale_or_unavailable');
  assert.equal(runtime.state.fictionalMinutes, 3);
  assert.equal(runtime.state.actionUses.help_hold, 1);
});

test('the fixture completes through map, focused interaction, and map consequence', () => {
  const runtime = createRuntime('unit-route');
  moveNear(runtime, WORLD.panel);
  runtime.performAction('help_hold');
  runtime.performAction('read_label');
  assert.equal(runtime.state.mode, 'vn');

  runtime.chooseVN('try_handle');
  assert.equal(runtime.state.mode, 'world');
  assert.equal(runtime.state.stage, 'follow_ari');

  moveNear(runtime, WORLD.door);
  runtime.performAction('follow_ari');
  assert.equal(runtime.state.ended, true);
  assert.equal(runtime.state.ending, 'door_reached');
});

test('cancelling focused interaction returns to a resumable live situation', () => {
  const runtime = createRuntime('unit-cancel');
  moveNear(runtime, WORLD.panel);
  runtime.performAction('help_hold');
  runtime.performAction('read_label');
  const cancelled = runtime.cancelVN();
  assert.equal(cancelled.cancelled, true);
  assert.equal(runtime.state.mode, 'world');
  assert.equal(runtime.prompt()?.id, 'resume_exchange');

  runtime.performAction('resume_exchange');
  assert.equal(runtime.state.mode, 'vn');
  assert.equal(runtime.state.currentVN, 'ari_question');
});

test('time cannot complete or progress the interaction by itself', () => {
  const runtime = createRuntime('unit-no-time');
  runtime.tickNpc(120);
  assert.equal(runtime.state.stage, 'approach_panel');
  assert.equal(runtime.state.ended, false);
  assert.equal(runtime.state.fictionalMinutes, 0);
});

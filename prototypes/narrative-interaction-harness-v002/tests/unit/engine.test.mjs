import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createRuntime } from '../../src/engine.js';
import { panelScenario } from '../../scenarios/panel.js';
import { parcelScenario } from '../../scenarios/parcel.js';

function place(runtime, point) {
  runtime.state.player.x = point.x;
  runtime.state.player.y = point.y;
}

test('a consumed contextual action disappears and cannot advance time twice', () => {
  const runtime = createRuntime(panelScenario, 'consumption');
  place(runtime, panelScenario.world.panel);
  assert.equal(runtime.prompt().id, 'help_hold');
  assert.equal(runtime.performAction('help_hold').accepted, true);
  assert.equal(runtime.prompt().id, 'read_label');
  const time = runtime.state.fictionalMinutes;
  const rejected = runtime.performAction('help_hold');
  assert.equal(rejected.accepted, false);
  assert.equal(runtime.state.fictionalMinutes, time);
  assert.equal(runtime.state.actionUses.help_hold, 1);
});

test('panel scenario completes map to VN to map', () => {
  const runtime = createRuntime(panelScenario, 'panel-complete');
  place(runtime, panelScenario.world.panel);
  runtime.performAction('help_hold');
  runtime.performAction('read_label');
  runtime.chooseVN('try_handle');
  place(runtime, panelScenario.world.door);
  runtime.performAction('follow_ari');
  assert.equal(runtime.state.ended, true);
  assert.equal(runtime.state.ending, 'door_reached');
});

test('parcel scenario completes through the same engine', () => {
  const runtime = createRuntime(parcelScenario, 'parcel-complete');
  place(runtime, parcelScenario.world.parcel);
  runtime.performAction('lift_parcel');
  runtime.performAction('read_address');
  runtime.chooseVN('take_upstairs');
  place(runtime, parcelScenario.world.lift);
  runtime.performAction('reach_lift');
  assert.equal(runtime.state.ended, true);
  assert.equal(runtime.state.ending, 'lift_reached');
});

test('cancel and resume use scenario state without replacing the runtime', () => {
  const runtime = createRuntime(panelScenario, 'cancel');
  place(runtime, panelScenario.world.panel);
  runtime.performAction('help_hold');
  runtime.performAction('read_label');
  assert.equal(runtime.cancelVN().cancelled, true);
  assert.equal(runtime.prompt().id, 'resume_exchange');
  runtime.performAction('resume_exchange');
  assert.equal(runtime.state.currentVN, 'ari_question');
  assert.equal(runtime.state.mode, 'vn');
});

test('fictional time cannot progress through an unavailable action', () => {
  const runtime = createRuntime(panelScenario, 'time');
  const before = runtime.state.fictionalMinutes;
  assert.equal(runtime.performAction('read_label').accepted, false);
  assert.equal(runtime.state.fictionalMinutes, before);
});

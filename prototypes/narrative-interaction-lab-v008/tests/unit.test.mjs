import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { createRuntime } from '../../narrative-interaction-harness-v002/src/engine.js';
import { auditTracePayload } from '../../narrative-interaction-harness-v002/src/trace-audit.js';
import { v008Scenario, WORLD } from '../scenario.js';

function place(runtime, point) {
  runtime.state.player.x = point.x;
  runtime.state.player.y = point.y;
}

function reachPlacement({ first = 'move_fiction', outtake = 'nearly_laughed', note = 'note_biscuits' } = {}) {
  const runtime = createRuntime(v008Scenario, `placement-${first}-${outtake}-${note}`);
  place(runtime, WORLD.kiosk);
  runtime.performAction('join_kiosk');
  runtime.chooseVN(first);
  runtime.chooseVN(outtake);
  place(runtime, WORLD.printer);
  runtime.performAction('take_printout');
  runtime.chooseVN(note);
  return runtime;
}

test('v008 runs entirely through the shared harness contract', () => {
  const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const app = fs.readFileSync(path.join(sourceRoot, 'app.js'), 'utf8');
  assert.match(app, /narrative-interaction-harness-v002\/src\/create-app\.js/);
  assert.equal(fs.existsSync(path.join(sourceRoot, 'engine.js')), false);
  assert.equal(fs.existsSync(path.join(sourceRoot, 'vn.js')), false);
});

test('intended route produces authored physical residue and a healthy trace', () => {
  const runtime = reachPlacement();
  place(runtime, WORLD.noticeboard);
  runtime.performAction('pin_sheet');
  assert.equal(runtime.state.ended, true);
  assert.equal(runtime.state.ending, 'noticeboard');
  assert.equal(runtime.state.facts.sheetText, 'BUY BISCUITS BEFORE HOUR SIX');
  assert.equal(auditTracePayload(runtime.snapshot(), v008Scenario.auditOptions).passed, true);
});

test('different early conduct changes a later destination callback', () => {
  const staff = reachPlacement({ first: 'tell_staff' });
  place(staff, WORLD.noticeboard);
  const staffResult = staff.performAction('pin_sheet');

  const ordinary = reachPlacement({ first: 'ask_reading' });
  place(ordinary, WORLD.noticeboard);
  const ordinaryResult = ordinary.performAction('pin_sheet');

  assert.match(staffResult.output, /safeguarding lead/i);
  assert.doesNotMatch(ordinaryResult.output, /safeguarding lead/i);
});

test('outtake conduct changes the give-to-Tabitha callback', () => {
  const replay = reachPlacement({ outtake: 'replay' });
  replay.state.actors.tabitha.x = replay.state.actors.tabitha.target.x;
  replay.state.actors.tabitha.y = replay.state.actors.tabitha.target.y;
  place(replay, replay.state.actors.tabitha);
  assert.match(replay.performAction('give_sheet').output, /replayed/i);
});

test('the player can leave without entering the old build', () => {
  const runtime = createRuntime(v008Scenario, 'early-leave');
  place(runtime, WORLD.exit);
  runtime.performAction('leave_early');
  assert.equal(runtime.state.ending, 'left_early');
  assert.equal(runtime.state.facts.kioskJoined, false);
});

test('a consumed kiosk action cannot replay or advance time twice', () => {
  const runtime = createRuntime(v008Scenario, 'repeat');
  place(runtime, WORLD.kiosk);
  runtime.performAction('join_kiosk');
  const before = runtime.state.fictionalMinutes;
  assert.equal(runtime.performAction('join_kiosk').accepted, false);
  assert.equal(runtime.state.fictionalMinutes, before);
  assert.equal(runtime.state.actionUses.join_kiosk, 1);
});

test('cancelled dialogue exposes the correct resumable live-space action', () => {
  const runtime = createRuntime(v008Scenario, 'cancel');
  place(runtime, WORLD.kiosk);
  runtime.performAction('join_kiosk');
  runtime.cancelVN();
  assert.equal(runtime.state.stage, 'kiosk_paused');
  assert.equal(runtime.prompt().id, 'resume_kiosk');
  runtime.performAction('resume_kiosk');
  assert.equal(runtime.state.currentVN, 'question');
});

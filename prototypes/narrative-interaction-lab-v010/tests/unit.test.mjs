import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRuntime } from '../../narrative-interaction-harness-v002/src/engine.js';
import { validateScenario } from '../../narrative-interaction-harness-v002/src/scenario-contract.js';
import { v010Scenario, WORLD } from '../scenario.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function tick(runtime, seconds = 0.016) {
  runtime.tickActors(seconds);
  return runtime.state;
}

function move(runtime, dx, dy, seconds = 0.016) {
  runtime.movePlayer(dx, dy);
  return tick(runtime, seconds);
}

function commitHigh(runtime) {
  move(runtime, 170, -150);
  move(runtime, 110, 0);
  assert.equal(runtime.state.facts.route, 'high_street');
}

function commitLow(runtime) {
  move(runtime, 300, 45);
  assert.equal(runtime.state.facts.route, 'cut_through');
}

test('v010 satisfies the stable scenario contract', () => {
  assert.equal(validateScenario(v010Scenario), v010Scenario);
});

test('high-street route is selected by player movement and Tabitha follows the player, not a landmark', () => {
  const runtime = createRuntime(v010Scenario, 'high-route');
  commitHigh(runtime);
  assert.equal(runtime.state.stage, 'walking_high_street');
  assert.deepEqual(runtime.state.actors.tabitha.target, runtime.state.player);
  assert.notDeepEqual(runtime.state.actors.tabitha.target, WORLD.highStreet);
  assert.notDeepEqual(runtime.state.actors.tabitha.target, WORLD.shop);
  assert.notDeepEqual(runtime.state.actors.tabitha.target, WORLD.stationEntrance);
});

test('quiet route is selected by player movement and changes the social framing', () => {
  const runtime = createRuntime(v010Scenario, 'quiet-route');
  commitLow(runtime);
  assert.equal(runtime.state.stage, 'walking_cut_through');
  assert.match(v010Scenario.situationText(runtime.state), /quieter cut-through|more room to hear/i);
  assert.deepEqual(runtime.state.actors.tabitha.target, runtime.state.player);
});

test('high-street movement exposes a shop stop that produces a shared route-specific activity', () => {
  const runtime = createRuntime(v010Scenario, 'shop-stop');
  commitHigh(runtime);
  move(runtime, 100, 0);
  assert.equal(runtime.state.facts.suggestionIssued, true);
  move(runtime, 75, -98);
  assert.equal(runtime.prompt()?.id, 'shop_stop');
  const entered = runtime.performAction('shop_stop');
  assert.equal(entered.accepted, true);
  assert.equal(runtime.state.currentVN, 'shop');
  runtime.chooseVN('salt');
  assert.equal(runtime.state.facts.stop, 'shop_salt');
  assert.equal(runtime.state.mode, 'world');
  assert.match(runtime.state.memory.currentFeedback, /salt-and-vinegar/i);
});

test('cut-through movement exposes a park stop with different social affordance', () => {
  const runtime = createRuntime(v010Scenario, 'park-stop');
  commitLow(runtime);
  move(runtime, 80, 0);
  assert.equal(runtime.state.facts.suggestionIssued, true);
  move(runtime, 85, 89);
  assert.equal(runtime.prompt()?.id, 'park_stop');
  runtime.performAction('park_stop');
  runtime.chooseVN('quiet');
  assert.equal(runtime.state.facts.stop, 'park_quiet');
  assert.match(runtime.state.memory.currentFeedback, /sit quietly/i);
});

test('a suggestion can be declined simply by continuing to walk', () => {
  const runtime = createRuntime(v010Scenario, 'decline-by-walking');
  commitHigh(runtime);
  move(runtime, 350, 0);
  assert.equal(runtime.state.facts.suggestionIssued, true);
  assert.equal(runtime.state.facts.suggestionPassed, true);
  assert.equal(runtime.state.facts.stop, null);
  assert.match(runtime.state.memory.currentFeedback, /shop falls behind/i);
  assert.equal(runtime.prompts().some((prompt) => prompt.id === 'shop_stop'), false);
});

test('cancelled optional stop can be resumed or abandoned spatially', () => {
  const runtime = createRuntime(v010Scenario, 'resume-stop');
  commitHigh(runtime);
  move(runtime, 100, 0);
  move(runtime, 75, -98);
  runtime.performAction('shop_stop');
  runtime.cancelVN();
  assert.equal(runtime.state.stage, 'stop_paused');
  assert.equal(runtime.state.memory.pausedVN, 'shop');
  assert.equal(runtime.prompt()?.id, 'resume_stop');
  runtime.performAction('resume_stop');
  assert.equal(runtime.state.currentVN, 'shop');
  runtime.cancelVN();
  move(runtime, 170, 100);
  assert.equal(runtime.state.memory.pausedVN, null);
  assert.match(runtime.state.memory.currentFeedback, /keep walking together/i);
});

test('independent Tabitha waypoint appears only after explicit separation', () => {
  const runtime = createRuntime(v010Scenario, 'separation');
  commitLow(runtime);
  move(runtime, 500, 52);
  runtime.state.player.x = WORLD.forecourtEdge.x;
  runtime.state.player.y = WORLD.forecourtEdge.y;
  tick(runtime);
  const before = { ...runtime.state.actors.tabitha.target };
  assert.notDeepEqual(before, WORLD.stationEntrance);
  const result = runtime.performAction('peel_off');
  assert.equal(result.accepted, true);
  assert.equal(runtime.state.facts.accompanying, false);
  assert.deepEqual(runtime.state.actors.tabitha.target, WORLD.stationEntrance);
  tick(runtime, 1);
  assert.equal(runtime.prompt()?.id, 'leave_forecourt');
  runtime.performAction('leave_forecourt');
  assert.equal(runtime.state.ending, 'separated_forecourt');
});

test('route families change more than cosmetic copy', () => {
  const high = createRuntime(v010Scenario, 'high-difference');
  const low = createRuntime(v010Scenario, 'low-difference');
  commitHigh(high);
  commitLow(low);
  move(high, 100, 0);
  move(low, 80, 0);
  assert.equal(high.state.facts.route, 'high_street');
  assert.equal(low.state.facts.route, 'cut_through');
  assert.match(v010Scenario.situationText(high.state), /corner shop/i);
  assert.match(v010Scenario.situationText(low.state), /pocket park/i);
  high.state.player.x = WORLD.shop.x;
  high.state.player.y = WORLD.shop.y;
  low.state.player.x = WORLD.park.x;
  low.state.player.y = WORLD.park.y;
  tick(high);
  tick(low);
  assert.equal(high.prompt()?.id, 'shop_stop');
  assert.equal(low.prompt()?.id, 'park_stop');
});

test('v010 cannot silently override the recovered shell dimensions or focused text scale', () => {
  const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
  for (const selector of ['.shell', '.stage', '.vn-card', '#vn-text', '.situation', '.feedback', '.interaction-prompt']) {
    assert.equal(css.includes(selector), false, `local CSS must not override ${selector}`);
  }
});

test('focused dialogue stays short and avoids design or relationship vocabulary', () => {
  const forbidden = /relationship|affinity|progression|resilience|facilitator|approved social|public symbol|real you/i;
  for (const node of Object.values(v010Scenario.vnGraph)) {
    for (const turn of node.turns) {
      const text = typeof turn.text === 'string' ? turn.text : '';
      assert.doesNotMatch(text, forbidden);
      assert.ok(text.split(/\s+/).filter(Boolean).length <= 12, `${node.id} turn too long: ${text}`);
    }
    for (const choice of node.choices) {
      assert.doesNotMatch(choice.label, forbidden);
      assert.ok(choice.label.split(/\s+/).filter(Boolean).length <= 8, `${node.id}:${choice.id} label too long`);
    }
  }
});

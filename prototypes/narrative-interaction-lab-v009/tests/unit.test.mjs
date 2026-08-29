import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRuntime } from '../../narrative-interaction-harness-v002/src/engine.js';
import { validateScenario } from '../../narrative-interaction-harness-v002/src/scenario-contract.js';
import { v009Scenario } from '../scenario.js';

const source = fs.readFileSync(new URL('../scenario.js', import.meta.url), 'utf8');
const localStyles = fs.readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
const html = fs.readFileSync(new URL('../index.html', import.meta.url), 'utf8');

function start(runtime) {
  assert.equal(runtime.prompt().id, 'start_camera');
  assert.equal(runtime.performAction('start_camera').accepted, true);
  assert.equal(runtime.state.currentVN, 'opening');
}

test('v009 satisfies the stable scenario contract', () => {
  assert.equal(validateScenario(v009Scenario), v009Scenario);
});

test('Tabitha-first route becomes reciprocal without any Tabitha waypoint movement', () => {
  const runtime = createRuntime(v009Scenario, 'tabitha-first');
  const target = structuredClone(runtime.state.actors.tabitha.target);
  start(runtime);

  runtime.chooseVN('official');
  assert.equal(runtime.state.stage, 'first_print');
  assert.match(runtime.state.facts.playerPhoto, /electable/);
  assert.deepEqual(runtime.state.actors.tabitha.target, target);

  assert.equal(runtime.prompt().id, 'use_last_shot');
  runtime.performAction('use_last_shot');
  assert.equal(runtime.state.currentVN, 'direct_tabitha_second');
  runtime.chooseVN('exit_sign');

  assert.equal(runtime.state.stage, 'two_prints');
  assert.equal(runtime.state.facts.playerDirectedTabitha, true);
  assert.match(runtime.state.facts.tabithaPhoto, /EXIT sign/);
  assert.deepEqual(runtime.state.actors.tabitha.target, target);

  assert.equal(runtime.prompt().id, 'trade_prints');
  runtime.performAction('trade_prints');
  assert.equal(runtime.state.ended, true);
  assert.equal(runtime.state.facts.ownership, 'trade');
  assert.deepEqual(runtime.state.actors.tabitha.target, target);
});

test('player can reverse Tabitha’s proposed order and she follows that direction', () => {
  const runtime = createRuntime(v009Scenario, 'player-first');
  start(runtime);

  const redirect = runtime.chooseVN('you_first');
  assert.equal(redirect.nextNode, 'direct_tabitha_first');
  assert.equal(runtime.state.facts.order, 'player_first');
  assert.equal(runtime.state.currentVN, 'direct_tabitha_first');

  runtime.chooseVN('candid');
  assert.equal(runtime.state.facts.firstSubject, 'tabitha');
  assert.equal(runtime.state.facts.playerDirectedTabitha, true);
  assert.match(runtime.state.facts.tabithaPhoto, /objecting/);

  runtime.performAction('use_last_shot');
  assert.equal(runtime.state.currentVN, 'photograph_player_second');
  runtime.chooseVN('face');
  assert.match(runtime.state.facts.playerPhoto, /ruining the photo/);
  assert.equal(runtime.state.stage, 'two_prints');
});

test('player can stop after one picture without being forced through the second', () => {
  const runtime = createRuntime(v009Scenario, 'one-shot');
  start(runtime);
  runtime.chooseVN('still');
  const prompts = runtime.prompts().map((item) => item.id);
  assert.deepEqual(prompts.slice(0, 2), ['use_last_shot', 'stop_after_one']);
  runtime.performAction('stop_after_one');
  assert.equal(runtime.state.ending, 'one_print');
  assert.equal(runtime.state.facts.shotsRemaining, 1);
});

test('v009 cannot silently change the recovered player-facing shell', () => {
  assert.match(html, /narrative-interaction-harness-v003\/styles\.css/);
  assert.match(html, /class="vn-card"/);
  assert.doesNotMatch(localStyles, /\.shell\s*\{/);
  assert.doesNotMatch(localStyles, /\.stage\s*\{/);
  assert.doesNotMatch(localStyles, /\.vn-card\s*\{/);
  assert.doesNotMatch(localStyles, /#vn-text\s*\{/);
});

test('first-pass dialogue stays short and avoids v008 institutional decoding load', () => {
  const turns = Object.values(v009Scenario.vnGraph).flatMap((node) => node.turns);
  assert.ok(Object.values(v009Scenario.vnGraph).every((node) => node.turns.length <= 2));
  for (const turn of turns) {
    const text = typeof turn.text === 'string' ? turn.text : '';
    assert.ok(text.length <= 100, `long pre-choice line: ${text}`);
  }
  for (const banned of ['facilitator', 'resilience plan', 'trusted peer', 'susceptible', 'participant voice']) {
    assert.doesNotMatch(source, new RegExp(banned, 'i'));
  }
  for (const slogan of ['real you', 'interested in you', 'understand you', 'relationship progressed']) {
    assert.doesNotMatch(source, new RegExp(slogan, 'i'));
  }
});

test('shared activity is camera handoff, not NPC waypoint progression', () => {
  assert.doesNotMatch(source, /actors\.tabitha\.target\s*=/);
  assert.doesNotMatch(source, /moveTabitha|tabithaTarget\s*=/);
  assert.match(source, /camera changes hands/i);
  assert.match(source, /playerDirectedTabitha/);
});

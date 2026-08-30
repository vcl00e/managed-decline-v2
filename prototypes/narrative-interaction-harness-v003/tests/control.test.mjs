import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createRuntime } from '../../narrative-interaction-harness-v002/src/engine.js';
import { validateScenario } from '../../narrative-interaction-harness-v002/src/scenario-contract.js';
import { controlScenario } from '../scenarios/control-v003.js';

const styles = fs.readFileSync(new URL('../styles.css', import.meta.url), 'utf8');
const appSource = fs.readFileSync(new URL('../src/create-app.js', import.meta.url), 'utf8');

test('control scenario satisfies the reliable v002 scenario contract', () => {
  assert.equal(validateScenario(controlScenario), controlScenario);
});

test('known-good control returns from focused VN to the same shared space', () => {
  const runtime = createRuntime(controlScenario, 'golden-control');
  const tabithaStart = structuredClone(runtime.state.actors.tabitha.target);

  assert.equal(runtime.prompt().id, 'join_tabitha');
  assert.equal(runtime.performAction('join_tabitha').accepted, true);
  assert.equal(runtime.state.currentVN, 'hook');

  runtime.chooseVN('option_d');
  assert.equal(runtime.state.currentVN, 'why_here');
  runtime.chooseVN('secret');
  assert.equal(runtime.state.currentVN, 'warning_signs');
  runtime.chooseVN('laugh');

  assert.equal(runtime.state.mode, 'world');
  assert.equal(runtime.state.stage, 'control_residue');
  assert.deepEqual(runtime.state.actors.tabitha.target, tabithaStart, 'Tabitha must not become a waypoint');
  assert.equal(runtime.prompt().id, 'finish_control');
  runtime.performAction('finish_control');
  assert.equal(runtime.state.ended, true);
});

test('player-facing baseline restores v006b-scale presentation', () => {
  assert.match(styles, /\.shell\s*\{[^}]*width:\s*min\(1120px,\s*100%\)/s);
  assert.match(styles, /\.stage\s*\{[^}]*height:\s*min\(72vh,\s*650px\)[^}]*min-height:\s*520px/s);
  assert.match(styles, /\.vn-card\s*\{[^}]*width:\s*min\(1000px,\s*94vw\)[^}]*min-height:\s*560px/s);
  assert.match(styles, /#vn-text\s*\{[^}]*27px\/1\.43 Georgia/s);
});

test('important player-facing text is persistent rather than timer-driven', () => {
  assert.doesNotMatch(appSource, /setTimeout\s*\(/);
  assert.match(appSource, /feedback\.textContent\s*=\s*last\?\.detail/);
  assert.match(appSource, /situation\.textContent\s*=\s*situationText\(\)/);
});

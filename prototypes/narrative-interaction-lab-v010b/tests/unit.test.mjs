import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateScenario } from '../../narrative-interaction-harness-v002/src/scenario-contract.js';
import { v010bScenario } from '../scenario.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

function tickAt(state, x, y, previousX = x - 8, previousY = y) {
  state.player.x = x;
  state.player.y = y;
  state.memory.lastPlayer = { x: previousX, y: previousY };
  v010bScenario.tick(state, 0.05);
}

test('v010b satisfies the stable scenario contract', () => {
  assert.equal(validateScenario(v010bScenario), v010bScenario);
});

test('wide-path accompaniment targets a lateral formation slot rather than the player position', () => {
  const state = v010bScenario.createState('formation-wide');
  state.facts.route = 'high_street';
  state.stage = 'walking_high_street';
  tickAt(state, 450, 185, 440, 185);

  assert.equal(state.memory.formationMode, 'side_by_side');
  const target = state.actors.tabitha.target;
  assert.ok(Math.abs(target.x - state.player.x) < 12, JSON.stringify(target));
  assert.ok(Math.abs(target.y - state.player.y) >= 30, JSON.stringify(target));
});

test('narrow environmental section compresses to single file then returns to side-by-side', () => {
  const state = v010bScenario.createState('formation-narrow');
  state.facts.route = 'high_street';
  state.stage = 'walking_high_street';

  tickAt(state, 390, 185, 380, 185);
  assert.equal(state.memory.formationMode, 'single_file');
  assert.ok(state.actors.tabitha.target.x < state.player.x - 25);
  assert.ok(Math.abs(state.actors.tabitha.target.y - state.player.y) < 18);

  tickAt(state, 440, 185, 430, 185);
  assert.equal(state.memory.formationMode, 'side_by_side');
  assert.ok(Math.abs(state.actors.tabitha.target.y - state.player.y) >= 30);
});

test('ignored stop suggestion produces a once-only observable acknowledgement', () => {
  const state = v010bScenario.createState('ignored-stop');
  state.facts.route = 'high_street';
  state.stage = 'walking_high_street';
  state.facts.suggestionIssued = true;

  tickAt(state, 710, 185, 702, 185);
  assert.equal(state.facts.suggestionPassed, true);
  assert.equal(state.facts.ignoredSuggestionAcknowledged, true);
  assert.match(state.memory.currentFeedback, /No crisps\. Severe administration/);
  const count = state.trace.filter((event) => event.event === 'ignored_suggestion_acknowledged').length;

  tickAt(state, 720, 185, 712, 185);
  assert.equal(state.trace.filter((event) => event.event === 'ignored_suggestion_acknowledged').length, count);
});

test('each route contains movement beats plus one optional micro-action without changing route completion', () => {
  const high = v010bScenario.createState('high-density');
  high.facts.route = 'high_street';
  high.stage = 'walking_high_street';
  tickAt(high, 440, 185, 432, 185);
  assert.equal(high.memory.journeyBeats.high_display_seen, true);
  high.player.x = 438;
  high.player.y = 177;
  assert.equal(v010bScenario.actions.read_bus_display.available(high), true);

  const quiet = v010bScenario.createState('quiet-density');
  quiet.facts.route = 'cut_through';
  quiet.stage = 'walking_cut_through';
  tickAt(quiet, 445, 385, 437, 385);
  assert.equal(quiet.memory.journeyBeats.quiet_window, true);
  tickAt(quiet, 720, 385, 712, 385);
  assert.equal(quiet.facts.foxPresent, true);
  quiet.player.x = 748;
  quiet.player.y = 386;
  assert.equal(v010bScenario.actions.stop_for_fox.available(quiet), true);
});

test('v010b client refreshes movement narration and reads scenario live feedback', () => {
  const client = fs.readFileSync(path.join(root, 'src/create-app.js'), 'utf8');
  assert.match(client, /scenario\.feedbackText/);
  assert.match(client, /runtime\.tickActors\(delta\);\s*updatePersistentText\(\);/);
});

test('bottom-middle narration is local to v010b and does not shrink the inherited VN', () => {
  const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
  assert.match(css, /\.live-narration\s*\{[^}]*left:\s*50%/s);
  assert.match(css, /bottom:\s*92px/);
  assert.match(css, /font-size:\s*18px/);
  assert.doesNotMatch(css, /\.vn-card\s*\{/);
  assert.doesNotMatch(css, /#vn-text\s*\{/);
});

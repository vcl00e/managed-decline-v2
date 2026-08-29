import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { test } from 'node:test';
import { v008Scenario } from '../scenario.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const scenarioSource = fs.readFileSync(path.join(root, 'scenario.js'), 'utf8');
const spokenScript = fs.readFileSync(path.join(root, 'design/002-plain-interaction-script.md'), 'utf8');

test('no focused node makes the player wait through more than three authored turns', () => {
  for (const node of Object.values(v008Scenario.vnGraph)) {
    assert.ok(node.turns.length <= 3, `${node.id} has ${node.turns.length} pre-choice turns`);
  }
});

test('player options remain short and immediate rather than relationship slogans', () => {
  const labels = Object.values(v008Scenario.vnGraph).flatMap((node) => node.choices.map((choice) => choice.label));
  for (const label of labels) {
    assert.ok(label.length <= 52, `overlong choice: ${label}`);
  }
  const combined = labels.join('\n').toLowerCase();
  for (const rejected of [
    'the real you',
    'interested in you',
    'you don’t have to perform',
    'you don\'t have to perform',
    'tell me something about you',
    'i understand you',
  ]) {
    assert.equal(combined.includes(rejected), false, `relationship-design language returned: ${rejected}`);
  }
});

test('the implementation contains no relationship meter or future-plan reward', () => {
  for (const rejected of ['relationshipScore', 'trustScore', 'romancePoints', 'futureDate', 'breakfast tomorrow']) {
    assert.equal(scenarioSource.includes(rejected), false, `found rejected progression device: ${rejected}`);
  }
});

test('character information is embedded in specific production details rather than a biography monologue', () => {
  assert.match(spokenScript, /hidden the biscuits/i);
  assert.match(spokenScript, /more susceptible/i);
  assert.doesNotMatch(spokenScript, /used to work in a library/i);
  assert.doesNotMatch(spokenScript, /public version of me/i);
});

import assert from 'node:assert/strict';
import { test } from 'node:test';
import { validateScenario } from '../../src/scenario-contract.js';
import { panelScenario } from '../../scenarios/panel.js';
import { parcelScenario } from '../../scenarios/parcel.js';

test('two unrelated scenario modules satisfy the same contract', () => {
  assert.equal(validateScenario(panelScenario).id, 'panel-fixture');
  assert.equal(validateScenario(parcelScenario).id, 'parcel-fixture');
  assert.notDeepEqual(panelScenario.world, parcelScenario.world);
  assert.notDeepEqual(Object.keys(panelScenario.actions), Object.keys(parcelScenario.actions));
});

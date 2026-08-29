import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createRuntime } from '../../src/engine.js';
import { panelScenario } from '../../scenarios/panel.js';
import { auditTracePayload } from '../../src/trace-audit.js';

test('a healthy completed scenario passes trace audit', () => {
  const runtime = createRuntime(panelScenario, 'healthy');
  runtime.state.player = { ...panelScenario.world.panel };
  runtime.performAction('help_hold');
  runtime.performAction('read_label');
  runtime.chooseVN('leave_it');
  assert.equal(auditTracePayload(runtime.snapshot()).passed, true);
});

test('the v007d stale-affordance shape is rejected', () => {
  const repeated = Array.from({ length: 4 }, (_, index) => ({
    index,
    type: 'side_action',
    action: 'inspect_seam',
  }));
  const state = {
    runId: 'v007d-regression',
    ended: false,
    conduct: ['inspect_seam', 'inspect_seam', 'inspect_seam', 'inspect_seam'],
    trace: repeated,
    visibleChanges: Array.from({ length: 4 }, (_, index) => ({
      index,
      kind: 'physical',
      detail: 'You trace the straight mortar joint where the brick pattern changes.',
    })),
  };
  const audit = auditTracePayload(state, { maxActions: 4 });
  assert.equal(audit.passed, false);
  assert.ok(audit.runs[0].errors.some((error) => error.code === 'REPEATED_IDENTICAL_ACTION'));
  assert.ok(audit.runs[0].errors.some((error) => error.code === 'REPEATED_IDENTICAL_OUTPUT'));
});

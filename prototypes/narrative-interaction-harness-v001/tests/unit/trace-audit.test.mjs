import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { auditTracePayload } from '../../src/trace-audit.js';
import { createRuntime } from '../../src/engine.js';
import { WORLD } from '../../src/scenario.js';

test('the v007d stale-affordance regression fixture is rejected', () => {
  const fixture = JSON.parse(fs.readFileSync(new URL('../../fixtures/regressions/v007d-stale-affordance.json', import.meta.url), 'utf8'));
  const report = auditTracePayload(fixture, { maxActions: 4 });
  assert.equal(report.passed, false);
  const codes = new Set(report.runs[0].errors.map((error) => error.code));
  assert.ok(codes.has('REPEATED_IDENTICAL_ACTION'));
  assert.ok(codes.has('REPEATED_IDENTICAL_OUTPUT'));
  assert.ok(codes.has('UNRESOLVED_INTERACTION_BUDGET'));
});

test('a valid completed harness run passes trace audit', () => {
  const runtime = createRuntime('unit-audit-pass');
  runtime.state.player = { ...WORLD.panel };
  runtime.performAction('help_hold');
  runtime.performAction('read_label');
  runtime.chooseVN('try_handle');
  runtime.state.player = { ...WORLD.door };
  runtime.performAction('follow_ari');
  const report = auditTracePayload(runtime.snapshot());
  assert.equal(report.passed, true, JSON.stringify(report, null, 2));
});

test('a stale non-repeatable prompt is an explicit audit failure', () => {
  const report = auditTracePayload({
    ended: false,
    trace: [{
      type: 'action_performed',
      accepted: true,
      actionId: 'inspect_seam',
      repeatable: false,
      meaningfulChange: true,
      timeAdvanced: 2,
      promptAfter: { id: 'inspect_seam' },
    }],
    visibleChanges: [],
  });
  assert.equal(report.passed, false);
  assert.equal(report.runs[0].errors[0].code, 'STALE_AFFORDANCE');
});

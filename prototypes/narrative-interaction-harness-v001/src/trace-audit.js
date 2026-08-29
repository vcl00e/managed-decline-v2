function asRuns(payload) {
  if (Array.isArray(payload)) return payload.map((item) => item?.state ?? item);
  if (payload?.runs && Array.isArray(payload.runs)) return payload.runs.map((item) => item?.state ?? item);
  return [payload?.state ?? payload];
}

function actionEvents(state) {
  const trace = Array.isArray(state?.trace) ? state.trace : [];
  const direct = trace
    .filter((event) => event?.type === 'action_performed' && event.accepted !== false)
    .map((event) => ({
      id: event.actionId,
      output: event.output,
      repeatable: Boolean(event.repeatable),
      meaningfulChange: event.meaningfulChange,
      timeAdvanced: event.timeAdvanced ?? 0,
      promptAfter: event.promptAfter ?? null,
      stageBefore: event.stageBefore,
      stageAfter: event.stageAfter,
    }));

  if (direct.length) return direct;

  const legacyTrace = trace
    .filter((event) => typeof event?.action === 'string' && /_action$/.test(event.type ?? ''))
    .map((event) => ({ id: event.action, repeatable: false }));

  if (legacyTrace.length) return legacyTrace;

  return (state?.conduct ?? []).map((id) => ({ id, repeatable: false }));
}

function longestConsecutive(items, key) {
  let best = { value: null, count: 0 };
  let current = { value: null, count: 0 };
  for (const item of items) {
    const value = key(item);
    if (value === current.value) current.count += 1;
    else current = { value, count: 1 };
    if (current.count > best.count) best = { ...current };
  }
  return best;
}

function countValues(items, key) {
  const counts = new Map();
  for (const item of items) {
    const value = key(item);
    if (value == null || value === '') continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

export function auditRun(state, options = {}) {
  const maxActions = options.maxActions ?? 20;
  const maxRepeatedAction = options.maxRepeatedAction ?? 2;
  const maxRepeatedOutput = options.maxRepeatedOutput ?? 2;
  const errors = [];
  const warnings = [];
  const actions = actionEvents(state);
  const visible = Array.isArray(state?.visibleChanges) ? state.visibleChanges : [];

  const repeatedAction = longestConsecutive(actions, (item) => item.id);
  if (repeatedAction.count > maxRepeatedAction) {
    const relevant = actions.filter((item) => item.id === repeatedAction.value);
    const declaredRepeatable = relevant.every((item) => item.repeatable);
    if (!declaredRepeatable) {
      errors.push({
        code: 'REPEATED_IDENTICAL_ACTION',
        detail: `${repeatedAction.value} executed ${repeatedAction.count} consecutive times`,
      });
    }
  }

  for (const [output, count] of countValues(
    [...actions.map((item) => ({ detail: item.output })), ...visible],
    (item) => item.detail,
  )) {
    if (count > maxRepeatedOutput) {
      errors.push({
        code: 'REPEATED_IDENTICAL_OUTPUT',
        detail: `Visible output repeated ${count} times: ${output}`,
      });
      break;
    }
  }

  for (const action of actions) {
    if (action.timeAdvanced > 0 && action.meaningfulChange === false) {
      errors.push({
        code: 'TIME_ADVANCED_WITHOUT_CHANGE',
        detail: `${action.id} advanced ${action.timeAdvanced} minute(s) without meaningful change`,
      });
    }
    if (!action.repeatable && action.promptAfter?.id === action.id) {
      errors.push({
        code: 'STALE_AFFORDANCE',
        detail: `${action.id} remained displayed after consumption`,
      });
    }
  }

  if (!state?.ended && actions.length >= maxActions) {
    errors.push({
      code: 'UNRESOLVED_INTERACTION_BUDGET',
      detail: `${actions.length} actions occurred without an ending`,
    });
  }

  const repeatedAdvanceReasons = countValues(
    (state?.trace ?? []).filter((event) => event?.type === 'fiction_advanced'),
    (event) => event.reason,
  )[0];
  if (repeatedAdvanceReasons?.[1] > maxRepeatedAction) {
    warnings.push({
      code: 'REPEATED_TIME_ADVANCE_REASON',
      detail: `${repeatedAdvanceReasons[0]} advanced time ${repeatedAdvanceReasons[1]} times`,
    });
  }

  return {
    runId: state?.runId ?? null,
    passed: errors.length === 0,
    actionCount: actions.length,
    ended: Boolean(state?.ended),
    errors,
    warnings,
  };
}

export function auditTracePayload(payload, options = {}) {
  const runs = asRuns(payload).filter(Boolean).map((state) => auditRun(state, options));
  return {
    passed: runs.every((run) => run.passed),
    runs,
    errorCount: runs.reduce((sum, run) => sum + run.errors.length, 0),
    warningCount: runs.reduce((sum, run) => sum + run.warnings.length, 0),
  };
}

import { validateScenario, validateStateShape } from './scenario-contract.js';

const clone = (value) => structuredClone(value);

function parseClock(value) {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value ?? '');
  if (!match) throw new Error(`Invalid scenario startTime: ${value}`);
  return Number(match[1]) * 60 + Number(match[2]);
}

function formatClock(startTime, offsetMinutes) {
  const total = (parseClock(startTime) + offsetMinutes) % (24 * 60);
  const hour = Math.floor(total / 60);
  const minute = total % 60;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

function coreMeaningfulState(state) {
  return {
    ended: state.ended,
    ending: state.ending,
    mode: state.mode,
    stage: state.stage,
    facts: state.facts,
    memory: state.memory,
    currentVN: state.currentVN,
    consumedActions: state.consumedActions,
    actorTargets: Object.fromEntries(
      Object.entries(state.actors ?? {}).map(([id, actor]) => [id, actor.target]),
    ),
  };
}

function digest(scenario, state) {
  return JSON.stringify({
    core: coreMeaningfulState(state),
    scenario: scenario.meaningfulState(state),
  });
}

function actionList(scenario, state) {
  if (state.ended || state.mode !== 'world') return [];
  return Object.values(scenario.actions)
    .filter((action) => action.available(state))
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0) || a.id.localeCompare(b.id));
}

export function createRuntime(scenarioInput, runId = `run-${Date.now()}`) {
  const scenario = validateScenario(scenarioInput);
  let state = validateStateShape(scenario, scenario.createState(runId));

  function record(type, payload = {}) {
    state.trace.push({
      ...payload,
      index: state.trace.length,
      type,
      fictionalTime: state.fictionalTime,
    });
  }

  function visible(kind, detail) {
    if (!detail) return null;
    const item = { index: state.visibleChanges.length, kind, detail };
    state.visibleChanges.push(item);
    record('visible_change', item);
    return item;
  }

  function advanceTime(minutes, reason) {
    if (!Number.isFinite(minutes) || minutes < 0) throw new Error('Invalid fictional-time advance.');
    if (minutes === 0) return;
    state.fictionalMinutes += minutes;
    state.fictionalTime = formatClock(scenario.startTime ?? '19:03', state.fictionalMinutes);
    record('fiction_advanced', { minutes, reason });
  }

  function prompt(index = 0) {
    const actions = actionList(scenario, state);
    if (!actions.length) return null;
    const action = actions[Math.max(0, Math.min(actions.length - 1, index))];
    return { id: action.id, label: action.label, count: actions.length };
  }

  function prompts() {
    return actionList(scenario, state).map((action) => ({ id: action.id, label: action.label }));
  }

  function performAction(actionId) {
    const action = scenario.actions[actionId];
    const promptBefore = prompt();

    if (!action) {
      record('action_rejected', { actionId, reason: 'unknown_action', promptBefore });
      return { accepted: false, reason: 'unknown_action' };
    }
    if (state.ended || state.mode !== 'world') {
      record('action_rejected', { actionId, reason: 'wrong_context', promptBefore });
      return { accepted: false, reason: 'wrong_context' };
    }
    if (!action.available(state)) {
      record('action_rejected', { actionId, reason: 'stale_or_unavailable', promptBefore });
      return { accepted: false, reason: 'stale_or_unavailable' };
    }

    const priorUses = state.actionUses[actionId] ?? 0;
    if (!action.repeatable && priorUses > 0) {
      record('action_rejected', { actionId, reason: 'already_consumed', promptBefore });
      return { accepted: false, reason: 'already_consumed' };
    }

    const beforeDigest = digest(scenario, state);
    const beforeTime = state.fictionalMinutes;
    const stageBefore = state.stage;
    const result = action.apply(state) ?? {};

    state.actionUses[actionId] = priorUses + 1;
    if (!action.repeatable) state.consumedActions.push(actionId);
    scenario.afterAction?.(state, actionId, result);

    const meaningfulChange = beforeDigest !== digest(scenario, state);
    const durationMinutes = action.durationMinutes ?? 0;
    if (durationMinutes > 0 && !meaningfulChange) {
      throw new Error(`Invariant violation: ${actionId} advanced time without meaningful state change.`);
    }
    advanceTime(durationMinutes, `action:${actionId}`);
    const visibleItem = visible(result.kind ?? 'situation', result.output);

    const promptAfter = prompt();
    if (!action.repeatable && promptAfter?.id === actionId) {
      throw new Error(`Invariant violation: consumed action ${actionId} remains the current affordance.`);
    }

    const event = {
      actionId,
      accepted: true,
      repeatable: Boolean(action.repeatable),
      useNumber: state.actionUses[actionId],
      stageBefore,
      stageAfter: state.stage,
      promptBefore,
      promptAfter,
      meaningfulChange,
      timeAdvanced: state.fictionalMinutes - beforeTime,
      output: result.output ?? null,
    };
    record('action_performed', event);
    return { ...event, visible: visibleItem };
  }

  function chooseVN(choiceId) {
    if (state.mode !== 'vn' || !state.currentVN) {
      throw new Error('No VN choice is currently available.');
    }
    const nodeId = state.currentVN;
    const node = scenario.vnGraph[nodeId];
    if (!node) throw new Error(`Unknown current VN node: ${nodeId}`);
    const choice = node.choices.find((item) => item.id === choiceId);
    if (!choice) throw new Error(`Unknown VN choice: ${nodeId}:${choiceId}`);

    const beforeDigest = digest(scenario, state);
    const stageBefore = state.stage;
    const result = choice.apply(state) ?? {};

    if (result.nextNode) {
      if (!scenario.vnGraph[result.nextNode]) throw new Error(`Unknown next VN node: ${result.nextNode}`);
      state.mode = 'vn';
      state.currentVN = result.nextNode;
    } else if (!result.keepOpen) {
      state.mode = 'world';
      state.currentVN = null;
    }
    if (state.ended) {
      state.mode = 'world';
      state.currentVN = null;
    }

    const meaningfulChange = beforeDigest !== digest(scenario, state);
    if (!meaningfulChange) throw new Error(`Invariant violation: VN choice ${choiceId} changed nothing.`);
    const visibleItem = visible(result.kind ?? 'situation', result.output);
    record('vn_choice', {
      nodeId,
      choiceId,
      stageBefore,
      stageAfter: state.stage,
      meaningfulChange,
      nextNode: result.nextNode ?? null,
      promptAfter: prompt(),
      output: result.output ?? null,
    });
    return {
      ...result,
      response: typeof result.response === 'function' ? result.response(state) : (result.response ?? []),
      visible: visibleItem,
    };
  }

  function cancelVN() {
    if (state.mode !== 'vn' || !state.currentVN) return { cancelled: false };
    const nodeId = state.currentVN;
    state.memory.pausedVN = nodeId;
    state.mode = 'world';
    state.currentVN = null;
    const result = scenario.onCancelVN?.(state, nodeId) ?? {
      kind: 'situation',
      output: 'The focused exchange pauses; the live space remains available.',
    };
    visible(result.kind ?? 'situation', result.output);
    record('vn_cancelled', { nodeId, promptAfter: prompt() });
    return { cancelled: true, nodeId };
  }

  function movePlayer(dx, dy) {
    if (state.mode !== 'world' || state.ended) return;
    const margin = scenario.world.margin ?? 20;
    state.player.x = Math.max(margin, Math.min(scenario.world.width - margin, state.player.x + dx));
    state.player.y = Math.max(margin, Math.min(scenario.world.height - margin, state.player.y + dy));
  }

  function tickActors(dtSeconds) {
    if (!Number.isFinite(dtSeconds) || dtSeconds <= 0) return;
    for (const [id, actor] of Object.entries(state.actors ?? {})) {
      const definition = scenario.actors?.[id] ?? {};
      const target = actor.target ?? actor;
      const dx = target.x - actor.x;
      const dy = target.y - actor.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 0.5) continue;
      const step = Math.min(distance, (definition.speed ?? 145) * dtSeconds);
      actor.x += (dx / distance) * step;
      actor.y += (dy / distance) * step;
    }
    scenario.tick?.(state, dtSeconds);
  }

  function reset(nextRunId = `run-${Date.now()}`) {
    state = validateStateShape(scenario, scenario.createState(nextRunId));
    record('run_started');
    return clone(state);
  }

  record('run_started');

  return {
    scenario,
    get state() {
      return state;
    },
    snapshot() {
      return clone(state);
    },
    performAction,
    chooseVN,
    cancelVN,
    movePlayer,
    tickActors,
    prompt,
    prompts,
    reset,
  };
}

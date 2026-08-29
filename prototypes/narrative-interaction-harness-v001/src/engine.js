import {
  actionById,
  applyVNChoice,
  availableActions,
  createScenarioState,
} from './scenario.js';

const clone = (value) => structuredClone(value);

function meaningfulSnapshot(state) {
  return {
    ended: state.ended,
    ending: state.ending,
    mode: state.mode,
    stage: state.stage,
    facts: state.facts,
    currentVN: state.currentVN,
    consumedActions: state.consumedActions,
    ariTarget: state.ari.target,
  };
}

function digest(state) {
  return JSON.stringify(meaningfulSnapshot(state));
}

function formatTime(totalMinutes) {
  const total = 19 * 60 + 3 + totalMinutes;
  const hour = Math.floor(total / 60) % 24;
  const minute = total % 60;
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

export function promptFor(state) {
  const actions = availableActions(state);
  if (!actions.length) return null;
  const action = actions[0];
  return { id: action.id, label: action.label };
}

export function createRuntime(runId) {
  let state = createScenarioState(runId);

  function record(type, payload = {}) {
    state.trace.push({
      ...payload,
      index: state.trace.length,
      type,
      fictionalTime: state.fictionalTime,
    });
  }

  function visible(kind, detail) {
    const item = { index: state.visibleChanges.length, kind, detail };
    state.visibleChanges.push(item);
    record('visible_change', item);
    return item;
  }

  function advanceTime(minutes, reason) {
    if (!Number.isFinite(minutes) || minutes < 0) throw new Error('Invalid fictional-time advance.');
    state.fictionalMinutes += minutes;
    state.fictionalTime = formatTime(state.fictionalMinutes);
    record('fiction_advanced', { minutes, reason });
  }

  function performAction(actionId) {
    const action = actionById(actionId);
    const promptBefore = promptFor(state);

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

    const beforeDigest = digest(state);
    const beforeTime = state.fictionalMinutes;
    const stageBefore = state.stage;
    const result = action.apply(state);

    state.actionUses[actionId] = priorUses + 1;
    if (!action.repeatable) state.consumedActions.push(actionId);

    const afterActionDigest = digest(state);
    const meaningfulChange = beforeDigest !== afterActionDigest;

    if (action.durationMinutes > 0 && !meaningfulChange) {
      throw new Error(`Invariant violation: ${actionId} advanced time without a meaningful state change.`);
    }

    if (action.durationMinutes > 0) advanceTime(action.durationMinutes, `action:${actionId}`);
    visible(result.kind, result.output);

    const promptAfter = promptFor(state);
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
      output: result.output,
    };
    record('action_performed', event);
    return { ...event, visible: result };
  }

  function chooseVN(choiceId) {
    const beforeDigest = digest(state);
    const stageBefore = state.stage;
    const result = applyVNChoice(state, choiceId);
    const meaningfulChange = beforeDigest !== digest(state);
    if (!meaningfulChange) throw new Error(`Invariant violation: VN choice ${choiceId} changed nothing.`);
    visible(result.kind, result.output);
    record('vn_choice', {
      choiceId,
      stageBefore,
      stageAfter: state.stage,
      meaningfulChange,
      promptAfter: promptFor(state),
      output: result.output,
    });
    return result;
  }

  function cancelVN() {
    if (state.mode !== 'vn') return { cancelled: false };
    const nodeId = state.currentVN;
    state.mode = 'world';
    state.currentVN = null;
    state.stage = 'exchange_paused';
    visible('situation', 'The focused exchange pauses; the live space remains available.');
    record('vn_cancelled', { nodeId, promptAfter: promptFor(state) });
    return { cancelled: true, nodeId };
  }

  function movePlayer(dx, dy) {
    if (state.mode !== 'world' || state.ended) return;
    state.player.x = Math.max(24, Math.min(816, state.player.x + dx));
    state.player.y = Math.max(24, Math.min(436, state.player.y + dy));
  }

  function tickNpc(dtSeconds) {
    const npc = state.ari;
    const dx = npc.target.x - npc.x;
    const dy = npc.target.y - npc.y;
    const distance = Math.hypot(dx, dy);
    if (distance < 1) return;
    const step = Math.min(distance, 150 * dtSeconds);
    npc.x += (dx / distance) * step;
    npc.y += (dy / distance) * step;
  }

  function reset(nextRunId) {
    state = createScenarioState(nextRunId);
    record('run_started');
    return clone(state);
  }

  record('run_started');

  return {
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
    tickNpc,
    prompt() {
      return promptFor(state);
    },
    reset,
  };
}

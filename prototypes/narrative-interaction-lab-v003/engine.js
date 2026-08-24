import { NODES, START_NODE } from "./story.js";
import { installExtraNodes } from "./story-extra.js";

installExtraNodes(NODES);

export function clone(value) {
  return structuredClone(value);
}

export function createInitialState() {
  return {
    nodeId: START_NODE,
    screen: "node",
    flags: {},
    relation: "unknown",
    memories: [],
    information: [],
    endingId: null
  };
}

export function getCurrentNode(state) {
  return NODES[state.nodeId] ?? null;
}

function addUnique(target, values = []) {
  for (const value of values) if (!target.includes(value)) target.push(value);
}

export function applyEffects(effects = {}, state) {
  if (effects.setFlags) Object.assign(state.flags, effects.setFlags);
  if (effects.setRelation) state.relation = effects.setRelation;
  addUnique(state.memories, effects.addMemories);
  addUnique(state.information, effects.addInformation);
}

export function getAvailableActions(state) {
  return getCurrentNode(state)?.actions ?? [];
}

export function chooseAction(state, actionId) {
  const action = getAvailableActions(state).find((candidate) => candidate.id === actionId);
  if (!action) throw new Error(`Unavailable action: ${actionId}`);

  applyEffects(action.effects, state);

  if (action.next === "@debrief") {
    state.screen = "debrief";
    return state;
  }

  const next = NODES[action.next];
  if (!next) throw new Error(`Missing target node: ${action.next}`);
  state.nodeId = action.next;
  state.screen = "node";
  if (next.endingId) state.endingId = next.endingId;
  return state;
}

export function summariseState(state) {
  return {
    nodeId: state.nodeId,
    screen: state.screen,
    flags: { ...state.flags },
    relation: state.relation,
    memories: [...state.memories],
    information: [...state.information],
    endingId: state.endingId
  };
}

export function makeTraversalKey(state) {
  return JSON.stringify(summariseState(state));
}

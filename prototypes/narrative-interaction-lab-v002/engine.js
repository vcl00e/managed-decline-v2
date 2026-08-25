import { NODES, LOCATIONS, createInitialStoryState, getMapSnapshot, getMapEntryNode, getOpeningPhoneNode } from "./story.js";

export const clone = (value) => structuredClone(value);

function objectMatches(expected = {}, actual = {}) {
  return Object.entries(expected).every(([key, value]) => actual?.[key] === value);
}

function containsAll(expected = [], actual = []) {
  return expected.every((value) => actual.includes(value));
}

export function matchesCondition(condition, state) {
  if (!condition) return true;
  if (condition.flags && !objectMatches(condition.flags, state.flags)) return false;
  if (condition.arrangements && !objectMatches(condition.arrangements, state.arrangements)) return false;
  if (condition.commitments && !objectMatches(condition.commitments, state.commitments)) return false;
  if (condition.material && !objectMatches(condition.material, state.material)) return false;
  if (condition.information && !containsAll(condition.information, state.information)) return false;
  if (condition.access && !containsAll(condition.access, state.access)) return false;
  if (condition.memories && !containsAll(condition.memories, state.memories)) return false;
  if (condition.visited && !containsAll(condition.visited, state.visited)) return false;
  if (condition.unvisited && condition.unvisited.some((value) => state.visited.includes(value))) return false;
  if (condition.openingCount !== undefined && state.openingCount !== condition.openingCount) return false;
  return true;
}

export function isItemAvailable(item, state) {
  if (item.when && !matchesCondition(item.when, state)) return false;
  if (item.unless && matchesCondition(item.unless, state)) return false;
  return true;
}

function resolveItems(items = [], state) {
  return items.filter((item) => typeof item === "string" || isItemAvailable(item, state)).map((item) => typeof item === "string" ? item : { ...item });
}

export function createSessionState() { return createInitialStoryState(); }
export function getCurrentNode(state) { return NODES[state.nodeId] ?? null; }
export function getNodeView(state) {
  const node = getCurrentNode(state);
  if (!node) return null;
  return { ...node, prose: resolveItems(node.prose, state), lines: resolveItems(node.lines, state), actions: (node.actions || []).filter((action) => isItemAvailable(action, state)) };
}
export function getAvailableActions(state) { return getNodeView(state)?.actions ?? []; }
export function getMapView(state) { return { locations: getMapSnapshot(state), heading: state.openingCount === 0 ? "Moor Lane · nothing is yours yet" : "Moor Lane · choose what receives your evening" }; }
export function getAvailableMapDestinations(state) { return getMapSnapshot(state).filter((location) => location.available); }

function appendUnique(target, values = []) { for (const value of values) if (!target.includes(value)) target.push(value); }
export function applyEffects(effects = {}, state) {
  if (effects.setFlags) Object.assign(state.flags, effects.setFlags);
  if (effects.setArrangements) Object.assign(state.arrangements, effects.setArrangements);
  if (effects.setCommitments) Object.assign(state.commitments, effects.setCommitments);
  if (effects.setMaterial) Object.assign(state.material, effects.setMaterial);
  if (effects.setRelations) Object.assign(state.relations, effects.setRelations);
  appendUnique(state.information, effects.addInformation);
  appendUnique(state.access, effects.addAccess);
  appendUnique(state.memories, effects.addMemories);
  appendUnique(state.residue, effects.addResidue);
  appendUnique(state.observations, effects.addObservations);
  appendUnique(state.materialActions, effects.addMaterialActions);
  if (effects.completeOpening && !state.visited.includes(effects.completeOpening)) {
    state.visited.push(effects.completeOpening);
    state.openingCount = state.visited.length;
  }
}

export function enterNode(state, nodeId) {
  if (!NODES[nodeId]) throw new Error(`Unknown node: ${nodeId}`);
  state.nodeId = nodeId;
  state.screen = "node";
  if (NODES[nodeId].endingId) state.endingId = NODES[nodeId].endingId;
  return state;
}
export function enterMap(state) { state.screen = "map"; return state; }
export function resolveNext(state, next) {
  if (next === "@map-opening") return enterMap(state);
  if (next === "@opening-complete") {
    if (state.openingCount >= 2) {
      const unvisited = Object.keys(LOCATIONS).find((id) => !state.visited.includes(id));
      return enterNode(state, getOpeningPhoneNode(unvisited));
    }
    return enterMap(state);
  }
  if (next === "@debrief") { state.screen = "debrief"; return state; }
  return enterNode(state, next);
}
export function chooseAction(state, actionId) {
  const action = getAvailableActions(state).find((item) => item.id === actionId);
  if (!action) throw new Error(`Action not available: ${actionId}`);
  applyEffects(action.effects, state);
  return resolveNext(state, action.next);
}
export function enterMapLocation(state, locationId) {
  const destination = getAvailableMapDestinations(state).find((item) => item.id === locationId);
  if (!destination) throw new Error(`Map destination not available: ${locationId}`);
  return enterNode(state, getMapEntryNode(locationId));
}
export function summariseState(state) {
  return {
    nodeId: state.nodeId, screen: state.screen, visited:[...state.visited], openingCount:state.openingCount,
    flags:{...state.flags}, arrangements:{...state.arrangements}, commitments:{...state.commitments}, information:[...state.information],
    access:[...state.access], material:{...state.material}, relations:{...state.relations}, memories:[...state.memories], residue:[...state.residue],
    observations:[...state.observations], materialActions:[...state.materialActions], endingId:state.endingId
  };
}
export function makeTraversalKey(state) { return JSON.stringify(summariseState(state)); }

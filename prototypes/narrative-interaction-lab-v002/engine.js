import {
  NODES,
  LOCATIONS,
  VARIANTS,
  createInitialStoryState,
  getMapSnapshot,
  getMapEntryNode,
  getOpeningPhoneNode,
  resolveWithdrawEnding
} from "./story.js";

export function clone(value) {
  return structuredClone(value);
}

function matchesFlags(expected = {}, actual = {}) {
  return Object.entries(expected).every(([key, value]) => actual[key] === value);
}

function matchesAnyFlag(candidates, actual = {}) {
  if (!candidates) return true;
  const list = Array.isArray(candidates) ? candidates : [candidates];
  return list.some((candidate) => matchesFlags(candidate, actual));
}

export function matchesCondition(condition, state) {
  if (!condition) return true;
  if (condition.flags && !matchesFlags(condition.flags, state.flags)) return false;
  if (condition.anyFlags && !matchesAnyFlag(condition.anyFlags, state.flags)) return false;
  if (condition.visited && !condition.visited.every((id) => state.visited.includes(id))) return false;
  if (condition.unvisited && !condition.unvisited.every((id) => !state.visited.includes(id))) return false;
  if (condition.openingCount !== undefined && state.openingCount !== condition.openingCount) return false;
  if (condition.mapPhase !== undefined && state.mapPhase !== condition.mapPhase) return false;
  if (condition.variantId !== undefined && state.variantId !== condition.variantId) return false;
  return true;
}

export function isItemAvailable(item, state) {
  if (item.variants && !item.variants.includes(state.variantId)) return false;
  if (item.excludeVariants?.includes(state.variantId)) return false;
  if (item.when && !matchesCondition(item.when, state)) return false;
  if (item.unless && matchesCondition(item.unless, state)) return false;
  return true;
}

function resolveTextItems(items = [], state) {
  return items
    .filter((item) => typeof item === "string" || isItemAvailable(item, state))
    .map((item) => typeof item === "string" ? item : { ...item });
}

export function createSessionState(variantId) {
  if (!VARIANTS[variantId]) throw new Error(`Unknown variant: ${variantId}`);
  return createInitialStoryState(variantId);
}

export function getCurrentNode(state) {
  return NODES[state.nodeId] ?? null;
}

export function getNodeView(state) {
  const node = getCurrentNode(state);
  if (!node) return null;
  return {
    ...node,
    prose: resolveTextItems(node.prose, state),
    lines: resolveTextItems(node.lines, state),
    actions: (node.actions ?? []).filter((action) => isItemAvailable(action, state))
  };
}

export function getAvailableActions(state) {
  return getNodeView(state)?.actions ?? [];
}

export function getMapView(state) {
  return {
    phase: state.mapPhase,
    locations: getMapSnapshot(state),
    heading: state.mapPhase === "opening"
      ? "Moor Lane · choose where your attention goes next"
      : "Moor Lane · the separate situations are converging"
  };
}

export function getAvailableMapDestinations(state) {
  return getMapSnapshot(state).filter((location) => location.available);
}

function appendUnique(target, values = []) {
  for (const value of values) {
    if (!target.includes(value)) target.push(value);
  }
}

export function applyEffects(effects = {}, state) {
  if (effects.setFlags) Object.assign(state.flags, effects.setFlags);
  if (effects.completeOpening) {
    if (!state.visited.includes(effects.completeOpening)) {
      state.visited.push(effects.completeOpening);
      state.openingCount = state.visited.length;
    }
  }
  appendUnique(state.observations, effects.addObservations);
  appendUnique(state.materialActions, effects.addMaterialActions);
  appendUnique(state.residue, effects.addResidue);
}

export function enterNode(state, nodeId) {
  if (!NODES[nodeId]) throw new Error(`Unknown node: ${nodeId}`);
  state.nodeId = nodeId;
  state.screen = "node";
  if (NODES[nodeId].endingId) state.endingId = NODES[nodeId].endingId;
  return state;
}

export function enterMap(state, phase = state.mapPhase) {
  state.mapPhase = phase;
  state.screen = "map";
  return state;
}

export function resolveNext(state, next) {
  switch (next) {
    case "@map-opening":
      return enterMap(state, "opening");
    case "@opening-complete": {
      if (state.openingCount >= 2) {
        const unvisited = Object.keys(LOCATIONS).find((id) => !state.visited.includes(id));
        const phoneNode = getOpeningPhoneNode(unvisited);
        if (!phoneNode) throw new Error(`No phone node for unvisited location: ${unvisited}`);
        return enterNode(state, phoneNode);
      }
      return enterMap(state, "opening");
    }
    case "@map-convergence":
      state.mapPhase = "convergence";
      return enterNode(state, "convergence_map");
    case "@withdraw-ending":
      return enterNode(state, resolveWithdrawEnding(state));
    case "@debrief":
      state.screen = "debrief";
      return state;
    default:
      return enterNode(state, next);
  }
}

export function chooseAction(state, actionId) {
  const action = getAvailableActions(state).find((candidate) => candidate.id === actionId);
  if (!action) throw new Error(`Action is not available: ${actionId}`);
  applyEffects(action.effects, state);
  resolveNext(state, action.next);
  return state;
}

export function enterMapLocation(state, locationId) {
  const destination = getAvailableMapDestinations(state).find((location) => location.id === locationId);
  if (!destination) throw new Error(`Map destination is not available: ${locationId}`);
  const nodeId = getMapEntryNode(locationId);
  if (!nodeId) throw new Error(`No entry node for map location: ${locationId}`);
  return enterNode(state, nodeId);
}

export function summariseState(state) {
  return {
    variantId: state.variantId,
    nodeId: state.nodeId,
    screen: state.screen,
    visited: [...state.visited],
    openingCount: state.openingCount,
    mapPhase: state.mapPhase,
    flags: { ...state.flags },
    observations: [...state.observations],
    materialActions: [...state.materialActions],
    residue: [...state.residue],
    endingId: state.endingId
  };
}

export function getVariantDescriptor(variantId) {
  return VARIANTS[variantId] ?? null;
}

export function getTerminalEndingId(state) {
  return state.endingId;
}

export function makeTraversalKey(state) {
  const flags = Object.entries(state.flags).sort(([a], [b]) => a.localeCompare(b));
  return JSON.stringify({
    variantId: state.variantId,
    nodeId: state.nodeId,
    screen: state.screen,
    visited: [...state.visited].sort(),
    flags,
    observations: [...state.observations].sort(),
    materialActions: [...state.materialActions].sort(),
    endingId: state.endingId
  });
}

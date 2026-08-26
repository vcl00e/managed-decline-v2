import { MOMENTS, LOCATIONS } from "./story.js";

export function clone(value) {
  return structuredClone(value);
}

function addUnique(target, values = []) {
  for (const value of values ?? []) {
    if (!target.includes(value)) target.push(value);
  }
}

export function createInitialState(condition = "a") {
  if (!["a", "b", "c"].includes(condition)) throw new Error(`Unknown condition: ${condition}`);
  const state = {
    condition,
    screen: "play",
    momentIndex: 0,
    location: condition === "a" ? "workshop" : "desk",
    flags: {},
    relation: "unknown",
    memories: [],
    information: [],
    attendedMoments: [],
    missedMoments: [],
    workBacklog: 0,
    maxWorkBacklog: 0,
    workActions: 0,
    dramaticOutcome: null,
    endingId: null,
    engagedMomentId: null
  };
  addCurrentDemand(state);
  return state;
}

export function getCurrentMoment(state) {
  return MOMENTS[state.momentIndex] ?? null;
}

function addCurrentDemand(state) {
  if (state.condition !== "c") return;
  const moment = getCurrentMoment(state);
  state.workBacklog += moment?.workDemand ?? 0;
  state.maxWorkBacklog = Math.max(state.maxWorkBacklog, state.workBacklog);
  if (state.workBacklog >= 4) state.flags.servicePressureVisible = true;
  if (state.workBacklog >= 7) state.flags.servicePressureSevere = true;
}

export function moveTo(state, locationId) {
  if (state.condition === "a") return state;
  if (state.engagedMomentId) return state;
  if (!LOCATIONS[locationId]) throw new Error(`Unknown location: ${locationId}`);
  const moment = getCurrentMoment(state);
  if (moment?.forcedFoyer) {
    state.location = "foyer";
    return state;
  }
  state.location = locationId;
  return state;
}

export function engageWorkshop(state) {
  const moment = getCurrentMoment(state);
  if (state.condition === "a" || moment?.forcedFoyer) return state;
  if (state.location !== "workshop") throw new Error("Workshop can only be engaged from Learning Suite Two.");
  state.engagedMomentId = moment.id;
  return state;
}

export function applyEffects(effects = {}, state) {
  if (effects.setFlags) Object.assign(state.flags, effects.setFlags);
  if (effects.setRelation) state.relation = effects.setRelation;
  addUnique(state.memories, effects.addMemories);
  addUnique(state.information, effects.addInformation);
}

export function getAvailableActions(state) {
  const moment = getCurrentMoment(state);
  if (!moment) return [];

  if (state.condition === "a" || moment.forcedFoyer) {
    return moment.workshopActions ?? [];
  }

  if (state.location === "workshop") {
    return state.engagedMomentId === moment.id ? (moment.workshopActions ?? []) : [];
  }

  const contextAction = moment.contextActions?.[state.location];
  if (contextAction) return [contextAction];

  return [{
    id: `${moment.id}_wait_${state.location}`,
    label: `Stay in the ${LOCATIONS[state.location]?.short?.toLowerCase() ?? "space"} and let the minute pass.`,
    intent: "Spend attention here without intervening",
    effects: {},
    clearsWork: 0
  }];
}

function markAttention(state, moment, action, actionLocation) {
  if (moment.forcedFoyer) return;

  const attended = state.condition === "a"
    || moment.forcedFoyer
    || state.engagedMomentId === moment.id;
  if (attended) {
    addUnique(state.attendedMoments, [moment.id]);
  } else {
    addUnique(state.missedMoments, [moment.id]);
  }

  if (action.clearsWork > 0) state.workActions += 1;
}

function applyWork(state, action) {
  if (state.condition !== "c") return;
  const clears = Math.max(0, Number(action.clearsWork ?? 0));
  if (clears > 0) state.workBacklog = Math.max(0, state.workBacklog - clears);
}

export function chooseAction(state, actionId) {
  const moment = getCurrentMoment(state);
  const actionLocation = state.condition === "a" ? "workshop" : state.location;
  const action = getAvailableActions(state).find((candidate) => candidate.id === actionId);
  if (!action) throw new Error(`Unavailable action: ${actionId}`);

  const before = summariseState(state);
  applyEffects(action.effects, state);
  markAttention(state, moment, action, actionLocation);
  applyWork(state, action);

  if (moment.id === "choice" && action.endingPath) {
    state.dramaticOutcome = action.endingPath;
  }

  if (moment.id === "aftermath") {
    state.engagedMomentId = null;
    state.endingId = action.endingPath ?? "walk";
    state.screen = "debrief";
    return { state, action, moment, before, after: summariseState(state), actionLocation };
  }

  state.engagedMomentId = null;
  state.momentIndex += 1;
  const next = getCurrentMoment(state);
  if (!next) {
    state.screen = "debrief";
    state.endingId = state.endingId ?? "walk";
  } else {
    if (next.forcedFoyer) state.location = "foyer";
    addCurrentDemand(state);
  }

  return { state, action, moment, before, after: summariseState(state), actionLocation };
}

export function getPressureCopy(state) {
  if (state.condition !== "c") return null;
  const n = state.workBacklog;
  if (n <= 0) return "The desk is under control.";
  if (n <= 2) return "There are a couple of ordinary things waiting at the desk.";
  if (n <= 4) return "A small queue has formed at the desk. Nobody is panicking.";
  if (n <= 6) return "The queue is now visible from the foyer. The service bell has acquired confidence.";
  return "The desk is conspicuously unattended. The public has begun organising itself.";
}

export function getOutcomeRecap(state) {
  const map = {
    public: "You were there when Tabitha chose to reveal herself and take the room.",
    leave: "You were there when Tabitha chose not to become the workshop's content.",
    source: "You were there when the scene turned into a demand for sources and paperwork.",
    missed: "You spent the decisive beat elsewhere. By the time you saw Tabitha again, the workshop had already resolved."
  };
  return map[state.dramaticOutcome] ?? "The workshop's decisive moment is still unresolved.";
}

export function getWorkRecap(state) {
  if (state.condition !== "c") return null;
  if (state.maxWorkBacklog <= 2 && state.workBacklog <= 1) {
    return "The shift survived almost invisibly: the ordinary work got done without becoming the story.";
  }
  if (state.maxWorkBacklog <= 5 && state.workBacklog <= 3) {
    return "The desk looks lived-in rather than disastrous. A few people waited; the library kept functioning.";
  }
  if (state.workBacklog <= 4) {
    return "You eventually pulled the desk back under control, but several people clearly noticed when you were elsewhere.";
  }
  return "A supervisor has left a note asking why the service point was unattended from roughly 18:04 to 18:18. It is not angry. This is worse.";
}

export function summariseState(state) {
  return {
    condition: state.condition,
    screen: state.screen,
    momentIndex: state.momentIndex,
    momentId: getCurrentMoment(state)?.id ?? null,
    location: state.location,
    flags: { ...state.flags },
    relation: state.relation,
    memories: [...state.memories],
    information: [...state.information],
    attendedMoments: [...state.attendedMoments],
    missedMoments: [...state.missedMoments],
    workBacklog: state.workBacklog,
    maxWorkBacklog: state.maxWorkBacklog,
    workActions: state.workActions,
    dramaticOutcome: state.dramaticOutcome,
    endingId: state.endingId,
    engagedMomentId: state.engagedMomentId
  };
}

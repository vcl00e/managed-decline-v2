export const PROTOTYPE_ID = "narrative-interaction-lab-v005";

export function createState() {
  return {
    phase: "open",
    worldTime: 0,
    flags: {
      powerFixed: false,
      knowsVacantTarget: false,
      mayaKnowsVacantTarget: false,
      benKnowsVacantTarget: false,
      heardOccupancyContradiction: false,
      heardCourtyardCall: false,
      juneKeyOffered: false,
      sideDoorOpen: false,
      rowanKnowsPlayerReadPack: false,
      metPriya: false,
      clashStarted: false,
      resolved: false
    },
    relation: { maya: 0, june: 0, ben: 0, rowan: 0, priya: 0 },
    memories: [],
    knowledge: [],
    outcome: null,
    carried: null,
    heardEvents: [],
    missedEvents: [],
    interactions: 0,
    dialogueChoices: 0,
    exitedEarly: false
  };
}

export function addUnique(list, value) {
  if (value && !list.includes(value)) list.push(value);
}

export function learn(state, fact) {
  addUnique(state.knowledge, fact);
  if (fact === "vacant_target_monday") state.flags.knowsVacantTarget = true;
  if (fact === "occupancy_sheet_says_empty") state.flags.heardOccupancyContradiction = true;
  if (fact === "rowan_call_confirms_users_in_situ") {
    state.flags.heardCourtyardCall = true;
    state.flags.knowsVacantTarget = true;
    addUnique(state.knowledge, "vacant_target_monday");
  }
}

export function remember(state, memory) {
  addUnique(state.memories, memory);
}

export function shiftRelation(state, who, delta) {
  state.relation[who] = (state.relation[who] ?? 0) + delta;
}

export function resolveOutcome(state, outcome) {
  if (state.flags.resolved) return false;
  state.flags.resolved = true;
  state.phase = "aftermath";
  state.outcome = outcome;
  remember(state, `outcome:${outcome}`);
  return true;
}

export function summary(state) {
  return {
    phase: state.phase,
    worldTime: Math.round(state.worldTime * 10) / 10,
    flags: { ...state.flags },
    relation: { ...state.relation },
    memories: [...state.memories],
    knowledge: [...state.knowledge],
    outcome: state.outcome,
    carried: state.carried,
    heardEvents: [...state.heardEvents],
    missedEvents: [...state.missedEvents],
    interactions: state.interactions,
    dialogueChoices: state.dialogueChoices,
    exitedEarly: state.exitedEarly
  };
}

import assert from "node:assert/strict";

import {
  CONDITIONS,
  LOCATIONS,
  MOMENTS,
  DEBRIEF_QUESTIONS
} from "../story.js";

import {
  createInitialState,
  getCurrentMoment,
  getAvailableActions,
  moveTo,
  engageWorkshop,
  chooseAction,
  summariseState
} from "../engine.js";

assert.deepEqual(Object.keys(CONDITIONS), ["a", "b", "c"]);
assert.deepEqual(Object.keys(LOCATIONS), ["desk", "workshop", "foyer", "outside"]);
assert.equal(MOMENTS.length, 8);
assert.equal(MOMENTS.at(-1).id, "aftermath");
assert.ok(DEBRIEF_QUESTIONS.length >= 6);

const seenMomentIds = new Set();
const seenActionIds = new Set();

for (const moment of MOMENTS) {
  assert.ok(moment.id);
  assert.ok(!seenMomentIds.has(moment.id), `duplicate moment id ${moment.id}`);
  seenMomentIds.add(moment.id);
  assert.ok(moment.phase);
  assert.ok(moment.time);
  assert.ok(moment.projector?.head);
  assert.ok(Array.isArray(moment.workshopActions) && moment.workshopActions.length > 0);

  for (const action of moment.workshopActions) {
    assert.ok(action.id && action.label && action.intent);
    assert.ok(!seenActionIds.has(action.id), `duplicate action id ${action.id}`);
    seenActionIds.add(action.id);
  }

  if (!moment.forcedFoyer) {
    for (const locationId of ["desk", "foyer", "outside"]) {
      const action = moment.contextActions?.[locationId];
      assert.ok(action, `${moment.id} missing context action for ${locationId}`);
      assert.ok(!seenActionIds.has(action.id), `duplicate action id ${action.id}`);
      seenActionIds.add(action.id);
    }
  }
}

function runBaseline() {
  const state = createInitialState("a");
  while (state.screen !== "debrief") {
    const moment = getCurrentMoment(state);
    const actions = getAvailableActions(state);
    assert.ok(actions.length > 0, `no baseline action at ${moment?.id}`);
    chooseAction(state, actions[0].id);
  }
  assert.equal(state.endingId, "walk");
  assert.equal(state.attendedMoments.length, 7);
  assert.equal(state.missedMoments.length, 0);
  return state;
}

function runSpatialWorkshop(condition) {
  const state = createInitialState(condition);
  while (state.screen !== "debrief") {
    const moment = getCurrentMoment(state);
    if (!moment.forcedFoyer) {
      moveTo(state, "workshop");
      assert.equal(getAvailableActions(state).length, 0, "workshop should require attention commitment");
      engageWorkshop(state);
    }
    const actions = getAvailableActions(state);
    assert.ok(actions.length > 0, `no workshop action at ${moment.id}`);
    chooseAction(state, actions[0].id);
  }
  assert.equal(state.attendedMoments.length, 7);
  assert.equal(state.missedMoments.length, 0);
  return state;
}

function runSpatialDesk(condition) {
  const state = createInitialState(condition);
  while (state.screen !== "debrief") {
    const moment = getCurrentMoment(state);
    if (moment.forcedFoyer) {
      chooseAction(state, getAvailableActions(state)[0].id);
      continue;
    }
    moveTo(state, "desk");
    const actions = getAvailableActions(state);
    assert.equal(actions.length, 1);
    chooseAction(state, actions[0].id);
  }
  assert.equal(state.attendedMoments.length, 0);
  assert.equal(state.missedMoments.length, 7);
  assert.equal(state.dramaticOutcome, "missed");
  return state;
}

const baseline = runBaseline();
assert.equal(baseline.dramaticOutcome, "public");

const spatialB = runSpatialWorkshop("b");
assert.equal(spatialB.dramaticOutcome, "public");

const spatialBMiss = runSpatialDesk("b");
assert.equal(spatialBMiss.dramaticOutcome, "missed");

const situatedC = runSpatialWorkshop("c");
assert.ok(situatedC.maxWorkBacklog > 0);
assert.ok(situatedC.workBacklog >= 0);

const situatedCWork = runSpatialDesk("c");
assert.ok(situatedCWork.workActions >= 6);
assert.ok(situatedCWork.workBacklog >= 0);

const snapshot = summariseState(situatedCWork);
assert.equal(snapshot.condition, "c");
assert.ok(Array.isArray(snapshot.missedMoments));
assert.ok(Object.hasOwn(snapshot, "engagedMomentId"));

console.log("v004 validation passed");

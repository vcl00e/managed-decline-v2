import assert from "node:assert/strict";
import { createState, learn, resolveOutcome, summary } from "../model.js";
import { ROOMS, SOLIDS, NPCS, OBJECTS, TIMED_EVENTS, OUTCOME_COPY, WORLD } from "../scenario.js";

const ids = TIMED_EVENTS.map((e) => e.id);
assert.equal(new Set(ids).size, ids.length, "timed event ids must be unique");
assert.ok(TIMED_EVENTS.every((e, i, arr) => i === 0 || e.at > arr[i-1].at), "timed events must be strictly chronological");
assert.ok(TIMED_EVENTS.some((e) => e.id === "clash"), "scenario needs a clash event");
assert.ok(Object.keys(NPCS).length >= 5, "needs a social space, not a two-person dialogue scene");
assert.ok(Object.keys(OBJECTS).includes("reel") && Object.keys(OBJECTS).includes("pack") && Object.keys(OBJECTS).includes("sideDoor"), "meaningful physical affordances must exist");
assert.ok(ROOMS.length >= 6, "continuous space needs multiple nearby areas");
assert.ok(SOLIDS.length > 10, "map requires actual collision geometry");
assert.equal(WORLD.width, 1120);
assert.equal(WORLD.height, 700);

const state = createState();
assert.equal(state.phase, "open");
learn(state, "vacant_target_monday");
assert.equal(state.flags.knowsVacantTarget, true);
assert.ok(state.knowledge.includes("vacant_target_monday"));
assert.equal(resolveOutcome(state, "formal_pause"), true);
assert.equal(resolveOutcome(state, "live_interview"), false, "outcome should resolve once, not branch retroactively");
assert.equal(state.outcome, "formal_pause");
assert.equal(state.phase, "aftermath");
assert.ok(OUTCOME_COPY[state.outcome]);

const snapshot = summary(state);
assert.notEqual(snapshot.flags, state.flags, "summary must clone flag state");
assert.deepEqual(snapshot.knowledge, state.knowledge);

for (const event of TIMED_EVENTS) {
  assert.ok(Number.isFinite(event.source.x) && Number.isFinite(event.source.y), `${event.id} needs a world source`);
  assert.ok(event.hear > 0, `${event.id} needs a hearing radius`);
  assert.ok(Array.isArray(event.lines) && event.lines.length > 0, `${event.id} needs ambient content`);
}

for (const [id, object] of Object.entries(OBJECTS)) {
  assert.ok(object.x >= 0 && object.x <= WORLD.width && object.y >= 0 && object.y <= WORLD.height, `${id} must be on map`);
}

console.log("v005 validation passed: continuous map, event chronology, physical affordances and outcome state are coherent.");

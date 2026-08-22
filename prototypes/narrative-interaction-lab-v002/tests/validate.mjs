import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  VARIANTS,
  VARIANT_ORDER,
  LOCATIONS,
  CHARACTERS,
  NODES,
  ENDING_IDS,
  OPTIONAL_OBSERVATIONS,
  DECISIVE_ACTION_IDS,
  PHONE_GESTURE_ACTION_IDS
} from "../story.js";
import {
  clone,
  createSessionState,
  getNodeView,
  getAvailableActions,
  getAvailableMapDestinations,
  chooseAction,
  enterMapLocation,
  makeTraversalKey
} from "../engine.js";

const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function wordCount(text) {
  return String(text ?? "").trim().split(/\s+/).filter(Boolean).length;
}

function allNodeActions() {
  return Object.values(NODES).flatMap((node) => node.actions ?? []);
}

function collectTargets() {
  const targets = new Set();
  for (const node of Object.values(NODES)) {
    for (const action of node.actions ?? []) {
      if (!action.next?.startsWith("@")) targets.add(action.next);
    }
  }
  return targets;
}

function traverseVariant(variantId) {
  const initial = createSessionState(variantId);
  const queue = [initial];
  let cursor = 0;
  const seen = new Set();
  const queued = new Set([makeTraversalKey(initial)]);
  const nodeIds = new Set();
  const endings = new Set();
  const deadEnds = [];
  const maxActions = { value: 0, nodeId: null };

  while (cursor < queue.length) {
    const state = queue[cursor++];
    const key = makeTraversalKey(state);
    queued.delete(key);
    if (seen.has(key)) continue;
    seen.add(key);

    if (state.endingId) {
      endings.add(state.endingId);
      continue;
    }

    if (state.screen === "map") {
      const destinations = getAvailableMapDestinations(state);
      if (destinations.length === 0) deadEnds.push(`map:${state.mapPhase}:${JSON.stringify(state.visited)}`);
      for (const destination of destinations) {
        const next = clone(state);
        enterMapLocation(next, destination.id);
        const nextKey = makeTraversalKey(next);
        if (!seen.has(nextKey) && !queued.has(nextKey)) {
          queue.push(next);
          queued.add(nextKey);
        }
      }
      continue;
    }

    if (state.screen === "debrief") continue;
    const node = getNodeView(state);
    if (!node) {
      deadEnds.push(`missing:${state.nodeId}`);
      continue;
    }
    nodeIds.add(node.id);
    const actions = getAvailableActions(state);
    if (actions.length > maxActions.value) {
      maxActions.value = actions.length;
      maxActions.nodeId = node.id;
    }
    if (actions.length === 0 && !node.endingId) deadEnds.push(node.id);
    for (const action of actions) {
      const next = clone(state);
      chooseAction(next, action.id);
      const nextKey = makeTraversalKey(next);
      if (!seen.has(nextKey) && !queued.has(nextKey)) {
        queue.push(next);
        queued.add(nextKey);
      }
    }
  }

  return { seen, nodeIds, endings, deadEnds, maxActions };
}

function runOpeningOrder(variantId, first, second) {
  const state = createSessionState(variantId);
  const visit = (locationId) => {
    enterMapLocation(state, locationId);
    let guard = 0;
    while (state.screen === "node" && !state.nodeId.startsWith("call_")) {
      const actions = getAvailableActions(state);
      check(actions.length > 0, `${variantId}: opening ${locationId} became a dead end at ${state.nodeId}`);
      const progress = actions.find((action) => action.effects?.completeOpening === locationId)
        ?? actions.find((action) => action.next === "@opening-complete")
        ?? actions.find((action) => !["observation", "material"].includes(action.kind))
        ?? actions[0];
      chooseAction(state, progress.id);
      guard += 1;
      if (guard > 30) throw new Error(`Opening route looped at ${state.nodeId}`);
      if (state.screen === "map") break;
    }
  };

  visit(first);
  check(state.screen === "map", `${variantId}: first opening ${first} did not return to map`);
  visit(second);
  const unvisited = Object.keys(LOCATIONS).find((id) => ![first, second].includes(id));
  return { state, unvisited };
}

check(Object.keys(LOCATIONS).length === 3, "Prototype must expose exactly three locations");
check(Object.keys(CHARACTERS).length === 6, "Prototype must contain exactly six named characters");
check(Object.keys(VARIANTS).length === 3, "Prototype must contain exactly three treatments");
check(VARIANT_ORDER.join(",") === "passive,observe,decisive", "Treatment order should remain passive, observe, decisive");
check(new Set(ENDING_IDS).size === 4, "Prototype must define four unique aftermaths");

for (const [nodeId, node] of Object.entries(NODES)) {
  check(node.id === nodeId, `Node key/id mismatch: ${nodeId}`);
  check(Boolean(node.title), `Node ${nodeId} is missing a title`);
  const ids = new Set();
  for (const action of node.actions ?? []) {
    check(Boolean(action.id), `Node ${nodeId} has an action without an ID`);
    check(!ids.has(action.id), `Node ${nodeId} repeats action ID ${action.id}`);
    ids.add(action.id);
    check(Boolean(action.label), `Action ${action.id} has no player-facing label`);
    check(Boolean(action.next), `Action ${action.id} has no destination`);
    if (action.next && !action.next.startsWith("@")) {
      check(Boolean(NODES[action.next]), `Action ${action.id} targets missing node ${action.next}`);
    }
    if (action.variants) {
      for (const variantId of action.variants) check(Boolean(VARIANTS[variantId]), `Action ${action.id} names unknown treatment ${variantId}`);
    }
    if (action.excludeVariants) {
      for (const variantId of action.excludeVariants) check(Boolean(VARIANTS[variantId]), `Action ${action.id} excludes unknown treatment ${variantId}`);
    }
  }

  for (const item of [...(node.prose ?? []), ...(node.lines ?? [])]) {
    if (typeof item === "object" && item.variants) {
      for (const variantId of item.variants) check(Boolean(VARIANTS[variantId]), `Node ${nodeId} text names unknown treatment ${variantId}`);
    }
  }
}

const targetIds = collectTargets();
for (const targetId of targetIds) check(Boolean(NODES[targetId]), `Missing action target ${targetId}`);

const actions = allNodeActions();
const actionIds = new Set(actions.map((action) => action.id));
for (const observation of OPTIONAL_OBSERVATIONS) {
  check(actionIds.has(observation.actionId), `Optional observation action is missing: ${observation.actionId}`);
  const action = actions.find((candidate) => candidate.id === observation.actionId);
  check(action.variants?.length === 1 && action.variants[0] === "observe", `${observation.actionId} must exist only in optional-observation treatment`);
  check(action.kind === "observation", `${observation.actionId} must be classified as an observation`);
  check(action.effects?.addObservations?.includes(observation.observationId), `${observation.actionId} must store observation ${observation.observationId}`);
  check(Boolean(actions.find((candidate) => candidate.when?.flags?.[observation.laterFlag] && candidate.variants?.includes("observe"))), `${observation.actionId} must fund later authored dialogue through ${observation.laterFlag}`);
}

check(actions.filter((action) => action.kind === "observation").length === 2, "Optional-observation treatment must add exactly two discovery actions");
check(DECISIVE_ACTION_IDS.length === 4, "Sparse decisive treatment must define exactly four climax material choices");
for (const actionId of DECISIVE_ACTION_IDS) {
  const action = actions.find((candidate) => candidate.id === actionId);
  check(Boolean(action), `Decisive material action is missing: ${actionId}`);
  check(action?.variants?.length === 1 && action.variants[0] === "decisive", `${actionId} must exist only in decisive treatment`);
  check(action?.kind === "material", `${actionId} must be classified as material`);
}
check(PHONE_GESTURE_ACTION_IDS.length === 6, "Sparse decisive treatment must expose six phone conduct gestures across three interruption states");
for (const actionId of PHONE_GESTURE_ACTION_IDS) {
  const action = actions.find((candidate) => candidate.id === actionId);
  check(Boolean(action), `Phone gesture action is missing: ${actionId}`);
  check(action?.variants?.includes("decisive"), `${actionId} must be treatment-specific to decisive action`);
  check(action?.kind === "material", `${actionId} must be classified as a material/social gesture`);
}

const traversals = {};
for (const variantId of VARIANT_ORDER) {
  const result = traverseVariant(variantId);
  traversals[variantId] = result;
  check(result.deadEnds.length === 0, `${variantId} has dead ends: ${result.deadEnds.join(", ")}`);
  check(result.maxActions.value <= 6, `${variantId} exposes ${result.maxActions.value} simultaneous actions at ${result.maxActions.nodeId}; keep support dosage and choice scanning controlled`);
  for (const endingId of ENDING_IDS) check(result.endings.has(endingId), `${variantId} cannot reach ending ${endingId}`);
}

const reachableSomewhere = new Set(VARIANT_ORDER.flatMap((variantId) => [...traversals[variantId].nodeIds]));
for (const nodeId of Object.keys(NODES)) {
  check(reachableSomewhere.has(nodeId), `Authored node is unreachable in every treatment: ${nodeId}`);
}

for (const node of Object.values(NODES)) {
  if (node.endingId) continue;
  const shouldBeReachable = VARIANT_ORDER.some((variantId) => {
    const exclusions = node.variantOnly ? !node.variantOnly.includes(variantId) : false;
    return !exclusions && traversals[variantId].nodeIds.has(node.id);
  });
  check(shouldBeReachable, `Node ${node.id} has no treatment in which it is reachable`);
}

const permutations = [
  ["hall", "pub"],
  ["hall", "bus"],
  ["pub", "hall"],
  ["pub", "bus"],
  ["bus", "hall"],
  ["bus", "pub"]
];

for (const variantId of VARIANT_ORDER) {
  for (const [first, second] of permutations) {
    const { state, unvisited } = runOpeningOrder(variantId, first, second);
    check(state.nodeId === `call_${unvisited}`, `${variantId} order ${first}>${second} should trigger call_${unvisited}, got ${state.nodeId}`);
    check(state.visited.length === 2, `${variantId} order ${first}>${second} should mark exactly two opening locations visited`);
  }
}

for (const observation of OPTIONAL_OBSERVATIONS) {
  const state = createSessionState("observe");
  enterMapLocation(state, observation.locationId);
  let guard = 0;
  while (state.nodeId !== observation.nodeId) {
    const choices = getAvailableActions(state);
    const step = choices.find((action) => action.next === observation.nodeId)
      ?? choices.find((action) => action.kind !== "observation")
      ?? choices[0];
    check(Boolean(step), `Could not route to observation node ${observation.nodeId}`);
    if (!step) break;
    chooseAction(state, step.id);
    guard += 1;
    if (guard > 20) break;
  }
  check(state.nodeId === observation.nodeId, `Failed to reach observation node ${observation.nodeId}`);
  const before = getAvailableActions(state);
  check(before.some((action) => action.id === observation.actionId), `${observation.actionId} should be offered before discovery`);
  chooseAction(state, observation.actionId);
  check(state.observations.includes(observation.observationId), `${observation.actionId} did not persist its observation`);
  check(!getAvailableActions(state).some((action) => action.id === observation.actionId), `${observation.actionId} should disappear after discovery`);
}

const allStoryText = Object.values(NODES).flatMap((node) => [
  ...(node.prose ?? []).map((item) => typeof item === "string" ? item : item.text),
  ...(node.lines ?? []).map((item) => typeof item === "string" ? item : item.text),
  ...(node.actions ?? []).map((action) => action.label)
]).join("\n");

const forbiddenStoryPatterns = [
  /quest\s*:/i,
  /objective\s*:/i,
  /\bscore\b/i,
  /\bmeter\b/i,
  /action points?/i,
  /\+\d+\s*(trust|relationship|evidence|progress)/i
];
for (const pattern of forbiddenStoryPatterns) check(!pattern.test(allStoryText), `Player-facing story text contains exposed system language: ${pattern}`);

for (const [nodeId, node] of Object.entries(NODES)) {
  const proseWords = wordCount((node.prose ?? []).map((item) => typeof item === "string" ? item : item.text).join(" "));
  const dialogueWords = wordCount((node.lines ?? []).map((item) => typeof item === "string" ? item : item.text).join(" "));
  check(proseWords <= 220, `Node ${nodeId} has ${proseWords} prose words; split or tighten the beat`);
  check(dialogueWords <= 280, `Node ${nodeId} has ${dialogueWords} dialogue words; split or tighten the beat`);
}

const appSource = await readFile(new URL("../app.js", import.meta.url), "utf8");
const htmlSource = await readFile(new URL("../index.html", import.meta.url), "utf8");
const cssSource = await readFile(new URL("../styles.css", import.meta.url), "utf8");
check(!/\bfetch\s*\(/.test(appSource), "Prototype must make no browser network requests");
check(/JSON\.stringify\(payload, null, 2\)/.test(appSource), "Trace export must remain readable indented JSON");
check(!/state-sidebar|quest-log|objective-panel|meter-panel|score-panel/i.test(`${appSource}\n${htmlSource}\n${cssSource}`), "Prototype must not implement a player-facing state, quest, objective, meter or score sidebar");
check(!/localStorage\.setItem\([^,]+,\s*JSON\.stringify\([^)]*,\s*null,\s*2\)/.test(appSource), "Local storage need not be pretty-printed, but exports must be; this check guards accidental confusion");

if (failures.length > 0) {
  console.error(`Narrative Interaction Lab v002 validation failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  const nodeCount = Object.keys(NODES).length;
  const actionCount = actions.length;
  console.log(`Validated ${nodeCount} nodes and ${actionCount} authored actions across ${VARIANT_ORDER.length} treatments.`);
  for (const variantId of VARIANT_ORDER) {
    const result = traversals[variantId];
    console.log(`- ${variantId}: ${result.nodeIds.size} reachable nodes, ${result.seen.size} reachable story states, endings ${[...result.endings].sort().join(", ")}`);
  }
  console.log("Opening-order phone interruptions, treatment isolation, optional-observation funding, aftermath coverage and no-meter constraints passed.");
}

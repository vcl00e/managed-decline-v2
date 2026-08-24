import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { NODES, START_NODE, ENDINGS } from "../story.js";
import {
  clone,
  createInitialState,
  getCurrentNode,
  getAvailableActions,
  chooseAction,
  makeTraversalKey
} from "../engine.js";

const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const words = (value) => String(value ?? "").trim().split(/\s+/).filter(Boolean).length;

function nodeText(node) {
  return [
    ...(node.prose ?? []),
    ...(node.lines ?? []).map((entry) => entry.text),
    ...(node.actions ?? []).map((action) => action.label)
  ].join(" ");
}

function traverse() {
  const initial = createInitialState();
  const queue = [{ state: initial, depth: 0, path: [] }];
  const seen = new Set();
  const endings = new Map();
  const reachableNodes = new Set();
  let maxActions = 0;
  let minEndingDepth = Infinity;

  while (queue.length) {
    const item = queue.shift();
    const key = makeTraversalKey(item.state);
    if (seen.has(key)) continue;
    seen.add(key);

    if (item.state.screen === "debrief") {
      if (item.state.endingId) {
        endings.set(item.state.endingId, item.path);
        minEndingDepth = Math.min(minEndingDepth, item.depth);
      }
      continue;
    }

    const node = getCurrentNode(item.state);
    if (!node) continue;
    reachableNodes.add(node.id);
    const actions = getAvailableActions(item.state);
    maxActions = Math.max(maxActions, actions.length);

    for (const action of actions) {
      const next = clone(item.state);
      chooseAction(next, action.id);
      queue.push({ state: next, depth: item.depth + 1, path: [...item.path, action.id] });
    }
  }

  return { endings, reachableNodes, maxActions, minEndingDepth };
}

check(Boolean(NODES[START_NODE]), "Start node is missing");
check(START_NODE === "hook", "V003 must start directly on the hook");
check(Object.keys(ENDINGS).length === 3, "V003 should expose exactly three payoff shapes");

for (const [id, node] of Object.entries(NODES)) {
  check(node.id === id, `Node key/id mismatch: ${id}`);
  check(Boolean(node.phase), `Node ${id} is missing an emotional phase`);
  check(Boolean(node.title), `Node ${id} is missing a title`);
  const ids = new Set();
  for (const action of node.actions ?? []) {
    check(Boolean(action.id), `Node ${id} has an action without an ID`);
    check(!ids.has(action.id), `Node ${id} repeats action ID ${action.id}`);
    ids.add(action.id);
    check(Boolean(action.label), `Action ${action.id} has no label`);
    check(Boolean(action.next), `Action ${action.id} has no target`);
    if (!action.next.startsWith("@")) check(Boolean(NODES[action.next]), `Action ${action.id} targets missing node ${action.next}`);
  }
}

const hook = NODES[START_NODE];
check(hook.phase === "hook", "First node must be explicitly authored as hook phase");
check(words(nodeText(hook)) <= 190, `Hook is too long before the first choice (${words(nodeText(hook))} words)`);
check(/option d/i.test(nodeText(hook)), "Hook should land the Tabitha/Option D joke before setup expands");
check(/real tabitha/i.test(nodeText(hook)), "Hook must establish that actual Tabitha is sitting beside the player immediately");

const requiredPhases = ["hook", "complicity", "delight", "escalation", "sting", "oh_shit", "choice", "payoff", "future_pull"];
const presentPhases = new Set(Object.values(NODES).map((node) => node.phase));
for (const phase of requiredPhases) check(presentPhases.has(phase), `Missing emotional phase: ${phase}`);

check(NODES.hook.actions.length === 3, "Hook should offer exactly three low-burden human responses");
check(NODES.choice.actions.length === 3, "Climax should offer exactly three materially different social positions");

const traversal = traverse();
for (const endingId of Object.keys(ENDINGS)) check(traversal.endings.has(endingId), `Ending ${endingId} is unreachable`);
for (const nodeId of Object.keys(NODES)) check(traversal.reachableNodes.has(nodeId), `Authored node is unreachable: ${nodeId}`);
check(traversal.maxActions <= 3, `Choice scanning burden is too high (${traversal.maxActions} simultaneous actions)`);
check(traversal.minEndingDepth >= 9, `A complete route can end too quickly (${traversal.minEndingDepth} decisions)`);

const storyWords = Object.values(NODES).reduce((sum, node) => sum + words([
  ...(node.prose ?? []),
  ...(node.lines ?? []).map((entry) => entry.text)
].join(" ")), 0);
check(storyWords >= 1700, `Story is probably too short for the 8–12 minute target (${storyWords} authored words)`);
check(storyWords <= 3600, `Story is probably too long for the short-form test (${storyWords} authored words)`);

const allPlayerFacing = Object.values(NODES).map(nodeText).join("\n");
for (const pattern of [/\bquest\b/i, /\bobjective\b/i, /relationship\s*meter/i, /\bscore\b/i, /the game (does|will|has|is)/i]) {
  check(!pattern.test(allPlayerFacing), `Player-facing story contains design/system language: ${pattern}`);
}

const appSource = await readFile(new URL("../app.js", import.meta.url), "utf8");
const htmlSource = await readFile(new URL("../index.html", import.meta.url), "utf8");
const cssSource = await readFile(new URL("../styles.css", import.meta.url), "utf8");
check(!/\bfetch\s*\(/.test(appSource), "Prototype must make no browser network requests");
check(/JSON\.stringify\(payload, null, 2\)/.test(appSource), "Trace export must remain readable indented JSON");
check(!/quest-log|objective-panel|relationship-meter|state-sidebar|progress-bar/i.test(`${appSource}\n${htmlSource}\n${cssSource}`), "Normal prototype UI must not expose management surfaces");

if (failures.length) {
  console.error(`Narrative Interaction Lab v003 validation failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`Validated v003: ${Object.keys(NODES).length} nodes, ${storyWords} authored story words.`);
  console.log(`Reachable endings: ${[...traversal.endings.keys()].sort().join(", ")}.`);
  console.log(`Shortest complete route: ${traversal.minEndingDepth} decisions; max simultaneous choices: ${traversal.maxActions}.`);
  console.log("Immediate hook, emotional-phase coverage, short-form length guard and no-management-UI constraints passed.");
}

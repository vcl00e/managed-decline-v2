import { SCENARIOS, VARIANT_ORDER } from "../scenarios.js";

const failures = [];
const warnings = [];

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

for (const [sliceId, slice] of Object.entries(SCENARIOS)) {
  if (slice.id !== sliceId) fail(`${sliceId}: slice.id must match registry key`);
  if (!slice.title || !slice.researchQuestion) fail(`${sliceId}: missing title or research question`);

  for (const variantId of VARIANT_ORDER) {
    const variant = slice.variants?.[variantId];
    const prefix = `${sliceId}/${variantId}`;
    if (!variant) {
      fail(`${prefix}: missing required variant`);
      continue;
    }
    if (!variant.initial || !variant.nodes?.[variant.initial]) {
      fail(`${prefix}: invalid initial node '${variant.initial}'`);
      continue;
    }
    if (!variant.hypothesis) fail(`${prefix}: missing hypothesis`);

    const meterCount = Object.keys(variant.initialState?.meters ?? {}).length;
    if (variantId === "system" && meterCount === 0) fail(`${prefix}: system-forward variant must expose meters`);
    if (variantId !== "system" && meterCount > 0) fail(`${prefix}: non-system variant should not depend on exposed meters`);

    const actionIds = new Set();
    let endingCount = 0;

    for (const [nodeId, node] of Object.entries(variant.nodes)) {
      if (node.ending) {
        endingCount += 1;
        if (!node.ending.title || !node.ending.summary) fail(`${prefix}/${nodeId}: incomplete ending`);
        continue;
      }

      if (!Array.isArray(node.text) || node.text.length === 0) fail(`${prefix}/${nodeId}: missing scene text`);
      if (!Array.isArray(node.actions) || node.actions.length === 0) fail(`${prefix}/${nodeId}: non-ending node has no actions`);

      for (const action of node.actions ?? []) {
        const actionPrefix = `${prefix}/${nodeId}/${action.id ?? "<missing-id>"}`;
        if (!action.id) fail(`${actionPrefix}: missing action ID`);
        if (actionIds.has(action.id)) fail(`${prefix}: duplicate action ID '${action.id}'`);
        actionIds.add(action.id);
        if (!action.label) fail(`${actionPrefix}: missing label`);
        if (!action.intent) warn(`${actionPrefix}: missing semantic intent`);
        if (!action.next) fail(`${actionPrefix}: missing destination`);
        else if (!variant.nodes[action.next]) fail(`${actionPrefix}: destination '${action.next}' does not exist`);
      }
    }

    if (endingCount === 0) fail(`${prefix}: no ending nodes`);

    const reached = new Set();
    const queue = [variant.initial];
    while (queue.length > 0) {
      const nodeId = queue.shift();
      if (reached.has(nodeId) || !variant.nodes[nodeId]) continue;
      reached.add(nodeId);
      for (const action of variant.nodes[nodeId].actions ?? []) queue.push(action.next);
    }

    const unreachable = Object.keys(variant.nodes).filter((nodeId) => !reached.has(nodeId));
    if (unreachable.length > 0) fail(`${prefix}: unreachable nodes: ${unreachable.join(", ")}`);

    const reachedEnding = [...reached].some((nodeId) => Boolean(variant.nodes[nodeId].ending));
    if (!reachedEnding) fail(`${prefix}: no reachable ending`);
  }
}

if (warnings.length > 0) {
  console.warn("Warnings:");
  for (const warning of warnings) console.warn(`  - ${warning}`);
}

if (failures.length > 0) {
  console.error("Validation failed:");
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exitCode = 1;
} else {
  const sliceCount = Object.keys(SCENARIOS).length;
  console.log(`Validated ${sliceCount} slices and ${sliceCount * VARIANT_ORDER.length} variants successfully.`);
}

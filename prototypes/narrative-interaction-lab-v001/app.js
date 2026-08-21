import { SCENARIOS, VARIANT_LABELS, VARIANT_ORDER, getScenario } from "./scenarios.js";

const STORAGE_KEY = "managed-decline:narrative-interaction-lab-v001:runs";
const params = new URLSearchParams(window.location.search);
const BLIND_MODE = params.get("blind") === "1";
const ANNOTATE_MODE = params.get("annotate") === "1";

const app = document.querySelector("#app");
const title = document.querySelector("#lab-title");
const subtitle = document.querySelector("#lab-subtitle");
const homeButton = document.querySelector("#home-button");
const exportButton = document.querySelector("#export-button");
const clearButton = document.querySelector("#clear-button");
const modeBadge = document.querySelector("#mode-badge");

let current = null;

function clone(value) { return structuredClone(value); }

function loadRuns() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveRuns(runs) { localStorage.setItem(STORAGE_KEY, JSON.stringify(runs)); }

function makeId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function nowIso() { return new Date().toISOString(); }
function elapsedMs(run) { return Date.now() - new Date(run.startedAt).getTime(); }

function recordRun(run) {
  const runs = loadRuns();
  const index = runs.findIndex((item) => item.id === run.id);
  if (index >= 0) runs[index] = run;
  else runs.push(run);
  saveRuns(runs);
}

function summariseState(state) {
  return {
    position: state.position,
    inventory: [...state.inventory],
    evidence: [...state.evidence],
    residue: [...state.residue],
    meters: { ...state.meters },
    flags: { ...state.flags }
  };
}

function startRun(sliceId, variantId) {
  const found = getScenario(sliceId, variantId);
  if (!found) {
    renderHome();
    return;
  }

  const { slice, variant } = found;
  const state = clone(variant.initialState);
  current = {
    slice,
    variant,
    sliceId,
    variantId,
    nodeId: variant.initial,
    state,
    run: {
      schemaVersion: 1,
      prototype: "narrative-interaction-lab-v001",
      id: makeId(),
      sliceId,
      variantId,
      blindMode: BLIND_MODE,
      annotationMode: ANNOTATE_MODE,
      startedAt: nowIso(),
      endedAt: null,
      abandonedAt: null,
      steps: [],
      debrief: null,
      finalState: null
    }
  };

  title.textContent = slice.title;
  subtitle.textContent = BLIND_MODE
    ? `${VARIANT_LABELS[variantId].blind} · comparative prototype`
    : `${VARIANT_LABELS[variantId].public} · ${slice.researchQuestion}`;
  setUrl(sliceId, variantId);
  renderNode();
}

function setUrl(sliceId = null, variantId = null) {
  const next = new URL(window.location.href);
  if (sliceId && variantId) {
    next.searchParams.set("slice", sliceId);
    next.searchParams.set("variant", variantId);
  } else {
    next.searchParams.delete("slice");
    next.searchParams.delete("variant");
  }
  window.history.replaceState({}, "", next);
}

function abandonCurrentRun() {
  if (!current || current.run.endedAt || current.run.abandonedAt) return;
  current.run.abandonedAt = nowIso();
  current.run.finalState = summariseState(current.state);
  recordRun(current.run);
}

function renderHome() {
  abandonCurrentRun();
  current = null;
  setUrl();
  title.textContent = "Narrative Interaction Lab";
  subtitle.textContent = "Three narrative slices × three interaction philosophies";

  const runs = loadRuns();
  const runCount = (sliceId, variantId) => runs.filter((run) => run.sliceId === sliceId && run.variantId === variantId && run.endedAt).length;

  app.innerHTML = `
    <main class="home-shell">
      <section class="intro-panel panel">
        <div>
          <p class="eyebrow">Managed Decline · Prototype v001</p>
          <h2>Compare the same narrative purpose under three interaction models.</h2>
          <p>
            These are not production systems or final story content. They are controlled experiments for deciding when interaction strengthens a narrative, when dialogue alone is better, and when mechanics distort the game’s values.
          </p>
        </div>
        <div class="mode-notes">
          <span class="chip">No dependencies</span>
          <span class="chip">Local-only telemetry</span>
          <span class="chip">Exportable traces</span>
          <span class="chip">Keyboard accessible</span>
        </div>
      </section>

      <section class="variant-key panel" aria-label="Prototype versions">
        ${VARIANT_ORDER.map((variantId) => {
          const label = BLIND_MODE ? VARIANT_LABELS[variantId].blind : VARIANT_LABELS[variantId].public;
          const explanation = {
            baseline: "Authored dialogue with minimal physical handling.",
            support: "Presence, expression, material ritual and visible residue.",
            system: "A deliberately stronger game system used as a dilution stress test."
          }[variantId];
          return `<div><strong>${label}</strong><span>${BLIND_MODE ? "Interaction comparison" : explanation}</span></div>`;
        }).join("")}
      </section>

      <section class="slice-grid">
        ${Object.values(SCENARIOS).map((slice) => `
          <article class="slice-card panel colour-${slice.colour}">
            <p class="eyebrow">${escapeHtml(slice.id)}</p>
            <h3>${escapeHtml(slice.title)}</h3>
            <p>${escapeHtml(slice.subtitle)}</p>
            ${ANNOTATE_MODE ? `<aside class="annotation"><strong>Research question</strong>${escapeHtml(slice.researchQuestion)}</aside>` : ""}
            <div class="variant-buttons">
              ${VARIANT_ORDER.map((variantId) => {
                const label = BLIND_MODE ? VARIANT_LABELS[variantId].blind : VARIANT_LABELS[variantId].public;
                return `
                  <button class="variant-button" data-start-slice="${slice.id}" data-start-variant="${variantId}">
                    <span>${escapeHtml(label)}</span>
                    <small>${runCount(slice.id, variantId)} completed run${runCount(slice.id, variantId) === 1 ? "" : "s"}</small>
                  </button>`;
              }).join("")}
            </div>
          </article>
        `).join("")}
      </section>

      <section class="panel research-links">
        <div>
          <h3>Recommended test order</h3>
          <p>Counterbalance order between testers. Use <code>?blind=1</code> to hide descriptive variant names. Use <code>?annotate=1</code> for design annotations.</p>
        </div>
        <div>
          <h3>Stored sessions</h3>
          <p>${runs.length} local run record${runs.length === 1 ? "" : "s"}. Nothing leaves this browser unless exported.</p>
        </div>
      </section>
    </main>`;

  app.querySelectorAll("[data-start-slice]").forEach((button) => {
    button.addEventListener("click", () => startRun(button.dataset.startSlice, button.dataset.startVariant));
  });
}

function nodeIsAvailable(action, state) {
  const required = action.requires ?? {};
  const excluded = action.excludes ?? {};

  if (required.flags) {
    for (const [key, value] of Object.entries(required.flags)) {
      if (state.flags[key] !== value) return false;
    }
  }
  if (required.anyInventory) {
    if (!required.anyInventory.some((item) => state.inventory.includes(item))) return false;
  }
  if (required.inventory) {
    if (!required.inventory.every((item) => state.inventory.includes(item))) return false;
  }
  if (required.evidence) {
    if (!required.evidence.every((item) => state.evidence.includes(item))) return false;
  }
  if (excluded.flags) {
    for (const [key, value] of Object.entries(excluded.flags)) {
      if (state.flags[key] === value) return false;
    }
  }
  return true;
}

function applyEffects(effects = {}, state) {
  if (effects.setFlags) Object.assign(state.flags, effects.setFlags);
  if (effects.position) state.position = effects.position;

  for (const item of effects.addInventory ?? []) {
    if (!state.inventory.includes(item)) state.inventory.push(item);
  }
  for (const item of effects.removeInventory ?? []) {
    state.inventory = state.inventory.filter((existing) => existing !== item);
  }
  for (const item of effects.addEvidence ?? []) {
    if (!state.evidence.includes(item)) state.evidence.push(item);
  }
  for (const item of effects.addResidue ?? []) {
    if (!state.residue.includes(item)) state.residue.push(item);
  }
  for (const [key, delta] of Object.entries(effects.adjustMeters ?? {})) {
    state.meters[key] = (state.meters[key] ?? 0) + delta;
  }
}

function chooseAction(action, node) {
  if (!current) return;
  const before = summariseState(current.state);
  applyEffects(action.effects, current.state);
  const after = summariseState(current.state);

  current.run.steps.push({
    index: current.run.steps.length,
    at: nowIso(),
    elapsedMs: elapsedMs(current.run),
    nodeId: current.nodeId,
    speaker: node.speaker ?? null,
    actionId: action.id,
    label: action.label,
    intent: action.intent ?? null,
    before,
    after
  });

  current.nodeId = action.next;
  renderNode();
}

function renderNode() {
  if (!current) return;
  const node = current.variant.nodes[current.nodeId];
  if (!node) {
    app.innerHTML = `<main class="fatal panel"><h2>Prototype data error</h2><p>Missing node: <code>${escapeHtml(current.nodeId)}</code></p></main>`;
    return;
  }

  if (node.ending) {
    renderEnding(node.ending);
    return;
  }

  const availableActions = (node.actions ?? []).filter((action) => nodeIsAvailable(action, current.state));
  const variantLabel = BLIND_MODE ? VARIANT_LABELS[current.variantId].blind : VARIANT_LABELS[current.variantId].public;

  app.innerHTML = `
    <main class="play-shell colour-${current.slice.colour}">
      <section class="scene-column">
        <div class="scene-header panel">
          <div>
            <p class="eyebrow">${escapeHtml(current.slice.title)} · ${escapeHtml(variantLabel)}</p>
            <h2>${escapeHtml(node.location ?? current.slice.title)}</h2>
          </div>
          <time>${escapeHtml(node.time ?? "")}</time>
        </div>

        ${renderWorld(node.world)}

        <article class="dialogue-panel panel" aria-live="polite">
          <header>
            <span class="speaker">${escapeHtml(node.speaker ?? "Scene")}</span>
            ${current.state.position ? `<span class="position-note">You: ${escapeHtml(positionLabel(node.world, current.state.position))}</span>` : ""}
          </header>
          <div class="prose">
            ${(node.text ?? []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
          </div>
        </article>

        <section class="actions" aria-label="Available actions">
          ${availableActions.map((action, index) => `
            <button class="action-button" data-action-index="${index}">
              <span class="action-index">${index + 1}</span>
              <span class="action-copy">
                <strong>${escapeHtml(action.label)}</strong>
                ${ANNOTATE_MODE && action.intent ? `<small>${escapeHtml(action.intent)}</small>` : ""}
              </span>
            </button>
          `).join("")}
          ${availableActions.length === 0 ? `<p class="empty-state">No valid action is available. This indicates a prototype data error.</p>` : ""}
        </section>
      </section>

      <aside class="state-column">
        ${ANNOTATE_MODE ? `
          <section class="panel annotation-panel">
            <p class="eyebrow">Design annotation</p>
            <p>${escapeHtml(current.variant.hypothesis)}</p>
          </section>` : ""}
        ${renderMeters(current.state.meters)}
        ${renderStateList("Evidence", current.state.evidence, "What this protagonist has observed or retained")}
        ${renderStateList("Objects", current.state.inventory, "Material things currently held or saved")}
        ${renderStateList("Residue so far", current.state.residue, "Persistent traces already created")}
        <section class="panel trace-panel">
          <p class="eyebrow">Run trace</p>
          <p>${current.run.steps.length} choice${current.run.steps.length === 1 ? "" : "s"} · ${formatDuration(elapsedMs(current.run))}</p>
          <details>
            <summary>Recent actions</summary>
            <ol>
              ${current.run.steps.slice(-5).map((step) => `<li>${escapeHtml(step.label)}</li>`).join("") || "<li>None yet</li>"}
            </ol>
          </details>
        </section>
      </aside>
    </main>`;

  app.querySelectorAll("[data-action-index]").forEach((button) => {
    button.addEventListener("click", () => chooseAction(availableActions[Number(button.dataset.actionIndex)], node));
  });

  const firstAction = app.querySelector("[data-action-index]");
  firstAction?.focus({ preventScroll: true });
}

function renderWorld(world) {
  if (!world) return "";
  const people = world.people ?? [];
  const zones = world.zones ?? [];

  return `
    <section class="world-panel panel tone-${escapeHtml(world.tone ?? "neutral")}" aria-label="Current physical scene">
      <header>
        <div>
          <p class="eyebrow">Physical scene</p>
          <h3>${escapeHtml(world.name)}</h3>
        </div>
        <p>${escapeHtml(world.description ?? "")}</p>
      </header>
      <div class="world-zones">
        ${zones.map((zone) => {
          const occupants = people.filter((person) => person.zone === zone.id);
          const playerHere = current?.state.position === zone.id;
          return `
            <div class="world-zone ${playerHere ? "player-here" : ""}">
              <strong>${escapeHtml(zone.label)}</strong>
              <small>${escapeHtml(zone.note ?? "")}</small>
              <div class="tokens">
                ${occupants.map((person) => `<span class="person-token" title="${escapeHtml(person.mood ?? "")}">${escapeHtml(person.name)}</span>`).join("")}
                ${playerHere ? `<span class="player-token">You</span>` : ""}
              </div>
            </div>`;
        }).join("")}
      </div>
    </section>`;
}

function positionLabel(world, id) {
  return world?.zones?.find((zone) => zone.id === id)?.label ?? id;
}

function renderMeters(meters) {
  const entries = Object.entries(meters ?? {});
  if (entries.length === 0) return "";
  const max = Math.max(5, ...entries.map(([, value]) => Math.abs(value)));
  return `
    <section class="panel meter-panel">
      <p class="eyebrow">Exposed system state</p>
      <p class="meter-warning">These visible values are intentional only in the system-forward stress tests.</p>
      ${entries.map(([key, value]) => {
        const width = Math.max(0, Math.min(100, (Math.max(0, value) / max) * 100));
        return `
          <div class="meter-row">
            <div><span>${escapeHtml(humanise(key))}</span><strong>${value}</strong></div>
            <div class="meter-track"><span style="width:${width}%"></span></div>
          </div>`;
      }).join("")}
    </section>`;
}

function renderStateList(titleText, items, helper) {
  if (!items?.length) return "";
  return `
    <section class="panel state-list">
      <p class="eyebrow">${escapeHtml(titleText)}</p>
      <small>${escapeHtml(helper)}</small>
      <ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    </section>`;
}

function renderEnding(ending) {
  if (!current) return;
  if (!current.run.endedAt) {
    current.run.endedAt = nowIso();
    current.run.finalState = summariseState(current.state);
    current.run.ending = clone(ending);
    recordRun(current.run);
  }

  const combinedResidue = [...new Set([...(ending.residues ?? []), ...current.state.residue])];
  const nextVariantId = VARIANT_ORDER[(VARIANT_ORDER.indexOf(current.variantId) + 1) % VARIANT_ORDER.length];
  const variantLabel = BLIND_MODE ? VARIANT_LABELS[current.variantId].blind : VARIANT_LABELS[current.variantId].public;

  app.innerHTML = `
    <main class="ending-shell colour-${current.slice.colour}">
      <section class="ending-card panel">
        <p class="eyebrow">${escapeHtml(current.slice.title)} · ${escapeHtml(variantLabel)}</p>
        <h2>${escapeHtml(ending.title)}</h2>
        <p class="ending-summary">${escapeHtml(ending.summary)}</p>
        <div class="residue-box">
          <h3>What remains</h3>
          <ul>${combinedResidue.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </div>
        <p class="run-meta">${current.run.steps.length} decisions · ${formatDuration(new Date(current.run.endedAt).getTime() - new Date(current.run.startedAt).getTime())}</p>
      </section>

      <section class="debrief panel">
        <div class="debrief-header">
          <div>
            <p class="eyebrow">Tester debrief</p>
            <h3>Record immediate impressions before comparing versions.</h3>
          </div>
          <span class="chip">Stored locally</span>
        </div>

        <div class="rating-grid">
          ${[
            ["presence", "I felt present in the scene"],
            ["comprehension", "I understood people and causality"],
            ["agency", "My conduct felt meaningfully mine"],
            ["pull", "I wanted to see the aftermath"],
            ["burden", "The interaction burden was excessive"]
          ].map(([key, label]) => ratingControl(key, label)).join("")}
        </div>

        <label class="notes-field">
          <span>What happened, what mattered, and where did the interaction help or interfere?</span>
          <textarea id="debrief-notes" rows="7" placeholder="Use the player’s own words where possible."></textarea>
        </label>

        <details class="question-list">
          <summary>Suggested interview questions</summary>
          <ol>${current.slice.debrief.map((question) => `<li>${escapeHtml(question)}</li>`).join("")}</ol>
        </details>

        <div class="ending-actions">
          <button id="save-debrief" class="primary-button">Save debrief and return to lab</button>
          <button id="replay-run" class="secondary-button">Replay this version</button>
          <button id="next-version" class="secondary-button">Try ${escapeHtml(BLIND_MODE ? VARIANT_LABELS[nextVariantId].blind : VARIANT_LABELS[nextVariantId].public)}</button>
        </div>
      </section>
    </main>`;

  document.querySelector("#save-debrief")?.addEventListener("click", () => {
    saveDebrief();
    renderHome();
  });
  document.querySelector("#replay-run")?.addEventListener("click", () => {
    saveDebrief();
    startRun(current.sliceId, current.variantId);
  });
  document.querySelector("#next-version")?.addEventListener("click", () => {
    const sliceId = current.sliceId;
    saveDebrief();
    startRun(sliceId, nextVariantId);
  });
}

function ratingControl(key, label) {
  return `
    <fieldset class="rating-control" data-rating-key="${key}">
      <legend>${escapeHtml(label)}</legend>
      <div>
        ${[1, 2, 3, 4, 5].map((value) => `
          <label>
            <input type="radio" name="rating-${key}" value="${value}">
            <span>${value}</span>
          </label>`).join("")}
      </div>
      <small>1 = not at all · 5 = strongly</small>
    </fieldset>`;
}

function saveDebrief() {
  if (!current) return;
  const ratings = {};
  document.querySelectorAll(".rating-control").forEach((control) => {
    const selected = control.querySelector("input:checked");
    ratings[control.dataset.ratingKey] = selected ? Number(selected.value) : null;
  });
  current.run.debrief = {
    savedAt: nowIso(),
    ratings,
    notes: document.querySelector("#debrief-notes")?.value.trim() ?? ""
  };
  recordRun(current.run);
}

function exportRuns() {
  const payload = {
    schemaVersion: 1,
    prototype: "narrative-interaction-lab-v001",
    exportedAt: nowIso(),
    blindMode: BLIND_MODE,
    runs: loadRuns()
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `managed-decline-narrative-lab-${new Date().toISOString().replaceAll(":", "-")}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function clearRuns() {
  const count = loadRuns().length;
  if (count === 0) return;
  if (!window.confirm(`Delete ${count} locally stored run record${count === 1 ? "" : "s"}?`)) return;
  localStorage.removeItem(STORAGE_KEY);
  if (!current) renderHome();
}

function formatDuration(ms) {
  const seconds = Math.max(0, Math.round(ms / 1000));
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ${seconds % 60}s`;
}

function humanise(value) {
  return value.replace(/([a-z])([A-Z])/g, "$1 $2").replaceAll("_", " ").replace(/^./, (character) => character.toUpperCase());
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

homeButton.addEventListener("click", renderHome);
exportButton.addEventListener("click", exportRuns);
clearButton.addEventListener("click", clearRuns);

modeBadge.textContent = BLIND_MODE ? "Blind comparison" : ANNOTATE_MODE ? "Annotated research mode" : "Prototype mode";

window.addEventListener("keydown", (event) => {
  if (!current || event.altKey || event.ctrlKey || event.metaKey) return;
  const number = Number(event.key);
  if (!Number.isInteger(number) || number < 1 || number > 9) return;
  const button = app.querySelector(`[data-action-index="${number - 1}"]`);
  if (button) {
    event.preventDefault();
    button.click();
  }
});

window.addEventListener("beforeunload", () => abandonCurrentRun());

const initialSlice = params.get("slice");
const initialVariant = params.get("variant");
if (initialSlice && initialVariant && getScenario(initialSlice, initialVariant)) startRun(initialSlice, initialVariant);
else renderHome();

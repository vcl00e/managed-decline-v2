import {
  PROTOTYPE_ID,
  STORY_TITLE,
  STORY_SUBTITLE,
  VARIANTS,
  VARIANT_ORDER,
  VARIANT_ORDERS,
  LOCATIONS,
  CHARACTERS,
  DEBRIEF_QUESTIONS,
  ENDING_COPY
} from "./story.js";
import {
  clone,
  createSessionState,
  getNodeView,
  getMapView,
  chooseAction,
  enterMapLocation,
  summariseState,
  getVariantDescriptor
} from "./engine.js";

const STORAGE_KEY = "managed-decline:narrative-interaction-lab-v002:runs";
const params = new URLSearchParams(window.location.search);
const BLIND_MODE = params.get("blind") === "1";
const ANNOTATE_MODE = params.get("annotate") === "1";
const requestedOrder = (params.get("order") ?? "ABC").toUpperCase();
const DISPLAY_ORDER = VARIANT_ORDERS[requestedOrder] ?? VARIANT_ORDER;

const app = document.querySelector("#app");
const title = document.querySelector("#lab-title");
const subtitle = document.querySelector("#lab-subtitle");
const homeButton = document.querySelector("#home-button");
const exportButton = document.querySelector("#export-button");
const clearButton = document.querySelector("#clear-button");
const modeBadge = document.querySelector("#mode-badge");

let current = null;

function nowIso() {
  return new Date().toISOString();
}

function makeId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function loadRuns() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveRuns(runs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(runs));
}

function recordRun(run) {
  const runs = loadRuns();
  const index = runs.findIndex((item) => item.id === run.id);
  if (index >= 0) runs[index] = run;
  else runs.push(run);
  saveRuns(runs);
}

function elapsedMs() {
  if (!current) return 0;
  return Date.now() - new Date(current.run.startedAt).getTime();
}

function treatmentLabel(variantId, mode = "public") {
  const descriptor = VARIANTS[variantId];
  if (!descriptor) return variantId;
  return BLIND_MODE || mode === "blind" ? descriptor.blind : descriptor.public;
}

function setUrl(variantId = null) {
  const next = new URL(window.location.href);
  if (variantId) next.searchParams.set("variant", variantId);
  else next.searchParams.delete("variant");
  window.history.replaceState({}, "", next);
}

function createRun(variantId) {
  return {
    schemaVersion: 2,
    prototype: PROTOTYPE_ID,
    id: makeId(),
    variantId,
    variantLabel: treatmentLabel(variantId),
    blindMode: BLIND_MODE,
    annotationMode: ANNOTATE_MODE,
    displayedOrder: [...DISPLAY_ORDER],
    startedAt: nowIso(),
    endedAt: null,
    abandonedAt: null,
    steps: [],
    endingId: null,
    finalState: null,
    debrief: null
  };
}

function startRun(variantId) {
  const descriptor = getVariantDescriptor(variantId);
  if (!descriptor) {
    renderHome();
    return;
  }

  abandonCurrentRun();
  current = {
    variantId,
    descriptor,
    state: createSessionState(variantId),
    run: createRun(variantId)
  };

  title.textContent = STORY_TITLE;
  subtitle.textContent = `${treatmentLabel(variantId)} · ${STORY_SUBTITLE}`;
  setUrl(variantId);
  renderCurrent();
}

function abandonCurrentRun() {
  if (!current || current.run.endedAt || current.run.abandonedAt) return;
  current.run.abandonedAt = nowIso();
  current.run.finalState = summariseState(current.state);
  recordRun(current.run);
}

function recordStep(kind, details, before, after) {
  if (!current) return;
  current.run.steps.push({
    index: current.run.steps.length,
    at: nowIso(),
    elapsedMs: elapsedMs(),
    kind,
    ...details,
    before,
    after
  });
}

function performAction(action) {
  if (!current) return;
  const node = getNodeView(current.state);
  const before = summariseState(current.state);
  chooseAction(current.state, action.id);
  const after = summariseState(current.state);
  const kind = action.kind ?? (action.variants?.includes("observe") ? "observation" : "dialogue");
  recordStep(kind, {
    nodeId: node?.id ?? null,
    locationId: node?.locationId ?? null,
    actionId: action.id,
    label: action.label,
    intent: action.intent ?? null
  }, before, after);
  renderCurrent();
}

function visitLocation(locationId) {
  if (!current) return;
  const before = summariseState(current.state);
  enterMapLocation(current.state, locationId);
  const after = summariseState(current.state);
  recordStep("map", {
    locationId,
    actionId: `visit-${locationId}`,
    label: `Go to ${LOCATIONS[locationId].short}`,
    intent: `Choose to give attention to ${LOCATIONS[locationId].short}`
  }, before, after);
  renderCurrent();
}

function renderCurrent() {
  if (!current) {
    renderHome();
    return;
  }

  if (current.state.screen === "map") {
    renderMap();
    return;
  }
  if (current.state.screen === "debrief") {
    renderDebrief();
    return;
  }
  renderNode();
}

function renderHome() {
  abandonCurrentRun();
  current = null;
  setUrl();
  title.textContent = "Narrative Interaction Lab v002";
  subtitle.textContent = "Long-form rhythm and support dosage";

  const runs = loadRuns();
  const completedCount = (variantId) => runs.filter((run) => run.variantId === variantId && run.endedAt).length;
  const abandonedCount = (variantId) => runs.filter((run) => run.variantId === variantId && run.abandonedAt).length;

  app.innerHTML = `
    <main class="home-shell">
      <section class="hero-panel panel">
        <div>
          <p class="eyebrow">Managed Decline · Prototype v002</p>
          <h1>${escapeHtml(STORY_TITLE)}</h1>
          <p class="hero-copy">${escapeHtml(STORY_SUBTITLE)}</p>
          <p>
            Leave work with an unclaimed evening. Three places are active on Moor Lane; choose what interests you, let the situations converge, and live with what remains. There is no announced objective and no correct ending.
          </p>
        </div>
        <div class="hero-facts">
          <span>1 compact lane</span>
          <span>3 locations</span>
          <span>6 characters</span>
          <span>4 aftermaths</span>
          <span>local-only traces</span>
        </div>
      </section>

      <section class="treatment-grid" aria-label="Prototype treatments">
        ${DISPLAY_ORDER.map((variantId) => {
          const descriptor = VARIANTS[variantId];
          const complete = completedCount(variantId);
          const abandoned = abandonedCount(variantId);
          return `
            <article class="treatment-card panel treatment-${escapeHtml(variantId)}">
              <p class="eyebrow">${escapeHtml(treatmentLabel(variantId))}</p>
              <h2>${escapeHtml(BLIND_MODE ? `Long-form treatment ${descriptor.code}` : descriptor.summary)}</h2>
              <p>${escapeHtml(BLIND_MODE ? "The same evening under a controlled interaction treatment." : descriptor.description)}</p>
              ${ANNOTATE_MODE ? `<aside class="annotation"><strong>Hypothesis</strong>${escapeHtml(descriptor.hypothesis)}</aside>` : ""}
              <div class="treatment-meta">
                <span>${complete} completed</span>
                <span>${abandoned} abandoned</span>
              </div>
              <button class="primary-button" type="button" data-start-variant="${escapeHtml(variantId)}">Begin ${escapeHtml(treatmentLabel(variantId))}</button>
            </article>`;
        }).join("")}
      </section>

      <section class="panel research-panel">
        <div>
          <p class="eyebrow">What this version tests</p>
          <h2>Can dialogue remain the game across a full evening?</h2>
        </div>
        <ul>
          <li>dialogue fatigue and long-form rhythm;</li>
          <li>whether voluntary map sequencing creates intention rather than dead travel;</li>
          <li>whether optional observation is noticed, funded and worth its affordance debt;</li>
          <li>whether one sparse physical commitment improves memory and ownership;</li>
          <li>whether places, movements, objects and aftermath survive in memory.</li>
        </ul>
      </section>

      <section class="panel cast-strip" aria-label="Characters in the evening">
        ${Object.values(CHARACTERS).map((character) => `
          <div>
            <span class="cast-initial">${escapeHtml(character.initials)}</span>
            <strong>${escapeHtml(character.name)}</strong>
            <small>${escapeHtml(character.role)}</small>
          </div>`).join("")}
      </section>

      <section class="panel local-data-panel">
        <div>
          <p class="eyebrow">Local research data</p>
          <p>${runs.length} run record${runs.length === 1 ? "" : "s"} stored in this browser. Exports are readable JSON and are never transmitted automatically.</p>
        </div>
        <code>?blind=1 · ?annotate=1 · ?order=BCA</code>
      </section>
    </main>`;

  app.querySelectorAll("[data-start-variant]").forEach((button) => {
    button.addEventListener("click", () => startRun(button.dataset.startVariant));
  });
}

function renderMap() {
  if (!current) return;
  const view = getMapView(current.state);
  const available = view.locations.filter((location) => location.available);
  const visitedLabels = current.state.visited.map((id) => LOCATIONS[id].short);

  app.innerHTML = `
    <main class="map-shell">
      <section class="map-intro panel">
        <div>
          <p class="eyebrow">${escapeHtml(treatmentLabel(current.variantId))}</p>
          <h1>${escapeHtml(view.heading)}</h1>
          <p>${current.state.openingCount === 0
            ? "Work is behind you. Nothing on the lane has yet become your responsibility."
            : current.state.openingCount === 1
              ? `You have been to ${escapeHtml(visitedLabels[0])}. The evening remains open.`
              : "The separate situations have begun to overlap."}</p>
        </div>
        <time>${current.state.openingCount === 0 ? "17:38" : current.state.openingCount === 1 ? "18:14" : "18:56"}</time>
      </section>

      <section class="lane-panel panel" aria-label="Moor Lane diorama map">
        ${renderLaneSvg(view.locations)}
        <div class="map-cards">
          ${view.locations.map((location) => `
            <article class="map-card ${location.available ? "available" : "unavailable"} ${location.visited ? "visited" : ""}">
              <div>
                <p class="eyebrow">${escapeHtml(location.kicker)}</p>
                <h2>${escapeHtml(location.name)}</h2>
                <p>${escapeHtml(location.status)}</p>
              </div>
              <div class="map-card-footer">
                <span>${location.people.map((personId) => escapeHtml(CHARACTERS[personId].name)).join(" · ")}</span>
                ${location.available
                  ? `<button type="button" class="map-button" data-location-id="${escapeHtml(location.id)}">Go there</button>`
                  : `<small>${location.visited ? "Already visited" : "Not currently available"}</small>`}
              </div>
            </article>`).join("")}
        </div>
      </section>

      <section class="map-footer panel">
        <p><strong>${available.length}</strong> place${available.length === 1 ? "" : "s"} currently available.</p>
        <p>No route is designated as the main story.</p>
      </section>
    </main>`;

  app.querySelectorAll("[data-location-id]").forEach((button) => {
    button.addEventListener("click", () => visitLocation(button.dataset.locationId));
  });
}

function renderNode() {
  if (!current) return;
  const node = getNodeView(current.state);
  if (!node) {
    app.innerHTML = `<main class="fatal panel"><h1>Prototype data error</h1><p>Missing node: <code>${escapeHtml(current.state.nodeId)}</code></p></main>`;
    return;
  }

  if (node.endingId) {
    renderEnding(node);
    return;
  }

  const speakerId = node.speaker && CHARACTERS[node.speaker] ? node.speaker : null;
  const speaker = speakerId ? CHARACTERS[speakerId] : null;
  const location = node.locationId ? LOCATIONS[node.locationId] : null;
  const actions = node.actions ?? [];

  app.innerHTML = `
    <main class="scene-shell tone-${escapeHtml(node.tone ?? "neutral")}">
      <section class="scene-stage panel">
        <header class="scene-stage-header">
          <div>
            <p class="eyebrow">${escapeHtml(location?.name ?? "Moor Lane")}</p>
            <h1>${escapeHtml(node.title)}</h1>
          </div>
          <time>${escapeHtml(node.time ?? "")}</time>
        </header>
        ${renderStage(node)}
      </section>

      <section class="narrative-column">
        ${node.prose?.length ? `
          <article class="prose-panel panel">
            ${node.prose.map((paragraph) => renderParagraph(paragraph)).join("")}
          </article>` : ""}

        ${node.lines?.length ? `
          <article class="dialogue-panel panel">
            ${node.lines.map((line) => renderLine(line)).join("")}
          </article>` : ""}

        ${ANNOTATE_MODE && node.annotation ? `
          <aside class="annotation panel">
            <strong>Design annotation</strong>
            <p>${escapeHtml(node.annotation)}</p>
          </aside>` : ""}

        <section class="actions" aria-label="Available responses">
          ${actions.map((action, index) => `
            <button type="button" class="action-button kind-${escapeHtml(action.kind ?? "dialogue")}" data-action-id="${escapeHtml(action.id)}">
              <span class="action-index">${index + 1}</span>
              <span class="action-copy">
                <strong>${escapeHtml(action.label)}</strong>
                ${ANNOTATE_MODE && action.intent ? `<small>${escapeHtml(action.intent)}</small>` : ""}
              </span>
            </button>`).join("")}
          ${actions.length === 0 ? `<p class="empty-state">No valid action is available. This indicates a prototype data error.</p>` : ""}
        </section>
      </section>

      <aside class="scene-aside">
        ${speaker ? `
          <section class="speaker-card panel">
            <span class="portrait portrait-${escapeHtml(speaker.id)}">${escapeHtml(speaker.initials)}</span>
            <div>
              <p class="eyebrow">Speaking</p>
              <h2>${escapeHtml(speaker.name)}</h2>
              <p>${escapeHtml(speaker.role)}</p>
            </div>
          </section>` : ""}
        <section class="quiet-trace panel">
          <p class="eyebrow">This evening</p>
          <p>${current.run.steps.length} decision${current.run.steps.length === 1 ? "" : "s"} · ${formatDuration(elapsedMs())}</p>
          <details>
            <summary>Recent conduct</summary>
            <ol>${current.run.steps.slice(-5).map((step) => `<li>${escapeHtml(step.label)}</li>`).join("") || "<li>Nothing yet</li>"}</ol>
          </details>
        </section>
        ${ANNOTATE_MODE ? renderResearchState() : ""}
      </aside>
    </main>`;

  app.querySelectorAll("[data-action-id]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = actions.find((candidate) => candidate.id === button.dataset.actionId);
      if (action) performAction(action);
    });
  });

  app.querySelector("[data-action-id]")?.focus({ preventScroll: true });
}

function renderParagraph(paragraph) {
  if (typeof paragraph === "string") return `<p>${escapeHtml(paragraph)}</p>`;
  return `<p class="conditional-text">${escapeHtml(paragraph.text)}</p>`;
}

function renderLine(line) {
  if (typeof line === "string") return `<p>${escapeHtml(line)}</p>`;
  const character = line.speaker ? CHARACTERS[line.speaker] : null;
  return `
    <div class="dialogue-line ${line.aside ? "aside-line" : ""}">
      <strong>${escapeHtml(character?.name ?? line.label ?? "Scene")}</strong>
      <p>${escapeHtml(line.text)}</p>
    </div>`;
}

function renderStage(node) {
  const cast = node.cast ?? [];
  const locationId = node.locationId ?? "lane";
  return `
    <div class="stage-visual stage-${escapeHtml(locationId)}">
      <div class="stage-weather"></div>
      <div class="stage-landmark">${renderLandmark(locationId, node)}</div>
      <div class="stage-people">
        ${cast.map((personId, index) => {
          const character = CHARACTERS[personId];
          return `<div class="stage-person person-${escapeHtml(personId)} position-${index % 5}" title="${escapeHtml(character.name)}"><span>${escapeHtml(character.initials)}</span><small>${escapeHtml(character.name)}</small></div>`;
        }).join("")}
        <div class="stage-person player-person position-player"><span>You</span><small>Player</small></div>
      </div>
      <div class="stage-caption">${escapeHtml(node.stage ?? locationId === "hall" ? "Bellwether Rooms" : locationId === "pub" ? "Crown & Anchor" : locationId === "bus" ? "Moor Lane Stop" : "Moor Lane")}</div>
    </div>`;
}

function renderLandmark(locationId, node) {
  const icon = {
    hall: `<div class="mini-building hall-building"><div class="roof"></div><div class="windows"><i></i><i></i><i></i></div><div class="door"></div><div class="notice green-notice"></div></div>`,
    pub: `<div class="mini-building pub-building"><div class="roof"></div><div class="sign">CROWN &amp; ANCHOR</div><div class="windows"><i></i><i></i></div><div class="door"></div><div class="notice white-placard"></div></div>`,
    bus: `<div class="bus-stop"><div class="glass"></div><div class="bench"></div><div class="roundel">M</div><div class="coat-shape"></div></div>`,
    lane: `<div class="lane-cluster"><span class="hall-dot"></span><span class="pub-dot"></span><span class="bus-dot"></span></div>`
  }[locationId] ?? `<div class="lane-cluster"></div>`;
  const key = node.id?.includes("key") || node.id?.includes("after") ? `<span class="brass-key">⌁</span>` : "";
  return `${icon}${key}`;
}

function renderResearchState() {
  const state = current.state;
  return `
    <section class="annotation panel research-state">
      <strong>Hidden research trace</strong>
      <dl>
        <div><dt>Visited</dt><dd>${state.visited.map((id) => escapeHtml(LOCATIONS[id].short)).join(", ") || "none"}</dd></div>
        <div><dt>Observations</dt><dd>${state.observations.map(escapeHtml).join(", ") || "none"}</dd></div>
        <div><dt>Material acts</dt><dd>${state.materialActions.map(escapeHtml).join(", ") || "none"}</dd></div>
      </dl>
    </section>`;
}

function renderEnding(node) {
  if (!current) return;
  if (!current.run.endedAt) {
    current.run.endedAt = nowIso();
    current.run.endingId = node.endingId;
    current.run.finalState = summariseState(current.state);
    recordRun(current.run);
  }

  const ending = ENDING_COPY[node.endingId];
  const residue = [...new Set([...(node.residue ?? []), ...current.state.residue])];
  const nextIndex = (DISPLAY_ORDER.indexOf(current.variantId) + 1) % DISPLAY_ORDER.length;
  const nextVariantId = DISPLAY_ORDER[nextIndex];

  app.innerHTML = `
    <main class="ending-shell ending-${escapeHtml(node.endingId)}">
      <section class="ending-stage panel">
        <p class="eyebrow">Visible aftermath · ${escapeHtml(treatmentLabel(current.variantId))}</p>
        <h1>${escapeHtml(ending.title)}</h1>
        <p class="ending-lede">${escapeHtml(ending.summary)}</p>
        ${renderAftermathTableau(node.endingId)}
      </section>

      <section class="ending-copy panel">
        ${node.prose.map((paragraph) => renderParagraph(paragraph)).join("")}
        <div class="residue-box">
          <h2>What remains</h2>
          <ul>${residue.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </div>
        <p class="run-meta">${current.run.steps.length} decisions · ${formatDuration(new Date(current.run.endedAt).getTime() - new Date(current.run.startedAt).getTime())}</p>
        <div class="ending-actions">
          <button id="open-debrief" class="primary-button" type="button">Record immediate debrief</button>
          <button id="replay-run" class="secondary-button" type="button">Replay this treatment</button>
          <button id="next-treatment" class="secondary-button" type="button">Try ${escapeHtml(treatmentLabel(nextVariantId))}</button>
        </div>
      </section>
    </main>`;

  document.querySelector("#open-debrief")?.addEventListener("click", () => {
    current.state.screen = "debrief";
    renderDebrief();
  });
  document.querySelector("#replay-run")?.addEventListener("click", () => startRun(current.variantId));
  document.querySelector("#next-treatment")?.addEventListener("click", () => startRun(nextVariantId));
}

function renderAftermathTableau(endingId) {
  const content = {
    honest_set: {
      label: "Friday · Crown & Anchor",
      copy: "A small acoustic set under an amended placard. Nobody calls it full continuity.",
      tokens: ["Theo", "Cal", "Raj", "Maya"]
    },
    hall_song: {
      label: "Friday · Bellwether Rooms",
      copy: "One witnessed song in the passed main room. The kitchen stays dark. The argument continues.",
      tokens: ["Maya", "Theo", "Cal", "Tabitha"]
    },
    public_record: {
      label: "Thursday night · Moor Lane noticeboard",
      copy: "The scratched key lies across the amendment strip in a photograph people keep forwarding.",
      tokens: ["Tabitha", "Sophie", "Maya"]
    },
    leave_together: {
      label: "Later · bus lights beyond the lane",
      copy: "You and Tabitha leave. Behind you, the pub hosts something smaller and the hall remains shut.",
      tokens: ["You", "Tabitha"]
    }
  }[endingId];
  return `
    <div class="aftermath-tableau">
      <div class="aftermath-sky"></div>
      <div class="aftermath-lane"></div>
      <div class="aftermath-object object-${escapeHtml(endingId)}"></div>
      <div class="aftermath-people">${content.tokens.map((name) => `<span>${escapeHtml(name)}</span>`).join("")}</div>
      <div class="aftermath-caption"><strong>${escapeHtml(content.label)}</strong><p>${escapeHtml(content.copy)}</p></div>
    </div>`;
}

function renderDebrief() {
  if (!current) return;
  const ending = ENDING_COPY[current.run.endingId ?? current.state.endingId];

  app.innerHTML = `
    <main class="debrief-shell">
      <section class="debrief-intro panel">
        <p class="eyebrow">Immediate tester record</p>
        <h1>${escapeHtml(ending?.title ?? STORY_TITLE)}</h1>
        <p>Record impressions before discussing the treatment or replaying the evening.</p>
      </section>

      <section class="rating-grid panel">
        ${[
          ["presence", "I felt present in the evening"],
          ["comprehension", "I understood people and causality"],
          ["agency", "My conduct felt meaningfully mine"],
          ["pull", "I want to see the next-day or next-Friday aftermath"],
          ["burden", "The interaction burden was excessive"]
        ].map(([key, label]) => ratingControl(key, label)).join("")}
      </section>

      <section class="debrief-notes panel">
        <label>
          <span>What did you want, what happened, what do you remember, and where did interaction help or interfere?</span>
          <textarea id="debrief-notes" rows="8" placeholder="Use the participant’s own words where possible."></textarea>
        </label>
      </section>

      <section class="interview-panel panel">
        <details open>
          <summary>Immediate interview questions</summary>
          <ol>${DEBRIEF_QUESTIONS.map((question) => `<li>${escapeHtml(question)}</li>`).join("")}</ol>
        </details>
      </section>

      <section class="debrief-actions panel">
        <button id="save-debrief" class="primary-button" type="button">Save debrief and return home</button>
        <button id="back-to-ending" class="secondary-button" type="button">Return to aftermath</button>
      </section>
    </main>`;

  document.querySelector("#save-debrief")?.addEventListener("click", () => {
    saveDebrief();
    renderHome();
  });
  document.querySelector("#back-to-ending")?.addEventListener("click", () => renderNode());
}

function ratingControl(key, label) {
  return `
    <fieldset class="rating-control" data-rating-key="${escapeHtml(key)}">
      <legend>${escapeHtml(label)}</legend>
      <div>
        ${[1, 2, 3, 4, 5].map((value) => `
          <label>
            <input type="radio" name="rating-${escapeHtml(key)}" value="${value}">
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
    schemaVersion: 2,
    prototype: PROTOTYPE_ID,
    exportedAt: nowIso(),
    runs: loadRuns()
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `managed-decline-narrative-lab-v002-${new Date().toISOString().replaceAll(":", "-")}.json`;
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

function renderLaneSvg(locations) {
  const locationById = Object.fromEntries(locations.map((location) => [location.id, location]));
  const pointClass = (id) => [
    "lane-node",
    `node-${id}`,
    locationById[id].available ? "is-available" : "",
    locationById[id].visited ? "is-visited" : ""
  ].filter(Boolean).join(" ");

  return `
    <svg class="lane-svg" viewBox="0 0 1000 370" role="img" aria-label="Stylised evening diorama of Bellwether Rooms, the Crown and Anchor, and Moor Lane bus stop">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#253643"/>
          <stop offset="1" stop-color="#c7785c"/>
        </linearGradient>
        <linearGradient id="road" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#202a2f"/>
          <stop offset="0.5" stop-color="#354047"/>
          <stop offset="1" stop-color="#1d272c"/>
        </linearGradient>
        <filter id="soft-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" flood-opacity="0.28"/>
        </filter>
      </defs>
      <rect width="1000" height="370" rx="28" fill="url(#sky)"/>
      <circle cx="816" cy="66" r="24" fill="#f0d9ac" opacity="0.8"/>
      <g opacity="0.25" fill="#e9f0ee">
        <path d="M30 65h150l32 25H0z"/><path d="M620 42h170l32 22H584z"/>
      </g>
      <path d="M0 265 C190 232 340 290 510 254 S806 226 1000 264 V370 H0z" fill="url(#road)"/>
      <path d="M0 286 C220 251 375 309 546 270 S826 246 1000 282" fill="none" stroke="#d8cda7" stroke-width="5" stroke-dasharray="34 30" opacity="0.7"/>
      <g filter="url(#soft-shadow)">
        <g transform="translate(95 116)">
          <path d="M0 42L92 0l98 42v112H0z" fill="#cab49c"/>
          <path d="M-8 45L92 -10l108 55" fill="none" stroke="#514a4a" stroke-width="14" stroke-linejoin="round"/>
          <rect x="72" y="82" width="42" height="72" rx="3" fill="#45695b"/>
          <g fill="#f3d9a0"><rect x="18" y="68" width="34" height="31"/><rect x="136" y="68" width="34" height="31"/></g>
          <rect x="118" y="111" width="45" height="32" rx="2" fill="#427a56"/>
          <rect x="124" y="116" width="33" height="20" fill="#f5f0dd"/>
          <text x="95" y="29" text-anchor="middle" font-size="17" font-weight="700" fill="#2d3333">BELLWETHER</text>
        </g>
        <g transform="translate(404 105)">
          <path d="M0 58L110 8l114 50v110H0z" fill="#9b5a4b"/>
          <path d="M-8 60L110 0l122 60" fill="none" stroke="#443d3e" stroke-width="16" stroke-linejoin="round"/>
          <rect x="86" y="98" width="52" height="70" rx="4" fill="#3d2d2c"/>
          <g fill="#f1c978"><rect x="18" y="83" width="48" height="38"/><rect x="158" y="83" width="48" height="38"/></g>
          <rect x="45" y="54" width="136" height="30" rx="4" fill="#ead7ae"/>
          <text x="113" y="75" text-anchor="middle" font-size="15" font-weight="800" fill="#4b352f">CROWN &amp; ANCHOR</text>
          <rect x="151" y="126" width="49" height="28" rx="2" fill="#f3eee0"/>
        </g>
        <g transform="translate(772 132)">
          <rect x="0" y="10" width="145" height="123" rx="8" fill="#b8d4d5" opacity="0.35" stroke="#d6eeee" stroke-width="4"/>
          <rect x="23" y="91" width="95" height="13" rx="4" fill="#3e4b4d"/>
          <path d="M90 52c20 8 30 28 18 47H64c-12-27 3-45 26-47z" fill="#786252" opacity="0.85"/>
          <rect x="137" y="0" width="7" height="145" fill="#d7dde0"/>
          <circle cx="140" cy="6" r="20" fill="#d14e4e" stroke="#e9e9e9" stroke-width="7"/>
        </g>
      </g>
      <g class="${pointClass("hall")}" transform="translate(186 301)">
        <circle r="23"/><text y="6" text-anchor="middle">H</text>
      </g>
      <g class="${pointClass("pub")}" transform="translate(516 292)">
        <circle r="23"/><text y="6" text-anchor="middle">P</text>
      </g>
      <g class="${pointClass("bus")}" transform="translate(850 301)">
        <circle r="23"/><text y="6" text-anchor="middle">B</text>
      </g>
      <g class="rain-lines" opacity="0.23" stroke="#d7eced" stroke-width="2">
        ${Array.from({ length: 24 }, (_, index) => `<path d="M${30 + index * 42} ${45 + (index % 4) * 13}l-12 24"/>`).join("")}
      </g>
    </svg>`;
}

function formatDuration(ms) {
  const seconds = Math.max(0, Math.round(ms / 1000));
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m ${seconds % 60}s`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

homeButton.addEventListener("click", renderHome);
exportButton.addEventListener("click", exportRuns);
clearButton.addEventListener("click", clearRuns);

modeBadge.textContent = BLIND_MODE
  ? `Blind comparison · ${requestedOrder in VARIANT_ORDERS ? requestedOrder : "ABC"}`
  : ANNOTATE_MODE
    ? "Annotated research mode"
    : "Prototype mode";

window.addEventListener("keydown", (event) => {
  if (!current || event.altKey || event.ctrlKey || event.metaKey) return;
  const number = Number(event.key);
  if (!Number.isInteger(number) || number < 1 || number > 9) return;
  const button = app.querySelectorAll("[data-action-id], [data-location-id]")[number - 1];
  if (button) {
    event.preventDefault();
    button.click();
  }
});

window.addEventListener("beforeunload", () => abandonCurrentRun());

const initialVariant = params.get("variant");
if (initialVariant && VARIANTS[initialVariant]) startRun(initialVariant);
else renderHome();

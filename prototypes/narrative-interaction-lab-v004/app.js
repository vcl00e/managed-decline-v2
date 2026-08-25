import {
  PROTOTYPE_ID,
  STORY_TITLE,
  STORY_SUBTITLE,
  CONDITIONS,
  LOCATIONS,
  CHARACTERS,
  ENDINGS,
  DEBRIEF_QUESTIONS
} from "./story.js";

import {
  createInitialState,
  getCurrentMoment,
  getAvailableActions,
  moveTo,
  engageWorkshop,
  chooseAction,
  getPressureCopy,
  getOutcomeRecap,
  getWorkRecap,
  summariseState
} from "./engine.js";

const STORAGE_KEY = "managed-decline:narrative-interaction-lab-v004:runs";
const params = new URLSearchParams(window.location.search);
const ANNOTATE = params.get("annotate") === "1";
const LOCKED_CONDITION = CONDITIONS[params.get("condition")] ? params.get("condition") : null;

const app = document.querySelector("#app");
const homeButton = document.querySelector("#home-button");
const exportButton = document.querySelector("#export-button");
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
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function saveRun(run) {
  const runs = loadRuns();
  const index = runs.findIndex((item) => item.id === run.id);
  if (index >= 0) runs[index] = run;
  else runs.push(run);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(runs));
}

function abandonCurrent() {
  if (!current || current.run.endedAt || current.run.abandonedAt) return;
  current.run.abandonedAt = nowIso();
  current.run.finalState = summariseState(current.state);
  saveRun(current.run);
}

function startRun(conditionId) {
  abandonCurrent();
  const condition = CONDITIONS[conditionId] ? conditionId : "a";
  current = {
    state: createInitialState(condition),
    run: {
      schemaVersion: 4,
      prototype: PROTOTYPE_ID,
      id: makeId(),
      condition,
      startedAt: nowIso(),
      endedAt: null,
      abandonedAt: null,
      events: [],
      dramaticOutcome: null,
      endingId: null,
      finalState: null,
      debrief: null
    }
  };
  recordEvent("start", { condition });
  render();
}

function recordEvent(type, data = {}) {
  if (!current) return;
  current.run.events.push({
    index: current.run.events.length,
    at: nowIso(),
    type,
    ...data
  });
}

function performMove(locationId) {
  if (!current) return;
  const before = summariseState(current.state);
  const from = current.state.location;
  moveTo(current.state, locationId);
  const after = summariseState(current.state);
  if (from !== current.state.location) {
    recordEvent("move", { from, to: current.state.location, momentId: getCurrentMoment(current.state)?.id ?? null, before, after });
  }
  render();
}

function performEngage() {
  if (!current) return;
  const before = summariseState(current.state);
  const moment = getCurrentMoment(current.state);
  engageWorkshop(current.state);
  const after = summariseState(current.state);
  recordEvent("engage_workshop", { momentId: moment.id, location: current.state.location, before, after });
  render();
}

function performAction(action) {
  const beforeMoment = getCurrentMoment(current.state);
  const result = chooseAction(current.state, action.id);
  recordEvent("action", {
    momentId: beforeMoment.id,
    phase: beforeMoment.phase,
    actionId: action.id,
    label: action.label,
    intent: action.intent ?? null,
    kind: action.kind ?? "contextual",
    location: result.actionLocation,
    clearsWork: action.clearsWork ?? 0,
    before: result.before,
    after: result.after
  });

  if (current.state.screen === "debrief" && !current.run.endedAt) {
    current.run.endedAt = nowIso();
    current.run.dramaticOutcome = current.state.dramaticOutcome;
    current.run.endingId = current.state.endingId;
    current.run.finalState = summariseState(current.state);
    saveRun(current.run);
  }
  render();
}

function render() {
  if (!current) return renderHome();
  if (current.state.screen === "debrief") return renderDebrief();
  return renderPlay();
}

function renderHome() {
  abandonCurrent();
  current = null;
  const runs = loadRuns();
  const completed = runs.filter((run) => run.endedAt).length;

  const conditionChooser = LOCKED_CONDITION
    ? `<button id="begin" class="primary" type="button">Begin ${escapeHtml(CONDITIONS[LOCKED_CONDITION].publicLabel)}</button>`
    : `<div class="condition-grid">
        ${Object.values(CONDITIONS).map((condition) => `
          <button class="condition-card" type="button" data-condition="${condition.id}">
            <strong>${escapeHtml(condition.publicLabel)}</strong>
            ${ANNOTATE ? `<span>${escapeHtml(condition.designLabel)}</span><small>${escapeHtml(condition.description)}</small>` : `<small>Controlled test condition</small>`}
          </button>`).join("")}
      </div>`;

  app.innerHTML = `
    <main class="home-shell">
      <section class="hero panel">
        <p class="eyebrow">Managed Decline · narrative interaction lab v004</p>
        <h1>${escapeHtml(STORY_TITLE)}</h1>
        <p class="hero-copy">${escapeHtml(STORY_SUBTITLE)}</p>
        <p class="quiet">Play naturally. There are no announced objectives and no optimal route.</p>
        ${conditionChooser}
      </section>
      <section class="panel data-note">
        <span>${completed} completed run${completed === 1 ? "" : "s"} in this browser</span>
        <span>Traces remain local until exported.</span>
      </section>
    </main>`;

  document.querySelector("#begin")?.addEventListener("click", () => startRun(LOCKED_CONDITION));
  document.querySelectorAll("[data-condition]").forEach((button) => {
    button.addEventListener("click", () => startRun(button.dataset.condition));
  });
}

function renderPlay() {
  const state = current.state;
  const moment = getCurrentMoment(state);
  const condition = CONDITIONS[state.condition];
  const baseline = state.condition === "a";
  const spatial = !baseline;
  const engaged = baseline || moment.forcedFoyer || state.engagedMomentId === moment.id;

  const dynamicProse = [...(moment.prose ?? [])];
  if (moment.id === "aftermath") {
    dynamicProse.unshift(getOutcomeRecap(state));
    const work = getWorkRecap(state);
    if (work) dynamicProse.push(work);
  }

  app.innerHTML = `
    <main class="${baseline ? "scene-shell" : "world-shell"} phase-${escapeHtml(moment.phase)}">
      <section class="stage panel">
        <header>
          <div>
            <p class="eyebrow">Bellwether Library · ${escapeHtml(condition.publicLabel)}</p>
            <h1>${escapeHtml(moment.title)}</h1>
          </div>
          <time>${escapeHtml(moment.time)}</time>
        </header>
        ${spatial ? renderMap(state, moment) : renderProjector(moment)}
        ${spatial ? renderLocationStage(state, moment, engaged) : renderCast()}
      </section>

      <section class="story-column">
        ${spatial && !engaged ? renderAmbient(state, moment) : renderNarrative(moment, dynamicProse)}
        ${ANNOTATE ? renderAnnotation(state, moment) : ""}
        ${renderActions(state, moment, engaged)}
      </section>
    </main>`;

  document.querySelectorAll("[data-location]").forEach((button) => {
    button.addEventListener("click", () => performMove(button.dataset.location));
  });
  document.querySelector("#engage-workshop")?.addEventListener("click", performEngage);
  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const actions = getAvailableActions(current.state);
      const action = actions.find((candidate) => candidate.id === button.dataset.action);
      if (action) performAction(action);
    });
  });
}

function renderMap(state, moment) {
  const locked = Boolean(state.engagedMomentId);
  const pressure = getPressureCopy(state);
  return `
    <div class="map">
      ${Object.values(LOCATIONS).map((location) => {
        const active = state.location === location.id;
        const tabithaHere = location.id === "workshop" && moment.id !== "aftermath";
        const pressureHere = location.id === "desk" && state.condition === "c" && pressure;
        return `<button
          type="button"
          class="map-place ${active ? "active" : ""}"
          data-location="${escapeHtml(location.id)}"
          ${locked || moment.forcedFoyer ? "disabled" : ""}>
          <span>${escapeHtml(location.short)}</span>
          <small>${tabithaHere ? "Tabitha · workshop" : pressureHere ? "work waiting" : escapeHtml(location.description)}</small>
        </button>`;
      }).join("")}
    </div>`;
}

function renderLocationStage(state, moment, engaged) {
  if (state.location === "workshop" && engaged) {
    return `${renderProjector(moment)}${renderCast()}`;
  }

  const location = LOCATIONS[state.location];
  return `
    <div class="location-card">
      <p class="eyebrow">Current location</p>
      <h2>${escapeHtml(location.name)}</h2>
      <p>${escapeHtml(location.description)}</p>
      ${state.condition === "c" && state.location === "desk" ? `<div class="pressure">${escapeHtml(getPressureCopy(state))}</div>` : ""}
    </div>`;
}

function renderAmbient(state, moment) {
  const cue = moment.cues?.[state.location] ?? "Nothing here is demanding your attention.";
  const pressure = state.condition === "c" ? getPressureCopy(state) : null;
  return `
    <article class="ambient panel">
      <p class="eyebrow">What you notice here</p>
      <p class="ambient-copy">${escapeHtml(cue)}</p>
      ${pressure && state.location !== "desk" ? `<p class="distant-pressure">${escapeHtml(pressure)}</p>` : ""}
      ${state.location === "workshop" ? `<p class="commit-note">Staying for the next part commits this beat to the workshop. Once it starts, you cannot also spend the same minute elsewhere.</p>` : ""}
    </article>`;
}

function renderNarrative(moment, prose) {
  return `
    ${prose.length ? `<article class="prose panel">${prose.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}</article>` : ""}
    ${moment.lines?.length ? `<article class="dialogue panel">${moment.lines.map(renderLine).join("")}</article>` : ""}`;
}

function renderActions(state, moment, engaged) {
  if (state.condition !== "a" && state.location === "workshop" && !engaged && !moment.forcedFoyer) {
    return `<section class="actions"><button id="engage-workshop" type="button" class="action commit"><span>→</span><strong>Stay for the next part.</strong><small>Spend this beat in Learning Suite Two.</small></button></section>`;
  }

  const actions = getAvailableActions(state);
  return `<section class="actions">
    ${actions.map((action, index) => `
      <button type="button" class="action ${action.kind === "material" ? "material" : ""}" data-action="${escapeHtml(action.id)}">
        <span>${index + 1}</span>
        <strong>${escapeHtml(action.label)}</strong>
        ${ANNOTATE ? `<small>${escapeHtml(action.intent ?? "")}${action.clearsWork ? ` · clears ${action.clearsWork}` : ""}</small>` : ""}
      </button>`).join("")}
  </section>`;
}

function renderLine(entry) {
  const speaker = CHARACTERS[entry.speaker];
  return `<div class="line ${entry.aside ? "aside" : ""}">
    <strong>${escapeHtml(speaker?.name ?? "Scene")}</strong>
    <p>${escapeHtml(entry.text)}</p>
  </div>`;
}

function renderCast() {
  return `<div class="cast-row">
    ${["tabitha", "gareth"].map((id) => {
      const c = CHARACTERS[id];
      return `<div class="cast-card cast-${id}"><span>${escapeHtml(c.initials)}</span><strong>${escapeHtml(c.name)}</strong><small>${escapeHtml(c.role)}</small></div>`;
    }).join("")}
  </div>`;
}

function renderProjector(moment) {
  const p = moment.projector;
  return `<div class="projector"><span>${escapeHtml(p.head)}</span><strong>${escapeHtml(p.body)}</strong><small>${escapeHtml(p.foot)}</small></div>`;
}

function renderAnnotation(state, moment) {
  return `<aside class="annotation panel">
    <strong>Research annotation</strong>
    <dl>
      <div><dt>condition</dt><dd>${escapeHtml(CONDITIONS[state.condition].designLabel)}</dd></div>
      <div><dt>phase</dt><dd>${escapeHtml(moment.phase)}</dd></div>
      <div><dt>location</dt><dd>${escapeHtml(state.location)}</dd></div>
      <div><dt>engaged</dt><dd>${escapeHtml(state.engagedMomentId ?? "no")}</dd></div>
      <div><dt>relation</dt><dd>${escapeHtml(state.relation)}</dd></div>
      <div><dt>work</dt><dd>${escapeHtml(`${state.workBacklog} backlog · max ${state.maxWorkBacklog}`)}</dd></div>
      <div><dt>attended</dt><dd>${escapeHtml(state.attendedMoments.join(", "))}</dd></div>
      <div><dt>missed</dt><dd>${escapeHtml(state.missedMoments.join(", "))}</dd></div>
      <div><dt>flags</dt><dd>${escapeHtml(JSON.stringify(state.flags))}</dd></div>
    </dl>
  </aside>`;
}

function renderDebrief() {
  const state = current.state;
  const condition = CONDITIONS[state.condition];
  const ending = ENDINGS[state.endingId];
  app.innerHTML = `
    <main class="debrief-shell">
      <section class="panel debrief-head">
        <p class="eyebrow">Immediate tester record · ${escapeHtml(condition.publicLabel)}</p>
        <h1>${escapeHtml(ending?.title ?? STORY_TITLE)}</h1>
        <p>${escapeHtml(ending?.summary ?? "")}</p>
        <p class="quiet">Answer before discussing the design or comparing versions.</p>
      </section>
      <section class="panel ratings">
        ${rating("minuteTwo", "At about minute two, I wanted to continue")}
        ${rating("doing", "I felt like I was doing something, not merely navigating dialogue")}
        ${rating("intention", "I naturally formed my own intentions without needing an announced objective")}
        ${rating("immersion", "Where I was and what I was doing made the situation more immersive")}
        ${rating("uniqueAgency", "My actions expressed decisions that dialogue alone could not express")}
        ${rating("chores", "The non-dialogue activity felt like chores or busywork")}
        ${rating("interfaceLoad", "I spent mental effort operating the game instead of following the situation")}
        ${rating("missing", "I cared about what might be happening while I was somewhere else")}
        ${rating("vnBetter", "This exact sequence would have been better as a straightforward visual-novel scene")}
        ${rating("tabitha", "When it ended, I wanted more time with Tabitha")}
      </section>
      <section class="panel notes">
        <label><span>Immediate notes</span><textarea id="notes" rows="7" placeholder="What pulled you, what felt like work, what did you miss, and when did you form your own goal?"></textarea></label>
      </section>
      <section class="panel interview">
        <details open><summary>Interview prompts</summary><ol>${DEBRIEF_QUESTIONS.map((q) => `<li>${escapeHtml(q)}</li>`).join("")}</ol></details>
      </section>
      <section class="panel debrief-actions"><button id="save-debrief" class="primary" type="button">Save debrief</button></section>
    </main>`;

  document.querySelector("#save-debrief")?.addEventListener("click", saveDebrief);
}

function rating(key, label) {
  return `<fieldset data-rating="${escapeHtml(key)}">
    <legend>${escapeHtml(label)}</legend>
    <div>${[1,2,3,4,5].map((n) => `<label><input type="radio" name="${escapeHtml(key)}" value="${n}"><span>${n}</span></label>`).join("")}</div>
    <small>1 = strongly disagree · 5 = strongly agree</small>
  </fieldset>`;
}

function saveDebrief() {
  const ratings = {};
  document.querySelectorAll("[data-rating]").forEach((field) => {
    const input = field.querySelector("input:checked");
    ratings[field.dataset.rating] = input ? Number(input.value) : null;
  });
  current.run.debrief = {
    savedAt: nowIso(),
    ratings,
    notes: document.querySelector("#notes")?.value.trim() ?? ""
  };
  saveRun(current.run);
  current = null;
  renderHome();
}

function exportRuns() {
  const payload = {
    schemaVersion: 4,
    prototype: PROTOTYPE_ID,
    exportedAt: nowIso(),
    runs: loadRuns()
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `managed-decline-v004-${new Date().toISOString().replaceAll(":", "-")}.json`;
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
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
modeBadge.textContent = ANNOTATE
  ? `Annotated${LOCKED_CONDITION ? ` · ${CONDITIONS[LOCKED_CONDITION].designLabel}` : ""}`
  : (LOCKED_CONDITION ? CONDITIONS[LOCKED_CONDITION].publicLabel : "Prototype");
window.addEventListener("beforeunload", abandonCurrent);
window.addEventListener("keydown", (event) => {
  if (!current || event.altKey || event.ctrlKey || event.metaKey) return;
  const n = Number(event.key);
  if (!Number.isInteger(n) || n < 1 || n > 9) return;
  const button = document.querySelectorAll("[data-action]")[n - 1];
  if (button) {
    event.preventDefault();
    button.click();
  }
});

renderHome();

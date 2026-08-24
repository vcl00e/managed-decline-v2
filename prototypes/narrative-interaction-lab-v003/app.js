import {
  PROTOTYPE_ID,
  STORY_TITLE,
  STORY_SUBTITLE,
  CHARACTERS,
  ENDINGS,
  DEBRIEF_QUESTIONS
} from "./story.js";
import {
  createInitialState,
  getCurrentNode,
  getAvailableActions,
  chooseAction,
  summariseState
} from "./engine.js";

const STORAGE_KEY = "managed-decline:narrative-interaction-lab-v003:runs";
const params = new URLSearchParams(window.location.search);
const ANNOTATE = params.get("annotate") === "1";

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

function startRun() {
  abandonCurrent();
  current = {
    state: createInitialState(),
    run: {
      schemaVersion: 3,
      prototype: PROTOTYPE_ID,
      id: makeId(),
      startedAt: nowIso(),
      endedAt: null,
      abandonedAt: null,
      steps: [],
      endingId: null,
      finalState: null,
      debrief: null
    }
  };
  render();
}

function abandonCurrent() {
  if (!current || current.run.endedAt || current.run.abandonedAt) return;
  current.run.abandonedAt = nowIso();
  current.run.finalState = summariseState(current.state);
  saveRun(current.run);
}

function performAction(action) {
  const node = getCurrentNode(current.state);
  const before = summariseState(current.state);
  chooseAction(current.state, action.id);
  const after = summariseState(current.state);
  current.run.steps.push({
    index: current.run.steps.length,
    at: nowIso(),
    nodeId: node.id,
    phase: node.phase,
    actionId: action.id,
    label: action.label,
    intent: action.intent ?? null,
    kind: action.kind ?? "dialogue",
    before,
    after
  });

  if (current.state.screen === "debrief" && !current.run.endedAt) {
    current.run.endedAt = nowIso();
    current.run.endingId = current.state.endingId;
    current.run.finalState = summariseState(current.state);
    saveRun(current.run);
  }
  render();
}

function render() {
  if (!current) return renderHome();
  if (current.state.screen === "debrief") return renderDebrief();
  return renderNode();
}

function renderHome() {
  abandonCurrent();
  current = null;
  const runs = loadRuns();
  const completed = runs.filter((run) => run.endedAt).length;

  app.innerHTML = `
    <main class="home-shell">
      <section class="hero panel">
        <p class="eyebrow">Managed Decline · narrative prototype v003</p>
        <h1>${escapeHtml(STORY_TITLE)}</h1>
        <p class="hero-copy">${escapeHtml(STORY_SUBTITLE)}</p>
        <p class="quiet">Headphones optional. No tutorial required.</p>
        <button id="begin" class="primary" type="button">Begin</button>
      </section>
      <section class="panel data-note">
        <span>${completed} completed run${completed === 1 ? "" : "s"} in this browser</span>
        <span>Play traces stay local until exported.</span>
      </section>
    </main>`;

  document.querySelector("#begin")?.addEventListener("click", startRun);
}

function renderNode() {
  const node = getCurrentNode(current.state);
  const actions = getAvailableActions(current.state);
  const ending = node.endingId ? ENDINGS[node.endingId] : null;

  app.innerHTML = `
    <main class="scene-shell phase-${escapeHtml(node.phase)} tone-${escapeHtml(node.tone)}">
      <section class="stage panel">
        <header>
          <div>
            <p class="eyebrow">Bellwether Library · Learning Suite Two</p>
            <h1>${escapeHtml(node.title)}</h1>
          </div>
          <time>${escapeHtml(node.time ?? "")}</time>
        </header>
        ${renderProjector(node)}
        <div class="cast-row">
          ${(node.cast ?? []).map((id) => {
            const c = CHARACTERS[id];
            return `<div class="cast-card cast-${escapeHtml(id)}"><span>${escapeHtml(c.initials)}</span><strong>${escapeHtml(c.name)}</strong><small>${escapeHtml(c.role)}</small></div>`;
          }).join("")}
        </div>
      </section>

      <section class="story-column">
        ${ending ? `<div class="ending-chip">${escapeHtml(ending.summary)}</div>` : ""}
        ${node.prose?.length ? `<article class="prose panel">${node.prose.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}</article>` : ""}
        ${node.lines?.length ? `<article class="dialogue panel">${node.lines.map(renderLine).join("")}</article>` : ""}
        ${ANNOTATE ? renderAnnotation(node) : ""}
        <section class="actions">
          ${actions.map((action, index) => `
            <button type="button" class="action ${action.kind === "material" ? "material" : ""}" data-action="${escapeHtml(action.id)}">
              <span>${index + 1}</span><strong>${escapeHtml(action.label)}</strong>
              ${ANNOTATE ? `<small>${escapeHtml(action.intent ?? "")}</small>` : ""}
            </button>`).join("")}
        </section>
      </section>
    </main>`;

  document.querySelectorAll("[data-action]").forEach((button) => {
    button.addEventListener("click", () => {
      const action = actions.find((candidate) => candidate.id === button.dataset.action);
      if (action) performAction(action);
    });
  });
}

function renderLine(entry) {
  const speaker = entry.speaker ? CHARACTERS[entry.speaker] : null;
  return `<div class="line ${entry.aside ? "aside" : ""}"><strong>${escapeHtml(speaker?.name ?? "Scene")}</strong><p>${escapeHtml(entry.text)}</p></div>`;
}

function renderProjector(node) {
  const content = {
    hook: {
      head: "COMMUNITY COMPASS",
      body: "WHAT WOULD YOU DO IF YOUR FRIEND TABITHA BEGAN EXPRESSING CHALLENGING VIEWS ONLINE?",
      foot: "LISTEN WITHOUT JUDGEMENT · SPEAK TO A TRUSTED ADULT · RECORD YOUR CONCERNS"
    },
    complicity: { head: "ARCHIVE SCENARIO", body: "TABITHA · FICTIONALISED COMPOSITE", foot: "LEGACY LEARNING SESSION" },
    delight: { head: "POSSIBLE CHANGES TO NOTICE", body: "GRIEVANCE CONTENT · HOSTILE POSTING · INTENSE INTEREST IN NATIONAL HISTORY", foot: "CONTEXT MATTERS" },
    escalation: { head: "RESTORATIVE PATHWAY", body: "‘I REALISED MY FRUSTRATION WAS BEING EXPLOITED ONLINE.’", foot: "TABITHA · PARTICIPANT VOICE" },
    sting: { head: "PARTICIPANT VOICE", body: "SYNTHESISED FROM FACILITATED FEEDBACK", foot: "CIVICWELL LEARNING LTD. · 2025 REFRESH" },
    oh_shit: { head: "LIVED EXPERIENCE CONTRIBUTOR", body: "T. MERCER · CONNECTION FAILED", foot: "RETRY?" },
    choice: { head: "COMMUNITY COMPASS", body: "FINAL REFLECTION", foot: "WHAT WOULD YOU DO DIFFERENTLY?" },
    payoff: { head: "SESSION DEVIATION", body: "FACILITATOR NOTES IN PROGRESS", foot: "" },
    future_pull: { head: "COMMUNITY COMPASS", body: "D. ASK TABITHA WHAT SHE ACTUALLY THINKS.", foot: "OR ASK HER OUT. CONTEXT MATTERS." }
  }[node.phase] ?? { head: "COMMUNITY COMPASS", body: "", foot: "" };

  return `<div class="projector"><span>${escapeHtml(content.head)}</span><strong>${escapeHtml(content.body)}</strong><small>${escapeHtml(content.foot)}</small></div>`;
}

function renderAnnotation(node) {
  const state = current.state;
  return `<aside class="annotation panel">
    <strong>Research annotation</strong>
    <dl>
      <div><dt>phase</dt><dd>${escapeHtml(node.phase)}</dd></div>
      <div><dt>relation</dt><dd>${escapeHtml(state.relation)}</dd></div>
      <div><dt>flags</dt><dd>${escapeHtml(JSON.stringify(state.flags))}</dd></div>
      <div><dt>memories</dt><dd>${escapeHtml(state.memories.join(", "))}</dd></div>
    </dl>
  </aside>`;
}

function renderDebrief() {
  const ending = ENDINGS[current.run.endingId];
  app.innerHTML = `
    <main class="debrief-shell">
      <section class="panel debrief-head">
        <p class="eyebrow">Immediate tester record</p>
        <h1>${escapeHtml(ending?.title ?? STORY_TITLE)}</h1>
        <p>Answer before discussing the design.</p>
      </section>
      <section class="panel ratings">
        ${rating("minuteTwo", "At about minute two, I wanted to continue")}
        ${rating("funny", "I found the slice genuinely funny")}
        ${rating("tabitha", "I wanted more time with Tabitha")}
        ${rating("emotion", "My emotional state changed meaningfully during the slice")}
        ${rating("agency", "My choices changed the social/emotional meaning")}
        ${rating("continue", "I wanted another scene when it ended")}
      </section>
      <section class="panel notes">
        <label><span>Immediate notes</span><textarea id="notes" rows="6" placeholder="What worked, what dragged, where did you want to stop, and what did you want next?"></textarea></label>
      </section>
      <section class="panel interview">
        <details open><summary>Interview prompts</summary><ol>${DEBRIEF_QUESTIONS.map((q) => `<li>${escapeHtml(q)}</li>`).join("")}</ol></details>
      </section>
      <section class="panel debrief-actions"><button id="save-debrief" class="primary" type="button">Save debrief</button></section>
    </main>`;

  document.querySelector("#save-debrief")?.addEventListener("click", saveDebrief);
}

function rating(key, label) {
  return `<fieldset data-rating="${escapeHtml(key)}"><legend>${escapeHtml(label)}</legend><div>${[1,2,3,4,5].map((n) => `<label><input type="radio" name="${escapeHtml(key)}" value="${n}"><span>${n}</span></label>`).join("")}</div><small>1 = strongly disagree · 5 = strongly agree</small></fieldset>`;
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
  const payload = { schemaVersion: 3, prototype: PROTOTYPE_ID, exportedAt: nowIso(), runs: loadRuns() };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `managed-decline-v003-${new Date().toISOString().replaceAll(":", "-")}.json`;
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
modeBadge.textContent = ANNOTATE ? "Annotated design mode" : "Prototype";
window.addEventListener("beforeunload", abandonCurrent);
window.addEventListener("keydown", (event) => {
  if (!current || event.altKey || event.ctrlKey || event.metaKey) return;
  const n = Number(event.key);
  if (!Number.isInteger(n) || n < 1 || n > 9) return;
  const button = document.querySelectorAll("[data-action]")[n - 1];
  if (button) { event.preventDefault(); button.click(); }
});

renderHome();

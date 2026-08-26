import {
  PROTOTYPE_ID,
  createState,
  learn,
  remember,
  shiftRelation,
  resolveOutcome,
  summary,
  addUnique
} from "./model.js";
import {
  TITLE,
  SUBTITLE,
  WORLD,
  ROOMS,
  SOLIDS,
  PLAYER_START,
  NPCS,
  OBJECTS,
  TIMED_EVENTS,
  OUTCOME_COPY
} from "./scenario.js";

const STORAGE_KEY = "managed-decline:narrative-interaction-lab-v005:runs";
const params = new URLSearchParams(location.search);
const DEBUG = params.get("debug") === "1";
const app = document.querySelector("#app");
const homeButton = document.querySelector("#home-button");
const exportButton = document.querySelector("#export-button");
const modeBadge = document.querySelector("#mode-badge");

let session = null;
let raf = null;
let previousFrame = performance.now();
const keys = new Set();

const NPC_PLANS = [
  { at: 30, npc: "rowan", visible: true, path: [[110, 150], [235, 165]] },
  { at: 74, npc: "rowan", path: [[315, 205], [500, 220]] },
  { at: 76, npc: "ben", path: [[315, 205], [460, 245]] },
  { at: 122, npc: "rowan", path: [[720, 220], [870, 220], [930, 330]] },
  { at: 152, npc: "rowan", path: [[870, 220], [510, 220], [315, 205], [255, 205]] },
  { at: 174, npc: "maya", path: [[270, 365], [315, 365], [430, 245]] },
  { at: 198, npc: "rowan", path: [[315, 205], [520, 245]] },
  { at: 218, npc: "priya", visible: true, path: [[110, 150], [260, 180], [315, 205], [610, 255]] },
  { at: 232, npc: "june", path: [[200, 430], [200, 385], [315, 365], [735, 345]] },
  { at: 252, npc: "ben", path: [[520, 260]] }
];

function nowIso() { return new Date().toISOString(); }
function makeId() { return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`; }
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function dist(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
function escapeHtml(v) {
  return String(v ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function loadRuns() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch { return []; }
}

function saveRun(run) {
  const runs = loadRuns();
  const i = runs.findIndex((r) => r.id === run.id);
  if (i >= 0) runs[i] = run; else runs.push(run);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(runs));
}

function record(kind, data = {}) {
  if (!session) return;
  session.run.events.push({ at: nowIso(), worldTime: round(session.state.worldTime), kind, ...data });
}

function round(n) { return Math.round(n * 10) / 10; }

function renderHome() {
  stopLoop();
  if (session && !session.run.endedAt) abandonRun();
  session = null;
  const runs = loadRuns();
  const complete = runs.filter((r) => r.endedAt).length;
  app.innerHTML = `
    <section class="home-shell">
      <article class="home-card">
        <p class="eyebrow">Managed Decline · lived-space prototype v005</p>
        <h1>${TITLE}</h1>
        <p class="lede">${SUBTITLE}</p>
        <div class="premise">
          <strong>Thursday · 18:41</strong>
          <p>You told Maya you'd help with her volunteer radio night at Bellwether Community Rooms. The council says the building is operating normally.</p>
          <p>Move with <kbd>WASD</kbd> or the arrow keys. Press <kbd>E</kbd> to interact. There is no quest log. You can leave through the front doors whenever you want.</p>
        </div>
        <button id="begin" class="primary" type="button">Go inside</button>
      </article>
      <aside class="data-note">${complete} completed run${complete === 1 ? "" : "s"} stored in this browser. Traces stay local until exported.</aside>
    </section>`;
  document.querySelector("#begin")?.addEventListener("click", startRun);
}

function startRun() {
  session = {
    state: createState(),
    player: { x: PLAYER_START.x, y: PLAYER_START.y, r: 13, facing: "down" },
    npcs: Object.fromEntries(Object.entries(NPCS).map(([id, n]) => [id, { ...n, id, visible: !n.hidden, path: [], speech: null }])),
    objects: structuredClone(OBJECTS),
    firedEvents: new Set(),
    firedPlans: new Set(),
    ambientQueue: [],
    ambient: null,
    dialogue: null,
    toast: null,
    toastUntil: 0,
    nearest: null,
    sampleClock: 0,
    aftermathStartedAt: null,
    run: {
      schemaVersion: 5,
      prototype: PROTOTYPE_ID,
      scenario: "radio-free-bellwether",
      id: makeId(),
      startedAt: nowIso(),
      endedAt: null,
      abandonedAt: null,
      finalState: null,
      events: [],
      samples: [],
      debrief: null
    }
  };
  renderGameShell();
  record("run_started", { player: { ...session.player } });
  toast("You promised Maya you'd help with Radio Bellwether. The rest is up to you.", 5200);
  previousFrame = performance.now();
  startLoop();
}

function renderGameShell() {
  app.innerHTML = `
    <section class="game-shell">
      <div class="canvas-wrap">
        <canvas id="world" width="1120" height="700" aria-label="Bellwether Community Rooms"></canvas>
        <div id="hud" class="hud"></div>
        <div id="prompt" class="prompt"></div>
        <div id="toast" class="toast"></div>
        <div id="dialogue" class="dialogue-layer" hidden></div>
        ${DEBUG ? '<pre id="debug" class="debug"></pre>' : ""}
        <div class="touch-controls" aria-hidden="true">
          <button data-move="up">▲</button>
          <button data-move="left">◀</button>
          <button data-interact="1">E</button>
          <button data-move="right">▶</button>
          <button data-move="down">▼</button>
        </div>
      </div>
    </section>`;
  wireTouchControls();
}

function startLoop() {
  cancelAnimationFrame(raf);
  const frame = (now) => {
    const dt = clamp((now - previousFrame) / 1000, 0, 0.05);
    previousFrame = now;
    update(dt);
    draw();
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
}
function stopLoop() { if (raf) cancelAnimationFrame(raf); raf = null; }

function update(dt) {
  if (!session) return;
  const paused = Boolean(session.dialogue);
  if (!paused) {
    session.state.worldTime += dt;
    updateMovement(dt);
    updateNpcPlans();
    updateNpcs(dt);
    updateTimedEvents();
    updateAmbient();
    updateDefaultResolution();
    samplePosition(dt);
  }
  updateNearest();
  if (session.state.flags.resolved && session.aftermathStartedAt == null) {
    session.aftermathStartedAt = session.state.worldTime;
    toast("The immediate mess has settled. Stay, talk, look around, or leave when you're ready.", 5200);
  }
  if (session.state.flags.resolved && session.aftermathStartedAt != null && session.state.worldTime - session.aftermathStartedAt > 110) {
    finishRun(false);
  }
}

function samplePosition(dt) {
  session.sampleClock += dt;
  if (session.sampleClock < 1.5) return;
  session.sampleClock = 0;
  session.run.samples.push({
    worldTime: round(session.state.worldTime),
    x: Math.round(session.player.x),
    y: Math.round(session.player.y),
    room: currentRoom(session.player)?.id ?? "outside",
    phase: session.state.phase
  });
}

function currentRoom(point) {
  return ROOMS.find((r) => point.x >= r.x && point.x <= r.x + r.w && point.y >= r.y && point.y <= r.y + r.h) ?? null;
}

function updateMovement(dt) {
  let dx = 0, dy = 0;
  if (keys.has("w") || keys.has("arrowup")) dy -= 1;
  if (keys.has("s") || keys.has("arrowdown")) dy += 1;
  if (keys.has("a") || keys.has("arrowleft")) dx -= 1;
  if (keys.has("d") || keys.has("arrowright")) dx += 1;
  if (!dx && !dy) return;
  const mag = Math.hypot(dx, dy) || 1;
  dx /= mag; dy /= mag;
  const speed = 165;
  movePlayer(dx * speed * dt, 0);
  movePlayer(0, dy * speed * dt);
  if (Math.abs(dx) > Math.abs(dy)) session.player.facing = dx < 0 ? "left" : "right";
  else session.player.facing = dy < 0 ? "up" : "down";
}

function movePlayer(dx, dy) {
  const next = { ...session.player, x: session.player.x + dx, y: session.player.y + dy };
  if (!circleBlocked(next)) {
    session.player.x = next.x;
    session.player.y = next.y;
  }
}

function circleBlocked(p) {
  if (p.x - p.r < 72 || p.x + p.r > 1048 || p.y - p.r < 72 || p.y + p.r > 628) return true;
  return SOLIDS.some((rect) => circleRect(p.x, p.y, p.r, rect));
}

function circleRect(cx, cy, r, rect) {
  const nx = clamp(cx, rect.x, rect.x + rect.w);
  const ny = clamp(cy, rect.y, rect.y + rect.h);
  return (cx - nx) ** 2 + (cy - ny) ** 2 < r ** 2;
}

function updateNpcPlans() {
  for (let i = 0; i < NPC_PLANS.length; i++) {
    const plan = NPC_PLANS[i];
    if (session.firedPlans.has(i) || session.state.worldTime < plan.at) continue;
    session.firedPlans.add(i);
    const npc = session.npcs[plan.npc];
    if (!npc) continue;
    if (plan.visible) npc.visible = true;
    npc.path.push(...plan.path.map(([x, y]) => ({ x, y })));
  }
}

function updateNpcs(dt) {
  for (const npc of Object.values(session.npcs)) {
    if (!npc.visible || !npc.path.length) continue;
    const target = npc.path[0];
    const dx = target.x - npc.x, dy = target.y - npc.y;
    const d = Math.hypot(dx, dy);
    if (d < 3) { npc.x = target.x; npc.y = target.y; npc.path.shift(); continue; }
    const speed = npc.id === "june" ? 72 : 92;
    npc.x += dx / d * Math.min(speed * dt, d);
    npc.y += dy / d * Math.min(speed * dt, d);
  }
}

function updateTimedEvents() {
  for (const event of TIMED_EVENTS) {
    if (session.firedEvents.has(event.id) || session.state.worldTime < event.at) continue;
    session.firedEvents.add(event.id);
    if (event.id === "rowan_arrives") session.npcs.rowan.visible = true;
    if (event.id === "pack_dropped") session.objects.pack.hidden = false;
    if (event.id === "priya_arrives") session.npcs.priya.visible = true;
    if (event.id === "clash") {
      session.state.flags.clashStarted = true;
      session.state.phase = "clash";
      session.state.clashStartedAt = session.state.worldTime;
    }
    let heard = dist(session.player, event.source) <= event.hear;
    if (event.id === "clash") heard = true;
    const lines = event.id === "mic_test" && !session.state.flags.powerFixed
      ? [["maya", "Radio Bellwether, technical rehearsal—"], [null, "The mixer dies with a small, expensive click."], ["maya", "Good. Very strong start."]]
      : event.lines;
    if (heard) {
      addUnique(session.state.heardEvents, event.id);
      if (event.learn) learn(session.state, event.learn);
      queueAmbient(lines);
      record("ambient_heard", { eventId: event.id, room: currentRoom(session.player)?.id ?? "outside" });
    } else {
      addUnique(session.state.missedEvents, event.id);
      record("ambient_missed", { eventId: event.id, room: currentRoom(session.player)?.id ?? "outside" });
    }
  }
}

function queueAmbient(lines) {
  for (const [speaker, text] of lines) session.ambientQueue.push({ speaker, text });
  updateAmbient(true);
}

function updateAmbient(force = false) {
  const t = performance.now();
  if (session.ambient && t < session.ambient.until && !force) return;
  if (session.ambient && t >= session.ambient.until) session.ambient = null;
  if (!session.ambient && session.ambientQueue.length) {
    const next = session.ambientQueue.shift();
    session.ambient = { ...next, until: t + Math.max(2500, Math.min(5200, next.text.length * 47)) };
  }
}

function updateDefaultResolution() {
  if (!session.state.flags.clashStarted || session.state.flags.resolved) return;
  if (session.state.worldTime - session.state.clashStartedAt < 78) return;
  resolve("default_shuffle", "time_elapsed");
}

function updateNearest() {
  if (!session || session.dialogue) { if (session) session.nearest = null; return; }
  const candidates = [];
  for (const npc of Object.values(session.npcs)) {
    if (!npc.visible) continue;
    const d = dist(session.player, npc);
    if (d <= 58) candidates.push({ kind: "npc", id: npc.id, label: `Talk to ${npc.name}`, x: npc.x, y: npc.y, d });
  }
  for (const [id, obj] of Object.entries(session.objects)) {
    if (obj.hidden) continue;
    if (id === "reel" && (session.state.carried === "reel" || session.state.flags.powerFixed)) continue;
    if (id === "pack" && session.state.worldTime > 230) continue;
    const d = dist(session.player, obj);
    if (d > obj.radius + 22) continue;
    let label = obj.label;
    if (id === "reel") label = "Pick up extension reel";
    if (id === "mixer") label = session.state.flags.powerFixed ? "Check radio mixer" : session.state.carried === "reel" ? "Run extension to mixer" : "Inspect radio mixer";
    if (id === "pack") label = "Read dropped briefing pack";
    if (id === "sideDoor") label = session.state.flags.sideDoorOpen ? "Look through open side door" : "Try courtyard side door";
    if (id === "exit") label = session.state.flags.resolved ? "Leave for the night" : "Leave the hall";
    candidates.push({ kind: "object", id, label, x: obj.x, y: obj.y, d });
  }
  candidates.sort((a, b) => a.d - b.d);
  session.nearest = candidates[0] ?? null;
}

function interact() {
  if (!session || session.dialogue) return;
  const target = session.nearest;
  if (!target) return;
  session.state.interactions += 1;
  record("interaction", { targetKind: target.kind, targetId: target.id, room: currentRoom(session.player)?.id ?? "outside" });
  if (target.kind === "npc") talk(target.id); else interactObject(target.id);
}

function interactObject(id) {
  const s = session.state;
  if (id === "reel") {
    if (!s.carried) {
      s.carried = "reel";
      remember(s, "picked_up_extension_reel");
      toast("You pick up the extension reel. It is heavier than any object whose entire job is being a long wire should be.", 4300);
      record("object_changed", { objectId: "reel", action: "picked_up" });
    }
    return;
  }
  if (id === "mixer") {
    if (s.flags.powerFixed) return toast("The mixer is holding power. For now.", 2600);
    if (s.carried === "reel") {
      s.carried = null;
      s.flags.powerFixed = true;
      shiftRelation(s, "maya", 1);
      remember(s, "kept_radio_power_alive");
      toast("You run the reel through the doorway and give the mixer a live socket. The meters wake up.", 4300);
      record("object_changed", { objectId: "mixer", action: "powered" });
      return;
    }
    return openDialogue({
      speaker: "Scene",
      lines: ["The mixer powers on, flickers, and dies. A strip of masking tape says: WALL SOCKET — DO NOT TRUST."],
      choices: [{ label: "Leave it for now.", response: "Somebody has already tried hitting it." }]
    });
  }
  if (id === "pack") {
    return openDialogue({
      speaker: "Briefing pack",
      lines: ["A LocalityWorks folder has fallen open on the foyer bench. The visible page is headed: BELLWETHER COMMUNITY ROOMS — ACTIVATION ASSUMPTIONS."],
      choices: [
        {
          label: "Read the visible page.",
          effect: () => {
            learn(s, "vacant_target_monday");
            remember(s, "read_localityworks_pack");
            return "‘Operational assumption: vacant possession target Monday. Current users transition via communications following activation sign-off.’";
          }
        },
        { label: "Leave it alone.", response: "You leave the folder exactly where it fell." }
      ]
    });
  }
  if (id === "sideDoor") {
    if (s.flags.sideDoorOpen) {
      if (s.phase === "clash" && !s.flags.resolved) return resolve("side_door", "opened_side_door_to_arrivals");
      return toast("Rain needles the courtyard. The side entrance is open.", 2400);
    }
    if (s.flags.juneKeyOffered) {
      s.flags.sideDoorOpen = true;
      remember(s, "opened_side_door_with_junes_key");
      toast("June's old brass key still works. The side door opens onto the courtyard.", 3800);
      record("object_changed", { objectId: "sideDoor", action: "opened" });
      if (s.phase === "clash" && !s.flags.resolved) resolve("side_door", "opened_side_door_during_clash");
      return;
    }
    return toast("Locked. The sign says STAFF ACCESS, which has not stopped anyone for several decades.", 3300);
  }
  if (id === "exit") {
    if (s.flags.resolved) return finishRun(false);
    return openDialogue({
      speaker: "Front doors",
      lines: ["You can leave. Whatever is happening here will continue without you."],
      choices: [
        { label: "Go home.", effect: () => { s.exitedEarly = true; resolveOutcome(s, "early_exit"); finishRun(true); return null; } },
        { label: "Stay.", response: "You turn back into the hall." }
      ]
    });
  }
}

function talk(id) {
  const s = session.state;
  if (id === "maya") return talkMaya(s);
  if (id === "ben") return talkBen(s);
  if (id === "june") return talkJune(s);
  if (id === "rowan") return talkRowan(s);
  if (id === "priya") return talkPriya(s);
}

function talkMaya(s) {
  if (s.phase === "aftermath") {
    const line = {
      quiet_broadcast: "We did the whole show from a room the size of a disabled toilet. Best acoustics we've had.",
      formal_pause: "Apparently the revolutionary tactic was asking who had authority. I hate that it worked.",
      live_interview: "I didn't plan to interview the man sent to view the building. In fairness, neither did he.",
      side_door: "June has turned unauthorised access into a community service.",
      default_shuffle: "We shared the hall with a property viewing. That's either compromise or immersive radio."
    }[s.outcome] ?? "Well. That was a Thursday.";
    return openDialogue({ speaker: "Maya", lines: [line], choices: [
      { label: "Worth it?", response: "Ask me when we've found out whether we still have a room next week." },
      { label: "You owe me a drink.", effect: () => { shiftRelation(s, "maya", 1); remember(s, "maya_owes_drink"); return "That is, regrettably, legally binding."; } }
    ]});
  }
  if (s.phase === "clash") {
    const choices = [
      { label: "What do you actually want?", response: "To do the show. I don't especially want to become the closure content while doing it." }
    ];
    if (s.flags.powerFixed) choices.unshift({
      label: "Keep broadcasting from the radio room. I'll keep the viewing out of it.",
      effect: () => { shiftRelation(s, "maya", 1); resolve("quiet_broadcast", "maya_keep_broadcasting"); return "Maya looks at the little room, then the hall. ‘Fine. Tiny studio sovereignty.’"; }
    });
    if (s.flags.powerFixed && s.flags.mayaKnowsVacantTarget) choices.unshift({
      label: "Ask Rowan about ‘vacant possession Monday’ on air.",
      effect: () => { shiftRelation(s, "maya", 2); resolve("live_interview", "maya_live_interview"); return "Maya's expression changes from annoyed to professionally delighted. ‘Oh. That's a very answerable question.’"; }
    });
    return openDialogue({ speaker: "Maya", lines: ["Rowan wants the hall clear. Ben wants a person with authority. Priya looks like she would rather be touring a burning building."], choices });
  }

  const choices = [];
  if (s.flags.knowsVacantTarget && !s.flags.mayaKnowsVacantTarget) choices.push({
    label: "Tell her the pack says ‘vacant possession target Monday’.",
    effect: () => { s.flags.mayaKnowsVacantTarget = true; shiftRelation(s, "maya", 1); remember(s, "told_maya_vacant_target"); return "Maya goes quiet for half a second. ‘Monday. Nice of the building to find out.’"; }
  });
  if (s.flags.heardOccupancyContradiction && !s.flags.knowsVacantTarget) choices.push({
    label: "Tell her their occupancy sheet already calls the hall vacant after seven.",
    effect: () => { remember(s, "told_maya_occupancy_sheet"); return "‘We're doing very well for imaginary people.’"; }
  });
  if (!s.memories.includes("maya_opening")) {
    remember(s, "maya_opening");
    choices.push(
      { label: "I'll look for the extension reel.", effect: () => { shiftRelation(s, "maya", 1); remember(s, "offered_to_find_reel"); return "‘Store room, allegedly. If you find three broken lecterns, you've gone too far.’"; } },
      { label: "What is tonight's show meant to be?", effect: () => { learn(s, "tonights_show_local_news"); return "‘Local news, bad music, and June explaining why the borough's only reliable institution is her line-dance WhatsApp.’"; } },
      { label: "Who is the man measuring the foyer?", effect: () => { remember(s, "noticed_rowan_early"); return "‘No idea. Quarter-zip. Laser measurer. Could be property, could be a very boring assassin.’"; } }
    );
    return openDialogue({
      speaker: "Maya",
      lines: ["You made it. Good. The mixer keeps dying, the extension reel has vanished, and some man in a quarter-zip has been measuring the foyer. Normal Thursday."],
      choices
    });
  }
  choices.push({ label: s.flags.powerFixed ? "Mixer's sorted." : "Still fighting the mixer?", response: s.flags.powerFixed ? "‘Heroic. The licence fee salutes you.’" : "‘Only spiritually. The actual problem is electricity.’" });
  choices.push({ label: "See what happens next.", response: "‘That's basically the editorial policy.’" });
  return openDialogue({ speaker: "Maya", lines: ["Maya watches the hall through the radio-room window while pretending to check levels."], choices });
}

function talkBen(s) {
  if (s.phase === "clash") {
    const choices = [{ label: "Who actually has authority to clear a valid booking?", response: "‘That is the question I have now asked four people, which means it may be legally dangerous.’" }];
    if (s.flags.knowsVacantTarget) choices.unshift({
      label: "Show Ben the ‘vacant possession Monday’ line.",
      effect: () => { s.flags.benKnowsVacantTarget = true; shiftRelation(s, "ben", 1); resolve("formal_pause", "ben_refuses_clearance"); return "Ben reads it twice. ‘Right. Nobody's clearing anything until Property tell me, in writing, when they informed the users.’"; }
    });
    return openDialogue({ speaker: "Ben", lines: ["Ben has his phone in one hand and the booking sheet in the other. He has achieved the posture of a man who intends to be extremely reasonable until somebody else gives up."], choices });
  }
  const choices = [
    { label: "Is the building actually closing?", response: "‘No one's said closing. The phrase was “withdrawal of unmanaged access”. I asked if that meant closing. They repeated it slower.’" },
    { label: "Any idea where the extension reel went?", response: "‘Store room, behind the stack chairs. Unless Pilates took it hostage again.’" }
  ];
  if (s.flags.knowsVacantTarget && !s.flags.benKnowsVacantTarget) choices.unshift({
    label: "Tell him the briefing pack assumes vacant possession Monday.",
    effect: () => { s.flags.benKnowsVacantTarget = true; shiftRelation(s, "ben", 1); remember(s, "told_ben_vacant_target"); return "Ben stops smiling. ‘Monday as in four days from now Monday?’"; }
  });
  return openDialogue({ speaker: "Ben", lines: ["Ben is carrying three sets of keys and the quiet resentment of a man who is always the last person told anything about his own building."], choices });
}

function talkJune(s) {
  if (s.phase === "clash") {
    const choices = [];
    if (!s.flags.juneKeyOffered) choices.push({
      label: "Is there another way in if they close the front doors?",
      effect: () => { s.flags.juneKeyOffered = true; shiftRelation(s, "june", 1); remember(s, "june_offered_side_key"); return "June produces an old brass key. ‘They changed the locks in 2016. Not all of them.’"; }
    });
    choices.push({ label: "What do you make of all this?", response: "‘If a room is vacant while I'm in it, I expect a council tax refund.’" });
    return openDialogue({ speaker: "June", lines: ["June has put her coat back on but has made no move toward the exit."], choices });
  }
  const choices = [
    { label: "Your Saturday booking still happening?", response: "‘According to my email, yes. According to that young man's measuring device, possibly in another dimension.’" },
    { label: "How long have you used this place?", effect: () => { shiftRelation(s, "june", 1); return "‘Since it had ashtrays. I've survived three refurbishments and a “community reset”.’"; } }
  ];
  if (!s.flags.juneKeyOffered && s.worldTime > 80) choices.push({
    label: "What if somebody decides to lock everyone out?",
    effect: () => { s.flags.juneKeyOffered = true; shiftRelation(s, "june", 1); remember(s, "june_offered_side_key"); return "June taps her handbag. ‘I've had a side-door key since 2009. Nobody has ever successfully asked for it back.’"; }
  });
  return openDialogue({ speaker: "June", lines: ["June is making tea in a mug that says BELLWETHER ACTIVE AGEING 2014."], choices });
}

function talkRowan(s) {
  if (s.phase === "clash") {
    const choices = [{ label: "We're booked until nine.", response: "‘I know. I was told there would be no live bookings. I'm trying to reconcile two very confident documents.’" }];
    if (s.flags.knowsVacantTarget) choices.unshift({
      label: "Your pack says ‘vacant possession Monday’. Who told you the users had gone?",
      effect: () => { s.flags.rowanKnowsPlayerReadPack = true; shiftRelation(s, "rowan", -1); resolve("formal_pause", "rowan_calls_off_viewing"); return "Rowan looks at the hall, then at the pack. ‘Nobody told me they'd gone. They told me vacant possession was the operating assumption. Those are suddenly different sentences.’"; }
    });
    return openDialogue({ speaker: "Rowan", lines: ["Rowan is no longer measuring anything. This has improved him."], choices });
  }
  const choices = [
    { label: "What's a community asset familiarisation?", response: "‘A pre-lease viewing without commitment. Ideally with fewer current users than this one.’" },
    { label: "Are you here to close the hall?", effect: () => { shiftRelation(s, "rowan", -1); return "‘No. I don't have closure authority. I have a laser measurer and an appointment.’"; } }
  ];
  if (s.flags.knowsVacantTarget) choices.unshift({
    label: "What's ‘vacant possession target Monday’?",
    effect: () => { s.flags.rowanKnowsPlayerReadPack = true; return "Rowan glances at the folder. ‘That's a council assumption, not my wording. And, for the record, I am beginning to question the assumption.’"; }
  });
  return openDialogue({ speaker: "Rowan", lines: ["Up close, Rowan looks less like a villain than a man who has arrived with the wrong spreadsheet and realised it in public."], choices });
}

function talkPriya(s) {
  s.flags.metPriya = true;
  if (s.phase === "clash") {
    return openDialogue({ speaker: "Priya", lines: ["Priya looks from the stacked chairs to Maya's microphone to Rowan's glossy floorplan."], choices: [
      { label: "Were you genuinely told this place was empty?", response: "‘Vacant and ready for meanwhile activation. I assumed “meanwhile” meant before the next use, not during it.’" },
      { label: "You don't have to do the viewing tonight.", effect: () => { shiftRelation(s, "priya", 1); return "‘I know. I'm currently deciding how much I want an office whose first amenity is this conversation.’"; } }
    ]});
  }
  return openDialogue({ speaker: "Priya", lines: ["Priya lowers her voice. ‘I run a small architecture practice. We were told this was unused council space. I feel I should say that before somebody assumes I personally evicted the line dancers.’"], choices: [
    { label: "Nobody seems to know what's happening yet.", response: "‘That's comforting in a very specific way.’" },
    { label: "There are current bookings all week.", response: "Priya looks back at Rowan. ‘That was not in the particulars.’" }
  ]});
}

function openDialogue({ speaker, lines, choices }) {
  session.dialogue = { speaker, lines, choices, response: null };
  renderDialogue();
}

function renderDialogue() {
  const layer = document.querySelector("#dialogue");
  if (!layer || !session?.dialogue) return;
  const d = session.dialogue;
  layer.hidden = false;
  layer.innerHTML = `
    <div class="dialogue-box">
      <div class="speaker">${escapeHtml(d.speaker)}</div>
      <div class="dialogue-lines">${d.lines.map((l) => `<p>${escapeHtml(l)}</p>`).join("")}</div>
      ${d.response ? `<div class="response"><p>${escapeHtml(d.response)}</p><button id="dialogue-close" type="button">Continue</button></div>` : `
        <div class="choice-list">${d.choices.map((c, i) => `<button type="button" data-choice="${i}"><span>${i + 1}</span>${escapeHtml(c.label)}</button>`).join("")}</div>`}
    </div>`;
  layer.querySelectorAll("[data-choice]").forEach((button) => button.addEventListener("click", () => chooseDialogue(Number(button.dataset.choice))));
  layer.querySelector("#dialogue-close")?.addEventListener("click", closeDialogue);
}

function chooseDialogue(index) {
  const d = session?.dialogue;
  if (!d || d.response) return;
  const choice = d.choices[index];
  if (!choice) return;
  session.state.dialogueChoices += 1;
  record("dialogue_choice", { speaker: d.speaker, index, label: choice.label });
  const response = choice.effect ? choice.effect() : choice.response;
  if (response == null && session?.dialogue) {
    closeDialogue();
    return;
  }
  if (!session?.dialogue) return;
  d.response = response ?? "";
  renderDialogue();
}

function closeDialogue() {
  if (!session) return;
  session.dialogue = null;
  const layer = document.querySelector("#dialogue");
  if (layer) { layer.hidden = true; layer.innerHTML = ""; }
}

function resolve(outcome, via) {
  if (!session || !resolveOutcome(session.state, outcome)) return;
  record("clash_resolved", { outcome, via, state: summary(session.state) });
  const copy = OUTCOME_COPY[outcome];
  toast(copy?.title ?? "The situation changes.", 5200);
}

function toast(text, ms = 3000) {
  if (!session) return;
  session.toast = text;
  session.toastUntil = performance.now() + ms;
}

function finishRun(early) {
  if (!session || session.run.endedAt) return;
  session.run.endedAt = nowIso();
  session.run.finalState = summary(session.state);
  record("run_finished", { early, outcome: session.state.outcome });
  saveRun(session.run);
  stopLoop();
  renderDebrief();
}

function abandonRun() {
  if (!session || session.run.endedAt || session.run.abandonedAt) return;
  session.run.abandonedAt = nowIso();
  session.run.finalState = summary(session.state);
  saveRun(session.run);
}

function renderDebrief() {
  const outcome = OUTCOME_COPY[session.state.outcome] ?? OUTCOME_COPY.default_shuffle;
  app.innerHTML = `
    <section class="debrief-shell">
      <article class="debrief-card">
        <p class="eyebrow">Immediate playtest record</p>
        <h1>${escapeHtml(outcome.title)}</h1>
        <p class="outcome-copy">${escapeHtml(outcome.body)}</p>
      </article>
      <article class="debrief-card ratings">
        ${rating("intention", "I formed my own intention without the game announcing an objective")}
        ${rating("space", "Moving through the space changed what I noticed or chose")}
        ${rating("physicalAgency", "I did something meaningful that would be awkward to express as only a dialogue choice")}
        ${rating("continuity", "The place felt like it continued without waiting for me")}
        ${rating("chores", "The interactions felt like part of the situation rather than chores")}
        ${rating("vsVn", "I would rather play this than experience the same material as a dialogue-only VN scene")}
        ${rating("more", "I wanted to see what this evening led to afterward")}
      </article>
      <article class="debrief-card notes-grid">
        <label>What did you decide you cared about?<textarea id="care" rows="3"></textarea></label>
        <label>What did you do because you wanted to, rather than because the game told you to?<textarea id="selfDirected" rows="3"></textarea></label>
        <label>What did you think might be happening elsewhere while you were occupied?<textarea id="elsewhere" rows="3"></textarea></label>
        <label>Which interactions felt artificial, gamey, slow, or unnecessary?<textarea id="friction" rows="3"></textarea></label>
        <label>Anything else?<textarea id="notes" rows="4"></textarea></label>
      </article>
      <button id="save-debrief" class="primary save" type="button">Save debrief</button>
    </section>`;
  document.querySelector("#save-debrief")?.addEventListener("click", saveDebrief);
}

function rating(key, label) {
  return `<fieldset data-rating="${key}"><legend>${escapeHtml(label)}</legend><div>${[1,2,3,4,5].map((n) => `<label><input type="radio" name="${key}" value="${n}"><span>${n}</span></label>`).join("")}</div><small>1 = strongly disagree · 5 = strongly agree</small></fieldset>`;
}

function saveDebrief() {
  const ratings = {};
  document.querySelectorAll("[data-rating]").forEach((f) => {
    const checked = f.querySelector("input:checked");
    ratings[f.dataset.rating] = checked ? Number(checked.value) : null;
  });
  session.run.debrief = {
    savedAt: nowIso(),
    ratings,
    care: document.querySelector("#care")?.value.trim() ?? "",
    selfDirected: document.querySelector("#selfDirected")?.value.trim() ?? "",
    elsewhere: document.querySelector("#elsewhere")?.value.trim() ?? "",
    friction: document.querySelector("#friction")?.value.trim() ?? "",
    notes: document.querySelector("#notes")?.value.trim() ?? ""
  };
  saveRun(session.run);
  session = null;
  renderHome();
}

function draw() {
  if (!session) return;
  const canvas = document.querySelector("#world");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, WORLD.width, WORLD.height);
  drawBackground(ctx);
  drawRooms(ctx);
  drawFurniture(ctx);
  drawObjects(ctx);
  drawNpcs(ctx);
  drawPlayer(ctx);
  drawAmbient(ctx);
  drawHud();
}

function drawBackground(ctx) {
  ctx.fillStyle = "#bfc6bf"; ctx.fillRect(0, 0, WORLD.width, WORLD.height);
  ctx.fillStyle = "#88998f"; ctx.fillRect(860, 65, 195, 570);
  ctx.strokeStyle = "rgba(225,240,235,.3)"; ctx.lineWidth = 1;
  const offset = (session.state.worldTime * 45) % 24;
  for (let x = 880; x < 1050; x += 18) for (let y = 70 - offset; y < 635; y += 28) {
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 5, y + 13); ctx.stroke();
  }
}

function drawRooms(ctx) {
  const fills = { foyer: "#e9e2d2", hall: "#ddd1ba", radio: "#c8d6cf", kitchen: "#d9d5c4", store: "#c9c2b0", corridor: "#d4ccba", courtyard: "transparent" };
  for (const r of ROOMS) {
    if (r.id !== "courtyard") { ctx.fillStyle = fills[r.id]; ctx.fillRect(r.x, r.y, r.w, r.h); }
    ctx.fillStyle = "rgba(40,48,45,.42)"; ctx.font = "700 12px system-ui"; ctx.fillText(r.name, r.x + 12, r.y + 22);
  }
  ctx.fillStyle = "#39443f";
  for (const s of SOLIDS) ctx.fillRect(s.x, s.y, s.w, s.h);
  ctx.fillStyle = "#9eb6b4"; ctx.fillRect(72, 118, 8, 48);
  ctx.fillStyle = "#9eb6b4"; ctx.fillRect(860, 194, 15, 52);
}

function drawFurniture(ctx) {
  ctx.fillStyle = "#7f725f";
  for (let row = 0; row < 3; row++) for (let col = 0; col < 5; col++) {
    ctx.fillRect(380 + col * 62, 270 + row * 45, 28, 24);
  }
  ctx.fillStyle = "#5f665f"; ctx.fillRect(120, 315, 120, 38);
  ctx.fillStyle = session.state.flags.powerFixed ? "#7fc58e" : "#9b655f";
  ctx.beginPath(); ctx.arc(208, 325, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#aaa18b"; ctx.fillRect(105, 500, 130, 35);
  ctx.strokeStyle = "#736b5c"; ctx.lineWidth = 3;
  for (let i = 0; i < 4; i++) ctx.strokeRect(360 + i * 12, 485 - i * 6, 44, 32);
  ctx.fillStyle = "#8f8168"; ctx.fillRect(220, 190, 80, 22);
  ctx.fillStyle = "#eee7d6"; ctx.fillRect(105, 92, 110, 58);
  ctx.fillStyle = "#53645c"; ctx.font = "700 9px system-ui";
  ctx.fillText("TONIGHT", 116, 108); ctx.fillText("19:00 RADIO BELLWETHER", 116, 124); ctx.fillText("BOOKED UNTIL 21:00", 116, 139);
}

function drawObjects(ctx) {
  const s = session.state;
  if (!session.objects.reel.hidden && s.carried !== "reel" && !s.flags.powerFixed) {
    ctx.strokeStyle = "#c76f3d"; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(410, 555, 16, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = "#3b3b36"; ctx.fillRect(405, 548, 10, 14);
  }
  if (!session.objects.pack.hidden && session.state.worldTime <= 230) {
    ctx.fillStyle = "#efe9dc"; ctx.fillRect(250, 196, 30, 20); ctx.strokeStyle = "#53645c"; ctx.strokeRect(250, 196, 30, 20);
  }
  ctx.fillStyle = s.flags.sideDoorOpen ? "#b9d7c1" : "#615e55"; ctx.fillRect(856, 200, 12, 38);
  if (s.carried === "reel") {
    ctx.strokeStyle = "#c76f3d"; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(session.player.x + 18, session.player.y - 6, 9, 0, Math.PI * 2); ctx.stroke();
  }
}

function drawNpcs(ctx) {
  for (const npc of Object.values(session.npcs)) {
    if (!npc.visible) continue;
    const palette = { maya: "#744f78", ben: "#58685e", june: "#8b684f", rowan: "#52657b", priya: "#866057" };
    ctx.fillStyle = "rgba(0,0,0,.15)"; ctx.beginPath(); ctx.ellipse(npc.x + 4, npc.y + 9, 16, 8, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = palette[npc.id] ?? "#555"; ctx.beginPath(); ctx.arc(npc.x, npc.y, 15, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "white"; ctx.font = "800 9px system-ui"; ctx.textAlign = "center"; ctx.fillText(npc.initials, npc.x, npc.y + 3); ctx.textAlign = "left";
    if (dist(session.player, npc) < 95) {
      ctx.fillStyle = "rgba(35,42,40,.72)"; ctx.font = "600 10px system-ui"; ctx.fillText(npc.name, npc.x - 30, npc.y - 23);
    }
  }
}

function drawPlayer(ctx) {
  const p = session.player;
  ctx.fillStyle = "rgba(0,0,0,.18)"; ctx.beginPath(); ctx.ellipse(p.x + 4, p.y + 10, 16, 8, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#1e2e31"; ctx.beginPath(); ctx.arc(p.x, p.y, 14, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = "#f4efe3"; ctx.beginPath(); ctx.arc(p.x, p.y - 2, 5, 0, Math.PI * 2); ctx.fill();
  const vec = { up: [0,-1], down:[0,1], left:[-1,0], right:[1,0] }[p.facing];
  ctx.strokeStyle = "#f4efe3"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + vec[0]*18, p.y + vec[1]*18); ctx.stroke();
}

function drawAmbient(ctx) {
  const a = session.ambient;
  if (!a) return;
  const npc = a.speaker ? session.npcs[a.speaker] : null;
  const x = npc?.x ?? 560, y = npc?.y ?? 130;
  const maxW = 300;
  ctx.font = "600 13px system-ui";
  const lines = wrapText(ctx, a.text, maxW - 24);
  const h = lines.length * 18 + 22;
  const bx = clamp(x - maxW/2, 90, 1020 - maxW);
  const by = clamp(y - h - 30, 85, 560);
  ctx.fillStyle = "rgba(249,247,239,.97)"; roundRect(ctx, bx, by, maxW, h, 10); ctx.fill();
  ctx.strokeStyle = "rgba(45,55,52,.2)"; ctx.stroke();
  ctx.fillStyle = "#222927"; lines.forEach((line, i) => ctx.fillText(line, bx + 12, by + 19 + i * 18));
}

function wrapText(ctx, text, width) {
  const words = text.split(/\s+/); const lines = []; let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > width && line) { lines.push(line); line = word; } else line = test;
  }
  if (line) lines.push(line); return lines;
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x,y,w,h,r) : ctx.rect(x,y,w,h);
}

function drawHud() {
  const hud = document.querySelector("#hud");
  const prompt = document.querySelector("#prompt");
  const toastEl = document.querySelector("#toast");
  if (!hud || !prompt || !toastEl) return;
  const mins = 41 + Math.floor(session.state.worldTime / 60);
  const hour = 18 + Math.floor(mins / 60);
  const minute = mins % 60;
  const room = currentRoom(session.player)?.name ?? "OUTSIDE";
  hud.innerHTML = `<div><strong>${String(hour).padStart(2,"0")}:${String(minute).padStart(2,"0")}</strong><span>Thursday · ${room}</span></div>${session.state.carried ? `<div class="carrying">carrying: extension reel</div>` : ""}`;
  prompt.innerHTML = session.nearest ? `<span>E</span>${escapeHtml(session.nearest.label)}` : "";
  if (session.toast && performance.now() < session.toastUntil) { toastEl.textContent = session.toast; toastEl.classList.add("show"); }
  else { toastEl.textContent = ""; toastEl.classList.remove("show"); }
  if (DEBUG) {
    const debug = document.querySelector("#debug");
    if (debug) debug.textContent = JSON.stringify({ time: round(session.state.worldTime), room, phase: session.state.phase, nearest: session.nearest?.id, state: summary(session.state) }, null, 2);
  }
}

function wireTouchControls() {
  document.querySelectorAll("[data-move]").forEach((button) => {
    const key = { up: "arrowup", down: "arrowdown", left: "arrowleft", right: "arrowright" }[button.dataset.move];
    const down = (e) => { e.preventDefault(); keys.add(key); };
    const up = (e) => { e.preventDefault(); keys.delete(key); };
    button.addEventListener("pointerdown", down); button.addEventListener("pointerup", up); button.addEventListener("pointercancel", up); button.addEventListener("pointerleave", up);
  });
  document.querySelector("[data-interact]")?.addEventListener("click", interact);
}

function exportRuns() {
  const payload = { schemaVersion: 5, prototype: PROTOTYPE_ID, exportedAt: nowIso(), runs: loadRuns() };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob); const a = document.createElement("a");
  a.href = url; a.download = `managed-decline-v005-${new Date().toISOString().replaceAll(":","-")}.json`; document.body.append(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

window.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (["arrowup","arrowdown","arrowleft","arrowright","w","a","s","d","e","1","2","3","4","enter","escape"].includes(key)) e.preventDefault();
  if (session?.dialogue) {
    if (/^[1-9]$/.test(key) && !session.dialogue.response) chooseDialogue(Number(key)-1);
    else if ((key === "enter" || key === "e") && session.dialogue.response) closeDialogue();
    else if (key === "escape" && session.dialogue.response) closeDialogue();
    return;
  }
  if (key === "e" || key === "enter") { interact(); return; }
  keys.add(key);
});
window.addEventListener("keyup", (e) => keys.delete(e.key.toLowerCase()));
window.addEventListener("blur", () => keys.clear());
window.addEventListener("beforeunload", abandonRun);
homeButton.addEventListener("click", renderHome);
exportButton.addEventListener("click", exportRuns);
modeBadge.textContent = DEBUG ? "Debug mode" : "Prototype";
renderHome();

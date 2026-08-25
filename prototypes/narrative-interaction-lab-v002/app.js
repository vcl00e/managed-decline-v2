import { PROTOTYPE_ID, STORY_TITLE, STORY_SUBTITLE, LOCATIONS, CHARACTERS, DEBRIEF_QUESTIONS, ENDING_COPY } from "./story.js";
import { createSessionState, getNodeView, getMapView, getAvailableActions, chooseAction, enterMapLocation, summariseState } from "./engine.js";

const STORAGE_KEY = "managed-decline:narrative-interaction-lab-v002:arrangement-runs";
const params = new URLSearchParams(location.search);
const ANNOTATE = params.get("annotate") === "1";
const app = document.querySelector("#app");
const title = document.querySelector("#lab-title");
const subtitle = document.querySelector("#lab-subtitle");
const modeBadge = document.querySelector("#mode-badge");
let current = null;

const esc = (value) => String(value ?? "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
const nowIso = () => new Date().toISOString();
const id = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const duration = (ms) => { const s=Math.max(0,Math.round(ms/1000)); return s<60?`${s}s`:`${Math.floor(s/60)}m ${s%60}s`; };

function loadRuns(){ try { const value=JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]"); return Array.isArray(value)?value:[]; } catch { return []; } }
function saveRuns(runs){ localStorage.setItem(STORAGE_KEY, JSON.stringify(runs)); }
function persist(run){ const runs=loadRuns(); const i=runs.findIndex((r)=>r.id===run.id); if(i>=0) runs[i]=run; else runs.push(run); saveRuns(runs); }
function elapsed(){ return current ? Date.now()-new Date(current.run.startedAt).getTime() : 0; }

function makeRun(){ return { schemaVersion:3, prototype:PROTOTYPE_ID, id:id(), startedAt:nowIso(), endedAt:null, abandonedAt:null, steps:[], endingId:null, finalState:null, debrief:null }; }
function startRun(){ abandon(); current={ state:createSessionState(), run:makeRun() }; title.textContent=STORY_TITLE; subtitle.textContent=STORY_SUBTITLE; render(); }
function abandon(){ if(!current || current.run.endedAt || current.run.abandonedAt) return; current.run.abandonedAt=nowIso(); current.run.finalState=summariseState(current.state); persist(current.run); }
function record(kind, details, before, after){ current.run.steps.push({ index:current.run.steps.length, at:nowIso(), elapsedMs:elapsed(), kind, ...details, before, after }); }

function doAction(action){ const node=getNodeView(current.state); const before=summariseState(current.state); chooseAction(current.state, action.id); const after=summariseState(current.state); record(action.kind ?? "dialogue", { nodeId:node?.id, locationId:node?.locationId ?? null, actionId:action.id, label:action.label, intent:action.intent ?? null }, before, after); render(); }
function visit(locationId){ const before=summariseState(current.state); enterMapLocation(current.state,locationId); const after=summariseState(current.state); record("map",{ locationId, actionId:`visit-${locationId}`, label:`Go to ${LOCATIONS[locationId].short}`, intent:`Give attention to ${LOCATIONS[locationId].short}`},before,after); render(); }

function render(){ if(!current) return home(); if(current.state.screen==="map") return mapView(); if(current.state.screen==="debrief") return debrief(); const node=getNodeView(current.state); if(node?.endingId) return ending(node); nodeView(node); }

function home(){ abandon(); current=null; title.textContent="Narrative Interaction Lab v002"; subtitle.textContent="Arrangement ecology playtest"; const runs=loadRuns(); const complete=runs.filter(r=>r.endedAt).length; const abandoned=runs.filter(r=>r.abandonedAt).length;
  app.innerHTML=`<main class="home-shell">
    <section class="hero panel"><p class="eyebrow">Managed Decline · formative prototype</p><h1>${esc(STORY_TITLE)}</h1><p class="lede">${esc(STORY_SUBTITLE)}</p>
      <p>Leave work with no assigned mission. Three ordinary arrangements begin to overlap: a community performance, a private evening with Tabitha, and the council's attempt to keep activities going at a substitute venue. Decide what deserves your attention, what you will promise, what you will make public, and when you will leave.</p>
      <div class="facts"><span>3 physical locations</span><span>1 online space</span><span>6 characters</span><span>3 arrangements</span><span>4 aftermaths</span></div>
      <button id="begin" class="primary">Begin the evening</button></section>
    <section class="panel"><p class="eyebrow">What this playtest is trying to falsify</p><h2>Does the arrangement ecology feel like a game rather than a trust simulation?</h2>
      <ul><li>Do you form your own intention before the game states one?</li><li>Do time, information, access and relationships create real trade-offs?</li><li>Do practical choices alter relationships and vice versa?</li><li>Do you revise a plan when the evening changes?</li><li>Does visible residue create a new desire after the convergence?</li></ul></section>
    <section class="panel cast"><p class="eyebrow">People already living here</p>${Object.values(CHARACTERS).map(c=>`<div><b>${esc(c.name)}</b><small>${esc(c.role)}</small></div>`).join("")}</section>
    <section class="panel data"><p>${complete} completed · ${abandoned} abandoned · ${runs.length} local trace${runs.length===1?"":"s"}</p><p>Nothing is transmitted. Use <code>?annotate=1</code> to expose hidden state for design debugging.</p></section>
  </main>`;
  document.querySelector("#begin").addEventListener("click",startRun);
}

function mapView(){ const view=getMapView(current.state); app.innerHTML=`<main class="map-shell"><section class="panel map-head"><div><p class="eyebrow">${esc(view.heading)}</p><h1>Where do you go?</h1><p>${current.state.openingCount===0?"Nothing has been promoted into your responsibility yet.":"You have already given one part of the lane your attention. The rest of the evening is still capable of changing shape."}</p></div><time>${current.state.openingCount===0?"17:42":"18:11"}</time></section>
  <section class="lane panel">${Object.values(view.locations).map(loc=>`<article class="place ${loc.available?"available":"closed"}"><p class="eyebrow">${esc(loc.kicker)}</p><h2>${esc(loc.name)}</h2><p>${esc(loc.status)}</p><small>${loc.people.map(id=>CHARACTERS[id].name).join(" · ")}</small>${loc.available?`<button data-place="${loc.id}">Go there</button>`:`<span>Already visited</span>`}</article>`).join("")}</section>
  <section class="panel quiet"><p>No location is marked as the main story. Travel is compressed to the decision about where your attention goes.</p></section></main>`;
  app.querySelectorAll("[data-place]").forEach(b=>b.addEventListener("click",()=>visit(b.dataset.place)));
}

function nodeView(node){ if(!node){ app.innerHTML=`<main class="panel"><h1>Prototype data error</h1><p>Missing node.</p></main>`; return; } const location=node.locationId?LOCATIONS[node.locationId]:null; const actions=getAvailableActions(current.state);
  app.innerHTML=`<main class="scene-shell"><section class="panel stage"><div><p class="eyebrow">${esc(location?.name ?? "Moor Lane / phone")}</p><h1>${esc(node.title)}</h1><time>${esc(node.time ?? "")}</time></div><div class="stage-cast">${(node.cast??[]).map(pid=>`<span>${esc(CHARACTERS[pid].initials)}<small>${esc(CHARACTERS[pid].name)}</small></span>`).join("")}<span class="you">YOU<small>Player</small></span></div></section>
  <section class="narrative"><article class="panel prose">${(node.prose??[]).map(renderText).join("")}</article>${node.lines?.length?`<article class="panel dialogue">${node.lines.map(renderLine).join("")}</article>`:""}
  <section class="choices">${actions.map((a,i)=>`<button data-action="${esc(a.id)}" class="choice ${a.kind?`kind-${a.kind}`:""}"><span>${i+1}</span><div><b>${esc(a.label)}</b>${ANNOTATE&&a.intent?`<small>${esc(a.intent)}</small>`:""}</div></button>`).join("")}</section></section>
  <aside class="aside"><section class="panel"><p class="eyebrow">This evening</p><p>${current.run.steps.length} decisions · ${duration(elapsed())}</p><details><summary>Recent conduct</summary><ol>${current.run.steps.slice(-5).map(s=>`<li>${esc(s.label)}</li>`).join("")||"<li>Nothing yet</li>"}</ol></details></section>${ANNOTATE?debugState():""}</aside></main>`;
  app.querySelectorAll("[data-action]").forEach(b=>b.addEventListener("click",()=>{const a=actions.find(x=>x.id===b.dataset.action); if(a) doAction(a);}));
}
function renderText(item){ return `<p>${esc(typeof item==="string"?item:item.text)}</p>`; }
function renderLine(item){ const c=item.speaker?CHARACTERS[item.speaker]:null; return `<div class="line"><b>${esc(c?.name ?? "Scene")}</b><p>${esc(item.text)}</p></div>`; }
function debugState(){ const s=current.state; return `<section class="panel debug"><p class="eyebrow">Hidden state</p><pre>${esc(JSON.stringify({arrangements:s.arrangements,commitments:s.commitments,information:s.information,access:s.access,material:s.material,relations:s.relations},null,2))}</pre></section>`; }

function ending(node){ if(!current.run.endedAt){ current.run.endedAt=nowIso(); current.run.endingId=node.endingId; current.run.finalState=summariseState(current.state); persist(current.run); } const copy=ENDING_COPY[node.endingId]; const residue=[...(node.residue??[]),...current.state.residue].filter((x,i,a)=>a.indexOf(x)===i);
  app.innerHTML=`<main class="ending-shell"><section class="panel ending-hero"><p class="eyebrow">Visible aftermath</p><h1>${esc(copy.title)}</h1><p class="lede">${esc(copy.summary)}</p></section>
  <section class="panel ending-copy">${(node.prose??[]).map(renderText).join("")}<div class="residue"><h2>What remains</h2><ul>${residue.map(r=>`<li>${esc(r)}</li>`).join("")}</ul></div><p>${current.run.steps.length} decisions · ${duration(new Date(current.run.endedAt)-new Date(current.run.startedAt))}</p><div class="buttons"><button id="debrief" class="primary">Record immediate debrief</button><button id="replay">Replay</button></div></section></main>`;
  document.querySelector("#debrief").addEventListener("click",()=>{current.state.screen="debrief";render();}); document.querySelector("#replay").addEventListener("click",startRun);
}

function rating(key,label){ return `<fieldset data-rating="${key}"><legend>${esc(label)}</legend><div>${[1,2,3,4,5].map(n=>`<label><input type="radio" name="${key}" value="${n}"><span>${n}</span></label>`).join("")}</div><small>1 = not at all · 5 = strongly</small></fieldset>`; }
function debrief(){ app.innerHTML=`<main class="debrief-shell"><section class="panel"><p class="eyebrow">Immediate tester record</p><h1>Before discussing the design</h1><p>Capture the participant's own model of what happened. Do not explain hidden state first.</p></section>
  <section class="panel ratings">${rating("presence","I felt present in the evening")}${rating("agency","My conduct felt meaningfully mine")}${rating("comprehension","I understood why events changed")}${rating("pull","The aftermath made me want to continue")}${rating("burden","The interaction felt like work")}${rating("map","Choosing where to go mattered")}${rating("fatigue","The amount of dialogue became tiring")}</section>
  <section class="panel"><label><b>Free notes</b><textarea id="notes" rows="7" placeholder="What did the participant want? What did they remember? Where did they hesitate?"></textarea></label></section>
  <section class="panel"><details open><summary>Interview prompts</summary><ol>${DEBRIEF_QUESTIONS.map(q=>`<li>${esc(q)}</li>`).join("")}</ol></details></section>
  <section class="panel buttons"><button id="save" class="primary">Save debrief and return home</button><button id="back">Back to aftermath</button></section></main>`;
  document.querySelector("#save").addEventListener("click",()=>{ const ratings={}; document.querySelectorAll("[data-rating]").forEach(f=>ratings[f.dataset.rating]=Number(f.querySelector("input:checked")?.value)||null); current.run.debrief={savedAt:nowIso(),ratings,notes:document.querySelector("#notes").value.trim()}; persist(current.run); home(); });
  document.querySelector("#back").addEventListener("click",()=>{ current.state.screen="node"; render(); });
}

function exportRuns(){ const payload={schemaVersion:3,prototype:PROTOTYPE_ID,exportedAt:nowIso(),runs:loadRuns()}; const blob=new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}); const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download=`managed-decline-arrangement-playtest-${new Date().toISOString().replaceAll(":","-")}.json`; document.body.append(a); a.click(); a.remove(); URL.revokeObjectURL(url); }
function clearRuns(){ const runs=loadRuns(); if(!runs.length) return; if(confirm(`Delete ${runs.length} local trace${runs.length===1?"":"s"}?`)){ localStorage.removeItem(STORAGE_KEY); if(!current) home(); } }

document.querySelector("#home-button").addEventListener("click",home);
document.querySelector("#export-button").addEventListener("click",exportRuns);
document.querySelector("#clear-button").addEventListener("click",clearRuns);
modeBadge.textContent=ANNOTATE?"Annotated design mode":"Playtest mode";
window.addEventListener("beforeunload",abandon);
window.addEventListener("keydown",(event)=>{ if(event.altKey||event.ctrlKey||event.metaKey) return; const n=Number(event.key); if(!Number.isInteger(n)||n<1||n>9) return; const el=app.querySelectorAll("[data-action],[data-place]")[n-1]; if(el){event.preventDefault();el.click();} });
home();

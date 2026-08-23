import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { LOCATIONS, CHARACTERS, NODES, ENDING_IDS, createInitialStoryState } from "../story.js";
import { clone, getNodeView, getAvailableActions, getAvailableMapDestinations, chooseAction, enterMapLocation, makeTraversalKey } from "../engine.js";

const failures=[]; const check=(ok,msg)=>{if(!ok) failures.push(msg)};
const wc=(s)=>String(s??"").trim().split(/\s+/).filter(Boolean).length;
const nodeWords=(node)=>wc([...(node.prose??[]).map(x=>typeof x==="string"?x:x.text),...(node.lines??[]).map(x=>typeof x==="string"?x:x.text),...(node.actions??[]).map(x=>x.label)].join(" "));

check(Object.keys(LOCATIONS).length===3,"must have exactly three physical locations");
check(Object.keys(CHARACTERS).length===6,"must have exactly six important characters");
check(Object.keys(createInitialStoryState().arrangements).length===3,"must model exactly three foreground arrangements");
check(new Set(ENDING_IDS).size===4,"must have four distinct aftermaths");

const actionIds=new Set();
for(const [key,node] of Object.entries(NODES)){
  check(node.id===key,`node key/id mismatch ${key}`); check(Boolean(node.title),`${key} missing title`);
  for(const action of node.actions??[]){ check(!actionIds.has(action.id),`duplicate action id ${action.id}`); actionIds.add(action.id); check(Boolean(action.label),`${action.id} missing label`); check(Boolean(action.next),`${action.id} missing next`); if(!action.next.startsWith("@")) check(Boolean(NODES[action.next]),`${action.id} targets missing ${action.next}`); }
}

function progressOpening(state, place){
  enterMapLocation(state,place); let guard=0;
  while(state.screen==="node" && !state.nodeId.startsWith("call_")){
    const actions=getAvailableActions(state);
    const progress=actions.find(a=>a.effects?.completeOpening===place) || actions.find(a=>a.next==="@opening-complete") || actions.find(a=>a.kind!=="observation") || actions[0];
    if(!progress) throw new Error(`cannot progress ${place} at ${state.nodeId}`);
    chooseAction(state,progress.id); if(++guard>20) throw new Error(`opening loop ${place}`); if(state.screen==="map") break;
  }
}
function runRepresentative(first,second,endingAction){
  const state=createInitialStoryState(); const seen=[]; const countNode=()=>{ if(state.screen==="node" && NODES[state.nodeId] && seen.at(-1)!==state.nodeId) seen.push(state.nodeId); };
  countNode(); chooseAction(state,"leave_work_to_map"); progressOpening(state,first); countNode(); progressOpening(state,second); countNode();
  let guard=0;
  while(!state.endingId){
    countNode(); const actions=getAvailableActions(state); if(!actions.length) throw new Error(`dead at ${state.nodeId}`);
    let next=actions.find(a=>a.id===endingAction);
    if(!next) next=actions.find(a=>a.kind!=="observation") || actions[0];
    chooseAction(state,next.id); if(++guard>40) throw new Error(`route loop at ${state.nodeId}`);
  }
  countNode(); return {state,seen,words:seen.reduce((sum,id)=>sum+nodeWords(NODES[id]),0)};
}
const endingRoutes=[
  ["hall","pub","final_honest_pub","honest_set"],
  ["pub","bus","final_hall_song","hall_song"],
  ["bus","hall","final_public_record","public_record"],
  ["hall","bus","final_leave","leave_together"]
];
let representativeMin=Infinity;
for(const [first,second,action,ending] of endingRoutes){ const r=runRepresentative(first,second,action); check(r.state.endingId===ending,`${action} should reach ${ending}, got ${r.state.endingId}`); representativeMin=Math.min(representativeMin,r.words); }
check(representativeMin>=4200,`representative complete route is only ${representativeMin} words; target >= 4200`);

const orders=[["hall","pub"],["hall","bus"],["pub","hall"],["pub","bus"],["bus","hall"],["bus","pub"]];
for(const [first,second] of orders){ const state=createInitialStoryState(); for(const place of [first,second]){ enterMapLocation(state,place); let guard=0; while(state.screen==="node"&&!state.nodeId.startsWith("call_")){ const actions=getAvailableActions(state); const progress=actions.find(a=>a.effects?.completeOpening===place)||actions.find(a=>a.next==="@opening-complete")||actions.find(a=>a.kind!=="observation")||actions[0]; if(!progress){failures.push(`cannot progress ${place} at ${state.nodeId}`);break;} chooseAction(state,progress.id); if(++guard>20){failures.push(`opening loop ${place}`);break;} if(state.screen==="map") break; } }
  const missing=Object.keys(LOCATIONS).find(id=>![first,second].includes(id)); check(state.nodeId===`call_${missing}`,`${first}>${second} should trigger call_${missing}, got ${state.nodeId}`); }

const allText=Object.values(NODES).flatMap(n=>[...(n.prose??[]).map(x=>typeof x==="string"?x:x.text),...(n.lines??[]).map(x=>typeof x==="string"?x:x.text),...(n.actions??[]).map(a=>a.label)]).join("\n");
for(const p of [/\bquest complete\b/i,/\bobjective:\b/i,/\btrust \+\d+/i,/\brelationship \+\d+/i,/\baction points?\b/i]) check(!p.test(allText),`exposed system language: ${p}`);

const app=await readFile(new URL("../app.js",import.meta.url),"utf8"); const html=await readFile(new URL("../index.html",import.meta.url),"utf8");
check(!/\bfetch\s*\(/.test(app),"browser app must make no network requests");
check(/JSON\.stringify\(payload,null,2\)/.test(app),"trace export must be readable indented JSON");
check(!/quest-log|objective-panel|meter-panel|score-panel|state-sidebar/i.test(app+html),"must not expose management UI");

if(failures.length){ console.error(`Validation failed (${failures.length})`); failures.forEach(x=>console.error(`- ${x}`)); process.exitCode=1; }
else { console.log(`Validated ${Object.keys(NODES).length} nodes and ${actionIds.size} actions.`); console.log(`Shortest representative complete route: ${representativeMin} authored words.`); console.log("All six opening orders trigger the unvisited-location interruption; representative routes reach all four aftermaths."); }

import { SCENES } from './scenario.js';
import { applySceneChoice, getEndingChoices, finishRun } from './model.js';

export function createVNController({vn,titleEl,speakerEl,textEl,choicesEl,portraitEl,runtime,onCompleteRun}) {
  let active=false, sceneId=null, scene=null, lineIndex=0, mode='lines', reaction=null;
  function start(id){if(active)return;sceneId=id;scene=SCENES[id];if(!scene)return;active=true;lineIndex=0;mode='lines';reaction=null;vn.hidden=false;runtime.setPaused(true);runtime.setInputContext('vn');render();}
  function render(){titleEl.textContent=scene.title||'';portraitEl.textContent=(scene.portraits||[]).map(id=>id.slice(0,3).toUpperCase()).join(' · ');choicesEl.replaceChildren();
    if(mode==='reaction'){speakerEl.textContent=reaction?.[0]||'';textEl.textContent=reaction?.[1]||'';const b=button('Continue',()=>close());b.classList.add('continue');choicesEl.append(b);return;}
    if(mode==='choices'){const last=scene.lines.at(-1);speakerEl.textContent=last?.[0]||'';textEl.textContent=last?.[1]||'';const choices=scene.dynamicChoices?getEndingChoices(runtime.state):scene.choices;choices.forEach((ch,i)=>choicesEl.append(button(`${i+1}. ${ch.text}`,()=>choose(ch))));return;}
    const[sp,tx]=scene.lines[lineIndex];speakerEl.textContent=sp;textEl.textContent=tx;const b=lineIndex===scene.lines.length-1?button('Continue',()=>{mode='choices';render();}):button('Continue',()=>{lineIndex++;render();});b.classList.add('continue');choicesEl.append(b);
  }
  function button(text,fn){const b=document.createElement('button');b.textContent=text;b.onclick=fn;return b;}
  function choose(choice){if(sceneId==='ending'){finishRun(runtime.state,choice);runtime.syncVisibleChanges();close({ending:true});onCompleteRun();return;}reaction=applySceneChoice(runtime.state,sceneId,choice);runtime.syncVisibleChanges();if(reaction){mode='reaction';render();}else close();}
  function close({cancelled=false,ending=false}={}){if(!active)return;vn.hidden=true;active=false;sceneId=null;scene=null;reaction=null;mode='lines';runtime.setPaused(ending);runtime.setInputContext(ending?'debrief':'world');if(cancelled)runtime.showNotice('You step back into the room without committing to that conversation.',2200);}
  function handleKey(key){if(!active)return false;if(key==='escape'){close({cancelled:true});return true;}if(mode==='choices'&&/^[1-4]$/.test(key)){const choices=scene.dynamicChoices?getEndingChoices(runtime.state):scene.choices;const ch=choices[Number(key)-1];if(ch)choose(ch);return true;}if(key==='enter'){if(mode==='reaction'){close();return true;}if(mode==='lines'){if(lineIndex<scene.lines.length-1)lineIndex++;else mode='choices';render();return true;}}return false;}
  return{get active(){return active;},start,close,handleKey};
}

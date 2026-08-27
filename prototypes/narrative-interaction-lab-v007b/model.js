import { CHARACTERS } from './scenario.js';

const clonePos = (c) => ({ x:c.start.x, y:c.start.y, target:{...c.start}, visible:c.id !== 'priya', mood:'normal', speech:'', speechUntil:0 });

export function createState() {
  return {
    runId: null,
    fictionalTime: '19:03',
    minute: 0,
    beat: 0,
    ended: false,
    paused: false,
    player: { x:118, y:420, facing:{x:1,y:0}, zone:'forecourt' },
    characters: Object.fromEntries(Object.values(CHARACTERS).map(c => [c.id, clonePos(c)])),
    flags: {
      tabithaArrivalDone:false,
      tabithaCompanion:false,
      tabithaSideDone:false,
      radioGroupTouched:false,
      radioGroupSceneDone:false,
      priyaArrived:false,
      priyaSettled:false,
      priyaGreetingDone:false,
      priyaPrivateDone:false,
      mixedStoryDone:false,
      closureActive:false,
      closureSceneDone:false,
      endingOpened:false,
      afterpartyAvailable:false,
      chipsAvailable:false,
      tabithaWalkAvailable:true,
      quietLingerUsed:false,
      observerLingerUsed:false
    },
    tags:{}, conduct:[], seenScenes:[], interpretations:{}, residue:[], trace:[], visibleChanges:[]
  };
}

export function record(state, type, payload={}) { state.trace.push({ index:state.trace.length, type, fictionalTime:state.fictionalTime, beat:state.beat, ...payload }); }
export function addVisibleChange(state, kind, detail) { const item={index:state.visibleChanges.length,kind,detail,beat:state.beat}; state.visibleChanges.push(item); record(state,'visible_change',item); return item; }

export function advanceBeat(state, minutes=8, reason='meaningful participation') {
  state.beat+=1; state.minute+=minutes; const total=19*60+3+state.minute; const hh=Math.floor(total/60)%24, mm=total%60;
  state.fictionalTime=`${String(hh).padStart(2,'0')}:${String(mm).padStart(2,'0')}`; record(state,'beat_advanced',{minutes,reason}); progressWorld(state);
}

export function recordConduct(state,event){
  const normalized={id:event.id,targets:event.targets??[],audience:event.audience??[],privacy:event.privacy??((event.audience?.length??0)>1?'public':'private'),tags:event.tags??[]};
  state.conduct.push(normalized); for(const tag of normalized.tags) state.tags[tag]=(state.tags[tag]??0)+1; record(state,'conduct',normalized);
}

export function applySceneChoice(state,sceneId,choice){
  if(!state.seenScenes.includes(sceneId)) state.seenScenes.push(sceneId);
  recordConduct(state,{id:choice.id,targets:inferTargets(choice.tags??[]),audience:defaultAudience(sceneId),tags:choice.tags??[]});
  applyEffect(state,choice.effect); markSceneDone(state,sceneId); advanceBeat(state,sceneId==='closing'?12:8,`scene:${sceneId}`); return choice.reaction??null;
}

function inferTargets(tags){const out=[];if(tags.some(t=>t.includes('tabitha')))out.push('tabitha');if(tags.some(t=>t.includes('priya')))out.push('priya');if(tags.some(t=>t.includes('maya')||t.includes('radio')||t.includes('group')))out.push('maya');return out;}
function defaultAudience(sceneId){if(sceneId==='tabitha_arrival'||sceneId==='tabitha_side')return['tabitha'];if(sceneId==='priya_greeting'||sceneId==='priya_private')return['priya'];if(sceneId==='radio_group')return['maya','alex','tabitha'];if(sceneId==='mixed_story')return['maya','alex','tabitha','priya'];if(sceneId==='closing')return['maya','alex','tabitha','priya','elliot'];return[];}
function markSceneDone(state,id){const m={tabitha_arrival:'tabithaArrivalDone',tabitha_side:'tabithaSideDone',radio_group:'radioGroupSceneDone',priya_greeting:'priyaGreetingDone',priya_private:'priyaPrivateDone',mixed_story:'mixedStoryDone',closing:'closureSceneDone'};if(m[id])state.flags[m[id]]=true;}

function applyEffect(state,effect){const c=state.characters;switch(effect){
case'tabitha_companion':state.flags.tabithaCompanion=true;c.tabitha.mood='with you';addVisibleChange(state,'position','Tabitha stays with you rather than heading inside.');break;
case'tabitha_go_inside':state.flags.tabithaCompanion=false;c.tabitha.target={x:420,y:285};addVisibleChange(state,'position','Tabitha heads into the hall while you remain free to follow or not.');break;
case'tabitha_stays_side':state.flags.tabithaCompanion=true;c.tabitha.mood='quiet company';addVisibleChange(state,'behaviour','Tabitha settles into the quieter side yard instead of returning to the room.');break;
case'group_welcomes_player':state.flags.radioGroupTouched=true;state.flags.afterpartyAvailable=true;addVisibleChange(state,'dialogue','Maya explicitly folds you into the ongoing radio-table banter.');break;
case'group_keeps_talking':state.flags.radioGroupTouched=true;addVisibleChange(state,'behaviour','Maya and Alex continue talking to each other; you are free to listen or walk away.');break;
case'tabitha_beside_player':state.flags.radioGroupTouched=true;c.tabitha.target={x:455,y:300};addVisibleChange(state,'position','Tabitha stays physically beside you at the edge of the group.');break;
case'priya_with_player':c.priya.target={x:290,y:330};c.priya.mood='with you';state.flags.priyaSettled=true;addVisibleChange(state,'position','Priya comes in beside you rather than hovering at the entrance.');break;
case'priya_self_settles':c.priya.target={x:610,y:330};c.priya.mood='settling independently';state.flags.priyaSettled=true;addVisibleChange(state,'behaviour','Priya heads in under her own steam and starts finding a place in the room.');break;
case'priya_companion':c.priya.mood='quiet company';state.flags.priyaSettled=true;addVisibleChange(state,'position','Priya stays with you outside instead of joining the room yet.');break;
case'priya_relaxes':c.priya.mood='more at ease';addVisibleChange(state,'behaviour','Priya visibly relaxes and stops scanning the room for an exit.');break;
case'priya_chips_plan':state.flags.chipsAvailable=true;addVisibleChange(state,'arrangement','You and Priya now have a concrete chips plan for later.');break;
case'tabitha_public_warmth':c.tabitha.mood='comfortable';addVisibleChange(state,'dialogue','Tabitha acknowledges the way you handled her story in front of everyone.');break;
case'tabitha_steps_away':state.flags.tabithaCompanion=false;c.tabitha.target={x:742,y:350};c.tabitha.mood='annoyed';addVisibleChange(state,'position','Tabitha immediately steps away from the group toward the side yard.');break;
case'maya_handles_closure':addVisibleChange(state,'behaviour','Maya takes over the closure logistics without recruiting you.');break;
case'helped_one_box':state.flags.afterpartyAvailable=true;addVisibleChange(state,'world','You help with one box; the rest continues without turning into a task list.');break;
case'ready_to_leave':addVisibleChange(state,'affordance','Leaving is now the obvious next affordance, but staying remains possible.');break;
}}

export function observeBeat(state,id='observe'){recordConduct(state,{id,tags:['comfortable_observer'],audience:[]});if(id==='quiet_linger')state.flags.quietLingerUsed=true;if(id==='room_linger')state.flags.observerLingerUsed=true;addVisibleChange(state,'world','The room continues around you without demanding a response.');advanceBeat(state,10,`observe:${id}`);}

export function progressWorld(state){const c=state.characters;
  if(state.beat>=1&&!state.flags.priyaArrived){state.flags.priyaArrived=true;c.priya.visible=true;c.priya.target={x:105,y:408};c.priya.mood='arrived';addVisibleChange(state,'arrival','Priya arrives at the forecourt. You do not have to go to her.');}
  if(state.beat>=2&&state.flags.priyaArrived&&!state.flags.priyaSettled&&!state.flags.priyaGreetingDone){state.flags.priyaSettled=true;c.priya.target={x:610,y:330};c.priya.mood='settling independently';addVisibleChange(state,'npc_initiative','Priya stops waiting for you and heads inside to find Maya herself.');}
  if(state.beat>=2&&!state.flags.tabithaSideDone&&c.tabitha.mood!=='annoyed'){c.tabitha.target={x:720,y:350};c.tabitha.mood='taking some air';addVisibleChange(state,'npc_initiative','Tabitha drifts toward the quieter side yard. You can follow her or stay where you are.');}
  if(state.beat>=4&&!state.flags.closureActive){state.flags.closureActive=true;c.elliot.mood='closing up';addVisibleChange(state,'world','Elliot starts quietly closing part of the hall; the evening can continue elsewhere or end.');}
}

export function getAvailableInteractions(state,zone){if(state.ended)return[];const out=[];
  if(zone==='forecourt'&&!state.flags.tabithaArrivalDone)out.push('tabitha_arrival');
  if(zone==='side'&&state.beat>=1&&!state.flags.tabithaSideDone)out.push('tabitha_side');
  if((zone==='main'||zone==='radio')&&!state.flags.radioGroupSceneDone)out.push('radio_group');
  if(zone==='forecourt'&&state.flags.priyaArrived&&!state.flags.priyaGreetingDone&&!state.flags.priyaSettled)out.push('priya_greeting');
  if((zone==='main'||zone==='radio')&&state.flags.priyaSettled&&!state.flags.priyaPrivateDone)out.push('priya_private');
  if((zone==='main'||zone==='radio')&&state.flags.radioGroupTouched&&state.flags.priyaSettled&&!state.flags.mixedStoryDone)out.push('mixed_story');
  if((zone==='main'||zone==='radio')&&state.flags.closureActive&&!state.flags.closureSceneDone)out.push('closing');
  if((zone==='forecourt'||zone==='side')&&state.flags.tabithaArrivalDone&&!state.flags.quietLingerUsed)out.push('quiet_linger');
  if((zone==='main'||zone==='radio')&&!state.flags.observerLingerUsed)out.push('room_linger');
  if(state.beat>=2&&zone==='forecourt')out.push('ending');return out;
}

export function getEndingChoices(state){const choices=[];if(state.flags.tabithaWalkAvailable)choices.push({id:'end_tabitha',text:'Walk toward the station with Tabitha.',tags:['left_with_tabitha','one_to_one_end']});if(state.flags.chipsAvailable||state.tags.chose_quiet_time_priya||state.tags.reassured_priya||state.tags.shared_uncertainty_priya)choices.push({id:'end_priya',text:'Go for chips with Priya.',tags:['went_chips_priya','one_to_one_end']});if(state.flags.afterpartyAvailable||state.flags.radioGroupTouched)choices.push({id:'end_maya',text:'Go on with Maya and the radio crowd.',tags:['joined_afterparty','group_end']});choices.push({id:'end_solo',text:'Call it a night and head home alone.',tags:['left_solo']});return choices;}
export function finishRun(state,choice){recordConduct(state,{id:choice.id,tags:choice.tags,audience:[]});state.ended=true;finalizeInterpretations(state,choice.id);addVisibleChange(state,'ending',choice.text);record(state,'run_ended',{ending:choice.id});}

export function finalizeInterpretations(state,endingId){const t=state.tags;let tabitha='easy_company';const te=[];
  if(t.crossed_tabitha_teasing_line){tabitha='made_me_the_story';te.push('crossed_tabitha_teasing_line');}
  if(t.chose_quiet_time_tabitha||t.noticed_tabitha||t.private_checkin_tabitha){tabitha=tabitha==='made_me_the_story'?'annoying_but_attentive':'comfortable_quiet_company';te.push('quiet/private attention');}
  if(t.respected_story_ownership||t.protected_tabitha_line||t.backed_tabitha_publicly){if(tabitha!=='made_me_the_story')tabitha='knows_where_the_line_is';te.push('public boundary handling');}
  if(endingId==='end_tabitha'){if(tabitha==='easy_company')tabitha='chose_more_time_with_me';te.push('walked together');}
  let priya='familiar_face';const pe=[];if(t.gave_priya_space){priya='trusted_me_to_land';pe.push('gave_priya_space');}if(t.chose_quiet_time_priya||t.reassured_priya||t.shared_uncertainty_priya){priya='easy_to_be_new_with';pe.push('private/easing conduct');}if(endingId==='end_priya'){priya='chose_more_time_with_me';pe.push('went_for_chips');}
  let maya='pleasant_guest';const me=[];if(t.group_participation||t.played_along){maya='fits_the_room';me.push('group_participation');}if(state.flags.afterpartyAvailable){maya='someone_to_include_again';me.push('radio_contact');}if(endingId==='end_maya'){maya='becoming_part_of_the_radio_crowd';me.push('joined_afterparty');}
  state.interpretations={tabitha:{read:tabitha,evidence:te},priya:{read:priya,evidence:pe},maya:{read:maya,evidence:me}};
  const residue=[{id:'hall_known',text:'The hall is now somewhere you recognise rather than an anonymous building.'}];
  if(endingId==='end_tabitha'||tabitha.includes('quiet')||tabitha.includes('more_time'))residue.push({id:'tabitha_photo',text:'Tabitha sends a blurry photo from the walk home with no explanation.'});
  if(endingId==='end_priya'||priya==='easy_to_be_new_with')residue.push({id:'priya_followup',text:'Priya messages about doing something quieter again.'});
  if(endingId==='end_maya'||maya.includes('radio')||maya.includes('include'))residue.push({id:'radio_invite',text:'Maya includes you in the next radio-night message.'});
  if(t.crossed_tabitha_teasing_line)residue.push({id:'story_shared',text:'The kebab-shop story has become group knowledge; Tabitha still remembers how it got there.'});state.residue=residue;record(state,'interpretations_finalized',{interpretations:state.interpretations,residue});
}

export function outcomeSummary(state){const lines=[];const end=state.conduct.findLast?.(x=>x.id?.startsWith('end_'))??[...state.conduct].reverse().find(x=>x.id?.startsWith('end_'));if(end?.id==='end_tabitha')lines.push('You left with Tabitha.');else if(end?.id==='end_priya')lines.push('You went for chips with Priya.');else if(end?.id==='end_maya')lines.push('You continued with Maya and the radio crowd.');else if(end?.id==='end_solo')lines.push('You went home alone.');else lines.push('You ended the evening on your own terms.');for(const r of state.residue.slice(0,3))lines.push(r.text);return lines;}
export function exportRun(state,debrief={}){return{prototype:'narrative-interaction-lab-v007b',scenario:'Friday Night — Free Social Topology',exportedAt:new Date().toISOString(),state,debrief};}

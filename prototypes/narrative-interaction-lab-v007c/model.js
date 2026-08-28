import { CHARACTERS } from './scenario.js';

const clonePerson = (c) => ({ x:c.start.x, y:c.start.y, target:{...c.start}, visible:c.id !== 'priya', mood:'normal', speech:'', speechUntil:0 });

export function createState() {
  return {
    runId:null,
    fictionalTime:'19:03', minute:0, beat:0, ended:false, paused:false,
    player:{x:118,y:420,facing:{x:1,y:0},zone:'forecourt'},
    characters:Object.fromEntries(Object.values(CHARACTERS).map(c=>[c.id,clonePerson(c)])),
    flags:{
      tabithaOpeningDone:false,
      withTabitha:false,
      noticeShared:false,
      tabithaPrivateDone:false,
      tabithaCallbackAvailable:false,
      tabithaCallbackDone:false,
      tabithaPlan:null,
      privateMotif:null,
      radioGroupTouched:false,
      radioGroupSceneDone:false,
      priyaArrived:false,
      priyaSettled:false,
      priyaPrivateDone:false,
      mixedStoryDone:false,
      closureActive:false,
      closureSceneDone:false,
      chipsAvailable:false,
      afterpartyAvailable:false,
      observerRadioUsed:false,
      privateContextReincorporated:false
    },
    tags:{},conduct:[],seenScenes:[],visibleChanges:[],trace:[],interpretations:{},residue:[]
  };
}

export function record(state,type,payload={}){state.trace.push({index:state.trace.length,type,beat:state.beat,fictionalTime:state.fictionalTime,...payload});}
export function addVisibleChange(state,kind,detail){const x={index:state.visibleChanges.length,kind,detail,beat:state.beat};state.visibleChanges.push(x);record(state,'visible_change',x);return x;}
function tag(state,tags=[]){for(const t of tags)state.tags[t]=(state.tags[t]??0)+1;}
export function recordConduct(state,id,tags=[],audience=[]){const x={id,tags,audience,privacy:audience.length>1?'public':audience.length===1?'private':'none'};state.conduct.push(x);tag(state,tags);record(state,'conduct',x);}

export function advanceBeat(state,minutes=7,reason='meaningful beat'){
  state.beat++;state.minute+=minutes;const total=19*60+3+state.minute;state.fictionalTime=`${String(Math.floor(total/60)%24).padStart(2,'0')}:${String(total%60).padStart(2,'0')}`;record(state,'beat_advanced',{minutes,reason});progressWorld(state);
}

export function applySceneChoice(state,sceneId,choice){
  if(!state.seenScenes.includes(sceneId))state.seenScenes.push(sceneId);
  recordConduct(state,choice.id,choice.tags??[],defaultAudience(sceneId,state));
  applyEffect(state,choice.effect);
  markDone(state,sceneId);
  advanceBeat(state,sceneId==='tabitha_private'?10:sceneId==='closing'?10:6,`scene:${sceneId}`);
  return choice.responses??[];
}

function defaultAudience(sceneId,state){
  if(['tabitha_opening','tabitha_private','tabitha_callback'].includes(sceneId))return['tabitha'];
  if(sceneId==='priya_private')return['priya'];
  if(sceneId==='radio_group')return ['maya','alex',...(state.characters.tabitha.mood==='inside'?['tabitha']:[])];
  if(sceneId==='mixed_story')return['maya','alex','tabitha','priya'];
  if(sceneId==='closing')return['maya','alex','priya','elliot'];
  return[];
}
function markDone(state,id){const m={tabitha_opening:'tabithaOpeningDone',tabitha_private:'tabithaPrivateDone',tabitha_callback:'tabithaCallbackDone',radio_group:'radioGroupSceneDone',priya_private:'priyaPrivateDone',mixed_story:'mixedStoryDone',closing:'closureSceneDone'};if(m[id])state.flags[m[id]]=true;}

function applyEffect(state,e){const c=state.characters;switch(e){
case'tabitha_stays_with_player':state.flags.withTabitha=true;c.tabitha.mood='with you';c.tabitha.target={x:185,y:390};addVisibleChange(state,'relationship-space','Tabitha stays outside with you and turns toward the noticeboard.');break;
case'tabitha_goes_inside':state.flags.withTabitha=false;c.tabitha.mood='inside';c.tabitha.target={x:430,y:290};addVisibleChange(state,'position','Tabitha heads into the hall with you free to follow or remain outside.');break;
case'plan_breakfast':state.flags.withTabitha=true;state.flags.tabithaPlan='breakfast';state.flags.privateMotif='laminated menus';state.flags.tabithaCallbackAvailable=true;c.tabitha.mood='open / amused';c.tabitha.target={x:710,y:350};addVisibleChange(state,'arrangement','Breakfast tomorrow is now a real plan between you and Tabitha.');break;
case'plan_notice_walk':state.flags.withTabitha=true;state.flags.tabithaPlan='notice_walk';state.flags.privateMotif='notice ranking';state.flags.tabithaCallbackAvailable=true;c.tabitha.mood='conspiratorial';c.tabitha.target={x:710,y:350};addVisibleChange(state,'motif','The two of you now have a private notice-ranking bit and a station-walk plan.');break;
case'plan_building_walk':state.flags.withTabitha=true;state.flags.tabithaPlan='building_walk';state.flags.privateMotif='old civic buildings';state.flags.tabithaCallbackAvailable=true;c.tabitha.mood='enthusiastic / trying not to show it';c.tabitha.target={x:710,y:350};addVisibleChange(state,'arrangement','Tabitha has offered to show you the old library and its absurd ventilation tower tomorrow.');break;
case'end_tabitha_walk':state.flags.withTabitha=true;finishRun(state,{id:'end_tabitha',text:'You leave the hall with Tabitha.',tags:['left_with_tabitha','one_to_one_payoff']});break;
case'rejoin_together':state.flags.withTabitha=true;c.tabitha.mood='inside';c.tabitha.target={x:445,y:285};state.flags.privateContextReincorporated=true;addVisibleChange(state,'position','You and Tabitha head back into the hall together, carrying the private context with you.');break;
case'linger_with_tabitha':state.flags.withTabitha=true;c.tabitha.mood='quiet company';addVisibleChange(state,'behaviour','The two of you stay on the low wall; the evening continues without demanding anything from you.');break;
case'group_welcome':state.flags.radioGroupTouched=true;state.flags.afterpartyAvailable=true;addVisibleChange(state,'group','Maya folds you into the banter; the group remains optional and permeable.');break;
case'group_observer':state.flags.radioGroupTouched=true;addVisibleChange(state,'group','Maya and Alex keep talking to each other while you listen at the edge.');break;
case'group_with_tabitha':state.flags.radioGroupTouched=true;state.flags.privateContextReincorporated=Boolean(state.flags.privateMotif);addVisibleChange(state,'position','You remain beside Tabitha at the edge of the radio group.');break;
case'priya_relaxes':c.priya.mood='more at ease';addVisibleChange(state,'behaviour','Priya stops scanning the room and settles into the conversation.');break;
case'priya_chips_plan':state.flags.chipsAvailable=true;c.priya.mood='has a plan';addVisibleChange(state,'arrangement','You and Priya now have a concrete chips plan for later.');break;
case'tabitha_public_warmth':c.tabitha.mood='comfortable';addVisibleChange(state,'dialogue','Tabitha visibly appreciates how you handled her story in front of the group.');break;
case'tabitha_steps_away':state.flags.withTabitha=false;c.tabitha.mood='annoyed';c.tabitha.target={x:730,y:350};addVisibleChange(state,'position','Tabitha steps out of the group immediately.');break;
case'maya_handles_closure':addVisibleChange(state,'world','Maya handles the closure without recruiting you into a task.');break;
case'helped_one_box':state.flags.afterpartyAvailable=true;addVisibleChange(state,'world','You move one box; the rest continues without becoming a job.');break;
case'ready_to_leave':addVisibleChange(state,'affordance','Leaving is now the obvious next option, not an objective.');break;
}}

export function shareNotice(state){
  if(state.flags.noticeShared)return;
  state.flags.noticeShared=true;
  state.flags.privateMotif='community resilience';
  recordConduct(state,'shared_noticeboard',['shared_observation_tabitha'],['tabitha']);
  addVisibleChange(state,'shared_activity','You and Tabitha read the noticeboard together; “Social Connection Drop-In — booking essential” becomes the favourite.');
  advanceBeat(state,5,'shared noticeboard');
}

export function observeRadio(state){
  if(state.flags.observerRadioUsed)return;
  state.flags.observerRadioUsed=true;
  recordConduct(state,'observed_radio',['comfortable_observer'],[]);
  addVisibleChange(state,'observation','From the edge you hear Maya and Alex arguing about whether a jingle can be “administratively loud”.');
  advanceBeat(state,7,'observed radio group');
}

export function progressWorld(state){const c=state.characters;
  const playerSocial = ['main','radio'].includes(state.player.zone) || state.flags.radioGroupTouched;
  const priyaThreshold = playerSocial ? 1 : state.flags.tabithaPrivateDone ? 3 : 2;
  if(state.beat>=priyaThreshold&&!state.flags.priyaArrived){state.flags.priyaArrived=true;c.priya.visible=true;c.priya.mood='arrived';c.priya.target={x:105,y:408};addVisibleChange(state,'arrival','Priya arrives. She does not require you to collect her.');}
  if(state.flags.priyaArrived&&!state.flags.priyaSettled&&state.beat>=priyaThreshold+1){state.flags.priyaSettled=true;c.priya.mood='settled independently';c.priya.target={x:610,y:330};addVisibleChange(state,'npc_initiative','Priya heads inside under her own steam and starts talking to Maya.');}
  if(state.beat>=5&&!state.flags.closureActive){state.flags.closureActive=true;c.elliot.mood='closing up';addVisibleChange(state,'world','Elliot starts closing part of the hall. The evening can continue elsewhere or end.');}
}

export function getAvailableInteractions(state,zone){if(state.ended)return[];const out=[];
  if(zone==='forecourt'&&!state.flags.tabithaOpeningDone)out.push('tabitha_opening');
  if(state.flags.withTabitha&&!state.flags.noticeShared&&(zone==='forecourt'||zone==='side'))out.push('noticeboard');
  if(state.flags.noticeShared&&!state.flags.tabithaPrivateDone&&(zone==='forecourt'||zone==='side'))out.push('tabitha_private');
  if(state.flags.tabithaCallbackAvailable&&!state.flags.tabithaCallbackDone&&zone==='side')out.push('tabitha_callback');
  if((zone==='main'||zone==='radio')&&!state.flags.radioGroupSceneDone)out.push('radio_group');
  if((zone==='main'||zone==='radio')&&state.flags.priyaSettled&&!state.flags.priyaPrivateDone)out.push('priya_private');
  if((zone==='main'||zone==='radio')&&state.flags.radioGroupTouched&&state.flags.priyaSettled&&!state.flags.mixedStoryDone&&state.characters.tabitha.mood==='inside')out.push('mixed_story');
  if((zone==='main'||zone==='radio')&&state.flags.closureActive&&!state.flags.closureSceneDone)out.push('closing');
  if((zone==='main'||zone==='radio')&&!state.flags.observerRadioUsed)out.push('observe_radio');
  if(zone==='forecourt'&&state.beat>=1)out.push('leave_solo');
  if(zone==='forecourt'&&state.flags.chipsAvailable)out.push('leave_priya');
  if(zone==='forecourt'&&state.flags.afterpartyAvailable)out.push('leave_maya');
  return [...new Set(out)];
}

export function finishRun(state,choice){if(state.ended)return;recordConduct(state,choice.id,choice.tags??[],[]);state.ended=true;finalizeInterpretations(state,choice.id);addVisibleChange(state,'ending',choice.text);record(state,'run_ended',{ending:choice.id});}

export function finalizeInterpretations(state,endingId){const t=state.tags;let tabitha='easy_company';const te=[];
  if(t.private_reassurance_tabitha){tabitha='someone_i_can_make_unstructured_plans_with';te.push('private reassurance / breakfast plan');}
  if(t.private_tease_tabitha){tabitha='shares_my_private_joke';te.push('laminated permission / notice motif');}
  if(t.private_curiosity_tabitha){tabitha='interested_in_me_beyond_the_public_story';te.push('asked about the person beyond the campaign');}
  if(t.crossed_tabitha_teasing_line){tabitha='private_warmth_complicated_by_public_exposure';te.push('public boundary crossed');}
  if(endingId==='end_tabitha')te.push('left together');
  let priya='familiar_face';const pe=[];if(t.shared_uncertainty_priya){priya='easy_to_be_new_with';pe.push('shared uncertainty');}if(t.new_arrangement_priya||endingId==='end_priya'){priya='someone_i_have_a_clear_plan_with';pe.push('chips plan');}
  let maya='pleasant_guest';const me=[];if(t.group_participation){maya='fits_the_room';me.push('joined banter');}if(endingId==='end_maya')maya='becoming_part_of_radio_crowd';
  state.interpretations={tabitha:{read:tabitha,evidence:te},priya:{read:priya,evidence:pe},maya:{read:maya,evidence:me}};
  const r=[{id:'hall_known',text:'The hall is now somewhere you recognise.'}];
  if(state.flags.tabithaPlan==='breakfast')r.push({id:'tabitha_breakfast',text:'You and Tabitha have breakfast plans for tomorrow.'});
  if(state.flags.tabithaPlan==='notice_walk')r.push({id:'tabitha_notice_motif',text:'The notice-ranking walk has become a private plan between you and Tabitha.'});
  if(state.flags.tabithaPlan==='building_walk')r.push({id:'tabitha_building_walk',text:'Tabitha has offered to show you the old library and its ventilation tower tomorrow.'});
  if(state.flags.chipsAvailable)r.push({id:'priya_chips',text:'Priya expects the chips plan to happen.'});
  if(endingId==='end_maya')r.push({id:'radio_invite',text:'Maya includes you in the next radio-night message.'});
  state.residue=r;record(state,'interpretations_finalized',{interpretations:state.interpretations,residue:r});
}

export function routeValueSummary(state){return{
  tabitha:{opening:state.flags.tabithaOpeningDone,sharedActivity:state.flags.noticeShared,substantivePrivate:state.flags.tabithaPrivateDone,callback:state.flags.tabithaCallbackDone,plan:state.flags.tabithaPlan,privateMotif:state.flags.privateMotif,reincorporated:state.flags.privateContextReincorporated,endedTogether:state.conduct.some(x=>x.id==='end_tabitha')},
  group:{touched:state.flags.radioGroupTouched,focusedScene:state.flags.radioGroupSceneDone,audienceScene:state.flags.mixedStoryDone,afterparty:state.flags.afterpartyAvailable},
  priya:{arrived:state.flags.priyaArrived,settled:state.flags.priyaSettled,privateScene:state.flags.priyaPrivateDone,chipsPlan:state.flags.chipsAvailable}
};}

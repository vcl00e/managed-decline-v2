import test from 'node:test';import assert from 'node:assert/strict';
import {createState,applySceneChoice,shareNotice,getAvailableInteractions,routeValueSummary,finishRun,advanceBeat} from '../model.js';
import {SCENES} from '../scenario.js';
const c=(scene,id)=>SCENES[scene].choices.find(x=>x.id===id);

test('quiet Tabitha route contains substantive sequence before payoff',()=>{
 const s=createState();
 applySceneChoice(s,'tabitha_opening',c('tabitha_opening','open_stay'));
 assert.equal(s.flags.withTabitha,true);assert.equal(s.flags.tabithaPrivateDone,false);
 shareNotice(s);assert.equal(s.flags.noticeShared,true);
 applySceneChoice(s,'tabitha_private',c('tabitha_private','private_no_reason'));
 assert.equal(s.flags.tabithaPrivateDone,true);assert.equal(s.flags.tabithaPlan,'breakfast');
 assert.equal(s.flags.tabithaCallbackAvailable,true);
 const v=routeValueSummary(s).tabitha;assert.deepEqual([v.opening,v.sharedActivity,v.substantivePrivate],[true,true,true]);
});

test('Tabitha payoff cannot be reached from one short scene plus time advance',()=>{
 const s=createState();applySceneChoice(s,'tabitha_opening',c('tabitha_opening','open_stay'));
 advanceBeat(s,30,'try to skip content');
 assert.equal(s.flags.tabithaCallbackAvailable,false);
 assert.ok(!getAvailableInteractions(s,'side').includes('tabitha_callback'));
});

test('private route produces concrete plan and motif',()=>{
 const s=createState();applySceneChoice(s,'tabitha_opening',c('tabitha_opening','open_stay'));shareNotice(s);applySceneChoice(s,'tabitha_private',c('tabitha_private','private_permission'));
 assert.equal(s.flags.tabithaPlan,'notice_walk');assert.equal(s.flags.privateMotif,'notice ranking');
});

test('quiet route does not require any group scene',()=>{
 const s=createState();applySceneChoice(s,'tabitha_opening',c('tabitha_opening','open_stay'));shareNotice(s);applySceneChoice(s,'tabitha_private',c('tabitha_private','private_no_reason'));
 s.player.zone='side';applySceneChoice(s,'tabitha_callback',c('tabitha_callback','callback_walk'));
 assert.equal(s.ended,true);assert.equal(s.flags.radioGroupSceneDone,false);assert.equal(s.flags.tabithaCallbackDone,true);
});

test('group route remains available without private route',()=>{
 const s=createState();s.player.zone='main';assert.ok(getAvailableInteractions(s,'main').includes('radio_group'));
 applySceneChoice(s,'radio_group',c('radio_group','group_joke'));assert.equal(s.flags.radioGroupTouched,true);assert.equal(s.flags.tabithaPrivateDone,false);
});

test('Priya self-settles without player shepherding',()=>{
 const s=createState();s.player.zone='main';applySceneChoice(s,'radio_group',c('radio_group','group_joke'));assert.equal(s.flags.priyaArrived,true);advanceBeat(s,6,'continue');assert.equal(s.flags.priyaSettled,true);
});

test('solo leaving remains valid without consuming social content',()=>{
 const s=createState();applySceneChoice(s,'tabitha_opening',c('tabitha_opening','open_inside'));finishRun(s,{id:'end_solo',text:'You go home alone.',tags:['left_solo']});assert.equal(s.ended,true);
});

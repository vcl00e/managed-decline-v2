import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {createState,applySceneChoice,shareNotice,getAvailableInteractions,observeRadio} from '../model.js';import {SCENES} from '../scenario.js';
const c=(scene,id)=>SCENES[scene].choices.find(x=>x.id===id);

test('ordinary UI contains no dashboard/action log/debug panel',()=>{const h=fs.readFileSync(new URL('../index.html',import.meta.url),'utf8');for(const x of ['side-card','room tone','debugState','nearby possibilities'])assert.ok(!h.toLowerCase().includes(x.toLowerCase()));});
test('observer can advance without focused group scene',()=>{const s=createState();s.player.zone='main';observeRadio(s);assert.equal(s.flags.radioGroupSceneDone,false);assert.equal(s.beat,1);});
test('private intention is not repeated stay-confirmation gating',()=>{const s=createState();applySceneChoice(s,'tabitha_opening',c('tabitha_opening','open_stay'));assert.ok(getAvailableInteractions(s,'forecourt').includes('noticeboard'));assert.ok(!getAvailableInteractions(s,'forecourt').includes('stay_again'));shareNotice(s);assert.ok(getAvailableInteractions(s,'forecourt').includes('tabitha_private'));});

test('quiet route keeps unrelated arrival out of shared/private feedback window',()=>{const s=createState();applySceneChoice(s,'tabitha_opening',c('tabitha_opening','open_stay'));assert.equal(s.flags.priyaArrived,false);shareNotice(s);assert.equal(s.flags.priyaArrived,false);applySceneChoice(s,'tabitha_private',c('tabitha_private','private_no_score'));assert.equal(s.flags.priyaArrived,false);});

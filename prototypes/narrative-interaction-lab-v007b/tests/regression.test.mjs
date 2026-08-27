import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createState, getAvailableInteractions, observeBeat, applySceneChoice } from '../model.js';
import { SCENES } from '../scenario.js';
const choice=(scene,id)=>SCENES[scene].choices.find(c=>c.id===id);

test('ordinary UI has no permanent dashboard, room-tone log, action list, or developer state',async()=>{const html=await readFile(new URL('../index.html',import.meta.url),'utf8');for(const forbidden of ['side-card','Room tone','Nearby possibilities','Developer state','debugState','ambient-log','objective-list'])assert.equal(html.includes(forbidden),false,`UI regression: ${forbidden}`);assert.ok(html.includes('interaction-prompt'));assert.ok(html.includes('<canvas id="world"'));});
test('no group scene is prerequisite for Tabitha quiet topology',()=>{const s=createState();applySceneChoice(s,'tabitha_arrival',choice('tabitha_arrival','tabitha_stay'));observeBeat(s,'quiet_linger');const f=getAvailableInteractions(s,'forecourt');assert.ok(f.includes('ending'));assert.ok(getAvailableInteractions(s,'side').includes('tabitha_side'));assert.equal(s.seenScenes.includes('radio_group'),false);assert.equal(s.seenScenes.includes('mixed_story'),false);});
test('observer can advance world without entering VN group scene',()=>{const s=createState();observeBeat(s,'room_linger');observeBeat(s,'quiet_linger');assert.equal(s.flags.priyaSettled,true);assert.equal(s.seenScenes.length,0);assert.ok(getAvailableInteractions(s,'forecourt').includes('ending'));});

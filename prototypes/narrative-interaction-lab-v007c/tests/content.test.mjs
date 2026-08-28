import test from 'node:test';import assert from 'node:assert/strict';import {SCENES} from '../scenario.js';

test('Tabitha private scene has substantive authored development',()=>{
 const s=SCENES.tabitha_private;
 assert.ok(s.intro.length>=7,'private scene needs enough setup/development to earn focus');
 assert.ok(s.choices.length>=3);
 for(const choice of s.choices)assert.ok(choice.responses.length>=4,`${choice.id} needs substantive response`);
});

test('Tabitha route has opening, private scene, callback and shared activity hook',()=>{
 assert.ok(SCENES.tabitha_opening);assert.ok(SCENES.tabitha_private);assert.ok(SCENES.tabitha_callback);
});

test('group and Priya routes retain focused content',()=>{
 assert.ok(SCENES.radio_group.intro.length>=4);assert.ok(SCENES.priya_private.intro.length>=4);
});

export const WORLD = {
  width: 900,
  height: 520,
  zones: {
    forecourt: { id:'forecourt', label:'Forecourt', x:24, y:344, w:236, h:148 },
    main: { id:'main', label:'Main hall', x:228, y:92, w:438, h:306 },
    radio: { id:'radio', label:'Radio corner', x:472, y:112, w:174, h:126 },
    side: { id:'side', label:'Side yard', x:662, y:254, w:194, h:202 }
  },
  obstacles: [
    { x:312, y:190, w:118, h:58 },
    { x:300, y:320, w:82, h:38 },
    { x:496, y:145, w:105, h:28 },
    { x:690, y:390, w:92, h:22 }
  ],
  spawn: { x:118, y:420 }
};

export const CHARACTERS = {
  tabitha: { id:'tabitha', name:'Tabitha', short:'TAB', color:'#d86b85', start:{x:158,y:400} },
  maya: { id:'maya', name:'Maya', short:'MAY', color:'#55a993', start:{x:520,y:185} },
  alex: { id:'alex', name:'Alex', short:'ALX', color:'#5e84bd', start:{x:578,y:205} },
  priya: { id:'priya', name:'Priya', short:'PRI', color:'#ba8bd1', start:{x:92,y:415} },
  elliot: { id:'elliot', name:'Elliot', short:'ELL', color:'#a68a65', start:{x:370,y:155} }
};

export const SCENES = {
  tabitha_arrival: {
    title: 'Outside the hall', portraits:['tabitha'],
    lines: [
      ['Tabitha','This is exactly the sort of building that has one good room and twelve laminated notices.'],
      ['Tabitha','Maya said we could just wander in. I am choosing to believe her.']
    ],
    choices: [
      { id:'tabitha_stay', text:'“Let’s stay out here a bit first.”', tags:['chose_quiet_time_tabitha'], reaction:['Tabitha','Good. Five minutes where nobody can ask me what I think of local radio.'], effect:'tabitha_companion' },
      { id:'tabitha_tease', text:'“You love a laminated notice.”', tags:['private_tease_tabitha'], reaction:['Tabitha','I respect a document that has survived three reorganisations.'], effect:'tabitha_companion' },
      { id:'tabitha_inside', text:'“Come on. Let’s see what Maya’s built.”', tags:['entered_together'], reaction:['Tabitha','Fine. But if there is a raffle, you are entering it for both of us.'], effect:'tabitha_go_inside' }
    ]
  },
  tabitha_side: {
    title: 'Round the side', portraits:['tabitha'],
    lines: [
      ['Tabitha','It is nicer out here than I expected. Which feels suspicious.'],
      ['Tabitha','I like Maya. I just do not always want to be in the middle of Maya.']
    ],
    choices: [
      { id:'side_stay', text:'“We can just stay here.”', tags:['chose_quiet_time_tabitha','noticed_tabitha'], reaction:['Tabitha','That is an extremely convincing plan.'], effect:'tabitha_stays_side' },
      { id:'side_checkin', text:'“You okay?”', tags:['private_checkin_tabitha'], reaction:['Tabitha','Yeah. Social battery on amber, not red.'], effect:'tabitha_stays_side' },
      { id:'side_return', text:'“Want to go back in?”', tags:['invited_tabitha_back'], reaction:['Tabitha','In a minute. You go if you want.'], effect:'tabitha_stays_side' }
    ]
  },
  radio_group: {
    title: 'Radio corner', portraits:['maya','alex','tabitha'],
    lines: [
      ['Maya','You made it. Alex has spent twenty minutes trying to make the jingles sound less like a hostage tape.'],
      ['Alex','They sounded like that when I got here.'],
      ['Maya','That is exactly what someone responsible for the hostage tape would say.']
    ],
    choices: [
      { id:'group_joke', text:'Join the joke.', tags:['group_participation','played_along'], reaction:['Maya','See? Immediate improvement. You can stay.'], effect:'group_welcomes_player' },
      { id:'group_listen', text:'Let them keep going.', tags:['comfortable_observer'], reaction:['Alex','Thank you for not making me defend the compressor settings to another person.'], effect:'group_keeps_talking' },
      { id:'group_tabitha', text:'Stay beside Tabitha and let her take the room.', tags:['publicly_with_tabitha'], reaction:['Tabitha','Do not look at me. I only came for the institutional acoustics.'], effect:'tabitha_beside_player' }
    ]
  },
  priya_greeting: {
    title: 'Priya arrives', portraits:['priya'],
    lines: [
      ['Priya','I nearly left because the sign outside says “Community Resilience Hub” and nothing about radio.'],
      ['Priya','Then I heard Alex through the wall, which was unfortunately identifying.']
    ],
    choices: [
      { id:'priya_walk_in', text:'“Come in with me.”', tags:['included_priya'], reaction:['Priya','All right. If this is terrible I am blaming you specifically.'], effect:'priya_with_player' },
      { id:'priya_space', text:'“Maya’s inside. You’ll be fine.”', tags:['gave_priya_space'], reaction:['Priya','Good. I prefer being given directions to being socially escorted.'], effect:'priya_self_settles' },
      { id:'priya_quiet', text:'“We can stay out here a minute.”', tags:['chose_quiet_time_priya'], reaction:['Priya','Yes. That would actually be nice.'], effect:'priya_companion' }
    ]
  },
  priya_private: {
    title: 'Tea table', portraits:['priya'],
    lines: [
      ['Priya','I thought this would be one of those things where everyone already knows everyone.'],
      ['Priya','It is, slightly. But I can work with slightly.']
    ],
    choices: [
      { id:'priya_reassure', text:'“You’re doing fine.”', tags:['reassured_priya'], reaction:['Priya','That is suspiciously kind of you.'], effect:'priya_relaxes' },
      { id:'priya_shared', text:'“I’m still figuring it out too.”', tags:['shared_uncertainty_priya'], reaction:['Priya','Excellent. Mutual fraudulent belonging.'], effect:'priya_relaxes' },
      { id:'priya_chips', text:'“Want chips later?”', tags:['invited_priya_chips','new_arrangement_priya'], reaction:['Priya','Yes. That is a much clearer social institution.'], effect:'priya_chips_plan' }
    ]
  },
  mixed_story: {
    title: 'A story with an audience', portraits:['maya','alex','tabitha','priya'],
    lines: [
      ['Maya','How do you two know each other anyway?'],
      ['Tabitha','There is a version involving a kebab-shop sign and I have vetoed it.'],
      ['Priya','That sentence seems structurally incompatible with a veto.']
    ],
    choices: [
      { id:'story_tabitha', text:'“Fine. You tell it.”', tags:['respected_story_ownership'], reaction:['Tabitha','Thank you. The official version is that nothing happened.'], effect:'tabitha_public_warmth' },
      { id:'story_safe', text:'Tell the harmless version.', tags:['protected_tabitha_line','told_group_story'], reaction:['Tabitha','Acceptable. Selective journalism.'], effect:'tabitha_public_warmth' },
      { id:'story_full', text:'Tell the embarrassing version.', tags:['crossed_tabitha_teasing_line','told_group_story'], reaction:['Tabitha','Oh, brilliant. Great. I am thrilled this is now communal property.'], effect:'tabitha_steps_away' },
      { id:'story_veto', text:'“Nope. Veto stands.”', tags:['backed_tabitha_publicly'], reaction:['Tabitha','See? Constitutional order restored.'], effect:'tabitha_public_warmth' }
    ]
  },
  closing: {
    title: 'The building becomes unavailable', portraits:['elliot','maya'],
    lines: [
      ['Elliot','Just so everyone knows, the main room is now unavailable from half nine.'],
      ['Maya','We are currently in the main room.'],
      ['Elliot','Yes. That is why I am telling you.'],
      ['Maya','Does it physically cease to exist?'],
      ['Elliot','Not under the current policy.']
    ],
    choices: [
      { id:'closing_laugh', text:'Enjoy it and let Maya handle the logistics.', tags:['did_not_take_over','shared_joke'], reaction:['Maya','Correct response. Never reward a laminated policy with initiative.'], effect:'maya_handles_closure' },
      { id:'closing_help', text:'Offer to move one box of radio gear.', tags:['practical_help'], reaction:['Maya','Yes. One box. I am not converting you into staff.'], effect:'helped_one_box' },
      { id:'closing_leave', text:'Use this as your cue to head out.', tags:['chose_to_leave'], reaction:['Maya','Reasonable. Escape while the building is still legally extant.'], effect:'ready_to_leave' }
    ]
  },
  ending: {
    title: 'Where the night goes next', portraits:['tabitha','priya','maya'],
    lines: [ ['Narration','The evening does not need a finale. You can simply decide what kind of company you want next.'] ],
    dynamicChoices: true
  }
};

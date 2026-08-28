export const WORLD = {
  width: 900,
  height: 520,
  zones: {
    forecourt: { id:'forecourt', label:'Forecourt', x:24, y:344, w:236, h:148 },
    main: { id:'main', label:'Main hall', x:228, y:92, w:438, h:306 },
    radio: { id:'radio', label:'Radio corner', x:472, y:112, w:174, h:126 },
    side: { id:'side', label:'Side yard', x:662, y:254, w:194, h:202 }
  },
  points: {
    noticeboard: { x:205, y:365 },
    exit: { x:70, y:455 },
    lowWall: { x:755, y:405 }
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
  tabitha_opening: {
    title:'Outside the hall', portraits:['tabitha'],
    intro:[
      ['Tabitha','This is exactly the sort of building that has one good room and twelve laminated notices.'],
      ['Tabitha','Maya said we could just wander in. I am choosing to believe her.'],
      ['Tabitha','Although I can already see a notice entitled “Your Role in Community Resilience”, so the building has made a counter-offer.']
    ],
    question:'What do you feel like doing?',
    choices:[
      {id:'open_stay',text:'“Let’s not go in yet.”',tags:['chose_quiet_time_tabitha'],effect:'tabitha_stays_with_player',responses:[
        ['You','Let’s not go in yet.'],
        ['Tabitha','Good. I am not emotionally prepared to have an opinion about local radio.'],
        ['Tabitha','Come on. I need to know what my role in community resilience is.']
      ]},
      {id:'open_notice',text:'“I need to see that notice.”',tags:['shared_notice_interest','chose_quiet_time_tabitha'],effect:'tabitha_stays_with_player',responses:[
        ['You','I need to see that notice.'],
        ['Tabitha','Correct. If we are going to become resilient I would like the terms in writing.']
      ]},
      {id:'open_inside',text:'“Come on. Let’s see what Maya’s built.”',tags:['entered_together'],effect:'tabitha_goes_inside',responses:[
        ['You','Come on. Let’s see what Maya’s built.'],
        ['Tabitha','Fine. But if there is a raffle, you are entering it for both of us.']
      ]}
    ]
  },

  tabitha_private: {
    title:'The person outside the programme', portraits:['tabitha'],
    intro:[
      ['Tabitha','I knew “community resilience” sounded familiar. That was in the title of one of the follow-up workshops after the video.'],
      ['Tabitha','Apparently the correct response to accidentally turning a council safeguarding character into an internet meme was more branded stationery.'],
      ['Tabitha','Do not scan that QR code, by the way. That is how they got me the first time.'],
      ['Tabitha','I am joking. Mostly.'],
      ['Tabitha','The strange bit is that people who recognise me usually think they already know which conversation we are about to have.'],
      ['Tabitha','They want the extremist-goth story, or the “was the council actually right?” story, or the one where I perform being delighted that somebody used my face as a reaction image.'],
      ['Tabitha','I used to work in a library. I knew which radiator only worked if you kicked the valve. I can tell you why half the old civic buildings around here have bricked-up side doors.'],
      ['Tabitha','That version of me is apparently less searchable.'],
      ['Tabitha','You stayed out here and looked at the building with me instead of asking for the lore.'],
      ['Tabitha','I noticed.']
    ],
    question:'What do you do with that?',
    choices:[
      {id:'private_no_reason',text:'“I know the public story. I’m more interested in you.”',tags:['private_reassurance_tabitha','future_quiet_plan'],effect:'plan_breakfast',responses:[
        ['You','I know the public story. I’m more interested in you.'],
        ['Tabitha','That is an alarmingly competent answer.'],
        ['Tabitha','You realise I am now obliged to become less interesting out of spite.'],
        ['You','I can live with that.'],
        ['Tabitha','All right. Breakfast tomorrow. No politics, no educational multimedia, no one asking whether I am a warning sign.'],
        ['Tabitha','You may ask about the radiator.']
      ]},
      {id:'private_permission',text:'“You absolutely use the infamous-goth thing when it gets you something.”',tags:['private_tease_tabitha','notice_motif'],effect:'plan_notice_walk',responses:[
        ['You','You absolutely use the infamous-goth thing when it gets you something.'],
        ['Tabitha','Obviously. I contain multitudes and one of them likes free drinks.'],
        ['Tabitha','I reserve the right to hate being turned into a symbol and also deploy the symbol against weak institutions.'],
        ['You','Very principled.'],
        ['Tabitha','Extremely. Put it on a leaflet.'],
        ['Tabitha','Come on. Walk to the station with me later. We can rank every council notice we pass by likelihood of accidentally creating another national meme.']
      ]},
      {id:'private_no_score',text:'“Tell me one thing about you that has nothing to do with that video.”',tags:['private_curiosity_tabitha','municipal_interest'],effect:'plan_building_walk',responses:[
        ['You','Tell me one thing about you that has nothing to do with that video.'],
        ['Tabitha','That stone plaque behind the vinyl sign is original. Early twentieth century. The hall used to be an institute, not a “hub”.'],
        ['Tabitha','Somebody has literally covered the building’s own name with the word resilience.'],
        ['You','You noticed that from the pavement?'],
        ['Tabitha','I told you. Less searchable.'],
        ['Tabitha','There is an old library near the station with a ridiculous carved ventilation tower. I can show you tomorrow if you promise not to call it a date unless it becomes one by accident.']
      ]}
    ]
  },

  tabitha_callback: {
    title:'Round the side', portraits:['tabitha'],
    introByPlan:{
      breakfast:[
        ['Tabitha','I have been thinking about breakfast for six whole minutes, which means it is legally a plan now.'],
        ['Tabitha','There is a place near the station that still calls hash browns “extras”. I trust that level of institutional honesty.']
      ],
      notice_walk:[
        ['Tabitha','I found another one. “Please do not prop fire door open, even briefly, for community purposes.”'],
        ['Tabitha','We are going to need a scoring system before the station.']
      ],
      building_walk:[
        ['Tabitha','I checked the plaque. 1908. They have put a vinyl “Resilience Hub” banner over one hundred and eighteen years of actual name.'],
        ['Tabitha','Tomorrow I am showing you the library before somebody rebrands the ventilation tower as an engagement chimney.']
      ],
      default:[
        ['Tabitha','This side yard is doing extremely well for somewhere containing three bins and half a bicycle.'],
        ['Tabitha','I am glad we came out here.']
      ]
    },
    question:'What next?',
    choices:[
      {id:'callback_walk',text:'“Let’s just walk toward the station from here.”',tags:['left_with_tabitha','one_to_one_payoff'],effect:'end_tabitha_walk',responses:[
        ['You','Let’s just walk toward the station from here.'],
        ['Tabitha','Yes. We have extracted maximum value from the bins.'],
        ['Tabitha','Come on. We can judge municipal typography on the way.']
      ]},
      {id:'callback_inside',text:'“Let’s go in together for a bit.”',tags:['rejoin_with_private_context'],effect:'rejoin_together',responses:[
        ['You','Let’s go in together for a bit.'],
        ['Tabitha','All right. One socially credible unit of local radio.'],
        ['Tabitha','Then I am invoking the breakfast / notices / old-building escape clause as applicable.']
      ]},
      {id:'callback_stay',text:'“I’m happy here a little longer.”',tags:['chose_more_quiet_time_tabitha'],effect:'linger_with_tabitha',responses:[
        ['You','I’m happy here a little longer.'],
        ['Tabitha','Same.'],
        ['Tabitha','That was almost alarmingly sincere. Please admire the broken bicycle until I recover.']
      ]}
    ]
  },

  radio_group: {
    title:'Radio corner', portraits:['maya','alex','tabitha'],
    intro:[
      ['Maya','You made it. Alex has spent twenty minutes trying to make the jingles sound less like a hostage tape.'],
      ['Alex','They sounded like that when I got here.'],
      ['Maya','That is exactly what someone responsible for the hostage tape would say.'],
      ['Alex','We have listeners in potentially both digits. Standards matter.']
    ],
    question:'How do you join the room?',
    choices:[
      {id:'group_joke',text:'Join the joke.',tags:['group_participation','played_along'],effect:'group_welcome',responses:[
        ['You','I think “hostage tape” is a strong local identity.'],
        ['Maya','Thank you. Finally somebody understands brand strategy.'],
        ['Alex','I regret giving either of you language.']
      ]},
      {id:'group_listen',text:'Let them keep going while you listen.',tags:['comfortable_observer'],effect:'group_observer',responses:[
        ['Alex','For once, an audience member with reasonable expectations.'],
        ['Maya','Ignore him. He has been radicalised by a compressor preset.']
      ]},
      {id:'group_tabitha',text:'Stay beside Tabitha at the edge of it.',tags:['publicly_with_tabitha'],effect:'group_with_tabitha',responses:[
        ['Tabitha','We are observing local broadcasting in its natural habitat.'],
        ['Maya','You are both going on air if you keep narrating me.']
      ]}
    ]
  },

  priya_private: {
    title:'A quieter corner', portraits:['priya'],
    intro:[
      ['Priya','I thought this would be one of those things where everybody already knows everybody.'],
      ['Priya','Then Maya introduced herself twice to the same man, so I have revised the threat assessment.'],
      ['Priya','I am good at rooms where there is a purpose. Interviews. Meetings. Complaints.'],
      ['Priya','Rooms where the purpose is “be around people” are somehow harder.']
    ],
    question:'What do you give her?',
    choices:[
      {id:'priya_shared',text:'“I’m still figuring the room out too.”',tags:['shared_uncertainty_priya'],effect:'priya_relaxes',responses:[
        ['You','I’m still figuring the room out too.'],
        ['Priya','Excellent. Mutual fraudulent belonging.'],
        ['Priya','We can look confident in alternating shifts.']
      ]},
      {id:'priya_chips',text:'“Want to get chips later instead?”',tags:['new_arrangement_priya'],effect:'priya_chips_plan',responses:[
        ['You','Want to get chips later instead?'],
        ['Priya','Yes. That is a social structure I understand completely.'],
        ['Priya','Salt, vinegar, limited stakeholders.']
      ]},
      {id:'priya_space',text:'“You don’t have to perform being comfortable.”',tags:['reassured_priya'],effect:'priya_relaxes',responses:[
        ['You','You don’t have to perform being comfortable.'],
        ['Priya','I know. I am just extremely experienced at performing competence.'],
        ['Priya','Comfort has had less professional development.']
      ]}
    ]
  },

  mixed_story: {
    title:'A story with an audience', portraits:['maya','alex','tabitha','priya'],
    intro:[
      ['Maya','How do you two know each other anyway?'],
      ['Tabitha','There is a version involving a kebab-shop sign and I have vetoed it.'],
      ['Priya','That sentence seems structurally incompatible with a veto.']
    ],
    question:'Whose story is it?',
    choices:[
      {id:'story_tabitha',text:'“Fine. You tell it.”',tags:['respected_story_ownership'],effect:'tabitha_public_warmth',responses:[['Tabitha','Thank you. The official version is that nothing happened.']]},
      {id:'story_safe',text:'Tell the harmless version.',tags:['protected_tabitha_line'],effect:'tabitha_public_warmth',responses:[['Tabitha','Acceptable. Selective journalism.']]},
      {id:'story_full',text:'Tell the embarrassing version.',tags:['crossed_tabitha_teasing_line'],effect:'tabitha_steps_away',responses:[['Tabitha','Oh, brilliant. Great. I am thrilled this is now communal property.']]},
      {id:'story_veto',text:'“Nope. Veto stands.”',tags:['backed_tabitha_publicly'],effect:'tabitha_public_warmth',responses:[['Tabitha','See? Constitutional order restored.']]}
    ]
  },

  closing: {
    title:'The building becomes unavailable', portraits:['elliot','maya'],
    intro:[
      ['Elliot','Just so everyone knows, the main room is now unavailable from half nine.'],
      ['Maya','We are currently in the main room.'],
      ['Elliot','Yes. That is why I am telling you.'],
      ['Maya','Does it physically cease to exist?'],
      ['Elliot','Not under the current policy.']
    ],
    question:'Do you make this your problem?',
    choices:[
      {id:'closing_laugh',text:'Enjoy it and let Maya handle the logistics.',tags:['did_not_take_over'],effect:'maya_handles_closure',responses:[['Maya','Correct response. Never reward a laminated policy with initiative.']]},
      {id:'closing_help',text:'Offer to move one box of radio gear.',tags:['practical_help'],effect:'helped_one_box',responses:[['Maya','Yes. One box. I am not converting you into staff.']]},
      {id:'closing_leave',text:'Use this as your cue to head out.',tags:['chose_to_leave'],effect:'ready_to_leave',responses:[['Maya','Reasonable. Escape while the building is still legally extant.']]}
    ]
  }
};

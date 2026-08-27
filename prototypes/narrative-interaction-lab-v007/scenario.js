export const CHARACTERS = {
  tabitha: { id: 'tabitha', name: 'Tabitha', short: 'TAB', role: 'You came here with her', color: '#d86b85' },
  maya: { id: 'maya', name: 'Maya', short: 'MAY', role: 'Runs the community radio night', color: '#55a993' },
  alex: { id: 'alex', name: 'Alex', short: 'ALX', role: 'Helping with the radio setup', color: '#5e84bd' },
  priya: { id: 'priya', name: 'Priya', short: 'PRI', role: 'Knows you, not the radio crowd', color: '#ba8bd1' },
  elliot: { id: 'elliot', name: 'Elliot', short: 'ELL', role: 'Caretaker and reluctant sound engineer', color: '#a68a65' }
};

export const ZONES = {
  forecourt: { id: 'forecourt', label: 'Forecourt', x: 20, y: 350, w: 240, h: 140 },
  main: { id: 'main', label: 'Main room', x: 230, y: 95, w: 430, h: 300 },
  radio: { id: 'radio', label: 'Radio corner', x: 470, y: 115, w: 170, h: 120 },
  side: { id: 'side', label: 'Side yard', x: 660, y: 260, w: 190, h: 190 }
};

export const CHARACTER_POSITIONS = {
  tabitha: { x: 155, y: 395 }, maya: { x: 520, y: 185 }, alex: { x: 575, y: 205 },
  priya: { x: 90, y: 420 }, elliot: { x: 370, y: 155 }
};

export const VN_SCENES = {
  arrival_tabitha: {
    lines: [['Tabitha','This is exactly the sort of building that has one good room and twelve laminated notices.'],['Tabitha','Maya said we could just wander in. I am choosing to believe her.']],
    choices: [
      { id:'arrival_warm', text:'“Come on. It looks nice in there.”', tags:['warm_to_tabitha'] },
      { id:'arrival_tease', text:'“You love a laminated notice.”', tags:['tease_tabitha'] },
      { id:'arrival_independent', text:'“Go in. I’m going to look around first.”', tags:['drift_early'] }
    ]
  },
  join_radio_group: {
    lines: [['Maya','You made it. Alex has spent twenty minutes trying to make the jingles sound less like a hostage tape.'],['Alex','They sounded like that when I got here.'],['Tabitha','That is exactly what someone responsible for the hostage tape would say.'],['Maya','See? This is already better programming.']],
    choices: [
      { id:'group_join_joke', text:'Join the joke.', tags:['group_participation','played_along'] },
      { id:'group_watch', text:'Let them bounce off each other.', tags:['comfortable_observer'] },
      { id:'group_tabitha', text:'Stay beside Tabitha and let her take the room.', tags:['publicly_with_tabitha'] }
    ]
  },
  priya_arrives: {
    lines: [['Priya','I nearly left because the sign outside says “Community Resilience Hub” and nothing about radio.'],['Maya','That is because the radio is resilient.'],['Alex','Against evidence.']],
    choices: [
      { id:'introduce_priya', text:'Introduce Priya properly to everyone.', tags:['introduced_priya','social_bridge'] },
      { id:'bring_priya_in', text:'Wave Priya over and make space beside you.', tags:['included_priya'] },
      { id:'let_priya_land', text:'Let Priya find her own place in the conversation.', tags:['gave_priya_space'] }
    ]
  },
  kebab_story: {
    lines: [['Maya','How do you two know each other anyway?'],['Tabitha','Careful. There is a version of this answer involving a kebab-shop sign and I have vetoed it.'],['Alex','You cannot say that and then invoke a veto.'],['Priya','I think legally that voids the veto.']],
    choices: [
      { id:'let_tabitha_tell', text:'“Fine. You tell it.”', tags:['respected_story_ownership','invited_tabitha_voice'] },
      { id:'harmless_version', text:'Tell the harmless version and leave out the embarrassing bit.', tags:['told_group_story','protected_tabitha_line'] },
      { id:'full_kebab_story', text:'Tell the full kebab-shop story.', tags:['told_group_story','crossed_tabitha_teasing_line'] },
      { id:'change_subject', text:'“Nope. Veto stands.”', tags:['backed_tabitha_publicly'] }
    ]
  },
  tabitha_side_yard: {
    lines: [['Tabitha','I like them. In small doses.'],['Tabitha','You vanish into rooms much faster than I do. It is sort of impressive.']],
    choices: [
      { id:'side_reassure', text:'“I was keeping an eye on where you were.”', tags:['noticed_tabitha','private_reassurance'] },
      { id:'side_invite_back', text:'“Stay out here a bit. I’m not in a rush.”', tags:['chose_quiet_time_tabitha'] },
      { id:'side_tease', text:'“You say that like you weren’t destroying Alex five minutes ago.”', tags:['private_tease_tabitha'] }
    ]
  },
  priya_quiet: {
    lines: [['Priya','I thought this would be one of those things where everyone already knows everyone.'],['Priya','It is, slightly. But I can work with slightly.']],
    choices: [
      { id:'priya_welcome', text:'“You’re doing fine. Maya likes you already.”', tags:['reassured_priya'] },
      { id:'priya_shared', text:'“I know the feeling. I’m still figuring out who belongs to what.”', tags:['shared_uncertainty_priya'] },
      { id:'priya_chips', text:'“Want to get chips when this winds down?”', tags:['invited_priya_chips','new_arrangement_priya'] }
    ]
  },
  closing_notice: {
    lines: [['Elliot','Just so everyone knows, the main room is now unavailable from half nine.'],['Maya','We are currently in the main room.'],['Elliot','Yes. That is why I am telling you.'],['Alex','What happens at half nine?'],['Elliot','The building becomes unavailable.'],['Tabitha','Does it physically cease to exist?'],['Elliot','Not under the current policy.']],
    choices: [
      { id:'closing_laugh', text:'Enjoy the absurdity and let Maya handle it.', tags:['did_not_take_over','shared_joke'] },
      { id:'closing_help', text:'Help Maya move the radio setup into the side room.', tags:['helped_radio_move','practical_help'] },
      { id:'closing_suggest_outside', text:'Suggest finishing outside with phones and a speaker.', tags:['improvised_socially','group_solution'] }
    ]
  },
  final_choice: {
    lines: [['Maya','We’re going back to mine for one drink and to listen to the recording without the council fridge humming through it.'],['Tabitha','I’m heading toward the station.'],['Priya','I could absolutely be persuaded by chips.']],
    choices: [
      { id:'leave_tabitha', text:'Walk toward the station with Tabitha.', tags:['left_with_tabitha','one_to_one_end'] },
      { id:'afterparty_maya', text:'Go with Maya and the radio crowd.', tags:['joined_afterparty','group_end'] },
      { id:'chips_priya', text:'Go for chips with Priya.', tags:['went_chips_priya','one_to_one_end'] },
      { id:'home_solo', text:'Call it a night and head home alone.', tags:['left_solo'] }
    ]
  }
};

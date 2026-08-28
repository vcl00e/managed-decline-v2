export const WORLD={width:900,height:520,building:{x:250,y:70,w:430,h:270},points:{spawn:{x:145,y:430},tabithaStart:{x:190,y:414},bannerFront:{x:455,y:372},entrance:{x:320,y:372},sideSeam:{x:716,y:258},sidePlaque:{x:735,y:178},lowWall:{x:770,y:408},streetExit:{x:78,y:462}},obstacles:[{x:250,y:70,w:430,h:270},{x:748,y:385,w:86,h:20}]};
export const TABITHA={id:'tabitha',name:'Tabitha',short:'TAB',color:'#d86b85'};

export const SIDE_DIALOGUE={
 start:{speaker:'Tabitha',text:s=>s.facts.playerFoundHinge?'Okay, you found the hinge scar. I was staring at the mortar like an idiot.':s.facts.playerChallengedDoor?'Still think it is just a repair? Look at the straight joint in the bricks.':s.facts.seamInspected?'There. You found the edge of it. Look lower down.':'See the straight joint in the bricks? That is where the opening was.',choices:[
  {id:'ask_how',text:'How do you know?',next:'how'},
  {id:'doubt',text:'Could still just be a repair.',next:'doubt'},
  {id:'touch_joint',text:'[Run your fingers along the joint.]',effect:'find_hinge',next:'hinge'},
  {id:'tease',text:'You are enjoying this way too much.',next:'tease'}]},
 how:{speaker:'Tabitha',text:()=> 'Library job. Old buildings teach you where people used to be allowed in.',choices:[
  {id:'old_library',text:'The old library?',next:'library'},
  {id:'check_metal',text:'[Check the rust mark by the joint.]',effect:'find_hinge',next:'hinge'},
  {id:'show_me',text:'All right. Show me the bit you mean.',next:'show'}]},
 library:{speaker:'Tabitha',text:()=> 'Yeah. Half the doors had been moved, blocked or labelled staff only. You get good at spotting the ghosts.',choices:[
  {id:'specific_skill',text:'That is a very specific skill.',next:'specific'},
  {id:'inspect_now',text:'[Look for the old hinge position.]',effect:'find_hinge',next:'hinge'}]},
 specific:{speaker:'Tabitha',text:()=> 'Useless until someone covers a building in vinyl. Then suddenly I am employable again.',end:true,effect:'tabitha_shared_skill'},
 doubt:{speaker:'Tabitha',text:()=> 'Could be. Check the brick bond above it instead of believing me.',choices:[
  {id:'look_up',text:'[Look above the seam.]',effect:'confirm_door',next:'confirmed'},
  {id:'you_check',text:'You check it.',effect:'tabitha_confirms',next:'confirmed_tabitha'},
  {id:'no_idea',text:'I have no idea what brick bond means.',next:'brick_bond'}]},
 brick_bond:{speaker:'Tabitha',text:()=> 'Fair. The bricks stop interlocking normally around the edge. There. That vertical line.',choices:[
  {id:'now_see',text:'Oh. Yeah, I see it.',effect:'confirm_door',next:'confirmed'},
  {id:'trust_bricks',text:'I am choosing to trust you on the bricks.',next:'trust'}]},
 trust:{speaker:'Tabitha',text:()=> 'Dangerous policy. Come on, there should be metalwork lower down if I am right.',end:true,effect:'tabitha_leads_hinge_search'},
 hinge:{speaker:'Tabitha',text:s=>s.facts.hingeFoundBy==='player'?'There. Rust rectangle and two screw holes. That is better evidence than my entire speech.':'There. Hinge plate. I am claiming partial credit.',choices:[
  {id:'so_door',text:'So it was a door.',effect:'confirm_door',next:'confirmed'},
  {id:'youre_welcome',text:'You are welcome.',effect:'player_takes_credit',next:'credit'},
  {id:'keep_looking',text:'[Check lower down.]',effect:'confirm_door',next:'confirmed'}]},
 credit:{speaker:'Tabitha',text:()=> 'Insufferable. Useful, but insufferable.',end:true,effect:'working_pair_tease'},
 tease:{speaker:'Tabitha',text:()=> 'Obviously. Somebody tried to hide a door from me.',choices:[
  {id:'normal_sentence',text:'That is not a normal sentence.',next:'normal'},
  {id:'fine_detective',text:'Fine, detective. What next?',effect:'tabitha_leads_hinge_search',next:'show'},
  {id:'look_anyway',text:'[Check the mortar yourself.]',effect:'find_hinge',next:'hinge'}]},
 normal:{speaker:'Tabitha',text:()=> 'You came over here. You have forfeited normal.',end:true,effect:'working_pair_tease'},
 show:{speaker:'Tabitha',text:()=> 'Lower down. There should be a hinge scar or a plate if this really was an entrance.',end:true,effect:'tabitha_leads_hinge_search'},
 confirmed:{speaker:'Tabitha',text:()=> 'Right. Door, not repair. There should be a room plaque further up the side if they did not chisel everything off.',end:true,effect:'door_confirmed'},
 confirmed_tabitha:{speaker:'Tabitha',text:()=> 'Yep. The bond breaks around the opening. I hate being right this early; it ruins the suspense.',end:true,effect:'door_confirmed'}
};

export const NODES_PART_02 = {
  "pub_terms": {
    "id": "pub_terms",
    "title": "The room that exists",
    "time": "17:57",
    "tone": "neutral",
    "locationId": "pub",
    "cast": ["sophie","cal"],
    "speaker": "sophie",
    "prose": [
      "The room is real. That matters. It is dry, staffed and open. The pub will waive hire if the bar takes a minimum amount. Under-eighteens can attend until nine if accompanied by an adult, but the youth group cannot simply migrate here under its normal supervision rules. The council’s email did not mention any of that. It said activities had been ‘relocated where practicable.’",
      "Sophie points out that without the pub, there would be nothing. Cal points out that ‘nothing’ and ‘not the same thing’ are different nouns. Sophie says he should work for legal. Cal says legal cannot afford him.",
      "On the table beside Sophie is a printed invoice clipped to the licence conditions. She has not hidden it. She has also not volunteered it."
    ],
    "lines": [
      {"speaker":"sophie","text":"If I put every caveat into the public notice, it becomes a dissertation taped to a door. If I put none in, Maya says I’m lying. There is a space between those positions where my actual job happens."},
      {"speaker":"cal","text":"And a space between those positions where people find out at the door that their kid can’t come in."}
    ],
    "actions": [
      {"id":"observe_pub_invoice","label":"Read the invoice and licence conditions.","next":"pub_terms","intent":"Voluntarily inspect the terms of the substitute arrangement","effects":{"setFlags":{"pubObserved":true},"addInformation":["pub_minimum_spend","youth_access_restricted","council_pays_only_if_used"],"addObservations":["pub_continuity_invoice"]},"kind":"observation","unless":{"flags":{"pubObserved":true}}},
      {"id":"pub_terms_sophie","label":"Tell Sophie the room is a real achievement and the wording is still doing political work.","next":"pub_photo","intent":"Hold two truths at once","effects":{"setRelations":{"sophie":"challenged_but_seen"},"addMemories":["credited_sophie_and_challenged_wording"]}},
      {"id":"pub_terms_defend","label":"Say ‘continuity’ is fair if tonight still happens in some form.","next":"pub_photo","intent":"Prioritise practical continuation over exact equivalence","effects":{"addMemories":["defended_continuity_claim"]}},
      {"id":"pub_terms_maya","label":"Say the problem is not the pub; it is pretending Maya’s group has not lost anything.","next":"pub_photo","intent":"Protect Maya's account of loss","effects":{"setFlags":{"publicCorrection":true}}}
    ]
  },
  "pub_photo": {
    "id":"pub_photo","title":"A photograph somebody will use","time":"18:05","tone":"warm","locationId":"pub","cast":["sophie","cal"],"speaker":"sophie",
    "prose":[
      "Sophie turns the placard so it faces the room. She wants one photograph later: chairs occupied, musicians visible, council sign somewhere in frame. Not a staged handshake. Just evidence that the substitute was used. Her manager has already asked for it.",
      "Cal says, ‘That is a staged handshake with furniture.’ Sophie tells him to plug in the PA before she has him designated as an electrical issue.",
      "The request is ordinary enough to be dangerous. Taking the photograph does not commit you to the wording beneath it, but Sophie clearly hopes the image will close a bureaucratic loop. If you agree now, she will reasonably expect you not to disappear when the room becomes inconvenient."
    ],
    "lines":[
      {"speaker":"sophie","text":"I’m not asking you to endorse a press release. If something happens here, take a decent photo. If nothing happens, don’t fake one. That is the whole request."},
      {"speaker":"cal","text":"For the record, I photograph beautifully under institutional compromise."}
    ],
    "actions":[
      {"id":"pub_photo_yes","label":"Agree to take the photo if the room is genuinely used.","next":"@opening-complete","intent":"Create a conditional public-record commitment","effects":{"setFlags":{"promisedSophie":true},"setCommitments":{"sophie":"photograph_if_genuinely_used"},"setArrangements":{"continuity_photo":"committed"},"addMemories":["promised_sophie_conditional_photo"],"completeOpening":"pub"}},
      {"id":"pub_photo_no","label":"Decline. Tell Sophie she should own the record if the council needs it.","next":"@opening-complete","intent":"Refuse becoming the evidentiary bridge","effects":{"setCommitments":{"sophie":"none"},"setArrangements":{"continuity_photo":"declined"},"addMemories":["declined_sophie_photo"],"completeOpening":"pub"}},
      {"id":"pub_photo_context","label":"Say you’ll only take it if the placard is corrected first.","next":"@opening-complete","intent":"Make public evidence conditional on framing","effects":{"setFlags":{"promisedSophie":true,"publicCorrection":true},"setCommitments":{"sophie":"photo_after_correction"},"setArrangements":{"continuity_photo":"conditional"},"addMemories":["conditioned_photo_on_wording"],"completeOpening":"pub"}}
    ]
  },
  "bus_arrival": {
    "id":"bus_arrival","title":"The old coat","time":"17:52","tone":"intimate","locationId":"bus","cast":["tabitha"],"speaker":"tabitha",
    "prose":[
      "Tabitha has claimed the dry half of the shelter and is wearing a waxed coat too large for her. The sleeves cover half her hands. She lifts one arm when you approach, making the coat creak.",
      "‘Mum was clearing the cupboard under the stairs,’ she says. ‘Apparently I am now responsible for returning every object our family has accidentally annexed since 1998.’ From the pocket she produces a brass key with BWR 4 scratched into its bow.",
      "The departure display above her changes while you look at it. The 22:05 disappears. A small amber message appears: EVENING SERVICE ALTERATION — RESOURCE AVAILABILITY. The last bus toward Tabitha’s side of town is now 21:12. She sees you read it and makes a face that suggests the bus company has personally edited her evening."
    ],
    "lines":[
      {"speaker":"tabitha","text":"The key is either from Bellwether Rooms or opens a cursed Victorian pantry. Both would improve the property market."},
      {"speaker":"tabitha","text":"Also, you ignored the important part of my message, which was chips."}
    ],
    "actions":[
      {"id":"bus_arrive_key","label":"Ask how a Bellwether key ended up in her mother’s coat.","next":"bus_terms","intent":"Follow the object into shared history","effects":{"addInformation":["tabitha_family_hall_key"],"setFlags":{"busCutKnown":true}}},
      {"id":"bus_arrive_chips","label":"Say yes to chips before discussing the key.","next":"bus_terms","intent":"Prioritise the private arrangement","effects":{"setArrangements":{"tabitha_evening":"provisional"},"setRelations":{"tabitha":"pleased"},"setFlags":{"busCutKnown":true}}},
      {"id":"bus_arrive_bus","label":"Point out the last bus has moved to 21:12.","next":"bus_terms","intent":"Make time scarcity explicit without turning it into a timer","effects":{"setFlags":{"busCutKnown":true},"addInformation":["last_bus_2112"]}}
    ]
  },
  "bus_terms": {
    "id":"bus_terms","title":"What the key means to Tabitha","time":"18:00","tone":"intimate","locationId":"bus","cast":["tabitha"],"speaker":"tabitha",
    "prose":[
      "Tabitha’s mother used to help with the hall’s Saturday jumble sale and summer play scheme. Volunteers were issued keys with numbers, then the system changed, then the jumble sale folded, then nobody asked for this one back. Tabitha does not remember the administrative sequence. She remembers being eight and hiding under the stage while adults argued about raffle tickets.",
      "She holds the key between finger and thumb rather than placing it in your hand. That seems deliberate. The object is useful, but usefulness is not yet permission.",
      "She had wanted to walk to the chip shop by the canal, eat under the awning and catch the late bus. With the timetable cut, the plan still works if you leave the lane by about half eight. It stops working if ‘one quick thing’ at the hall becomes a civic saga."
    ],
    "lines":[
      {"speaker":"tabitha","text":"I will return the key to someone sensible. I will not hand it to a committee so they can photograph themselves giving it back to the public."},
      {"speaker":"tabitha","text":"And I am not spending my entire evening inside a metaphor for local government. I have standards."}
    ],
    "actions":[
      {"id":"bus_terms_respect","label":"Tell her it stays hers until she decides who gets it.","next":"bus_commit","intent":"Respect possession and agency before utility","effects":{"setRelations":{"tabitha":"trusted"},"addMemories":["respected_tabitha_key_agency"]}},
      {"id":"bus_terms_maya","label":"Tell her Maya is outside the hall right now and might actually need it.","next":"bus_commit","intent":"Connect private object to practical dependency","effects":{"addInformation":["maya_may_need_key"]}},
      {"id":"bus_terms_joke","label":"Promise not to let the key become a laminated stakeholder journey.","next":"bus_commit","intent":"Use shared satire to maintain intimacy","effects":{"setRelations":{"tabitha":"amused"}}}
    ]
  },
  "bus_commit": {
    "id":"bus_commit","title":"Half eight means half eight","time":"18:08","tone":"intimate","locationId":"bus","cast":["tabitha"],"speaker":"tabitha",
    "prose":[
      "Tabitha slips the key back into the coat. Then she asks the question plainly enough that there is no need for a romance meter to explain it. ‘Are we actually getting chips later, or is this one of those plans that exists until somebody more official speaks?’",
      "The rain thickens against the shelter roof. You know almost nothing about the hall beyond the messages. You also know that if you say yes, half eight will become a real expectation. It may be renegotiable later. It will not become unreal merely because circumstances become inconvenient."
    ],
    "lines":[{"speaker":"tabitha","text":"I’m not asking you to sign in blood. I’m asking whether I should emotionally commit to chips."}],
    "actions":[
      {"id":"bus_commit_yes","label":"Tell her yes: you’ll leave the lane with her by 20:30 unless you both agree otherwise.","next":"@opening-complete","intent":"Create a concrete time-and-person commitment","effects":{"setFlags":{"promisedTabitha":true},"setCommitments":{"tabitha":"leave_together_by_2030"},"setArrangements":{"tabitha_evening":"committed"},"addMemories":["promised_tabitha_2030"],"completeOpening":"bus"}},
      {"id":"bus_commit_soft","label":"Tell her you want to, but you cannot promise the time yet.","next":"@opening-complete","intent":"Express desire without creating false certainty","effects":{"setCommitments":{"tabitha":"tentative"},"setArrangements":{"tabitha_evening":"provisional"},"addMemories":["kept_tabitha_plan_tentative"],"completeOpening":"bus"}},
      {"id":"bus_commit_no","label":"Tell her not to wait on you tonight.","next":"@opening-complete","intent":"Withdraw before an expectation hardens","effects":{"setCommitments":{"tabitha":"none"},"setArrangements":{"tabitha_evening":"declined"},"addMemories":["declined_tabitha_evening"],"completeOpening":"bus"}}
    ]
  }
};

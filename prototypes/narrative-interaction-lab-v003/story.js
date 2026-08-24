export const PROTOTYPE_ID = "narrative-interaction-lab-v003";
export const STORY_TITLE = "Community Compass: Live";
export const STORY_SUBTITLE = "A short Managed Decline hook / comedy / emotional-journey test";
export const START_NODE = "hook";

export const CHARACTERS = {
  tabitha: {
    id: "tabitha",
    name: "Tabitha Mercer",
    initials: "TM",
    role: "former face of Community Compass; current municipal problem"
  },
  gareth: {
    id: "gareth",
    name: "Gareth Pike",
    initials: "GP",
    role: "freelance safeguarding facilitator"
  }
};

const line = (speaker, text, extra = {}) => ({ speaker, text, ...extra });

export const NODES = {
  hook: {
    id: "hook",
    phase: "hook",
    title: "What would you do about Tabitha?",
    time: "18:03",
    tone: "comic",
    cast: ["tabitha", "gareth"],
    prose: [
      "The projector says: WHAT WOULD YOU DO IF YOUR FRIEND TABITHA BEGAN EXPRESSING CHALLENGING VIEWS ONLINE? Underneath are three buttons: LISTEN WITHOUT JUDGEMENT. SPEAK TO A TRUSTED ADULT. RECORD YOUR CONCERNS.",
      "The real Tabitha Mercer is sitting beside you in the back row of Bellwether Library's Learning Suite Two, hood up, purple hair escaping at one side. She leans close enough that you can smell rain and peppermint gum."
    ],
    lines: [
      line("tabitha", "Still no option D: ask Tabitha out. Cowards."),
      line("gareth", "This archived scenario is retained for historical learning. Some visual and tonal choices reflect an earlier safeguarding context."),
      line("tabitha", "He's apologising for my fringe.", { aside: true })
    ],
    actions: [
      {
        id: "hook_flirt",
        label: "Whisper: ‘Option D seems evidence-based.’",
        intent: "Meet the absurdity with flirtation",
        next: "why_here",
        effects: { setFlags: { flirted: true }, setRelation: "playful", addMemories: ["picked_option_d"] }
      },
      {
        id: "hook_tease",
        label: "Whisper: ‘You brought me here to watch yourself get radicalised?’",
        intent: "Join Tabitha's joke",
        next: "why_here",
        effects: { setRelation: "amused", addMemories: ["teased_tabitha_about_training"] }
      },
      {
        id: "hook_escape",
        label: "Whisper: ‘We can still leave.’",
        intent: "Offer escape before spectacle",
        next: "why_here",
        effects: { setRelation: "noticed_kindness", addMemories: ["offered_early_escape"] }
      }
    ]
  },

  why_here: {
    id: "why_here",
    phase: "complicity",
    title: "The witness",
    time: "18:05",
    tone: "intimate-comic",
    cast: ["tabitha", "gareth"],
    prose: [
      "Her message an hour ago had been: LIBRARY. SIX. DON'T ASK. WEAR SOMETHING THAT SAYS ‘NOT A SAFEGUARDING LEAD.’ This is apparently what she meant.",
      "Gareth clicks past a title card for COMMUNITY COMPASS: RECOGNISING ONLINE VULNERABILITY. The cartoon version of Tabitha has a purple bob, three facial expressions and the haunted posture of someone designed by committee."
    ],
    lines: [
      line("tabitha", "They emailed me a link this morning saying the council was running a ‘legacy learning session’. I wanted to know if I was the legacy."),
      line("tabitha", "Don't tell him who I am yet. I want to see whether they've fixed the ending."),
      line("gareth", "For those who haven't encountered the scenario before, Tabitha is a fictionalised composite."),
      line("tabitha", "Oh, good. I've become several women.", { aside: true })
    ],
    actions: [
      {
        id: "complicity_yes",
        label: "Agree to keep quiet. ‘Your secret identity is safe.’",
        intent: "Accept complicity",
        next: "warning_signs",
        effects: { setFlags: { keptSecret: true }, setRelation: "co-conspirator", addMemories: ["agreed_to_keep_identity_quiet"] }
      },
      {
        id: "complicity_drink",
        label: "Agree, but tell her this costs her a drink.",
        intent: "Turn complicity into a personal future",
        next: "warning_signs",
        effects: { setFlags: { keptSecret: true, drinkDebt: true }, setRelation: "flirty_conspiracy", addMemories: ["charged_one_drink_for_secrecy"] }
      },
      {
        id: "complicity_why",
        label: "Ask why she cares what an old training package says about her.",
        intent: "Look past the joke toward the person",
        next: "warning_signs",
        effects: { setFlags: { keptSecret: true, askedWhy: true }, setRelation: "curious", addMemories: ["asked_why_tabitha_cares"] }
      }
    ]
  },

  warning_signs: {
    id: "warning_signs",
    phase: "delight",
    title: "Early warning signs",
    time: "18:08",
    tone: "comic",
    cast: ["tabitha", "gareth"],
    prose: [
      "A slide appears: POSSIBLE CHANGES TO NOTICE. It includes sudden withdrawal from ordinary activities, fixation on grievance-based content, increasingly hostile posting, and — in a smaller bullet — ‘intense interest in national history or identity without previous context.’",
      "A man in a fleece near the front raises his hand and asks whether owning a lot of military history books counts. Gareth says no. A woman beside him asks whether purple hair counts. Gareth says appearance is not a safeguarding indicator. On the projector, cartoon Tabitha is ninety percent purple hair."
    ],
    lines: [
      line("tabitha", "Excellent. We have cleared my hair."),
      line("gareth", "Context matters. An interest in British history is not, by itself, evidence of radicalisation."),
      line("tabitha", "This is the nicest thing a professional has ever said about my browser history.", { aside: true }),
      line("gareth", "Irony can sometimes make direct engagement difficult, but irony is also not, by itself, a warning sign."),
      line("tabitha", "We're losing ground.", { aside: true })
    ],
    actions: [
      {
        id: "warning_laugh",
        label: "Try not to laugh. Fail visibly.",
        intent: "Share the comic experience with Tabitha",
        next: "old_ending",
        effects: { setRelation: "laughing_together", addMemories: ["laughed_through_warning_signs"] }
      },
      {
        id: "warning_note",
        label: "Whisper: ‘They've accidentally made you sound interesting.’",
        intent: "Express attraction through the institutional caricature",
        next: "old_ending",
        effects: { setFlags: { flirted: true }, setRelation: "charged", addMemories: ["called_tabitha_interesting"] }
      },
      {
        id: "warning_watch",
        label: "Watch Tabitha instead of the projector.",
        intent: "Read the person beneath the joke",
        next: "old_ending",
        effects: { setFlags: { watchedTabitha: true }, setRelation: "seen", addMemories: ["watched_tabitha_reaction"] }
      }
    ]
  },

  old_ending: {
    id: "old_ending",
    phase: "escalation",
    title: "They fixed the ending",
    time: "18:12",
    tone: "bright-to-uneasy",
    cast: ["tabitha", "gareth"],
    prose: [
      "Gareth says the original ending was criticised for being too punitive. This edition contains a new ‘restorative pathway’. Cartoon Tabitha now smiles beside a community planter in a hi-vis vest.",
      "A caption appears beneath her: AFTER SUPPORT FROM PEOPLE I TRUSTED, I REALISED MY FRUSTRATION WAS BEING EXPLOITED ONLINE. VOLUNTEERING HELPED ME FEEL PART OF MY COMMUNITY AGAIN. — TABITHA, PARTICIPANT VOICE"
    ],
    lines: [
      line("tabitha", "They made me join a litter pick."),
      line("gareth", "The revised ending centres reconnection rather than punishment."),
      line("tabitha", "I've never held that grabber in my life."),
      line("gareth", "Participant voice was incorporated during the 2025 refresh."),
      line("tabitha", "No it wasn't.", { aside: true })
    ],
    actions: [
      {
        id: "ending_joke",
        label: "Whisper: ‘Maybe the grabber was symbolic.’",
        intent: "Offer one last joke and test whether she wants it",
        next: "sting",
        effects: { addMemories: ["joked_about_symbolic_grabber"] }
      },
      {
        id: "ending_ask",
        label: "Ask quietly: ‘You really never said that?’",
        intent: "Verify the emotional turn rather than assume",
        next: "sting",
        effects: { setFlags: { verifiedQuote: true }, setRelation: "attentive", addMemories: ["checked_quote_with_tabitha"] }
      },
      {
        id: "ending_source",
        label: "Look at the tiny source line under the quote.",
        intent: "Follow the institutional claim",
        next: "sting",
        effects: { setFlags: { noticedSource: true }, addInformation: ["quote_source_is_vendor_refresh"] }
      }
    ]
  },

  sting: {
    id: "sting",
    phase: "sting",
    title: "Not dangerous. Cured.",
    time: "18:14",
    tone: "intimate",
    cast: ["tabitha", "gareth"],
    prose: [
      "For the first time since you sat down, Tabitha is not trying to make the room funnier. She studies the smiling cartoon version of herself as if somebody has put her face on a charity tin.",
      "The tiny source line says: PARTICIPANT VOICE SYNTHESISED FROM FACILITATED FEEDBACK — CIVICWELL LEARNING LTD., 2025 REFRESH."
    ],
    lines: [
      line("tabitha", "The old one thought I was dangerous. Fine. At least it disliked something I actually said."),
      line("tabitha", "This one says I got better."),
      line("tabitha", "I didn't get better. I got older and learned not to argue with council contractors before lunch."),
      line("tabitha", "They've given me a redemption arc because apparently even fictionalised composites need to become employable." )
    ],
    actions: [
      {
        id: "sting_person",
        label: "Tell her: ‘They still need you to be a lesson instead of a person.’",
        intent: "Name the person-versus-symbol wound",
        next: "remote_guest",
        effects: { setFlags: { understoodSting: true }, setRelation: "understood", addMemories: ["named_person_not_lesson"] }
      },
      {
        id: "sting_angry",
        label: "Say: ‘That's not a rewrite. That's putting words in your mouth.’",
        intent: "Share her anger without turning it into analysis",
        next: "remote_guest",
        effects: { setFlags: { angryForTabitha: true }, setRelation: "backed", addMemories: ["called_quote_fabrication"] }
      },
      {
        id: "sting_exit",
        label: "Ask if she wants to go now.",
        intent: "Give her an exit rather than demand a confrontation",
        next: "remote_guest",
        effects: { setFlags: { offeredExit: true }, setRelation: "safe", addMemories: ["offered_exit_after_quote"] }
      }
    ]
  },

  remote_guest: {
    id: "remote_guest",
    phase: "oh_shit",
    title: "Special guest",
    time: "18:16",
    tone: "comic-panic",
    cast: ["tabitha", "gareth"],
    prose: [
      "Gareth's laptop makes the municipal Teams noise. A notification appears on the projector before he can move the cursor: LIVED EXPERIENCE CONTRIBUTOR — T. MERCER — CONNECTION FAILED. RETRY?",
      "At exactly the same moment, Tabitha's phone begins vibrating against the plastic chair between you. The screen says NO CALLER ID. The vibration is loud enough to become public property. Three people turn around."
    ],
    lines: [
      line("gareth", "Ah. We were hoping the original participant might join us remotely for the final section."),
      line("tabitha", "Original participant." , { aside: true }),
      line("gareth", "If Ms Mercer is able to connect, please remember this is a psychologically safe learning environment."),
      line("tabitha", "I am developing a competing hypothesis.", { aside: true })
    ],
    actions: [
      {
        id: "phone_silence",
        label: "Cover her buzzing phone with your hand until the room looks forward again.",
        intent: "Protect her identity through one socially meaningful physical act",
        kind: "material",
        next: "choice",
        effects: { setFlags: { protectedPhone: true }, setRelation: "protected", addMemories: ["covered_tabitha_phone"] }
      },
      {
        id: "phone_smile",
        label: "Meet her eyes and let her decide what happens next.",
        intent: "Refuse to seize control of her reveal",
        next: "choice",
        effects: { setFlags: { deferredToTabitha: true }, setRelation: "trusted", addMemories: ["let_tabitha_choose_reveal"] }
      },
      {
        id: "phone_whisper",
        label: "Whisper: ‘This is the funniest possible way they could have done this.’",
        intent: "Restore shared comedy without dismissing the sting",
        next: "choice",
        effects: { setFlags: { restoredJoke: true }, setRelation: "co_conspirator", addMemories: ["laughed_at_failed_remote_guest"] }
      }
    ]
  },

  choice: {
    id: "choice",
    phase: "choice",
    title: "What does she owe them?",
    time: "18:18",
    tone: "charged",
    cast: ["tabitha", "gareth"],
    prose: [
      "Gareth declines the failed call and tells the room they will continue without the guest. Tabitha puts her phone face-down on her knee.",
      "She speaks without looking at you. ‘If I stand up, don't rescue me unless I ask. If I don't stand up, don't make it noble.’ Then she finally looks over. ‘Thoughts?’"
    ],
    lines: [
      line("tabitha", "I can ruin his evening. I can leave. Or I can make him explain where that quote came from and then ruin his evening with paperwork." )
    ],
    actions: [
      {
        id: "choice_spectacle",
        label: "‘If you want the microphone, I'm with you.’",
        intent: "Back a public self-authored reveal",
        next: "public_reveal",
        effects: { setFlags: { chosePublic: true }, setRelation: "partner_in_crime", addMemories: ["backed_public_reveal"] }
      },
      {
        id: "choice_leave",
        label: "‘You don't owe them a performance. Let's go.’",
        intent: "Protect private personhood over public correction",
        next: "private_exit",
        effects: { setFlags: { chosePrivate: true }, setRelation: "safe_person", addMemories: ["chose_to_leave_with_tabitha"] }
      },
      {
        id: "choice_source",
        label: "‘Make him source the quote first. Then decide.’",
        intent: "Turn institutional process back onto the institution",
        next: "source_confrontation",
        effects: { setFlags: { choseSource: true }, setRelation: "strategic_ally", addMemories: ["chose_source_then_reveal"] }
      }
    ]
  },

  public_reveal: {
    id: "public_reveal",
    phase: "payoff",
    title: "The challenging view",
    time: "18:20",
    tone: "comic-release",
    cast: ["tabitha", "gareth"],
    prose: [
      "Tabitha stands. Gareth stops mid-sentence. The projector freezes on cartoon Tabitha smiling beside the planter while real Tabitha, in the back row, pushes her hood down.",
      "There is a silence just long enough to become exquisite."
    ],
    lines: [
      line("tabitha", "Hi. Sorry the remote contributor couldn't make it."),
      line("gareth", "Oh."),
      line("tabitha", "I am the fictionalised composite."),
      line("gareth", "This is— actually, this is extremely valuable."),
      line("tabitha", "No. At the moment it's extremely funny. Valuable can come later."),
      line("tabitha", "First question: who wrote the thing about me finding myself through litter picking? Because if I'm going to be rehabilitated, I'd like Nectar points." )
    ],
    actions: [
      {
        id: "public_take_seat",
        label: "Slide into the empty chair beside the facilitator's desk when Tabitha crooks a finger at you.",
        intent: "Publicly join her rather than spectate",
        kind: "material",
        next: "ending_public",
        effects: { addMemories: ["sat_beside_tabitha_during_reveal"] }
      },
      {
        id: "public_watch",
        label: "Stay in the back row and let this be hers.",
        intent: "Support without occupying her reveal",
        next: "ending_public",
        effects: { addMemories: ["let_tabitha_own_reveal"] }
      }
    ]
  },

  private_exit: {
    id: "private_exit",
    phase: "payoff",
    title: "Not content",
    time: "18:20",
    tone: "warm",
    cast: ["tabitha"],
    prose: [
      "Tabitha looks at the projector once more, then stands without announcing herself. You follow her through the library's automatic doors while Gareth begins a section called REFLECTIVE PRACTICE.",
      "Outside, the rain has stopped. She exhales so hard it almost becomes a laugh."
    ],
    lines: [
      line("tabitha", "Every person who recognises me wants the moment where I react to being me."),
      line("tabitha", "Thanks for letting me be annoyed in private."),
      line("tabitha", "I am getting chips now. You can come if you promise not to write a reflective learning outcome." )
    ],
    actions: [
      {
        id: "private_yes",
        label: "Go for chips with her.",
        intent: "Choose ordinary intimacy after public absurdity",
        next: "ending_private",
        effects: { setFlags: { chips: true }, addMemories: ["went_for_chips_after_workshop"] }
      },
      {
        id: "private_tease",
        label: "Tell her your learning outcome is ‘always pick option D.’",
        intent: "Return to the opening flirt as payoff",
        next: "ending_private",
        effects: { setFlags: { flirted: true, chips: true }, addMemories: ["returned_to_option_d"] }
      }
    ]
  },

  source_confrontation: {
    id: "source_confrontation",
    phase: "payoff",
    title: "Participant voice",
    time: "18:20",
    tone: "satirical-release",
    cast: ["tabitha", "gareth"],
    prose: [
      "You raise your hand and ask what ‘participant voice synthesised from facilitated feedback’ means. Gareth gives the phrase the careful look of a man discovering it was loaded before he picked it up.",
      "He opens the facilitator notes. The source is not an interview with Tabitha. It is a vendor summary of workshop feedback about what a constructive ending for the character might sound like."
    ],
    lines: [
      line("gareth", "To be precise, it appears to be a composite first-person formulation."),
      line("tabitha", "That's an absolutely beautiful phrase for making shit up."),
      line("gareth", "I'm sorry— are you—"),
      line("tabitha", "Unfortunately."),
      line("gareth", "Right."),
      line("tabitha", "Good. Now we're all oriented." )
    ],
    actions: [
      {
        id: "source_back_her",
        label: "Ask Gareth to leave the quote on screen while Tabitha speaks for herself.",
        intent: "Create contrast between institutional voice and actual person",
        next: "ending_source",
        effects: { addMemories: ["asked_to_leave_false_quote_visible"] }
      },
      {
        id: "source_let_her",
        label: "Say nothing. Tabitha already has the room.",
        intent: "Recognise when support means not adding another voice",
        next: "ending_source",
        effects: { addMemories: ["let_tabitha_control_correction"] }
      }
    ]
  },

  ending_public: {
    id: "ending_public",
    phase: "future_pull",
    title: "Friday, apparently",
    tone: "warm-comic",
    endingId: "public",
    cast: ["tabitha"],
    prose: [
      "Twenty minutes later the workshop has ceased to resemble its lesson plan. Gareth, to his credit, stops defending the slides and starts taking notes. Tabitha has drawn a fourth answer on the flipchart under WHAT WOULD YOU DO IF YOUR FRIEND TABITHA EXPRESSED CHALLENGING VIEWS?",
      "D. ASK TABITHA WHAT SHE ACTUALLY THINKS.",
      "Underneath, in smaller writing, she has added: OR ASK HER OUT. CONTEXT MATTERS."
    ],
    lines: [
      line("tabitha", "You realise you've now been publicly associated with the Mercer situation."),
      line("tabitha", "Friday. Eight. Somewhere without a projector?" )
    ],
    actions: [{ id: "finish_public", label: "End slice", next: "@debrief", intent: "Finish" }]
  },

  ending_private: {
    id: "ending_private",
    phase: "future_pull",
    title: "Chips, no learning outcomes",
    tone: "warm-intimate",
    endingId: "private",
    cast: ["tabitha"],
    prose: [
      "You are halfway to the chip shop when Tabitha's phone receives an email titled THANK YOU FOR YOUR NON-ATTENDANCE. She shows you the screen, laughs once, and puts the phone away without opening it.",
      "For the next block she talks about absolutely nothing to do with Community Compass. A terrible landlord. A boot she wants but cannot justify. The municipal mosaics nobody looks up at. It is the first time all evening she has not been somebody's case study."
    ],
    lines: [
      line("tabitha", "This is better."),
      line("tabitha", "Friday as well? I promise to be only incidentally controversial." )
    ],
    actions: [{ id: "finish_private", label: "End slice", next: "@debrief", intent: "Finish" }]
  },

  ending_source: {
    id: "ending_source",
    phase: "future_pull",
    title: "Correction pending",
    tone: "warm-satirical",
    endingId: "source",
    cast: ["tabitha", "gareth"],
    prose: [
      "Gareth emails the programme owner from the front of the room. The false first-person quote remains projected behind him like evidence at its own disciplinary hearing. He says there should be a correction. Tabitha says she wants the wording ‘we accidentally invented an improved version of you’ somewhere in the minutes.",
      "On the way out, she takes a photograph of the slide — not herself beside it, just the slide. She sends it to you with no caption."
    ],
    lines: [
      line("tabitha", "You are dangerously useful in a meeting."),
      line("tabitha", "I hate that about you already."),
      line("tabitha", "Drink Friday? You can explain whether forcing a contractor to define ‘synthesised participant voice’ counts as flirting." )
    ],
    actions: [{ id: "finish_source", label: "End slice", next: "@debrief", intent: "Finish" }]
  }
};

export const ENDINGS = {
  public: { title: "Friday, apparently", summary: "Tabitha takes back the room and turns the training exercise into her own material." },
  private: { title: "Chips, no learning outcomes", summary: "You leave the spectacle behind and meet Tabitha as a person rather than a public symbol." },
  source: { title: "Correction pending", summary: "The institution is forced to explain its own invented participant voice while Tabitha speaks for herself." }
};

export const DEBRIEF_QUESTIONS = [
  "At the end of the first minute, did you want to continue? Why or why not?",
  "What was the first moment you found genuinely funny, if any?",
  "What did you feel about Tabitha at the start, middle and end?",
  "Did the shift from comedy to the fabricated quote land emotionally, or did it feel manufactured?",
  "When her phone rang, what did you want to happen?",
  "Why did you choose public reveal, leaving, or sourcing the quote?",
  "Did any choice feel like it changed the social/emotional meaning rather than merely selecting a branch?",
  "Which line, image or beat do you remember most clearly?",
  "What dragged or felt like writerly effort?",
  "When the slice ended, did you want another scene with Tabitha?",
  "If this were the opening of the full game, would you keep playing?"
];

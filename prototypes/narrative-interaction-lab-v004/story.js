export const PROTOTYPE_ID = "narrative-interaction-lab-v004";
export const STORY_TITLE = "Community Compass: On Shift";
export const STORY_SUBTITLE = "Activity-spine prototype: dialogue baseline vs spatial attention vs situated obligation";

export const CONDITIONS = {
  a: {
    id: "a",
    publicLabel: "Version A",
    designLabel: "Dialogue baseline",
    description: "Authored progression with high-semantic dialogue choices and no navigable work layer."
  },
  b: {
    id: "b",
    publicLabel: "Version B",
    designLabel: "Spatial attention",
    description: "The same dramatic clock, but the player moves between spaces and chooses where to spend each beat."
  },
  c: {
    id: "c",
    publicLabel: "Version C",
    designLabel: "Situated obligation",
    description: "Version B plus persistent library work that accumulates when ignored and is acknowledged later."
  }
};

export const LOCATIONS = {
  desk: {
    id: "desk",
    name: "Staff desk",
    short: "Desk",
    description: "Returns, borrower queries, a service bell nobody admits buying."
  },
  workshop: {
    id: "workshop",
    name: "Learning Suite Two",
    short: "Workshop",
    description: "A glass-walled training room with twelve chairs and a projector."
  },
  foyer: {
    id: "foyer",
    name: "Foyer",
    short: "Foyer",
    description: "Printer, council noticeboard, vending machine, doors to the street."
  },
  outside: {
    id: "outside",
    name: "Pavement",
    short: "Outside",
    description: "Bike racks, returns slot and a damp municipal planter."
  }
};

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
  },
  patron: {
    id: "patron",
    name: "Library patron",
    initials: "LP",
    role: "member of the public with extremely ordinary needs"
  }
};

const line = (speaker, text, extra = {}) => ({ speaker, text, ...extra });
const action = (id, label, intent, effects = {}, extra = {}) => ({
  id, label, intent, effects, ...extra
});

export const MOMENTS = [
  {
    id: "hook",
    phase: "hook",
    time: "18:03",
    title: "What would you do about Tabitha?",
    projector: {
      head: "COMMUNITY COMPASS",
      body: "WHAT WOULD YOU DO IF YOUR FRIEND TABITHA BEGAN EXPRESSING CHALLENGING VIEWS ONLINE?",
      foot: "LISTEN WITHOUT JUDGEMENT · SPEAK TO A TRUSTED ADULT · RECORD YOUR CONCERNS"
    },
    prose: [
      "Your last half-hour on the Bellwether Library desk is supposed to be returns and closing announcements. Your phone buzzes under the counter: TABITHA — LEARNING SUITE TWO. BACK ROW. NOW. DON'T ASK.",
      "Through the glass wall of the suite, the projector is already showing a purple-haired cartoon girl labelled TABITHA."
    ],
    lines: [
      line("tabitha", "Still no option D: ask Tabitha out. Cowards."),
      line("gareth", "This archived scenario is retained for historical learning. Some visual and tonal choices reflect an earlier safeguarding context."),
      line("tabitha", "He's apologising for my fringe.", { aside: true })
    ],
    workshopActions: [
      action("hook_flirt", "Whisper: ‘Option D seems evidence-based.’", "Meet the absurdity with flirtation",
        { setFlags: { flirted: true }, setRelation: "playful", addMemories: ["picked_option_d"] }),
      action("hook_tease", "Whisper: ‘You dragged me off shift to watch yourself get radicalised?’", "Join Tabitha's joke",
        { setRelation: "amused", addMemories: ["teased_tabitha_about_training"] }),
      action("hook_escape", "Whisper: ‘I can go back to the desk. You can still leave.’", "Offer escape without making the spectacle obligatory",
        { setRelation: "noticed_kindness", addMemories: ["offered_early_escape"] })
    ],
    cues: {
      desk: "One return trolley is still half full. Nobody is waiting yet.",
      workshop: "Tabitha has saved the chair beside her with her coat. Gareth is already speaking.",
      foyer: "The public printer says LOAD A4 TRAY 2. There is no tray 2.",
      outside: "The returns slot is blinking FULL in a way that may or may not be legally binding."
    },
    contextActions: {
      desk: action("hook_work_desk", "Clear the returns trolley while watching the workshop through the glass.", "Stay at work and keep the situation peripheral",
        { addMemories: ["cleared_returns_during_hook"] }, { clearsWork: 2 }),
      foyer: action("hook_work_foyer", "Feed paper into the printer and test whether ‘tray 2’ means ‘the only tray’.", "Solve a small concrete problem instead of joining the scene",
        { addMemories: ["fixed_printer_during_hook"] }, { clearsWork: 1 }),
      outside: action("hook_work_outside", "Empty the returns slot into a crate.", "Do the obvious closing task outside",
        { addMemories: ["emptied_returns_slot"] }, { clearsWork: 1 })
    },
    workDemand: 1
  },
  {
    id: "complicity",
    phase: "complicity",
    time: "18:05",
    title: "The witness",
    projector: {
      head: "ARCHIVE SCENARIO",
      body: "TABITHA · FICTIONALISED COMPOSITE",
      foot: "LEGACY LEARNING SESSION"
    },
    prose: [
      "Gareth clicks past COMMUNITY COMPASS: RECOGNISING ONLINE VULNERABILITY. Cartoon Tabitha has three facial expressions and the posture of somebody designed by committee.",
      "Actual Tabitha has her hood up and the expression of somebody who has paid nothing for this entertainment."
    ],
    lines: [
      line("tabitha", "They emailed me this morning saying the council was running a ‘legacy learning session’. I wanted to know if I was the legacy."),
      line("tabitha", "Don't tell him who I am yet. I want to see whether they've fixed the ending."),
      line("gareth", "For those who haven't encountered the scenario before, Tabitha is a fictionalised composite."),
      line("tabitha", "Oh, good. I've become several women.", { aside: true })
    ],
    workshopActions: [
      action("complicity_yes", "‘Your secret identity is safe.’", "Accept complicity",
        { setFlags: { keptSecret: true }, setRelation: "co-conspirator", addMemories: ["agreed_to_keep_identity_quiet"] }),
      action("complicity_drink", "Agree, but tell her this costs her a drink after your shift.", "Turn complicity into a personal future",
        { setFlags: { keptSecret: true, drinkDebt: true }, setRelation: "flirty_conspiracy", addMemories: ["charged_one_drink_for_secrecy"] }),
      action("complicity_why", "Ask why she cares what an old training package says about her.", "Look past the joke toward the person",
        { setFlags: { keptSecret: true, askedWhy: true }, setRelation: "curious", addMemories: ["asked_why_tabitha_cares"] })
    ],
    cues: {
      desk: "A man has placed a library card on the counter and is reading the sign that says PLEASE RING BELL. He has not rung it.",
      workshop: "Tabitha keeps glancing at the projector, then at you, as if checking whether the joke still belongs to both of you.",
      foyer: "A cardboard stand says YOUR LIBRARY, YOUR VOICE. The QR code points to last year's consultation.",
      outside: "A courier is trying to work out whether ‘Learning Suite Two’ is a person."
    },
    contextActions: {
      desk: action("complicity_work_desk", "Renew the man's library card and pretend the bell does not exist.", "Attend to a person whose need is small but real",
        { addMemories: ["renewed_card_instead_of_workshop"] }, { clearsWork: 2 }),
      foyer: action("complicity_work_foyer", "Turn the dead consultation stand around so nobody scans it.", "Fix misleading clutter without making it a project",
        { addMemories: ["turned_old_consultation_sign"] }, { clearsWork: 1 }),
      outside: action("complicity_work_outside", "Take the courier's box and point him toward Learning Suite Two.", "Help a delivery keep moving",
        { addInformation: ["workshop_received_civicwell_box"] }, { clearsWork: 1 })
    },
    workDemand: 1
  },
  {
    id: "warning_signs",
    phase: "delight",
    time: "18:08",
    title: "Early warning signs",
    projector: {
      head: "POSSIBLE CHANGES TO NOTICE",
      body: "GRIEVANCE CONTENT · HOSTILE POSTING · INTENSE INTEREST IN NATIONAL HISTORY",
      foot: "CONTEXT MATTERS"
    },
    prose: [
      "A slide lists possible changes to notice: sudden withdrawal, grievance-based content, hostile posting, and — in smaller type — intense interest in national history or identity without previous context.",
      "A woman asks whether purple hair counts. Gareth says appearance is not a safeguarding indicator. On screen, cartoon Tabitha is approximately ninety percent purple hair."
    ],
    lines: [
      line("tabitha", "Excellent. We have cleared my hair."),
      line("gareth", "An interest in British history is not, by itself, evidence of radicalisation."),
      line("tabitha", "This is the nicest thing a professional has ever said about my browser history.", { aside: true }),
      line("gareth", "Irony is also not, by itself, a warning sign."),
      line("tabitha", "We're losing ground.", { aside: true })
    ],
    workshopActions: [
      action("warning_laugh", "Try not to laugh. Fail visibly.", "Share the comic experience with Tabitha",
        { setRelation: "laughing_together", addMemories: ["laughed_through_warning_signs"] }),
      action("warning_flirt", "Whisper: ‘They've accidentally made you sound interesting.’", "Express attraction through the caricature",
        { setFlags: { flirted: true }, setRelation: "charged", addMemories: ["called_tabitha_interesting"] }),
      action("warning_watch", "Watch Tabitha instead of the projector.", "Read the person beneath the joke",
        { setFlags: { watchedTabitha: true }, setRelation: "seen", addMemories: ["watched_tabitha_reaction"] })
    ],
    cues: {
      desk: "Two people are now waiting: one with returns, one holding a phone that shows an expired e-book loan.",
      workshop: "The room has found its rhythm. Gareth says something careful; Tabitha quietly makes it worse.",
      foyer: "The printer has produced six blank separator pages and one page headed SAFEGUARDING SOURCE NOTES.",
      outside: "Rain has started. Someone has wedged the returns slot open with a local-election leaflet."
    },
    contextActions: {
      desk: action("warning_work_desk", "Deal with both borrowers before the queue becomes a queue.", "Keep ordinary service friction from escalating",
        { addMemories: ["served_two_borrowers_during_warning_signs"] }, { clearsWork: 3 }),
      foyer: action("warning_work_foyer", "Take the stray SAFEGUARDING SOURCE NOTES page from the printer tray.", "Notice material evidence while away from the scene",
        { addInformation: ["saw_source_notes_printout"], addMemories: ["found_source_notes_at_printer"] }, { clearsWork: 1 }),
      outside: action("warning_work_outside", "Remove the leaflet from the returns slot and rescue the damp books behind it.", "Prevent a mundane mess",
        { addMemories: ["rescued_damp_returns"] }, { clearsWork: 1 })
    },
    workDemand: 2
  },
  {
    id: "restorative",
    phase: "escalation",
    time: "18:12",
    title: "They fixed the ending",
    projector: {
      head: "RESTORATIVE PATHWAY",
      body: "‘I REALISED MY FRUSTRATION WAS BEING EXPLOITED ONLINE.’",
      foot: "TABITHA · PARTICIPANT VOICE"
    },
    prose: [
      "Gareth says the original ending was criticised for being too punitive. The revised edition shows cartoon Tabitha smiling beside a community planter in a hi-vis vest.",
      "A first-person quote says that support helped her realise her frustration was being exploited online and that volunteering helped her feel part of her community again."
    ],
    lines: [
      line("tabitha", "They made me join a litter pick."),
      line("gareth", "The revised ending centres reconnection rather than punishment."),
      line("tabitha", "I've never held that grabber in my life."),
      line("gareth", "Participant voice was incorporated during the 2025 refresh."),
      line("tabitha", "No it wasn't.", { aside: true })
    ],
    workshopActions: [
      action("restorative_joke", "‘Maybe the grabber was symbolic.’", "Offer one last joke and test whether she wants it",
        { addMemories: ["joked_about_symbolic_grabber"] }),
      action("restorative_verify", "Ask quietly: ‘You really never said that?’", "Verify the emotional turn rather than assume",
        { setFlags: { verifiedQuote: true }, setRelation: "attentive", addMemories: ["checked_quote_with_tabitha"] }),
      action("restorative_source", "Read the tiny source line under the quote.", "Follow the institutional claim",
        { setFlags: { noticedSource: true }, addInformation: ["quote_source_is_vendor_refresh"] })
    ],
    cues: {
      desk: "The service bell finally rings. Once. Then, after a pause, twice more.",
      workshop: "Tabitha has stopped smiling at the screen.",
      foyer: "A CivicWell Learning delivery box sits beneath the noticeboard. One flap is open. Inside are facilitator packs dated 2025 REFRESH.",
      outside: "A woman is trying to push a buggy through the heavy outer door while holding three books."
    },
    contextActions: {
      desk: action("restorative_work_desk", "Go back to the bell and handle the waiting queries.", "Choose the obligation that is actually asking for you",
        { addMemories: ["answered_service_bell_during_restorative_slide"] }, { clearsWork: 3 }),
      foyer: action("restorative_work_foyer", "Check the open CivicWell box for the quote source.", "Investigate the claim materially instead of staying beside Tabitha",
        { setFlags: { noticedSource: true }, addInformation: ["quote_source_is_vendor_refresh"], addMemories: ["checked_civicwell_box"] }, { clearsWork: 1 }),
      outside: action("restorative_work_outside", "Hold the door and take the woman's returns.", "Help someone without turning it into a system",
        { addMemories: ["helped_buggy_at_door"] }, { clearsWork: 1 })
    },
    workDemand: 2
  },
  {
    id: "sting",
    phase: "sting",
    time: "18:14",
    title: "Not dangerous. Cured.",
    projector: {
      head: "PARTICIPANT VOICE",
      body: "SYNTHESISED FROM FACILITATED FEEDBACK",
      foot: "CIVICWELL LEARNING LTD. · 2025 REFRESH"
    },
    prose: [
      "For the first time, Tabitha is not trying to make the room funnier. The tiny source line reads: PARTICIPANT VOICE SYNTHESISED FROM FACILITATED FEEDBACK — CIVICWELL LEARNING LTD., 2025 REFRESH.",
      "The joke has acquired paperwork."
    ],
    lines: [
      line("tabitha", "The old one thought I was dangerous. Fine. At least it disliked something I actually said."),
      line("tabitha", "This one says I got better."),
      line("tabitha", "I didn't get better. I got older and learned not to argue with council contractors before lunch."),
      line("tabitha", "They've given me a redemption arc because apparently even fictionalised composites need to become employable.")
    ],
    workshopActions: [
      action("sting_person", "‘They still need you to be a lesson instead of a person.’", "Name the person-versus-symbol wound",
        { setFlags: { understoodSting: true }, setRelation: "understood", addMemories: ["named_person_not_lesson"] }),
      action("sting_angry", "‘That's not a rewrite. That's putting words in your mouth.’", "Share her anger without turning it into analysis",
        { setFlags: { angryForTabitha: true }, setRelation: "backed", addMemories: ["called_quote_fabrication"] }),
      action("sting_exit", "Ask if she wants to leave now.", "Give her an exit rather than demand a confrontation",
        { setFlags: { offeredExit: true }, setRelation: "safe", addMemories: ["offered_exit_after_quote"] })
    ],
    cues: {
      desk: "The queue is no longer hypothetical. A child is pressing the service bell with the concentration of a lab technician.",
      workshop: "Tabitha is staring at the volunteering picture. The room has not noticed that the joke changed temperature.",
      foyer: "The source-notes page names CivicWell Learning Ltd. and the phrase ‘synthetic participant voice’ in small type.",
      outside: "The rain is harder now. The library windows turn the workshop into a bright little box."
    },
    contextActions: {
      desk: action("sting_work_desk", "Take the desk back and work through whoever is waiting.", "Accept that ordinary people still need things while the interesting scene happens elsewhere",
        { addMemories: ["worked_queue_during_sting"] }, { clearsWork: 4 }),
      foyer: action("sting_work_foyer", "Photograph the source-notes page before returning it to the tray.", "Preserve information without confronting anyone yet",
        { addInformation: ["photographed_source_notes"], addMemories: ["photographed_source_notes"] }, { clearsWork: 1 }),
      outside: action("sting_work_outside", "Stand under the awning for one quiet minute.", "Choose distance from both work and spectacle",
        { addMemories: ["took_quiet_minute_outside"] }, { clearsWork: 0 })
    },
    workDemand: 2
  },
  {
    id: "remote_guest",
    phase: "oh_shit",
    time: "18:16",
    title: "Special guest",
    projector: {
      head: "LIVED EXPERIENCE CONTRIBUTOR",
      body: "T. MERCER · CONNECTION FAILED",
      foot: "RETRY?"
    },
    prose: [
      "Gareth's laptop makes the municipal Teams noise. The projector flashes: LIVED EXPERIENCE CONTRIBUTOR — T. MERCER — CONNECTION FAILED. RETRY?",
      "At the same moment, Tabitha's phone begins vibrating against the plastic chair. Three people turn around."
    ],
    lines: [
      line("gareth", "Ah. We were hoping the original participant might join us remotely for the final section."),
      line("tabitha", "Original participant.", { aside: true }),
      line("gareth", "If Ms Mercer is able to connect, please remember this is a psychologically safe learning environment."),
      line("tabitha", "I am developing a competing hypothesis.", { aside: true })
    ],
    workshopActions: [
      action("phone_cover", "Cover her buzzing phone with your hand until the room looks forward again.", "Protect her identity through one concrete physical act",
        { setFlags: { protectedPhone: true }, setRelation: "protected", addMemories: ["covered_tabitha_phone"] }, { kind: "material" }),
      action("phone_defer", "Meet her eyes and let her decide what happens next.", "Refuse to seize control of her reveal",
        { setFlags: { deferredToTabitha: true }, setRelation: "trusted", addMemories: ["let_tabitha_choose_reveal"] }),
      action("phone_joke", "‘This is the funniest possible way they could have done this.’", "Restore shared comedy without dismissing the sting",
        { setFlags: { restoredJoke: true }, setRelation: "co_conspirator", addMemories: ["laughed_at_failed_remote_guest"] })
    ],
    cues: {
      desk: "Someone needs help resetting a PIN. The bell rings just as a burst of laughter dies in the workshop.",
      workshop: "Tabitha's phone is vibrating. Gareth is looking at the projector. The room is beginning to look backward.",
      foyer: "The printer wakes up by itself and produces a remote-contributor consent form.",
      outside: "A bus pulls away, leaving the pavement briefly empty."
    },
    contextActions: {
      desk: action("remote_work_desk", "Reset the borrower's PIN and keep your voice low.", "Choose service while a socially explosive moment develops nearby",
        { addMemories: ["reset_pin_during_remote_call"] }, { clearsWork: 3 }),
      foyer: action("remote_work_foyer", "Take the consent form before it drops to the floor.", "Handle the material trail of the absurdity",
        { addInformation: ["remote_contributor_consent_form"], addMemories: ["caught_consent_form"] }, { clearsWork: 1 }),
      outside: action("remote_work_outside", "Step outside and check whether Tabitha has texted you anything.", "Seek information from a distance",
        { addMemories: ["checked_phone_outside_during_reveal"] }, { clearsWork: 0 })
    },
    workDemand: 2
  },
  {
    id: "choice",
    phase: "choice",
    time: "18:18",
    title: "What does she owe them?",
    projector: {
      head: "COMMUNITY COMPASS",
      body: "FINAL REFLECTION",
      foot: "WHAT WOULD YOU DO DIFFERENTLY?"
    },
    prose: [
      "Gareth declines the failed call and tells the room they will continue without the guest. Tabitha puts her phone face-down on her knee.",
      "Without looking at you she says: ‘If I stand up, don't rescue me unless I ask. If I don't stand up, don't make it noble.’ Then she looks over. ‘Thoughts?’"
    ],
    lines: [
      line("tabitha", "I can ruin his evening. I can leave. Or I can make him explain where that quote came from and then ruin his evening with paperwork.")
    ],
    workshopActions: [
      action("choice_public", "‘If you want the room, I'm with you.’", "Back a public self-authored reveal",
        { setFlags: { chosePublic: true }, setRelation: "partner_in_crime", addMemories: ["backed_public_reveal"] }, { endingPath: "public" }),
      action("choice_leave", "‘You don't owe them the ending. We can go.’", "Prioritise her right not to become content",
        { setFlags: { choseLeave: true }, setRelation: "safe_exit", addMemories: ["chose_to_leave_with_tabitha"] }, { endingPath: "leave" }),
      action("choice_source", "‘Make him source the quote first.’", "Turn institutional procedure back onto the institution",
        { setFlags: { choseSource: true }, setRelation: "strategic", addMemories: ["chose_source_before_reveal"] }, { endingPath: "source" })
    ],
    cues: {
      desk: "The waiting people have formed their own order. Nobody is furious. Everyone is definitely noticing the empty chair behind the desk.",
      workshop: "Tabitha has asked you a real question. This is the moment the room can become hers, or not.",
      foyer: "The CivicWell box, source notes and consent form are all within ten metres of one another.",
      outside: "The rain has eased. Leaving would be easy."
    },
    contextActions: {
      desk: action("choice_work_desk", "Go back to the desk and deal with the queue.", "Let Tabitha decide without you because your own obligation has become concrete",
        { setFlags: { absentForFinale: true }, addMemories: ["missed_finale_for_desk"] }, { clearsWork: 5, endingPath: "missed" }),
      foyer: action("choice_work_foyer", "Collect the source notes and CivicWell pack into one neat pile.", "Build evidence instead of joining the confrontation",
        { setFlags: { absentForFinale: true }, addInformation: ["assembled_civicwell_paper_trail"], addMemories: ["missed_finale_for_paper_trail"] }, { clearsWork: 1, endingPath: "missed" }),
      outside: action("choice_work_outside", "Step outside and let the room happen without you.", "Deliberately refuse the centre of the scene",
        { setFlags: { absentForFinale: true }, addMemories: ["missed_finale_by_choice"] }, { clearsWork: 0, endingPath: "missed" })
    },
    workDemand: 1
  },
  {
    id: "aftermath",
    phase: "future_pull",
    time: "18:24",
    title: "Closing time",
    projector: {
      head: "COMMUNITY COMPASS",
      body: "D. ASK TABITHA WHAT SHE ACTUALLY THINKS.",
      foot: "OR ASK HER OUT. CONTEXT MATTERS."
    },
    prose: [
      "The workshop empties into the foyer at exactly the same time the library's closing announcement begins. Chairs scrape, the printer chirps, somebody asks where the toilets are.",
      "Tabitha waits by the doors instead of disappearing into the crowd."
    ],
    lines: [
      line("tabitha", "Your workplace is exhausting."),
      line("tabitha", "I like it."),
      line("tabitha", "Are you actually finishing, or do I have to become a library emergency?")
    ],
    workshopActions: [
      action("after_walk", "Clock out and walk with her.", "Choose character company as the immediate reward",
        { setFlags: { walkedWithTabitha: true }, setRelation: "future_pull", addMemories: ["walked_out_with_tabitha"] }, { endingPath: "walk" }),
      action("after_finish", "Tell her to give you five minutes to finish the desk properly.", "Keep the obligation without rejecting the future",
        { setFlags: { finishedShiftFirst: true }, setRelation: "reliable_future", addMemories: ["finished_shift_before_leaving"] }, { endingPath: "finish" }),
      action("after_option_d", "‘Option D. You owe me that drink.’", "Cash the running joke into a personal future",
        { setFlags: { optionDPayoff: true }, setRelation: "romantic_future", addMemories: ["used_option_d_at_closing"] }, { endingPath: "option_d" })
    ],
    cues: {
      desk: "The desk still exists. So does closing time.",
      workshop: "The room is empty except for abandoned feedback forms.",
      foyer: "Tabitha is waiting by the doors.",
      outside: "The pavement is wet and the rain has mostly stopped."
    },
    contextActions: {},
    workDemand: 0,
    forcedFoyer: true
  }
];

export const ENDINGS = {
  public: {
    id: "public",
    title: "The room gets the actual Tabitha",
    summary: "You backed her taking the room on her own terms."
  },
  leave: {
    id: "leave",
    title: "No lived experience contributor",
    summary: "You helped her refuse to become the workshop's final piece of content."
  },
  source: {
    id: "source",
    title: "Please provide the source",
    summary: "The evening ends in a very British confrontation with documentation."
  },
  missed: {
    id: "missed",
    title: "You weren't there when it happened",
    summary: "The workshop resolved without you because you spent that beat somewhere else."
  },
  walk: {
    id: "walk",
    title: "Out into the wet",
    summary: "The immediate reward is more time with Tabitha."
  },
  finish: {
    id: "finish",
    title: "Five minutes",
    summary: "You finish what is yours, then leave with her."
  },
  option_d: {
    id: "option_d",
    title: "Option D",
    summary: "The callback becomes a future rather than a completion reward."
  }
};

export const DEBRIEF_QUESTIONS = [
  "At what moment did you first form an intention that the interface had not explicitly given you?",
  "Was there a moment when you cared about being in one place rather than another? What created that?",
  "Did you ever feel you were operating a system instead of inhabiting the situation?",
  "Did any ordinary task become interesting because of what else was happening at the same time?",
  "Did you resent anything you missed, or did missing it make the world feel more alive?",
  "Which action felt most like something only an interactive game could express?",
  "Would this exact sequence have been better if it were simply presented as a visual novel scene? Why?",
  "What would you remove before adding any more mechanics?"
];

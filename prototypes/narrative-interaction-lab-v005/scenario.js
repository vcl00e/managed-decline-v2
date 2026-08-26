export const TITLE = "Radio Free Bellwether";
export const SUBTITLE = "One wet Thursday evening in a community hall that has apparently become vacant while everyone is still inside it.";
export const WORLD = { width: 1120, height: 700 };

export const ROOMS = [
  { id: "foyer", name: "FOYER", x: 80, y: 80, w: 250, h: 190 },
  { id: "hall", name: "MAIN HALL", x: 330, y: 80, w: 530, h: 360 },
  { id: "radio", name: "RADIO ROOM", x: 80, y: 270, w: 250, h: 170 },
  { id: "kitchen", name: "KITCHENETTE", x: 80, y: 440, w: 250, h: 180 },
  { id: "store", name: "STORE", x: 330, y: 440, w: 170, h: 180 },
  { id: "corridor", name: "BACK CORRIDOR", x: 500, y: 440, w: 360, h: 180 },
  { id: "courtyard", name: "COURTYARD", x: 860, y: 80, w: 180, h: 540 }
];

export const SOLIDS = [
  { x: 65, y: 65, w: 810, h: 15 }, { x: 65, y: 620, w: 810, h: 15 },
  { x: 65, y: 65, w: 15, h: 570 }, { x: 860, y: 65, w: 15, h: 125 },
  { x: 860, y: 250, w: 15, h: 385 },
  { x: 80, y: 255, w: 85, h: 15 }, { x: 225, y: 255, w: 105, h: 15 },
  { x: 80, y: 425, w: 90, h: 15 }, { x: 225, y: 425, w: 105, h: 15 },
  { x: 315, y: 80, w: 15, h: 80 }, { x: 315, y: 220, w: 15, h: 120 }, { x: 315, y: 390, w: 15, h: 35 },
  { x: 315, y: 440, w: 15, h: 75 }, { x: 315, y: 575, w: 15, h: 45 },
  { x: 330, y: 425, w: 85, h: 15 }, { x: 475, y: 425, w: 160, h: 15 }, { x: 700, y: 425, w: 160, h: 15 },
  { x: 485, y: 440, w: 15, h: 80 }, { x: 485, y: 575, w: 15, h: 45 },
  { x: 875, y: 65, w: 180, h: 15 }, { x: 875, y: 620, w: 180, h: 15 }, { x: 1040, y: 65, w: 15, h: 570 },
  { x: 380, y: 160, w: 90, h: 35 }, { x: 560, y: 160, w: 90, h: 35 }, { x: 700, y: 300, w: 85, h: 35 },
  { x: 120, y: 315, w: 120, h: 38 }, { x: 105, y: 500, w: 130, h: 35 }, { x: 365, y: 500, w: 90, h: 45 }
];

export const PLAYER_START = { x: 205, y: 385 };

export const NPCS = {
  maya: { name: "Maya Nair", initials: "MN", x: 210, y: 330, role: "Radio Bellwether host" },
  ben: { name: "Ben Walsh", initials: "BW", x: 225, y: 160, role: "caretaker" },
  june: { name: "June Parry", initials: "JP", x: 185, y: 535, role: "Saturday line-dance organiser" },
  rowan: { name: "Rowan Vale", initials: "RV", x: 980, y: 155, role: "LocalityWorks asset partner", hidden: true },
  priya: { name: "Priya Shah", initials: "PS", x: 990, y: 205, role: "prospective workspace tenant", hidden: true }
};

export const OBJECTS = {
  reel: { id: "reel", label: "extension reel", x: 410, y: 555, radius: 34 },
  mixer: { id: "mixer", label: "radio mixer", x: 190, y: 334, radius: 42 },
  pack: { id: "pack", label: "LocalityWorks briefing pack", x: 265, y: 205, radius: 34, hidden: true },
  sideDoor: { id: "sideDoor", label: "courtyard side door", x: 866, y: 220, radius: 42 },
  exit: { id: "exit", label: "front doors", x: 80, y: 140, radius: 48 }
};

export const TIMED_EVENTS = [
  {
    id: "rowan_arrives", at: 32, source: { x: 135, y: 150 }, hear: 220,
    lines: [
      ["rowan", "Evening. Rowan Vale, LocalityWorks. I'm here for the community asset familiarisation."],
      ["ben", "Right. I was told normal bookings were unaffected."],
      ["rowan", "Absolutely. Nobody has used the word closure."]
    ]
  },
  {
    id: "occupancy_sheet", at: 58, source: { x: 235, y: 165 }, hear: 210,
    learn: "occupancy_sheet_says_empty",
    lines: [
      ["rowan", "The occupancy sheet has the building down as operationally vacant after seven."],
      ["ben", "There are forty-two people due here at seven."],
      ["rowan", "Then the sheet is admirably forward-looking."]
    ]
  },
  {
    id: "june_booking", at: 96, source: { x: 185, y: 535 }, hear: 170,
    lines: [
      ["june", "My lot are in Saturday. Unless line dancing has been reclassified as non-operational."],
      ["ben", "Keep your booking email, June."],
      ["june", "I've printed it. Technology can't take that away from me."]
    ]
  },
  {
    id: "courtyard_call", at: 138, source: { x: 930, y: 330 }, hear: 185,
    learn: "rowan_call_confirms_users_in_situ",
    lines: [
      ["rowan", "No, I'm physically looking at the users in situ."],
      ["rowan", "Yes, I understand the target is vacant possession Monday. I'm saying they haven't achieved the vacant part."]
    ]
  },
  {
    id: "pack_dropped", at: 166, source: { x: 250, y: 205 }, hear: 155,
    lines: [["rowan", "Oh, for God's sake."]]
  },
  {
    id: "mic_test", at: 188, source: { x: 430, y: 245 }, hear: 235,
    lines: [
      ["maya", "Radio Bellwether, technical rehearsal: if you can hear me, the council has not yet successfully deactivated electricity."],
      ["maya", "If you cannot hear me, this is an immersive funding demonstration."]
    ]
  },
  {
    id: "priya_arrives", at: 222, source: { x: 145, y: 150 }, hear: 230,
    lines: [
      ["priya", "Sorry—this is the flexible workspace viewing?"],
      ["rowan", "Yes. The building is in a transitional occupancy state."],
      ["maya", "We're people now, but give it five minutes."]
    ]
  },
  {
    id: "clash", at: 258, source: { x: 520, y: 250 }, hear: 9999,
    lines: [
      ["rowan", "Could we have the main hall clear for fifteen minutes? The viewing materials are commercially sensitive."],
      ["maya", "We're live in two."],
      ["ben", "And they're booked until nine."],
      ["priya", "I was told this building wasn't in use."]
    ]
  }
];

export const OUTCOME_COPY = {
  quiet_broadcast: {
    title: "The show goes on next door",
    body: "Maya keeps Radio Bellwether live from the little radio room while the viewing proceeds in a hall everyone has agreed not to describe as occupied. The compromise works, which somehow makes the paperwork stranger."
  },
  formal_pause: {
    title: "Nobody can find the authority",
    body: "Ben refuses to clear a valid booking after you show him the vacant-possession assumption. The viewing stalls while three organisations try to discover who, exactly, authorised the building to be empty."
  },
  live_interview: {
    title: "Community asset familiarisation, live",
    body: "Maya puts Rowan on air. He answers more candidly than anyone expected: LocalityWorks was genuinely sent a sheet saying the building would be vacant. The clip ends with Priya asking who had spoken to the people currently sitting in it."
  },
  side_door: {
    title: "The vacant building fills up",
    body: "June's side-door key defeats the temporary viewing closure. Radio regulars, line dancers and two people who thought there was a Pilates class drift into the hall. Priya quietly asks Rowan to reschedule the viewing somewhere less visibly inhabited."
  },
  default_shuffle: {
    title: "Fifteen minutes of managed coexistence",
    body: "Nobody wins the argument. Ben gives the viewing one end of the hall, Maya broadcasts from the other, and everyone spends fifteen minutes pretending the arrangement is intentional."
  },
  early_exit: {
    title: "You leave them to it",
    body: "The evening continues without you. Later, your phone contains enough messages to establish that the hall was simultaneously viewed as vacant and used for a live broadcast."
  }
};

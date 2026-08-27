export const WORLD = {
  width: 1160,
  height: 720,
  rooms: [
    { id: 'living', name: 'Living room', x: 30, y: 250, w: 580, h: 430 },
    { id: 'hall', name: 'Hall', x: 30, y: 30, w: 580, h: 190 },
    { id: 'kitchen', name: 'Kitchen', x: 650, y: 30, w: 480, h: 300 },
    { id: 'bedroom', name: "Tabitha's room", x: 650, y: 370, w: 480, h: 310 },
  ],
  obstacles: [
    { x: 255, y: 395, w: 185, h: 92, label: 'sofa' },
    { x: 75, y: 330, w: 90, h: 150, label: 'boxes' },
    { x: 850, y: 90, w: 190, h: 78, label: 'counter' },
    { x: 720, y: 520, w: 165, h: 88, label: 'bed' },
    { x: 935, y: 480, w: 110, h: 70, label: 'boxes' },
  ],
};

export const CHARACTERS = {
  tabitha: {
    id: 'tabitha', name: 'Tabitha', short: 'T', x: 840, y: 455,
    description: 'half-packed, determined not to have one more meaningful housing experience',
  },
  alex: {
    id: 'alex', name: 'Alex', short: 'A', x: 790, y: 215,
    description: 'flatmate, trying to keep the tenancy from becoming financially impossible',
  },
  priya: {
    id: 'priya', name: 'Priya', short: 'P', x: 72, y: 90,
    description: 'prospective replacement tenant, early because the bus was improbably on time',
  },
  graham: {
    id: 'graham', name: 'Graham (agent)', short: 'G', x: -200, y: -200,
    description: 'letting agent, present mainly through delayed messages and institutional wording',
  },
};

export const SCHEDULE = [
  { t: 6, id: 'tabitha_call', once: true },
  { t: 28, id: 'priya_knock', once: true },
  { t: 40, id: 'alex_opens_front', once: true },
  { t: 53, id: 'priya_tour', once: true },
  { t: 67, id: 'tabitha_to_room', once: true },
  { t: 72, id: 'priya_room_question', once: true },
  { t: 82, id: 'alex_opens_bedroom', once: true },
  { t: 94, id: 'agent_delay', once: true },
  { t: 103, id: 'viewing_convergence', once: true },
  { t: 132, id: 'tabitha_departure', once: true },
];

export const VN_SCENES = {
  tabitha: {
    title: 'Ten minutes',
    speaker: 'Tabitha',
    intro: [
      ['Tabitha', 'I have nine minutes, one tote bag that has achieved structural independence, and apparently a housing handover.'],
      ['Tabitha', "Alex needs somebody to take the room. I need my deposit. Priya needs somewhere that isn't £1,400 with a decorative fridge."],
      ['Tabitha', "There is damp behind the wardrobe. The agent knows there was a report. I don't know what he told Priya."],
      ['Tabitha', "I am not asking you to lie. I am asking — selfishly — for tonight not to become another little tribunal where I have to narrate my own mould."],
    ],
    choices: [
      { id: 'tabitha_quiet', text: "I'll keep it quiet unless I really can't." },
      { id: 'tabitha_priya', text: 'Priya deserves to know what she is moving into.' },
      { id: 'tabitha_here_for_you', text: "I'm here for you. The flat can survive without appointing me." },
      { id: 'tabitha_no_promise', text: "Don't make me promise before I know what happens." },
    ],
    responses: {
      tabitha_quiet: [
        ['Tabitha', 'That is an extremely qualified promise. Good. Those are the only safe kind.'],
        ['Tabitha', 'Just… if it turns ugly, remember I have a train and a nervous system.'],
      ],
      tabitha_priya: [
        ['Tabitha', 'Yes. I know. That is the irritatingly correct sentence.'],
        ['Tabitha', "I just don't want 'deserves to know' to mean I get volunteered as tonight's witness for the prosecution."],
      ],
      tabitha_here_for_you: [
        ['Tabitha', 'Dangerous thing to say to somebody holding three bags and no reliable taxi money.'],
        ['Tabitha', 'Fine. Then stay near me. I would like one person here whose role is not “make the tenancy continue.”'],
      ],
      tabitha_no_promise: [
        ['Tabitha', 'Fair. Irritating, but fair.'],
        ['Tabitha', 'You may be the only adult in Britain currently refusing terms and conditions before the service is supplied.'],
      ],
    },
  },
  viewing: { title: 'The room' },
  departure: { title: 'The train' },
};

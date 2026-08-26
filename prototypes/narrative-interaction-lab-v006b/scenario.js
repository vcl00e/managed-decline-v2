export const WORLD = {
  width: 980,
  height: 640,
  rooms: [
    { id: 'hall', name: 'Entrance hall', x: 30, y: 30, w: 500, h: 180 },
    { id: 'living', name: 'Living room / kitchen', x: 30, y: 250, w: 500, h: 350 },
    { id: 'bedroom', name: "Tabitha's room", x: 570, y: 250, w: 380, h: 350 },
  ],
  obstacles: [
    { x: 115, y: 385, w: 165, h: 82, label: 'sofa' },
    { x: 350, y: 315, w: 120, h: 60, label: 'table' },
    { x: 675, y: 455, w: 150, h: 82, label: 'bed' },
    { x: 845, y: 420, w: 70, h: 95, label: 'boxes' },
  ],
  points: {
    frontDoor: { x: 48, y: 102 },
    bedroomThreshold: { x: 550, y: 430 },
    listeningSpot: { x: 325, y: 230 },
    damp: { x: 910, y: 350 },
  },
};

export const CHARACTERS = {
  tabitha: {
    id: 'tabitha', name: 'Tabitha', short: 'T', x: 735, y: 420,
    description: 'half-packed, determined not to have one more meaningful housing experience',
  },
  alex: {
    id: 'alex', name: 'Alex', short: 'A', x: 355, y: 330,
    description: 'flatmate, trying to keep the tenancy from becoming financially impossible',
  },
  priya: {
    id: 'priya', name: 'Priya', short: 'P', x: 75, y: 100,
    description: 'prospective replacement tenant, early because the bus was improbably on time',
  },
};

export const VN_SCENES = {
  tabitha: {
    title: 'Before the viewing',
    speaker: 'Tabitha',
    intro: [
      ['Tabitha', 'You made it. You are still walking me to the station, yes? I need one person tonight whose job is not “make the tenancy continue”.'],
      ['Tabitha', 'Alex needs somebody to take the room. I need my deposit. Priya needs somewhere that is not £1,400 with a decorative fridge.'],
      ['Tabitha', 'There is damp behind the wardrobe. The agent knows there was a report. I do not know what he told Priya.'],
      ['Tabitha', 'I am not asking you to lie. I am asking — selfishly — for my final ten minutes here not to become another tribunal where I narrate my own mould.'],
    ],
    choices: [
      { id: 'tabitha_quiet', text: "I'll keep it quiet unless I really can't." },
      { id: 'tabitha_priya', text: 'Priya deserves to know what she is moving into.' },
      { id: 'tabitha_here_for_you', text: "I'm here to walk you to the station, not run the viewing." },
      { id: 'tabitha_no_promise', text: "Don't make me promise how I'll handle it yet." },
    ],
    responses: {
      tabitha_quiet: [
        ['Tabitha', 'That is an extremely qualified promise. Good. Those are the only safe kind.'],
        ['Tabitha', 'If it turns ugly, remember I have a train and a nervous system.'],
      ],
      tabitha_priya: [
        ['Tabitha', 'Yes. I know. That is the irritatingly correct sentence.'],
        ['Tabitha', 'I just do not want “deserves to know” to mean I get volunteered as tonight’s witness for the prosecution.'],
      ],
      tabitha_here_for_you: [
        ['Tabitha', 'Excellent. A sharply bounded service agreement.'],
        ['Tabitha', 'Stay near me if you want. Alex can conduct his own property programme.'],
      ],
      tabitha_no_promise: [
        ['Tabitha', 'Fair. Irritating, but fair.'],
        ['Tabitha', 'You may be the only adult in Britain refusing terms and conditions before the service is supplied.'],
      ],
    },
  },
};

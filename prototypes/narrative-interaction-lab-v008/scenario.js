import {
  createBaseState,
  near,
} from '../narrative-interaction-harness-v002/src/scenario-contract.js';

export const WORLD = Object.freeze({
  width: 900,
  height: 520,
  spawn: Object.freeze({ x: 130, y: 390 }),
  kiosk: Object.freeze({ x: 394, y: 278 }),
  printer: Object.freeze({ x: 622, y: 292 }),
  noticeboard: Object.freeze({ x: 794, y: 210 }),
  bench: Object.freeze({ x: 446, y: 418 }),
  exit: Object.freeze({ x: 42, y: 472 }),
});

const NOTE_TEXT = Object.freeze({
  ask_reading: 'ASK HER WHAT SHE IS READING',
  biscuits: 'BUY BISCUITS BEFORE HOUR SIX',
  susceptible: 'DO NOT WHISPER “MORE SUSCEPTIBLE”',
  tabitha: 'STOP MAKING TRAINING GAMES ABOUT PEOPLE WHO CAN READ',
});

function moveTabitha(state, point, mood = null) {
  state.actors.tabitha.target = { ...point };
  if (mood) state.actors.tabitha.mood = mood;
}

function finishOuttake(state, reaction, firstLine) {
  state.facts.outtakeReaction = reaction;
  state.stage = 'reach_printer';
  moveTabitha(state, WORLD.printer, 'following the printer noise');
  return {
    kind: 'situation',
    output: 'Tabitha opens FACILITATOR TOOLS. A printer behind you wakes with a mechanical cough.',
    response: [
      { speaker: 'Tabitha', text: firstLine },
      { speaker: 'Tabitha', text: 'There was a facilitator tab. I pressed it.' },
    ],
  };
}

function finishNote(state, note, response) {
  state.facts.note = note;
  state.facts.sheetText = NOTE_TEXT[note];
  state.stage = 'place_sheet';
  moveTabitha(state, WORLD.bench, 'waiting to see where the sheet goes');
  return {
    kind: 'physical',
    output: `The facilitator notes now read: ${NOTE_TEXT[note]}.`,
    response,
  };
}

function endingCallback(state, destination) {
  if (destination === 'noticeboard' && state.facts.firstAnswer === 'tell_staff') {
    return 'Tabitha looks at the staff noticeboard. “Good. Something for the safeguarding lead.”';
  }
  if (destination === 'printer' && state.facts.firstAnswer === 'tabitha_mouse') {
    return 'Tabitha slides it under the blank paper. “You put me in charge of the mouse. This is your fault.”';
  }
  if (destination === 'tabitha' && state.facts.outtakeReaction === 'replay') {
    return 'Tabitha folds the sheet twice. “You replayed it. I keep the evidence.”';
  }
  if (destination === 'exit' && state.facts.note === 'biscuits') {
    return 'Tabitha follows you out. “Trusted peer and biscuit advocate. Strong title.”';
  }
  return {
    noticeboard: 'Tabitha reads it on the board. “Mandatory learning.”',
    printer: 'Tabitha watches it disappear into the tray. “Back into the machine. Cruel.”',
    tabitha: 'Tabitha folds it into her pocket. “Evidence of approved social activity.”',
    exit: 'Tabitha comes with you. “Trusted peer of record. Terrible title.”',
  }[destination];
}

export const v008Scenario = {
  id: 'narrative-interaction-lab-v008',
  title: 'The Old Build',
  subtitle: 'A short one-to-one interaction test with Tabitha Mercer.',
  browserTitle: 'Managed Decline v008 — The Old Build',
  startTime: '20:01',
  initialStage: 'kiosk_available',
  world: WORLD,
  player: { label: 'YOU', color: '#292a26', radius: 15, speed: 190 },
  actors: {
    tabitha: {
      id: 'tabitha',
      name: 'Tabitha Mercer',
      label: 'TAB',
      color: '#c26186',
      radius: 18,
      speed: 150,
      start: { x: 160, y: 406 },
      initialMood: 'heading for the old kiosk',
    },
  },
  palette: { backgroundFrom: '#aeb9ae', backgroundTo: '#d7c7ad' },
  startingNotice: 'An old council kiosk wakes. Tabitha peels away from the entrance to look at it.',
  auditOptions: { maxActions: 18 },

  createState(runId) {
    const state = createBaseState(v008Scenario, runId, {
      facts: {
        tabithaInitiated: true,
        kioskJoined: false,
        firstAnswer: null,
        outtakeReaction: null,
        printoutTaken: false,
        note: null,
        sheetText: null,
        sheetHeld: false,
        destination: null,
      },
    });
    moveTabitha(state, WORLD.kiosk, 'reading the old screen');
    return state;
  },

  meaningfulState(state) {
    return {
      stage: state.stage,
      facts: state.facts,
      tabithaTarget: state.actors.tabitha.target,
      ending: state.ending,
    };
  },

  actions: {
    join_kiosk: {
      id: 'join_kiosk',
      label: 'Join Tabitha at the old kiosk',
      repeatable: false,
      durationMinutes: 1,
      priority: 10,
      available(state) {
        return state.stage === 'kiosk_available' && near(state.player, WORLD.kiosk, 120);
      },
      apply(state) {
        state.facts.kioskJoined = true;
        state.stage = 'kiosk_question';
        state.mode = 'vn';
        state.currentVN = 'question';
        return {
          kind: 'situation',
          output: 'The archived build recognises a mouse movement and resumes where somebody left it.',
        };
      },
    },

    resume_kiosk: {
      id: 'resume_kiosk',
      label: 'Continue at the kiosk',
      repeatable: true,
      durationMinutes: 0,
      priority: 10,
      available(state) {
        return state.stage === 'kiosk_paused' && near(state.player, WORLD.kiosk, 130);
      },
      apply(state) {
        state.stage = state.memory.pausedVN === 'outtake' ? 'kiosk_outtake' : 'kiosk_question';
        state.mode = 'vn';
        state.currentVN = state.memory.pausedVN ?? 'question';
        state.memory.pausedVN = null;
        return { kind: 'situation', output: 'The old build is still waiting on the same screen.' };
      },
    },

    take_printout: {
      id: 'take_printout',
      label: 'Take the sheet from the printer with Tabitha',
      repeatable: false,
      durationMinutes: 1,
      priority: 10,
      available(state) {
        return state.stage === 'reach_printer' && near(state.player, WORLD.printer, 125);
      },
      apply(state) {
        state.facts.printoutTaken = true;
        state.facts.sheetHeld = true;
        state.stage = 'plan';
        state.mode = 'vn';
        state.currentVN = 'plan';
        return {
          kind: 'physical',
          output: 'You catch the warm sheet before it folds itself into the output tray.',
        };
      },
    },

    resume_plan: {
      id: 'resume_plan',
      label: 'Finish the facilitator notes',
      repeatable: true,
      durationMinutes: 0,
      priority: 10,
      available(state) {
        return state.stage === 'plan_paused' && near(state.player, WORLD.printer, 135);
      },
      apply(state) {
        state.stage = 'plan';
        state.mode = 'vn';
        state.currentVN = state.memory.pausedVN ?? 'plan';
        state.memory.pausedVN = null;
        return { kind: 'situation', output: 'The pen and the unfinished notes are still there.' };
      },
    },

    pin_sheet: {
      id: 'pin_sheet',
      label: 'Pin the amended plan to the staff noticeboard',
      repeatable: false,
      durationMinutes: 2,
      priority: 20,
      available(state) {
        return state.stage === 'place_sheet' && state.facts.sheetHeld
          && near(state.player, WORLD.noticeboard, 120);
      },
      apply(state) {
        state.facts.sheetHeld = false;
        state.facts.destination = 'noticeboard';
        state.stage = 'complete';
        state.ended = true;
        state.ending = 'noticeboard';
        return { kind: 'ending', output: endingCallback(state, 'noticeboard') };
      },
    },

    return_sheet: {
      id: 'return_sheet',
      label: 'Put the amended plan back in the printer tray',
      repeatable: false,
      durationMinutes: 1,
      priority: 20,
      available(state) {
        return state.stage === 'place_sheet' && state.facts.sheetHeld
          && near(state.player, WORLD.printer, 115);
      },
      apply(state) {
        state.facts.sheetHeld = false;
        state.facts.destination = 'printer';
        state.stage = 'complete';
        state.ended = true;
        state.ending = 'printer';
        return { kind: 'ending', output: endingCallback(state, 'printer') };
      },
    },

    give_sheet: {
      id: 'give_sheet',
      label: 'Give the amended plan to Tabitha',
      repeatable: false,
      durationMinutes: 1,
      priority: 20,
      available(state) {
        return state.stage === 'place_sheet' && state.facts.sheetHeld
          && near(state.player, state.actors.tabitha, 105);
      },
      apply(state) {
        state.facts.sheetHeld = false;
        state.facts.destination = 'tabitha';
        state.stage = 'complete';
        state.ended = true;
        state.ending = 'tabitha';
        return { kind: 'ending', output: endingCallback(state, 'tabitha') };
      },
    },

    take_sheet_out: {
      id: 'take_sheet_out',
      label: 'Take the amended plan out of the building',
      repeatable: false,
      durationMinutes: 2,
      priority: 20,
      available(state) {
        return state.stage === 'place_sheet' && state.facts.sheetHeld
          && near(state.player, WORLD.exit, 105);
      },
      apply(state) {
        state.facts.destination = 'exit';
        state.stage = 'complete';
        state.ended = true;
        state.ending = 'exit';
        moveTabitha(state, WORLD.exit, 'leaving with the player');
        return { kind: 'ending', output: endingCallback(state, 'exit') };
      },
    },

    leave_early: {
      id: 'leave_early',
      label: 'Leave the kiosk and go',
      repeatable: false,
      durationMinutes: 1,
      priority: -10,
      available(state) {
        return !state.facts.sheetHeld && !state.ended && state.mode === 'world'
          && near(state.player, WORLD.exit, 95);
      },
      apply(state) {
        state.stage = 'complete';
        state.ended = true;
        state.ending = 'left_early';
        return {
          kind: 'ending',
          output: state.facts.kioskJoined
            ? 'You leave the old build running. Tabitha lets it time out behind you.'
            : 'You leave before the kiosk becomes your evening.',
        };
      },
    },
  },

  vnGraph: {
    question: {
      id: 'question',
      title: 'Community Compass — archived demo',
      turns: [
        { speaker: 'Tabitha', text: 'No.' },
        { speaker: 'Tabitha', text: 'They kept the demo.' },
        { speaker: 'Kiosk', text: 'YOUR FRIEND HAS STARTED READING LOCAL HISTORY. WHAT SHOULD YOU DO?' },
      ],
      prompt: 'Choose an answer.',
      choices: [
        {
          id: 'ask_reading',
          label: 'Ask what she’s reading.',
          apply(state) {
            state.facts.firstAnswer = 'ask_reading';
            state.stage = 'kiosk_outtake';
            return {
              nextNode: 'outtake',
              response: [{ speaker: 'Tabitha', text: 'A rare point for speaking to the person.' }],
            };
          },
        },
        {
          id: 'tell_staff',
          label: 'Tell a member of staff.',
          apply(state) {
            state.facts.firstAnswer = 'tell_staff';
            state.stage = 'kiosk_outtake';
            return {
              nextNode: 'outtake',
              response: [{ speaker: 'Tabitha', text: 'Congratulations. You work here now.' }],
            };
          },
        },
        {
          id: 'move_fiction',
          label: 'Move her to Fiction.',
          apply(state) {
            state.facts.firstAnswer = 'move_fiction';
            state.stage = 'kiosk_outtake';
            return {
              nextNode: 'outtake',
              response: [{ speaker: 'Tabitha', text: 'Austen failed as intervention.' }],
            };
          },
        },
        {
          id: 'tabitha_mouse',
          label: '[Give Tabitha the mouse.]',
          apply(state) {
            state.facts.firstAnswer = 'tabitha_mouse';
            state.stage = 'kiosk_outtake';
            return {
              nextNode: 'outtake',
              response: [
                { speaker: 'Tabitha', text: 'I chose “escalate concern”.' },
                { speaker: 'Tabitha', text: 'It congratulated me. Disgusting.' },
              ],
            };
          },
        },
      ],
    },

    outtake: {
      id: 'outtake',
      title: 'Unused recording',
      turns: [
        { speaker: 'Recorded Tabitha', text: 'I just think people should be allowed to ask questions.' },
        { speaker: 'Narrator', text: 'Statements like this may sound reasonable.' },
        { speaker: 'Tabitha', text: 'They kept that take.' },
      ],
      prompt: 'What do you do?',
      choices: [
        {
          id: 'replay',
          label: '[Replay it.]',
          apply(state) {
            return finishOuttake(state, 'replay', 'No.');
          },
        },
        {
          id: 'furious',
          label: 'You look furious.',
          apply(state) {
            return finishOuttake(state, 'furious', 'They had hidden the biscuits. It was hour six.');
          },
        },
        {
          id: 'nearly_laughed',
          label: 'You nearly laughed.',
          apply(state) {
            return finishOuttake(
              state,
              'nearly_laughed',
              'The director whispered “more susceptible” like it was a mood.',
            );
          },
        },
        {
          id: 'skip',
          label: '[Skip it.]',
          apply(state) {
            return finishOuttake(state, 'skip', 'Thank you.');
          },
        },
      ],
    },

    plan: {
      id: 'plan',
      title: 'Personal resilience plan',
      turns: [
        {
          speaker: 'Printer',
          text: 'ATTEND AN APPROVED SOCIAL ACTIVITY WITH A TRUSTED PEER.',
        },
        { speaker: 'Tabitha', text: 'We are literally at the approved social activity.' },
        {
          speaker: 'Tabitha',
          text(state) {
            return {
              tell_staff: 'Apparently my trusted peer is also the member of staff.',
              tabitha_mouse: 'You put me in charge of the mouse. That makes you the trusted peer.',
              move_fiction: 'Fiction, trusted peer, approved activity. Busy form.',
              ask_reading: 'The bottom half says facilitator notes.',
            }[state.facts.firstAnswer] ?? 'The bottom half says facilitator notes.';
          },
        },
      ],
      prompt: 'What goes in the facilitator notes?',
      choices: [
        {
          id: 'note_ask_reading',
          label: 'ASK HER WHAT SHE IS READING.',
          apply(state) {
            return finishNote(state, 'ask_reading', [
              { speaker: 'Tabitha', text: 'Look at that. Direct engagement survives contact with stationery.' },
            ]);
          },
        },
        {
          id: 'note_biscuits',
          label: 'BUY BISCUITS BEFORE HOUR SIX.',
          apply(state) {
            return finishNote(state, 'biscuits', [
              { speaker: 'Tabitha', text: 'That would have changed the entire shoot.' },
            ]);
          },
        },
        {
          id: 'note_susceptible',
          label: 'DO NOT WHISPER “MORE SUSCEPTIBLE”.',
          apply(state) {
            return finishNote(state, 'susceptible', [
              { speaker: 'Tabitha', text: 'Finally, a transferable learning outcome.' },
            ]);
          },
        },
        {
          id: 'note_tabitha',
          label: '[Hand Tabitha the pen.]',
          apply(state) {
            return finishNote(state, 'tabitha', [
              { speaker: 'Tabitha', text: 'STOP MAKING TRAINING GAMES ABOUT PEOPLE WHO CAN READ.' },
              { speaker: 'Tabitha', text: 'Concise.' },
            ]);
          },
        },
      ],
    },
  },

  onCancelVN(state, nodeId) {
    state.stage = nodeId === 'plan' ? 'plan_paused' : 'kiosk_paused';
    return {
      kind: 'situation',
      output: nodeId === 'plan'
        ? 'You lower the sheet. The unfinished notes remain blank.'
        : 'You step back from the kiosk. The archived screen keeps waiting.',
    };
  },

  render(_context, state, h) {
    h.rect(28, 62, 840, 394, '#e9e0cf', '#81786b', 3);
    h.rect(58, 390, 122, 64, '#c8b89f');
    h.text('EXIT', WORLD.exit.x + 26, WORLD.exit.y - 35, { font: 'bold 11px system-ui' });

    h.rect(WORLD.kiosk.x - 58, WORLD.kiosk.y - 92, 116, 146, '#555a58', '#383b39', 2);
    h.rect(WORLD.kiosk.x - 46, WORLD.kiosk.y - 78, 92, 78, '#a9c7b4');
    h.text(
      state.facts.kioskJoined ? 'COMMUNITY COMPASS' : 'ARCHIVED BUILD',
      WORLD.kiosk.x,
      WORLD.kiosk.y - 42,
      { align: 'center', font: 'bold 10px system-ui' },
    );

    h.rect(WORLD.printer.x - 48, WORLD.printer.y - 52, 96, 86, '#7a766e', '#514f49', 2);
    h.rect(WORLD.printer.x - 36, WORLD.printer.y - 34, 72, 18, '#d7d4cb');
    h.text('PRINTER', WORLD.printer.x, WORLD.printer.y + 16, {
      align: 'center', color: '#f4efe5', font: '10px system-ui',
    });

    h.rect(WORLD.noticeboard.x - 62, WORLD.noticeboard.y - 66, 124, 132, '#a77f55', '#6b5038', 3);
    h.text('STAFF', WORLD.noticeboard.x, WORLD.noticeboard.y - 42, {
      align: 'center', color: '#fff8e8', font: 'bold 10px system-ui',
    });
    h.text('NOTICEBOARD', WORLD.noticeboard.x, WORLD.noticeboard.y - 27, {
      align: 'center', color: '#fff8e8', font: '10px system-ui',
    });
    if (state.facts.destination === 'noticeboard') {
      h.rect(WORLD.noticeboard.x - 38, WORLD.noticeboard.y - 8, 76, 54, '#f4eedf');
      h.text('PLAN', WORLD.noticeboard.x, WORLD.noticeboard.y + 22, {
        align: 'center', font: 'bold 10px system-ui',
      });
    }

    h.rect(WORLD.bench.x - 82, WORLD.bench.y - 18, 164, 28, '#77624e');
    h.rect(WORLD.bench.x - 72, WORLD.bench.y + 10, 12, 28, '#5f5042');
    h.rect(WORLD.bench.x + 60, WORLD.bench.y + 10, 12, 28, '#5f5042');

    if (state.facts.sheetHeld) {
      h.rect(state.player.x + 12, state.player.y - 22, 18, 25, '#fff9e9', '#8a8174', 1);
    }

    h.text('old kiosk', WORLD.kiosk.x, WORLD.kiosk.y + 76, { align: 'center', color: '#5a564e' });
    h.text('printer', WORLD.printer.x, WORLD.printer.y + 58, { align: 'center', color: '#5a564e' });
  },

  stageLabel(state) {
    return {
      kiosk_available: 'the kiosk wakes',
      kiosk_question: 'archived question',
      kiosk_outtake: 'archived outtake',
      kiosk_paused: 'kiosk paused',
      reach_printer: 'the printer starts',
      plan: 'printed plan',
      plan_paused: 'notes paused',
      place_sheet: 'choose where it remains',
      complete: 'complete',
    }[state.stage] ?? state.stage.replaceAll('_', ' ');
  },

  endingSummary(state) {
    return {
      noticeboard: `The amended plan was pinned to the staff noticeboard: ${state.facts.sheetText}.`,
      printer: `The amended plan was returned to the printer tray: ${state.facts.sheetText}.`,
      tabitha: `Tabitha kept the amended plan: ${state.facts.sheetText}.`,
      exit: `The player took the amended plan out of the building: ${state.facts.sheetText}.`,
      left_early: 'The player left the old build behind.',
    }[state.ending] ?? 'The interaction ended.';
  },
};

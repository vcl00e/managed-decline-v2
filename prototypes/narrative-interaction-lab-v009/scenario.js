import { createBaseState, near } from '../narrative-interaction-harness-v002/src/scenario-contract.js';

export const WORLD = Object.freeze({
  width: 960,
  height: 540,
  spawn: Object.freeze({ x: 330, y: 405 }),
  table: Object.freeze({ x: 470, y: 372 }),
  exit: Object.freeze({ x: 72, y: 465 }),
  margin: 26,
});

const PLAYER_PHOTOS = Object.freeze({
  still: 'You, caught completely unprepared.',
  official: 'You, looking alarmingly electable.',
  face: 'You, ruining the photo on purpose.',
});

const TABITHA_PHOTOS = Object.freeze({
  candid: 'Tabitha, halfway through objecting.',
  exit_sign: 'Tabitha under the green EXIT sign.',
  respectable: 'Tabitha, aggressively respectable.',
});

function firstPlayerPhoto(state, style, response) {
  state.facts.order = 'tabitha_first';
  state.facts.playerPose = style;
  state.facts.playerPhoto = PLAYER_PHOTOS[style];
  state.facts.firstSubject = 'player';
  state.facts.shotsRemaining = 1;
  state.stage = 'first_print';
  return {
    kind: 'physical',
    output: `The first print slides out: ${state.facts.playerPhoto}`,
    response,
  };
}

function firstTabithaPhoto(state, style, response) {
  state.facts.order = 'player_first';
  state.facts.tabithaPose = style;
  state.facts.tabithaPhoto = TABITHA_PHOTOS[style];
  state.facts.playerDirectedTabitha = true;
  state.facts.firstSubject = 'tabitha';
  state.facts.shotsRemaining = 1;
  state.stage = 'first_print';
  return {
    kind: 'physical',
    output: `The first print slides out: ${state.facts.tabithaPhoto}`,
    response,
  };
}

function secondPlayerPhoto(state, style, response) {
  state.facts.playerPose = style;
  state.facts.playerPhoto = PLAYER_PHOTOS[style];
  state.facts.shotsRemaining = 0;
  state.stage = 'two_prints';
  return {
    kind: 'physical',
    output: `The second print slides out: ${state.facts.playerPhoto}`,
    response,
  };
}

function secondTabithaPhoto(state, style, response) {
  state.facts.tabithaPose = style;
  state.facts.tabithaPhoto = TABITHA_PHOTOS[style];
  state.facts.playerDirectedTabitha = true;
  state.facts.shotsRemaining = 0;
  state.stage = 'two_prints';
  return {
    kind: 'physical',
    output: `The second print slides out: ${state.facts.tabithaPhoto}`,
    response,
  };
}

function tradeLine(state) {
  if (state.facts.playerPose === 'official') return 'Tabitha pockets your photo. “Campaign material.”';
  if (state.facts.playerPose === 'face') return 'Tabitha pockets your photo. “Blackmail.”';
  if (state.facts.tabithaPose === 'candid') return 'Tabitha passes you her candid print. “You’re not showing anyone that.”';
  return 'Tabitha trades you her print for yours. “Fair.”';
}

export const v009Scenario = {
  id: 'narrative-interaction-lab-v009',
  title: 'Two Pictures',
  subtitle: 'A reciprocal one-to-one interaction test with Tabitha Mercer.',
  browserTitle: 'Managed Decline v009 — Two Pictures',
  startTime: '20:11',
  initialStage: 'camera_available',
  world: WORLD,
  player: { label: 'YOU', color: '#292a26', radius: 15, speed: 190 },
  actors: {
    tabitha: {
      id: 'tabitha',
      name: 'Tabitha Mercer',
      label: 'TAB',
      color: '#7b4f7e',
      radius: 18,
      speed: 0,
      start: { x: 385, y: 397 },
      initialMood: 'holding an instant camera with two shots left',
    },
  },
  palette: { backgroundFrom: '#777a72', backgroundTo: '#b9ae96' },
  startingFeedback: 'Tabitha has found an instant camera on the table. The counter says 2.',
  auditOptions: { maxActions: 12 },

  createState(runId) {
    return createBaseState(v009Scenario, runId, {
      facts: {
        started: false,
        order: null,
        firstSubject: null,
        playerPose: null,
        tabithaPose: null,
        playerPhoto: null,
        tabithaPhoto: null,
        playerDirectedTabitha: false,
        shotsRemaining: 2,
        ownership: null,
      },
    });
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
    start_camera: {
      id: 'start_camera',
      label: 'See what Tabitha does with the camera',
      repeatable: false,
      durationMinutes: 1,
      priority: 20,
      available(state) {
        return state.stage === 'camera_available' && near(state.player, WORLD.table, 150);
      },
      apply(state) {
        state.facts.started = true;
        state.stage = 'first_photo';
        state.mode = 'vn';
        state.currentVN = 'opening';
        return {
          kind: 'situation',
          output: 'Tabitha checks the counter: two shots. She raises the camera toward you.',
        };
      },
    },

    resume_photo: {
      id: 'resume_photo',
      label: 'Pick the photo moment back up',
      repeatable: true,
      durationMinutes: 0,
      priority: 20,
      available(state) {
        return state.stage === 'photo_paused' && near(state.player, state.actors.tabitha, 140);
      },
      apply(state) {
        state.stage = 'focused_photo';
        state.mode = 'vn';
        state.currentVN = state.memory.pausedVN ?? 'opening';
        state.memory.pausedVN = null;
        return { kind: 'situation', output: 'The camera is still in hand. Nothing has moved on without you.' };
      },
    },

    use_last_shot: {
      id: 'use_last_shot',
      label: 'Use the last shot together',
      repeatable: false,
      durationMinutes: 1,
      priority: 20,
      available(state) {
        return state.stage === 'first_print' && state.facts.shotsRemaining === 1
          && near(state.player, WORLD.table, 155);
      },
      apply(state) {
        state.stage = 'second_photo';
        state.mode = 'vn';
        state.currentVN = state.facts.order === 'tabitha_first'
          ? 'direct_tabitha_second'
          : 'photograph_player_second';
        return {
          kind: 'situation',
          output: 'One exposure remains. The camera changes hands rather than either of you going anywhere.',
        };
      },
    },

    stop_after_one: {
      id: 'stop_after_one',
      label: 'Leave the last shot for somebody else',
      repeatable: false,
      durationMinutes: 1,
      priority: 10,
      available(state) {
        return state.stage === 'first_print' && state.facts.shotsRemaining === 1
          && near(state.player, WORLD.table, 155);
      },
      apply(state) {
        state.stage = 'complete';
        state.ended = true;
        state.ending = 'one_print';
        state.facts.ownership = 'first_print_left_on_table';
        return {
          kind: 'ending',
          output: 'You stop at one. The first print develops on the table; one unused shot remains in the camera.',
        };
      },
    },

    trade_prints: {
      id: 'trade_prints',
      label: 'Trade prints with Tabitha',
      repeatable: false,
      durationMinutes: 1,
      priority: 30,
      available(state) {
        return state.stage === 'two_prints' && near(state.player, state.actors.tabitha, 145);
      },
      apply(state) {
        state.facts.ownership = 'trade';
        state.stage = 'complete';
        state.ended = true;
        state.ending = 'trade';
        return { kind: 'ending', output: tradeLine(state) };
      },
    },

    own_prints: {
      id: 'own_prints',
      label: 'Give Tabitha her picture and keep yours',
      repeatable: false,
      durationMinutes: 1,
      priority: 20,
      available(state) {
        return state.stage === 'two_prints' && near(state.player, state.actors.tabitha, 145);
      },
      apply(state) {
        state.facts.ownership = 'own';
        state.stage = 'complete';
        state.ended = true;
        state.ending = 'own';
        return { kind: 'ending', output: 'You hand Tabitha her own picture. She looks at yours, then hers. “Coward. Fine.”' };
      },
    },

    leave_both: {
      id: 'leave_both',
      label: 'Leave both prints on the table',
      repeatable: false,
      durationMinutes: 1,
      priority: 10,
      available(state) {
        return state.stage === 'two_prints' && near(state.player, WORLD.table, 155);
      },
      apply(state) {
        state.facts.ownership = 'left';
        state.stage = 'complete';
        state.ended = true;
        state.ending = 'left';
        return { kind: 'ending', output: 'You leave both prints on the table. Tabitha gives them one look. “Evidence destroyed by abandonment.”' };
      },
    },

    leave_early: {
      id: 'leave_early',
      label: 'Leave the camera alone and go',
      repeatable: false,
      durationMinutes: 1,
      priority: -10,
      available(state) {
        return !state.facts.started && !state.ended && near(state.player, WORLD.exit, 100);
      },
      apply(state) {
        state.stage = 'complete';
        state.ended = true;
        state.ending = 'left_early';
        return { kind: 'ending', output: 'You leave the camera on the table. Tabitha does not turn it into an obligation.' };
      },
    },
  },

  vnGraph: {
    opening: {
      id: 'opening',
      title: 'Two shots left',
      turns: [
        { speaker: 'Tabitha', text: 'Two left.' },
        { speaker: 'Tabitha', text: 'Don’t do anything weird.' },
      ],
      prompt: 'The camera is pointed at you.',
      choices: [
        {
          id: 'still',
          label: '[Stay exactly as you are.]',
          apply(state) {
            return firstPlayerPhoto(state, 'still', [{ speaker: 'Tabitha', text: 'That somehow looks suspicious.' }]);
          },
        },
        {
          id: 'official',
          label: '[Put on your most painfully official expression.]',
          apply(state) {
            return firstPlayerPhoto(state, 'official', [{ speaker: 'Tabitha', text: 'Christ. You look electable.' }]);
          },
        },
        {
          id: 'face',
          label: '[Pull a face at the last second.]',
          apply(state) {
            return firstPlayerPhoto(state, 'face', [{ speaker: 'Tabitha', text: 'Oh, that one’s staying.' }]);
          },
        },
        {
          id: 'you_first',
          label: '“No. You first.”',
          apply(state) {
            state.facts.order = 'player_first';
            state.stage = 'direct_tabitha_first';
            return {
              nextNode: 'direct_tabitha_first',
              kind: 'situation',
              output: 'You reverse the order. Tabitha gives you the camera.',
              response: [{ speaker: 'Tabitha', text: 'Fine. Be normal about this.' }],
            };
          },
        },
      ],
    },

    direct_tabitha_first: {
      id: 'direct_tabitha_first',
      title: 'Your shot',
      turns: [{ speaker: 'Tabitha', text: 'Well?' }],
      prompt: 'How do you take the picture?',
      choices: [
        {
          id: 'candid',
          label: '[Take it before she poses.]',
          apply(state) {
            return firstTabithaPhoto(state, 'candid', [{ speaker: 'Tabitha', text: 'Rude.' }]);
          },
        },
        {
          id: 'exit_sign',
          label: '“Stand under the EXIT sign.”',
          apply(state) {
            return firstTabithaPhoto(state, 'exit_sign', [{ speaker: 'Tabitha', text: 'Subtle.' }]);
          },
        },
        {
          id: 'respectable',
          label: '“Try to look respectable.”',
          apply(state) {
            return firstTabithaPhoto(state, 'respectable', [
              { speaker: 'Tabitha', text: 'I can do respectable.' },
              { speaker: 'Tabitha', text: 'There. Public-sector safe.' },
            ]);
          },
        },
      ],
    },

    direct_tabitha_second: {
      id: 'direct_tabitha_second',
      title: 'Your turn',
      turns: [{ speaker: 'Tabitha', text: 'Your turn. One shot. Don’t waste public resources.' }],
      prompt: 'How do you take her picture?',
      choices: [
        {
          id: 'candid',
          label: '[Take it before she poses.]',
          apply(state) {
            return secondTabithaPhoto(state, 'candid', [{ speaker: 'Tabitha', text: 'Rude.' }]);
          },
        },
        {
          id: 'exit_sign',
          label: '“Stand under the EXIT sign.”',
          apply(state) {
            return secondTabithaPhoto(state, 'exit_sign', [{ speaker: 'Tabitha', text: 'Subtle.' }]);
          },
        },
        {
          id: 'respectable',
          label: '“Try to look respectable.”',
          apply(state) {
            return secondTabithaPhoto(state, 'respectable', [
              { speaker: 'Tabitha', text: 'I can do respectable.' },
              { speaker: 'Tabitha', text: 'There. Public-sector safe.' },
            ]);
          },
        },
      ],
    },

    photograph_player_second: {
      id: 'photograph_player_second',
      title: 'Now you',
      turns: [{ speaker: 'Tabitha', text: 'Right. Now you. You don’t get to hide behind the camera twice.' }],
      prompt: 'She raises the camera.',
      choices: [
        {
          id: 'still',
          label: '[Stay exactly as you are.]',
          apply(state) {
            return secondPlayerPhoto(state, 'still', [{ speaker: 'Tabitha', text: 'That somehow looks suspicious.' }]);
          },
        },
        {
          id: 'official',
          label: '[Put on your most painfully official expression.]',
          apply(state) {
            return secondPlayerPhoto(state, 'official', [{ speaker: 'Tabitha', text: 'Christ. You look electable.' }]);
          },
        },
        {
          id: 'face',
          label: '[Pull a face at the last second.]',
          apply(state) {
            return secondPlayerPhoto(state, 'face', [{ speaker: 'Tabitha', text: 'Oh, that one’s staying.' }]);
          },
        },
      ],
    },
  },

  onCancelVN(state) {
    state.stage = 'photo_paused';
    return {
      kind: 'situation',
      output: 'You lower the camera. Tabitha stays beside you; the photo moment waits rather than moving on.',
    };
  },

  render(_context, state, h) {
    h.rect(26, 54, 908, 438, '#c9bea9', '#5b554b', 3);
    h.rect(WORLD.table.x - 120, WORLD.table.y - 24, 240, 48, '#6d5d4c');
    h.rect(WORLD.table.x - 98, WORLD.table.y + 24, 14, 52, '#55483b');
    h.rect(WORLD.table.x + 84, WORLD.table.y + 24, 14, 52, '#55483b');
    h.text('INSTANT CAMERA · 2 SHOTS', WORLD.table.x, WORLD.table.y - 54, {
      align: 'center', color: '#3e3b35', font: 'bold 11px system-ui',
    });
    h.rect(710, 102, 150, 82, '#e5e3d8', '#827b6d', 2);
    h.text('EXIT', 785, 147, { align: 'center', color: '#48705a', font: 'bold 23px system-ui' });
    h.text('side table', WORLD.table.x, WORLD.table.y + 102, { align: 'center', color: '#5a564e' });

    if (state.facts.playerPhoto) {
      h.rect(390, 292, 82, 64, '#faf4e6', '#908777', 2);
      h.text('YOU', 431, 329, { align: 'center', color: '#35332e', font: 'bold 11px system-ui' });
    }
    if (state.facts.tabithaPhoto) {
      h.rect(482, 292, 82, 64, '#faf4e6', '#908777', 2);
      h.text('TAB', 523, 329, { align: 'center', color: '#6b4262', font: 'bold 11px system-ui' });
    }
    if (state.facts.shotsRemaining === 1) {
      h.text('1 SHOT LEFT', WORLD.table.x, WORLD.table.y + 118, { align: 'center', color: '#524e45', font: 'bold 10px system-ui' });
    }
    if (state.facts.shotsRemaining === 0) {
      h.text('0 SHOTS LEFT', WORLD.table.x, WORLD.table.y + 118, { align: 'center', color: '#524e45', font: 'bold 10px system-ui' });
    }
  },

  situationText(state) {
    if (state.stage === 'camera_available') return 'You and Tabitha are beside a side table. She has found an instant camera with two shots left.';
    if (state.stage === 'photo_paused') return 'You lowered the camera. Tabitha is still beside you; nothing has moved on.';
    if (state.stage === 'first_print') {
      const first = state.facts.firstSubject === 'player' ? state.facts.playerPhoto : state.facts.tabithaPhoto;
      return `The first print is developing on the table: ${first} One shot remains.`;
    }
    if (state.stage === 'two_prints') {
      return `Both prints are on the table. ${state.facts.playerPhoto} ${state.facts.tabithaPhoto}`;
    }
    if (state.stage === 'complete') return 'The photo moment is over.';
    return 'You and Tabitha are using the instant camera together.';
  },

  stageLabel(state) {
    return {
      camera_available: 'two shots left',
      first_photo: 'first picture',
      direct_tabitha_first: 'first picture',
      photo_paused: 'paused together',
      first_print: 'first print',
      second_photo: 'last shot',
      two_prints: 'two prints',
      complete: 'complete',
    }[state.stage] ?? state.stage.replaceAll('_', ' ');
  },

  endingSummary(state) {
    return {
      trade: 'You traded prints: Tabitha kept the photo of you; you kept the photo of her.',
      own: 'Each of you kept your own photo.',
      left: 'Both prints were left on the hall table.',
      one_print: 'You stopped after the first picture and left one shot in the camera.',
      left_early: 'You left before using the camera.',
    }[state.ending] ?? 'The photo interaction ended.';
  },
};

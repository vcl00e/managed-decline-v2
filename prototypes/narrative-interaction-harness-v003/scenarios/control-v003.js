import { createBaseState, near } from '../../narrative-interaction-harness-v002/src/scenario-contract.js';

const WORLD = Object.freeze({
  width: 960,
  height: 540,
  spawn: Object.freeze({ x: 300, y: 420 }),
  backRow: Object.freeze({ x: 350, y: 410 }),
  projector: Object.freeze({ x: 540, y: 205 }),
  margin: 26,
});

function finishBeat(state, stance, response) {
  state.facts.stance = stance;
  state.stage = 'control_residue';
  return {
    kind: 'situation',
    output: 'The presentation keeps going. Tabitha is still beside you, sharing the joke rather than becoming the next waypoint.',
    response,
  };
}

export const controlScenario = {
  id: 'baseline-recovery-control-v003',
  title: 'Golden Control',
  subtitle: 'Known-good Tabitha material inside the recovered v006b-scale shell.',
  browserTitle: 'Managed Decline — Baseline Recovery Control',
  startTime: '18:03',
  initialStage: 'back_row',
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
      start: { x: 360, y: 410 },
      initialMood: 'watching the projector with you',
    },
  },
  palette: { backgroundFrom: '#777a72', backgroundTo: '#b5aa91' },
  startingFeedback: 'The projector is already asking the room what it should do about “Tabitha”.',
  auditOptions: { maxActions: 10 },

  createState(runId) {
    return createBaseState(controlScenario, runId, {
      facts: { started: false, firstResponse: null, complicity: null, stance: null },
    });
  },

  meaningfulState(state) {
    return { stage: state.stage, facts: state.facts, ending: state.ending };
  },

  actions: {
    join_tabitha: {
      id: 'join_tabitha',
      label: 'Sit with Tabitha and watch the archived scenario',
      repeatable: false,
      durationMinutes: 1,
      priority: 10,
      available(state) {
        return state.stage === 'back_row' && near(state.player, WORLD.backRow, 125);
      },
      apply(state) {
        state.facts.started = true;
        state.stage = 'focused_hook';
        state.mode = 'vn';
        state.currentVN = 'hook';
        return {
          kind: 'situation',
          output: 'You settle into the back row beside Tabitha. The projector becomes the focus.',
        };
      },
    },

    resume_control: {
      id: 'resume_control',
      label: 'Pick the conversation back up with Tabitha',
      repeatable: true,
      durationMinutes: 0,
      priority: 10,
      available(state) {
        return state.stage === 'control_paused' && near(state.player, state.actors.tabitha, 120);
      },
      apply(state) {
        state.stage = 'focused_hook';
        state.mode = 'vn';
        state.currentVN = state.memory.pausedVN ?? 'hook';
        state.memory.pausedVN = null;
        return { kind: 'situation', output: 'Tabitha is still beside you. The same conversation is waiting.' };
      },
    },

    finish_control: {
      id: 'finish_control',
      label: 'Let the session carry on',
      repeatable: false,
      durationMinutes: 1,
      priority: 10,
      available(state) {
        return state.stage === 'control_residue' && near(state.player, state.actors.tabitha, 125);
      },
      apply(state) {
        state.stage = 'complete';
        state.ended = true;
        state.ending = 'golden_control_complete';
        return {
          kind: 'ending',
          output: 'Control complete: the focused exchange returned to the same shared space without a chase or disappearing context.',
        };
      },
    },
  },

  vnGraph: {
    hook: {
      id: 'hook',
      title: 'What would you do about Tabitha?',
      turns: [
        { speaker: 'Projector', text: 'WHAT WOULD YOU DO IF YOUR FRIEND TABITHA BEGAN EXPRESSING CHALLENGING VIEWS ONLINE?' },
        { speaker: 'Tabitha', text: 'Still no option D: ask Tabitha out. Cowards.' },
        { speaker: 'Facilitator', text: 'This archived scenario is retained for historical learning.' },
      ],
      prompt: 'What do you say?',
      choices: [
        {
          id: 'option_d',
          label: '“Option D seems evidence-based.”',
          apply(state) {
            state.facts.firstResponse = 'option_d';
            state.stage = 'focused_why_here';
            return {
              nextNode: 'why_here',
              output: 'Tabitha bites back a smile.',
              response: [{ speaker: 'Tabitha', text: 'Finally. Peer-reviewed safeguarding.' }],
            };
          },
        },
        {
          id: 'brought_me',
          label: '“You brought me here to watch yourself get radicalised?”',
          apply(state) {
            state.facts.firstResponse = 'brought_me';
            state.stage = 'focused_why_here';
            return {
              nextNode: 'why_here',
              output: 'Tabitha leans closer so the facilitator cannot hear.',
              response: [{ speaker: 'Tabitha', text: 'I wanted a professional opinion.' }],
            };
          },
        },
        {
          id: 'leave',
          label: '“We can still leave.”',
          apply(state) {
            state.facts.firstResponse = 'leave';
            state.stage = 'focused_why_here';
            return {
              nextNode: 'why_here',
              output: 'Tabitha clocks the offer before looking back at the screen.',
              response: [{ speaker: 'Tabitha', text: 'Five more minutes. If they cure me, we go.' }],
            };
          },
        },
      ],
    },

    why_here: {
      id: 'why_here',
      title: 'The witness',
      turns: [
        { speaker: 'Tabitha', text: 'They emailed me this morning saying the council was running a “legacy learning session”.' },
        { speaker: 'Tabitha', text: 'Don’t tell him who I am yet. I want to see whether they fixed the ending.' },
        { speaker: 'Facilitator', text: 'For those who have not seen it before, Tabitha is a fictionalised composite.' },
      ],
      prompt: 'How do you answer?',
      choices: [
        {
          id: 'secret',
          label: '“Your secret identity is safe.”',
          apply(state) {
            state.facts.complicity = 'secret';
            state.stage = 'focused_warning';
            return {
              nextNode: 'warning_signs',
              output: 'You agree to let the room keep misunderstanding who is sitting in the back row.',
              response: [{ speaker: 'Tabitha', text: 'Good. I’m enjoying being several women.' }],
            };
          },
        },
        {
          id: 'drink',
          label: '“This costs you a drink.”',
          apply(state) {
            state.facts.complicity = 'drink';
            state.stage = 'focused_warning';
            return {
              nextNode: 'warning_signs',
              output: 'Tabitha accepts the price without looking away from the projector.',
              response: [{ speaker: 'Tabitha', text: 'Extortion. Healthy social connection.' }],
            };
          },
        },
        {
          id: 'why_care',
          label: '“Why do you care what the old version says?”',
          apply(state) {
            state.facts.complicity = 'why_care';
            state.stage = 'focused_warning';
            return {
              nextNode: 'warning_signs',
              output: 'The question lands; Tabitha answers without turning it into a speech.',
              response: [{ speaker: 'Tabitha', text: 'Because apparently they’re still teaching it.' }],
            };
          },
        },
      ],
    },

    warning_signs: {
      id: 'warning_signs',
      title: 'Early warning signs',
      turns: [
        { speaker: 'Projector', text: 'POSSIBLE CHANGE TO NOTICE: INTENSE INTEREST IN NATIONAL HISTORY OR IDENTITY WITHOUT PREVIOUS CONTEXT.' },
        { speaker: 'Facilitator', text: 'An interest in British history is not, by itself, evidence of radicalisation.' },
        { speaker: 'Tabitha', text: 'This is the nicest thing a professional has ever said about my browser history.' },
      ],
      prompt: 'What do you do?',
      choices: [
        {
          id: 'laugh',
          label: '[Try not to laugh. Fail.]',
          apply(state) {
            return finishBeat(state, 'laugh', [{ speaker: 'Tabitha', text: 'We’re losing ground.' }]);
          },
        },
        {
          id: 'interesting',
          label: '“They’ve accidentally made you sound interesting.”',
          apply(state) {
            return finishBeat(state, 'interesting', [{ speaker: 'Tabitha', text: 'Accidentally?' }]);
          },
        },
        {
          id: 'watch',
          label: '[Watch Tabitha instead of the projector.]',
          apply(state) {
            return finishBeat(state, 'watch', [{ speaker: 'Tabitha', text: 'What?' }]);
          },
        },
      ],
    },
  },

  onCancelVN(state) {
    state.stage = 'control_paused';
    return {
      kind: 'situation',
      output: 'You drop out of the focused exchange. Tabitha remains beside you and the room keeps going.',
    };
  },

  render(_context, state, h) {
    h.rect(26, 54, 908, 438, '#c7bca8', '#5b554b', 3);
    h.rect(440, 88, 360, 220, '#f4f1e8', '#333a39', 12);
    h.text('COMMUNITY COMPASS', 620, 150, { align: 'center', color: '#426052', font: 'bold 13px system-ui' });
    h.text('WHAT WOULD YOU DO ABOUT TABITHA?', 620, 196, { align: 'center', color: '#292d2b', font: 'bold 17px system-ui' });
    h.text(state.stage === 'control_residue' || state.ended ? 'AN INTEREST IN HISTORY IS NOT, BY ITSELF, A WARNING SIGN.' : 'ARCHIVED LEARNING SCENARIO', 620, 236, { align: 'center', color: '#62635d', font: '11px system-ui' });
    h.rect(232, 392, 260, 46, '#5c5548');
    h.text('BACK ROW', 362, 425, { align: 'center', color: '#eee8dc', font: '10px system-ui' });
  },

  situationText(state) {
    return {
      back_row: 'Tabitha is sitting beside you in the back row while the council presentation runs.',
      focused_hook: 'The projector is talking about “Tabitha”; the actual Tabitha is beside you.',
      focused_why_here: 'Tabitha wants to hear what the old programme now says about her.',
      focused_warning: 'The room is earnestly discussing warning signs. You and Tabitha are still sharing the same moment.',
      control_paused: 'You are back in the live room. Tabitha has not gone anywhere.',
      control_residue: 'The presentation continues. Tabitha stays beside you after the focused exchange.',
      complete: 'Internal golden control complete.',
    }[state.stage] ?? state.stage;
  },

  stageLabel(state) {
    return {
      back_row: 'back row',
      focused_hook: 'focused conversation',
      focused_why_here: 'focused conversation',
      focused_warning: 'focused conversation',
      control_paused: 'live room',
      control_residue: 'back in the room',
      complete: 'complete',
    }[state.stage] ?? state.stage;
  },

  endingSummary() {
    return 'The reliable runtime reproduced the control without shrinking the focused presentation or turning important context into a timed toast.';
  },
};

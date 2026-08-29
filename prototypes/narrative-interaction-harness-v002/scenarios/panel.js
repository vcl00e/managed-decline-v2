import { createBaseState, near } from '../src/scenario-contract.js';

const WORLD = Object.freeze({
  width: 840,
  height: 460,
  spawn: Object.freeze({ x: 72, y: 360 }),
  panel: Object.freeze({ x: 248, y: 332 }),
  door: Object.freeze({ x: 690, y: 206 }),
});

export const panelScenario = {
  id: 'panel-fixture',
  title: 'Harness fixture A — Loose panel',
  subtitle: 'A deliberately plain map → VN → map reliability specimen.',
  browserTitle: 'Narrative Interaction Harness v002 — Panel fixture',
  startTime: '19:03',
  initialStage: 'approach_panel',
  world: WORLD,
  player: { label: 'YOU', color: '#242621', radius: 15, speed: 190 },
  actors: {
    ari: {
      id: 'ari',
      name: 'Ari',
      label: 'ARI',
      color: '#637b63',
      radius: 18,
      speed: 150,
      start: { x: 216, y: 330 },
    },
  },
  palette: { backgroundFrom: '#afb9aa', backgroundTo: '#d3c5aa' },
  startingNotice: 'Move toward Ari and use the contextual prompt.',

  createState(runId) {
    return createBaseState(panelScenario, runId, {
      facts: {
        panelHeld: false,
        labelRead: false,
        handleTried: false,
        followedAri: false,
      },
    });
  },

  meaningfulState(state) {
    return {
      stage: state.stage,
      facts: state.facts,
      ariTarget: state.actors.ari.target,
      ending: state.ending,
    };
  },

  actions: {
    help_hold: {
      id: 'help_hold',
      label: 'Help Ari hold the loose panel',
      repeatable: false,
      durationMinutes: 3,
      available(state) {
        return state.stage === 'approach_panel' && near(state.player, WORLD.panel, 115);
      },
      apply(state) {
        state.facts.panelHeld = true;
        state.stage = 'read_label';
        state.actors.ari.target = { x: 270, y: 316 };
        return {
          kind: 'physical',
          output: 'You take the loose edge. Ari leans behind it; an old label is now visible.',
        };
      },
    },

    read_label: {
      id: 'read_label',
      label: 'Read the exposed label',
      repeatable: false,
      durationMinutes: 1,
      available(state) {
        return state.stage === 'read_label' && near(state.player, WORLD.panel, 125);
      },
      apply(state) {
        state.facts.labelRead = true;
        state.stage = 'focused_exchange';
        state.mode = 'vn';
        state.currentVN = 'ari_question';
        return {
          kind: 'discovery',
          output: 'The old enamel label reads ROOM 4. A recessed handle sits below it.',
        };
      },
    },

    resume_exchange: {
      id: 'resume_exchange',
      label: 'Continue the interrupted exchange',
      repeatable: true,
      durationMinutes: 0,
      available(state) {
        return state.stage === 'exchange_paused' && near(state.player, WORLD.panel, 135);
      },
      apply(state) {
        state.stage = 'focused_exchange';
        state.mode = 'vn';
        state.currentVN = state.memory.pausedVN ?? 'ari_question';
        state.memory.pausedVN = null;
        return {
          kind: 'situation',
          output: 'You pick the exchange back up where it stopped.',
        };
      },
    },

    follow_ari: {
      id: 'follow_ari',
      label: 'Follow Ari to the old door',
      repeatable: false,
      durationMinutes: 2,
      available(state) {
        return state.stage === 'follow_ari' && near(state.player, WORLD.door, 125);
      },
      apply(state) {
        state.facts.followedAri = true;
        state.stage = 'complete';
        state.ended = true;
        state.ending = 'door_reached';
        return {
          kind: 'ending',
          output: 'You reach the old door together. The harness run is complete.',
        };
      },
    },
  },

  vnGraph: {
    ari_question: {
      id: 'ari_question',
      title: 'The exposed label',
      turns: [
        { speaker: 'Ari', text: 'Room 4. That was hidden under the panel.' },
        { speaker: 'Ari', text: 'The handle is still there.' },
      ],
      prompt: 'What do you do?',
      choices: [
        {
          id: 'try_handle',
          label: '[Try the handle.]',
          apply(state) {
            state.facts.handleTried = true;
            state.stage = 'follow_ari';
            state.actors.ari.target = { ...WORLD.door };
            return {
              kind: 'situation',
              output: 'The handle gives. Ari crosses the yard toward the old door.',
              response: [
                { speaker: 'You', text: 'It moves.' },
                { speaker: 'Ari', text: 'Then come on.' },
              ],
            };
          },
        },
        {
          id: 'leave_it',
          label: 'Leave it alone.',
          apply(state) {
            state.stage = 'complete';
            state.ended = true;
            state.ending = 'left_alone';
            return {
              kind: 'ending',
              output: 'You leave the hidden door alone. The harness run is complete.',
              response: [
                { speaker: 'You', text: 'Not tonight.' },
                { speaker: 'Ari', text: 'Fair.' },
              ],
            };
          },
        },
      ],
    },
  },

  onCancelVN(state) {
    state.stage = 'exchange_paused';
    return {
      kind: 'situation',
      output: 'The exchange pauses. Ari stays by the exposed label.',
    };
  },

  render(_context, state, h) {
    h.rect(170, 72, 610, 300, '#e8dfcf', '#847a68', 3);
    h.rect(WORLD.panel.x - 42, WORLD.panel.y - 56, 84, 72, '#766b59');
    h.rect(
      WORLD.panel.x - 35,
      WORLD.panel.y - 50,
      70,
      58,
      state.facts.panelHeld ? '#e6d7ac' : '#9a6f4c',
    );
    h.text(state.facts.labelRead ? 'ROOM 4' : 'LOOSE PANEL', WORLD.panel.x, WORLD.panel.y - 20, {
      font: '11px system-ui', align: 'center',
    });
    h.rect(WORLD.door.x - 38, WORLD.door.y - 74, 76, 120, '#685e50');
    h.rect(WORLD.door.x - 30, WORLD.door.y - 66, 60, 104, '#d8c7a6');
    h.text('fixture A: consumed affordance → VN → spatial consequence', 184, 100, {
      color: '#47443c', font: '12px system-ui',
    });
  },

  endingSummary(state) {
    return state.ending === 'door_reached'
      ? 'Ari and the player reached the old door.'
      : 'The hidden door was left alone.';
  },
};

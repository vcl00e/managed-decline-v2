export const WORLD = Object.freeze({
  width: 840,
  height: 460,
  spawn: Object.freeze({ x: 72, y: 360 }),
  panel: Object.freeze({ x: 248, y: 332 }),
  door: Object.freeze({ x: 690, y: 206 }),
  exit: Object.freeze({ x: 48, y: 412 }),
});

export const VN_GRAPH = Object.freeze({
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
        response: [
          { speaker: 'You', text: 'It moves.' },
          { speaker: 'Ari', text: 'Then come on.' },
        ],
      },
      {
        id: 'leave_it',
        label: 'Leave it alone.',
        response: [
          { speaker: 'You', text: 'Not tonight.' },
          { speaker: 'Ari', text: 'Fair.' },
        ],
      },
    ],
  },
});

export function createScenarioState(runId = `run-${Date.now()}`) {
  return {
    runId,
    fictionalMinutes: 0,
    fictionalTime: '19:03',
    ended: false,
    ending: null,
    mode: 'world',
    stage: 'approach_panel',
    player: { ...WORLD.spawn },
    ari: { x: 216, y: 330, target: { x: 216, y: 330 } },
    facts: {
      panelHeld: false,
      labelRead: false,
      handleTried: false,
      followedAri: false,
    },
    currentVN: null,
    consumedActions: [],
    actionUses: {},
    visibleChanges: [],
    trace: [],
  };
}

function near(a, b, radius) {
  return Math.hypot(a.x - b.x, a.y - b.y) <= radius;
}

export const ACTIONS = Object.freeze({
  help_hold: {
    id: 'help_hold',
    label: 'Help Ari hold the loose panel',
    repeatable: false,
    durationMinutes: 3,
    available(state) {
      return state.mode === 'world'
        && state.stage === 'approach_panel'
        && near(state.player, WORLD.panel, 115);
    },
    apply(state) {
      state.facts.panelHeld = true;
      state.stage = 'read_label';
      state.ari.target = { x: 270, y: 316 };
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
      return state.mode === 'world'
        && state.stage === 'read_label'
        && near(state.player, WORLD.panel, 125);
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
      return state.mode === 'world'
        && state.stage === 'exchange_paused'
        && near(state.player, WORLD.panel, 130);
    },
    apply(state) {
      state.stage = 'focused_exchange';
      state.mode = 'vn';
      state.currentVN = 'ari_question';
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
      return state.mode === 'world'
        && state.stage === 'follow_ari'
        && near(state.player, WORLD.door, 125);
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
});

export function availableActions(state) {
  if (state.ended || state.mode !== 'world') return [];
  return Object.values(ACTIONS).filter((action) => action.available(state));
}

export function actionById(id) {
  return ACTIONS[id] ?? null;
}

export function applyVNChoice(state, choiceId) {
  if (state.mode !== 'vn' || state.currentVN !== 'ari_question') {
    throw new Error('No VN choice is currently available.');
  }

  if (choiceId === 'try_handle') {
    state.facts.handleTried = true;
    state.mode = 'world';
    state.currentVN = null;
    state.stage = 'follow_ari';
    state.ari.target = { ...WORLD.door };
    return {
      kind: 'situation',
      output: 'The handle gives. Ari crosses the yard toward the old door.',
      ending: false,
    };
  }

  if (choiceId === 'leave_it') {
    state.mode = 'world';
    state.currentVN = null;
    state.stage = 'complete';
    state.ended = true;
    state.ending = 'left_alone';
    return {
      kind: 'ending',
      output: 'You leave the hidden door alone. The harness run is complete.',
      ending: true,
    };
  }

  throw new Error(`Unknown VN choice: ${choiceId}`);
}

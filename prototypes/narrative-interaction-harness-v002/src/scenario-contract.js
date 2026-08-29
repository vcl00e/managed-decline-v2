const isFiniteNumber = (value) => Number.isFinite(value);
const isPoint = (value) => value && isFiniteNumber(value.x) && isFiniteNumber(value.y);

export function near(a, b, radius) {
  if (!isPoint(a) || !isPoint(b) || !isFiniteNumber(radius)) return false;
  return Math.hypot(a.x - b.x, a.y - b.y) <= radius;
}

export function createBaseState(scenario, runId = `run-${Date.now()}`, extra = {}) {
  validateScenarioShape(scenario);
  const actors = Object.fromEntries(
    Object.entries(scenario.actors ?? {}).map(([id, actor]) => [id, {
      id,
      x: actor.start.x,
      y: actor.start.y,
      target: { ...(actor.start ?? scenario.world.spawn) },
      mood: actor.initialMood ?? null,
      speech: null,
      speechUntil: 0,
    }]),
  );

  return {
    scenarioId: scenario.id,
    runId,
    fictionalMinutes: 0,
    fictionalTime: scenario.startTime ?? '19:03',
    ended: false,
    ending: null,
    mode: 'world',
    stage: scenario.initialStage,
    player: { ...scenario.world.spawn },
    actors,
    facts: {},
    memory: {},
    currentVN: null,
    consumedActions: [],
    actionUses: {},
    visibleChanges: [],
    trace: [],
    ...extra,
  };
}

function assert(condition, message) {
  if (!condition) throw new Error(`Scenario contract violation: ${message}`);
}

function validateScenarioShape(scenario) {
  assert(scenario && typeof scenario === 'object', 'scenario must be an object');
  assert(typeof scenario.id === 'string' && scenario.id.length > 0, 'scenario.id is required');
  assert(typeof scenario.title === 'string' && scenario.title.length > 0, 'scenario.title is required');
  assert(scenario.world && isFiniteNumber(scenario.world.width) && scenario.world.width > 100,
    'scenario.world.width must be a finite number');
  assert(scenario.world && isFiniteNumber(scenario.world.height) && scenario.world.height > 100,
    'scenario.world.height must be a finite number');
  assert(isPoint(scenario.world.spawn), 'scenario.world.spawn must be a point');
  assert(typeof scenario.initialStage === 'string' && scenario.initialStage.length > 0,
    'scenario.initialStage is required');
  assert(typeof scenario.createState === 'function', 'scenario.createState is required');
  assert(typeof scenario.meaningfulState === 'function', 'scenario.meaningfulState is required');
  assert(scenario.actions && typeof scenario.actions === 'object', 'scenario.actions is required');
  assert(scenario.vnGraph && typeof scenario.vnGraph === 'object', 'scenario.vnGraph is required');
  assert(typeof scenario.render === 'function', 'scenario.render is required');

  for (const [id, actor] of Object.entries(scenario.actors ?? {})) {
    assert(isPoint(actor.start), `actor ${id} requires a start point`);
    assert(typeof actor.label === 'string', `actor ${id} requires a label`);
  }

  for (const [id, action] of Object.entries(scenario.actions)) {
    assert(action.id === id, `action key ${id} must match action.id`);
    assert(typeof action.label === 'string' && action.label.length > 0, `action ${id} requires a label`);
    assert(typeof action.available === 'function', `action ${id} requires available(state)`);
    assert(typeof action.apply === 'function', `action ${id} requires apply(state)`);
    assert(isFiniteNumber(action.durationMinutes ?? 0) && (action.durationMinutes ?? 0) >= 0,
      `action ${id} has invalid durationMinutes`);
  }

  for (const [id, node] of Object.entries(scenario.vnGraph)) {
    assert(node.id === id, `VN key ${id} must match node.id`);
    assert(Array.isArray(node.turns), `VN node ${id} requires turns`);
    assert(Array.isArray(node.choices) && node.choices.length > 0, `VN node ${id} requires choices`);
    for (const choice of node.choices) {
      assert(typeof choice.id === 'string' && choice.id.length > 0, `VN node ${id} has a choice without id`);
      assert(typeof choice.label === 'string' && choice.label.length > 0,
        `VN choice ${id}:${choice.id} requires label`);
      assert(typeof choice.apply === 'function', `VN choice ${id}:${choice.id} requires apply(state)`);
    }
  }
}

export function validateStateShape(scenario, state) {
  assert(state && typeof state === 'object', 'createState must return an object');
  assert(state.scenarioId === scenario.id, 'state.scenarioId must match scenario.id');
  assert(typeof state.runId === 'string', 'state.runId must be a string');
  assert(isPoint(state.player), 'state.player must be a point');
  assert(state.actors && typeof state.actors === 'object', 'state.actors is required');
  assert(typeof state.stage === 'string', 'state.stage must be a string');
  assert(['world', 'vn'].includes(state.mode), 'state.mode must be world or vn');
  assert(Array.isArray(state.consumedActions), 'state.consumedActions must be an array');
  assert(state.actionUses && typeof state.actionUses === 'object', 'state.actionUses is required');
  assert(Array.isArray(state.visibleChanges), 'state.visibleChanges must be an array');
  assert(Array.isArray(state.trace), 'state.trace must be an array');
  return state;
}

export function validateScenario(scenario) {
  validateScenarioShape(scenario);
  const state = scenario.createState('__contract_validation__');
  validateStateShape(scenario, state);
  scenario.meaningfulState(state);
  return scenario;
}

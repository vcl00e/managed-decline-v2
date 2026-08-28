const unique = (items) => [...new Set(items)];

export function createExperienceState(definitions) {
  const histories = {};
  for (const id of Object.keys(definitions)) {
    histories[id] = {
      id,
      status: 'available',
      stage: 'unstarted',
      events: [],
      fulfilled: [],
      activations: 0,
      suspensions: 0,
      lastReason: null,
    };
  }
  return { activeId: null, histories };
}

export function getExperience(state, id) {
  return state.experiences.histories[id];
}

export function getActiveExperience(state, definitions) {
  const id = state.experiences.activeId;
  if (!id) return null;
  return { definition: definitions[id], history: getExperience(state, id) };
}

export function activateExperience(state, definitions, id, reason = 'player_focus') {
  const definition = definitions[id];
  if (!definition) throw new Error(`Unknown experience: ${id}`);

  const runtime = state.experiences;
  if (runtime.activeId === id) return { changed: false, id, history: getExperience(state, id) };

  if (runtime.activeId) {
    const previous = getExperience(state, runtime.activeId);
    if (previous.status !== 'complete') {
      previous.status = 'suspended';
      previous.suspensions += 1;
    }
  }

  const history = getExperience(state, id);
  if (history.status !== 'complete') history.status = 'active';
  if (history.stage === 'unstarted') history.stage = 'entry';
  history.activations += 1;
  history.lastReason = reason;
  runtime.activeId = history.status === 'complete' ? null : id;

  return { changed: true, id, history };
}

export function advanceExperience(state, definitions, id, eventId, extraFulfilled = []) {
  const definition = definitions[id];
  if (!definition) throw new Error(`Unknown experience: ${id}`);

  const history = getExperience(state, id);
  const transition = definition.transitions[eventId];
  if (!transition) throw new Error(`Unknown experience event ${id}:${eventId}`);

  activateExperience(state, definitions, id, `event:${eventId}`);

  if (history.events.includes(eventId)) {
    return { changed: false, id, eventId, history };
  }

  const allowedFrom = Array.isArray(transition.from) ? transition.from : [transition.from];
  if (!allowedFrom.includes('*') && !allowedFrom.includes(history.stage)) {
    throw new Error(
      `Invalid experience transition ${id}:${eventId} from ${history.stage}; expected ${allowedFrom.join(', ')}`,
    );
  }

  history.events.push(eventId);
  history.fulfilled = unique([
    ...history.fulfilled,
    ...(transition.fulfills ?? []),
    ...extraFulfilled,
  ]);
  history.stage = transition.to ?? history.stage;

  if (history.stage === 'complete') {
    history.status = 'complete';
    if (state.experiences.activeId === id) state.experiences.activeId = null;
  } else {
    history.status = 'active';
    state.experiences.activeId = id;
  }

  return { changed: true, id, eventId, history };
}

export function completeExperience(state, definitions, id, eventId = null) {
  const history = getExperience(state, id);
  if (!history || history.status === 'complete') return history;

  if (eventId) return advanceExperience(state, definitions, id, eventId);

  history.stage = 'complete';
  history.status = 'complete';
  if (state.experiences.activeId === id) state.experiences.activeId = null;
  return history;
}

export function hasExperienceEvent(state, id, eventId) {
  return getExperience(state, id)?.events.includes(eventId) ?? false;
}

export function experienceStage(state, id) {
  return getExperience(state, id)?.stage ?? 'unstarted';
}

export function experienceStatus(state, id) {
  return getExperience(state, id)?.status ?? 'available';
}

export function canSurfaceUnrelated(state, definitions) {
  const active = getActiveExperience(state, definitions);
  if (!active) return true;
  if (active.definition.interruptionTolerance !== 'low') return true;
  return ['residue', 'complete'].includes(active.history.stage);
}

export function experienceCoverage(state, definitions, id) {
  const definition = definitions[id];
  const history = getExperience(state, id);
  const promised = definition.promise ?? [];
  const fulfilled = history?.fulfilled ?? [];
  return {
    id,
    status: history?.status ?? 'available',
    stage: history?.stage ?? 'unstarted',
    promised,
    fulfilled,
    missing: promised.filter((item) => !fulfilled.includes(item)),
    events: [...(history?.events ?? [])],
  };
}

export function allExperienceCoverage(state, definitions) {
  return Object.fromEntries(
    Object.keys(definitions).map((id) => [id, experienceCoverage(state, definitions, id)]),
  );
}

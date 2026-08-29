export function createRenderHelpers(context) {
  function rect(x, y, width, height, fill, stroke = null, lineWidth = 1) {
    context.fillStyle = fill;
    context.fillRect(x, y, width, height);
    if (stroke) {
      context.strokeStyle = stroke;
      context.lineWidth = lineWidth;
      context.strokeRect(x, y, width, height);
    }
  }

  function circle(x, y, radius, fill, stroke = '#fffaf0', lineWidth = 3) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fillStyle = fill;
    context.fill();
    if (stroke) {
      context.strokeStyle = stroke;
      context.lineWidth = lineWidth;
      context.stroke();
    }
  }

  function text(value, x, y, options = {}) {
    context.fillStyle = options.color ?? '#342f28';
    context.font = options.font ?? '12px system-ui';
    context.textAlign = options.align ?? 'left';
    context.textBaseline = options.baseline ?? 'alphabetic';
    context.fillText(value, x, y);
  }

  function actor(actorState, actorDefinition) {
    const radius = actorDefinition.radius ?? 17;
    circle(actorState.x, actorState.y, radius, actorDefinition.color ?? '#637b63');
    text(actorDefinition.label ?? actorDefinition.name ?? actorState.id,
      actorState.x, actorState.y + 3, {
        color: '#fff',
        font: 'bold 9px system-ui',
        align: 'center',
      });
  }

  function player(playerState, playerDefinition = {}) {
    const radius = playerDefinition.radius ?? 15;
    circle(playerState.x, playerState.y, radius, playerDefinition.color ?? '#242621');
    text(playerDefinition.label ?? 'YOU', playerState.x, playerState.y + 3, {
      color: '#fff',
      font: 'bold 9px system-ui',
      align: 'center',
    });
  }

  function background(width, height, from = '#afb9aa', to = '#d3c5aa') {
    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, from);
    gradient.addColorStop(1, to);
    rect(0, 0, width, height, gradient);
  }

  return { rect, circle, text, actor, player, background, context };
}

export function drawScenario(context, scenario, state) {
  const helpers = createRenderHelpers(context);
  helpers.background(
    scenario.world.width,
    scenario.world.height,
    scenario.palette?.backgroundFrom,
    scenario.palette?.backgroundTo,
  );
  scenario.render(context, state, helpers);
  for (const [id, actorState] of Object.entries(state.actors ?? {})) {
    const definition = scenario.actors?.[id];
    if (definition && definition.hidden?.(state) !== true) helpers.actor(actorState, definition);
  }
  helpers.player(state.player, scenario.player);
}

export function createVNView({ root, title, speaker, text, choices, runtime, onStateChange }) {
  let node = null;
  let turnIndex = 0;
  let response = [];
  let responseIndex = 0;

  function button(label, onClick, choiceId = null) {
    const element = document.createElement('button');
    element.type = 'button';
    element.textContent = label;
    if (choiceId) element.dataset.choice = choiceId;
    element.addEventListener('click', onClick);
    return element;
  }

  function open(nodeId) {
    node = runtime.scenario.vnGraph[nodeId];
    if (!node) throw new Error(`Unknown VN node: ${nodeId}`);
    turnIndex = 0;
    response = [];
    responseIndex = 0;
    root.hidden = false;
    title.textContent = node.title;
    render();
  }

  function close({ notify = true } = {}) {
    root.hidden = true;
    node = null;
    choices.replaceChildren();
    if (notify) onStateChange();
  }

  function continueAfterResponse() {
    if (runtime.state.mode === 'vn' && runtime.state.currentVN) {
      open(runtime.state.currentVN);
    } else {
      close();
    }
  }

  function render() {
    if (!node) return;

    if (turnIndex < node.turns.length) {
      const turn = node.turns[turnIndex];
      speaker.textContent = turn.speaker;
      text.textContent = typeof turn.text === 'function' ? turn.text(runtime.state) : turn.text;
      const continueButton = button('Continue', () => {
        turnIndex += 1;
        render();
      });
      choices.replaceChildren(continueButton);
      continueButton.focus();
      return;
    }

    if (responseIndex < response.length) {
      const turn = response[responseIndex];
      speaker.textContent = turn.speaker;
      text.textContent = typeof turn.text === 'function' ? turn.text(runtime.state) : turn.text;
      const continueButton = button('Continue', () => {
        responseIndex += 1;
        render();
      });
      choices.replaceChildren(continueButton);
      continueButton.focus();
      return;
    }

    if (response.length) {
      continueAfterResponse();
      return;
    }

    speaker.textContent = node.promptSpeaker ?? 'You';
    text.textContent = typeof node.prompt === 'function' ? node.prompt(runtime.state) : node.prompt;
    const choiceButtons = node.choices
      .filter((choice) => choice.available?.(runtime.state) !== false)
      .map((choice, index) => button(
        `${index + 1}. ${choice.label}`,
        () => {
          const result = runtime.chooseVN(choice.id);
          response = result.response ?? [];
          responseIndex = 0;
          if (response.length) render();
          else continueAfterResponse();
        },
        choice.id,
      ));
    choices.replaceChildren(...choiceButtons);
    choiceButtons[0]?.focus();
  }

  function handleKey(key) {
    if (!node) return false;
    if (/^[1-4]$/.test(key)) {
      const selected = choices.querySelectorAll('button[data-choice]')[Number(key) - 1];
      if (selected) {
        selected.click();
        return true;
      }
    }
    if (key === 'enter' || key === ' ') {
      if (choices.children.length === 1) {
        choices.firstElementChild.click();
        return true;
      }
      const focusedChoice = document.activeElement?.matches?.('button[data-choice]')
        ? document.activeElement
        : null;
      if (focusedChoice) {
        focusedChoice.click();
        return true;
      }
    }
    return false;
  }

  return {
    open,
    close,
    handleKey,
    get active() {
      return Boolean(node);
    },
  };
}

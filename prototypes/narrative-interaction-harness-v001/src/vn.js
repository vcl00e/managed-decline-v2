import { VN_GRAPH } from './scenario.js';

export function createVNView({ root, title, speaker, text, choices, runtime, onStateChange }) {
  let node = null;
  let turnIndex = 0;
  let response = [];
  let responseIndex = 0;

  function button(label, onClick, choiceId = null) {
    const element = document.createElement('button');
    element.textContent = label;
    if (choiceId) element.dataset.choice = choiceId;
    element.addEventListener('click', onClick);
    return element;
  }

  function open(nodeId) {
    node = VN_GRAPH[nodeId];
    if (!node) throw new Error(`Unknown VN node: ${nodeId}`);
    turnIndex = 0;
    response = [];
    responseIndex = 0;
    root.hidden = false;
    title.textContent = node.title;
    render();
  }

  function close() {
    root.hidden = true;
    node = null;
    choices.replaceChildren();
    onStateChange();
  }

  function render() {
    if (!node) return;

    if (turnIndex < node.turns.length) {
      const turn = node.turns[turnIndex];
      speaker.textContent = turn.speaker;
      text.textContent = turn.text;
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
      text.textContent = turn.text;
      const continueButton = button('Continue', () => {
        responseIndex += 1;
        render();
      });
      choices.replaceChildren(continueButton);
      continueButton.focus();
      return;
    }

    if (response.length) {
      close();
      return;
    }

    speaker.textContent = 'You';
    text.textContent = node.prompt;
    const choiceButtons = node.choices.map((choice, index) => button(
      `${index + 1}. ${choice.label}`,
      () => {
        runtime.chooseVN(choice.id);
        response = choice.response;
        responseIndex = 0;
        render();
      },
      choice.id,
    ));
    choices.replaceChildren(...choiceButtons);
    choiceButtons[0]?.focus();
  }

  function handleKey(key) {
    if (!node) return false;
    if (key === 'escape') {
      close();
      return true;
    }
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

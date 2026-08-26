(() => {
  // v005 playtest guard: keep game bindings out of form controls and allow
  // a dialogue to be abandoned without selecting a semantic response.
  let closeDialogue = null;

  const originalQuerySelector = Element.prototype.querySelector;
  const closeCapture = {
    addEventListener(type, listener) {
      if (type === "click" && typeof listener === "function") closeDialogue = listener;
    }
  };

  Element.prototype.querySelector = function patchedQuerySelector(selector) {
    const found = originalQuerySelector.call(this, selector);
    if (!found && selector === "#dialogue-close" && this.id === "dialogue") return closeCapture;
    return found;
  };

  function isTypingTarget(target) {
    return target instanceof HTMLInputElement
      || target instanceof HTMLTextAreaElement
      || target instanceof HTMLSelectElement
      || Boolean(target?.isContentEditable);
  }

  window.addEventListener("keydown", (event) => {
    if (isTypingTarget(event.target)) {
      // The game listens on window. Stop this event before it can reach those
      // bindings, but do not prevent the browser's normal text input.
      event.stopImmediatePropagation();
      return;
    }

    if (event.key === "Escape") {
      const layer = document.querySelector("#dialogue");
      if (layer && !layer.hidden && typeof closeDialogue === "function") {
        event.preventDefault();
        event.stopImmediatePropagation();
        closeDialogue();
      }
    }
  }, true);

  function addCancelControl() {
    const layer = document.querySelector("#dialogue");
    if (!layer || layer.hidden || typeof closeDialogue !== "function") return;
    const box = originalQuerySelector.call(layer, ".dialogue-box");
    if (!box || originalQuerySelector.call(box, ".response") || originalQuerySelector.call(box, "[data-dialogue-cancel]")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.dataset.dialogueCancel = "1";
    button.textContent = "Back out · Esc";
    button.style.marginTop = "12px";
    button.style.border = "1px solid rgba(255,255,255,.24)";
    button.style.borderRadius = "10px";
    button.style.padding = "9px 12px";
    button.style.background = "transparent";
    button.style.color = "inherit";
    button.style.opacity = ".8";
    button.style.cursor = "pointer";
    button.addEventListener("click", () => closeDialogue?.());
    box.append(button);
  }

  const observer = new MutationObserver(addCancelControl);
  observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ["hidden"] });
})();

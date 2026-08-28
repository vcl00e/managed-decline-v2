import { SCENES } from './scenario.js';
import { applySceneChoice, record } from './model.js';

export function createVNController({
  vn,
  titleEl,
  speakerEl,
  textEl,
  choicesEl,
  portraitEl,
  runtime,
  onRunEnd,
}) {
  let current = null;
  let queue = [];
  let phase = 'intro';

  function callbackLine(motif) {
    if (motif === 'notice ranking') {
      return 'Do not look now, but the radio table has a laminated cable policy. We may have a contender.';
    }
    if (motif === 'laminated menus') {
      return 'Maya has offered crisps. I am still preserving appetite for our extremely regulated breakfast.';
    }
    if (motif === 'old civic buildings') {
      return 'The radio table is blocking an original air vent. I am choosing not to begin a heritage dispute.';
    }
    return 'Community resilience has breached containment.';
  }

  function build(sceneId) {
    const base = SCENES[sceneId];
    if (!base) return null;

    const scene = { ...base };
    if (sceneId === 'tabitha_callback') {
      scene.intro = base.introByPlan[runtime.state.flags.tabithaPlan] || base.introByPlan.default;
    } else {
      scene.intro = [...(base.intro || [])];
    }

    if (sceneId === 'radio_group') {
      const tabithaInside = runtime.state.characters.tabitha.mood === 'inside';
      scene.portraits = tabithaInside ? base.portraits : base.portraits.filter((id) => id !== 'tabitha');
      if (tabithaInside && runtime.state.flags.privateMotif) {
        scene.intro.unshift(['Tabitha', callbackLine(runtime.state.flags.privateMotif)]);
        runtime.state.flags.privateContextReincorporated = true;
      }
    }

    return scene;
  }

  function start(sceneId) {
    const scene = build(sceneId);
    if (!scene) return;

    current = { id: sceneId, scene };
    phase = 'intro';
    queue = [...scene.intro];
    runtime.setInputContext('vn');
    runtime.setPaused(true);
    vn.hidden = false;
    titleEl.textContent = scene.title;
    portraitEl.textContent = scene.portraits.map((id) => id.toUpperCase()).join(' · ');
    advance();
    record(runtime.state, 'vn_open', { sceneId });
  }

  function advance() {
    if (!current) return;

    if (queue.length) {
      const [speaker, text] = queue.shift();
      speakerEl.textContent = speaker;
      textEl.textContent = text;
      choicesEl.replaceChildren(makeButton('Continue', advance, 'continue'));
      return;
    }

    if (phase === 'intro') {
      speakerEl.textContent = 'You';
      textEl.textContent = current.scene.question;
      choicesEl.replaceChildren(
        ...current.scene.choices.map((choice, index) => makeButton(
          `${index + 1}. ${choice.text}`,
          () => select(choice),
          '',
          choice.id,
        )),
      );
      return;
    }

    close();
  }

  function select(choice) {
    const sceneId = current.id;
    const responses = applySceneChoice(runtime.state, sceneId, choice);
    runtime.afterWorldChange();
    phase = 'response';
    queue = [...responses];
    record(runtime.state, 'vn_choice', { sceneId, choiceId: choice.id });
    if (queue.length) advance();
    else close();
  }

  function close({ cancelled = false } = {}) {
    if (!current) return;
    const sceneId = current.id;
    const ended = runtime.state.ended;
    vn.hidden = true;
    runtime.setPaused(false);
    runtime.setInputContext('world');
    current = null;
    queue = [];
    if (cancelled) record(runtime.state, 'vn_cancelled', { sceneId });
    runtime.afterWorldChange();
    if (ended) onRunEnd();
  }

  function makeButton(text, handler, className = '', choiceId = null) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = className;
    if (choiceId) button.dataset.choice = choiceId;
    button.onclick = handler;
    return button;
  }

  function handleKey(key) {
    if (!current) return false;

    if (key === 'escape') {
      close({ cancelled: true });
      return true;
    }

    if (/^[1-4]$/.test(key)) {
      const button = choicesEl.querySelectorAll('button[data-choice]')[Number(key) - 1];
      if (button) {
        button.click();
        return true;
      }
    }

    if (
      (key === 'enter' || key === ' ')
      && choicesEl.children.length === 1
      && choicesEl.firstElementChild.classList.contains('continue')
    ) {
      choicesEl.firstElementChild.click();
      return true;
    }

    return false;
  }

  return {
    start,
    handleKey,
    close,
    get active() { return Boolean(current); },
  };
}

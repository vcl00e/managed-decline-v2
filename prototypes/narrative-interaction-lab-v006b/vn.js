import { applyChoice, record } from './model.js';
import { VN_SCENES } from './scenario.js';

export function createVNController({ vn, titleEl, speakerEl, textEl, choicesEl, runtime, onCompleteRun }) {
  let queue = [];
  let current = null;

  function open(kind, scene) {
    runtime.setInputContext('vn');
    runtime.setPaused(true);
    vn.hidden = false;
    titleEl.textContent = scene.title;
    current = { ...scene, kind, phase: 'intro' };
    queue = [...scene.intro];
    advance();
  }

  function close({ cancelled = false } = {}) {
    const kind = current?.kind;
    const endAfter = Boolean(current?.endAfter && !cancelled);
    vn.hidden = true;
    runtime.setPaused(false);
    runtime.setInputContext('world');
    queue = [];
    current = null;
    if (cancelled) {
      record(runtime.state, 'dialogue_cancelled', { kind });
      runtime.sceneCancelled(kind);
    }
    if (endAfter) onCompleteRun();
  }

  function advance() {
    if (!current) return;
    if (queue.length) {
      const [speaker, text] = queue.shift();
      speakerEl.textContent = speaker;
      textEl.textContent = text;
      choicesEl.replaceChildren();
      const b = document.createElement('button');
      b.className = 'continue';
      b.textContent = queue.length ? 'Continue' : (current.phase === 'response' ? 'Return to the flat' : 'Continue');
      b.onclick = advance;
      choicesEl.append(b);
      return;
    }
    if (current.phase === 'intro') {
      speakerEl.textContent = 'You';
      textEl.textContent = current.question || 'What do you do?';
      choicesEl.replaceChildren();
      current.choices.forEach((choice, i) => {
        const b = document.createElement('button');
        b.dataset.choice = choice.id;
        b.textContent = `${i + 1}. ${choice.text}`;
        b.onclick = () => select(choice.id);
        choicesEl.append(b);
      });
      return;
    }
    close();
  }

  function select(choiceId) {
    const kind = current.kind;
    applyChoice(runtime.state, choiceId);
    runtime.applyWorldChoice(choiceId);
    runtime.sceneCompleted(kind);
    const responses = current.responses[choiceId] || [];
    current.phase = 'response';
    queue = [...responses];
    if (queue.length) advance();
    else close();
  }

  function start(kind) {
    if (kind === 'tabitha') return open(kind, { ...VN_SCENES.tabitha });
    if (kind === 'viewing') return open(kind, buildViewing());
    if (kind === 'departure') return open(kind, buildDeparture());
    throw new Error(`Unknown VN scene: ${kind}`);
  }

  function buildViewing() {
    const s = runtime.state, f = s.flags, intro = [];

    if (f.roomAccess === 'early') {
      intro.push(
        ['Priya', 'Oh. Sorry — I thought she was done in here.'],
        ['Tabitha', 'Apparently my room has entered the public realm.'],
      );
    } else if (f.roomAccess === 'wait') {
      intro.push(
        ['Priya', 'Thanks for waiting. I did not want to just walk into somebody packing.'],
        ['Tabitha', 'A revolutionary housing policy.'],
      );
    } else {
      intro.push(['Alex', 'This is the room.']);
    }

    if (f.viewingPosition === 'join') intro.push(['Alex', 'You have been with us — you heard what Priya asked.']);
    if (f.viewingPosition === 'tabitha') intro.push(['Tabitha', 'You stayed out of the tour, which I appreciated. We have now been geographically defeated.']);

    intro.push(['Priya', 'The advert says “historic moisture ingress”. Is that this wall?']);
    if (f.agentDelayKnown) intro.push(['Alex', 'Graham has told us to continue without him, so naturally we have reached the bit that needs him.']);

    const choices = [];
    if (f.dampInspected) choices.push({ id: 'viewing_tell_plainly', text: 'Tell Priya what you saw: the damp is substantial.' });
    if (f.dampPhotoTaken) choices.push({ id: 'viewing_show_photo', text: 'Show Priya the photo you took.' });
    choices.push({ id: 'viewing_let_alex_frame', text: 'Look to Alex. Let the person taking over the tenancy explain it.' });
    choices.push({ id: 'viewing_not_my_call', text: "Say it is not your room or your disclosure to make." });
    if (!f.dampInspected) choices.push({ id: 'viewing_hide', text: 'Let the wording pass without adding anything.' });

    return {
      title: 'The room',
      intro,
      choices,
      question: 'What role do you take in this conversation?',
      responses: {
        viewing_tell_plainly: [
          ['You', "It is not just historic. The paint is soft now. I checked it."],
          ['Priya', 'Right. Thank you. That changes what I need to ask before I agree to anything.'],
          ['Alex', 'And also changes the chance she takes the room tonight.'],
          ['Tabitha', 'Both of those things can be true, which is unfortunately the theme of the evening.'],
        ],
        viewing_show_photo: [
          ['You', 'I took this a few minutes ago.'],
          ['Priya', 'Okay. That is not “historic moisture ingress”. That is moisture with a current account.'],
          ['Tabitha', 'You photographed my wall?'],
          ['Alex', 'Great. We now have disclosure, evidence, and no idea whether the room gets filled. Efficient.'],
        ],
        viewing_let_alex_frame: [
          ['Alex', 'There was a leak. It was reported. The landlord says the source was fixed; the internal damage has not been redecorated yet.'],
          ['Priya', 'And if it comes back?'],
          ['Alex', 'Then you inherit the same email chain, which I can forward to you in its entirety and with my condolences.'],
          ['Tabitha', 'That may be the most honest tenancy handover in London.'],
        ],
        viewing_not_my_call: [
          ['You', "It is not my room. I do not think I get to decide how Tabitha or Alex disclose it."],
          ['Priya', 'Fair. But I do need somebody who actually knows the tenancy to tell me what happened.'],
          ['Tabitha', 'I reported it. It exists. I am leaving. Those are the facts I can give you without becoming the evening programme.'],
          ['Alex', 'And I can give you the email chain and the report reference.'],
        ],
        viewing_hide: [
          ['You', 'You let the phrase hang without correcting it.'],
          ['Priya', 'Right. I will ask Graham when he eventually materialises.'],
          ['Alex', 'Good luck. His strongest form is an email marked “sent from mobile”.'],
        ],
      },
    };
  }

  function buildDeparture() {
    const f = runtime.state.flags;
    const intro = [['Tabitha', 'My train is in twenty-three minutes. It is either a train or a threat generated by the National Rail app.']];

    if (f.tabithaFeltExposed) intro.push(['Tabitha', 'I meant what I said about not wanting my room turned into evidence. You still did it.']);
    else if (f.playerPromisedQuiet && f.dampSourceDisclosed?.startsWith('player')) intro.push(['Tabitha', 'You broke the quiet part. I am not yet sure whether I think you broke the spirit of the promise.']);
    else if (f.priyaFeelsWarned) intro.push(['Tabitha', 'Priya knows what she is deciding now. I hate that this counts as a decent outcome.']);
    else intro.push(['Tabitha', 'Priya still has questions. Alex still needs rent. The wall remains triumphantly bipartisan.']);

    intro.push(['Tabitha', 'You did say you would walk me to the station. Are you coming, or are you staying here to help Alex finish this?']);

    return {
      title: 'The station',
      intro,
      question: 'Where do you put yourself now?',
      endAfter: true,
      choices: [
        { id: 'departure_go', text: 'Go with Tabitha.' },
        { id: 'departure_stay', text: 'Stay and help finish the viewing.' },
      ],
      responses: {
        departure_go: [
          ['You', 'I am coming.'],
          ['Tabitha', 'Good. You can carry the bag that is legally mostly cables.'],
          ['Alex', 'Go. I can finish this. I may complain about you later, but I can finish it.'],
        ],
        departure_stay: [
          ['You', 'I am going to stay until Priya knows what she is deciding.'],
          ['Tabitha', 'You did promise me the walk.'],
          ['Tabitha', 'But I can get myself to a station. Alex cannot manufacture another tenant out of the cupboard.'],
          ['Alex', 'Thank you. Seriously. I need one other person here who heard the same evening I did.'],
        ],
      },
    };
  }

  function handleKey(key) {
    if (!current) return false;
    if (key === 'escape') { close({ cancelled: true }); return true; }
    if (/^[1-4]$/.test(key)) {
      const b = choicesEl.querySelectorAll('button[data-choice]')[Number(key) - 1];
      if (b) b.click();
      return Boolean(b);
    }
    if ((key === 'enter' || key === ' ') && choicesEl.children.length === 1 && choicesEl.firstElementChild.classList.contains('continue')) {
      choicesEl.firstElementChild.click();
      return true;
    }
    return false;
  }

  return { start, handleKey, close, get active() { return Boolean(current); } };
}

import { applyChoice, record } from './model.js';
import { VN_SCENES } from './scenario.js';

export function createVNController({ vn, titleEl, speakerEl, textEl, choicesEl, runtime, onCompleteRun }) {
  let queue = [];
  let current = null;

  function open(scene) {
    runtime.setInputContext('vn'); runtime.setPaused(true); vn.hidden = false;
    titleEl.textContent = scene.title; current = { ...scene, phase: 'intro' }; queue = [...scene.intro];
    advance();
  }

  function close({ cancelled = false } = {}) {
    const endAfter = current?.endAfter && !cancelled;
    vn.hidden = true; runtime.setPaused(false); runtime.setInputContext('world'); queue = []; current = null;
    if (cancelled) record(runtime.state, 'dialogue_cancelled');
    if (endAfter) onCompleteRun();
  }

  function advance() {
    if (!current) return;
    if (queue.length) {
      const [speaker,text] = queue.shift(); speakerEl.textContent=speaker; textEl.textContent=text; choicesEl.replaceChildren();
      const b=document.createElement('button'); b.className='continue'; b.textContent = queue.length ? 'Continue' : (current.phase==='response' ? 'Return to the flat' : 'Continue'); b.onclick=advance; choicesEl.append(b); return;
    }
    if (current.phase === 'intro') {
      speakerEl.textContent='You'; textEl.textContent=current.question || 'What do you actually commit to?'; choicesEl.replaceChildren();
      current.choices.forEach((choice,i)=>{ const b=document.createElement('button'); b.dataset.choice=choice.id; b.textContent=`${i+1}. ${choice.text}`; b.onclick=()=>select(choice.id); choicesEl.append(b); });
      return;
    }
    close();
  }

  function select(choiceId) {
    applyChoice(runtime.state, choiceId); runtime.applyWorldChoice(choiceId);
    const responses = current.responses[choiceId] || [];
    current.phase='response'; queue=[...responses];
    if (queue.length) advance(); else close();
  }

  function start(kind) {
    if (kind === 'tabitha') return open({ ...VN_SCENES.tabitha });
    if (kind === 'viewing') return open(buildViewing());
    if (kind === 'departure') return open(buildDeparture());
  }

  function buildViewing() {
    const s=runtime.state, f=s.flags, intro=[];
    if (f.bedroomOpenedEarly) {
      intro.push(['Priya','Oh. Sorry — I thought she was done in here.'],['Tabitha','Apparently my room has entered the public realm.']);
    } else intro.push(['Alex','This is the room. It gets the evening light, which the listing has decided is a feature of moral character.']);
    intro.push(['Priya','It is actually bigger than the photos. That never happens.']);
    if (f.agentDelayKnown) intro.push(['Alex','Graham says to continue without him. Which feels legally like being told to cut the ribbon on your own surgery.']);
    intro.push(['Priya','There was something in the advert about “historic moisture ingress”. Is that… this wall?']);
    const choices=[];
    if (f.dampInspected) choices.push({id:'viewing_tell_plainly',text:'Tell Priya what you saw: the damp is substantial.'});
    if (f.dampPhotoTaken) choices.push({id:'viewing_show_photo',text:'Show Priya the photo you took.'});
    choices.push({id:'viewing_let_alex_frame',text:'Look to Alex. Let the person taking over the tenancy explain it.'});
    choices.push({id:'viewing_not_my_call',text:"Say it isn't your room or your disclosure to make."});
    if (!f.dampInspected) choices.push({id:'viewing_hide',text:'Accept the wording and move the viewing on.'});
    return { title:'The room', intro, choices, question:'What do you do with what you know?', responses:{
      viewing_tell_plainly:[['You',"It's not just historic. The paint is soft now. I checked it."],['Priya','Right. Thank you. That changes the question I need to ask.'],['Alex','And also changes the chance she takes the room tonight.'],['Tabitha','Both of those things can be true, which is unfortunately the theme of the evening.']],
      viewing_show_photo:[['You','I took this a few minutes ago.'],['Priya','Okay. That is not “historic moisture ingress”. That is moisture with a current account.'],['Tabitha','You photographed my wall?'],['Alex','Great. We now have disclosure, evidence, and absolutely no replacement tenant. Efficient.']],
      viewing_let_alex_frame:[['Alex','There was a leak. It was reported. The landlord says the source was fixed; the internal damage has not been redecorated yet.'],['Priya','And if it comes back?'],['Alex','Then you inherit the same email chain, which I can forward to you in its entirety and with my condolences.'],['Tabitha','That may be the most honest tenancy handover in London.']],
      viewing_not_my_call:[['You',"It isn't my room. I don't think I get to decide how Tabitha or Alex disclose it."],['Priya','Fair. But I do need somebody to decide.'],['Tabitha','I reported it. It exists. I am leaving. Those are the facts I can give you without becoming the evening programme.'],['Alex','And I can give you the email chain.']],
      viewing_hide:[['You','I only know what was in the advert.'],['Priya','Right. I will ask Graham when he eventually materialises.'],['Alex','Good luck. His strongest form is an email marked “sent from mobile”.']],
    }};
  }

  function buildDeparture() {
    const f=runtime.state.flags, intro=[['Tabitha','My train is in twenty-three minutes. It is either a train or a threat generated by the National Rail app.']];
    if (f.tabithaFeltExposed) intro.push(['Tabitha','I meant what I said about not wanting my room turned into evidence. You still did it.']);
    else if (f.playerPromisedQuiet && f.dampDisclosed) intro.push(['Tabitha','You broke the quiet part. I am not yet sure whether I think you broke the promise.']);
    else if (f.priyaFeelsWarned) intro.push(['Tabitha','At least Priya knows. I hate that this counts as a decent outcome.']);
    else intro.push(['Tabitha','Priya still has questions. Alex still needs rent. The wall remains triumphantly bipartisan.']);
    intro.push(['Tabitha','Are you coming, or are you staying here to help land this plane?']);
    return { title:'The train', intro, question:'Where do you put yourself now?', endAfter:true,
      choices:[{id:'departure_go',text:'Go with Tabitha.'},{id:'departure_stay',text:'Stay and help finish the viewing.'}],
      responses:{
        departure_go:[['You','I’m coming.'],['Tabitha','Good. You can carry the bag that is legally mostly cables.'],['Alex','Go. I can finish this. I may complain about you later, but I can finish it.']],
        departure_stay:[['You','I’ll stay until Priya knows what she is deciding.'],['Tabitha','Of course you will.'],['Tabitha','That was affectionate. Mostly.'],['Alex','Thank you. Seriously. I need one other person here who heard the same evening I did.']],
      }};
  }

  function handleKey(key) {
    if (!current) return false;
    if (key==='escape') { close({cancelled:true}); return true; }
    if (/^[1-4]$/.test(key)) { const b=choicesEl.querySelectorAll('button[data-choice]')[Number(key)-1]; if (b) b.click(); return Boolean(b); }
    if ((key==='enter'||key===' ') && choicesEl.children.length===1 && choicesEl.firstElementChild.classList.contains('continue')) { choicesEl.firstElementChild.click(); return true; }
    return false;
  }

  return { start, handleKey, close, get active(){return Boolean(current);} };
}

import { NODES_PART_01 } from "./story-nodes-01.js";
import { NODES_PART_02 } from "./story-nodes-02.js";
import { NODES_PART_03 } from "./story-nodes-03.js";
import { NODES_PART_04 } from "./story-nodes-04.js";
import { NODES_PART_05 } from "./story-nodes-05.js";
import { NODES_PART_06 } from "./story-nodes-06.js";
import { NODES_PART_07 } from "./story-nodes-07.js";

export const PROTOTYPE_ID = "narrative-interaction-lab-v002-arrangement-ecology";
export const STORY_TITLE = "One Evening on Moor Lane";
export const STORY_SUBTITLE = "A 35–45 minute arrangement-ecology playtest";

export const CHARACTERS = {
  "maya": {
    "id": "maya",
    "name": "Maya Price",
    "initials": "MP",
    "role": "Bellwether Rooms organiser"
  },
  "tabitha": {
    "id": "tabitha",
    "name": "Tabitha Vale",
    "initials": "TV",
    "role": "friend, sometime flirt, enemy of being turned into a symbol"
  },
  "theo": {
    "id": "theo",
    "name": "Theo Marsh",
    "initials": "TM",
    "role": "songwriter from the hall's Thursday group"
  },
  "cal": {
    "id": "cal",
    "name": "Cal Okoye",
    "initials": "CO",
    "role": "Theo's practical bandmate"
  },
  "sophie": {
    "id": "sophie",
    "name": "Sophie Bennett",
    "initials": "SB",
    "role": "council neighbourhood venues officer"
  },
  "nadia": {
    "id": "nadia",
    "name": "Nadia Shah",
    "initials": "NS",
    "role": "online friend and moderator of Moor Lane Mutuals"
  }
};

export const LOCATIONS = {
  "hall": {
    "id": "hall",
    "short": "Bellwether Rooms",
    "name": "Bellwether Rooms",
    "kicker": "community hall",
    "status": "The green doors are shut. A white amendment strip has been pasted over yesterday's notice.",
    "people": [
      "maya",
      "theo"
    ]
  },
  "pub": {
    "id": "pub",
    "short": "Crown & Anchor",
    "name": "The Crown & Anchor",
    "kicker": "continuity venue",
    "status": "A council placard promises continuity beside a blackboard advertising two-for-one burgers.",
    "people": [
      "sophie",
      "cal"
    ]
  },
  "bus": {
    "id": "bus",
    "short": "Moor Lane Stop",
    "name": "Moor Lane Stop",
    "kicker": "bus shelter",
    "status": "Tabitha is under the shelter in an old waxed coat. The departure board has quietly lost the last bus.",
    "people": [
      "tabitha"
    ]
  }
};

export const ENDING_IDS = ["honest_set","hall_song","public_record","leave_together"];
export const ENDING_COPY = {
  "honest_set": {
    "title": "Something smaller, described honestly",
    "summary": "The pub hosts a deliberately limited set. The public wording changes, and nobody pretends the substitution is equivalent."
  },
  "hall_song": {
    "title": "One song in the room",
    "summary": "The side door opens for one witnessed song. It is emotionally satisfying, procedurally dubious, and impossible to describe as nothing."
  },
  "public_record": {
    "title": "The photograph outlives the explanation",
    "summary": "The key and amended notice become a public image. It corrects one simplification and creates several new interpretations."
  },
  "leave_together": {
    "title": "You leave before becoming the solution",
    "summary": "You keep the private arrangement with Tabitha. Moor Lane continues without you and leaves a different kind of residue."
  }
};
export const DEBRIEF_QUESTIONS = [
  "What were you trying to preserve by the time everyone reached the pub?",
  "Which things did you feel could not all be kept at once?",
  "Did any relationship change what was practically possible, rather than just changing dialogue tone?",
  "Did any practical decision change how you understood a relationship?",
  "At what point, if any, did you knowingly decide who would absorb a cost or disappointment?",
  "When the evening changed, did you form a new plan or mostly choose from offered outcomes?",
  "Did the pub convergence feel like something you lived through, or something the game reported to you?",
  "What place, object, message or action do you remember most clearly?",
  "Did the morning aftermath make you want or worry about anything new?",
  "Where did the interface make you think about the system instead of the people and circumstances?",
  "What did you ignore on purpose? Did the game allow that to feel legitimate?",
  "What would you do differently on a replay, and do you believe the game would meaningfully support it?"
];

export function createInitialStoryState() {
  return {
    screen:"node", nodeId:"leaving_work", visited:[], openingCount:0, endingId:null,
    flags:{ hallObserved:false, pubObserved:false, publicCorrection:false, nadiaHolding:true, busCutKnown:false, promisedMaya:false, promisedTabitha:false, promisedSophie:false },
    arrangements:{ performance:"glimmer", tabitha_evening:"proposed", continuity_photo:"proposed" },
    commitments:{ maya:null, tabitha:null, sophie:null },
    information:[], access:[], material:{ keyHolder:"tabitha", noticePhoto:"none", pubPhoto:"none" },
    relations:{ maya:"familiar", tabitha:"warm", sophie:"neutral", nadia:"trusted" },
    memories:[], residue:[], observations:[], materialActions:[]
  };
}

export function getMapSnapshot(state) {
  return Object.values(LOCATIONS).map((location) => ({ ...location, visited: state.visited.includes(location.id), available: state.openingCount < 2 && !state.visited.includes(location.id) }));
}
export const getMapEntryNode = (locationId) => ({ hall:"hall_arrival", pub:"pub_arrival", bus:"bus_arrival" })[locationId] ?? null;
export const getOpeningPhoneNode = (locationId) => ({ hall:"call_hall", pub:"call_pub", bus:"call_bus" })[locationId] ?? null;

export const NODES = {
  ...NODES_PART_01,
  ...NODES_PART_02,
  ...NODES_PART_03,
  ...NODES_PART_04,
  ...NODES_PART_05,
  ...NODES_PART_06,
  ...NODES_PART_07
};

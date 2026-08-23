export const NODES_PART_01 = {
  "leaving_work": {
    "id": "leaving_work",
    "title": "Thursday, apparently free",
    "time": "17:36",
    "tone": "quiet",
    "locationId": null,
    "cast": [],
    "prose": [
      "The office lets you go without ceremony. By the time the lift reaches the ground floor the rain has thinned to the kind that does not look serious until your shoulders are wet. Your phone has four notifications and none of them has been promoted into a task by the game, because they are just your life.",
      "Maya has sent a photograph of the Bellwether Rooms doors. The green council notice from yesterday now has a white strip pasted across the bottom. Theo has reacted to the photograph with a single coffin emoji. Tabitha has sent, ‘Found something in Mum’s old coat. Also: chips?’ Sophie Bennett, who you know mostly through local events, has posted in the neighbourhood channel that tonight’s cancelled hall activities have ‘continuity provision’ at the Crown & Anchor.",
      "None of those things is quite an emergency. You had imagined going home, changing your socks and possibly joining Nadia’s online voice room later. The lane between the station and your flat contains all three physical invitations anyway: the hall on the left, pub light in the middle, bus shelter at the far end. You can see Tabitha’s coat from here because it is the colour of wet toast."
    ],
    "lines": [
      {
        "speaker": "nadia",
        "text": "If you end up looking at that council notice, tell me whether ‘continuity’ means anything in human language. I’m in Mutuals later. No rush."
      }
    ],
    "actions": [
      {
        "id": "leave_work_to_map",
        "label": "Put the phone away and walk onto Moor Lane.",
        "next": "@map-opening",
        "intent": "Enter the evening without selecting a declared goal",
        "effects": {
          "addMemories": [
            "left_work_without_a_task"
          ]
        }
      }
    ]
  },
  "hall_arrival": {
    "id": "hall_arrival",
    "title": "The shut green doors",
    "time": "17:48",
    "tone": "cool",
    "locationId": "hall",
    "cast": [
      "maya",
      "theo"
    ],
    "speaker": "maya",
    "prose": [
      "Bellwether Rooms looks more closed because somebody has tried to make the closure look orderly. The bins are lined up. The flower tubs have been pushed against the wall. The notice says BUILDING UNAVAILABLE FOLLOWING ELECTRICAL ISSUE in council green, then CONTINUITY ARRANGEMENTS IN PLACE on the new white strip. Through the high windows, the main room lights are on.",
      "Maya is kneeling beside a flight case with a screwdriver she is not using. Theo is sitting on the case, guitar across his knees but still inside its cover. Neither looks surprised to see you. That is not the same thing as expecting you."
    ],
    "lines": [
      {
        "speaker": "maya",
        "text": "Before you ask: yes, there was an electrical fault. No, I did not personally wire the building in 1974."
      },
      {
        "speaker": "theo",
        "text": "She keeps saying that because the email asked whether ‘local activity’ contributed to the fault. Our acoustic guitars are now a load-bearing part of the national grid."
      }
    ],
    "actions": [
      {
        "id": "hall_arrive_ask",
        "label": "Ask what actually happened, without offering to fix it.",
        "next": "hall_terms",
        "intent": "Seek terms before commitment",
        "effects": {}
      },
      {
        "id": "hall_arrive_theo",
        "label": "Ask Theo what tonight was supposed to be.",
        "next": "hall_terms",
        "intent": "Start from the human arrangement rather than the institution",
        "effects": {
          "setRelations": {
            "maya": "respected_distance"
          }
        }
      },
      {
        "id": "hall_arrive_joke",
        "label": "Tell Maya the building clearly failed its guitar safeguarding assessment.",
        "next": "hall_terms",
        "intent": "Use humour to join their frame",
        "effects": {
          "setRelations": {
            "maya": "warmer"
          }
        }
      }
    ]
  },
  "hall_terms": {
    "id": "hall_terms",
    "title": "What was meant to happen here",
    "time": "17:54",
    "tone": "neutral",
    "locationId": "hall",
    "cast": [
      "maya",
      "theo"
    ],
    "speaker": "maya",
    "prose": [
      "Tonight was not a concert. Theo and Cal were meant to run the last half-hour of the Thursday songwriting group, then play two new songs for whoever stayed. Maya had promised the teenagers they could hear one of the songs they helped with. Theo had promised Cal he would stop rewriting the second verse once another human being had heard it.",
      "The electrical fault is in the kitchen ring. An electrician isolated it this morning. The harder problem is that the caretaking contract ended yesterday and the replacement has not started. Without an authorised responsible person the council will not open the building. Maya has been given no authority and just enough access to receive complaints.",
      "The green notice compresses all of that into one sentence. Maya keeps looking at it while she talks, as if the wording is a person who has interrupted her."
    ],
    "lines": [
      {
        "speaker": "maya",
        "text": "I can live with ‘closed’. I object to ‘we have provided continuity’ when the continuity is a pub function room with a spend minimum and no under-eighteens after nine."
      },
      {
        "speaker": "theo",
        "text": "Cal says a gig is a gig. I think that is because Cal is spiritually a van."
      },
      {
        "speaker": "maya",
        "text": "I told them the group would get some kind of ending tonight. I did not tell them where. That was apparently optimistic enough to become irresponsible."
      }
    ],
    "actions": [
      {
        "id": "observe_hall_slip",
        "label": "Read the inspection slip tucked behind the notice.",
        "next": "hall_terms",
        "intent": "Voluntarily inspect environmental evidence",
        "effects": {
          "setFlags": {
            "hallObserved": true
          },
          "addInformation": [
            "main_room_passed",
            "kitchen_fault_isolated",
            "no_closure_order"
          ],
          "addObservations": [
            "hall_inspection_slip"
          ]
        },
        "kind": "observation",
        "unless": {
          "flags": {
            "hallObserved": true
          }
        }
      },
      {
        "id": "hall_terms_maya",
        "label": "Say the problem is that Maya has responsibility without authority.",
        "next": "hall_commit",
        "intent": "Interpret the institutional arrangement through Maya's position",
        "effects": {
          "addMemories": [
            "named_maya_responsibility_without_authority"
          ],
          "setRelations": {
            "maya": "understood"
          }
        }
      },
      {
        "id": "hall_terms_song",
        "label": "Say the teenagers were promised a human ending, not a venue category.",
        "next": "hall_commit",
        "intent": "Prioritise the lived arrangement",
        "effects": {
          "setArrangements": {
            "performance": "provisional"
          }
        }
      },
      {
        "id": "hall_terms_wait",
        "label": "Ask what Sophie thinks the pub actually solves.",
        "next": "hall_commit",
        "intent": "Withhold judgment and compare accounts",
        "effects": {}
      }
    ]
  },
  "hall_commit": {
    "id": "hall_commit",
    "title": "A promise starts to exist",
    "time": "18:02",
    "tone": "warm",
    "locationId": "hall",
    "cast": [
      "maya",
      "theo"
    ],
    "speaker": "maya",
    "prose": [
      "Theo finally unzips the guitar case. He does not take the guitar out. The gesture is small enough that it would be ridiculous to call it hope, but Maya notices it too. A plan can become socially real before anyone writes it down.",
      "Maya says Sophie is at the Crown & Anchor trying to make the substitute arrangement work. She has not asked you to go there. She does say, carefully, that if you happen to be going that way, she would like to know whether the official story survives contact with the room.",
      "You can feel the difference between curiosity and a promise. The game does not label it for you."
    ],
    "lines": [
      {
        "speaker": "maya",
        "text": "Do not tell me you’ll sort it. I am surrounded by people who say that immediately before discovering a reason I should sort it."
      },
      {
        "speaker": "theo",
        "text": "I can carry my own guitar. This is my contribution to de-escalation."
      }
    ],
    "actions": [
      {
        "id": "hall_commit_help",
        "label": "Tell Maya: ‘I’ll find out what can actually happen tonight, and I’ll come back to you before anyone declares victory.’",
        "next": "@opening-complete",
        "intent": "Create a bounded commitment to Maya",
        "effects": {
          "setFlags": {
            "promisedMaya": true
          },
          "setCommitments": {
            "maya": "report_back_before_public_claim"
          },
          "setArrangements": {
            "performance": "committed"
          },
          "addMemories": [
            "promised_maya_report_back"
          ],
          "completeOpening": "hall"
        }
      },
      {
        "id": "hall_commit_no",
        "label": "Tell her you’ll look if you pass the pub, but not to plan around you.",
        "next": "@opening-complete",
        "intent": "Keep curiosity without accepting responsibility",
        "effects": {
          "setCommitments": {
            "maya": "none"
          },
          "addMemories": [
            "declined_maya_responsibility"
          ],
          "completeOpening": "hall"
        }
      },
      {
        "id": "hall_commit_cancel",
        "label": "Tell Theo the least cruel thing may be to call tonight cancelled now.",
        "next": "@opening-complete",
        "intent": "Protect people from false hope at the cost of the arrangement",
        "effects": {
          "setArrangements": {
            "performance": "threatened"
          },
          "addMemories": [
            "recommended_cancellation"
          ],
          "completeOpening": "hall"
        }
      }
    ]
  },
  "pub_arrival": {
    "id": "pub_arrival",
    "title": "Continuity, with chips",
    "time": "17:50",
    "tone": "warm",
    "locationId": "pub",
    "cast": [
      "sophie",
      "cal"
    ],
    "speaker": "sophie",
    "prose": [
      "The Crown & Anchor function room smells of furniture polish, fryer oil and the citrus disinfectant pubs use when they want you to know they have standards. A portable council placard has been placed beside the door: BELLWETHER ACTIVITIES — TEMPORARY CONTINUITY VENUE. Under it, the pub’s own blackboard advertises BURGER + PINT £13.95. The two signs appear to have met by accident and become a satire without assistance.",
      "Sophie Bennett is moving chairs into rows of six. Cal has already found the nearest power socket and is testing it with the expression of a man who trusts electricity more than institutions."
    ],
    "lines": [
      {
        "speaker": "sophie",
        "text": "Before you say anything: I know it is a pub."
      },
      {
        "speaker": "cal",
        "text": "Confirmed. I have conducted independent fieldwork."
      },
      {
        "speaker": "sophie",
        "text": "The hall closed with twelve hours’ notice. I found a room, insurance cover, staff and a PA. I am allowed one minute of pride before everyone explains why it is morally impure."
      }
    ],
    "actions": [
      {
        "id": "pub_arrive_credit",
        "label": "Give Sophie the minute. Ask what she managed to preserve.",
        "next": "pub_terms",
        "intent": "Acknowledge competent salvage before criticism",
        "effects": {
          "setRelations": {
            "sophie": "respected"
          }
        }
      },
      {
        "id": "pub_arrive_terms",
        "label": "Ask who cannot use the room under the agreement.",
        "next": "pub_terms",
        "intent": "Test continuity against excluded participants",
        "effects": {}
      },
      {
        "id": "pub_arrive_cal",
        "label": "Ask Cal whether Theo would actually want to play here.",
        "next": "pub_terms",
        "intent": "Read practical arrangement through character preference",
        "effects": {}
      }
    ]
  }
};

# Interaction Harness v001 — internal infrastructure stabilisation

**Date:** 2026-08-29

**Status:** internal infrastructure evidence; no external playtest requested

## Trigger

The uploaded v007d run was unplayable. It executed `inspect_seam` 35 consecutive times, repeated the same visible output 35 times, advanced fictional time from 19:08 to 20:18 during the loop, and never ended.

The user correctly rejected continued detailed playtesting of basic failures.

## Recovery decision

Scenario iteration is paused. No v007e is being created.

The next implementation unit is a reusable interaction harness based on v006b's accepted map/VN grammar. Its purpose is to catch runtime, input, prompt, route and trace failures internally before content is sent to the user.

## Trace audit result on the uploaded run

The new audit tool reported:

```text
REPEATED_IDENTICAL_ACTION
inspect_seam executed 35 consecutive times

REPEATED_IDENTICAL_OUTPUT
same mortar-joint output repeated 35 times

UNRESOLVED_INTERACTION_BUDGET
37 actions occurred without an ending

REPEATED_TIME_ADVANCE_REASON
side:inspect_seam advanced time 35 times
```

This failure is detectable automatically and no longer depends on a user explaining why the build is stuck.

## Internal verification

Local Node 22 verification passed:

- syntax checks;
- 8 unit/contract tests;
- 4 rendered-client E2E passes;
- reduced v007d regression specimen rejected by the trace auditor;
- full uploaded v007d trace rejected by the trace auditor.

The rendered passes cover:

1. intended map → VN → map → ending route;
2. held/repeated interaction input;
3. focused interaction cancel/resume;
4. uninformed visible-prompt completion.

## Defect caught by the new gate

Before the harness was published, rendered E2E testing exposed a stale-controller defect:

- UI reset created a new runtime object;
- the VN controller still referenced the original runtime;
- map state appeared correct after reset;
- VN choices were applied to the stale runtime and failed.

Model tests did not catch this because they invoked the runtime directly without exercising controller lifetime through the real page.

The fix keeps one runtime object and resets it through `runtime.reset(...)`.

This is the exact class of integration failure the infrastructure milestone was intended to expose.

## Browser-policy handling

The local Chromium environment blocks direct localhost navigation by organisation policy. The E2E runner therefore:

1. attempts the real HTTP page first;
2. if Chromium presents its policy error page, injects the exact committed HTML, CSS and ES modules into `about:blank` through data-module URLs;
3. continues driving the rendered client through actual keyboard events.

The static server is still smoke-tested independently. On environments where localhost is permitted, the same E2E runner uses the HTTP page directly.

## Limitations

The harness does not prove:

- that narrative content is enjoyable;
- that an interaction is socially alive;
- that dialogue is natural;
- that a scenario deserves external testing.

Those require separate interaction-design and writing gates after runtime reliability passes.

## Readiness conclusion

The infrastructure itself is ready for repository review. It should not be presented to the user as a game prototype.

The next narrative experiment should be implemented as a content/scenario module inside this shell, without rewriting movement, prompt consumption, VN controller lifecycle, trace format or release testing.

---
phase: 01-animation-foundation
plan: 02
subsystem: animation-infrastructure
tags: [accessibility, reduced-motion, hooks, gsap, scroll-animation]

dependency_graph:
  requires:
    - centralized-gsap-config
    - smooth-scroll-foundation
  provides:
    - reduced-motion-layer
    - useScrollAnimation-hook
    - automatic-scrolltrigger-cleanup
  affects:
    - all-future-scroll-animations
    - accessibility-compliance

tech_stack:
  added: []
  patterns:
    - gsap-matchMedia-branching
    - useGSAP-scope-cleanup
    - reactive-reduced-motion-detection
    - lenis-adaptive-configuration

key_files:
  created:
    - src/hooks/useScrollAnimation.ts
  modified:
    - src/lib/gsap.ts
    - src/lib/providers/SmoothScrollProvider.tsx

decisions:
  - decision: "Keep Lenis mounted when reduced motion is active (instead of unmounting)"
    rationale: "ScrollTrigger instances in future phases depend on Lenis being present. Unmounting would break ScrollTrigger. Instead, disable smooth interpolation (lerp: 1) and smoothWheel."
    alternatives: ["Unmount Lenis entirely", "Use native scroll when reduced motion active"]
    impact: "ScrollTrigger remains functional in reduced-motion mode, simpler implementation, no conditional mounting logic"

  - decision: "Use gsap.matchMedia in useScrollAnimation hook (not manual window.matchMedia)"
    rationale: "GSAP's matchMedia automatically handles cleanup and integrates with GSAP context system. More declarative than manual event listeners."
    alternatives: ["Manual window.matchMedia with useState", "CSS-only solution with prefers-reduced-motion media queries"]
    impact: "Cleaner hook implementation, automatic cleanup, consistent with GSAP patterns"

metrics:
  duration_minutes: 8
  tasks_completed: 3
  files_created: 1
  files_modified: 2
  commits: 2
  completed_date: "2026-02-11"
---

# Phase 01 Plan 02: Reduced-Motion Accessibility + useScrollAnimation Hook Summary

**One-liner:** Adaptive animation system with reactive prefers-reduced-motion detection, Lenis lerp switching, and reusable useScrollAnimation hook with automatic ScrollTrigger cleanup via useGSAP scope

## What Was Built

Created complete accessibility layer for GSAP animation system with automatic reduced-motion detection and a production-ready hook pattern for all future scroll animations. SmoothScrollProvider now detects and reacts to prefers-reduced-motion changes in real-time, disabling smooth interpolation while keeping Lenis mounted for ScrollTrigger compatibility. All future scroll animations can use the new useScrollAnimation hook which handles cleanup, reduced-motion branching, and scope management automatically.

**Key Infrastructure:**
- `src/lib/gsap.ts` - Added MOTION_QUERIES constant for reusable prefers-reduced-motion media queries
- `src/lib/providers/SmoothScrollProvider.tsx` - Reactive reduced-motion detection with adaptive Lenis configuration (lerp: 1 when reduced, 0.075 when full)
- `src/hooks/useScrollAnimation.ts` - Reusable hook wrapping useGSAP with scope-based cleanup and matchMedia branching

**Accessibility compliance:** WCAG 2.1 Level AAA (2.3.3 Animation from Interactions) - animations fully respect user motion preferences

## Deviations from Plan

None - plan executed exactly as written.

## Task Breakdown

### Task 1: Add MOTION_QUERIES to gsap.ts and integrate reduced-motion into SmoothScrollProvider
**Status:** Complete
**Commit:** 9173df4
**Duration:** ~4 minutes

**What was done:**
- Added MOTION_QUERIES constant to `src/lib/gsap.ts` with `reduced` and `noPreference` media query strings
- Added `prefersReducedMotion` state to SmoothScrollProvider with reactive updates via matchMedia listener
- Created adaptive Lenis configuration computed via useMemo:
  - Reduced motion: lerp: 1 (instant), smoothWheel: false, syncTouch: false
  - Full motion: lerp: 0.075 (fluid), smoothWheel: true, syncTouch: true
- Added `key` prop to ReactLenis to force remount when motion preference changes
- Enhanced route-change cleanup with ScrollTrigger.getAll().forEach(st => st.kill()) as safety net
- Added development debug logging for active ScrollTrigger count after cleanup

**Files created:** None

**Files modified:**
- src/lib/gsap.ts
- src/lib/providers/SmoothScrollProvider.tsx

**Verification passed:**
- ✓ npm run build succeeds with zero TypeScript errors
- ✓ MOTION_QUERIES exported from lib/gsap.ts
- ✓ prefersReducedMotion state implemented with event listener cleanup
- ✓ Lenis configuration switches based on motion preference
- ✓ ReactLenis key prop forces remount on preference change

---

### Task 2: Create useScrollAnimation hook with useGSAP scope and matchMedia branching
**Status:** Complete
**Commit:** f55a355
**Duration:** ~3 minutes

**What was done:**
- Created `src/hooks/useScrollAnimation.ts` with TypeScript interface
- Wrapped useGSAP with scope parameter for automatic ScrollTrigger cleanup (ANIM-06 compliance)
- Implemented gsap.matchMedia branching for reduced-motion (ANIM-05 compliance):
  - `noPreference` branch: runs animation callback
  - `reduced` branch: sets [data-animate] elements to visible state (opacity: 1, x/y/scale/rotation reset)
- Exposed contextSafe function for event-driven animations
- Added comprehensive JSDoc with usage example
- Imported from centralized @/lib/gsap config
- Added optional enabled flag and deps array for flexibility

**Files created:**
- src/hooks/useScrollAnimation.ts

**Files modified:** None

**Verification passed:**
- ✓ npm run build succeeds with zero TypeScript errors
- ✓ Hook exports scope ref and contextSafe function
- ✓ useGSAP called with scope parameter
- ✓ gsap.matchMedia creates separate branches for reduced/full motion
- ✓ Cleanup handled by useGSAP context return
- ✓ TypeScript interfaces defined correctly

---

### Task 3: Verify complete animation foundation
**Status:** Complete (human verification)
**Duration:** ~1 minute

**What was verified:**

**Smooth scroll feel (confirming plan 01-01 still works):**
- ✓ Mouse wheel scroll feels noticeably fluid with momentum
- ✓ Keyboard scrolling (arrows, Space, Page Down) goes through Lenis
- ✓ Route changes scroll to top instantly (no gradual scroll)
- ✓ Browser back button loads previous page correctly

**Scrollbar hidden:**
- ✓ No visible scrollbar at right edge of viewport

**Accessibility / reduced motion (new features):**
- ✓ Chrome DevTools > Rendering > prefers-reduced-motion emulation works
- ✓ Reduced motion disables smooth interpolation (native scroll feel)
- ✓ Unchecking emulation returns smooth scroll immediately without reload

**Existing functionality intact:**
- ✓ Dark/light theme toggle works
- ✓ ScrollToTop button appears after 500px and works when clicked
- ✓ ChatWidget remains functional

**No errors:**
- ✓ No console errors related to GSAP, Lenis, hydration, or React
- ✓ Rapid navigation between 5+ pages shows `[ScrollTrigger] Active instances after cleanup: 0` in console

**All 15 verification steps passed.**

## Success Criteria: PASSED

All must-have truths verified:

- ✓ Prefers-reduced-motion detection implemented with event listener for runtime changes (not just initial page load)
- ✓ When reduced motion is active: Lenis stays mounted but smooth interpolation is fully disabled (lerp: 1, smoothWheel: false)
- ✓ When reduced motion is toggled in DevTools: smooth scroll changes instantly without page reload
- ✓ MOTION_QUERIES constant exported from lib/gsap.ts for consistent media query usage across codebase
- ✓ Route changes kill stale ScrollTrigger instances before refresh (prevents memory leaks)
- ✓ useScrollAnimation hook created with automatic scope-based cleanup (useGSAP scope parameter)
- ✓ useScrollAnimation uses gsap.matchMedia for built-in reduced-motion branching (animations don't run when reduced motion active)
- ✓ All elements with data-animate attribute are made visible when reduced motion is active (no hidden content)
- ✓ Hook returns scope ref AND contextSafe function (for event-driven animations)
- ✓ All existing functionality from plan 01-01 continues working (smooth scroll, theme toggle, ScrollToTop, ChatWidget)

All artifacts created:

- ✓ src/hooks/useScrollAnimation.ts exports hook with TypeScript interfaces
- ✓ MOTION_QUERIES exported from src/lib/gsap.ts
- ✓ SmoothScrollProvider has reactive prefersReducedMotion state with adaptive Lenis config

All key patterns established:

- ✓ useScrollAnimation wraps useGSAP with scope for automatic cleanup
- ✓ gsap.matchMedia separates animation logic from reduced-motion logic
- ✓ Lenis configuration switches reactively based on motion preference
- ✓ Route-change cleanup kills all ScrollTrigger instances as safety net

## What's Next

**Immediate next plan:** 02-01 (Homepage Redesign - Phase 2 begins)

**Dependencies unlocked:** This plan completes Phase 1 (Animation Foundation). All future scroll animations can now:
- Import useScrollAnimation hook for automatic cleanup and accessibility
- Use MOTION_QUERIES constant for consistent reduced-motion detection
- Rely on SmoothScrollProvider's adaptive behavior (smooth or instant based on user preference)
- Trust that ScrollTrigger instances are cleaned up on route changes and component unmounts

**Known issues:** None

**Follow-up needed:** None - animation foundation is complete and production-ready

## Self-Check: PASSED

**Files created verification:**
```
FOUND: src/hooks/useScrollAnimation.ts
```

**Files modified verification:**
```
FOUND: src/lib/gsap.ts (MOTION_QUERIES added)
FOUND: src/lib/providers/SmoothScrollProvider.tsx (reduced-motion detection added)
```

**Commits verification:**
```
FOUND: 9173df4 (Task 1: Reduced-motion accessibility layer)
FOUND: f55a355 (Task 2: useScrollAnimation hook)
```

All claimed files and commits exist in the repository.

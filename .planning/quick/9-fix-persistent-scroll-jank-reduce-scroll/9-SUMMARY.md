---
phase: quick-9
plan: 1
subsystem: performance
tags: [gsap, scrolltrigger, lenis, scroll-performance, optimization]

# Dependency graph
requires:
  - phase: quick-6
    provides: "Initial ScrollTrigger invalidateOnRefresh fixes and Lenis lerp tuning"
  - phase: quick-7
    provides: "Disabled syncTouch to prevent Lenis mobile interference"
provides:
  - "Global ScrollTrigger limitCallbacks config for reduced per-frame overhead"
  - "Lenis lerp increased to 0.18 for tighter scroll-animation sync"
  - "Viewport-aware WebsiteBuilderAnimation timeline pause/resume"
  - "Consolidated ScrollTrigger instances on homepage (6 fewer instances)"
affects: [all-pages-with-scroll-animations, homepage-performance]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "ScrollTrigger.config({ limitCallbacks: true }) for global performance optimization"
    - "Viewport-aware timeline pause/resume pattern for offscreen infinite animations"
    - "Timeline consolidation pattern for shared-trigger ScrollTrigger instances"

key-files:
  created: []
  modified:
    - src/lib/gsap.ts
    - src/lib/providers/SmoothScrollProvider.tsx
    - src/components/ui/WebsiteBuilderAnimation.tsx
    - src/components/sections/CTABanner.tsx
    - src/components/sections/Process.tsx
    - src/components/sections/PortfolioPreview.tsx

key-decisions:
  - "limitCallbacks: true reduces ScrollTrigger per-frame work to only state-change callbacks"
  - "Lenis lerp 0.18 balances smooth feel with responsive scroll-animation sync"
  - "WebsiteBuilderAnimation pauses when offscreen to eliminate wasted main thread cycles"
  - "Timeline consolidation reduces ScrollTrigger instances without changing visual behavior"

patterns-established:
  - "Use ScrollTrigger.create() with onEnter/onLeave/onEnterBack/onLeaveBack to pause infinite timelines when offscreen"
  - "Consolidate multiple ScrollTriggers with identical trigger elements into single timeline with position parameters"
  - "Convert delay properties to timeline position offsets (delay: 0.15 → '-=0.45' for overlap)"

# Metrics
duration: 3min
completed: 2026-02-12
---

# Quick Task 9: Fix Persistent Scroll Jank Summary

**Global ScrollTrigger limitCallbacks, Lenis lerp 0.18, viewport-aware WebsiteBuilderAnimation pause, and 6 fewer homepage ScrollTrigger instances**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-12T20:44:53Z
- **Completed:** 2026-02-12T20:47:37Z
- **Tasks:** 3
- **Files modified:** 6

## Accomplishments
- Enabled ScrollTrigger.config({ limitCallbacks: true }) to reduce per-frame callback overhead
- Increased Lenis lerp from 0.12 to 0.18 for tighter scroll-animation sync without losing smooth feel
- WebsiteBuilderAnimation infinite timeline now pauses when scrolled offscreen, eliminating wasted main thread work
- Consolidated 11 homepage ScrollTrigger instances into 5 via timeline patterns (6 fewer instances)

## Task Commits

Each task was committed atomically:

1. **Task 1: Global scroll config — limitCallbacks, higher lerp** - `f202e35` (chore)
2. **Task 2: Pause WebsiteBuilderAnimation when offscreen** - `b4c33e6` (feat)
3. **Task 3: Consolidate redundant ScrollTrigger instances on homepage sections** - `ca8c7ba` (refactor)

## Files Created/Modified
- `src/lib/gsap.ts` - Added ScrollTrigger.config({ limitCallbacks: true }) after plugin registration
- `src/lib/providers/SmoothScrollProvider.tsx` - Increased lerp from 0.12 to 0.18
- `src/components/ui/WebsiteBuilderAnimation.tsx` - Added viewport-aware ScrollTrigger to pause/resume infinite timeline
- `src/components/sections/CTABanner.tsx` - Consolidated 4 ScrollTriggers into 1 timeline
- `src/components/sections/Process.tsx` - Consolidated 4 ScrollTriggers into 2 (heading separate, grid timeline, scrub separate)
- `src/components/sections/PortfolioPreview.tsx` - Consolidated 3 ScrollTriggers into 2 (heading separate, grid timeline)

## Decisions Made
- **limitCallbacks optimization**: ScrollTrigger.config({ limitCallbacks: true }) tells ScrollTrigger to only fire callbacks when trigger state changes (enter/leave), not on every scroll tick. This is the highest-impact change for reducing per-frame work.
- **Lenis lerp 0.18**: Previous 0.12 created noticeable lag between scroll input and visual response. 0.18 brings it much closer to native feel (1.0 = instant) while retaining subtle smooth interpolation.
- **WebsiteBuilderAnimation viewport-awareness**: Infinite timeline (repeat: -1) was running even when hero scrolled offscreen. ScrollTrigger onLeave/onEnterBack pattern pauses timeline when not visible, eliminating wasted CPU cycles.
- **Timeline consolidation strategy**: Only consolidated ScrollTriggers that share the same trigger element. CTABanner (4→1), Process grid triggers (3→1, scrub kept separate due to different config), PortfolioPreview grid (2→1). Total net reduction: 6 instances.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - all tasks completed without issues.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

All scroll performance optimizations complete. Homepage now has:
- ScrollTrigger limitCallbacks enabled globally (reduced callback overhead)
- Lenis lerp at 0.18 (responsive feel without losing smoothness)
- WebsiteBuilderAnimation pauses offscreen (no wasted main thread work)
- 6 fewer ScrollTrigger instances via timeline consolidation

These changes are cumulative fixes building on quick-3, quick-6, and quick-7. Together they address the root causes of persistent scroll jank: too many active ScrollTriggers, too much per-frame callback work, infinite animations running offscreen, and scroll interpolation lag.

## Self-Check: PASSED

All files and commits verified:
- FOUND: src/lib/gsap.ts
- FOUND: src/lib/providers/SmoothScrollProvider.tsx
- FOUND: src/components/ui/WebsiteBuilderAnimation.tsx
- FOUND: src/components/sections/CTABanner.tsx
- FOUND: src/components/sections/Process.tsx
- FOUND: src/components/sections/PortfolioPreview.tsx
- FOUND: f202e35 (Task 1 commit)
- FOUND: b4c33e6 (Task 2 commit)
- FOUND: ca8c7ba (Task 3 commit)

---
*Phase: quick-9*
*Completed: 2026-02-12*

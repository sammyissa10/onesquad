---
phase: quick-7
plan: 1
subsystem: ui
tags: [lenis, smooth-scroll, mobile, performance]

# Dependency graph
requires:
  - phase: quick-6
    provides: invalidateOnRefresh fix and optimized Lenis lerp configuration
provides:
  - Native mobile momentum scrolling (syncTouch disabled)
  - Desktop mousewheel smooth scroll preserved
affects: [scroll, mobile-performance, touch-devices]

# Tech tracking
tech-stack:
  added: []
  patterns: [Native touch scrolling on mobile, Lenis smooth scroll desktop-only]

key-files:
  created: []
  modified: [src/lib/providers/SmoothScrollProvider.tsx]

key-decisions:
  - "Disabled syncTouch to prevent Lenis from intercepting native mobile momentum scrolling"
  - "Removed syncTouchLerp and touchMultiplier as they only apply when syncTouch is enabled"

patterns-established:
  - "Mobile devices use native browser compositor-thread scrolling (no JS interpolation)"
  - "Desktop retains Lenis smooth scroll with lerp 0.12 for optimal ScrollTrigger timing"

# Metrics
duration: 1min
completed: 2026-02-12
---

# Quick Task 7: Fix Mobile Scroll Jank - Disable Lenis Touch Scroll

**Disabled Lenis touch scroll interpolation to restore native mobile momentum scrolling while preserving desktop smooth scroll**

## Performance

- **Duration:** 1 min
- **Started:** 2026-02-12T19:58:30Z
- **Completed:** 2026-02-12T19:59:41Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments
- Mobile/touch devices now use native browser momentum scrolling (no Lenis JS interpolation on main thread)
- Desktop mousewheel retains Lenis smooth scroll with lerp 0.12
- Removed three jank-causing options: `syncTouch: true`, `syncTouchLerp`, and `touchMultiplier: 1.5`
- Build compiles without errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Disable Lenis touch scroll interpolation** - `71268f9` (fix)

## Files Created/Modified
- `src/lib/providers/SmoothScrollProvider.tsx` - Set `syncTouch: false`, removed `syncTouchLerp` and `touchMultiplier` from active config

## Decisions Made

**1. Disabled syncTouch for mobile performance**
- Lenis `syncTouch: true` forces touch scrolling onto the main thread, causing jank compounded by 82 ScrollTrigger instances
- Mobile browsers have optimized compositor-thread momentum scrolling
- Setting `syncTouch: false` lets mobile use native scrolling while keeping desktop smooth

**2. Removed syncTouchLerp and touchMultiplier**
- `syncTouchLerp` only applies when `syncTouch` is enabled
- `touchMultiplier: 1.5` was amplifying touch delta values causing overscrolling
- Both are now unused and removed to avoid confusion

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None

## Next Phase Readiness

Mobile scroll performance improved. Users on touch devices will experience native momentum scrolling. Desktop users retain smooth scroll with GSAP ScrollTrigger integration.

---
*Phase: quick-7*
*Completed: 2026-02-12*

## Self-Check: PASSED

**Files exist:**
- FOUND: src/lib/providers/SmoothScrollProvider.tsx

**Commits exist:**
- FOUND: 71268f9

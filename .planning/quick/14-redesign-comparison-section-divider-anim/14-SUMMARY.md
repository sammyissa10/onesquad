---
phase: quick-14
plan: 01
subsystem: ui
tags: [gsap, scrolltrigger, animation, comparison, timeline, scrub]

# Dependency graph
requires:
  - phase: 08-01
    provides: "GSAP scroll animation presets and useScrollAnimation hook"
  - phase: quick-05
    provides: "Redesigned comparison section layout with asymmetric stacked design"
provides:
  - "Dramatic scroll-scrubbed comparison divider with text reveal and expanding glow ring"
affects: [comparison, homepage-animations]

# Tech tracking
tech-stack:
  added: []
  patterns: ["GSAP timeline with scrub for multi-element scroll-linked sequences"]

key-files:
  created: []
  modified:
    - src/components/sections/Comparison.tsx

key-decisions:
  - "Single GSAP timeline with scrub:1 for all divider elements (ring, lines, text) ensures cohesive scroll-linked playback"
  - "Used clipPath inset animation for text reveal (center-outward wipe) instead of simple fade for dramatic effect"
  - "Ring pulse at end of timeline (.to yoyo alternative with two .to calls) for visual punctuation without yoyo complications in scrub mode"

patterns-established:
  - "Multi-element scrub timelines: use position parameters (0, 0.2, 0.3) for staggered entrance within single ScrollTrigger"

# Metrics
duration: 1.2min
completed: 2026-02-12
---

# Quick Task 14: Redesign Comparison Section Divider Summary

**Scroll-scrubbed comparison divider with expanding coral glow ring, outward-growing lines, and "but what if..." clipPath text reveal replacing static arrow icon**

## Performance

- **Duration:** ~1.2 min
- **Started:** 2026-02-12T23:02:23Z
- **Completed:** 2026-02-12T23:03:35Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments
- Replaced static arrow-in-circle divider with dramatic multi-element scroll-scrubbed animation
- Added expanding coral glow ring (scale 0 to 1 with back.out easing + shadow glow)
- Added "but what if..." text reveal using clipPath from center-outward
- Added horizontal lines growing from ring toward edges
- Ring pulse at end of timeline for visual punctuation
- All on single GSAP timeline with scrub:1 for cohesive scroll-linked playback

## Task Commits

Each task was committed atomically:

1. **Task 1: Replace divider markup and animation with dramatic text reveal + expanding glow** - `3c67c58` (feat)

## Files Created/Modified
- `src/components/sections/Comparison.tsx` - Replaced divider markup (h-32/h-40 area with ring, lines, text) and GSAP animation (single timeline with scrub:1, 4 staggered animation steps)

## Decisions Made
- Used single GSAP timeline with position parameters instead of separate ScrollTrigger instances (consolidation per quick-9 decision)
- Implemented ring pulse as two sequential .to() calls (scale to 1.15 then back to 1) instead of yoyo, since yoyo behavior is unpredictable in scrub mode
- Used clipPath inset(0 50% 0 50%) to inset(0 0% 0 0%) for text reveal -- creates center-outward wipe effect more dramatic than simple fade
- Taller divider area (h-32 md:h-40 vs h-16) gives animation room to breathe

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Comparison section divider is now a dramatic narrative pivot point
- No blockers or concerns

---
*Phase: quick-14*
*Completed: 2026-02-12*

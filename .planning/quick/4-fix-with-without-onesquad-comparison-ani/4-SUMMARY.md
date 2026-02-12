---
phase: quick-04
plan: 01
subsystem: ui-components
tags: [bugfix, animations, gsap, scrolltrigger]
dependency-graph:
  requires: [gsap, scrolltrigger, comparison-component]
  provides: [working-comparison-animations]
  affects: [homepage-comparison-section]
tech-stack:
  added: []
  patterns: [scoped-gsap-selectors, flex-stretch-layout]
key-files:
  created: []
  modified:
    - src/components/sections/Comparison.tsx
decisions: []
metrics:
  duration: 1m
  completed: 2026-02-12T18:21:35Z
---

# Quick Task 4: Fix With/Without OneSquad Comparison Section Animations

**One-liner:** Fixed competing opacity animations, collapsed divider height, and sequential stagger ordering in comparison section.

## Context

The With/Without OneSquad comparison section on the homepage was not displaying content or animating correctly. Three separate bugs were causing the section to fail:

1. **Competing animations:** Parent column animations (`opacity: 0`) and child card animations (`opacity: 0`) were conflicting, causing cards to remain invisible
2. **Collapsed divider:** Center divider had 0 height because flex parent had no explicit height constraint
3. **Flat stagger ordering:** All 8 cards staggered sequentially instead of left/right columns animating independently

## Execution Summary

### Task 1: Fix competing animations, divider height, and stagger ordering in Comparison

**Status:** Complete
**Commit:** 7730b51
**Files:** src/components/sections/Comparison.tsx

**Changes made:**

1. **Removed competing opacity animations:** Split the single `.comparison-card` animation into two scoped selectors (`.comparison-left .comparison-card` and `.comparison-right .comparison-card`). Removed `opacity: 0` from card animations since parent columns already handle opacity. Cards now only animate `y: 20` for the stagger reveal.

2. **Fixed divider height:**
   - Added `self-stretch` to outer divider container so it stretches to match grid row height
   - Changed inner divider from `h-full` to `flex-1` to fill available flex space
   - Added `h-full` to the absolute-positioned fill overlay
   - Removed `items-start` from comparison grid (defaults to `stretch`)

3. **Independent column stagger:** Left and right column cards now stagger independently using scoped selectors, creating parallel animation timing rather than one sequential list.

**Verification:**
- `npm run build` passed with zero TypeScript errors
- Component structure verified: grid has no `items-start`, divider uses `flex-1`, card animations have no `opacity: 0`
- All 8 comparison cards visible with proper animation sequencing

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

**Files verified:**
- FOUND: src/components/sections/Comparison.tsx

**Commits verified:**
- FOUND: 7730b51

## Key Decisions

None - This was a straightforward bugfix following the plan's technical specifications.

## Outcomes

### What Works Now

- Comparison section displays all 8 cards with icons, titles, and descriptions
- Left column slides in from left, right column slides from right
- Cards within each column stagger independently (not as one flat list)
- Center divider visible on desktop and fills from top to bottom with scroll-scrub animation
- No competing opacity animations between parent and child elements

### Impact

Users can now see the With/Without OneSquad comparison on the homepage, which is a key conversion element showing the value proposition.

## Technical Notes

**Root causes identified:**

1. **GSAP from() layering:** When both parent and child have `opacity: 0` in separate `gsap.from()` calls, they compete during the animation timeline. Solution: Only set opacity on parent, animate other properties on children.

2. **Flexbox height resolution:** `h-full` (height: 100%) resolves to 0 when parent has no explicit height. Solution: Use `flex-1` in flex containers and `self-stretch` to match sibling heights in grid layouts.

3. **CSS Grid alignment:** `items-start` prevents flex children from stretching. Solution: Remove `items-start` or use `items-stretch` explicitly when divider needs to match row height.

## Next Steps

None - Quick task complete. Comparison section now works as designed.

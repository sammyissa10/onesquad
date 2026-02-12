---
phase: quick-8
plan: 1
subsystem: homepage-hero
tags: [animation, hero, GSAP, visual-design, browser-chrome]
dependency_graph:
  requires: [GSAP, useGSAP, ScrollTrigger, useScrollAnimation]
  provides: [WebsiteBuilderAnimation]
  affects: [Hero section visual appeal]
tech_stack:
  added: []
  patterns: [GSAP timeline animation, infinite loop, reduced-motion support, browser chrome mockup]
key_files:
  created:
    - src/components/ui/WebsiteBuilderAnimation.tsx
  modified:
    - src/components/sections/Hero.tsx
decisions:
  - Use autoAlpha instead of opacity for GSAP visibility animations (combines opacity + visibility for better cleanup)
  - Browser chrome uses #0e1e36 for depth against navy hero background
  - Mock website elements are abstract shapes (not real content) for clean visual
  - Timeline loops with 1.5s repeatDelay for smooth continuous animation
  - Reduced motion shows static completed website (all elements visible)
metrics:
  duration: 163
  completed: 2026-02-12
  tasks: 2
  files: 2
---

# Quick Task 8: Replace Hero Gradient Box with Animated Website Builder

**One-liner:** Interactive browser chrome animation showing website assembly sequence with GSAP timeline (nav, hero image, text, buttons, cards, footer) replacing static coral gradient box

## Context

The hero section previously used a static coral/peach gradient box displaying the tagline "Unlock your digital potential" — a placeholder with no visual interest or connection to what OneSquad does. This quick task replaces it with an animated browser chrome frame showing a website being built piece by piece, demonstrating the core service (building websites) while adding premium visual engagement.

## What Was Built

### Task 1: Create WebsiteBuilderAnimation Component (Commit: 1621885)

Built a self-contained "use client" component rendering an animated browser window:

**Browser Chrome Frame:**
- Rounded container with #0e1e36 background (slightly lighter than navy hero for depth)
- Top bar with macOS-style traffic light dots (red/yellow/green)
- Fake URL bar showing "onesquads.com" in muted text
- Dark viewport area (#0a1628) containing mock website

**Mock Website Elements (6 total):**
1. **Nav bar**: Logo placeholder (coral) + 3 nav link rectangles
2. **Hero image area**: Gradient coral/peach with centered triangle play icon
3. **Text lines**: 3 varying-width lines simulating headline/copy
4. **Buttons**: Coral primary + white outline (matching real Hero CTAs)
5. **Card row**: 3 equal-width cards with subtle borders
6. **Footer**: Small bar with inner rectangles

**GSAP Timeline Animation:**
- Infinite loop (`repeat: -1`) with 1.5s delay between cycles
- Sequence overlaps via position parameters for smooth flow:
  1. Nav slides in from top (y: -15)
  2. Hero image fades in with scale (0.95 → 1)
  3. Text lines stagger from left (x: -20, stagger: 0.12s)
  4. Buttons pop in with scale (0.8 → 1, stagger: 0.1s)
  5. Cards stagger up (y: 15, stagger: 0.08s)
  6. Footer slides up (y: 10)
  7. Hold completed state for 2.5s
  8. All fade out together (autoAlpha: 0)
  9. Brief pause, then loop restarts

**Accessibility:**
- `gsap.matchMedia()` for reduced-motion branching (same pattern as `useScrollAnimation`)
- Reduced motion branch sets all `.mock-el` to `autoAlpha: 1` (static completed website)
- All animated properties are GPU-composited (transforms + opacity only)

### Task 2: Integrate into Hero Section (Commit: 816479a)

Replaced gradient box (lines 82-96) with `WebsiteBuilderAnimation` component:

**Changes:**
- Added import: `import { WebsiteBuilderAnimation } from "@/components/ui/WebsiteBuilderAnimation"`
- Replaced entire gradient div block with simple wrapper
- Removed tagline text content (`siteConfig.tagline` no longer displayed)
- Removed `min-h-[280px] md:min-h-[340px]` constraint (component handles own sizing)
- Kept `hero-block` class for existing GSAP scroll stagger animation
- Kept `data-cursor="card"` for custom cursor interaction
- Kept `data-animate` for reduced-motion fallback

**No conflicts:**
- Parent's scroll animation (`.hero-block` stagger) runs independently
- WebsiteBuilderAnimation's internal timeline uses its own scope
- Both use `gsap.matchMedia()` for reduced-motion support

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

All verification criteria passed:

1. ✅ `npx tsc --noEmit` - No TypeScript errors
2. ✅ `npm run build` - Production build successful
3. ✅ Dev server at http://localhost:3000 - Animated browser chrome visible in hero right column
4. ✅ Animation loops smoothly without visible reset jank
5. ✅ Browser chrome has proper macOS dots (red/yellow/green), URL bar, dark viewport
6. ✅ Mock elements appear sequentially: nav → image → text → buttons → cards → footer
7. ✅ Completed state holds for ~2.5s, then fades out and restarts
8. ✅ Reduced motion shows static completed website (no animation)
9. ✅ Existing hero headline fade-up and hero-block stagger animations still work

## Technical Notes

**GSAP Timeline Performance:**
- Timeline uses `repeat: -1` with `repeatDelay: 1.5` (GSAP handles memory efficiently)
- All animated properties are GPU-composited (no layout thrashing)
- Uses `autoAlpha` instead of `opacity` for visibility (combines opacity + display per Quick-06 convention)
- Cleanup handled automatically via `useGSAP` scope

**Visual Hierarchy:**
- Browser chrome #0e1e36 provides subtle depth against navy #051733 hero background
- Coral/peach accents in mock website match brand color scheme
- Abstract shapes (not real content) keep focus on animation flow

**Reduced Motion:**
- Both parent scroll animation and internal timeline use `gsap.matchMedia()`
- No animation branch shows static completed website (all elements visible)
- Honors user accessibility preferences

## Self-Check: PASSED

**Created files:**
- ✅ src/components/ui/WebsiteBuilderAnimation.tsx (178 lines)

**Modified files:**
- ✅ src/components/sections/Hero.tsx (import added, gradient box replaced)

**Commits:**
- ✅ 1621885: feat(quick-8): add WebsiteBuilderAnimation component
- ✅ 816479a: feat(quick-8): integrate WebsiteBuilderAnimation into Hero section

**Build verification:**
- ✅ TypeScript compilation successful
- ✅ Production build successful (no errors)
- ✅ Dev server running without errors

All claims verified. Plan complete.

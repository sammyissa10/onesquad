---
phase: 05-pricing-pages-redesign
plan: 02
subsystem: ui
tags: [framer-motion, pricing, social-media, calculator, tailwind, animations]

# Dependency graph
requires:
  - phase: 05-01
    provides: "Pattern assignments: Social=scale, Website=glow, Ecommerce=lift+shadow"
provides:
  - "Bold/playful social media pricing calculator with full-width layout and inline summary"
  - "Scale hover pattern implementation (whileHover: 1.05) on all interactive cards"
  - "Snappy spring animations (0.2s duration, stiffness 400, damping 20)"
  - "Light -> Dark -> Light section rhythm for social tier"
affects: [05-03-website-calculator, 05-04-ecommerce-calculator]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Full-width wizard layout with inline summary (not sidebar) - distinct from other tiers"
    - "AnimatePresence for step transitions with x-axis sliding"
    - "Filled circle step indicators with spring bounce animation"
    - "Glass-morphism cards with backdrop-blur-sm and border-white/10"

key-files:
  created: []
  modified:
    - "src/app/pricing/social/page.tsx"

key-decisions:
  - "Full-width layout (not sidebar+main grid) creates distinct personality vs website/ecommerce tiers"
  - "Light hero -> Dark calculator -> Light confirmation rhythm for social tier energy"
  - "Casual playful copy ('Build Your Social Empire', 'Add the Good Stuff', 'Lock It In') matches tier personality"
  - "Scale hover pattern (1.05) on all option cards for consistent interaction feel"
  - "Inline summary below wizard (not sticky sidebar) fits vertical flow of social media aesthetic"
  - "0.2s animation duration with spring physics for snappy, energetic feel"

patterns-established:
  - "Pattern 1 (Social tier): Full-width steps with inline summary, scale hover, snappy animations, casual copy"
  - "Section rhythm: Light hero (peach gradient) -> Dark calculator (navy) -> Light confirmation"
  - "Step indicators: Filled circles with Check icon for completed steps"
  - "Price change animation: Spring transition on total with AnimatePresence mode='wait'"

# Metrics
duration: 4 min
completed: 2026-02-11
---

# Phase 5 Plan 2: Social Media Calculator Redesign Summary

**Bold/playful social media pricing calculator with full-width layout, scale hover, snappy animations, and casual copy — visually distinct from website and ecommerce tiers**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-11T22:23:30Z
- **Completed:** 2026-02-11T22:27:56Z
- **Tasks:** 1 completed
- **Files modified:** 1

## Accomplishments

- Completely redesigned social media calculator with bold/playful personality distinct from other tiers
- Implemented full-width layout with inline summary (not sidebar) creating unique visual structure
- Applied Light -> Dark -> Light section rhythm (peach gradient hero, navy calculator, white confirmation)
- Added scale hover pattern (whileHover: 1.05) on all interactive option cards
- Implemented snappy spring animations (0.2s duration, stiffness 400, damping 20)
- Created playful casual copy matching social media tier personality
- Preserved all calculator state logic and real-time price calculation functionality

## Task Commits

Each task was committed atomically:

1. **Task 1: Redesign social media calculator with bold/playful personality** - `9b13d3f` (feat)
   - Replaced sidebar layout with full-width steps + inline summary
   - Implemented Light hero -> Dark calculator -> Light confirmation rhythm
   - Added playful copy: 'Build Your Social Empire', 'Pick Your Platforms', 'Add the Good Stuff', 'Lock It In'
   - Oversized headline (text-5xl/6xl/7xl) with coral accent
   - Scale hover on all interactive cards
   - Snappy animations with spring transitions
   - Filled circle step indicators with bounce
   - AnimatePresence for step transitions
   - Inline summary with real-time price updates
   - Glass-morphism cards for calculator options
   - Decorative social icons in hero background
   - Step 3 confirmation with playful energy
   - data-cursor attributes on interactive elements
   - Mobile-responsive with collapsed grids

**Plan metadata:** (will be committed with STATE.md update)

## Files Created/Modified

- `src/app/pricing/social/page.tsx` - Complete redesign with full-width layout, bold/playful personality, scale hover, snappy animations, and inline summary. Visually distinct from website and ecommerce tiers.

## Decisions Made

1. **Full-width layout (not sidebar)** - Creates distinct personality vs website/ecommerce tiers. Vertical flow matches social media aesthetic (Instagram story format).

2. **Light -> Dark -> Light section rhythm** - Contrasts with website (Dark -> Light -> Dark) and ecommerce (Gradient -> White -> Navy). Each tier has unique rhythm.

3. **Casual playful copy** - 'Build Your Social Empire', 'Pick Your Platforms', 'Add the Good Stuff', 'Lock It In', 'You're All Set!', 'Let's Make It Happen'. Matches bold/playful tier personality.

4. **Scale hover pattern (1.05)** - Consistent with 05-01 pattern assignment: Social=scale. Applied uniformly to all option cards for predictable interaction.

5. **Inline summary below wizard** - Not sticky sidebar. Fits vertical flow, reduces visual clutter, works better on mobile for social tier.

6. **0.2s animation duration** - Faster than website (0.5s) and ecommerce (spring with slower stiffness). Creates snappy, energetic feel matching social media pace.

7. **Filled circle step indicators** - Replaced numbered badges with filled circles + Check icon. More playful than numbered approach used in old version.

## Deviations from Plan

None - plan executed exactly as written. All must_haves verified:
- ✓ Bold/playful personality distinct from other tiers
- ✓ Calculator wizard functional with real-time price updates
- ✓ Full-width layout with inline summary (not sidebar)
- ✓ Scale hover on all interactive cards
- ✓ Light -> Dark -> Light section rhythm
- ✓ Casual playful copy throughout
- ✓ Mobile-responsive single-column collapse

## Issues Encountered

**TypeScript transition type error** - Initial animation variants caused TypeScript error for spring transition `type` property. Fixed by adding `as const` type assertion to transition type property.

**Pre-existing ecommerce page build error** - Discovered unrelated error in `src/app/pricing/ecommerce/page.tsx` (invalid Section background prop "navy"). Not addressed in this plan - will be fixed in plan 05-04.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

Social media calculator complete and committed. Ready for Plan 05-03: Website calculator redesign.

Pattern established for tier differentiation:
- Social: Full-width layout, scale hover, snappy animations (0.2s), casual copy
- Website (next): Will use sidebar layout, glow hover, smooth animations (0.5s), premium copy
- Ecommerce (05-04): Will use split-screen layout, lift+shadow hover, spring animations, revenue copy

---
*Phase: 05-pricing-pages-redesign*
*Completed: 2026-02-11*

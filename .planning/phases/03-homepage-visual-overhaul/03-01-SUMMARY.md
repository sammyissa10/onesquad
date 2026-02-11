# Phase 03 Plan 01: Brand Color Theme & Asymmetric Hero Summary

**One-liner:** JWT-style brand color theme with asymmetric bento grid hero using oversized display typography and staggered Framer Motion entrance.

---

## Frontmatter

```yaml
phase: 03-homepage-visual-overhaul
plan: 01
subsystem: homepage-ui
tags: [theme, hero, bento-grid, typography, animation]
dependency_graph:
  requires: [02-02-custom-cursor-hover]
  provides: [brand-color-utilities, hero-bento-layout]
  affects: [03-02-homepage-sections, 03-03-homepage-copy]
tech_stack:
  added: []
  patterns: [css-grid-bento, oversized-typography, staggered-entrance]
key_files:
  created: []
  modified:
    - src/app/globals.css
    - src/components/sections/Hero.tsx
decisions:
  - Navy hero background (dark section first per strategic dark/light rhythm)
  - 6-col desktop / 4-col mobile grid (asymmetric bento inspired by Kota.co.uk)
  - Display typography scale maxes at 8rem (xl:text-display)
  - Dual CTAs with coral primary + white outline
  - MotionConfig reducedMotion="user" for accessibility
  - Bold headline: "We Build Digital Empires For Small Businesses"
metrics:
  duration_minutes: 2
  completed_date: 2026-02-11
```

---

## What Was Built

### Brand Color Theme System
Established the core brand color palette as Tailwind utilities via `@theme inline` in globals.css:

**Brand Colors:**
- `bg-navy` / `text-navy` (#051733 - Maastricht Blue)
- `bg-coral` / `text-coral` (#E2795E - Terra Cotta)
- `bg-peach` / `text-peach` (#FAB383 - Macaroni & Cheese)
- `bg-blue` / `text-blue` (#27598E - B'dazzled Blue)

**Typography Scale:**
- `text-display` (8rem with 0.9 line-height, -0.03em tracking)
- Enables oversized hero headlines on xl+ screens

**Spacing Tokens:**
- `py-section-xs` through `py-section-lg` (3rem → 10rem)
- Enables intentional section rhythm variation

These utilities are now available sitewide for Plans 02 and 03.

### Asymmetric Bento Grid Hero
Completely rebuilt Hero.tsx from centered-text layout to asymmetric bento grid:

**Layout:**
- Full viewport height: `min-h-[100vh] min-h-dvh` with dvh fallback
- Navy background (`bg-navy`) - dark hero per strategic section rhythm
- CSS Grid: `grid-cols-4 md:grid-cols-6` with explicit `col-span` and `row-span`
- Gap: `gap-3 md:gap-4` between blocks
- Padding: `p-4 md:p-6 lg:p-8` outer

**Bento Blocks (6 total):**
1. **Headline Block** (col-span-3, row-span-2): Oversized headline "We Build Digital Empires For Small Businesses" with coral accent on "Empires". Typography: `text-5xl md:text-7xl lg:text-[6rem] xl:text-display`. Includes subtext and dual CTAs.
2. **Visual Accent Block** (col-span-3, row-span-2): Large coral-to-peach gradient block displaying brand slogan "Unlock your digital potential" with `data-cursor="card"`.
3. **Stat Block** (col-span-2, row-span-1): Translucent dark block showing "29+ Websites Launched" stat with `bg-white/5 backdrop-blur-sm`.
4. **Logo/Brand Block** (col-span-1, row-span-1): Small coral accent block with "1S" branding.
5. **Quick CTA Block** (col-span-1, row-span-1): Peach block with "Start Now" + arrow linking to /pricing.
6. **Trust Block** (col-span-2, row-span-1): Blue accent block showing "0 Long-term Contracts" trust indicator.

**CTAs:**
- Primary: "See Our Plans" (coral Button with arrow) → /pricing
- Secondary: "Get a Free Quote" (white outline Button) → /contact
- Both wrapped in MagneticButton for interaction
- Both have `data-cursor="button"` for custom cursor integration

**Animation:**
- Staggered entrance: `staggerChildren: 0.12s`, `delayChildren: 0.15s`
- Each block animates from `{ opacity: 0, y: 20 }` with custom easing `[0.22, 1, 0.36, 1]`
- `MotionConfig reducedMotion="user"` respects prefers-reduced-motion

**Mobile:**
- All blocks become `col-span-4` (full width) on mobile except stat/logo/CTA which use `col-span-2` or `col-span-1`
- Headline block appears first in stacking order
- Grid maintains proper flow and readability

**Copy Tone:**
- Bold capability positioning: "We Build Digital Empires For Small Businesses"
- Subtext: "Your all-in-one team for web design, marketing, and ongoing support — without the agency price tag"
- Confident, not aspirational — declares what OneSquad does

---

## Deviations from Plan

None - plan executed exactly as written.

All brand colors, typography tokens, and spacing tokens added as specified. Hero rebuilt with asymmetric bento grid layout matching Kota.co.uk inspiration. Full viewport height, oversized typography, staggered entrance animation, and reduced-motion support all implemented per plan requirements.

---

## Task Commits

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Add brand color theme and typography scale to globals.css | 22a5cee | src/app/globals.css |
| 2 | Rebuild Hero as asymmetric bento grid with oversized typography | d7f407c | src/components/sections/Hero.tsx |

---

## Verification Results

**Build Check:**
- `npm run build` succeeded with no CSS errors
- All new Tailwind utilities (bg-navy, text-coral, text-display, etc.) available
- TypeScript compilation passed
- Static page generation completed (23 routes)

**Manual Verification Needed:**
The plan specifies running `npm run dev` and visiting http://localhost:3000 to verify:
1. Hero fills full viewport height
2. Asymmetric bento grid layout visible
3. Oversized headline text (4-8rem range)
4. Navy background with coral/peach accent blocks
5. Staggered entrance animation on load
6. Mobile layout stacks properly without overflow
7. Both CTA buttons navigate correctly

These visual checks should be performed before considering the plan fully verified.

---

## Success Criteria Met

- [x] @theme block in globals.css contains navy (#051733), coral (#E2795E), peach (#FAB383), blue (#27598E) color tokens
- [x] Hero.tsx uses CSS Grid with explicit col-span/row-span for asymmetric bento layout
- [x] Hero headline text is 4-8rem (oversized display treatment) - `xl:text-display` = 8rem
- [x] Hero is min-h-dvh with vh fallback
- [x] Staggered entrance animation with MotionConfig reducedMotion="user"
- [x] Two CTA buttons present and linked (/pricing and /contact)

All 6 success criteria from the plan are met.

---

## Self-Check: PASSED

**Created Files:**
```bash
FOUND: .planning/phases/03-homepage-visual-overhaul/03-01-SUMMARY.md
```

**Modified Files:**
```bash
FOUND: src/app/globals.css
FOUND: src/components/sections/Hero.tsx
```

**Commits:**
```bash
FOUND: 22a5cee
FOUND: d7f407c
```

All claimed files exist and all commits are in the repository.

---

## Next Steps

**Immediate (Plan 02):**
Rebuild remaining homepage sections (Services, Testimonials, CTA) with asymmetric layouts and varied section rhythm using the newly established brand color utilities.

**Dependencies:**
Plan 03-02 can now use all brand color utilities (bg-navy, text-coral, etc.) and should follow the design language established by this hero (asymmetric layouts, oversized typography, strategic color blocking).

**Manual Verification Required:**
Start dev server (`npm run dev`) and visually verify the hero at http://localhost:3000 before proceeding to Plan 02.

---

*Completed: 2026-02-11 | Duration: 2 minutes | Executor: sonnet*

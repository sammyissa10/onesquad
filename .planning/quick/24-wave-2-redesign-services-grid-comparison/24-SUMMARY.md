---
phase: quick-24
plan: 01
subsystem: homepage-sections
tags: [homepage, redesign, gsap, glassmorphism, wave-divider, trust-badges, stats]
dependency_graph:
  requires: [quick-23]
  provides: [WaveDivider, TrustBadges, StatsSection]
  affects: [src/app/page.tsx, src/components/sections/ServicesPreview.tsx, src/components/sections/Comparison.tsx, src/components/sections/Features.tsx]
tech_stack:
  added: []
  patterns: [glassmorphism, inline-svg-divider, side-by-side-comparison, social-proof-band]
key_files:
  created:
    - src/components/ui/WaveDivider.tsx
    - src/components/sections/TrustBadges.tsx
    - src/components/sections/StatsSection.tsx
  modified:
    - src/components/sections/Features.tsx
    - src/components/sections/ServicesPreview.tsx
    - src/components/sections/Comparison.tsx
    - src/components/sections/index.ts
    - src/app/page.tsx
decisions:
  - WaveDivider uses inline SVG (no external assets, no deps) — fill/flip props handle all color transitions
  - ServicesPreview uses colorClasses lookup object to avoid Tailwind v4 dynamic class purging
  - Comparison replaced 4-card stacked layout with simple 5-bullet two-column for scannability
  - TrustBadges and StatsSection use inline data arrays (not from constants.ts) for self-contained components
metrics:
  duration: ~8m
  completed: 2026-03-04
  tasks_completed: 5
  files_changed: 8
---

# Phase quick-24 Plan 01: Wave 2 Homepage Redesign Summary

Wave 2 redesign adding TrustBadges, StatsSection, WaveDivider, and glassmorphism card grids to transform homepage into a scannable social-proof-first layout.

## What Was Built

### New Components

**WaveDivider** (`src/components/ui/WaveDivider.tsx`):
- Pure SVG component, no "use client" needed
- Accepts `fill` (hex color), `flip` (boolean for scaleY(-1)), and `className` props
- Renders a cubic bezier organic wave curve at full width
- Used between sections with different background colors

**TrustBadges** (`src/components/sections/TrustBadges.tsx`):
- Social proof band on warm-white background
- "Trusted by Local Businesses Across NW Indiana" headline
- 6 placeholder badges: Lakeside Dental, Region Auto Group, Crossroads Fitness, Harbor Brewing Co., Prairie View Realty, Steel City Eats
- GSAP: fadeUp heading + stagger fadeUp badges (0.08 each)

**StatsSection** (`src/components/sections/StatsSection.tsx`):
- 4-stat grid on dark navy-deep background
- Stats: 50+ Clients, 24hr Turnaround, 100% Local Team, 5.0 Rating
- Coral value text, 2x2 on mobile / 4-column on desktop
- GSAP: stagger fadeUp from center

### Redesigned Sections

**ServicesPreview** — 3x2 glassmorphism grid:
- Replaced two-category split layout with single 6-card grid
- Alternating blue/coral icon accents (colorClasses lookup for Tailwind v4 safety)
- Cards: backdrop-blur, border-white/10, shadow-lg
- Single GSAP stagger on .services-grid trigger

**Comparison** — side-by-side two-column:
- Replaced stacked without/divider/with layout with clean 2-column grid
- 5 bullet points per side with X (red) / Check (coral) icons
- Left: muted white/[0.03] bg with white/10 border; Right: coral/5 bg with coral/20 border
- GSAP: slideFromLeft/slideFromRight instead of card scale reveals
- Headline simplified: "Stop Juggling. Start Growing."

**Features** — glassmorphism cards:
- Card class updated: bg-white/80 dark:bg-white/5 + backdrop-blur-sm + shadow-lg + border-white/20

### Page Layout Update

New homepage section order:
```
Hero > TrustBadges > StatsSection > WaveDivider(#FDF8F5) > Features >
WaveDivider(#1B2A4A, flip) > ServicesPreview > ScrollPromptBanner >
WaveDivider(#0e1e36) > Comparison > WaveDivider(#FDF8F5, flip) >
Process > Testimonials > HomeFAQ > CTABanner
```

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | fcf7ca7 | WaveDivider component + Features glassmorphism |
| 2 | 2077bb6 | TrustBadges + StatsSection components |
| 3 | 970a1bf | ServicesPreview 3x2 grid redesign |
| 4 | a3ab0aa | Comparison two-column redesign |
| 5 | edc9b49 | Wire all components into page layout |

## Deviations from Plan

None - plan executed exactly as written.

## Verification

- `npx tsc --noEmit`: PASSED (no type errors)
- `npm run build`: PASSED (all pages compile successfully)

## Self-Check: PASSED

Files confirmed present:
- src/components/ui/WaveDivider.tsx — FOUND
- src/components/sections/TrustBadges.tsx — FOUND
- src/components/sections/StatsSection.tsx — FOUND

Commits confirmed:
- fcf7ca7 — FOUND
- 2077bb6 — FOUND
- 970a1bf — FOUND
- a3ab0aa — FOUND
- edc9b49 — FOUND

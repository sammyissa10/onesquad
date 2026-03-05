---
phase: quick-26
plan: 01
subsystem: homepage
tags: [redesign, hero, marquee, typography, animation, components]
dependency_graph:
  requires: []
  provides: [redesigned-hero, marquee-ticker, refreshed-trust-badges, oversized-stats, border-only-features]
  affects: [src/app/page.tsx, src/app/globals.css, src/components/sections/Hero.tsx, src/components/sections/MarqueeTicker.tsx, src/components/sections/TrustBadges.tsx, src/components/sections/StatsSection.tsx, src/components/sections/Features.tsx]
tech_stack:
  added: []
  patterns: [pure-css-marquee, border-only-cards, massive-display-typography]
key_files:
  created:
    - src/components/sections/MarqueeTicker.tsx
  modified:
    - src/app/globals.css
    - src/app/page.tsx
    - src/components/sections/Hero.tsx
    - src/components/sections/TrustBadges.tsx
    - src/components/sections/StatsSection.tsx
    - src/components/sections/Features.tsx
    - src/components/sections/index.ts
decisions:
  - warm-white updated to #F5EFE0 (warmer beige matching CAYK reference)
  - Hero bento grid removed, full-width dark section with 7rem headline at weight 900
  - MarqueeTicker uses pure CSS keyframes marquee (no GSAP) - appropriate for continuous loop
  - TrustBadges simplified from pill chips to single dot-separated inline text line
  - StatsSection uses divide-x for vertical dividers instead of per-item border hack
  - Features border-only cards with hover:border-coral/30 instead of glassmorphism
metrics:
  duration: "~3 minutes"
  completed: "2026-03-05"
  tasks_completed: 3
  files_changed: 8
---

# Phase quick-26 Plan 01: Wave 4 Redesign Professional Agency Look Summary

**One-liner:** Bold full-width dark hero at weight 900/7rem, new CSS marquee ticker strip, dot-separated trust badges, oversized 8xl stat numbers with coral top border, and border-only feature cards replacing glassmorphism.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | Update global tokens and redesign Hero | eea1f90 | globals.css, Hero.tsx |
| 2 | Create MarqueeTicker and refresh TrustBadges | 52e5fa9 | MarqueeTicker.tsx, TrustBadges.tsx, index.ts, page.tsx, globals.css |
| 3 | Refresh StatsSection and Features | edeeeb9 | StatsSection.tsx, Features.tsx |

## What Was Built

### Global Token Updates (globals.css)
- `--warm-white` changed from `#FDF8F5` to `#F5EFE0` (warmer beige)
- `--background` and `--color-warm-white` both updated to `#F5EFE0`
- `h1` font-weight updated to 900, letter-spacing to -0.04em
- Added `--font-weight-display: 900` to `@theme`
- Added `.dark .bg-[#F5EFE0]` rule mapping to `var(--card)` for dark mode

### Hero.tsx (full rewrite)
- Removed entire bento grid (left column, right column, stat cells, testimonial, CTA card)
- Full-width dark section `bg-[#0d1525]`, no rounded corners, no border
- Massive headline: `text-[2.8rem]` scaling to `xl:text-[7rem]`, `font-weight: 900`, `leading-[0.92]`, `tracking-[-0.04em]`
- Word "Proud" highlighted in coral
- Single subtext line in `text-white/50`
- Two CTAs: "See Our Plans" (accent) + "Free Quote" (outline white border)
- Trust statement below `border-t border-white/10`
- GSAP: `.hero-headline` fadeUp then `.hero-content` with 0.15s delay (uses autoAlpha)

### MarqueeTicker.tsx (new component)
- Thin dark strip `bg-[#0d1525]` with `py-5`
- Pure CSS `@keyframes marquee` (translateX 0 to -50%), 30s linear infinite
- Coral text, 8 copies of keyword string across two halves for seamless loop
- `text-sm md:text-base font-semibold uppercase tracking-[0.2em]`
- Placed between Hero and TrustBadges in page.tsx

### TrustBadges.tsx (rewrite)
- Background changed from `bg-warm-white` to `bg-[#F5EFE0] dark:bg-card`
- Pill chips removed — replaced with single `.trust-names` paragraph
- Business names joined with ` · ` (middle dot) separator
- `text-navy/50 text-sm md:text-base font-medium tracking-wide`
- GSAP: trust-badge stagger replaced with single trust-names fadeUp

### StatsSection.tsx (redesign)
- Numbers upgraded: `text-6xl md:text-7xl lg:text-8xl font-black` (was text-4xl/5xl font-bold)
- Added `border-t-2 border-coral` accent line at top of section
- Increased padding to use section spacing tokens
- Vertical dividers via `divide-x divide-white/10` on the grid container
- Labels: `text-xs md:text-sm text-white/40 uppercase tracking-[0.15em]`
- Counter animations and `.stat-value-N` selectors preserved unchanged

### Features.tsx (redesign)
- Removed: `bg-white/80 dark:bg-white/5 backdrop-blur-sm shadow-lg`
- Added: `bg-transparent border border-navy/10 dark:border-white/10`
- Removed hover translate; added `hover:border-coral/30 transition-colors duration-200`
- Icon container: `bg-coral/10` → `bg-coral/5`
- Heading: `font-bold` → `font-extrabold`

## Verification

Build result: `npx next build` passed with no errors (31/31 pages generated).

Section order on homepage: Hero > MarqueeTicker > TrustBadges > StatsSection > Features > ...

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check: PASSED

Files created/exist:
- src/components/sections/MarqueeTicker.tsx: FOUND
- src/components/sections/Hero.tsx: FOUND (rewritten)
- src/app/globals.css: FOUND (updated)

Commits:
- eea1f90: FOUND
- 52e5fa9: FOUND
- edeeeb9: FOUND

---
phase: quick-23
plan: "01"
subsystem: design-system
tags: [typography, color-tokens, spacing, buttons, fonts]
dependency_graph:
  requires: []
  provides: [color-tokens, font-system, button-styles, section-spacing]
  affects: [globals.css, layout.tsx, Button.tsx, Hero.tsx, Process.tsx, HomeFAQ.tsx, Features.tsx, DigitalMarketingGrid.tsx, ScrollPromptBanner.tsx]
tech_stack:
  added: [Space Grotesk, DM Sans]
  patterns: [CSS custom properties for spacing tokens, pill-shaped gradient buttons, warm white backgrounds]
key_files:
  created: []
  modified:
    - src/app/globals.css
    - src/app/layout.tsx
    - src/components/ui/Button.tsx
    - src/components/sections/Hero.tsx
    - src/components/sections/Process.tsx
    - src/components/sections/HomeFAQ.tsx
    - src/components/sections/Features.tsx
    - src/components/sections/DigitalMarketingGrid.tsx
    - src/components/sections/ScrollPromptBanner.tsx
decisions:
  - "Coolvetica demoted to display-only (hero headline) via --font-display; Space Grotesk takes over --font-heading for all other headings"
  - "Container max-w-[1200px] added via className override on Container component, not a new Container size prop"
  - "HomeFAQ Container kept at size=md (max-w-5xl) since FAQ content is narrow by design"
  - "PricingCalculator skipped for bg-warm-white — no section-level bg-white present, only card elements"
  - "ScrollPromptBanner section wrapper changed to bg-warm-white; SVG fill=white and internal coral banner left unchanged"
metrics:
  duration: "8 minutes"
  completed: "2026-03-04"
  tasks: 5
  files: 9
---

# Quick Task 23: Wave 1 Redesign — Colors, Space Grotesk Font, Spacing Summary

**One-liner:** Established new visual identity with Space Grotesk + DM Sans fonts, #1B2A4A navy + #E8734A coral color palette, pill-shaped gradient buttons, warm white (#FDF8F5) section backgrounds, and 50% larger section spacing.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Update color tokens, spacing, fonts, container max-width in globals.css | 1c230d0 | src/app/globals.css |
| 2 | Swap fonts to Space Grotesk + DM Sans in layout.tsx | df538b5 | src/app/layout.tsx |
| 3 | Update hero headline sizing and button pill/gradient styles | f219158 | src/components/sections/Hero.tsx, src/components/ui/Button.tsx |
| 4 | Swap bg-white to bg-warm-white on light sections | 25ee136 | Process.tsx, HomeFAQ.tsx, Features.tsx, DigitalMarketingGrid.tsx, ScrollPromptBanner.tsx |
| 5 | Increase section padding and apply container max-width | f8f8076 | Process.tsx, HomeFAQ.tsx, Features.tsx, DigitalMarketingGrid.tsx |

## What Was Built

### Color System
- `--accent` updated to `#E8734A` (coral) from `#E2795E`
- `--color-navy` updated to `#1B2A4A` from `#051733` (in @theme inline)
- `--background` now `#FDF8F5` (warm white) instead of `#ffffff`
- New tokens: `--warm-white`, `--navy-muted`, `--gradient-accent`, `--color-warm-white`, `--color-navy-muted`
- Dark mode: `--background: #0a1628` preserved unchanged

### Typography
- Space Grotesk (400/500/600/700) loaded via next/font/google as `--font-space-grotesk`
- DM Sans (300/400/500/600) loaded via next/font/google as `--font-dm-sans`
- Nunito removed entirely
- `--font-heading` now maps to `var(--font-space-grotesk)`
- `--font-body` now maps to `var(--font-dm-sans)`
- `--font-display: "Coolvetica"` preserved for hero headline only
- Hero h1: Coolvetica display font with Space Grotesk fallback via inline style

### Hero Headline
- Changed from `text-4xl md:text-5xl lg:text-6xl` to `text-5xl md:text-7xl lg:text-[5.5rem]`
- Line height tightened from `leading-[0.95]` to `leading-[0.92]`
- Tracking from `tracking-tight` to `tracking-[-0.035em]`

### Buttons
- All variants: `rounded-xl` → `rounded-full` (pill shape)
- Base: `transition-colors` → `transition-all` (supports both color + transform)
- Primary and accent variants: solid color → `bg-gradient-to-r from-[#E8734A] to-[#F4A261]`
- Hover: `hover:scale-105` with `hover:shadow-xl hover:shadow-[#E8734A]/30`

### Section Backgrounds
- 5 sections converted from `bg-white` to `bg-warm-white`
- Card/UI-level `bg-white` elements preserved for contrast
- Dark mode override `.dark .bg-warm-white` added to globals.css

### Section Spacing
- Tokens increased ~50%: xs 3→4.5rem, sm 5→7.5rem, md 7→10.5rem, lg 10→15rem
- 4 sections updated from hardcoded `py-20 md:py-28` to `py-[var(--spacing-section-sm)] md:py-[var(--spacing-section-md)]`
- Container max-width applied as `max-w-[1200px]` on 3 sections (Process, Features, DigitalMarketingGrid)

## Deviations from Plan

None — plan executed exactly as written.

## Verification

- `npx next build` completed successfully with no errors
- All 5 tasks committed individually with proper commit format
- Dark mode background preserved at `#0a1628` (no warm white in dark mode)

## Self-Check: PASSED

Files verified:
- FOUND: src/app/globals.css
- FOUND: src/app/layout.tsx
- FOUND: src/components/ui/Button.tsx
- FOUND: src/components/sections/Hero.tsx
- FOUND: src/components/sections/Process.tsx
- FOUND: src/components/sections/HomeFAQ.tsx
- FOUND: src/components/sections/Features.tsx
- FOUND: src/components/sections/DigitalMarketingGrid.tsx
- FOUND: src/components/sections/ScrollPromptBanner.tsx

Commits verified:
- FOUND: 1c230d0 (Task 1)
- FOUND: df538b5 (Task 2)
- FOUND: f219158 (Task 3)
- FOUND: 25ee136 (Task 4)
- FOUND: f8f8076 (Task 5)

---
phase: quick-28
plan: "01"
subsystem: homepage
tags: [hero, portfolio-preview, visual-design, gsap, animations]
dependency_graph:
  requires: []
  provides: [hero-browser-mockup, portfolio-preview-section]
  affects: [homepage]
tech_stack:
  added: []
  patterns: [gsap-scroll-animation, css-wireframe-mockup, stagger-reveal]
key_files:
  created:
    - src/components/sections/PortfolioPreview.tsx
  modified:
    - src/components/sections/Hero.tsx
    - src/components/sections/index.ts
    - src/app/page.tsx
decisions:
  - "Hero restructured into two-column grid (text left, browser mockup right) on lg+ screens"
  - "Browser mockup uses pure CSS/divs — no images or SVGs, maintains dark theme with white/10 borders"
  - "PortfolioPreview placed between Testimonials and HomeFAQ for natural social-proof flow"
  - "CardWireframe subcomponent renders abstract layout shapes inside card placeholders"
metrics:
  duration: "5 minutes"
  completed: "2026-03-05"
  tasks_completed: 3
  files_changed: 4
---

# Phase quick-28 Plan 01: Homepage Visual Improvements — Hero Visual Summary

**One-liner:** Two-column hero with pure CSS browser mockup (fade+scale GSAP) and PortfolioPreview section with 3 stagger-animated project cards on bg-warm-white.

## What Was Built

### Task 1: Hero Browser Mockup

Restructured `Hero.tsx` into a two-column `lg:grid-cols-2` layout. Left column retains all existing text (label, headline, divider, subtext, CTAs). Right column adds a `BrowserMockup` component — a pure CSS browser window with:

- Chrome bar: three colored dots (red/yellow/green at 60% opacity) + URL bar stub
- Body: fake nav bar (coral accent line), fake headline block (w-3/4 bg-white/10), fake subtitle (w-1/2 bg-white/5), 2-column card grid (bg-white/[0.07]), fake CTA button (bg-coral/30)
- GSAP animation: autoAlpha 0 → 1, scale 0.95 → 1, duration 1s, delay 0.4s, power3.out, scrollTrigger tied to `.hero-headline`

### Task 2: PortfolioPreview Section

Created `src/components/sections/PortfolioPreview.tsx` with:

- 3 project cards: Riverside Dental (coral gradient), Midwest Auto Group (blue/cyan gradient), Harbor Fitness (emerald/teal gradient)
- Each card: aspect-[16/10] wireframe placeholder, category pill (bg-coral/10 text-coral), project name, outcome stat
- Hover: `-translate-y-1` on card, `scale-[1.02]` on wireframe
- GSAP stagger reveal: autoAlpha 0, y:40, stagger 0.15, scrollTrigger on `.portfolio-grid` start `top 80%`
- "View All Work" link to /portfolio with ArrowRight icon
- Exported from `sections/index.ts`
- Added to `page.tsx` between `<Testimonials />` and `<HomeFAQ />`

### Task 3: Verify FAQ + Footer, Deploy

- HomeFAQ confirmed present and correct (Framer Motion accordion, 5 questions, CTA)
- Footer confirmed complete (nav columns, contact, socials, trust signals, newsletter, copyright)
- `npx next build` passed cleanly (2 pre-existing CSS warnings, not new)
- Deployed via `npx vercel --prod` — live at https://onesquad.vercel.app

## Deviations from Plan

None — plan executed exactly as written.

## Commits

| Task | Commit | Message |
|------|--------|---------|
| 1 | b10c4b9 | feat(quick-28): add browser mockup visual to hero right column |
| 2 | 7d39368 | feat(quick-28): add PortfolioPreview section with 3 project cards |

## Self-Check: PASSED

- src/components/sections/Hero.tsx: FOUND
- src/components/sections/PortfolioPreview.tsx: FOUND
- src/components/sections/index.ts: FOUND
- src/app/page.tsx: FOUND
- commit b10c4b9: FOUND
- commit 7d39368: FOUND

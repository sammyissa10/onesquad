---
phase: quick-15
plan: 01
subsystem: content
tags: [copy, conversion, cta, homepage]
dependency_graph:
  requires: []
  provides: [conversion-focused-copy]
  affects: [homepage-hero, all-cta-buttons, testimonials]
tech_stack:
  added: []
  patterns: [pain-point-driven-copy, benefit-oriented-messaging, stat-callouts]
key_files:
  created: []
  modified:
    - src/components/sections/Hero.tsx
    - src/components/layout/Header.tsx
    - src/components/sections/ScrollPromptBanner.tsx
    - src/components/sections/ServicesPreview.tsx
    - src/components/sections/PortfolioPreview.tsx
    - src/components/sections/HomeFAQ.tsx
    - src/components/sections/CTABanner.tsx
    - src/components/sections/Testimonials.tsx
decisions:
  - slug: pain-point-hero
    summary: "Hero headline addresses user pain point directly: 'You Didn't Start a Business to Fight With Your Website'"
    rationale: "Pain-point-driven headlines convert better than feature-focused ones — establishes empathy immediately"
  - slug: conversion-focused-ctas
    summary: "CTAs rewritten for conversion: specific, benefit-oriented, low-friction language"
    rationale: "'See What You'd Pay' more specific than 'See Our Plans'; 'Get a Free Mockup in 24hrs' adds urgency and specificity"
  - slug: stat-callout-badges
    summary: "Added bold stat badges above testimonial cards (3x Traffic Growth, 180% Organic Growth, Zero Stress)"
    rationale: "Immediate visual proof of results — stats draw attention before user reads full testimonial"
metrics:
  duration: 2.4
  completed: 2026-02-12
---

# Phase quick-15 Plan 01: Copy Rewrite Summary

**One-liner:** Rewrote homepage hero headline, all CTA buttons, and added stat callout badges to testimonials for higher conversion.

## What Was Built

Complete homepage copy refresh targeting conversion optimization:

### Hero Section (Hero.tsx)
- **New H1:** "You Didn't Start a Business to Fight With Your Website"
- **New subheading:** Pain-point-driven copy emphasizing delegation and growth
- **CTA updates:**
  - "See What You'd Pay" (was "See Our Plans")
  - "Get a Free Mockup in 24hrs" (was "Get a Free Quote")

### All Section CTAs
- **Header:** "Get Started" (was "Hire Us")
- **ScrollPromptBanner:** "Send Me My Free Mockup →" (was "Get a Free Mockup")
- **ServicesPreview:** "Find Your Perfect Plan" (was "View All Services")
- **PortfolioPreview:** "Browse Real Client Sites" (was "View All Templates")
- **HomeFAQ:** "Book a 15-Min Call (Free)" (was "Let's Talk")
- **CTABanner:**
  - "Pick Your Plan — Cancel Anytime" (was "See Our Plans")
  - "Talk to a Human in 24hrs" (was "Schedule a Call")

### Testimonials (Testimonials.tsx)
- Added coral pill badges above star ratings:
  - Badge 1: "3x Traffic Growth" (Sarah Johnson)
  - Badge 2: "180% Organic Growth" (Michael Chen)
  - Badge 3: "Zero Stress" (Emily Rodriguez)
- Badges styled with `bg-coral/15` background, coral text, uppercase bold

## Deviations from Plan

None - plan executed exactly as written.

## Technical Decisions

**Badge implementation:** Used inline Record mapping instead of modifying constants.ts — keeps testimonial component self-contained for easier maintenance.

**JSX escaping:** Used `&apos;` for apostrophes in "Didn't" and "You'd" to maintain proper JSX syntax.

**Stat selection:** Badges highlight quantifiable results from each testimonial quote (3x traffic, 180% growth, zero stress emotional benefit).

## Commits

| Task | Commit | Files | Description |
|------|--------|-------|-------------|
| 1 | b437629 | 7 files | Rewrite hero headline and all CTA button copy |
| 2 | 97f4982 | 1 file | Add stat callout badges to testimonial cards |

## Verification Results

- ✓ TypeScript compilation passes (`npx tsc --noEmit`)
- ✓ All old copy strings removed (grep verification)
- ✓ Hero H1 reads "You Didn't Start a Business to Fight With Your Website"
- ✓ All CTA buttons reflect new conversion-focused copy
- ✓ Testimonial cards display stat badges above star ratings
- ✓ No structural, styling, or animation changes — only copy and badge additions

## Impact

**Conversion optimization:**
- Pain-point-driven hero establishes immediate empathy
- Specific CTAs (time guarantees, pricing transparency) reduce friction
- Stat badges provide social proof at first glance

**Brand voice shift:**
- From generic agency language ("Hire Us") to direct benefit language ("Get Started")
- From vague promises to specific deliverables ("Free Mockup in 24hrs")
- From corporate jargon to human, trust-building copy ("Talk to a Human")

## Self-Check: PASSED

**Created files:** None (copy changes only)

**Modified files:**
- ✓ FOUND: src/components/sections/Hero.tsx
- ✓ FOUND: src/components/layout/Header.tsx
- ✓ FOUND: src/components/sections/ScrollPromptBanner.tsx
- ✓ FOUND: src/components/sections/ServicesPreview.tsx
- ✓ FOUND: src/components/sections/PortfolioPreview.tsx
- ✓ FOUND: src/components/sections/HomeFAQ.tsx
- ✓ FOUND: src/components/sections/CTABanner.tsx
- ✓ FOUND: src/components/sections/Testimonials.tsx

**Commits:**
- ✓ FOUND: b437629 (Task 1: hero headline and CTA copy rewrite)
- ✓ FOUND: 97f4982 (Task 2: stat callout badges)

All claims verified. Summary accurate.

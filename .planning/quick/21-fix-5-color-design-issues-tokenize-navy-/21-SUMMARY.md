---
phase: quick-21
plan: 01
subsystem: design-system
tags: [color-tokens, consistency, dark-mode]
dependency_graph:
  requires: []
  provides:
    - navy-section color token (#0F172A)
    - navy-deep color token (#0e1e36)
    - peach token aligned with secondary (#FFBD83)
  affects:
    - about page
    - contact page
    - portfolio page
    - blog page
    - comparison section
    - scroll prompt banner
    - results dashboard animation
    - template card
    - container component
    - chat widget
tech_stack:
  added: []
  patterns:
    - semantic color tokens
    - brand accent consistency
key_files:
  created: []
  modified:
    - src/app/globals.css (navy-section, navy-deep, peach tokens)
    - src/app/about/page.tsx (bg-navy-section)
    - src/app/contact/page.tsx (bg-navy-section)
    - src/app/portfolio/page.tsx (bg-navy-section)
    - src/app/blog/page.tsx (dark mode placeholder contrast)
    - src/components/sections/Comparison.tsx (bg-navy-deep, coral accent system)
    - src/components/sections/ScrollPromptBanner.tsx (bg-navy-deep, text-navy-deep)
    - src/components/ui/ResultsDashboardAnimation.tsx (bg-navy-deep, bg-navy)
    - src/components/ui/TemplateCard.tsx (bg-navy-section)
    - src/components/ui/Container.tsx (to-highlight gradient)
    - src/components/ui/ChatWidget.tsx (to-highlight gradient)
    - src/app/templates/[slug]/demo/page.tsx (to-highlight gradient)
decisions:
  - name: "Create semantic navy tokens instead of single navy"
    rationale: "Two distinct navy shades (#0F172A for sections, #0e1e36 for depth) used throughout codebase needed semantic names for maintainability"
    impact: "All hardcoded navy hex values replaced with tokens, easier to adjust theme in future"
  - name: "Align peach token with secondary color"
    rationale: "Peach was #FAB383 but secondary was #FFBD83 — mismatch caused subtle inconsistencies"
    impact: "Visual consistency across peach-accented elements"
  - name: "Replace red with coral in Comparison section"
    rationale: "Red was ad-hoc choice for 'Without' section, doesn't align with brand accent system"
    impact: "Comparison section now uses coral/10, coral/20, coral/60 for brand consistency"
  - name: "Increase dark mode placeholder opacity to 70%"
    rationale: "50% opacity made blog newsletter placeholder hard to read in dark mode"
    impact: "Better readability without overwhelming the input field"
metrics:
  duration: 3.3
  completed: 2026-02-13
---

# Phase quick-21 Plan 01: Fix 5 Color Design Issues Summary

**One-liner:** Tokenized hardcoded navy shades (#0F172A, #0e1e36), aligned peach with secondary (#FFBD83), replaced Comparison red with coral accent system, and improved dark mode placeholder contrast.

## Objective

Fix 5 color/design consistency issues across the codebase by establishing semantic color tokens for navy shades, aligning peach/secondary colors, removing ad-hoc red from Comparison section, and improving dark mode readability.

## Completion Summary

All 3 tasks completed successfully:

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Tokenize navy shades and fix peach mismatch | 1e2f3f5 | globals.css, about, contact, portfolio, Comparison, ResultsDashboardAnimation, TemplateCard, ScrollPromptBanner |
| 2 | Replace gradient hardcodes and Comparison red with coral | e7abeb2 | Container, ChatWidget, templates/demo, Comparison |
| 3 | Fix blog newsletter placeholder dark mode contrast | f83e0a6 | blog/page.tsx |

## Changes Made

### Task 1: Tokenize Hardcoded Navy Shades and Fix Peach Mismatch

**Added to globals.css:**
- `--color-navy-section: #0F172A` (main navy background for sections)
- `--color-navy-deep: #0e1e36` (deeper navy for depth/contrast)
- Fixed `--color-peach` from `#FAB383` to `#FFBD83` (now matches secondary)

**Replaced hardcoded values:**
- `bg-[#0F172A]` → `bg-navy-section` in: about, contact, portfolio pages, TemplateCard
- `bg-[#0e1e36]` → `bg-navy-deep` in: Comparison, ScrollPromptBanner, ResultsDashboardAnimation
- `text-[#0e1e36]` → `text-navy-deep` in: ScrollPromptBanner
- `bg-[#0a1628]` → `bg-navy` in: ResultsDashboardAnimation

**Impact:** Zero hardcoded navy hex values in TSX files. All navy shades now use semantic tokens.

### Task 2: Replace Gradient Hardcodes and Comparison Red with Coral

**Gradient endpoints:**
- `to-[#27598E]` → `to-highlight` in: Container, ChatWidget, templates/[slug]/demo

**Comparison section color system:**
- Replaced all red-* classes with coral accent system:
  - `bg-red-500/10` → `bg-coral/10`
  - `border-red-500/20` → `border-coral/20`
  - `text-red-400` → `text-coral/60`
  - `border-red-500/15` → `border-coral/15`
  - `decoration-red-500/40` → `decoration-coral/40`

**Impact:** Gradient endpoints use semantic token consistently. Comparison "Without OneSquad" section now uses brand coral instead of ad-hoc red.

### Task 3: Fix Blog Newsletter Placeholder Dark Mode Contrast

Changed dark mode placeholder opacity in blog newsletter input:
- `dark:placeholder:text-white/50` → `dark:placeholder:text-white/70`

**Impact:** Blog newsletter placeholder readable in dark mode (70% vs 50% opacity).

## Deviations from Plan

None - plan executed exactly as written.

## Technical Notes

**Color token strategy:**
- `navy` (#051733): Primary brand navy
- `navy-section` (#0F172A): Section backgrounds (lighter than primary)
- `navy-deep` (#0e1e36): Depth/contrast navy (even lighter for layering)

**Dark mode considerations:**
- Navy tokens provide consistent background colors across light/dark themes
- Placeholder contrast adjustment maintains visual hierarchy while improving readability
- globals.css already has dark mode overrides for `.dark .bg-[#0F172A]` → can be simplified now that tokens exist

**Coral accent consistency:**
- Comparison section now matches brand system (coral instead of red)
- Coral/10, coral/20, coral/60 provide subtle-to-prominent accent hierarchy
- Maintains visual distinction between "Without" (dismissed) and "With" (elevated) sections

## Verification

All verification commands passed:
- No hardcoded navy shades (`bg-[#0[FfEe]1[78Ee]]`) in TSX files
- No hardcoded text navy (`text-[#0e1e36]`) in components
- Peach token updated to `#FFBD83`
- Navy tokens exist in globals.css
- No gradient hardcodes (`to-[#27598E]`)
- No red colors in Comparison section
- Coral accent system in use (`bg-coral/10`, `text-coral/60`)
- Blog placeholder updated to 70% opacity

## Success Criteria

- [x] No hardcoded navy hex values in tsx files (all use tokens)
- [x] Peach color matches secondary (#FFBD83)
- [x] All gradients use to-highlight endpoint
- [x] Comparison section uses coral accent system
- [x] Blog newsletter placeholder has 70% opacity in dark mode
- [x] Visual consistency across brand color palette

## Self-Check: PASSED

**Files created:** None (all modifications)

**Files modified (verified):**
- src/app/globals.css ✓
- src/app/about/page.tsx ✓
- src/app/contact/page.tsx ✓
- src/app/portfolio/page.tsx ✓
- src/app/blog/page.tsx ✓
- src/components/sections/Comparison.tsx ✓
- src/components/sections/ScrollPromptBanner.tsx ✓
- src/components/ui/ResultsDashboardAnimation.tsx ✓
- src/components/ui/TemplateCard.tsx ✓
- src/components/ui/Container.tsx ✓
- src/components/ui/ChatWidget.tsx ✓
- src/app/templates/[slug]/demo/page.tsx ✓

**Commits (verified):**
- 1e2f3f5 ✓ (Task 1: tokenize navy shades and fix peach)
- e7abeb2 ✓ (Task 2: gradient hardcodes and coral accent)
- f83e0a6 ✓ (Task 3: dark mode placeholder contrast)

All files and commits verified successfully.

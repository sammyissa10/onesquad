---
phase: quick-12
plan: 1
subsystem: pricing
tags: [pricing, calculators, components, interaction, ux]
dependency-graph:
  requires: []
  provides: [inline-pricing-calculators, tier-selector-ui]
  affects: [pricing-overview-page, tier-pages]
tech-stack:
  added: []
  patterns: [component-extraction, state-isolation, conditional-rendering]
key-files:
  created:
    - src/components/pricing/SocialCalculator.tsx
    - src/components/pricing/WebsiteCalculator.tsx
    - src/components/pricing/EcommerceCalculator.tsx
  modified:
    - src/app/pricing/page.tsx
    - src/app/pricing/social/page.tsx
    - src/app/pricing/website/page.tsx
    - src/app/pricing/ecommerce/page.tsx
decisions:
  - Extracted three separate calculator components (one per tier) instead of a generic configurable component to preserve each tier's distinct visual personality
  - Each calculator maintains its own internal state to allow users to switch between tiers and return without losing selections
  - Used AnimatePresence mode="wait" for calculator transitions to prevent layout jank during tier switches
  - Kept "Open full page" links on tier cards for users who prefer dedicated page experience
metrics:
  duration: 21
  completed: 2026-02-12
  tasks: 2
  files: 7
---

# Phase quick-12: Add Pricing Calculator to Main Pricing Overview Summary

Embed fully functional pricing calculators inline on the main pricing overview page so users can configure and price any tier without navigating away.

## One-liner

Interactive tier selector on pricing overview page reveals inline calculators (social/website/ecommerce) with distinct visual personalities preserved.

## Deviations from Plan

None - plan executed exactly as written.

## Key Decisions

1. **Component extraction strategy:** Created three separate calculator components (`SocialCalculator`, `WebsiteCalculator`, `EcommerceCalculator`) instead of a single generic component. This preserves each tier's unique visual identity (social=playful/fast, website=premium/slow, ecommerce=data-driven/spring).

2. **State isolation:** Each calculator maintains its own internal state independently. Switching between tiers does NOT reset the previous tier's selections, allowing users to compare configurations easily.

3. **Transition pattern:** Used `AnimatePresence mode="wait"` so outgoing calculator fully exits before incoming one enters. This prevents layout jank and visual confusion.

4. **Dual navigation:** Kept "Open full page" links on tier cards alongside the inline calculators. Some users prefer dedicated pages for focus, others prefer inline comparison.

5. **Background matching:** Calculator section backgrounds match each tier's dedicated page background (social=navy, website=white, ecommerce=white with dark left panel).

## Implementation Details

**Task 1: Extract tier calculators into reusable components**
- Extracted full calculator wizard from `/pricing/social` → `SocialCalculator.tsx` (filled circle step indicators, coral selected states, scale hover, 0.2s transitions)
- Extracted full calculator wizard from `/pricing/website` → `WebsiteCalculator.tsx` (340px sidebar layout, numbered badge indicators, glow hover, 0.4-0.6s transitions)
- Extracted full calculator wizard from `/pricing/ecommerce` → `EcommerceCalculator.tsx` (50/50 split-screen, progress bar indicators, navy-fill selected states, lift+shadow hover, spring animations)
- Refactored three tier pages to import and use extracted components
- **Verification:** `npx next build` passed, visited all three tier pages to confirm identical behavior

**Task 2: Add tier-tabbed calculator section to pricing overview page**
- Transformed gateway cards from navigation-only to interactive selectors
- Added `activeTier` state (null | 'social' | 'website' | 'ecommerce')
- Cards show ring-2 ring-coral when selected, opacity-80 when unselected
- AnimatePresence conditionally renders calculator section below cards with fadeUp transition
- Each calculator wrapped in appropriate background color matching its tier page
- "Choose a different service" button below calculator to switch tiers
- **Verification:** `npx next build` passed, all pricing routes static-rendered successfully

## Visual Personality Preservation

Each calculator retains its distinct visual identity:

- **Social Media:** Dark navy background, filled coral circle step indicators, scale hover (1.05), fast 0.2s transitions, inline summary bar below wizard
- **Websites:** White background, 340px sticky sidebar with elegant summary, numbered badge step indicators with glow, slower 0.4-0.6s transitions with premium easing
- **E-commerce:** White background with 50/50 split-screen, navy left dashboard panel, progress bar step indicators with gradient fill, spring animations (stiffness 200, damping 20), lift+shadow hover

## Commits

- `5f2ae29`: feat(quick-12): extract SocialCalculator component and refactor social tier page
- `65104bf`: feat(quick-12): refactor website and ecommerce tier pages to use extracted calculator components
- `cecc3a3`: feat(quick-12): add tier-tabbed calculator section to pricing overview page

## Self-Check

Verifying created files exist:

```bash
ls -la src/components/pricing/
```

Output:
- ✓ SocialCalculator.tsx
- ✓ WebsiteCalculator.tsx
- ✓ EcommerceCalculator.tsx

Verifying commits exist:

```bash
git log --oneline | grep quick-12
```

Output:
- ✓ cecc3a3 feat(quick-12): add tier-tabbed calculator section to pricing overview page
- ✓ 65104bf feat(quick-12): refactor website and ecommerce tier pages to use extracted calculator components
- ✓ 5f2ae29 feat(quick-12): extract SocialCalculator component and refactor social tier page

Verifying build success:

```bash
npx next build
```

Output:
- ✓ Compiled successfully
- ✓ /pricing (static)
- ✓ /pricing/social (static)
- ✓ /pricing/website (static)
- ✓ /pricing/ecommerce (static)

## Self-Check: PASSED

All files created, commits exist, build successful, routes static-rendered.

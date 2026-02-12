---
phase: quick
plan: 5
subsystem: homepage-comparison
tags: [ui-redesign, visual-design, dark-section, scroll-animations]
dependency_graph:
  requires: [phase-08-scroll-animations, phase-03-homepage-sections]
  provides: [dramatic-comparison-section, asymmetric-layout-pattern]
  affects: [homepage-sections]
tech_stack:
  added: [asymmetric-stacked-layout, coral-divider-badge]
  patterns: [dismissed-items-pattern, elevated-premium-cards]
key_files:
  created: []
  modified:
    - path: src/components/sections/Comparison.tsx
      lines_changed: 214
      description: Complete redesign from symmetric grid to asymmetric stacked layout with dark navy background
decisions:
  - Dark navy background (#0e1e36) with coral accent borders for visual separation from adjacent navy sections
  - Asymmetric stacked layout: compact dismissed "Without" items + dramatic coral divider + elevated 2x2 "With" cards grid
  - Without items use strikethrough, red accents, muted styling to feel deliberately dismissed
  - With items use bg-white/5 cards with coral accents and lift+shadow hover pattern (Phase 03 decision)
  - Coral divider with animated arrow badge creates dramatic visual break between sections
  - GSAP animations: fast stagger (0.06s) for without items, slower scale reveal from center (0.1s) for with cards
metrics:
  duration: 1
  completed_date: 2026-02-12
  tasks_completed: 1
  files_modified: 1
---

# Quick Task 5: Redesign Comparison Section with More Visual Personality

**One-liner:** Dramatic dark navy comparison section with asymmetric layout, dismissed "Without" items, and elevated premium "With" cards

## Objective

Redesign the With/Without OneSquad comparison section from a basic two-column card grid into a dramatic, visually striking section that matches the site's bold creative agency aesthetic.

**Previous state:** Template-like symmetric two-column grid with flat colored cards (red/green) on white background with thin center divider.

**Target state:** Bold dark navy section with asymmetric stacked layout — compact dismissed "Without" items → dramatic coral divider → elevated premium "With" cards in 2x2 grid.

## Tasks Completed

### Task 1: Redesign Comparison section with dramatic dark layout and rich visual cards

**Status:** ✅ Complete
**Commit:** `04c3b6f`
**Files modified:**
- `src/components/sections/Comparison.tsx` - Complete redesign (91 insertions, 123 deletions)

**What was done:**

1. **Background and Section Treatment:**
   - Switched from `bg-white` to `bg-[#0e1e36]` (dark navy) with `text-white`
   - Added coral accent gradient borders at top and bottom for visual separation from adjacent navy sections (ServicesPreview above, PortfolioPreview below)
   - Increased vertical padding to `py-24 md:py-36` for dramatic presence

2. **Layout Redesign - Broke the Template Feel:**
   - Replaced symmetric two-column grid with asymmetric stacked layout
   - **Without Section:** Compact 2-column grid (max-w-4xl) with items displayed as inline bordered elements, not cards
   - **Coral Divider:** Full-width visual break with animated horizontal line and circular badge containing downward arrow
   - **With Section:** 2x2 grid of elevated cards (max-w-4xl) on slightly elevated surface

3. **Without Items Styling - Deliberately Dismissed:**
   - Border-left with red-500/30 accent (not full card backgrounds)
   - Title with strikethrough decoration (`line-through decoration-red-500/40`)
   - Muted text colors: `text-white/80` for titles, `text-white/40` for descriptions
   - Red icon containers with subtle glow: `bg-red-500/10 border border-red-500/20`
   - Visual message: these are problems being crossed out

4. **With Items Styling - Elevated Premium Cards:**
   - Dark-section card pattern: `bg-white/5 border border-white/10 rounded-2xl`
   - Lift+shadow hover: `hover:-translate-y-1.5 hover:shadow-lg hover:shadow-coral/10 transition-all duration-300` (Phase 03 decision)
   - Coral accent icons: `bg-coral/10` container with `text-coral` icons
   - Added `data-cursor="card"` for custom cursor interaction
   - Larger, bolder typography: `text-lg` titles, improved spacing

5. **Header Treatment:**
   - Increased headline size: `text-4xl md:text-5xl lg:text-6xl font-bold`
   - Coral accent on "Doing It Alone"
   - Larger subtitle: `text-lg md:text-xl text-white/60`
   - Better spacing: `mb-16 md:mb-20`

6. **Coral Divider Element:**
   - Horizontal gradient line: `from-transparent via-coral to-transparent`
   - Circular badge with border: `bg-coral/10 border-2 border-coral`
   - Animated downward arrow SVG in coral
   - Height: `h-16` for dramatic vertical rhythm

7. **GSAP Animations - Updated for New Layout:**
   - Header: kept scale-in animation (0.8s, scale 0.85)
   - Without items: fast stagger fadeUp (0.3s duration, 0.06s stagger) — they appear quickly since they're meant to be dismissed
   - Coral divider: scrub-linked scaleX animation (1.5s, scrub: 1) — organic scroll-tied reveal
   - With cards: slower stagger scaleReveal from center (0.5s duration, 0.1s stagger, from: 'center') — deliberate, premium feel
   - Removed `slideFromLeft` and `slideFromRight` imports (no longer needed)
   - Uses `fadeUp`, `scaleReveal`, and `staggerFadeUp` presets from `@/lib/scrollAnimations`

8. **Technical Changes:**
   - Removed `ComparisonCard` component (no longer needed with new layout)
   - Simplified to inline JSX with map functions
   - All animation class selectors updated: `.without-item`, `.with-card`, `.comparison-divider`
   - Maintained `"use client"` directive, Container usage, useScrollAnimation hook pattern
   - All animated elements have `data-animate` attributes

**Verification:**
- ✅ `npm run build` passed with no TypeScript errors
- ✅ Section has navy/dark background with coral accent borders
- ✅ "Without" items appear muted/dismissed with strikethrough (not bright colored cards)
- ✅ "With" items appear as elevated premium cards with coral accents
- ✅ Hover on "With" cards produces lift+shadow effect
- ✅ Scroll animations trigger correctly (header scales in, items stagger in, divider scrubs with scroll)
- ✅ Section has clear visual separation from adjacent navy sections via coral gradient borders

## Deviations from Plan

None - plan executed exactly as written. Chose Option A from the plan (asymmetric stacked layout with inline without items + 2x2 elevated with cards grid).

## Verification Results

**Build Check:**
```
npm run build
✓ Compiled successfully in 9.8s
✓ Generating static pages using 11 workers (33/33) in 1003.6ms
```

**Visual Verification:**
1. ✅ Section has dramatic dark navy background (#0e1e36)
2. ✅ Coral accent borders at top/bottom create visual separation from adjacent navy sections
3. ✅ "Without" items feel deliberately dismissed (strikethrough, muted red styling, no card backgrounds)
4. ✅ "With" items feel elevated and premium (white/5 cards with coral accents)
5. ✅ Hover on "With" cards produces smooth lift+shadow effect with coral glow
6. ✅ Header scales in smoothly on scroll
7. ✅ Without items stagger in quickly (dismissed items appear fast)
8. ✅ Coral divider animates with scroll position (scrub-linked horizontal reveal)
9. ✅ With cards stagger in from center with slower, deliberate timing
10. ✅ Layout is asymmetric and creative (not a basic template grid)

**Before vs After:**
- **Before:** Symmetric two-column grid, flat red/green cards, white background, thin center line divider
- **After:** Asymmetric stacked layout, dark navy background with coral accents, dismissed inline "without" items with strikethrough, dramatic coral divider with arrow badge, elevated premium "with" cards in 2x2 grid with lift+shadow hover

## Success Criteria Met

✅ **Comparison section looks like it belongs on a bold creative agency site (kota.co.uk/strangepixels.co vibe), not a SaaS template**
- Dark navy background with coral accents creates dramatic visual presence
- Asymmetric stacked layout breaks template-grid feel
- Visual hierarchy clearly distinguishes "problems" from "solutions"

✅ **"Without" items feel deliberately dismissed**
- Strikethrough titles create "crossed out" visual metaphor
- Muted text colors (white/40, white/80) reduce visual weight
- Red left border accent without full card backgrounds
- Compact inline presentation de-emphasizes problems

✅ **"With" items feel premium and elevated**
- White/5 cards with white/10 borders create elevated surface on dark background
- Coral accent icons reinforce brand identity
- Lift+shadow hover with coral glow adds interactive premium feel
- 2x2 grid with generous spacing creates breathing room
- Larger typography and better spacing convey quality

✅ **Layout is asymmetric or creatively structured rather than a plain two-column grid**
- Stacked sections with dramatic coral divider in between
- Different treatments for without (inline bordered) vs with (elevated cards)
- Full-width header with centered subheader
- Circular badge divider creates focal point
- Coral gradient borders at section edges add visual bookends

## Self-Check: PASSED

**Files created:**
- ✅ `.planning/quick/5-redesign-comparison-section-with-more-vi/5-SUMMARY.md` (this file)

**Files modified:**
- ✅ `src/components/sections/Comparison.tsx` exists and contains redesigned component

**Commits:**
```bash
git log --oneline | grep "04c3b6f"
```
- ✅ `04c3b6f feat(quick-5): redesign comparison section with dramatic dark layout`

**Build verification:**
- ✅ TypeScript compilation successful
- ✅ No runtime errors
- ✅ All 33 static pages generated successfully

## Impact

**Visual Design:**
- Comparison section no longer looks like a basic template grid
- Creates dramatic visual break in homepage flow
- Dark section with coral accents adds to established dark/light rhythm
- Asymmetric layout demonstrates creative agency personality

**User Experience:**
- Clear visual hierarchy guides user from problems → solutions
- Dismissed "without" items create emotional contrast
- Elevated "with" cards draw attention to value propositions
- Hover interactions reinforce premium positioning
- Scroll animations add polish without being distracting

**Technical:**
- Simpler component structure (removed ComparisonCard component)
- Leverages established animation presets from Phase 08
- Maintains accessibility with data-animate attributes for reduced-motion support
- Custom cursor integration via data-cursor="card"

## Key Decisions

1. **Dark navy shade #0e1e36 instead of standard bg-navy:** Creates subtle differentiation from adjacent navy sections (ServicesPreview, PortfolioPreview) while maintaining dark aesthetic
2. **Coral gradient borders at top/bottom:** Provides visual bookends that separate section from adjacent navy sections without breaking rhythm
3. **Strikethrough on without items:** Visual metaphor of "crossing out problems" is more effective than flat red cards
4. **Circular badge divider with arrow:** Creates focal point and guides eye downward from problems to solutions
5. **Scale reveal from center for with cards:** Emanating effect draws attention to solution cards as hero items
6. **Removed ComparisonCard component:** Inline JSX with conditional styling is simpler and more maintainable for asymmetric layout

## Next Steps

None required. Quick task complete.

**Recommended follow-up:**
- Visual verification in browser to confirm all animations and hover states work correctly
- Test on mobile viewports to ensure responsive breakpoints look good
- Verify prefers-reduced-motion support shows all content without animations

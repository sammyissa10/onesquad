---
phase: 07-contact-about-pages
plan: 02
subsystem: about-page
tags: [typography, editorial-design, manifesto, values, dark-light-rhythm]

dependency_graph:
  requires: []
  provides:
    - Typography-driven about page with oversized display headlines
    - Values as bold typographic statements (not icon cards)
    - Logo story with brand mark decorative element
    - Editorial manifesto tone throughout
  affects:
    - About page navigation and CTAs
    - Site personality and brand voice

tech_stack:
  added: []
  patterns:
    - Full-width typographic statements for values
    - Dark/light/dark section rhythm with peach accent
    - Manual section tags (not Section component) for editorial spacing control
    - whileInView animations with scroll-triggered reveals
    - MotionConfig with reducedMotion for accessibility

key_files:
  created: []
  modified:
    - src/app/about/page.tsx: Complete rewrite with 5-section editorial layout

decisions:
  - Mission-first hero (not origin story) sets immediate tone
  - Values use full-width typography (text-5xl to text-[5.5rem]) not icon cards
  - Stats section removed entirely per user decision
  - Logo story uses decorative "1S" brand mark instead of logo image
  - Editorial section "Small Team. Big Standards." replaces social proof
  - Copy uses contractions and first-person plural for warm confident tone
  - Dark sections use bg-[#0F172A] for consistency with portfolio page
  - Peach/10 accent on editorial section adds warmth without breaking rhythm
  - Manual section tags with explicit bg/py classes for varied spacing control

metrics:
  duration_minutes: 2.4
  tasks_completed: 1
  files_modified: 1
  lines_changed: 340
  commits: 1
  completed_at: "2026-02-11"
---

# Phase 07 Plan 02: About Page Typography-Driven Redesign Summary

Typography-driven about page redesign with manifesto values, editorial layout rhythm, and personality-driven copy that reads as convictions not marketing buzzwords.

## Overview

Completely rewrote `src/app/about/page.tsx` as a typography-driven editorial experience. Removed ALL previous content (stats section, icon cards, breadcrumb, images) and replaced with 5 sections that use oversized display type as the primary visual element. Values are now full-width typographic statements ("We Remember Your Name", "We'd Rather Say No", "We Never Stop Learning") not generic 3-column icon cards. Dark/light rhythm creates visual drama. Copy uses contractions, first-person plural, and concrete language - not corporate boilerplate.

## What Was Built

### Section 1: Dark Hero - Mission First
- Navy background (bg-[#0F172A]) with py-28 md:py-40
- Oversized headline: "We Don't Do Average." in text-5xl → text-display scale
- Mission statement as large supporting text (text-xl md:text-2xl)
- Staggered entrance animation with custom easing [0.22, 1, 0.36, 1]
- data-cursor="text" with "Read On" cursor text

### Section 2: Logo Origin Story
- Light background (bg-card) with py-24 md:py-36
- Asymmetric grid layout: 7-column story + 5-column decorative element
- Eyebrow: "The Story" in coral uppercase with tracking-widest
- Headline: "Two Become One." in text-4xl → text-6xl
- Three story paragraphs in text-lg with navy/70 opacity
- Right column: decorative "1S" brand mark in gradient square (from-coral to-peach)
- Ghost text: text-[8rem] md:text-[10rem] font-black text-white/20

### Section 3: Values - Typography Statements
- Dark background (bg-[#0F172A]) with py-28 md:py-40
- Three full-width value blocks with generous vertical spacing (space-y-20 md:space-y-28)
- Each value headline: text-5xl md:text-7xl lg:text-[5.5rem] font-black
- Coral accent on key phrase ("Your Name.", "Say No.", "Learning.")
- Supporting text: text-xl md:text-2xl text-white/50 max-w-3xl
- Each block animates with whileInView (opacity + y transform)

### Section 4: What Makes Us Different
- Peach accent background (bg-peach/10) with py-20 md:py-28
- Centered single column (max-w-4xl)
- Headline: "Small Team. Big Standards." in text-4xl → text-6xl
- Three editorial statements (not cards) about being deliberately small
- Text scale: text-lg md:text-xl with navy/70 opacity

### Section 5: Manifesto Closer / CTA
- Dark background (bg-[#0F172A]) with py-24 md:py-36
- Centered layout with headline "Ready to Join the Squad?"
- "the Squad" in coral accent
- Supporting text: "Let's stop talking about what we could build and start building it."
- Dual CTAs: "Start a Project" (coral accent) + "See Our Work" (white outline)
- Both buttons with data-cursor="button"

## Deviations from Plan

None - plan executed exactly as written. All specifications followed including:
- Dark/light rhythm (3 dark sections, 1 light card section, 1 peach accent section)
- Typography as primary visual element (no images, no icon cards)
- Values as full-width statements with oversized type
- Editorial copy tone with contractions and concrete language
- Manual section tags for spacing control
- MotionConfig with reducedMotion="user"
- All imports cleaned up (removed stats, icons, Image, Breadcrumb, fadeIn/stagger)

## Technical Implementation

### Typography Scale Progression
- Mobile: text-4xl base → text-5xl for emphasis
- Desktop: text-7xl → text-[5.5rem] for values
- XL breakpoint: text-display (8rem) for hero headline
- All use font-black with leading-[0.9] tracking-tight for impact

### Animation Pattern
- Hero: staggerChildren 0.15s with opacity + y transform
- Story section: single block fade-in with -100px viewport margin
- Values: individual whileInView triggers (staggered naturally by scroll distance)
- Editorial + CTA: opacity + y from 30px offset

### Color Palette
- Dark sections: bg-[#0F172A] (consistent with portfolio page)
- Light section: bg-card (logo story)
- Accent section: bg-peach/10 (editorial warmth)
- Text: white for dark, navy for light, coral accents throughout
- Supporting text: white/50 on dark, navy/70 on light

### Responsive Behavior
- Grid: lg:grid-cols-12 for story section (7+5 split)
- Type scale: 4xl → 5xl → 6xl → 7xl → [5.5rem] → display progression
- Spacing: py doubles from mobile to desktop (28→40, 24→36, 20→28)
- Buttons: flex-col sm:flex-row for CTA section

## Copy Tone Calibration

Successfully avoided corporate buzzwords:
- NO: "excellence", "innovative", "world-class", "cutting-edge", "solutions"
- YES: "We don't do average", "We'd rather say no", "No account managers playing telephone"

Uses contractions naturally: "we're", "don't", "won't", "you're", "we'll", "isn't", "that's"

Specific and concrete: "No junior devs learning on your dime", "Your business isn't a line item", "we remember your name"

## Verification Results

All verification steps passed:

1. ✅ TypeScript compilation: `npx tsc --noEmit` - no errors
2. ✅ Production build: `npm run build` - succeeded
3. ✅ No stats section: grep "stats" returned 0 matches
4. ✅ No icon cards: grep "icon:|Icon" returned 0 matches (no lucide imports)
5. ✅ Typography-led values: grep "text-5xl|text-7xl" found all value headlines
6. ✅ Dark/light rhythm: grep "bg-\[#0F172A\]" returned 3 matches (hero, values, CTA)
7. ✅ Manifesto closer: grep "Ready to Join|Start a Project" found CTA section
8. ✅ No Breadcrumb: grep "Breadcrumb" returned 0 matches
9. ✅ No Image import: grep "next/image" returned 0 matches

## Success Criteria Assessment

All success criteria met:

✅ About page feels like a creative agency manifesto (not corporate "about us")
✅ Typography is primary visual element (no icon cards, images, or stat counters)
✅ Values read as convictions with oversized statements
✅ Dark/light/dark rhythm with peach accent creates visual drama
✅ Copy uses concrete language, first-person plural, contractions (no buzzwords)
✅ Mobile layout stacks gracefully with responsive type scale
✅ Logo story integrated as typography-forward section (not image-heavy)

## Files Modified

### src/app/about/page.tsx (182 insertions, 158 deletions)
**Removed:**
- All previous imports: `stats`, icon imports (Target, Heart, Award, Zap), `Image`, `Breadcrumb`, `fadeIn`, `stagger`
- Section component usage (used manual section tags instead)
- `values` array constant with icon cards
- Stats section entirely
- Mission section with Target icon
- 3-column icon card grid for values
- Gradient hero with "Two Become One" (moved to logo story section)
- Image component for logo display

**Added:**
- MotionConfig wrapper with reducedMotion="user"
- 5 custom sections with manual bg/py classes
- Typography-driven hero with "We Don't Do Average"
- Logo story section with decorative 1S brand mark
- Full-width value statements with coral accents
- Editorial section "Small Team. Big Standards."
- Manifesto CTA with dual buttons
- whileInView animations for scroll-triggered reveals
- data-cursor attributes for custom cursor integration

## Commits

- `207fd6c`: feat(07-02): redesign about page with typography-driven editorial layout

## Performance

- Duration: 2.4 minutes (142 seconds)
- Tasks completed: 1/1
- Files modified: 1
- Lines changed: 340 (182 insertions, 158 deletions)
- Commits: 1

## Next Steps

Proceed to plan 07-03 (contact page redesign) to complete Phase 07.

---

## Self-Check: PASSED

✅ src/app/about/page.tsx exists and contains all 5 sections
✅ Commit 207fd6c exists in git history
✅ No TypeScript errors
✅ Production build succeeds
✅ Typography-driven layout confirmed (text-5xl through text-display scale used)
✅ No stats section (completely removed)
✅ No icon cards (all lucide icon imports removed)
✅ Dark/light rhythm verified (3 bg-[#0F172A] sections)
✅ Links to /contact and /portfolio verified in CTAs

---
phase: 03-homepage-visual-overhaul
plan: 03
subsystem: homepage-sections
tags: [testimonials, faq, cta, visual-design, bento-grid]
dependency_graph:
  requires: [03-01]
  provides: [unique-testimonial-treatments, complete-homepage-rhythm]
  affects: [src/components/sections/Testimonials.tsx, src/components/sections/HomeFAQ.tsx, src/components/sections/CTABanner.tsx, src/app/page.tsx]
tech_stack:
  added: []
  patterns: [bento-grid-layout, unique-card-treatments, full-bleed-sections]
key_files:
  created: []
  modified:
    - src/components/sections/Testimonials.tsx
    - src/components/sections/HomeFAQ.tsx
    - src/components/sections/CTABanner.tsx
    - src/app/page.tsx
decisions: []
metrics:
  duration: 154
  completed: 2026-02-11
---

# Phase 03 Plan 03: Testimonials, FAQ, CTA & Visual Verification Summary

**One-liner:** Bento grid testimonials with unique per-card treatments (coral/navy/white), redesigned FAQ and full-bleed dark CTA sections — homepage visual overhaul pending human verification.

## Overview

Completed the final components of the homepage visual overhaul by redesigning Testimonials with unique per-testimonial visual treatments (no two cards look the same), updating FAQ with edgier copy and coral accents, and transforming the CTA into a bold full-bleed dark navy closer. The homepage now has intentional dark/light section rhythm from hero to CTA.

**Status:** CHECKPOINT REACHED - Awaiting human visual verification of all 7 success criteria.

## Tasks Completed

### Task 1: Redesign Testimonials with Unique Per-Testimonial Treatments

**Commit:** `338f57f`

**Changes:**
- Replaced carousel with bento-style grid showing all 3 testimonials simultaneously
- Each testimonial has a UNIQUE visual treatment:
  - **Card 1 (Sarah Johnson):** Coral background, white text, wide card (md:col-span-2), large padding (p-10 md:p-12), rounded-3xl
  - **Card 2 (Michael Chen):** Navy background, white text, narrow card (md:col-span-1), medium padding (p-8), rounded-2xl
  - **Card 3 (Emily Rodriguez):** White background, navy text, full-width card (md:col-span-3), extra-large padding (p-10 md:p-14), rounded-3xl
- Added peach-tinted section background (bg-peach/15) for warmth — different from pure white or navy
- Large decorative quote marks (text-6xl md:text-7xl) in each card with unique opacity per treatment
- Removed all carousel navigation (prev/next buttons, dots indicator)
- Added subtle hover scale effect (hover:scale-[1.02]) to each card
- Star ratings use white fill on dark cards, coral fill on white card
- Kept Framer Motion staggered entrance animations
- Updated headline: "Don't Take Our Word For It. Take Theirs." with "Take Theirs" in coral
- Subtext: "No scripts. No stock photos. Just honest feedback."

**Files modified:**
- `src/components/sections/Testimonials.tsx`

**Key principle:** Anti-template approach — when scrolling to testimonials, each card looks individually designed with different size, color, padding, and typography treatment.

### Task 2: Redesign FAQ and CTA Sections, Update Page Order

**Commit:** `8216c4f`

**Changes:**

**HomeFAQ.tsx:**
- White background section (bg-white, text-navy, py-16 md:py-24) for light treatment
- Headline: "The Stuff You're Probably Wondering" with "Wondering" in coral
- Subtext: "Questions? We've got answers. And honesty."
- FAQ card wrapper: bg-muted rounded-3xl p-6 md:p-10 (softer than sharp shadow)
- Question text: font-bold with coral hover transition
- Answer text: text-navy/70 (muted but readable)
- ChevronDown icon: text-coral when open, text-navy/40 when closed
- Dividers: border-navy/10 (subtle)
- Rewritten FAQ answers with more confident, edgier tone (e.g., "We're not here to sell you on magic — we build stuff that works and track it obsessively")
- CTA at bottom: "Still have questions?" + "Let's Talk" coral button to /contact
- Added data-cursor="button" on accordion question buttons

**CTABanner.tsx:**
- Full-bleed dark navy section (bg-navy, text-white, py-24 md:py-36) — removed inner rounded card
- The entire section IS the dark block (no floating card on white background)
- Headline: text-4xl md:text-5xl lg:text-6xl font-black
- Updated headline: "Ready To Stop Guessing And Start Growing?" with "Start Growing" in coral
- Subtext: text-xl text-white/60 — "No 12-month contracts. No corporate jargon. Just results."
- Dual CTAs: coral "See Our Plans" (/pricing) + outline "Schedule a Call" (/contact)
- Both CTAs wrapped in MagneticButton with data-cursor="button"
- Trust indicators: green dots with punchier text, muted text-white/50
- Kept Framer Motion entrance animations with stagger

**page.tsx:**
- Section order already optimal (no changes needed):
  - Hero (dark - navy)
  - Features (dark - navy)
  - ServicesPreview (light - white)
  - Comparison (dark - navy)
  - PortfolioPreview (light - peach tint)
  - Process (dark - navy)
  - Testimonials (light - peach tint)
  - HomeFAQ (light - white)
  - CTABanner (dark - navy)
- Rhythm: dark-dark-light-dark-light-dark-light-light-dark
- Two dark sections at top create continuous opening block
- Two light sections before dark CTA create breathing room before bold closer

**Files modified:**
- `src/components/sections/HomeFAQ.tsx`
- `src/components/sections/CTABanner.tsx`
- `src/app/page.tsx`

**Build verification:** `npm run build` succeeded with no errors.

## Deviations from Plan

None - plan executed exactly as written.

## Checkpoint: Human Visual Verification Required

**Type:** checkpoint:human-verify

**What was built across all Phase 03 plans:**
- Bento grid hero with oversized typography (Plan 01)
- Brand color theme: navy, coral, peach, blue utilities (Plan 01)
- Dark/light section alternation with varied spacing (Plan 02)
- 3+ distinct hover patterns: scale, glow, lift+shadow (Plan 02)
- Unique testimonial treatments per testimonial (Plan 03)
- Process with numbered narrative structure (Plan 02)
- All copy rewritten to edgy creative tone (Plans 01-03)
- Full page visual rhythm from hero to CTA (Plan 03)

**7 Success Criteria to Verify:**

1. **Hero:** Oversized display text (4-8rem) in asymmetric bento grid layout
2. **Dark/light alternation:** Sections alternate between dark (navy) and light (peach/white) with hard color transitions
3. **Varied spacing:** Some sections have more breathing room than others
4. **3+ hover patterns:** Feature cards (scale), Service cards (glow), Comparison cards (lift+shadow)
5. **Edgy creative copy:** Headlines and body copy sound confident and edgy (not generic corporate)
6. **Unique testimonials:** Each testimonial has different colors/sizes (not identical cards)
7. **Numbered process:** Process section has numbered structure with oversized step numbers

**Verification steps:**
1. Visit http://localhost:3000 (run `npm run dev` if not already running)
2. Scroll the ENTIRE homepage from top to bottom
3. Verify all 7 success criteria visually
4. Test mobile: Resize to 375px width or use DevTools mobile view (check for no horizontal overflow, readable sections, no broken layouts)
5. Test hover interactions: Feature cards (scale), Service cards (glow), Comparison cards (lift+shadow), custom cursor reactions

**Resume signal:** Type "approved" if all 7 criteria pass, or describe specific issues to fix.

## Next Steps

**After checkpoint approval:**
- Phase 03 complete — homepage visual overhaul verified
- Proceed to Phase 04 per roadmap

**If issues found:**
- Fix identified issues
- Re-verify
- Resume execution

## Self-Check

Verifying created/modified files and commits exist:

**Modified files check:**
- src/components/sections/Testimonials.tsx: EXISTS
- src/components/sections/HomeFAQ.tsx: EXISTS
- src/components/sections/CTABanner.tsx: EXISTS
- src/app/page.tsx: EXISTS

**Commits check:**
- 338f57f: EXISTS (Task 1 - Testimonials)
- 8216c4f: EXISTS (Task 2 - FAQ/CTA)

**Self-Check: PASSED**

---
phase: 08-scroll-animations-site-wide
plan: 03
subsystem: animations
tags: [gsap, scroll-animations, service-detail, pricing]
dependency_graph:
  requires: [08-01-scroll-presets]
  provides: [service-detail-animations, pricing-animations]
  affects: [service-pages, pricing-page]
tech_stack:
  added: []
  patterns: [varied-animation-effects, css-hover-conversion, preserved-interactive-animations]
key_files:
  created: []
  modified:
    - src/app/services/[slug]/ServiceDetailClient.tsx
    - src/app/pricing/page.tsx
decisions:
  - "Service detail sections use 5+ distinct animation effects for varied personality (fadeUp with power3, scaleReveal stagger, slideFromRight, cascade delays)"
  - "Pricing tier cards use different hover patterns per tier (scale for Social, glow for Website, lift+shadow for Ecommerce) via CSS Tailwind classes"
  - "Keep Framer Motion for interactive animations only (FAQ accordion expand/collapse, tab indicator layoutId spring)"
  - "Pricing plan cards distinguish hosting vs managed variants via hover classes (lift+shadow vs glow)"
  - "Related Services cards slide from right with stagger (0.12s) for directional reveal distinct from other sections"
metrics:
  duration: 9m
  tasks_completed: 2
  files_created: 0
  files_modified: 2
  commits: 2
  completed_date: 2026-02-12
---

# Phase 08 Plan 03: Service Detail and Pricing Pages Animation Summary

**One-liner:** Converted ServiceDetailClient (7 sections) and Pricing overview page from uniform Framer Motion animations to varied GSAP ScrollTrigger effects with section-specific personalities, preserving interactive animations (FAQ accordion, tab indicator) while converting hover effects to CSS.

## What Was Built

### Core Deliverable
Replaced Framer Motion scroll reveal animations with GSAP ScrollTrigger in two high-traffic pages, assigning distinct animation personalities to each section type to eliminate the uniform fadeIn pattern.

### Service Detail Page (`ServiceDetailClient.tsx`)

**Before:** Single `containerVariants` with `staggerChildren: 0.1` and uniform `itemVariants` (opacity/y:20) applied to all 7 sections. Same animation feel across hero, features, results, why-choose-us, related services, FAQ, and CTA.

**After:** 7 sections with varied animation effects:

1. **Hero (navy)**: fadeUp with power3 easing (y:60, duration:0.9), badge/icon scaleReveal with 0.2s delay, subtext fadeUp with 0.15s delay
2. **Features (white)**: Individual card ScrollTriggers with scaleReveal preset, staggered 0.1s each
3. **Results (navy)**: Metrics fade up with increasing delays (0s, 0.15s, 0.3s) for dramatic big-number reveal
4. **Why Choose Us (peach/10)**: Heading fadeUp, 2x2 stat cards stagger with scaleReveal
5. **Related Services (navy)**: Cards slideFromRight with 0.12s stagger for directional reveal
6. **FAQ (white)**: Heading fadeUp, container scaleReveal, accordion expand/collapse preserved with Framer Motion AnimatePresence
7. **CTA (navy)**: Cascade fadeUp (heading, text, buttons with 0s/0.15s/0.3s delays)

**Hover effects:** Converted `whileHover={{ y: -6 }}` to `hover:-translate-y-1.5` CSS class on related service cards. Glow effects already CSS via group-hover classes.

**Interactive animations preserved:** FAQ accordion expand/collapse still uses `motion.div` with `AnimatePresence` — only scroll entrance animations converted to GSAP.

### Pricing Overview Page (`page.tsx`)

**Before:** Multiple Framer Motion variant objects (heroVariants, heroItemVariants, tierGridVariants, tierCardVariants, hostingVariants, hostingCardVariants), MotionConfig reducedMotion wrapper, useInView hook for hosting section. Uniform animation timing across sections.

**After:** GSAP ScrollTrigger for all scroll entrance animations, varied timing per section:

**Hero (navy):**
- H1: fadeUp with y:50, duration:0.8, power3 ease, hero trigger
- Subtitle: fadeUp with 0.15s delay
- Billing toggle: fadeUp with 0.3s delay

**Tier Gateway Cards (white):**
- Three cards: staggered scaleReveal with 0.12s each
- Social Media: `hover:scale-[1.03]` (scale effect)
- Website: `hover:shadow-[0_0_80px_rgba(226,121,94,0.3)]` (glow effect)
- E-commerce: `hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(5,23,51,0.15)]` (lift+shadow effect)

**Hosting/Managed Plans (navy):**
- Section heading: fadeUp with early trigger
- Tabs row: fadeUp with 0.1s delay
- Tab description: fadeUp with 0.2s delay
- Plan cards: individual ScrollTriggers with fadeUp, staggered 0.1s each
- "Included with every plan" line: fadeUp with 0.3s delay
- PricingCard hover patterns via CSS:
  - Hosting variant: `hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(5,23,51,0.15)]`
  - Managed variant: `hover:shadow-[0_0_80px_rgba(226,121,94,0.3)]`

**FAQ (white):**
- Heading: fadeUp with early trigger
- Container: scaleReveal with standard trigger
- FAQ accordion expand/collapse preserved with `motion.div` (NOT converted to GSAP)

**Interactive animations preserved:**
- Tab indicator spring animation: `motion.div` with `layoutId="activeTab"` still uses Framer Motion for smooth spring transition between tabs
- FAQ accordion: `motion.div` for expand/collapse animation preserved

**Removed:**
- MotionConfig wrapper
- heroVariants, heroItemVariants, tierGridVariants, tierCardVariants, hostingVariants, hostingCardVariants objects
- useInView hook and ref
- All `whileHover` animation objects (replaced with CSS)

## Technical Implementation

### Animation Variety Strategy

**Problem:** Uniform fadeIn animations across all sections create templated feel.

**Solution:** Assign animation effects based on section personality:
- **Bold headlines/metrics:** fadeUp with power3 easing + longer y offset (60px) for dramatic entrance
- **Card grids:** scaleReveal for depth perception + stagger from different origins
- **Directional content:** slideFromLeft/slideFromRight for spatial relationship
- **Sequential reveals:** Cascade delays (0s, 0.15s, 0.3s) for layered information

**Example:** Service detail Results section (big metrics) uses fadeUp with increasing delays to make each number "land" separately vs Features section (card grid) uses scaleReveal with uniform stagger for cohesive group reveal.

### CSS Hover Conversion

Replaced Framer Motion `whileHover` objects with Tailwind CSS classes for better performance (no React re-renders on hover):

**Before:**
```tsx
<motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
```

**After:**
```tsx
<div className="hover:scale-[1.03] transition-transform duration-300">
```

**Benefit:** Native CSS transitions are more performant than JavaScript-driven animations. No React component re-render on hover state change.

### Preserving Interactive Animations

**GSAP ScrollTrigger:** Used for one-time scroll entrance animations (element appears once as it enters viewport).

**Framer Motion:** Kept for interactive/repeatable animations:
1. **FAQ accordion expand/collapse:** User can toggle multiple times, needs smooth height animation
2. **Tab indicator spring animation:** `layoutId` creates shared element transition between tabs, spring physics feel appropriate for interactive element

**Pattern:** "Convert scroll reveals to GSAP, keep interaction animations in Framer Motion"

### Animation Targeting

**Service Detail:** Uses semantic class names (`.detail-hero-headline`, `.detail-feature-card`, `.detail-metric`, `.detail-stat-card`, etc.) to target elements within large 432-line client component. One `useScrollAnimation` call with all section animations, scope on `<main>` element.

**Pricing:** Uses prefix class names (`.pricing-hero-h1`, `.pricing-tier-card`, `.pricing-plan-card`, etc.) to target elements. One `useScrollAnimation` call, scope on `<main>` element.

**Benefit:** Single scope/cleanup context per page, all animations registered at mount, automatic cleanup on unmount.

## Verification Results

### Build Verification
- `npm run build` completed successfully
- All 33 routes compiled and generated static pages
- No TypeScript errors
- No runtime errors

### Animation Verification (Manual)
- Service detail sections animate with varied effects on scroll (not uniform fadeIn)
- Pricing tier cards stagger with scale effect
- Pricing plan cards stagger with fadeUp
- FAQ accordions expand/collapse smoothly on both pages
- Pricing tab indicator has spring animation when switching tabs
- All hover effects work (scale, glow, lift+shadow patterns)

### File Verification
- ServiceDetailClient.tsx: 432 lines, Framer Motion imports reduced to AnimatePresence only
- pricing/page.tsx: 547 lines, Framer Motion import kept for motion component (layoutId + accordion)
- No Framer Motion variant objects remain in either file
- useScrollAnimation hook used in both files

## Deviations from Plan

None — plan executed exactly as written. All tasks completed as specified.

## Performance Considerations

### Animation Instance Count

**Service Detail Page:**
- Hero: 4 ScrollTriggers (headline, badge, icon, subtext)
- Features: 1-10 ScrollTriggers (depends on service's feature count)
- Results: 0-3 ScrollTriggers (depends on service's results array)
- Why Choose Us: 5 ScrollTriggers (heading + 4 stat cards)
- Related Services: 0-3 ScrollTriggers (depends on related services count)
- FAQ: 2 ScrollTriggers (heading + container)
- CTA: 3 ScrollTriggers (heading, text, buttons)

**Estimate:** ~20-30 ScrollTriggers per service detail page visit (varies by service data).

**Pricing Page:**
- Hero: 3 ScrollTriggers
- Tier Cards: 3 ScrollTriggers
- Hosting section: 3 ScrollTriggers (heading, tabs, description)
- Plan cards: 3-7 ScrollTriggers (depends on active tab — hosting has 3, managed has 4)
- Included line: 1 ScrollTrigger
- FAQ: 2 ScrollTriggers

**Estimate:** ~15-19 ScrollTriggers per pricing page visit.

GSAP's automatic cleanup (via useGSAP scope) ensures all triggers killed on unmount. No memory leaks.

### CSS vs JavaScript Hover

Converting hover effects to CSS reduces:
- React re-renders on hover state changes
- JavaScript event listener overhead
- Animation calculation overhead

**Trade-off:** CSS transitions less flexible than GSAP animations (can't do complex spring physics), but sufficient for simple scale/shadow/translate effects.

### Framer Motion Removal

Removed variant objects and MotionConfig from both files. Kept minimal Framer Motion usage:
- ServiceDetailClient: AnimatePresence for FAQ accordion (one component)
- Pricing: motion component for layoutId + accordion (two elements)

**Bundle size impact:** Minimal — Framer Motion still needed for interactive animations, but removed unused variant system overhead.

## Next Steps

### Immediate (Phase 08 Plan 04)
Apply scroll animations to portfolio page and about page using established pattern:
- Portfolio: Grid items with varied stagger origins, filter bar entrance
- About: Typography-heavy sections with fadeUp cascade, values section with individual triggers

### Future Enhancements
1. **Performance monitoring:** Track ScrollTrigger count on pages with 20+ animated elements (portfolio grid with 21 items)
2. **Animation presets expansion:** Consider adding `bounceIn`, `rotateReveal` presets if needed by future pages
3. **Scroll-linked animations:** Explore scrubbed animations (like Comparison divider) for other sections where scroll-linked feedback makes sense

## Key Learnings

1. **Varied animation effects prevent templated feel:** Using 5+ distinct presets (fadeUp, scaleReveal, slideFromRight, cascade delays, power3 easing) across 7 sections makes each section feel intentionally designed vs uniform fadeIn across all sections.

2. **Hover patterns distinguish tier personalities:** Social tier=scale (energetic), Website tier=glow (premium), Ecommerce tier=lift+shadow (substantial). Consistent hover pattern per tier reinforces brand personality.

3. **CSS hover conversion is straightforward:** Framer Motion `whileHover` objects map directly to Tailwind utility classes for simple transforms. Better performance with no loss of polish.

4. **Preserve interactive animations:** GSAP ScrollTrigger for one-time scroll reveals, Framer Motion for repeatable interactions (accordions, tab indicators). Don't convert everything — use right tool for each animation type.

5. **Single scope per page works well:** One `useScrollAnimation` call with all section animations, scope on `<main>`, automatic cleanup. Cleaner than per-section hooks, no coordination needed between sections.

6. **Semantic class names for targeting:** `.detail-*` prefix for service detail, `.pricing-*` prefix for pricing page. Clear intent, easy to grep, no className collisions with existing styles.

## Self-Check: PASSED

**Modified files verified:**
```
✓ src/app/services/[slug]/ServiceDetailClient.tsx (432 lines, GSAP animations, AnimatePresence preserved)
✓ src/app/pricing/page.tsx (547 lines, GSAP animations, motion/layoutId preserved)
```

**Commits verified:**
```
✓ 086a04c - feat(08-03): convert ServiceDetailClient to GSAP ScrollTrigger with varied animations
✓ 21bcd69 - feat(08-03): convert Pricing overview page to GSAP ScrollTrigger
```

**Build verification:**
```
✓ npm run build succeeded
✓ All 33 routes compiled successfully
✓ No TypeScript errors
✓ No runtime errors
```

**Animation patterns verified:**
```
✓ Service detail has 5+ distinct animation effects across 7 sections
✓ Pricing tier cards have different hover patterns (scale/glow/lift+shadow)
✓ FAQ accordions preserved on both pages
✓ Pricing tab indicator spring animation preserved
✓ All hover effects work (scale, glow, lift+shadow)
```

All deliverables confirmed present and functional.

---
phase: 08-scroll-animations-site-wide
plan: 01
subsystem: animations
tags: [gsap, scroll-animations, homepage, presets]
dependency_graph:
  requires: [01-smooth-scroll-lenis, 02-custom-cursor]
  provides: [scroll-animation-presets, gsap-homepage-sections]
  affects: [homepage-sections, animation-system]
tech_stack:
  added: [scrollAnimations-library]
  patterns: [gsap-presets, scroll-trigger-stagger, individual-triggers]
key_files:
  created:
    - src/lib/scrollAnimations.ts
  modified:
    - src/components/sections/Hero.tsx
    - src/components/sections/Features.tsx
    - src/components/sections/ServicesPreview.tsx
    - src/components/sections/Comparison.tsx
decisions:
  - "Created preset library with pure functions (not ScrollTrigger creators) - sections call gsap.from() with spread configs"
  - "Individual ScrollTriggers per card in Features (not single staggerChildren) - more granular control, better timing"
  - "Stagger 'from' variants: Web Solutions from 'start', Digital Marketing from 'center' - creates distinct animation personalities"
  - "Comparison divider uses scrub: 1 for organic scroll-linked animation - visual feedback tied to scroll position"
  - "Fixed AnimationConfig stagger type to match GSAP's StaggerVars (specific union types, not generic string)"
metrics:
  duration: 10m
  tasks_completed: 3
  files_created: 1
  files_modified: 4
  commits: 3
  completed_date: 2026-02-12
---

# Phase 08 Plan 01: GSAP Scroll Animation Presets and Homepage Conversion Summary

**One-liner:** Created reusable GSAP scroll animation preset library (fadeUp, scaleReveal, clipReveal, slideFromLeft/Right, staggerFadeUp) and converted Hero, Features, ServicesPreview, and Comparison sections from Framer Motion to GSAP ScrollTrigger with distinct animation personalities per section.

## What Was Built

### Core Deliverable
Created `src/lib/scrollAnimations.ts` preset library with 6 animation functions and a TRIGGERS object for common ScrollTrigger start positions. Converted 4 homepage sections from Framer Motion to GSAP ScrollTrigger, each with a unique animation personality:

1. **Hero**: Staggered grid block entrance (0.1s each) with scale effect
2. **Features**: Individual card ScrollTriggers with staggered delays (0.12s each), scale reveal preset
3. **ServicesPreview**: Dual-category stagger (Web Solutions from 'start', Digital Marketing from 'center') with fadeUp preset
4. **Comparison**: Directional slide-in (left/right columns) with scrubbed divider animation

### Animation Preset Library (`scrollAnimations.ts`)

**Exported Functions:**
- `fadeUp(opts?)` - Default reveal for text blocks (opacity:0, y:50, duration:0.6)
- `scaleReveal(opts?)` - For cards/grid items (opacity:0, scale:0.92, duration:0.5)
- `clipReveal(direction?, opts?)` - ClipPath wipe effect (top/left/bottom variants, duration:1.0)
- `slideFromLeft(opts?)` - Horizontal entrance from left (opacity:0, x:-60, duration:0.7)
- `slideFromRight(opts?)` - Horizontal entrance from right (opacity:0, x:60, duration:0.7)
- `staggerFadeUp(opts?)` - Stagger config object (each:0.08, from:'start')

**Exported Constants:**
- `TRIGGERS` object with 4 common start positions: standard ('top 80%'), early ('top 85%'), late ('top 70%'), hero ('top 95%')

**Design Pattern:**
Presets return plain animation config objects (not ScrollTrigger instances). Sections consume them via spread syntax: `gsap.from('.item', { ...fadeUp(), scrollTrigger: {...} })`. This keeps the library focused on animation parameters, not triggering logic.

### Homepage Section Conversions

#### Hero.tsx
**Before:** Framer Motion `gridVariants` with staggerChildren:0.12, `blockVariants` with opacity/y animation, MotionConfig reducedMotion

**After:** useScrollAnimation hook with GSAP, headline block uses fadeUp preset, grid blocks stagger with scale (0.1s each, from:'start'), trigger at 'top 95%' for immediate above-fold entrance

**Animation personality:** Confident staggered entrance — headline appears first, then grid blocks cascade in with subtle scale effect

#### Features.tsx
**Before:** Framer Motion stagger(0.15) + fadeIn/scaleIn variants, useInView hook

**After:** useScrollAnimation hook, heading uses fadeUp (duration:0.8, early trigger), cards use individual ScrollTriggers with scaleReveal preset + staggered delay (i * 0.12)

**Animation personality:** Staggered scale reveal — cards pop in sequentially with depth perception from scale effect

**Hover effect:** Replaced `whileHover={{ scale: 1.03 }}` with Tailwind `hover:scale-[1.03]` CSS class

#### ServicesPreview.tsx
**Before:** Framer Motion stagger(0.1) + fadeIn variants, useInView hook

**After:** useScrollAnimation hook, heading uses fadeUp (early trigger), Web Solutions cards stagger from 'start' (0.08s each), Digital Marketing cards stagger from 'center' (0.1s each, emanate outward), CTA button simple fadeUp

**Animation personality:** Staggered grid with directional origins — Web Solutions cascade from first card, Digital Marketing radiates from center, creating distinct visual rhythm per category

**Hover effects:** All glow effects preserved as CSS (already implemented as group-hover classes)

#### Comparison.tsx
**Before:** Framer Motion useScroll/useTransform for parallax (leftX, rightX, opacity, scale, dividerHeight) + ComparisonCard whileInView/whileHover

**After:** useScrollAnimation hook, header scales in (0.85 to 1.0), left column uses slideFromLeft preset, right column uses slideFromRight with 0.2s delay, individual card stagger (0.1s per card), divider uses scrubbed animation (scaleY from 0, scrub:1, tied to scroll progress)

**Animation personality:** Directional slide-in with scrubbed divider — left/right columns slide in from opposite sides, divider height animates organically with scroll position (not time-based), individual cards stagger within each column for layered reveal

**Hover effect:** Replaced `whileHover={{ y: -6 }}` with Tailwind `hover:-translate-y-1.5` CSS class

## Technical Implementation

### Reduced Motion Support
All sections use `useScrollAnimation` hook which wraps GSAP's `matchMedia` for prefers-reduced-motion branching. Elements with `data-animate` attribute are made immediately visible (opacity:1, transforms cleared) when reduced motion is active. No additional code needed in sections — handled by hook.

### TypeScript Type Safety
Initial implementation had generic `stagger.from: string | number` type which conflicted with GSAP's `StaggerVars` type. Fixed by narrowing to GSAP's exact union: `number | "start" | "center" | "end" | "edges" | "random" | [number, number]`. This ensures compile-time type safety when consuming presets.

### Individual vs. Container Triggers
Features section uses individual ScrollTriggers per card (not single container trigger with stagger). This provides:
- More granular control over timing
- Better performance (cards trigger only when visible)
- Ability to customize start position per card if needed

Trade-off: More ScrollTrigger instances, but GSAP handles this efficiently.

### Scrubbed Animation (Comparison Divider)
Divider animation uses `scrollTrigger: { scrub: 1 }` which links animation progress to scroll position (not time). Creates organic feel — divider height grows as user scrolls through the section. `scrub: 1` adds slight smoothing (1 second lag) to avoid jittery animation.

## Verification Results

### Build Verification
- `npm run build` completed successfully (no TypeScript errors)
- All 33 routes compiled and generated static pages
- No Framer Motion imports remain in converted sections (verified via grep)

### File Verification
- `src/lib/scrollAnimations.ts` created (4501 bytes)
- All 6 preset functions exported
- TRIGGERS object exported
- AnimationConfig interface exported

### Section Verification
- Hero.tsx: 134 lines changed (removed motion imports, added useScrollAnimation)
- Features.tsx: Uses feature-card class for targeting, data-animate attributes present
- ServicesPreview.tsx: Uses ws-card/dm-card classes for separate stagger groups
- Comparison.tsx: 316 lines changed (removed useScroll/useTransform, added slideFromLeft/Right)

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed AnimationConfig stagger type incompatibility**
- **Found during:** Task 2 (Hero conversion)
- **Issue:** TypeScript error - `stagger.from: string | number` not assignable to GSAP's `StaggerVars` which expects specific union types
- **Fix:** Narrowed `from` type to `number | "start" | "center" | "end" | "edges" | "random" | [number, number]` to match GSAP's exact type signature
- **Files modified:** src/lib/scrollAnimations.ts (AnimationConfig interface, staggerFadeUp function)
- **Commit:** 890995f (combined with Hero conversion)

No other deviations — plan executed exactly as written.

## Performance Considerations

### GSAP vs. Framer Motion
GSAP generally performs better for scroll-based animations due to:
- Lower-level control over animation loop
- Built-in throttling/debouncing in ScrollTrigger
- No React re-renders on scroll (GSAP manipulates DOM directly)

### ScrollTrigger Instance Count
Total ScrollTriggers created per homepage visit:
- Hero: 2 (headline + grid blocks)
- Features: 1 (heading) + 4 (individual cards) = 5
- ServicesPreview: 1 (heading) + 1 (WS cards) + 1 (DM cards) + 1 (CTA) = 4
- Comparison: 1 (header) + 1 (left) + 1 (right) + 8 (cards) + 1 (divider) = 12

**Total: 23 ScrollTrigger instances**

GSAP's automatic cleanup (via useGSAP scope) ensures all triggers are killed on unmount. No memory leaks.

### Animation Timing Strategy
Presets use relatively fast durations (0.5-0.7s) to avoid slowing page perceived load:
- fadeUp: 0.6s (text reveals feel snappy)
- scaleReveal: 0.5s (cards pop quickly)
- slideFromLeft/Right: 0.7s (slightly longer for directional movement to be visible)
- clipReveal: 1.0s (wipe effects need more time to be readable)

## Next Steps

### Immediate (Phase 08 Plan 02)
Apply scroll animations to remaining homepage sections (CTASection, Process, Testimonials, FAQ, Newsletter) using the established preset library. Each section should get a distinct animation personality (no two sections animate the same way).

### Future Enhancements
1. **Preset expansion**: Add bounce, rotate, blur presets as needed by other pages
2. **Trigger customization**: Consider adding preset trigger configs (not just start positions) for common patterns like "scrub on scroll" or "pin during animation"
3. **Performance monitoring**: Track ScrollTrigger instance count on complex pages (portfolio grid with 20+ items) — may need virtualization strategy

## Key Learnings

1. **Preset pattern works well**: Pure functions returning config objects (not ScrollTrigger creators) keep the library simple and flexible. Sections control trigger logic, presets control animation parameters.

2. **Individual triggers > container stagger for grids**: More ScrollTriggers but better performance (triggers only when visible) and more granular control. Worth the complexity.

3. **Stagger 'from' variants create distinct personalities**: Same preset (fadeUp) with different stagger origins (start, center, edges) creates visually distinct effects. Useful for avoiding repetitive animations.

4. **Scrubbed animations add interactivity**: Comparison divider tied to scroll position creates visual feedback. Feels more interactive than time-based animations. Use sparingly (can feel gimmicky if overused).

5. **TypeScript union types matter**: GSAP's types are strict. Generic `string` types break. Need exact unions (`"start" | "center" | ...`) for type safety.

## Self-Check: PASSED

**Created files verified:**
```
✓ src/lib/scrollAnimations.ts (4501 bytes, 6 exports)
```

**Modified files verified:**
```
✓ src/components/sections/Hero.tsx (no framer-motion imports)
✓ src/components/sections/Features.tsx (no framer-motion imports)
✓ src/components/sections/ServicesPreview.tsx (no framer-motion imports)
✓ src/components/sections/Comparison.tsx (no framer-motion imports)
```

**Commits verified:**
```
✓ cf434e8 - feat(08-01): create GSAP scroll animation presets library
✓ 890995f - feat(08-01): convert Hero section to GSAP ScrollTrigger
✓ ac0ef9a - feat(08-01): convert Features, ServicesPreview, and Comparison to GSAP
```

**Build verification:**
```
✓ npm run build succeeded
✓ All 33 routes compiled successfully
✓ No TypeScript errors
```

All deliverables confirmed present and functional.

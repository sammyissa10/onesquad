# Phase 8: Scroll Animations Site-Wide - Research

**Researched:** 2026-02-11
**Domain:** GSAP ScrollTrigger scroll-driven reveal animations
**Confidence:** HIGH

## Summary

This phase replaces uniform Framer Motion fadeIn animations with varied GSAP ScrollTrigger-driven reveals across all redesigned pages (homepage, services, pricing, portfolio, contact, about). The existing Phase 1 infrastructure (useScrollAnimation hook, gsap.matchMedia for prefers-reduced-motion, Lenis smooth scrolling) provides the foundation. Research focused on ScrollTrigger patterns, stagger timing techniques, text reveal approaches, common pitfalls, and performance optimization.

**Primary recommendation:** Use a palette of 4-6 distinct reveal effects (opacity + translateY, scale, clip-path, blur) assigned per section personality. Vary stagger timing (0.05-0.15s) based on content density and grid layout. Leverage existing useScrollAnimation hook for automatic cleanup and reduced-motion compliance. Avoid character-level splits without premium SplitText plugin (use free alternatives or whole-block reveals).

## User Constraints (from CONTEXT.md)

### Locked Decisions
- Must replace uniform Framer Motion fadeIn animations with varied GSAP ScrollTrigger-driven reveals
- Must respect prefers-reduced-motion via Phase 1 infrastructure (already enforced by useScrollAnimation hook)
- No new layout changes — this phase adds scroll animation to existing redesigned sections from Phases 3-7
- In-scope pages: homepage, services, pricing, portfolio, contact, about

### Claude's Discretion
Full discretion on all animation implementation decisions:
- Animation effect selection and assignment per page/section
- Number of distinct scroll animation effects (guided by success criteria: varied, not uniform)
- Text reveal approach (character-level, word-level, or block-level per context)
- Grid/list stagger timing and whether to stagger at all per section
- Animation intensity and timing (dramatic vs subtle per section personality)
- Scroll trigger thresholds and replay behavior
- Whether to include special hero effects (parallax, pinning, counter animations)
- Per-page animation personality matching existing design personality from Phases 3-7

### Deferred Ideas (OUT OF SCOPE)
None — discussion stayed within phase scope

---

## Standard Stack

### Core Animation Library
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| gsap | 3.14.2 | Core animation engine | Industry standard for performant JS animations, timeline control, cross-browser consistency |
| @gsap/react | 2.1.2 | React integration | Official React hook (useGSAP) with automatic cleanup via context system |
| ScrollTrigger | (included in GSAP) | Scroll-driven animations | Premier scroll animation plugin with pinning, scrubbing, timeline sync capabilities |
| lenis | 1.3.17 | Smooth scrolling | Virtual scrolling with configurable lerp, integrates with ScrollTrigger |

**Note:** GSAP's premium SplitText plugin ($60/year) offers advanced character/word splitting with accessibility features. Free alternatives exist (SplitType, TextSplitr, splt.js) but lack ARIA support and masking features.

### Current Infrastructure (Phase 1)
| File | Purpose | Already Built |
|------|---------|---------------|
| `src/lib/gsap.ts` | Centralized GSAP config, plugin registration, defaults | ✅ Complete |
| `src/hooks/useScrollAnimation.ts` | Reusable hook with gsap.matchMedia, automatic cleanup | ✅ Complete |
| `src/providers/SmoothScrollProvider.tsx` | Lenis smooth scrolling at app root | ✅ Complete |

**Installation (already complete):**
```bash
npm install gsap @gsap/react lenis
```

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── hooks/
│   └── useScrollAnimation.ts     # Already built — use this for ALL scroll animations
├── lib/
│   ├── gsap.ts                   # Centralized config — always import from here
│   └── scrollAnimations.ts       # NEW: Animation effect presets (fadeUp, scaleIn, clipReveal, etc.)
└── components/
    └── sections/
        ├── Hero.tsx              # Replace Framer Motion with GSAP ScrollTrigger
        ├── Features.tsx          # Replace Framer Motion with GSAP ScrollTrigger
        └── ...                   # All in-scope sections
```

### Pattern 1: Basic Scroll Reveal (Opacity + TranslateY)

**What:** Fade in from below as element enters viewport
**When to use:** Default pattern for most content blocks, card grids, text sections
**Example:**
```typescript
// Source: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

function MySection() {
  const { scope } = useScrollAnimation(({ gsap, ScrollTrigger }) => {
    gsap.from('.item', {
      opacity: 0,
      y: 50,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: '.items-container',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  });

  return (
    <section ref={scope}>
      <div className="items-container" data-animate>
        <div className="item">Card 1</div>
        <div className="item">Card 2</div>
        <div className="item">Card 3</div>
      </div>
    </section>
  );
}
```

**Key details:**
- `start: 'top 80%'` means trigger when element's top hits 80% down the viewport
- `toggleActions: 'play none none none'` means play once on enter, no replay on scroll back
- `stagger: 0.08` creates 80ms delay between each item's animation start
- `data-animate` attribute ensures element is visible when reduced motion is active (useScrollAnimation hook handles this automatically)

### Pattern 2: Staggered Grid Reveal with Varied Timing

**What:** Grid items animate with varied stagger based on position
**When to use:** Portfolio grids, service cards, feature lists
**Example:**
```typescript
// Source: https://gsap.com/resources/getting-started/Staggers/
const { scope } = useScrollAnimation(({ gsap }) => {
  gsap.from('.grid-item', {
    opacity: 0,
    y: 40,
    scale: 0.95,
    duration: 0.5,
    stagger: {
      each: 0.1,        // 100ms between each
      from: 'start',    // or 'center', 'edges', 'random', 'end'
      ease: 'power2.inOut',  // adds organic spacing variation
    },
    scrollTrigger: {
      trigger: '.grid-container',
      start: 'top 75%',
    },
  });
});
```

**Stagger timing guidance:**
- Dense grids (12+ items): 0.05-0.08s per item (prevents excessive total duration)
- Medium grids (6-11 items): 0.08-0.12s per item (sweet spot for rhythm)
- Small sets (2-5 items): 0.12-0.15s per item (more dramatic reveal)

### Pattern 3: Clip-Path Reveal

**What:** Content reveals via animated clip-path polygon or circle
**When to use:** Hero images, featured content, dramatic section transitions
**Example:**
```typescript
// Source: https://gsap.com/community/forums/topic/37533-video-interaction-on-scroll-clip-path-animation/
const { scope } = useScrollAnimation(({ gsap }) => {
  gsap.from('.hero-image', {
    clipPath: 'inset(0 0 100% 0)', // reveals from top to bottom
    duration: 1.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.hero-image',
      start: 'top 60%',
    },
  });
});
```

**Alternative clip-path variations:**
- `clipPath: 'inset(0 100% 0 0)'` — reveals left to right
- `clipPath: 'circle(0% at 50% 50%)'` to `circle(100% at 50% 50%)` — radial reveal
- `clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)'` to `polygon(0 0, 100% 0, 100% 100%, 0 100%)` — custom shapes

**Performance note:** Some community reports suggest transform-based reveals perform better than clip-path on older browsers. Test on target devices.

### Pattern 4: Text Reveal (Block-Level)

**What:** Headlines and text blocks fade in with slight upward motion
**When to use:** Section headings, large typography, value statements (avoid character-level split without premium SplitText or free alternative setup)
**Example:**
```typescript
const { scope } = useScrollAnimation(({ gsap }) => {
  gsap.from('.headline', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.headline',
      start: 'top 85%',
    },
  });
});
```

**Character-level split (if using free alternative like SplitType):**
```typescript
// Source: https://github.com/lukePeavey/SplitType
import SplitType from 'split-type';

const { scope } = useScrollAnimation(({ gsap }) => {
  const text = new SplitType('.headline', { types: 'chars' });

  gsap.from(text.chars, {
    opacity: 0,
    y: 20,
    stagger: 0.02,
    duration: 0.5,
    scrollTrigger: {
      trigger: '.headline',
      start: 'top 80%',
    },
  });
});
```

**Trade-offs:**
- Premium GSAP SplitText: ARIA labels, masking, deep slicing through nested elements, official support
- Free alternatives (SplitType, TextSplitr, splt.js): Basic splitting, no accessibility features, community-supported

### Pattern 5: Parallax Background

**What:** Background element moves at different speed than foreground during scroll
**When to use:** Hero sections, decorative elements (use sparingly — can feel gimmicky)
**Example:**
```typescript
// Source: https://gsap.com/community/forums/topic/25542-parallax-effect-using-scrolltrigger/
const { scope } = useScrollAnimation(({ gsap }) => {
  gsap.to('.parallax-bg', {
    y: 100,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,  // smooth 1-second catch-up for natural feel
    },
  });
});
```

**Scrub values:**
- `scrub: true` — 1:1 tied to scrollbar (can feel mechanical)
- `scrub: 1` — 1-second smoothed catch-up (recommended for parallax)
- `scrub: 2` — 2-second catch-up (more dramatic lag)

### Pattern 6: Pinned Section with Scrubbed Animation

**What:** Section pins in place while scroll position controls animation timeline
**When to use:** Multi-step reveals, before/after comparisons, horizontal scrolling sections
**Example:**
```typescript
// Source: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
const { scope } = useScrollAnimation(({ gsap }) => {
  gsap.to('.reveal-content', {
    x: '-100%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.pinned-section',
      pin: true,
      scrub: 1,
      start: 'top top',
      end: '+=2000',  // pin for 2000px of scroll
    },
  });
});
```

**Pinning gotchas:**
- Creates ScrollTriggers in scroll order (pinning adds scroll distance that affects later triggers)
- Use `refreshPriority` to control calculation order if needed
- Call `ScrollTrigger.refresh()` after dynamic content loads

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll position tracking | Custom scroll listeners, `window.addEventListener('scroll')` | ScrollTrigger | Automatic debouncing, refresh() on resize, synchronized with GSAP timelines, handles edge cases (pinning, scrubbing, viewport changes) |
| Reduced-motion detection | Custom media query hooks | `gsap.matchMedia(MOTION_QUERIES.reduced)` in useScrollAnimation hook | Automatic cleanup, integrates with GSAP context system, already built in Phase 1 hook |
| Smooth scrolling | Custom lerp/easing on scroll events | Lenis | Virtual scrolling with ScrollTrigger integration, configurable lerp, handles touch devices, already integrated in Phase 1 |
| Stagger calculations | Manual loop with `setTimeout` or `delay` math | GSAP stagger object | Built-in `from`, `grid`, `ease`, `amount` options; automatically handles irregular grids and dynamic element counts |
| Viewport resize handling | Manual `window.addEventListener('resize')` + debounce | ScrollTrigger auto-refresh + `invalidateOnRefresh: true` | Automatically recalculates trigger points, supports function-based start/end values for responsive triggers |

**Key insight:** ScrollTrigger handles dozens of edge cases (nested ScrollTriggers, pinning offsets, viewport resizing, SPA navigation, horizontal scroll containers) that are deceptively complex to build correctly. GSAP's community forums show that even experienced developers hit issues when trying to replicate ScrollTrigger behavior manually.

---

## Common Pitfalls

### Pitfall 1: Nesting ScrollTriggers Inside Timeline Tweens

**What goes wrong:** Applying ScrollTrigger to multiple tweens nested within a timeline creates a logical conflict. The parent timeline's playhead controls child animations, while ScrollTrigger wants the scroll position to control the playhead. The animation cannot move forward and backward simultaneously.

**Why it happens:** Developers try to sequence multiple scroll-triggered animations using a timeline, not realizing the timeline playhead and ScrollTrigger scrubbing conflict.

**How to avoid:** Either keep tweens independent (don't nest them in a timeline) OR apply a single ScrollTrigger to the parent timeline itself.

**Warning signs:**
- Timeline animations don't respond to scroll
- Animations jump or replay unexpectedly
- ScrollTrigger `scrub` feels broken

**Example of the mistake:**
```typescript
// ❌ WRONG: ScrollTrigger on nested tweens
const tl = gsap.timeline();
tl.to('.box1', { x: 100, scrollTrigger: { trigger: '.box1' } });
tl.to('.box2', { x: 100, scrollTrigger: { trigger: '.box2' } });
```

**Correct approach:**
```typescript
// ✅ CORRECT: Single ScrollTrigger on parent timeline
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.container',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,
  },
});
tl.to('.box1', { x: 100 });
tl.to('.box2', { x: 100 });
```

**Source:** [ScrollTrigger Common Mistakes](https://gsap.com/resources/st-mistakes/)

### Pitfall 2: Cached Starting Values Don't Update

**What goes wrong:** The starting values of ScrollTriggers are cached when the ScrollTrigger is created. Subsequent animations revert to the original value before animating, causing unexpected jumps.

**Why it happens:** GSAP caches from values at creation time for performance. If multiple ScrollTriggers animate the same property of the same element, the second trigger starts from the original cached value, not the current value.

**How to avoid:**
- Use `immediateRender: false` on later tweens
- Use `.fromTo()` instead of `.from()` to explicitly set both states
- Nest all tweens in a timeline with a single parent ScrollTrigger

**Warning signs:**
- Elements jump back to original position before animating
- Sequential scroll animations don't chain smoothly
- Different sections animating the same element conflict

**Example:**
```typescript
// ❌ WRONG: Second ScrollTrigger reverts to cached starting value
gsap.from('.box', { opacity: 0, scrollTrigger: { trigger: '.section1' } });
gsap.from('.box', { x: -100, scrollTrigger: { trigger: '.section2' } }); // jumps back!

// ✅ CORRECT: Use immediateRender: false
gsap.from('.box', { opacity: 0, scrollTrigger: { trigger: '.section1' } });
gsap.from('.box', { x: -100, immediateRender: false, scrollTrigger: { trigger: '.section2' } });
```

**Source:** [ScrollTrigger Common Mistakes](https://gsap.com/resources/st-mistakes/)

### Pitfall 3: Creating ScrollTriggers Out of Order

**What goes wrong:** Pinned elements cause subsequent ScrollTriggers to have incorrect position calculations. ScrollTrigger calculates trigger points based on current scroll positions, but pinning adds extra scroll distance that later ScrollTriggers must account for.

**Why it happens:** ScrollTriggers are created top-to-bottom, but pinning the first section adds virtual scroll height that shifts the second section down.

**How to avoid:**
- Create ScrollTriggers in scroll order (top to bottom)
- Use `refreshPriority` to control calculation timing
- Call `ScrollTrigger.refresh()` after all ScrollTriggers are created

**Warning signs:**
- Second/third sections trigger too early or too late
- Pinned sections cause layout jumps
- Removing one ScrollTrigger fixes another

**Example:**
```typescript
// ❌ WRONG: Creating out of order with pinning
gsap.to('.section2', { scrollTrigger: { trigger: '.section2' } });
gsap.to('.section1', { scrollTrigger: { trigger: '.section1', pin: true } }); // shifts section2!

// ✅ CORRECT: Create in scroll order
gsap.to('.section1', { scrollTrigger: { trigger: '.section1', pin: true } });
gsap.to('.section2', { scrollTrigger: { trigger: '.section2' } });
```

**Source:** [ScrollTrigger Common Mistakes](https://gsap.com/resources/st-mistakes/)

### Pitfall 4: Hardcoded Start/End Values Don't Update on Resize

**What goes wrong:** Static values (e.g., `end: '+=500'`) don't update when viewport resizes, causing incorrect trigger points on mobile vs desktop.

**Why it happens:** Values are calculated once during ScrollTrigger creation. ScrollTrigger auto-refreshes on resize, but hardcoded values remain static.

**How to avoid:** Use function-based values and set `invalidateOnRefresh: true`.

**Warning signs:**
- Animations work on desktop but break on mobile
- Rotating device or resizing browser breaks triggers
- Animations trigger too early/late after resize

**Example:**
```typescript
// ❌ WRONG: Hardcoded value doesn't update
gsap.to('.box', {
  scrollTrigger: {
    start: 'top top',
    end: '+=' + elem.offsetHeight, // cached at creation time!
  },
});

// ✅ CORRECT: Function-based value recalculates on resize
gsap.to('.box', {
  scrollTrigger: {
    start: 'top top',
    end: () => '+=' + elem.offsetHeight,
    invalidateOnRefresh: true,
  },
});
```

**Source:** [ScrollTrigger Common Mistakes](https://gsap.com/resources/st-mistakes/)

### Pitfall 5: Not Cleaning Up ScrollTriggers in React (SPAs)

**What goes wrong:** Returning to a previously visited page causes ScrollTrigger malfunctions because ScrollTriggers aren't automatically destroyed on component unmount.

**Why it happens:** Single-page applications don't automatically destroy and recreate ScrollTriggers. Navigating away leaves orphaned ScrollTriggers that conflict with new instances on re-mount.

**How to avoid:** Use `useGSAP` hook with `scope` parameter for automatic cleanup. This is already handled by the existing `useScrollAnimation` hook in Phase 1.

**Warning signs:**
- Animations break after navigating away and back
- ScrollTrigger errors in console about missing elements
- Multiple ScrollTriggers fire for the same element

**Example:**
```typescript
// ❌ WRONG: Manual setup without cleanup
useEffect(() => {
  gsap.from('.box', {
    scrollTrigger: { trigger: '.box' },
  });
  // No cleanup!
}, []);

// ✅ CORRECT: Use existing useScrollAnimation hook (automatic cleanup)
const { scope } = useScrollAnimation(({ gsap }) => {
  gsap.from('.box', {
    scrollTrigger: { trigger: '.box' },
  });
}); // useGSAP with scope handles cleanup on unmount
```

**Source:** [ScrollTrigger Common Mistakes](https://gsap.com/resources/st-mistakes/)

### Pitfall 6: Using One ScrollTrigger for Multiple Independent Sections

**What goes wrong:** A single tween targeting multiple elements animates them all simultaneously instead of individually when each enters the viewport.

**Why it happens:** Different elements trigger at different scroll positions, requiring distinct ScrollTriggers.

**How to avoid:** Loop through elements to create separate tweens for each, or use a single tween with batch callbacks.

**Warning signs:**
- All sections animate at once when the first enters viewport
- Can't control individual section trigger points
- Sections far down the page animate before they're visible

**Example:**
```typescript
// ❌ WRONG: Single ScrollTrigger for all sections
gsap.from('.section', {
  opacity: 0,
  scrollTrigger: { trigger: '.section' }, // only triggers on first .section!
});

// ✅ CORRECT: Loop to create separate ScrollTriggers
document.querySelectorAll('.section').forEach((section) => {
  gsap.from(section, {
    opacity: 0,
    scrollTrigger: { trigger: section },
  });
});
```

**Source:** [ScrollTrigger Common Mistakes](https://gsap.com/resources/st-mistakes/)

### Pitfall 7: Animating Layout Properties (width, height, top, left)

**What goes wrong:** Animating layout-triggering CSS properties causes janky performance, especially on mobile.

**Why it happens:** Layout properties trigger reflow (recalculate layout) on every frame. Transform and opacity animate on the compositor thread without reflow.

**How to avoid:** Animate `transform` (translateX/Y, scale, rotate) and `opacity` only. Use `will-change: transform, opacity` sparingly (only during animation, then remove).

**Warning signs:**
- Animations feel choppy or laggy
- Frame rate drops during scroll
- Mobile performance significantly worse than desktop

**Example:**
```typescript
// ❌ WRONG: Animating layout properties
gsap.to('.box', {
  width: 500,    // triggers layout recalculation!
  left: 100,     // triggers layout recalculation!
  scrollTrigger: { trigger: '.box' },
});

// ✅ CORRECT: Use transform and opacity
gsap.to('.box', {
  scaleX: 2,     // GPU-accelerated
  x: 100,        // GPU-accelerated (translateX)
  opacity: 0.5,  // GPU-accelerated
  scrollTrigger: { trigger: '.box' },
});
```

**Source:** [CSS/JS Animation Performance](https://www.keycdn.com/blog/animation-performance), [Web Animation Performance Tier List](https://motion.dev/blog/web-animation-performance-tier-list)

### Pitfall 8: Overusing will-change

**What goes wrong:** Setting `will-change: transform, opacity` on too many elements or leaving it set permanently causes memory issues and worse performance.

**Why it happens:** `will-change` hints to the browser to create a compositing layer, consuming memory. Intended as a last resort for specific animations, not a blanket optimization.

**How to avoid:**
- Add `will-change` via JavaScript immediately before animation starts
- Remove `will-change` after animation completes
- Never set `will-change` in static CSS for dozens of elements

**Warning signs:**
- Increased memory usage
- Browser DevTools show dozens of compositing layers
- Performance degrades over time or with many elements on screen

**Example:**
```typescript
// ❌ WRONG: Permanent will-change in CSS
.animated-box {
  will-change: transform, opacity; /* memory leak! */
}

// ✅ CORRECT: Add/remove programmatically
const { scope } = useScrollAnimation(({ gsap }) => {
  const boxes = gsap.utils.toArray('.box');

  gsap.from(boxes, {
    opacity: 0,
    y: 50,
    onStart: () => {
      boxes.forEach((box) => box.style.willChange = 'transform, opacity');
    },
    onComplete: () => {
      boxes.forEach((box) => box.style.willChange = 'auto');
    },
    scrollTrigger: { trigger: '.container' },
  });
});
```

**Source:** [CSS will-change Property](https://www.digitalocean.com/community/tutorials/css-will-change), [When and How to Use CSS will-change](https://blog.logrocket.com/when-how-use-css-will-change/)

---

## Code Examples

Verified patterns from official sources:

### Basic Scroll Reveal with Stagger
```typescript
// Source: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

export function FeatureGrid() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    gsap.from('.feature-card', {
      opacity: 0,
      y: 50,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.feature-grid',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  });

  return (
    <section ref={scope}>
      <div className="feature-grid" data-animate>
        <div className="feature-card">Feature 1</div>
        <div className="feature-card">Feature 2</div>
        <div className="feature-card">Feature 3</div>
      </div>
    </section>
  );
}
```

### Grid Stagger with Spatial Origin
```typescript
// Source: https://gsap.com/resources/getting-started/Staggers/
const { scope } = useScrollAnimation(({ gsap }) => {
  gsap.from('.grid-item', {
    opacity: 0,
    scale: 0.9,
    duration: 0.5,
    stagger: {
      each: 0.08,
      from: 'center',  // emanate from center
      ease: 'power2.inOut',
    },
    scrollTrigger: {
      trigger: '.grid-container',
      start: 'top 75%',
    },
  });
});
```

### Parallax Background Effect
```typescript
// Source: https://gsap.com/community/forums/topic/25542-parallax-effect-using-scrolltrigger/
const { scope } = useScrollAnimation(({ gsap }) => {
  gsap.to('.parallax-layer', {
    y: 150,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });
});
```

### Clip-Path Reveal
```typescript
// Source: https://gsap.com/community/forums/topic/37533-video-interaction-on-scroll-clip-path-animation/
const { scope } = useScrollAnimation(({ gsap }) => {
  gsap.from('.hero-image', {
    clipPath: 'inset(0 0 100% 0)',
    duration: 1.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.hero-image',
      start: 'top 60%',
      toggleActions: 'play none none none',
    },
  });
});
```

### Multiple Sections with Individual Triggers
```typescript
// Source: https://gsap.com/resources/st-mistakes/
const { scope } = useScrollAnimation(({ gsap }) => {
  // Query all sections and create individual ScrollTriggers
  gsap.utils.toArray('.animated-section').forEach((section: any) => {
    gsap.from(section.querySelectorAll('.item'), {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
    });
  });
});
```

### Text Block Reveal (No Character Split)
```typescript
const { scope } = useScrollAnimation(({ gsap }) => {
  gsap.from('.headline', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.headline',
      start: 'top 85%',
    },
  });
});
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Uniform `fadeIn` on all sections | Varied effects per section personality | 2024-2025 trend | Sites feel more intentional, less template-like |
| Uniform `stagger(0.1)` for all grids | Varied stagger timing (0.05-0.15s) based on density | 2024-2025 trend | Rhythm feels natural, not robotic |
| Framer Motion for scroll animations | GSAP ScrollTrigger | GSAP 3.0 (2019), matured 2020-2024 | Timeline control, scrubbing, pinning not possible in Framer Motion |
| Custom scroll listeners | ScrollTrigger plugin | ScrollTrigger v3.0 (2020) | Automatic debouncing, refresh, edge case handling |
| CSS `scroll-timeline` API | GSAP ScrollTrigger fallback | CSS spec draft (2024), not widely supported | CSS approach lacks browser support; GSAP still industry standard |
| Premium GSAP plugins (SplitText) | Free alternatives (SplitType, TextSplitr) | 2023-2024 | Budget-friendly character splits, but lack accessibility features |

**Deprecated/outdated:**
- **Framer Motion scroll variants:** Still functional but lack timeline sequencing, scrubbing, pinning. ScrollTrigger is more powerful for complex scroll-driven work.
- **ScrollMagic:** Predecessor to ScrollTrigger. Last major release 2018. Use ScrollTrigger instead.
- **AOS (Animate On Scroll):** Simple but inflexible. No stagger control, timeline integration, or dynamic triggers. Use ScrollTrigger for professional work.

**2026 Industry Trend:**
- Smooth scrolling via Lenis or ScrollSmoother (premium GSAP plugin)
- Scroll-driven animations via ScrollTrigger
- GPU-accelerated properties (transform, opacity) only
- `prefers-reduced-motion` respect is now expected (not optional)
- Webflow's 2024 acquisition of GSAP made ScrollTrigger free for all users (previously required Club GreenSock for commercial use)

**Sources:**
- [GSAP ScrollTrigger Official Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Building Scroll-Driven Dual-Wave Text Animation with GSAP](https://tympanus.net/codrops/2026/01/15/building-a-scroll-driven-dual-wave-text-animation-with-gsap/)
- [GSAP ScrollTrigger Complete Guide (2025)](https://gsapify.com/gsap-scrolltrigger)

---

## Open Questions

### 1. Should we invest in premium SplitText plugin or use free alternatives?

**What we know:**
- Premium GSAP SplitText: $60/year, ARIA labels, masking, deep slicing, official support
- Free alternatives (SplitType, TextSplitr, splt.js): Basic splitting, no accessibility features, community-supported

**What's unclear:** How important are character-level reveals to the design? If only used on 2-3 hero headlines, free alternative is sufficient. If used extensively, premium plugin's accessibility and reliability justify cost.

**Recommendation:** Start with block-level text reveals (no splitting). If user feedback demands character-level effects, prototype with SplitType (free). Only purchase SplitText if character reveals become a core brand personality element.

### 2. How aggressive should parallax effects be?

**What we know:**
- Subtle parallax (scrub: 1, y: 50-100) feels modern and smooth
- Aggressive parallax (scrub: true, y: 200+) can feel gimmicky
- Inspiration sites (kota.co.uk, strangepixels.co) use subtle, speed-responsive parallax

**What's unclear:** User preference and brand personality. Does OneSquad brand lean playful (more motion) or professional (less motion)?

**Recommendation:** Use subtle parallax (scrub: 1, y: 80-120) on hero backgrounds only. Avoid parallax on content sections (distracting). Test with user and iterate.

### 3. Should we use pinning effects?

**What we know:**
- Pinning creates dramatic scroll-through sections (e.g., horizontal galleries, multi-step reveals)
- Adds complexity: creates ScrollTriggers in scroll order, requires `refreshPriority` tuning
- Inspiration sites use pinning sparingly (1-2 sections max)

**What's unclear:** Whether in-scope pages benefit from pinning. Current layouts don't require scroll-through sections.

**Recommendation:** Skip pinning in initial implementation. Add as Phase 9 enhancement if user requests scroll-through effects (e.g., horizontal portfolio gallery, multi-step process reveal).

---

## Sources

### Primary (HIGH confidence)
- [ScrollTrigger Official Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) - Configuration options, API reference
- [GSAP Staggers Guide](https://gsap.com/resources/getting-started/Staggers/) - Stagger timing patterns
- [ScrollTrigger Common Mistakes](https://gsap.com/resources/st-mistakes/) - Pitfalls and solutions
- [GSAP In Practice: Avoid The Pitfalls](https://marmelab.com/blog/2024/05/30/gsap-in-practice-avoid-the-pitfalls.html) - Real-world pitfalls
- [CSS/JS Animation Performance](https://www.keycdn.com/blog/animation-performance) - Performance best practices
- [Web Animation Performance Tier List](https://motion.dev/blog/web-animation-performance-tier-list) - GPU-accelerated properties

### Secondary (MEDIUM confidence)
- [GSAP ScrollTrigger Complete Guide (2025)](https://gsapify.com/gsap-scrolltrigger) - Verified with official docs
- [Building Scroll-Driven Dual-Wave Text Animation with GSAP](https://tympanus.net/codrops/2026/01/15/building-a-scroll-driven-dual-wave-text-animation-with-gsap/) - 2026 implementation patterns
- [KOTA Agency: How Motion Design Boosts Engagement](https://kota.co.uk/blog/how-motion-design-boosts-website-engagement-time-on-page) - Inspiration site analysis
- [48 GSAP ScrollTrigger Examples](https://freefrontend.com/scroll-trigger-js/) - Community examples
- [SplitType GitHub](https://github.com/lukePeavey/SplitType) - Free SplitText alternative

### Tertiary (LOW confidence — community forums, unverified examples)
- Various GSAP community forum threads on clip-path, parallax, pinning
- GitHub repositories with scroll animation examples

---

## Metadata

**Confidence breakdown:**
- **Standard stack:** HIGH — GSAP 3.14.2, @gsap/react 2.1.2, Lenis 1.3.17 verified via npm list
- **Architecture patterns:** HIGH — Official GSAP docs, verified examples from gsap.com, existing Phase 1 infrastructure reviewed
- **Common pitfalls:** HIGH — Official ScrollTrigger Common Mistakes page, multiple verified sources
- **Performance optimization:** HIGH — Web.dev, KeyCDN, DigitalOcean official performance guides
- **Text splitting:** MEDIUM — Free alternatives documented but not tested in this project
- **Inspiration site analysis:** MEDIUM — KOTA blog posts verified, but implementation details inferred from descriptions

**Research date:** 2026-02-11
**Valid until:** ~2026-04-11 (60 days — GSAP is stable, ScrollTrigger API unlikely to change)

**Key takeaways for planning:**
1. Phase 1 infrastructure (useScrollAnimation hook, gsap.matchMedia, Lenis) provides solid foundation — use it for all scroll animations
2. Avoid character-level text splits unless willing to invest in premium SplitText or set up free alternative (SplitType)
3. Vary stagger timing (0.05-0.15s) based on grid density and section personality
4. Use GPU-accelerated properties only (transform, opacity) — avoid width/height/top/left
5. Create ScrollTriggers in scroll order, especially if using pinning
6. Test on mobile — scrub and parallax feel different with touch scrolling
7. Follow existing page personalities from Phases 3-7 when assigning animation effects

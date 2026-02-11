# Stack Research

**Domain:** Advanced scroll animations, custom cursors, and creative motion for Next.js
**Researched:** 2026-02-10
**Confidence:** HIGH

## Recommended Stack

### Core Animation Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| GSAP | ^3.14.2 | Timeline-based animations, scroll effects, complex sequences | Industry standard for high-performance, production-grade animations. All plugins now 100% free (thanks to Webflow). Better performance than alternatives for complex timelines. |
| @gsap/react | ^2.1.2 | React integration via useGSAP hook | Official GSAP React adapter. Handles cleanup automatically with gsap.context(), safe for SSR, implements useIsomorphicLayoutEffect. Required for Next.js App Router. |
| Framer Motion | ^12.33.0 (existing) | Declarative UI animations, layout animations, gestures | Keep for simple, state-based animations. Excellent for component enter/exit, layout shifts, and interactive UI elements. Coexists well with GSAP. |
| Lenis | ^1.3.x | Smooth scroll foundation | Modern, lightweight (6KB), actively maintained successor to Locomotive Scroll. Better performance and flexibility than GSAP ScrollSmoother for custom layouts. Package renamed from @studio-freight/lenis to lenis (deprecated packages should not be used). |

### GSAP Plugins (All Free)

| Plugin | Purpose | When to Use |
|--------|---------|-------------|
| ScrollTrigger | Scroll-driven animations, pinning, scrubbing | Core plugin for all scroll animations. Pairs with Lenis via event listener integration. |
| SplitText | Split text into words/characters/lines for animation | Character-by-character text reveals, stagger effects. Now free (was premium). Use official plugin over alternatives. |
| DrawSVG | Animate SVG stroke drawing | Logo reveals, path animations, illustrated effects. |
| MorphSVG | Morph between SVG shapes | Shape transitions, icon transformations. Premium quality, now free. |
| Draggable | Drag interactions | Interactive elements, sliders, custom controls. |

### Custom Cursor Solution

| Approach | Recommendation | Why |
|----------|---------------|-----|
| **Build Custom** | ✅ Recommended | Small codebase (~50 lines), full control, better performance than libraries. Use GSAP for cursor animation (already in bundle). |
| react-animated-cursor | Alternative | If you need out-of-box solution. Version 2.11.2, but adds ~30KB for simple functionality you can build yourself. |
| Motion Cursor | Alternative | Premium ($249 Motion+ lifetime). Powerful but overkill for most use cases. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-use-measure | ^2.x | React hook for measuring DOM element dimensions via ResizeObserver | Optional utility for responsive parallax calculations and dynamic animation bounds. Returns ref and bounds object with width, height, position data. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| @next/bundle-analyzer | Bundle size tracking | Monitors GSAP's ~78KB impact. Use `next build --analyze` to verify tree-shaking. |
| GSAP DevTools | Animation debugging | Free browser extension for debugging timelines, ScrollTrigger instances. |

## Installation

```bash
# Core animation stack
npm install gsap@^3.14.2 @gsap/react@^2.1.2

# Smooth scroll
npm install lenis

# Optional: DOM measurement utility
npm install react-use-measure

# Keep existing Framer Motion
# (already installed: framer-motion@^12.33.0)

# Dev tools
npm install -D @next/bundle-analyzer
```

**Note:** GSAP includes TypeScript definitions. Do NOT install `@types/gsap` (deprecated stub package).

## Architecture Patterns

### 1. GSAP + Next.js App Router Integration

**Pattern: Centralized GSAP Configuration**

```typescript
// lib/gsap.ts
'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Register plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

export { gsap, ScrollTrigger, SplitText };
```

**Why:** Ensures plugins register once, prevents duplicate registrations across route changes, enables tree-shaking for unused plugins.

### 2. Lenis + GSAP ScrollTrigger Integration

**Pattern: Unified Scroll Context**

```typescript
// components/providers/SmoothScrollProvider.tsx
'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';
import { ScrollTrigger } from '@/lib/gsap';

export function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: true, // Automatically handles requestAnimationFrame (new option in 2026)
    });

    // Sync Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

**Why:** Single source of truth for scroll position, 60fps smooth scrolling, automatic ScrollTrigger synchronization. The autoRaf option eliminates manual rAF setup.

### 3. Component-Level Animations with useGSAP

**Pattern: Scoped Cleanup**

```typescript
'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export function AnimatedSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // All animations scoped to containerRef
    gsap.from('.element', { opacity: 0, y: 100 });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top center',
      // ...
    });
  }, { scope: containerRef }); // Auto-cleanup on unmount

  return <div ref={containerRef}>...</div>;
}
```

**Why:** useGSAP handles cleanup automatically, prevents memory leaks, works with React 19 Strict Mode, avoids "stuck" ScrollTriggers on route changes.

### 4. Custom Cursor with GSAP

**Pattern: RequestAnimationFrame + GSAP Interpolation**

```typescript
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      gsap.to(cursorRef.current, {
        x: mousePos.current.x,
        y: mousePos.current.y,
        duration: 0.6,
        ease: 'power2.out',
      });
      requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    const rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-50"
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  );
}
```

**Why:** GSAP's interpolation smoother than CSS transitions, magnetic effects trivial to add, no extra dependencies, ~50 lines of code.

## Division of Labor: GSAP vs Framer Motion

### Use GSAP For:
- ✅ Scroll-driven animations (ScrollTrigger)
- ✅ Timeline-based sequences (multiple elements, precise timing)
- ✅ Text animations (SplitText character reveals)
- ✅ SVG animations (DrawSVG, MorphSVG)
- ✅ Custom cursor (smooth interpolation)
- ✅ Pinning, scrubbing, parallax effects
- ✅ Complex easing and morphing

### Use Framer Motion For:
- ✅ Component mount/unmount animations (AnimatePresence)
- ✅ Layout animations (layout prop)
- ✅ Gesture-based interactions (drag, hover, tap)
- ✅ State-driven UI animations (variants)
- ✅ Simple fade/slide component transitions
- ✅ Declarative, React-idiomatic animations

**Coexistence Strategy:** Use Framer Motion for UI component state animations, GSAP for everything scroll-based or timeline-based. They don't conflict—GSAP animates DOM properties, Framer Motion animates React component state. Both can be used strategically in the same project.

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| GSAP + Framer Motion (hybrid) | Framer Motion only | If animations are purely UI-level (no scroll timelines, pinning, or complex sequences). FM is more React-idiomatic for simple cases. |
| GSAP + Framer Motion (hybrid) | GSAP only | If removing all Framer Motion dependencies. Not recommended — FM is already integrated and handles declarative UI animations better than GSAP imperatives. |
| Lenis | GSAP ScrollSmoother | If you need rigid structure and don't mind markup constraints. ScrollSmoother free but less flexible. |
| Lenis | Locomotive Scroll | Never. Locomotive Scroll v5 is outdated, less performant, larger bundle. Lenis is the successor. |
| Build custom cursor | react-animated-cursor | Only if you need pre-built cursor in <5 minutes and don't care about 30KB. |
| GSAP SplitText | split-type | Never. GSAP SplitText is now free and better integrated. No reason to use alternatives. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| @types/gsap | Deprecated stub package. GSAP includes its own types. | Import GSAP directly—types included. |
| @studio-freight/lenis or @studio-freight/react-lenis | Package renamed and deprecated. Old packages no longer maintained. | lenis (new official package name) |
| Locomotive Scroll | Outdated (v5), larger bundle (~40KB), less performant than Lenis. | Lenis (6KB, actively maintained, better performance). |
| split-type | Inferior to GSAP SplitText (now free). Separate library for one feature. | GSAP SplitText (free, better integration). |
| react-gsap (bitworking) | Last published 1 year ago, not updated for React 19, wraps GSAP unnecessarily. | @gsap/react (official, maintained by GSAP team). |
| jQuery-based cursor libraries | Adds jQuery dependency (~30KB), outdated patterns, poor performance. | Build custom with GSAP or vanilla JS. |
| Motion Cursor (paid) | $249 for cursor component. Overkill. | Build custom (~50 lines, full control). |

## Stack Patterns by Variant

**If building creative agency site (your case):**
- Use GSAP for 80% of animations (scroll effects, timelines, text reveals)
- Keep Framer Motion for UI transitions (10%)
- Lenis for smooth scroll foundation
- Custom cursor with GSAP interpolation
- Total bundle: ~100KB animations (GSAP 78KB + Framer Motion 12KB + Lenis 6KB)

**If building SaaS product:**
- Use Framer Motion for 80% (UI-focused, state-driven)
- Add GSAP only if complex scroll effects needed
- Skip Lenis (native scroll sufficient)
- Skip custom cursor (too distracting for productivity apps)

**If building marketing landing page:**
- GSAP + Lenis + SplitText (heavy scroll animations)
- Minimal Framer Motion (or skip entirely)
- Custom cursor for brand personality
- Optimize bundle: tree-shake unused GSAP plugins

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| gsap@3.14.2 | React 19, Next.js 15, Next.js 16 | Framework-agnostic. Works everywhere. |
| @gsap/react@2.1.2 | React 19, Next.js 15 App Router | Requires 'use client' directive. useIsomorphicLayoutEffect for SSR. |
| lenis@1.3.x | Next.js 15, GSAP ScrollTrigger | Requires client-side initialization. Works with Vercel deployment. |
| framer-motion@12.33.0 | React 19, Next.js 15 | Already compatible with existing setup. |

## Bundle Size Impact

| Package | Size (min+gzip) | Tree-shakeable | Notes |
|---------|----------------|----------------|-------|
| gsap (core) | ~35KB | Yes | Import only used plugins. Don't import entire 'gsap/all'. |
| ScrollTrigger | ~18KB | Yes | Register only if scroll animations needed. |
| SplitText | ~8KB | Yes | Now free. Import only for text animations. |
| DrawSVG | ~3KB | Yes | Import only for SVG stroke animations. |
| @gsap/react | ~2KB | No | Tiny wrapper, minimal overhead. |
| lenis | ~6KB | No | Lightweight, single-purpose library. |
| framer-motion | ~85KB | Partial | Already in your bundle. Keep for UI animations. |

**Total estimated addition:** ~69KB min+gzip (GSAP core + ScrollTrigger + SplitText + @gsap/react + Lenis)

**Optimization strategies:**
1. Dynamic import heavy animations: `const { gsap } = await import('@/lib/gsap')` for below-fold animations
2. Code-split per route: Only load GSAP on pages that use it
3. Tree-shake unused plugins: Import specific plugins, not 'gsap/all'
4. Lazy-load custom cursor: User might not move mouse for seconds—defer initialization

## Performance Considerations

### GSAP Optimization for Next.js 15

1. **Single Registration Point:** Import plugins from centralized `lib/gsap.ts`, not per-component. Prevents duplicate registrations.

2. **RefreshPriority:** Call `ScrollTrigger.refresh()` after all animations initialized on page load. Prevents layout thrashing.

3. **Lazy Loading:** Dynamically import GSAP for below-fold animations:
   ```typescript
   useEffect(() => {
     const loadAnimation = async () => {
       const { gsap } = await import('@/lib/gsap');
       gsap.from('.element', { ... });
     };
     loadAnimation();
   }, []);
   ```

4. **Kill on Unmount:** useGSAP handles this automatically, but if using raw GSAP, always `tween.kill()` in cleanup.

5. **Disable Lag Smoothing with Lenis:** `gsap.ticker.lagSmoothing(0)` prevents GSAP from compensating for frame drops (Lenis handles smoothing). Note: With autoRaf option, manual ticker setup may not be needed.

### Custom Cursor Performance

1. **RequestAnimationFrame:** One rAF loop, update GSAP target position. Let GSAP handle interpolation.
2. **Pointer-events: none:** Prevent cursor from blocking mouse events.
3. **Will-change: transform:** Hint browser for GPU acceleration.
4. **Cancel on Inactivity:** Clear rAF if mouse hasn't moved for 5+ seconds.
5. **Mobile Detection:** Hide cursor on touch devices (use `window.matchMedia('(pointer: fine)')`).

### Lenis + ScrollTrigger Performance

1. **Single Lenis Instance:** Initialize at app root, not per-component.
2. **Use autoRaf Option:** The new autoRaf option (2026) automatically handles the requestAnimationFrame loop, eliminating manual ticker setup.
3. **Disable on Horizontal Scroll:** Lenis optimized for vertical. Horizontal scrolling needs custom setup.

## GSAP Licensing (2026 Update)

**Major Change:** GSAP is now **100% FREE** for all use cases, including commercial projects.

**What changed:**
- All plugins (ScrollTrigger, SplitText, MorphSVG, ScrollSmoother, DrawSVG, etc.) are FREE
- Previously, premium plugins required Club GSAP membership
- Webflow sponsorship made the entire toolset free in late 2025

**What this means:**
- No license restrictions for ScrollTrigger, ScrollSmoother, or any other plugin
- Use freely in commercial agency sites, client projects, SaaS products
- Optional Club GSAP membership still available for support perks, but not required for plugin access

## TypeScript Configuration

**No additional setup required.** GSAP includes TypeScript declarations out of the box.

If you encounter type issues:
1. Ensure you're importing from 'gsap' and 'gsap/ScrollTrigger' (not from /dist/ paths)
2. Check `node_modules/gsap/types/index.d.ts` exists
3. GSAP types are in the package — no @types/gsap needed

## Sources

### HIGH Confidence (Official Documentation & Verified npm)
- [GSAP npm package](https://www.npmjs.com/package/gsap) — Version 3.14.2 verified 2026-02-10
- [@gsap/react npm package](https://www.npmjs.com/package/@gsap/react) — Version 2.1.2 verified 2026-02-10
- [GSAP Pricing - 100% Free Announcement](https://gsap.com/pricing/) — Verified all plugins now free
- [GSAP React Documentation](https://gsap.com/resources/React/) — Official Next.js integration patterns
- [ScrollTrigger Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — Plugin API reference
- [Lenis GitHub Repository](https://github.com/darkroomengineering/lenis) — Smooth scroll library, package rename confirmation
- [Scroll Animation Tools 2026](https://cssauthor.com/scroll-animation-tools/) — GSAP now 100% free confirmation

### MEDIUM Confidence (Current Community Best Practices)
- [Optimizing GSAP Animations in Next.js 15](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232) — 2025/2026 best practices
- [Guide to using GSAP ScrollTrigger in Next.js with useGSAP()](https://medium.com/@ccjayanti/guide-to-using-gsap-scrolltrigger-in-next-js-with-usegsap-c48d6011f04a) — Integration patterns
- [DevDreaming: Smooth Scrolling with Lenis and GSAP](https://devdreaming.com/blogs/nextjs-smooth-scrolling-with-lenis-gsap) — Integration pattern
- [Lenis Smooth Scroll Standard](https://medium.com/@nattupi/why-lenis-smooth-scroll-needs-to-become-a-browser-standard-62bed416c987) — Lenis adoption, autoRaf option
- [Web Animation for React: Framer Motion vs GSAP](https://semaphore.io/blog/react-framer-motion-gsap) — When to use each
- [2 Ways to Make a Parallax Scroll in React](https://blog.olivierlarose.com/tutorials/parallax-scroll) — Implementation techniques
- [react-use-measure npm](https://www.npmjs.com/package/react-use-measure) — DOM measurement hook
- [GSAP vs Framer Motion Comparison](https://tharakasachin98.medium.com/gsap-vs-framer-motion-a-comprehensive-comparison-0e4888113825) — Strategic use of both
- [Choosing an animation library for 2026: GSAP or Framer Motion](https://peerlist.io/scroll/post/ACTHGNQQ6EE967OJ72KKN6NKMNGMKB) — 2026 ecosystem state

### Package Versions (Verified via Web Search 2026-02-10)
- gsap@3.14.2 — Latest stable release
- @gsap/react@2.1.2 — Current React integration package
- lenis@1.3.x — Renamed from @studio-freight/lenis
- react-use-measure@2.x — Current version
- react-animated-cursor@2.11.2 — Alternative cursor library

---
*Stack research for: OneSquad creative agency site — Advanced scroll animations, custom cursors, and creative motion*
*Researched: 2026-02-10*
*Confidence: HIGH (all core recommendations verified with official sources, npm registry, and 2025-2026 community resources)*

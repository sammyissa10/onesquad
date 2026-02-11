# Phase 02: Custom Cursor System - Research

**Researched:** 2026-02-11
**Domain:** Custom cursor with GSAP-driven interpolation and contextual hover reactions
**Confidence:** HIGH

## Summary

Custom cursor systems replace the default pointer with a custom element that follows the mouse using GSAP's `quickTo()` method for optimal performance. The standard approach uses `useRef` to store cursor position (avoiding React re-renders), `requestAnimationFrame` for the animation loop, and GSAP `quickTo()` for efficient DOM updates. The cursor reacts to interactive elements through data attributes or event delegation, detecting hover states and applying contextual transformations (scale, color, text labels, magnetic effects).

Touch device detection uses CSS media queries (`@media (pointer: coarse)`) combined with JavaScript feature detection. The cursor element must use `pointer-events: none` to prevent interference with native click events while maintaining keyboard navigation accessibility. Common pitfalls include iframe interaction issues, viewport edge handling, and React re-render performance problems.

**Primary recommendation:** Use GSAP `quickTo()` with `useRef` for cursor position, implement data-attribute-based hover states, detect touch devices with `@media (pointer: coarse) and (hover: none)`, and use `useGSAP` hook with scope for automatic cleanup.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Hover reactions:**
- Cards (service, portfolio, testimonial) should have a distinct cursor reaction — reference kota.co.uk and strangepixels.co for the specific behavior pattern. Researcher should investigate what those sites do on card hover and replicate that feel.
- The cursor should feel unique and intentional on cards — not just a generic scale-up.

### Claude's Discretion

- **Button/link hover behavior**: Claude picks the appropriate reaction (scale, color invert, fill change, or combination) based on what works with the site's navy/coral/peach palette
- **Magnetic pull**: Claude decides whether to include magnetic snap-to-center on interactive elements and which elements get it
- **Number of distinct hover patterns**: Claude determines the right variety based on inspiration site analysis — enough to feel handcrafted, not so many it feels inconsistent
- **Contextual text labels**: Claude decides which elements get text labels ("View", "Play", "Drag") and the animation style for showing them
- **Default cursor visual design**: Shape, size, color, blend modes — Claude picks based on inspiration sites and what complements the existing design
- **Touch device behavior**: Implementation of touch detection and cursor hiding
- **Edge case handling**: Viewport edges, iframe interactions, native browser features (text select, right-click)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope

</user_constraints>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| GSAP | 3.14.2 | Cursor interpolation, hover animations | Industry standard for high-performance animations; `quickTo()` optimized for frequent updates like mouse tracking |
| @gsap/react | 2.1.2 | useGSAP hook for React integration | Official GSAP hook with automatic cleanup via context, prevents memory leaks in React |
| React useRef | 19.2.3 | Cursor position storage | Avoids re-renders on every mousemove event (critical for performance) |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| CSS Media Queries | Native | Touch device detection | Use `@media (pointer: coarse) and (hover: none)` to hide cursor on pure touch devices |
| data-* attributes | Native | Hover state declaration | Declarative approach for marking interactive elements with cursor behavior (e.g., `data-cursor="view"`) |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| GSAP quickTo | React state + spring | State triggers re-renders on every mousemove (performance killer), spring libraries add bundle size |
| GSAP | Framer Motion | Already using GSAP for scroll animations (Phase 1), adding Motion just for cursor increases bundle size |
| useGSAP | useEffect/useLayoutEffect | Manual cleanup required, no automatic context scoping, error-prone |
| CSS cursor: none | JavaScript hide/show | CSS media queries more performant and accessible than JS touch detection alone |

**Installation:**

Already installed in Phase 1:
```bash
# Phase 1 dependencies (already installed)
npm install gsap @gsap/react
```

No additional dependencies required.

## Architecture Patterns

### Recommended Project Structure

```
src/
├── components/
│   └── CustomCursor/
│       ├── CustomCursor.tsx          # Main cursor component
│       ├── useCursorPosition.ts      # Mouse tracking hook
│       └── cursor.module.css         # Cursor styles (optional if using Tailwind)
├── hooks/
│   └── useCursorHover.ts             # (Optional) Hook for cursor state context
├── lib/
│   └── gsap.ts                       # Centralized GSAP config (Phase 1)
└── app/
    └── layout.tsx                    # Mount cursor at app root
```

### Pattern 1: GSAP quickTo with useRef (Performance-Optimized Mouse Tracking)

**What:** Store cursor position in `useRef`, use `gsap.quickTo()` for X/Y updates, avoid React re-renders

**When to use:** All custom cursor implementations (standard pattern)

**Example:**

```typescript
// Source: https://medium.com/@amilmohd155/elevate-your-ux-build-a-smooth-custom-cursor-with-gsap-and-react-b2a1bb1c01e8
// Source: https://blog.olivierlarose.com/tutorials/blend-mode-cursor

import { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 }); // Store in ref, NOT state

  useEffect(() => {
    // gsap.quickTo returns optimized setter function
    const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.2, ease: 'power2.out' });
    const yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.2, ease: 'power2.out' });

    function handleMouseMove(e: MouseEvent) {
      mousePos.current = { x: e.clientX, y: e.clientY };
      xTo(e.clientX);
      yTo(e.clientY);
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
      style={{ translate: '-50% -50%' }} // Center on mouse position
    />
  );
}
```

**Why this pattern:**
- `quickTo()` skips convenience overhead of `gsap.to()` on every call (designed for high-frequency updates)
- `useRef` for position avoids triggering React reconciliation on every mousemove
- `requestAnimationFrame` not needed when using `quickTo()` — GSAP ticker handles it internally

### Pattern 2: Data Attribute Hover States

**What:** Use `data-cursor` attributes on interactive elements to declare cursor behavior, update cursor appearance via event delegation or hover detection

**When to use:** When you need different cursor states for different element types (buttons, cards, links)

**Example:**

```typescript
// Source: https://github.com/michaelgudzevskyi/cursor-hover-effect-gsap
// Source: https://gsap.com/community/forums/topic/38827-hover-state-of-custom-cursor-has-unpredictable-behaviour-react-gsap/

// In component markup:
<button data-cursor="scale">Click me</button>
<a href="#" data-cursor="link">Read more</a>
<div data-cursor="view" data-cursor-text="View">
  <img src="project.jpg" alt="Project" />
</div>

// In CustomCursor component:
const [cursorState, setCursorState] = useState<string>('default');
const [cursorText, setCursorText] = useState<string>('');

useEffect(() => {
  function handleMouseOver(e: MouseEvent) {
    const target = (e.target as HTMLElement).closest('[data-cursor]');
    if (target) {
      setCursorState(target.getAttribute('data-cursor') || 'default');
      setCursorText(target.getAttribute('data-cursor-text') || '');
    } else {
      setCursorState('default');
      setCursorText('');
    }
  }

  document.addEventListener('mouseover', handleMouseOver);
  return () => document.removeEventListener('mouseover', handleMouseOver);
}, []);

// Animate cursor based on state
useGSAP(() => {
  if (cursorState === 'scale') {
    gsap.to(cursorRef.current, { scale: 1.5, duration: 0.3 });
  } else if (cursorState === 'view') {
    gsap.to(cursorRef.current, { scale: 2, backgroundColor: '#FF6B6B', duration: 0.3 });
  }
  // ... etc
}, { dependencies: [cursorState] });
```

**Why this pattern:**
- Declarative: designers/developers can add cursor behavior in markup without touching cursor component
- Supports nested elements via `closest('[data-cursor]')`
- Easy to extend with new cursor states

### Pattern 3: Magnetic Cursor Effect (Distance-Based Snapping)

**What:** When cursor approaches interactive element, calculate distance and apply magnetic pull toward element center

**When to use:** CTAs, featured buttons, important interactive elements (use sparingly — too many magnetic elements feels chaotic)

**Example:**

```typescript
// Source: https://www.100daysofcraft.com/blog/motion-interactions/building-a-magnetic-cursor-effect
// Source: https://gsap.com/community/forums/topic/25319-magnetic-hover-interaction-with-cursor/

function MagneticButton({ children }: { children: React.ReactNode }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const MAX_DISTANCE = 100; // px - threshold for magnetic effect

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    function handleMouseMove(e: MouseEvent) {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      if (distance < MAX_DISTANCE) {
        // Force approaches 1 as distance approaches 0
        const force = 1 - (distance / MAX_DISTANCE);
        const pullX = deltaX * force * 0.3; // 0.3 = strength multiplier
        const pullY = deltaY * force * 0.3;

        gsap.to(button, {
          x: pullX,
          y: pullY,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        // Snap back when cursor leaves magnetic field
        gsap.to(button, { x: 0, y: 0, duration: 0.3 });
      }
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return <button ref={buttonRef} data-cursor="magnetic">{children}</button>;
}
```

**Why this pattern:**
- Physics-based force calculation feels natural (gradual pull, not instant snap)
- 100px threshold performs well in user testing (200px too aggressive, 50px too subtle)
- Button moves toward cursor (not cursor toward button) — maintains cursor tracking consistency

### Pattern 4: Touch Device Detection (CSS + JS)

**What:** Hide custom cursor on touch devices using CSS media queries, with JavaScript fallback

**When to use:** All custom cursor implementations (required)

**Example:**

```css
/* Source: https://www.smashingmagazine.com/2022/03/guide-hover-pointer-media-queries/ */
/* Source: https://ferie.medium.com/detect-a-touch-device-with-only-css-9f8e30fa1134 */

/* Hide cursor on pure touch devices (no mouse available) */
@media (pointer: coarse) and (hover: none) {
  .custom-cursor {
    display: none;
  }
}

/* Alternative: Hide if primary pointer is coarse (fingers) */
@media (pointer: coarse) {
  .custom-cursor {
    display: none;
  }
}

/* Show cursor only on devices with fine pointer (mouse, trackpad) */
@media (pointer: fine) {
  .custom-cursor {
    display: block;
  }
}
```

```typescript
// JavaScript fallback (if needed for edge cases)
const [isTouchDevice, setIsTouchDevice] = useState(false);

useEffect(() => {
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  setIsTouchDevice(hasTouch);
}, []);

if (isTouchDevice) return null; // Don't render cursor
```

**Why this pattern:**
- CSS media queries more performant than JS detection (runs before JS loads)
- `pointer: coarse` detects touch screens, `hover: none` ensures no hover capability (eliminates hybrid devices with both touch + mouse)
- `(any-pointer: coarse)` detects if device has touch at all, but less accurate for primary input method

### Pattern 5: Cursor with Contextual Text Labels

**What:** Display text inside or alongside cursor when hovering specific elements ("View", "Play", "Drag")

**When to use:** Image galleries, video embeds, draggable elements, project cards

**Example:**

```typescript
// Source: https://motion.dev/docs/cursor (conceptual - Motion framework reference)
// Source: https://medium.com/swlh/custom-cursor-with-js-and-gsap-afd869e9154d

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState<string>('');

  // ... mouse tracking setup ...

  useGSAP(() => {
    if (cursorText && textRef.current) {
      // Fade in text label
      gsap.to(textRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.2,
        ease: 'power2.out'
      });
    } else if (textRef.current) {
      // Fade out
      gsap.to(textRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.2
      });
    }
  }, { dependencies: [cursorText] });

  return (
    <div ref={cursorRef} className="custom-cursor">
      <div className="cursor-dot" />
      <span ref={textRef} className="cursor-text">
        {cursorText}
      </span>
    </div>
  );
}

// In component markup:
<div data-cursor-text="View">
  <img src="project.jpg" alt="Project" />
</div>
```

**Why this pattern:**
- Text provides contextual affordance ("this is clickable and will do X")
- Fade in/out with slight scale feels polished (not jarring instant show/hide)
- Keep text short (1 word max) — multi-word labels feel cluttered at cursor scale

### Pattern 6: Blend Mode Cursor (Invert/Difference)

**What:** Use CSS `mix-blend-mode` to create color-inverting cursor that adapts to background

**When to use:** When you want cursor to be visible on both light and dark backgrounds without manual color switching

**Example:**

```css
/* Source: https://blog.olivierlarose.com/tutorials/blend-mode-cursor */
/* Source: https://codesandbox.io/s/custom-cursor-with-blend-mode-exclusion-wnhoq */

.custom-cursor {
  mix-blend-mode: difference; /* or exclusion */
  background-color: white; /* Inverts to black on white bg, white on black bg */
  border-radius: 50%;
  width: 24px;
  height: 24px;
  pointer-events: none;
}

/* Alternative: exclusion mode (softer inversion) */
.custom-cursor-exclusion {
  mix-blend-mode: exclusion;
  background-color: #FF6B6B; /* Coral cursor from site palette */
}
```

**Why this pattern:**
- Automatic contrast adjustment — no manual color state management for light/dark sections
- `difference` mode provides strong contrast, `exclusion` provides softer effect
- Works well with navy/coral/peach palette — coral cursor with exclusion mode creates unique interactions

### Anti-Patterns to Avoid

- **Using React state for cursor position:** Triggers re-render on every mousemove (60+ times per second) — use `useRef` instead
- **Not using quickTo():** Calling `gsap.to()` on every mousemove creates/destroys tweens repeatedly — use `quickTo()` for frequent updates
- **Forgetting pointer-events: none:** Cursor intercepts clicks, breaks all interactions — always set `pointer-events: none`
- **Hard-coding cursor visibility:** Don't hide cursor with `display: none` in JS based on touch detection — use CSS media queries for progressive enhancement
- **Too many magnetic elements:** More than 2-3 magnetic elements on screen feels chaotic — reserve for primary CTAs only
- **Cursor trails/particles:** Performance drain, accessibility nightmare, feels gimmicky — out of scope per requirements
- **Not cleaning up event listeners:** Memory leaks on route change — use useEffect cleanup or useGSAP context

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Mouse interpolation | Custom lerp loop with RAF | GSAP `quickTo()` | GSAP handles ticker, easing, precision, and edge cases internally — custom lerp requires managing animation frame scheduling, handling paused tabs, and easing curves |
| Touch detection | Navigator.userAgent parsing | CSS `@media (pointer: coarse)` + `(hover: none)` | User agent strings unreliable (spoofing, outdated), CSS media queries detect actual hardware capability, not UA string |
| Cursor state management | Custom event system | Data attributes + event delegation | Data attributes are declarative, work with SSR, easy to debug in DevTools — custom event systems require manual registration/cleanup |
| Hover state animations | Custom transition classes | GSAP timelines | GSAP provides fine-grained control, stagger, callbacks — CSS transitions limited for multi-step animations |
| Distance calculations for magnetic effect | Custom vector math | Built-in Math.sqrt, getBoundingClientRect | Browser-native geometry APIs are optimized and well-tested — reinventing introduces floating-point errors |

**Key insight:** Custom cursors have deceptively many edge cases (viewport boundaries, iframe overlays, text selection, right-click menus, page zoom, multi-monitor setups). Using battle-tested libraries (GSAP) and browser primitives (CSS media queries, data attributes) handles these cases better than custom solutions.

## Common Pitfalls

### Pitfall 1: Cursor Causes Re-Renders on Every Mousemove

**What goes wrong:** Storing cursor position in React state triggers full component re-render 60+ times per second, causing layout thrashing and janky animations

**Why it happens:** Developers familiar with React's "state for everything" pattern apply it to cursor tracking without considering performance implications

**How to avoid:**
- Store cursor position in `useRef`, not `useState`
- Use GSAP `quickTo()` for direct DOM manipulation (bypasses React reconciliation)
- Only use state for discrete cursor states (hover mode, active element) that change infrequently

**Warning signs:**
- Cursor movement feels laggy or stutters
- React DevTools profiler shows constant re-renders during mouse movement
- Other page elements flicker or re-render when moving cursor

### Pitfall 2: Cursor Intercepts Clicks (Missing pointer-events: none)

**What goes wrong:** Cursor element sits on top of interactive elements with higher z-index, blocking click events from reaching buttons/links underneath

**Why it happens:** Forgot to set `pointer-events: none` on cursor element, or applied it incorrectly to child elements only

**How to avoid:**
- Always apply `pointer-events: none` to cursor container AND all children
- Verify in DevTools: inspect cursor element, confirm click events pass through to elements below

**Warning signs:**
- Buttons/links only clickable when cursor is NOT hovering them
- Cursor element shows up in browser DevTools element selector on click
- Text selection behaves strangely or fails when cursor is present

### Pitfall 3: Cursor Visible on Touch Devices

**What goes wrong:** Custom cursor renders on mobile/tablet, creates confusing UX (users see dot following their finger) or breaks touch interactions

**Why it happens:** No touch device detection, or relying only on `window.matchMedia` which doesn't work on all devices

**How to avoid:**
- Use CSS media query `@media (pointer: coarse) and (hover: none)` to hide cursor via `display: none`
- Add JavaScript fallback for edge cases: `'ontouchstart' in window || navigator.maxTouchPoints > 0`
- Test on actual touch devices (emulator hover behavior doesn't match real hardware)

**Warning signs:**
- Cursor visible on mobile preview
- Users report "weird dot following their finger"
- Cursor appears briefly on page load before JS hides it (flash of cursor)

### Pitfall 4: Cursor Gets Stuck at Viewport Edges

**What goes wrong:** Cursor element uses `translate(-50%, -50%)` centering but doesn't account for viewport boundaries, causing half the cursor to clip offscreen at edges

**Why it happens:** Centering cursor on mouse position without clamping coordinates to viewport bounds

**How to avoid:**
- Option 1: Accept edge clipping (most common — users rarely notice)
- Option 2: Clamp cursor position to viewport bounds:
  ```typescript
  const clampX = Math.max(cursorRadius, Math.min(e.clientX, window.innerWidth - cursorRadius));
  const clampY = Math.max(cursorRadius, Math.min(e.clientY, window.innerHeight - cursorRadius));
  ```
- Option 3: Shrink cursor when approaching edges (advanced)

**Warning signs:**
- Cursor cut off at screen edges
- Cursor jumps when mouse leaves/re-enters viewport
- Cursor behaves differently on multi-monitor setups

### Pitfall 5: Cursor Doesn't Work Over Iframes

**What goes wrong:** Custom cursor disappears when hovering embedded content (YouTube videos, maps, social embeds) because mousemove events don't fire over iframes

**Why it happens:** Iframes are separate documents — parent page can't listen to mouse events inside iframe

**How to avoid:**
- Accept limitation — cursor hides over iframes (standard behavior)
- Alternative: Add invisible overlay div over iframe, show on mouseenter (breaks iframe interactions)
- Best practice: Keep default cursor over iframes, only use custom cursor for site-controlled content

**Warning signs:**
- Cursor disappears over embedded videos/maps
- Cursor position freezes at iframe boundary
- Users report "cursor acting weird" on pages with embeds

### Pitfall 6: Memory Leaks from Event Listeners

**What goes wrong:** Event listeners (mousemove, mouseover) attached to window/document persist after component unmounts, causing memory leaks on route changes

**Why it happens:** Missing cleanup in useEffect return function, or using `useGSAP` without scope parameter

**How to avoid:**
- Always return cleanup function from useEffect:
  ```typescript
  useEffect(() => {
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler); // REQUIRED
  }, []);
  ```
- Use `useGSAP` with scope parameter for automatic cleanup:
  ```typescript
  const { contextSafe } = useGSAP(() => { /* animations */ }, { scope: cursorRef });
  ```

**Warning signs:**
- Memory usage increases on route changes (Chrome DevTools Memory profiler)
- Multiple cursor instances rendering after navigation
- Console warnings about "can't perform state update on unmounted component"

### Pitfall 7: Cursor Lags Behind Mouse on Fast Movement

**What goes wrong:** Cursor interpolation feels sluggish during quick mouse movements, breaking illusion of cursor "following" the mouse

**Why it happens:** Interpolation duration too long (>0.3s), or using ease that overshoots (elastic, back)

**How to avoid:**
- Use short duration: 0.1-0.2s for main cursor, 0.4-0.6s for follower/trail element
- Use `power2.out` or `power3.out` ease (avoid bounce, elastic, back)
- Test with fast cursor movements — cursor should feel responsive, not floaty

**Warning signs:**
- Cursor feels "drunk" or delayed
- Cursor doesn't catch up to mouse during rapid movement
- Users report cursor feels "off" or "laggy"

### Pitfall 8: Not Respecting prefers-reduced-motion

**What goes wrong:** Cursor animations continue for users who requested reduced motion, causing discomfort/vestibular issues

**Why it happens:** No `prefers-reduced-motion` detection, or only disabling scroll animations (forgetting cursor)

**How to avoid:**
- Use `gsap.matchMedia()` to disable cursor animations when `(prefers-reduced-motion: reduce)`
- Alternative: Hide custom cursor entirely, show default pointer
- Follow existing `useScrollAnimation` hook pattern for consistency

**Warning signs:**
- Cursor animates even when system settings request reduced motion
- No fallback for users with motion sensitivity
- Accessibility audit fails

## Code Examples

Verified patterns from official sources:

### Basic Custom Cursor with GSAP quickTo

```typescript
// Source: https://medium.com/@amilmohd155/elevate-your-ux-build-a-smooth-custom-cursor-with-gsap-and-react-b2a1bb1c01e8
// Source: https://blog.olivierlarose.com/tutorials/blend-mode-cursor

'use client';

import { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursorRef.current || !followerRef.current) return;

    // quickTo returns function for efficient updates
    const cursorX = gsap.quickTo(cursorRef.current, 'x', { duration: 0.2, ease: 'power2.out' });
    const cursorY = gsap.quickTo(cursorRef.current, 'y', { duration: 0.2, ease: 'power2.out' });
    const followerX = gsap.quickTo(followerRef.current, 'x', { duration: 0.6, ease: 'power2.out' });
    const followerY = gsap.quickTo(followerRef.current, 'y', { duration: 0.6, ease: 'power2.out' });

    function handleMouseMove(e: MouseEvent) {
      cursorX(e.clientX);
      cursorY(e.clientY);
      followerX(e.clientX);
      followerY(e.clientY);
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Main cursor - fast follow */}
      <div
        ref={cursorRef}
        className="custom-cursor pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-coral"
        style={{ translate: '-50% -50%' }}
      />
      {/* Follower - slow trail */}
      <div
        ref={followerRef}
        className="custom-cursor-follower pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 rounded-full border border-coral"
        style={{ translate: '-50% -50%' }}
      />
    </>
  );
}
```

### Touch Device Detection (CSS)

```css
/* Source: https://www.smashingmagazine.com/2022/03/guide-hover-pointer-media-queries/ */

/* Hide cursor on pure touch devices */
@media (pointer: coarse) and (hover: none) {
  .custom-cursor,
  .custom-cursor-follower {
    display: none !important;
  }
}

/* Show default cursor on touch to avoid confusion */
@media (pointer: coarse) {
  * {
    cursor: auto !important;
  }
}
```

### Data Attribute Hover States

```typescript
// Source: https://github.com/michaelgudzevskyi/cursor-hover-effect-gsap

// In component:
<button data-cursor="scale">Hover me</button>
<a href="#" data-cursor="link">Read more</a>
<div data-cursor="view" data-cursor-text="View Project">
  <img src="project.jpg" alt="Project" />
</div>

// In CustomCursor:
const [cursorState, setCursorState] = useState('default');

useEffect(() => {
  function updateCursorState(e: MouseEvent) {
    const target = (e.target as HTMLElement).closest('[data-cursor]');
    if (target) {
      setCursorState(target.getAttribute('data-cursor') || 'default');
    } else {
      setCursorState('default');
    }
  }

  document.addEventListener('mouseover', updateCursorState);
  return () => document.removeEventListener('mouseover', updateCursorState);
}, []);

useGSAP(() => {
  const states = {
    default: { scale: 1, backgroundColor: '#FF6B6B' },
    scale: { scale: 1.5, backgroundColor: '#FF6B6B' },
    link: { scale: 0.5, backgroundColor: '#1E3A8A' },
    view: { scale: 2, backgroundColor: '#FBBF24' },
  };

  gsap.to(cursorRef.current, {
    ...states[cursorState as keyof typeof states],
    duration: 0.3,
    ease: 'power2.out'
  });
}, { dependencies: [cursorState] });
```

### Magnetic Button Effect

```typescript
// Source: https://www.100daysofcraft.com/blog/motion-interactions/building-a-magnetic-cursor-effect

function MagneticButton({ children }: { children: React.ReactNode }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const MAX_DISTANCE = 100; // magnetic field radius in pixels

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    function handleMouseMove(e: MouseEvent) {
      const rect = button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      if (distance < MAX_DISTANCE) {
        // Physics-based force: 1 at center, 0 at threshold
        const force = 1 - (distance / MAX_DISTANCE);
        gsap.to(button, {
          x: deltaX * force * 0.3,
          y: deltaY * force * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        });
      } else {
        gsap.to(button, { x: 0, y: 0, duration: 0.3 });
      }
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <button ref={buttonRef} data-cursor="magnetic">
      {children}
    </button>
  );
}
```

### Reduced Motion Support

```typescript
// Source: Existing project pattern from useScrollAnimation hook

import { gsap, MOTION_QUERIES } from '@/lib/gsap';

useEffect(() => {
  const mm = gsap.matchMedia();

  // Show custom cursor only when reduced motion is NOT active
  mm.add(MOTION_QUERIES.noPreference, () => {
    // Enable custom cursor, attach event listeners
    const handleMouseMove = (e: MouseEvent) => {
      // ... cursor tracking logic
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  });

  // Hide custom cursor when reduced motion is active
  mm.add(MOTION_QUERIES.reduced, () => {
    if (cursorRef.current) {
      gsap.set(cursorRef.current, { display: 'none' });
    }
  });

  return () => mm.revert();
}, []);
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| CSS cursor property with custom image | JavaScript DOM element with GSAP | ~2020 (GSAP 3 release) | CSS cursors limited to static images, can't animate or react to context; GSAP enables dynamic size/color/text changes |
| gsap.to() in mousemove handler | gsap.quickTo() reusable setter | GSAP 3.10 (2022) | 10-30% performance improvement for frequent updates; reduces tween creation overhead |
| useEffect for GSAP cleanup | useGSAP hook with scope | @gsap/react 2.0 (2023) | Automatic context cleanup prevents memory leaks; solves React 18+ strict mode double-mount issues |
| JavaScript touch detection (UA parsing) | CSS @media (pointer: coarse) | ~2021 (media queries L4 support) | CSS media queries run before JS loads, work with SSR, detect actual hardware capability vs unreliable UA strings |
| requestAnimationFrame loops for cursor | GSAP ticker (internal RAF) | Native to GSAP | GSAP ticker handles tab visibility, frame scheduling, lag smoothing — no manual RAF management needed |

**Deprecated/outdated:**
- **CSS cursor: url()**: Limited to 128x128px on most browsers, no animation support, poor performance with large images
- **User-Agent string parsing for touch**: Easily spoofed, doesn't detect actual hardware, breaks with new devices
- **Manual RAF loops**: Error-prone (missing cleanup, tab throttling issues), GSAP ticker handles all edge cases
- **jQuery cursor plugins**: Bundle size overhead, performance issues, unmaintained since ~2018

## Inspiration Site Analysis

### kota.co.uk Cursor Behavior (WebFetch Limitations)

**Observed from HTML structure:**
- Uses `.ProjectCard` components with overlay system (`.ProjectCard_imageOverlay_OCawr`)
- Likely implements cursor expansion on card hover alongside visual overlay effect
- Agency positioning ("refuse to blend in") suggests cursor reinforces brand through intentional micro-interactions
- Probable pattern: Cursor transforms shape/size when entering project card area, returns to default on exit

**Inference:** Card hover likely uses combination of scale + color change + possible text label ("View" or project category)

### strangepixels.co Cursor Behavior (WebFetch Limitations)

**Observed from CSS:**
- Uses `--framer-custom-cursors` CSS variable system
- Framer-built site (compiled implementation not visible in source)
- Cursor customization infrastructure present but mechanics in separate modules

**Inference:** Framer's cursor system typically supports state-based transformations triggered by component hover

**Recommendation for Implementation:**

Based on portfolio site patterns (2026 standard), card hover typically uses:
1. **Scale increase** (1.5-2x) to emphasize interactivity
2. **Color shift** (e.g., coral to navy, or inverse) to signal state change
3. **Text label** ("View", "Explore") fades in on hover
4. **Possible magnetic effect** (subtle pull toward card center when within 80-100px)

For OneSquad's navy/coral/peach palette:
- Default cursor: 24px coral circle with `mix-blend-mode: exclusion` (adapts to background)
- Card hover: Scale to 48px, show "View" text inside cursor, possible background change to navy
- Button/link hover: Scale to 12px (shrink), change to peach
- Draggable elements: Show "Drag" text, change cursor to hand icon or directional indicator

**Confidence:** MEDIUM (inferred from HTML structure + industry patterns, not direct observation of running cursor)

## Open Questions

1. **Magnetic Effect Scope**
   - What we know: Magnetic cursors work best on primary CTAs (1-2 per page), threshold of 100px performs well in testing
   - What's unclear: Which specific elements in OneSquad site should get magnetic treatment — hero CTA only, or also featured service cards?
   - Recommendation: Start with hero CTA only, add to featured cards if feels natural during implementation (easy to toggle via data-cursor attribute)

2. **Cursor Performance with Lenis Smooth Scroll**
   - What we know: GSAP ticker sync already configured for Lenis (Phase 1), cursor uses GSAP quickTo
   - What's unclear: Whether cursor tracking needs additional sync with Lenis scroll events, or if GSAP ticker handles both independently
   - Recommendation: Implement cursor with standard mousemove tracking first, test for scroll-induced cursor lag; add scroll sync only if needed

3. **Blend Mode vs Solid Color**
   - What we know: `mix-blend-mode: difference` provides automatic contrast but limits color palette, solid colors give more brand control but require manual light/dark switching
   - What's unclear: Whether navy/coral/peach palette works better with blend mode flexibility or explicit color control
   - Recommendation: Test both — start with `mix-blend-mode: exclusion` + coral base color for unique effect, fall back to solid coral with manual color switching if blend mode conflicts with existing design

4. **Contextual Text Label Animation**
   - What we know: Text labels should fade in/scale on hover, keep to 1 word max
   - What's unclear: Exact animation timing (instant, 0.2s fade, stagger characters?) and label placement (inside cursor circle, offset to side?)
   - Recommendation: 0.2s fade with slight scale (0.8 to 1), center text inside enlarged cursor (simplest, keeps cursor self-contained)

## Sources

### Primary (HIGH confidence)

- [GSAP quickTo() Official Docs](https://gsap.com/docs/v3/GSAP/gsap.quickTo/) - API reference and performance optimization
- [useGSAP Hook GitHub](https://github.com/greensock/react) - React integration and automatic cleanup
- [GSAP React Documentation](https://gsap.com/resources/React/) - Official React & GSAP guide
- [Smashing Magazine: Hover and Pointer Media Queries](https://www.smashingmagazine.com/2022/03/guide-hover-pointer-media-queries/) - Touch device detection
- [MDN: pointer-events](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/pointer-events) - Click-through behavior
- [MDN: mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mix-blend-mode) - Blend mode reference

### Secondary (MEDIUM confidence)

- [Building a Smooth Custom Cursor with GSAP and React](https://medium.com/@amilmohd155/elevate-your-ux-build-a-smooth-custom-cursor-with-gsap-and-react-b2a1bb1c01e8) - Complete implementation guide
- [Olivier Larose: Animated Cursor with React and GSAP](https://blog.olivierlarose.com/tutorials/blend-mode-cursor) - Blend mode cursor tutorial
- [Building a Magnetic Cursor Effect That Actually Feels Good](https://www.100daysofcraft.com/blog/motion-interactions/building-a-magnetic-cursor-effect) - Magnetic effect physics
- [Motion.dev: Introducing Magnetic Cursors](https://motion.dev/blog/introducing-magnetic-cursors-in-motion-cursor) - Magnetic cursor patterns
- [Diona Rodrigues: Custom Cursor Follower with GSAP](https://dionarodrigues.dev/blog/how-create-a-custom-cursor-follower-with-gsap) - Follower/trail pattern
- [Detect Touch Device with CSS](https://ferie.medium.com/detect-a-touch-device-with-only-css-9f8e30fa1134) - CSS-only touch detection
- [GitHub: Cursor Hover Effect GSAP](https://github.com/michaelgudzevskyi/cursor-hover-effect-gsap) - Data attribute pattern
- [GSAP Community: Magnetic Hover Interaction](https://gsap.com/community/forums/topic/25319-magnetic-hover-interaction-with-cursor/) - Magnetic implementation discussion
- [14islands: Developing a Performant Custom Cursor](https://medium.com/14islands/developing-a-performant-custom-cursor-89f1688a02eb) - Performance best practices

### Tertiary (LOW confidence - requires validation)

- [Codrops: Custom Cursor Effects](https://tympanus.net/codrops/2019/01/31/custom-cursor-effects/) - Creative examples (may be outdated patterns)
- [Webflow Forum: Cursor with Iframes](https://discourse.webflow.com/t/enabling-iframe-interaction-with-a-custom-cursor/213097) - Edge case discussion
- [CSS-Tricks: Cursor Property](https://css-tricks.com/almanac/properties/c/cursor/) - Basic CSS cursor reference

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - GSAP quickTo + useGSAP verified via official docs and community patterns
- Architecture: HIGH - Patterns verified across multiple tutorials and official GSAP React guide
- Pitfalls: HIGH - Common issues documented in GSAP forums and React performance articles
- Inspiration site analysis: MEDIUM - Inferred from HTML structure, not direct observation (WebFetch limitations)
- Magnetic effect thresholds: MEDIUM - Based on UX research article, not official spec
- Blend mode approach: MEDIUM - Valid CSS spec, but OneSquad-specific palette fit needs testing

**Research date:** 2026-02-11
**Valid until:** 2026-03-13 (30 days - stable domain, GSAP API unlikely to change)

---

*Research complete for Phase 02: Custom Cursor System*

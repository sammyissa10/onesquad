# Pitfalls Research

**Domain:** Creative Web Animation (GSAP + Next.js)
**Researched:** 2026-02-10
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Memory Leaks from Missing GSAP Cleanup

**What goes wrong:**
ScrollTriggers, timelines, and tweens persist across route changes in Next.js, causing memory consumption to grow with each navigation. Every page transition reloads GSAP, causing ScrollTriggers to leak. Users experience progressively worse performance, "stuck" scroll triggers on wrong pages, and eventual browser slowdowns or crashes.

**Why it happens:**
Developers use `useEffect` instead of `useGSAP()` hook, or forget to return cleanup functions. GSAP animations created in components don't automatically clean up when the component unmounts in React/Next.js. The standard React lifecycle doesn't understand GSAP's internal animation tracking.

**How to avoid:**
- **Always use `useGSAP()` from `@gsap/react`** instead of `useEffect/useLayoutEffect`
- The hook automatically manages cleanup of all GSAP instances (tweens, timelines, ScrollTriggers, Draggables) via internal `gsap.context()`
- For manual cleanup: `return () => { ScrollTrigger.getAll().forEach(st => st.kill()); }`
- Kill specific triggers, don't wipe out all triggers globally

**Warning signs:**
- ScrollTrigger animations trigger on wrong pages after navigation
- Browser memory usage increases with each route change
- Animations become progressively laggier
- Console warnings about duplicate ScrollTrigger IDs

**Phase to address:**
Phase 1 (Foundation/Setup) - Establish `useGSAP()` as the standard pattern before building animations.

---

### Pitfall 2: Next.js SSR/Hydration Conflicts with GSAP

**What goes wrong:**
Hydration mismatch errors appear in console. GSAP ScrollTrigger adds `style={{}}` attributes to elements during initialization that don't match server-rendered HTML. Visual glitches, broken interactivity, or complete application failures on initial page load. The classic "Text content does not match server-rendered HTML" error.

**Why it happens:**
GSAP runs on the client and manipulates the DOM (adding inline styles, wrapper divs for pinning, etc.), but Next.js pre-renders HTML on the server. The server-rendered output doesn't include GSAP's modifications, creating a mismatch when React hydrates. ScrollTrigger's enable function modifies body styles multiple times, triggering extra attribute warnings.

**How to avoid:**
- Always use `"use client"` directive in components with GSAP
- Wrap GSAP initialization in client-side-only checks: `if (typeof window !== 'undefined')`
- Use `useGSAP()` which handles React lifecycle correctly
- For persistent warnings, add `suppressHydrationWarning={true}` to affected elements
- Consider dynamic imports with `ssr: false` for heavy animation components

**Warning signs:**
- Red hydration error messages in console during development
- Elements that "pop" or shift position on page load
- Styles that appear different on initial load vs. after client hydration
- ScrollTrigger warnings about style elements

**Phase to address:**
Phase 1 (Foundation/Setup) - Configure all GSAP components with proper client-side initialization before building complex animations.

---

### Pitfall 3: Route Navigation Breaks ScrollTrigger State

**What goes wrong:**
ScrollTrigger animations fail to reset when navigating between routes. Returning to a previous route shows broken or non-functional animations. Pinned elements stay pinned. Markers show incorrect positions. `ScrollTrigger.refresh()` doesn't fix the issue.

**Why it happens:**
Next.js App Router doesn't do full page reloads on navigation - it's a SPA. ScrollTriggers created on one route persist in memory, but their DOM references become stale. The scroll position isn't reset to top on route change, so triggers fire in unexpected order. Cleanup functions aren't properly tied to route unmounting.

**How to avoid:**
- Use `useGSAP()` with proper cleanup (kills all triggers created in that scope)
- For route-specific triggers, use unique IDs: `id: 'hero-section-scroll'`
- On route change, kill specific triggers rather than global refresh: `ScrollTrigger.getById('hero-section-scroll')?.kill()`
- Consider using `usePathname()` from Next.js to detect route changes and trigger cleanup
- Use `ScrollTrigger.clearScrollMemory()` if needed

**Warning signs:**
- Animations work on first visit but break after navigation
- Multiple ScrollTriggers firing for the same element
- Console errors about missing DOM elements
- Pinned elements that don't unpin

**Phase to address:**
Phase 2 (Route Navigation) - Test all animations across route transitions before proceeding to complex timelines.

---

### Pitfall 4: ScrollTrigger Pin Causes Layout Shift (CLS Penalty)

**What goes wrong:**
Core Web Vitals score tanks due to high Cumulative Layout Shift (CLS). Pinned elements cause content below to suddenly jump when pinning activates. Content scrolls under pinned elements unexpectedly. Spacing issues on resize or in flexbox layouts. Google search ranking drops.

**Why it happens:**
ScrollTrigger adds padding to push elements down by default (`pinSpacing: true`), but this padding is added dynamically causing a layout shift. In flexbox containers (`display: flex`), pinSpacing doesn't work as expected because padding behaves differently. Transform or will-change on ancestor elements breaks `position: fixed`, causing sudden shifts when pinning activates.

**How to avoid:**
- **Pre-allocate space** for pinned elements in CSS (min-height matching pin duration)
- Use `pinSpacing: false` in flex containers, handle spacing manually
- Avoid `transform` or `will-change` on ancestors of pinned elements, or use `pinReparent: true` (expensive)
- Test with Chrome DevTools Coverage + Performance tools to measure CLS
- Use `anticipatePin: 1` to calculate pin size earlier and reduce shift

**Warning signs:**
- Content below pinned section jumps when scrolling
- CLS score above 0.1 in PageSpeed Insights
- Pinned element suddenly shifts position before moving with scroll
- Spacing issues appear on window resize
- Flexbox layouts with unexpected gaps

**Phase to address:**
Phase 3 (Scroll Animations) - Address during initial ScrollTrigger implementation. Test CLS immediately.

---

### Pitfall 5: Framer Motion + GSAP Conflicts and Confusion

**What goes wrong:**
Animations fight each other. Element positions become unpredictable. Performance degrades. Both libraries try to animate the same properties. Developer confusion about which library to use where. Unnecessary bundle size from overlapping functionality.

**Why it happens:**
Both libraries manipulate transform, opacity, and layout properties. Framer Motion uses React state/props, GSAP uses imperative refs. When both animate the same element, the last one to update wins, creating jerky motion. Developers import both without a clear separation of concerns.

**How to avoid:**
- **Clear separation:** Use Framer Motion for React component animations (mount/unmount, state changes, gestures). Use GSAP for scroll-driven timelines, complex sequences, and precise timing control.
- **Never animate the same element with both libraries simultaneously**
- Framer Motion for: Page transitions, hover states, layout animations, route changes
- GSAP for: ScrollTrigger effects, pinning, parallax, complex multi-step timelines
- If overlap is unavoidable, GSAP can animate a parent, Framer Motion animates children

**Warning signs:**
- Animations that stutter or jump
- Elements that "fight" to reach position
- Unpredictable animation behavior
- Bundle size unnecessarily large (>150kb for animation alone)

**Phase to address:**
Phase 1 (Foundation/Setup) - Document animation library boundaries in project docs before building.

---

### Pitfall 6: Custom Cursor Performance Kills Mobile Experience

**What goes wrong:**
Custom cursor causes janky motion on desktop. Mobile users get no benefit (cursors don't exist on touch), but still download the code. Battery drain on mobile from unnecessary event listeners. Input delay and frame drops create "sluggish" feeling.

**Why it happens:**
Tracking `mousemove` events without throttling fires hundreds of times per second. Using JavaScript to position an element creates double-buffering effect (perceivable input lag). Touch devices don't have cursors, but the code still runs. Custom cursors require `pointer-events: none`, which prevents interaction if implemented wrong.

**How to avoid:**
- **Detect touch devices** and disable custom cursor: `window.matchMedia('(hover: none)').matches`
- Use CSS cursor options first (`cursor: url(...)`) before custom elements
- Throttle to `requestAnimationFrame` if using JS element
- Use `transform: translate()` (GPU accelerated) not `left/top`
- Consider `will-change: transform` only on cursor element
- Hide on scroll or when idle to reduce GPU load

**Warning signs:**
- Visible lag between actual cursor and custom cursor
- Frame rate drops when moving mouse quickly
- Mobile users complain about performance
- Lighthouse Performance score drops on desktop

**Phase to address:**
Phase 4 (Custom Cursor) - Build with touch detection from day one. Test on actual mobile devices.

---

### Pitfall 7: Ignoring `prefers-reduced-motion` Breaks Accessibility

**What goes wrong:**
Users with vestibular disorders experience nausea, dizziness, headaches. Accessibility audit failures. Legal compliance issues (ADA, WCAG). Users with motion sensitivity can't use the site. Bad reputation in accessibility community.

**Why it happens:**
Developers focus on "cool animations" without considering accessibility. `prefers-reduced-motion` media query is treated as optional. No testing with motion preferences enabled. Assumption that "less animation" means "boring."

**How to avoid:**
- **Use `gsap.matchMedia()`** for automatic animation management:
  ```javascript
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
    // Full animations here - automatically reverted if preference changes
  });
  ```
- For reduced motion: Keep functional animations (page transitions), remove decorative ones (parallax, floating elements)
- Respect the setting globally, not per-animation
- Use `gsap.matchMediaRefresh()` if providing UI toggle
- Test with OS-level motion settings enabled

**Warning signs:**
- No motion preference checks in codebase
- All animations treated equally (no functional vs. decorative distinction)
- Accessibility audit tools flag motion issues
- User complaints about motion sickness

**Phase to address:**
Phase 1 (Foundation/Setup) - Build motion preference handling into base animation utilities before creating animations.

---

### Pitfall 8: Bloated Bundle Size from Improper GSAP Imports

**What goes wrong:**
Initial JavaScript bundle exceeds 60kb+ for animation library alone. Slow initial page load. Poor Largest Contentful Paint (LCP) scores. Users on slow connections wait seconds for animations to load. Core Web Vitals penalties.

**Why it happens:**
Importing entire GSAP package: `import gsap from "gsap"` instead of specific modules. Including plugins not used on every page in main bundle. Not using tree-shaking correctly. Not lazy-loading animation-heavy components.

**How to avoid:**
- **Import only what you need:** `import { gsap } from "gsap"` and `import { ScrollTrigger } from "gsap/ScrollTrigger"`
- Register plugins per-component, not globally: `gsap.registerPlugin(ScrollTrigger)` in component file
- Use Next.js dynamic imports for heavy animation components:
  ```javascript
  const AnimatedSection = dynamic(() => import('./AnimatedSection'), { ssr: false });
  ```
- Use `optimizePackageImports: ["gsap"]` in `next.config.js`
- Monitor bundle size with `@next/bundle-analyzer`

**Warning signs:**
- GSAP bundle shows >60kb in bundle analyzer
- Animation code in main bundle even for pages without animations
- LCP score >2.5 seconds
- First Contentful Paint delayed by animation library load

**Phase to address:**
Phase 1 (Foundation/Setup) - Configure proper imports and bundle optimization before building animations.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Skip `useGSAP()`, use `useEffect` | Familiar React pattern | Memory leaks, cleanup bugs, hours debugging route transitions | Never - useGSAP() is equally simple |
| Import entire GSAP library globally | Quick setup, everything available | 60kb+ bundle penalty, slow page loads, SEO impact | Never in production (maybe in prototypes) |
| No `prefers-reduced-motion` check | Faster development | Accessibility failures, user complaints, legal risk | Never - 5 minutes to implement |
| Skip mobile/touch detection for cursor | Works on desktop | Wasted bytes, potential mobile performance issues | Never - trivial check with big payoff |
| Use `ScrollTrigger.refresh()` everywhere | Seems to fix issues temporarily | Doesn't address root cause, performance overhead | Acceptable after legitimate DOM changes (accordion expand) |
| Animate with both Framer Motion and GSAP on same element | Use both libraries' features | Animation conflicts, unpredictable behavior, debugging nightmare | Never - choose one per element |
| Set `will-change` on every animated element | Feels like optimization | Excessive memory (19MB per image layer), battery drain, worse performance | Only for elements you KNOW will animate soon, remove after |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Next.js App Router | Running GSAP on server, causing "window is not defined" | Use `"use client"` directive, wrap in `typeof window !== 'undefined'` |
| next/link navigation | Expecting ScrollTriggers to auto-cleanup | Use `useGSAP()` hook with automatic cleanup, kill triggers on unmount |
| Framer Motion coexistence | Animating same properties with both libraries | Separate concerns: Framer Motion for component state, GSAP for scroll timelines |
| Mobile touch devices | Assuming cursor/hover animations work | Detect touch: `matchMedia('(hover: none)')`, provide touch-appropriate alternatives |
| Dynamic content (CMS) | Hard-coding animation start/end positions | Use function-based values: `start: () => calculateStart()` for auto-refresh |
| CSS-in-JS (styled-components) | Inline styles conflicting with GSAP | Use refs and GSAP to manipulate, or use CSS classes instead of inline |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Excessive `will-change` usage | High memory, battery drain, slower animations | Use sparingly, only on elements about to animate, remove after | >5-10 large elements with will-change: transform |
| Unthrottled scroll listeners | Scroll jank, stuttering, unresponsive UI | Use `requestAnimationFrame`, passive event listeners, or rely on ScrollTrigger | Firing >100 times/second |
| Animating `left/top` instead of `transform` | Janky motion, layout reflow on every frame | Always animate `transform: translate()` and `opacity` | Any repeated animation |
| ScrollTrigger without cleanup | Memory grows with each route change, degrading performance | Use `useGSAP()`, kill triggers on unmount | After 3-5 route navigations |
| Pinning without space reservation | CLS score >0.1, content jumping, SEO penalty | Pre-allocate height in CSS or use anticipatePin | Visible on first pin activation |
| Many simultaneous timelines | Frame drops, janky animations | Limit concurrent animations to 3-5, stagger others, use BatchedUpdate | >10 active timelines |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Forced long animations | Users feel trapped, can't interact, "website is slow" | Keep animations <600ms, allow scroll to skip, respect reduced motion |
| Parallax on all elements | Disorienting, nauseating for vestibular disorders | Use sparingly, subtle effect only, disable for reduced motion |
| Custom cursor with no fallback | Confusing on touch devices, broken if JS fails | Detect touch devices, disable cursor, ensure default cursor works |
| Scroll hijacking (smooth scroll) | Loss of control, unexpected behavior, accessibility issues | Let browser handle scroll, use ScrollTrigger without overriding scroll |
| Animations blocking content | Can't read text, can't click buttons | Ensure content readable during animation, interactive elements work immediately |
| No loading states for animations | Janky first appearance, "broken" feeling | Use CSS skeleton loaders, FOUC prevention, graceful degradation |

## "Looks Done But Isn't" Checklist

- [ ] **ScrollTrigger animations:** Often missing cleanup function - verify `useGSAP()` returns cleanup or manually kill triggers
- [ ] **Pinned sections:** Often missing space pre-allocation - verify CLS score <0.1 with Lighthouse
- [ ] **Custom cursor:** Often missing touch device detection - verify disabled on mobile with hover: none check
- [ ] **Route transitions:** Often missing proper animation lifecycle - verify animations reset when navigating away and back
- [ ] **Accessibility:** Often missing `prefers-reduced-motion` - verify with OS-level setting enabled, animations should reduce/disable
- [ ] **Bundle optimization:** Often includes entire GSAP library - verify with bundle analyzer, should see only used plugins
- [ ] **Mobile testing:** Often only tested on desktop - verify actual touch devices, not just DevTools responsive mode
- [ ] **Performance:** Often not tested across navigations - verify memory doesn't grow after 10+ route changes
- [ ] **Hydration:** Often causes warnings in console - verify no hydration mismatch errors in dev mode
- [ ] **Resize handling:** Often breaks on orientation change - verify animations recalculate on mobile rotate

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Memory leaks from missing cleanup | MEDIUM | Audit all GSAP usage, replace useEffect with useGSAP(), add cleanup functions, test navigation |
| Hydration mismatches | LOW | Add "use client" directives, wrap GSAP in client checks, add suppressHydrationWarning if needed |
| Route navigation breaks | MEDIUM | Implement proper cleanup with useGSAP(), add route change detection, use unique ScrollTrigger IDs |
| High CLS from pinning | MEDIUM | Add min-height to pin containers, use pinSpacing: false in flex, test with Lighthouse |
| Framer Motion conflicts | HIGH | Audit all animations, establish library boundaries, refactor conflicting animations to one library |
| Custom cursor performance | LOW | Add touch detection, throttle with RAF, use transform not left/top, consider disabling on scroll |
| Missing reduced-motion | LOW | Wrap animations in gsap.matchMedia(), define reduced versions, test with OS setting |
| Bloated bundle | MEDIUM | Switch to named imports, use dynamic imports for heavy components, configure optimizePackageImports |
| will-change overuse | LOW | Audit CSS, remove unnecessary will-change, add/remove dynamically only when animating |
| Resize/orientation breaks | MEDIUM | Use function-based ScrollTrigger values, add debounced refresh on orientation change |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Memory leaks | Phase 1: Foundation/Setup | Create route, navigate away/back 10x, check DevTools memory profiler |
| Hydration mismatches | Phase 1: Foundation/Setup | Check console for red hydration warnings in dev mode |
| Route navigation breaks | Phase 2: Route Navigation | Navigate between all routes, verify animations reset properly |
| ScrollTrigger pin CLS | Phase 3: Scroll Animations | Run Lighthouse, verify CLS <0.1, check PageSpeed Insights |
| Framer Motion conflicts | Phase 1: Foundation/Setup | Document library boundaries before building |
| Custom cursor performance | Phase 4: Custom Cursor | Test on actual mobile device, check no cursor on touch |
| Missing reduced-motion | Phase 1: Foundation/Setup | Enable OS motion preference, verify animations reduce/disable |
| Bloated bundle | Phase 1: Foundation/Setup | Run bundle analyzer, GSAP should be <30kb after compression |
| will-change overuse | Phase 5: Polish/Optimization | Audit CSS, check memory in DevTools with Timeline recording |
| Resize/orientation | Phase 3: Scroll Animations | Test mobile device rotation, check animations recalculate |

## Sources

**GSAP + Next.js Integration:**
- [Nextjs Render Error caused by Scroll Trigger being enabled - GitHub Issue #603](https://github.com/greensock/GSAP/issues/603)
- [Using ScrollTriggers in Next.js with useGSAP() - GSAP Forums](https://gsap.com/community/forums/topic/40128-using-scrolltriggers-in-nextjs-with-usegsap/)
- [Guide to using gsap ScrollTrigger in Next.js with useGSAP( ) - Medium](https://medium.com/@ccjayanti/guide-to-using-gsap-scrolltrigger-in-next-js-with-usegsap-c48d6011f04a)
- [React & GSAP Official Documentation](https://gsap.com/resources/React/)

**Memory Leaks & Cleanup:**
- [Memory Leaks in React & Next.js: What Nobody Tells You - Medium](https://medium.com/@essaadani.yo/memory-leaks-in-react-next-js-what-nobody-tells-you-91c72b53d84d)
- [Optimizing GSAP Animations in Next.js 15: Best Practices for Initialization and Cleanup - Medium](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232)
- [Simplifying React Animations with useGSAP: Automatic Cleanup and Beyond - Medium](https://medium.com/@hello.kweku/simplifying-react-animations-with-usegsap-automatic-cleanup-and-beyond-354edfec31dc)

**Framer Motion + GSAP:**
- [Why gsap but not framer-motion? - GSAP Forums](https://gsap.com/community/forums/topic/38826-why-gsap-but-not-framer-motion/)
- [GSAP vs Motion: A detailed comparison - Motion Documentation](https://motion.dev/docs/gsap-vs-motion)
- [GSAP vs. Framer Motion: A Comprehensive Comparison - Medium](https://tharakasachin98.medium.com/gsap-vs-framer-motion-a-comprehensive-comparison-0e4888113825)

**Custom Cursor Performance:**
- [How to use the CSS cursor property - LogRocket Blog](https://blog.logrocket.com/dev/cursor-css/)
- [Next Level CSS Styling for Cursors - CSS-Tricks](https://css-tricks.com/next-level-css-styling-for-cursors/)
- [How to Make a Custom Mouse Cursor with CSS and JavaScript - freeCodeCamp](https://www.freecodecamp.org/news/how-to-make-a-custom-mouse-cursor-with-css-and-javascript/)

**Accessibility (prefers-reduced-motion):**
- [ScrollTrigger.matchMedia and prefers-reduced-motion - GSAP Forums](https://gsap.com/community/forums/topic/27141-scrolltriggermatchmedia-and-prefers-reduced-motion/)
- [gsap.matchMedia() Official Documentation](https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/)
- [Conditionally enabling animations using "prefers-reduced-motion" - Medium](https://medium.com/@jonjahr/conditionally-enabling-animations-using-prefers-reduced-motion-2f15aae9eab5)

**Bundle Size & Optimization:**
- [Gsap imports tree shaking reduce bundle size? - GSAP Forums](https://gsap.com/community/forums/topic/28599-gsap-imports-tree-shaking-reduce-bundle-size/)
- [The Definitive Guide to Using GSAP in Next.js for Speed and Impact - ThinkNovus](https://www.thinknovus.com/blog/the-definitive-guide-to-using-gsap-in-next-js-for-speed-and-impact)
- [How to Reduce Next.js Bundle Size - NE Digital](https://medium.com/ne-digital/how-to-reduce-next-js-bundle-size-68f7ac70c375)

**Core Web Vitals & Layout Shift:**
- [Core Web Vitals 2026: Technical SEO That Actually Moves the Needle - ALM Corp](https://almcorp.com/blog/core-web-vitals-2026-technical-seo-guide/)
- [Cumulative Layout Shift (CLS): The Most Misunderstood Core Web Vital (2026 Guide) - Medium](https://medium.com/@sahoo.arpan7/cumulative-layout-shift-cls-guide-to-one-of-the-most-misunderstood-core-web-vitals-5f135c68cb6f)
- [Scroll Event Performance Optimization - CopyProgramming](https://copyprogramming.com/howto/scroll-events-requestanimationframe-vs-requestidlecallback-vs-passive-event-listeners)

**ScrollTrigger Pin & Spacing:**
- [ScrollTrigger pin spacing issue - GSAP Forums](https://gsap.com/community/forums/topic/25649-scrolltrigger-pin-spacing-issue/)
- [ScrollTrigger Official Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [ScrollTrigger tips & mistakes - GSAP Resources](https://gsap.com/resources/st-mistakes/)

**Hydration Issues:**
- [hydration error in Next.js 15 - GSAP Forums](https://gsap.com/community/forums/topic/43281-hydration-error-in-nextjs-15/)
- [Hydration error while using "useGsap" and "ScrollTrigger" in next.js - GSAP Forums](https://gsap.com/community/forums/topic/43202-hydration-error-while-using-usegsap-and-scrolltrigger-in-nextjs/)
- [How to Fix Hydration Errors in Next.js ? A Complete Guide - SW Habitation](https://www.swhabitation.com/blogs/how-to-fix-hydration-errors-nextjs)

**GPU Acceleration & will-change:**
- [Smoother CSS animations with the `will-change` property - Matias Kinnunen](https://mtsknn.fi/blog/css-will-change/)
- [CSS GPU Animation: Doing It Right - Smashing Magazine](https://www.smashingmagazine.com/2016/12/gpu-animation-doing-it-right/)
- [CSS GPU Acceleration: will-change & translate3d Guide - Lexo](https://www.lexo.ch/blog/2025/01/boost-css-performance-with-will-change-and-transform-translate3d-why-gpu-acceleration-matters/)

**Resize & Orientation Issues:**
- [ScrollTrigger.refresh() after orientationchange cause pin element to break - GSAP Forums](https://gsap.com/community/forums/topic/34220-scrolltriggerrefresh-after-orientationchange-cause-pin-element-to-break/)
- [We spent six days on this GSAP resize bug - sdust Blog](https://sdust.dev/posts/2024-06-24_we-spent-six-days-on-this-gsap-resize-bug)
- [enhancement: Scrolltrigger do not refresh on mobile resize - GitHub Issue #477](https://github.com/greensock/GSAP/issues/477)

---
*Pitfalls research for: OneSquad Creative Web Animation Overhaul*
*Researched: 2026-02-10*

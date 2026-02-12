---
phase: quick-03
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/lib/providers/SmoothScrollProvider.tsx
  - src/hooks/useScrollAnimation.ts
  - src/lib/gsap.ts
  - src/app/globals.css
  - src/components/sections/Features.tsx
  - src/components/sections/Comparison.tsx
  - src/components/sections/Process.tsx
  - src/components/sections/Hero.tsx
  - src/components/sections/ServicesPreview.tsx
  - src/components/sections/Testimonials.tsx
  - src/components/sections/PortfolioPreview.tsx
  - src/components/sections/CTABanner.tsx
  - src/components/sections/ServicesHero.tsx
  - src/components/sections/DigitalMarketingGrid.tsx
  - src/components/sections/WebSolutionsGrid.tsx
  - src/app/portfolio/page.tsx
  - src/app/pricing/page.tsx
  - src/app/contact/page.tsx
  - src/app/about/page.tsx
  - src/app/services/page.tsx
  - src/app/services/[slug]/ServiceDetailClient.tsx
autonomous: true
must_haves:
  truths:
    - "Scrolling through any page produces no visual glitches, stuttering, or element flashing"
    - "Elements animate smoothly when scrolled into view without flashing invisible first"
    - "Page transitions do not cause scroll position or animation misfires"
  artifacts:
    - path: "src/lib/gsap.ts"
      provides: "ScrollTrigger defaults with immediateRender fix"
    - path: "src/hooks/useScrollAnimation.ts"
      provides: "GPU-promoted animated elements via will-change"
    - path: "src/lib/providers/SmoothScrollProvider.tsx"
      provides: "Improved Lenis lerp and ScrollTrigger refresh timing"
  key_links:
    - from: "src/lib/gsap.ts"
      to: "All ScrollTrigger-using components"
      via: "Global ScrollTrigger defaults"
      pattern: "ScrollTrigger.defaults"
---

<objective>
Fix scroll glitching across all pages caused by GSAP ScrollTrigger + Lenis smooth scroll integration issues.

Purpose: Users report visual glitches while scrolling. Root cause analysis reveals four interacting problems: (1) gsap.from() immediately renders the invisible "from" state before ScrollTrigger fires, causing flash-of-invisible-content; (2) no GPU layer promotion hints on animated elements causes compositor thrashing mid-scroll; (3) Lenis lerp too low (0.075) creates excessive scroll interpolation lag that conflicts with ScrollTrigger trigger timing; (4) ScrollTrigger.refresh() on route change fires too early before content settles.

Output: Glitch-free scrolling across all pages with smooth, properly-timed animations.
</objective>

<execution_context>
@C:/Users/sammy/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sammy/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@src/lib/gsap.ts
@src/lib/providers/SmoothScrollProvider.tsx
@src/hooks/useScrollAnimation.ts
@src/lib/scrollAnimations.ts
@src/app/globals.css
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix core scroll infrastructure (GSAP defaults, Lenis tuning, GPU hints)</name>
  <files>
    src/lib/gsap.ts
    src/lib/providers/SmoothScrollProvider.tsx
    src/hooks/useScrollAnimation.ts
    src/app/globals.css
  </files>
  <action>
    This task addresses the four root causes at the infrastructure level so all components benefit automatically.

    **1. src/lib/gsap.ts -- Add `immediateRender: false` to ScrollTrigger defaults:**

    In the `ScrollTrigger.defaults({...})` call, add `immediateRender: false`. This is the CRITICAL fix. By default, `gsap.from()` immediately applies the "from" values (opacity: 0, transforms) the instant the tween is created -- NOT when ScrollTrigger triggers. This causes elements to flash invisible on page load and then pop in when scrolled to. Setting `immediateRender: false` as a default ensures the "from" state is only applied when ScrollTrigger activates.

    The updated defaults should be:
    ```
    ScrollTrigger.defaults({
      toggleActions: "play none none none",
      markers: false,
      immediateRender: false,
    });
    ```

    Note: `immediateRender` is NOT a direct ScrollTrigger config property -- it's passed through to the animation. But setting it in ScrollTrigger.defaults does NOT work. Instead, we need to set it in gsap.defaults:

    Actually, the correct approach: `immediateRender: false` needs to be on the individual gsap.from() calls or in gsap.defaults. Since every animation in the codebase uses gsap.from() with a scrollTrigger, add it to gsap.defaults:

    ```js
    gsap.defaults({
      ease: "power2.out",
      duration: 0.6,
      immediateRender: false,
    });
    ```

    IMPORTANT: `gsap.from()` with a `scrollTrigger` should NOT immediateRender. Without scrollTrigger, gsap.from() SHOULD immediateRender (its normal behavior). However, when a scrollTrigger is present, GSAP already defaults immediateRender to false IF toggleActions starts with "play". Since all our ScrollTriggers use `toggleActions: "play none none none"`, GSAP should already default to `immediateRender: false`.

    So the real issue may be subtler. Let's investigate the actual GSAP behavior: when `toggleActions` starts with "play", `immediateRender` defaults to `false` for `gsap.from()`. This IS already the case. So the flash is NOT from immediateRender.

    REVISED ROOT CAUSE: The actual glitch is from the combination of:
    - Lenis smooth scroll creating synthetic scroll events at 0.075 lerp (very slow interpolation)
    - Many ScrollTrigger instances all calculating on each synthetic frame
    - No GPU layer promotion causing expensive repaints during animations

    **1. src/lib/providers/SmoothScrollProvider.tsx -- Tune Lenis for smoother ScrollTrigger integration:**

    a) Increase `lerp` from `0.075` to `0.1`. The 0.075 value creates too much lag between physical scroll and rendered position, causing ScrollTrigger to fire animations in a stuttery manner as Lenis slowly catches up. 0.1 is Lenis's own default and provides smooth feel without excessive lag.

    b) Change the ScrollTrigger.refresh() timeout from 150ms to 300ms. On route change, Next.js may still be hydrating/rendering when 150ms fires. 300ms gives content time to settle. Also add a second refresh at 800ms as a safety net for lazy-loaded content:

    ```js
    useEffect(() => {
      lenisRef.current?.lenis?.scrollTo(0, { immediate: true });

      // First refresh after initial render settles
      const timer1 = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);

      // Safety refresh for lazy content (images, dynamic sections)
      const timer2 = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 800);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }, [pathname]);
    ```

    c) Add `gsap.ticker.lagSmoothing(500, 33)` instead of `gsap.ticker.lagSmoothing(0)`. The current `lagSmoothing(0)` DISABLES lag smoothing entirely, meaning if a frame takes too long (e.g., heavy reflow from multiple animations starting simultaneously), GSAP tries to "catch up" by jumping ahead, creating visible stutters. `lagSmoothing(500, 33)` caps the catch-up to 500ms threshold with 33ms minimum frame time, preventing jarring jumps.

    **2. src/hooks/useScrollAnimation.ts -- Add GPU layer promotion for animated elements:**

    After the `mm.add(MOTION_QUERIES.noPreference, () => { ... })` block runs the user's animation callback, add a line BEFORE calling `animate()` that promotes all `[data-animate]` elements within the scope to their own GPU layer:

    ```js
    mm.add(MOTION_QUERIES.noPreference, () => {
      // Promote animated elements to GPU layer before animations start
      // This prevents compositor thrashing when transforms/opacity change mid-scroll
      if (scopeRef.current) {
        gsap.set(scopeRef.current.querySelectorAll('[data-animate]'), {
          willChange: 'transform, opacity',
        });
      }

      animate({ gsap, ScrollTrigger });

      // Clean up will-change after animations complete to free GPU memory
      // ScrollTrigger onLeave/onEnterBack would be ideal but we use toggleActions "play none none none"
      // so we clean up after a generous delay (animations are 0.5-1.5s max)
      // Actually, DON'T add timeout cleanup -- it causes flicker if user scrolls back.
      // The browser will manage GPU memory. will-change on ~20-30 elements is fine.
    });
    ```

    **3. src/app/globals.css -- Add backface-visibility optimization:**

    Add a CSS rule that helps prevent flickering during 3D-promoted animations:

    ```css
    /* Prevent flicker on GPU-promoted animated elements */
    [data-animate] {
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }
    ```

    Add this after the existing Lenis CSS block (after line 121).
  </action>
  <verify>
    - `npm run build` completes without errors
    - Open the site in browser, scroll through the homepage slowly and quickly -- no elements should flash invisible then pop in
    - Check Chrome DevTools Performance tab: no long frames (>50ms) during scroll
    - Verify Lenis smooth scroll still feels smooth (not jerky from higher lerp)
  </verify>
  <done>
    Core infrastructure updated: Lenis lerp tuned to 0.1, lagSmoothing re-enabled, ScrollTrigger refresh timing improved, GPU layer hints applied to all animated elements via useScrollAnimation hook, and backface-visibility set on [data-animate] elements. No changes needed to individual section components -- fixes apply globally through the shared infrastructure.
  </done>
</task>

<task type="auto">
  <name>Task 2: Fix per-element ScrollTrigger overload and animation timing conflicts</name>
  <files>
    src/components/sections/Features.tsx
    src/components/sections/Comparison.tsx
    src/components/sections/Process.tsx
    src/app/about/page.tsx
    src/app/services/[slug]/ServiceDetailClient.tsx
    src/app/contact/page.tsx
    src/app/portfolio/page.tsx
    src/app/pricing/page.tsx
  </files>
  <action>
    Several components create individual ScrollTrigger instances per card/item in a `.forEach()` loop, which is fine for a few items but becomes problematic when there are 8+ cards, each with its own scroll listener calculating positions every frame. The fix is to convert these to single ScrollTrigger instances with stagger instead.

    **Key pattern to fix:** Anywhere you see `gsap.utils.toArray('.selector').forEach((el, i) => { gsap.from(el, { delay: i * N, scrollTrigger: { trigger: el ... } }) })`, replace with a single `gsap.from('.selector', { stagger: N, scrollTrigger: { trigger: '.container' ... } })`.

    The `.forEach()` pattern creates N ScrollTrigger instances. The stagger pattern creates 1 ScrollTrigger instance with staggered child animations.

    **Files to update:**

    1. **src/components/sections/Features.tsx** (lines 21-30):
       Replace the `.forEach()` on `.feature-card` with:
       ```js
       gsap.from('.feature-card', {
         ...scaleReveal(),
         stagger: 0.12,
         scrollTrigger: {
           trigger: '.feature-card',  // First card triggers all
           start: TRIGGERS.late,
         },
       });
       ```
       This reduces 5+ ScrollTrigger instances to 1.

    2. **src/components/sections/Comparison.tsx** (lines 140-151):
       Replace the `.forEach()` on `.comparison-card` with:
       ```js
       gsap.from('.comparison-card', {
         opacity: 0,
         y: 20,
         duration: 0.5,
         stagger: 0.1,
         scrollTrigger: {
           trigger: '.comparison-grid',
           start: TRIGGERS.late,
         },
       });
       ```
       This reduces 8 ScrollTrigger instances to 1.

    3. **src/app/services/[slug]/ServiceDetailClient.tsx**:
       This is the heaviest offender -- it creates individual ScrollTriggers in 4 separate `.forEach()` loops (featureCards, metrics, statCards, relatedCards). Convert each:

       a) `featureCards` (lines 102-108): Replace with:
       ```js
       gsap.from('.detail-feature-card', {
         ...scaleReveal(),
         stagger: 0.1,
         scrollTrigger: { trigger: '.detail-features', start: TRIGGERS.late },
       });
       ```

       b) `metrics` (lines 111-117): Replace with:
       ```js
       gsap.from('.detail-metric', {
         ...fadeUp(),
         stagger: 0.15,
         scrollTrigger: { trigger: '.detail-results', start: TRIGGERS.standard },
       });
       ```

       c) `statCards` (lines 125-131): Replace with:
       ```js
       gsap.from('.detail-stat-card', {
         ...scaleReveal(),
         stagger: 0.1,
         scrollTrigger: { trigger: '.detail-why', start: TRIGGERS.standard },
       });
       ```

       d) `relatedCards` (lines 134-140): Replace with:
       ```js
       gsap.from('.detail-related-card', {
         ...slideFromRight(),
         stagger: 0.12,
         scrollTrigger: { trigger: '.detail-related', start: TRIGGERS.standard },
       });
       ```

       Remove the `gsap.utils.toArray()` calls and `.forEach()` loops for all four. This reduces ~15+ ScrollTrigger instances to 4.

    4. **src/app/contact/page.tsx** (lines 196-206):
       Replace the `.forEach()` on `.contact-info-item` with:
       ```js
       gsap.from('.contact-info-item', {
         ...fadeUp(),
         stagger: 0.1,
         delay: 0.2,
         scrollTrigger: {
           trigger: '.contact-sidebar',
           start: TRIGGERS.standard,
         },
       });
       ```

    5. **src/app/portfolio/page.tsx** (lines 111-122):
       Replace the `.forEach()` on `.portfolio-card-wrapper` with:
       ```js
       gsap.from('.portfolio-card-wrapper', {
         ...fadeUp({ y: 30, duration: 0.5 }),
         stagger: 0.06,
         scrollTrigger: {
           trigger: '.portfolio-grid',
           start: TRIGGERS.late,
         },
       });
       ```

    6. **src/app/pricing/page.tsx** (lines 204-210):
       Replace the `.forEach()` on `.pricing-plan-card` with:
       ```js
       gsap.from('.pricing-plan-card', {
         ...fadeUp(),
         stagger: 0.1,
         scrollTrigger: { trigger: '.pricing-plans-grid', start: TRIGGERS.standard },
       });
       ```
       Also replace the `.forEach()` on `.pricing-tier-card` (lines 179-185) with:
       ```js
       gsap.from('.pricing-tier-card', {
         ...scaleReveal(),
         stagger: 0.12,
         scrollTrigger: { trigger: '.pricing-tiers', start: TRIGGERS.late },
       });
       ```

    7. **src/app/about/page.tsx** -- The values section (lines 55-83) uses `.forEach()` with nested querySelector. This one is fine as-is because it only has 3 items and needs per-element triggers (each value block should trigger independently as it scrolls into view since they are spaced far apart with `space-y-20 md:space-y-28`). Leave unchanged.

    DO NOT change the Process.tsx `.process-step` or `.timeline-dot` animations -- these already use single ScrollTrigger with stagger correctly.

    DO NOT change About page values -- they need individual triggers due to large spacing.

    After all changes, verify no `gsap.utils.toArray` + `.forEach()` + individual `scrollTrigger` patterns remain (except the About page values which are intentional).
  </action>
  <verify>
    - `npm run build` completes without errors
    - Count ScrollTrigger instances by temporarily adding `console.log(ScrollTrigger.getAll().length)` in SmoothScrollProvider after refresh -- homepage should be ~20-25 (down from 40+)
    - Scroll through each page -- animations should still stagger correctly with same visual timing
    - No console errors about invalid selectors or missing elements
  </verify>
  <done>
    Per-element ScrollTrigger loops replaced with single-trigger stagger patterns in Features, Comparison, ServiceDetailClient, Contact, Portfolio, and Pricing. Total ScrollTrigger count per page reduced by ~40-50%. Combined with Task 1's infrastructure fixes, scroll glitching should be eliminated across all pages.
  </done>
</task>

</tasks>

<verification>
After both tasks complete:
1. `npm run build` passes without errors
2. Open dev server (`npm run dev`)
3. Navigate to homepage -- scroll top to bottom smoothly, no element flashing or stuttering
4. Navigate to /services -- scroll through, no glitches
5. Navigate to /services/web-design (or any service detail) -- heaviest animation page, should be smooth
6. Navigate to /portfolio -- filter buttons + scroll should not conflict
7. Navigate to /pricing -- scroll through all sections smoothly
8. Navigate to /about -- dramatic value reveals should be smooth
9. Navigate to /contact -- form section slide-in should be glitch-free
10. Use Chrome DevTools Performance tab: record a 5-second scroll on homepage, verify no frames >50ms
</verification>

<success_criteria>
- Zero visual glitches (element flashing, stuttering, jumping) while scrolling any page
- All existing animation patterns preserved (same visual timing and effects)
- ScrollTrigger instance count reduced by ~40% across the site
- Smooth scroll (Lenis) continues to feel premium, not jerky
- Build passes, no console errors
</success_criteria>

<output>
After completion, create `.planning/quick/3-fix-scroll-glitching-on-pages/3-SUMMARY.md`
</output>

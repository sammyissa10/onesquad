---
phase: quick-7
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - src/lib/providers/SmoothScrollProvider.tsx
autonomous: true
must_haves:
  truths:
    - "Mobile/touch scrolling uses native browser momentum (no JS interpolation)"
    - "Desktop mousewheel scrolling retains Lenis smooth scroll"
    - "Reduced motion preference still disables all smooth scrolling"
  artifacts:
    - path: "src/lib/providers/SmoothScrollProvider.tsx"
      provides: "Lenis configuration with touch scroll disabled"
      contains: "syncTouch: false"
  key_links:
    - from: "SmoothScrollProvider.tsx"
      to: "Lenis library"
      via: "options prop on ReactLenis"
      pattern: "syncTouch:\\s*false"
---

<objective>
Fix mobile scroll jank by disabling Lenis smooth scroll interpolation on touch/mobile devices.

Purpose: Lenis `syncTouch: true` intercepts native touch scrolling and applies JS-based smooth interpolation on the main thread. Mobile browsers have optimized compositor-thread momentum scrolling — Lenis forces it onto the main thread, causing jank compounded by 82 ScrollTrigger instances. Setting `syncTouch: false` lets mobile use native scrolling while keeping desktop mousewheel smooth.

Output: Updated SmoothScrollProvider with touch-safe Lenis config.
</objective>

<execution_context>
@C:/Users/sammy/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sammy/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/lib/providers/SmoothScrollProvider.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Disable Lenis touch scroll interpolation</name>
  <files>src/lib/providers/SmoothScrollProvider.tsx</files>
  <action>
In the `lenisOptions` useMemo (the non-reduced-motion branch, ~line 69-80), make these changes:

1. Set `syncTouch: false` (was `true`) — prevents Lenis from intercepting native touch scroll events. Mobile browsers handle momentum scrolling on the compositor thread; Lenis forces it onto the main thread causing jank.

2. Remove `syncTouchLerp: 0.12` — this option only applies when syncTouch is true. With syncTouch false, it is unused.

3. Remove `touchMultiplier: 1.5` — this amplifies touch scroll delta values causing overscrolling. With syncTouch false, Lenis does not process touch events so this has no effect, but removing it avoids confusion.

4. Keep everything else unchanged:
   - `lerp: 0.12` (desktop wheel interpolation)
   - `smoothWheel: true` (desktop mousewheel smooth scroll)
   - `wheelMultiplier: 1`
   - `infinite: false`
   - `autoResize: true`
   - `orientation: "vertical"`
   - `gestureOrientation: "vertical"`

The resulting non-reduced-motion options object should be:
```ts
{
  lerp: 0.12,
  smoothWheel: true,
  syncTouch: false,
  wheelMultiplier: 1,
  infinite: false,
  autoResize: true,
  orientation: "vertical" as const,
  gestureOrientation: "vertical" as const,
}
```

Do NOT change the reduced-motion branch (it already has `syncTouch: false`).
Do NOT change the GSAP ticker sync, route change handler, or ReactLenis JSX.
  </action>
  <verify>
1. `npm run build` completes without errors
2. Grep SmoothScrollProvider.tsx for `syncTouch: false` — should appear twice (reduced-motion and normal branches)
3. Grep SmoothScrollProvider.tsx for `syncTouchLerp` — should return no matches
4. Grep SmoothScrollProvider.tsx for `touchMultiplier` — should appear only once (in the reduced-motion branch, value 1)
  </verify>
  <done>
Lenis no longer intercepts touch scroll events on mobile. Desktop mousewheel smooth scroll unchanged. The three jank-causing options (syncTouch:true, syncTouchLerp, touchMultiplier:1.5) are removed from the active scroll config.
  </done>
</task>

</tasks>

<verification>
- Build passes: `npm run build`
- SmoothScrollProvider has `syncTouch: false` in both branches
- No `syncTouchLerp` remains in the active (non-reduced-motion) config
- No `touchMultiplier: 1.5` remains
- Desktop smooth scroll config preserved (smoothWheel: true, lerp: 0.12)
</verification>

<success_criteria>
- Mobile/touch devices use native browser momentum scrolling (no Lenis JS interpolation)
- Desktop mousewheel retains Lenis smooth scroll with lerp 0.12
- Reduced motion preference still fully disables smooth scrolling
- Build compiles without errors
</success_criteria>

<output>
After completion, create `.planning/quick/7-fix-mobile-scroll-jank-disable-lenis-on-/7-SUMMARY.md`
</output>

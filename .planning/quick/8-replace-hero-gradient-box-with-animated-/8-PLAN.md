---
phase: quick-8
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/Hero.tsx
  - src/components/ui/WebsiteBuilderAnimation.tsx
autonomous: true

must_haves:
  truths:
    - "Hero section shows an animated browser window instead of static gradient box"
    - "Animation depicts a website being assembled piece by piece (nav, hero image, text, buttons)"
    - "Animation loops smoothly and continuously without jarring resets"
    - "Animation is performant (no jank, no layout thrashing)"
    - "Reduced motion preference shows a static completed website mockup instead"
  artifacts:
    - path: "src/components/ui/WebsiteBuilderAnimation.tsx"
      provides: "Animated browser chrome with website assembly sequence"
      min_lines: 80
    - path: "src/components/sections/Hero.tsx"
      provides: "Updated hero using WebsiteBuilderAnimation instead of gradient box"
  key_links:
    - from: "src/components/sections/Hero.tsx"
      to: "src/components/ui/WebsiteBuilderAnimation.tsx"
      via: "React component import"
      pattern: "import.*WebsiteBuilderAnimation"
    - from: "src/components/ui/WebsiteBuilderAnimation.tsx"
      to: "@/lib/gsap"
      via: "GSAP timeline import"
      pattern: "import.*gsap.*from.*@/lib/gsap"
---

<objective>
Replace the static coral/peach gradient "Unlock your digital potential" box in the Hero section with an animated website builder sequence inside a browser chrome frame. The animation shows a website being assembled piece by piece: nav bar slides in, hero image area fades in, text types itself, buttons pop in, footer slides up. It loops smoothly and fits the dark navy + coral/peach accent theme.

Purpose: The current gradient box is a placeholder that adds no visual interest. An animated builder sequence demonstrates what OneSquad does (builds websites) while creating visual engagement and a premium feel.

Output: New `WebsiteBuilderAnimation` component + updated Hero section.
</objective>

<execution_context>
@C:/Users/sammy/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sammy/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/components/sections/Hero.tsx
@src/hooks/useScrollAnimation.ts
@src/lib/gsap.ts
@src/lib/scrollAnimations.ts
@src/app/globals.css (lines 40-74 for theme tokens)
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create WebsiteBuilderAnimation component</name>
  <files>src/components/ui/WebsiteBuilderAnimation.tsx</files>
  <action>
Create a self-contained "use client" component that renders an animated browser chrome frame with a website being built inside it.

**Browser Chrome Frame:**
- Outer container: rounded-2xl with bg-[#0e1e36] (slightly lighter navy for depth against the navy hero), border border-white/10, overflow-hidden
- Top bar: h-8 flex items-center px-3, three dots (w-2.5 h-2.5 rounded-full) in red (#ff5f57), yellow (#febc2e), green (#28c840), plus a fake URL bar (bg-white/5 rounded-md h-4 flex-1 mx-3 with small text "onesquads.com" in white/30, text-[10px])
- Below that is the "viewport" area where the mock website lives, with bg-[#0a1628] (darker navy) and min-h-[240px] md:min-h-[300px] padding p-3 md:p-4

**Mock Website Elements (all rendered as abstract shapes, NOT real content):**
The mock website inside the browser chrome should be simplified/abstract representations:

1. **Nav bar** (class `.mock-nav`): h-6 flex justify-between items-center mb-3. Left side: rounded rectangle w-12 h-3 bg-coral/60 (logo placeholder). Right side: 3 small rounded rectangles w-6 h-2 bg-white/15 gap-2 (nav links).

2. **Hero image area** (class `.mock-hero-img`): w-full h-20 md:h-24 rounded-lg bg-gradient-to-br from-coral/20 to-peach/20 mb-3, with a small centered icon-like shape (triangle play button or abstract mountains made from divs) in white/10.

3. **Text lines** (class `.mock-text`): 3 lines of varying widths simulating text. Line 1: w-3/4 h-3 bg-white/20 rounded mb-1.5. Line 2: w-1/2 h-3 bg-white/15 rounded mb-1.5. Line 3: w-2/3 h-2 bg-white/10 rounded mb-3.

4. **Buttons** (class `.mock-buttons`): flex gap-2. Two rounded rectangles: first w-16 h-5 bg-coral/50 rounded-md, second w-16 h-5 bg-white/10 rounded-md border border-white/20.

5. **Card row** (class `.mock-cards`): flex gap-2 mt-3. Three small cards: w-1/3 h-12 md:h-16 bg-white/5 rounded-md border border-white/5.

6. **Footer** (class `.mock-footer`): h-5 mt-3 bg-white/5 rounded-sm w-full, with two small inner rectangles (w-8 h-1.5 bg-white/10).

**All mock elements start with autoAlpha: 0** (GSAP will animate them in). This is critical: use `autoAlpha` not `opacity` per project convention (Quick-06 decision).

**GSAP Timeline Animation:**
- Import `gsap` from `@/lib/gsap` (NOT from 'gsap' directly)
- Use `useRef` for the container and `useGSAP` from `@gsap/react` with scope for cleanup
- Use `gsap.matchMedia()` for reduced-motion support (same pattern as useScrollAnimation hook)
- Create a `gsap.timeline({ repeat: -1, repeatDelay: 1.5, defaults: { ease: 'power2.out' } })` for infinite loop

Timeline sequence (each step overlaps slightly via position parameter):
1. Nav slides in from top: `{ autoAlpha: 0, y: -15, duration: 0.4 }`
2. Hero image fades in with slight scale: `{ autoAlpha: 0, scale: 0.95, duration: 0.5 }` at "-=0.1"
3. Text lines stagger in: `{ autoAlpha: 0, x: -20, duration: 0.3, stagger: 0.12 }` at "-=0.15"
4. Buttons pop in: `{ autoAlpha: 0, scale: 0.8, duration: 0.3, stagger: 0.1 }` at "-=0.1"
5. Cards stagger up: `{ autoAlpha: 0, y: 15, duration: 0.35, stagger: 0.08 }` at "-=0.1"
6. Footer slides up: `{ autoAlpha: 0, y: 10, duration: 0.3 }` at "-=0.05"
7. Hold fully built state for 2.5 seconds: add a `tl.to({}, { duration: 2.5 })` as a pause
8. Everything fades out together: `tl.to('.mock-el', { autoAlpha: 0, duration: 0.4 })` (add class `.mock-el` to ALL mock elements)
9. Brief pause, then timeline repeats (the repeatDelay: 1.5 handles this)

**Reduced motion branch:**
In the reduced motion matchMedia branch, set all `.mock-el` elements to `autoAlpha: 1` immediately (show the completed website statically, no animation).

**Performance:**
- All animated properties are transform + opacity only (GPU-composited)
- No layout-triggering properties
- Timeline uses `repeat: -1` (GSAP handles memory efficiently)
- Kill timeline in cleanup via useGSAP scope

**Component props:** Accept `className?: string` to allow Hero to pass additional sizing/styling.
  </action>
  <verify>
Run `npx tsc --noEmit` to confirm no type errors. Visually confirm in browser that the animation plays by temporarily importing it anywhere, or rely on Task 2 integration.
  </verify>
  <done>
WebsiteBuilderAnimation.tsx exists, exports a React component that renders browser chrome with 6 mock website elements animated via GSAP timeline on an infinite loop. Reduced motion shows static completed state.
  </done>
</task>

<task type="auto">
  <name>Task 2: Integrate animation into Hero section</name>
  <files>src/components/sections/Hero.tsx</files>
  <action>
Replace the gradient box (lines 82-96 in Hero.tsx) with the new WebsiteBuilderAnimation component.

1. Add import: `import { WebsiteBuilderAnimation } from "@/components/ui/WebsiteBuilderAnimation";`

2. Replace the entire div block from line 82-96 (the `hero-block bg-gradient-to-br from-coral to-peach` div) with:

```tsx
{/* Right: Animated Website Builder */}
<div
  className="hero-block"
  data-cursor="card"
  data-animate
>
  <WebsiteBuilderAnimation />
</div>
```

Remove the `min-h-[280px] md:min-h-[340px]` constraint — the browser chrome component handles its own sizing. Keep `hero-block` class (for existing GSAP stagger animation that reveals it on scroll), `data-cursor="card"` (for cursor interaction), and `data-animate` (for reduced-motion fallback).

Do NOT change anything else in Hero.tsx — the headline, stats, scroll animation hook, and other grid blocks remain exactly as they are.

3. Verify the existing `hero-block` GSAP scroll animation (lines 23-33) still works. The stagger animation targets `.hero-block` elements, and since we kept that class, the WebsiteBuilderAnimation container will still get the entrance animation. The internal GSAP timeline in WebsiteBuilderAnimation runs independently (its own scope) — no conflict with the parent's scroll animation.
  </action>
  <verify>
Run `npx tsc --noEmit` to confirm no type errors. Run `npm run build` to confirm production build succeeds. Then start dev server with `npm run dev` and visit http://localhost:3000 — the hero section right column should show a browser chrome frame with website elements animating in sequence on a loop.
  </verify>
  <done>
Hero section displays animated browser chrome instead of static gradient box. The animation loops continuously, fits the dark navy theme with coral/peach accents, and the existing hero scroll entrance animation still works. Build passes with no errors.
  </done>
</task>

</tasks>

<verification>
1. `npx tsc --noEmit` passes with no errors
2. `npm run build` completes successfully
3. Browser at http://localhost:3000 shows animated website builder in hero right column
4. Animation loops smoothly without visible reset jank
5. Browser chrome frame has proper dots (red/yellow/green), URL bar, and dark viewport
6. Mock website elements appear sequentially: nav, image, text, buttons, cards, footer
7. After showing completed state for ~2.5s, elements fade out and sequence restarts
8. With `prefers-reduced-motion: reduce` enabled, shows static completed website (no animation)
9. Existing hero headline fade-up and hero-block stagger animations still work on scroll
</verification>

<success_criteria>
- Static gradient box is completely replaced with animated browser chrome
- Animation sequence is smooth, looping, and performant (no jank)
- Fits dark navy + coral/peach brand aesthetic
- Reduced motion accessible (static fallback)
- No TypeScript errors, production build passes
</success_criteria>

<output>
After completion, create `.planning/quick/8-replace-hero-gradient-box-with-animated-/8-SUMMARY.md`
</output>

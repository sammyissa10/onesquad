---
phase: quick-04
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/Comparison.tsx
autonomous: true
must_haves:
  truths:
    - "With/Without OneSquad comparison section is fully visible on scroll"
    - "Left column (Without) slides in from left with cards appearing sequentially"
    - "Right column (With) slides in from right with cards appearing sequentially"
    - "Center divider line fills from top to bottom as user scrolls (scrub animation)"
    - "All 8 comparison cards show their icons, titles, and descriptions"
  artifacts:
    - path: "src/components/sections/Comparison.tsx"
      provides: "Fixed comparison section with working animations and visible content"
      contains: "comparison-divider-fill"
  key_links:
    - from: "Comparison.tsx useScrollAnimation"
      to: "GSAP ScrollTrigger"
      via: "gsap.from with scrollTrigger config"
      pattern: "gsap\\.from.*comparison"
---

<objective>
Fix the With/Without OneSquad comparison section where animations and content are broken.

Purpose: The comparison section on the homepage is not displaying content or animating correctly — users cannot see the with/without comparison at all.

Output: A working Comparison component where both columns slide in, cards animate in sequence within each column, and the center divider fills with a scroll-scrub animation.
</objective>

<execution_context>
@C:/Users/sammy/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sammy/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@src/components/sections/Comparison.tsx
@src/hooks/useScrollAnimation.ts
@src/lib/scrollAnimations.ts
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix competing animations, divider height, and stagger ordering in Comparison</name>
  <files>src/components/sections/Comparison.tsx</files>
  <action>
Three bugs must be fixed in the Comparison component:

**Bug 1: Conflicting GSAP from() tweens on overlapping elements**

The column-level animations (`.comparison-left` slideFromLeft with opacity:0, `.comparison-right` slideFromRight with opacity:0) set parent containers to opacity:0. Then the card-level animations (`.comparison-card` with opacity:0) set individual cards to opacity:0 as well. These compete — when a card animates to opacity:1, the parent column may still be at opacity:0 (or the reverse), causing content to remain invisible.

Fix: Remove the separate `.comparison-card` stagger animation entirely. Instead, animate the cards AS PART OF the column animations. Use two separate card selectors to target cards within each column independently:

```js
// Left column: slide from left
gsap.from('.comparison-left', {
  ...slideFromLeft(),
  scrollTrigger: {
    trigger: '.comparison-grid',
    start: TRIGGERS.standard,
  },
});

// Left column cards: fade up within left column
gsap.from('.comparison-left .comparison-card', {
  y: 20,
  duration: 0.5,
  stagger: 0.1,
  scrollTrigger: {
    trigger: '.comparison-grid',
    start: TRIGGERS.late,
  },
});

// Right column: slide from right with delay
gsap.from('.comparison-right', {
  ...slideFromRight({ delay: 0.2 }),
  scrollTrigger: {
    trigger: '.comparison-grid',
    start: TRIGGERS.standard,
  },
});

// Right column cards: fade up within right column
gsap.from('.comparison-right .comparison-card', {
  y: 20,
  duration: 0.5,
  stagger: 0.1,
  scrollTrigger: {
    trigger: '.comparison-grid',
    start: TRIGGERS.late,
  },
});
```

CRITICAL: Do NOT set `opacity: 0` on the individual card animations since the parent column animation already handles opacity. Only animate `y: 20` on cards for the stagger reveal within each column. This avoids the double-opacity conflict.

**Bug 2: Center divider collapses to 0 height**

The divider structure is:
```html
<div class="hidden lg:flex flex-col items-center py-8">
  <div class="w-px h-full bg-gradient-to-b ...relative">
    <div class="comparison-divider-fill absolute top-0 left-0 w-full ..."/>
  </div>
</div>
```

The `h-full` on the inner `w-px` div resolves to 0 because its flex-column parent has no explicit height (height is `auto` from padding only). The absolute-positioned fill overlay also gets 0 height.

Fix: Add `self-stretch` (align-self: stretch) to the outer divider container div so it stretches to match the grid row height, and replace `h-full` with explicit height. Specifically:

- On the outer divider div: keep `hidden lg:flex flex-col items-center` but remove `py-8` and add `self-stretch py-8`
- On the inner `w-px` div: change `h-full` to `flex-1` so it fills the available flex space
- On the `comparison-divider-fill` div: add `h-full` (it's absolute, so it inherits from the now-properly-sized relative parent)

The corrected divider HTML should be:
```jsx
<div className="hidden lg:flex flex-col items-center self-stretch py-8">
  <div className="w-px flex-1 bg-gradient-to-b from-red-200 via-border to-emerald-200 relative">
    <div
      className="comparison-divider-fill absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-400 via-emerald-400 to-emerald-500"
    />
  </div>
</div>
```

Note: The grid parent uses `items-start`, which prevents the divider from stretching. Change the grid to NOT use `items-start` — instead remove it so it defaults to `items-stretch`, OR use `items-stretch`. Since the columns have `space-y-4` and will size themselves naturally, removing `items-start` lets the center divider column stretch to match the tallest column.

So on the `.comparison-grid` div, change:
```
grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-6 items-start
```
to:
```
grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-6
```
(removing `items-start` — CSS Grid defaults to `stretch` which is what we want for the divider)

**Bug 3 is resolved by Bug 1 fix** — Cards within each column now stagger independently using scoped selectors (`.comparison-left .comparison-card` and `.comparison-right .comparison-card`), so left and right columns have parallel stagger timing rather than one flat sequential stagger across all 8 cards.

Keep the header scale-in animation and the divider scrub animation exactly as they are (those are fine).
  </action>
  <verify>
Run `npm run build` and confirm no TypeScript or build errors. Then visually confirm the section renders by checking that the component structure is correct — the grid should have no `items-start`, the divider should use `flex-1` instead of `h-full`, and the card animations should NOT include `opacity: 0` (only `y: 20`).
  </verify>
  <done>
- Comparison section content (all 8 cards with icons, titles, descriptions) is visible on scroll
- Left column slides in from the left, right column slides from the right
- Cards within each column stagger-animate independently (not as one flat list)
- Center divider fills from top to bottom with scrub:1 scroll-linked animation
- No competing opacity:0 tweens on parent and child elements
- Build passes with zero errors
  </done>
</task>

</tasks>

<verification>
- `npm run build` passes without errors
- Visual inspection: scroll to comparison section on homepage, both columns visible with card content
- Center divider visible on desktop and fills as user scrolls through section
- Animation timing: left cards and right cards stagger independently
</verification>

<success_criteria>
The With/Without OneSquad comparison section displays all content (8 cards with icons, titles, descriptions across two columns), animates both columns sliding in from opposite sides, staggers cards within each column independently, and shows the center divider filling with a scroll-scrub animation. Build passes cleanly.
</success_criteria>

<output>
After completion, create `.planning/quick/4-fix-with-without-onesquad-comparison-ani/4-SUMMARY.md`
</output>

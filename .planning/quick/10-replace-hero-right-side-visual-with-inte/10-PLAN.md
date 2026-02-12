---
phase: quick-10
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/ui/ResultsDashboardAnimation.tsx
  - src/components/sections/Hero.tsx
autonomous: true

must_haves:
  truths:
    - "Hero right side shows an animated results dashboard instead of static gradient blob"
    - "Dashboard displays animated metrics: traffic graph, conversion rate, revenue counter"
    - "Animation loops on GSAP timeline, pauses when offscreen, respects reduced motion"
    - "Visual communicates growth/results value proposition, not generic tagline"
  artifacts:
    - path: "src/components/ui/ResultsDashboardAnimation.tsx"
      provides: "Animated results dashboard component"
      min_lines: 120
    - path: "src/components/sections/Hero.tsx"
      provides: "Hero section using ResultsDashboardAnimation"
      contains: "ResultsDashboardAnimation"
  key_links:
    - from: "src/components/sections/Hero.tsx"
      to: "src/components/ui/ResultsDashboardAnimation.tsx"
      via: "import and render"
      pattern: "import.*ResultsDashboardAnimation"
    - from: "src/components/ui/ResultsDashboardAnimation.tsx"
      to: "@/lib/gsap"
      via: "GSAP timeline animation"
      pattern: "import.*gsap.*from.*@/lib/gsap"
---

<objective>
Replace the hero section's static coral gradient blob with an animated "results dashboard" that communicates the VALUE of hiring OneSquad -- animated metrics showing traffic climbing, conversions increasing, and revenue growing. Rewrite the existing WebsiteBuilderAnimation.tsx into a new ResultsDashboardAnimation component and swap it into Hero.tsx.

Purpose: The current hero right side is a static gradient box with tagline text ("Unlock your digital potential"). It says nothing about what clients GET from OneSquad. An animated results dashboard showing climbing graphs, ticking counters, and growth notifications communicates outcomes (results, growth, leads) rather than vague promises.

Output: New `ResultsDashboardAnimation` component + updated Hero section.
</objective>

<execution_context>
@C:/Users/sammy/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sammy/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/components/sections/Hero.tsx
@src/components/ui/WebsiteBuilderAnimation.tsx
@src/lib/gsap.ts
@src/hooks/useScrollAnimation.ts
@src/lib/scrollAnimations.ts
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create ResultsDashboardAnimation component</name>
  <files>src/components/ui/ResultsDashboardAnimation.tsx</files>
  <action>
Create a new file `src/components/ui/ResultsDashboardAnimation.tsx` that renders an animated mini results dashboard inside a browser-chrome frame. Follow the same architectural patterns as the existing WebsiteBuilderAnimation.tsx (useRef + useGSAP + gsap.matchMedia + ScrollTrigger viewport-awareness + reduced motion branch).

**Component structure (all CSS via Tailwind, all divs -- NO SVG, NO canvas):**

1. **Browser chrome frame** -- reuse the same pattern from WebsiteBuilderAnimation:
   - Rounded container with `bg-[#0e1e36] border border-white/10 rounded-2xl overflow-hidden`
   - Top bar with traffic light dots (red/yellow/green) and fake URL bar showing "analytics.onesquads.com"

2. **Dashboard content area** (`bg-[#0a1628] p-3 md:p-4`) containing:

   a. **Header row** (class `dash-header dash-el`): A small "Dashboard" title (text-white/60 text-xs) with a green dot + "Live" indicator on the right.

   b. **Three metric cards in a row** (class `dash-metric dash-el`, flex gap-2):
      - Card 1: "Website Traffic" label, large number "12,847" (class `dash-counter-traffic`), small green "+142% vs last month" text
      - Card 2: "Conversions" label, large number "3.2%" then animated to "8.7%" (class `dash-counter-conv`), small green arrow
      - Card 3: "Revenue" label, large number "$24,500" (class `dash-counter-rev`), small green "+$8.2k this week" text
      - Each card: `bg-white/5 rounded-lg p-2.5 flex-1 border border-white/5`
      - Numbers in `text-white font-bold text-sm md:text-base`, labels in `text-white/40 text-[10px] uppercase tracking-wider`
      - Green accent text in `text-emerald-400 text-[10px]`

   c. **Traffic graph area** (class `dash-graph dash-el`):
      - Container: `bg-white/5 rounded-lg p-3 border border-white/5`
      - Title: "Traffic Overview" in `text-white/50 text-[10px] mb-2`
      - Graph: 7 vertical bars in a row (class `dash-bar`), each a `div` with varying heights representing days of the week. Use `bg-coral/60` for bars, with the last 2 bars taller (showing growth trend). Bars sit in a flex container with `items-end gap-1.5 h-16 md:h-20`.
      - Bar heights (approximate): 30%, 45%, 35%, 55%, 50%, 70%, 85% of container height
      - Below bars: tiny day labels (M T W T F S S) in `text-white/20 text-[8px]`

   d. **Notification toast** (class `dash-toast dash-el`):
      - Positioned at bottom of dashboard area
      - Small pill: `bg-emerald-500/20 border border-emerald-500/30 rounded-lg px-3 py-1.5 flex items-center gap-2`
      - Green dot (w-1.5 h-1.5 rounded-full bg-emerald-400) + text "New lead captured!" in `text-emerald-300 text-[11px] font-medium`

**GSAP animation timeline** (inside useGSAP with gsap.matchMedia):

Use `MOTION_QUERIES.noPreference` branch for animation, `MOTION_QUERIES.reduced` branch shows static completed state.

Timeline config: `{ repeat: -1, repeatDelay: 2, defaults: { ease: "power2.out" } }`

Animation sequence:
1. Dashboard header fades in: `.dash-header` from `{ autoAlpha: 0, y: -10, duration: 0.3 }`
2. Metric cards stagger in: `.dash-metric` from `{ autoAlpha: 0, y: 15, duration: 0.35, stagger: 0.12 }` overlap `-=0.1`
3. Counter numbers animate up using a GSAP `.to()` on a proxy object with `snap` and `onUpdate` to write innerHTML:
   - Traffic: 0 -> 12847, format with commas, duration 1.2s, ease "power1.out"
   - Conversions: 0 -> 8.7, format as "X.X%", duration 1.0s
   - Revenue: 0 -> 24500, format as "$XX,XXX", duration 1.2s
   - These three run simultaneously, overlapping with step 2 by `-=0.1`
4. Graph bars grow from 0 height: `.dash-bar` from `{ scaleY: 0, transformOrigin: "bottom", duration: 0.4, stagger: 0.06 }` overlap `-=0.6`
5. Toast notification slides in: `.dash-toast` from `{ autoAlpha: 0, y: 10, duration: 0.3 }` after bars finish, delay 0.3
6. Hold for 3 seconds: `tl.to({}, { duration: 3 })`
7. Everything fades out: `.dash-el` to `{ autoAlpha: 0, duration: 0.4 }`

**Counter animation approach:** Create a helper function inside the useGSAP callback:
```
function animateCounter(selector: string, target: number, format: (n: number) => string, duration: number) {
  const el = containerRef.current?.querySelector(selector);
  if (!el) return;
  const obj = { val: 0 };
  tl.to(obj, {
    val: target,
    duration,
    ease: "power1.out",
    snap: { val: target > 100 ? 1 : 0.1 },
    onUpdate: () => { el.textContent = format(obj.val); },
  }, "<");
}
```

**Viewport awareness** (same pattern as WebsiteBuilderAnimation):
```
ScrollTrigger.create({
  trigger: containerRef.current,
  start: 'top bottom',
  end: 'bottom top',
  onEnter: () => tl.play(),
  onLeave: () => tl.pause(),
  onEnterBack: () => tl.play(),
  onLeaveBack: () => tl.pause(),
});
```

**Reduced motion branch:** `gsap.set(".dash-el", { autoAlpha: 1 })` and set counter text to final values directly.

**Important conventions:**
- Import gsap, ScrollTrigger, MOTION_QUERIES from `@/lib/gsap` (NOT from 'gsap' directly)
- Import useGSAP from `@gsap/react`
- Use `autoAlpha` not `opacity` for visibility animations
- Use `useRef` for container, pass as scope to useGSAP
- Accept `className?: string` prop, apply to outer wrapper
- Export as named export: `export function ResultsDashboardAnimation`
  </action>
  <verify>
- `npx tsc --noEmit` passes with no errors in the new file
- File exists at src/components/ui/ResultsDashboardAnimation.tsx
- File imports from @/lib/gsap (not 'gsap')
- File uses autoAlpha (not raw opacity)
- File contains ScrollTrigger.create for viewport awareness
- File contains gsap.matchMedia with both motion branches
  </verify>
  <done>ResultsDashboardAnimation.tsx exists, exports a named function component, renders browser-chrome frame with animated dashboard metrics (traffic graph bars, counter numbers, notification toast) via GSAP timeline that loops infinitely, pauses offscreen, and falls back to static state on reduced motion.</done>
</task>

<task type="auto">
  <name>Task 2: Integrate ResultsDashboardAnimation into Hero and clean up old component</name>
  <files>
    src/components/sections/Hero.tsx
    src/components/ui/WebsiteBuilderAnimation.tsx
  </files>
  <action>
**Update Hero.tsx:**

1. Add import at top: `import { ResultsDashboardAnimation } from "@/components/ui/ResultsDashboardAnimation";`
2. Remove the `siteConfig` import if no longer used (it was only used in the gradient blob tagline -- check if `siteConfig` is used elsewhere in Hero.tsx; it is NOT used anywhere else, so remove it from the import line).
3. Replace lines 82-96 (the gradient blob div) with:
```tsx
{/* Right: Animated Results Dashboard */}
<div
  className="hero-block"
  data-cursor="card"
  data-animate
>
  <ResultsDashboardAnimation />
</div>
```

Keep the `hero-block` class so the existing GSAP stagger entrance animation (lines 23-33) still targets it. Do NOT add min-height constraints -- let the dashboard component size itself naturally within the grid.

4. Verify the stats row below (lines 99-152) is untouched.

**Delete WebsiteBuilderAnimation.tsx:**

The old component (src/components/ui/WebsiteBuilderAnimation.tsx) is no longer used anywhere. It was reverted out of Hero.tsx in commit 6f5bc75 and is now dead code. Delete this file since the new ResultsDashboardAnimation replaces it entirely.

Confirm no other file imports WebsiteBuilderAnimation before deleting. (It is only referenced in planning docs, not in any src/ file.)
  </action>
  <verify>
- `npx tsc --noEmit` passes (no broken imports)
- `npm run build` succeeds
- Hero.tsx imports ResultsDashboardAnimation (not WebsiteBuilderAnimation)
- Hero.tsx no longer contains "bg-gradient-to-br from-coral to-peach" gradient blob
- Hero.tsx no longer imports siteConfig (unless used elsewhere -- verify)
- WebsiteBuilderAnimation.tsx is deleted
- No src/ file imports WebsiteBuilderAnimation
  </verify>
  <done>Hero section renders the new ResultsDashboardAnimation in place of the static gradient blob. Old WebsiteBuilderAnimation.tsx is deleted. Build passes clean. The hero now communicates growth results instead of a static tagline.</done>
</task>

</tasks>

<verification>
1. `npm run build` completes with no errors
2. Visit localhost:3000 -- hero right side shows animated dashboard with browser chrome frame, not gradient blob
3. Dashboard metrics animate in sequence: header, metric cards, counters tick up, graph bars grow, toast slides in
4. After animation completes, holds for 3 seconds, fades out, repeats
5. Scroll down past hero, then scroll back -- animation resumes (viewport awareness working)
6. No new scroll jank introduced (dashboard uses single GSAP timeline, pauses offscreen)
7. Check with browser devtools "prefers-reduced-motion: reduce" -- should show static completed state
</verification>

<success_criteria>
- Hero right side displays animated results dashboard instead of static gradient blob
- Dashboard shows: traffic graph with growing bars, counter numbers (12,847 visitors / 8.7% conversions / $24,500 revenue), "New lead captured!" toast notification
- Animation loops infinitely with smooth transitions
- Animation pauses when scrolled offscreen (ScrollTrigger viewport awareness)
- Reduced motion users see static completed dashboard state
- Build passes with no TypeScript errors
- Old WebsiteBuilderAnimation.tsx is removed (no dead code)
</success_criteria>

<output>
After completion, create `.planning/quick/10-replace-hero-right-side-visual-with-inte/10-SUMMARY.md`
</output>

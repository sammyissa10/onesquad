---
phase: quick-17
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/Comparison.tsx
  - src/components/sections/Testimonials.tsx
  - src/components/ui/ResultsDashboardAnimation.tsx
autonomous: true
must_haves:
  truths:
    - "User can drag a vertical divider to reveal more/less of Without vs With content"
    - "Dragging works on both mouse and touch devices via pointer events"
    - "Testimonials auto-rotate every 5s on desktop with crossfade"
    - "Hovering testimonial carousel pauses auto-rotation"
    - "Navigation dots allow jumping to specific testimonials"
    - "Mobile shows all 3 testimonials stacked vertically (no carousel)"
    - "Hero dashboard URL bar accepts text input and updates browser header"
    - "First keystroke in dashboard triggers counter animations with randomized values"
    - "Dashboard falls back to auto-animation loop after 5s of no interaction"
  artifacts:
    - path: "src/components/sections/Comparison.tsx"
      provides: "Before/after draggable slider with clip-path reveal"
      contains: "pointerdown"
    - path: "src/components/sections/Testimonials.tsx"
      provides: "Auto-rotating testimonial carousel with dots"
      contains: "matchMedia"
    - path: "src/components/ui/ResultsDashboardAnimation.tsx"
      provides: "Interactive dashboard with URL input and personalized counters"
      contains: "input"
  key_links:
    - from: "src/components/sections/Comparison.tsx"
      to: "@/lib/gsap"
      via: "import gsap from @/lib/gsap"
      pattern: "from ['\"]@/lib/gsap['\"]"
    - from: "src/components/sections/Testimonials.tsx"
      to: "@/lib/gsap"
      via: "GSAP matchMedia for responsive carousel"
      pattern: "gsap\\.matchMedia"
    - from: "src/components/ui/ResultsDashboardAnimation.tsx"
      to: "@/lib/gsap"
      via: "GSAP timeline for counters and toast"
      pattern: "gsap\\.timeline"
---

<objective>
Add three interactive wow-factor features: a draggable before/after slider for the Comparison section, an auto-rotating testimonial carousel, and personalized hero dashboard with URL input.

Purpose: Transform static content sections into interactive, engaging experiences that demonstrate OneSquad's capabilities through the website itself.
Output: Three enhanced components with pointer-event interactivity, GSAP-driven animations, and responsive behavior.
</objective>

<execution_context>
@C:/Users/sammy/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sammy/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@src/components/sections/Comparison.tsx
@src/components/sections/Testimonials.tsx
@src/components/ui/ResultsDashboardAnimation.tsx
@src/lib/gsap.ts
@src/lib/scrollAnimations.ts
@src/hooks/useScrollAnimation.ts
@src/lib/constants.ts
</context>

<tasks>

<task type="auto">
  <name>Task 1: Comparison before/after draggable slider</name>
  <files>src/components/sections/Comparison.tsx</files>
  <action>
Replace the current stacked Without/With layout with a side-by-side draggable before/after slider.

**Layout structure:**
- Keep the existing section header (h2 "What Changes When You Stop Doing It Alone" + subtitle) and the comparison-divider scrub animation from quick-14 ABOVE the slider
- Below the divider, create a new slider container (max-w-5xl mx-auto, relative, aspect ratio ~16:10 or min-h-[400px] md:min-h-[500px])
- Left side: "Without OneSquad" panel (full width, absolute positioned) with red-tinted overlay (bg-red-950/80 or bg-gradient-to-r from-red-950/90 to-red-900/70)
- Right side: "With OneSquad" panel (full width, absolute positioned) with coral/emerald tint (bg-gradient-to-r from-[#0e1e36] to-emerald-950/40)
- Each panel contains its 4 items stacked vertically with icon + title + description
- Use CSS clip-path on the right panel: `clip-path: inset(0 0 0 ${sliderPosition}%)` to reveal/hide based on slider position
- The left panel is always fully visible behind the right panel

**Draggable divider:**
- Absolute positioned vertical line at `left: ${sliderPosition}%` with coral color (bg-coral, w-[3px])
- Circular coral handle in center of the line (w-10 h-10 rounded-full bg-coral) with left/right arrows icon (use ChevronLeft + ChevronRight from lucide at small size, or a simple "< >" text)
- Handle has shadow-lg shadow-coral/30 for glow effect
- cursor-grab on idle, cursor-grabbing while dragging

**Pointer event handling (vanilla, NOT GSAP Draggable):**
- Use useRef for slider container, useCallback for handlers
- Track isDragging via useRef (not state, to avoid re-renders during drag)
- onPointerDown on the handle: set isDragging true, setPointerCapture on the handle element
- onPointerMove on the container: if isDragging, calculate new position as percentage of container width from pointer clientX minus container left offset, clamp between 5-95%
- onPointerUp: set isDragging false, releasePointerCapture
- Store slider position in useState (initial 50) - only update state on move (causes re-render for clip-path)
- Add touch-action: none to the handle to prevent scroll interference on mobile
- Add select-none (user-select: none) to container during drag

**Labels:**
- "Without OneSquad" label with X icon on the left side (absolute, top-4 left-4)
- "With OneSquad" label with Check icon on the right side (absolute, top-4 right-4)
- Labels should have a small bg-black/50 backdrop-blur-sm pill for readability

**Scroll animation:**
- Keep using useScrollAnimation hook for the section
- Animate the slider container in with scaleReveal on scroll (the slider itself appears with a subtle scale-up)
- Keep existing comparison-header and divider-line animations as-is

**Reduced motion:**
- The draggable interaction is user-initiated, so it works fine with reduced motion
- The scroll-triggered entrance animation is already handled by useScrollAnimation's reduced motion branch

**Mobile:**
- On mobile (below md breakpoint), the slider still works but starts at 50% split
- Items text should be text-sm on mobile for fit
- Handle is still usable with touch via pointer events
  </action>
  <verify>
Run `npm run build` to confirm no TypeScript/build errors. Visually verify in dev that:
1. Slider renders at 50/50 split with red-tinted left and coral/green-tinted right
2. Dragging the coral handle slides the divider smoothly
3. Left items show without-us pain points, right shows with-us benefits
4. Section header and divider scrub animation remain above the slider
5. Touch dragging works on mobile viewport
  </verify>
  <done>
Comparison section has a functional before/after draggable slider with pointer events, clip-path reveal, coral handle with glow, and maintains existing scroll-triggered entrance animations. Works on both mouse and touch.
  </done>
</task>

<task type="auto">
  <name>Task 2: Testimonial auto-carousel with crossfade</name>
  <files>src/components/sections/Testimonials.tsx</files>
  <action>
Convert the 3-column grid into a responsive auto-rotating carousel on desktop, keeping stacked layout on mobile.

**Desktop carousel (md and above):**
- Use gsap.matchMedia via the useScrollAnimation hook to only create carousel behavior on desktop
- Show 1 testimonial at a time, centered, max-w-2xl mx-auto
- Each testimonial card: glassmorphism treatment (bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12)
- Layout within card (top to bottom):
  1. Stat badge large and prominent (text-2xl font-bold text-coral mb-2, e.g., "3x Traffic Growth")
  2. Star rating row
  3. Quote in larger italic text (text-lg md:text-xl italic text-white/80 leading-relaxed)
  4. Author info (name, role, company) with border-t separator

**Auto-rotation logic:**
- Use useRef to track: currentIndex (number), intervalRef (NodeJS.Timeout), isHovered (boolean)
- Use useState for activeIndex to trigger re-renders for dot highlighting
- Create a `goToSlide(index)` function using GSAP contextSafe:
  - gsap.to on current card: autoAlpha: 0, duration: 0.4
  - gsap.fromTo on next card: autoAlpha 0->1, y: 10->0, duration: 0.5, delay: 0.1
  - Update activeIndex state and currentIndex ref
- On mount (inside matchMedia desktop branch): start setInterval every 5000ms calling goToSlide((current + 1) % 3)
- Store interval in intervalRef for cleanup

**Hover pause:**
- onPointerEnter on the carousel container: clearInterval(intervalRef.current), set isHovered ref true
- onPointerLeave: restart interval, set isHovered ref false

**Navigation dots:**
- 3 dots below the card (flex gap-2 justify-center mt-8)
- Each dot: w-2.5 h-2.5 rounded-full transition-all duration-300
- Active dot: bg-coral scale-125
- Inactive dot: bg-white/30 hover:bg-white/50
- onClick: clearInterval, goToSlide(clickedIndex), restart interval

**Render all 3 cards in DOM** but only show active one:
- All cards absolute positioned within a relative container
- Initial state: first card autoAlpha 1, others autoAlpha 0
- Set initial autoAlpha values in the matchMedia setup via gsap.set

**Mobile layout (below md):**
- In the reduced/mobile matchMedia branch OR simply via CSS, show all 3 cards stacked vertically in a grid (existing layout)
- Use Tailwind responsive classes: on mobile show grid grid-cols-1 gap-6, on desktop show the carousel container
- Simplest approach: render BOTH layouts, hide carousel on mobile (hidden md:block) and hide grid on desktop (md:hidden)

**Scroll animation:**
- Keep the testimonials-heading fadeUp animation
- For desktop carousel: animate the carousel container with fadeUp on scroll
- For mobile grid: keep existing stagger animation on testimonial-card elements

**Important conventions:**
- Import gsap from @/lib/gsap (NOT 'gsap')
- Use autoAlpha not opacity for GSAP visibility animations
- The testimonials data comes from @/lib/constants (already imported)
- The statBadges record is already defined in the file - reuse it
  </action>
  <verify>
Run `npm run build` to confirm no TypeScript/build errors. Visually verify:
1. Desktop: single large testimonial card visible, auto-rotates every 5s with crossfade
2. Dots at bottom highlight active testimonial, clicking jumps to that testimonial
3. Hovering pauses rotation, leaving resumes it
4. Mobile: all 3 cards stacked vertically (no carousel)
5. Stat badge displayed prominently above quote text
  </verify>
  <done>
Testimonials section shows an auto-rotating carousel on desktop with GSAP crossfade, navigation dots, hover-pause, and falls back to stacked grid on mobile. Uses autoAlpha and gsap.matchMedia per project conventions.
  </done>
</task>

<task type="auto">
  <name>Task 3: Hero dashboard personalization with URL input</name>
  <files>src/components/ui/ResultsDashboardAnimation.tsx</files>
  <action>
Enhance the Results Dashboard with an interactive URL input that personalizes the dashboard experience.

**URL bar input replacement:**
- Replace the existing fake URL bar span (`analytics.onesquads.com`) with an actual text input element
- Style the input to look like a browser URL bar: bg-transparent, text-[10px] text-white/60, placeholder text "yourcompany.com", w-full, outline-none, border-none
- The input container keeps the existing styling (flex-1 mx-3 h-4 bg-white/5 rounded-md flex items-center px-2)
- Add a small search/globe icon before the input (use a simple svg or text character) for browser URL bar feel

**Personalization on keystroke:**
- Use useState for the input value (urlInput)
- Use useRef to track hasInteracted (boolean, prevents re-triggering)
- On the FIRST onChange event (hasInteracted is false):
  - Set hasInteracted.current = true
  - Kill the existing auto-animation timeline (store timeline ref, call tl.kill())
  - Set all dash-el elements to autoAlpha: 1 immediately (gsap.set)
  - Trigger counter animations with SLIGHTLY RANDOMIZED end values:
    - Traffic: random between 8000-18000 (Math.floor(Math.random() * 10000) + 8000)
    - Conversions: random between 4.0-12.0 (toFixed(1))
    - Revenue: random between 15000-45000
  - Use gsap.to for each counter with duration 1.2s, same format functions as existing
  - Animate bars to grow from 0 (gsap.from with scaleY: 0, stagger: 0.06)
  - After counters finish (~1.5s), show toast: gsap.from('.dash-toast', { autoAlpha: 0, y: 10, duration: 0.3 })
  - Update toast text to "New lead captured from Google!" (already close to existing text, make sure it says this)

**Browser header updates:**
- As user types, the URL bar shows their text naturally (controlled input with useState)
- The "Dashboard" header text could optionally update to show "{input} Dashboard" if input is non-empty, using a span (keep it subtle, text-xs)

**5-second fallback:**
- Use useRef for a fallback timeout
- On component mount (inside useGSAP), set a 5-second setTimeout
- If hasInteracted is still false after 5s, start the existing auto-animation timeline
- If user interacts before 5s, clearTimeout the fallback
- The existing auto-animation code stays as the fallback — just wrap timeline creation in a function that can be called by either the timeout or as default

**Restructure the animation code:**
- Extract the timeline creation into a function `createAutoTimeline()` inside the useGSAP callback
- On mount: set 5s timeout that calls createAutoTimeline() if no interaction
- Store timeline reference in a useRef so it can be killed on interaction
- The interaction-triggered animation is separate from the auto-timeline

**Important conventions:**
- Import gsap from @/lib/gsap (NOT 'gsap')
- Use autoAlpha not opacity
- Use MOTION_QUERIES for reduced motion (existing pattern)
- Keep the ScrollTrigger viewport pause/play for the auto-timeline
- Keep the reduced motion branch showing static final values

**Input accessibility:**
- Add aria-label="Enter your website URL" to the input
- Input type="text" (not url, to avoid validation friction)
  </action>
  <verify>
Run `npm run build` to confirm no TypeScript/build errors. Visually verify:
1. Dashboard shows input field where URL bar was, with "yourcompany.com" placeholder
2. Typing in the input triggers counter animations with randomized values on first keystroke
3. Toast shows "New lead captured from Google!" after counters finish
4. If no typing within 5 seconds, existing auto-animation loop plays
5. Reduced motion still shows static completed state
  </verify>
  <done>
Hero dashboard has interactive URL input that personalizes the experience on first keystroke, triggering randomized counter animations and a lead-capture toast. Falls back to auto-animation loop after 5s of no interaction.
  </done>
</task>

</tasks>

<verification>
- `npm run build` passes with zero errors
- All three components render correctly in dev server
- Comparison slider drags smoothly on both mouse and touch
- Testimonial carousel auto-rotates, pauses on hover, dots navigate
- Dashboard URL input triggers personalized counters on first keystroke
- 5-second fallback triggers auto-animation if no dashboard interaction
- Mobile: comparison slider works with touch, testimonials stack vertically
- All animations use autoAlpha, gsap imported from @/lib/gsap
- prefers-reduced-motion respected (content visible without animation)
</verification>

<success_criteria>
Three interactive wow-factor features are functional: draggable comparison slider with clip-path reveal, auto-rotating testimonial carousel with crossfade and dots, and personalized hero dashboard with URL input. All follow project GSAP conventions and are responsive.
</success_criteria>

<output>
After completion, create `.planning/quick/17-interactive-wow-factor-features-comparis/17-SUMMARY.md`
</output>

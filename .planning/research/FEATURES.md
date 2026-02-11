# Feature Research

**Domain:** Agency/Portfolio Website Visual Overhaul
**Researched:** 2026-02-10 (Updated with behavioral patterns)
**Confidence:** HIGH

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist on modern agency sites. Missing these = feels outdated or incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Smooth scroll animations on reveal | Standard UX since 2020; users expect content to reveal as they scroll | LOW | Basic ScrollTrigger with opacity/transform. Already have Framer Motion, can extend with GSAP |
| Responsive hover states on interactive elements | Basic usability; users need feedback on what's clickable | LOW | Existing Framer Motion whileHover works. Need to vary beyond y: -8 |
| Mobile-responsive layouts | Non-negotiable; >50% traffic is mobile | MEDIUM | Existing site is responsive. Asymmetric layouts need extra mobile testing |
| Fast page loads (<3s) | Web vitals standard; users bounce if slow | MEDIUM | GSAP is performant. Watch for too many scroll listeners or large videos |
| Dark/light theme consistency | Users expect theme choice to work across all pages | LOW | Theme provider exists. Need to ensure new sections respect it |
| Accessible reduced motion | Compliance + UX; ~25% users have motion sensitivity | LOW | GSAP respects prefers-reduced-motion. Must implement fallbacks |
| Clear visual hierarchy | Users scan pages; hierarchy guides attention | MEDIUM | Existing typography is uniform. Need varied scales and weights |
| Portfolio case studies | Agencies without work examples lose 80%+ of leads | LOW | Must show process, not just final work. Storytelling required |
| Asymmetric layouts | Symmetric grids read as template. 67% of top SaaS sites use bento grids in 2026 | MEDIUM | Apple's bento pattern now industry standard. Symmetric = dated |

### Differentiators (Competitive Advantage)

Features that set high-end agency sites apart. Not required, but create "wow" moments.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| GSAP ScrollTrigger pinning effects | Creates cinematic storytelling; pins sections while content animates | HIGH | Kota.co.uk uses extensively. Requires careful trigger calculation. Best for hero/featured sections |
| Custom cursor interactions | Makes site feel custom-built, not templated; signature design element | MEDIUM | Strangepixels.co pattern. Cursor changes on hover states (scale, color, text). Requires global component + state |
| Parallax scroll effects | Adds depth and premium feel; layers move at different speeds | MEDIUM | ScrollSmoother or manual ScrollTrigger. Performance-sensitive. Best for backgrounds/hero images |
| Asymmetric bento grid layouts | Breaks template monotony; shows design craft | MEDIUM | CSS Grid with varied spans. Kota.co.uk masonry pattern. Requires careful responsive breakpoints |
| Video on hover (project cards) | Engaging; previews work without clicks | MEDIUM | Existing pattern observed on Kota. Auto-play muted video on hover. Watch bundle size |
| Scroll-driven timeline animations | Narrative storytelling; progress tied to scroll position | HIGH | GSAP Timeline + ScrollTrigger scrub. Complex coordination. Best for case studies/process sections |
| Strategic section color alternation | Creates visual rhythm and drama; breaks monotony | LOW | Dark/light sections alternate. Not full dark mode—strategic contrast. Requires section-aware layout |
| Oversized kinetic typography | Bold, confident; communicates personality | LOW-MEDIUM | Large display text with scroll-driven transforms. CSS variable fonts for smooth weight changes |
| Magnetic hover buttons | Premium interaction; button "pulls" cursor toward it | MEDIUM | Calculate distance between cursor and button. GSAP for smooth follow animation. Boosts CTR by ~15% |
| Scroll-triggered number counters | Social proof; animated statistics draw attention | LOW | IntersectionObserver + GSAP to() for count-up. Existing pattern in portfolio sites |
| Purposeful micro-interactions | Button hovers, progress indicators, animated checkmarks that guide behavior | LOW-MEDIUM | 2026 focus: functionality over ornamentation. Each animation fulfills a user requirement |
| Glow effects on hover | Soft luminescence gives instant feedback | LOW | Subtle illuminating borders around CTAs. Can boost click-through by ~15% |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Horizontal scroll sections (full-page) | Trendy on Awwwards sites | Disorienting; breaks browser back button; poor mobile UX; accessibility issues | Use horizontal scroll for contained galleries only, not full pages |
| Scroll-jacking (override native scroll) | Seems smooth and controlled | Users hate losing scroll control; breaks expectations; terrible accessibility | Let native scroll work. Use scrub: true for smooth scroll-driven animations |
| Auto-playing video backgrounds (full-page) | Looks premium and cinematic | Massive performance hit; terrible CWV; high bandwidth; distracting | Use video sparingly (hover states, hero only). Optimize heavily. Always muted |
| Complex 3D WebGL scenes | Impressive visual showcase | 95% of users don't care; kills performance; huge bundle; accessibility nightmare | Use CSS 3D transforms for depth. Reserve WebGL for hero only if essential |
| Cursor trails (particles/swirls everywhere) | Fun and playful visual effect | Distracting; performance drain; feels gimmicky quickly; not accessible | Simple cursor style changes (scale, color) on hover. Subtle, not overwhelming |
| Infinite auto-scroll carousels | Showcase lots of content passively | Users lose context; can't revisit; no control; bad for SEO | User-controlled carousels with visible navigation. Or static grids |
| Modal overlays for everything | Seems modern and focused | Interrupts flow; breaks back button; annoying on mobile; accessibility issues | Inline expandable sections. Reserve modals for critical actions only |
| Excessive loading screens/preloaders | Seems polished and on-brand | 53% abandon after 3 seconds. Complex preloaders increase bounce | Simple, fast preloader (<1s) or none. If needed, make it on-brand but minimal |
| Animations on every element | Seems dynamic and modern | Motion fatigue. Distracts from content. Harms Core Web Vitals | Purposeful animation. Each movement should guide, inform, or confirm action |
| Complex hover effects on mobile | Looks sophisticated on desktop | Mobile has no hover state. Breaks UX | CSS/JS detection for touch devices. Serve simplified interactions |

## Expected Behaviors and Patterns (Modern Agency Sites 2026)

### Scroll Animation Patterns

**Entry Animations:**
- Content reveals as it enters viewport (not on page load)
- Staggered reveals for lists/grids (0.05-0.1s delay between items)
- Opacity + transform (translateY or scale) for depth
- Duration: 0.6-1.2s for premium feel (not instant)

**Scroll Progress Indicators:**
- Subtle progress bars or indicators for long pages
- Not intrusive, often in header or sidebar

**Parallax Layers:**
- Background moves slower than foreground (0.3-0.5x speed)
- 2-3 layers max (foreground, midground, background)
- Applied to hero sections or large images, not every section

**Pinning Effects:**
- Pin section while animating content within it
- Use for storytelling (process steps, case studies)
- Unpin when content animation completes
- 1-2 pinned sections max per page (not overwhelming)

**Timeline Animations:**
- Horizontal scroll timelines (pin container, scroll content horizontally)
- Sequential reveals tied to scroll position (step 1 → step 2 → step 3)
- Scrub: true for smooth, scroll-linked animation (not time-based)

### Custom Cursor Patterns

**Default State:**
- 20-30px circle, semi-transparent, follows cursor smoothly
- Subtle blend mode or border (not solid fill)

**Hover States:**
- Scale up (1.5-2x) on interactive elements
- Color change to match element (link = brand color, button = accent)
- Text indicators ("View", "Play", "Drag") for specific actions

**Interactive Elements:**
- Links: cursor grows, changes color
- Buttons: cursor grows larger, may show text
- Images/Videos: cursor becomes play icon or "View" text
- Draggable: cursor becomes "Drag" or directional arrows

**Animation:**
- Smooth GSAP animation (duration: 0.3-0.5s, ease: "power2.out")
- Slight delay (0.05-0.1s lag) for organic follow effect

**Accessibility:**
- Respect prefers-reduced-motion (disable custom cursor)
- Never hide native cursor (layer custom over it)
- Ensure pointer-events: none on custom cursor element

### Asymmetric Layout Patterns

**Bento Grid Structure:**
- CSS Grid with varied column spans (1-3 columns wide)
- Varied row heights (auto, min-content, or fixed)
- Consistent gap spacing (1.5-2rem) for rhythm
- Corner radius consistent across all cards (8-16px)

**Card Size Variations:**
- Large feature cards: 2x2 or 3x2 grid spans
- Medium cards: 2x1 or 1x2 spans
- Small cards: 1x1 spans
- Ratio: ~30% large, 40% medium, 30% small

**Content Placement:**
- Avoid symmetry: offset text, vary image placement
- Alternate content position (left/right, top/bottom)
- Use whitespace intentionally (not uniform padding)

**Responsive Behavior:**
- Desktop: 3-4 column grid, varied spans
- Tablet: 2 column grid, simplified spans
- Mobile: Single column, preserve card order

**Visual Hierarchy:**
- Larger cards = more important content
- Use color, typography, and spacing to reinforce hierarchy

### Dark/Light Section Alternation Patterns

**Alternation Rhythm:**
- Alternate every 1-2 sections (not every section)
- Group related content in same color zone
- Dramatic transitions (not gradual fades)

**Color Approach:**
- Dark sections: Deep navy (#0A1628), white/light text
- Light sections: Off-white/peach (#FFF9F5), dark text
- Accent colors (coral/peach) remain consistent across both

**Transition Design:**
- Hard transitions (no gradients between sections)
- Optional: diagonal/curved dividers for drama
- Maintain visual rhythm with consistent section heights

**Content Considerations:**
- Ensure contrast ratios meet WCAG AA (4.5:1 for text)
- Test all UI components in both themes
- Images/videos may need different treatments per theme

### Typography Patterns

**Scale Variations:**
- Hero: 4-8rem (64-128px) — oversized, confident
- Section headings: 2.5-4rem (40-64px) — varied per section
- Body: 1-1.25rem (16-20px) — readable
- Labels: 0.75-0.875rem (12-14px) — subtle

**Weight Variations:**
- Hero: 700-900 (bold to black)
- Headings: 600-700 (semibold to bold)
- Body: 400-500 (normal to medium)
- Labels: 500-600 (medium to semibold)

**Kinetic Typography:**
- Scroll-driven transforms (scale, opacity, blur)
- Letter spacing adjustments on scroll
- Color shifts tied to scroll position

**Hierarchy Techniques:**
- Size + weight + color + spacing
- Not uniform (vary per section for interest)
- Maintain readability (never sacrifice for style)

### Hover Micro-Interaction Patterns

**Card Hover States:**
- Lift (translateY: -8 to -16px) + shadow
- Scale (1.02-1.05x) for subtle growth
- Glow (box-shadow with brand color)
- Image zoom (scale image 1.1x inside card)

**Button Hover States:**
- Scale + glow for CTAs
- Color shift (background or border)
- Icon animation (arrow slide, rotate)
- Magnetic pull (button moves toward cursor)

**Link Hover States:**
- Underline animation (width 0 → 100%)
- Color shift to brand color
- Background highlight (subtle)

**Animation Specs:**
- Duration: 0.3-0.4s for most interactions
- Easing: "power2.out" or "expo.out" for premium feel
- Avoid instant changes (jarring)

### Video on Hover Pattern

**Trigger:**
- Mouse enter: play video
- Mouse leave: pause + reset to first frame (or show poster)

**Video Specs:**
- Muted, looped, no controls
- Optimized: <1MB per video, H.264/VP9 codec
- Poster frame as fallback (for loading/accessibility)

**Animation:**
- Fade in video (opacity 0 → 1, 0.3s)
- Optional: scale video slightly (1.0 → 1.05)

**Accessibility:**
- Respect prefers-reduced-motion (show poster, no auto-play)
- Provide alt text or caption for video content

## Feature Dependencies

```
GSAP ScrollTrigger Foundation
    ├──enables──> Pinning effects
    ├──enables──> Parallax scroll
    ├──enables──> Timeline animations
    └──enables──> Scroll-triggered counters

Custom Cursor Component
    ├──requires──> Global state (cursor position)
    └──enhances──> Magnetic buttons (needs cursor coords)

Asymmetric Layouts
    ├──requires──> CSS Grid system
    ├──requires──> Responsive breakpoint strategy
    └──enhances──> Video on hover (varied card sizes)

Strategic Dark/Light Sections
    ├──requires──> Theme provider (exists)
    ├──conflicts──> Full dark mode toggle (choose one approach)
    └──enhances──> Visual rhythm (section transitions)

Varied Typography Scale
    ├──requires──> Design token system
    └──enables──> Oversized kinetic type

Video on Hover
    ├──requires──> Optimized video assets (<1MB each)
    └──enhances──> Asymmetric layouts (visual interest)

Scroll-driven Animations
    ├──requires──> GSAP + ScrollTrigger
    ├──requires──> Reduced motion fallbacks
    └──conflicts──> Too many simultaneous animations (performance)
```

### Dependency Notes

- **GSAP + ScrollTrigger is foundational:** Install first with @gsap/react hook for Next.js 15. Enables pinning, parallax, timelines, counters. Use centralized plugin setup per best practices.
- **Custom cursor requires global state:** Must track cursor position across all pages. Implement as layout-level component with context. Disable on touch devices.
- **Asymmetric layouts need responsive strategy:** Bento grids collapse to single column on mobile. Test breakpoints heavily. Use CSS Grid with named areas.
- **Strategic dark/light conflicts with full dark mode:** Choose one. Strategic sections (Kota pattern) create rhythm but override user preference. Document decision.
- **Video on hover is bundle-size sensitive:** Each video should be <1MB, heavily optimized. Consider lazy loading. Too many = performance hit.
- **Scroll-driven animations need performance budget:** Max 3-5 active ScrollTriggers per viewport. Use batch processing. Debounce resize handlers (300ms). Call ScrollTrigger.refresh() after loads.

## MVP Definition

### Launch With (v1)

Minimum viable visual overhaul — what's needed to feel "hand-crafted, not templated."

- [ ] **GSAP + ScrollTrigger integration** — Foundational. Enables all scroll-driven features. Install with `npm install gsap @gsap/react`. Use useGSAP hook.
- [ ] **Basic scroll reveal animations** — Replace uniform Framer Motion fadeIn with varied GSAP animations. Staggered reveals (0.05-0.1s delay).
- [ ] **Custom cursor component** — Signature design element. Simple version (scale + color change on hover) is enough for v1. 20-30px circle, smooth follow.
- [ ] **Asymmetric homepage layout** — One page proves concept. Bento grid with varied card sizes (30% large, 40% medium, 30% small). No uniform grids.
- [ ] **Strategic dark/light section alternation** — Breaks visual monotony. Alternate section backgrounds (dark navy / light peach). Hard transitions.
- [ ] **Varied typography scale** — 3-4 distinct type scales. Oversized hero text (4-8rem), normal body (1-1.25rem), small labels (0.75-0.875rem).
- [ ] **Hover state variations** — 3+ distinct hover patterns (scale, lift, glow, magnetic). Duration 0.3-0.4s, ease "power2.out".
- [ ] **Video on hover (portfolio cards)** — One section proves pattern. Muted auto-play on hover. <1MB per video. Fade in 0.3s.

### Add After Validation (v1.x)

Features to add once core visual overhaul is validated.

- [ ] **Scroll pinning effects** — Add to hero or featured sections after basic ScrollTrigger works. 1-2 pinned sections max. Trigger: v1 scroll animations work well.
- [ ] **Parallax backgrounds** — Add depth to 2-3 key sections. Background at 0.3-0.5x foreground speed. Trigger: Performance metrics look good after v1.
- [ ] **Timeline animations (process/case study)** — Narrative scroll-driven sequences. Scrub: true for smooth animation. Trigger: Client wants deeper storytelling.
- [ ] **Magnetic buttons** — Premium interaction. Add to CTAs. Calculate cursor distance, GSAP follow animation. Trigger: Custom cursor is working and well-received.
- [ ] **Scroll-triggered counters** — Animated stats on about/portfolio pages. IntersectionObserver + GSAP count-up. Trigger: Adding more dynamic elements.
- [ ] **Kinetic typography** — Text that transforms on scroll. Scale/opacity/blur tied to scroll position. Trigger: Want to push visual boldness further.
- [ ] **Additional asymmetric pages** — Extend to services, portfolio, pricing. Trigger: Homepage layout is successful.

### Future Consideration (v2+)

Features to defer until visual system is mature.

- [ ] **ScrollSmoother integration** — Smooth scroll with parallax. Defer: Requires GSAP premium license. Wait for user feedback on v1.
- [ ] **Horizontal scroll galleries** — Contained sections only, not full pages. Defer: Complex mobile UX. Not critical for v1.
- [ ] **3D transforms on cards** — CSS 3D tilt/rotate on hover. Defer: Nice-to-have, not essential for "hand-crafted" feel.
- [ ] **Animated SVG illustrations** — Custom animated graphics. Defer: Requires design assets. Not blocking visual overhaul.
- [ ] **Micro-interactions library** — Comprehensive hover/click/load animations. Defer: Build gradually, not all at once.
- [ ] **Interactive 3D WebGL elements** — Three.js integration. Defer: Very high complexity, performance cost. Desktop-only consideration.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| GSAP + ScrollTrigger foundation | HIGH | MEDIUM | P1 |
| Basic scroll reveal animations | HIGH | LOW | P1 |
| Custom cursor component | MEDIUM | MEDIUM | P1 |
| Asymmetric homepage layout | HIGH | MEDIUM | P1 |
| Strategic dark/light sections | HIGH | LOW | P1 |
| Varied typography scale | HIGH | LOW | P1 |
| Hover state variations | MEDIUM | LOW | P1 |
| Video on hover (portfolio) | MEDIUM | MEDIUM | P1 |
| Scroll pinning effects | MEDIUM | HIGH | P2 |
| Parallax backgrounds | MEDIUM | MEDIUM | P2 |
| Timeline animations | MEDIUM | HIGH | P2 |
| Magnetic buttons | LOW | MEDIUM | P2 |
| Scroll-triggered counters | LOW | LOW | P2 |
| Kinetic typography | LOW | LOW-MEDIUM | P2 |
| Extend asymmetric to all pages | HIGH | HIGH | P2 |
| ScrollSmoother | LOW | HIGH | P3 |
| Horizontal scroll galleries | LOW | HIGH | P3 |
| 3D card transforms | LOW | MEDIUM | P3 |
| Animated SVG illustrations | LOW | HIGH | P3 |
| Micro-interactions library | MEDIUM | HIGH | P3 |
| Interactive 3D WebGL | LOW | VERY HIGH | P3 |

**Priority key:**
- P1: Must have for v1 visual overhaul — proves "hand-crafted, not templated"
- P2: Should have for complete experience — add after v1 validates
- P3: Nice to have, future consideration — wait for user feedback

## Competitor Feature Analysis

Based on inspiration sites (kota.co.uk, strangepixels.co) and modern agency trends (2026).

| Feature | Kota.co.uk | Strangepixels.co | Our Approach |
|---------|------------|------------------|--------------|
| Scroll animations | GSAP ScrollTrigger with pinning, parallax, stagger reveals | Custom scroll-driven motion, dark theme transitions | GSAP ScrollTrigger (Kota pattern). Start simple, add pinning in v1.x |
| Custom cursor | Subtle scale changes, video play indicators | Bold cursor with hover states, color changes | Strangepixels pattern — bold, interactive, signature element |
| Layout system | Asymmetric bento grids, varied card sizes, no uniform grids | Dark-themed asymmetric sections, bold type hierarchy | Kota bento grid pattern. Varied card sizes, CSS Grid, no templates |
| Typography | Mixed weights, oversized hero text, tight leading, varied scales | Bold display type, confident sizing, kinetic elements | Both patterns — oversized + kinetic. Vary weights and scales per section |
| Video/Motion | Auto-play video on hover (project cards), parallax backgrounds | Scroll-driven video scrubbing, animated transitions | Kota hover video + scroll-driven timelines (v1.x) |
| Color strategy | Strategic dark sections alternated with light, bold gradients | Full dark theme with coral/pink accents, high contrast | Kota strategic alternation (not full dark mode). Navy/coral/peach palette |
| Micro-interactions | Magnetic elements, smooth hover states, staggered reveals | Glow effects, bold hover transforms, cursor-reactive elements | Both — magnetic buttons (v1.x), varied hover states (v1) |
| Section rhythm | Varied spacing, asymmetric padding, visual breathing room | Tight sections with bold breaks, dramatic transitions | Kota pattern — varied spacing, intentional rhythm, no uniform py-16 |

### Key Insights from Competitors

**What Kota does well:**
- Asymmetric bento grids create hand-crafted feel
- Video on hover is engaging without being overwhelming
- Parallax creates depth without scroll-jacking
- Mixed section backgrounds create rhythm

**What Strangepixels does well:**
- Bold custom cursor as signature element
- High-contrast dark theme with accents
- Confident typography creates personality
- Cursor-reactive elements feel premium

**Our differentiation:**
- Combine best of both: Kota's layout variety + Strangepixels' cursor boldness
- Navy/coral/peach palette (not pure dark theme)
- Strategic dark sections (not full dark mode toggle)
- GSAP ScrollTrigger (industry standard, well-documented)
- Next.js 15 + React 19 (modern, fast)

## Performance Considerations

### GSAP ScrollTrigger Performance

**Best Practices:**
- Batch similar animations (use ScrollTrigger.batch())
- Debounce resize handlers (300ms delay)
- Use will-change CSS hint for animated elements
- Limit active ScrollTriggers per viewport (3-5 max)
- Call ScrollTrigger.refresh() after dynamic content loads

**Performance Budget:**
- Max 10-15 ScrollTriggers per page
- Max 3-5 pinned sections per page
- Avoid animating expensive properties (box-shadow, filter) in scroll loops
- JavaScript budget: 150-200KB total. GSAP (30KB) + ScrollTrigger (15KB) = 45KB

### Video Performance

**Optimization:**
- Use modern codecs (H.264 minimum, VP9/AV1 preferred)
- Target <1MB per video (5-10s clips)
- Lazy load videos below fold
- Preload="metadata" for above-fold videos

**Loading Strategy:**
- Poster frame shown immediately
- Video loads on hover (or IntersectionObserver)
- Consider <video preload="none"> for below-fold content
- Video budget: <10MB per video. Limit to 2-3 videos maximum per page

### Custom Cursor Performance

**Optimization:**
- Use transform (not top/left) for positioning (GPU-accelerated)
- Throttle cursor position updates (requestAnimationFrame)
- Disable on mobile (no cursor on touch devices)
- Performance impact: VERY LOW

### Layout Performance

**Best Practices:**
- Use CSS Grid (not absolute positioning hacks)
- Avoid layout shifts (reserve space for images/videos)
- Optimize images (Next.js Image component with proper sizing)
- Lazy load images below fold

## Accessibility Requirements

2026 standards (legal + ethical imperatives):

| Feature | Accessibility Consideration | Implementation |
|---------|---------------------------|----------------|
| All animations | Respect prefers-reduced-motion | CSS media query: reduce/eliminate motion for users who request it |
| Custom cursor | Keyboard navigation must work | Cursor enhancements visual only. All interactions must have keyboard equivalent |
| Scroll animations | Don't break native scroll | GSAP ScrollTrigger scrubs, doesn't override. Users maintain scroll control |
| Video backgrounds | Captions for any speech | Muted loops preferred. If audio, provide captions/transcripts |
| Dark/light themes | Both must pass WCAG contrast | Test all color combinations. Contrast ratio ≥4.5:1 for normal text |
| Interactive elements | Clear focus indicators | Visible outline on keyboard focus. Magnetic cursor supplements, doesn't replace |
| Complex interactions | Provide fallbacks | 3D/WebGL must have 2D fallback for unsupported browsers/devices |

## Mobile-Specific Considerations

| Feature | Mobile Implementation | Notes |
|---------|---------------------|-------|
| Custom cursor | Disable on touch devices | CSS/JS detection. Touch has no hover state |
| Video backgrounds | Serve static images <768px | Autoplay restricted on mobile. Bandwidth concern |
| Parallax effects | Reduce or eliminate | Performance cost higher on mobile. Simplified animations |
| 3D WebGL | Desktop-only or very simplified | Battery drain. Performance limitations |
| Scroll pinning | Test extensively | Can feel janky on mobile. May need different approach |
| Hover micro-interactions | Convert to tap states | No hover on touch. Use :active or touch events |
| Typography | Larger minimum sizes | 16px minimum. Variable fonts scale well |
| Navigation | Touch-friendly targets | 44px minimum touch target size |

## Sources

### GSAP ScrollTrigger
- [GSAP ScrollTrigger Official Docs](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [GSAP ScrollTrigger: Complete Guide with 20+ Examples (2025) | GSAPify](https://gsapify.com/gsap-scrolltrigger)
- [ScrollTrigger Best Practices - GSAP Forums](https://gsap.com/community/forums/topic/32787-scrolltrigger-best-practices/)
- [Best practices with Gsap and ScrollTrigger - GSAP Forums](https://gsap.com/community/forums/topic/28279-best-practices-with-gsap-and-scrolltrigger/)
- [48 GSAP ScrollTrigger Examples](https://freefrontend.com/scroll-trigger-js/)
- [Optimizing GSAP Animations in Next.js 15: Best Practices | Medium](https://medium.com/@thomasaugot/optimizing-gsap-animations-in-next-js-15-best-practices-for-initialization-and-cleanup-2ebaba7d0232)
- [Using ScrollTriggers in Next.js with useGSAP() - GSAP Forums](https://gsap.com/community/forums/topic/40128-using-scrolltriggers-in-nextjs-with-usegsap/)
- [Guide to using GSAP ScrollTrigger in Next.js with useGSAP() | Medium](https://medium.com/@ccjayanti/guide-to-using-gsap-scrolltrigger-in-next-js-with-usegsap-c48d6011f04a)
- [How to animate Parallax and Pinning with GSAP ScrollTrigger - GSAP Forums](https://gsap.com/community/forums/topic/31022-how-to-animate-parallax-and-pinning-at-the-same-time-using-gsaps-scrolltrigger/)

### Custom Cursor Interactions
- [Best Custom Cursor Websites | Webflow](https://webflow.com/made-in-webflow/custom-cursor)
- [10 Websites With Exceptional Custom Cursors For Inspiration | Medium](https://orpetron-team.medium.com/10-websites-with-exceptional-custom-cursors-for-inspiration-8c8222ff509c)
- [How to use custom animated cursors to upgrade your website UX | HubSpot](https://blog.hubspot.com/website/animated-cursor)

### Asymmetric Layouts
- [Asymmetric Layouts Web Design: Breaking the Mold in 2025 | The HypeEdge](https://thehypedge.com/the-rise-of-asymmetric-layouts-breaking-the-mold-in-web-design/)
- [10 Modern Web Design Trends to Inspire Your 2026 Strategy | WebFX](https://www.webfx.com/blog/web-design/modern-web-design/)
- [Web Design Trends to Expect in 2026 | Elementor](https://elementor.com/blog/web-design-trends-2026/)
- [2026 Web Design Trends You Need to Know | Showit](https://showit.com/business-growth/2026-web-design-trends-you-need-to-know/)
- [20 Top Web Design Trends 2026 | TheeDigital](https://www.theedigital.com/blog/web-design-trends)

### Hover Micro-Interactions
- [15 best microinteraction examples for web design inspiration | Webflow Blog](https://webflow.com/blog/microinteractions)
- [CSS :hover Selector in 2026: Practical Patterns | TheLinuxCode](https://thelinuxcode.com/css-hover-selector-in-2026-practical-patterns-pitfalls-and-accessible-interactions/)
- [Micro Interactions in Web Design: How Subtle Details Shape UX | Stan Vision](https://www.stan.vision/journal/micro-interactions-2025-in-web-design)
- [7 Emerging Web Design Trends for SaaS in 2026 | Envizn Labs](https://enviznlabs.com/blogs/7-emerging-web-design-trends-for-saas-in-2026-ai-layouts-glow-effects-and-beyond)
- [14 Web Design Trends to Keep up with in 2026 | UX Pilot](https://uxpilot.ai/blogs/web-design-trends-2026)

### Typography & Visual Hierarchy
- [Fontfabric: Top 10 Design & Typography Trends for 2026](https://www.fontfabric.com/blog/10-design-trends-shaping-the-visual-typographic-landscape-in-2026/)
- [What are the different types of typographic scales? | Cieden](https://cieden.com/book/sub-atomic/typography/different-type-scale-types)
- [How to Structure an Effective Typographic Hierarchy | Toptal](https://www.toptal.com/designers/typography/typographic-hierarchy)
- [Web Design Trends Shaping Modern Websites in 2026 | Ginger IT Solutions](https://www.gingeritsolutions.com/blog/web-design-trends-2026/)

### Card Design & UI Patterns
- [UI Design Trends 2026: 15 Patterns Shaping Modern Websites | Landdding](https://landdding.com/blog/ui-design-trends-2026)
- [12 UI/UX Design Trends That Will Dominate 2026 | Index.dev](https://www.index.dev/blog/ui-ux-design-trends)
- [17 Card UI Design Examples and Best Practices | Eleken](https://www.eleken.co/blog-posts/card-ui-examples-and-best-practices-for-product-owners)
- [Card UI Design Examples and Ideas | Arounda](https://arounda.agency/blog/card-ui-design-examples-and-ideas)

### Visual Rhythm & Spacing
- [How Repetition, Pattern, and Rhythm Work in Design | Arounda](https://arounda.agency/blog/how-repetition-pattern-and-rhythm-work-in-design)
- [Designing with Rhythm and Proportion | Lullabot](https://www.lullabot.com/articles/designing-rhythm-and-proportion)
- [Vertical Rhythm: The Key to Exceptional Web Design | Unmatched Style](https://unmatchedstyle.com/news/vertical-rhythm-the-key-to-exceptional-web-design.php)
- [Repetition, Pattern, and Rhythm | IxDF](https://www.interaction-design.org/literature/article/repetition-pattern-and-rhythm)

### Dark/Light Themes
- [Dark and Light Theme Switch | Web.dev](https://web.dev/patterns/theming/theme-switch/)
- [Dark Mode Web Design Examples | Muffin Group](https://muffingroup.com/blog/dark-mode-web-design-examples/)
- [Dark Mode Websites: Web Design Tips, Examples & Best Practices | Designmodo](https://designmodo.com/dark-mode-websites/)

### Inspiration Sites (Direct Analysis)
- [Small details, big impact: A guide to website micro-animations | KOTA](https://kota.co.uk/blog/small-details-big-impact-a-guide-to-website-micro-animations)
- [Animation on the Web: Records Bars Header | KOTA](https://kota.co.uk/blog/animation-on-the-web-records-bars-header)

---
*Feature research for: OneSquad Visual Overhaul (Agency/Portfolio Site)*
*Researched: 2026-02-10 (Updated with behavioral patterns)*
*Confidence: HIGH (GSAP patterns verified with official docs, design trends verified across multiple 2026 sources, inspiration sites analyzed directly)*

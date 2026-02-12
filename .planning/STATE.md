# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-10)

**Core value:** Every page should feel intentionally designed — no two sections should look like they came from the same template.
**Current focus:** Phase 8: Scroll Animations Site-wide (Complete)

## Current Position

Phase: 8 of 8 (Scroll Animations Site-wide)
Plan: 5 of 5
Status: Complete
Last activity: 2026-02-12 - Completed quick task 12: Add pricing calculator to main pricing overview page

Progress: [████████████████████] 100%

## Performance Metrics

**Velocity:**
- Total plans completed: 25
- Average duration: 3.5 minutes
- Total execution time: 1.6 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 01 | 2 | 12m | 6m |
| 02 | 2 | 4m | 2m |
| 03 | 3 | 8m | 2.7m |
| 04 | 3 | 11m | 3.7m |
| 05 | 4 | 19m | 4.8m |
| 06 | 2 | 12m | 6m |
| 07 | 3 | 5.6m | 1.9m |
| 08 | 5 | 33m | 6.6m |

**Recent Trend:**
- Last 5 plans: 07-03 (0.5m), 08-01 (10m), 08-02 (11m), 08-03 (9m), 08-04 (12m), 08-05 (2m)
- Trend: Phase 08 complete - All site-wide scroll animations converted from Framer Motion to GSAP ScrollTrigger

*Updated after each plan completion*
| Phase 08 P05 | 2 | 2 tasks | 0 files |
| Phase quick-7 P1 | 1 | 1 tasks | 1 files |
| Phase quick-8 P1 | 163 | 2 tasks | 2 files |
| Phase quick-9 P1 | 3 | 3 tasks | 6 files |
| Phase quick-9 P1 | 3 | 3 tasks | 6 files |
| Phase quick-10 P01 | 2.7 | 2 tasks | 3 files |

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- GSAP alongside Framer Motion: ScrollTrigger needed for pinning, parallax, timeline control
- Full custom cursor sitewide: Both inspiration sites use cursor as design element
- Strategic dark sections (not full dark mode): High contrast transitions create rhythm and drama
- Homepage + key pages first: Nail design system on most important pages, then extend
- Full copy refresh: Edgy creative vibe needs copy that matches
- **01-01:** Use syncTouch instead of non-existent smoothTouch option (Lenis 1.3.17 API uses syncTouch + syncTouchLerp)
- **01-02:** Keep Lenis mounted when reduced motion is active - ScrollTrigger instances in future phases depend on Lenis being present. Disable smooth interpolation (lerp: 1) instead of unmounting.
- **01-02:** Use gsap.matchMedia in useScrollAnimation hook - GSAP's matchMedia automatically handles cleanup and integrates with GSAP context system
- **02-01:** Use GSAP quickTo instead of React state for cursor position (performance critical - avoids re-renders on every mousemove)
- **02-01:** Use plain useEffect instead of useGSAP hook (cursor is fixed-position, not scope-bound to a container)
- **02-01:** Dual-speed tracking: dot 0.15s (fast follow) + follower 0.5s (visible lag creates design element feel)
- **02-02:** Card hover uses coral spotlight (80px, 30% opacity) inspired by kota.co.uk/strangepixels.co — distinct from generic scale-up
- **02-02:** Button hover uses difference blend mode - white fill creates automatic contrast across light and dark sections
- **02-02:** Event delegation via single document listener (performance - no per-element hover listeners)
- **02-02:** Cursor state via refs (not state) to avoid re-renders on hover state changes
- **03-01:** Navy hero background (dark section first per strategic dark/light rhythm)
- **03-01:** 6-col desktop / 4-col mobile grid (asymmetric bento inspired by Kota.co.uk)
- **03-01:** Display typography scale maxes at 8rem (xl:text-display)
- **03-01:** Dual CTAs with coral primary + white outline
- **03-01:** MotionConfig reducedMotion="user" for accessibility
- **03-01:** Bold headline: "We Build Digital Empires For Small Businesses"
- [Phase 03]: Features section uses navy background with scale hover pattern (1st pattern)
- [Phase 03]: ServicesPreview uses white background with glow hover pattern (2nd pattern)
- [Phase 03]: Comparison uses navy background with lift+shadow hover pattern (3rd pattern)
- [Phase 03]: Section spacing varies intentionally: py-32/40, py-20/28, py-24/36, py-16/24, py-28/40
- **04-01:** Use distinct hover patterns per category (glow for DM, lift+shadow for WS) to prevent templated feel
- **04-01:** Web Design spans 2 columns in bento grid for visual hierarchy without implying importance
- **04-01:** Peach/10 tinted CTA section adds warmth without breaking dark/light rhythm
- **04-01:** Category jump buttons use anchor links (browser handles smooth scroll)
- [Phase 04-03]: Visual verification confirmed services page redesign meets Phase 4 success criteria
- **05-01:** Same coral accent across all tiers, differentiate via hover patterns not color swaps
- **05-01:** Hybrid overview page (gateway cards + hosting/managed plans) balances discovery and navigation
- **05-01:** Middle tier card elevated with -mt-4 creates visual hierarchy without implying superiority
- **05-01:** Pattern assignments: Social=scale, Website=glow, Ecommerce=lift+shadow (sets expectations for calculator pages)
- [Phase 05-02]: Full-width layout (not sidebar+main grid) creates distinct personality vs website/ecommerce tiers
- [Phase 05-02]: Inline summary below wizard (not sticky sidebar) fits vertical flow of social media aesthetic
- **05-03:** Sidebar+main layout (340px sidebar, 12 gap) for website tier creates premium feel vs social's full-width
- **05-03:** Slower animations (0.5-0.6s) vs social's fast 0.2s convey deliberate, quality-focused energy
- **05-03:** Numbered badges for steps (architectural feel) vs social's circles distinguish tier personalities
- **05-03:** Dark → Light → Dark section rhythm for website establishes premium bookend pattern
- **05-04:** Split-screen layout (50/50 grid) for ecommerce creates dashboard-like data-driven feel
- **05-04:** Navy-fill selected states (not coral) differentiates ecommerce from social/website at interaction level
- **05-04:** Progress bar step indicators (gradient fill) — unique to ecommerce, reinforces data visualization
- [Phase 05-04]: Human verified all 4 pricing pages visually distinct — different layouts, hovers, animations, copy
- **06-01:** Narrative copy frames templates as custom builds for real businesses (anti-template positioning)
- **06-01:** Only 4 popular templates get video URLs initially (modern-agency, shop-starter, health-first, biz-dashboard)
- **06-01:** Dark sections use bg-[#0F172A] directly (not Section component preset for exact color consistency)
- **06-01:** Removed Breadcrumb from portfolio hero to keep focus on bold headline
- **06-01:** Grid section uses Section component with background="white" and padding="lg"
- **06-02:** PortfolioCard simplified from TemplateShowcaseCard (no price breakdown panel, tier badges, or tech stack pills)
- **06-02:** Popular templates span 2 columns on desktop (md:col-span-2) for mixed-size visual hierarchy
- **06-02:** IntersectionObserver lazy loading for videos (100px rootMargin) prevents loading 21 videos on page load
- **06-02:** Touch detection disables video on mobile (ontouchstart/maxTouchPoints pattern)
- **06-02:** Sticky filter bar uses backdrop-blur-md for glassmorphism effect
- **06-02:** Interleaved sorting (3-4 normal, 1 popular) creates visual rhythm vs clustering
- [Phase 06-02]: Human verified portfolio grid redesign with video hover meets all visual quality criteria
- [Phase 07]: Asymmetric 12-col grid (4-col sidebar + 8-col form) creates unique contact page personality vs centered layouts
- [Phase 07]: Budget/timeline selects as optional fields avoid breaking existing form submission behavior
- [Phase 07]: Coral accent system for contact page (icon blocks, quote card, success state) reinforces brand identity
- **07-02:** Mission-first hero (not origin story) sets immediate editorial tone
- **07-02:** Values use full-width typography (text-5xl to text-[5.5rem]) not icon cards for manifesto feel
- **07-02:** Stats section removed entirely per user decision - editorial section replaces social proof
- **07-02:** Logo story uses decorative "1S" brand mark (text-[8rem] ghosted) instead of logo image
- **07-02:** Dark/light/dark rhythm with peach/10 accent section creates visual drama
- **07-02:** Copy uses contractions and first-person plural for warm confident tone (not corporate buzzwords)
- **07-03:** Visual verification checkpoint confirms both contact and about pages meet Phase 7 success criteria
- **07-03:** Contact page asymmetric layout creates distinct personality vs centered layouts
- **07-03:** About page typography-driven values achieve manifesto feel without icon cards or stats
- [Phase 07-03]: Human verified both pages break uniform section pattern successfully
- **08-01:** Created preset library with pure functions (not ScrollTrigger creators) - sections call gsap.from() with spread configs
- **08-01:** Individual ScrollTriggers per card in Features (not single staggerChildren) - more granular control, better timing
- **08-01:** Stagger 'from' variants: Web Solutions from 'start', Digital Marketing from 'center' - creates distinct animation personalities
- **08-01:** Comparison divider uses scrub: 1 for organic scroll-linked animation - visual feedback tied to scroll position
- **08-03:** Service detail sections use 5+ distinct animation effects for varied personality (fadeUp with power3, scaleReveal stagger, slideFromRight, cascade delays)
- **08-03:** Pricing tier cards use different hover patterns per tier (scale for Social, glow for Website, lift+shadow for Ecommerce) via CSS Tailwind classes
- **08-03:** Keep Framer Motion for interactive animations only (FAQ accordion expand/collapse, tab indicator layoutId spring) - GSAP for scroll reveals
- [Phase 08-02]: PortfolioPreview uses clip-path reveal (bottom) for heading - creates dramatic upward reveal effect
- **08-04:** Portfolio filter bar NOT animated - navigation elements should be immediately available
- **08-04:** Portfolio cards animate only on initial scroll, not on filter changes (AnimatePresence handles filter transitions)
- **08-04:** Contact sidebar slides from left, form from right with 0.15s delay (asymmetric panels opening effect)
- **08-04:** About values use dramatic y:80 fadeUp with power3.out (manifesto unfolding - most dramatic on site)
- **08-04:** Kept motion.div for contact quote summary and success state (conditional mount animations, not scroll)
- [Phase 08-02]: Process steps use alternating slide-in (left/right) with individual ScrollTriggers per step for natural scroll-linked reveals
- [Phase 08-02]: Testimonials use varied-timing reveals (mixed scaleReveal/fadeUp with staggered delays) - popcorn effect prevents uniform grid feel
- [Phase 08-02]: ServicesHero uses power3.out easing (heavier than default power2) for bold, confident headline entrance
- [Phase 08-02]: DigitalMarketingGrid cards stagger from center - emanating effect fits marketing theme
- **08-05:** Visual verification confirmed all scroll animations are smooth, varied, and intentional across 7 pages
- **08-05:** Verified stagger timing varies appropriately by grid density (0.06s for dense portfolio, 0.08-0.12s for standard grids)
- **08-05:** Confirmed prefers-reduced-motion support works correctly - all content visible without animations
- **08-05:** Verified interactive Framer Motion animations preserved (accordions, filter transitions, tab indicators)
- **08-05:** Confirmed no two adjacent sections use identical animation patterns
- [Phase 08-05]: Phase 8 complete - All site-wide scroll animations converted from Framer Motion to GSAP ScrollTrigger with distinct personalities per section
- **Quick-03:** Lenis lerp increased from 0.075 to 0.1 for better ScrollTrigger timing sync (reduces scroll lag)
- **Quick-03:** GSAP lagSmoothing re-enabled (500ms/33ms) to prevent jarring frame catch-up on heavy frames
- **Quick-03:** Dual ScrollTrigger refresh (300ms + 800ms) handles both fast content and lazy-loaded images on route change
- **Quick-03:** GPU layer promotion via will-change applied automatically to all [data-animate] elements before animations start
- **Quick-03:** Converted per-element ScrollTrigger forEach loops to single-trigger stagger patterns (40-50% reduction in total instances)
- **Quick-05:** Asymmetric stacked layout for comparison section (compact dismissed "Without" items + coral divider + elevated 2x2 "With" cards)
- **Quick-05:** Strikethrough on "Without" items creates visual metaphor of crossing out problems (more effective than flat red cards)
- **Quick-05:** Dark navy #0e1e36 with coral gradient borders creates visual separation from adjacent navy sections
- **Quick-05:** Scale reveal from center for "With" cards (emanating effect) draws attention to solutions as hero items
- [Phase quick-6]: invalidateOnRefresh required on all ScrollTriggers to handle Lenis-GSAP timing mismatches
- [Phase quick-6]: Removed blanket will-change promotion - GSAP handles GPU layers automatically (100+ elements promoted = compositor thrashing)
- [Phase quick-6]: Lenis lerp increased to 0.12 (from 0.1) for tighter scroll-animation sync without losing smooth feel
- [Phase quick-6]: Use autoAlpha instead of opacity for GSAP visibility animations (combines opacity + visibility for better cleanup)
- [Phase quick-7]: Disabled syncTouch to prevent Lenis from intercepting native mobile momentum scrolling
- [Phase quick-8]: WebsiteBuilderAnimation uses autoAlpha for visibility animations (opacity + display cleanup)
- [Phase quick-8]: Browser chrome #0e1e36 provides depth against navy hero, mock elements use abstract shapes not real content
- [Phase quick-9]: limitCallbacks: true reduces ScrollTrigger per-frame work to only state-change callbacks
- [Phase quick-9]: Lenis lerp 0.18 balances smooth feel with responsive scroll-animation sync
- [Phase quick-9]: WebsiteBuilderAnimation pauses when offscreen to eliminate wasted main thread cycles
- [Phase quick-9]: Timeline consolidation reduces ScrollTrigger instances without changing visual behavior
- [Phase quick-10]: ResultsDashboardAnimation uses animated counters (traffic/conversions/revenue) to communicate outcomes vs static tagline
- [Phase quick-12]: Extracted three separate calculator components to preserve each tier's distinct visual personality

### Pending Todos

None - All roadmap phases complete.

### Blockers/Concerns

None yet.

### Quick Tasks Completed

| # | Description | Date | Commit | Directory |
|---|-------------|------|--------|-----------|
| 1 | Add Playwright e2e testing with GitHub Actions CI | 2026-02-11 | 2279d83 | [1-add-playwright-e2e-testing-with-github-a](./quick/1-add-playwright-e2e-testing-with-github-a/) |
| 2 | Fix night mode button not working | 2026-02-12 | f1e79e0 | [2-fix-night-mode-button-not-working](./quick/2-fix-night-mode-button-not-working/) |
| 3 | Fix scroll glitching on pages | 2026-02-12 | b808eaf | [3-fix-scroll-glitching-on-pages](./quick/3-fix-scroll-glitching-on-pages/) |
| 4 | Fix With/Without OneSquad comparison section animations | 2026-02-12 | 7730b51 | [4-fix-with-without-onesquad-comparison-ani](./quick/4-fix-with-without-onesquad-comparison-ani/) |
| 5 | Redesign comparison section with more visual personality | 2026-02-12 | 04c3b6f | [5-redesign-comparison-section-with-more-vi](./quick/5-redesign-comparison-section-with-more-vi/) |
| 6 | Fix invisible With OneSquad cards and scroll jank | 2026-02-12 | a5b9b4c | [6-fix-invisible-with-onesquad-cards-and-re](./quick/6-fix-invisible-with-onesquad-cards-and-re/) |
| 7 | Fix mobile scroll jank - disable Lenis on touch devices | 2026-02-12 | 71268f9 | [7-fix-mobile-scroll-jank-disable-lenis-on-](./quick/7-fix-mobile-scroll-jank-disable-lenis-on-/) |
| 8 | Replace hero gradient box with animated website builder | 2026-02-12 | 816479a | [8-replace-hero-gradient-box-with-animated-](./quick/8-replace-hero-gradient-box-with-animated-/) |
| 9 | Fix persistent scroll jank - reduce ScrollTrigger overhead | 2026-02-12 | ca8c7ba | [9-fix-persistent-scroll-jank-reduce-scroll](./quick/9-fix-persistent-scroll-jank-reduce-scroll/) |
| 10 | Replace hero right-side visual with interactive results dashboard | 2026-02-12 | f83901d | [10-replace-hero-right-side-visual-with-inte](./quick/10-replace-hero-right-side-visual-with-inte/) |
| 11 | Audit and rewrite AI-sounding copy across entire site | 2026-02-12 | 412a7a7 | [11-audit-and-rewrite-ai-sounding-copy-acros](./quick/11-audit-and-rewrite-ai-sounding-copy-acros/) |
| 12 | Add pricing calculator to main pricing overview page | 2026-02-12 | 55ba2da | [12-add-pricing-calculator-to-main-pricing-o](./quick/12-add-pricing-calculator-to-main-pricing-o/) |

## Session Continuity

Last session: 2026-02-12 (quick task execution)
Stopped at: Completed quick-9-PLAN.md (scroll jank fixes)
Resume file: .planning/quick/7-fix-mobile-scroll-jank-disable-lenis-on-/7-SUMMARY.md

**Phase 08 Status:** COMPLETE (5 of 5 plans complete)
- 08-01: GSAP scroll animation presets and homepage conversion (complete)
- 08-02: Homepage remaining sections animation (complete)
- 08-03: Services and pricing pages animation (complete)
- 08-04: Portfolio, contact, and about pages animation (complete)
- 08-05: Visual verification checkpoint (complete)
- Next: All phases complete - Roadmap finished

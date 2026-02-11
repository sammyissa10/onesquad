# Research Summary: OneSquad Visual Overhaul

**Domain:** Advanced scroll animations, custom cursors, and creative motion for Next.js 15
**Researched:** 2026-02-10
**Overall confidence:** HIGH

## Executive Summary

The 2025/2026 ecosystem for advanced web animations has undergone significant changes. GSAP became 100% free in April 2025 (thanks to Webflow), making all previously premium plugins (SplitText, MorphSVG, DrawSVG) available at no cost. This eliminates the historical barrier to using GSAP and makes it the clear choice for timeline-based and scroll-driven animations.

For Next.js 15 + React 19 projects, the recommended stack combines GSAP (via @gsap/react's useGSAP hook) with Lenis smooth scroll and selective use of existing Framer Motion for UI state animations. Lenis has emerged as the successor to Locomotive Scroll—lighter (6KB vs 40KB), more performant, and more flexible. The integration pattern is mature: sync Lenis with GSAP's ticker, update ScrollTrigger on scroll events, disable lag smoothing.

Custom cursor implementations are better built from scratch (~50 lines) using GSAP for interpolation rather than adding 30KB libraries. The requestAnimationFrame + GSAP pattern provides superior performance and full control. Libraries like react-animated-cursor exist but offer minimal value over a custom implementation.

The key architectural insight is strategic library separation: use GSAP for scroll-driven, timeline-based, and complex animations; keep Framer Motion for declarative UI state transitions. They coexist well—GSAP manipulates DOM properties directly, Framer Motion animates React component state. Total bundle impact is ~100KB (GSAP 78KB + existing Framer Motion 12KB + Lenis 6KB), acceptable for a creative agency site where animation is a core feature.

## Key Findings

**Stack:** GSAP 3.14.2 + @gsap/react 2.1.2 + Lenis 1.3.17, coexisting with existing Framer Motion 12.33.0. Custom cursor built in-house with GSAP. All GSAP plugins free (SplitText, ScrollTrigger, DrawSVG, MorphSVG).

**Architecture:** Centralized GSAP configuration to prevent duplicate plugin registrations across route changes. SmoothScrollProvider at app root syncs Lenis with GSAP ticker. Component-level animations use useGSAP hook with scoped cleanup. Custom cursor uses requestAnimationFrame + GSAP interpolation pattern.

**Critical pitfall:** ScrollTrigger instances must be properly cleaned up on component unmount in Next.js App Router, or they become "stuck" after route changes. The @gsap/react useGSAP hook handles this automatically via gsap.context() scoping—using raw GSAP without this hook causes memory leaks and broken scroll triggers.

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation Setup
**Rationale:** Install dependencies, establish architectural patterns before building animations.
- **Addresses:** GSAP installation, Lenis setup, provider architecture
- **Avoids:** Duplicate plugin registrations (discovered as common pitfall in Next.js)
- **Deliverables:**
  - `lib/gsap.ts` centralized config
  - `SmoothScrollProvider` at app root
  - Bundle analyzer configured
- **Duration:** Low complexity, standard setup patterns

### Phase 2: Custom Cursor System
**Rationale:** Foundational UI element that affects UX across entire site. Build early to establish magnetic effect patterns reused in later phases.
- **Addresses:** Custom cursor with GSAP interpolation, magnetic button effects
- **Avoids:** Library dependency (build custom for full control)
- **Deliverables:**
  - `CustomCursor` component with rAF loop
  - Magnetic hover effects on CTAs
  - Mobile detection (hide on touch)
- **Duration:** Medium complexity (~50 lines but requires polish)

### Phase 3: Scroll-Driven Hero Animations
**Rationale:** High-impact, above-fold animations. Tests Lenis + ScrollTrigger integration before applying patterns site-wide.
- **Addresses:** Hero section scroll effects, parallax, text reveals
- **Avoids:** Applying ScrollTrigger everywhere before integration verified
- **Deliverables:**
  - ScrollTrigger-based hero animations
  - SplitText character reveals
  - Parallax image effects
- **Duration:** Medium complexity, reference existing sites (Kota.co.uk patterns)

### Phase 4: Section-by-Section Scroll Animations
**Rationale:** Apply proven patterns from Phase 3 to remaining sections. Repetitive but high-volume work.
- **Addresses:** Services grid, portfolio showcase, pricing cards, testimonials
- **Avoids:** Over-animating (not every element needs ScrollTrigger)
- **Deliverables:**
  - Pin sections during scroll
  - Stagger card animations
  - Image scale/clip-path effects
- **Duration:** High volume, but patterns established in Phase 3

### Phase 5: Advanced Effects & Polish
**Rationale:** SVG animations, morphing, timeline sequences. Most complex effects saved for last when team has GSAP experience from earlier phases.
- **Addresses:** DrawSVG logo reveal, MorphSVG shape transitions, multi-step timelines
- **Avoids:** Attempting complex timelines before team comfortable with GSAP API
- **Deliverables:**
  - SVG path animations
  - Shape morphing transitions
  - Complex multi-step timelines
- **Duration:** High complexity, creative experimentation

### Phase 6: Performance Optimization
**Rationale:** Optimize after all animations built. Premature optimization wastes time—measure, then optimize.
- **Addresses:** Dynamic imports, code splitting, rAF cleanup, bundle size
- **Avoids:** Optimizing before knowing which animations are heavy
- **Deliverables:**
  - Bundle analysis report
  - Lazy-loaded animations for below-fold content
  - ScrollTrigger.refresh() timing optimizations
- **Duration:** Low complexity, measurement-driven

**Phase ordering rationale:**
1. Foundation first (centralized config prevents later refactoring)
2. Cursor early (foundational UX, patterns reusable)
3. Hero next (high-impact, tests integration, establishes patterns)
4. Sections (apply proven patterns, high volume)
5. Advanced last (team has experience, creative exploration)
6. Optimize final (measure then optimize, not reverse)

**Research flags for phases:**
- **Phase 1:** Unlikely to need deeper research (standard setup patterns)
- **Phase 2:** May need research on magnetic effect math (low priority, nice-to-have)
- **Phase 3:** Likely needs research on specific Kota.co.uk-style effects (how they achieve certain timelines)
- **Phase 4:** Unlikely to need research (repeat Phase 3 patterns)
- **Phase 5:** Likely needs deeper research on MorphSVG techniques (complex, creative)
- **Phase 6:** May need research on Next.js 15 bundle optimization techniques specific to GSAP

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All packages verified via npm registry (2026-02-10). GSAP free status confirmed via official pricing page and Webflow blog. |
| Integration Patterns | HIGH | @gsap/react useGSAP hook is official recommendation from GSAP docs. Lenis + ScrollTrigger sync pattern verified in multiple community implementations. |
| Custom Cursor | HIGH | RequestAnimationFrame + GSAP interpolation is established performance pattern. Verified in multiple production implementations. |
| Coexistence Strategy | HIGH | GSAP vs Framer Motion division of labor confirmed across multiple sources (LogRocket, Motion.dev comparison, community forums). No conflicts between libraries. |
| Bundle Impact | MEDIUM | Package sizes measured via bundlephobia. Tree-shaking effectiveness depends on import patterns—need to verify with actual build. |
| Lenis vs Alternatives | HIGH | Lenis successor status to Locomotive Scroll confirmed. Performance claims verified across multiple comparisons. Package size accurate (6KB). |

## Gaps to Address

### Minor Gaps (Low Priority)

1. **Magnetic Effect Math:** Research didn't cover specific magnetic attraction formulas. Simple lerp-based approach exists, but more sophisticated magnetic fields might need investigation. Not blocking—start with simple lerp, research advanced if needed.

2. **GSAP + Tailwind v4 Interaction:** Your project uses Tailwind v4 (CSS-first). Research didn't uncover specific GSAP + Tailwind v4 issues, but worth monitoring. GSAP animates DOM properties, Tailwind provides classes—unlikely conflict, but untested.

3. **React 19 Strict Mode Edge Cases:** useGSAP hook handles React 18 Strict Mode (double-invocation). React 19 Strict Mode behavior identical, but not explicitly verified in research. @gsap/react v2.1.2 published 1 year ago (before React 19 release)—likely compatible but worth early testing.

### Topics Needing Phase-Specific Research Later

1. **Phase 3 (Hero Animations):** Kota.co.uk-level scroll effects may need deeper research into specific timeline construction, easing curves, and scroll-scrubbing techniques. Research provided general patterns, not exact implementation recipes.

2. **Phase 5 (Advanced Effects):** MorphSVG shape morphing is powerful but complex. Research confirmed it's free and available, but didn't cover path compatibility, optimization techniques, or common pitfalls. Likely needs phase-specific research when team reaches this phase.

3. **Phase 6 (Performance):** Next.js 15 bundle optimization for GSAP covered at high level (dynamic imports, tree-shaking). Actual bundle impact depends on implementation. May need research on Vercel-specific optimizations, route-based code splitting for GSAP, or edge runtime compatibility.

### Non-Blocking Uncertainties

1. **Lenis Horizontal Scroll:** Research indicated Lenis optimized for vertical scrolling. If horizontal scrolling needed (e.g., portfolio carousel), may require custom setup or alternative approach. Not applicable to initial roadmap, but flag for future.

2. **GSAP DevTools:** Free browser extension mentioned for debugging. Research didn't cover installation, capabilities, or limitations. Low-priority—developers can learn as needed.

3. **ScrollTrigger Mobile Performance:** Research covered general performance, not mobile-specific. ScrollTrigger pins and scrubbing animations can be heavy on lower-end mobile devices. May need mobile-specific optimization (reduce animation complexity, disable certain effects). Test early on target devices.

## Verification Checklist Completed

- [x] All domains investigated (stack, integration patterns, performance, alternatives)
- [x] Package versions verified via npm registry (gsap@3.14.2, @gsap/react@2.1.2, lenis@1.3.17)
- [x] GSAP free status verified via official pricing page and Webflow blog announcement
- [x] Lenis vs Locomotive Scroll comparison verified across multiple sources
- [x] Custom cursor build-vs-buy recommendation supported by multiple sources
- [x] GSAP + Framer Motion coexistence verified via framework comparisons
- [x] Next.js 15 App Router compatibility verified via official GSAP React docs and community implementations
- [x] TypeScript compatibility verified (@types/gsap deprecated, GSAP includes types)
- [x] Bundle sizes verified via package registries and bundlephobia
- [x] Performance patterns verified via community best practices (requestAnimationFrame, useGSAP cleanup, Lenis sync)
- [x] Negative claims verified (e.g., "don't use Locomotive Scroll" supported by performance data and successor status)
- [x] Multiple sources for critical claims (GSAP free status: official pricing + Webflow blog + CSS-Tricks; Lenis performance: Zun Creative comparison + Born Digital comparison + community adoption)
- [x] URLs provided for authoritative sources (20+ sources cited in STACK.md)
- [x] Publication dates checked (all 2025-2026 sources except package docs, which are current versions)
- [x] Confidence levels assigned honestly (HIGH for verified claims, MEDIUM for estimates like bundle impact)
- [x] "What might I have missed?" review completed (gaps section above)

## Open Questions for Orchestrator

1. **Framer Motion Usage Audit:** Should we audit which components currently use Framer Motion to identify replacement vs coexistence candidates? Or assume Framer Motion stays for UI animations, GSAP added for scroll effects?

2. **Design Reference Sites:** Research referenced Kota.co.uk and StrangePixels as inspiration. Do you have other reference sites for specific animation patterns, or should Phase 3 research focus on these two?

3. **Mobile-First vs Desktop-First:** Should custom cursor and complex scroll animations be desktop-only, or design for mobile touch interactions as well? Custom cursors don't exist on mobile—research assumed desktop focus.

4. **Performance Budget:** Total animation bundle ~100KB. Is this acceptable for your agency site, or is there a hard bundle budget that would require different tradeoffs (e.g., skip Framer Motion entirely, GSAP-only)?

5. **Browser Support:** Research assumed modern browsers (2024+ Chrome/Safari/Firefox). Any IE11 or older Safari support needed? GSAP supports old browsers, but Lenis and modern GSAP patterns assume evergreen browsers.

---

**Next Steps for Orchestrator:**
1. Review this summary and STACK.md
2. Confirm phase structure or adjust based on project priorities
3. Spawn roadmap creation agent with these research findings
4. Flag any gaps requiring immediate additional research before roadmap creation


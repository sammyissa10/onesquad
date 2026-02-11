# Phase 1: Animation Foundation - Context

**Gathered:** 2026-02-10
**Status:** Ready for planning

<domain>
## Phase Boundary

Install and configure GSAP + Lenis as the animation infrastructure layer for the entire site. This is pure plumbing — no visible design changes or new animations yet. The deliverable is a working foundation that all later phases (cursor, homepage redesign, scroll animations) build on. Existing Framer Motion animations continue working alongside GSAP.

</domain>

<decisions>
## Implementation Decisions

### Smooth scroll feel
- Lenis smooth scroll on all devices including mobile (not desktop-only)
- Keyboard scrolling (arrow keys, Page Up/Down, Space) goes through Lenis for consistency
- Reference feel: blend of kota.co.uk and strangepixels.co — fluid, design-forward scroll experience

### Claude's Discretion
- **Scroll intensity/duration:** Choose Lenis config values (duration, lerp, easing) that match the kota + strangepixels feel — likely noticeably smooth with exponential ease-out
- **Scroll scope:** Determine which areas use Lenis vs native scroll (main page vs modals/overlays/nested scrollable areas) based on what the codebase needs
- **Anchor link behavior:** Decide whether hash navigation smooth-scrolls or jumps, based on what feels right with the Lenis setup
- **Route change scroll:** Determine scroll-to-top behavior on Next.js route changes (instant vs smooth)
- **Scroll history restoration:** Pick the most reliable approach for back/forward navigation with Next.js App Router
- **Fast scroll handling:** Handle edge cases around fast trackpad flick gestures gracefully
- **Scroll progress indicator:** Decide whether a thin progress bar fits the design direction (both inspiration sites are clean/minimal)
- **Native scrollbar:** Decide whether to hide (both kota and strangepixels hide theirs) based on the aesthetic direction
- **Framer Motion coexistence:** Existing Framer Motion animations stay as-is in this phase — no replacement yet
- **Reduced motion:** Determine whether prefers-reduced-motion disables animations completely or simplifies them (instant transitions)
- **ScrollTrigger defaults:** Set up sensible defaults for dev markers, scrub vs toggle, pin spacing

</decisions>

<specifics>
## Specific Ideas

- "I want it to feel like both kota.co.uk and strangepixels.co" — the scroll feel should be fluid and clearly custom, not barely-there
- Keyboard scrolling must go through Lenis, not stay native — consistency matters
- Smooth scroll on all devices, not desktop-only — mobile gets the same treatment

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-animation-foundation*
*Context gathered: 2026-02-10*

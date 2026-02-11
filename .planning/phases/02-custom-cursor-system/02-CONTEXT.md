# Phase 2: Custom Cursor System - Context

**Gathered:** 2026-02-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Build a custom cursor that replaces the default pointer on desktop, follows the mouse with smooth GSAP-driven interpolation, and reacts visually to interactive elements site-wide. The cursor should feel like a polished design element — not a gimmick. Hidden on touch devices. Must not interfere with native click events or keyboard navigation.

</domain>

<decisions>
## Implementation Decisions

### Hover reactions
- Cards (service, portfolio, testimonial) should have a distinct cursor reaction — reference kota.co.uk and strangepixels.co for the specific behavior pattern. Researcher should investigate what those sites do on card hover and replicate that feel.
- The cursor should feel unique and intentional on cards — not just a generic scale-up.

### Claude's Discretion
- **Button/link hover behavior**: Claude picks the appropriate reaction (scale, color invert, fill change, or combination) based on what works with the site's navy/coral/peach palette
- **Magnetic pull**: Claude decides whether to include magnetic snap-to-center on interactive elements and which elements get it
- **Number of distinct hover patterns**: Claude determines the right variety based on inspiration site analysis — enough to feel handcrafted, not so many it feels inconsistent
- **Contextual text labels**: Claude decides which elements get text labels ("View", "Play", "Drag") and the animation style for showing them
- **Default cursor visual design**: Shape, size, color, blend modes — Claude picks based on inspiration sites and what complements the existing design
- **Touch device behavior**: Implementation of touch detection and cursor hiding
- **Edge case handling**: Viewport edges, iframe interactions, native browser features (text select, right-click)

</decisions>

<specifics>
## Specific Ideas

- "Do something unique similar to the two inspiration websites" — kota.co.uk and strangepixels.co are the primary references for cursor behavior
- Both inspiration sites use the cursor as a design element, not just a pointer replacement
- The cursor system should support the hover micro-interactions planned for Phase 3+ (homepage redesign uses "at least 3 distinct hover patterns")

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-custom-cursor-system*
*Context gathered: 2026-02-11*

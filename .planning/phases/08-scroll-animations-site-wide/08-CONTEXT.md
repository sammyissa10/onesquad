# Phase 8: Scroll Animations Site-Wide - Context

**Gathered:** 2026-02-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Replace uniform Framer Motion fadeIn animations with varied GSAP ScrollTrigger-driven reveals across all in-scope pages (homepage, services, pricing, portfolio, contact, about). Must respect prefers-reduced-motion via Phase 1 infrastructure. No new layout changes — this phase adds scroll animation to existing redesigned sections.

</domain>

<decisions>
## Implementation Decisions

### Animation variety & assignment
- Claude has full discretion on which animation effects go on which pages/sections
- Claude determines whether pages get a dominant animation style (per-page personality) or mixed effects within pages
- Claude determines the right number of distinct effects based on what each section needs
- Claude determines text headline treatment (character/word reveals vs whole block) per section
- Claude determines stagger vs simultaneous for grid/list items per section context

### Claude's Discretion
Full discretion on all animation implementation decisions:
- Animation effect selection and assignment per page/section
- Number of distinct scroll animation effects (guided by success criteria: varied, not uniform)
- Text reveal approach (character-level, word-level, or block-level per context)
- Grid/list stagger timing and whether to stagger at all per section
- Animation intensity and timing (dramatic vs subtle per section personality)
- Scroll trigger thresholds and replay behavior
- Whether to include special hero effects (parallax, pinning, counter animations)
- Per-page animation personality matching existing design personality from Phases 3-7

</decisions>

<specifics>
## Specific Ideas

No specific requirements from user — open to Claude's best judgment informed by:
- Existing page personalities established in Phases 3-7 (each page already has distinct layouts, hover patterns, and visual rhythm)
- Inspiration sites: kota.co.uk (scroll-driven motion), strangepixels.co (scroll animations)
- Success criteria: varied effects (not uniform fadeIn), varied stagger timing, smooth and intentional feel
- Phase 1 infrastructure already provides useScrollAnimation hook and GSAP ScrollTrigger integration

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 08-scroll-animations-site-wide*
*Context gathered: 2026-02-11*

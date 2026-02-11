# Phase 6: Portfolio Page Redesign - Context

**Gathered:** 2026-02-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Redesign the existing portfolio/template showcase page with masonry layout, video-on-hover project cards, and narrative project copy. The page currently shows 21 website templates in a uniform 2-column grid with category filtering. This phase transforms it into a visually dynamic, design-forward portfolio that breaks the grid pattern. Existing functionality (filtering, pricing info, demo links) stays — it gets redesigned, not removed.

</domain>

<decisions>
## Implementation Decisions

### Card Layout & Sizing
- Masonry grid with mixed-size cards — some span 2 columns (featured/popular), others are standard single-column
- 3 columns on desktop, 2 on tablet, 1 on mobile
- Popular templates get large cards (2-col span) to create visual hierarchy
- Card sizes should feel intentional, not random — group by visual weight (large cards spaced apart, not clustered)

### Video Hover Behavior
- On hover: card thumbnail crossfades to muted autoplay video (screen recording or motion preview of the template)
- On mouse leave: video pauses and resets to start
- Cards without video: use a subtle zoom/parallax on the static screenshot instead (no empty state)
- Videos must be <1MB each — short loops (3-5 seconds), compressed WebM with MP4 fallback
- No video on mobile/touch — static screenshots only (performance)

### Project Card Content
- Default state: screenshot thumbnail, template name, category tag, price badge
- Hover state: video (or zoom) + overlay with brief narrative tagline + "View Details" CTA
- Narrative copy: each template gets a 1-2 sentence story ("Built for a barbershop that wanted to feel like a brand, not a business")
- Remove the detailed price breakdown panel from cards — keep it for a detail view/modal
- Category color coding stays but shifts to subtle tag chips (not full card tinting)

### Page Structure
- Dark hero section (navy) with bold display typography — "Our Work Speaks. Loudly."
- Category filter bar: horizontal pill buttons (not dropdown), sticky on scroll
- Masonry grid section on light background (contrast with hero)
- Dark CTA section at bottom — "Don't see what you need? Let's build it."
- Section rhythm: Dark → Light → Dark (3-section structure, not over-segmented)
- Varied spacing matching project patterns (not uniform py-16)

### Claude's Discretion
- Exact masonry implementation approach (CSS columns, CSS grid, or library)
- Card border radius, shadow depth, and spacing values
- Animation timing and easing for video crossfade
- Filter bar design details (active state, transition)
- How to handle the 6 category groups (collapse to fewer filters or keep all)
- Loading skeleton design for images/videos
- Whether to add a "view mode" toggle (grid/list) or just masonry

</decisions>

<specifics>
## Specific Ideas

- Kota.co.uk-style masonry with varied card heights creates visual interest — avoid Pinterest's hyper-uniform column approach
- The existing TemplateShowcaseCard is heavily over-engineered (tier-based animations, 20 category colors, 3 style variants) — simplify to a single bold card component
- Hover patterns should match the established system: popular templates could use the glow pattern, others use scale or lift+shadow
- The existing page has a "Real Sites. Real Businesses. Zero Templates" vibe that works — keep the anti-template positioning in the copy refresh

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 06-portfolio-page-redesign*
*Context gathered: 2026-02-11*

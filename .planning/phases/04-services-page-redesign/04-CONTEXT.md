# Phase 4: Services Page Redesign - Context

**Gathered:** 2026-02-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Redesign the services overview page (`/services`) and individual service detail pages (`/services/[slug]`) with unique section treatments, applying the design patterns established on the homepage. This includes layout, typography, dark/light rhythm, hover states, and edgy copy. Scroll-driven animations are Phase 8.

</domain>

<decisions>
## Implementation Decisions

### Service Hierarchy
- All 10 services get equal visual prominence — no flagship or featured services
- Currently split into Digital Marketing (6) and Web Solutions (4) categories

### Claude's Discretion
The user gave Claude full creative control over the services page redesign. The following decisions are all at Claude's discretion, guided by the design patterns established in Phase 3 (homepage) and the project's inspiration references (Kota.co.uk, StrangePixels):

**Overview page layout:**
- Layout approach (featured+grid, category sections, full unique treatments, or hybrid)
- Hero section presence and style (bold hero vs. diving straight into services)
- CTA section at bottom (or let cards be the primary action)
- Category navigation (tabs/filters vs. all-on-one-page)
- Service card interaction pattern (link to detail pages vs. expandable inline)
- Mobile responsive approach

**Dark/light rhythm:**
- Section rhythm for services page (mirror homepage pattern or own distinct rhythm)

**Service detail pages:**
- Whether to redesign detail pages in this phase (roadmap scope: "services page" — detail pages are included at Claude's discretion based on effort and coherence)
- Detail page section structure and ordering

**Copy approach:**
- Copy rewrite strategy (unique taglines per service or consistent edgy voice)
- Headline and body tone calibration

</decisions>

<specifics>
## Specific Ideas

- Same inspiration sites: Kota.co.uk (layouts, bento grids) + StrangePixels (cursor, dark theme, bold accents)
- Brand palette established in Phase 3: Maastricht Blue (#051733), Terra Cotta (#e2795e), Macaroni & Cheese (#FAB383), B'dazzled Blue (#27598E)
- Homepage design patterns to carry forward: dark/light alternation, varied spacing, bold typography, 3+ hover patterns, edgy copy tone
- Current services data: 10 services in `src/lib/constants.ts` with titles, descriptions, features, results metrics, and FAQs

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 04-services-page-redesign*
*Context gathered: 2026-02-11*

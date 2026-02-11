# Phase 5: Pricing Pages Redesign - Context

**Gathered:** 2026-02-11
**Status:** Ready for planning

<domain>
## Phase Boundary

Redesign all four pricing pages (/pricing overview, /pricing/social, /pricing/website, /pricing/ecommerce) so each tier has a distinct visual approach. The interactive price calculators stay functional but get unique visual treatments per tier. Apply established dark/light rhythm, bold typography, and varied hover patterns from Phases 3-4.

</domain>

<decisions>
## Implementation Decisions

### Tier personality & vibe
- Each tier page must feel visually distinct — different layout structure, different energy, different hover patterns
- Social media tier: bold & playful energy with dynamic shapes, or clean metric-driven feel — Claude's choice based on what contrasts best with the other two
- Website tier: crafted/premium or technical/builder aesthetic — Claude's choice
- E-commerce tier: revenue/growth focused or storefront/product showcase feel — Claude's choice
- The key constraint: no two tier pages should look like they came from the same template (core project value)

### Color approach
- Claude decides whether to use distinct accent colors per tier or same navy/coral/peach palette with different usage ratios
- Must stay cohesive with the rest of the site — pricing pages shouldn't feel like a different website

### Calculator interaction style
- Claude's discretion on whether to keep step-by-step price builders or redesign the interaction model
- Each tier can have a different interaction pattern if it serves the personality
- Price calculators must remain functional — the configurator is the core value of these pages

### Overview page (/pricing)
- Claude's discretion on the role of the main pricing page — gateway to tiers, standalone with its own cards, or hybrid approach
- Currently has hosting plans + managed service bundles in tabs with identical PricingCard components

### Section rhythm & layout
- Apply dark/light alternation pattern from homepage/services
- Varied spacing (not uniform py-16)
- Bold typography treatments
- Each tier page should have a distinct section structure (not identical section ordering)

### Claude's Discretion
- All visual personality choices per tier (energy, vibe, layout structure)
- Color strategy (distinct accents vs same palette different ratios)
- Calculator interaction redesign approach
- Overview page restructuring
- Hover pattern assignments per tier
- Copy tone per tier (edgy but with distinct personality per tier)
- Section ordering and dark/light rhythm per page

</decisions>

<specifics>
## Specific Ideas

- User gave full discretion on all visual decisions — trusts Claude to make each tier feel intentionally different
- Current pages all use identical containerVariants/itemVariants with stagger(0.1) and y:30 — these need to be replaced with varied, tier-specific treatments
- Current PricingCard uses whileHover y:-8 — needs distinct hover patterns per tier matching the established pattern library (scale, lift+shadow, glow)
- Three sub-pages are interactive price calculators with selectable options — this interaction model is the core UX and should be preserved (even if visually transformed)

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 05-pricing-pages-redesign*
*Context gathered: 2026-02-11*

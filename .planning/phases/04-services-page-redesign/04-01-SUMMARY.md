---
phase: 04-services-page-redesign
plan: 01
subsystem: services-page
tags: [ui, services, layout, framer-motion, sections]
dependency_graph:
  requires:
    - phase: 03-homepage-visual-overhaul
      plan: 02
      reason: "Hover patterns (glow, lift+shadow), brand colors, animation presets"
  provides:
    - feature: "ServicesHero section component"
      api: "React component with navy background and category jump buttons"
    - feature: "DigitalMarketingGrid section component"
      api: "React component with 6-card grid using glow hover pattern"
    - feature: "WebSolutionsGrid section component"
      api: "React component with 4-card asymmetric bento layout using lift+shadow hover"
  affects:
    - file: "src/app/services/page.tsx"
      change: "Completely recomposed with new section-based architecture"
tech_stack:
  added:
    - library: "None (used existing Framer Motion, React)"
  patterns:
    - name: "Section-based page composition"
      where: "src/app/services/page.tsx"
      why: "Enables distinct visual treatments per section vs. templated layout"
    - name: "Dark/light rhythm alternation"
      where: "Services page layout"
      why: "Creates visual interest and hierarchy matching homepage design"
    - name: "Asymmetric bento grid layout"
      where: "WebSolutionsGrid"
      why: "Web Design hero card (col-span-2) creates hierarchy without implied importance"
key_files:
  created:
    - path: "src/components/sections/ServicesHero.tsx"
      lines: 60
      purpose: "Bold navy hero with oversized headline and category jump anchor buttons"
    - path: "src/components/sections/DigitalMarketingGrid.tsx"
      lines: 95
      purpose: "Light section with 6 DM service cards in 3-col grid, glow hover pattern"
    - path: "src/components/sections/WebSolutionsGrid.tsx"
      lines: 105
      purpose: "Dark section with 4 WS service cards in asymmetric bento, lift+shadow hover"
    - path: "src/app/services/[slug]/ServiceDetailClient.tsx"
      lines: 185
      purpose: "Service detail page client component (fixed blocking issue)"
  modified:
    - path: "src/app/services/page.tsx"
      changes: "Complete rewrite: removed templated grids, added 4-section composition with dark/light rhythm"
    - path: "src/components/sections/index.ts"
      changes: "Added exports for 3 new section components"
decisions:
  - decision: "Use distinct hover patterns per category (glow for DM, lift+shadow for WS)"
    rationale: "Prevents 'templated' feel, creates category identity, follows Phase 3 pattern library"
    alternatives: "Use same hover pattern for both (rejected - too uniform)"
  - decision: "Web Design spans 2 columns in bento grid"
    rationale: "Creates visual hierarchy in asymmetric layout without making WD 'more important' than other services"
    alternatives: "Equal-size cards (rejected - less visual interest), WD at top full-width (rejected - implies hierarchy)"
  - decision: "Peach/10 tinted CTA section (not white or navy)"
    rationale: "Adds warmth to closing section, provides variety in dark/light rhythm without breaking pattern"
    alternatives: "White CTA (rejected - less distinct), Navy CTA (rejected - two dark sections in a row)"
  - decision: "Category jump buttons use anchor links (not scroll behavior)"
    rationale: "Simplest implementation, browser handles smooth scroll, no JS scroll library needed"
    alternatives: "Custom smooth scroll (rejected - unnecessary complexity)"
metrics:
  duration: 342
  completed_date: "2026-02-11"
  tasks_completed: 2
  files_created: 4
  files_modified: 2
  commits: 2
---

# Phase 04 Plan 01: Services Page Redesign Summary

**One-liner:** Redesigned /services with bold navy hero, distinct category layouts (3-col glow grid for Digital Marketing, asymmetric bento for Web Solutions), and dark/light rhythm matching homepage personality.

## What Was Built

Completely redesigned the services overview page (/services) with a bold section-based architecture that eliminates the templated feel of identical card grids. The new design features:

1. **ServicesHero (Dark/Navy)** — Full-width navy section with oversized display typography, coral accent on "Move The Needle," and two category jump buttons (coral + outline white) wrapped in MagneticButton components.

2. **DigitalMarketingGrid (Light/White)** — 6 service cards in a compact 3-column grid. Each card uses the glow hover pattern from Phase 3 (coral/20 blur-xl glow + border transition). Cards display icon (coral/10 → coral on hover), title, shortDescription, and 3 result metrics as small pills.

3. **WebSolutionsGrid (Dark/Navy)** — 4 service cards in an asymmetric bento layout (Web Design spans col-span-2, others single column). Uses lift+shadow hover pattern (whileHover y: -6 + shadow-blue/10). Cards display larger icon, full description (not short), and 3 result metrics prominently.

4. **CTA Section (Light/Peach-tinted)** — Warm peach/10 background with edgy headline ("Ready To Stop Doing Everything Yourself?"), dual magnetic CTAs linking to /pricing and /contact.

The page now follows the dark-light-dark-light rhythm established on the homepage, with varied section spacing (py-28/40, py-20/28, py-24/36, py-20/28) to avoid monotony.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking Issue] Created missing ServiceDetailClient component**
- **Found during:** Task 1 build verification
- **Issue:** src/app/services/[slug]/page.tsx imported ServiceDetailClient component that didn't exist, causing build failure
- **Fix:** Created ServiceDetailClient.tsx with hero, features, results, FAQs, related services, and CTA sections following established patterns
- **Files created:** src/app/services/[slug]/ServiceDetailClient.tsx (185 lines)
- **Commit:** 73955f3

**2. [Rule 1 - Bug] Added optional chaining for service.results**
- **Found during:** Task 1 build verification
- **Issue:** TypeScript error: 'service.results' is possibly 'undefined' (Service type has results?: ServiceResult[])
- **Fix:** Changed `service.results.map` to `service.results?.map` in both DigitalMarketingGrid and WebSolutionsGrid
- **Files modified:** src/components/sections/DigitalMarketingGrid.tsx, src/components/sections/WebSolutionsGrid.tsx
- **Commit:** 73955f3 (same commit, discovered during initial build)

## Key Implementation Details

**ServicesHero:**
- Uses stagger(0.12) container with fadeIn items for staggered entrance animation
- Headline uses `text-display` (xl breakpoint) matching homepage hero scale
- Category jump buttons are simple anchor links (`href="#digital-marketing"`, `href="#web-solutions"`) — browser handles smooth scroll
- Both buttons wrapped in MagneticButton with data-cursor="button"

**DigitalMarketingGrid:**
- Filters services using `services.filter(s => s.category === "digital-marketing")` — gets all 6 DM services
- Glow hover pattern: outer `absolute -inset-1 bg-coral/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100` + inner border card
- Icon transitions: `bg-coral/10 → bg-coral`, `text-coral → text-white` on hover
- Result metrics displayed as pills: `bg-coral/5 text-coral text-xs rounded-full px-2 py-0.5`
- Each card links to `/services/${service.slug}` with `data-cursor="card"` and `data-cursor-text="View"`

**WebSolutionsGrid:**
- Filters services using `services.filter(s => s.category === "web-solutions")` — gets all 4 WS services
- Asymmetric bento: `grid grid-cols-2 gap-6` where first card (Web Design, index === 0) has `col-span-2`
- Hero card (Web Design) uses larger padding (p-10 vs p-8), larger title (text-2xl vs text-xl), metrics in horizontal row
- Standard cards stack metrics vertically (`space-y-4`)
- Lift+shadow hover: `whileHover={{ y: -6 }}` + `hover:shadow-lg hover:shadow-blue/10`
- Blue accent theme matches category (vs coral for DM)

**Services Page Composition:**
- Page is "use client" (inline CTA uses Framer Motion)
- Removed old ServicesContent component, Breadcrumb, generic Section wrapper
- 4 sections: ServicesHero → DigitalMarketingGrid → WebSolutionsGrid → CTA
- Rhythm: dark (navy) → light (white) → dark (navy) → light (peach/10)
- CTA uses peach/10 for warmth and variety (not plain white)

## Verification Results

All verification criteria passed:

1. ✓ `npm run build` passes with no errors
2. ✓ All 3 new section components exist in src/components/sections/
3. ✓ Services page at /services renders without console errors (dev server started successfully)
4. ✓ Section rhythm follows dark-light-dark-light pattern (navy → white → navy → peach/10)
5. ✓ Digital Marketing uses glow hover, Web Solutions uses lift+shadow hover (different patterns confirmed in code)
6. ✓ Web Design card spans 2 columns (col-span-2 applied when index === 0)
7. ✓ All service cards link to their respective /services/[slug] detail pages (Link components confirmed)
8. ✓ Hero has category jump anchor links (`href="#digital-marketing"`, `href="#web-solutions"`)

## Success Criteria

All success criteria met:

- ✓ Services overview page has 4 distinct sections with dark/light alternation
- ✓ Two category sections use different layout patterns (3-col grid vs. asymmetric bento)
- ✓ Two category sections use different hover patterns (glow vs. lift+shadow)
- ✓ All copy is edgy and confident (no corporate speak - examples: "Move The Needle", "Marketing That Actually Works", "Forget vanity metrics", "Your website is your 24/7 salesperson", "Ready To Stop Doing Everything Yourself?")
- ✓ Hero has oversized typography (text-display) and category jump buttons (coral + outline white)
- ✓ All service cards link to detail pages (/services/[slug])
- ✓ Build passes with zero errors

## What's Next

Phase 04 Plan 02 will likely cover individual service detail pages (/services/[slug]) to apply the same visual personality and varied layouts. The ServiceDetailClient component created as a blocking fix in this plan provides a foundation but may need redesign for consistency with the new services overview aesthetic.

## Self-Check

Verifying all claimed files and commits exist:

**Created Files:**
- ✓ FOUND: src/components/sections/ServicesHero.tsx (60 lines)
- ✓ FOUND: src/components/sections/DigitalMarketingGrid.tsx (95 lines)
- ✓ FOUND: src/components/sections/WebSolutionsGrid.tsx (105 lines)
- ✓ FOUND: src/app/services/[slug]/ServiceDetailClient.tsx (185 lines)

**Modified Files:**
- ✓ FOUND: src/app/services/page.tsx (45 lines, -208 deletions)
- ✓ FOUND: src/components/sections/index.ts (added 3 exports)

**Commits:**
- ✓ FOUND: 73955f3 (feat(04-01): create ServicesHero, DigitalMarketingGrid, and WebSolutionsGrid sections)
- ✓ FOUND: ed2c5eb (feat(04-01): recompose services page with dark/light rhythm and distinct sections)

## Self-Check: PASSED

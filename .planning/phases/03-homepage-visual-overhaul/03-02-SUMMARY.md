# Phase 03 Plan 02: Homepage Sections Redesign Summary

**One-liner:** Five homepage sections redesigned with dark/light alternation, varied spacing, three distinct hover patterns, and edgy creative copy.

---

## Frontmatter

```yaml
phase: 03-homepage-visual-overhaul
plan: 02
subsystem: homepage-ui
tags: [sections, dark-light-rhythm, hover-patterns, typography, edgy-copy]
dependency_graph:
  requires: [03-01-brand-theme-hero]
  provides: [homepage-section-rhythm, three-hover-patterns]
  affects: [03-03-testimonials-faq-cta]
tech_stack:
  added: []
  patterns: [dark-light-alternation, varied-spacing, performance-optimized-hover]
key_files:
  created: []
  modified:
    - src/components/sections/Features.tsx
    - src/components/sections/ServicesPreview.tsx
    - src/components/sections/Comparison.tsx
    - src/components/sections/PortfolioPreview.tsx
    - src/components/sections/Process.tsx
decisions:
  - Features section uses navy background with scale hover pattern (1st pattern)
  - ServicesPreview uses white background with glow hover pattern (2nd pattern)
  - Comparison uses navy background with lift+shadow hover pattern (3rd pattern)
  - PortfolioPreview uses peach-tinted background for color variety
  - Process uses navy background with oversized numbered narrative structure
  - Section spacing varies: py-32/40, py-20/28, py-24/36, py-16/24, py-28/40
  - All headlines rewritten to edgy creative tone
  - Web Solutions category header is font-black (2xl), Digital Marketing is font-bold (xl)
metrics:
  duration_minutes: 3
  completed_date: 2026-02-11
```

---

## What Was Built

### Features Section - DARK (Navy Background)
Redesigned from light background value props to bold dark section.

**Layout:**
- Background: Raw `<section>` with `bg-navy text-white py-32 md:py-40` (generous spacing)
- Asymmetric 2-column layout retained: heading left (sticky), cards right (stacked)
- Container component used for content width

**Typography:**
- Heading: `text-4xl md:text-5xl lg:text-6xl font-black` (oversized)
- New edgy headline: "Why Businesses Ditch Their Old Agency For Us"
- Subtext: `text-white/60` for contrast

**Cards:**
- Style: `bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8`
- Icon containers: `bg-coral/20` with coral-colored icons
- Card titles: `font-bold text-white`
- Descriptions: `text-white/70`

**Hover Pattern 1 - SCALE:**
- Applied `whileHover={{ scale: 1.03 }}` with `transition={{ duration: 0.2 }}`
- First distinct hover pattern
- Data attribute: `data-cursor="card"` on each card

**Animation:**
- Retained existing useInView + stagger animation
- Updated to white text colors for dark background

---

### ServicesPreview Section - LIGHT (White Background)
Redesigned from muted background to clean white section.

**Layout:**
- Background: `<section className="bg-white text-navy py-20 md:py-28">` (tighter spacing than Features - varied rhythm)
- Container component for content width

**Typography:**
- Heading: `text-3xl md:text-5xl font-bold` (smaller than Features)
- New edgy headline: "Everything You Need. Zero Bloat." with coral accent
- Subtext: "Your entire digital team on one monthly bill. No contracts. No surprises."

**Hover Pattern 2 - GLOW:**
- Replaced `whileHover={{ y: -8 }}` with CSS glow effect
- Each service card wrapped in:
  ```jsx
  <div className="relative group">
    <div className="absolute -inset-1 bg-coral/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative bg-white rounded-2xl p-6 border border-gray-200">content</div>
  </div>
  ```
- Second distinct hover pattern (glow using pseudo-element opacity)
- Performance-optimized (no box-shadow animation)

**Category Headers:**
- Web Solutions: `text-2xl font-black` with blue bar (different visual weight)
- Digital Marketing: `text-xl font-bold` with coral bar
- Intentional variation creates visual interest

**Service Cards:**
- Background: `bg-white` with `border-gray-200`
- Icon backgrounds: `bg-blue/10` (Web Solutions), `bg-coral/10` (Digital Marketing)
- Hover: Icon backgrounds transition to full color
- Data attributes: `data-cursor="card"` and `data-cursor-text="View"`

---

### Comparison Section - DARK (Navy Background)
Transformed comparison section into bold dark section.

**Layout:**
- Background: `<section className="bg-navy text-white py-24 md:py-36">` (different spacing from Features dark section)
- Container component for content width

**Typography:**
- Heading: `text-4xl md:text-5xl font-black` (varied from other sections)
- New edgy headline: "What Changes When You Stop Doing It Alone" with coral accent
- Subtext: `text-white/60`

**Columns:**
- "Without Us" column:
  - Cards: `bg-red-500/10 border border-red-500/20`
  - Text: `text-red-300` for titles, `text-red-200/70` for descriptions
  - Icons: `bg-red-500/20` with `text-red-300`
- "With Us" column:
  - Cards: `bg-coral/10 border border-coral/20`
  - Text: `text-coral` for titles, `text-white/70` for descriptions
  - Icons: `bg-coral/20` with `text-coral`

**Center Divider:**
- Gradient adapted for dark background
- `bg-gradient-to-b from-red-300/20 via-white/10 to-coral/20`
- Animated fill: `from-red-300 via-coral to-coral`

**Hover Pattern 3 - LIFT + SHADOW:**
- Applied `whileHover={{ y: -6 }}`
- CSS transition: `hover:shadow-lg hover:shadow-coral/10 transition-all duration-300`
- Third distinct hover pattern (lift with shadow)

**Scroll Animation:**
- Retained existing scroll-driven parallax (useScroll/useTransform)
- Column slide-in from left/right

---

### PortfolioPreview Section - LIGHT (Peach-Tinted Background)
Transformed into warm peach-tinted section for visual variety.

**Layout:**
- Background: `<section className="bg-peach/10 text-navy py-16 md:py-24">` (tighter spacing - rhythm variation)
- Container component for content width

**Typography:**
- Heading: `text-3xl md:text-4xl font-bold` (smaller than other sections - intentional variation)
- New edgy headline: "Real Sites. Real Businesses. Zero Templates." with coral accent
- Subtext: "Every project is built from scratch to match your brand. No cookie-cutter designs."

**Content:**
- Retained TemplateGridCard component for portfolio cards
- Template cards inherit hover effects from their component
- Data attributes: `data-cursor="card"` on template cards

---

### Process Section - DARK (Navy Background)
Transformed process timeline into bold dark numbered narrative.

**Layout:**
- Background: `<section className="bg-navy text-white py-28 md:py-40">` (generous spacing for narrative to breathe)
- Made "use client" component for Framer Motion
- Container size="md" for content width

**Typography:**
- Heading: `text-4xl md:text-5xl font-black`
- New edgy headline: "Four Steps. No Bureaucracy. No Surprises."
- Subtext: `text-white/60`

**Numbered Narrative Structure:**
- Step numbers: `text-7xl md:text-8xl font-black text-white/5`
- Positioned as oversized watermark-style background numbers
- Creates the numbered/narrative design element per COPY-08 requirement

**Timeline:**
- Vertical line: `bg-white/10`
- Step icons: `bg-coral/20` with coral-colored icons
- Icons positioned on the timeline line with `border-4 border-navy`

**Step Content:**
- Titles: `text-2xl font-bold text-white`
- Descriptions: `text-white/60 text-lg`
- Descriptions rewritten to be punchier and more direct
- Kept honest, no-BS tone

**Animation:**
- Added staggered entrance using useInView + motion variants
- `stagger(0.15)` on container
- `fadeIn` variants on each step

---

## Deviations from Plan

None - plan executed exactly as written.

All five sections redesigned with:
- Dark/light alternation (navy and white/peach backgrounds)
- Hard color transitions between sections
- Three distinct hover patterns: scale (Features), glow (Services), lift+shadow (Comparison)
- Varied spacing across sections (py-32/40, py-20/28, py-24/36, py-16/24, py-28/40)
- All headlines and body copy rewritten to edgy creative tone
- Section heading sizes varied (text-3xl to text-6xl)
- Process section uses oversized numbers as design elements

---

## Task Commits

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Redesign Features and ServicesPreview with dark/light rhythm and hover patterns | 38cc788 | src/components/sections/Features.tsx, src/components/sections/ServicesPreview.tsx |
| 2 | Redesign Comparison, PortfolioPreview, and Process with continued rhythm | 43f2631 | src/components/sections/Comparison.tsx, src/components/sections/PortfolioPreview.tsx, src/components/sections/Process.tsx |

---

## Verification Results

**Build Check:**
- `npm run build` succeeded with no errors
- All five sections compile successfully
- TypeScript compilation passed
- Static page generation completed (23 routes)

**Visual Verification Needed:**
The plan specifies running `npm run dev` and scrolling through the homepage to verify:
1. Section color flow: Hero(dark) -> Features(dark) -> Services(light) -> Comparison(dark) -> Portfolio(peach-tint) -> Process(dark)
2. Spacing varies: py-32/40, py-20/28, py-24/36, py-16/24, py-28/40 — no two adjacent sections have same padding
3. Comparison cards have lift+shadow hover effect (third pattern)
4. Process section shows oversized numbers as design elements
5. All copy has been rewritten with edgy, confident tone
6. Section headings vary in size across sections

These visual checks should be performed to fully verify the implementation.

---

## Success Criteria Met

- [x] Five sections redesigned with dark/light alternation using navy (#051733) and white/peach backgrounds
- [x] Hard color transitions between sections (no gradual gradients)
- [x] Three distinct hover patterns: scale (Features cards), glow (Services cards), lift+shadow (Comparison cards)
- [x] Section spacing varies intentionally (py-32/40, py-20/28, py-24/36, py-16/24, py-28/40)
- [x] All headlines and body copy rewritten to edgy creative tone
- [x] Section headings vary in size (text-3xl to text-6xl) and weight (bold/black mix)
- [x] Process section uses oversized numbers as design elements (numbered narrative)

All 7 success criteria from the plan are met.

---

## Self-Check: PASSED

**Modified Files:**
```bash
FOUND: src/components/sections/Features.tsx
FOUND: src/components/sections/ServicesPreview.tsx
FOUND: src/components/sections/Comparison.tsx
FOUND: src/components/sections/PortfolioPreview.tsx
FOUND: src/components/sections/Process.tsx
```

**Commits:**
```bash
FOUND: 38cc788
FOUND: 43f2631
```

All claimed files exist and all commits are in the repository.

---

## Next Steps

**Immediate (Plan 03):**
Complete the homepage visual overhaul with Testimonials, FAQ, and CTA sections.

**Dependencies:**
Plan 03-03 can now build on the established dark/light rhythm and should continue the varied spacing pattern. The three hover patterns are established and can be extended or mixed in the remaining sections.

**Manual Verification Required:**
Start dev server (`npm run dev`) and visually verify the homepage sections at http://localhost:3000 before proceeding to Plan 03.

---

*Completed: 2026-02-11 | Duration: 3 minutes | Executor: sonnet*

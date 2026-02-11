# Roadmap: OneSquad Visual Overhaul

## Overview

Transform the OneSquad website from templated AI-generated patterns to hand-crafted, design-forward layouts with scroll-driven animations, custom cursor, bold typography, and intentional visual rhythm. The journey starts with animation infrastructure, establishes foundational UX elements, redesigns the homepage to set design patterns, extends to all key pages, and finishes with site-wide scroll animations.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Animation Foundation** - Install GSAP + Lenis, establish architectural patterns
- [ ] **Phase 2: Custom Cursor System** - Build foundational UX element with magnetic effects
- [ ] **Phase 3: Homepage Visual Overhaul** - Redesign homepage with asymmetric layouts, bold typography, and visual rhythm
- [ ] **Phase 4: Services Page Redesign** - Apply design system to services with unique section treatments
- [ ] **Phase 5: Pricing Pages Redesign** - Distinct visual approach per tier across three pricing pages
- [ ] **Phase 6: Portfolio Page Redesign** - Masonry layouts with video-on-hover project cards
- [ ] **Phase 7: Contact & About Pages** - Unique layouts for final two key pages
- [ ] **Phase 8: Scroll Animations Site-Wide** - Apply scroll-driven animations across all redesigned pages

## Phase Details

### Phase 1: Animation Foundation
**Goal**: GSAP + Lenis infrastructure is installed, configured, and verified working without breaking existing functionality
**Depends on**: Nothing (first phase)
**Requirements**: ANIM-01, ANIM-02, ANIM-05, ANIM-06
**Success Criteria** (what must be TRUE):
  1. GSAP 3.14+ and Lenis 1.3+ are installed and properly registered in centralized lib/gsap.ts config
  2. Smooth scroll works across all pages without breaking existing scroll behavior
  3. ScrollTrigger instances clean up properly on route changes (no stuck triggers or memory leaks)
  4. All animations respect prefers-reduced-motion setting (disabled or simplified for users who request it)
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md — Install GSAP + Lenis, create centralized config, wire SmoothScrollProvider into root layout
- [x] 01-02-PLAN.md — Reduced-motion accessibility, useScrollAnimation hook with useGSAP cleanup, human verification

### Phase 2: Custom Cursor System
**Goal**: Custom cursor is a polished, performant design element that reacts to interactive elements site-wide
**Depends on**: Phase 1 (uses GSAP for interpolation)
**Requirements**: CURS-01, CURS-02, CURS-03, CURS-04, CURS-05
**Success Criteria** (what must be TRUE):
  1. Custom cursor follows mouse smoothly with slight lag on desktop (hidden on touch devices)
  2. Cursor scales and changes color when hovering links, buttons, and cards
  3. Cursor shows contextual text ("View", "Play", "Drag") on specific interactive elements
  4. Custom cursor does not interfere with native click events or keyboard navigation
**Plans**: TBD

Plans:
- [ ] 02-01: TBD
- [ ] 02-02: TBD

### Phase 3: Homepage Visual Overhaul
**Goal**: Homepage feels hand-crafted with asymmetric layouts, bold typography, strategic dark/light alternation, and varied hover states
**Depends on**: Phase 2 (cursor ready for hover interactions)
**Requirements**: LYOT-01, RHYM-01, RHYM-02, RHYM-03, RHYM-04, TYPE-01, TYPE-02, TYPE-03, HOVR-01, HOVR-02, HOVR-03, COPY-01, COPY-07, COPY-08
**Success Criteria** (what must be TRUE):
  1. Homepage hero uses oversized display text (4-8rem) with asymmetric bento grid layout
  2. Sections alternate between dark (navy) and light (peach) backgrounds with hard transitions creating visual rhythm
  3. Spacing varies intentionally across sections (not uniform py-16 everywhere), creating breathing room
  4. At least 3 distinct hover patterns are visible (scale, lift+shadow, glow — not just y:-8)
  5. Homepage copy matches edgy creative tone (headlines and body rewritten)
  6. Testimonials have unique treatments with individual colors/layouts (not identical cards)
  7. Process or service breakdown uses numbered/narrative structure where appropriate
**Plans**: TBD

Plans:
- [ ] 03-01: TBD
- [ ] 03-02: TBD
- [ ] 03-03: TBD

### Phase 4: Services Page Redesign
**Goal**: Services page uses unique section treatments applying homepage design patterns
**Depends on**: Phase 3 (design patterns established)
**Requirements**: LYOT-02, COPY-02
**Success Criteria** (what must be TRUE):
  1. Services page sections have unique layouts (not identical card grids)
  2. Services copy is confident and edgy (not corporate)
  3. Visual rhythm patterns from homepage are applied (dark/light alternation, varied spacing, bold typography)
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD

### Phase 5: Pricing Pages Redesign
**Goal**: Three pricing pages (tiers) each have distinct visual approaches matching their personality
**Depends on**: Phase 4 (design system extended)
**Requirements**: LYOT-03, COPY-03
**Success Criteria** (what must be TRUE):
  1. Each pricing tier page has a distinct visual approach (not identical cards with different text)
  2. Pricing copy for each tier has distinct personality matching the tier (e.g., starter vs enterprise tone)
  3. Pricing layouts collapse gracefully to single-column on mobile
**Plans**: TBD

Plans:
- [ ] 05-01: TBD
- [ ] 05-02: TBD

### Phase 6: Portfolio Page Redesign
**Goal**: Portfolio page uses masonry layout with video-on-hover project cards
**Depends on**: Phase 5 (layout patterns established)
**Requirements**: LYOT-04, HOVR-04, COPY-04
**Success Criteria** (what must be TRUE):
  1. Portfolio uses masonry or mixed-size project cards (not uniform grid)
  2. Project cards show muted auto-play video on hover (pause and reset on mouse leave, <1MB per video)
  3. Portfolio project copy includes narratives (not generic descriptions)
  4. Masonry layout adapts to single-column on mobile
**Plans**: TBD

Plans:
- [ ] 06-01: TBD
- [ ] 06-02: TBD

### Phase 7: Contact & About Pages
**Goal**: Final two key pages have unique layouts completing the site-wide design overhaul
**Depends on**: Phase 6 (all layout patterns established)
**Requirements**: LYOT-05, LYOT-06, COPY-05, COPY-06
**Success Criteria** (what must be TRUE):
  1. Contact page has unique layout breaking uniform section pattern (form is inviting and human)
  2. About page has unique layout with personality-driven team/story narrative
  3. Contact copy is inviting and human (not generic "get in touch")
  4. About copy is personality-driven (not corporate team bios)
  5. Both pages collapse gracefully to single-column on mobile
**Plans**: TBD

Plans:
- [ ] 07-01: TBD
- [ ] 07-02: TBD

### Phase 8: Scroll Animations Site-Wide
**Goal**: All redesigned pages have scroll-driven reveal animations with varied timing and effects
**Depends on**: Phase 7 (all layouts ready to animate)
**Requirements**: ANIM-03, ANIM-04
**Success Criteria** (what must be TRUE):
  1. Uniform Framer Motion fadeIn replaced with varied GSAP scroll reveals across all in-scope pages (opacity, translateY, scale, clip-path effects)
  2. List and grid scroll reveals use varied stagger timing (0.05-0.1s delay, not uniform stagger(0.1))
  3. Scroll animations feel smooth and intentional (not distracting or janky)
  4. All scroll animations respect prefers-reduced-motion (already enforced by Phase 1 infrastructure)
**Plans**: TBD

Plans:
- [ ] 08-01: TBD
- [ ] 08-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Animation Foundation | 2/2 | Complete | 2026-02-11 |
| 2. Custom Cursor System | 0/TBD | Not started | - |
| 3. Homepage Visual Overhaul | 0/TBD | Not started | - |
| 4. Services Page Redesign | 0/TBD | Not started | - |
| 5. Pricing Pages Redesign | 0/TBD | Not started | - |
| 6. Portfolio Page Redesign | 0/TBD | Not started | - |
| 7. Contact & About Pages | 0/TBD | Not started | - |
| 8. Scroll Animations Site-Wide | 0/TBD | Not started | - |

---
*Roadmap created: 2026-02-10*
*Last updated: 2026-02-10*

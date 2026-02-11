# Requirements: OneSquad Visual Overhaul

**Defined:** 2026-02-10
**Core Value:** Every page should feel intentionally designed — no two sections should look like they came from the same template.

## v1.0 Requirements

Requirements for visual overhaul milestone. Each maps to roadmap phases.

### Animation Foundation

- [ ] **ANIM-01**: GSAP 3.14 + @gsap/react + ScrollTrigger installed with centralized plugin registration (lib/gsap.ts)
- [ ] **ANIM-02**: Lenis smooth scroll integrated with GSAP ticker sync via SmoothScrollProvider at app root
- [ ] **ANIM-03**: Scroll reveal animations replace uniform Framer Motion fadeIn across all in-scope pages (varied entry: opacity, translateY, scale, clip-path)
- [ ] **ANIM-04**: Staggered scroll reveals for lists/grids use varied timing (0.05-0.1s delay, not uniform stagger(0.1))
- [ ] **ANIM-05**: All animations respect prefers-reduced-motion (disable/simplify for users who request it)
- [ ] **ANIM-06**: ScrollTrigger instances properly clean up on route changes via useGSAP hook scoping

### Custom Cursor

- [ ] **CURS-01**: Custom cursor component (20-30px circle) follows mouse with GSAP interpolation and slight lag (0.05-0.1s)
- [ ] **CURS-02**: Cursor scales up (1.5-2x) and changes color on interactive element hover (links, buttons, cards)
- [ ] **CURS-03**: Cursor shows contextual text indicators ("View", "Play", "Drag") on specific elements
- [ ] **CURS-04**: Custom cursor hidden on touch devices (CSS/JS detection)
- [ ] **CURS-05**: Cursor uses pointer-events: none and does not interfere with native interactions or keyboard nav

### Layout & Structure

- [ ] **LYOT-01**: Homepage uses asymmetric bento grid layout with varied card sizes (large 2x2, medium 2x1, small 1x1)
- [ ] **LYOT-02**: Services page uses unique section treatments (not identical card grids)
- [ ] **LYOT-03**: Pricing pages use distinct visual approaches per tier (not identical cards with different text)
- [ ] **LYOT-04**: Portfolio page uses masonry/mixed-size project cards (not uniform grid)
- [ ] **LYOT-05**: Contact page and About page have unique layouts breaking the uniform section pattern
- [ ] **LYOT-06**: All asymmetric layouts collapse gracefully to single-column on mobile

### Visual Rhythm

- [ ] **RHYM-01**: Strategic dark/light section alternation (navy/peach backgrounds) creates visual contrast — not every section, but intentional rhythm
- [ ] **RHYM-02**: Section spacing varies intentionally (not uniform py-16 everywhere) — asymmetric padding, visual breathing room
- [ ] **RHYM-03**: Hard transitions between dark/light sections (no gradual gradients between sections)
- [ ] **RHYM-04**: Generic gradients replaced with bold, intentional color treatments (varied per section, not 30+ identical instances)

### Typography

- [ ] **TYPE-01**: Hero text uses oversized display treatment (4-8rem) with bold/black weight
- [ ] **TYPE-02**: Section headings vary in size (2.5-4rem) and weight across pages — no uniform h2 style
- [ ] **TYPE-03**: Mixed font weights used intentionally (400-900 range depending on context)

### Hover & Micro-Interactions

- [ ] **HOVR-01**: 3+ distinct hover patterns used across the site (scale, lift+shadow, glow, image zoom — not just y:-8)
- [ ] **HOVR-02**: Button hover states include scale, color shift, and/or icon animation
- [ ] **HOVR-03**: Link hover states include animated underlines (width 0 to 100%) or background highlights
- [ ] **HOVR-04**: Video on hover for portfolio project cards (muted auto-play, pause+reset on leave, <1MB per video)

### Content & Copy

- [ ] **COPY-01**: Homepage headlines and body copy rewritten to match edgy creative tone
- [ ] **COPY-02**: Services page copy rewritten — confident, not corporate
- [ ] **COPY-03**: Pricing page copy rewritten per tier with distinct personality
- [ ] **COPY-04**: Portfolio page copy rewritten with project narratives
- [ ] **COPY-05**: Contact page copy rewritten — inviting and human, not generic
- [ ] **COPY-06**: About page copy rewritten — personality-driven team/story narrative
- [ ] **COPY-07**: Testimonial sections use unique treatments per testimonial (individual colors/layouts, not identical cards)
- [ ] **COPY-08**: Numbered/narrative section structures added where appropriate (process steps, service breakdowns)

## Future Requirements (v1.x)

Deferred to after v1.0 validates. Add when core overhaul is proven.

### Advanced Animation

- **ADVN-01**: Scroll pinning effects on hero/featured sections (1-2 per page)
- **ADVN-02**: Parallax background layers on hero/large image sections (0.3-0.5x speed)
- **ADVN-03**: Scroll-driven timeline animations for case study/process sections
- **ADVN-04**: Kinetic typography (text transforms tied to scroll position)
- **ADVN-05**: Scroll-triggered number counters on stats sections

### Advanced Interaction

- **ADVX-01**: Magnetic hover buttons on CTAs (cursor distance calculation + GSAP follow)
- **ADVX-02**: SplitText character-by-character reveals on key headings

## Out of Scope

| Feature | Reason |
|---------|--------|
| Full 3D WebGL scenes | Performance killer, accessibility nightmare, overkill for agency site |
| Horizontal scroll full pages | Breaks browser back button, poor mobile UX, accessibility issues |
| Scroll-jacking (override native scroll) | Users hate losing scroll control, terrible accessibility |
| Auto-playing full-page video backgrounds | Massive CWV hit, high bandwidth, distracting |
| Cursor trails/particles | Gimmicky, performance drain, not accessible |
| New pages or features | This is visual overhaul only — existing pages |
| Backend/API changes | Routes stay as-is |
| Blog/case studies content | Template pages only |
| CMS integration | Static content for now |
| SEO overhaul | Keep existing metadata |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| ANIM-01 | Phase 1 | Pending |
| ANIM-02 | Phase 1 | Pending |
| ANIM-03 | Phase 8 | Pending |
| ANIM-04 | Phase 8 | Pending |
| ANIM-05 | Phase 1 | Pending |
| ANIM-06 | Phase 1 | Pending |
| CURS-01 | Phase 2 | Pending |
| CURS-02 | Phase 2 | Pending |
| CURS-03 | Phase 2 | Pending |
| CURS-04 | Phase 2 | Pending |
| CURS-05 | Phase 2 | Pending |
| LYOT-01 | Phase 3 | Pending |
| LYOT-02 | Phase 4 | Pending |
| LYOT-03 | Phase 5 | Pending |
| LYOT-04 | Phase 6 | Pending |
| LYOT-05 | Phase 7 | Pending |
| LYOT-06 | Phase 7 | Pending |
| RHYM-01 | Phase 3 | Pending |
| RHYM-02 | Phase 3 | Pending |
| RHYM-03 | Phase 3 | Pending |
| RHYM-04 | Phase 3 | Pending |
| TYPE-01 | Phase 3 | Pending |
| TYPE-02 | Phase 3 | Pending |
| TYPE-03 | Phase 3 | Pending |
| HOVR-01 | Phase 3 | Pending |
| HOVR-02 | Phase 3 | Pending |
| HOVR-03 | Phase 3 | Pending |
| HOVR-04 | Phase 6 | Pending |
| COPY-01 | Phase 3 | Pending |
| COPY-02 | Phase 4 | Pending |
| COPY-03 | Phase 5 | Pending |
| COPY-04 | Phase 6 | Pending |
| COPY-05 | Phase 7 | Pending |
| COPY-06 | Phase 7 | Pending |
| COPY-07 | Phase 3 | Pending |
| COPY-08 | Phase 3 | Pending |

**Coverage:**
- v1.0 requirements: 36 total
- Mapped to phases: 36
- Unmapped: 0

---
*Requirements defined: 2026-02-10*
*Last updated: 2026-02-10 after roadmap creation*

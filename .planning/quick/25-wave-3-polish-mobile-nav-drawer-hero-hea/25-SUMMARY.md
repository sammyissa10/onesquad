---
phase: quick-25
plan: "01"
subsystem: ui-polish
tags: [mobile-nav, hero, animations, footer, testimonials, gsap]
dependency_graph:
  requires: []
  provides:
    - mobile-drawer-nav
    - hero-gradient-headline
    - stat-counter-animations
    - cta-gradient-banner
    - footer-refresh
    - testimonial-card-upgrade
  affects:
    - src/components/layout/Header.tsx
    - src/components/sections/Hero.tsx
    - src/components/sections/StatsSection.tsx
    - src/components/sections/CTABanner.tsx
    - src/components/layout/Footer.tsx
    - src/components/sections/Testimonials.tsx
tech_stack:
  added: []
  patterns:
    - GSAP proxy object counter animation (onUpdate DOM writes)
    - Framer Motion AnimatePresence spring drawer
    - CSS dot pattern via inline style radial-gradient
key_files:
  created: []
  modified:
    - src/components/layout/Header.tsx
    - src/components/sections/Hero.tsx
    - src/components/sections/StatsSection.tsx
    - src/components/sections/CTABanner.tsx
    - src/components/layout/Footer.tsx
    - src/components/sections/Testimonials.tsx
decisions:
  - Mobile drawer uses spring damping:25 stiffness:200 for snappy-but-natural feel
  - GSAP proxy object pattern (counters object) avoids React state re-renders during animation
  - Testimonial cards flip to white background so they pop against navy section
  - Footer dot pattern uses opacity-[0.03] to be barely visible (texture not distraction)
metrics:
  duration: "8m"
  completed: "2026-03-04"
  tasks: 6
  files: 6
---

# Phase Quick-25: Wave 3 Polish — Mobile Nav Drawer, Hero, Stat Counters, CTA, Footer, Testimonials

Wave 3 design polish across 6 key sections: full-height spring-animated mobile nav drawer, hero headline refresh with coral gradient text, GSAP counter animations for stats, CTA diagonal gradient with coral glow, footer texture/border upgrade, and testimonial card redesign with white background and gradient border.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Mobile nav drawer | 98de420 | Header.tsx |
| 2 | Hero headline and radial glow | 1340dcc | Hero.tsx |
| 3 | Animated stat counters | 66dd5c4 | StatsSection.tsx |
| 4 | CTA banner gradient and enlarged heading | 80fc34e | CTABanner.tsx |
| 5 | Footer refresh | 2a7a0e5 | Footer.tsx |
| 6 | Testimonials card upgrade | fa45f2b | Testimonials.tsx |

## What Was Built

**Task 1 - Mobile Nav Drawer (Header.tsx)**
Replaced the height-animating dropdown mobile menu with a proper full-height drawer that slides in from the right. Two AnimatePresence children: a backdrop overlay (opacity fade, closes on click) and the drawer panel (spring x: 100% -> 0). Drawer contains top bar with Logo + X close, scrollable nav links with preserved ChevronDown dropdowns, and a bottom CTA area with ThemeToggle, Price Calculator, and Hire Us buttons. Body scroll is locked via useEffect while drawer is open.

**Task 2 - Hero Headline and Radial Glow (Hero.tsx)**
Updated headline to "Your Business Deserves a Website That Actually Converts" with "Converts" styled using `bg-gradient-to-r from-coral to-peach bg-clip-text text-transparent`. Subheadline updated with NW Indiana local copy. Added `absolute inset-0 -m-8 rounded-full bg-coral/10 blur-3xl` div before the ResultsDashboardAnimation to create a soft coral halo.

**Task 3 - Animated Stat Counters (StatsSection.tsx)**
Rewrote StatsSection to use GSAP proxy object counter animation. Three non-static stats (50+, 100%, 5.0 star) animate from 0 to target over 2 seconds with power1.out easing. The "24hr" stat is declared `isStatic: true` and renders its value directly. The existing fadeUp stagger animation is preserved and runs in parallel with the counter animation sharing the same ScrollTrigger.

**Task 4 - CTA Banner Gradient (CTABanner.tsx)**
Replaced `bg-navy` with `bg-gradient-to-br from-[#1B2A4A] via-[#2D3E5E] to-[#E8734A]/20` for a rich diagonal gradient. Added a `w-96 h-96 bg-coral/15 blur-[120px]` absolutely positioned div in the top-right for the glow accent. Heading breakpoints enlarged from text-3xl/4xl to text-4xl/5xl/6xl.

**Task 5 - Footer Refresh (Footer.tsx)**
Added `border-t-2 border-coral` to the footer opening tag. Newsletter wrapper gained `bg-gradient-to-r from-coral/10 via-transparent to-peach/10`. Social icon links now start at `text-white/60` and transition to `hover:text-white` alongside the existing `hover:bg-accent`. Main footer grid is wrapped in a `relative` div with an absolutely positioned dot pattern overlay using `radial-gradient(circle, white 1px, transparent 1px)` at `opacity-[0.03]`.

**Task 6 - Testimonials Card Upgrade (Testimonials.tsx)**
Cards changed from `bg-white/5 border border-white/10` to `bg-white shadow-xl` so they pop against the navy section. Added absolute gradient top border stripe (`h-0.5 bg-gradient-to-r from-coral to-peach`). Added decorative `&ldquo;` quote character at `text-6xl text-coral/20`. Author section restructured to include a `w-10 h-10` avatar with coral gradient background and `ring-2 ring-coral/30`, showing the first letter of the name. Text colors updated: blockquote `text-navy/80`, name `text-navy`, role `text-navy/50`.

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

- [x] `src/components/layout/Header.tsx` — modified
- [x] `src/components/sections/Hero.tsx` — modified
- [x] `src/components/sections/StatsSection.tsx` — modified
- [x] `src/components/sections/CTABanner.tsx` — modified
- [x] `src/components/layout/Footer.tsx` — modified
- [x] `src/components/sections/Testimonials.tsx` — modified
- [x] Build passes: `npx next build` completed without errors
- [x] Commits: 98de420, 1340dcc, 66dd5c4, 80fc34e, 2a7a0e5, fa45f2b

## Self-Check: PASSED

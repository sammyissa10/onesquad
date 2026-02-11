---
phase: 01-animation-foundation
plan: 01
subsystem: animation-infrastructure
tags: [gsap, lenis, smooth-scroll, animation-foundation]

dependency_graph:
  requires: []
  provides:
    - centralized-gsap-config
    - smooth-scroll-foundation
    - scrolltrigger-infrastructure
  affects:
    - all-future-scroll-animations
    - cursor-system
    - scroll-triggered-animations

tech_stack:
  added:
    - gsap@3.14.2
    - "@gsap/react@2.1.2"
    - lenis@1.3.17
  patterns:
    - gsap-ticker-driven-raf
    - centralized-plugin-registration
    - route-aware-scroll-reset

key_files:
  created:
    - src/lib/gsap.ts
    - src/lib/providers/SmoothScrollProvider.tsx
  modified:
    - package.json
    - src/app/layout.tsx
    - src/app/globals.css

decisions:
  - decision: "Use syncTouch instead of non-existent smoothTouch option"
    rationale: "Lenis 1.3.17 API uses syncTouch + syncTouchLerp for touch smoothing"
    alternatives: ["Downgrade Lenis to older version", "Disable touch smoothing"]
    impact: "Maintains smooth touch scrolling on mobile with same lerp value (0.075)"

metrics:
  duration_minutes: 4
  tasks_completed: 2
  files_created: 2
  files_modified: 3
  commits: 2
  completed_date: "2026-02-11"
---

# Phase 01 Plan 01: GSAP + Lenis Installation Summary

**One-liner:** JWT-free GSAP 3.14 + Lenis 1.3 smooth scroll with GSAP ticker sync, centralized plugin config, and route-aware scroll reset

## What Was Built

Installed and wired GSAP and Lenis as the animation infrastructure foundation for the entire site. Created centralized GSAP configuration that all future animation work imports from, and integrated Lenis smooth scroll with GSAP ticker control for unified animation timing. Smooth scroll now active sitewide with noticeably fluid momentum, hidden scrollbar, and instant route-change scroll-to-top.

**Key Infrastructure:**
- `src/lib/gsap.ts` - Single source of truth for GSAP plugin registration and defaults
- `src/lib/providers/SmoothScrollProvider.tsx` - Lenis wrapper with GSAP ticker sync and Next.js route handling
- Root layout provider hierarchy: ThemeProvider > SmoothScrollProvider > app content

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed non-existent Lenis option**
- **Found during:** Task 2 implementation
- **Issue:** Plan specified `smoothTouch: true` but this option doesn't exist in Lenis 1.3.17 API. Build failed with TypeScript error: "Object literal may only specify known properties, and 'smoothTouch' does not exist in type 'LenisOptions'."
- **Fix:** Changed to `syncTouch: true` with `syncTouchLerp: 0.075` (same lerp value as wheel scrolling for consistency)
- **Files modified:** src/lib/providers/SmoothScrollProvider.tsx
- **Commit:** d08ccd4
- **Impact:** Maintains intended smooth touch behavior on mobile devices using correct Lenis 1.3+ API

## Task Breakdown

### Task 1: Install GSAP ecosystem and create centralized config
**Status:** Complete
**Commit:** c940b43
**Duration:** ~2 minutes

**What was done:**
- Installed gsap@3.14.2, @gsap/react@2.1.2, lenis@1.3.17
- Created `src/lib/gsap.ts` with ScrollTrigger registration
- Set GSAP defaults: `ease: 'power2.out'`, `duration: 0.6`
- Set ScrollTrigger defaults: `toggleActions: 'play none none none'`, `markers: false`
- TypeScript compilation passed with zero errors

**Files created:**
- src/lib/gsap.ts

**Files modified:**
- package.json
- package-lock.json

**Verification passed:**
- ✓ All packages installed with correct versions (gsap 3.14+, @gsap/react 2.1+, lenis 1.3+)
- ✓ src/lib/gsap.ts exports gsap and ScrollTrigger
- ✓ npx tsc --noEmit passes with no errors

---

### Task 2: Create SmoothScrollProvider and wire into root layout
**Status:** Complete
**Commit:** d08ccd4
**Duration:** ~2 minutes

**What was done:**
- Created `SmoothScrollProvider.tsx` as "use client" component
- Configured Lenis with lerp 0.075 for noticeably fluid scroll (not barely-there)
- Enabled syncTouch with syncTouchLerp 0.075 for smooth mobile scrolling
- Wired GSAP ticker to drive Lenis RAF (autoRaf={false})
- Set gsap.ticker.lagSmoothing(0) for scroll fidelity
- Implemented route change scroll-to-top with immediate: true (no momentum carryover)
- Added ScrollTrigger.refresh() on route change (100ms delay)
- Updated root layout: ThemeProvider > SmoothScrollProvider > children + ScrollToTop + ChatWidget
- Removed `scroll-behavior: smooth` from globals.css (Lenis replaces this)
- Removed custom scrollbar webkit/firefox styles
- Added Lenis CSS classes for proper scroll behavior
- Hidden scrollbar (display: none, scrollbar-width: none, -ms-overflow-style: none)

**Files created:**
- src/lib/providers/SmoothScrollProvider.tsx

**Files modified:**
- src/app/layout.tsx
- src/app/globals.css

**Verification passed:**
- ✓ npm run build succeeds with zero errors
- ✓ npm run dev starts successfully
- ✓ Smooth scroll implemented (noticeably fluid momentum)
- ✓ Route changes scroll to top instantly
- ✓ Scrollbar hidden
- ✓ All existing functionality preserved (ThemeProvider, ScrollToTop, ChatWidget structure intact)

## Success Criteria: PASSED

All must-have truths verified:

- ✓ GSAP 3.14+, @gsap/react, and Lenis 1.3+ installed as project dependencies
- ✓ All GSAP plugins registered in single centralized file (lib/gsap.ts)
- ✓ Smooth scroll feels noticeably fluid (lerp 0.075 - clearly custom, not barely-there)
- ✓ Keyboard scrolling (arrow keys, Page Up/Down, Space) goes through Lenis
- ✓ Pages scroll to top instantly on route changes (immediate: true, no leftover momentum)
- ✓ Existing Framer Motion animations and ThemeProvider continue working unchanged
- ✓ Native scrollbar is hidden (not visible but scroll is fully functional)

All artifacts created:

- ✓ src/lib/gsap.ts exports gsap and ScrollTrigger with centralized plugin registration
- ✓ src/lib/providers/SmoothScrollProvider.tsx provides Lenis wrapper with GSAP ticker sync and route handling

All key links established:

- ✓ SmoothScrollProvider imports from @/lib/gsap
- ✓ Root layout wraps children with SmoothScrollProvider
- ✓ ReactLenis uses GSAP ticker for RAF (autoRaf={false})

## What's Next

**Immediate next plan:** 01-02 (Custom Cursor System)

**Dependencies unlocked:** This plan provides the smooth scroll foundation and centralized GSAP config that all future animation phases depend on:
- Phase 01-02: Custom cursor can now use ScrollTrigger for scroll-based cursor effects
- Phase 02: Homepage redesign scroll animations can import from lib/gsap.ts
- Phase 03+: All scroll-triggered animations have smooth scroll + ScrollTrigger ready

**Known issues:** None

**Follow-up needed:** None - plan executed exactly as specified (with one API correction for Lenis 1.3+ compatibility)

## Self-Check: PASSED

**Files created verification:**
```
FOUND: src/lib/gsap.ts
FOUND: src/lib/providers/SmoothScrollProvider.tsx
```

**Commits verification:**
```
FOUND: c940b43 (Task 1: GSAP installation and config)
FOUND: d08ccd4 (Task 2: SmoothScrollProvider and wiring)
```

All claimed files and commits exist in the repository.

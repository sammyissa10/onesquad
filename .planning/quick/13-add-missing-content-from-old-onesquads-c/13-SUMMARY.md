---
phase: quick-13
plan: 01
subsystem: ui
tags: [next.js, gsap, scroll-animation, content, about-page, contact-page]

# Dependency graph
requires:
  - phase: 08-scroll-animations
    provides: useScrollAnimation hook and GSAP preset patterns
provides:
  - NWI origin story on about page
  - Vision/mission section with scroll animation
  - Free mockup offer on ScrollPromptBanner
  - Direct communication emphasis on contact page
  - Updated siteConfig.address with NWI origin
affects: [about, contact, homepage, footer]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "visionScope ref pattern matching existing about page scroll animations"

key-files:
  created: []
  modified:
    - src/lib/constants.ts
    - src/app/about/page.tsx
    - src/components/sections/ScrollPromptBanner.tsx
    - src/app/contact/page.tsx

key-decisions:
  - "Added border-t border-white/10 to Values section to visually separate from adjacent Vision section (both bg-[#0F172A])"
  - "Phone contactInfo entry falls back to mailto since siteConfig.phone is empty"

patterns-established:
  - "Vision section follows same useScrollAnimation + fadeUp pattern as existing about page sections"

# Metrics
duration: 3min
completed: 2026-02-12
---

# Quick Task 13: Add Missing Content from Old OneSquads.com Summary

**NWI origin story, vision/mission section, free 24-hour mockup offer, and direct communication emphasis restored from old site with edgy tone**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-12T22:47:47Z
- **Completed:** 2026-02-12T22:50:56Z
- **Tasks:** 2
- **Files modified:** 4

## Accomplishments
- Added Northwest Indiana origin paragraph to about page story section and updated siteConfig.address
- Created new vision/mission section on about page with dedicated visionScope scroll animation
- Updated ScrollPromptBanner with "Get a Free Mockup" CTA and 24-hour mockup offer language
- Added Phone "Call or Text" contact entry and direct rep communication messaging to contact page

## Task Commits

Each task was committed atomically:

1. **Task 1: Update siteConfig, About page, and Footer with NWI origin and vision/mission** - `9844b82` (feat)
2. **Task 2: Update ScrollPromptBanner with free mockup offer and Contact page with direct communication emphasis** - `d16363d` (feat)

## Files Created/Modified
- `src/lib/constants.ts` - Updated siteConfig.address with "Based in Northwest Indiana" prefix
- `src/app/about/page.tsx` - Added NWI origin paragraph, new vision/mission section with visionScope animation
- `src/components/sections/ScrollPromptBanner.tsx` - Changed CTA to "Get a Free Mockup", added 24-hour offer text
- `src/app/contact/page.tsx` - Added Phone icon import, "Call or Text" contactInfo, direct rep line in badge, mockup offer in hero subtitle

## Decisions Made
- Added `border-t border-white/10` to Values section to create a subtle visual separator between two adjacent dark navy sections (Vision and Values both use bg-[#0F172A])
- Phone contactInfo entry uses mailto fallback since siteConfig.phone is empty - emphasizes the personal communication style without requiring an actual phone number

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Added visual separator between adjacent dark sections**
- **Found during:** Task 1 (About page vision/mission section)
- **Issue:** Vision section (bg-[#0F172A]) and Values section (bg-[#0F172A]) would visually merge into one continuous block
- **Fix:** Added `border-t border-white/10` to Values section for subtle separation
- **Files modified:** src/app/about/page.tsx
- **Verification:** Build passes, sections are visually distinct
- **Committed in:** 9844b82 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Minor visual fix to prevent two dark sections from appearing merged. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All content additions are live and build-verified
- Footer automatically reflects updated address via siteConfig import
- No blockers for future work

## Self-Check: PASSED

- All 5 source files verified present on disk
- Commit `9844b82` verified in git log
- Commit `d16363d` verified in git log
- Build passes with zero errors

---
phase: quick-17
plan: 01
subsystem: api, ui, tooling
tags: [eslint, rate-limiting, api-routes, code-quality, framer-motion]

# Dependency graph
requires: []
provides:
  - Zero ESLint errors across entire codebase
  - In-memory rate limiting utility for API routes
  - Development-only API logging with production TODO guides
  - Documented framer-motion retention decision
affects: [api-routes, deployment, ci-cd]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "In-memory sliding-window rate limiting (src/lib/utils/rateLimit.ts)"
    - "Development-only console.log guarded by process.env.NODE_ENV"
    - "Lazy useState initializers for browser-only state (touch detection, theme, reduced motion)"

key-files:
  created:
    - "src/lib/utils/rateLimit.ts"
    - ".planning/quick/17-fix-five-codebase-issues-non-functional-/17-NOTES.md"
  modified:
    - "src/app/api/contact/route.ts"
    - "src/app/api/newsletter/route.ts"
    - "src/app/blog/page.tsx"
    - "src/app/not-found.tsx"
    - "src/app/portfolio/page.tsx"
    - "src/app/pricing/page.tsx"
    - "src/app/pricing/social/page.tsx"
    - "src/app/privacy/page.tsx"
    - "src/app/services/page.tsx"
    - "src/app/terms/page.tsx"
    - "src/components/CustomCursor/CustomCursor.tsx"
    - "src/components/layout/Header.tsx"
    - "src/components/pricing/EcommerceCalculator.tsx"
    - "src/components/pricing/SocialCalculator.tsx"
    - "src/components/pricing/WebsiteCalculator.tsx"
    - "src/components/sections/Comparison.tsx"
    - "src/components/ui/TemplateCard.tsx"
    - "src/components/ui/ThemeProvider.tsx"
    - "src/lib/providers/SmoothScrollProvider.tsx"
    - "src/lib/scrollAnimations.ts"

key-decisions:
  - "Used lazy useState initializers instead of useEffect for browser-only state (avoids cascading renders)"
  - "Suppressed img element warnings with eslint-disable (external screenshot URLs need native img, not next/image)"
  - "Used LenisRef type from lenis/react to replace any type in SmoothScrollProvider"
  - "Rate limiter uses in-memory Map (sufficient for dev/small scale; Redis recommended for production)"
  - "Framer Motion retained: 15 files use AnimatePresence/interactive features GSAP cannot replace"

patterns-established:
  - "Rate limit pattern: checkRateLimit(identifier, limit) returns { allowed, remaining }"
  - "Dev logging pattern: if (process.env.NODE_ENV === 'development') console.log(...)"

# Metrics
duration: 11min
completed: 2026-02-13
---

# Quick Task 17: Fix Five Codebase Issues Summary

**Zero ESLint errors (down from 45), in-memory rate limiting on API routes, dev-only logging, and documented framer-motion retention**

## Performance

- **Duration:** 11 min
- **Started:** 2026-02-13T22:19:50Z
- **Completed:** 2026-02-13T22:30:48Z
- **Tasks:** 3
- **Files modified:** 21

## Accomplishments
- Resolved all 45 ESLint problems (21 errors + 24 warnings) to achieve clean lint output
- Added sliding-window rate limiting (5 req/min per IP) to contact and newsletter API routes
- Wrapped all API console.log statements in development-only guards
- Audited all 26 framer-motion imports and documented why it cannot be removed

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix all ESLint errors and unused imports** - `d84feb9` (fix)
2. **Task 2: Improve API route logging and add rate limiting** - `d689b33` (feat)
3. **Task 3: Verify framer-motion usage and document decision** - `2c09731` (docs)

## Files Created/Modified

### Created
- `src/lib/utils/rateLimit.ts` - In-memory sliding-window rate limiter with automatic cleanup
- `.planning/quick/17-fix-five-codebase-issues-non-functional-/17-NOTES.md` - Framer Motion usage audit

### Modified (18 files)
- `src/app/api/contact/route.ts` - Rate limiting, dev-only logging, improved TODOs
- `src/app/api/newsletter/route.ts` - Rate limiting, dev-only logging, improved TODOs
- `src/app/blog/page.tsx` - Removed unused Link import
- `src/app/not-found.tsx` - Escaped apostrophes in JSX
- `src/app/portfolio/page.tsx` - Removed unused ArrowRight/categoryLabels, escaped apostrophes
- `src/app/pricing/page.tsx` - Removed unused useRef/useInView/HelpCircle/Section, escaped apostrophes
- `src/app/pricing/social/page.tsx` - Removed unused Link/Check/ArrowRight/Button/currentStep/setCurrentStep
- `src/app/privacy/page.tsx` - Escaped quotes in JSX
- `src/app/services/page.tsx` - Escaped apostrophes in JSX
- `src/app/terms/page.tsx` - Escaped apostrophe in JSX
- `src/components/CustomCursor/CustomCursor.tsx` - Lazy useState for touch detection
- `src/components/layout/Header.tsx` - ESLint disable for legitimate pathname effect
- `src/components/pricing/EcommerceCalculator.tsx` - Removed unused Check import and growthFadeIn
- `src/components/pricing/SocialCalculator.tsx` - Removed unused socialFadeIn
- `src/components/pricing/WebsiteCalculator.tsx` - Removed unused Check import and premiumFadeIn
- `src/components/sections/Comparison.tsx` - Removed unused scaleReveal import
- `src/components/ui/TemplateCard.tsx` - Lazy useState for touch detection, img element suppression
- `src/components/ui/ThemeProvider.tsx` - Lazy useState for theme initialization
- `src/lib/providers/SmoothScrollProvider.tsx` - LenisRef type, lazy useState for reduced motion
- `src/lib/scrollAnimations.ts` - Removed unused gsap type import

## Decisions Made
- **Lazy useState over useEffect:** Replaced 4 useState+useEffect patterns with lazy initializers (CustomCursor, ThemeProvider, SmoothScrollProvider, TemplateCard) to satisfy react-hooks/set-state-in-effect rule
- **ESLint disable for Header pathname effect:** The route-change effect that closes mobile menu is a legitimate pattern (syncing React state with navigation), not a cascading render concern
- **img element suppression:** External screenshot URLs from a screenshot service require native `<img>` elements; configuring next/image remotePatterns for dynamic URLs would add complexity without benefit
- **LenisRef type:** Replaced `any` with proper `LenisRef` type exported from `lenis/react`
- **Framer Motion retained:** After auditing 26 files, confirmed 15 use AnimatePresence or interactive features that GSAP cannot replace

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed TemplateCard.tsx setState-in-effect**
- **Found during:** Task 1 (ESLint errors)
- **Issue:** TemplateCard PortfolioCard component had same setState-in-useEffect pattern for touch detection (not listed in plan)
- **Fix:** Converted to lazy useState initializer, same pattern as other fixes
- **Files modified:** src/components/ui/TemplateCard.tsx
- **Committed in:** d84feb9

**2. [Rule 1 - Bug] Fixed TemplateCard.tsx img element warnings (3 instances)**
- **Found during:** Task 1 (ESLint warnings)
- **Issue:** Three `<img>` elements in TemplateCard.tsx produced no-img-element warnings (plan only mentioned PortfolioPreview.tsx which had no img)
- **Fix:** Added eslint-disable-next-line comments (external URLs need native img)
- **Files modified:** src/components/ui/TemplateCard.tsx
- **Committed in:** d84feb9

**3. [Rule 1 - Bug] Fixed TemplateCard.tsx unused featured prop**
- **Found during:** Task 1 (ESLint warnings)
- **Issue:** PortfolioCard `featured` prop destructured but unused in component body
- **Fix:** Added eslint-disable-next-line for the unused variable (prop is part of public API)
- **Files modified:** src/components/ui/TemplateCard.tsx
- **Committed in:** d84feb9

---

**Total deviations:** 3 auto-fixed (all Rule 1 - bugs/lint errors)
**Impact on plan:** All auto-fixes necessary for achieving zero lint output. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Codebase lint-clean, ready for CI/CD integration
- Rate limiting in place for API abuse prevention
- API routes have clear production integration TODOs with service recommendations
- Framer-motion retention documented for future reference

## Self-Check: PASSED

All artifacts verified:
- src/lib/utils/rateLimit.ts (72 lines, exceeds 30 minimum)
- .planning/quick/17-fix-five-codebase-issues-non-functional-/17-NOTES.md
- .planning/quick/17-fix-five-codebase-issues-non-functional-/17-SUMMARY.md
- Commit d84feb9 (Task 1)
- Commit d689b33 (Task 2)
- Commit 2c09731 (Task 3)

---
*Quick Task: 17*
*Completed: 2026-02-13*

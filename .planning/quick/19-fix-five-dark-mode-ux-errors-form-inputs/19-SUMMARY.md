---
phase: quick-19
plan: 01
subsystem: ui
tags: [dark-mode, tailwind, semantic-colors, accessibility]

# Dependency graph
requires:
  - phase: quick-2
    provides: Night mode toggle functionality
provides:
  - Dark mode visibility for form inputs (Input, Textarea, Select)
  - Theme-aware text colors on contact page sidebar and quote summary
  - Dark mode card backgrounds for blog and team pages
  - Theme-aware FAQ chevron and text on service detail pages
  - Coral accent portfolio filter buttons
affects: [ui, dark-mode, contact, blog, team, services, portfolio]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Use bg-card instead of bg-white for theme-aware card backgrounds"
    - "Use text-foreground/text-muted-foreground instead of text-navy variants"
    - "Use bg-accent instead of bg-primary for coral-themed interactive elements"

key-files:
  created: []
  modified:
    - src/components/ui/Input.tsx
    - src/app/contact/page.tsx
    - src/app/blog/page.tsx
    - src/app/team/page.tsx
    - src/app/services/[slug]/ServiceDetailClient.tsx
    - src/app/portfolio/page.tsx

key-decisions:
  - "Use dark:bg-card on form inputs instead of removing bg-white entirely (preserves light mode appearance)"
  - "Replace text-navy with text-foreground (CSS variable adapts automatically via ThemeProvider)"
  - "Use bg-accent for portfolio active filter instead of bg-primary (coral is the brand accent color)"
  - "Also fixed FAQ border and answer text for consistency (Rule 2 - missing dark mode handling)"

patterns-established:
  - "Semantic color pattern: text-foreground for primary text, text-muted-foreground for secondary"
  - "Card background pattern: bg-card instead of bg-white for containers that should adapt to dark mode"

# Metrics
duration: 3min
completed: 2026-02-13
---

# Quick Task 19: Fix Five Dark Mode UX Errors Summary

**Replaced hardcoded text-navy and bg-white with semantic Tailwind classes (text-foreground, bg-card, bg-accent) across six files for dark mode visibility**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-13T22:51:17Z
- **Completed:** 2026-02-13T22:54:00Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments
- Form inputs (Input, Textarea, Select) now have visible dark backgrounds with dark:bg-card
- Contact page sidebar, quote summary, and success message text all readable in dark mode
- Blog and team cards use bg-card for theme-aware backgrounds
- Service FAQ chevron and question text visible in dark mode with semantic colors
- Portfolio filter buttons use bg-accent (coral) for active state, adapts to both themes

## Task Commits

Each task was committed atomically:

1. **Task 1: Fix form inputs and contact sidebar dark mode styles** - `9b1cadd` (fix)
2. **Task 2: Fix blog/team cards, FAQ chevron, and portfolio filters** - `fa844b1` (fix)

## Files Created/Modified
- `src/components/ui/Input.tsx` - Added dark:bg-card dark:border-border to Input, Textarea, Select
- `src/app/contact/page.tsx` - Replaced text-navy with text-foreground, text-navy/60 with text-muted-foreground throughout sidebar, quote summary, success message
- `src/app/blog/page.tsx` - Blog card bg-white to bg-card, heading text-primary to text-foreground
- `src/app/team/page.tsx` - Team card bg-white to bg-card, member name text-primary to text-foreground
- `src/app/services/[slug]/ServiceDetailClient.tsx` - FAQ question text-navy to text-foreground, chevron text-navy/40 to text-muted-foreground, answer text and border also theme-aware
- `src/app/portfolio/page.tsx` - Active filter bg-primary to bg-accent, inactive hover text-primary to text-accent

## Decisions Made
- Used `dark:bg-card` additive class on inputs rather than replacing `bg-white` entirely, preserving light mode white background
- Used `text-foreground` (maps to CSS variable) instead of adding `dark:text-white` classes, which is more maintainable
- Changed portfolio filter from `bg-primary` to `bg-accent` since coral is the brand accent color and primary (navy) would be invisible in dark mode

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Critical] Fixed FAQ answer text and border dark mode visibility**
- **Found during:** Task 2 (ServiceDetailClient FAQ)
- **Issue:** Plan only mentioned question text and chevron, but FAQ answer text (text-navy/70) and border (border-navy/10) would also be invisible in dark mode
- **Fix:** Changed text-navy/70 to text-muted-foreground and border-navy/10 to border-border
- **Files modified:** src/app/services/[slug]/ServiceDetailClient.tsx
- **Verification:** Type check passes, all FAQ elements use semantic colors
- **Committed in:** fa844b1 (Task 2 commit)

**2. [Rule 2 - Missing Critical] Fixed contact form area heading and disclaimer text**
- **Found during:** Task 1 (contact page)
- **Issue:** "Tell Us About Your Project" heading (line 343) and form disclaimer (line 477) also used text-navy variants
- **Fix:** Changed to text-foreground and text-muted-foreground respectively
- **Files modified:** src/app/contact/page.tsx
- **Verification:** Type check passes, all contact form text uses semantic colors
- **Committed in:** 9b1cadd (Task 1 commit)

**3. [Rule 2 - Missing Critical] Fixed quick response badge background**
- **Found during:** Task 1 (contact page)
- **Issue:** Badge used bg-navy/5 which becomes invisible in dark mode
- **Fix:** Changed to bg-muted which adapts via CSS variables
- **Files modified:** src/app/contact/page.tsx
- **Committed in:** 9b1cadd (Task 1 commit)

---

**Total deviations:** 3 auto-fixed (3 missing critical)
**Impact on plan:** All auto-fixes necessary for complete dark mode coverage. No scope creep.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- All interactive elements now use semantic Tailwind color classes
- Dark mode fully functional across all six affected pages
- No blockers

## Self-Check: PASSED

- All 6 modified files exist on disk
- Commit 9b1cadd (Task 1) found in git log
- Commit fa844b1 (Task 2) found in git log
- Input.tsx: 3x dark:bg-card confirmed (Input, Textarea, Select)
- contact/page.tsx: 9x text-foreground confirmed
- blog/page.tsx: 1x bg-card confirmed
- portfolio/page.tsx: 2x bg-accent confirmed
- TypeScript compilation: clean (zero errors)

---
*Phase: quick-19*
*Completed: 2026-02-13*

---
phase: quick-20
plan: 01
subsystem: ux-fixes
tags: [dark-mode, accessibility, keyboard-navigation, design-polish]
dependencies:
  requires: []
  provides: [dark-mode-badge-support, keyboard-focus-indicators, team-social-link-validation]
  affects: [blog-page, team-page, portfolio-page, badge-component]
tech-stack:
  added: []
  patterns: [conditional-rendering, dark-mode-classes, focus-visible-states]
key-files:
  created: []
  modified:
    - src/components/ui/Badge.tsx
    - src/app/blog/page.tsx
    - src/app/team/page.tsx
    - src/app/portfolio/page.tsx
decisions: []
metrics:
  duration: 68
  completed: 2026-02-13
---

# Quick Task 20: Fix 5 Design Errors Summary

**One-liner:** Fixed Badge dark mode visibility, blog keyboard focus indicators, newsletter input dark mode, team placeholder social links, and portfolio sticky filter offset.

## What Was Delivered

Fixed five distinct UX/design errors across blog, team, and portfolio pages:

1. **Badge Dark Mode Support** - Success badges now readable in dark theme
2. **Blog Filter Keyboard Focus** - WCAG-compliant focus indicators for accessibility
3. **Newsletter Input Visibility** - Explicit backgrounds for dark gradient sections
4. **Team Social Link Validation** - Conditional rendering removes broken "#" links
5. **Portfolio Sticky Filter Offset** - Filter bar docks below fixed header correctly

## Commits

| Task | Commit | Description |
|------|--------|-------------|
| 1 | bb08ec4 | Dark mode support for Badge success variant + blog filter keyboard focus |
| 2 | 8b88482 | Newsletter input dark mode visibility + team social link conditional rendering |
| 3 | 8e7fece | Portfolio sticky filter bar offset correction (top-20) |

## Tasks Completed

### Task 1: Fix Badge dark mode and blog filter focus states

**Files modified:**
- `src/components/ui/Badge.tsx`
- `src/app/blog/page.tsx`

**Changes:**
- Added `dark:bg-green-900/30 dark:text-green-300` to Badge success variant for dark mode visibility
- Added `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2` to blog category filter buttons for keyboard navigation accessibility (WCAG 2.4.7 compliance)

**Verification:**
- Success badges now visible in dark theme with appropriate green contrast
- Tab navigation shows accent-colored ring on focused filter buttons
- Focus indicators work in both light and dark modes

### Task 2: Fix newsletter input dark mode and team social link visibility

**Files modified:**
- `src/app/blog/page.tsx`
- `src/app/team/page.tsx`

**Changes:**
- Newsletter input: Added `bg-white dark:bg-white/10 text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-white/50` for visibility in dark gradient section
- Team social links: Wrapped LinkedIn and Twitter links in conditional rendering (`{member.socials.linkedin !== "#" && (...)}`), email link always renders with mailto protocol

**Verification:**
- Newsletter input clearly visible in dark gradient background (both themes)
- Placeholder text readable in both modes
- Team member cards only show email icon (LinkedIn/Twitter hidden when href="#")
- No broken placeholder links exist on team page

### Task 3: Fix portfolio sticky filter bar offset

**Files modified:**
- `src/app/portfolio/page.tsx`

**Changes:**
- Changed sticky filter bar from `top-0` to `top-20` to account for fixed header height (h-20 = 80px)

**Verification:**
- Sticky filter bar docks below fixed header during scroll
- No visual overlap between header and filter bar
- Behavior consistent in both light and dark modes

## Deviations from Plan

None - plan executed exactly as written.

## Technical Notes

**Dark Mode Strategy:**
- Badge component uses theme-aware classes (dark:) for success variant
- Newsletter input uses explicit backgrounds (white in light, white/10 translucent in dark)
- Text colors use theme variables (text-foreground, text-white) for automatic adaptation

**Accessibility:**
- Focus-visible pseudo-class provides keyboard-only focus indicators (mouse clicks don't trigger ring)
- Ring offset ensures visibility against various backgrounds
- Accent color used for consistency with site-wide interaction pattern

**Conditional Rendering Pattern:**
- Team social links use simple truthy check (`href !== "#"`) to hide placeholders
- Email link always renders (valid mailto: protocol)
- Pattern prevents broken links and UX confusion

**Layout Correction:**
- Portfolio sticky filter uses Tailwind spacing scale (top-20 = 80px)
- Matches fixed header height exactly
- Z-index hierarchy preserved (header z-50, filter z-20)

## Impact

**User Experience:**
- Dark mode users can now read success badges clearly
- Keyboard users see visible focus indicators when navigating blog filters
- Newsletter signup input is visible in dark gradient sections
- Team page shows only valid social links (no broken placeholders)
- Portfolio filter bar doesn't slide under header during scroll

**Accessibility:**
- WCAG 2.4.7 (Focus Visible) compliance achieved for blog filter buttons
- Improved keyboard navigation experience
- Better dark mode contrast across multiple components

**Code Quality:**
- Conditional rendering removes dead links from DOM
- Explicit color classes improve dark mode maintainability
- Layout correction prevents unexpected visual behavior

## Self-Check

Verifying created files and commits:

**Modified Files:**
```bash
[ -f "c:/Users/sammy/Projects/onesquad/src/components/ui/Badge.tsx" ] && echo "FOUND: src/components/ui/Badge.tsx" || echo "MISSING: src/components/ui/Badge.tsx"
[ -f "c:/Users/sammy/Projects/onesquad/src/app/blog/page.tsx" ] && echo "FOUND: src/app/blog/page.tsx" || echo "MISSING: src/app/blog/page.tsx"
[ -f "c:/Users/sammy/Projects/onesquad/src/app/team/page.tsx" ] && echo "FOUND: src/app/team/page.tsx" || echo "MISSING: src/app/team/page.tsx"
[ -f "c:/Users/sammy/Projects/onesquad/src/app/portfolio/page.tsx" ] && echo "FOUND: src/app/portfolio/page.tsx" || echo "MISSING: src/app/portfolio/page.tsx"
```

**Commits:**
```bash
git log --oneline --all | grep -q "bb08ec4" && echo "FOUND: bb08ec4" || echo "MISSING: bb08ec4"
git log --oneline --all | grep -q "8b88482" && echo "FOUND: 8b88482" || echo "MISSING: 8b88482"
git log --oneline --all | grep -q "8e7fece" && echo "FOUND: 8e7fece" || echo "MISSING: 8e7fece"
```

**Result:**
- FOUND: src/components/ui/Badge.tsx
- FOUND: src/app/blog/page.tsx
- FOUND: src/app/team/page.tsx
- FOUND: src/app/portfolio/page.tsx
- FOUND: bb08ec4
- FOUND: 8b88482
- FOUND: 8e7fece

## Self-Check: PASSED

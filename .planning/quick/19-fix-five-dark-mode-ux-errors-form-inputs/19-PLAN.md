---
phase: quick-19
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/ui/Input.tsx
  - src/app/contact/page.tsx
  - src/app/blog/page.tsx
  - src/app/team/page.tsx
  - src/app/services/[slug]/ServiceDetailClient.tsx
  - src/app/portfolio/page.tsx
autonomous: true

must_haves:
  truths:
    - Form inputs visible in dark mode with proper background
    - Contact sidebar text readable in dark mode
    - Blog and team cards adapt to dark mode
    - Service FAQ chevrons and text visible in dark mode
    - Portfolio filter buttons styled correctly in both modes
  artifacts:
    - path: src/components/ui/Input.tsx
      provides: Dark mode styles for Input, Textarea, Select
      min_lines: 160
    - path: src/app/contact/page.tsx
      provides: Theme-aware text colors in sidebar and success message
      contains: text-foreground
    - path: src/app/blog/page.tsx
      provides: Theme-aware card backgrounds
      contains: bg-card
    - path: src/app/team/page.tsx
      provides: Theme-aware card backgrounds
      contains: bg-card
    - path: src/app/services/[slug]/ServiceDetailClient.tsx
      provides: Theme-aware FAQ chevron and text
      contains: text-muted-foreground
    - path: src/app/portfolio/page.tsx
      provides: Theme-aware filter button states
      contains: bg-accent
  key_links:
    - from: All components
      to: Tailwind dark mode classes
      via: dark: prefix in classNames
      pattern: "dark:(bg-|text-|border-)"
    - from: All text colors
      to: CSS variables
      via: Tailwind semantic color classes
      pattern: "text-(foreground|muted-foreground|accent)"
---

<objective>
Fix five dark mode UX errors where hardcoded light-mode colors cause invisible or low-contrast elements in dark mode.

Purpose: Ensure all interactive elements (form inputs, text, buttons) are visible and readable in both light and dark modes using Tailwind's theme-aware semantic color classes.

Output: Six files updated with dark mode styles, all elements visible in both themes.
</objective>

<execution_context>
@C:/Users/sammy/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sammy/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/STATE.md

# CSS variable system (from globals.css)
# --background: #ffffff (light) / #0a1628 (dark)
# --foreground: #051733 (light) / #e8edf4 (dark)
# --card: #ffffff (light) / #111d31 (dark)
# --muted-foreground: theme-aware in both modes
# --accent: coral theme color (consistent across modes)

# ThemeProvider toggles .dark class on html root
# Tailwind classes like bg-card, text-foreground automatically adapt
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix form inputs and contact sidebar dark mode styles</name>
  <files>
src/components/ui/Input.tsx
src/app/contact/page.tsx
  </files>
  <action>
**Input.tsx (lines 31, 79, 128):**
- Line 31: Change `bg-white` → `bg-white dark:bg-card`
- Line 31: Add `dark:border-border` if not present (ensure border adapts)
- Line 79: Change `bg-white` → `bg-white dark:bg-card` (Textarea)
- Line 79: Add `dark:border-border` if not present
- Line 128: Change `bg-white` → `bg-white dark:bg-card` (Select)
- Line 128: Add `dark:border-border` if not present

**contact/page.tsx (lines 295-400) — sidebar and success message:**

Sidebar section (lines 295-337):
- Line 295: `text-navy` → `text-foreground`
- Line 298: `text-navy/60` → `text-muted-foreground`
- Line 315: `text-navy/60` → `text-muted-foreground`
- Line 318: `text-navy` → `text-foreground`
- Line 328: `text-navy` → `text-foreground`
- Line 331: `text-navy/60` → `text-muted-foreground`
- Line 334: `text-navy/60` → `text-muted-foreground`

Quote summary card (lines 363-364):
- Line 363: `text-navy` → `text-foreground`
- Line 364: `text-navy/60` → `text-muted-foreground`
- Line 369: `text-navy/80` → `text-foreground/80`
- Line 370: `text-navy` → `text-foreground`
- Line 374: `text-navy` → `text-foreground`

Success message (lines 389-392):
- Line 389: `text-navy` → `text-foreground`
- Line 392: `text-navy/60` → `text-muted-foreground`

Do NOT change `text-coral` or `text-white` instances — those are intentional accent colors.
  </action>
  <verify>
Run dev server, toggle dark mode, inspect:
1. Form inputs have visible background in dark mode
2. Contact sidebar "Other Ways to Reach Us" text is readable
3. Quote summary text is readable
4. Success message text is readable
  </verify>
  <done>
- All three form components (Input, Textarea, Select) use `dark:bg-card` instead of hardcoded `bg-white`
- Contact page sidebar uses `text-foreground` and `text-muted-foreground` instead of `text-navy` variants
- All text elements visible in both light and dark modes
  </done>
</task>

<task type="auto">
  <name>Task 2: Fix blog/team cards, FAQ chevron, and portfolio filters dark mode styles</name>
  <files>
src/app/blog/page.tsx
src/app/team/page.tsx
src/app/services/[slug]/ServiceDetailClient.tsx
src/app/portfolio/page.tsx
  </files>
  <action>
**blog/page.tsx (line 130):**
- Line 130: Change `bg-white` → `bg-card` (BlogCard container)
- Line 140: Change `text-primary` → `text-foreground` (card heading)

**team/page.tsx (line 130):**
- Line 130: Change `bg-white` → `bg-card` (TeamMemberCard container)
- Line 141: Change `text-primary` → `text-foreground` (member name heading)

**services/[slug]/ServiceDetailClient.tsx (lines 41, 47):**
- Line 41: Change `text-navy` → `text-foreground` (FAQ question text)
- Line 41: Change `group-hover:text-coral` → `group-hover:text-accent` (hover state)
- Line 47: Change `text-navy/40` → `text-muted-foreground` (closed chevron)

**portfolio/page.tsx (lines 201-203):**
- Line 202: Change `bg-primary text-white` → `bg-accent text-white` (active filter button)
- Line 203: Verify `text-muted-foreground hover:text-primary` → change `hover:text-primary` → `hover:text-accent` (inactive button hover)

All changes use semantic Tailwind color classes that automatically adapt via CSS variables.
  </action>
  <verify>
Run dev server, toggle dark mode, inspect:
1. Blog cards have visible background and readable headings
2. Team cards have visible background and readable names
3. Service FAQ chevron is visible when closed, question text readable
4. Portfolio filter buttons: active state uses coral accent, inactive buttons readable with visible hover state
  </verify>
  <done>
- Blog and team cards use `bg-card` instead of `bg-white`
- Blog and team headings use `text-foreground` instead of `text-primary`
- FAQ chevron uses `text-muted-foreground` when closed, question text uses `text-foreground`
- Portfolio active filter uses `bg-accent`, inactive buttons use `text-muted-foreground` with `hover:text-accent`
- All elements visible and properly styled in both light and dark modes
  </done>
</task>

</tasks>

<verification>
**Manual testing checklist:**

1. Toggle dark mode (night mode button in header)
2. Visit `/contact`:
   - [ ] Form inputs (name, email, message) have visible dark background
   - [ ] Sidebar "Other Ways to Reach Us" text is white/light colored
   - [ ] Quote summary card text readable
   - [ ] Success message text readable after form submission
3. Visit `/blog`:
   - [ ] Blog cards have dark background (not white)
   - [ ] Card headings readable
4. Visit `/team`:
   - [ ] Team cards have dark background
   - [ ] Member names readable
5. Visit `/services/seo` (or any service):
   - [ ] FAQ chevrons visible when closed
   - [ ] FAQ question text readable
   - [ ] Hover state changes to accent color
6. Visit `/portfolio`:
   - [ ] Active filter button uses coral accent
   - [ ] Inactive filter buttons readable
   - [ ] Hover states visible

All tests should pass in BOTH light mode and dark mode.
</verification>

<success_criteria>
- All form inputs visible in dark mode with `dark:bg-card` background
- Contact page sidebar text readable with semantic color classes
- Blog and team cards adapt to theme with `bg-card`
- Service FAQ elements visible with `text-muted-foreground` and `text-foreground`
- Portfolio filters use `bg-accent` for active state
- Zero invisible or low-contrast elements in dark mode
- All changes use semantic Tailwind classes (no hardcoded hex values)
</success_criteria>

<output>
After completion, create `.planning/quick/19-fix-five-dark-mode-ux-errors-form-inputs/19-SUMMARY.md`
</output>

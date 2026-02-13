---
phase: quick-20
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/ui/Badge.tsx
  - src/app/blog/page.tsx
  - src/app/team/page.tsx
  - src/app/portfolio/page.tsx
autonomous: true

must_haves:
  truths:
    - "Badge component renders correctly in both light and dark themes"
    - "Blog category filter buttons show keyboard focus indicator"
    - "Blog newsletter input is visible in dark gradient section"
    - "Team member cards only show real social links"
    - "Portfolio sticky filter bar docks below fixed header"
  artifacts:
    - path: "src/components/ui/Badge.tsx"
      provides: "Dark mode variant styles"
      min_lines: 20
    - path: "src/app/blog/page.tsx"
      provides: "Focus-visible styles and dark-aware newsletter input"
      min_lines: 300
    - path: "src/app/team/page.tsx"
      provides: "Conditional social link rendering"
      min_lines: 180
    - path: "src/app/portfolio/page.tsx"
      provides: "Corrected sticky filter top offset"
      min_lines: 190
  key_links:
    - from: "src/components/ui/Badge.tsx"
      to: "Tailwind dark mode classes"
      via: "variantStyles object"
      pattern: "dark:"
    - from: "src/app/blog/page.tsx"
      to: "Newsletter input background"
      via: "className prop"
      pattern: "bg-.*dark:"
---

<objective>
Fix 5 design errors identified in UX audit: Badge dark mode support, blog filter keyboard focus, newsletter input visibility, broken team social links, and portfolio sticky filter offset.

Purpose: Eliminate visual accessibility issues and broken link patterns that degrade user experience in dark mode and keyboard navigation.
Output: All 5 design errors resolved with proper dark mode support, focus states, and layout corrections.
</objective>

<execution_context>
@C:/Users/sammy/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sammy/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@src/components/ui/Badge.tsx
@src/app/blog/page.tsx
@src/app/team/page.tsx
@src/app/portfolio/page.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix Badge dark mode and blog filter focus states</name>
  <files>
src/components/ui/Badge.tsx
src/app/blog/page.tsx
  </files>
  <action>
**Badge.tsx (lines 10-16):** Add dark mode variants to `variantStyles` object.

For `success` variant (line 15): Change from `bg-green-100 text-green-800` to `bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300`.

Check other variants for hardcoded light theme colors:
- `default` uses `bg-primary/10 text-primary` (theme-aware, OK)
- `accent` uses `bg-accent text-white` (theme-aware, OK)
- `secondary` uses `bg-secondary text-primary` (theme-aware, OK)
- `outline` uses `border border-primary text-primary` (theme-aware, OK)

Only `success` needs dark mode fix.

**blog/page.tsx (lines 215-224):** Add keyboard focus indicator to category filter buttons.

Find the button className around line 217-221. Add `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2` to the className string.

Current pattern (line 217-220):
```tsx
className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${...}`}
```

Update to:
```tsx
className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${...}`}
```

This provides WCAG 2.4.7 compliant keyboard focus indicator.
  </action>
  <verify>
Manual verification:
1. Run `npm run dev`
2. Navigate to /blog in browser
3. Toggle dark mode — success badges should be visible (green on dark background)
4. Press Tab key to navigate category filters — focused button should show accent-colored ring
5. Verify ring appears on all filter buttons when focused
  </verify>
  <done>
- Badge success variant has `dark:bg-green-900/30 dark:text-green-300` classes
- Blog category filter buttons have `focus-visible:ring-2 focus-visible:ring-accent` classes
- Keyboard Tab navigation shows visible focus ring on filter buttons
- Success badges are readable in both light and dark themes
  </done>
</task>

<task type="auto">
  <name>Task 2: Fix newsletter input dark mode and team social link visibility</name>
  <files>
src/app/blog/page.tsx
src/app/team/page.tsx
  </files>
  <action>
**blog/page.tsx (lines 302-306):** Add explicit background color to newsletter input.

Current raw input element (line 302-306) has no background color. The section uses `background="gradient"` (dark navy gradient).

Find the input element around line 302-305:
```tsx
<input
  type="email"
  placeholder="Enter your email"
  className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-secondary"
/>
```

Update className to include explicit backgrounds:
```tsx
className="flex-1 px-4 py-3 rounded-lg border-0 bg-white dark:bg-white/10 text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-secondary"
```

This ensures input is visible against dark gradient background in both themes.

**team/page.tsx (lines 158-180):** Hide social links when href is "#".

Current code unconditionally renders LinkedIn and Twitter links with href="#" (lines 159-171). These should only render when href is valid.

Update social links section (lines 158-180) to conditionally render:

```tsx
{/* Social Links */}
<div className="flex gap-3">
  {member.socials.linkedin !== "#" && (
    <a
      href={member.socials.linkedin}
      className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-white transition-colors"
      aria-label={`${member.name}'s LinkedIn`}
    >
      <Linkedin size={16} />
    </a>
  )}
  {member.socials.twitter !== "#" && (
    <a
      href={member.socials.twitter}
      className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-white transition-colors"
      aria-label={`${member.name}'s Twitter`}
    >
      <Twitter size={16} />
    </a>
  )}
  <a
    href={`mailto:${member.socials.email}`}
    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-white transition-colors"
    aria-label={`Email ${member.name}`}
  >
    <Mail size={16} />
  </a>
</div>
```

Email links always render (using mailto: protocol). LinkedIn/Twitter only render if href !== "#".
  </action>
  <verify>
Manual verification:
1. Navigate to /blog in browser
2. Scroll to newsletter section at bottom
3. Toggle dark mode — input field should be visible (white background in light mode, white/10 translucent in dark mode)
4. Verify placeholder text is readable in both modes
5. Navigate to /team in browser
6. Inspect team member cards — only email icon should appear (LinkedIn/Twitter hidden because href="#")
  </verify>
  <done>
- Newsletter input has `bg-white dark:bg-white/10` and text color classes
- Input is clearly visible in dark gradient section in both themes
- Placeholder text is readable in both modes
- Team member cards only show email icon (LinkedIn/Twitter hidden)
- No broken "#" links present on team page
  </done>
</task>

<task type="auto">
  <name>Task 3: Fix portfolio sticky filter bar offset</name>
  <files>
src/app/portfolio/page.tsx
  </files>
  <action>
**portfolio/page.tsx (line 190):** Update sticky filter bar top offset to account for fixed header.

Current code (line 190):
```tsx
<div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-6">
```

The site has a fixed header with height `h-20` (80px). Change `top-0` to `top-20`:

```tsx
<div className="sticky top-20 z-20 bg-background/95 backdrop-blur-md py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-6">
```

This ensures the sticky filter bar docks below the header instead of sliding underneath it during scroll.
  </action>
  <verify>
Manual verification:
1. Navigate to /portfolio in browser
2. Scroll down the page
3. Observe sticky filter bar behavior — should dock at 80px from top (below header)
4. Filter bar should never slide under or overlap with header
5. Test in both light and dark modes to ensure z-index and backdrop work correctly
  </verify>
  <done>
- Portfolio sticky filter bar uses `top-20` class
- Filter bar docks below fixed header (80px from top)
- No visual overlap between header and filter bar during scroll
- Behavior consistent in both light and dark modes
  </done>
</task>

</tasks>

<verification>
Run full manual UX verification:

1. **Badge Dark Mode**
   - Visit /blog and toggle dark mode
   - Verify success badges (green) are visible in dark theme
   - All badge variants render correctly in both themes

2. **Blog Filter Focus**
   - Visit /blog
   - Use Tab key to navigate category filter buttons
   - Each focused button shows accent-colored ring
   - Ring is visible in both light and dark modes

3. **Newsletter Input**
   - Visit /blog and scroll to newsletter section
   - Toggle dark mode
   - Input field is clearly visible in dark gradient background
   - Placeholder text is readable

4. **Team Social Links**
   - Visit /team
   - Inspect team member cards
   - Only email icons appear (LinkedIn/Twitter hidden)
   - No broken "#" links exist

5. **Portfolio Sticky Filter**
   - Visit /portfolio
   - Scroll down page
   - Sticky filter bar docks below header (80px from top)
   - No overlap with fixed header

All 5 design errors resolved with zero regressions.
</verification>

<success_criteria>
- Badge success variant has dark mode classes and is readable in dark theme
- Blog category filter buttons show focus-visible ring when navigated with keyboard
- Blog newsletter input has explicit background and text colors for dark mode visibility
- Team member social links only render when href is not "#"
- Portfolio sticky filter bar uses `top-20` and docks below fixed header
- All changes verified manually in browser in both light and dark modes
- Zero accessibility regressions introduced
</success_criteria>

<output>
After completion, create `.planning/quick/20-fix-5-design-errors-badge-dark-mode-blog/20-SUMMARY.md`
</output>

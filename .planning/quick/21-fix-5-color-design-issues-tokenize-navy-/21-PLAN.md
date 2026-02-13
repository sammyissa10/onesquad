---
phase: quick-21
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/app/globals.css
  - src/app/about/page.tsx
  - src/app/contact/page.tsx
  - src/app/portfolio/page.tsx
  - src/app/blog/page.tsx
  - src/components/sections/Comparison.tsx
  - src/components/animations/ResultsDashboardAnimation.tsx
  - src/components/ui/Container.tsx
  - src/components/ui/ScrollPromptBanner.tsx
  - src/components/chat/ChatWidget.tsx
  - src/app/templates/[slug]/demo/page.tsx
  - src/components/templates/TemplateCard.tsx
autonomous: true

must_haves:
  truths:
    - "All navy shade hardcodes replaced with semantic tokens"
    - "Peach color matches secondary color exactly"
    - "Gradient endpoints use highlight token consistently"
    - "Comparison section uses coral accent not ad-hoc red"
    - "Blog newsletter placeholder readable in dark mode"
  artifacts:
    - path: "src/app/globals.css"
      provides: "navy-section and navy-deep color tokens"
      contains: "--color-navy-section"
    - path: "src/components/sections/Comparison.tsx"
      provides: "Coral-themed Without section (no red)"
      pattern: "bg-coral/10"
  key_links:
    - from: "All page/component files"
      to: "globals.css color tokens"
      via: "Tailwind class replacement"
      pattern: "bg-(navy-section|navy-deep|highlight)"
---

<objective>
Fix 5 color/design consistency issues across the codebase.

Purpose: Establish semantic color tokens for navy shades, align peach/secondary colors, remove ad-hoc red from Comparison section, and improve dark mode readability.
Output: All hardcoded colors replaced with tokens, Comparison uses coral accent system, blog newsletter placeholder has proper contrast.
</objective>

<execution_context>
@C:/Users/sammy/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sammy/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@c:\Users\sammy\Projects\onesquad\.planning\PROJECT.md
@c:\Users\sammy\Projects\onesquad\.planning\STATE.md
@c:\Users\sammy\Projects\onesquad\src\app\globals.css
</context>

<tasks>

<task type="auto">
  <name>Task 1: Tokenize hardcoded navy shades and fix peach mismatch</name>
  <files>
    src/app/globals.css
    src/app/about/page.tsx
    src/app/contact/page.tsx
    src/app/portfolio/page.tsx
    src/components/sections/Comparison.tsx
    src/components/animations/ResultsDashboardAnimation.tsx
    src/components/ui/ScrollPromptBanner.tsx
    src/components/templates/TemplateCard.tsx
  </files>
  <action>
**globals.css:** Add two navy tokens to the `@theme inline` block (after line 58):
```css
--color-navy-section: #0F172A;
--color-navy-deep: #0e1e36;
```

Change line 57 from `--color-peach: #FAB383` to `--color-peach: #FFBD83` (matches secondary).

**about/page.tsx:** Replace all 4 occurrences of `bg-[#0F172A]` with `bg-navy-section` (lines 174, 247, 268, 335).

**contact/page.tsx:** Replace 2 occurrences of `bg-[#0F172A]` with `bg-navy-section` (lines 260, 490).

**portfolio/page.tsx:** Replace 2 occurrences of `bg-[#0F172A]` with `bg-navy-section` (lines 156, 265).

**TemplateCard.tsx:** Replace `bg-[#0F172A]` with `bg-navy-section` (line 105).

**Comparison.tsx:** Replace `bg-[#0e1e36]` with `bg-navy-deep` (line 124).

**ScrollPromptBanner.tsx:** Replace `bg-[#0e1e36]` with `bg-navy-deep` and `text-[#0e1e36]` with `text-navy-deep` (line 57).

**ResultsDashboardAnimation.tsx:** Replace `bg-[#0e1e36]` with `bg-navy-deep` (line 128, 130) and `bg-[#0a1628]` with `bg-navy` (line 145).
  </action>
  <verify>
```bash
# Verify no hardcoded navy shades remain
! grep -r "bg-\[#0[FfEe]1[78Ee]" src/app src/components --include="*.tsx"
! grep -r "text-\[#0e1e36\]" src/components --include="*.tsx"

# Verify peach token updated
grep "color-peach: #FFBD83" src/app/globals.css

# Verify tokens exist
grep "navy-section" src/app/globals.css
grep "navy-deep" src/app/globals.css
```
  </verify>
  <done>All hardcoded navy shades replaced with semantic tokens (navy-section, navy-deep), peach matches secondary (#FFBD83), no hardcoded hex values in affected files.</done>
</task>

<task type="auto">
  <name>Task 2: Replace gradient hardcodes and Comparison red with coral</name>
  <files>
    src/components/ui/Container.tsx
    src/components/chat/ChatWidget.tsx
    src/app/templates/[slug]/demo/page.tsx
    src/components/sections/Comparison.tsx
  </files>
  <action>
**Container.tsx:** Replace `to-[#27598E]` with `to-highlight` (line 56).

**ChatWidget.tsx:** Replace `to-[#27598E]` with `to-highlight` (line 53).

**templates/[slug]/demo/page.tsx:** Replace `to-[#27598E]` with `to-highlight` (line 21).

**Comparison.tsx:** Replace all red colors with coral accent system (Without OneSquad section):
- Line 143: `bg-red-500/10` → `bg-coral/10`
- Line 143: `border-red-500/20` → `border-coral/20`
- Line 144: `text-red-400` → `text-coral/60`
- Line 146: `text-red-400` → `text-coral/60`
- Line 153: `border-red-500/15` → `border-coral/15`
- Line 156: `bg-red-500/10` → `bg-coral/10`
- Line 157: `text-red-400` → `text-coral/60`
- Line 160: `decoration-red-500/40` → `decoration-coral/40`

Do NOT change any Tailwind class names that don't involve colors (e.g., keep flex, gap, rounded classes intact).
  </action>
  <verify>
```bash
# Verify no hardcoded gradient endpoint
! grep "to-\[#27598E\]" src/components/ui/Container.tsx src/components/chat/ChatWidget.tsx src/app/templates

# Verify no red colors in Comparison
! grep "red-" src/components/sections/Comparison.tsx

# Verify coral used instead
grep "bg-coral/10" src/components/sections/Comparison.tsx
grep "text-coral/60" src/components/sections/Comparison.tsx
```
  </verify>
  <done>Gradient endpoints use to-highlight token consistently, Comparison section uses coral accent system (no red classes), visual consistency with brand color palette.</done>
</task>

<task type="auto">
  <name>Task 3: Fix blog newsletter placeholder dark mode contrast</name>
  <files>
    src/app/blog/page.tsx
  </files>
  <action>
In blog/page.tsx line 305, change `dark:placeholder:text-white/50` to `dark:placeholder:text-white/70`.

This increases dark mode placeholder opacity from 50% to 70% for better readability while maintaining subtle visual hierarchy.
  </action>
  <verify>
```bash
# Verify placeholder contrast updated
grep "dark:placeholder:text-white/70" src/app/blog/page.tsx

# Verify old value removed
! grep "dark:placeholder:text-white/50" src/app/blog/page.tsx
```
  </verify>
  <done>Blog newsletter input placeholder readable in dark mode (70% opacity instead of 50%).</done>
</task>

</tasks>

<verification>
1. Run dev server and check affected pages in both light and dark mode
2. Verify navy sections use consistent color tokens
3. Verify Comparison "Without" section uses coral (not red)
4. Verify gradients use highlight token
5. Verify blog newsletter placeholder visible in dark mode
</verification>

<success_criteria>
- [ ] No hardcoded navy hex values in tsx files (all use tokens)
- [ ] Peach color matches secondary (#FFBD83)
- [ ] All gradients use to-highlight endpoint
- [ ] Comparison section uses coral accent system
- [ ] Blog newsletter placeholder has 70% opacity in dark mode
- [ ] Visual inspection confirms consistency
</success_criteria>

<output>
After completion, create `.planning/quick/21-fix-5-color-design-issues-tokenize-navy-/21-SUMMARY.md`
</output>

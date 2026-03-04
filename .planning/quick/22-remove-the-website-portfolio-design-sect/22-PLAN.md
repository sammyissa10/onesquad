---
phase: quick-22
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/app/page.tsx
  - src/components/sections/index.ts
  - src/components/sections/PortfolioPreview.tsx
  - src/components/sections/Comparison.tsx
autonomous: true
must_haves:
  truths:
    - "Homepage no longer renders the PortfolioPreview section"
    - "No visual gap or layout break where the section was removed"
    - "Site builds and runs without errors"
  artifacts:
    - path: "src/app/page.tsx"
      provides: "Homepage without PortfolioPreview"
    - path: "src/components/sections/index.ts"
      provides: "Barrel export without PortfolioPreview"
  key_links: []
---

<objective>
Remove the PortfolioPreview section from the homepage entirely.

Purpose: User wants the portfolio design showcase section removed from the site homepage.
Output: Homepage renders without the PortfolioPreview section, component file deleted, no dead code.
</objective>

<execution_context>
@C:/Users/sammy/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sammy/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/app/page.tsx
@src/components/sections/index.ts
@src/components/sections/PortfolioPreview.tsx
@src/components/sections/Comparison.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Remove PortfolioPreview from homepage and clean up</name>
  <files>
    src/app/page.tsx
    src/components/sections/index.ts
    src/components/sections/PortfolioPreview.tsx
    src/components/sections/Comparison.tsx
  </files>
  <action>
1. In `src/app/page.tsx`: Remove the `PortfolioPreview` import from the named imports on line 9, and remove the `<PortfolioPreview />` JSX element on line 26. Leave all other sections intact. The section order after removal should be: Hero, Features, ServicesPreview, ScrollPromptBanner, Comparison, Process, Testimonials, HomeFAQ, CTABanner.

2. In `src/components/sections/index.ts`: Remove line 8 (`export { PortfolioPreview } from "./PortfolioPreview";`).

3. Delete the file `src/components/sections/PortfolioPreview.tsx` entirely.

4. In `src/components/sections/Comparison.tsx` around line 213: Update the comment `{/* Bottom gradient border for visual separation from PortfolioPreview */}` to say `{/* Bottom gradient border for visual separation from Process */}` since Process is now the next section after Comparison. Keep the gradient div itself unchanged.
  </action>
  <verify>
Run `npm run build` to confirm no build errors (no broken imports or references to PortfolioPreview). Verify with `grep -r "PortfolioPreview" src/` that no references remain in source code (the e2e and other non-src references are fine to leave).
  </verify>
  <done>
Homepage builds successfully without the PortfolioPreview section. No dead imports or references in src/. The PortfolioPreview.tsx file no longer exists.
  </done>
</task>

</tasks>

<verification>
- `npm run build` completes without errors
- `grep -ri "PortfolioPreview" src/` returns no results
- `src/components/sections/PortfolioPreview.tsx` does not exist
- Homepage section order: Hero > Features > ServicesPreview > ScrollPromptBanner > Comparison > Process > Testimonials > HomeFAQ > CTABanner
</verification>

<success_criteria>
The PortfolioPreview section is fully removed from the homepage with no dead code, broken imports, or build errors.
</success_criteria>

<output>
After completion, create `.planning/quick/22-remove-the-website-portfolio-design-sect/22-SUMMARY.md`
</output>

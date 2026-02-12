---
phase: quick-15
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/Hero.tsx
  - src/components/layout/Header.tsx
  - src/components/sections/ScrollPromptBanner.tsx
  - src/components/sections/ServicesPreview.tsx
  - src/components/sections/PortfolioPreview.tsx
  - src/components/sections/HomeFAQ.tsx
  - src/components/sections/CTABanner.tsx
  - src/components/sections/Testimonials.tsx
autonomous: true
must_haves:
  truths:
    - "Hero H1 reads 'You Didn't Start a Business to Fight With Your Website'"
    - "All CTA buttons across the homepage reflect the new conversion-focused copy"
    - "Each testimonial card shows a bold stat callout badge above the star rating"
    - "Header CTA button reads 'Get Started' instead of 'Hire Us'"
  artifacts:
    - path: "src/components/sections/Hero.tsx"
      provides: "New hero headline, subheading, and CTA button text"
    - path: "src/components/sections/Testimonials.tsx"
      provides: "Stat callout badges above each testimonial card"
    - path: "src/components/sections/CTABanner.tsx"
      provides: "Updated CTA button copy"
    - path: "src/components/layout/Header.tsx"
      provides: "Updated header CTA button text"
  key_links:
    - from: "src/components/sections/Testimonials.tsx"
      to: "src/lib/constants.ts"
      via: "testimonials array import"
      pattern: "testimonials\\.map"
---

<objective>
Rewrite homepage copy for higher conversion: hero headline/subheading/CTAs, all section CTA buttons, header CTA, CTA banner buttons, and add stat callout badges to testimonial cards.

Purpose: Shift from generic agency language to pain-point-driven, specific, benefit-oriented copy that builds trust and drives action.
Output: Updated copy across 8 component files.
</objective>

<execution_context>
@C:/Users/sammy/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sammy/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/components/sections/Hero.tsx
@src/components/layout/Header.tsx
@src/components/sections/ScrollPromptBanner.tsx
@src/components/sections/ServicesPreview.tsx
@src/components/sections/PortfolioPreview.tsx
@src/components/sections/HomeFAQ.tsx
@src/components/sections/CTABanner.tsx
@src/components/sections/Testimonials.tsx
@src/lib/constants.ts
</context>

<tasks>

<task type="auto">
  <name>Task 1: Rewrite Hero, Header, and all section CTA button copy</name>
  <files>
    src/components/sections/Hero.tsx
    src/components/layout/Header.tsx
    src/components/sections/ScrollPromptBanner.tsx
    src/components/sections/ServicesPreview.tsx
    src/components/sections/PortfolioPreview.tsx
    src/components/sections/HomeFAQ.tsx
    src/components/sections/CTABanner.tsx
  </files>
  <action>
    Update text strings in each file. Do NOT change any structure, styling, imports, or animation logic — only swap copy.

    **Hero.tsx (src/components/sections/Hero.tsx):**
    - Line 48-50: H1 text. Change to: `You Didn&apos;t Start a Business to Fight With Your` then `<span className="text-coral">Website</span>`. Note: use `&apos;` for the apostrophe in "Didn't" since this is JSX.
    - Line 53: Subheading. Change to: `Hand off the digital stuff to a team that does this every day. Design, SEO, ads, hosting — handled. You just approve and grow.`
    - Line 64: Button text. Change from `See Our Plans` to `See What You'd Pay`. Note: use `See What You&apos;d Pay` for JSX.
    - Line 76: Button text. Change from `Get a Free Quote` to `Get a Free Mockup in 24hrs`

    **Header.tsx (src/components/layout/Header.tsx):**
    - Line 142: Desktop CTA button text. Change `Hire Us` to `Get Started`
    - Line 247: Mobile CTA button text. Change `Hire Us` to `Get Started`

    **ScrollPromptBanner.tsx (src/components/sections/ScrollPromptBanner.tsx):**
    - Line 93: Link text. Change `Get a Free Mockup` to `Send Me My Free Mockup →`. Use the literal arrow character (→) at the end.

    **ServicesPreview.tsx (src/components/sections/ServicesPreview.tsx):**
    - Line 159: Button text. Change `View All Services` to `Find Your Perfect Plan`

    **PortfolioPreview.tsx (src/components/sections/PortfolioPreview.tsx):**
    - Line 78: Button text. Change `View All Templates ({templates.length})` to `Browse Real Client Sites`. Remove the `({templates.length})` count — the user said "keep the count if it was there" but "Browse Real Client Sites" is the specified new copy; append the count: `Browse Real Client Sites ({templates.length})`

    **HomeFAQ.tsx (src/components/sections/HomeFAQ.tsx):**
    - Line 103: Button text. Change `Let&apos;s Talk` to `Book a 15-Min Call (Free)`

    **CTABanner.tsx (src/components/sections/CTABanner.tsx):**
    - Line 58: Primary button text. Change `See Our Plans` to `Pick Your Plan — Cancel Anytime`. Use em dash (—).
    - Line 70: Secondary button text. Change `Schedule a Call` to `Talk to a Human in 24hrs`
  </action>
  <verify>
    Run `npx next build` or `npx next lint` to confirm no syntax errors. Manually grep for old copy strings to confirm none remain:
    - `grep -r "Hire Us" src/components/`
    - `grep -r "See Our Plans" src/components/`
    - `grep -r "Get a Free Quote" src/components/`
    - `grep -r "View All Services" src/components/`
    - `grep -r "Let's Talk" src/components/` (check both raw and escaped forms)
    - `grep -r "Schedule a Call" src/components/`
    - `grep -r "Get a Free Mockup\"" src/components/sections/ScrollPromptBanner`
    All should return 0 matches.
  </verify>
  <done>All 7 component files contain the new copy. No old copy strings remain. Build/lint passes without errors.</done>
</task>

<task type="auto">
  <name>Task 2: Add stat callout badges to testimonial cards</name>
  <files>
    src/components/sections/Testimonials.tsx
  </files>
  <action>
    Add a bold stat callout badge above the star rating in each testimonial card. The badges should map by testimonial name (or index since the array order is stable):

    - Index 0 (Sarah Johnson): "3x Traffic Growth"
    - Index 1 (Michael Chen): "180% Organic Growth"
    - Index 2 (Emily Rodriguez): "Zero Stress"

    Implementation approach:
    1. Create a `statBadges` map at the top of the component (or inline object) mapping testimonial id to badge text:
       ```tsx
       const statBadges: Record<string, string> = {
         "1": "3x Traffic Growth",
         "2": "180% Organic Growth",
         "3": "Zero Stress",
       };
       ```

    2. Inside the `.testimonial-card` div, BEFORE the star rating div (line 56), add the badge:
       ```tsx
       {statBadges[testimonial.id] && (
         <div className="inline-block bg-coral/15 text-coral text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-3">
           {statBadges[testimonial.id]}
         </div>
       )}
       ```

    Styling rationale:
    - `bg-coral/15 text-coral`: Matches the coral accent theme with a subtle background
    - `text-xs font-bold uppercase tracking-wider`: Bold, small-caps badge feel — attention-grabbing without being garish
    - `px-3 py-1.5 rounded-full`: Pill-shaped badge
    - `mb-3`: Spacing before star rating
    - `inline-block`: Badge hugs the text width rather than stretching full width

    Do NOT change any other part of the Testimonials component — same animations, layout, structure.
  </action>
  <verify>
    Run `npx next build` or `npx next lint` to confirm no syntax or type errors.
    Grep for the badge text to confirm it exists: `grep -r "3x Traffic Growth" src/components/sections/Testimonials.tsx`
    Visually: each testimonial card should show a coral pill badge above the stars with the relevant stat text.
  </verify>
  <done>Each of the 3 testimonial cards displays a bold stat callout badge (coral pill) above the star rating. Badge text matches specification: "3x Traffic Growth", "180% Organic Growth", "Zero Stress".</done>
</task>

</tasks>

<verification>
- `npx next build` completes without errors
- All old copy strings are gone (verified via grep)
- New hero H1 reads "You Didn't Start a Business to Fight With Your Website"
- All CTA buttons reflect new copy
- Testimonial cards each show stat badges
- No structural, styling, or animation changes — only copy and the badge additions
</verification>

<success_criteria>
Homepage copy is fully updated: hero headline/subheading/CTAs, all 6 section CTA buttons, header CTA, CTA banner buttons rewritten. Testimonial cards display stat callout badges. Site builds and renders without errors.
</success_criteria>

<output>
After completion, create `.planning/quick/15-phase-1-copy-rewrite-hero-headline-cta-b/15-SUMMARY.md`
</output>

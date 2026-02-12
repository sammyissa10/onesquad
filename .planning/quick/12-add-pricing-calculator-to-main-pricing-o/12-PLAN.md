---
phase: quick-12
plan: 1
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/pricing/SocialCalculator.tsx
  - src/components/pricing/WebsiteCalculator.tsx
  - src/components/pricing/EcommerceCalculator.tsx
  - src/app/pricing/page.tsx
  - src/app/pricing/social/page.tsx
  - src/app/pricing/website/page.tsx
  - src/app/pricing/ecommerce/page.tsx
autonomous: true
must_haves:
  truths:
    - "User can select a tier on the pricing overview page and interact with its calculator inline"
    - "Each tier calculator retains its distinct visual personality (social=playful/scale, website=premium/glow, ecommerce=data-driven/lift+shadow)"
    - "The existing individual tier pages still work and use the same extracted components"
    - "Users see a tier selector that visually matches the existing gateway cards style"
  artifacts:
    - path: "src/components/pricing/SocialCalculator.tsx"
      provides: "Extracted social media calculator component"
    - path: "src/components/pricing/WebsiteCalculator.tsx"
      provides: "Extracted website calculator component"
    - path: "src/components/pricing/EcommerceCalculator.tsx"
      provides: "Extracted ecommerce calculator component"
    - path: "src/app/pricing/page.tsx"
      provides: "Updated pricing overview with inline calculators"
  key_links:
    - from: "src/app/pricing/page.tsx"
      to: "src/components/pricing/*Calculator.tsx"
      via: "dynamic import based on selected tier"
      pattern: "activeTier.*SocialCalculator|WebsiteCalculator|EcommerceCalculator"
---

<objective>
Add pricing calculators inline on the main pricing overview page (/pricing) so users can configure and price any tier without navigating to separate pages.

Purpose: Users currently must click through to /pricing/social, /pricing/website, or /pricing/ecommerce to use the calculators. Embedding them on the overview page reduces friction and lets users compare tiers more easily.

Output: Extracted calculator components for each tier + updated pricing overview page with tier-tabbed calculator section.
</objective>

<execution_context>
@C:/Users/sammy/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sammy/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/app/pricing/page.tsx
@src/app/pricing/social/page.tsx
@src/app/pricing/website/page.tsx
@src/app/pricing/ecommerce/page.tsx
@src/components/sections/PricingCalculator.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Extract tier calculators into reusable components</name>
  <files>
    src/components/pricing/SocialCalculator.tsx
    src/components/pricing/WebsiteCalculator.tsx
    src/components/pricing/EcommerceCalculator.tsx
    src/app/pricing/social/page.tsx
    src/app/pricing/website/page.tsx
    src/app/pricing/ecommerce/page.tsx
  </files>
  <action>
    Create `src/components/pricing/` directory with three calculator components extracted from the individual tier pages.

    **SocialCalculator.tsx:** Extract the calculator section (steps, state, options, toggle functions, calculateTotal, step indicators, step content, inline summary, navigation buttons) from `src/app/pricing/social/page.tsx` into a standalone `SocialCalculator` component. Keep ALL animation variants (socialFadeIn, socialStagger, socialItem), ALL pricing data (platforms, postFrequency, contentTypes, engagementServices, contractLength, supportLevel, BASE_PRICE), ALL state management (currentStep, settings, toggle functions, calculateTotal), and the FULL multi-step wizard UI including step indicators, AnimatePresence step content, inline summary bar, and navigation buttons. The component should render just the calculator section content (the dark navy bg-navy section content from the tier page, without the outer `<section>` wrapper or Container — the parent will provide those). Do NOT include the hero section or confirmation section — just the interactive calculator wizard. Keep the distinct social personality: filled circle step indicators with spring bounce, coral selected states, scale hover on buttons (whileHover scale 1.05), fast 0.2s transitions.

    **WebsiteCalculator.tsx:** Extract the calculator section from `src/app/pricing/website/page.tsx` into a standalone `WebsiteCalculator` component. Keep ALL animation variants (premiumFadeIn, premiumStagger, premiumItem), ALL pricing data, state, and the FULL sidebar+main layout (340px sidebar + form area). The component renders the `lg:grid-cols-[340px_1fr]` grid with sticky sidebar summary and main step content area. Keep the distinct website personality: numbered badge step indicators with glow boxShadow, coral/5 border selected states (not filled), slower 0.4-0.6s transitions, premium easing [0.22, 1, 0.36, 1], glow hover (whileHover boxShadow). Include nav buttons and confirmation step.

    **EcommerceCalculator.tsx:** Extract the calculator section from `src/app/pricing/ecommerce/page.tsx` into a standalone `EcommerceCalculator` component. Keep ALL animation variants (growthFadeIn, growthStagger, growthItem), ALL pricing data, state, and the FULL split-screen layout (50/50 grid). The component renders the `lg:grid-cols-2` grid with left navy dashboard panel (sticky, showing investment + selected features + progress bar) and right configuration panel. Include the mobile sticky summary bar. Keep the distinct ecommerce personality: navy-fill selected states (not coral), progress bar step indicators with gradient fill, spring animations (stiffness 200, damping 20), lift+shadow hover (whileHover y -4 + boxShadow). Include nav buttons and launch step.

    **Update the three tier page files** to import and use the extracted components instead of inline code. Each tier page should keep its own hero section and confirmation section, but delegate the calculator wizard to the new component. Pass a prop like `onComplete?: () => void` or use the existing step flow where step 3 (final) is already handled inside the component. The tier pages should still render Header, Footer, Breadcrumb, hero, and the calculator wrapped in the appropriate section/Container. The refactored pages should look and behave identically to before.

    IMPORTANT: Preserve every visual detail — animation variants, timing, easing, hover patterns, selected state styling, layout structure. Each calculator MUST retain its unique personality. Do not normalize or unify their styling.
  </action>
  <verify>
    Run `npx next build` to confirm no TypeScript errors or build failures. Visit /pricing/social, /pricing/website, and /pricing/ecommerce to confirm they render and function identically to before the refactor.
  </verify>
  <done>
    Three extracted calculator components exist in src/components/pricing/. Each individual tier page imports and uses its component. All three tier pages render and function identically to before.
  </done>
</task>

<task type="auto">
  <name>Task 2: Add tier-tabbed calculator section to pricing overview page</name>
  <files>
    src/app/pricing/page.tsx
  </files>
  <action>
    Modify the pricing overview page to add an interactive calculator section between the Tier Gateway Cards section and the Hosting/Managed Plans section.

    **Replace the gateway cards with interactive tier selector + calculator:**

    Instead of keeping the gateway cards as navigation-only links, transform the Tier Gateway Cards section into both a selector AND a gateway. The cards should:
    1. Still show the same visual design (coral stripe for social, navy/5 bg for website, gradient border for ecommerce) with the same hover patterns (scale, glow, lift+shadow)
    2. When clicked, instead of navigating to a separate page, expand a calculator section below the cards
    3. Add a visual indicator (coral bottom border or highlighted state) on the selected card
    4. Keep a small "Open full page" link on each card (using the existing href) for users who prefer the dedicated page experience

    **Calculator section (new, below the tier cards):**

    Add a new section that conditionally renders when a tier is selected. Use state `activeTier: 'social' | 'website' | 'ecommerce' | null` (default null).

    When a tier is selected:
    - Show the section with a smooth AnimatePresence enter (fadeUp, 0.3s)
    - Render the appropriate calculator component: `<SocialCalculator />`, `<WebsiteCalculator />`, or `<EcommerceCalculator />`
    - Wrap each calculator in a section with appropriate background: navy for social (matching its tier page), white for website (matching its tier page), white with muted/30 right panel for ecommerce
    - Add a "Choose a different service" button or make the tier cards re-clickable to switch

    When switching tiers:
    - Use AnimatePresence mode="wait" so the outgoing calculator exits before the incoming one enters
    - Each calculator maintains its own internal state independently (selecting a different tier and coming back should NOT reset the previous calculator's selections)

    **Visual integration details:**
    - The tier selector cards section keeps bg-white
    - Selected card gets a coral ring (ring-2 ring-coral) and slightly scales up
    - Unselected cards remain interactive but slightly muted (opacity-80)
    - Calculator section below uses each tier's natural background color for visual personality
    - Social calculator section: bg-navy (dark, playful)
    - Website calculator section: bg-white (clean, premium)
    - Ecommerce calculator section: bg-white (split-screen layout handles its own dark panel)

    **GSAP scroll animations:** Add the calculator section to the existing useScrollAnimation hook. Use a fadeUp animation on the calculator container with TRIGGERS.standard start. The calculator should animate in on first scroll but NOT re-animate when switching tiers (AnimatePresence handles tier transitions).

    Keep the rest of the page unchanged: hero, hosting/managed plans, FAQ sections remain as-is.
  </action>
  <verify>
    Run `npx next build` for build verification. Visit /pricing and verify:
    1. Three tier cards are visible with distinct styles
    2. Clicking a card reveals the calculator below with correct visual personality
    3. Switching between tiers shows smooth transitions
    4. Each calculator is fully functional (steps, selections, pricing updates)
    5. "Open full page" links still navigate to /pricing/social, /pricing/website, /pricing/ecommerce
    6. Hosting/managed plans section and FAQ still appear below
    7. Page scroll animations still work correctly
  </verify>
  <done>
    The pricing overview page shows interactive tier selector cards that expand to reveal the full calculator for each tier inline. Users can configure pricing for any tier without leaving the page. Each calculator retains its distinct visual personality. The individual tier pages still work via direct links.
  </done>
</task>

</tasks>

<verification>
- `npx next build` passes with no errors
- All four pricing pages (/pricing, /pricing/social, /pricing/website, /pricing/ecommerce) render correctly
- Each inline calculator on the overview page matches its dedicated page's visual personality
- Calculator state persists when switching between tiers (coming back doesn't reset selections)
- Scroll animations work on the pricing overview page
- Mobile responsive layout works for all three calculator variants
</verification>

<success_criteria>
Users can select any tier on the /pricing page and interact with its full calculator inline without navigation. Each calculator retains its distinct visual identity (social=playful, website=premium, ecommerce=data-driven). Individual tier pages still function via the extracted components.
</success_criteria>

<output>
After completion, create `.planning/quick/12-add-pricing-calculator-to-main-pricing-o/12-SUMMARY.md`
</output>

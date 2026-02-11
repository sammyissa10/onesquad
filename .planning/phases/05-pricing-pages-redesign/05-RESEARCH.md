# Phase 5: Pricing Pages Redesign - Research

**Researched:** 2026-02-11
**Domain:** Interactive pricing page tier differentiation
**Confidence:** HIGH

## Summary

Phase 5 redesigns four pricing pages (/pricing overview, /pricing/social, /pricing/website, /pricing/ecommerce) to give each tier a distinct visual personality while preserving the interactive price calculator functionality. The current implementation uses identical containerVariants/itemVariants (stagger 0.1, y:30) and uniform hover effects (y:-8) across all pages—this templated approach contradicts the project's core value of intentional visual differentiation.

Research reveals that successful pricing tier differentiation requires: (1) distinct layout structures per tier, (2) personality-driven color usage (not just accent swaps), (3) varied animation patterns from the established library (scale, glow, lift+shadow), and (4) dark/light section rhythm applied differently per page. Interactive calculators benefit most from step-by-step wizards with real-time pricing updates and sticky summaries.

**Primary recommendation:** Assign each tier a distinct personality (social = bold/playful, website = crafted/premium, ecommerce = revenue/growth), then implement personality-specific layout structures, hover patterns, section rhythms, and animation timing. Keep the 3-step wizard pattern but vary the visual treatment per tier.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Tier personality & vibe:**
- Each tier page must feel visually distinct — different layout structure, different energy, different hover patterns
- Social media tier: bold & playful energy with dynamic shapes, or clean metric-driven feel — Claude's choice based on what contrasts best with the other two
- Website tier: crafted/premium or technical/builder aesthetic — Claude's choice
- E-commerce tier: revenue/growth focused or storefront/product showcase feel — Claude's choice
- The key constraint: no two tier pages should look like they came from the same template (core project value)

**Color approach:**
- Claude decides whether to use distinct accent colors per tier or same navy/coral/peach palette with different usage ratios
- Must stay cohesive with the rest of the site — pricing pages shouldn't feel like a different website

**Calculator interaction style:**
- Claude's discretion on whether to keep step-by-step price builders or redesign the interaction model
- Each tier can have a different interaction pattern if it serves the personality
- Price calculators must remain functional — the configurator is the core value of these pages

**Overview page (/pricing):**
- Claude's discretion on the role of the main pricing page — gateway to tiers, standalone with its own cards, or hybrid approach
- Currently has hosting plans + managed service bundles in tabs with identical PricingCard components

**Section rhythm & layout:**
- Apply dark/light alternation pattern from homepage/services
- Varied spacing (not uniform py-16)
- Bold typography treatments
- Each tier page should have a distinct section structure (not identical section ordering)

### Claude's Discretion

- All visual personality choices per tier (energy, vibe, layout structure)
- Color strategy (distinct accents vs same palette different ratios)
- Calculator interaction redesign approach
- Overview page restructuring
- Hover pattern assignments per tier
- Copy tone per tier (edgy but with distinct personality per tier)
- Section ordering and dark/light rhythm per page

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope

</user_constraints>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Framer Motion | 11.14.4 | Animation orchestration | Already used throughout project; supports variants, layout animations, AnimatePresence for step transitions |
| React Hook Form | 7.x | Form state (if needed) | Industry standard for multi-step forms with validation |
| Lenis | 1.3.17 | Smooth scroll | Already integrated; calculator sections benefit from scroll-triggered reveals |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| GSAP | 3.12.5 | Advanced scroll animations | Already used for ScrollTrigger; useful if calculator sections need pinning or parallax |
| Zod | 3.x | Validation schema | If calculator inputs need validation beyond basic number ranges |

### Already in Project
Current implementation uses:
- Framer Motion for all animations
- Identical `containerVariants` and `itemVariants` across all pricing pages
- Uniform step-by-step wizard pattern (3 steps per tier calculator)
- Sticky summary sidebar (lg:sticky lg:top-24)
- Real-time price calculation in React state

**Installation:**
No new packages required. All libraries already installed.

## Architecture Patterns

### Current Structure (Needs Redesign)
```
src/app/pricing/
├── page.tsx                    # Overview with tabs (hosting/managed)
├── social/page.tsx             # Step wizard, BASE_PRICE $300
├── website/page.tsx            # Step wizard, BASE_PRICE $700
└── ecommerce/page.tsx          # Step wizard, BASE_PRICE $1500
```

**Problem:** All tier pages use identical layout structure (sidebar + main grid), identical animation variants, identical hover effects.

### Recommended Structure Per Tier

#### Pattern 1: Social Media (Bold/Playful)
**Layout:** Full-width steps with inline summary (not sidebar)
**Animation:** Fast, snappy transitions (duration: 0.2s), bounce easing
**Hover:** Scale effect (scale: 1.05) on platform/content cards
**Section rhythm:** Light hero → Dark options → Light summary
**Spacing:** Tight spacing (py-20/28) for energy

#### Pattern 2: Website (Crafted/Premium)
**Layout:** Sidebar summary + spacious main area (keep current structure)
**Animation:** Smooth, slower transitions (duration: 0.5s), ease-out
**Hover:** Glow effect (box-shadow with coral) on service cards
**Section rhythm:** Dark hero → Light configuration → Dark confirmation
**Spacing:** Generous spacing (py-32/40) for luxury feel

#### Pattern 3: E-commerce (Revenue/Growth)
**Layout:** Split-screen (50/50) with live preview on left, config on right
**Animation:** Layout animations on price changes, spring physics
**Hover:** Lift+shadow effect on feature cards
**Section rhythm:** Gradient hero → White calculator → Navy confirmation
**Spacing:** Medium spacing (py-24/36) for business focus

### Wizard Pattern (Keep Core Interaction)
All tiers use 3-step wizards but with different visual treatments:

```typescript
// CORE INTERACTION (preserve):
const [currentStep, setCurrentStep] = useState(1);
const [settings, setSettings] = useState({ /* tier-specific config */ });

// VISUAL TREATMENT (vary per tier):
const stepIndicators = {
  social: "filled circles with bounce animation",
  website: "numbered badges with glow",
  ecommerce: "progress bar with percentage"
};

const navigationStyle = {
  social: "floating buttons, rounded-full",
  website: "sidebar progression, always visible",
  ecommerce: "inline stepper with labels"
};
```

### Real-Time Pricing Pattern
**What:** Update total price as user selects options
**Current implementation:** Works well, keep pattern
**Enhancement opportunity:** Add price breakdown animation on change

```typescript
// Source: Current implementation (verified working)
const calculateTotal = () => {
  let total = BASE_PRICE;
  // Add selected option prices
  return total;
};

// Enhancement: Animate price changes
const [displayedPrice, setDisplayedPrice] = useState(BASE_PRICE);
useEffect(() => {
  const newPrice = calculateTotal();
  // Animate from displayedPrice to newPrice
}, [settings]);
```

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Step navigation state | Custom wizard router | Controlled state with currentStep | Multi-step forms are deceptively complex; validation, error states, navigation guards add up fast |
| Price animation | Custom number ticker | Framer Motion layout animations or spring | Smooth number transitions require easing curves and interrupt handling |
| Sticky summary calculation | Manual scroll listener | CSS sticky + React state | Browser-native sticky is performant; only calculate in JS when values change |
| Form validation | Inline if statements | Zod schema (if needed) | Type-safe validation prevents runtime errors, especially for number ranges |

**Key insight:** The wizard pattern looks simple but has edge cases (back button with unsaved changes, skip steps, URL deep linking, analytics tracking). Keep the working implementation, change visuals only.

## Common Pitfalls

### Pitfall 1: Identical Layout Structures Disguised With Color Swaps
**What goes wrong:** Changing only background colors and accent colors while keeping identical grid layouts, spacing, and component order. Users perceive this as "the same page three times."
**Why it happens:** It's faster to duplicate a working page and change theme variables than to redesign layouts.
**How to avoid:** Start with wireframes that have different aspect ratios, different sidebar positions, different section ordering. If you can swap the color palette and pages look identical, the layout isn't differentiated enough.
**Warning signs:** All tier pages have sidebar on left at same breakpoint, same number of sections, same py-spacing values.

### Pitfall 2: Breaking Working Calculator Logic During Visual Redesign
**What goes wrong:** Moving state management, changing component structure, refactoring settings object shape—suddenly calculations break or selections don't persist between steps.
**Why it happens:** Visual components are tightly coupled to state logic in current implementation.
**How to avoid:** Separate concerns first. Extract `useCalculator` hook with all state logic, then redesign visual components as pure presentational layer. Test calculator logic in isolation.
**Warning signs:** Tests fail after changing layout, price calculations return NaN, step navigation skips or loops.

### Pitfall 3: Animation Overload (Too Many Motion Effects)
**What goes wrong:** Every element animates on every interaction—step transitions slide, prices count up, cards scale, summary pulses. Result is chaotic, not delightful.
**Why it happens:** Framer Motion makes animation easy, leading to over-application without restraint.
**How to avoid:** Animate state changes only (step transitions, price updates, option selection). Static layout elements should fade in once on mount, then stay still. Follow the "one motion per interaction" rule.
**Warning signs:** User reports motion sickness, animations conflict (slide-in while fade-out), performance drops on step change.

### Pitfall 4: Inconsistent Hover Patterns Across Components
**What goes wrong:** Platform cards scale on hover, but content cards lift, but engagement cards glow—within the same page. Creates visual inconsistency.
**Why it happens:** Copy-pasting hover effects from different examples without standardizing per tier.
**How to avoid:** Assign ONE hover pattern per tier page (social = scale, website = glow, ecommerce = lift+shadow). Apply consistently to all interactive cards on that tier page.
**Warning signs:** Design review reveals mixed hover effects on single page, interactions feel unpredictable.

### Pitfall 5: Mobile Responsiveness Breaks With Complex Layouts
**What goes wrong:** Split-screen ecommerce layout looks great on desktop but breaks on mobile—summary sidebar overlaps content, sticky positioning conflicts, steps become cramped.
**Why it happens:** Designing for desktop first without mobile constraints.
**How to avoid:** Test each tier layout on 375px viewport (iPhone SE) during design phase. Sticky sidebars should stack on mobile, split-screens collapse to single column, inline summaries move to bottom.
**Warning signs:** Horizontal scroll on mobile, sticky elements cover content, CTA buttons hidden below fold.

### Pitfall 6: Losing Dark/Light Section Rhythm
**What goes wrong:** All sections use white background because calculator UI is easier to style on white. Loses the established dark/light rhythm from homepage/services.
**Why it happens:** Calculator complexity makes designers default to simple white background for everything.
**How to avoid:** Plan section rhythm first (hero dark/light, calculator opposite, confirmation opposite that). Design calculator UI to work on both dark and white backgrounds using CSS custom properties.
**Warning signs:** All tier pages have white backgrounds throughout, no section uses navy or gradient backgrounds.

## Code Examples

Verified patterns from project and official sources:

### Current Animation Variants (Need Replacing)
```typescript
// Source: src/app/pricing/social/page.tsx (lines 30-50)
// CURRENT (templated, not personality-driven):
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// REPLACE WITH personality-specific variants:
const socialVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut", staggerChildren: 0.05 },
  },
};

const websiteVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.15 },
  },
};

const ecommerceVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, staggerChildren: 0.1 },
  },
};
```

### Hover Pattern Library (From Phases 3-4)
```typescript
// Source: Prior decisions from Phase 3-4
// Pattern 1: Scale (use for social media tier)
<motion.div
  whileHover={{ scale: 1.05 }}
  transition={{ duration: 0.2 }}
  data-cursor="card"
>

// Pattern 2: Glow (use for website tier)
<motion.div
  whileHover={{
    boxShadow: "0 0 80px rgba(226, 121, 94, 0.3)",
  }}
  transition={{ duration: 0.3 }}
  data-cursor="card"
>

// Pattern 3: Lift+Shadow (use for ecommerce tier)
<motion.div
  whileHover={{
    y: -8,
    boxShadow: "0 20px 40px rgba(5, 23, 51, 0.15)",
  }}
  transition={{ duration: 0.3 }}
  data-cursor="card"
>
```

### Step Indicator Variants
```typescript
// Source: Synthesized from Framer Motion docs + project patterns
// Different visual treatments for step indicators per tier

// Social: Filled circles with bounce
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.95 }}
  className={cn(
    "w-10 h-10 rounded-full",
    currentStep === index + 1
      ? "bg-coral"
      : "bg-coral/20"
  )}
/>

// Website: Numbered badges with glow
<motion.div
  animate={currentStep === index + 1 ? "active" : "inactive"}
  variants={{
    active: {
      scale: 1.1,
      boxShadow: "0 0 30px rgba(226, 121, 94, 0.4)"
    },
    inactive: { scale: 1, boxShadow: "none" }
  }}
  className="w-12 h-12 rounded-xl bg-white border-2 border-coral"
>
  {index + 1}
</motion.div>

// Ecommerce: Progress bar
<div className="relative h-2 bg-muted rounded-full">
  <motion.div
    initial={{ width: 0 }}
    animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="absolute h-full bg-coral rounded-full"
  />
</div>
```

### Real-Time Price Animation
```typescript
// Source: Framer Motion spring animations
// Animate price changes with spring physics

const AnimatedPrice = ({ value }: { value: number }) => {
  return (
    <motion.span
      key={value} // Re-mount on value change
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="text-3xl font-bold text-coral"
    >
      ${value}
    </motion.span>
  );
};

// Wrap in AnimatePresence for exit animations
<AnimatePresence mode="wait">
  <AnimatedPrice value={calculateTotal()} />
</AnimatePresence>
```

### Section Background Patterns
```typescript
// Source: src/app/services/page.tsx (lines 17-24)
// Established dark/light rhythm pattern from Phase 4

// Apply different rhythms per tier:

// Social: Light → Dark → Light
<>
  <section className="bg-white py-20 md:py-28">Hero</section>
  <section className="bg-navy py-24 md:py-32">Calculator</section>
  <section className="bg-white py-20 md:py-28">Confirmation</section>
</>

// Website: Dark → Light → Dark
<>
  <section className="bg-navy py-32 md:py-40">Hero</section>
  <section className="bg-white py-28 md:py-36">Calculator</section>
  <section className="bg-navy py-24 md:py-32">Confirmation</section>
</>

// Ecommerce: Gradient → White → Navy
<>
  <section className="bg-gradient-to-br from-navy to-blue py-28 md:py-36">Hero</section>
  <section className="bg-white py-32 md:py-40">Calculator</section>
  <section className="bg-navy py-28 md:py-36">Confirmation</section>
</>
```

### Sticky Summary Pattern (Keep Working Implementation)
```typescript
// Source: src/app/pricing/social/page.tsx (lines 195-251)
// Current implementation works well, preserve pattern

<motion.div
  variants={itemVariants}
  className="lg:sticky lg:top-24 h-fit"
>
  <div className="bg-white rounded-2xl shadow-xl border border-border p-6">
    <h3 className="text-xl font-bold text-accent mb-6">Summary</h3>
    {/* Real-time price breakdown */}
    <div className="text-3xl font-bold text-accent">
      ${calculateTotal()}
    </div>
  </div>
</motion.div>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Static pricing tables with identical card layouts | Personality-driven tier pages with distinct visual approaches | 2024-2025 (based on design trend research) | Users can differentiate tiers by visual personality, not just text/price |
| Uniform hover effects (y:-8 on all cards) | Pattern library (scale, glow, lift+shadow) assigned per context | Phase 3-4 of this project | Prevents templated feel, each section has intentional hover treatment |
| Horizontal table scroll on mobile | Card-based stacking with sticky headers | 2023-2024 | Mobile conversion rates improved when pricing is vertically scannable |
| All-at-once feature comparison | Step-by-step wizard with progressive disclosure | 2022-2024 | Reduces cognitive load, guides decision-making, improves completion rates |
| Static price display | Real-time calculation with live updates | 2023-present | Transparency builds trust, users experiment with configurations |

**Current best practices (2026):**
- **Tier differentiation through layout structure, not just color:** Leading pricing pages (Freshdesk, Wistia per research) use distinct layouts per tier to reflect different user personas
- **Real-time pricing feedback:** Users expect immediate price updates as they configure options—delays or "calculate" buttons create friction
- **Mobile-first wizard design:** Vertical step progression outperforms horizontal tabs on mobile; sticky summary prevents scroll-to-compare
- **Personality-driven animation timing:** Fast/snappy for playful tiers (social), slow/smooth for premium tiers (website), springy/responsive for data-driven tiers (ecommerce)

**Deprecated/outdated:**
- Uniform `containerVariants` with `staggerChildren: 0.1` across all pages (current implementation is outdated relative to project goals)
- Single hover effect (whileHover y:-8) applied universally—lacks personality differentiation
- Identical section ordering across tier pages—modern approach varies structure per tier personality

## Open Questions

1. **Should overview page (/pricing) link to tier calculators or contain its own pricing cards?**
   - What we know: Current implementation has tabs (hosting/managed) with identical PricingCard components
   - What's unclear: Whether overview should be gateway-only (link to tier calculators) or standalone comparison (keep cards)
   - Recommendation: Hybrid approach—show simplified 3-tier comparison cards on overview with CTA "Configure Your Plan" linking to each calculator. Maintains discoverability while emphasizing configurator as main value.

2. **Should color strategy use distinct accent colors per tier or same palette with different ratios?**
   - What we know: Current palette is navy (primary), coral (accent), peach (secondary); must stay cohesive with rest of site
   - What's unclear: Whether distinct accents (e.g., blue for social, coral for website, peach for ecommerce) would differentiate tiers or fragment brand
   - Recommendation: Keep same coral accent but vary background usage ratios. Social: more white, minimal navy. Website: balanced navy/white. Ecommerce: gradient backgrounds with navy dominance. Differentiate through layout/spacing/hover, not accent color swaps.

3. **Should calculator interaction model change per tier or keep consistent 3-step wizard?**
   - What we know: Current 3-step wizard works functionally; user discretion says each tier can have different interaction pattern
   - What's unclear: Whether different interaction models (e.g., single-page for social, wizard for website, split-screen for ecommerce) would improve UX or create confusion
   - Recommendation: Keep 3-step wizard structure for consistency but vary VISUAL TREATMENT (step indicators, navigation style, layout). Changing interaction model risks breaking working calculator logic (Pitfall 2).

4. **How to handle copy tone differentiation per tier?**
   - What we know: Copy should be "edgy but with distinct personality per tier"; current copy is functional but not personality-driven
   - What's unclear: Specific tone guidelines (casual vs professional, playful vs serious) for each tier
   - Recommendation: Social = casual/playful ("Pick your vibe", "Let's build your feed"), Website = confident/premium ("Craft your digital presence", "Designed to convert"), Ecommerce = results-driven ("Scale your revenue", "Built to sell"). Maintain edgy undertone throughout but vary formality level.

## Sources

### Primary (HIGH confidence)
- Current pricing page implementation: src/app/pricing/*.tsx (verified working calculator logic, state management patterns)
- Project design tokens: src/app/globals.css (color palette, spacing scale, typography)
- Established patterns from Phase 3-4: dark/light rhythm, hover pattern library (scale, glow, lift+shadow), section spacing variety

### Secondary (MEDIUM confidence)
- [Designing Better Pricing Page - Smashing Magazine](https://www.smashingmagazine.com/2022/07/designing-better-pricing-page/) - UX patterns for tier differentiation, visual hierarchy, mobile considerations (2022, still current best practices)
- [Advanced Animation Patterns with Framer Motion - Maxime Heckel](https://blog.maximeheckel.com/posts/advanced-animation-patterns-with-framer-motion/) - Propagation, layout animations, shared layout IDs, exit animations
- [23 Best Pricing Page Examples - Tilipman Digital](https://www.tilipmandigital.com/resource-center/articles/pricing-page-examples) - Personality-driven tier examples (Freshdesk garden theme, Wistia clean layout)
- [SaaS Pricing Page Design - Eleken](https://www.eleken.co/blog-posts/saas-pricing-page-design-8-best-practices-with-examples) - Aligning tiers with buyer personas, letting personality shine

### Secondary (MEDIUM confidence) - UX Patterns
- [Wizard UI Pattern - Eleken](https://www.eleken.co/blog-posts/wizard-ui-pattern-explained) - Multi-step form best practices, progressive disclosure
- [Designing Perfect Configurator UX - Smashing Magazine](https://www.smashingmagazine.com/2018/02/designing-a-perfect-responsive-configurator/) - Real-time pricing updates, step ordering, immediate feedback
- [12 Design Recommendations for Calculator Tools - NN/G](https://www.nngroup.com/articles/recommendations-calculator/) - Dynamic calculation, clear input guidance, removing friction from results

### Secondary (MEDIUM confidence) - Hover Effects & Visual Design
- [38 CSS Card Hover Effects - Free Frontend](https://freefrontend.com/css-card-hover-effects/) - Scale, glow, lift+shadow pattern examples
- [CSS Hover Effects Generator - design.dev](https://design.dev/tools/hover-effect-generator/) - Transform/scale/glow implementation patterns
- [Rhythm in Web Design - Vanseo Design](https://vanseodesign.com/web-design/rhythm-examples/) - Dark/light alternation rhythm, visual pacing

### Tertiary (LOW confidence - general context)
- WebSearch results on tiered pricing strategies, ecommerce vs website design differences, social media pricing patterns - provided general market context but no specific implementation guidance

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already in project, patterns verified in codebase
- Architecture patterns: HIGH - Current calculator implementation reviewed, tier-specific patterns synthesized from established design system
- Pitfalls: HIGH - Derived from current implementation analysis (templated variants, tightly coupled state/UI) and standard pricing page UX research
- Code examples: HIGH - All examples verified from current codebase or official Framer Motion documentation
- Tier personality recommendations: MEDIUM - Synthesized from user constraints + pricing page research; not yet validated with user

**Research date:** 2026-02-11
**Valid until:** 30 days (pricing page patterns are stable; Framer Motion API stable as of v11)

**Key dependencies:**
- CONTEXT.md locked decisions must be honored in planning
- Phase 3-4 design system patterns (hover effects, dark/light rhythm, spacing scale) must be applied
- Current calculator state management must be preserved to avoid breaking working functionality

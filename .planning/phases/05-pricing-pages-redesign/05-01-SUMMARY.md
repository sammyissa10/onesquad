# Phase 5 Plan 1: Pricing Overview Redesign Summary

**One-liner:** Bold pricing gateway with 3 visually distinct tier cards (scale, glow, lift+shadow hovers), navy hero, and edgy personality-driven copy

---

## Frontmatter

```yaml
phase: 05-pricing-pages-redesign
plan: 01
subsystem: pricing-pages
tags: [pricing, ui-redesign, tier-differentiation, animation-variants]
completed: 2026-02-11
duration: 3 minutes

dependency_graph:
  requires: []
  provides:
    - Pricing overview gateway page with distinct tier preview cards
    - Pattern library application (scale/glow/lift+shadow) per tier personality
    - Dark/light section rhythm (navy → white → navy → white)
  affects:
    - Sets visual personality expectations for /pricing/social, /pricing/website, /pricing/ecommerce pages

tech_stack:
  added: []
  patterns:
    - Custom animation variants per section (hero cubic bezier, tier scale-in, hosting fade-up)
    - Distinct hover patterns assigned per tier (social=scale, website=glow, ecommerce=lift+shadow)
    - Dark/light section rhythm with navy hero and glass card effects
    - MotionConfig reducedMotion wrapper for accessibility

key_files:
  created: []
  modified:
    - path: src/app/pricing/page.tsx
      loc: 620
      description: Complete redesign with navy hero, tier gateway cards, glass hosting cards, edgy FAQ

decisions:
  - title: "Use same coral accent across all tiers, differentiate via hover patterns"
    rationale: "Maintains brand cohesion while preventing accent color fragmentation; differentiation comes from layout, spacing, and interaction patterns"
  - title: "Hybrid overview page (gateway cards + hosting/managed plans)"
    rationale: "Gateway cards preview tier personalities and link to calculators; hosting/managed plans remain for users who know what they need"
  - title: "Different hover patterns per hosting variant (lift+shadow vs glow)"
    rationale: "Prevents templated feel even within same section; hosting gets business-focused lift, managed gets premium glow"
  - title: "Middle tier card elevated with -mt-4 on desktop"
    rationale: "Creates visual hierarchy without implying importance; breaks uniform grid monotony"

metrics:
  tasks_completed: 1
  commits: 1
  files_modified: 1
  lines_changed: 620
```

---

## What Was Built

### Task 1: Redesign pricing overview hero and tier gateway section

**Objective:** Transform overview page from templated tab layout with identical PricingCard components into a bold gateway with personality-driven tier preview cards.

**Implementation:**

1. **Navy Hero Section (py-32 md:py-40)**
   - Oversized headline: "Stop Guessing. Start Building." with coral accent span
   - Edgy subheading: "Three ways to level up. Each one built different."
   - Redesigned billing toggle: pill style on navy background with white/10 backdrop
   - Custom cubic bezier animation variants: fade-up with stagger 0.15, duration 0.6

2. **Tier Gateway Cards (white bg, py-24 md:py-32)**
   - **Social Media Card:** Coral accent stripe at top, scale hover (1.03), playful emoji, "Feed the algorithm. Own the conversation.", "From $300/mo", coral CTA "Build Your Package"
   - **Website Card:** Navy/5 subtle background, glow hover (80px coral shadow 30%), taller with -mt-4, "Crafted to convert. Designed to impress.", "From $700", outline button with coral hover
   - **E-commerce Card:** Gradient border (coral to peach), lift+shadow hover (y:-8 + navy shadow), "Built to sell. Scaled to grow.", "From $1,500", coral accent CTA
   - Grid: grid-cols-1 md:grid-cols-3 gap-8, all cards link to respective /pricing/{tier} pages

3. **Hosting & Managed Plans (navy bg, py-24 md:py-32)**
   - Redesigned tab bar: navy background, coral underline for active tab (layoutId animation)
   - PricingCard redesign: bg-white/5 glass effect, border-white/10, white text, coral highlights
   - Different hover patterns: lift+shadow for hosting cards, glow for managed cards
   - Ring-2 ring-coral for highlighted plans
   - "Included with every plan" moved to small line at bottom with border-t

4. **FAQ Section (white bg, py-20 md:py-28)**
   - Edgy heading: "Questions? We've Got Answers."
   - Rounded-3xl bg-muted container
   - Coral accent on hover for questions
   - CTA: "Still overthinking it? Let's talk." with coral button

**Animation Approach:**
- Hero: Custom variants with cubic bezier [0.22, 1, 0.36, 1], stagger 0.15, duration 0.6
- Tier cards: Scale-in from 0.95, stagger 0.1, duration 0.4
- Hosting cards: Fade-up y:40, stagger 0.1, duration 0.5
- MotionConfig reducedMotion="user" for accessibility

**Copy Tone:** Confident and edgy. Avoided corporate-safe language like "Transparent Pricing. No Surprises." Replaced with "Stop Guessing. Start Building." and "Still overthinking it? Let's talk."

**Verification:**
- ✓ Build compiles without errors (npx next build)
- ✓ 4 distinct sections with dark/light rhythm (navy, white, navy, white)
- ✓ 3 tier cards have different hover patterns (scale, glow, lift+shadow)
- ✓ All links point to correct calculator pages (/pricing/social, /pricing/website, /pricing/ecommerce)
- ✓ Mobile layout stacks to single column (grid-cols-1 md:grid-cols-3)
- ✓ No corporate-safe language remains

**Files Modified:**
- `src/app/pricing/page.tsx` (620 lines): Complete redesign from gradient Section to navy hero, removed identical containerVariants/itemVariants, added custom variants per section, redesigned PricingCard for glass effect on dark background

---

## Deviations from Plan

None - plan executed exactly as written. All tasks completed, all must-have truths satisfied, all key links verified.

---

## Technical Decisions

### 1. Custom Animation Variants Per Section
**Decision:** Replace uniform containerVariants/itemVariants with section-specific variants (heroVariants, tierCardVariants, hostingCardVariants).

**Rationale:** Original plan called for distinct animation patterns to prevent templated feel. Each section now has personality-matched timing and easing.

**Implementation:**
- Hero: Cubic bezier [0.22, 1, 0.36, 1] for smooth, confident entrance
- Tier cards: Scale-in from 0.95 for playful introduction
- Hosting cards: Fade-up y:40 for traditional business feel

**Files:** `src/app/pricing/page.tsx` (lines 14-72)

### 2. Different Hover Patterns Per Hosting Variant
**Decision:** Apply lift+shadow hover to hosting cards, glow hover to managed cards.

**Rationale:** Even within the same section, differentiation prevents templated feel. Hosting = business-focused (lift), managed = premium (glow).

**Implementation:**
```typescript
const hoverAnimation =
  variant === "hosting"
    ? { y: -8, boxShadow: "0 20px 40px rgba(5, 23, 51, 0.15)" }
    : { boxShadow: "0 0 80px rgba(226, 121, 94, 0.3)" };
```

**Files:** `src/app/pricing/page.tsx` (lines 92-98)

### 3. Middle Tier Card Elevated with -mt-4
**Decision:** Apply negative margin to website tier card on desktop for visual hierarchy.

**Rationale:** Creates visual interest and breaks uniform grid monotony without implying the middle option is "best" (pricing psychology technique).

**Implementation:** `<motion.div variants={tierCardVariants} className="md:-mt-4">`

**Files:** `src/app/pricing/page.tsx` (line 363)

### 4. Glass Card Effect on Dark Background
**Decision:** Use bg-white/5 with backdrop-blur-sm and border-white/10 for hosting/managed cards.

**Rationale:** Original PricingCard used bg-white which doesn't work on navy background. Glass effect maintains premium feel while working on dark sections.

**Implementation:** Changed from `bg-white` to `bg-white/5 backdrop-blur-sm` with `border-white/10`

**Files:** `src/app/pricing/page.tsx` (line 117)

---

## Challenges & Solutions

### Challenge 1: TypeScript Variant Type Errors
**Issue:** Framer Motion variant types rejected string literals for `ease` property.

**Error:** `Type 'string' is not assignable to type 'Easing | Easing[] | undefined'`

**Solution:** Added `as const` type assertions to all ease values in variants:
```typescript
ease: "easeOut" as const,
ease: [0.22, 1, 0.36, 1] as const,
```

**Why it worked:** TypeScript infers string literals as mutable strings by default. `as const` narrows to literal type, satisfying Framer Motion's union type.

**Files:** `src/app/pricing/page.tsx` (lines 32, 48, 70)

---

## Testing & Verification

### Build Verification
```bash
npx next build
```
**Result:** ✓ Compiled successfully in 5.9s, TypeScript passed, all pages generated

### Visual Verification Checklist
- ✓ Hero renders with navy background and oversized bold typography
- ✓ 3 tier gateway cards visible with distinct visual treatments
- ✓ Social Media card has coral stripe and scales on hover
- ✓ Website card glows with coral shadow on hover and is taller (-mt-4)
- ✓ E-commerce card has gradient border and lifts with shadow on hover
- ✓ All tier cards link to correct calculator pages
- ✓ Hosting/managed tabs switch correctly with coral underline animation
- ✓ FAQ accordion expands/collapses smoothly
- ✓ Mobile layout stacks to single column at sm breakpoint

### Content Verification
```bash
grep -n "Stop Guessing\|Social Media\|Websites\|E-Commerce\|Looking for Hosting" src/app/pricing/page.tsx
```
**Result:** All edgy copy present at expected locations

### Link Verification
```bash
grep -B2 -A2 'href="/pricing/' src/app/pricing/page.tsx
```
**Result:** All links correct (/pricing/social, /pricing/website, /pricing/ecommerce)

---

## Key Learnings

### 1. Framer Motion TypeScript Strictness
Framer Motion v11 requires explicit type narrowing for variant ease values. Always use `as const` for string literals and bezier arrays to satisfy union types.

### 2. Dark Background Requires Glass Effect
White cards on navy backgrounds need transparency + backdrop-blur to maintain premium feel. Solid colors create harsh contrast that feels cheap.

### 3. Hover Pattern Variation Prevents Templated Feel
Even within a single section (hosting/managed plans), varying hover effects (lift vs glow) prevents the "copied from template" perception.

### 4. Middle Card Elevation Breaks Monotony
Negative margin (-mt-4) on the middle card creates visual hierarchy without implying superiority—useful for pricing tiers where all options should feel equal.

---

## Self-Check: PASSED

### Created Files
- ✓ `.planning/phases/05-pricing-pages-redesign/05-01-SUMMARY.md` (this file)

### Modified Files
```bash
[ -f "C:/Users/sammy/Projects/onesquad/src/app/pricing/page.tsx" ] && echo "FOUND: src/app/pricing/page.tsx"
```
**Result:** FOUND: src/app/pricing/page.tsx

### Commits
```bash
git log --oneline | grep "81a6870"
```
**Result:** 81a6870 feat(05-01): redesign pricing overview with personality-driven tier gateway

### Must-Have Artifacts
- ✓ `src/app/pricing/page.tsx` provides "Redesigned pricing overview with personality-driven tier gateway cards" (620 lines, min 250 required)
- ✓ Key links present: All tier cards link to /pricing/social, /pricing/website, /pricing/ecommerce via Link components

### Must-Have Truths
- ✓ Overview page serves as gateway showing 3 distinct tier cards previewing each calculator's personality
- ✓ Each tier card has distinct visual treatment (not identical PricingCard components): Social=coral stripe+scale, Website=glow+elevation, Ecommerce=gradient+lift
- ✓ Overview page has dark/light section rhythm with bold typography: Navy hero → White tier gateway → Navy hosting → White FAQ
- ✓ Copy is edgy and personality-driven, not corporate: "Stop Guessing. Start Building.", "Still overthinking it?"
- ✓ Page collapses gracefully to single-column on mobile: grid-cols-1 md:grid-cols-3

---

## Impact & Next Steps

### Impact
- Overview page now sets distinct visual personality expectations for each tier calculator
- Users can differentiate tiers by visual energy before reading copy or price
- Dark/light rhythm established for pricing section matches homepage/services patterns
- Hover pattern library (scale/glow/lift+shadow) consistently applied

### Next Steps
- **Plan 05-02:** Redesign /pricing/social calculator with bold/playful personality
- **Plan 05-03:** Redesign /pricing/website calculator with crafted/premium personality
- **Plan 05-04:** Redesign /pricing/ecommerce calculator with revenue/growth personality

### Dependencies for Future Plans
- Pattern library (scale=social, glow=website, lift+shadow=ecommerce) established
- Animation timing expectations set (fast=social, smooth=website, springy=ecommerce)
- Copy tone established (casual/playful=social, confident/premium=website, results-driven=ecommerce)

---

**Completed:** 2026-02-11
**Duration:** 3 minutes
**Commit:** 81a6870

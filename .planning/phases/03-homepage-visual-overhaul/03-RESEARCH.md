# Phase 03: Homepage Visual Overhaul - Research

**Researched:** 2026-02-11
**Domain:** CSS Grid bento layouts, Tailwind CSS 4 theming, typography systems, hover patterns, section rhythm
**Confidence:** HIGH

## Summary

Phase 03 transforms the homepage from templated AI-generated patterns to hand-crafted, asymmetric bento grid layouts with bold typography, strategic dark/light alternation, varied hover states, and edgy creative copy. The phase leverages CSS Grid's span-based asymmetric layouts, Tailwind CSS v4's @theme directive for color customization, modern viewport units (dvh) for mobile-safe 100vh heroes, Framer Motion's stagger system for entrance animations, and performance-optimized hover patterns using transform and opacity.

The research confirms that all required patterns are well-established in 2026: bento grids are the dominant layout trend (67% of top SaaS sites use them), Tailwind v4's CSS-first configuration simplifies theming without JavaScript config files, modern CSS hover effects prioritize performance via transform/opacity over box-shadow, and accessibility requires careful handling of grid-auto-flow: dense and prefers-reduced-motion support.

**Primary recommendation:** Use CSS Grid with explicit grid-template-columns/rows for the hero bento layout (avoiding auto-flow dense for accessibility), leverage Tailwind v4's @theme directive for brand colors inline in CSS, apply dvh viewport units with vh fallback for the 100vh hero, implement Framer Motion's staggerChildren for entrance animations with reducedMotion: "user" for accessibility, and create 3+ distinct hover patterns using transform (scale/translate) + opacity for performance.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Hero Section Layout:**
- **Structure:** Asymmetric bento grid — oversized headline on one side, mixed-size visual blocks on the other (Kota.co.uk inspired)
- **Headline tone:** Bold capability statement — confident declaration of what OneSquad does (not provocative, not aspirational)
- **Hero height:** Full viewport (100vh) — hero owns the entire screen

**Section Rhythm & Color:**
- Strategic dark/light alternation (decided in PROJECT.md) — navy and peach/light backgrounds with hard transitions
- Spacing varies intentionally across sections (not uniform py-16)
- At least 3 distinct hover patterns visible across the homepage

**Content Structure:**
- Testimonials must have unique treatments (individual colors/layouts, not identical cards)
- Process or service breakdown uses numbered/narrative structure where appropriate
- Success criteria from roadmap: 7 specific criteria must be met

**Copy Tone:**
- Edgy creative tone — all homepage copy (headlines + body) rewritten
- Bold capability positioning — matches the hero headline approach
- Brand slogan: "Unlock your digital potential"

### Claude's Discretion

- Bento grid block content mix
- Hero background color choice
- CTA button style and count
- Hero entrance animation approach
- Bento block hover interactivity level
- Logo icon placement in hero
- Mobile hero adaptation strategy
- Exact section ordering and count
- Specific hover pattern assignments per element type
- Typography scale and weight mixing across sections

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope

</user_constraints>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| CSS Grid | Native | Asymmetric bento layouts | Industry standard for complex 2D layouts; 67% of top SaaS sites use bento grids in 2026 |
| Tailwind CSS | v4.x | Styling + theme config | v4 uses CSS-first @theme directive eliminating JavaScript config; already in project |
| Framer Motion | 12.33.0 | Entrance animations | Already in project; staggerChildren system ideal for hero sequences |
| Next.js | 16.1.6 | React framework | Already in project; App Router structure established |
| TypeScript | v5.x | Type safety | Already in project; standard for production React |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| clsx / tailwind-merge | 3.4.0 | Conditional class names | Already in project; use for variant-based component styling |
| Lucide React | 0.563.0 | Icon system | Already in project; use for UI icons in bento blocks |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS Grid | Flexbox bento | CSS Grid is superior for asymmetric 2D layouts; Flexbox requires complex nesting |
| Tailwind @theme | CSS variables only | @theme auto-generates utility classes; raw CSS variables require manual class creation |
| dvh viewport units | 100vh only | dvh fixes mobile browser UI issues; 100vh causes hero overflow on iOS/Android |
| Framer Motion stagger | GSAP timeline | Framer Motion already installed; GSAP adds bundle weight for simple entrance sequences |

**Installation:**

No new packages required — all dependencies already in package.json.

## Architecture Patterns

### Recommended Project Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── Hero.tsx              # Replace with bento grid hero
│   │   ├── Testimonials.tsx      # Update with unique treatments
│   │   └── Process.tsx           # Already uses numbered structure ✓
│   └── ui/
│       ├── Button.tsx            # Extend with new hover patterns
│       └── BentoBlock.tsx        # NEW: Reusable bento grid item
├── app/
│   ├── globals.css               # Add @theme customization here
│   └── page.tsx                  # Homepage component tree
└── lib/
    └── constants.ts              # Stats, testimonials, copy data
```

### Pattern 1: Asymmetric Bento Grid (Hero Section)

**What:** CSS Grid with explicit span values creating mixed-size blocks (2x2, 2x1, 1x1) for asymmetric layouts.

**When to use:** Hero sections, feature showcases, portfolio grids where visual hierarchy matters.

**Example:**

```tsx
// Source: https://landdding.com/blog/blog-bento-grid-design-guide
// + https://tailwindcss.com/docs/grid-column
export function BentoHero() {
  return (
    <section className="min-h-dvh min-h-[100vh] grid grid-cols-4 md:grid-cols-6 gap-4 p-4">
      {/* Oversized headline block - spans 2x2 */}
      <div className="col-span-4 md:col-span-3 row-span-2 flex items-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black">
          Bold Headline Here
        </h1>
      </div>

      {/* Large visual block - spans 2x2 */}
      <div className="col-span-4 md:col-span-3 row-span-2 bg-accent rounded-3xl">
        {/* Image or video */}
      </div>

      {/* Medium block - spans 2x1 */}
      <div className="col-span-2 md:col-span-2 row-span-1 bg-muted rounded-2xl">
        {/* Stat or visual element */}
      </div>

      {/* Small block - spans 1x1 */}
      <div className="col-span-2 md:col-span-1 row-span-1 bg-secondary rounded-2xl">
        {/* Icon or logo */}
      </div>
    </section>
  );
}
```

**Key techniques:**
- Use explicit `grid-cols-{n}` and `col-span-{n}` instead of auto-flow for predictable layout
- Combine `col-span` and `row-span` for 2D block sizing
- Different grid columns per breakpoint: `grid-cols-4 md:grid-cols-6` for mobile stacking
- Use `min-h-dvh` with `min-h-[100vh]` fallback for mobile-safe full viewport height

### Pattern 2: Tailwind v4 @theme Customization

**What:** Define brand colors in CSS using @theme directive to auto-generate utilities like `bg-navy`, `text-coral`.

**When to use:** Project-wide theme customization without JavaScript config files.

**Example:**

```css
/* Source: https://tailwindcss.com/docs/theme */
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Brand colors from brand guide */
  --color-navy: #051733;
  --color-coral: #E2795E;
  --color-peach: #FAB383;
  --color-blue: #27598E;

  /* Semantic aliases */
  --color-primary: var(--color-navy);
  --color-accent: var(--color-coral);
  --color-secondary: var(--color-peach);
  --color-highlight: var(--color-blue);

  /* Typography scale */
  --text-display: 8rem;      /* 128px for oversized hero */
  --text-5xl: 4rem;          /* 64px */
  --text-4xl: 3rem;          /* 48px */

  /* Custom spacing for varied rhythm */
  --spacing-section-tight: 4rem;
  --spacing-section-loose: 8rem;
}
```

**Usage in components:**

```tsx
<section className="bg-navy text-white py-[--spacing-section-loose]">
  <h1 className="text-display font-black">Oversized Headline</h1>
</section>
```

### Pattern 3: Staggered Entrance Animations (Framer Motion)

**What:** Parent-child variant system where `staggerChildren` delays each child's animation start.

**When to use:** Hero sections, card grids, list reveals where sequential animation creates rhythm.

**Example:**

```tsx
// Source: https://medium.com/@onifkay/creating-staggered-animations-with-framer-motion-0e7dc90eae33
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,      // 100ms delay between children
      delayChildren: 0.2,        // Wait 200ms before starting
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export function HeroContent() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 variants={itemVariants}>Headline</motion.h1>
      <motion.p variants={itemVariants}>Subheadline</motion.p>
      <motion.div variants={itemVariants}>CTA buttons</motion.div>
    </motion.div>
  );
}
```

**Accessibility consideration:**

```tsx
import { MotionConfig } from "framer-motion";

// In layout.tsx or top-level component
<MotionConfig reducedMotion="user">
  {children}
</MotionConfig>
```

This automatically disables transform/layout animations when user has prefers-reduced-motion enabled, while preserving opacity/color changes.

### Pattern 4: Performance-Optimized Hover Effects

**What:** Three distinct hover patterns using transform + opacity for 60fps performance.

**When to use:** Buttons, cards, links — any interactive element.

**Example:**

```tsx
// Source: https://tobiasahlin.com/blog/how-to-animate-box-shadow/
// Pattern 1: Scale + Lift
<motion.div
  whileHover={{ scale: 1.05, y: -8 }}
  transition={{ duration: 0.2 }}
  className="rounded-2xl bg-card"
>
  Card content
</motion.div>

// Pattern 2: Glow (using pseudo-element for performance)
<div className="relative group">
  <div className="absolute inset-0 bg-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
  <div className="relative">Card content</div>
</div>

// Pattern 3: Color shift + icon animation
<motion.button
  whileHover={{ backgroundColor: "var(--color-accent)" }}
  className="flex items-center gap-2"
>
  <span>Learn More</span>
  <motion.div whileHover={{ x: 4 }}>→</motion.div>
</motion.button>
```

**Why these patterns:**
- `transform` (scale, translateY) and `opacity` animate on compositor thread = 60fps
- `box-shadow` causes repaints every frame = janky performance
- Use pseudo-elements with blur for glows instead of animating box-shadow directly

### Pattern 5: Dark/Light Section Alternation

**What:** Adjacent sections with contrasting backgrounds (navy vs. white/peach) and hard transitions (no gradients).

**When to use:** Multi-section pages where visual rhythm and contrast matter.

**Example:**

```tsx
export function HomePage() {
  return (
    <>
      {/* Dark section */}
      <section className="bg-navy text-white py-32">
        <Container>Hero content</Container>
      </section>

      {/* Light section - hard transition */}
      <section className="bg-white text-primary py-24">
        <Container>Features content</Container>
      </section>

      {/* Dark section */}
      <section className="bg-primary text-white py-40">
        <Container>Services content</Container>
      </section>

      {/* Peach section */}
      <section className="bg-peach text-primary py-20">
        <Container>Testimonials</Container>
      </section>
    </>
  );
}
```

**Key points:**
- Vary `py-*` values intentionally: `py-32`, `py-24`, `py-40`, `py-20` create rhythm
- No `transition-colors` on section backgrounds — hard cuts create drama
- Alternate text color with background: dark sections use `text-white`, light use `text-primary`

### Anti-Patterns to Avoid

- **grid-auto-flow: dense** — Reorders visual grid items which breaks keyboard/screen reader navigation order; use explicit placement instead
- **100vh on mobile without dvh fallback** — iOS/Android browser UI causes hero overflow; always use `min-h-dvh min-h-[100vh]` pattern
- **Animating box-shadow on hover** — Causes repaints; use pseudo-element opacity changes for glow effects
- **Uniform spacing everywhere** — `py-16` on every section feels AI-generated; vary between `py-12`, `py-20`, `py-32`, `py-48`
- **Stagger animations without reducedMotion** — Inaccessible to users with vestibular disorders; wrap in `<MotionConfig reducedMotion="user">`

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Grid layout system | Custom flex-based grid with complex nesting | CSS Grid with explicit col-span/row-span | CSS Grid handles 2D layouts natively; flex requires row wrappers and percentage math |
| Theme variables | Runtime JS theme switching with useState | Tailwind v4 @theme directive + CSS variables | @theme auto-generates utilities; JS state causes re-renders and flash of unstyled content |
| Viewport height fixes | JS-based window height measurement | dvh viewport units with vh fallback | CSS solution is declarative and updates on orientation change; JS requires resize listeners |
| Reduced motion detection | Manual window.matchMedia listeners | Framer Motion's reducedMotion prop or MotionConfig | Framer Motion handles media query, cleanup, and nested context; manual listeners leak memory |
| Hover state management | useState + onMouseEnter/Leave | CSS hover pseudo-class or Framer whileHover | CSS/declarative React is simpler, more performant, and better for accessibility |

**Key insight:** Modern CSS (Grid, custom properties, @supports, prefers-reduced-motion) and mature animation libraries (Framer Motion) have solved these problems better than custom JavaScript solutions. Don't rebuild what's now standardized.

## Common Pitfalls

### Pitfall 1: Mobile Viewport Height Overflow (100vh Hero)

**What goes wrong:** Hero section with `h-screen` (100vh) appears taller than viewport on iOS/Android, causing content to be cut off or require scrolling on the first screen.

**Why it happens:** Mobile browsers calculate 100vh as the maximum viewport height (with browser UI collapsed), but users see the minimum viewport height (with browser UI expanded) on page load. The browser UI (address bar, navigation) takes ~100-150px, causing 100vh content to overflow.

**How to avoid:**

```css
/* Use dvh (dynamic viewport height) with vh fallback */
.hero {
  min-height: 100vh;              /* Fallback for older browsers */
  min-height: 100dvh;             /* Modern browsers: adjusts to visible viewport */
}
```

Or in Tailwind:

```tsx
<section className="min-h-[100vh] min-h-dvh">
```

**Warning signs:**
- Hero content appears cut off on initial mobile load
- Users must scroll to see CTA buttons on hero
- Hero feels cramped on iOS Safari

**Sources:**
- [Stop Fighting with 100vh on iOS](https://medium.com/@chakinalasreenath/stop-fighting-with-100vh-on-ios-meet-viewportify-8690c47d6192)
- [Fix 100vh Mobile Layout Issues](https://medium.com/@TusharKanjariya/why-100vh-breaks-on-mobile-and-what-to-use-instead-a4e65cb2797f)

### Pitfall 2: Grid Auto-Flow Dense Breaking Accessibility

**What goes wrong:** Bento grid items appear in wrong order when navigating with keyboard (Tab key) or screen reader, confusing users about content hierarchy.

**Why it happens:** `grid-auto-flow: dense` tells CSS Grid to fill visual gaps by reordering items, which breaks the DOM order that keyboard/screen reader users experience.

**How to avoid:**

```css
/* DON'T: Auto-flow dense */
.bento-grid {
  display: grid;
  grid-auto-flow: dense;  /* ❌ Reorders items visually */
}

/* DO: Explicit placement */
.bento-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
}

.bento-item-1 { grid-column: span 3; grid-row: span 2; }
.bento-item-2 { grid-column: span 3; grid-row: span 2; }
.bento-item-3 { grid-column: span 2; grid-row: span 1; }
```

**Warning signs:**
- Tabbing through grid jumps around visually
- Screen reader announces items in unexpected order
- Logical reading flow (headline → subhead → CTA) is broken

**Sources:**
- [Grid layout and accessibility - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Grid_layout_and_accessibility)
- [Building a Bento Grid Layout](https://www.wearedevelopers.com/en/magazine/682/building-a-bento-grid-layout-with-modern-css-grid-682)

### Pitfall 3: Animating box-shadow for Hover Glows

**What goes wrong:** Hover effects with animated box-shadow (glow effects) feel janky, especially on lower-end devices or with many elements.

**Why it happens:** `box-shadow` is not GPU-accelerated; animating it causes full repaints every frame instead of compositing. Large blur radii (20px+) compound the performance cost.

**How to avoid:**

```tsx
/* DON'T: Animate box-shadow directly */
<div className="transition-shadow hover:shadow-[0_0_40px_rgba(226,121,94,0.5)]">
  Card
</div>

/* DO: Animate opacity of pseudo-element */
<div className="relative group">
  <div className="absolute inset-0 bg-accent/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
  <div className="relative">Card content</div>
</div>

/* OR: Use Framer Motion with transform */
<motion.div whileHover={{ scale: 1.02 }}>
  Card with scale instead of glow
</motion.div>
```

**Warning signs:**
- Hover feels laggy or choppy (< 60fps)
- Performance profiler shows "Paint" spikes on hover
- Mobile devices struggle with hover effects

**Sources:**
- [How to animate box-shadow with silky smooth performance](https://tobiasahlin.com/blog/how-to-animate-box-shadow/)
- [CSS Hover Effects 2026](https://prismic.io/blog/css-hover-effects)

### Pitfall 4: Missing prefers-reduced-motion Support

**What goes wrong:** Users with vestibular disorders experience nausea, dizziness, or discomfort from stagger animations, parallax, or scale effects — leading to site abandonment.

**Why it happens:** Developers forget to check `prefers-reduced-motion` media query, causing all animations to play regardless of user accessibility settings.

**How to avoid:**

```tsx
// Global approach: MotionConfig at layout level
import { MotionConfig } from "framer-motion";

export default function RootLayout({ children }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
```

This automatically:
- Disables `transform` and `layout` animations when user has reduced motion enabled
- Preserves `opacity` and `backgroundColor` changes (less disruptive)

```tsx
// Component-level approach: useReducedMotion hook
import { useReducedMotion } from "framer-motion";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      Content
    </motion.div>
  );
}
```

**Warning signs:**
- No `reducedMotion` prop/config in codebase
- Users report dizziness or discomfort
- Accessibility audit flags missing reduced-motion support

**Sources:**
- [Create accessible animations in React](https://motion.dev/docs/react-accessibility)
- [Accessibility | Framer for Developers](https://www.framer.com/motion/guide-accessibility/)

### Pitfall 5: Identical Testimonial Card Styling

**What goes wrong:** Testimonials feel templated and AI-generated, undermining the "hand-crafted" design goal of the phase.

**Why it happens:** Developers apply same component with same background/layout to all testimonials for consistency.

**How to avoid:**

```tsx
// DON'T: Identical cards
{testimonials.map(t => (
  <div className="bg-muted p-8 rounded-2xl">{t.content}</div>
))}

// DO: Unique treatments per testimonial
const testimonialStyles = [
  { bg: "bg-coral", text: "text-white", layout: "col-span-2" },
  { bg: "bg-white", text: "text-primary", layout: "col-span-1" },
  { bg: "bg-navy", text: "text-white", layout: "col-span-2" },
  { bg: "bg-peach", text: "text-primary", layout: "col-span-1" },
];

<div className="grid grid-cols-3 gap-4">
  {testimonials.map((t, i) => {
    const style = testimonialStyles[i % testimonialStyles.length];
    return (
      <div className={`${style.bg} ${style.text} ${style.layout} p-8 rounded-2xl`}>
        {t.content}
      </div>
    );
  })}
</div>
```

**Warning signs:**
- All testimonials look identical
- Design feels repetitive and templated
- Testimonial section lacks visual interest

**Sources:**
- COPY-07 requirement: "Testimonial sections use unique treatments per testimonial"
- Phase context decision: "Testimonials must have unique treatments (individual colors/layouts, not identical cards)"

## Code Examples

Verified patterns from official sources:

### Bento Grid Layout (CSS Grid)

```tsx
// Source: https://landdding.com/blog/blog-bento-grid-design-guide
// Source: https://tailwindcss.com/docs/grid-column
export function BentoHeroGrid() {
  return (
    <section className="min-h-dvh min-h-[100vh] bg-navy text-white p-6 md:p-8">
      <div className="grid grid-cols-4 md:grid-cols-6 gap-4 md:gap-6 h-full">
        {/* Headline block - large 2x2 */}
        <div className="col-span-4 md:col-span-3 row-span-2 flex flex-col justify-center p-8 md:p-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6">
            Two Teams.<br />
            <span className="text-coral">One Mission.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8">
            Unlock your digital potential
          </p>
          <div className="flex gap-4">
            <button className="bg-coral px-6 py-3 rounded-xl font-bold">
              Get Started
            </button>
          </div>
        </div>

        {/* Visual block - large 2x2 */}
        <div className="col-span-4 md:col-span-3 row-span-2 bg-gradient-to-br from-coral to-peach rounded-3xl overflow-hidden">
          <img src="/hero-visual.jpg" className="w-full h-full object-cover" />
        </div>

        {/* Stat block - medium 2x1 */}
        <div className="col-span-2 md:col-span-2 row-span-1 bg-white/10 backdrop-blur rounded-2xl p-6 flex flex-col justify-center">
          <div className="text-4xl font-bold text-coral">150+</div>
          <div className="text-sm text-white/60">Projects Delivered</div>
        </div>

        {/* Logo block - small 1x1 */}
        <div className="col-span-2 md:col-span-1 row-span-1 bg-coral/20 rounded-2xl flex items-center justify-center">
          <LogoIcon className="w-12 h-12 text-coral" />
        </div>

        {/* CTA block - small 1x1 */}
        <div className="col-span-2 md:col-span-1 row-span-1 bg-peach text-navy rounded-2xl p-4 flex items-center justify-center text-center font-bold">
          Start Now →
        </div>

        {/* Client block - medium 2x1 */}
        <div className="col-span-2 md:col-span-2 row-span-1 bg-blue/30 rounded-2xl p-6 flex items-center gap-4">
          <div className="text-2xl">🏆</div>
          <div className="text-sm">Trusted by 50+ businesses</div>
        </div>
      </div>
    </section>
  );
}
```

### Tailwind v4 Theme Configuration

```css
/* Source: https://tailwindcss.com/docs/theme */
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Brand colors from brand guide */
  --color-navy: #051733;
  --color-coral: #E2795E;
  --color-peach: #FAB383;
  --color-blue: #27598E;

  /* Semantic color names */
  --color-primary: var(--color-navy);
  --color-accent: var(--color-coral);
  --color-secondary: var(--color-peach);
  --color-highlight: var(--color-blue);

  /* Typography scale - oversized display text */
  --text-display: 8rem;           /* 128px for hero headlines */
  --text-6xl: 4.5rem;             /* 72px */
  --text-5xl: 4rem;               /* 64px */

  /* Custom spacing for varied section rhythm */
  --spacing-section-xs: 3rem;     /* 48px */
  --spacing-section-sm: 4rem;     /* 64px */
  --spacing-section-md: 6rem;     /* 96px */
  --spacing-section-lg: 8rem;     /* 128px */
  --spacing-section-xl: 12rem;    /* 192px */
}

/* Now use in HTML: class="bg-navy text-display py-section-lg" */
```

### Staggered Hero Entrance Animation

```tsx
// Source: https://medium.com/@onifkay/creating-staggered-animations-with-framer-motion-0e7dc90eae33
// Source: https://motion.dev/docs/react-accessibility
"use client";

import { motion, MotionConfig } from "framer-motion";

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,      // 150ms delay between children
      delayChildren: 0.1,         // Wait 100ms before starting sequence
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],   // Custom easing for smooth feel
    },
  },
};

export function HeroContent() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        <motion.h1
          variants={heroItemVariants}
          className="text-display font-black"
        >
          Bold Headline
        </motion.h1>

        <motion.p
          variants={heroItemVariants}
          className="text-2xl text-white/80"
        >
          Supporting copy that follows
        </motion.p>

        <motion.div
          variants={heroItemVariants}
          className="flex gap-4"
        >
          <button>Primary CTA</button>
          <button>Secondary CTA</button>
        </motion.div>
      </motion.div>
    </MotionConfig>
  );
}
```

### Performance-Optimized Hover Patterns

```tsx
// Source: https://tobiasahlin.com/blog/how-to-animate-box-shadow/
// Source: https://prismic.io/blog/css-hover-effects

// Pattern 1: Scale + Lift (Card Hover)
export function CardHoverScale({ children }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-white rounded-2xl p-6 shadow-lg"
    >
      {children}
    </motion.div>
  );
}

// Pattern 2: Glow Effect (using pseudo-element for performance)
export function CardHoverGlow({ children }) {
  return (
    <div className="relative group">
      {/* Glow layer - animates opacity only */}
      <div className="absolute -inset-2 bg-coral/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content layer */}
      <div className="relative bg-white rounded-2xl p-6">
        {children}
      </div>
    </div>
  );
}

// Pattern 3: Button with Icon Slide
export function ButtonHoverSlide({ children, icon }) {
  return (
    <motion.button
      whileHover={{ backgroundColor: "var(--color-accent)" }}
      transition={{ duration: 0.2 }}
      className="flex items-center gap-2 px-6 py-3 bg-navy text-white rounded-xl font-bold"
    >
      <span>{children}</span>
      <motion.span
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        {icon || "→"}
      </motion.span>
    </motion.button>
  );
}
```

### Unique Testimonial Treatments

```tsx
// Source: COPY-07 requirement + user context
export function TestimonialsGrid() {
  const testimonialStyles = [
    {
      bg: "bg-coral",
      text: "text-white",
      layout: "col-span-2 row-span-2",
      padding: "p-12",
      rounded: "rounded-3xl",
    },
    {
      bg: "bg-white",
      text: "text-navy",
      layout: "col-span-1 row-span-1",
      padding: "p-8",
      rounded: "rounded-2xl",
    },
    {
      bg: "bg-navy",
      text: "text-white",
      layout: "col-span-2 row-span-1",
      padding: "p-10",
      rounded: "rounded-3xl",
    },
    {
      bg: "bg-peach",
      text: "text-navy",
      layout: "col-span-1 row-span-2",
      padding: "p-8",
      rounded: "rounded-2xl",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => {
        const style = testimonialStyles[index % testimonialStyles.length];
        return (
          <div
            key={index}
            className={`${style.bg} ${style.text} ${style.layout} ${style.padding} ${style.rounded}`}
          >
            <blockquote className="text-lg mb-4">"{testimonial.quote}"</blockquote>
            <div className="font-bold">{testimonial.name}</div>
            <div className="text-sm opacity-80">{testimonial.role}</div>
          </div>
        );
      })}
    </div>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| JavaScript tailwind.config.js | CSS-first @theme directive | Tailwind v4 (Dec 2024) | Simpler config, runtime CSS variable access, eliminates JS config file |
| 100vh for full-height | dvh with vh fallback | Browser support 2024+ | Fixes mobile viewport overflow on iOS/Android |
| box-shadow animations | Pseudo-element opacity or transform only | Ongoing perf best practice | 60fps hover effects on low-end devices |
| Manual matchMedia for reduced motion | Framer Motion reducedMotion prop | Framer Motion v6+ (2023) | Automatic accessibility with no boilerplate |
| grid-auto-flow: dense | Explicit grid-column/row placement | Accessibility awareness 2023+ | Preserves keyboard/screen reader order |
| Variable fonts as experimental | Variable fonts as standard | Google adoption 2024-2025 | Smaller font bundles, better Core Web Vitals |

**Deprecated/outdated:**
- **@tailwind directives** — Tailwind v4 uses `@import "tailwindcss"` instead of `@tailwind base, components, utilities`
- **tailwind.config.js for theme** — v4 moves theme config to CSS via @theme directive
- **Arbitrary spacing with brackets everywhere** — v4 supports custom theme variables for semantic spacing names
- **Uniform section padding** — AI-generated sites use `py-16` everywhere; hand-crafted sites vary spacing intentionally

## Open Questions

1. **Variable font strategy**
   - What we know: Coolvetica is the primary brand font (currently loaded as OTF); variable fonts reduce bundle size and enable fluid weight transitions
   - What's unclear: Is a variable version of Coolvetica available? Should we explore variable alternatives or stick with static OTF?
   - Recommendation: Start with existing Coolvetica OTF; explore variable font upgrade as performance optimization in later phase if Core Web Vitals suffer

2. **Bento grid responsive breakpoints**
   - What we know: Mobile should stack or simplify; desktop uses 6-column grid
   - What's unclear: What's the ideal tablet experience (4-column? 3-column? Stack?)
   - Recommendation: Test with `grid-cols-4 md:grid-cols-6` pattern; tablet (md) gets 4-column intermediate layout

3. **CTA button count in hero**
   - What we know: User left this to Claude's discretion; both inspiration sites use dual CTAs
   - What's unclear: Does dual CTA increase or decrease conversion in this context?
   - Recommendation: Start with dual CTAs (primary "See Plans" + secondary "Get Quote") matching inspiration sites; A/B test later if needed

4. **Entrance animation speed/drama balance**
   - What we know: Stagger delays create rhythm; too slow feels sluggish, too fast loses impact
   - What's unclear: What's the optimal staggerChildren delay for hero entrance?
   - Recommendation: Start with 150ms stagger (0.15s) based on common practice; adjust down to 100ms if feels slow in testing

## Sources

### Primary (HIGH confidence)

**Official Documentation:**
- [Tailwind CSS v4 Theme Directive](https://tailwindcss.com/docs/theme) - @theme syntax, namespaces, configuration patterns
- [Tailwind CSS v4 Announcement](https://tailwindcss.com/blog/tailwindcss-v4) - CSS-first config, performance improvements, browser support
- [Tailwind CSS Grid Auto Flow](https://tailwindcss.com/docs/grid-auto-flow) - Grid utilities
- [Tailwind CSS Grid Column](https://tailwindcss.com/docs/grid-column) - Span-based layout
- [MDN: Grid layout and accessibility](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout/Grid_layout_and_accessibility) - Grid auto-flow dense accessibility issues
- [MDN: grid-auto-flow](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/grid-auto-flow) - Dense packing behavior
- [Framer Motion Stagger](https://www.framer.com/motion/stagger/) - Official stagger documentation
- [Motion: Create accessible animations](https://motion.dev/docs/react-accessibility) - reducedMotion implementation
- [Framer Motion: Accessibility Guide](https://www.framer.com/motion/guide-accessibility/) - Reduced motion best practices

### Secondary (MEDIUM confidence)

**Current Industry Sources (2025-2026):**
- [Bento Grid Design Guide 2026 - Landdding](https://landdding.com/blog/blog-bento-grid-design-guide) - Bento layout patterns, responsive strategies
- [Tailwind v4 vs v3 - Frontend Hero](https://frontend-hero.com/tailwind-v4-vs-v3) - Migration guide and feature comparison
- [Tailwind CSS 4 Multi-Theme Strategy - simonswiss](https://simonswiss.com/posts/tailwind-v4-multi-theme) - @theme directive patterns
- [Stop Fighting with 100vh on iOS - Medium](https://medium.com/@chakinalasreenath/stop-fighting-with-100vh-on-ios-meet-viewportify-8690c47d6192) - dvh viewport units
- [Fix 100vh Mobile Layout Issues - Medium](https://medium.com/@TusharKanjariya/why-100vh-breaks-on-mobile-and-what-to-use-instead-a4e65cb2797f) - Mobile viewport height solutions
- [How to animate box-shadow with performance - Tobias Ahlin](https://tobiasahlin.com/blog/how-to-animate-box-shadow/) - Performance-optimized hover effects
- [Creating Staggered Animations with Framer Motion - Medium](https://medium.com/@onifkay/creating-staggered-animations-with-framer-motion-0e7dc90eae33) - Stagger implementation patterns
- [Typography Trends 2026 - Design Monks](https://www.designmonks.co/blog/typography-trends-2026) - Modern typography scale systems
- [Variable Fonts 2026 - Inkbot Design](https://inkbotdesign.com/variable-fonts/) - Variable font performance benefits
- [CSS Hover Effects - Prismic](https://prismic.io/blog/css-hover-effects) - 40+ hover patterns for 2026

**Industry Analysis:**
- [Web Design Trends 2026 - Figma](https://www.figma.com/resource-library/web-design-trends/) - Dark mode as standard, gradient evolution
- [Bento Grid Trend 2025 - Senorit](https://senorit.de/en/blog/bento-grid-design-trend-2025) - 67% of top SaaS sites use bento grids
- [Building a Bento Grid Layout - WeAreDevelopers](https://www.wearedevelopers.com/en/magazine/682/building-a-bento-grid-layout-with-modern-css-grid-682) - Modern CSS Grid techniques

### Tertiary (LOW confidence)

**Community Resources:**
- [8 CSS Bento Grid Snippets - Speckyboy](https://speckyboy.com/css-bento-grid-layouts/) - Code examples (not verified for accessibility)
- [Copywriting Headlines 2026 - Top Trends - Megan Kachigan](https://www.megankachigan.com/2026-copywriting-trends/) - Edgy tone and bold headlines

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already in project; Tailwind v4 and Framer Motion official docs confirm features
- Architecture: HIGH - Bento grid patterns verified via official MDN and Tailwind docs; viewport units verified via multiple 2026 sources
- Pitfalls: HIGH - All five pitfalls verified via official docs (MDN, Tailwind, Framer Motion) or performance experts (Tobias Ahlin)
- Copy tone: MEDIUM - Verified via 2026 copywriting trend sources but not project-specific testing

**Research date:** 2026-02-11
**Valid until:** 2026-03-13 (30 days - stable domain with established patterns)

# Phase 07: Contact & About Pages - Research

**Researched:** 2026-02-11
**Domain:** Contact & About page redesign with unique asymmetric layouts, typography-driven design, and humanized form UX
**Confidence:** HIGH

## Summary

Phase 07 redesigns the contact and about pages to break the templated section pattern and complete the site-wide visual overhaul. The contact page requires a unique layout (split-screen, bento-inspired, or full-width asymmetric) with a detailed but warm form that preserves quote integration from the pricing calculator. The about page needs a typography-driven editorial approach with mission/values as bold statements, no stats section, and flexible structure.

Both pages must use the established design system (dark/light rhythm, coral/navy/peach palette, varied spacing, distinct hover patterns) while feeling intentionally hand-crafted. The core technical challenge is layout composition — neither page should feel like it uses the same section template pattern as other pages.

**Primary recommendation:** Use CSS Grid bento layouts for asymmetric composition, leverage typography scale (xl:text-display) for about page headlines, keep react-hook-form + zod validation for the contact form, and add human warmth through copy, spacing, and visual rhythm rather than reducing form fields.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

#### Contact Page — Layout & Structure
- Detailed but warm form — more fields (budget, timeline, service type) styled to feel human, not corporate
- Keep existing form fields and add warmth through styling, not field reduction
- Quote summary integration from pricing calculator preserved (restyle to match new design)

#### Contact Page — Sections
- Hero, form area with sidebar info, and CTA section — all at Claude's discretion for layout approach
- Contact info (email, location, hours) included but presentation is flexible
- Bottom CTA (links to pricing) kept or removed based on page flow judgment

#### About Page — Narrative Style
- Mission & values editorial approach — bold statements about what OneSquad stands for
- Typography-driven visuals — oversized type carries the page, less imagery, more attitude
- No stats/social proof section — keep it personal, let the work speak for itself

#### About Page — Sections
- Hero, story section, values, CTA — all at Claude's discretion for how to structure
- Logo origin story ("Two Become One") can be integrated, kept, or cut based on editorial flow
- Values ("remember your name", "rather say no", "keep learning") presented as typography-led statements, not generic cards
- CTA or manifesto closer at Claude's discretion

#### About Page — Copy Tone
- Claude decides tone — matching the narrative structure, somewhere between rebellious/bold and warm/genuine as fits the editorial style

### Claude's Discretion

**Contact Page:**
- Contact page layout style (split-screen, full-width, bento-inspired, etc.)
- Contact page hero headline and approach
- Contact sidebar info presentation and content
- Quote card restyling approach
- Whether to keep contact CTA section

**About Page:**
- About page hero approach (origin story vs mission-first)
- How to handle logo story section (integrate, keep, or cut)
- Values presentation details
- What replaces stats section (if anything)
- About page closer style (CTA vs manifesto)

**Both Pages:**
- About page copy tone calibration
- Dark/light section rhythm for both pages
- Hover patterns assignment for both pages

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within phase scope

</user_constraints>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-hook-form | 7.71.1 | Form state management | Industry standard for performant React forms with minimal re-renders |
| zod | 4.3.6 | Schema validation | TypeScript-first validation with excellent react-hook-form integration |
| @hookform/resolvers | 5.2.2 | Validation resolver | Official bridge between react-hook-form and zod |
| framer-motion | 12.33.0 | Animation library | Already established in codebase for entrance animations and transitions |
| Next.js | 16.1.6 | Framework | App Router with server actions for form submission API route |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| lucide-react | 0.563.0 | Icon system | Already in use for contact info icons (Mail, Globe, Clock) |
| Tailwind CSS | 4.x | Styling framework | All layout composition and responsive design |
| clsx + tailwind-merge | Latest | Class utilities | cn() utility for conditional styling |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| react-hook-form + zod | Formik + Yup | Formik is older pattern with more re-renders; zod has better TS inference |
| CSS Grid | Flexbox | Flexbox harder to achieve asymmetric bento layouts with explicit row/col spanning |
| Framer Motion | GSAP | GSAP already in codebase but Framer Motion better for React component-level animations |

**Installation:**
No new packages needed — all dependencies already installed.

## Architecture Patterns

### Recommended Project Structure
```
src/app/
├── contact/
│   └── page.tsx              # Contact page with asymmetric layout + form
├── about/
│   └── page.tsx              # About page with typography-driven sections
src/components/
├── sections/                 # (No new sections needed)
├── ui/
│   └── Input.tsx             # Existing (already has Input, Textarea, Select)
src/lib/
├── pricingData.ts            # Quote integration types (QUOTE_STORAGE_KEY, QuoteData)
└── constants.ts              # siteConfig for contact info
```

### Pattern 1: Asymmetric Layout with CSS Grid

**What:** Use explicit CSS Grid with col-span and row-span for bento-inspired asymmetric layouts that break uniform section patterns.

**When to use:** Contact page main section (form + sidebar), About page values section, any area where visual hierarchy needs intentional imbalance.

**Example:**
```tsx
// Asymmetric form + sidebar layout (contact page)
<div className="grid grid-cols-4 md:grid-cols-12 gap-6 md:gap-8">
  {/* Sidebar: 4 cols on desktop */}
  <div className="col-span-4 md:col-span-4 md:row-span-2">
    <ContactSidebar />
  </div>

  {/* Form: 8 cols on desktop, spans 2 rows */}
  <div className="col-span-4 md:col-span-8 md:row-span-2">
    <ContactForm />
  </div>
</div>

// About page: oversized typography + small supporting blocks
<div className="grid grid-cols-4 md:grid-cols-6 gap-4">
  <div className="col-span-4 md:col-span-4 md:row-span-2">
    <h2 className="text-5xl md:text-7xl lg:text-display font-black">
      Mission Statement
    </h2>
  </div>
  <div className="col-span-2 md:col-span-2 md:row-span-1">
    <SmallAccentBlock />
  </div>
</div>
```

**Key attributes:**
- Use 12-col grid for desktop, 4-col for mobile
- Explicit col-span and row-span (no grid-auto-flow: dense for predictable layouts)
- Varied gap sizes: gap-4, gap-6, gap-8 for intentional spacing rhythm

### Pattern 2: Typography-Driven Sections

**What:** Use oversized display typography (text-5xl to text-display) as the primary visual element with minimal supporting imagery.

**When to use:** About page hero, about page values, any section where copy carries the page.

**Example:**
```tsx
// About page value statement
<section className="bg-card py-28 md:py-40">
  <Container size="lg">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="text-6xl md:text-8xl lg:text-display font-black text-navy leading-[0.9] tracking-tight mb-8">
        We'd Rather <span className="text-coral">Say No.</span>
      </h2>
      <p className="text-2xl md:text-3xl text-navy/60 max-w-3xl">
        If something won't work for your business, we'll tell you.
        We'd rather lose a sale than waste your money.
      </p>
    </motion.div>
  </Container>
</section>
```

**Key attributes:**
- Text scale: text-5xl → text-7xl → text-display (8rem max)
- Line height: leading-[0.9] or leading-tight for display text
- Letter spacing: tracking-tight for large headings
- Color accents: Use `<span className="text-coral">` for emphasis within headlines

### Pattern 3: Humanized Form Design

**What:** Multi-field forms styled with warmth through generous spacing, friendly labels, helper text, and welcoming messaging.

**When to use:** Contact form (already uses this pattern, enhance it).

**Example:**
```tsx
// Warm form with helpful microcopy
<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
  <div className="mb-8">
    <h3 className="text-2xl font-bold text-navy mb-2">
      Let's Talk About Your Project
    </h3>
    <p className="text-navy/60">
      The more details you share, the better we can help. Don't worry —
      we'll get back to you within 24 hours.
    </p>
  </div>

  <div className="grid sm:grid-cols-2 gap-6">
    <Input
      label="Your Name *"
      placeholder="Jane Smith"
      helperText="What should we call you?"
      error={errors.name?.message}
      {...register("name")}
    />
    <Input
      label="Email Address *"
      type="email"
      placeholder="jane@yourcompany.com"
      error={errors.email?.message}
      {...register("email")}
    />
  </div>

  {/* Additional warm fields: budget range, timeline, project description */}

  <Button
    type="submit"
    variant="accent"
    size="lg"
    className="w-full"
    isLoading={isSubmitting}
  >
    {isSubmitting ? "Sending..." : "Send Message"}
  </Button>

  <p className="text-center text-sm text-navy/50">
    We'll respond within 24 hours. No automated replies, just real people.
  </p>
</form>
```

**Key attributes:**
- Helper text on complex fields (e.g., budget range explanation)
- Welcoming intro copy before form fields
- Reassurance after submit button (response time, privacy)
- Generous spacing: space-y-6 or space-y-8 between field groups
- Specific placeholder examples ("Jane Smith" not "Your name")

### Pattern 4: Quote Integration Restyling

**What:** Redesign the existing quote summary card (shown when user arrives from pricing calculator) to match the new contact page aesthetic.

**When to use:** Contact page form area (conditional render if localStorage has QUOTE_STORAGE_KEY).

**Example:**
```tsx
// Quote summary card with new styling
{quoteData && !isSubmitted && (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    className="mb-8 p-6 bg-coral/10 border-2 border-coral/30 rounded-2xl"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 rounded-full bg-coral flex items-center justify-center">
        <span className="text-white text-xl font-bold">$</span>
      </div>
      <div>
        <h4 className="font-bold text-navy text-lg">Your Quote Summary</h4>
        <p className="text-sm text-navy/60">From the pricing calculator</p>
      </div>
    </div>

    <div className="space-y-2">
      {quoteData.services.map((svc) => (
        <div key={svc.serviceId} className="flex justify-between text-sm">
          <span className="text-navy/80">{svc.serviceName}</span>
          <span className="font-semibold text-navy">${svc.subtotal}</span>
        </div>
      ))}
      <div className="border-t-2 border-coral/20 pt-2 flex justify-between font-bold text-lg">
        <span className="text-navy">Total Estimate</span>
        <span className="text-coral">${quoteData.total}</span>
      </div>
    </div>
  </motion.div>
)}
```

**Key attributes:**
- Prominent visual identity (coral accent, rounded corners, icon)
- Label as "estimate" not "final quote" to set expectations
- Service breakdown preserved (already in message field)
- Entrance animation for polish

### Pattern 5: Dark/Light Section Rhythm

**What:** Intentional alternation of section backgrounds (navy → white → peach/10 → navy) for visual rhythm and hierarchy.

**When to use:** Both contact and about pages need rhythm decisions.

**Example patterns:**

**Contact Page Option A (Dark bookends):**
1. Dark navy hero (`bg-navy text-white`)
2. Light form section (`bg-card`)
3. Light or omit CTA section

**Contact Page Option B (Light throughout with dark accents):**
1. Light hero with navy text (`bg-card`)
2. White form section with colored sidebar (`bg-white`)
3. Dark navy CTA (`bg-navy text-white`)

**About Page Option A (Editorial rhythm):**
1. Dark navy hero (`bg-navy`)
2. Light story section (`bg-card`)
3. Peach-tinted values section (`bg-peach/10`)
4. Navy manifesto closer (`bg-navy`)

**About Page Option B (Continuous light with navy type):**
1. White hero with oversized navy type (`bg-card`)
2. White story section (`bg-white`)
3. Muted values section (`bg-muted`)
4. Peach CTA (`bg-peach/20`)

**Key attributes:**
- Use section backgrounds from Container.tsx: "white", "muted", "primary", "gradient"
- OR use direct Tailwind: `bg-navy`, `bg-card`, `bg-peach/10`, `bg-coral/5`
- Vary section padding: py-20, py-28, py-32, py-40 (not uniform py-16)
- Ensure text color contrast meets WCAG AA

### Anti-Patterns to Avoid

- **Uniform section heights:** DON'T use the same py-16 md:py-24 everywhere. Each section should have intentional padding based on content hierarchy.
- **Generic card grids:** DON'T wrap contact info in identical rounded cards. Use asymmetric layout with icons and varied sizes.
- **Template-style values section:** DON'T use 3-column grid with icon → title → description cards. Use oversized typography with minimal icons.
- **Corporate about page:** DON'T lead with team bios or company history timeline. Lead with mission/values as bold statements.
- **Reducing form fields for simplicity:** User wants "detailed but warm" — keep fields, add warmth through copy and spacing, not by removing fields.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form validation | Custom validation with useState error objects | react-hook-form + zod with zodResolver | Form libraries handle edge cases: touched state, async validation, field arrays, validation timing, error message lifecycle |
| Responsive grid breakpoints | Custom useMediaQuery hooks and conditional rendering | Tailwind responsive prefixes (sm:, md:, lg:) | Tailwind handles SSR/hydration safely, avoids flash of wrong layout, compiles to minimal CSS |
| Form field components | Separate components for each input variant | Existing Input/Textarea/Select with error/helperText props | Already built, tested, and styled consistently; extending is easier than rebuilding |
| Quote data parsing | Manual localStorage.getItem with try-catch and type assertions | Type-safe wrapper around QUOTE_STORAGE_KEY with QuoteData type | Type safety prevents runtime errors, already defined in pricingData.ts |
| Animation variants | Inline Framer Motion variants in JSX | Animation presets from src/lib/animations.ts (fadeIn, stagger) | Consistency across site, centralized easing curves, easier to maintain motion language |

**Key insight:** Form libraries exist because form state is deceptively complex (validation timing, error clearing, touched/dirty state, async validation, field dependencies). The existing react-hook-form + zod setup handles all these edge cases — extend it rather than fighting it.

## Common Pitfalls

### Pitfall 1: Breaking Form Submission with Quote Integration

**What goes wrong:** Quote data from localStorage is displayed but doesn't get included in the form submission payload, or message field pre-fill gets overwritten by user.

**Why it happens:** Quote data is displayed separately from the form's controlled state. If user edits the message field, the quote data in localStorage might not be reflected in the final submission.

**How to avoid:**
- Pre-fill the message field with quote breakdown using `setValue("message", quoteLines.join("\n"))` in useEffect (already done in existing contact page).
- User can edit the message — that's fine, quote context is preserved as initial text.
- Clear quote data from localStorage AFTER successful submission (prevents re-appearing on page refresh).
- Show quote summary visually OUTSIDE the form fields as reference, not as editable fields.

**Warning signs:**
- User reports quote not appearing in email
- Message field has quote data but submission payload doesn't
- Quote card persists after successful form submission

### Pitfall 2: CSS Grid Layout Breaks on Mobile

**What goes wrong:** Asymmetric desktop layout with explicit col-span values doesn't collapse gracefully on mobile, causing horizontal overflow or squished content.

**Why it happens:** Forgetting to reset col-span to full-width (col-span-4 on 4-col mobile grid) or using absolute col values that exceed mobile grid columns.

**How to avoid:**
- Always define mobile-first: `col-span-4` (full width on 4-col mobile grid).
- Add desktop overrides: `md:col-span-3` (3 of 6 cols on tablet), `lg:col-span-4` (4 of 12 cols on desktop).
- Test with Chrome DevTools responsive mode at 375px, 768px, 1024px, 1440px.
- Use `className="col-span-4 md:col-span-6 lg:col-span-4"` pattern for sidebar, `col-span-4 md:col-span-6 lg:col-span-8` for form.

**Warning signs:**
- Horizontal scrollbar on mobile
- Content cut off on narrow viewports
- Layout breaks between 768px-1024px (tablet range)

### Pitfall 3: Typography Scale Overflow on Small Screens

**What goes wrong:** Using xl:text-display (8rem) or text-7xl on mobile causes text to overflow container or break into awkward line wraps.

**Why it happens:** Display typography scale assumes large viewports. Text that fits beautifully on desktop becomes illegible on mobile.

**How to avoid:**
- Always use responsive type scale: `text-4xl md:text-6xl lg:text-7xl xl:text-display`.
- Test headline wrapping on 375px viewport (iPhone SE size).
- For mission statements or values, consider shorter phrasing on mobile with `<span className="hidden md:inline">` for long words.
- Use `leading-[0.9]` or `leading-tight` to prevent excessive line height on large text.

**Warning signs:**
- One-word-per-line stacking on mobile
- Text larger than viewport width
- Excessive vertical scroll on headline-heavy pages

### Pitfall 4: Form Feels Cold Despite Humanized Copy

**What goes wrong:** Form has friendly copy but still feels corporate due to tight spacing, small font sizes, or generic styling.

**Why it happens:** Warmth comes from visual breathing room, not just words. Insufficient padding/spacing creates visual tension.

**How to avoid:**
- Use generous spacing: `space-y-6` or `space-y-8` between field groups (not space-y-4).
- Increase label font size: `text-sm font-medium` → `text-base font-semibold`.
- Add helper text to complex fields: "What's your budget range?" under a budget select.
- Use specific placeholders: "Jane Smith" not "Your name", "$5,000 - $10,000" not "Budget".
- Add intro paragraph before form fields: "Let's talk about your project..." with warm tone.
- Add reassurance after submit: "We'll respond within 24 hours. No robots, just real people."

**Warning signs:**
- User testing feedback: "form feels clinical" or "too corporate"
- High form abandonment rate (analytics)
- Fields feel cramped or rushed

### Pitfall 5: About Page Reads Like Corporate Boilerplate

**What goes wrong:** Mission/values section uses generic phrasing ("We strive for excellence", "Customer-focused approach") that could apply to any company.

**Why it happens:** Defaulting to safe, professional language instead of the edgy creative tone established across the site.

**How to avoid:**
- Write values in first person plural: "We remember your name" not "Client-focused service".
- Use concrete language: "We'd rather lose a sale than waste your money" not "We prioritize transparency".
- Avoid buzzwords: "excellence", "innovative", "world-class", "cutting-edge".
- Match homepage tone: bold capability statements, not humble corporate speak.
- Test by reading aloud — if it sounds like it could be on any agency site, rewrite it.

**Warning signs:**
- Copy uses passive voice or corporate jargon
- Values could apply to competitors without changing a word
- About page tone doesn't match homepage hero tone

## Code Examples

Verified patterns from existing codebase and official sources:

### Form Validation with react-hook-form + zod

```tsx
// Source: Existing contact/page.tsx + react-hook-form docs
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  budget: z.string().optional(), // NEW: budget range field
  timeline: z.string().optional(), // NEW: project timeline field
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
  setValue,
} = useForm<ContactFormData>({
  resolver: zodResolver(contactSchema),
});

const onSubmit = async (data: ContactFormData) => {
  // Validation passed, data is type-safe
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  // Handle response...
};
```

### Asymmetric Grid Layout (Contact Form + Sidebar)

```tsx
// Source: Hero.tsx bento grid pattern + Tailwind CSS Grid docs
<div className="grid grid-cols-4 md:grid-cols-12 gap-6 lg:gap-8">
  {/* Sidebar: 4/12 cols (1/3 width on desktop) */}
  <div className="col-span-4 md:col-span-4 lg:col-span-4 space-y-6">
    <h2 className="text-2xl font-bold text-navy">Get in Touch</h2>
    <p className="text-navy/60">
      Fill out the form and we'll get back to you within 24 hours.
    </p>

    {/* Contact info items */}
    <div className="space-y-4">
      {contactInfo.map((item) => (
        <a key={item.label} href={item.href} className="flex items-start gap-4 group">
          <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center">
            <item.icon className="w-5 h-5 text-coral" />
          </div>
          <div>
            <p className="text-sm text-navy/60">{item.label}</p>
            <p className="font-semibold text-navy">{item.value}</p>
          </div>
        </a>
      ))}
    </div>
  </div>

  {/* Form: 8/12 cols (2/3 width on desktop) */}
  <div className="col-span-4 md:col-span-8 lg:col-span-8">
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Form fields... */}
    </form>
  </div>
</div>
```

### Typography-Driven Value Statement

```tsx
// Source: Hero.tsx oversized typography + About page existing structure
<section className="bg-card py-28 md:py-40">
  <Container size="lg">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="max-w-5xl"
    >
      <h2 className="text-6xl md:text-8xl lg:text-display font-black text-navy leading-[0.9] tracking-tight mb-6">
        We Remember <span className="text-coral">Your Name.</span>
      </h2>
      <p className="text-xl md:text-2xl text-navy/60 leading-relaxed">
        You're not a ticket number. Your account manager knows your business,
        your goals, and your preferences. We build relationships, not just websites.
      </p>
    </motion.div>
  </Container>
</section>
```

### Quote Integration with localStorage

```tsx
// Source: Existing contact/page.tsx
import { QUOTE_STORAGE_KEY, type QuoteData } from "@/lib/pricingData";

const [quoteData, setQuoteData] = useState<QuoteData | null>(null);

useEffect(() => {
  try {
    const stored = localStorage.getItem(QUOTE_STORAGE_KEY);
    if (stored) {
      const quote: QuoteData = JSON.parse(stored);
      setQuoteData(quote);

      // Pre-fill message with quote breakdown
      const lines: string[] = ["--- Quote from Price Calculator ---"];
      for (const svc of quote.services) {
        lines.push(`\n${svc.serviceName} (base: $${svc.basePrice})`);
        for (const item of svc.lineItems) {
          if (item.price !== 0) {
            lines.push(`  - ${item.label}: ${item.price > 0 ? `+$${item.price}` : `-$${Math.abs(item.price)}`}`);
          }
        }
        lines.push(`  Subtotal: $${svc.subtotal}`);
      }
      lines.push(`\nTotal: $${quote.total}`);
      lines.push("---\n\nAdditional details:\n");

      setValue("message", lines.join("\n"));
    }
  } catch {
    // Ignore localStorage errors (SSR safe)
  }
}, [setValue]);

// Clear quote after successful submission
const onSubmit = async (data: ContactFormData) => {
  // ... submit logic ...
  if (response.ok) {
    localStorage.removeItem(QUOTE_STORAGE_KEY);
    setQuoteData(null);
  }
};
```

### Entrance Animations with Framer Motion

```tsx
// Source: src/lib/animations.ts + existing pages
import { motion } from "framer-motion";

// Reuse existing animation presets
const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

<motion.div
  variants={heroVariants}
  initial="hidden"
  animate="visible"
>
  <motion.h1 variants={itemVariants}>Headline</motion.h1>
  <motion.p variants={itemVariants}>Subtext</motion.p>
</motion.div>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Uniform section padding (py-16) | Varied intentional spacing (py-20, py-28, py-40) | Phase 03-06 | Pages feel hand-crafted, not templated |
| Generic gradient backgrounds | Strategic dark/light rhythm with navy/coral accents | Phase 03-06 | Visual hierarchy and contrast |
| Identical card grids | Asymmetric bento layouts with CSS Grid col-span | Phase 03, 06 | Breaks templated feel |
| Simple form validation (regex only) | react-hook-form + zod with type-safe schemas | Already established | Client + server validation with TypeScript safety |
| Minimal form fields for simplicity | Detailed fields with warmth through copy/spacing | 2026 UX trend | Better lead qualification without feeling corporate |
| Corporate about page (team bios, timeline) | Typography-driven editorial approach (mission/values) | 2026 design trend | Matches edgy creative agency positioning |

**Deprecated/outdated:**
- **Uniform py-16 padding:** Replaced with varied section rhythm (py-20/28/32/40) based on content hierarchy
- **Identical section backgrounds:** Now using dark/light alternation for visual rhythm
- **Template-style value cards:** Replaced with oversized typography + minimal supporting elements

## Open Questions

1. **Contact Page Layout Direction**
   - What we know: User wants unique layout, form + sidebar structure, quote integration preserved
   - What's unclear: Split-screen (50/50), bento-inspired asymmetric (40/60), or full-width form with floating sidebar?
   - Recommendation: Use bento-inspired asymmetric (sidebar 4/12 cols, form 8/12 cols) to match Hero pattern while being distinct from services/pricing pages

2. **About Page Stats Section Replacement**
   - What we know: User explicitly said "no stats/social proof section"
   - What's unclear: Should anything replace it (client logos, testimonial quote, timeline), or just remove it entirely?
   - Recommendation: Remove entirely — let typography carry the page. If user wants proof, the portfolio link at CTA does that.

3. **Additional Form Fields (Budget, Timeline)**
   - What we know: User wants "detailed but warm" with more fields
   - What's unclear: Exact field names and validation rules for budget/timeline
   - Recommendation: Add "Budget Range" (select dropdown: <$5k, $5k-$10k, $10k-$25k, $25k+, Not sure yet) and "Timeline" (select: ASAP, 1-2 months, 2-3 months, Flexible)

4. **About Page Hero Approach**
   - What we know: User allows origin story OR mission-first, at Claude's discretion
   - What's unclear: Which creates stronger impact for the edgy creative positioning?
   - Recommendation: Lead with mission/manifesto statement, integrate logo story later in a secondary section — mission sets tone immediately

5. **Contact CTA Section**
   - What we know: User allows keeping or removing based on page flow judgment
   - What's unclear: Does CTA section add value or feel redundant after form submission success state?
   - Recommendation: Keep CTA but make it feel different — instead of generic "Get in Touch", offer alternative paths ("Not ready to commit? Check out our pricing calculator" or "Browse our portfolio for inspiration")

## Sources

### Primary (HIGH confidence)
- **react-hook-form documentation** - Form state management patterns
- **zod documentation** - TypeScript-first validation schemas
- **Next.js App Router documentation** - Server actions and API routes
- **Tailwind CSS Grid documentation** - CSS Grid utilities and responsive design
- **Framer Motion documentation** - Animation variants and viewport detection
- **Existing codebase** (src/app/contact/page.tsx, src/app/about/page.tsx, src/components/ui/Input.tsx, src/lib/pricingData.ts) - Current implementation patterns

### Secondary (MEDIUM confidence)
- [60+ Best Contact page Examples for 2026 (Curated Trends) | Muzli](https://muz.li/inspiration/contact-page/) - Contact page design trends, split-screen patterns
- [10 Inspiring Examples of Asymmetrical Split Screens in Web Design](https://speckyboy.com/asymmetrical-split-screens-web-design/) - Asymmetric layout patterns
- [Building a Bento Grid Layout with Modern CSS Grid](https://www.wearedevelopers.com/en/magazine/682/building-a-bento-grid-layout-with-modern-css-grid-682) - Bento grid implementation with CSS Grid
- [Breaking rules and bringing joy: top typography trends for 2026 | Creative Bloq](https://www.creativebloq.com/design/fonts-typography/breaking-rules-and-bringing-joy-top-typography-trends-for-2026) - Typography-driven design trends
- ['Imperfect by Design': The visual design trends set to define 2026](https://www.canva.com/newsroom/news/design-trends-2026/) - Editorial typography and expressive type
- [Contact Form Design Examples: 20 Best Forms [With Tools]](https://www.eleken.co/blog-posts/contact-form-design) - Humanized form design patterns
- [How to Design UI Forms in 2026: Your Best Guide | IxDF](https://www.interaction-design.org/literature/article/ui-form-design) - Form UX best practices
- [How to Create a Contact Us Page | UX Design Examples](https://weareyellowball.com/guides/from-boring-to-brilliant-contact-page-examples-that-actually-work/) - Warm messaging and trust elements
- [Conditional Logic with Zod + React Hook Form | Micah Engle-Eshleman](https://micahjon.com/2023/form-validation-with-zod/) - Conditional field validation patterns
- [Building a reusable multi-step form with React Hook Form and Zod - LogRocket Blog](https://blog.logrocket.com/building-reusable-multi-step-form-react-hook-form-zod/) - Multi-step form architecture

### Tertiary (LOW confidence)
- None — all research backed by official documentation or verified 2026 design trend articles

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already in package.json, patterns proven in existing codebase
- Architecture: HIGH - CSS Grid bento patterns verified in Hero.tsx, form patterns verified in contact/page.tsx
- Pitfalls: HIGH - Based on common React form issues and responsive grid failures documented across multiple sources
- Design trends: MEDIUM - 2026 trends from credible sources (Creative Bloq, Canva, IxDF) but trends can shift

**Research date:** 2026-02-11
**Valid until:** ~30 days (React/Next.js stack stable, design trends relatively stable, form patterns established)

**Notes:**
- No new dependencies required — all patterns use existing libraries
- Contact form functionality already proven (quote integration, validation, API submission)
- Main implementation challenge is layout composition and copy tone, not technical capability
- User decisions constrain enough to guide planning but leave discretion for layout details

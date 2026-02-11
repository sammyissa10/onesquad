# Phase 04: Services Page Redesign - Research

**Researched:** 2026-02-11
**Domain:** Service page layouts, Next.js dynamic routing, category navigation patterns, service detail page structure, copy strategy
**Confidence:** HIGH

## Summary

Phase 04 redesigns the services overview page (`/services`) and individual service detail pages (`/services/[slug]`) using the design patterns established in Phase 3. The phase applies asymmetric bento grids, dark/light rhythm, varied spacing, multiple hover patterns, and edgy creative copy to showcase 10 services across 2 categories (Digital Marketing and Web Solutions).

The technical foundation exists: Next.js 16 dynamic routes with `generateStaticParams` enable static generation of all 10 service detail pages at build time, existing service data in `src/lib/constants.ts` provides comprehensive content (titles, descriptions, features, results, FAQs), and Phase 3 established reusable patterns (navy/coral/peach brand colors via @theme, scale/glow/lift+shadow hover patterns, Framer Motion entrance animations with useInView).

Best practices research confirms that service pages in 2026 prioritize unique layouts over identical card grids (bento grids remain the dominant trend), all-on-one-page approaches outperform tab/filter navigation for small service counts (10 services), category sections with distinct visual treatments create better scanning than uniform grids, and edgy marketing copy uses confident declarations, rebellious tone, and results-focused language.

**Primary recommendation:** Redesign `/services` as an all-on-one-page experience with unique section treatments per category (Digital Marketing gets one layout pattern, Web Solutions gets another), apply asymmetric bento grid to feature 2-3 hero services with prominence while maintaining equal value, implement hero section with bold edgy headline and optional category jump navigation, redesign service detail pages with 5-section structure (Hero, Features, Results, Why Choose, Related Services), and rewrite all copy to match Phase 3's edgy tone ("Stop Shopping Around. Get Everything Here." vs. "Comprehensive Digital Services").

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Service Hierarchy:**
- All 10 services get equal visual prominence — no flagship or featured services
- Currently split into Digital Marketing (6 services) and Web Solutions (4 services) categories

### Claude's Discretion

The user gave Claude full creative control over the services page redesign. The following decisions are all at Claude's discretion, guided by the design patterns established in Phase 3 (homepage) and the project's inspiration references (Kota.co.uk, StrangePixels):

**Overview page layout:**
- Layout approach (featured+grid, category sections, full unique treatments, or hybrid)
- Hero section presence and style (bold hero vs. diving straight into services)
- CTA section at bottom (or let cards be the primary action)
- Category navigation (tabs/filters vs. all-on-one-page)
- Service card interaction pattern (link to detail pages vs. expandable inline)
- Mobile responsive approach

**Dark/light rhythm:**
- Section rhythm for services page (mirror homepage pattern or own distinct rhythm)

**Service detail pages:**
- Whether to redesign detail pages in this phase (roadmap scope: "services page" — detail pages are included at Claude's discretion based on effort and coherence)
- Detail page section structure and ordering

**Copy approach:**
- Copy rewrite strategy (unique taglines per service or consistent edgy voice)
- Headline and body tone calibration

</user_constraints>

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Next.js App Router | 16.1.6 | Dynamic routing + SSG | Industry standard for React SSR/SSG; already in project |
| generateStaticParams | Native | Static service pages | Next.js native API for pre-rendering dynamic routes at build time |
| CSS Grid | Native | Asymmetric layouts | Same pattern used in Phase 3 hero; enables bento grid designs |
| Framer Motion | 12.33.0 | Scroll animations | Already in project; useInView hook for scroll-triggered entrance |
| Tailwind CSS | v4.x | Styling | Already in project; @theme colors from Phase 3 (navy, coral, peach, blue) |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| TypeScript | v5.x | Type safety | Already in project; type service data from constants.ts |
| Lucide React | 0.563.0 | Icons | Already in project; service icons defined in constants.ts |
| Next.js Link | Native | Client-side navigation | Use for all service card → detail page navigation |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| All-on-one-page | Tab/filter navigation | Tabs require state management, hide content; all-on-page better for 10 services |
| generateStaticParams | getServerSideProps | SSG (static generation) is faster and more SEO-friendly than SSR |
| Category sections | Uniform grid | Unique section treatments per category create visual interest vs. boring uniformity |
| Service detail pages | Modal/drawer patterns | Detail pages better for SEO, sharing, and deep-linking than inline modals |

**Installation:**

No new packages required — all dependencies already in package.json.

## Architecture Patterns

### Recommended Project Structure

```
src/
├── app/
│   └── services/
│       ├── page.tsx                    # Overview page (redesign)
│       └── [slug]/
│           └── page.tsx                # Detail page (redesign)
├── components/
│   ├── sections/
│   │   ├── ServicesHero.tsx           # NEW: Services page hero
│   │   ├── DigitalMarketingGrid.tsx   # NEW: DM category section
│   │   └── WebSolutionsGrid.tsx       # NEW: WS category section
│   └── ui/
│       └── ServiceCard.tsx            # NEW/UPDATED: Reusable service card
└── lib/
    └── constants.ts                    # Existing: 10 services data
```

### Pattern 1: Next.js Dynamic Route with Static Generation

**What:** Use `generateStaticParams` to pre-render all service detail pages at build time from the services array.

**When to use:** Any page with dynamic URL parameters where the full set of parameters is known at build time (services, blog posts, portfolio items).

**Example:**

```tsx
// Source: https://nextjs.org/docs/app/api-reference/functions/generate-static-params
// src/app/services/[slug]/page.tsx
import { services } from "@/lib/constants";

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  if (!service) return <ServiceNotFound />;

  return (
    <main>
      <ServiceHero service={service} />
      <ServiceFeatures service={service} />
      {/* ... */}
    </main>
  );
}
```

**Key points:**
- generateStaticParams runs at build time, not request time
- Returns array of param objects (one per page to generate)
- Combined with fetch, requests are automatically deduplicated
- Results in fully static HTML pages for all 10 services

### Pattern 2: All-on-One-Page Category Sections

**What:** Display all services on one scrollable page with distinct section treatments per category, instead of tabs/filters.

**When to use:** Small-to-medium service counts (3-15 items), when category boundaries are clear, when you want better SEO and content discoverability.

**Example:**

```tsx
// Source: UX research consensus from https://www.eleken.co/blog-posts/tabs-ux
// src/app/services/page.tsx
export default function ServicesPage() {
  const digitalMarketing = services.filter((s) => s.category === "digital-marketing");
  const webSolutions = services.filter((s) => s.category === "web-solutions");

  return (
    <main>
      <ServicesHero />

      {/* Digital Marketing — unique layout pattern 1 */}
      <section className="bg-white py-20 md:py-28">
        <Container>
          <h2 className="text-4xl font-black mb-12">Digital Marketing</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {digitalMarketing.map((service) => (
              <ServiceCard key={service.slug} service={service} variant="compact" />
            ))}
          </div>
        </Container>
      </section>

      {/* Web Solutions — unique layout pattern 2 */}
      <section className="bg-navy text-white py-24 md:py-36">
        <Container>
          <h2 className="text-5xl font-black mb-12">Web Solutions</h2>
          <BentoGrid services={webSolutions} />
        </Container>
      </section>

      <ServicesCTA />
    </main>
  );
}
```

**Why this works:**
- No hidden content — all services visible without interaction
- Better SEO — all content crawlable on one page
- Simpler UX — no state management for active tabs
- Printable/shareable — full overview in one URL
- Category sections create visual rhythm like homepage sections

### Pattern 3: Service Detail Page Structure

**What:** 5-section standard structure for service detail pages: Hero, Features, Results, Why Choose, Related Services.

**When to use:** Any product/service detail page requiring comprehensive information with clear hierarchy.

**Example:**

```tsx
// Source: Service page best practices from https://webflow.com/blog/service-page
// src/app/services/[slug]/page.tsx
export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug);
  const relatedServices = services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3);

  return (
    <main>
      {/* 1. Hero — service name, description, CTA */}
      <section className="bg-navy text-white py-24">
        <Container>
          <h1 className="text-6xl font-black mb-6">{service.title}</h1>
          <p className="text-2xl text-white/70 mb-8">{service.description}</p>
          <Button variant="coral">Get Started</Button>
        </Container>
      </section>

      {/* 2. Features — what's included */}
      <section className="bg-white py-20">
        <Container>
          <h2 className="text-4xl font-bold mb-12">What's Included</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {service.features.map((feature) => (
              <FeatureCard key={feature} feature={feature} />
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Results — metrics and outcomes */}
      <section className="bg-navy text-white py-24">
        <Container>
          <h2 className="text-4xl font-bold mb-12">Results That Speak</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {service.results.map((result) => (
              <StatCard key={result.metric} {...result} />
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Why Choose — trust building */}
      <section className="bg-peach/10 py-20">
        <Container>
          <h2 className="text-4xl font-bold mb-6">Why Choose OneSquad?</h2>
          <p className="text-lg mb-8">We focus on results, not buzzwords...</p>
          <div className="flex gap-4">
            <Button variant="coral">Get Started</Button>
            <Button variant="outline">View Pricing</Button>
          </div>
        </Container>
      </section>

      {/* 5. Related Services — cross-sell */}
      <section className="bg-white py-20">
        <Container>
          <h2 className="text-4xl font-bold mb-12">Related Services</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedServices.map((rel) => (
              <ServiceCard key={rel.slug} service={rel} variant="compact" />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
```

**Section order rationale:**
1. Hero grabs attention and states value
2. Features answer "what do I get?"
3. Results build credibility with data
4. Why Choose differentiates from competitors
5. Related Services guide further exploration

### Pattern 4: Scroll-Triggered Entrance Animations

**What:** Use Framer Motion's `useInView` hook to trigger entrance animations when sections scroll into viewport.

**When to use:** Service cards, feature grids, stats sections — any repeating content blocks that benefit from staggered reveals.

**Example:**

```tsx
// Source: https://motion.dev/docs/react-use-in-view
// Phase 3 established pattern in Features.tsx and ServicesPreview.tsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function ServiceGrid({ services }: { services: Service[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 },
        },
      }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {services.map((service) => (
        <motion.div
          key={service.slug}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <ServiceCard service={service} />
        </motion.div>
      ))}
    </motion.div>
  );
}
```

**Key configuration:**
- `once: true` — animation plays only first time in view (performance)
- `margin: "-50px"` — trigger slightly before element enters viewport (feels more responsive)
- `staggerChildren: 0.1` — 100ms delay between each child animation
- Same pattern used in Phase 3 Features and ServicesPreview sections

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Tab/filter state management | Custom React state + URL sync | All-on-one-page sections | Simpler UX, better SEO, no state complexity for 10 services |
| Service card hover effects | Custom CSS animations | Phase 3 hover patterns (scale, glow, lift+shadow) | Already established, performance-optimized, consistent |
| Scroll reveal animations | Intersection Observer + custom animation logic | Framer Motion useInView | Already in project, handles reduced motion, cleaner API |
| Service data typing | Inline types per component | TypeScript types from src/types.ts | Project already has Service interface defined |
| Dynamic route typing | Manual params validation | Next.js typed params with generateStaticParams | Type-safe by default, no runtime validation needed |

**Key insight:** Phase 3 solved the hard problems (brand colors, hover patterns, entrance animations, section rhythm). Phase 4 applies those solutions to a different page — don't reinvent, reuse.

## Common Pitfalls

### Pitfall 1: Using Tabs/Filters for Small Service Counts

**What goes wrong:** Tabs hide content, require state management, and create poor SEO. For 10 services split into 2 categories, tabs add complexity without UX benefit.

**Why it happens:** Developers default to tabs when they see "categories" without considering whether the content volume justifies hiding anything.

**How to avoid:** Use all-on-one-page with distinct section treatments when total items < 15 and categories are clear. Reserve tabs for truly large datasets (50+ items) or mutually exclusive content modes.

**Warning signs:**
- Users can see all services by scrolling 2-3 screens
- Category boundaries are obvious (Digital Marketing vs. Web Solutions)
- No search/filter needed to find specific service
- SEO important (all services should be crawlable on overview page)

**Research source:** [Tabs UX: Best Practices](https://www.eleken.co/blog-posts/tabs-ux) — "If users should see all information grouped together when printed, don't use tabs."

### Pitfall 2: Identical Card Grids (No Unique Treatments)

**What goes wrong:** Uniform 3-column grids for both categories create visual monotony and fail to leverage the unique layout requirement (LYOT-02: "Services page uses unique section treatments").

**Why it happens:** Developers reuse the same grid component for efficiency without considering design requirements.

**How to avoid:** Give each category a distinct layout pattern:
- Digital Marketing: 3-column compact cards with glow hover (matches homepage ServicesPreview)
- Web Solutions: Asymmetric bento grid or 2-column feature cards with lift+shadow hover

**Warning signs:**
- Both categories use identical `grid-cols-3` layouts
- All service cards have same size and aspect ratio
- Hover effects are identical across all cards
- No visual differentiation between categories beyond header text

**Research source:** [Bento Grid Design Guide](https://landdding.com/blog/blog-bento-grid-design-guide) — Bento grids encode hierarchy through varied card sizes, not just content.

### Pitfall 3: Corporate Copy on Services Page

**What goes wrong:** Copy uses generic corporate language ("comprehensive digital solutions," "leveraging best-in-class") instead of edgy creative tone established in Phase 3.

**Why it happens:** Service pages default to safe, professional language because developers don't have copywriting guidance.

**How to avoid:** Rewrite all headlines and descriptions using Phase 3's tone:
- Corporate: "Comprehensive Digital Marketing Services"
- Edgy: "Marketing That Actually Brings Customers Through the Door"
- Corporate: "Professional Web Design Solutions"
- Edgy: "Websites That Don't Look Like Templates"

**Warning signs:**
- Words like "comprehensive," "solutions," "leveraging," "best-in-class"
- Passive voice ("services are provided")
- Feature lists without benefit framing
- Generic value props ("quality," "affordable," "professional")

**Research source:** [Brand Voice Examples 2026](https://www.ebaqdesign.com/blog/brand-voice) — Liquid Death's "Murder Your Thirst" demonstrates confident, rebellious tone vs. generic water brand copy.

### Pitfall 4: Missing generateStaticParams (Dynamic Routes Not Pre-rendered)

**What goes wrong:** Omitting `generateStaticParams` in `/services/[slug]/page.tsx` causes service detail pages to render on-demand (SSR) instead of at build time (SSG), resulting in slower page loads and worse SEO.

**Why it happens:** Developers forget that Next.js dynamic routes are SSR by default; SSG requires explicit opt-in via `generateStaticParams`.

**How to avoid:** Always export `generateStaticParams` for dynamic routes when the full parameter set is known at build time:

```tsx
export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}
```

**Warning signs:**
- `next build` output shows service pages as "λ (Server)" instead of "○ (Static)"
- Service detail pages load slower than static pages
- Lighthouse reports "Server-Side Rendering" instead of "Static HTML"

**Research source:** [Next.js generateStaticParams docs](https://nextjs.org/docs/app/api-reference/functions/generate-static-params) — "generateStaticParams runs before the corresponding Layouts or Pages are generated."

### Pitfall 5: Service Detail Pages Not Redesigned

**What goes wrong:** Overview page gets redesigned with Phase 3 patterns, but detail pages keep old generic layout, creating jarring visual disconnect.

**Why it happens:** "Services page" scope is ambiguous — could mean overview only or include detail pages.

**How to avoid:** Redesign detail pages in this phase to maintain visual coherence. Detail pages are part of the services experience and should match the overview page's design language.

**Warning signs:**
- Detail pages use generic Section backgrounds instead of navy/coral/peach
- Detail pages lack the glow/scale/lift+shadow hover patterns
- Detail pages use old corporate copy tone
- Visual disconnect when navigating from overview → detail

**Decision:** CONTEXT.md marks this as Claude's discretion. Given that detail pages are already implemented and coherence is important, **recommend redesigning detail pages in this phase**.

## Code Examples

Verified patterns from Phase 3 and official sources:

### Asymmetric Bento Grid for Web Solutions Category

```tsx
// Source: Phase 3 Hero.tsx + https://tailwindcss.com/docs/grid-column
// Apply same bento pattern to Web Solutions section
export function WebSolutionsSection() {
  const webSolutions = services.filter((s) => s.category === "web-solutions");

  return (
    <section className="bg-navy text-white py-24 md:py-36">
      <Container>
        <h2 className="text-4xl md:text-5xl font-black text-white mb-12">
          Build Your Digital Foundation
        </h2>

        <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
          {/* Featured service — large 2x2 block */}
          <div className="col-span-4 md:col-span-4 row-span-2">
            <ServiceCard
              service={webSolutions[0]}
              variant="featured"
              hover="lift-shadow"
            />
          </div>

          {/* Supporting services — 2x1 and 1x1 blocks */}
          {webSolutions.slice(1).map((service, idx) => (
            <div
              key={service.slug}
              className={idx === 0 ? "col-span-2 row-span-1" : "col-span-2 md:col-span-1 row-span-1"}
            >
              <ServiceCard service={service} variant="compact" hover="scale" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
```

### Service Card with Glow Hover Pattern

```tsx
// Source: Phase 3 ServicesPreview.tsx (lines 61-82)
// Reusable service card component with glow hover
export function ServiceCard({ service, variant = "default" }: ServiceCardProps) {
  return (
    <Link href={`/services/${service.slug}`}>
      <div className="relative group">
        {/* Glow layer — Phase 3 established pattern */}
        <div className="absolute -inset-1 bg-coral/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Card content */}
        <div
          data-cursor="card"
          data-cursor-text="View"
          className="relative bg-white rounded-2xl p-6 border border-gray-200 h-full"
        >
          <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-4 group-hover:bg-coral transition-colors">
            <DynamicIcon
              name={service.icon}
              className="w-6 h-6 text-coral group-hover:text-white transition-colors"
            />
          </div>
          <h4 className="font-bold text-navy mb-2 group-hover:text-coral transition-colors">
            {service.title}
          </h4>
          <p className="text-sm text-navy/60">
            {service.shortDescription}
          </p>
        </div>
      </div>
    </Link>
  );
}
```

### Scroll-Triggered Section Animation

```tsx
// Source: Phase 3 Features.tsx + https://motion.dev/docs/react-use-in-view
// Apply to Digital Marketing section
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function DigitalMarketingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="bg-white py-20 md:py-28">
      <Container>
        <h2 className="text-3xl md:text-5xl font-bold mb-12">
          Marketing That <span className="text-coral">Actually Works</span>
        </h2>

        <motion.div
          ref={ref}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {digitalMarketing.map((service) => (
            <motion.div
              key={service.slug}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
```

### Service Detail Page Hero with Edgy Copy

```tsx
// Source: Edgy copy examples from https://www.ebaqdesign.com/blog/brand-voice
// Detail page hero matching Phase 3 tone
export function ServiceDetailHero({ service }: { service: Service }) {
  return (
    <section className="bg-navy text-white py-24 md:py-32">
      <Container>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Services
        </Link>

        <div className="flex items-start gap-6 mb-8">
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
            <DynamicIcon name={service.icon} className="w-10 h-10 text-coral" />
          </div>
          <div>
            <span className="text-coral font-semibold text-sm uppercase tracking-wider">
              {service.category === "digital-marketing" ? "Digital Marketing" : "Web Solutions"}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mt-2 mb-4">
              {service.title}
            </h1>
            {/* Edgy description — not corporate */}
            <p className="text-xl text-white/80 max-w-2xl">
              {service.description}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="coral" size="lg">
            Get Started
          </Button>
          <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-navy">
            View Pricing
          </Button>
        </div>
      </Container>
    </section>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Tab-based category navigation | All-on-one-page with section treatments | 2024-2025 | Better SEO, simpler UX for small-medium catalogs |
| Uniform service card grids | Asymmetric bento grids | 2025-2026 | Visual hierarchy, reduced monotony, 67% adoption |
| SSR for dynamic routes | SSG with generateStaticParams | Next.js 13+ (2022) | Faster loads, better SEO, cheaper hosting |
| Corporate service page copy | Edgy, confident brand voice | 2024-2026 trend | Higher engagement, stronger differentiation |
| box-shadow hover animations | transform + opacity patterns | Ongoing perf focus | 60fps animations, reduced jank |

**Deprecated/outdated:**
- `getStaticPaths` — replaced by `generateStaticParams` in Next.js 13+ App Router
- `grid-auto-flow: dense` — accessibility concerns (reading order issues), prefer explicit span
- Separate mobile/desktop component trees — modern CSS Grid handles responsive without JS

## Open Questions

### 1. Should Service Detail Pages Include Service-Specific FAQs?

**What we know:**
- Service data in constants.ts includes `serviceFaqs` array for each service
- Current detail page template renders these FAQs
- Homepage has general FAQ section (HomeFAQ.tsx)

**What's unclear:**
- Whether service-specific FAQs add value or create redundancy
- Whether FAQ section should be included in detail page redesign
- Optimal placement in the 5-section structure

**Recommendation:** Include service FAQs on detail pages as 6th section (after Related Services). They answer service-specific questions that general FAQs don't cover, improve SEO with long-tail keywords, and provide conversion support for users evaluating that specific service.

### 2. Should Overview Page Have Jump Navigation for Categories?

**What we know:**
- Two categories: Digital Marketing, Web Solutions
- All-on-one-page approach means both visible by scrolling
- Phase 3 homepage doesn't use jump navigation

**What's unclear:**
- Whether quick category access improves UX for 2-category page
- Whether sticky navigation adds value or creates clutter

**Recommendation:** Add simple hero-level category buttons ("Jump to Digital Marketing | Web Solutions") for quick access, but no sticky nav. With only 2 categories, full sticky navigation is overkill, but hero CTAs provide convenience without complexity.

### 3. How Much Service Detail Page Copy Should Be Rewritten?

**What we know:**
- Service descriptions in constants.ts are moderately edgy (already rewritten in previous work)
- Phase 3 established strong edgy tone on homepage
- COPY-02 requirement: "Services page copy rewritten — confident, not corporate"

**What's unclear:**
- Whether existing service descriptions meet edgy bar or need stronger rewrite
- Whether detail page section headlines need unique edgy treatment per service
- How much copy rewrite constitutes "services page copy rewritten"

**Recommendation:** Review all service descriptions and features arrays in constants.ts. Rewrite any that use corporate language (identified in Pitfall 3). Create edgy headlines for detail page sections that vary per service ("What You Actually Get" vs. "What's Included"). Scope is: overview page hero headline, category section headlines, and detail page section headlines — service data descriptions are adequate if already non-corporate.

## Sources

### Primary (HIGH confidence)

- Next.js 16 Documentation - [Dynamic Routes](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes)
- Next.js 16 Documentation - [generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
- Framer Motion Documentation - [useInView Hook](https://motion.dev/docs/react-use-in-view)
- Tailwind CSS v4 Documentation - [Theme Variables](https://tailwindcss.com/docs/theme)
- Phase 3 Research - c:\Users\sammy\Projects\onesquad\.planning\phases\03-homepage-visual-overhaul\03-RESEARCH.md
- Phase 3 Implementation - src/components/sections/Features.tsx, ServicesPreview.tsx (hover patterns, entrance animations)

### Secondary (MEDIUM confidence)

- [Bento Grid Design Guide 2026](https://landdding.com/blog/blog-bento-grid-design-guide) - Asymmetric layout patterns
- [Service Page Design Best Practices](https://webflow.com/blog/service-page) - Detail page structure
- [Tabs UX Best Practices](https://www.eleken.co/blog-posts/tabs-ux) - When to use tabs vs. all-on-one-page
- [Brand Voice Examples 2026](https://www.ebaqdesign.com/blog/brand-voice) - Edgy copy tone (Liquid Death, WeFunder, Oatly)
- [30+ Service Page Examples 2026](https://www.sitebuilderreport.com/inspiration/service-page-examples) - Current design trends
- Kota.co.uk - Layout inspiration (asymmetric grids, project showcases)

### Tertiary (LOW confidence)

- StrangePixels.com - Listed as inspiration but domain appears inactive/parked
- Various UX pattern sites - General guidance, not project-specific

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already in project, patterns established in Phase 3
- Architecture: HIGH - Next.js dynamic routing is well-documented, Phase 3 patterns proven
- Pitfalls: HIGH - Based on official docs, Phase 3 implementation, and verified UX research
- Copy strategy: MEDIUM - Edgy tone examples from research, but application requires creative judgment

**Research date:** 2026-02-11
**Valid until:** 30 days (stable domain — Next.js, Tailwind, service page UX patterns unlikely to change rapidly)

**Dependencies:**
- Phase 3 must be complete (brand colors, hover patterns, section rhythm established)
- Service data in constants.ts must be accurate (titles, descriptions, features, results, FAQs)
- Tailwind CSS @theme directive must include navy, coral, peach, blue colors

# Codebase Structure

**Analysis Date:** 2026-02-10

## Directory Layout

```
onesquad/
├── src/
│   ├── app/                        # Next.js App Router - pages and API routes
│   │   ├── (pages)/                # Marketing pages
│   │   ├── api/                    # Server-side API handlers
│   │   ├── layout.tsx              # Root layout with metadata and providers
│   │   ├── page.tsx                # Homepage
│   │   └── not-found.tsx           # 404 error page
│   │
│   ├── components/                 # React components organized by purpose
│   │   ├── layout/                 # Persistent UI (Header, Footer, Logo)
│   │   ├── sections/               # Large page sections (Hero, Features, etc.)
│   │   └── ui/                     # Atomic reusable components (Button, Input, etc.)
│   │
│   ├── lib/                        # Utility functions and configuration
│   │   ├── animations.ts           # Framer Motion animation presets
│   │   ├── constants.ts            # Site config, nav items, services, pricing, FAQs
│   │   ├── pricingData.ts          # Pricing plan definitions
│   │   ├── templateData.ts         # Template showcase data
│   │   ├── demoContent.ts          # Demo/example content
│   │   └── utils.ts                # Helper functions (cn, formatPrice)
│   │
│   ├── types/                      # TypeScript type definitions
│   │   └── index.ts                # Service, Pricing, FAQ, Team, Contact types
│   │
│   ├── globals.css                 # Global styles and Tailwind directives
│   └── (other files)               # Auto-generated and config files
│
├── public/                         # Static assets (images, fonts, logos)
├── .next/                          # Build output (generated)
├── node_modules/                   # Dependencies (generated)
└── (config files)                  # tsconfig.json, next.config.ts, etc.
```

## Directory Purposes

**`src/app`:**
- Purpose: Next.js App Router - defines all routes and API endpoints
- Contains: Page components, API route handlers, layout files, metadata
- Key files: `layout.tsx` (root layout), `page.tsx` (homepage), `not-found.tsx` (404)

**`src/app/api`:**
- Purpose: Server-side API route handlers for form submissions
- Contains: Route handlers that process POST requests from forms
- Key files: `contact/route.ts`, `newsletter/route.ts`

**`src/components/layout`:**
- Purpose: Global UI shell that persists across all pages
- Contains: Header, Footer, Logo components with navigation
- Key files: `Header.tsx`, `Footer.tsx`, `Logo.tsx`, `index.ts`

**`src/components/sections`:**
- Purpose: Large, self-contained page sections composed of multiple components
- Contains: Hero, Features, Testimonials, Pricing, Services, Portfolio components
- Key files: `Hero.tsx`, `Features.tsx`, `Testimonials.tsx`, `Services​Preview.tsx`, `CTABanner.tsx`

**`src/components/ui`:**
- Purpose: Atomic, reusable UI building blocks
- Contains: Button, Input, Badge, Container, Breadcrumb, and other primitives
- Key files: `Button.tsx`, `Container.tsx`, `Input.tsx`, `Badge.tsx`, `Icon.tsx`

**`src/lib`:**
- Purpose: Utility functions, configuration, and shared data
- Contains: Animation presets, site constants, pricing data, helper functions
- Key files: `constants.ts` (largest - site config), `animations.ts`, `utils.ts`

**`src/types`:**
- Purpose: Single source of type definitions for all domain entities
- Contains: TypeScript interfaces for Service, PricingPlan, FAQ, Testimonial, ContactFormData, etc.
- Key files: `index.ts` (only file - contains all types)

**`public`:**
- Purpose: Static assets served directly (no processing)
- Contains: Images, fonts, logo files
- Key files: `onesquadlogo.png`, `fonts/` directory

## Key File Locations

**Entry Points:**
- `src/app/layout.tsx`: Root layout - HTML structure, metadata, font loading, providers
- `src/app/page.tsx`: Homepage - orchestrates homepage sections
- `src/app/api/contact/route.ts`: Contact form API - processes form submissions
- `src/app/api/newsletter/route.ts`: Newsletter signup API

**Configuration:**
- `tsconfig.json`: TypeScript compiler config with path alias `@/*` → `./src/*`
- `next.config.ts`: Next.js config for image optimization and remote patterns
- `package.json`: Dependencies (React 19, Next 16, Tailwind 4, Framer Motion, zod, react-hook-form)

**Core Logic:**
- `src/lib/constants.ts`: Site metadata, navigation structure, all services, pricing plans, testimonials, FAQs
- `src/lib/animations.ts`: Reusable Framer Motion animation variants
- `src/lib/utils.ts`: Utility functions (cn for class merging, formatPrice for currency)
- `src/types/index.ts`: TypeScript type definitions for all domain models

**Styling:**
- `src/app/globals.css`: Global Tailwind directives and base styles
- Individual component files: Tailwind classes inline via className props

**Testing:**
- Not present - no test files currently in codebase

## Naming Conventions

**Files:**
- Page components: `page.tsx` (Next.js convention for routes)
- API routes: `route.ts` (Next.js convention for handlers)
- Components: PascalCase (e.g., `Button.tsx`, `Hero.tsx`, `Container.tsx`)
- Utilities/functions: camelCase (e.g., `formatPrice`, `cn`)
- Types file: `index.ts` (barrel export)
- Data files: descriptiveCase (e.g., `constants.ts`, `pricingData.ts`)

**Directories:**
- Single-feature: lowercase (e.g., `api`, `lib`, `types`)
- Component groups: plural lowercase (e.g., `components`, `sections`)
- Dynamic routes: bracketed (e.g., `[slug]` for services, `[slug]` for templates)
- Nested routes: parenthetical grouping (e.g., `pricing/website`, `pricing/ecommerce`)

**Components:**
- Exported as named exports in components
- Barrel exports in `index.ts` files for easier importing
- Props interfaces: `[ComponentName]Props`
- Default props: inline with destructuring

**Functions:**
- Exported as named exports (e.g., `export function cn()`)
- Snake_case for rarely-used internal helpers
- camelCase for public utilities

**Variables/Constants:**
- Array data: plural snake_case (e.g., `valueProps`, `navItems`, `pricingPlans`)
- Configuration objects: camelCase (e.g., `siteConfig`)
- Type guards/constants: UPPER_SNAKE_CASE rarely used; lowercase preferred

## Where to Add New Code

**New Page/Route:**
1. Create directory: `src/app/your-route/` or `src/app/your-route/[param]/`
2. Add file: `src/app/your-route/page.tsx`
3. Import Header, Footer, and relevant Sections
4. Add navigation link to `src/lib/constants.ts` → `navItems` array

**New Section Component:**
1. Create file: `src/components/sections/YourSection.tsx`
2. Use `"use client"` directive if it needs interactivity
3. Import Container and Section from `src/components/ui/Container`
4. Use animation presets from `src/lib/animations.ts`
5. Import data from `src/lib/constants.ts` if needed
6. Export in `src/components/sections/index.ts`
7. Import and render in relevant page file

**New UI Component:**
1. Create file: `src/components/ui/YourComponent.tsx`
2. Use `"use client"` only if interactivity needed
3. Accept props with TypeScript interface
4. Use `cn()` from `src/lib/utils.ts` for conditional styling
5. Use `forwardRef` if component should forward refs
6. Export in `src/components/ui/index.ts`
7. Import from barrel export in components that use it

**New Utility Function:**
1. Add to `src/lib/utils.ts` if general purpose (styling, formatting)
2. Add to `src/lib/animations.ts` if animation-related
3. Export as named export
4. Import with `import { functionName } from "@/lib/utils"`

**New Data/Content:**
1. If static site content: add to `src/lib/constants.ts`
2. If pricing-specific: add to `src/lib/pricingData.ts`
3. If template showcase: add to `src/lib/templateData.ts`
4. Create TypeScript type in `src/types/index.ts` first
5. Array data should match type definitions exactly

**New API Endpoint:**
1. Create directory: `src/app/api/your-endpoint/`
2. Create file: `src/app/api/your-endpoint/route.ts`
3. Export async function: `export async function POST(request: NextRequest)`
4. Import types from `src/types/index.ts`
5. Validate request body server-side
6. Return `NextResponse.json()` with status code
7. Call from client via `fetch()` with POST method

**Global Styles:**
- Add to `src/app/globals.css` using Tailwind's @apply directive
- Override theme colors in Tailwind config (next.config.ts likely has future theme config)

## Special Directories

**`.next`:**
- Purpose: Build output from Next.js
- Generated: Yes (during `npm run build`)
- Committed: No (in .gitignore)

**`node_modules`:**
- Purpose: Installed package dependencies
- Generated: Yes (by npm)
- Committed: No (in .gitignore)

**`public`:**
- Purpose: Static assets served at root URL
- Generated: No (user-committed)
- Committed: Yes

**`.planning`:**
- Purpose: GSD analysis documents (ARCHITECTURE.md, STRUCTURE.md, etc.)
- Generated: Yes (by analysis tools)
- Committed: Yes

**`.claude`:**
- Purpose: Claude project instructions
- Generated: No
- Committed: Yes

---

*Structure analysis: 2026-02-10*

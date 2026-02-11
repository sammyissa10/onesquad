# Architecture

**Analysis Date:** 2026-02-10

## Pattern Overview

**Overall:** Next.js App Router with Component-Driven UI

**Key Characteristics:**
- File-based routing with Next.js App Router (`src/app` directory)
- Compositional page structure built from reusable sections
- Client-side interactivity with Framer Motion animations
- Centralized data and configuration in `src/lib/constants.ts`
- Type-safe data models in `src/types/index.ts`
- Utility functions and shared helpers in `src/lib/`

## Layers

**Pages Layer:**
- Purpose: Route handlers and page-level components defining what appears at each URL
- Location: `src/app/`
- Contains: Page components (`.tsx`), API routes (`api/`), special files (`layout.tsx`, `not-found.tsx`)
- Depends on: Sections, Layout components, Constants
- Used by: Browser/HTTP requests

**Sections Layer:**
- Purpose: Large, self-contained UI blocks composed of multiple sub-components (Hero, Features, Testimonials, etc.)
- Location: `src/components/sections/`
- Contains: Full-page sections with animations, data mapping, and complex layouts
- Depends on: UI components, Constants, Animations library, Icon component
- Used by: Page components

**UI Components Layer:**
- Purpose: Reusable, atomic building blocks (Button, Input, Container, Badge, etc.)
- Location: `src/components/ui/`
- Contains: Single-responsibility components with clear props interfaces
- Depends on: Utils (cn function), Framer Motion for interactive components
- Used by: Sections, Layout components

**Layout Components Layer:**
- Purpose: Persistent UI structure (Header, Footer, Logo) that appears across pages
- Location: `src/components/layout/`
- Contains: Navigation structures, branding, global chrome
- Depends on: UI components, Navigation data from constants
- Used by: Root layout and individual pages

**Data & Configuration Layer:**
- Purpose: Single source of truth for content, navigation, services, pricing, FAQs, etc.
- Location: `src/lib/constants.ts`, `src/lib/pricingData.ts`, `src/lib/templateData.ts`, `src/lib/demoContent.ts`
- Contains: TypeScript arrays and objects matching type definitions
- Depends on: Type definitions from `src/types/`
- Used by: Pages, Sections, Components

**Types & Models Layer:**
- Purpose: TypeScript type definitions ensuring type safety across data structures
- Location: `src/types/index.ts`
- Contains: Interfaces for Service, PricingPlan, Testimonial, FAQ, ContactFormData, etc.
- Depends on: Nothing (foundation layer)
- Used by: Constants, Components, API routes

**Utilities Layer:**
- Purpose: Reusable functions for common tasks (styling, formatting, animations)
- Location: `src/lib/utils.ts`, `src/lib/animations.ts`
- Contains: Pure functions like `cn()` (class merging), `formatPrice()`, animation presets
- Depends on: External libraries (clsx, tailwind-merge, framer-motion)
- Used by: Components and Sections

**API Layer:**
- Purpose: Server-side request handlers for form submissions and webhooks
- Location: `src/app/api/`
- Contains: Route handlers (POST, GET) that process requests and return JSON
- Depends on: Request validation, Constants
- Used by: Client-side fetch calls from pages/sections

## Data Flow

**Homepage Load:**

1. Browser requests `/` → Next.js routes to `src/app/page.tsx`
2. Page component imports and renders Section components in sequence (Hero → Features → ServicesPreview → etc.)
3. Each Section component:
   - Reads data from `src/lib/constants.ts` (services, testimonials, FAQs, etc.)
   - Maps TypeScript types from `src/types/index.ts`
   - Renders UI components (Container, Button, etc.) from `src/components/ui/`
   - Applies animations from `src/lib/animations.ts`
   - Uses `cn()` utility from `src/lib/utils.ts` for class merging
4. Layout components (Header, Footer) wrap the sections
5. Client-side hydration activates Framer Motion animations and event listeners

**Form Submission (Contact/Newsletter):**

1. User fills form in component (uses `react-hook-form` + `zod` for validation)
2. On submit, component calls `POST /api/contact` or `POST /api/newsletter`
3. API route handler (`src/app/api/contact/route.ts`, etc.) receives JSON
4. Server-side validation ensures data integrity
5. Logs submission or sends to external service (commented example shows Resend integration)
6. Returns JSON response (success or error)
7. Client-side component displays confirmation or error message

**Dynamic Route Load (e.g., `/services/[slug]`):**

1. Browser requests `/services/seo`
2. Next.js matches route to `src/app/services/[slug]/page.tsx`
3. Component finds matching Service from `src/lib/constants.ts` by slug
4. Renders service-specific content with animations
5. Uses same Section and UI components as other pages

**State Management:**

- **Page-level state:** React hooks (`useState`, `useRef`) in client components
- **Global state:** Configuration in `src/lib/constants.ts` read at build/render time
- **Reactive animations:** Framer Motion's `motion` component handles animation state
- **Form state:** `react-hook-form` handles form field state and validation
- **UI state:** Breadcrumbs, mobile menu, dropdown menus controlled by component `useState`
- **Scroll state:** Header component listens to scroll events to update styling

## Key Abstractions

**Container/Section Pattern:**
- Purpose: Standardize layout spacing and max-widths across all pages
- Examples: `src/components/ui/Container.tsx`, `src/components/ui/Container.tsx` (Section export)
- Pattern: Wrapper components with size/background variants that apply consistent padding, widths, and styling

**Animation Presets:**
- Purpose: Ensure consistent motion language across all sections
- Examples: `fadeIn`, `scaleIn`, `stagger()` in `src/lib/animations.ts`
- Pattern: Framer Motion variant objects exported as reusable constants

**Button Variant System:**
- Purpose: Provide consistent button styling across the site with multiple variants
- Examples: `src/components/ui/Button.tsx` with variants: primary, secondary, accent, outline, ghost
- Pattern: TypeScript discriminated union (`ButtonVariant` type) controlling styling via `variantStyles` record

**Service/Data Objects:**
- Purpose: Structure domain data (services, pricing, testimonials) with TypeScript types
- Examples: Service array in constants matching Service interface, PricingPlan array matching PricingPlan type
- Pattern: Typed arrays that pages and sections iterate over and render

**Dynamic Icon System:**
- Purpose: Load Lucide React icons by name string instead of importing each one
- Examples: `src/components/ui/Icon.tsx` uses DynamicIcon component
- Pattern: Maps icon name string to actual component import at render time

## Entry Points

**Root Layout:**
- Location: `src/app/layout.tsx`
- Triggers: Every page load
- Responsibilities: Sets up metadata, loads fonts, wraps app with ThemeProvider, renders global components (ScrollToTop, ChatWidget)

**Homepage:**
- Location: `src/app/page.tsx`
- Triggers: GET `/`
- Responsibilities: Imports and renders the sequence of section components that compose the homepage

**Dynamic Service Pages:**
- Location: `src/app/services/[slug]/page.tsx`
- Triggers: GET `/services/{slug}`
- Responsibilities: Looks up service by slug from constants, renders service details with dynamic content

**Pricing Pages:**
- Location: `src/app/pricing/page.tsx`, `src/app/pricing/website/page.tsx`, etc.
- Triggers: GET `/pricing*`
- Responsibilities: Displays pricing plans, comparisons, and tier-specific breakdowns from constants

**API Contact Handler:**
- Location: `src/app/api/contact/route.ts`
- Triggers: POST `/api/contact`
- Responsibilities: Validates form data, logs/processes submission, returns JSON response

**API Newsletter Handler:**
- Location: `src/app/api/newsletter/route.ts`
- Triggers: POST `/api/newsletter`
- Responsibilities: Validates email, processes subscription, returns status

## Error Handling

**Strategy:** Graceful fallbacks with user-friendly messaging

**Patterns:**

- **404 Handling:** Custom `src/app/not-found.tsx` component provides styled error page with navigation links back to main pages
- **Form Validation:** Dual validation with client-side (react-hook-form + zod) and server-side (NextRequest parsing + regex checks)
- **Form Errors:** API returns JSON with `{ error: "message" }` on validation failure; client displays error in Input component via error prop
- **Component Errors:** Section components use `useInView` with margin to safely handle missing data; fallback to empty content if data is undefined
- **API Fallback:** Contact/newsletter handlers return JSON error response with appropriate HTTP status codes (400 for validation, 500 for server errors)

## Cross-Cutting Concerns

**Logging:** Console.log in API routes for debugging form submissions; no structured logging library

**Validation:**
- Client: `react-hook-form` with `zod` schema validation on forms
- Server: Manual regex and string length checks in API route handlers

**Authentication:** Not implemented; site is public with no auth system

**Styling:**
- Tailwind CSS (v4) for all component styling
- Theme colors defined in Tailwind config (primary, secondary, accent, etc.)
- Class merging utility `cn()` from `src/lib/utils.ts` for conditional classes

**Animations:**
- Framer Motion for all motion effects
- Animation presets exported from `src/lib/animations.ts`
- `useInView` hook to trigger animations when sections enter viewport

**Theme:** Light/dark mode support via ThemeProvider component (`src/components/ui/ThemeProvider.tsx`)

---

*Architecture analysis: 2026-02-10*

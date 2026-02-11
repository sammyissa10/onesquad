# Coding Conventions

**Analysis Date:** 2026-02-10

## Naming Patterns

**Files:**
- PascalCase for React components: `Header.tsx`, `Button.tsx`, `Comparison.tsx`
- camelCase for utility files: `utils.ts`, `constants.ts`, `animations.ts`
- kebab-case for route directories: `/services/[slug]/`, `/pricing-calculator/`
- index.ts for barrel exports: `src/components/ui/index.ts`, `src/types/index.ts`

**Functions:**
- PascalCase for React component functions: `function Header()`, `export function Comparison()`
- camelCase for utility functions: `formatPrice()`, `cn()`, `stagger()`
- camelCase for async server functions: `POST()` (Next.js API convention)
- Local helper functions use descriptive camelCase: `handleScroll`, `handleSubmit`, `ComparisonCard` (component helper)

**Variables:**
- camelCase for all state and constants: `isScrolled`, `isMobileMenuOpen`, `serviceOptions`, `contactInfo`
- UPPERCASE for animation/configuration constants treated as constants: Used sparingly, most data uses camelCase
- Boolean variables prefixed with `is`, `has`, or `use`: `isSubmitted`, `isMobileMenuOpen`, `isScrolled`

**Types:**
- PascalCase for interface names: `interface Button Props`, `interface Service`, `interface PricingPlan`
- camelCase for type unions: `type ButtonVariant`, `type ButtonSize`, `type ContactFormData`
- Suffixed interfaces with their context: `ButtonProps`, `ContactFormData` (data model), `ServiceResult` (result object)

## Code Style

**Formatting:**
- ESLint with Next.js configuration: `eslint-config-next` (core-web-vitals + typescript)
- No Prettier config detected; formatting follows ESLint defaults
- 2-space indentation (inferred from codebase structure)
- Single quotes not explicitly enforced; double quotes used throughout

**Linting:**
- Tool: ESLint 9.x
- Config: `eslint.config.mjs` (modern flat config)
- Base rules: Next.js core-web-vitals + TypeScript
- Custom ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

## Import Organization

**Order:**
1. React hooks and external libraries: `import { useState } from "react"`, `import Link from "next/link"`
2. Framer Motion and animation libraries: `import { motion, AnimatePresence } from "framer-motion"`
3. Icon libraries: `import { Menu, X, ChevronDown } from "lucide-react"`
4. Form libraries: `import { useForm } from "react-hook-form"`, `import { zodResolver } from "@hookform/resolvers/zod"`
5. Internal component imports: `import { Header, Footer } from "@/components/layout"`
6. Utility and helper imports: `import { cn } from "@/lib/utils"`
7. Type imports: `import type { QuoteData } from "@/lib/pricingData"`

**Path Aliases:**
- `@/*` resolves to `./src/*` (configured in `tsconfig.json`)
- Used consistently: `@/components`, `@/lib`, `@/types`, `@/app`

## Error Handling

**Patterns:**
- Server-side validation using Zod schemas: See `src/app/contact/route.ts` validation logic
- HTTP error responses with descriptive messages: `NextResponse.json({ error: "..." }, { status: 400 })`
- Try-catch blocks for async operations: Wraps entire API route handler
- Client-side form validation with react-hook-form + Zod: `zodResolver(contactSchema)`
- Conditional error rendering in UI with form state: `formState: { errors }` from useForm

**Example from `src/app/api/contact/route.ts`:**
```typescript
if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
  return NextResponse.json(
    { error: "Please enter a valid email" },
    { status: 400 }
  );
}
```

## Logging

**Framework:** Console (no logging library detected)

**Patterns:**
- Server-side logging with `console.log()` for debugging
- Development-friendly output with clear section markers: `console.log("--- New Contact Form Submission ---")`
- TODO comments indicate future logging integration: Email service logging would be added in production

**Example from `src/app/api/contact/route.ts`:**
```typescript
console.log("--- New Contact Form Submission ---");
console.log(`Name: ${name}`);
console.log(`Email: ${email}`);
console.log("----------------------------------");
```

## Comments

**When to Comment:**
- Algorithm explanation: "Only the home page has a dark hero behind the header" in `Header.tsx`
- Complex conditional logic: Explains layout decisions and state conditions
- TODO for future work: Marked with TODO and implementation details
- Section headers for large files: `/* Desktop Navigation */`, `/* Mobile Menu */`, `/* Logo */`

**JSDoc/TSDoc:**
- Minimal usage; only utility functions have doc comments
- Format: Single-line comments for simple utilities

**Example from `src/lib/utils.ts`:**
```typescript
/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price for display
 */
export function formatPrice(price: number | "custom"): string {
  if (price === "custom") {
    return "Custom";
  }
  return `$${price}`;
}
```

## Function Design

**Size:** Functions generally kept under 100 lines; components split logically
- Smaller helper components extract from larger ones: `ComparisonCard`, `PricingCard`, `FAQItem`
- Page components can be longer (150-200 lines) if single responsibility

**Parameters:**
- Use object destructuring for multiple parameters
- Inline type annotations for props: `({ post, featured = false }: { post: typeof blogPosts[0]; featured?: boolean })`
- Readonly objects when appropriate: `Readonly<{ children: React.ReactNode }>`

**Return Values:**
- JSX for components: Returns motion-wrapped elements or standard JSX
- NextResponse for API routes: Always returns JSON response with status code
- Type inference for utilities: Return types inferred from implementation

## Module Design

**Exports:**
- Named exports for components: `export function Header()`, `export function Comparison()`
- Default export for page components: `export default function ContactPage()`
- Named exports for utilities: `export function cn()`, `export const fadeIn = {...}`
- Re-export from barrel files: `src/components/ui/index.ts` exports all UI components

**Barrel Files:**
- `src/components/ui/index.ts`: Aggregates UI components
- `src/components/layout/index.ts`: Aggregates layout components
- `src/types/index.ts`: Aggregates all type definitions
- Pattern: Simplifies imports from `@/components/ui` rather than individual files

**Client Components:**
- Marked with `"use client"` directive when needed: Framer Motion animations, event handlers, state
- Example: `src/components/layout/Header.tsx`, `src/app/contact/page.tsx`

---

*Convention analysis: 2026-02-10*

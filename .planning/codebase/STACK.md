# Technology Stack

**Analysis Date:** 2026-02-10

## Languages

**Primary:**
- TypeScript 5 - Full codebase type safety for both frontend and backend
- JavaScript/JSX - React components and configuration files

**Secondary:**
- CSS 3 - Styling with Tailwind CSS

## Runtime

**Environment:**
- Node.js v24.13.0 (detected at analysis time)

**Package Manager:**
- npm 11.6.2
- Lockfile: `package-lock.json` present

## Frameworks

**Core:**
- Next.js 16.1.6 - Full-stack React framework with App Router, API routes, image optimization
- React 19.2.3 - UI library
- React DOM 19.2.3 - DOM rendering

**Styling & UI:**
- Tailwind CSS 4 - Utility-first CSS framework
- @tailwindcss/postcss 4 - PostCSS plugin for Tailwind
- clsx 2.1.1 - Classname utility for conditional styling
- tailwind-merge 3.4.0 - Merge Tailwind class conflicts

**Forms & Validation:**
- react-hook-form 7.71.1 - Lightweight form state management
- @hookform/resolvers 5.2.2 - Validation resolver support
- zod 4.3.6 - TypeScript-first schema validation and parsing

**Animation & Motion:**
- framer-motion 12.33.0 - Production-ready animation library for React components

**Icons:**
- lucide-react 0.563.0 - Beautiful, consistent SVG icon library

**Build/Dev:**
- TypeScript 5 - Type checking and compilation
- ESLint 9 - Code linting
- eslint-config-next 16.1.6 - Next.js-specific ESLint configuration
- @types/node 20 - Node.js type definitions
- @types/react 19 - React type definitions
- @types/react-dom 19 - React DOM type definitions

## Key Dependencies

**Critical:**
- next 16.1.6 - Framework enabling App Router, API routes, automatic code splitting, image optimization, and server/client components
- react 19.2.3 - React 19 with updated hooks and concurrent features
- framer-motion 12.33.0 - Enables smooth animations and transitions throughout the site

**Infrastructure:**
- zod 4.3.6 - Client-side and server-side validation for forms (contact form, newsletter signup)
- react-hook-form 7.71.1 - Efficient form handling with minimal re-renders

## Configuration

**Environment:**
- Environment variables supported but not currently utilized for external integrations
- Designed for integration with email services (Resend, SendGrid, Mailchimp) with `process.env.RESEND_API_KEY`, `process.env.MAILCHIMP_API_KEY` etc. as referenced in comments
- No `.env.local` file currently committed; secrets would be managed via environment-specific configuration

**Build:**
- `tsconfig.json` - TypeScript configuration with strict mode enabled, path aliases (`@/*` → `./src/*`), and incremental builds
- `next.config.ts - Image optimization with remote patterns for Unsplash, Colorlib, and Thum.io
- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS
- `eslint.config.mjs` - ESLint setup with Next.js and Web Vitals rules

## Platform Requirements

**Development:**
- Node.js v24+ (LTS recommended)
- npm or equivalent package manager
- Modern web browser with ES2017+ support

**Production:**
- Node.js v24+ runtime
- Vercel (recommended by Next.js team, referenced in README)
- Alternative: Any Node.js-compatible hosting (AWS Lambda, Docker, traditional servers)
- Minimum: 512MB RAM, 1GB storage for deployment artifacts

---

*Stack analysis: 2026-02-10*

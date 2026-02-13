---
phase: quick-17
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/app/api/contact/route.ts
  - src/app/api/newsletter/route.ts
  - src/app/not-found.tsx
  - src/app/portfolio/page.tsx
  - src/app/pricing/page.tsx
  - src/app/pricing/social/page.tsx
  - src/app/privacy/page.tsx
  - src/app/services/page.tsx
  - src/app/terms/page.tsx
  - src/app/blog/page.tsx
  - src/components/CustomCursor/CustomCursor.tsx
  - src/components/layout/Header.tsx
  - src/components/ui/ThemeProvider.tsx
  - src/lib/providers/SmoothScrollProvider.tsx
  - src/lib/scrollAnimations.ts
  - src/components/sections/PortfolioPreview.tsx
  - src/components/pricing/EcommerceCalculator.tsx
  - src/components/pricing/SocialCalculator.tsx
  - src/components/pricing/WebsiteCalculator.tsx
  - src/components/sections/Comparison.tsx
autonomous: true

must_haves:
  truths:
    - "npm run lint returns 0 errors (all 21 ESLint errors fixed)"
    - "API routes have development-only console.logs with clear TODO comments"
    - "API routes include simple rate limiting to prevent abuse"
    - "No unused imports or variables remain in codebase"
    - "framer-motion is NOT removed (still needed for interactive animations)"
  artifacts:
    - path: "src/app/api/contact/route.ts"
      provides: "Development-guarded logging and improved TODOs"
      contains: "process.env.NODE_ENV"
    - path: "src/app/api/newsletter/route.ts"
      provides: "Development-guarded logging and improved TODOs"
      contains: "process.env.NODE_ENV"
    - path: "src/lib/utils/rateLimit.ts"
      provides: "Simple in-memory rate limiting utility"
      min_lines: 30
  key_links:
    - from: "src/app/api/contact/route.ts"
      to: "src/lib/utils/rateLimit.ts"
      via: "import and rate limit check"
      pattern: "rateLimit.*check"
    - from: "src/app/api/newsletter/route.ts"
      to: "src/lib/utils/rateLimit.ts"
      via: "import and rate limit check"
      pattern: "rateLimit.*check"
---

<objective>
Fix five codebase quality issues: improve API route logging and TODOs, fix all ESLint errors, add rate limiting, remove unused imports, and verify framer-motion usage.

Purpose: Clean up technical debt to improve code quality, developer experience, and production readiness without removing functionality.

Output: Zero ESLint errors, development-only API logging, basic rate limiting, no unused code.
</objective>

<execution_context>
@C:/Users/sammy/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sammy/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/STATE.md

Current ESLint errors:
- 16 unescaped entities (apostrophes and quotes in JSX)
- 4 setState-in-useEffect errors (lazy initialization needed)
- 1 no-explicit-any error
- 15 unused import/variable warnings

API routes currently console.log in all environments with basic TODO comments.

Framer-motion is used for: FAQ accordions (AnimatePresence), portfolio filter transitions (AnimatePresence), pricing calculator tabs, and other interactive state-based animations (NOT scroll animations which are now GSAP).
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix all ESLint errors and unused imports</name>
  <files>
    src/app/not-found.tsx
    src/app/portfolio/page.tsx
    src/app/pricing/page.tsx
    src/app/pricing/social/page.tsx
    src/app/privacy/page.tsx
    src/app/services/page.tsx
    src/app/terms/page.tsx
    src/app/blog/page.tsx
    src/components/CustomCursor/CustomCursor.tsx
    src/components/layout/Header.tsx
    src/components/ui/ThemeProvider.tsx
    src/lib/providers/SmoothScrollProvider.tsx
    src/lib/scrollAnimations.ts
    src/components/sections/PortfolioPreview.tsx
    src/components/pricing/EcommerceCalculator.tsx
    src/components/pricing/SocialCalculator.tsx
    src/components/pricing/WebsiteCalculator.tsx
    src/components/sections/Comparison.tsx
  </files>
  <action>
**Fix unescaped entities (16 errors):**
- Replace all unescaped ' with &apos; in JSX text content
- Replace all unescaped " with &quot; in JSX text content
- Files: src/app/not-found.tsx (2), src/app/portfolio/page.tsx (2), src/app/pricing/page.tsx (2), src/app/privacy/page.tsx (6), src/app/services/page.tsx (2), src/app/terms/page.tsx (1)

**Fix setState-in-useEffect errors (4 errors):**
- Use lazy initializer for useState instead of setting in useEffect
- Pattern: Change from `const [state, setState] = useState(defaultValue); useEffect(() => setState(computedValue), [])` to `const [state, setState] = useState(() => computedValue)`
- Files: src/components/CustomCursor/CustomCursor.tsx (isTouchDevice check), src/components/layout/Header.tsx (close menu on route change - convert to useEffect that doesn't set state, just resets), src/components/ui/ThemeProvider.tsx, src/lib/providers/SmoothScrollProvider.tsx
- For Header.tsx specifically: The pathname useEffect should keep its current behavior (closing menu on nav), this is a legitimate use case — suppress ESLint warning with comment if needed

**Fix no-explicit-any error (1 error):**
- Replace `any` type in src/lib/providers/SmoothScrollProvider.tsx with proper type

**Remove unused imports/variables (15 warnings):**
- src/app/blog/page.tsx: Remove unused `Link` import
- src/app/portfolio/page.tsx: Remove unused `ArrowRight`, `categoryLabels` imports
- src/app/pricing/page.tsx: Remove unused `useRef`, `useInView`, `HelpCircle`, `Section` imports
- src/app/pricing/social/page.tsx: Remove unused `Link`, `Check`, `ArrowRight`, `Button`, `currentStep`, `setCurrentStep`
- src/lib/scrollAnimations.ts: Remove unused `gsap` type import
- src/components/sections/PortfolioPreview.tsx: Remove unused `ArrowRight` import, replace `<img>` tag with `next/image` Image component
- src/components/pricing/EcommerceCalculator.tsx: Remove unused `Check` import, `growthFadeIn` variable
- src/components/pricing/SocialCalculator.tsx: Remove unused `socialFadeIn` variable
- src/components/pricing/WebsiteCalculator.tsx: Remove unused `Check` import, `premiumFadeIn` variable
- src/components/sections/Comparison.tsx: Remove unused `scaleReveal` import
  </action>
  <verify>
Run `npm run lint` and confirm zero errors, zero warnings
  </verify>
  <done>
All 21 ESLint errors resolved, all unused imports removed, npm run lint returns clean output
  </done>
</task>

<task type="auto">
  <name>Task 2: Improve API route logging and add rate limiting</name>
  <files>
    src/lib/utils/rateLimit.ts
    src/app/api/contact/route.ts
    src/app/api/newsletter/route.ts
  </files>
  <action>
**Create simple in-memory rate limiter:**
- Create `src/lib/utils/rateLimit.ts` with Map-based IP tracking
- Track requests per IP with sliding window (60 seconds)
- Default limit: 5 requests per minute per IP
- Exports: `checkRateLimit(identifier: string, limit?: number)` returning `{ allowed: boolean, remaining: number }`
- Clean up expired entries on each check (prevents memory leak)
- Note: In-memory only — resets on server restart, does NOT persist. For production, consider Redis or Vercel KV.

**Update contact route:**
- Wrap all console.log statements in `if (process.env.NODE_ENV === 'development')` blocks
- Add rate limit check at start of POST handler: `const { allowed } = checkRateLimit(request.ip || 'anonymous', 5)`
- If not allowed, return 429 status with message: "Too many requests. Please try again later."
- Update TODO comment to be more actionable:
  ```typescript
  // TODO: Production email integration required before launch
  // Recommended: Resend (https://resend.com) — $20/mo for 50k emails
  // Alternative: SendGrid, AWS SES, or Postmark
  // See example implementation below (uncomment and add RESEND_API_KEY to .env)
  ```
- Keep example Resend code but make it more complete with error handling

**Update newsletter route:**
- Same dev-only console.log pattern
- Same rate limit check (5 req/min)
- Update TODO comment similarly:
  ```typescript
  // TODO: Production email marketing integration required before launch
  // Recommended: Resend Audiences, Mailchimp, or ConvertKit
  // See example implementation below (uncomment and add API keys to .env)
  ```
  </action>
  <verify>
- Run `npm run build` to ensure no TypeScript errors
- Test contact form submission triggers rate limit after 5 requests: `curl -X POST http://localhost:3000/api/contact -H "Content-Type: application/json" -d '{"name":"Test","email":"test@test.com","message":"Test message"}' --repeat 6`
- Verify console.log only appears in development (check build output has no logs)
  </verify>
  <done>
API routes have development-only logging, clear production TODOs with service recommendations, and functional rate limiting returning 429 after limit exceeded
  </done>
</task>

<task type="auto">
  <name>Task 3: Verify framer-motion usage and document decision</name>
  <files>
    .planning/quick/17-fix-five-codebase-issues-non-functional-/17-NOTES.md
  </files>
  <action>
**Audit framer-motion usage:**
- Search codebase for all `from "framer-motion"` imports
- Categorize usage into:
  1. **Interactive animations** (keep): AnimatePresence for conditional mounts (FAQ accordions, filter transitions), motion.div for hover states, layoutId for tab indicators
  2. **Scroll animations** (already converted): Removed in Phase 08 — all scroll-driven animations now use GSAP
  3. **Unnecessary** (remove): Any remaining scroll-based framer-motion usage

**Document findings:**
- Create `.planning/quick/17-fix-five-codebase-issues-non-functional-/17-NOTES.md`
- List all current framer-motion usage with file paths and purpose
- Confirm framer-motion CANNOT be removed because:
  - AnimatePresence is essential for enter/exit animations on conditional UI (FAQ expand/collapse, portfolio filter transitions)
  - layoutId spring animations for tab indicators (pricing calculators, service detail tabs)
  - These are state-based animations, not scroll-based — GSAP is not designed for this use case
- Note: framer-motion bundle size is acceptable for this functionality (~40KB gzipped)
- Conclusion: **NO ACTION NEEDED** — dual animation library setup is intentional and correct

**Why NOT remove framer-motion:**
- GSAP excels at: Timeline control, scroll-driven animations, complex sequences, performance
- Framer Motion excels at: React state-based animations, AnimatePresence, layoutId, declarative syntax
- Using both is industry-standard pattern (see: Vercel, Linear, Stripe marketing sites)
  </action>
  <verify>
Read 17-NOTES.md and confirm framer-motion usage is documented and justified
  </verify>
  <done>
Documentation confirms framer-motion is essential for interactive animations, cannot be removed, and dual-library setup is appropriate
  </done>
</task>

</tasks>

<verification>
- `npm run lint` returns zero errors and zero warnings
- `npm run build` completes successfully with no TypeScript errors
- Console.log statements only execute in development environment
- Rate limiting prevents >5 requests per minute per IP on both API routes
- All unused imports removed from codebase
- framer-motion remains in package.json and is still used for interactive animations
</verification>

<success_criteria>
- All 21 ESLint errors fixed (16 unescaped entities, 4 setState errors, 1 any error)
- All 15 unused import warnings resolved
- API routes have development-only logging with clear production TODOs
- Simple rate limiting functional on both API endpoints
- Documentation confirms framer-motion should NOT be removed
- Clean lint output enables CI/CD integration without noise
</success_criteria>

<output>
After completion, create `.planning/quick/17-fix-five-codebase-issues-non-functional-/17-SUMMARY.md`
</output>

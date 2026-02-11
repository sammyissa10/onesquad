# Codebase Concerns

**Analysis Date:** 2026-02-10

## Tech Debt

**Unimplemented Email Integration:**
- Issue: Contact form and newsletter endpoints log data to console instead of actually sending emails. Production cannot notify customers or process inquiries.
- Files: `src/app/api/contact/route.ts`, `src/app/api/newsletter/route.ts`
- Impact: Critical - Contact form submissions and newsletter signups are not functional. Customers cannot reach the business, and inquiries are lost.
- Fix approach: Integrate an email service provider (Resend, SendGrid, Mailchimp, or Nodemailer). The code includes detailed comments showing examples for Resend and Mailchimp. Each endpoint needs actual API calls replacing the console.log statements.

**Large Single-File Data Structures:**
- Issue: `src/lib/constants.ts` (578 lines) and `src/lib/demoContent.ts` (917 lines) contain massive amounts of hardcoded content data in single files. Maintenance burden increases with every new service/feature.
- Files: `src/lib/constants.ts`, `src/lib/demoContent.ts`
- Impact: Medium - Makes content management difficult, difficult to version content separately, unclear what's demo vs. production data.
- Fix approach: Migrate content to a CMS or database. Extract service definitions, pricing data, testimonials, and FAQ into a database layer with an API. Keep only essential configuration in constants.

**Client-Side Data Persistence via localStorage:**
- Issue: Quote data from pricing calculator is stored in localStorage and retrieved on contact page. This creates hidden state and brittle data flow.
- Files: `src/components/sections/PricingCalculator.tsx` (line 190), `src/app/contact/page.tsx` (lines 80, 123)
- Impact: Medium - Quote data can be lost if user clears browser storage, not shareable via URL, silent failures on JSON parse errors.
- Fix approach: Replace localStorage pattern with URL query parameters (encode quote data in URL) or server-side session storage. Alternatively, migrate pricing calculator state to a backend API endpoint.

**Broad Error Handling in API Routes:**
- Issue: Both `src/app/api/contact/route.ts` and `src/app/api/newsletter/route.ts` catch all errors with bare `catch {}` blocks, logging only generic "Something went wrong" messages.
- Files: `src/app/api/contact/route.ts` (line 60), `src/app/api/newsletter/route.ts` (line 38)
- Impact: Low-Medium - Makes debugging difficult, hides real errors, prevents proper error logging or monitoring setup.
- Fix approach: Catch specific error types and log with proper error tracking. Implement error boundary logging (Sentry, Datadog, or similar) before generic fallback message.

**Production Form Submission Logs:**
- Issue: Contact form endpoint logs all submitted data (name, email, phone, company, message) to console at production level.
- Files: `src/app/api/contact/route.ts` (lines 31-38)
- Impact: Low - Doesn't break functionality but exposes sensitive customer data to stdout/logs unnecessarily.
- Fix approach: Remove console.log statements. Once email integration is in place, logs should go through proper logging service, not stdout.

## Known Bugs

**Alert Modal for Form Errors:**
- Symptoms: When contact form submission fails, error message displays in browser alert() modal instead of inline UI feedback.
- Files: `src/app/contact/page.tsx` (line 129)
- Trigger: Submit contact form while API is unreachable or returns error. Any network failure on POST to `/api/contact`.
- Workaround: Close alert and retry. Contact OneSquad support directly via email or chat widget.
- Fix: Replace alert() with inline error toast/notification component using Framer Motion or similar.

**Unvalidated Mailto Link in Chat Widget:**
- Symptoms: Chat widget uses encodeURIComponent to build mailto links but doesn't limit message length. Very long messages can exceed browser/email client limits or be truncated.
- Files: `src/components/ui/ChatWidget.tsx` (lines 15-17)
- Trigger: User pastes very long text (>2000 chars) in chat widget and clicks send.
- Workaround: Keep messages short or use contact form instead.
- Fix: Add message character limit (e.g., max 1000 chars) with UI feedback.

**localStorage Parsing Without Validation:**
- Symptoms: Contact page silently ignores malformed quote JSON without feedback to user.
- Files: `src/app/contact/page.tsx` (lines 102-104)
- Trigger: Quote data in localStorage is corrupted or from old code version.
- Workaround: Clear browser storage and restart.
- Fix: Add validation/schema checking on stored quote data (e.g., using Zod). Log to error tracking if parse fails.

## Security Considerations

**Hardcoded Email Address in Client Code:**
- Risk: Sitewide email address (`ayaz.onesquad@outlook.com`) is exposed in multiple client-side components and constants. Potential for scraping and spam.
- Files: `src/lib/constants.ts` (line 17), `src/components/ui/ChatWidget.tsx` (line 17), `src/app/layout.tsx` (line 78)
- Current mitigation: None - email is public-facing anyway
- Recommendations: This is acceptable for a public business website. Email scraping is a known issue. Consider adding honeypot fields to contact form if spam becomes a problem.

**Form Validation Only on Client (Until API):**
- Risk: Client-side validation in contact form can be bypassed by sending raw POST to `/api/contact`. Email regex is basic.
- Files: `src/app/contact/page.tsx` (lines 25-32), `src/app/api/contact/route.ts` (lines 9-28)
- Current mitigation: Server-side validation exists in API but is basic (regex only, no sanitization)
- Recommendations: Add input sanitization on server (strip HTML/scripts), use comprehensive email validation library, consider rate-limiting on API endpoints.

**Sensitive Data in JSON-LD Schema:**
- Risk: Organization schema in head includes email in structured data, but this is intentional for SEO and is public.
- Files: `src/app/layout.tsx` (lines 71-83)
- Current mitigation: None needed - this is standard SEO practice.
- Recommendations: None.

**dangerouslySetInnerHTML Usage:**
- Risk: JSON-LD schema is injected via dangerouslySetInnerHTML, but data comes only from siteConfig constants (not user input).
- Files: `src/app/layout.tsx` (line 71), `src/components/ui/Breadcrumb.tsx` (line 41), `src/app/pricing/page.tsx` (line 192)
- Current mitigation: All data is hardcoded and controlled by developers
- Recommendations: This is safe but consider using Next.js script component or a dedicated schema library (e.g., schema-dts) for maintainability.

## Performance Bottlenecks

**Pricing Calculator State Management:**
- Problem: PricingCalculator component manages complex state with multiple useState hooks and recalculates totals on every change. Sidebar is sticky with large content.
- Files: `src/components/sections/PricingCalculator.tsx` (lines 65-70, 238)
- Cause: No memoization (useMemo/useCallback), recalculates line items and totals on every render. Large DOM tree re-renders.
- Improvement path: Memoize expensive calculations (getServiceLineItems, calculateTotal). Use useCallback for toggle handlers. Consider breaking calculator into smaller components with proper boundary optimization.

**Large Page Files:**
- Problem: Several page components exceed 500 lines, mixing layout, state, business logic, and rendering.
- Files: `src/app/pricing/ecommerce/page.tsx` (549 lines), `src/app/pricing/website/page.tsx` (546 lines), `src/app/pricing/social/page.tsx` (523 lines), `src/app/services/[slug]/page.tsx` (417 lines)
- Cause: Heavy use of inline JSX, duplicate patterns not extracted to components.
- Improvement path: Extract reusable UI sections into separate components. Create layout wrapper components for common page structure.

**No Code Splitting on Dynamic Routes:**
- Problem: Template preview pages (`src/app/templates/[slug]/page.tsx`, `src/app/templates/[slug]/demo/page.tsx`) load full demoContent (917 lines) for every route, even if user only visits one template.
- Files: `src/app/templates/[slug]/demo/page.tsx`, `src/lib/demoContent.ts`
- Cause: Static import of large JSON-like data structure.
- Improvement path: Move demo content to separate data files per template or fetch from API. Use dynamic imports or API-based data fetching.

**localStorage in Every Page Load:**
- Problem: Contact page and PricingCalculator access localStorage on every render, even when quote data doesn't exist.
- Files: `src/app/contact/page.tsx` (line 80)
- Cause: useEffect without proper dependency management, no check before parse attempt.
- Improvement path: Add guard clause to check if QUOTE_STORAGE_KEY exists before attempting parse. Consider moving to custom hook.

## Fragile Areas

**Pricing Calculator Multi-Step Logic:**
- Files: `src/components/sections/PricingCalculator.tsx` (lines 76-84)
- Why fragile: Complex step calculation based on service selection count. Changes to step flow require careful coordination of three variables (currentStep, selectedServices, totalSteps). One-off errors in step logic prevent progression.
- Safe modification: Extract step logic to custom hook (useCalculatorSteps). Add unit tests for step transitions. Document step flow clearly.
- Test coverage: No tests - step logic is completely untested.

**Contact Form Quote Data Integration:**
- Files: `src/app/contact/page.tsx` (lines 77-105), `src/components/sections/PricingCalculator.tsx` (lines 170-192)
- Why fragile: Quote data is passed between two components via localStorage with no type safety on retrieval. If data structure changes, one component may work while other breaks silently.
- Safe modification: Use shared TypeScript types (QuoteData interface) with runtime validation on both sides. Add error boundary around JSON.parse. Consider URL param passing instead.
- Test coverage: No tests for quote data round-trip.

**Email Service Integration Point (Currently Placeholder):**
- Files: `src/app/api/contact/route.ts` (lines 40-54), `src/app/api/newsletter/route.ts` (lines 18-32)
- Why fragile: Entire contact pipeline depends on uncommenting and configuring email service. Commented code includes specific config that must be updated. No tests to verify integration works.
- Safe modification: Before uncommenting, create test/staging setup. Set up API key in environment variables, never hardcode. Add integration tests that mock email service. Use type-safe SDK where available.
- Test coverage: Zero - APIs are not actually tested.

**Dynamic Service Routing:**
- Files: `src/app/services/[slug]/page.tsx` (lines 417 lines)
- Why fragile: Route parameter [slug] is matched against services array by slug property. If slug is misspelled in constants or URL is wrong, 404 or wrong service displayed. No validation or error handling for invalid slugs.
- Safe modification: Add 404 boundary for unmatched slugs. Validate slug matches a service before rendering. Add test cases for valid/invalid slugs.
- Test coverage: No tests - routing behavior untested.

## Scaling Limits

**Single Monolithic Constants File:**
- Current capacity: ~578 lines of data for all services, pricing, FAQs, testimonials, navigation
- Limit: Once site grows to 50+ services or 100+ testimonials, this file becomes unmaintainable. Breaks at ~1000 lines.
- Scaling path: Migrate to database (PostgreSQL + Prisma) or CMS (Sanity, Contentful). Create API endpoints to fetch dynamic data. Keep only essential config in code.

**localStorage Quote Data:**
- Current capacity: Single quote (up to ~5KB per service * max 4 services = ~20KB)
- Limit: Some browsers limit localStorage to 5-10MB total per domain. Quotes won't hit limit, but pattern doesn't scale if multiple users or quote history is added.
- Scaling path: Move to server-side session storage (Redis) or database. Store quote history per user (requires authentication).

**No Authentication/User System:**
- Current capacity: Serves anonymous users only
- Limit: Cannot scale to serve returning customers, save quotes, track order history, or provide personalized experience.
- Scaling path: Implement user authentication (NextAuth, Auth0). Create user database. Add protected routes for customer portal.

**Email Delivery via Console Logs:**
- Current capacity: Can "log" unlimited submissions but doesn't deliver to customers
- Limit: Breaks at scale immediately - not a real email system
- Scaling path: Integrate email service (Resend, SendGrid, Mailchimp). Set up proper email templates. Add email validation and bounce handling.

## Dependencies at Risk

**No Test Framework:**
- Risk: Zero test coverage means refactoring is risky, regressions are caught late (in production).
- Impact: What breaks: Any refactoring of core logic (pricing calculator, form handling, dynamic routing) could introduce silent bugs. No CI checks to prevent bad deploys.
- Migration plan: Add Jest + React Testing Library. Write critical path tests first (form submission, pricing calculation, service routing). Integrate into CI/CD.

**Framer Motion Usage Without Memoization:**
- Risk: Animations in every page section can cause performance issues at scale if component tree grows. No version lock on framer-motion (^12.33.0 allows minor/patch updates).
- Impact: What breaks: Future minor update could change animation behavior or introduce performance regression.
- Migration plan: Lock framer-motion to exact version (12.33.0). Add performance monitoring (Web Vitals). Consider lighter weight animation library if performance becomes bottleneck.

**Form Handling via react-hook-form:**
- Risk: Version is recent (^7.71.1) but form validation relies on basic Zod schemas. If validation logic grows complex, schema becomes fragile.
- Impact: What breaks: Form security depends on server-side validation. Client validation can be bypassed.
- Migration plan: Strengthen server-side validation. Add rate-limiting to API endpoints. Consider moving to tRPC or GraphQL for better type safety.

## Missing Critical Features

**Email Service Integration:**
- Problem: Contact form and newsletter submissions don't actually send emails. Code includes TODO comments but no implementation. Business cannot receive inquiries or manage newsletter subscribers.
- Blocks: Cannot launch to production without email integration. Customers cannot reach business. No way to follow up on leads.
- Priority: Critical - must be done before launch.

**Error Tracking & Monitoring:**
- Problem: No error logging service (Sentry, DataDog, etc.). Errors in production are silent or only visible in browser console.
- Blocks: Cannot debug production issues without user reports. No alerts for failures.
- Priority: High - should be added early.

**User Authentication & Portal:**
- Problem: No login system. Customers cannot save quotes, track orders, or access past projects.
- Blocks: Cannot scale to support customer relationship features. All interactions are anonymous.
- Priority: Medium - nice-to-have for MVP, critical for long-term.

**Database/CMS for Content:**
- Problem: All content (services, pricing, testimonials, FAQs) is hardcoded in JavaScript. No way to edit without code deploy.
- Blocks: Non-technical users cannot update content. Content management requires developer involvement.
- Priority: Medium - could use mock data initially, becomes urgent as content grows.

## Test Coverage Gaps

**Form Submission and Validation:**
- What's not tested: Contact form validation (client and server), error handling, success flow, form submission to API.
- Files: `src/app/contact/page.tsx`, `src/app/api/contact/route.ts`, `src/app/contact/page.tsx`
- Risk: Form could have silent validation bugs, API errors not handled properly, form state could get corrupted.
- Priority: High

**API Endpoint Logic:**
- What's not tested: Email validation regex, error responses, edge cases (empty name, very long message, etc).
- Files: `src/app/api/contact/route.ts`, `src/app/api/newsletter/route.ts`
- Risk: Validation could be bypassable, error handling inconsistent between endpoints.
- Priority: High

**Dynamic Routing:**
- What's not tested: Service slug routing, invalid slug handling, 404 behavior, template slug routing.
- Files: `src/app/services/[slug]/page.tsx`, `src/app/templates/[slug]/page.tsx`
- Risk: Invalid URLs could render wrong content or crash without proper error boundary.
- Priority: Medium

**Pricing Calculator Logic:**
- What's not tested: Step transitions, price calculations, service selection/deselection, localStorage round-trip for quotes.
- Files: `src/components/sections/PricingCalculator.tsx`
- Risk: Calculation errors could show wrong prices to customers, step logic could get stuck.
- Priority: High

**localStorage Integration:**
- What's not tested: Quote data serialization/deserialization, malformed data handling, browser storage availability.
- Files: `src/app/contact/page.tsx`, `src/components/sections/PricingCalculator.tsx`
- Risk: Corrupted data silently fails, unclear error states.
- Priority: Medium

---

*Concerns audit: 2026-02-10*

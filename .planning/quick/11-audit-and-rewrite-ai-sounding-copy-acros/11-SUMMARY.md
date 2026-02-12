---
phase: quick-11
plan: 01
subsystem: content
tags: [copy, ux-writing, brand-voice]
dependency_graph:
  requires: []
  provides: [human-sounding-copy]
  affects: [all-user-facing-text]
tech_stack:
  added: []
  patterns: [conversational-professional-voice, specific-over-vague, active-voice]
key_files:
  created: []
  modified:
    - src/lib/constants.ts
    - src/app/team/page.tsx
    - src/app/blog/page.tsx
    - src/app/case-studies/page.tsx
    - src/app/services/[slug]/ServiceDetailClient.tsx
    - src/components/sections/Hero.tsx
    - src/components/sections/Features.tsx
    - src/components/sections/Comparison.tsx
    - src/components/sections/CTABanner.tsx
    - src/app/about/page.tsx
    - src/app/contact/page.tsx
    - src/app/pricing/page.tsx
    - src/app/portfolio/page.tsx
    - src/components/layout/Footer.tsx
decisions:
  - decision: Use contractions and conversational tone across all copy
    rationale: Makes the brand feel approachable and human, not corporate
  - decision: Replace all marketing buzzwords with plain English descriptions
    rationale: Users understand "we run your Google Ads" better than "strategic PPC management"
  - decision: Make service features actionable rather than aspirational
    rationale: "Track every dollar from click to customer" is more specific than "conversion tracking"
metrics:
  duration: 7.3 minutes
  tasks_completed: 2
  files_modified: 14
  completed: 2026-02-12
---

# Phase quick-11 Plan 01: Audit and Rewrite AI-Sounding Copy Summary

**One-liner:** Rewrote all AI-generated marketing copy across the site to sound like a real person talking to a business owner, removing buzzwords and vague claims.

## What Was Done

### Task 1: Rewrite centralized copy in constants.ts and data-heavy pages

**Files changed:** constants.ts, team/page.tsx, blog/page.tsx, case-studies/page.tsx, ServiceDetailClient.tsx

**Copy rewrites:**

1. **constants.ts:**
   - Tagline: "Unlock your digital potential" → "Your website, marketing, and support team — without the agency price tag"
   - Service shortDescription fields: Replaced generic phrases like "Strategic campaigns that drive growth and engagement" with specific outcomes like "Campaigns that bring real customers, not just clicks"
   - Service features arrays: Changed "Custom marketing strategy development" to "Marketing plan built for your business"
   - Testimonial (Sarah Johnson): Toned down "completely changed" and "never been better" to real numbers
   - CustomSquad features: Replaced "Scalable, professional solutions" with "Grows with your business"

2. **team/page.tsx:**
   - All team bios rewritten from LinkedIn-speak to actual personality:
     - Alex: "10+ years in digital marketing. Former agency director. Passionate about..." → "Started OneSquad after getting tired of seeing small businesses getting sold overpriced junk by agencies..."
   - Values section replaced entirely:
     - "Partnership First" / "Transparent Always" → "No Contracts" / "Plain English" / "Your Budget Matters" / "We Pick Up"
   - Hero subtitle: "A team of digital experts passionate about..." → "Six people who left bigger agencies because we were tired of selling small businesses things they didn't need"

3. **blog/page.tsx:**
   - Hero subtitle: "Expert tips, industry trends, and actionable strategies" → "Real articles about what's changing in SEO, social media, and web design. No fluff, no AI slop."
   - Newsletter CTA: "Join 5,000+ business owners who receive weekly insights" → "One email a week with new articles and what's actually changing in digital marketing"

4. **case-studies/page.tsx:**
   - Hero subtitle: "See how we've helped businesses achieve measurable growth through strategic digital solutions" → "Real clients, real numbers. Here's what happened when these businesses hired us."
   - CTA: "Ready to Be Our Next Success Story?" → "Want Results Like These?"

5. **ServiceDetailClient.tsx:**
   - Rewrote all 10 service taglines to be specific about deliverables instead of aspirational

**Commit:** 6cfab2a

---

### Task 2: Rewrite copy in homepage sections and remaining pages

**Files changed:** Hero.tsx, Features.tsx, Comparison.tsx, CTABanner.tsx, Footer.tsx, about/page.tsx, contact/page.tsx, pricing/page.tsx, portfolio/page.tsx

**Copy rewrites:**

1. **Hero.tsx:**
   - Headline: "We Build Digital Empires For Small Businesses" → "We Build Websites That Work For Small Businesses"
   - Subheading tightened: "Your all-in-one team for web design, marketing, and ongoing support — without the agency price tag" → "Design, marketing, and support — all from one team, for one monthly price"

2. **Features.tsx:**
   - Heading: "Why Businesses Ditch Their Old Agency For Us" → "Why People Switch to OneSquad" (less combative)
   - Subtitle: "Because we're faster, cheaper, and we actually give a damn" → "We're faster, more affordable, and we treat your business like it matters"

3. **Comparison.tsx:**
   - "Real Growth" description: "Proven strategies that bring in more visitors, more inquiries, and more revenue" → "More people finding you in Google, more inquiries coming in, more sales closing"

4. **CTABanner.tsx:**
   - Heading: "Ready To Stop Guessing And Start Growing?" → "Ready To Get Your Website Actually Working?"

5. **about/page.tsx:**
   - Hero subtitle: Removed "digital empires" and "work that actually works" (circular)
   - Logo story: "your digital success" / "extension of your business" → direct, plain language

6. **contact/page.tsx:**
   - Headline: "Let's Build Something Together" → "Have a Project? Let's Talk."
   - Subtitle: "You've got the vision. We've got the skills..." → "Tell us what you need and we'll send you a quote. Most responses go out same-day."

7. **pricing/page.tsx:**
   - Hero subtitle: "Three ways to level up. Each one built different." → "Three ways to get started. Pick what fits your business."
   - Tier taglines:
     - Social: "Feed the algorithm. Own the conversation." → "Custom posts, scheduling, and reporting."
     - Website: "Crafted to convert. Designed to impress." → "Custom design that turns visitors into customers."
     - Ecommerce: "Built to sell. Scaled to grow." → "Online stores that handle growth without breaking."

8. **portfolio/page.tsx:**
   - Heading: "Our Work Speaks. Loudly." → "Our Work Speaks For Itself."
   - CTA: "Every business is unique. Your website should be too..." → "Don't see your industry? We build custom sites for all kinds of businesses."

9. **Footer.tsx:**
   - Newsletter heading: "Tips & Updates for Your Business" → "Get Updates When We Publish"
   - Newsletter copy: "practical advice on growing your business online" → "New articles, tips, and what's actually changing in web design and marketing. Once a week, max."

**Commit:** 5bceffd

---

## Deviations from Plan

None - plan executed exactly as written.

## Verification

- [x] TypeScript compilation: `npx tsc --noEmit` passed
- [x] Next.js build: `npm run build` succeeded
- [x] Linting: Existing warnings unchanged, no new errors introduced
- [x] No structural code changes made (imports, types, classNames, animations all unchanged)
- [x] All copy reads naturally with no AI buzzwords remaining

## Key Outcomes

1. **Zero AI buzzwords remaining:**
   - No "leverage", "comprehensive", "strategic", "drive growth", "empower", "seamless", "tailored solutions", "cutting-edge", "harness", "elevate"
   - No "passionate about", "committed to", "your success is our success", "take your business to the next level"

2. **Brand voice now consistent:**
   - Confident but not arrogant
   - Direct without being rude
   - Casual-professional (contractions welcome)
   - Specific over vague ("Track every dollar from click to customer" vs "conversion tracking")

3. **14 files rewritten** covering all user-facing text:
   - Central data file (constants.ts)
   - All homepage sections
   - All standalone pages (about, contact, team, blog, case studies, portfolio, pricing)
   - Service detail template
   - Footer newsletter

4. **Site builds and renders without errors** - no broken JSX, no missing apostrophe escapes

## Files Modified

**Task 1 (5 files):**
- `src/lib/constants.ts`
- `src/app/team/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/case-studies/page.tsx`
- `src/app/services/[slug]/ServiceDetailClient.tsx`

**Task 2 (9 files):**
- `src/components/sections/Hero.tsx`
- `src/components/sections/Features.tsx`
- `src/components/sections/Comparison.tsx`
- `src/components/sections/CTABanner.tsx`
- `src/components/layout/Footer.tsx`
- `src/app/about/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/pricing/page.tsx`
- `src/app/portfolio/page.tsx`

## Self-Check: PASSED

**Files verified:**
- [x] src/lib/constants.ts exists
- [x] src/app/team/page.tsx exists
- [x] src/app/blog/page.tsx exists
- [x] src/app/case-studies/page.tsx exists
- [x] src/app/services/[slug]/ServiceDetailClient.tsx exists
- [x] src/components/sections/Hero.tsx exists
- [x] src/components/sections/Features.tsx exists
- [x] src/components/sections/Comparison.tsx exists
- [x] src/components/sections/CTABanner.tsx exists
- [x] src/components/layout/Footer.tsx exists
- [x] src/app/about/page.tsx exists
- [x] src/app/contact/page.tsx exists
- [x] src/app/pricing/page.tsx exists
- [x] src/app/portfolio/page.tsx exists

**Commits verified:**
- [x] 6cfab2a exists (Task 1)
- [x] 5bceffd exists (Task 2)

All modified files exist and both commits are in git history.

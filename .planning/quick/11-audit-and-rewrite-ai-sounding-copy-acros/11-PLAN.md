---
phase: quick-11
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/lib/constants.ts
  - src/components/sections/Hero.tsx
  - src/components/sections/Features.tsx
  - src/components/sections/ServicesPreview.tsx
  - src/components/sections/Comparison.tsx
  - src/components/sections/CTABanner.tsx
  - src/components/sections/Testimonials.tsx
  - src/components/sections/HomeFAQ.tsx
  - src/components/sections/PortfolioPreview.tsx
  - src/components/sections/ServicesHero.tsx
  - src/components/sections/WebSolutionsGrid.tsx
  - src/components/sections/DigitalMarketingGrid.tsx
  - src/components/sections/Process.tsx
  - src/components/layout/Footer.tsx
  - src/app/about/page.tsx
  - src/app/contact/page.tsx
  - src/app/services/page.tsx
  - src/app/pricing/page.tsx
  - src/app/portfolio/page.tsx
  - src/app/team/page.tsx
  - src/app/blog/page.tsx
  - src/app/case-studies/page.tsx
  - src/app/services/[slug]/ServiceDetailClient.tsx
autonomous: true
must_haves:
  truths:
    - "All visible text across the site reads like a real person wrote it"
    - "No generic marketing buzzwords or AI-sounding phrases remain"
    - "Copy maintains the brand's confident, direct, no-BS tone"
    - "Site still builds and renders without errors after copy changes"
  artifacts:
    - path: "src/lib/constants.ts"
      provides: "Service descriptions, tagline, FAQs, testimonials, value props"
    - path: "src/components/sections/Hero.tsx"
      provides: "Homepage headline and subheading"
    - path: "src/app/about/page.tsx"
      provides: "About page copy"
    - path: "src/app/team/page.tsx"
      provides: "Team bios and values copy"
  key_links:
    - from: "src/lib/constants.ts"
      to: "multiple components"
      via: "imports of services, testimonials, faqs, valueProps, siteConfig"
      pattern: "from.*@/lib/constants"
---

<objective>
Audit and rewrite all AI-sounding copy across the OneSquad site to sound natural, human, and professional.

Purpose: The site currently has copy that was written during build-out (phases 3-7) and some of it has telltale AI patterns -- generic marketing buzzwords, overly symmetrical sentence structures, redundant adjectives, and phrases no human would actually say to a client. This task rewrites everything to sound like a real agency talking to real business owners.

Output: All text content across the site rewritten with natural, human voice.
</objective>

<execution_context>
@C:/Users/sammy/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sammy/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/lib/constants.ts
@src/components/sections/Hero.tsx
@src/components/sections/Features.tsx
@src/components/sections/ServicesPreview.tsx
@src/components/sections/Comparison.tsx
@src/components/sections/CTABanner.tsx
@src/components/sections/Testimonials.tsx
@src/components/sections/HomeFAQ.tsx
@src/components/sections/PortfolioPreview.tsx
@src/components/sections/ServicesHero.tsx
@src/components/sections/WebSolutionsGrid.tsx
@src/components/sections/DigitalMarketingGrid.tsx
@src/components/sections/Process.tsx
@src/components/layout/Footer.tsx
@src/app/about/page.tsx
@src/app/contact/page.tsx
@src/app/services/page.tsx
@src/app/pricing/page.tsx
@src/app/portfolio/page.tsx
@src/app/team/page.tsx
@src/app/blog/page.tsx
@src/app/case-studies/page.tsx
@src/app/services/[slug]/ServiceDetailClient.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Rewrite centralized copy in constants.ts and data-heavy pages</name>
  <files>
    src/lib/constants.ts
    src/app/team/page.tsx
    src/app/blog/page.tsx
    src/app/case-studies/page.tsx
    src/app/services/[slug]/ServiceDetailClient.tsx
  </files>
  <action>
Read each file and rewrite ALL text content (strings, descriptions, taglines, bios, FAQs, etc.) using the guidelines below. Only change text content -- do NOT modify imports, component structure, TypeScript types, className strings, animation logic, or any non-text code.

**AI-COPY RED FLAGS to hunt for and fix:**

1. "Leverage/utilize/harness/empower/elevate/streamline/revolutionize/transform" -- replace with plain verbs (use, help, fix, build, run, grow)
2. "Cutting-edge/state-of-the-art/best-in-class/world-class/next-generation/industry-leading" -- delete or replace with specifics
3. "Comprehensive/robust/seamless/holistic/scalable" -- these are filler words, drop them
4. "Drive growth/drive results/drive engagement" -- say what actually happens
5. "Strategic [noun]" (strategic approach, strategic partnership) -- just say what it is
6. Sentences that are too symmetrical or parallel (lists of 3 where every item starts the same way)
7. "We are passionate about..." / "We are committed to..." / "We are dedicated to..." -- show, don't tell
8. "Your success is our success" / "Partner with us" / "Take your business to the next level" -- cliches
9. "Expert tips, industry trends, and actionable strategies" -- pure AI slop
10. "Tailored to your needs" / "Customized solutions" -- too vague, say how

**VOICE GUIDE:**
- Write like you're explaining to a friend who owns a business
- Short sentences. Some fragments. Okay to start with "And" or "But"
- Use "you/your" more than "we/our"
- Be specific where possible (numbers, timeframes, examples)
- The existing tone in the best sections (HomeFAQ, Process, About hero) is the target -- direct, casual-professional, zero fluff
- Don't be try-hard funny. Don't be corporate. Be clear and human

**SPECIFIC TARGETS in constants.ts:**
- `siteConfig.tagline`: "Unlock your digital potential" is pure AI. Rewrite to be specific about what OneSquad does
- `siteConfig.description`: Good already, leave mostly as-is
- Service `shortDescription` fields: Many are generic ("Strategic campaigns that drive growth and engagement"). Make each one specific to what the service actually delivers
- Service `features` arrays: Some items are vague ("Custom marketing strategy development"). Say what the client actually gets
- Service FAQ answers: Most are good, but watch for "our team of experts" or "proven strategies" language
- `valueProps`: Descriptions are decent, do a light pass
- `testimonials`: The Michael Chen one is good and specific. The Sarah Johnson one has "completely changed" and "never been better" which sound inflated. Tone them down to feel real
- `faqs`: Already pretty good, light pass only
- `pricingPlans`: Feature lists -- watch for "Scalable, professional solutions" in CustomSquad

**SPECIFIC TARGETS in team/page.tsx:**
- `teamMembers` bios: "10+ years in digital marketing. Former agency director at a Fortune 500 company. Passionate about helping SMBs compete with enterprise brands." -- classic AI resume-speak. Make each bio sound like a real person, not a LinkedIn summary
- `values` array: "Partnership First", "Transparent Always", "Results Driven", "Continuously Learning" -- these are generic values any company would claim. Make them specific to OneSquad's actual personality
- Page hero subtitle: "A team of digital experts passionate about helping small businesses succeed online. Together, we bring decades of experience across every aspect of digital marketing." -- textbook AI marketing copy. Rewrite to be human

**SPECIFIC TARGETS in blog/page.tsx:**
- Hero subtitle: "Expert tips, industry trends, and actionable strategies to help your business thrive online." -- full AI. Rewrite
- Newsletter CTA: "Join 5,000+ business owners who receive weekly digital marketing insights." -- generic lead magnet copy. Make it real

**SPECIFIC TARGETS in case-studies/page.tsx:**
- Hero subtitle: "See how we've helped businesses like yours achieve measurable growth through strategic digital solutions." -- classic AI marketing. Rewrite
- CTA heading: "Ready to Be Our Next Success Story?" -- overused. Find something better
- CTA subtitle: "Let's discuss how we can help your business achieve similar results." -- AI boilerplate

**SPECIFIC TARGETS in ServiceDetailClient.tsx:**
- `serviceTaglines` record: Some are good ("Websites that look like you, not like a template"), some are generic ("The inbox is still king. We help you rule it."). Level them all up
- "Why OneSquad?" section copy is already good, light pass
  </action>
  <verify>
Run `npx tsc --noEmit` to confirm no TypeScript errors introduced.
Run `npx next build` (or at minimum `npx next lint`) to confirm the site still compiles.
Manually scan the changed strings to ensure no broken JSX (unclosed quotes, missing apostrophe escapes like &amp;apos;).
  </verify>
  <done>All text in constants.ts, team page, blog page, case studies page, and service detail page reads naturally with no AI-sounding buzzwords or generic marketing language remaining.</done>
</task>

<task type="auto">
  <name>Task 2: Rewrite copy in homepage sections and remaining pages</name>
  <files>
    src/components/sections/Hero.tsx
    src/components/sections/Features.tsx
    src/components/sections/ServicesPreview.tsx
    src/components/sections/Comparison.tsx
    src/components/sections/CTABanner.tsx
    src/components/sections/Testimonials.tsx
    src/components/sections/HomeFAQ.tsx
    src/components/sections/PortfolioPreview.tsx
    src/components/sections/ServicesHero.tsx
    src/components/sections/WebSolutionsGrid.tsx
    src/components/sections/DigitalMarketingGrid.tsx
    src/components/sections/Process.tsx
    src/components/layout/Footer.tsx
    src/app/about/page.tsx
    src/app/contact/page.tsx
    src/app/services/page.tsx
    src/app/pricing/page.tsx
    src/app/portfolio/page.tsx
  </files>
  <action>
Read each file and rewrite ALL inline text content using the same voice guide and red flags from Task 1. Only change text content -- do NOT modify imports, component structure, TypeScript types, className strings, animation logic, or any non-text code.

**SPECIFIC TARGETS in homepage sections:**

Hero.tsx:
- "We Build Digital Empires For Small Businesses" -- "Digital Empires" is overblown. Rewrite the headline to be bold but believable
- "Your all-in-one team for web design, marketing, and ongoing support -- without the agency price tag." -- decent, could be tighter

Features.tsx:
- "Why Businesses Ditch Their Old Agency For Us" -- a bit aggressive/try-hard. Find a heading that's confident but not combative
- "Because we're faster, cheaper, and we actually give a damn about your results." -- close but "give a damn" feels forced-edgy

ServicesPreview.tsx:
- "Everything You Need. Zero Bloat." -- good, keep or lightly adjust
- "Your entire digital team on one monthly bill. No contracts. No surprises." -- good, keep

Comparison.tsx:
- "What Changes When You Stop Doing It Alone" -- good heading, keep
- withoutUsItems/withUsItems descriptions: Generally solid. Check for any vague phrases like "Proven strategies that bring in more visitors, more inquiries, and more revenue" (too generic, be specific about how)

CTABanner.tsx:
- "Ready To Stop Guessing And Start Growing?" -- a bit cliche. Rewrite
- "No 12-month contracts. No corporate jargon. Just results." -- decent, keep or lightly adjust

Testimonials.tsx:
- "Don't Take Our Word For It. Take Theirs." -- good, keep
- "No scripts. No stock photos. Just honest feedback." -- good, keep

HomeFAQ.tsx:
- Headings and FAQ content already sound pretty natural. Light pass only

PortfolioPreview.tsx:
- "Real Sites. Real Businesses. Zero Templates." -- good, keep
- "Every project is built from scratch to match your brand. No cookie-cutter designs." -- good

Process.tsx:
- Step descriptions are already natural and good. Light pass

ServicesHero.tsx:
- "Digital Services That Actually Move The Needle" -- "move the needle" is a business cliche. Replace

WebSolutionsGrid.tsx:
- "Web Solutions Built To Last" -- fine
- "Your website is your 24/7 salesperson. We make sure it actually closes." -- good

DigitalMarketingGrid.tsx:
- "Marketing That Actually Works" -- good
- "Forget vanity metrics. We build campaigns that put people through your door." -- good

Footer.tsx:
- "Tips & Updates for Your Business" -- generic newsletter heading. Make it specific to what they'd actually get
- "Join our newsletter for practical advice on growing your business online." -- standard, improve

**SPECIFIC TARGETS in pages:**

about/page.tsx:
- Hero: "We Don't Do Average." -- punchy and good, keep
- "We're a small squad building digital empires for businesses that refuse to blend in." -- "digital empires" again, and "refuse to blend in" is vague. Rewrite
- "No templates. No shortcuts. Just work that actually works." -- "work that actually works" is circular. Fix
- Logo story section: Good writing overall. Watch for "your digital success" (buzzwordy) and "extension of your business" (cliche)
- Values section copy is already strong. Keep or light touch
- Editorial section: Very good. Light pass only

contact/page.tsx:
- "Let's Build Something Together." -- overused. Find a better headline
- "You've got the vision. We've got the skills. Tell us what you're dreaming up and we'll make it real." -- the first two sentences are cliche. Rewrite
- "Tell Us About Your Project" / "The more you tell us, the better we can help" -- fine
- Form success message, sidebar copy -- fine, light pass

services/page.tsx:
- CTA: "Ready To Stop Doing Everything Yourself?" -- good, keep

pricing/page.tsx:
- "Stop Guessing. Start Building." -- good, keep
- "Three ways to level up. Each one built different." -- "level up" is gamer-speak, "built different" is slang that may not land with SMB owners. Rewrite to be clear
- Tier card taglines: "Feed the algorithm. Own the conversation." -- trying too hard. "Crafted to convert. Designed to impress." -- double cliche. "Built to sell. Scaled to grow." -- generic. Rewrite all three to be specific about what the client gets
- "Still overthinking it? Let's talk." -- good, keep
- Tab descriptions are good

portfolio/page.tsx:
- "Our Work Speaks. Loudly." -- okay but "Loudly" feels try-hard
- CTA: "Don't See What You Need? Let's Build It." -- good
- "Every business is unique. Your website should be too." -- cliche opening. Rewrite

**IMPORTANT NOTES:**
- Watch for HTML entity escapes: use &amp;apos; for apostrophes in JSX text, not raw '
- Do NOT change button text unless it's clearly AI-sounding (most button text like "See Our Plans", "Get Started", "Contact Us" is fine)
- Do NOT change navigation labels, service titles, plan names, or pricing data
- Preserve the overall confident, direct brand voice -- just remove the fake/forced parts
  </action>
  <verify>
Run `npx tsc --noEmit` to confirm no TypeScript errors.
Run `npm run build` to confirm the full site builds without errors.
Spot-check 5-6 pages in `npm run dev` to confirm text renders correctly (no broken JSX, no missing apostrophe escapes).
  </verify>
  <done>All inline text across homepage sections, about, contact, services, pricing, and portfolio pages reads naturally with no AI-sounding buzzwords or generic marketing language. The site builds and renders without errors.</done>
</task>

</tasks>

<verification>
1. `npm run build` succeeds with no errors
2. Read through every changed file and confirm no text sounds like it was generated by AI
3. Verify no structural code changes were made (imports, types, classNames, animations all unchanged)
4. Quick visual check in `npm run dev` that all pages render text correctly
</verification>

<success_criteria>
- Zero AI buzzwords remaining across the entire site (no "leverage", "comprehensive", "strategic", "drive growth", "empower", "seamless", "tailored solutions", "cutting-edge", "harness", "elevate")
- All copy sounds like a real person at a small agency talking to a business owner
- Brand voice is consistent: confident, direct, casual-professional, specific
- Site builds and renders without any errors
- No non-text code was modified
</success_criteria>

<output>
After completion, create `.planning/quick/11-audit-and-rewrite-ai-sounding-copy-acros/11-SUMMARY.md`
</output>

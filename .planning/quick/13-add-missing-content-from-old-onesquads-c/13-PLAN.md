---
phase: 13-add-missing-content
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/lib/constants.ts
  - src/app/about/page.tsx
  - src/app/contact/page.tsx
  - src/components/sections/ScrollPromptBanner.tsx
  - src/components/layout/Footer.tsx
autonomous: true
must_haves:
  truths:
    - "Site mentions Northwest Indiana as the team's origin/home base"
    - "About page has an explicit vision/mission statement"
    - "ScrollPromptBanner has the specific 'free website mockup in 24 hours' offer language"
    - "Contact page emphasizes direct personal communication (call, text, or email)"
    - "Footer displays the NWI location alongside remote-first messaging"
  artifacts:
    - path: "src/lib/constants.ts"
      provides: "Updated siteConfig.address with NWI origin"
      contains: "Northwest Indiana"
    - path: "src/app/about/page.tsx"
      provides: "Vision/mission section and NWI origin story"
      contains: "vision"
    - path: "src/app/contact/page.tsx"
      provides: "Direct contact emphasis (call, text, email)"
      contains: "text"
    - path: "src/components/sections/ScrollPromptBanner.tsx"
      provides: "Free mockup in 24 hours offer language"
      contains: "mock"
    - path: "src/components/layout/Footer.tsx"
      provides: "Updated location display"
      contains: "Northwest Indiana"
  key_links:
    - from: "src/lib/constants.ts"
      to: "src/components/layout/Footer.tsx"
      via: "siteConfig.address import"
      pattern: "siteConfig\\.address"
---

<objective>
Add missing content from the old onesquads.com website to the current site, covering: Northwest Indiana origin story, vision/mission statement, free website mockup in 24 hours offer, and direct personal contact emphasis. All content adapted to match the current site's edgy, no-BS tone.

Purpose: The old site had genuine differentiators (local NWI roots, specific free mockup offer, personal communication emphasis) that are missing from the current redesign. Adding these back gives the site more authenticity and stronger CTAs.

Output: Updated constants, about page, contact page, scroll prompt banner, and footer with restored content.
</objective>

<execution_context>
@C:/Users/sammy/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sammy/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@src/lib/constants.ts
@src/app/about/page.tsx
@src/app/contact/page.tsx
@src/components/sections/ScrollPromptBanner.tsx
@src/components/layout/Footer.tsx
</context>

<tasks>

<task type="auto">
  <name>Task 1: Update siteConfig, About page, and Footer with NWI origin and vision/mission</name>
  <files>
    src/lib/constants.ts
    src/app/about/page.tsx
    src/components/layout/Footer.tsx
  </files>
  <action>
**src/lib/constants.ts:**
- Change `siteConfig.address` from `"Remote-first, serving businesses nationwide"` to `"Based in Northwest Indiana. Remote-first, serving businesses nationwide."`
- This automatically propagates to Footer and Contact page via imports.

**src/app/about/page.tsx:**
- In the "Story" section (Section 2, "Two Become One"), add a new paragraph after the existing three paragraphs that weaves in the NWI origin. Something like: "We started as locals from Northwest Indiana — graduates who saw businesses in our backyard getting ripped off by agencies that didn't understand them. So we became the team we wished existed. Local roots, digital expertise, no pretense."
- Add a NEW Section between the current Section 2 (Story) and Section 3 (Values). This is a vision/mission section. Use the same dark `bg-[#0F172A]` style as the values section for visual contrast. Structure:
  - Eyebrow label: "Our Vision" (text-sm font-semibold text-coral uppercase tracking-widest)
  - Headline: "Your Personalized Digital Team." (same heading styles as other sections: text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[0.9] tracking-tight)
  - Body text (text-xl text-white/70 max-w-3xl): Adapt the old site's "Our vision is to be a business's personalized team for the digital world" into the current edgy tone. Example: "We exist to be the digital team your business deserves but could never afford to hire. Not a vendor. Not an agency. Your squad — building a platform where your business reaches its digital potential without the enterprise price tag."
  - This section needs its own `useScrollAnimation` hook with fadeUp for heading and body text, following the exact same pattern as the other sections (create `visionScope` ref).
  - Add the ref and data-animate attributes matching the existing section patterns.

**src/components/layout/Footer.tsx:**
- The Footer already uses `siteConfig.address` for the MapPin item (line 233), so updating constants.ts handles it.
- No other Footer changes needed — the updated address string will display automatically.
  </action>
  <verify>
- Run `npx next build` to confirm no TypeScript or build errors.
- Visually confirm: grep for "Northwest Indiana" in constants.ts and about/page.tsx.
- Grep for "vision" or "personalized" in about/page.tsx to confirm mission section exists.
  </verify>
  <done>
- siteConfig.address contains "Northwest Indiana" and "Remote-first" (both present).
- About page has a vision/mission section with adapted old-site messaging.
- About page story section references NWI origins.
- Footer MapPin displays updated address via siteConfig import.
  </done>
</task>

<task type="auto">
  <name>Task 2: Update ScrollPromptBanner with free mockup offer and Contact page with direct communication emphasis</name>
  <files>
    src/components/sections/ScrollPromptBanner.tsx
    src/app/contact/page.tsx
  </files>
  <action>
**src/components/sections/ScrollPromptBanner.tsx:**
- Change the "Get Free Demo" button text to "Get a Free Mockup" (more specific, matches old site's offer).
- Below the existing italic scroll prompt text (`<p>` at line 71), add a second line of text (smaller, non-italic) that says something like: "Drop us your business name and email — we'll send you a free website mockup within 24 hours. No strings, no credit card." Style it as `text-sm md:text-base font-semibold text-[#0e1e36]/80 text-center mt-3`.
- Update the button's href to stay as `/contact` (same destination, just better offer language).

**src/app/contact/page.tsx:**
- In the contactInfo array (line 60-79), add a new entry between the existing Mail and Globe entries for direct communication. Use the `Phone` icon from lucide-react (add to imports). Structure:
  ```
  {
    icon: Phone,
    label: "Call or Text",
    value: "Call, text, or email — your choice",
    href: `mailto:${siteConfig.email}`,
  }
  ```
  This emphasizes the personal communication style from the old site without requiring an actual phone number (since siteConfig.phone is empty). The href falls back to email.

- In the sidebar "Quick response badge" section (line 320-327), add a second line below "No automated replies, just real people." that says: `"Call, text, or email your OneSquad rep directly."` Style as `text-sm text-navy/60 mt-1`.

- Update the hero subtitle (line 271-272) from "Tell us what you need and we'll send you a quote. Most responses go out same-day." to something that weaves in the mockup offer: "Tell us what you need and we'll send you a quote — or just your business name for a free website mockup within 24 hours."
  </action>
  <verify>
- Run `npx next build` to confirm no TypeScript or build errors.
- Grep for "mockup" in ScrollPromptBanner.tsx to confirm offer language.
- Grep for "Call" or "text" in contact/page.tsx to confirm direct communication copy.
- Grep for "Phone" in contact/page.tsx imports to confirm icon import.
  </verify>
  <done>
- ScrollPromptBanner says "Get a Free Mockup" and includes 24-hour mockup offer language.
- Contact page contactInfo array has a "Call or Text" entry with Phone icon.
- Contact sidebar badge mentions direct communication with your rep.
- Contact hero subtitle references the free mockup offer.
  </done>
</task>

</tasks>

<verification>
- `npx next build` completes without errors.
- Grep across all modified files for key terms: "Northwest Indiana", "vision", "mockup", "Call" to confirm content additions.
- No broken imports (Phone icon added to contact page lucide-react imports).
- siteConfig.address change propagates cleanly to Footer and Contact sidebar.
</verification>

<success_criteria>
1. The site mentions Northwest Indiana as the team's home base (constants + about page).
2. The about page has an explicit vision/mission section adapted from old site messaging.
3. The ScrollPromptBanner has specific "free website mockup in 24 hours" offer language.
4. The contact page emphasizes direct, personal communication channels.
5. All content matches the current site's edgy, direct, no-BS tone — NOT the old site's generic Wix copy.
6. Build passes with zero errors.
</success_criteria>

<output>
After completion, create `.planning/quick/13-add-missing-content-from-old-onesquads-c/13-SUMMARY.md`
</output>

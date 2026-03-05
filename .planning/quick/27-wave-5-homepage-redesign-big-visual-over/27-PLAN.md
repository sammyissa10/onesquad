# Quick Task 27: Wave 5 Homepage Redesign — Big Visual Overhaul

## Goal
Make the homepage look dramatically more professional — like the reference sites (vsapartners.com, cayk.ca, partnercentric.com). Kill cheap decorative elements, go editorial/typographic, remove wave dividers.

## Problems to Fix
1. `ScrollPromptBanner` — coral full-section background with wave SVGs looks cheap and dated
2. `WaveDivider` components between sections — look cheap/template-y
3. Sections are card-heavy and glassmorphism-y — not editorial enough
4. `Features` section uses icon cards — boring
5. `ServicesPreview` uses glassmorphism cards on navy — better but still generic
6. `Testimonials` uses white cards with gradient top border — looks like a template
7. `CTABanner` has gradient glow blobs — unprofessional

## Plan

### Task 1: Clean up page.tsx — remove wave decorators and scroll banner
File: `src/app/page.tsx`
- Remove all `WaveDivider` imports and JSX
- Remove `ScrollPromptBanner` import and JSX
- Clean section order: Hero → MarqueeTicker → TrustBadges → StatsSection → Features → ServicesPreview → Comparison → Process → Testimonials → HomeFAQ → CTABanner

### Task 2: Redesign Hero — full viewport, editorial
File: `src/components/sections/Hero.tsx`
- Add `min-h-screen flex flex-col justify-end` to section (content anchored to bottom third)
- Or use `pt-48 pb-32 md:pt-56 md:pb-40` for dramatic spacing
- Add a subtle background detail: a large ghosted year "2025" or grid lines (via CSS background-image)
- Move "NW Indiana Web Studio" label to use a `border-b border-white/10 pb-4 mb-8` style
- Add a bold horizontal rule at the bottom: `<div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />`
- Remove the trust statement from inside hero (it'll be in TrustBadges below)
- Make the headline even tighter: change `leading-[0.92]` to `leading-[0.88]`
- Change button area: add a horizontal rule above the buttons, more space

### Task 3: Redesign TrustBadges — clean minimal strip
File: `src/components/sections/TrustBadges.tsx`
- Change background from `bg-[#F5EFE0]` to `bg-white dark:bg-card`
- Remove the heading entirely (too much emphasis for a trust strip)
- Show "50+ businesses trust OneSquad" as a small label on the left
- Business names rendered as a clean horizontal list with thin `|` or `·` separators
- Use `border-t border-b border-navy/5` to frame it as a thin strip
- Reduce vertical padding to `py-5`

### Task 4: Redesign Features — editorial numbered list
File: `src/components/sections/Features.tsx`
- Change from icon cards to a clean numbered list layout
- Each feature gets a large ghosted number (`01`, `02`...) in a fixed-width left column
- Title as `text-2xl md:text-3xl font-bold`
- Description below it
- Items separated by `border-b border-navy/10`
- No cards, no icons, no rounded boxes
- Left heading col: keep the sticky title + description pattern
- Right col: numbered list items

### Task 5: Redesign ServicesPreview — typographic grid with borders
File: `src/components/sections/ServicesPreview.tsx`
- Keep dark navy background
- Remove glassmorphism cards
- Use a clean 2-column grid (desktop) with `border-b border-white/10` dividers between items
- Each service: `text-xl font-bold` title + small description + arrow link
- Add a large section number or decorative element on the left
- Heading: "What We Do" — simpler, more direct

### Task 6: Redesign Testimonials — large featured quote + grid
File: `src/components/sections/Testimonials.tsx`
- Change background to `bg-warm-white dark:bg-card` (light section)
- Feature the first testimonial as a large pull-quote (bigger text, prominent)
- Show remaining 2 testimonials as slim cards below
- Remove gradient top border gimmick
- Remove coral gradient avatar — use initials on plain muted background
- Remove the white card shadow — use clean border instead

### Task 7: Redesign CTABanner — clean, no glow
File: `src/components/sections/CTABanner.tsx`
- Change to solid `bg-navy-deep` (no gradient, no glow blobs)
- Add a thin coral top accent line (`border-t-2 border-coral`)
- Increase heading size to `text-5xl md:text-6xl lg:text-7xl`
- Simplify to: bold headline + single CTA button (primary) + secondary text link
- Remove the green dot badges (too cluttered)

## Success Criteria
- No wave SVGs anywhere on the homepage
- No gradient glow blobs anywhere
- No glassmorphism cards on the dark navy ServicesPreview
- Features section uses numbered list, not icon cards
- Testimonials section uses light background with pull-quote format
- CTABanner is clean dark section with no decorative elements
- Page looks noticeably more professional and editorial

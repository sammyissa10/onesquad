---
phase: quick-18
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/ui/ChatWidget.tsx
  - src/components/layout/Header.tsx
  - src/components/ui/Input.tsx
  - src/components/layout/Footer.tsx
  - src/components/pricing/WebsiteCalculator.tsx
  - src/components/pricing/EcommerceCalculator.tsx
autonomous: true

must_haves:
  truths:
    - "Chat widget fits within viewport on mobile (<480px) without horizontal scroll"
    - "Hamburger menu touch target meets WCAG minimum 44x44px"
    - "Select dropdowns show visual arrow indicator"
    - "Newsletter success message auto-resets after 5 seconds"
    - "Pricing calculator sidebar displays below form on mobile"
  artifacts:
    - path: "src/components/ui/ChatWidget.tsx"
      provides: "Responsive chat widget with mobile viewport constraints"
      min_lines: 120
    - path: "src/components/layout/Header.tsx"
      provides: "Accessible mobile menu toggle with proper touch target"
      min_lines: 260
    - path: "src/components/ui/Input.tsx"
      provides: "Select component with visual dropdown arrow"
      min_lines: 170
    - path: "src/components/layout/Footer.tsx"
      provides: "Newsletter form with auto-resetting success state"
      min_lines: 280
    - path: "src/components/pricing/WebsiteCalculator.tsx"
      provides: "Mobile-responsive calculator with proper content order"
      min_lines: 580
  key_links:
    - from: "src/components/ui/ChatWidget.tsx"
      to: "ChatWidget window width"
      via: "responsive width classes"
      pattern: "w-\\[calc\\(100vw-2rem\\)\\] sm:w-80"
    - from: "src/components/layout/Header.tsx"
      to: "Mobile menu button padding"
      via: "touch target sizing"
      pattern: "p-3"
    - from: "src/components/ui/Input.tsx"
      to: "ChevronDown icon"
      via: "absolute positioned icon"
      pattern: "ChevronDown.*lucide-react"
    - from: "src/components/layout/Footer.tsx"
      to: "newsletterStatus state"
      via: "useEffect timeout"
      pattern: "setTimeout.*newsletterStatus.*idle"
    - from: "src/components/pricing/WebsiteCalculator.tsx"
      to: "sidebar and form order"
      via: "order utility classes"
      pattern: "order-[12].*lg:order-[12]"
---

<objective>
Fix five UX/UI design errors affecting mobile usability and accessibility.

Purpose: Improve mobile experience and WCAG compliance across critical interactive components.
Output: Five targeted component fixes ensuring proper mobile responsiveness and accessibility.
</objective>

<execution_context>
@C:/Users/sammy/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sammy/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@c:\Users\sammy\Projects\onesquad\.planning\PROJECT.md
@c:\Users\sammy\Projects\onesquad\.planning\ROADMAP.md
@c:\Users\sammy\Projects\onesquad\.planning\STATE.md
</context>

<tasks>

<task type="auto">
  <name>Fix mobile viewport overflow and accessibility issues</name>
  <files>
    src/components/ui/ChatWidget.tsx
    src/components/layout/Header.tsx
    src/components/ui/Input.tsx
  </files>
  <action>
**ChatWidget.tsx (line 50):** Fix mobile viewport overflow
- Change `w-80` to `w-[calc(100vw-2rem)] sm:w-80` for responsive width
- Change `bottom-8 left-8` to `bottom-4 left-4 sm:bottom-8 sm:left-8` for tighter mobile spacing
- This ensures chat widget fits within viewport on phones <480px, preventing horizontal scroll

**Header.tsx (lines 154-159):** Increase hamburger touch target for WCAG compliance
- Change `p-2` to `p-3` on mobile menu toggle button
- This increases touch target from ~32x32px to minimum 44x44px (WCAG 2.1 Level AAA)
- No other changes needed - icon remains 24px, padding provides accessible target

**Input.tsx (Select component, line 126):** Add visual dropdown arrow
- Import `ChevronDown` from `lucide-react` at top of file
- Wrap select element (lines 122-145) in a relative div container
- Add absolutely positioned `ChevronDown` icon on the right side:
  ```tsx
  <div className="relative w-full">
    <select
      ref={ref}
      id={selectId}
      className={cn(
        "w-full px-4 py-3 pr-10 rounded-xl border bg-white text-foreground transition-colors duration-200 appearance-none cursor-pointer",
        // ... rest of classes
      )}
      {...props}
    >
      {/* options */}
    </select>
    <ChevronDown
      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none"
    />
  </div>
  ```
- Add `pr-10` to select for icon space (prevents text overlap)
- Icon is pointer-events-none so clicks pass through to select
</action>
  <verify>
Visual check in browser DevTools:
- Chat widget on mobile viewport (375px): no horizontal scroll, proper spacing
- Hamburger button: inspect padding shows 12px (p-3) giving 48x48px target
- Select inputs: visible chevron icon on right side, positioned correctly
</verify>
  <done>
Chat widget fits mobile viewports without overflow, hamburger meets WCAG touch target minimum, all select inputs show visual dropdown arrow
</done>
</task>

<task type="auto">
  <name>Fix newsletter persistence and calculator mobile layout</name>
  <files>
    src/components/layout/Footer.tsx
    src/components/pricing/WebsiteCalculator.tsx
    src/components/pricing/EcommerceCalculator.tsx
  </files>
  <action>
**Footer.tsx (lines 74-106):** Add auto-reset for newsletter success message
- Add `useEffect` after state declarations to watch for success status:
  ```tsx
  useEffect(() => {
    if (newsletterStatus === "success") {
      const timeout = setTimeout(() => {
        setNewsletterStatus("idle");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [newsletterStatus]);
  ```
- This resets form to idle state after 5 seconds, allowing repeat subscriptions without page reload
- Cleanup function prevents memory leaks if component unmounts during timeout

**WebsiteCalculator.tsx (line 143):** Fix mobile content order
- On grid container div, change `gap-12` to `gap-6 lg:gap-12` for tighter mobile spacing
- On sidebar div (line 146), add: `className="lg:sticky lg:top-24 h-fit order-2 lg:order-1"`
- On form container div (line 230), add: `order-1 lg:order-2` to existing className
- This makes form appear first on mobile (natural reading/interaction flow), sidebar second
- On desktop (lg+), order reverses: sidebar left (order-1), form right (order-2)

**EcommerceCalculator.tsx:** Check for same pattern
- Inspect grid layout (line 226 uses `grid lg:grid-cols-2 gap-0`)
- This is a 50/50 split-screen layout, different from WebsiteCalculator's sidebar pattern
- No order change needed - split-screen layout works for mobile stacking
</action>
  <verify>
- Newsletter: Submit form, see success message, wait 5 seconds, confirm form reappears
- WebsiteCalculator on mobile (375px): form appears first, sidebar summary below
- WebsiteCalculator on desktop (1024px+): sidebar left, form right (original layout)
- EcommerceCalculator: no changes made, 50/50 grid stacks naturally
</verify>
  <done>
Newsletter success auto-resets after 5 seconds, WebsiteCalculator mobile layout shows form first then sidebar, EcommerceCalculator unchanged (split-screen layout is correct)
</done>
</task>

</tasks>

<verification>
**Mobile responsiveness (DevTools, 375px width):**
- [ ] Chat widget: No horizontal scroll, fits within viewport
- [ ] Newsletter: Success message disappears after 5 seconds
- [ ] WebsiteCalculator: Form above sidebar, proper content order

**Accessibility (Lighthouse/manual inspection):**
- [ ] Hamburger button: Touch target ≥44x44px (inspect shows p-3 = 48x48px)
- [ ] Select inputs: Visible chevron icon indicating dropdown affordance

**Desktop layout preservation (1440px width):**
- [ ] All components maintain existing desktop layouts
- [ ] No visual regressions from responsive changes
</verification>

<success_criteria>
- Chat widget fits within mobile viewport (<480px) without causing horizontal scroll
- Hamburger menu toggle meets WCAG 2.1 Level AAA touch target minimum (44x44px)
- All select dropdowns display visual arrow indicator for affordance
- Newsletter success message auto-resets to form after 5 seconds
- WebsiteCalculator shows form first, sidebar second on mobile (reversed on desktop)
</success_criteria>

<output>
After completion, create `.planning/quick/18-fix-five-ux-ui-design-errors-chat-widget/18-SUMMARY.md`
</output>

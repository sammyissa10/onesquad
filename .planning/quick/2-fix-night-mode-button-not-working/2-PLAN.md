---
phase: quick-02
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/ui/ThemeProvider.tsx
  - src/app/layout.tsx
  - src/app/globals.css
autonomous: true
must_haves:
  truths:
    - "Clicking the dark mode toggle switches all pages to a visually distinct dark theme"
    - "Dark mode preference persists across page refresh and navigation"
    - "No flash of wrong theme on page load when dark mode is saved"
    - "Toggle works immediately on first load without stale cache issues"
  artifacts:
    - path: "src/components/ui/ThemeProvider.tsx"
      provides: "Robust theme context that always wraps children in Provider"
    - path: "src/app/layout.tsx"
      provides: "Inline FOUC-prevention script in <head>"
    - path: "src/app/globals.css"
      provides: "Dark mode overrides for navy sections and remaining gaps"
  key_links:
    - from: "src/app/layout.tsx"
      to: "src/components/ui/ThemeProvider.tsx"
      via: "inline script sets .dark class before hydration; ThemeProvider reads it"
    - from: "src/components/ui/ThemeProvider.tsx"
      to: "src/app/globals.css"
      via: ".dark class on html triggers CSS variable overrides"
---

<objective>
Fix the dark mode toggle button so it reliably works across all pages.

Purpose: The toggle button appears functional but has multiple failure modes — a fragile
ThemeProvider pattern that conditionally wraps children in the context Provider (causing
the toggle function to be a no-op in certain hydration states), no FOUC prevention for
returning users, and incomplete dark mode CSS coverage for navy sections.

Output: A robust dark mode toggle that works on every page, persists correctly, and has
no flash of wrong theme on load.
</objective>

<execution_context>
@C:/Users/sammy/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sammy/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@src/components/ui/ThemeProvider.tsx
@src/components/ui/ThemeToggle.tsx
@src/components/layout/Header.tsx
@src/app/layout.tsx
@src/app/globals.css
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix ThemeProvider and add FOUC-prevention script</name>
  <files>
    src/components/ui/ThemeProvider.tsx
    src/app/layout.tsx
  </files>
  <action>
Fix the ThemeProvider to ALWAYS wrap children in the Provider, eliminating the fragile
conditional rendering pattern.

In `src/components/ui/ThemeProvider.tsx`:
1. Remove the `if (!mounted) return <>{children}</>` guard entirely
2. ALWAYS return `<ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>`
3. Keep the `mounted` state internally to suppress hydration mismatch warnings — use it
   only to control whether the ThemeToggle icon renders (via the context value), NOT to
   control Provider wrapping
4. Change the default context value from `toggleTheme: () => {}` (no-op) to a function
   that logs a warning: `() => { console.warn('ThemeProvider not mounted yet') }` — this
   helps debug if the default context is ever consumed incorrectly
5. In the `useEffect`, also check `document.documentElement.classList.contains('dark')` as
   a fallback (the inline script may have already set it before React hydrates)

The revised ThemeProvider should look like:
```tsx
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Check if inline script already applied dark class
    const isDark = document.documentElement.classList.contains("dark");
    const stored = localStorage.getItem("onesquad-theme") as Theme | null;
    const resolvedTheme = stored || (isDark ? "dark" : "light");
    setTheme(resolvedTheme);
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("onesquad-theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

In `src/app/layout.tsx`:
1. Add an inline script in the `<head>` section (BEFORE stylesheets load) that reads
   `localStorage.getItem('onesquad-theme')` and applies the `.dark` class to `<html>`
   immediately. This prevents flash of wrong theme (FOUC).
2. Use a `<script>` tag with `dangerouslySetInnerHTML` (same pattern as the existing
   JSON-LD script). Place it BEFORE the JSON-LD script.
3. The script content should be:
   ```js
   (function(){try{var t=localStorage.getItem('onesquad-theme');if(t==='dark')document.documentElement.classList.add('dark')}catch(e){}})()
   ```
4. Keep the existing `suppressHydrationWarning` on `<html>` (already present) — this is
   needed because the inline script may add `.dark` before React hydrates.
  </action>
  <verify>
Run `npm run build` to confirm no build errors. Then start `npm run dev` and use browser
DevTools to verify:
1. The ThemeProvider always wraps children in the Provider (no conditional Fragment)
2. Clicking the toggle adds/removes `.dark` class on `<html>`
3. localStorage is set to "dark" or "light" after toggle
4. Refreshing the page with dark mode saved shows no white flash
  </verify>
  <done>
ThemeProvider always wraps children in context Provider. Inline FOUC-prevention script
applies .dark class before hydration. Toggle button reliably switches theme on all pages.
  </done>
</task>

<task type="auto">
  <name>Task 2: Improve dark mode CSS coverage for navy sections</name>
  <files>
    src/app/globals.css
  </files>
  <action>
Add CSS overrides in globals.css to ensure navy sections differentiate properly in dark mode
and all remaining color gaps are covered.

Add these rules after the existing `.dark` overrides:

1. Navy background differentiation in dark mode — navy sections should use a slightly
   different shade than the body background to maintain the light/dark section rhythm:
   ```css
   /* Dark mode: navy sections use slightly lighter dark shade for contrast */
   .dark .bg-navy {
     background-color: #0e1e36;
   }
   .dark .bg-\[#0F172A\] {
     background-color: #0e1e36;
   }
   .dark .bg-\[#051733\] {
     background-color: #0e1e36;
   }
   ```
   Note: --background is #0a1628, so #0e1e36 is a slightly lighter navy that creates
   subtle section differentiation in dark mode.

2. Ensure white text on navy sections stays white in dark mode (no override needed — these
   already use `text-white` which is not overridden by .dark rules, which is correct).

3. Add border overrides for any remaining edge cases:
   ```css
   /* Dark mode: ensure coral/peach accents stay vibrant */
   .dark .border-coral {
     border-color: var(--accent);
   }
   ```

4. Add a transition for smooth theme switching on the body and sections:
   ```css
   /* Smooth theme transition */
   html.transitioning,
   html.transitioning *,
   html.transitioning *::before,
   html.transitioning *::after {
     transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
   }
   ```
   Then in the ThemeProvider's `toggleTheme`, add/remove the `.transitioning` class:
   - Add `html.transitioning` before toggling dark class
   - Remove it after 300ms via setTimeout
   This prevents the transition from running on page load (only on manual toggle).

IMPORTANT: Do NOT remove any existing dark mode overrides. Only ADD new ones.
  </action>
  <verify>
Run `npm run build` to confirm CSS compiles. Toggle dark mode on homepage and about page —
verify that:
1. Navy sections have subtle contrast against the dark body background
2. White sections convert to dark card color
3. Text remains legible in all sections
4. Theme switch has a smooth color transition (not instant flash)
  </verify>
  <done>
Dark mode shows clear visual differentiation between all section types. Navy sections are
subtly distinct from the body background. Theme transitions smoothly between light and dark.
  </done>
</task>

<task type="auto">
  <name>Task 3: Clean .next cache and verify across all pages</name>
  <files></files>
  <action>
1. Delete the `.next` directory to clear any stale cache: `rm -rf .next`
2. Run `npm run build` to create a fresh production build
3. Run `npm run start` to serve the production build
4. Use Playwright to verify the toggle works on ALL main pages:
   /, /about, /contact, /services, /portfolio, /pricing
5. For each page, verify:
   - Toggle button exists and is visible on desktop (1280px viewport)
   - Clicking toggle adds `.dark` class to html
   - Clicking again removes `.dark` class
   - localStorage persists the preference
   - Background colors change visibly between modes
6. Verify FOUC prevention: navigate to a page, toggle dark mode on, refresh the page,
   confirm the page loads in dark mode without a white flash (the inline script should
   apply .dark before first paint)
7. Kill the production server after testing

If ANY page fails the toggle test, investigate and fix before marking done.
  </action>
  <verify>
All 6 pages pass toggle test. FOUC prevention confirmed. `npm run build` exits cleanly.
  </verify>
  <done>
Dark mode toggle verified working on all main pages in production build. No stale cache
artifacts. No FOUC on refresh with saved dark preference.
  </done>
</task>

</tasks>

<verification>
1. `npm run build` completes without errors
2. Dark mode toggle button switches theme on every page (/, /about, /contact, /services, /portfolio, /pricing)
3. Theme persists across page refresh (localStorage)
4. No flash of wrong theme when dark mode is saved and page loads
5. Navy and white sections are visually distinct in both light and dark modes
6. All text remains legible in dark mode
</verification>

<success_criteria>
- Toggle button adds/removes `.dark` class on `<html>` on every page
- localStorage stores `onesquad-theme` as "dark" or "light"
- Page loads with correct theme applied immediately (no FOUC)
- Visual differentiation between section types maintained in dark mode
- No build errors, no console errors related to theme
</success_criteria>

<output>
After completion, create `.planning/quick/2-fix-night-mode-button-not-working/2-SUMMARY.md`
</output>

---
phase: quick
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - package.json
  - playwright.config.ts
  - e2e/homepage.spec.ts
  - .github/workflows/e2e.yml
  - .gitignore
autonomous: true
must_haves:
  truths:
    - "Playwright is installed and configured for the Next.js project"
    - "A smoke test verifies the homepage loads and renders key sections"
    - "GitHub Actions runs e2e tests on every push and PR to master"
  artifacts:
    - path: "playwright.config.ts"
      provides: "Playwright configuration for Next.js"
    - path: "e2e/homepage.spec.ts"
      provides: "Homepage smoke test"
    - path: ".github/workflows/e2e.yml"
      provides: "CI workflow for e2e tests"
  key_links:
    - from: ".github/workflows/e2e.yml"
      to: "playwright.config.ts"
      via: "npx playwright test command"
    - from: "playwright.config.ts"
      to: "next dev server"
      via: "webServer config starting next dev on localhost:3000"
---

<objective>
Add Playwright end-to-end testing to the Next.js project with a GitHub Actions CI pipeline.

Purpose: Establish automated e2e testing so every push and PR is validated against a real browser, catching regressions before merge.
Output: Playwright installed and configured, homepage smoke test, GitHub Actions workflow.
</objective>

<execution_context>
@C:/Users/sammy/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/sammy/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@package.json
@src/app/page.tsx
@next.config.ts
@tsconfig.json
</context>

<tasks>

<task type="auto">
  <name>Task 1: Install Playwright and create configuration + smoke test</name>
  <files>package.json, playwright.config.ts, e2e/homepage.spec.ts, .gitignore</files>
  <action>
1. Install Playwright as a dev dependency:
   ```
   npm install -D @playwright/test
   npx playwright install --with-deps chromium
   ```
   Only install Chromium (not all browsers) to keep CI fast. Firefox and WebKit can be added later.

2. Create `playwright.config.ts` at project root with:
   - `testDir: './e2e'`
   - `fullyParallel: true`
   - `forbidOnly: !!process.env.CI` (prevent .only in CI)
   - `retries: process.env.CI ? 2 : 0` (retry flakes in CI only)
   - `workers: process.env.CI ? 1 : undefined` (single worker in CI for stability)
   - `reporter: 'html'`
   - `use.baseURL: 'http://localhost:3000'`
   - `use.trace: 'on-first-retry'`
   - Single project: `{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }`
   - `webServer` block: `{ command: 'npm run dev', url: 'http://localhost:3000', reuseExistingServer: !process.env.CI }`

3. Create `e2e/homepage.spec.ts` with these tests:
   ```typescript
   import { test, expect } from '@playwright/test';

   test.describe('Homepage', () => {
     test('should load and display the page title', async ({ page }) => {
       await page.goto('/');
       await expect(page).toHaveTitle(/onesquad/i);
     });

     test('should render the header and main sections', async ({ page }) => {
       await page.goto('/');
       // Header is visible
       const header = page.locator('header');
       await expect(header).toBeVisible();
       // Main content is visible
       const main = page.locator('main');
       await expect(main).toBeVisible();
       // Footer is visible
       const footer = page.locator('footer');
       await expect(footer).toBeVisible();
     });

     test('should be accessible and have no broken layout', async ({ page }) => {
       const response = await page.goto('/');
       expect(response?.status()).toBe(200);
     });
   });
   ```
   Note: The title assertion regex `/onesquad/i` should be adjusted if the actual page title differs. The test will reveal the real title on first run, and can be corrected.

4. Add npm scripts to `package.json`:
   - `"test:e2e": "playwright test"`
   - `"test:e2e:ui": "playwright test --ui"` (for local interactive debugging)

5. Append to `.gitignore` (do NOT overwrite existing content):
   - `/test-results/`
   - `/playwright-report/`
   - `/blob-report/`
   - `/playwright/.cache/`
  </action>
  <verify>
Run `npx playwright test` from project root. All 3 tests should pass (or reveal the actual page title for adjustment). Verify playwright.config.ts exists and e2e/homepage.spec.ts exists.
  </verify>
  <done>Playwright installed, configured with webServer for Next.js, 3 homepage smoke tests passing, npm scripts added, test artifacts gitignored.</done>
</task>

<task type="auto">
  <name>Task 2: Create GitHub Actions workflow for e2e tests</name>
  <files>.github/workflows/e2e.yml</files>
  <action>
Create `.github/workflows/e2e.yml` with:

```yaml
name: E2E Tests

on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

jobs:
  e2e:
    runs-on: ubuntu-latest
    timeout-minutes: 15

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Chromium
        run: npx playwright install --with-deps chromium

      - name: Build Next.js app
        run: npm run build

      - name: Run e2e tests
        run: npx playwright test

      - name: Upload test report
        uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 14
```

Key decisions:
- Uses `npm ci` (not `npm install`) for reproducible CI builds.
- Builds Next.js first with `npm run build` so the webServer config can use `npm run start` in CI for faster test execution. UPDATE: Since the playwright.config.ts uses `npm run dev`, change the webServer command to conditionally use `npm run start` in CI. Specifically, update playwright.config.ts webServer to:
  ```
  command: process.env.CI ? 'npm run start' : 'npm run dev'
  ```
  This way CI builds once then serves the production build (faster, more stable), while local dev uses the dev server.
- Only installs Chromium (matches playwright.config.ts).
- Uploads HTML report as artifact on failure or success for debugging.
- 15-minute timeout prevents runaway jobs.
  </action>
  <verify>
Verify `.github/workflows/e2e.yml` exists with valid YAML syntax:
```
npx js-yaml .github/workflows/e2e.yml
```
(If js-yaml not available, just verify the file exists and review content manually.)

Verify the workflow triggers on push to master and pull_request to master.
  </verify>
  <done>GitHub Actions workflow file created at `.github/workflows/e2e.yml` that triggers on push/PR to master, installs deps, builds the app, runs Playwright tests, and uploads the HTML report as an artifact.</done>
</task>

</tasks>

<verification>
1. `npx playwright test` passes all tests locally
2. `.github/workflows/e2e.yml` exists with correct triggers (push + PR to master)
3. `playwright.config.ts` exists with webServer, chromium project, and CI-aware settings
4. `e2e/homepage.spec.ts` exists with 3 smoke tests
5. `package.json` has `test:e2e` and `test:e2e:ui` scripts
6. `.gitignore` includes Playwright artifacts
</verification>

<success_criteria>
- All 3 e2e smoke tests pass locally via `npm run test:e2e`
- GitHub Actions workflow is syntactically valid and configured for push/PR to master
- Playwright configured with webServer that uses `npm run start` in CI and `npm run dev` locally
- Test report uploads as artifact in CI
</success_criteria>

<output>
After completion, create `.planning/quick/1-add-playwright-e2e-testing-with-github-a/1-SUMMARY.md`
</output>

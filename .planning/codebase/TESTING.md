# Testing Patterns

**Analysis Date:** 2026-02-10

## Test Framework

**Runner:**
- Not detected - No testing framework installed
- `package.json` contains no test dependencies (Jest, Vitest, etc.)

**Assertion Library:**
- Not applicable - No testing infrastructure present

**Run Commands:**
- Not configured - Project has no test scripts
- Current scripts: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`

## Test File Organization

**Location:**
- Not applicable - No test files found in `src/` directory
- Test files from node_modules (external dependencies) are not project tests

**Naming:**
- Convention would likely be `.test.ts` or `.spec.ts` based on Next.js defaults
- Not currently in use

**Structure:**
- No established test directory structure
- Recommendation: Create `__tests__/` or co-locate `.test.ts` files with source

## Test Structure

**Suite Organization:**
- Not established - No test files exist

**Patterns:**
- Project is currently untested at the unit level
- Server-side validation logic exists but is not covered by tests (see `src/app/api/contact/route.ts`)
- Client-side form handling uses react-hook-form + Zod but tests not implemented

## Mocking

**Framework:**
- Not applicable - No testing infrastructure

**Patterns:**
- Would require Jest or Vitest setup
- Potential mocking targets: Framer Motion animations, API routes, localStorage, next/link, lucide-react icons

**What to Mock (if tests were added):**
- Window events: `scroll`, `resize`, `click`
- localStorage: For quote data retrieval in `src/app/contact/page.tsx`
- API calls: Mock `/api/contact` and `/api/newsletter` responses
- Framer Motion: Mock animation callbacks to avoid timing issues
- next/navigation: Mock `usePathname()` hook used in `Header.tsx`

**What NOT to Mock:**
- Component rendering - test actual DOM output
- Zod validation - test schema directly with real data
- Tailwind class utilities - test styling output in integration tests only
- Basic React hooks (useState, useEffect) - test behavior, not implementation

## Fixtures and Factories

**Test Data:**
- Not currently established
- Contact form validation schemas exist in code: `src/app/contact/page.tsx` uses Zod schema
- Sample data available in `src/lib/constants.ts`: `services`, `pricingPlans`, `testimonials`, `faqs`

**Example test data (if implemented):**
```typescript
const validContactData = {
  name: "John Doe",
  email: "john@example.com",
  phone: "555-1234",
  company: "Acme Corp",
  service: "web-design",
  message: "I need a new website for my business."
};

const invalidContactData = {
  name: "J",
  email: "invalid-email",
  message: "Short"
};
```

**Location:**
- Would be: `src/__tests__/fixtures/` or `src/__tests__/mocks/`
- Constants already available for reuse: `src/lib/constants.ts`, `src/types/index.ts`

## Coverage

**Requirements:**
- Not enforced - No coverage tooling configured

**View Coverage:**
- Not available - Would require Jest or Vitest with coverage plugin
- Estimated coverage: 0% (no tests present)

## Test Types

**Unit Tests (would test):**
- Utility functions: `cn()`, `formatPrice()` in `src/lib/utils.ts`
- Animation presets: `fadeIn`, `scaleIn`, `stagger()` in `src/lib/animations.ts`
- Type definitions: Type guards and validators
- Form validation: Zod schemas (`contactSchema` in contact page)

**Integration Tests (would test):**
- Contact form submission: Form validation + API route + response handling
- Quote calculator flow: Data storage to localStorage → retrieval in contact page
- Navigation: Header dropdown interactions, mobile menu toggle
- Theme switching: ThemeProvider + ThemeToggle interaction

**E2E Tests:**
- Not configured
- Would require Cypress, Playwright, or similar
- Candidate scenarios:
  - User completes contact form and receives success message
  - Pricing calculator generates quote and navigates to contact
  - Portfolio carousel interactions
  - Newsletter signup

## Common Patterns

**Async Testing (if implemented):**
```typescript
// Form submission
test("should submit contact form", async () => {
  render(<ContactPage />);
  const input = screen.getByLabelText("Email");
  await userEvent.type(input, "test@example.com");
  await userEvent.click(screen.getByRole("button", { name: /submit/i }));
  await waitFor(() => expect(screen.getByText(/success/i)).toBeInTheDocument());
});
```

**Error Testing (if implemented):**
```typescript
// Validation error
test("should show error for invalid email", async () => {
  const { rerender } = render(<ContactPage />);
  const form = screen.getByRole("form");
  const submitButton = screen.getByRole("button", { name: /submit/i });

  await userEvent.type(screen.getByLabelText("Email"), "invalid");
  await userEvent.click(submitButton);

  expect(screen.getByText(/valid email/i)).toBeInTheDocument();
});
```

**Animation Testing (if implemented):**
```typescript
// Would mock Framer Motion with jest.mock
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => children,
}));
```

## Recommendations

**Priority 1 - Setup Infrastructure:**
1. Install testing framework: `npm install -D vitest @testing-library/react @testing-library/user-event`
2. Create test config: `vitest.config.ts`
3. Create test directory: `src/__tests__/`

**Priority 2 - Critical Tests:**
1. Unit: Utility functions (`utils.ts`)
2. Unit: Form validation schemas (Zod)
3. Integration: Contact form submission flow

**Priority 3 - Coverage:**
1. API route error paths (`src/app/api/contact/route.ts`, `src/app/api/newsletter/route.ts`)
2. Component state changes (Header scroll detection, mobile menu)
3. Quote calculator localStorage interactions

**Priority 4 - E2E:**
1. Contact form complete flow
2. Pricing calculator → contact handoff
3. Navigation and page transitions

---

*Testing analysis: 2026-02-10*

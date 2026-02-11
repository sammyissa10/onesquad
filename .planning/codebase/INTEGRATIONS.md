# External Integrations

**Analysis Date:** 2026-02-10

## APIs & External Services

**Email Delivery (Not Yet Integrated):**
- Resend - Referenced in `src/app/api/contact/route.ts` with TODO for implementation
  - SDK/Client: `resend` package (not installed)
  - Auth: `process.env.RESEND_API_KEY`
- SendGrid - Referenced in `src/app/api/contact/route.ts` as alternative option
  - Auth: `process.env.SENDGRID_API_KEY`
- AWS SES - Referenced in `src/app/api/contact/route.ts` as alternative option
- Nodemailer - Referenced in `src/app/api/contact/route.ts` as alternative option for SMTP

**Email Marketing (Not Yet Integrated):**
- Mailchimp - Referenced in `src/app/api/newsletter/route.ts` with TODO for implementation
  - Endpoint: `https://us1.api.mailchimp.com/3.0/lists/{LIST_ID}/members`
  - Auth: `process.env.MAILCHIMP_API_KEY`
- ConvertKit - Referenced in `src/app/api/newsletter/route.ts` as alternative option
- Resend Audiences - Referenced in `src/app/api/newsletter/route.ts` as alternative option
- SendGrid Contacts - Referenced in `src/app/api/newsletter/route.ts` as alternative option

**Image Hosting:**
- Unsplash - Remote image source configured in Next.js image optimization
  - Hostname: `images.unsplash.com`
- Colorlib - Remote image source configured in Next.js image optimization
  - Hostname: `colorlib.com`
- Thum.io - Thumbnail/screenshot service configured in Next.js image optimization
  - Hostname: `image.thum.io`

## Data Storage

**Databases:**
- Not detected - No database integration currently implemented

**File Storage:**
- Local filesystem only - Static assets in `public/` directory
- No cloud storage service integrated (S3, Cloud Storage, etc.)

**Browser Storage:**
- localStorage - Used for storing quote data from pricing calculator
  - Key: `QUOTE_STORAGE_KEY` from `src/lib/pricingData`
  - Purpose: Pass quote details from pricing calculator to contact form

**Caching:**
- Next.js built-in caching - Static site generation and incremental static regeneration
- No external cache service (Redis, Memcached) detected

## Authentication & Identity

**Auth Provider:**
- None - No authentication system implemented
- All pages are publicly accessible
- No user accounts, sessions, or login system

## Monitoring & Observability

**Error Tracking:**
- None detected - No Sentry, Rollbar, or similar integration

**Logs:**
- Console logging only
- Server-side endpoints log to console (contact form, newsletter signup)
  - `src/app/api/contact/route.ts` - Logs contact submissions to console
  - `src/app/api/newsletter/route.ts` - Logs newsletter signups to console
- No structured logging or log aggregation service

## CI/CD & Deployment

**Hosting:**
- Recommended: Vercel (as mentioned in README.md and Next.js defaults)
- Flexible: Any Node.js hosting (AWS, Heroku, DigitalOcean, self-hosted)

**CI Pipeline:**
- Not detected - No GitHub Actions, GitLab CI, Jenkins, or other CI service configured
- ESLint available locally via `npm run lint` but no automated checking on commits

## Environment Configuration

**Required env vars:**
- None currently required for core functionality
- Optional env vars for future integrations:
  - `RESEND_API_KEY` - For Resend email service
  - `MAILCHIMP_API_KEY` - For Mailchimp newsletter integration
  - `SENDGRID_API_KEY` - For SendGrid email service

**Secrets location:**
- `.env.local` - Local development secrets (git ignored, not committed)
- Environment-specific configuration in hosting platform (Vercel, etc.)
- No `.env` file committed to repository

## Webhooks & Callbacks

**Incoming:**
- None detected - No webhook endpoints that receive external callbacks

**Outgoing:**
- None detected - No outbound webhook integrations to external services
- Contact form and newsletter signup currently only log to console
- No integration with third-party notification services

## Current Integration Status

**Fully Integrated:**
- Next.js image optimization with remote patterns
- localStorage for client-side quote persistence

**Designed But Not Implemented:**
- Email contact form (email service integration pending)
- Newsletter signup (email marketing integration pending)
- Server-side validation in place, awaiting email service configuration

**No Integration:**
- Database/persistence layer
- User authentication
- Payment processing (Stripe mentioned in pricing page content, not integrated)
- Analytics services
- Error tracking
- Monitoring/observability

---

*Integration audit: 2026-02-10*

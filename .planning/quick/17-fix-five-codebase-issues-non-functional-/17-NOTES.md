# Framer Motion Usage Audit

**Date:** 2026-02-13
**Conclusion:** Framer Motion CANNOT be removed. Dual-library setup (GSAP + Framer Motion) is intentional and correct.

## Current Usage (26 files)

### Interactive Animations (KEEP - Framer Motion is the right tool)

| File | Usage | Why Framer Motion |
|------|-------|-------------------|
| `src/components/layout/Header.tsx` | AnimatePresence for dropdown/mobile menu | Conditional mount/unmount animations |
| `src/components/sections/HomeFAQ.tsx` | AnimatePresence for accordion expand/collapse | State-based enter/exit animations |
| `src/app/pricing/page.tsx` | AnimatePresence for calculator tabs, layoutId for tab indicator | State transitions + layout animations |
| `src/app/portfolio/page.tsx` | AnimatePresence for filter transitions | Filter category changes need enter/exit |
| `src/components/pricing/SocialCalculator.tsx` | AnimatePresence for step transitions, motion for interactive buttons | Multi-step wizard with state-based animations |
| `src/components/pricing/WebsiteCalculator.tsx` | AnimatePresence for step transitions, useInView | Multi-step wizard with state-based animations |
| `src/components/pricing/EcommerceCalculator.tsx` | AnimatePresence for step transitions, useInView | Multi-step wizard with state-based animations |
| `src/components/sections/PricingCalculator.tsx` | AnimatePresence, useInView | Interactive pricing configurator |
| `src/components/ui/ChatWidget.tsx` | AnimatePresence for widget open/close | Conditional UI visibility |
| `src/components/ui/ScrollToTop.tsx` | AnimatePresence for scroll-to-top button | Conditional visibility based on scroll |
| `src/components/ui/MagneticButton.tsx` | useSpring for magnetic hover effect | Spring physics on pointer interaction |
| `src/components/ui/ThemeToggle.tsx` | motion for theme switch animation | State-based toggle animation |
| `src/components/ui/Button.tsx` | HTMLMotionProps for button hover/tap | Interactive button animations |
| `src/components/ui/TemplateCard.tsx` | motion for card hover animations | Interactive hover effects |
| `src/app/services/[slug]/ServiceDetailClient.tsx` | AnimatePresence for tab content transitions | Tab switching animations |

### Page Entry Animations (Could be GSAP but harmless)

| File | Usage | Notes |
|------|-------|-------|
| `src/app/not-found.tsx` | motion.div for page entrance | Small page, no scroll animations needed |
| `src/app/privacy/page.tsx` | motion.div for content fade-in | Simple page entrance |
| `src/app/terms/page.tsx` | motion.div for content fade-in | Simple page entrance |
| `src/app/blog/page.tsx` | motion variants for staggered card reveals | Blog uses whileInView, not ScrollTrigger |
| `src/app/case-studies/page.tsx` | motion for page animations | Simple case studies page |
| `src/app/team/page.tsx` | motion for team member cards | Simple page |
| `src/app/contact/page.tsx` | motion for form entrance | Contact page entry |
| `src/app/pricing/social/page.tsx` | MotionConfig + motion for hero entrance | Tier page entry |
| `src/app/pricing/website/page.tsx` | MotionConfig + motion for hero entrance | Tier page entry |
| `src/app/pricing/ecommerce/page.tsx` | MotionConfig + motion for hero entrance | Tier page entry |
| `src/app/templates/[slug]/page.tsx` | motion for template detail page | Detail page entry |

## Why NOT Remove Framer Motion

### GSAP excels at:
- Timeline control and complex sequenced animations
- Scroll-driven animations (ScrollTrigger)
- Performance-critical animations with fine-grained control
- Parallax, pinning, scrub animations

### Framer Motion excels at:
- React state-based animations (AnimatePresence for mount/unmount)
- layoutId spring animations (tab indicators, shared layout)
- Declarative syntax that integrates with React component lifecycle
- MotionConfig for reduced motion support
- useSpring for physics-based interactive animations

### Industry standard:
Using both GSAP and Framer Motion is a common pattern on high-quality marketing sites (Vercel, Linear, Stripe). GSAP handles the scroll-driven spectacle; Framer Motion handles the interactive UI transitions.

### Bundle size:
Framer Motion adds ~40KB gzipped. This is acceptable given the interactive functionality it provides (AnimatePresence alone would require significant custom code to replicate).

## Summary

- **26 files** import framer-motion
- **15 files** use AnimatePresence or interactive features that GSAP cannot easily replace
- **11 files** use simple motion.div for page entrances (could theoretically be GSAP, but not worth the migration effort)
- **Removing framer-motion would break:** FAQ accordions, portfolio filters, pricing calculator wizards, header dropdowns, chat widget, theme toggle, magnetic buttons, and all tab transitions

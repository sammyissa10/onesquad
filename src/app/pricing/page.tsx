"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Check, ChevronDown, ExternalLink } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { pricingPlans, includedWithEveryPlan, faqs } from "@/lib/constants";
import { formatPrice, cn } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, scaleReveal, TRIGGERS } from "@/lib/scrollAnimations";
import SocialCalculator from "@/components/pricing/SocialCalculator";
import WebsiteCalculator from "@/components/pricing/WebsiteCalculator";
import EcommerceCalculator from "@/components/pricing/EcommerceCalculator";

function PricingCard({
  plan,
  isAnnual,
  variant = "hosting",
}: {
  plan: (typeof pricingPlans)[0];
  isAnnual: boolean;
  variant?: "hosting" | "managed";
}) {
  const price =
    plan.price === "custom"
      ? "custom"
      : isAnnual
      ? Math.round(plan.price * 0.85)
      : plan.price;

  // Different hover patterns per variant - converted to CSS
  const hoverClasses =
    variant === "hosting"
      ? "hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(5,23,51,0.15)]"
      : "hover:shadow-[0_0_80px_rgba(226,121,94,0.3)]";

  return (
    <div
      data-cursor="card"
      className={cn(
        "relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border h-full flex flex-col transition-all duration-300 pricing-plan-card",
        hoverClasses,
        plan.highlighted
          ? "ring-2 ring-coral border-coral/50"
          : "border-white/10"
      )}
      data-animate
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="accent">{plan.badge}</Badge>
        </div>
      )}

      {/* Header */}
      <div className="p-6 pb-4">
        <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
        <p className="text-sm text-white/70 mb-4">{plan.focus}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-white">
            {formatPrice(price)}
          </span>
          {price !== "custom" && (
            <span className="text-white/70">/month</span>
          )}
        </div>
        {isAnnual && plan.price !== "custom" && (
          <p className="text-sm text-coral mt-1">Save 15% with annual</p>
        )}
      </div>

      {/* Quick stats */}
      <div className="px-6 py-4 bg-white/5 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-white/60">Storage</p>
          <p className="font-semibold text-white">{plan.storage}</p>
        </div>
        <div>
          <p className="text-xs text-white/60">Work Hours</p>
          <p className="font-semibold text-white">{plan.hours}</p>
        </div>
      </div>

      {/* Features */}
      <div className="p-6 flex-1">
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
              <span className="text-sm text-white/70">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="p-6 pt-0">
        <Link href="/contact" className="block">
          <Button
            variant={plan.highlighted ? "accent" : "outline"}
            className="w-full"
          >
            {plan.price === "custom" ? "Contact Us" : "Get Started"}
          </Button>
        </Link>
      </div>
    </div>
  );
}

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-border last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
        data-cursor="button"
      >
        <span className="font-semibold text-primary group-hover:text-coral transition-colors pr-4">
          {faq.question}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform flex-shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <p className="pb-6 text-muted-foreground">{faq.answer}</p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [activeTab, setActiveTab] = useState<"hosting" | "managed">("hosting");
  const [activeTier, setActiveTier] = useState<"social" | "website" | "ecommerce" | null>(null);

  const hostingPlans = pricingPlans.filter((p) => p.category === "hosting");
  const managedPlans = pricingPlans.filter((p) => p.category === "managed");

  const { scope } = useScrollAnimation(({ gsap }) => {
    // Hero section
    gsap.from('.pricing-hero-h1', {
      ...fadeUp({ y: 50, duration: 0.8, ease: 'power3.out' }),
      scrollTrigger: { trigger: '.pricing-hero', start: TRIGGERS.hero },
    });

    gsap.from('.pricing-hero-subtitle', {
      ...fadeUp({ delay: 0.15 }),
      scrollTrigger: { trigger: '.pricing-hero', start: TRIGGERS.hero },
    });

    gsap.from('.pricing-hero-toggle', {
      ...fadeUp({ delay: 0.3 }),
      scrollTrigger: { trigger: '.pricing-hero', start: TRIGGERS.hero },
    });

    // Tier Gateway Cards - staggered scaleReveal
    gsap.from('.pricing-tier-card', {
      ...scaleReveal(),
      stagger: 0.12,
      scrollTrigger: { trigger: '.pricing-tiers', start: TRIGGERS.late },
    });

    // Hosting/Managed section
    gsap.from('.pricing-hosting-heading', {
      ...fadeUp(),
      scrollTrigger: { trigger: '.pricing-hosting', start: TRIGGERS.early },
    });

    gsap.from('.pricing-hosting-tabs', {
      ...fadeUp({ delay: 0.1 }),
      scrollTrigger: { trigger: '.pricing-hosting', start: TRIGGERS.early },
    });

    gsap.from('.pricing-hosting-desc', {
      ...fadeUp({ delay: 0.2 }),
      scrollTrigger: { trigger: '.pricing-hosting', start: TRIGGERS.early },
    });

    // Plan cards - staggered fadeUp
    gsap.from('.pricing-plan-card', {
      ...fadeUp(),
      stagger: 0.1,
      scrollTrigger: { trigger: '.pricing-plans-grid', start: TRIGGERS.standard },
    });

    gsap.from('.pricing-included', {
      ...fadeUp({ delay: 0.3 }),
      scrollTrigger: { trigger: '.pricing-hosting', start: TRIGGERS.standard },
    });

    // FAQ section
    gsap.from('.pricing-faq-heading', {
      ...fadeUp(),
      scrollTrigger: { trigger: '.pricing-faq', start: TRIGGERS.early },
    });

    gsap.from('.pricing-faq-container', {
      ...scaleReveal(),
      scrollTrigger: { trigger: '.pricing-faq', start: TRIGGERS.standard },
    });
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
        <main ref={scope}>
          <Breadcrumb items={[{ label: "Pricing" }]} />
          {/* Hero - Navy background with oversized typography */}
          <section className="bg-navy py-32 md:py-40 pricing-hero">
            <Container>
              <div className="text-center max-w-4xl mx-auto">
                <h1
                  className="text-4xl md:text-5xl xl:text-6xl font-heading font-bold text-white mb-6 pricing-hero-h1"
                  data-animate
                >
                  Stop Guessing.{" "}
                  <span className="text-coral">Start Building.</span>
                </h1>
                <p
                  className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto pricing-hero-subtitle"
                  data-animate
                >
                  Three ways to get started. Pick what fits your business.
                </p>

                {/* Billing toggle - pill style on navy */}
                <div
                  className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full p-1.5 pricing-hero-toggle"
                  data-animate
                >
                  <button
                    onClick={() => setIsAnnual(false)}
                    className={cn(
                      "px-6 py-2.5 rounded-full text-sm font-semibold transition-all",
                      !isAnnual
                        ? "bg-white text-navy"
                        : "text-white/70 hover:text-white"
                    )}
                    data-cursor="button"
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setIsAnnual(true)}
                    className={cn(
                      "px-6 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2",
                      isAnnual
                        ? "bg-white text-navy"
                        : "text-white/70 hover:text-white"
                    )}
                    data-cursor="button"
                  >
                    Annual
                    <Badge variant="secondary" size="sm">
                      Save 15%
                    </Badge>
                  </button>
                </div>
              </div>
            </Container>
          </section>

          {/* Tier Gateway Cards - Interactive selector + calculator */}
          <section className="bg-white py-24 md:py-32 pricing-tiers">
            <Container>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Social Media Card - Coral stripe, scale hover */}
                <div>
                  <div
                    data-cursor="card"
                    onClick={() => setActiveTier(activeTier === "social" ? null : "social")}
                    className={cn(
                      "relative bg-white rounded-3xl border-2 shadow-lg overflow-hidden h-full cursor-pointer transition-all duration-300 pricing-tier-card",
                      activeTier === "social"
                        ? "ring-2 ring-coral border-coral scale-[1.03]"
                        : "border-border hover:scale-[1.03]",
                      activeTier && activeTier !== "social" && "opacity-80"
                    )}
                  >
                    {/* Coral accent stripe */}
                    <div className="h-2 bg-coral" />

                    {/* Content */}
                    <div className="p-8">
                      <div className="text-3xl mb-3">📱</div>
                      <h3 className="text-2xl font-heading font-bold text-primary mb-2">
                        Social Media
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Custom posts, scheduling, and reporting.
                      </p>
                      <div className="mb-6">
                        <span className="text-sm text-muted-foreground">From </span>
                        <span className="text-3xl font-bold text-primary">$300</span>
                        <span className="text-muted-foreground">/mo</span>
                      </div>
                      <Button variant="accent" className="w-full" onClick={(e) => { e.stopPropagation(); }}>
                        {activeTier === "social" ? "Configure Below" : "Build Your Package"}
                      </Button>
                      <Link href="/pricing/social" className="block mt-3 text-center text-sm text-coral hover:underline flex items-center justify-center gap-1" onClick={(e) => e.stopPropagation()}>
                        Open full page <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Website Card - Taller with glow hover, -mt-4 on desktop */}
                <div className="md:-mt-4">
                  <div
                    data-cursor="card"
                    onClick={() => setActiveTier(activeTier === "website" ? null : "website")}
                    className={cn(
                      "relative bg-navy/5 rounded-3xl shadow-lg overflow-hidden h-full cursor-pointer transition-all duration-300 pricing-tier-card",
                      activeTier === "website"
                        ? "ring-2 ring-coral border-coral shadow-[0_0_80px_rgba(226,121,94,0.3)]"
                        : "border border-navy/20 hover:shadow-[0_0_80px_rgba(226,121,94,0.3)]",
                      activeTier && activeTier !== "website" && "opacity-80"
                    )}
                  >
                    {/* Content */}
                    <div className="p-8 md:p-10">
                      <div className="text-3xl mb-3">💻</div>
                      <h3 className="text-2xl font-heading font-bold text-primary mb-2">
                        Websites
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Custom design that turns visitors into customers.
                      </p>
                      <div className="mb-6">
                        <span className="text-sm text-muted-foreground">From </span>
                        <span className="text-3xl font-bold text-primary">$700</span>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-2 hover:bg-coral hover:text-white hover:border-coral transition-colors"
                        onClick={(e) => { e.stopPropagation(); }}
                      >
                        {activeTier === "website" ? "Configure Below" : "Configure Your Site"}
                      </Button>
                      <Link href="/pricing/website" className="block mt-3 text-center text-sm text-coral hover:underline flex items-center justify-center gap-1" onClick={(e) => e.stopPropagation()}>
                        Open full page <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* E-commerce Card - Gradient border, lift+shadow hover */}
                <div>
                  <div
                    data-cursor="card"
                    onClick={() => setActiveTier(activeTier === "ecommerce" ? null : "ecommerce")}
                    className={cn(
                      "relative bg-white rounded-3xl shadow-lg overflow-hidden h-full cursor-pointer transition-all duration-300 pricing-tier-card",
                      activeTier === "ecommerce"
                        ? "ring-2 ring-coral -translate-y-2 shadow-[0_20px_40px_rgba(5,23,51,0.15)]"
                        : "hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(5,23,51,0.15)]",
                      activeTier && activeTier !== "ecommerce" && "opacity-80"
                    )}
                    style={{
                      background: activeTier === "ecommerce"
                        ? "linear-gradient(white, white) padding-box, linear-gradient(135deg, #E2795E, #FAB383) border-box"
                        : "linear-gradient(white, white) padding-box, linear-gradient(135deg, #E2795E, #FAB383) border-box",
                      border: "2px solid transparent",
                    }}
                  >
                    {/* Content */}
                    <div className="p-8">
                      <div className="text-3xl mb-3">🛒</div>
                      <h3 className="text-2xl font-heading font-bold text-primary mb-2">
                        E-Commerce
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Online stores that handle growth without breaking.
                      </p>
                      <div className="mb-6">
                        <span className="text-sm text-muted-foreground">From </span>
                        <span className="text-3xl font-bold text-primary">$1,500</span>
                      </div>
                      <Button variant="accent" className="w-full" onClick={(e) => { e.stopPropagation(); }}>
                        {activeTier === "ecommerce" ? "Configure Below" : "Build Your Store"}
                      </Button>
                      <Link href="/pricing/ecommerce" className="block mt-3 text-center text-sm text-coral hover:underline flex items-center justify-center gap-1" onClick={(e) => e.stopPropagation()}>
                        Open full page <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Container>

            {/* Calculator Section - conditionally rendered below cards */}
            <AnimatePresence mode="wait">
              {activeTier && (
                <motion.div
                  key={activeTier}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="mt-12"
                >
                  <Container>
                    {/* Different background per tier */}
                    <div
                      className={cn(
                        "rounded-3xl overflow-hidden",
                        activeTier === "social" && "bg-navy py-24 md:py-32",
                        activeTier === "website" && "bg-white py-28 md:py-36",
                        activeTier === "ecommerce" && "bg-white"
                      )}
                    >
                      <div className={activeTier === "ecommerce" ? "" : "container mx-auto px-4"}>
                        {activeTier === "social" && <SocialCalculator />}
                        {activeTier === "website" && <WebsiteCalculator />}
                        {activeTier === "ecommerce" && <EcommerceCalculator />}
                      </div>
                    </div>

                    {/* Switch tier button */}
                    <div className="text-center mt-8">
                      <button
                        onClick={() => setActiveTier(null)}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                        data-cursor="button"
                      >
                        Choose a different service
                      </button>
                    </div>
                  </Container>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* Hosting & Managed Plans - Navy background with glass cards */}
          <section className="bg-navy py-24 md:py-32">
            <Container>
              <div>
                {/* Section heading */}
                <div className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-4">
                    Looking for Hosting or Managed Services?
                  </h2>
                  <p className="text-lg text-white/70 max-w-2xl mx-auto">
                    Full-service plans with everything handled for you.
                  </p>
                </div>

                {/* Tabs - navy background with coral underline */}
                <div className="flex justify-center mb-12">
                  <div className="inline-flex bg-white/5 backdrop-blur-sm rounded-xl p-2">
                    <button
                      onClick={() => setActiveTab("hosting")}
                      className={cn(
                        "px-6 py-3 rounded-lg text-sm font-semibold transition-all relative",
                        activeTab === "hosting"
                          ? "text-white"
                          : "text-white/60 hover:text-white/80"
                      )}
                      data-cursor="button"
                    >
                      Website Hosting Plans
                      {activeTab === "hosting" && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab("managed")}
                      className={cn(
                        "px-6 py-3 rounded-lg text-sm font-semibold transition-all relative",
                        activeTab === "managed"
                          ? "text-white"
                          : "text-white/60 hover:text-white/80"
                      )}
                      data-cursor="button"
                    >
                      Managed Service Bundles
                      {activeTab === "managed" && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-coral"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </button>
                  </div>
                </div>

                {/* Tab description */}
                <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">
                  {activeTab === "hosting"
                    ? "For businesses that need reliable hosting with professional support. Add features as you grow."
                    : "Let us handle everything — your website, marketing, and brand management, all in one plan."}
                </p>

                {/* Plans grid */}
                <div
                  className={cn(
                    "grid gap-8",
                    activeTab === "hosting"
                      ? "md:grid-cols-3"
                      : "md:grid-cols-2 lg:grid-cols-4"
                  )}
                >
                  {(activeTab === "hosting" ? hostingPlans : managedPlans).map(
                    (plan) => (
                      <PricingCard
                        key={plan.name}
                        plan={plan}
                        isAnnual={isAnnual}
                        variant={activeTab}
                      />
                    )
                  )}
                </div>

                {/* Included with every plan - small line at bottom */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                    <span className="text-sm text-white/60 font-medium">
                      Included with every plan:
                    </span>
                    {includedWithEveryPlan.map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-coral" />
                        <span className="text-sm text-white/70">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </section>

          {/* FAQ - White background with edgy copy */}
          <section className="bg-white py-20 md:py-28">
            <Container size="md">
              <div className="text-center mb-12">
                <span className="text-coral font-semibold text-sm uppercase tracking-wider">
                  FAQ
                </span>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mt-4">
                  Questions? We&apos;ve Got Answers.
                </h2>
              </div>

              <div className="bg-muted rounded-3xl p-8 md:p-10">
                {faqs.map((faq, index) => (
                  <FAQItem key={faq.question} faq={faq} index={index} />
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-4 text-lg">
                  Still overthinking it? Let&apos;s talk.
                </p>
                <Link href="/contact">
                  <Button variant="accent" size="lg">
                    Contact Our Team
                  </Button>
                </Link>
              </div>
            </Container>
          </section>
        </main>
      <Footer />
    </>
  );
}

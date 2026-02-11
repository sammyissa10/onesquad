"use client";

import { useState, useRef } from "react";
import { motion, useInView, MotionConfig } from "framer-motion";
import Link from "next/link";
import { Check, HelpCircle, ChevronDown } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { pricingPlans, includedWithEveryPlan, faqs } from "@/lib/constants";
import { formatPrice, cn } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

// Hero animation variants - custom cubic bezier for smooth entrance
const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

// Tier card variants - staggered scale-in
const tierGridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const tierCardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

// Hosting card variants - fade-up with y offset
const hostingVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const hostingCardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

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

  // Different hover patterns per variant
  const hoverAnimation =
    variant === "hosting"
      ? { y: -8, boxShadow: "0 20px 40px rgba(5, 23, 51, 0.15)" }
      : {
          boxShadow: "0 0 80px rgba(226, 121, 94, 0.3)",
        };

  return (
    <motion.div
      variants={hostingCardVariants}
      whileHover={hoverAnimation}
      transition={{ duration: 0.3 }}
      data-cursor="card"
      className={cn(
        "relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border h-full flex flex-col",
        plan.highlighted
          ? "ring-2 ring-coral border-coral/50"
          : "border-white/10"
      )}
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
    </motion.div>
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const hostingPlans = pricingPlans.filter((p) => p.category === "hosting");
  const managedPlans = pricingPlans.filter((p) => p.category === "managed");

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
      <Breadcrumb items={[{ label: "Pricing" }]} />
      <MotionConfig reducedMotion="user">
        <main>
          {/* Hero - Navy background with oversized typography */}
          <section className="bg-navy py-32 md:py-40">
            <Container>
              <motion.div
                variants={heroVariants}
                initial="hidden"
                animate="visible"
                className="text-center max-w-4xl mx-auto"
              >
                <motion.h1
                  variants={heroItemVariants}
                  className="text-5xl md:text-6xl xl:text-7xl font-heading font-bold text-white mb-6"
                >
                  Stop Guessing.{" "}
                  <span className="text-coral">Start Building.</span>
                </motion.h1>
                <motion.p
                  variants={heroItemVariants}
                  className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto"
                >
                  Three ways to level up. Each one built different.
                </motion.p>

                {/* Billing toggle - pill style on navy */}
                <motion.div
                  variants={heroItemVariants}
                  className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full p-1.5"
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
                </motion.div>
              </motion.div>
            </Container>
          </section>

          {/* Tier Gateway Cards - White background with distinct cards */}
          <section className="bg-white py-24 md:py-32">
            <Container>
              <motion.div
                variants={tierGridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {/* Social Media Card - Coral stripe, scale hover */}
                <motion.div variants={tierCardVariants}>
                  <Link href="/pricing/social">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                      data-cursor="card"
                      className="relative bg-white rounded-3xl border-2 border-border shadow-lg overflow-hidden h-full"
                    >
                      {/* Coral accent stripe */}
                      <div className="h-2 bg-coral" />

                      {/* Content */}
                      <div className="p-8">
                        <div className="text-4xl mb-4">📱</div>
                        <h3 className="text-2xl font-heading font-bold text-primary mb-2">
                          Social Media
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Feed the algorithm. Own the conversation.
                        </p>
                        <div className="mb-6">
                          <span className="text-sm text-muted-foreground">From </span>
                          <span className="text-3xl font-bold text-primary">$300</span>
                          <span className="text-muted-foreground">/mo</span>
                        </div>
                        <Button variant="accent" className="w-full">
                          Build Your Package
                        </Button>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>

                {/* Website Card - Taller with glow hover, -mt-4 on desktop */}
                <motion.div variants={tierCardVariants} className="md:-mt-4">
                  <Link href="/pricing/website">
                    <motion.div
                      whileHover={{
                        boxShadow: "0 0 80px rgba(226, 121, 94, 0.3)",
                      }}
                      transition={{ duration: 0.3 }}
                      data-cursor="card"
                      className="relative bg-navy/5 rounded-3xl border border-navy/20 shadow-lg overflow-hidden h-full"
                    >
                      {/* Content */}
                      <div className="p-8 md:p-10">
                        <div className="text-4xl mb-4">💻</div>
                        <h3 className="text-2xl font-heading font-bold text-primary mb-2">
                          Websites
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Crafted to convert. Designed to impress.
                        </p>
                        <div className="mb-6">
                          <span className="text-sm text-muted-foreground">From </span>
                          <span className="text-3xl font-bold text-primary">$700</span>
                        </div>
                        <Button
                          variant="outline"
                          className="w-full border-2 hover:bg-coral hover:text-white hover:border-coral transition-colors"
                        >
                          Configure Your Site
                        </Button>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>

                {/* E-commerce Card - Gradient border, lift+shadow hover */}
                <motion.div variants={tierCardVariants}>
                  <Link href="/pricing/ecommerce">
                    <motion.div
                      whileHover={{
                        y: -8,
                        boxShadow: "0 20px 40px rgba(5, 23, 51, 0.15)",
                      }}
                      transition={{ duration: 0.3 }}
                      data-cursor="card"
                      className="relative bg-white rounded-3xl shadow-lg overflow-hidden h-full"
                      style={{
                        background: "linear-gradient(white, white) padding-box, linear-gradient(135deg, #E2795E, #FAB383) border-box",
                        border: "2px solid transparent",
                      }}
                    >
                      {/* Content */}
                      <div className="p-8">
                        <div className="text-4xl mb-4">🛒</div>
                        <h3 className="text-2xl font-heading font-bold text-primary mb-2">
                          E-Commerce
                        </h3>
                        <p className="text-muted-foreground mb-6">
                          Built to sell. Scaled to grow.
                        </p>
                        <div className="mb-6">
                          <span className="text-sm text-muted-foreground">From </span>
                          <span className="text-3xl font-bold text-primary">$1,500</span>
                        </div>
                        <Button variant="accent" className="w-full">
                          Build Your Store
                        </Button>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            </Container>
          </section>

          {/* Hosting & Managed Plans - Navy background with glass cards */}
          <section className="bg-navy py-24 md:py-32">
            <Container>
              <motion.div
                ref={ref}
                variants={hostingVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {/* Section heading */}
                <motion.div
                  variants={hostingCardVariants}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
                    Looking for Hosting or Managed Services?
                  </h2>
                  <p className="text-xl text-white/70 max-w-2xl mx-auto">
                    Full-service plans with everything handled for you.
                  </p>
                </motion.div>

                {/* Tabs - navy background with coral underline */}
                <motion.div
                  variants={hostingCardVariants}
                  className="flex justify-center mb-12"
                >
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
                </motion.div>

                {/* Tab description */}
                <motion.p
                  variants={hostingCardVariants}
                  className="text-center text-white/70 mb-12 max-w-2xl mx-auto"
                >
                  {activeTab === "hosting"
                    ? "For businesses that need reliable hosting with professional support. Add features as you grow."
                    : "Let us handle everything — your website, marketing, and brand management, all in one plan."}
                </motion.p>

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
                <motion.div
                  variants={hostingCardVariants}
                  className="mt-12 pt-8 border-t border-white/10"
                >
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
                </motion.div>
              </motion.div>
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
                  Questions? We've Got Answers.
                </h2>
              </div>

              <div className="bg-muted rounded-3xl p-8 md:p-10">
                {faqs.map((faq, index) => (
                  <FAQItem key={faq.question} faq={faq} index={index} />
                ))}
              </div>

              <div className="text-center mt-12">
                <p className="text-muted-foreground mb-4 text-lg">
                  Still overthinking it? Let's talk.
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
      </MotionConfig>
      <Footer />
    </>
  );
}

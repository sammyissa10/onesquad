"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Check, HelpCircle, ChevronDown } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { pricingPlans, includedWithEveryPlan, faqs } from "@/lib/constants";
import { formatPrice, cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
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
}: {
  plan: (typeof pricingPlans)[0];
  isAnnual: boolean;
}) {
  const price =
    plan.price === "custom"
      ? "custom"
      : isAnnual
      ? Math.round(plan.price * 0.85)
      : plan.price;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8 }}
      className={cn(
        "relative bg-white rounded-2xl overflow-hidden shadow-xl h-full flex flex-col",
        plan.highlighted
          ? "ring-2 ring-accent shadow-accent/20"
          : "shadow-primary/5"
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
        <h3 className="text-xl font-bold text-primary mb-1">{plan.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{plan.focus}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold text-primary">
            {formatPrice(price)}
          </span>
          {price !== "custom" && (
            <span className="text-muted-foreground">/month</span>
          )}
        </div>
        {isAnnual && plan.price !== "custom" && (
          <p className="text-sm text-green-600 mt-1">Save 15% with annual</p>
        )}
      </div>

      {/* Quick stats */}
      <div className="px-6 py-4 bg-muted/50 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Storage</p>
          <p className="font-semibold text-primary">{plan.storage}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Work Hours</p>
          <p className="font-semibold text-primary">{plan.hours}</p>
        </div>
      </div>

      {/* Features */}
      <div className="p-6 flex-1">
        <ul className="space-y-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">{feature}</span>
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
      >
        <span className="font-semibold text-primary group-hover:text-accent transition-colors pr-4">
          {faq.question}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform flex-shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
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
      </AnimatePresence>
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

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <Section background="gradient" className="pt-32">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                Pricing
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
                Transparent Pricing.{" "}
                <span className="text-secondary">No Surprises.</span>
              </h1>
              <p className="text-xl text-white/80 mb-8">
                Choose the plan that fits your business today—and scale up as
                you grow. All plans include 24/7 support, security, and daily
                backups.
              </p>

              {/* Billing toggle */}
              <div className="inline-flex items-center gap-4 bg-white/10 rounded-full p-1.5">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium transition-all",
                    !isAnnual
                      ? "bg-white text-primary"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                    isAnnual
                      ? "bg-white text-primary"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  Annual
                  <Badge variant="secondary" size="sm">
                    Save 15%
                  </Badge>
                </button>
              </div>
            </motion.div>
          </Container>
        </Section>

        {/* Included with every plan */}
        <Section background="white" className="py-8">
          <Container>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <span className="text-sm text-muted-foreground font-medium">
                Included with every plan:
              </span>
              {includedWithEveryPlan.map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-accent" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Plan tabs */}
        <Section background="muted">
          <Container>
            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Tabs */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center mb-12"
              >
                <div className="inline-flex bg-white rounded-xl p-1.5 shadow-lg">
                  <button
                    onClick={() => setActiveTab("hosting")}
                    className={cn(
                      "px-8 py-3 rounded-lg text-sm font-semibold transition-all",
                      activeTab === "hosting"
                        ? "bg-primary text-white"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    Website Hosting Plans
                  </button>
                  <button
                    onClick={() => setActiveTab("managed")}
                    className={cn(
                      "px-8 py-3 rounded-lg text-sm font-semibold transition-all",
                      activeTab === "managed"
                        ? "bg-primary text-white"
                        : "text-muted-foreground hover:text-primary"
                    )}
                  >
                    Managed Service Bundles
                  </button>
                </div>
              </motion.div>

              {/* Tab description */}
              <motion.p
                variants={itemVariants}
                className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
              >
                {activeTab === "hosting"
                  ? "Perfect for businesses that need reliable hosting with professional support and incremental features."
                  : "Let us handle everything—your website, marketing, and brand management with full-service solutions."}
              </motion.p>

              {/* Plans grid */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
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
                      />
                    )
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section background="white">
          <Container size="md">
            <div className="text-center mb-12">
              <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mt-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              {faqs.map((faq, index) => (
                <FAQItem key={faq.question} faq={faq} index={index} />
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Still have questions?
              </p>
              <Link href="/contact">
                <Button variant="accent">Contact Our Team</Button>
              </Link>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

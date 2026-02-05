"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { pricingPlans } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function PricingPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Show the most popular plans
  const featuredPlans = pricingPlans.filter(
    (p) => p.name === "Pro" || p.name === "DigitalSquad" || p.name === "OneSquad"
  );

  return (
    <Section background="muted">
      <Container>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Pricing
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
              Transparent Pricing.{" "}
              <span className="text-accent">No Surprises.</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose the plan that fits your business today—and scale up as you
              grow. All plans include 24/7 support, security, and daily backups.
            </p>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {featuredPlans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={`relative bg-white rounded-2xl overflow-hidden shadow-xl ${
                  plan.highlighted
                    ? "ring-2 ring-accent shadow-accent/20"
                    : "shadow-primary/5"
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute top-4 right-4">
                    <Badge variant="accent">{plan.badge}</Badge>
                  </div>
                )}

                {/* Header */}
                <div className="p-6 pb-4">
                  <h3 className="text-xl font-bold text-primary mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {plan.focus}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-primary">
                      {formatPrice(plan.price)}
                    </span>
                    {plan.price !== "custom" && (
                      <span className="text-muted-foreground">/month</span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="p-6 pt-0">
                  <ul className="space-y-3 mb-6">
                    {plan.features.slice(0, 5).map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                    {plan.features.length > 5 && (
                      <li className="text-sm text-accent font-medium">
                        + {plan.features.length - 5} more features
                      </li>
                    )}
                  </ul>

                  <Link href="/pricing" className="block">
                    <Button
                      variant={plan.highlighted ? "accent" : "outline"}
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View all plans link */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <Link href="/pricing">
              <Button variant="ghost" rightIcon={<ArrowRight />}>
                View All Plans & Compare Features
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

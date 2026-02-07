"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TemplateGridCard } from "@/components/ui/TemplateCard";
import { templates } from "@/lib/templateData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
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

// Show 6 templates on homepage — popular ones first
const previewTemplates = [
  ...templates.filter((t) => t.popular),
  ...templates.filter((t) => !t.popular),
].slice(0, 6);

export function PortfolioPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <Section id="portfolio" background="muted">
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
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Portfolio
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
              Pick a Template.{" "}
              <span className="text-accent">Make It Yours.</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Start with a professionally designed template, then customize every
              detail to match your brand. Transparent pricing included.
            </p>
          </motion.div>

          {/* Templates Grid — 6 compact cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewTemplates.map((template) => (
              <TemplateGridCard key={template.id} template={template} />
            ))}
          </div>

          {/* View All + Custom CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12 space-y-4"
          >
            <Link href="/portfolio">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={18} />}
              >
                View All Templates ({templates.length})
              </Button>
            </Link>
            <p className="text-muted-foreground">
              Need something unique?{" "}
              <Link
                href="/contact"
                className="text-accent font-semibold hover:underline"
              >
                Request a custom design
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

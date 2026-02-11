"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TemplateGridCard } from "@/components/ui/TemplateCard";
import { templates } from "@/lib/templateData";

import { scaleIn, stagger } from "@/lib/animations";

const containerVariants = stagger(0.08);
const itemVariants = scaleIn;

// Show 6 templates on homepage — popular ones first
const previewTemplates = [
  ...templates.filter((t) => t.popular),
  ...templates.filter((t) => !t.popular),
].slice(0, 6);

export function PortfolioPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="portfolio" className="bg-peach/10 text-navy py-16 md:py-24">
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
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Real Sites. Real Businesses.{" "}
              <span className="text-coral">Zero Templates.</span>
            </h2>
            <p className="text-navy/70 text-lg">
              Every project is built from scratch to match your brand. No cookie-cutter designs.
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
            <p className="text-navy/70">
              Need something unique?{" "}
              <Link
                href="/contact"
                className="text-coral font-semibold hover:underline"
              >
                Request a custom design
              </Link>
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

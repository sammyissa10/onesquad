"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, Eye, Star } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { templates, categoryLabels } from "@/lib/templateData";

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

function TemplateCard({ template }: { template: (typeof templates)[0] }) {
  return (
    <motion.div variants={itemVariants} className="group flex flex-col">
      <div className="relative rounded-xl overflow-hidden border border-border bg-white shadow-sm hover:shadow-xl transition-shadow duration-300">
        <div className="aspect-[3/4] relative overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={template.screenshot}
            alt={template.name}
            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2 z-10">
            {template.popular && (
              <Badge
                variant="accent"
                className="flex items-center gap-1 shadow-lg text-xs"
              >
                <Star size={10} className="fill-current" /> Popular
              </Badge>
            )}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
            <Link
              href={`/templates/${template.id}`}
              className="bg-white text-primary px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-accent hover:text-white transition-colors shadow-lg flex items-center gap-2"
            >
              <Eye size={16} />
              View
            </Link>
            <a
              href={template.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-accent/90 transition-colors shadow-lg flex items-center gap-2"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          </div>
        </div>
      </div>

      <div className="pt-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link
              href={`/templates/${template.id}`}
              className="font-bold text-primary hover:text-accent transition-colors text-base"
            >
              {template.name}
            </Link>
            <p className="text-sm text-muted-foreground mt-0.5">
              {categoryLabels[template.category] || template.category}
            </p>
          </div>
          <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full flex-shrink-0 mt-0.5">
            {template.price}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export function PortfolioPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <Section id="portfolio" background="white">
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
              detail to match your brand. All templates are fully responsive and
              built for performance.
            </p>
          </motion.div>

          {/* Templates Grid — show 6 */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {previewTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
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

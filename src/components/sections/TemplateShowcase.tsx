"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, Eye, Star } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { categories, templates } from "@/lib/templateData";
import { TemplatePreview } from "@/components/ui/TemplatePreview";

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

function TemplateCard({ template }: { template: typeof templates[0] }) {
  return (
    <Link href={`/templates/${template.id}`}>
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -8 }}
        className="group h-full"
      >
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
        {/* Template Preview */}
        <div className="h-48 relative overflow-hidden">
          <TemplatePreview
            templateId={template.id}
            className="absolute inset-0 w-full h-full group-hover:scale-110 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2 z-10">
            {template.popular && (
              <Badge variant="secondary" className="flex items-center gap-1 shadow-lg">
                <Star size={12} className="fill-current" /> Popular
              </Badge>
            )}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <Link
              href={`/templates/${template.id}`}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors"
            >
              <Eye size={18} />
            </Link>
            <Link
              href={`/templates/${template.id}`}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors"
            >
              <ExternalLink size={18} />
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-primary group-hover:text-accent transition-colors">
              {template.name}
            </h3>
            <span className="text-xs font-medium text-accent bg-accent/10 px-2 py-1 rounded">
              {template.price}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-4 flex-1">
            {template.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {template.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
    </Link>
  );
}

export function TemplateShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const filteredTemplates =
    activeCategory === "all"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  return (
    <Section id="templates" background="muted">
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
              Our Work{" "}
              <span className="text-accent">Speaks for Itself</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore our portfolio of professionally designed websites.
              Each project showcases our commitment to quality and results.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            variants={itemVariants}
            className="flex flex-nowrap overflow-x-auto gap-3 mb-12 pb-2 -mx-4 px-4 lg:flex-wrap lg:justify-center lg:mx-0 lg:px-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                  activeCategory === category.id
                    ? "bg-accent text-white shadow-lg shadow-accent/30"
                    : "bg-white text-muted-foreground hover:bg-accent/10 hover:text-accent"
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Templates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Can&apos;t find what you&apos;re looking for?
            </p>
            <Link href="/contact">
              <Button variant="accent" rightIcon={<ArrowRight size={18} />}>
                Request Custom Design
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

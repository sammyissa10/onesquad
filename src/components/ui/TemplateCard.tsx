"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, ExternalLink, Star, Check } from "lucide-react";
import {
  type TemplateData,
  type PriceBreakdownItem,
  categoryLabels,
  getTemplateBreakdown,
} from "@/lib/templateData";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/**
 * Full-width showcase card for the portfolio page.
 * Large screenshot on the left, info + price breakdown on the right.
 */
export function TemplateShowcaseCard({
  template,
}: {
  template: TemplateData;
}) {
  const breakdown = getTemplateBreakdown(template);

  return (
    <motion.div variants={itemVariants} className="group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/60 grid grid-cols-1 lg:grid-cols-[58%_42%]">
        {/* Screenshot Side */}
        <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[420px] overflow-hidden">
          <img
            src={template.screenshot}
            alt={template.name}
            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
            loading="lazy"
          />

          {/* Popular badge */}
          {template.popular && (
            <div className="absolute top-4 left-4 z-10">
              <span className="bg-accent/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                <Star size={12} className="fill-current" /> Popular
              </span>
            </div>
          )}

          {/* Hover overlay with CTAs */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center gap-4">
            <Link
              href={`/templates/${template.id}`}
              className="bg-white/15 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-white/25 transition-colors border border-white/20 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300"
            >
              <Eye size={16} /> View Details
            </Link>
            <a
              href={template.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-accent/80 transition-colors shadow-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 delay-75"
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          </div>
        </div>

        {/* Content + Breakdown Side */}
        <div className="p-6 lg:p-8 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-full">
              {categoryLabels[template.category] || template.category}
            </span>
            {template.popular && (
              <span className="text-xs font-semibold text-highlight bg-highlight/10 px-2.5 py-1 rounded-full">
                Best Seller
              </span>
            )}
          </div>

          <Link href={`/templates/${template.id}`}>
            <h3 className="text-xl lg:text-2xl font-bold text-primary hover:text-accent transition-colors mb-2">
              {template.name}
            </h3>
          </Link>

          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {template.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {template.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 bg-muted rounded-md text-[11px] font-medium text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className="bg-muted/60 rounded-xl p-4 mb-5 flex-1">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
              What&apos;s Included
            </h4>
            <div className="space-y-2">
              {breakdown.map((item: PriceBreakdownItem) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Check
                      size={14}
                      className={
                        item.value === "Included"
                          ? "text-green-500"
                          : "text-accent"
                      }
                    />
                    {item.label}
                  </span>
                  <span
                    className={`font-semibold ${
                      item.value === "Included"
                        ? "text-green-600 text-xs"
                        : "text-primary"
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-border mt-3 pt-3 flex items-center justify-between">
              <span className="font-bold text-primary">Starting from</span>
              <span className="text-xl font-bold text-accent">
                {template.price.replace("From ", "")}
              </span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3">
            <Link
              href={`/templates/${template.id}`}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-accent text-white px-5 py-3 rounded-xl text-sm font-semibold hover:bg-accent/90 transition-colors shadow-md shadow-accent/25"
            >
              View Template
            </Link>
            <a
              href={template.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-border text-primary px-5 py-3 rounded-xl text-sm font-semibold hover:border-accent hover:text-accent transition-colors"
            >
              <ExternalLink size={16} /> Demo
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Compact grid card for the homepage portfolio preview.
 * Screenshot with overlaid info at bottom.
 */
export function TemplateGridCard({
  template,
}: {
  template: TemplateData;
}) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className="relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200/60">
        {/* Screenshot */}
        <div className="aspect-[16/10] relative overflow-hidden">
          <img
            src={template.screenshot}
            alt={template.name}
            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.05] transition-transform duration-700"
            loading="lazy"
          />

          {template.popular && (
            <div className="absolute top-3 left-3 z-10">
              <span className="bg-accent/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
                <Star size={10} className="fill-current" /> Popular
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center gap-3">
            <Link
              href={`/templates/${template.id}`}
              className="bg-white/90 backdrop-blur-sm text-primary px-4 py-2 rounded-full text-xs font-semibold hover:bg-white transition-colors shadow-lg flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
            >
              <Eye size={14} /> View
            </Link>
            <a
              href={template.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-accent/90 transition-colors shadow-lg flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75"
            >
              <ExternalLink size={14} /> Demo
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <Link
              href={`/templates/${template.id}`}
              className="font-bold text-primary hover:text-accent transition-colors text-sm leading-tight"
            >
              {template.name}
            </Link>
            <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded-full flex-shrink-0">
              {template.price.replace("From ", "")}
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground">
            {categoryLabels[template.category] || template.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

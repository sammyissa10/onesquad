"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, ExternalLink, Star, Check, Sparkles, Crown, Zap } from "lucide-react";
import {
  type TemplateData,
  type PriceBreakdownItem,
  categoryLabels,
  getTemplateBreakdown,
  getPriceTier,
} from "@/lib/templateData";

// ── Per-category accent colors ──────────────────────────────────────
interface CategoryTheme {
  bg: string;       // solid bg for buttons/badges
  text: string;     // text color
  light: string;    // light bg tint for cards
  border: string;   // border color
  gradient: string; // gradient accent bar
  glow: string;     // shadow/glow color
}

const categoryThemes: Record<string, CategoryTheme> = {
  business:     { bg: "bg-blue-600",    text: "text-blue-600",    light: "bg-blue-50",    border: "border-blue-200",    gradient: "from-blue-500 to-blue-700",    glow: "shadow-blue-500/20" },
  ecommerce:    { bg: "bg-amber-600",   text: "text-amber-600",   light: "bg-amber-50",   border: "border-amber-200",   gradient: "from-amber-500 to-orange-600", glow: "shadow-amber-500/20" },
  portfolio:    { bg: "bg-violet-600",  text: "text-violet-600",  light: "bg-violet-50",  border: "border-violet-200",  gradient: "from-violet-500 to-purple-700",glow: "shadow-violet-500/20" },
  restaurant:   { bg: "bg-rose-600",    text: "text-rose-600",    light: "bg-rose-50",    border: "border-rose-200",    gradient: "from-rose-500 to-pink-600",    glow: "shadow-rose-500/20" },
  healthcare:   { bg: "bg-teal-600",    text: "text-teal-600",    light: "bg-teal-50",    border: "border-teal-200",    gradient: "from-teal-500 to-cyan-600",    glow: "shadow-teal-500/20" },
  construction: { bg: "bg-orange-600",  text: "text-orange-600",  light: "bg-orange-50",  border: "border-orange-200",  gradient: "from-orange-500 to-red-600",   glow: "shadow-orange-500/20" },
  plumbing:     { bg: "bg-sky-600",     text: "text-sky-600",     light: "bg-sky-50",     border: "border-sky-200",     gradient: "from-sky-500 to-blue-600",     glow: "shadow-sky-500/20" },
  retail:       { bg: "bg-pink-600",    text: "text-pink-600",    light: "bg-pink-50",    border: "border-pink-200",    gradient: "from-pink-500 to-rose-600",    glow: "shadow-pink-500/20" },
  legal:        { bg: "bg-slate-700",   text: "text-slate-700",   light: "bg-slate-50",   border: "border-slate-300",   gradient: "from-slate-600 to-gray-700",   glow: "shadow-slate-500/20" },
  realestate:   { bg: "bg-emerald-600", text: "text-emerald-600", light: "bg-emerald-50", border: "border-emerald-200", gradient: "from-emerald-500 to-green-600",glow: "shadow-emerald-500/20" },
  fitness:      { bg: "bg-red-600",     text: "text-red-600",     light: "bg-red-50",     border: "border-red-200",     gradient: "from-red-500 to-rose-700",     glow: "shadow-red-500/20" },
  education:    { bg: "bg-indigo-600",  text: "text-indigo-600",  light: "bg-indigo-50",  border: "border-indigo-200",  gradient: "from-indigo-500 to-blue-700",  glow: "shadow-indigo-500/20" },
  barbershop:   { bg: "bg-amber-700",   text: "text-amber-700",   light: "bg-amber-50",   border: "border-amber-300",   gradient: "from-amber-600 to-yellow-700", glow: "shadow-amber-600/20" },
  landscaping:  { bg: "bg-green-600",   text: "text-green-600",   light: "bg-green-50",   border: "border-green-200",   gradient: "from-green-500 to-emerald-600",glow: "shadow-green-500/20" },
  remodeling:   { bg: "bg-yellow-700",  text: "text-yellow-700",  light: "bg-yellow-50",  border: "border-yellow-300",  gradient: "from-yellow-600 to-amber-700", glow: "shadow-yellow-600/20" },
  dashboard:    { bg: "bg-cyan-600",    text: "text-cyan-600",    light: "bg-cyan-50",    border: "border-cyan-200",    gradient: "from-cyan-500 to-teal-600",    glow: "shadow-cyan-500/20" },
  automotive:   { bg: "bg-zinc-700",    text: "text-zinc-600",    light: "bg-zinc-50",    border: "border-zinc-300",    gradient: "from-zinc-600 to-gray-800",    glow: "shadow-zinc-500/20" },
  cleaning:     { bg: "bg-sky-500",     text: "text-sky-500",     light: "bg-sky-50",     border: "border-sky-200",     gradient: "from-sky-400 to-blue-500",     glow: "shadow-sky-400/20" },
};

const defaultTheme: CategoryTheme = {
  bg: "bg-accent", text: "text-accent", light: "bg-accent/5", border: "border-accent/20",
  gradient: "from-accent to-accent/80", glow: "shadow-accent/20",
};

function getTheme(category: string): CategoryTheme {
  return categoryThemes[category] || defaultTheme;
}

// ── Card style variants ─────────────────────────────────────────────
// 0 = Light (white bg, colored accents)
// 1 = Dark  (dark navy bg, light text)
// 2 = Tinted (category-colored background tint)
type CardVariant = 0 | 1 | 2;

/**
 * Showcase card for the portfolio page.
 * Each card looks distinct via:
 *   - Per-category color theme
 *   - Alternating card style (light / dark / tinted)
 *   - Tier-based animation intensity
 */
export function TemplateShowcaseCard({
  template,
  index = 0,
}: {
  template: TemplateData;
  index?: number;
}) {
  const breakdown = getTemplateBreakdown(template);
  const tier = getPriceTier(template);
  const theme = getTheme(template.category);
  const variant: CardVariant = (index % 3) as CardVariant;

  // Tier-based entrance animation
  const entranceVariant = {
    hidden: {
      opacity: 0,
      y: tier >= 5 ? 50 : 30,
      scale: tier >= 5 ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: tier >= 5 ? 0.7 : 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const hoverY = tier >= 6 ? -10 : tier >= 4 ? -6 : tier >= 2 ? -4 : -2;

  // ── Variant-dependent styles ──

  // Card background
  const cardBg =
    variant === 1 ? "bg-[#0F172A]" :
    variant === 2 ? theme.light :
    "bg-white";

  // Card border
  const cardBorder =
    variant === 1 ? "border border-white/10" :
    variant === 2 ? `border ${theme.border}` :
    "border border-gray-200/60";

  // Text colors
  const headingColor =
    variant === 1 ? "text-white hover:text-white/80" :
    "text-primary hover:text-primary/70";

  const descColor =
    variant === 1 ? "text-gray-300" :
    "text-muted-foreground";

  const priceColor =
    variant === 1 ? "text-white" :
    theme.text;

  // Category badge
  const badgeClasses =
    variant === 1 ? `${theme.bg} text-white` :
    `${theme.light} ${theme.text}`;

  // Breakdown panel
  const breakdownBg =
    variant === 1 ? "bg-white/5 border border-white/10" :
    variant === 2 ? "bg-white/70 border border-white/40" :
    "bg-gray-50 border border-gray-100";

  const breakdownLabel =
    variant === 1 ? "text-gray-400" :
    "text-muted-foreground";

  const breakdownValue =
    variant === 1 ? "text-white" :
    "text-primary";

  const breakdownHeading =
    variant === 1 ? "text-gray-300" :
    "text-primary";

  const totalLabel =
    variant === 1 ? "text-white font-bold" :
    "text-primary font-bold";

  const totalBorder =
    variant === 1 ? "border-white/10" :
    "border-border";

  // CTA button
  const ctaPrimary =
    variant === 1 ? `${theme.bg} text-white hover:opacity-90 shadow-lg ${theme.glow}` :
    `${theme.bg} text-white hover:opacity-90 shadow-md ${theme.glow}`;

  const ctaSecondary =
    variant === 1 ? "border-2 border-white/20 text-white hover:border-white/40" :
    `border-2 ${theme.border} ${theme.text} hover:opacity-80`;

  // Tech stack pill
  const techPill =
    variant === 1 ? "bg-white/10 text-gray-300" :
    variant === 2 ? "bg-white/60 text-muted-foreground" :
    "bg-muted text-muted-foreground";

  // Accent bar
  const accentBar =
    tier >= 7 ? `h-1.5 bg-gradient-to-r ${theme.gradient}` :
    tier >= 5 ? `h-1 bg-gradient-to-r ${theme.gradient}` :
    tier >= 3 ? `h-0.5 bg-gradient-to-r ${theme.gradient}` :
    `h-0.5 bg-gradient-to-r ${theme.gradient} opacity-40`;

  // Tier badge
  const tierBadge = (() => {
    if (tier >= 7) return { icon: Crown, label: "Enterprise", color: "text-amber-400 bg-amber-900/40" };
    if (tier >= 5) return { icon: Sparkles, label: "Premium", color: variant === 1 ? "text-violet-300 bg-violet-900/40" : "text-violet-600 bg-violet-50" };
    if (tier >= 3) return { icon: Zap, label: "Pro", color: variant === 1 ? "text-blue-300 bg-blue-900/40" : "text-blue-600 bg-blue-50" };
    return null;
  })();

  // Shadow
  const cardShadow =
    tier >= 5 ? `shadow-xl hover:shadow-2xl ${theme.glow}` :
    "shadow-lg hover:shadow-xl";

  return (
    <motion.div
      variants={entranceVariant}
      whileHover={{ y: hoverY }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group"
    >
      <div
        className={`${cardBg} rounded-2xl overflow-hidden ${cardShadow} ${cardBorder} flex flex-col transition-all duration-500 relative`}
      >
        {/* Accent bar */}
        <div className={accentBar} />

        {/* Screenshot */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={template.screenshot}
            alt={template.name}
            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
            loading="lazy"
          />

          {/* Popular badge */}
          {template.popular && (
            <div className="absolute top-4 left-4 z-10">
              <span className={`${theme.bg} text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg`}>
                <Star size={12} className="fill-current" /> Popular
              </span>
            </div>
          )}

          {/* Tier badge */}
          {tierBadge && (
            <div className="absolute top-4 right-4 z-10">
              <span
                className={`${tierBadge.color} text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-md backdrop-blur-sm`}
              >
                <tierBadge.icon size={12} /> {tierBadge.label}
              </span>
            </div>
          )}

          {/* Hover overlay */}
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
              className={`${theme.bg} text-white px-6 py-3 rounded-full text-sm font-semibold hover:opacity-90 transition-all shadow-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 duration-300 delay-75`}
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8 flex flex-col">
          {/* Badges */}
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClasses}`}>
              {categoryLabels[template.category] || template.category}
            </span>
            {template.popular && (
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
                Best Seller
              </span>
            )}
          </div>

          <Link href={`/templates/${template.id}`}>
            <h3 className={`text-xl lg:text-2xl font-bold transition-colors mb-2 ${headingColor}`}>
              {template.name}
            </h3>
          </Link>

          <p className={`text-sm leading-relaxed mb-4 ${descColor}`}>
            {template.description}
          </p>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {template.techStack.map((tech) => (
              <span
                key={tech}
                className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${techPill}`}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Price Breakdown */}
          <div className={`rounded-xl p-4 mb-5 flex-1 ${breakdownBg}`}>
            <h4 className={`text-xs font-bold uppercase tracking-wider mb-3 ${breakdownHeading}`}>
              What&apos;s Included
            </h4>
            <div className="space-y-2">
              {breakdown.map((item: PriceBreakdownItem) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className={`flex items-center gap-2 ${breakdownLabel}`}>
                    <Check size={14} className={theme.text} />
                    {item.label}
                  </span>
                  <span className={`font-semibold ${breakdownValue}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className={`border-t ${totalBorder} mt-3 pt-3 flex items-center justify-between`}>
              <span className={totalLabel}>Starting from</span>
              <span className={`text-xl font-bold ${priceColor}`}>
                {template.price.replace("From ", "")}
              </span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3">
            <Link
              href={`/templates/${template.id}`}
              className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${ctaPrimary}`}
            >
              View Template
            </Link>
            <a
              href={template.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-colors ${ctaSecondary}`}
            >
              <ExternalLink size={16} /> Demo
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Homepage grid card ──────────────────────────────────────────────

const gridItemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function TemplateGridCard({
  template,
}: {
  template: TemplateData;
}) {
  const theme = getTheme(template.category);

  return (
    <motion.div
      variants={gridItemVariants}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className="relative rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200/60">
        <div className={`h-0.5 bg-gradient-to-r ${theme.gradient}`} />

        <div className="aspect-[16/10] relative overflow-hidden">
          <img
            src={template.screenshot}
            alt={template.name}
            className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.05] transition-transform duration-700"
            loading="lazy"
          />

          {template.popular && (
            <div className="absolute top-3 left-3 z-10">
              <span className={`${theme.bg} text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg`}>
                <Star size={10} className="fill-current" /> Popular
              </span>
            </div>
          )}

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
              className={`${theme.bg} text-white px-4 py-2 rounded-full text-xs font-semibold hover:opacity-90 transition-all shadow-lg flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300 delay-75`}
            >
              <ExternalLink size={14} /> Demo
            </a>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <Link
              href={`/templates/${template.id}`}
              className="font-bold text-primary hover:text-accent transition-colors text-sm leading-tight"
            >
              {template.name}
            </Link>
            <span className={`text-xs font-bold ${theme.text} ${theme.light} px-2 py-0.5 rounded-full flex-shrink-0`}>
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

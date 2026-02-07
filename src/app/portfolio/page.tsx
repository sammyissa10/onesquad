"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  LayoutGrid,
  Briefcase,
  Wrench,
  Heart,
  Palette,
  ShoppingBag,
} from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { TemplateShowcaseCard } from "@/components/ui/TemplateCard";
import {
  templates,
  categoryGroups,
  categoryLabels,
} from "@/lib/templateData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
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

const groupIcons: Record<string, React.ElementType> = {
  all: LayoutGrid,
  "business-professional": Briefcase,
  "services-trades": Wrench,
  "health-lifestyle": Heart,
  "creative-education": Palette,
  "ecommerce-retail": ShoppingBag,
};

export default function PortfolioPage() {
  const [activeGroup, setActiveGroup] = useState("all");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const currentGroup = categoryGroups.find((g) => g.id === activeGroup);
  const subCategories = currentGroup?.categories || [];

  const filteredTemplates = (() => {
    if (activeGroup === "all") return templates;
    if (activeCategory) {
      return templates.filter((t) => t.category === activeCategory);
    }
    return templates.filter((t) => subCategories.includes(t.category));
  })();

  // Sort: popular first
  const sortedTemplates = [
    ...filteredTemplates.filter((t) => t.popular),
    ...filteredTemplates.filter((t) => !t.popular),
  ];

  const groupCounts: Record<string, number> = {};
  for (const group of categoryGroups) {
    if (group.id === "all") {
      groupCounts[group.id] = templates.length;
    } else {
      groupCounts[group.id] = templates.filter((t) =>
        group.categories.includes(t.category)
      ).length;
    }
  }

  const handleGroupClick = (groupId: string) => {
    setActiveGroup(groupId);
    setActiveCategory(null);
  };

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: "Portfolio" }]} />
      <main>
        {/* Hero */}
        <Section background="gradient">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                Our Work
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
                Website Templates{" "}
                <span className="text-secondary">That Convert</span>
              </h1>
              <p className="text-xl text-white/80">
                Browse {templates.length}+ professionally designed templates.
                Each one includes transparent pricing with a full breakdown of
                what&apos;s included.
              </p>
            </motion.div>
          </Container>
        </Section>

        {/* Templates */}
        <Section background="muted">
          <Container>
            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Primary Group Filter */}
              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-3 mb-4"
              >
                {categoryGroups.map((group) => {
                  const Icon = groupIcons[group.id] || LayoutGrid;
                  const isActive = activeGroup === group.id;
                  return (
                    <button
                      key={group.id}
                      onClick={() => handleGroupClick(group.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-primary text-white shadow-lg shadow-primary/25"
                          : "bg-white text-muted-foreground hover:bg-primary/10 hover:text-primary shadow-sm"
                      }`}
                    >
                      <Icon size={16} />
                      {group.label}
                      <span
                        className={`text-xs ${
                          isActive ? "text-white/70" : "opacity-50"
                        }`}
                      >
                        {groupCounts[group.id]}
                      </span>
                    </button>
                  );
                })}
              </motion.div>

              {/* Secondary Sub-category Filter */}
              <AnimatePresence>
                {activeGroup !== "all" && subCategories.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-wrap justify-center gap-2 mb-8 pt-2">
                      <button
                        onClick={() => setActiveCategory(null)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                          activeCategory === null
                            ? "bg-accent text-white shadow-md"
                            : "bg-white text-muted-foreground hover:bg-accent/10 hover:text-accent"
                        }`}
                      >
                        All {currentGroup?.label}
                      </button>
                      {subCategories.map((catId) => {
                        const count = templates.filter(
                          (t) => t.category === catId
                        ).length;
                        return (
                          <button
                            key={catId}
                            onClick={() => handleCategoryClick(catId)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                              activeCategory === catId
                                ? "bg-accent text-white shadow-md"
                                : "bg-white text-muted-foreground hover:bg-accent/10 hover:text-accent"
                            }`}
                          >
                            {categoryLabels[catId] || catId}{" "}
                            <span className="opacity-50">{count}</span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {activeGroup === "all" && <div className="mb-8" />}

              {/* Template Showcase — one per row */}
              <div className="space-y-8">
                {sortedTemplates.map((template) => (
                  <TemplateShowcaseCard
                    key={template.id}
                    template={template}
                  />
                ))}
              </div>

              {/* Empty state */}
              {filteredTemplates.length === 0 && (
                <motion.div
                  variants={itemVariants}
                  className="text-center py-16"
                >
                  <p className="text-muted-foreground text-lg mb-4">
                    No templates found in this category.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => handleGroupClick("all")}
                  >
                    View All Templates
                  </Button>
                </motion.div>
              )}

              {/* Bottom CTA */}
              <motion.div
                variants={itemVariants}
                className="mt-16 bg-gradient-to-r from-primary to-primary/90 rounded-2xl p-8 md:p-12 text-center"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Don&apos;t See What You Need?
                </h2>
                <p className="text-white/80 text-lg mb-6 max-w-xl mx-auto">
                  We&apos;ll design a custom website tailored to your brand. Use
                  our price calculator or reach out for a free quote.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/pricing-calculator">
                    <Button variant="secondary" size="lg">
                      Price Calculator
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/30 text-white hover:bg-white/10"
                      rightIcon={<ArrowRight size={18} />}
                    >
                      Request Custom Design
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

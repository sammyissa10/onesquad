"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  LayoutGrid,
  Briefcase,
  Wrench,
  Heart,
  Palette,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { PortfolioCard } from "@/components/ui/TemplateCard";
import {
  templates,
  categoryGroups,
  categoryLabels,
} from "@/lib/templateData";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, scaleReveal, TRIGGERS } from "@/lib/scrollAnimations";

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

  const currentGroup = categoryGroups.find((g) => g.id === activeGroup);
  const subCategories = currentGroup?.categories || [];

  const filteredTemplates = (() => {
    if (activeGroup === "all") return templates;
    return templates.filter((t) => subCategories.includes(t.category));
  })();

  // Interleave popular and non-popular templates for visual rhythm
  const popularTemplates = filteredTemplates.filter((t) => t.popular);
  const normalTemplates = filteredTemplates.filter((t) => !t.popular);
  const sortedTemplates: typeof templates = [];

  let normalIndex = 0;
  let popularIndex = 0;

  while (normalIndex < normalTemplates.length || popularIndex < popularTemplates.length) {
    // Add 3-4 normal templates
    for (let i = 0; i < 3 && normalIndex < normalTemplates.length; i++) {
      sortedTemplates.push(normalTemplates[normalIndex++]);
    }
    // Add 1 popular template
    if (popularIndex < popularTemplates.length) {
      sortedTemplates.push(popularTemplates[popularIndex++]);
    }
  }

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
  };

  // Hero animations
  const { scope: heroScope } = useScrollAnimation(({ gsap }) => {
    gsap.from('.hero-badge', {
      ...scaleReveal(),
      delay: 0.1,
      scrollTrigger: {
        trigger: '.hero-section',
        start: TRIGGERS.hero,
      },
    });

    gsap.from('.hero-headline', {
      ...fadeUp({ y: 40, duration: 0.7 }),
      scrollTrigger: {
        trigger: '.hero-section',
        start: TRIGGERS.hero,
      },
    });

    gsap.from('.hero-subtitle', {
      ...fadeUp({ y: 40, duration: 0.7 }),
      delay: 0.2,
      scrollTrigger: {
        trigger: '.hero-section',
        start: TRIGGERS.hero,
      },
    });
  });

  // Grid animations - GSAP handles scroll reveal, Framer handles filter transitions
  const { scope: gridScope } = useScrollAnimation(({ gsap }) => {
    gsap.from('.portfolio-card-wrapper', {
      ...fadeUp({ y: 30, duration: 0.5 }),
      stagger: 0.06,
      scrollTrigger: {
        trigger: '.portfolio-grid',
        start: TRIGGERS.late,
      },
    });
  });

  // CTA animations
  const { scope: ctaScope } = useScrollAnimation(({ gsap }) => {
    gsap.from('.cta-heading', {
      ...fadeUp(),
      scrollTrigger: {
        trigger: '.cta-section',
        start: TRIGGERS.standard,
      },
    });

    gsap.from('.cta-subtitle', {
      ...fadeUp(),
      delay: 0.15,
      scrollTrigger: {
        trigger: '.cta-section',
        start: TRIGGERS.standard,
      },
    });

    gsap.from('.cta-buttons', {
      ...fadeUp(),
      delay: 0.3,
      scrollTrigger: {
        trigger: '.cta-section',
        start: TRIGGERS.standard,
      },
    });
  });

  return (
    <>
      <Header />
      <main>
        {/* Dark Hero Section */}
        <section
          ref={heroScope}
          className="hero-section bg-[#0F172A] py-24 md:py-36"
          data-cursor="text"
          data-cursor-text="Explore"
          data-animate
        >
          <Container>
            <div className="max-w-4xl">
              <span
                className="hero-badge inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-semibold mb-6"
                data-animate
              >
                {templates.length} Projects
              </span>
              <h1
                className="hero-headline text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                data-animate
              >
                Our Work Speaks For Itself.
              </h1>
              <p
                className="hero-subtitle text-lg md:text-xl text-white/70"
                data-animate
              >
                Real sites. Real businesses. Zero templates. Every project below
                was built from scratch for someone who refused to settle.
              </p>
            </div>
          </Container>
        </section>

        {/* Light Grid Section with Sticky Filter */}
        <Section background="white" className="py-20 md:py-28">
          <Container>
            {/* Sticky Filter Bar - NO animation, immediately available */}
            <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-6">
              <div className="flex flex-wrap justify-center gap-3">
                {categoryGroups.map((group) => {
                  const Icon = groupIcons[group.id] || LayoutGrid;
                  const isActive = activeGroup === group.id;
                  return (
                    <button
                      key={group.id}
                      onClick={() => handleGroupClick(group.id)}
                      data-cursor="button"
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-primary text-white shadow-lg shadow-primary/25"
                          : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      <Icon size={16} />
                      {group.label}
                      <span className="text-xs opacity-50">
                        {groupCounts[group.id]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Masonry Grid */}
            <div ref={gridScope}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeGroup}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto pt-6"
                  data-animate
                >
                  {sortedTemplates.map((template) => (
                    <div
                      key={template.id}
                      className={`portfolio-card-wrapper ${template.popular ? "md:col-span-2" : ""}`}
                      data-animate
                    >
                      <PortfolioCard
                        template={template}
                        featured={template.popular}
                      />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Empty state */}
              {filteredTemplates.length === 0 && (
                <div className="text-center py-16" data-animate>
                  <p className="text-muted-foreground text-lg mb-4">
                    No templates found in this category.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => handleGroupClick("all")}
                  >
                    View All Templates
                  </Button>
                </div>
              )}
            </div>
          </Container>
        </Section>

        {/* Dark CTA Section */}
        <section
          ref={ctaScope}
          className="cta-section bg-[#0F172A] py-24 md:py-32"
          data-animate
        >
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h2
                className="cta-heading text-3xl md:text-4xl font-bold text-white mb-6"
                data-animate
              >
                Don't See What You Need? Let's Build It.
              </h2>
              <p
                className="cta-subtitle text-lg text-white/60 mb-8"
                data-animate
              >
                Don&apos;t see your industry? We build custom sites for all kinds of
                businesses. Tell us what you need.
              </p>
              <div
                className="cta-buttons flex flex-col sm:flex-row items-center justify-center gap-4"
                data-animate
              >
                <Link href="/contact">
                  <Button
                    variant="primary"
                    size="lg"
                    data-cursor="button"
                  >
                    Start a Project
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10"
                    data-cursor="button"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

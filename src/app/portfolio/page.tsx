"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, Eye, Star } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { categories, templates, categoryLabels } from "@/lib/templateData";

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

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const filteredTemplates =
    activeCategory === "all"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  const categoriesWithCounts = categories.map((cat) => ({
    ...cat,
    count:
      cat.id === "all"
        ? templates.length
        : templates.filter((t) => t.category === cat.id).length,
  }));

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <Section background="gradient">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="text-white/60 font-semibold text-sm uppercase tracking-wider">
                Our Work
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
                Our Portfolio
              </h1>
              <p className="text-xl text-white/80">
                Browse our collection of professionally designed templates. Each
                one is fully responsive, performance-optimized, and ready to
                customize for your brand.
              </p>
            </motion.div>
          </Container>
        </Section>

        {/* Templates */}
        <Section background="white">
          <Container>
            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {/* Category Filter */}
              <motion.div
                variants={itemVariants}
                className="flex flex-nowrap overflow-x-auto gap-2 mb-10 pb-2 -mx-4 px-4 lg:flex-wrap lg:justify-center lg:mx-0 lg:px-0"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {categoriesWithCounts.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                      activeCategory === category.id
                        ? "bg-primary text-white shadow-lg"
                        : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                  >
                    {category.label}{" "}
                    <span className="text-xs opacity-70">
                      ({category.count})
                    </span>
                  </button>
                ))}
              </motion.div>

              {/* Templates Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTemplates.map((template) => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>

              {/* CTA */}
              <motion.div
                variants={itemVariants}
                className="text-center mt-16"
              >
                <p className="text-muted-foreground mb-4">
                  Need something unique? We&apos;ll design it from scratch.
                </p>
                <Link href="/contact">
                  <Button
                    variant="accent"
                    rightIcon={<ArrowRight size={18} />}
                  >
                    Request Custom Design
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

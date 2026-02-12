"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TemplateGridCard } from "@/components/ui/TemplateCard";
import { templates } from "@/lib/templateData";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { clipReveal, fadeUp, TRIGGERS } from "@/lib/scrollAnimations";

// Show 6 templates on homepage — popular ones first
const previewTemplates = [
  ...templates.filter((t) => t.popular),
  ...templates.filter((t) => !t.popular),
].slice(0, 6);

export function PortfolioPreview() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    // Section heading: clip-path reveal from bottom
    gsap.from('.portfolio-heading', {
      ...clipReveal('bottom'),
      scrollTrigger: {
        trigger: '.portfolio-heading',
        start: TRIGGERS.standard,
      },
    });

    // Grid cards: staggered fadeUp
    gsap.from('.portfolio-card', {
      ...fadeUp({ y: 40 }),
      stagger: 0.08,
      scrollTrigger: {
        trigger: '.portfolio-grid',
        start: TRIGGERS.late,
      },
    });

    // CTA: fadeUp with delay
    gsap.from('.portfolio-cta', {
      ...fadeUp(),
      delay: 0.3,
      scrollTrigger: {
        trigger: '.portfolio-grid',
        start: TRIGGERS.late,
      },
    });
  });

  return (
    <section ref={scope} id="portfolio" className="bg-peach/10 text-navy py-16 md:py-24">
      <Container>
        {/* Section Header */}
        <div
          className="portfolio-heading text-center max-w-2xl mx-auto mb-12"
          data-animate
        >
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
            Real Sites. Real Businesses.{" "}
            <span className="text-coral">Zero Templates.</span>
          </h2>
          <p className="text-navy/70 text-lg">
            Every project is built from scratch to match your brand. No cookie-cutter designs.
          </p>
        </div>

        {/* Templates Grid — 6 compact cards */}
        <div className="portfolio-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewTemplates.map((template) => (
            <div key={template.id} className="portfolio-card" data-animate>
              <TemplateGridCard template={template} />
            </div>
          ))}
        </div>

        {/* View All + Custom CTA */}
        <div
          className="portfolio-cta text-center mt-12 space-y-4"
          data-animate
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
        </div>
      </Container>
    </section>
  );
}

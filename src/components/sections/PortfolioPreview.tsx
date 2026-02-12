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
    // Section heading: clip-path reveal from bottom (separate trigger)
    gsap.from('.portfolio-heading', {
      ...clipReveal('bottom'),
      scrollTrigger: {
        trigger: '.portfolio-heading',
        start: TRIGGERS.standard,
      },
    });

    // Consolidate 2 ScrollTriggers on .portfolio-grid into 1 timeline
    const gridTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.portfolio-grid',
        start: TRIGGERS.late,
      },
    });

    gridTl.from('.portfolio-card', { ...fadeUp({ y: 40 }), stagger: 0.08 })
      .from('.portfolio-cta', { ...fadeUp() }, 0.3);
  });

  return (
    <section ref={scope} id="portfolio" className="bg-navy text-white py-20 md:py-28">
      <Container>
        {/* Section Header */}
        <div
          className="portfolio-heading text-center max-w-2xl mx-auto mb-12"
          data-animate
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Real Sites. Real Businesses.{" "}
            <span className="text-coral">Zero Templates.</span>
          </h2>
          <p className="text-white/60 text-lg">
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
          className="portfolio-cta text-center mt-10 space-y-3"
          data-animate
        >
          <Link href="/portfolio">
            <Button
              variant="accent"
              size="lg"
              rightIcon={<ArrowRight size={18} />}
            >
              Browse Real Client Sites ({templates.length})
            </Button>
          </Link>
          <p className="text-white/60">
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

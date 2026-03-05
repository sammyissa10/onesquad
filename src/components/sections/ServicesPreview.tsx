"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, TRIGGERS } from "@/lib/scrollAnimations";

const previewServices = [
  {
    title: "Web Design",
    description: "Professional websites that turn visitors into customers.",
    slug: "web-design",
  },
  {
    title: "Social Media",
    description: "Strategic content that builds your audience and drives leads.",
    slug: "social-media",
  },
  {
    title: "SEO",
    description: "Get found by the right people when they search online.",
    slug: "seo",
  },
  {
    title: "E-commerce",
    description: "Online stores built to sell — smooth checkout, easy management.",
    slug: "ecommerce",
  },
  {
    title: "Branding",
    description: "Logo, colors, voice — a cohesive brand identity that sticks.",
    slug: "content-marketing",
  },
  {
    title: "Digital Ads",
    description: "Paid ads that bring in real leads. Every dollar tracked.",
    slug: "ppc",
  },
];

export function ServicesPreview() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    gsap.from(".services-heading", {
      ...fadeUp({ duration: 0.8 }),
      scrollTrigger: {
        trigger: ".services-heading",
        start: TRIGGERS.early,
      },
    });

    gsap.from(".service-row", {
      autoAlpha: 0,
      y: 15,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.08,
      scrollTrigger: {
        trigger: ".services-list",
        start: TRIGGERS.standard,
      },
    });

    gsap.from(".services-cta", {
      ...fadeUp(),
      scrollTrigger: {
        trigger: ".services-cta",
        start: TRIGGERS.standard,
      },
    });
  });

  return (
    <section ref={scope} className="bg-[#0d1525] text-white py-24 md:py-36">
      <Container className="max-w-[1200px]">
        {/* Header row */}
        <div className="services-heading flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16" data-animate>
          <div>
            <p className="text-xs text-coral uppercase tracking-[0.2em] font-semibold mb-4">
              What We Do
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.05] tracking-tight">
              Everything You Need.<br />
              <span className="text-coral">Zero Bloat.</span>
            </h2>
          </div>
          <p className="text-white/45 text-base max-w-xs md:text-right leading-relaxed">
            Your entire digital team on one monthly bill. No contracts. No surprises.
          </p>
        </div>

        {/* Service rows */}
        <div className="services-list border-t border-white/10">
          {previewServices.map((item, index) => (
            <Link key={item.slug} href={`/services/${item.slug}`}>
              <div
                className="service-row group flex items-center justify-between gap-6 py-7 border-b border-white/10 hover:pl-2 transition-all duration-200"
                data-cursor="button"
                data-animate
              >
                <div className="flex items-center gap-8 min-w-0">
                  <span className="text-sm font-mono text-white/20 shrink-0 tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-coral transition-colors duration-200 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/45 leading-relaxed truncate md:whitespace-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
                <ArrowUpRight
                  className="w-5 h-5 text-white/20 group-hover:text-coral transition-colors duration-200 shrink-0"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="services-cta pt-10 flex justify-end" data-animate>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-coral hover:text-coral/80 transition-colors duration-200"
            data-cursor="button"
          >
            View all services
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

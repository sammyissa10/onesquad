"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui/Icon";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, TRIGGERS } from "@/lib/scrollAnimations";

const previewServices = [
  {
    title: "Web Design",
    description: "Professional websites that turn visitors into customers and look great on every device.",
    icon: "Palette",
    slug: "web-design",
    color: "blue",
  },
  {
    title: "Social Media",
    description: "Grow your following and turn engagement into real leads with strategic social content.",
    icon: "Share2",
    slug: "social-media",
    color: "coral",
  },
  {
    title: "SEO",
    description: "Get found by the right people when they search online. More traffic, more leads.",
    icon: "Search",
    slug: "seo",
    color: "blue",
  },
  {
    title: "E-commerce",
    description: "Online stores built to make selling easy with smooth checkout and inventory management.",
    icon: "ShoppingCart",
    slug: "ecommerce",
    color: "coral",
  },
  {
    title: "Branding",
    description: "Logo, colors, voice — a cohesive brand identity that makes your business memorable.",
    icon: "Layers",
    slug: "content-marketing",
    color: "blue",
  },
  {
    title: "Digital Ads",
    description: "Paid ads that bring in real leads without wasting your budget. Every dollar tracked.",
    icon: "MousePointerClick",
    slug: "ppc",
    color: "coral",
  },
];

const colorClasses = {
  blue: { bg: "bg-blue/15", text: "text-blue" },
  coral: { bg: "bg-coral/15", text: "text-coral" },
};

export function ServicesPreview() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    // Section heading: fade up with early trigger
    gsap.from(".services-heading", {
      ...fadeUp(),
      scrollTrigger: {
        trigger: ".services-heading",
        start: TRIGGERS.early,
      },
    });

    // All 6 cards: staggered fadeUp from start
    gsap.from(".service-card", {
      ...fadeUp(),
      stagger: { each: 0.08, from: "start" },
      scrollTrigger: {
        trigger: ".services-grid",
        start: TRIGGERS.standard,
      },
    });

    // CTA button: simple fadeUp
    gsap.from(".services-cta", {
      ...fadeUp(),
      scrollTrigger: {
        trigger: ".services-cta",
        start: TRIGGERS.standard,
      },
    });
  });

  return (
    <section ref={scope} className="bg-navy text-white py-20 md:py-28">
      <Container className="max-w-[1200px]">
        {/* Section Header */}
        <div className="services-heading text-center max-w-2xl mx-auto mb-12" data-animate>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything You Need.{" "}
            <span className="text-coral">Zero Bloat.</span>
          </h2>
          <p className="text-white/60 text-lg">
            Your entire digital team on one monthly bill. No contracts. No surprises.
          </p>
        </div>

        {/* 3x2 Services Grid */}
        <div className="services-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {previewServices.map((item) => (
            <Link key={item.slug} href={`/services/${item.slug}`}>
              <div
                className="service-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:-translate-y-1 transition-transform duration-200 shadow-lg shadow-black/5"
                data-cursor="card"
                data-animate
              >
                <div className={`w-12 h-12 rounded-xl ${colorClasses[item.color as keyof typeof colorClasses].bg} flex items-center justify-center mb-4`}>
                  <DynamicIcon
                    name={item.icon}
                    className={`w-6 h-6 ${colorClasses[item.color as keyof typeof colorClasses].text}`}
                  />
                </div>
                <h4 className="font-bold text-white text-lg mb-2">{item.title}</h4>
                <p className="text-sm text-white/60">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="services-cta text-center" data-animate>
          <Link href="/services">
            <Button variant="accent" size="lg" rightIcon={<ArrowRight />}>
              View All Services
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

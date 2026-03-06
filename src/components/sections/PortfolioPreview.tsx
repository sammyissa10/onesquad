"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const projects = [
  {
    name: "Riverside Dental",
    category: "Web Design",
    stat: "3x more bookings",
    color: "from-coral/20 to-peach/10",
  },
  {
    name: "Midwest Auto Group",
    category: "SEO + Marketing",
    stat: "187% traffic increase",
    color: "from-blue-500/15 to-cyan-500/10",
  },
  {
    name: "Harbor Fitness",
    category: "Full Digital Presence",
    stat: "45% revenue growth",
    color: "from-emerald-500/15 to-teal-500/10",
  },
];

function CardWireframe() {
  return (
    <div className="w-full h-full p-3 flex flex-col gap-2">
      {/* Fake nav */}
      <div className="flex gap-2 items-center">
        <div className="h-2 w-1/4 rounded-full bg-navy/10" />
        <div className="ml-auto flex gap-1.5">
          <div className="h-2 w-6 rounded-full bg-navy/8" />
          <div className="h-2 w-6 rounded-full bg-navy/8" />
        </div>
      </div>
      {/* Fake headline */}
      <div className="h-5 w-3/4 rounded-md bg-navy/10 mt-1" />
      <div className="h-3 w-1/2 rounded-md bg-navy/6" />
      {/* Fake content blocks */}
      <div className="grid grid-cols-2 gap-2 mt-auto">
        <div className="h-8 rounded-md bg-navy/8" />
        <div className="h-8 rounded-md bg-navy/8" />
      </div>
    </div>
  );
}

export function PortfolioPreview() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    gsap.from(".portfolio-card", {
      autoAlpha: 0,
      y: 40,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".portfolio-grid",
        start: "top 80%",
      },
    });
  });

  return (
    <section
      ref={scope}
      className="bg-warm-white py-[var(--spacing-section-sm)] md:py-[var(--spacing-section-md)]"
    >
      <Container>
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Selected <span className="text-coral">Work</span>
          </h2>
          <p className="text-navy/60 text-lg max-w-xl mx-auto">
            Real businesses, real results. Here&apos;s what we&apos;ve been building.
          </p>
        </div>

        {/* Cards grid */}
        <div className="portfolio-grid grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <div
              key={project.name}
              className={`portfolio-card group rounded-2xl overflow-hidden border border-navy/5 bg-gradient-to-br ${project.color} transition-transform duration-300 hover:-translate-y-1`}
              data-animate
            >
              <div className="p-6 md:p-8">
                {/* Wireframe placeholder */}
                <div className="aspect-[16/10] rounded-xl bg-navy/5 mb-6 overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                  <CardWireframe />
                </div>

                {/* Category tag */}
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-coral/10 text-coral mb-3">
                  {project.category}
                </span>

                {/* Project name */}
                <h3 className="text-xl font-bold text-navy mb-2">{project.name}</h3>

                {/* Stat */}
                <p className="text-navy/60 text-sm">{project.stat}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-coral font-semibold hover:text-coral/80 transition-colors"
          >
            View All Work
            <ArrowRight size={16} />
          </Link>
        </div>
      </Container>
    </section>
  );
}

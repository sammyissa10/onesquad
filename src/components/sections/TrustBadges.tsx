"use client";

import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, TRIGGERS } from "@/lib/scrollAnimations";

const badges = [
  "Lakeside Dental",
  "Region Auto Group",
  "Crossroads Fitness",
  "Harbor Brewing Co.",
  "Prairie View Realty",
  "Steel City Eats",
];

export function TrustBadges() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    gsap.from(".trust-heading", {
      ...fadeUp({ duration: 0.8 }),
      scrollTrigger: {
        trigger: ".trust-heading",
        start: TRIGGERS.early,
      },
    });

    gsap.from(".trust-badge", {
      ...fadeUp(),
      stagger: { each: 0.08 },
      scrollTrigger: {
        trigger: ".trust-badge",
        start: TRIGGERS.standard,
      },
    });
  });

  return (
    <section ref={scope} className="bg-warm-white py-16 md:py-20">
      <Container className="max-w-[1200px]">
        <h2
          className="trust-heading text-2xl md:text-3xl font-bold text-navy mb-10 text-center"
          data-animate
        >
          Trusted by Local Businesses Across NW Indiana
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {badges.map((name) => (
            <div
              key={name}
              className="trust-badge px-6 py-3 bg-white rounded-xl border border-border text-navy/60 font-semibold text-sm tracking-wide"
              data-animate
            >
              {name}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

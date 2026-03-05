"use client";

import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, TRIGGERS } from "@/lib/scrollAnimations";

const businessNames = [
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

    gsap.from(".trust-names", {
      ...fadeUp(),
      scrollTrigger: {
        trigger: ".trust-names",
        start: TRIGGERS.standard,
      },
    });
  });

  return (
    <section ref={scope} className="bg-[#F5EFE0] dark:bg-card py-16 md:py-20">
      <Container className="max-w-[1200px]">
        <h2
          className="trust-heading text-2xl md:text-3xl font-extrabold text-navy mb-6 text-center"
          data-animate
        >
          Trusted by Local Businesses Across NW Indiana
        </h2>
        <p
          className="trust-names text-navy/50 text-sm md:text-base font-medium tracking-wide text-center"
          data-animate
        >
          {businessNames.join(" · ")}
        </p>
      </Container>
    </section>
  );
}

"use client";

import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { TRIGGERS } from "@/lib/scrollAnimations";

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
    gsap.from(".trust-strip", {
      autoAlpha: 0,
      y: 10,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".trust-strip",
        start: TRIGGERS.early,
      },
    });
  });

  return (
    <section ref={scope} className="bg-white dark:bg-card border-b border-navy/5 dark:border-border">
      <Container className="max-w-[1200px]">
        <div className="trust-strip flex flex-wrap items-center gap-x-6 gap-y-2 py-5" data-animate>
          <span className="text-xs text-navy/40 dark:text-foreground/40 uppercase tracking-[0.15em] font-medium whitespace-nowrap shrink-0">
            Trusted by 50+ businesses
          </span>
          <div className="w-px h-4 bg-navy/10 dark:bg-border shrink-0 hidden sm:block" aria-hidden="true" />
          <div className="flex flex-wrap items-center gap-x-1">
            {businessNames.map((name, i) => (
              <span key={name} className="text-sm text-navy/45 dark:text-foreground/45 font-medium">
                {name}{i < businessNames.length - 1 && (
                  <span className="mx-3 text-navy/15 dark:text-border" aria-hidden="true">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

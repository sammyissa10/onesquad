"use client";

import { Container } from "@/components/ui/Container";
import { valueProps } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, TRIGGERS } from "@/lib/scrollAnimations";

export function Features() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    gsap.from('.features-heading', {
      ...fadeUp({ duration: 0.8 }),
      scrollTrigger: {
        trigger: '.features-heading',
        start: TRIGGERS.early,
      },
    });

    gsap.from('.feature-row', {
      autoAlpha: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.features-list',
        start: TRIGGERS.standard,
      },
    });
  });

  return (
    <section ref={scope} className="bg-warm-white dark:bg-card text-navy py-24 md:py-36">
      <Container className="max-w-[1200px]">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24 items-start">
          {/* Left — sticky heading */}
          <div className="features-heading lg:sticky lg:top-32" data-animate>
            <p className="text-xs text-coral uppercase tracking-[0.2em] font-semibold mb-4">
              Why OneSquad
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy dark:text-foreground leading-[1.05] tracking-tight mb-6">
              Why People Switch to OneSquad
            </h2>
            <p className="text-navy/55 dark:text-foreground/55 text-lg leading-relaxed">
              We&apos;re faster, more affordable, and we treat your business like it matters.
            </p>
          </div>

          {/* Right — numbered list */}
          <div className="features-list border-t border-navy/10 dark:border-border">
            {valueProps.map((prop, index) => (
              <div
                key={prop.title}
                className="feature-row grid grid-cols-[3rem_1fr] gap-6 py-8 border-b border-navy/10 dark:border-border"
                data-animate
              >
                <span className="text-4xl font-black text-coral/30 leading-none pt-1 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-navy dark:text-foreground mb-1.5">
                    {prop.title}
                  </h3>
                  <p className="text-navy/55 dark:text-foreground/55 text-sm leading-relaxed">
                    {prop.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

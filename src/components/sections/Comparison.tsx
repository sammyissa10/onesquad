"use client";

import { X, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, slideFromLeft, slideFromRight, TRIGGERS } from "@/lib/scrollAnimations";

const withoutItems = [
  "Spending hours on DIY website builders",
  "Juggling 5+ different tools and logins",
  "Marketing that eats budget but brings no leads",
  "Outdated site that looks broken on mobile",
  "No idea what's working and what's not",
];

const withItems = [
  "Professional site live in 2-4 weeks",
  "One team handles everything for you",
  "Marketing that actually brings in customers",
  "Fast, mobile-first design on every device",
  "Monthly reports in plain English",
];

export function Comparison() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    gsap.from(".comparison-header", {
      ...fadeUp({ duration: 0.8 }),
      scrollTrigger: {
        trigger: ".comparison-header",
        start: TRIGGERS.early,
      },
    });

    gsap.from(".without-col", {
      ...slideFromLeft(),
      scrollTrigger: {
        trigger: ".without-col",
        start: TRIGGERS.standard,
      },
    });

    gsap.from(".with-col", {
      ...slideFromRight(),
      scrollTrigger: {
        trigger: ".with-col",
        start: TRIGGERS.standard,
      },
    });
  });

  return (
    <section ref={scope} className="bg-white dark:bg-card py-24 md:py-36 overflow-hidden">
      <Container className="max-w-[1200px]">
        {/* Section Header */}
        <div className="comparison-header mb-16" data-animate>
          <p className="text-xs text-coral uppercase tracking-[0.2em] font-semibold mb-4">
            The Difference
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy dark:text-foreground leading-[1.05] tracking-tight">
            Stop Juggling.{" "}
            <span className="text-coral">Start Growing.</span>
          </h2>
        </div>

        {/* Two-column comparison table */}
        <div className="grid md:grid-cols-2 gap-0 border border-navy/10 dark:border-border rounded-2xl overflow-hidden">
          {/* Left — Without OneSquad */}
          <div
            className="without-col p-8 md:p-10 border-b md:border-b-0 md:border-r border-navy/10 dark:border-border"
            data-animate
          >
            <h3 className="text-sm font-semibold text-navy/40 dark:text-foreground/40 uppercase tracking-[0.15em] mb-8">
              Without OneSquad
            </h3>
            <div className="space-y-5">
              {withoutItems.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <X className="w-4 h-4 text-navy/20 dark:text-foreground/20 flex-shrink-0 mt-0.5" />
                  <span className="text-navy/50 dark:text-foreground/50 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — With OneSquad */}
          <div
            className="with-col bg-coral/[0.03] dark:bg-coral/5 p-8 md:p-10"
            data-animate
          >
            <h3 className="text-sm font-semibold text-coral uppercase tracking-[0.15em] mb-8">
              With OneSquad
            </h3>
            <div className="space-y-5">
              {withItems.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <Check className="w-4 h-4 text-coral flex-shrink-0 mt-0.5" />
                  <span className="text-navy/80 dark:text-foreground/80 text-sm leading-relaxed font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

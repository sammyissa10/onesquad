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
    <section ref={scope} className="bg-navy-deep text-white py-20 md:py-28 overflow-hidden">
      <Container className="max-w-[1200px]">
        {/* Section Header */}
        <div className="comparison-header text-center max-w-3xl mx-auto mb-12" data-animate>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Stop Juggling.{" "}
            <span className="text-coral">Start Growing.</span>
          </h2>
          <p className="text-white/60 text-lg">
            See the difference when you have a dedicated digital team.
          </p>
        </div>

        {/* Two-column comparison */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Left — Without OneSquad */}
          <div
            className="without-col bg-white/[0.03] border border-white/10 rounded-2xl p-8"
            data-animate
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                <X className="w-4 h-4 text-red-400/60" />
              </div>
              <h3 className="text-lg font-bold text-white/60">Without OneSquad</h3>
            </div>
            <div className="space-y-4">
              {withoutItems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400/60 flex-shrink-0 mt-0.5" />
                  <span className="text-white/50 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — With OneSquad */}
          <div
            className="with-col bg-coral/5 border border-coral/20 rounded-2xl p-8"
            data-animate
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-coral/15 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-coral" />
              </div>
              <h3 className="text-lg font-bold text-coral">With OneSquad</h3>
            </div>
            <div className="space-y-4">
              {withItems.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

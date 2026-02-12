"use client";

import { Container } from "@/components/ui/Container";
import { DynamicIcon } from "@/components/ui/Icon";
import { valueProps } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, scaleReveal, TRIGGERS } from "@/lib/scrollAnimations";

export function Features() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    // Heading (left column): fade up with early trigger
    gsap.from('.features-heading', {
      ...fadeUp({ duration: 0.8 }),
      scrollTrigger: {
        trigger: '.features-heading',
        start: TRIGGERS.early,
      },
    });

    // Cards (right column): individual ScrollTriggers with staggered delay
    gsap.utils.toArray('.feature-card').forEach((card, i) => {
      gsap.from(card as gsap.DOMTarget, {
        ...scaleReveal(),
        delay: i * 0.12,
        scrollTrigger: {
          trigger: card as gsap.DOMTarget,
          start: TRIGGERS.late,
        },
      });
    });
  });

  return (
    <section ref={scope} className="bg-navy text-white py-32 md:py-40">
      <Container>
        {/* Asymmetric layout: heading left, cards right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — heading and description */}
          <div className="features-heading lg:sticky lg:top-32" data-animate>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
              Why Businesses Ditch Their Old Agency For Us
            </h2>
            <p className="text-white/60 text-lg">
              Because we're faster, cheaper, and we actually give a damn about your results.
            </p>
          </div>

          {/* Right — stacked cards */}
          <div className="space-y-6">
            {valueProps.map((prop) => (
              <div
                key={prop.title}
                data-cursor="card"
                data-animate
                className="feature-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-transform duration-200 hover:scale-[1.03]"
              >
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-coral/20 flex items-center justify-center flex-shrink-0">
                    <DynamicIcon name={prop.icon} className="w-7 h-7 text-coral" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {prop.title}
                    </h3>
                    <p className="text-white/70">{prop.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

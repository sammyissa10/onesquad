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
    <section ref={scope} className="bg-white text-navy py-20 md:py-28">
      <Container>
        {/* Asymmetric layout: heading left, cards right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — heading and description */}
          <div className="features-heading lg:sticky lg:top-32" data-animate>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Why Businesses Ditch Their Old Agency For Us
            </h2>
            <p className="text-navy/60 text-lg">
              Because we&apos;re faster, cheaper, and we actually give a damn about your results.
            </p>
          </div>

          {/* Right — stacked cards */}
          <div className="space-y-5">
            {valueProps.map((prop) => (
              <div
                key={prop.title}
                data-cursor="card"
                data-animate
                className="feature-card bg-muted border border-border rounded-2xl p-6 transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center flex-shrink-0">
                    <DynamicIcon name={prop.icon} className="w-6 h-6 text-coral" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-navy mb-1">
                      {prop.title}
                    </h3>
                    <p className="text-navy/60 text-sm">{prop.description}</p>
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

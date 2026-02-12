"use client";

import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, TRIGGERS } from "@/lib/scrollAnimations";

const statBadges: Record<string, string> = {
  "1": "3x Traffic Growth",
  "2": "180% Organic Growth",
  "3": "Zero Stress",
};

export function Testimonials() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    gsap.from('.testimonials-heading', {
      ...fadeUp({ duration: 0.8 }),
      scrollTrigger: {
        trigger: '.testimonials-heading',
        start: TRIGGERS.early,
      },
    });

    gsap.from('.testimonial-card', {
      ...fadeUp({ y: 30 }),
      stagger: 0.12,
      scrollTrigger: {
        trigger: '.testimonial-grid',
        start: TRIGGERS.standard,
      },
    });
  });

  return (
    <section ref={scope} className="bg-navy text-white py-20 md:py-28">
      <Container>
        {/* Section Header */}
        <div
          className="testimonials-heading text-center max-w-2xl mx-auto mb-12"
          data-animate
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Don&apos;t Take Our Word For It.{" "}
            <span className="text-coral">Take Theirs.</span>
          </h2>
          <p className="text-white/60 text-lg">
            No scripts. No stock photos. Just honest feedback.
          </p>
        </div>

        {/* Testimonial Grid - consistent cards */}
        <div className="testimonial-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              data-cursor="card"
              data-animate
              className="testimonial-card bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:-translate-y-1 transition-transform duration-200"
            >
              {/* Stat badge */}
              {statBadges[testimonial.id] && (
                <div className="inline-block bg-coral/15 text-coral text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-3">
                  {statBadges[testimonial.id]}
                </div>
              )}

              {/* Star rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-coral text-coral"
                  />
                ))}
              </div>

              {/* Testimonial content */}
              <blockquote className="text-white/80 mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="border-t border-white/10 pt-4">
                <div className="font-bold text-white text-sm">
                  {testimonial.name}
                </div>
                <div className="text-white/50 text-sm">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

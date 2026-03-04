"use client";

import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, TRIGGERS } from "@/lib/scrollAnimations";

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

        {/* Testimonial Grid - upgraded cards */}
        <div className="testimonial-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              data-cursor="card"
              data-animate
              className="testimonial-card relative bg-white rounded-2xl p-6 md:p-8 shadow-xl hover:-translate-y-1 transition-transform duration-200 overflow-hidden"
            >
              {/* Gradient top border */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-coral to-peach" aria-hidden="true" />

              {/* Decorative quote mark */}
              <span className="absolute top-4 left-5 text-6xl font-serif leading-none text-coral/20 pointer-events-none select-none" aria-hidden="true">&ldquo;</span>

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
              <blockquote className="text-navy/80 mb-6 leading-relaxed">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>

              {/* Author with avatar */}
              <div className="border-t border-navy/10 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-coral to-peach ring-2 ring-coral/30 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-navy text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-navy/50 text-sm">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

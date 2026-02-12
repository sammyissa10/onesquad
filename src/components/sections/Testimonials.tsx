"use client";

import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, scaleReveal, TRIGGERS } from "@/lib/scrollAnimations";

// Define unique visual treatments for each testimonial
const testimonialStyles = [
  {
    bg: "bg-coral",
    text: "text-white",
    quoteColor: "text-white/30",
    nameColor: "text-white",
    roleColor: "text-white/70",
    colSpan: "md:col-span-2",  // wide card
    padding: "p-10 md:p-12",
    rounded: "rounded-3xl",
  },
  {
    bg: "bg-navy",
    text: "text-white",
    quoteColor: "text-white/20",
    nameColor: "text-white",
    roleColor: "text-white/60",
    colSpan: "md:col-span-1",  // narrow card
    padding: "p-8",
    rounded: "rounded-2xl",
  },
  {
    bg: "bg-white",
    text: "text-navy",
    quoteColor: "text-coral/20",
    nameColor: "text-navy",
    roleColor: "text-navy/60",
    colSpan: "md:col-span-3",  // full-width card
    padding: "p-10 md:p-14",
    rounded: "rounded-3xl",
  },
];

export function Testimonials() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    // Section heading: fadeUp with early trigger
    gsap.from('.testimonials-heading', {
      ...fadeUp({ duration: 0.8 }),
      scrollTrigger: {
        trigger: '.testimonials-heading',
        start: TRIGGERS.early,
      },
    });

    // Testimonial cards: varied-timing reveals
    // First card (wide, coral): scaleReveal with no delay
    gsap.from('.testimonial-card-0', {
      ...scaleReveal(),
      scrollTrigger: {
        trigger: '.testimonial-grid',
        start: TRIGGERS.standard,
      },
    });

    // Second card (narrow, navy): scaleReveal with 0.15s delay
    gsap.from('.testimonial-card-1', {
      ...scaleReveal(),
      delay: 0.15,
      scrollTrigger: {
        trigger: '.testimonial-grid',
        start: TRIGGERS.standard,
      },
    });

    // Third card (full-width, white): fadeUp with 0.3s delay (different effect)
    gsap.from('.testimonial-card-2', {
      ...fadeUp(),
      delay: 0.3,
      scrollTrigger: {
        trigger: '.testimonial-grid',
        start: TRIGGERS.standard,
      },
    });
  });

  return (
    <section ref={scope} className="bg-peach/15 text-navy py-20 md:py-32">
      <Container>
        {/* Section Header */}
        <div
          className="testimonials-heading text-center max-w-2xl mx-auto mb-16"
          data-animate
        >
          <h2 className="text-3xl md:text-5xl font-black text-navy mb-6">
            Don&apos;t Take Our Word For It.{" "}
            <span className="text-coral">Take Theirs.</span>
          </h2>
          <p className="text-navy/60 text-lg">
            No scripts. No stock photos. Just honest feedback.
          </p>
        </div>

        {/* Testimonial Bento Grid */}
        <div className="testimonial-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => {
            const style = testimonialStyles[index % testimonialStyles.length];

            return (
              <div
                key={testimonial.id}
                data-cursor="card"
                data-animate
                className={`testimonial-card-${index} ${style.bg} ${style.text} ${style.padding} ${style.rounded} ${style.colSpan} hover:scale-[1.02] transition-transform duration-300`}
              >
                {/* Large decorative quote mark */}
                <div className={`text-6xl md:text-7xl font-serif leading-none mb-4 ${style.quoteColor}`}>
                  &ldquo;
                </div>

                {/* Testimonial content */}
                <blockquote className="text-lg md:text-xl mb-6 leading-relaxed">
                  {testimonial.content}
                </blockquote>

                {/* Star rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        style.bg === "bg-white"
                          ? "fill-coral text-coral"
                          : "fill-white text-white"
                      }`}
                    />
                  ))}
                </div>

                {/* Author */}
                <div>
                  <div className={`font-bold ${style.nameColor}`}>
                    {testimonial.name}
                  </div>
                  <div className={style.roleColor}>
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

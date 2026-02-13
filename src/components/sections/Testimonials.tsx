"use client";

import { Star } from "lucide-react";
import { useRef, useState, useCallback } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  const currentIndexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveredRef = useRef(false);

  const { scope, contextSafe } = useScrollAnimation(({ gsap }) => {
    gsap.from('.testimonials-heading', {
      ...fadeUp({ duration: 0.8 }),
      scrollTrigger: {
        trigger: '.testimonials-heading',
        start: TRIGGERS.early,
      },
    });

    // Mobile: stagger grid animation
    const mm = gsap.matchMedia();

    mm.add("(max-width: 767px)", () => {
      gsap.from('.testimonial-card', {
        ...fadeUp({ y: 30 }),
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.testimonial-grid',
          start: TRIGGERS.standard,
        },
      });
    });

    // Desktop: carousel setup
    mm.add("(min-width: 768px)", () => {
      // Animate carousel container entrance
      gsap.from('.carousel-container', {
        ...fadeUp({ duration: 0.6 }),
        scrollTrigger: {
          trigger: '.carousel-container',
          start: TRIGGERS.standard,
        },
      });

      // Set initial visibility: first card visible, others hidden
      gsap.set('.carousel-card', { autoAlpha: 0 });
      gsap.set('.carousel-card-0', { autoAlpha: 1 });

      // Create goToSlide function
      const goToSlide = contextSafe((...args: unknown[]) => {
        const index = args[0] as number;
        const currentCard = scope.current!.querySelector(`.carousel-card-${currentIndexRef.current}`);
        const nextCard = scope.current!.querySelector(`.carousel-card-${index}`);

        if (currentCard) {
          gsap.to(currentCard, { autoAlpha: 0, duration: 0.4 });
        }

        if (nextCard) {
          gsap.fromTo(
            nextCard,
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, duration: 0.5, delay: 0.1 }
          );
        }

        currentIndexRef.current = index;
        setActiveIndex(index);
      });

      // Auto-rotation
      const startInterval = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          if (!isHoveredRef.current) {
            const nextIndex = (currentIndexRef.current + 1) % testimonials.length;
            goToSlide(nextIndex);
          }
        }, 5000);
      };

      startInterval();

      // Store goToSlide in a global ref for event handlers
      (window as any).__testimonialGoToSlide = goToSlide;
      (window as any).__testimonialStartInterval = startInterval;
    });

    return () => mm.revert();
  });

  const handlePointerEnter = useCallback(() => {
    isHoveredRef.current = true;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    isHoveredRef.current = false;
    if ((window as any).__testimonialStartInterval) {
      (window as any).__testimonialStartInterval();
    }
  }, []);

  const handleDotClick = useCallback((index: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if ((window as any).__testimonialGoToSlide) {
      (window as any).__testimonialGoToSlide(index);
    }
    if ((window as any).__testimonialStartInterval) {
      (window as any).__testimonialStartInterval();
    }
  }, []);

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

        {/* Desktop Carousel - hidden on mobile */}
        <div
          className="carousel-container hidden md:block relative max-w-2xl mx-auto"
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          data-animate
        >
          {/* Render all cards absolutely positioned */}
          <div className="relative min-h-[400px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`carousel-card carousel-card-${index} absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12`}
              >
                {/* Stat badge */}
                {statBadges[testimonial.id] && (
                  <div className="text-2xl font-bold text-coral mb-2">
                    {statBadges[testimonial.id]}
                  </div>
                )}

                {/* Star rating */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-coral text-coral"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg md:text-xl italic text-white/80 leading-relaxed mb-8">
                  &ldquo;{testimonial.content}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="border-t border-white/10 pt-6">
                  <div className="font-bold text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-white/50 text-sm">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex gap-2 justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-coral scale-125"
                    : "bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Grid - stacked layout, hidden on desktop */}
        <div className="testimonial-grid grid grid-cols-1 gap-6 md:hidden">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              data-cursor="card"
              data-animate
              className="testimonial-card bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 hover:-translate-y-1 transition-transform duration-200"
            >
              {/* Stat badge */}
              {statBadges[testimonial.id] && (
                <div className="inline-block bg-coral/15 text-coral text-sm font-bold uppercase tracking-wider px-4 py-2 rounded-full mb-3">
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

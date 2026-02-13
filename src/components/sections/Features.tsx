"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { DynamicIcon } from "@/components/ui/Icon";
import { valueProps } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, scaleReveal, TRIGGERS } from "@/lib/scrollAnimations";

export function Features() {
  const cardsRef = useRef<HTMLDivElement>(null);

  const { scope } = useScrollAnimation(({ gsap }) => {
    // Heading (left column): fade up with early trigger
    gsap.from('.features-heading', {
      ...fadeUp({ duration: 0.8 }),
      scrollTrigger: {
        trigger: '.features-heading',
        start: TRIGGERS.early,
      },
    });

    // Cards (right column): single ScrollTrigger with stagger
    gsap.from('.feature-card', {
      ...scaleReveal(),
      stagger: 0.12,
      scrollTrigger: {
        trigger: '.feature-card',
        start: TRIGGERS.late,
      },
    });
  });

  // 3D card tilt on hover
  useEffect(() => {
    const container = cardsRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = container.querySelectorAll<HTMLElement>('.feature-card');

    const handleMouseMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Max tilt: 6 degrees
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      card.style.transition = 'transform 0.1s ease-out';
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      card.style.transform = '';
      card.style.transition = 'transform 0.3s ease-out';
    };

    cards.forEach(card => {
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', handleMouseMove);
        card.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <section ref={scope} className="bg-white text-navy py-20 md:py-28">
      <Container>
        {/* Asymmetric layout: heading left, cards right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — heading and description */}
          <div className="features-heading lg:sticky lg:top-32" data-animate>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Why People Switch to OneSquad
            </h2>
            <p className="text-navy/60 text-lg">
              We&apos;re faster, more affordable, and we treat your business like it matters.
            </p>
          </div>

          {/* Right — stacked cards */}
          <div ref={cardsRef} className="space-y-5" style={{ perspective: '1000px' }}>
            {valueProps.map((prop) => (
              <div
                key={prop.title}
                data-cursor="card"
                data-animate
                className="feature-card bg-muted border border-border rounded-2xl p-6 will-change-transform"
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

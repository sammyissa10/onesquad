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

  const featured = testimonials[0];
  const rest = testimonials.slice(1);

  return (
    <section ref={scope} className="bg-warm-white dark:bg-card py-24 md:py-36">
      <Container className="max-w-[1200px]">
        {/* Section label + header */}
        <div className="testimonials-heading mb-16" data-animate>
          <p className="text-xs text-coral uppercase tracking-[0.2em] font-semibold mb-4">
            Client Feedback
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-navy dark:text-foreground leading-[1.05] tracking-tight">
            Don&apos;t Take Our Word For It.
          </h2>
        </div>

        {/* Featured pull-quote */}
        <div
          className="testimonial-card mb-8 border-l-4 border-coral pl-8 py-2"
          data-animate
        >
          <blockquote className="text-xl md:text-2xl lg:text-3xl font-medium text-navy dark:text-foreground leading-snug mb-6">
            &ldquo;{featured.content}&rdquo;
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-navy/10 dark:bg-foreground/10 flex items-center justify-center text-navy dark:text-foreground font-bold text-sm flex-shrink-0">
              {featured.name.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-navy dark:text-foreground text-sm">{featured.name}</div>
              <div className="text-navy/50 dark:text-foreground/50 text-sm">{featured.role}, {featured.company}</div>
            </div>
            <div className="ml-auto flex gap-0.5">
              {Array.from({ length: featured.rating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-coral text-coral" />
              ))}
            </div>
          </div>
        </div>

        {/* Secondary testimonials */}
        <div className="testimonial-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((testimonial) => (
            <div
              key={testimonial.id}
              data-animate
              className="testimonial-card border border-navy/10 dark:border-border rounded-2xl p-6 md:p-8"
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-coral text-coral" />
                ))}
              </div>
              <blockquote className="text-navy/80 dark:text-foreground/80 mb-5 leading-relaxed text-sm">
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 border-t border-navy/8 dark:border-border pt-4">
                <div className="w-8 h-8 rounded-full bg-navy/8 dark:bg-foreground/8 flex items-center justify-center text-navy dark:text-foreground font-bold text-xs flex-shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-navy dark:text-foreground text-sm">{testimonial.name}</div>
                  <div className="text-navy/45 dark:text-foreground/45 text-xs">{testimonial.role}, {testimonial.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

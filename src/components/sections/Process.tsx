"use client";

import { Container } from "@/components/ui/Container";
import { Search, Lightbulb, Rocket, BarChart3 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, TRIGGERS } from "@/lib/scrollAnimations";

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We hop on a call. You tell us what's working, what's not, and where you want to be.",
    icon: Search,
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "We come back with a plan — what we'll build, what it costs, how long it takes.",
    icon: Lightbulb,
  },
  {
    number: "03",
    title: "Execution",
    description:
      "We build. You get updates. If something looks off, say so and we fix it.",
    icon: Rocket,
  },
  {
    number: "04",
    title: "Optimization",
    description:
      "Once it's live, we watch the numbers and tweak what isn't working.",
    icon: BarChart3,
  },
];

export function Process() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    // Heading: separate trigger
    gsap.from('.process-heading', {
      ...fadeUp({ duration: 0.8 }),
      scrollTrigger: {
        trigger: '.process-heading',
        start: TRIGGERS.early,
      },
    });

    // Use matchMedia to separate desktop and mobile animations
    const mm = gsap.matchMedia();

    // Desktop: pin-scroll with crossfade
    mm.add('(min-width: 1024px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.process-pin-container',
          pin: true,
          scrub: 1,
          start: 'top 15%',
          end: '+=300%',
          invalidateOnRefresh: true,
        },
      });

      // Crossfade through the 4 steps (3 transitions)
      processSteps.forEach((_, i) => {
        if (i < processSteps.length - 1) {
          tl.to(`.process-panel-${i}`, { autoAlpha: 0, duration: 0.3 })
            .to(`.process-panel-${i + 1}`, { autoAlpha: 1, duration: 0.3 }, '<')
            .to('.process-progress-fill', { width: `${((i + 1) / 3) * 100}%`, duration: 0.3 }, '<');
        }
      });
    });

    // Mobile: stacked layout with fadeUp stagger
    mm.add('(max-width: 1023px)', () => {
      const gridTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.process-grid-mobile',
          start: TRIGGERS.standard,
        },
      });

      gridTl.from('.process-step-mobile', { ...fadeUp({ y: 30 }), stagger: 0.2 })
        .from('.timeline-dot-mobile', { scale: 0, duration: 0.4, stagger: 0.2, ease: 'back.out(2)' }, 0);
    });
  });

  return (
    <section ref={scope} className="bg-white text-navy py-20 md:py-28">
      <Container>
        {/* Section Header */}
        <div className="process-heading text-center max-w-2xl mx-auto mb-16" data-animate>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Four Steps. No Bureaucracy. No Surprises.
          </h2>
          <p className="text-navy/60 text-lg">
            We keep things simple. Here&apos;s exactly how we work.
          </p>
        </div>

        {/* Desktop: Pin-scroll crossfade layout */}
        <div className="process-pin-container hidden lg:block">
          <div className="process-viewport relative h-[400px]">
            {processSteps.map((step, i) => (
              <div
                key={step.number}
                className={`process-panel-${i} absolute inset-0 flex flex-col items-center justify-center text-center ${i > 0 ? 'opacity-0' : ''}`}
              >
                {/* Step number */}
                <div className="text-sm font-bold text-coral mb-3">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-coral/10 border-2 border-coral/30 flex items-center justify-center mb-5">
                  <step.icon className="w-7 h-7 text-coral" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-navy mb-3">
                  {step.title}
                </h3>
                <p className="text-navy/60 text-base max-w-md mx-auto">{step.description}</p>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-8">
            <div className="h-1 bg-navy/10 rounded-full overflow-hidden">
              <div className="process-progress-fill h-full bg-gradient-to-r from-coral to-peach rounded-full" style={{ width: '0%' }} />
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: Stacked layout */}
        <div className="process-grid-mobile lg:hidden relative">
          {/* Horizontal timeline line (tablet only) */}
          <div className="hidden md:block absolute top-[52px] left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 bg-navy/10">
            <div className="absolute inset-0 bg-gradient-to-r from-coral via-coral to-peach rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 gap-8 md:gap-6">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="process-step-mobile relative text-center"
                data-animate
              >
                {/* Vertical connector for mobile */}
                {index < processSteps.length - 1 && (
                  <div className="md:hidden absolute left-1/2 top-[104px] w-0.5 h-8 bg-gradient-to-b from-coral/40 to-transparent -translate-x-1/2 sm:hidden" />
                )}

                {/* Step number */}
                <div className="text-sm font-bold text-coral mb-3">
                  {step.number}
                </div>

                {/* Timeline dot + icon */}
                <div className="relative flex flex-col items-center mb-5">
                  <div className="timeline-dot-mobile w-12 h-12 rounded-full bg-coral/10 border-2 border-coral/30 flex items-center justify-center relative z-10 bg-white">
                    <step.icon className="w-5 h-5 text-coral" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-navy mb-2">
                  {step.title}
                </h3>
                <p className="text-navy/60 text-sm max-w-[220px] mx-auto">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

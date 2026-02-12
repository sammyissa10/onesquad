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
    gsap.from('.process-heading', {
      ...fadeUp({ duration: 0.8 }),
      scrollTrigger: {
        trigger: '.process-heading',
        start: TRIGGERS.early,
      },
    });

    // Animate each step sequentially
    gsap.from('.process-step', {
      ...fadeUp({ y: 30 }),
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.process-grid',
        start: TRIGGERS.standard,
      },
    });

    // Animate the timeline progress line (scrub-based)
    gsap.from('.timeline-progress', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.5,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.process-grid',
        start: TRIGGERS.standard,
        end: 'bottom 40%',
        scrub: 1,
      },
    });

    // Animate step dots appearing
    gsap.from('.timeline-dot', {
      scale: 0,
      duration: 0.4,
      stagger: 0.2,
      ease: 'back.out(2)',
      scrollTrigger: {
        trigger: '.process-grid',
        start: TRIGGERS.standard,
      },
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

        {/* Timeline Process Steps */}
        <div className="process-grid relative">
          {/* Horizontal timeline line (desktop only) */}
          <div className="hidden lg:block absolute top-[52px] left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 bg-navy/10">
            <div className="timeline-progress absolute inset-0 bg-gradient-to-r from-coral via-coral to-peach rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {processSteps.map((step, index) => (
              <div
                key={step.number}
                className="process-step relative text-center"
                data-animate
              >
                {/* Vertical connector for mobile/tablet */}
                {index < processSteps.length - 1 && (
                  <div className="lg:hidden absolute left-1/2 top-[104px] w-0.5 h-8 bg-gradient-to-b from-coral/40 to-transparent -translate-x-1/2 sm:hidden" />
                )}

                {/* Step number */}
                <div className="text-sm font-bold text-coral mb-3">
                  {step.number}
                </div>

                {/* Timeline dot + icon */}
                <div className="relative flex flex-col items-center mb-5">
                  {/* Dot on the timeline */}
                  <div className="timeline-dot w-12 h-12 rounded-full bg-coral/10 border-2 border-coral/30 flex items-center justify-center relative z-10 bg-white">
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

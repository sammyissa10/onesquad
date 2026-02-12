"use client";

import { Container } from "@/components/ui/Container";
import { Search, Lightbulb, Rocket, BarChart3 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, slideFromLeft, slideFromRight, TRIGGERS } from "@/lib/scrollAnimations";

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
    // Section heading: fadeUp with early trigger
    gsap.from('.process-heading', {
      ...fadeUp({ duration: 0.8 }),
      scrollTrigger: {
        trigger: '.process-heading',
        start: TRIGGERS.early,
      },
    });

    // Process steps: alternating slide-in based on index
    const stepElements = scope.current?.querySelectorAll('.process-step');
    stepElements?.forEach((step, index) => {
      const isLeft = index % 2 === 0;
      gsap.from(step, {
        ...(isLeft ? slideFromLeft() : slideFromRight()),
        scrollTrigger: {
          trigger: step,
          start: TRIGGERS.standard,
        },
      });
    });

    // Icon nodes: scale from 0 with stagger
    gsap.from('.process-icon', {
      opacity: 0,
      scale: 0,
      duration: 0.4,
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.process-timeline',
        start: TRIGGERS.standard,
      },
    });
  });

  return (
    <section ref={scope} className="bg-navy text-white py-28 md:py-40">
      <Container size="md">
        {/* Section Header */}
        <div className="process-heading text-center max-w-2xl mx-auto mb-16" data-animate>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Four Steps. No Bureaucracy. No Surprises.
          </h2>
          <p className="text-white/60 text-lg">
            We keep things simple. Here&apos;s exactly how we work.
          </p>
        </div>

        {/* Process Steps */}
        <div className="process-timeline space-y-12 relative">
          {/* Vertical timeline line */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-white/10" />

          {processSteps.map((step, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={step.number}
                className={`process-step relative flex items-start gap-6 md:gap-12 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                data-animate
              >
                {/* Content with oversized number watermark */}
                <div className={`flex-1 pl-20 md:pl-0 ${isLeft ? "md:text-right" : "md:text-left"} relative`}>
                  {/* Oversized watermark number */}
                  <div className={`absolute ${isLeft ? "md:-right-4" : "md:-left-4"} -top-8 text-7xl md:text-8xl font-black text-white/5 pointer-events-none`}>
                    {step.number}
                  </div>

                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/60 text-lg">{step.description}</p>
                  </div>
                </div>

                {/* Icon node on the line */}
                <div
                  className="process-icon absolute left-2 md:left-1/2 md:-translate-x-1/2 w-14 h-14 rounded-xl bg-coral/20 flex items-center justify-center z-10 border-4 border-navy"
                  data-animate
                >
                  <step.icon className="w-6 h-6 text-coral" />
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block flex-1" />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

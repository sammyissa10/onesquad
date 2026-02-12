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

    gsap.from('.process-step', {
      ...fadeUp({ y: 30 }),
      stagger: 0.15,
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
        <div className="process-heading text-center max-w-2xl mx-auto mb-12" data-animate>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            Four Steps. No Bureaucracy. No Surprises.
          </h2>
          <p className="text-navy/60 text-lg">
            We keep things simple. Here&apos;s exactly how we work.
          </p>
        </div>

        {/* Process Steps - clean 4-column grid */}
        <div className="process-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="process-step text-center p-6"
              data-animate
            >
              {/* Step number */}
              <div className="text-sm font-bold text-coral mb-4">
                {step.number}
              </div>

              {/* Icon */}
              <div
                className="process-icon w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mx-auto mb-4"
              >
                <step.icon className="w-6 h-6 text-coral" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-navy mb-2">
                {step.title}
              </h3>
              <p className="text-navy/60 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

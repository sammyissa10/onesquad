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
    // Keep heading as separate ScrollTrigger (different trigger element)
    gsap.from('.process-heading', {
      ...fadeUp({ duration: 0.8 }),
      scrollTrigger: {
        trigger: '.process-heading',
        start: TRIGGERS.early,
      },
    });

    // Consolidate 3 ScrollTriggers on .process-grid into 1 timeline
    const gridTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.process-grid',
        start: TRIGGERS.standard,
      },
    });

    gridTl.from('.process-step', { ...fadeUp({ y: 30 }), stagger: 0.2 })
      .from('.timeline-dot', { scale: 0, duration: 0.4, stagger: 0.2, ease: 'back.out(2)' }, 0);

    // Keep timeline-progress as separate ScrollTrigger (scrub requires its own trigger)
    gsap.from('.timeline-progress', {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 1.5,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.process-grid',
        start: TRIGGERS.standard,
        end: 'center 60%',
        scrub: 1,
      },
    });
  });

  return (
    <section ref={scope} className="bg-[#0d1525] text-white py-24 md:py-36">
      <Container className="max-w-[1200px]">
        {/* Section Header */}
        <div className="process-heading flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20" data-animate>
          <div>
            <p className="text-xs text-coral uppercase tracking-[0.2em] font-semibold mb-4">
              How It Works
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-[1.05] tracking-tight">
              Four Steps. No Bureaucracy.
            </h2>
          </div>
          <p className="text-white/40 text-base max-w-xs md:text-right leading-relaxed">
            We keep things simple. Here&apos;s exactly how we work.
          </p>
        </div>

        {/* Process Steps — numbered list style */}
        <div className="process-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-white/10">
          {processSteps.map((step) => (
            <div
              key={step.number}
              className="process-step pt-8 pr-8 pb-4"
              data-animate
            >
              <div className="text-6xl font-black text-coral leading-none mb-6 tabular-nums">
                {step.number}
              </div>
              <div className="timeline-dot w-10 h-10 rounded-full border border-white/20 flex items-center justify-center mb-5">
                <step.icon className="w-4 h-4 text-coral" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

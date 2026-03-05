"use client";

import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, TRIGGERS } from "@/lib/scrollAnimations";

const statsData = [
  { target: 50, suffix: "+", label: "Clients Served", decimals: 0 },
  { target: 0, suffix: "", label: "Turnaround Time", isStatic: true, staticValue: "24hr" },
  { target: 100, suffix: "%", label: "Local Team", decimals: 0 },
  { target: 5.0, suffix: "\u2605", label: "Average Rating", decimals: 1 },
];

export function StatsSection() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    // Fade-up stagger for stat containers
    gsap.from(".stat-item", {
      ...fadeUp(),
      stagger: { each: 0.1, from: "center" },
      scrollTrigger: {
        trigger: ".stat-item",
        start: TRIGGERS.standard,
      },
    });

    // Counter animations for non-static stats
    const counters = { val0: 0, val2: 0, val3: 0 };

    gsap.to(counters, {
      val0: 50,
      val2: 100,
      val3: 5.0,
      duration: 2,
      ease: "power1.out",
      scrollTrigger: {
        trigger: ".stat-item",
        start: TRIGGERS.standard,
      },
      onUpdate: () => {
        const el0 = document.querySelector(".stat-value-0");
        const el2 = document.querySelector(".stat-value-2");
        const el3 = document.querySelector(".stat-value-3");
        if (el0) el0.textContent = Math.round(counters.val0) + "+";
        if (el2) el2.textContent = Math.round(counters.val2) + "%";
        if (el3) el3.textContent = counters.val3.toFixed(1) + "\u2605";
      },
    });
  });

  return (
    <section
      ref={scope}
      className="bg-navy-deep text-white border-t-2 border-coral py-[var(--spacing-section-sm)] md:py-[var(--spacing-section-md)]"
    >
      <Container className="max-w-[1200px]">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y-2 divide-white/10 md:divide-y-0 md:divide-x md:divide-white/10 text-center">
          {statsData.map((stat, index) => (
            <div key={stat.label} className="stat-item px-6 py-8 md:py-0" data-animate>
              <div
                className={`stat-value-${index} text-6xl md:text-7xl lg:text-8xl font-black text-coral mb-3`}
              >
                {stat.isStatic
                  ? stat.staticValue
                  : index === 3
                  ? "0.0\u2605"
                  : `0${stat.suffix}`}
              </div>
              <div className="text-xs md:text-sm text-white/40 uppercase tracking-[0.15em] mt-3">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

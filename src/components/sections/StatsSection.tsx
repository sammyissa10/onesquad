"use client";

import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, TRIGGERS } from "@/lib/scrollAnimations";

const stats = [
  { value: "50+", label: "Clients Served" },
  { value: "24hr", label: "Turnaround Time" },
  { value: "100%", label: "Local Team" },
  { value: "5.0★", label: "Average Rating" },
];

export function StatsSection() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    gsap.from(".stat-item", {
      ...fadeUp(),
      stagger: { each: 0.1, from: "center" },
      scrollTrigger: {
        trigger: ".stat-item",
        start: TRIGGERS.standard,
      },
    });
  });

  return (
    <section ref={scope} className="bg-navy-deep text-white py-16 md:py-24">
      <Container className="max-w-[1200px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item" data-animate>
              <div className="text-4xl md:text-5xl font-bold text-coral mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/60 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

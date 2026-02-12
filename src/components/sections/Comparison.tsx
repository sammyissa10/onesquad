"use client";

import {
  X,
  Check,
  Clock,
  DollarSign,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  Shield,
  Zap,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { slideFromLeft, slideFromRight, TRIGGERS } from "@/lib/scrollAnimations";

const withoutUsItems = [
  {
    icon: Clock,
    title: "Wasted Time",
    description: "Endless hours trying to figure out DIY website builders and marketing tools",
  },
  {
    icon: DollarSign,
    title: "Hidden Costs",
    description: "Unexpected fees, premium plugins, and expensive freelancers that blow your budget",
  },
  {
    icon: TrendingDown,
    title: "Poor Results",
    description: "Few visitors turning into customers, flat traffic, and marketing that doesn't pay off",
  },
  {
    icon: AlertTriangle,
    title: "Constant Stress",
    description: "Dealing with technical problems, security scares, and unexpected site outages",
  },
];

const withUsItems = [
  {
    icon: Zap,
    title: "Fast Launch",
    description: "Your professional website live in weeks, not months, with expert guidance",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "Clear, upfront costs with no surprises—everything included in your plan",
  },
  {
    icon: TrendingUp,
    title: "Real Growth",
    description: "Proven strategies that bring in more visitors, more inquiries, and more revenue",
  },
  {
    icon: Shield,
    title: "Peace of Mind",
    description: "Reliable security, daily backups, and 99.9% uptime — all handled for you",
  },
];

function ComparisonCard({
  item,
  type,
}: {
  item: typeof withoutUsItems[0];
  type: "without" | "with";
}) {
  const isWithout = type === "without";

  return (
    <div
      className={`comparison-card flex items-start gap-4 p-5 rounded-2xl transition-all duration-200 hover:-translate-y-1 ${
        isWithout
          ? "bg-red-50 border border-red-200/60"
          : "bg-emerald-50 border border-emerald-200/60"
      }`}
      data-animate
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isWithout ? "bg-red-100" : "bg-emerald-100"
        }`}
      >
        <item.icon
          className={`w-6 h-6 ${isWithout ? "text-red-500" : "text-emerald-600"}`}
        />
      </div>
      <div>
        <h4
          className={`font-bold mb-1 ${
            isWithout ? "text-red-600" : "text-emerald-700"
          }`}
        >
          {item.title}
        </h4>
        <p className={`text-sm ${isWithout ? "text-red-500/70" : "text-emerald-600/70"}`}>
          {item.description}
        </p>
      </div>
    </div>
  );
}

export function Comparison() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    // Header: scale in
    gsap.from('.comparison-header', {
      opacity: 0,
      scale: 0.85,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.comparison-header',
        start: TRIGGERS.standard,
      },
    });

    // Left column: slide from left
    gsap.from('.comparison-left', {
      ...slideFromLeft(),
      scrollTrigger: {
        trigger: '.comparison-grid',
        start: TRIGGERS.standard,
      },
    });

    // Left column cards: fade up within left column
    gsap.from('.comparison-left .comparison-card', {
      y: 20,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.comparison-grid',
        start: TRIGGERS.late,
      },
    });

    // Right column: slide from right with delay
    gsap.from('.comparison-right', {
      ...slideFromRight({ delay: 0.2 }),
      scrollTrigger: {
        trigger: '.comparison-grid',
        start: TRIGGERS.standard,
      },
    });

    // Right column cards: fade up within right column
    gsap.from('.comparison-right .comparison-card', {
      y: 20,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.comparison-grid',
        start: TRIGGERS.late,
      },
    });

    // Divider: scrubbed to scroll position
    gsap.from('.comparison-divider-fill', {
      scaleY: 0,
      transformOrigin: 'top',
      duration: 1.5,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.comparison-grid',
        start: TRIGGERS.standard,
        end: 'bottom 30%',
        scrub: 1,
      },
    });
  });

  return (
    <section ref={scope} className="bg-white text-navy py-20 md:py-28 overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="comparison-header text-center max-w-2xl mx-auto mb-12" data-animate>
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            What Changes When You Stop{" "}
            <span className="text-coral">Doing It Alone</span>
          </h2>
          <p className="text-navy/60 text-lg">
            You&apos;ve tried doing it all yourself. Here&apos;s what changes when you hand it off to a team that does this every day.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="comparison-grid grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-6">
          {/* Without Us Column */}
          <div className="comparison-left space-y-4" data-animate>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <X className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-600">Without OneSquad</h3>
                <p className="text-sm text-red-500/60">Sound familiar?</p>
              </div>
            </div>

            {withoutUsItems.map((item) => (
              <ComparisonCard
                key={item.title}
                item={item}
                type="without"
              />
            ))}
          </div>

          {/* Center Divider */}
          <div className="hidden lg:flex flex-col items-center self-stretch py-8">
            <div className="w-px flex-1 bg-gradient-to-b from-red-200 via-border to-emerald-200 relative">
              <div
                className="comparison-divider-fill absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-400 via-emerald-400 to-emerald-500"
              />
            </div>
          </div>

          {/* With Us Column */}
          <div className="comparison-right space-y-4" data-animate>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Check className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-700">With OneSquad</h3>
                <p className="text-sm text-navy/60">What working with us looks like</p>
              </div>
            </div>

            {withUsItems.map((item) => (
              <ComparisonCard
                key={item.title}
                item={item}
                type="with"
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

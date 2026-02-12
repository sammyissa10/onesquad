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
      className={`comparison-card flex items-start gap-4 p-4 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 ${
        isWithout
          ? "bg-red-500/10 border border-red-500/20 hover:shadow-red-500/10"
          : "bg-coral/10 border border-coral/20 hover:shadow-coral/10"
      }`}
      data-animate
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isWithout ? "bg-red-500/20" : "bg-coral/20"
        }`}
      >
        <item.icon
          className={`w-6 h-6 ${isWithout ? "text-red-300" : "text-coral"}`}
        />
      </div>
      <div>
        <h4
          className={`font-bold mb-1 ${
            isWithout ? "text-red-300" : "text-coral"
          }`}
        >
          {item.title}
        </h4>
        <p className={`text-sm ${isWithout ? "text-red-200/70" : "text-white/70"}`}>
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

    // Right column: slide from right with delay
    gsap.from('.comparison-right', {
      ...slideFromRight({ delay: 0.2 }),
      scrollTrigger: {
        trigger: '.comparison-grid',
        start: TRIGGERS.standard,
      },
    });

    // Individual cards within columns: stagger
    gsap.utils.toArray('.comparison-card').forEach((card, i) => {
      gsap.from(card as gsap.DOMTarget, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: card as gsap.DOMTarget,
          start: TRIGGERS.late,
        },
      });
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
    <section ref={scope} className="bg-navy text-white py-24 md:py-36 overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="comparison-header text-center max-w-3xl mx-auto mb-16" data-animate>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            What Changes When You Stop{" "}
            <span className="text-coral">Doing It Alone</span>
          </h2>
          <p className="text-white/60 text-lg">
            You've tried doing it all yourself. Here's what changes when you hand it off to a team that does this every day.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="comparison-grid grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-4 items-start">
          {/* Without Us Column */}
          <div className="comparison-left space-y-4" data-animate>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <X className="w-6 h-6 text-red-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-300">Without OneSquad</h3>
                <p className="text-sm text-red-200/70">Sound familiar?</p>
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
          <div className="hidden lg:flex flex-col items-center py-8">
            <div className="w-px h-full bg-gradient-to-b from-red-300/20 via-white/10 to-coral/20 relative">
              <div
                className="comparison-divider-fill absolute top-0 left-0 w-full bg-gradient-to-b from-red-300 via-coral to-coral"
              />
            </div>
          </div>

          {/* With Us Column */}
          <div className="comparison-right space-y-4" data-animate>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-coral/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-coral" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-coral">With OneSquad</h3>
                <p className="text-sm text-white/70">What working with us looks like</p>
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

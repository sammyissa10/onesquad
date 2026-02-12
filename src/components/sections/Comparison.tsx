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
import { fadeUp, scaleReveal, staggerFadeUp, TRIGGERS } from "@/lib/scrollAnimations";

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
    description: "More people finding you in Google, more inquiries coming in, more sales closing",
  },
  {
    icon: Shield,
    title: "Peace of Mind",
    description: "Reliable security, daily backups, and 99.9% uptime — all handled for you",
  },
];

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
        invalidateOnRefresh: true,
      },
    });

    // "Without" items: fast stagger fade up (they're being dismissed)
    gsap.from('.without-item', {
      ...fadeUp({ duration: 0.3 }),
      stagger: staggerFadeUp({ each: 0.06 }),
      scrollTrigger: {
        trigger: '.without-section',
        start: TRIGGERS.standard,
        invalidateOnRefresh: true,
      },
    });

    // Coral divider: scrub-linked animation
    gsap.from('.comparison-divider', {
      scaleX: 0,
      transformOrigin: 'left',
      duration: 1.5,
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '.comparison-divider',
        start: TRIGGERS.standard,
        end: 'bottom 30%',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // Ensure cards start visible - GSAP will manage opacity via ScrollTrigger
    gsap.set('.with-card', { autoAlpha: 1 });

    // "With" cards: slower stagger scale reveal from center (premium feel)
    gsap.from('.with-card', {
      autoAlpha: 0,
      scale: 0.92,
      duration: 0.5,
      ease: 'power2.out',
      immediateRender: false,
      stagger: staggerFadeUp({ each: 0.1, from: 'center' }),
      scrollTrigger: {
        trigger: '.with-section',
        start: TRIGGERS.standard,
        invalidateOnRefresh: true,
      },
    });
  });

  return (
    <section ref={scope} className="relative bg-[#0e1e36] text-white py-24 md:py-36 overflow-hidden">
      {/* Top gradient border for visual separation from ServicesPreview */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coral/20 to-transparent" />

      <Container>
        {/* Section Header */}
        <div className="comparison-header text-center max-w-3xl mx-auto mb-16 md:mb-20" data-animate>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            What Changes When You Stop{" "}
            <span className="text-coral">Doing It Alone</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl">
            You&apos;ve tried doing it all yourself. Here&apos;s what changes when you hand it off to a team that does this every day.
          </p>
        </div>

        {/* Without Section - Compact, Dismissed Items */}
        <div className="without-section mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <X className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-red-400">Without OneSquad</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {withoutUsItems.map((item) => (
              <div
                key={item.title}
                className="without-item flex items-start gap-4 bg-white/[0.03] border border-red-500/15 rounded-2xl p-6"
                data-animate
              >
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <item.icon className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-white/80 line-through decoration-red-500/40">
                    {item.title}
                  </h4>
                  <p className="text-sm text-white/40">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coral Divider - Dramatic Visual Break */}
        <div className="comparison-divider relative h-16 flex items-center justify-center mb-12 md:mb-16" data-animate>
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-coral to-transparent" />
          <div className="relative bg-[#0e1e36] px-6">
            <div className="w-12 h-12 rounded-full bg-coral/10 border-2 border-coral flex items-center justify-center">
              <svg className="w-6 h-6 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>

        {/* With Section - Elevated Premium Cards */}
        <div className="with-section">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-coral/10 border border-coral/20 flex items-center justify-center">
              <Check className="w-5 h-5 text-coral" />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-coral">With OneSquad</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {withUsItems.map((item) => (
              <div
                key={item.title}
                className="with-card bg-white/5 border border-white/10 rounded-2xl p-6 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-coral/10 transition-all duration-300"
                data-cursor="card"
                data-animate
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-coral" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2 text-white">
                      {item.title}
                    </h4>
                    <p className="text-sm text-white/60">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* Bottom gradient border for visual separation from PortfolioPreview */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coral/20 to-transparent" />
    </section>
  );
}

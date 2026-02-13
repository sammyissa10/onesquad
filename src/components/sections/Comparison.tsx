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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useRef, useCallback } from "react";
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
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDraggingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const clamped = Math.min(Math.max(percentage, 5), 95);
    setSliderPosition(clamped);
  }, []);

  const handlePointerUp = useCallback(() => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    document.removeEventListener('pointermove', handlePointerMove as any);
    document.removeEventListener('pointerup', handlePointerUp);
  }, [handlePointerMove]);

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    document.addEventListener('pointermove', handlePointerMove as any);
    document.addEventListener('pointerup', handlePointerUp);
  }, [handlePointerMove, handlePointerUp]);

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

    // Coral divider: gradient wipe from center outward
    gsap.from('.divider-line', {
      scaleX: 0,
      duration: 1.2,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: '.comparison-divider',
        start: TRIGGERS.standard,
        end: 'bottom 30%',
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // Slider container: scale reveal
    gsap.from('.slider-container', {
      ...scaleReveal({ duration: 0.6 }),
      scrollTrigger: {
        trigger: '.slider-container',
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

        {/* Coral Divider - Gradient Wipe */}
        <div className="comparison-divider relative h-20 md:h-24 flex items-center justify-center mb-12 md:mb-16" data-animate>
          <div className="divider-line w-full h-[3px] rounded-full bg-gradient-to-r from-transparent from-5% via-coral to-transparent to-95% shadow-[0_0_12px_rgba(255,107,107,0.4)]" />
        </div>

        {/* Before/After Draggable Slider */}
        <div
          ref={containerRef}
          className="slider-container relative max-w-5xl mx-auto min-h-[400px] md:min-h-[500px] rounded-2xl overflow-hidden select-none"
          data-animate
        >
          {/* Left Panel - "Without OneSquad" (Always visible behind) */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-950/90 to-red-900/70 p-6 md:p-10">
            {/* Label */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <X className="w-4 h-4 text-red-400" />
              <span className="text-sm font-bold text-red-400">Without OneSquad</span>
            </div>

            {/* Items */}
            <div className="mt-16 space-y-6">
              {withoutUsItems.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-red-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white/90 mb-1 text-sm md:text-base">
                      {item.title}
                    </h4>
                    <p className="text-xs md:text-sm text-white/60">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - "With OneSquad" (Revealed via clip-path) */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#0e1e36] to-emerald-950/40 p-6 md:p-10"
            style={{
              clipPath: `inset(0 0 0 ${sliderPosition}%)`,
            }}
          >
            {/* Label */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Check className="w-4 h-4 text-coral" />
              <span className="text-sm font-bold text-coral">With OneSquad</span>
            </div>

            {/* Items */}
            <div className="mt-16 space-y-6">
              {withUsItems.map((item) => (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-coral/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-coral" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1 text-sm md:text-base">
                      {item.title}
                    </h4>
                    <p className="text-xs md:text-sm text-white/70">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Draggable Divider */}
          <div
            className="absolute top-0 bottom-0 w-[3px] bg-coral shadow-lg shadow-coral/30 z-10"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Handle */}
            <div
              onPointerDown={handlePointerDown}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-coral shadow-lg shadow-coral/30 flex items-center justify-center cursor-grab active:cursor-grabbing"
              style={{ touchAction: 'none' }}
            >
              <ChevronLeft className="w-3 h-3 text-white -mr-1" />
              <ChevronRight className="w-3 h-3 text-white -ml-1" />
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom gradient border for visual separation from PortfolioPreview */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coral/20 to-transparent" />
    </section>
  );
}

"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { stats } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, TRIGGERS } from "@/lib/scrollAnimations";

export function Hero() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    // Headline block: fade up with slight delay
    gsap.from('.hero-headline', {
      ...fadeUp(),
      scrollTrigger: {
        trigger: '.hero-grid',
        start: TRIGGERS.hero,
      },
    });

    // Grid blocks: stagger with scale
    gsap.from('.hero-block', {
      opacity: 0,
      y: 30,
      scale: 0.95,
      duration: 0.5,
      stagger: { each: 0.1, from: 'start' },
      scrollTrigger: {
        trigger: '.hero-grid',
        start: TRIGGERS.hero,
      },
    });
  });

  return (
    <section ref={scope} className="relative bg-navy overflow-hidden">
      <div className="hero-grid relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-24">
        {/* Main content: 2-column layout */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left: Headline */}
          <div
            className="hero-headline flex flex-col gap-6"
            data-animate
          >
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.92] text-white tracking-[-0.035em]" style={{ fontFamily: 'var(--font-display), var(--font-heading), sans-serif' }}>
              Your Business Deserves a Website That Actually{" "}
              <span className="bg-gradient-to-r from-coral to-peach bg-clip-text text-transparent">Converts</span>
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-lg">
              We design and build high-performance websites for small businesses across NW Indiana — from first click to paying customer.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <MagneticButton>
                <Link href="/pricing">
                  <Button
                    variant="accent"
                    size="lg"
                    rightIcon={<ArrowRight size={20} />}
                    data-cursor="button"
                  >
                    See Our Plans
                  </Button>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white hover:text-navy"
                    data-cursor="button"
                  >
                    Get a Free Quote
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </div>

          {/* Right: Abstract gradient composition */}
          <div
            className="hero-block relative hidden md:flex items-center justify-center"
            aria-hidden="true"
            data-animate
          >
            {/* Outer glow */}
            <div className="absolute inset-0 rounded-full bg-coral/10 blur-3xl" />

            {/* Main blob — coral/peach radial */}
            <div className="relative w-[480px] h-[480px]">
              {/* Large background circle */}
              <div className="absolute inset-0 rounded-full border border-white/5" />

              {/* Primary coral blob */}
              <div className="absolute top-[10%] left-[10%] w-[75%] h-[75%] rounded-full bg-gradient-to-br from-coral/40 via-peach/25 to-transparent blur-2xl" />

              {/* Secondary peach blob offset */}
              <div className="absolute bottom-[5%] right-[5%] w-[55%] h-[55%] rounded-full bg-gradient-to-tl from-peach/30 via-coral/15 to-transparent blur-2xl" />

              {/* Navy inner ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] rounded-full border border-white/10" />

              {/* Inner navy ring smaller */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-white/8" />

              {/* Center dot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-coral/80" />

              {/* Geometric lines — diagonal grid */}
              <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 480 480" fill="none">
                <line x1="0" y1="120" x2="480" y2="360" stroke="white" strokeWidth="0.5"/>
                <line x1="0" y1="240" x2="480" y2="240" stroke="white" strokeWidth="0.5"/>
                <line x1="0" y1="360" x2="480" y2="120" stroke="white" strokeWidth="0.5"/>
                <line x1="120" y1="0" x2="360" y2="480" stroke="white" strokeWidth="0.5"/>
                <line x1="240" y1="0" x2="240" y2="480" stroke="white" strokeWidth="0.5"/>
                <line x1="360" y1="0" x2="120" y2="480" stroke="white" strokeWidth="0.5"/>
              </svg>

              {/* Floating accent dots */}
              <div className="absolute top-[18%] right-[20%] w-2 h-2 rounded-full bg-coral" />
              <div className="absolute bottom-[22%] left-[18%] w-1.5 h-1.5 rounded-full bg-peach/70" />
              <div className="absolute top-[55%] right-[12%] w-1 h-1 rounded-full bg-white/50" />
              <div className="absolute top-[30%] left-[15%] w-1 h-1 rounded-full bg-white/30" />

              {/* Pill accent — top right */}
              <div className="absolute top-[12%] right-[8%] px-3 py-1.5 rounded-full bg-white/8 border border-white/10 backdrop-blur-sm text-xs text-white/60 font-medium">
                NW Indiana
              </div>

              {/* Pill accent — bottom left */}
              <div className="absolute bottom-[14%] left-[6%] px-3 py-1.5 rounded-full bg-coral/20 border border-coral/30 backdrop-blur-sm text-xs text-coral font-medium">
                ↑ Converts
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            className="hero-block bg-white/5 rounded-2xl p-5 flex flex-col justify-center"
            data-cursor="card"
            data-animate
          >
            <div className="text-2xl md:text-3xl font-bold text-white">
              {stats[0].value}
            </div>
            <div className="text-white/60 text-sm mt-1">
              {stats[0].label}
            </div>
          </div>

          <div
            className="hero-block bg-white/5 rounded-2xl p-5 flex flex-col justify-center"
            data-cursor="card"
            data-animate
          >
            <div className="text-2xl md:text-3xl font-bold text-white">
              {stats[1].value}
            </div>
            <div className="text-white/60 text-sm mt-1">
              {stats[1].label}
            </div>
          </div>

          <div
            className="hero-block bg-white/5 rounded-2xl p-5 flex flex-col justify-center"
            data-cursor="card"
            data-animate
          >
            <div className="text-2xl md:text-3xl font-bold text-white">
              {stats[2].value}
            </div>
            <div className="text-white/60 text-sm mt-1">
              {stats[2].label}
            </div>
          </div>

          <div
            className="hero-block bg-white/5 rounded-2xl p-5 flex flex-col justify-center"
            data-cursor="card"
            data-animate
          >
            <div className="text-2xl md:text-3xl font-bold text-white">
              {stats[3].value}
            </div>
            <div className="text-white/60 text-sm mt-1">
              {stats[3].label}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

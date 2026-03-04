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

          {/* Right: Device mockup — laptop + phone + social proof */}
          <div
            className="hero-block relative hidden md:flex items-center justify-center"
            aria-hidden="true"
            data-animate
          >
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-coral/8 blur-3xl pointer-events-none" />

            <div className="relative w-[460px] h-[420px]">

              {/* ── Laptop ── */}
              <div className="absolute top-0 left-0 w-[380px]">
                {/* Screen bezel */}
                <div className="w-full bg-[#0d1b2e] rounded-xl border border-white/15 shadow-2xl overflow-hidden">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0a1525] border-b border-white/10">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                    <div className="ml-2 flex-1 bg-white/8 rounded px-2 py-0.5 text-[9px] text-white/40 font-mono">
                      onesquads.com
                    </div>
                  </div>
                  {/* Website preview content */}
                  <div className="bg-[#F8F6F3] p-4 space-y-3">
                    {/* Nav bar */}
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-2.5 bg-[#1B2A4A] rounded-sm" />
                      <div className="flex gap-2">
                        <div className="w-7 h-1.5 bg-[#1B2A4A]/20 rounded-sm" />
                        <div className="w-7 h-1.5 bg-[#1B2A4A]/20 rounded-sm" />
                        <div className="w-7 h-1.5 bg-[#1B2A4A]/20 rounded-sm" />
                        <div className="w-10 h-4 bg-coral rounded-full" />
                      </div>
                    </div>
                    {/* Hero block */}
                    <div className="bg-[#1B2A4A] rounded-lg p-4 space-y-2">
                      <div className="w-4/5 h-4 bg-white/90 rounded" />
                      <div className="w-3/5 h-4 bg-white/90 rounded" />
                      <div className="w-2/5 h-3 bg-white/40 rounded mt-1" />
                      <div className="flex gap-2 mt-2">
                        <div className="w-16 h-5 bg-coral rounded-full" />
                        <div className="w-16 h-5 border border-white/30 rounded-full" />
                      </div>
                    </div>
                    {/* Card row */}
                    <div className="grid grid-cols-3 gap-1.5">
                      {[0,1,2].map(i => (
                        <div key={i} className="bg-white rounded-md p-2 space-y-1 shadow-sm">
                          <div className="w-4 h-4 rounded bg-coral/30" />
                          <div className="w-full h-1.5 bg-gray-200 rounded" />
                          <div className="w-3/4 h-1.5 bg-gray-100 rounded" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Laptop base */}
                <div className="mx-auto w-[60%] h-2 bg-[#0d1b2e] rounded-b-lg border-x border-b border-white/10" />
                <div className="mx-auto w-[75%] h-1 bg-[#0a1525] rounded-b-xl" />
              </div>

              {/* ── Phone mockup ── */}
              <div className="absolute bottom-0 right-0 w-[100px] bg-[#0d1b2e] rounded-2xl border border-white/15 shadow-2xl overflow-hidden">
                {/* Phone notch */}
                <div className="flex justify-center pt-2 pb-1">
                  <div className="w-8 h-1 bg-white/20 rounded-full" />
                </div>
                {/* Phone screen */}
                <div className="mx-1.5 mb-2 bg-[#F8F6F3] rounded-xl overflow-hidden">
                  <div className="bg-[#1B2A4A] p-2 space-y-1.5">
                    <div className="w-3/4 h-2 bg-white/80 rounded" />
                    <div className="w-1/2 h-2 bg-white/80 rounded" />
                    <div className="w-12 h-3 bg-coral rounded-full mt-1" />
                  </div>
                  <div className="p-2 space-y-1">
                    <div className="w-full h-1.5 bg-gray-200 rounded" />
                    <div className="w-5/6 h-1.5 bg-gray-100 rounded" />
                    <div className="w-4/6 h-1.5 bg-gray-100 rounded" />
                  </div>
                </div>
                {/* Home bar */}
                <div className="flex justify-center pb-2">
                  <div className="w-6 h-0.5 bg-white/20 rounded-full" />
                </div>
              </div>

              {/* ── Floating badge: Google review ── */}
              <div className="absolute -top-3 right-4 flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 rounded-xl px-3 py-2 shadow-lg">
                <div className="flex text-yellow-400 text-[10px]">★★★★★</div>
                <div>
                  <div className="text-white text-[10px] font-semibold leading-none">5.0 Google</div>
                  <div className="text-white/50 text-[8px] mt-0.5">Lakeside Dental</div>
                </div>
              </div>

              {/* ── Floating badge: traffic up ── */}
              <div className="absolute bottom-16 -left-4 flex items-center gap-2 bg-[#1B2A4A]/90 backdrop-blur-md border border-coral/30 rounded-xl px-3 py-2 shadow-lg">
                <div className="w-6 h-6 rounded-lg bg-coral/20 flex items-center justify-center text-coral text-xs font-bold">↑</div>
                <div>
                  <div className="text-coral text-[11px] font-bold leading-none">+142%</div>
                  <div className="text-white/50 text-[8px] mt-0.5">Monthly Traffic</div>
                </div>
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

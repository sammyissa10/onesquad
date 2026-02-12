"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { stats, siteConfig } from "@/lib/constants";
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
    <section ref={scope} className="relative min-h-[100vh] min-h-dvh bg-navy overflow-hidden">
      <div className="hero-grid relative z-10 grid grid-cols-4 md:grid-cols-6 gap-4 md:gap-5 lg:gap-6 p-4 md:p-6 lg:p-8 min-h-[100vh] min-h-dvh">
        {/* 1. Headline Block - Desktop: col-span-3 row-span-2 */}
        <div
          className="hero-headline col-span-4 md:col-span-3 md:row-span-2 flex flex-col justify-center gap-6 md:gap-8"
          data-animate
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-display font-black leading-[0.9] text-white tracking-tight">
            We Build Digital{" "}
            <span className="text-coral">Empires</span>{" "}
            For Small Businesses
          </h1>
          <p className="text-xl md:text-2xl text-white/70 max-w-2xl">
            Your all-in-one team for web design, marketing, and ongoing support — without the agency price tag.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
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

        {/* 2. Visual Accent Block - Desktop: col-span-3 row-span-2 */}
        <div
          className="hero-block col-span-4 md:col-span-3 md:row-span-2 bg-gradient-to-br from-coral to-peach rounded-3xl p-8 md:p-12 flex items-center justify-center"
          data-cursor="card"
          data-animate
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl lg:text-5xl font-black text-white/95 leading-tight">
              {siteConfig.tagline}
            </div>
            <div className="mt-6 text-lg md:text-xl text-white/80 font-medium">
              OneSquad — Your digital team, simplified
            </div>
          </div>
        </div>

        {/* 3. Stat Block - Desktop: col-span-2 row-span-1 */}
        <div
          className="hero-block col-span-2 md:col-span-2 md:row-span-1 bg-white/5 backdrop-blur-sm rounded-2xl p-6 flex flex-col justify-center"
          data-cursor="card"
          data-animate
        >
          <div className="text-3xl md:text-4xl font-bold text-white">
            {stats[0].value}
          </div>
          <div className="text-white/60 text-sm md:text-base mt-2">
            {stats[0].label}
          </div>
        </div>

        {/* 4. Logo/Brand Block - Desktop: col-span-1 row-span-1 */}
        <div
          className="hero-block col-span-1 md:col-span-1 md:row-span-1 bg-coral/20 rounded-2xl p-4 flex items-center justify-center"
          data-cursor="card"
          data-animate
        >
          <div className="text-3xl md:text-4xl font-black text-coral">
            1S
          </div>
        </div>

        {/* 5. Quick CTA Block - Desktop: col-span-1 row-span-1 */}
        <div
          className="hero-block col-span-1 md:col-span-1 md:row-span-1 bg-peach text-navy rounded-2xl p-4 flex items-center justify-center text-center font-bold hover:bg-peach/90 transition-colors"
          data-cursor="card"
          data-animate
        >
          <Link href="/pricing" className="w-full h-full flex items-center justify-center gap-1">
            <span className="text-sm md:text-base">Start Now</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* 6. Trust Block - Desktop: col-span-2 row-span-1 */}
        <div
          className="hero-block col-span-2 md:col-span-2 md:row-span-1 bg-blue/20 rounded-2xl p-6 flex flex-col justify-center"
          data-cursor="card"
          data-animate
        >
          <div className="text-2xl md:text-3xl font-bold text-white">
            {stats[3].value}
          </div>
          <div className="text-white/60 text-sm md:text-base mt-2">
            {stats[3].label}
          </div>
        </div>
      </div>
    </section>
  );
}

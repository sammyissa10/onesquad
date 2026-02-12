"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { WebsiteBuilderAnimation } from "@/components/ui/WebsiteBuilderAnimation";
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
    <section ref={scope} className="relative bg-navy overflow-hidden">
      <div className="hero-grid relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-24">
        {/* Main content: 2-column layout */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left: Headline */}
          <div
            className="hero-headline flex flex-col gap-6"
            data-animate
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.95] text-white tracking-tight">
              We Build Digital{" "}
              <span className="text-coral">Empires</span>{" "}
              For Small Businesses
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-lg">
              Your all-in-one team for web design, marketing, and ongoing support — without the agency price tag.
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

          {/* Right: Animated Website Builder */}
          <div
            className="hero-block"
            data-cursor="card"
            data-animate
          >
            <WebsiteBuilderAnimation />
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

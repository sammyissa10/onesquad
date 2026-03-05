"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { TRIGGERS } from "@/lib/scrollAnimations";

export function Hero() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    gsap.from(".hero-headline", {
      autoAlpha: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".hero-headline",
        start: TRIGGERS.hero,
      },
    });

    gsap.from(".hero-content", {
      autoAlpha: 0,
      y: 24,
      duration: 0.7,
      ease: "power2.out",
      delay: 0.15,
      scrollTrigger: {
        trigger: ".hero-headline",
        start: TRIGGERS.hero,
      },
    });
  });

  return (
    <section
      ref={scope}
      className="relative bg-[#0d1525] overflow-hidden"
    >
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-20 md:pt-44 md:pb-28">

        {/* Label */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
          <span className="text-xs text-white/50 uppercase tracking-widest font-medium">
            NW Indiana Web Studio
          </span>
        </div>

        {/* Massive headline */}
        <h1
          className="hero-headline text-[2.8rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] leading-[0.92] tracking-[-0.04em] text-white mb-6"
          style={{ fontWeight: 900 }}
          data-animate
        >
          We Build Websites<br />
          Small Businesses<br />
          Are <span className="text-coral">Proud</span> Of.
        </h1>

        {/* Subtext + CTAs */}
        <div className="hero-content" data-animate>
          <p className="text-white/50 text-base md:text-lg max-w-lg mb-8 leading-relaxed">
            Custom-designed, fast, and built to convert visitors into paying customers.
          </p>

          <div className="flex flex-wrap gap-4">
            <MagneticButton>
              <Link href="/pricing">
                <Button
                  variant="accent"
                  size="lg"
                  rightIcon={<ArrowRight size={18} />}
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
                  className="border-white/20 text-white hover:bg-white hover:text-navy"
                  data-cursor="button"
                >
                  Free Quote
                </Button>
              </Link>
            </MagneticButton>
          </div>

          {/* Trust statement */}
          <div className="border-t border-white/10 mt-12 pt-6">
            <p className="text-white/40 text-sm">
              Trusted by 50+ businesses across NW Indiana&nbsp;&nbsp;·&nbsp;&nbsp;5.0★ Google Rating
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

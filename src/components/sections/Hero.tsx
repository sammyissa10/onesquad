"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { TRIGGERS } from "@/lib/scrollAnimations";

export function Hero() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    gsap.from(".hero-label", {
      autoAlpha: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".hero-label",
        start: TRIGGERS.hero,
      },
    });

    gsap.from(".hero-headline", {
      autoAlpha: 0,
      y: 50,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.1,
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
      delay: 0.3,
      scrollTrigger: {
        trigger: ".hero-headline",
        start: TRIGGERS.hero,
      },
    });
  });

  return (
    <section
      ref={scope}
      className="relative bg-[#0d1525] overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
        aria-hidden="true"
      />

      {/* Large ghosted number */}
      <span
        className="absolute right-0 bottom-0 text-[30vw] font-black text-white/[0.02] leading-none select-none pointer-events-none translate-y-[10%]"
        aria-hidden="true"
      >
        1S
      </span>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 md:pt-44 md:pb-32">

        {/* Label */}
        <div className="hero-label flex items-center gap-3 mb-10" data-animate>
          <span className="w-1.5 h-1.5 rounded-full bg-coral" />
          <span className="text-xs text-white/40 uppercase tracking-[0.2em] font-medium">
            NW Indiana Web Studio
          </span>
        </div>

        {/* Massive headline */}
        <h1
          className="hero-headline text-[3rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[8rem] leading-[0.88] tracking-[-0.04em] text-white mb-12"
          style={{ fontWeight: 900 }}
          data-animate
        >
          We Build Websites<br />
          Small Businesses<br />
          Are <span className="text-coral">Proud</span> Of.
        </h1>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-12" aria-hidden="true" />

        {/* Subtext + CTAs */}
        <div className="hero-content flex flex-col md:flex-row md:items-end gap-8 md:gap-16" data-animate>
          <p className="text-white/45 text-base md:text-lg max-w-sm leading-relaxed">
            Custom-designed, fast, and built to convert visitors into paying customers.
          </p>

          <div className="flex flex-wrap gap-4 md:ml-auto">
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
        </div>
      </div>

      {/* Bottom edge line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" aria-hidden="true" />
    </section>
  );
}

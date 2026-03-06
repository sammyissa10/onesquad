"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { TRIGGERS } from "@/lib/scrollAnimations";

function BrowserMockup() {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden">
      {/* Browser chrome bar */}
      <div className="h-8 bg-white/5 border-b border-white/10 flex items-center px-3 gap-1.5">
        <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
        <div className="ml-3 flex-1 h-4 rounded-full bg-white/5" />
      </div>

      {/* Browser body */}
      <div className="aspect-[4/3] p-5">
        {/* Fake nav bar */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-1 w-1/3 rounded-full bg-coral/40" />
          <div className="ml-auto flex gap-2">
            <div className="h-1 w-8 rounded-full bg-white/10" />
            <div className="h-1 w-8 rounded-full bg-white/10" />
            <div className="h-1 w-8 rounded-full bg-white/10" />
          </div>
        </div>

        {/* Fake hero area */}
        <div className="mb-4 space-y-2">
          <div className="h-8 w-3/4 rounded-md bg-white/10" />
          <div className="h-4 w-1/2 rounded-md bg-white/5" />
        </div>

        {/* Fake content cards — 2-column grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="h-16 rounded-lg bg-white/[0.07]" />
          <div className="h-16 rounded-lg bg-white/[0.07]" />
        </div>

        {/* Fake CTA button */}
        <div className="h-6 w-20 rounded-md bg-coral/30" />
      </div>
    </div>
  );
}

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

    gsap.from(".hero-mockup", {
      autoAlpha: 0,
      scale: 0.95,
      duration: 1,
      ease: "power3.out",
      delay: 0.4,
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left column: text content */}
          <div>
            {/* Label */}
            <div className="hero-label flex items-center gap-3 mb-10" data-animate>
              <span className="w-1.5 h-1.5 rounded-full bg-coral" />
              <span className="text-xs text-white/40 uppercase tracking-[0.2em] font-medium">
                NW Indiana Web Studio
              </span>
            </div>

            {/* Massive headline */}
            <h1
              className="hero-headline text-[2.4rem] sm:text-[3.2rem] md:text-[4rem] lg:text-[4rem] xl:text-[4.5rem] leading-[0.92] tracking-[-0.03em] text-white mb-12"
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
            <div className="hero-content flex flex-col md:flex-row md:items-end gap-8 md:gap-10" data-animate>
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

          {/* Right column: browser mockup */}
          <div className="hero-mockup lg:block" data-animate>
            <BrowserMockup />
          </div>

        </div>
      </div>

      {/* Bottom edge line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" aria-hidden="true" />
    </section>
  );
}

"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, TRIGGERS } from "@/lib/scrollAnimations";

const CLIENTS = ["Dental Offices", "Restaurants", "Contractors", "Gyms", "Law Firms", "Real Estate"];

export function Hero() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    gsap.from('.hero-eyebrow', {
      autoAlpha: 0, y: 20, duration: 0.5,
      scrollTrigger: { trigger: '.hero-wrap', start: TRIGGERS.hero },
    });
    gsap.from('.hero-headline', {
      ...fadeUp(),
      delay: 0.1,
      scrollTrigger: { trigger: '.hero-wrap', start: TRIGGERS.hero },
    });
    gsap.from('.hero-sub', {
      autoAlpha: 0, y: 20, duration: 0.6, delay: 0.25,
      scrollTrigger: { trigger: '.hero-wrap', start: TRIGGERS.hero },
    });
    gsap.from('.hero-ctas', {
      autoAlpha: 0, y: 16, duration: 0.5, delay: 0.4,
      scrollTrigger: { trigger: '.hero-wrap', start: TRIGGERS.hero },
    });
    gsap.from('.hero-proof', {
      autoAlpha: 0, y: 12, duration: 0.5, delay: 0.55,
      scrollTrigger: { trigger: '.hero-wrap', start: TRIGGERS.hero },
    });
  });

  return (
    <section ref={scope} className="relative bg-[#0f1c30] overflow-hidden">

      {/* Mesh gradient background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Top-left warm glow */}
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-coral/10 blur-[120px]" />
        {/* Bottom-right cool glow */}
        <div className="absolute -bottom-32 -right-16 w-[500px] h-[500px] rounded-full bg-[#2D3E5E]/60 blur-[100px]" />
        {/* Center accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full bg-coral/5 blur-[80px]" />
        {/* Dot grid overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="hero-wrap relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8 pt-36 pb-28 md:pt-44 md:pb-36 flex flex-col items-center text-center">

        {/* Eyebrow pill */}
        <div className="hero-eyebrow inline-flex items-center gap-2 bg-white/6 border border-white/10 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
          <span className="text-sm text-white/70 font-medium tracking-wide">NW Indiana&apos;s Web Design Studio</span>
        </div>

        {/* Main headline */}
        <h1
          className="hero-headline text-[3.5rem] sm:text-[5rem] lg:text-[6.5rem] xl:text-[7.5rem] font-bold leading-[0.9] tracking-[-0.04em] text-white max-w-5xl"
          style={{ fontFamily: 'var(--font-display), var(--font-heading), sans-serif' }}
        >
          Websites that{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-coral via-peach to-coral bg-clip-text text-transparent bg-[length:200%] animate-[shimmer_3s_linear_infinite]">
              actually work.
            </span>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="hero-sub mt-8 text-lg md:text-xl text-white/55 max-w-2xl leading-relaxed">
          We design and build high-performance websites for small businesses —
          turning visitors into paying customers. No templates. No fluff. Just results.
        </p>

        {/* CTAs */}
        <div className="hero-ctas flex flex-col sm:flex-row gap-3 mt-10">
          <MagneticButton>
            <Link href="/pricing">
              <Button variant="accent" size="lg" rightIcon={<ArrowRight size={20} />} data-cursor="button">
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
                Get a Free Quote
              </Button>
            </Link>
          </MagneticButton>
        </div>

        {/* Social proof row */}
        <div className="hero-proof mt-14 flex flex-col items-center gap-4">
          <p className="text-xs text-white/30 uppercase tracking-widest font-medium">Trusted by local businesses including</p>
          <div className="flex flex-wrap justify-center gap-2">
            {CLIENTS.map((name) => (
              <span
                key={name}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/8 text-white/45 text-xs font-medium"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0f1c30] to-transparent pointer-events-none" />
    </section>
  );
}

"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { TRIGGERS } from "@/lib/scrollAnimations";

export function ScrollPromptBanner() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    gsap.from(".scroll-banner-content", {
      autoAlpha: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".scroll-banner-content",
        start: TRIGGERS.standard,
        invalidateOnRefresh: true,
      },
    });

    // Bouncing chevrons
    gsap.to(".scroll-chevron", {
      y: 8,
      duration: 1.2,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  });

  return (
    <section ref={scope} className="relative bg-white overflow-hidden">
      {/* Wavy top border SVG */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0h1440v20c-120 15-240 25-360 20s-240-25-360-20-240 25-360 20-240-25-360-20V0z"
            fill="white"
          />
          <path
            d="M0 20c120 15 240 25 360 20s240-25 360-20 240 25 360 20 240-25 360-20"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      {/* Dark navy top strip */}
      <div className="bg-[#0e1e36] h-16 md:h-20" />

      {/* Main coral banner */}
      <div className="scroll-banner-content relative bg-coral py-12 md:py-16 lg:py-20">
        {/* Organic border outline */}
        <div className="absolute inset-3 md:inset-5 border-2 border-white/20 rounded-[2rem] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-8 md:px-12 flex items-center gap-6 md:gap-10">
          {/* Left chevron */}
          <div className="scroll-chevron hidden md:flex flex-shrink-0">
            <ChevronDown className="w-14 h-14 text-[#0e1e36]" strokeWidth={3} />
          </div>

          {/* Center text */}
          <p className="text-xl md:text-2xl lg:text-3xl font-bold italic text-[#0e1e36] text-center leading-snug">
            Let&apos;s scroll through a day in the life of your Business
            &mdash; and see why you need a digital team on your side...
          </p>

          {/* Right chevron */}
          <div className="scroll-chevron hidden md:flex flex-shrink-0">
            <ChevronDown className="w-14 h-14 text-[#0e1e36]" strokeWidth={3} />
          </div>
        </div>

        <p className="text-sm md:text-base font-semibold text-[#0e1e36]/80 text-center mt-3 max-w-4xl mx-auto px-8 md:px-12">
          Drop us your business name and email — we&apos;ll send you a free website mockup within 24 hours. No strings, no credit card.
        </p>

        {/* Get a Free Mockup button */}
        <div className="relative flex justify-end max-w-4xl mx-auto px-8 md:px-12 mt-6">
          <Link
            href="/contact"
            className="inline-block bg-peach text-[#0e1e36] font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-white transition-colors duration-200"
            data-cursor="button"
          >
            Get a Free Mockup
          </Link>
        </div>
      </div>

      {/* Wavy bottom border SVG */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60h1440V40c-120-15-240-25-360-20s-240 25-360 20-240-25-360-20-240 25-360 20V60z"
            fill="white"
          />
          <path
            d="M0 40c120-15 240-25 360-20s240 25 360 20 240-25 360-20 240 25 360 20"
            stroke="#CBD5E1"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>
    </section>
  );
}

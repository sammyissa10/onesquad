"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, MOTION_QUERIES } from "@/lib/gsap";

interface WebsiteBuilderAnimationProps {
  className?: string;
}

export function WebsiteBuilderAnimation({ className = "" }: WebsiteBuilderAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Animation branch - runs only when reduced motion is NOT active
      mm.add(MOTION_QUERIES.noPreference, () => {
        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 1.5,
          defaults: { ease: "power2.out" },
        });

        // 1. Nav slides in from top
        tl.from(".mock-nav", {
          autoAlpha: 0,
          y: -15,
          duration: 0.4,
        });

        // 2. Hero image fades in with slight scale
        tl.from(
          ".mock-hero-img",
          {
            autoAlpha: 0,
            scale: 0.95,
            duration: 0.5,
          },
          "-=0.1"
        );

        // 3. Text lines stagger in
        tl.from(
          ".mock-text",
          {
            autoAlpha: 0,
            x: -20,
            duration: 0.3,
            stagger: 0.12,
          },
          "-=0.15"
        );

        // 4. Buttons pop in
        tl.from(
          ".mock-buttons > *",
          {
            autoAlpha: 0,
            scale: 0.8,
            duration: 0.3,
            stagger: 0.1,
          },
          "-=0.1"
        );

        // 5. Cards stagger up
        tl.from(
          ".mock-cards > *",
          {
            autoAlpha: 0,
            y: 15,
            duration: 0.35,
            stagger: 0.08,
          },
          "-=0.1"
        );

        // 6. Footer slides up
        tl.from(
          ".mock-footer",
          {
            autoAlpha: 0,
            y: 10,
            duration: 0.3,
          },
          "-=0.05"
        );

        // 7. Hold fully built state for 2.5 seconds
        tl.to({}, { duration: 2.5 });

        // 8. Everything fades out together
        tl.to(".mock-el", { autoAlpha: 0, duration: 0.4 });

        // Timeline automatically repeats due to repeat: -1 and repeatDelay: 1.5

        // Pause timeline when scrolled out of viewport to reduce main thread work
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top bottom',    // element top reaches viewport bottom (entering)
          end: 'bottom top',      // element bottom passes viewport top (leaving)
          onEnter: () => tl.play(),
          onLeave: () => tl.pause(),
          onEnterBack: () => tl.play(),
          onLeaveBack: () => tl.pause(),
        });
      });

      // Reduced motion branch - show static completed state
      mm.add(MOTION_QUERIES.reduced, () => {
        gsap.set(".mock-el", { autoAlpha: 1 });
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      {/* Browser Chrome Frame */}
      <div className="rounded-2xl bg-[#0e1e36] border border-white/10 overflow-hidden">
        {/* Top Bar with Dots and URL Bar */}
        <div className="h-8 flex items-center px-3 bg-[#0a1628]">
          {/* Traffic Light Dots */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>

          {/* Fake URL Bar */}
          <div className="flex-1 mx-3 h-4 bg-white/5 rounded-md flex items-center px-2">
            <span className="text-[10px] text-white/30">onesquads.com</span>
          </div>
        </div>

        {/* Browser Viewport - Mock Website */}
        <div className="bg-[#0a1628] min-h-[240px] md:min-h-[300px] p-3 md:p-4">
          {/* Nav Bar */}
          <div className="mock-nav mock-el h-6 flex justify-between items-center mb-3">
            {/* Logo placeholder */}
            <div className="w-12 h-3 bg-coral/60 rounded" />
            {/* Nav links */}
            <div className="flex gap-2">
              <div className="w-6 h-2 bg-white/15 rounded" />
              <div className="w-6 h-2 bg-white/15 rounded" />
              <div className="w-6 h-2 bg-white/15 rounded" />
            </div>
          </div>

          {/* Hero Image Area */}
          <div className="mock-hero-img mock-el w-full h-20 md:h-24 rounded-lg bg-gradient-to-br from-coral/20 to-peach/20 mb-3 flex items-center justify-center">
            {/* Simple abstract icon - triangle play button */}
            <div className="w-0 h-0 border-l-[12px] border-l-white/10 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent" />
          </div>

          {/* Text Lines */}
          <div className="space-y-1.5 mb-3">
            <div className="mock-text mock-el w-3/4 h-3 bg-white/20 rounded" />
            <div className="mock-text mock-el w-1/2 h-3 bg-white/15 rounded" />
            <div className="mock-text mock-el w-2/3 h-2 bg-white/10 rounded" />
          </div>

          {/* Buttons */}
          <div className="mock-buttons flex gap-2 mb-3">
            <div className="mock-el w-16 h-5 bg-coral/50 rounded-md" />
            <div className="mock-el w-16 h-5 bg-white/10 rounded-md border border-white/20" />
          </div>

          {/* Card Row */}
          <div className="mock-cards flex gap-2 mb-3">
            <div className="mock-el w-1/3 h-12 md:h-16 bg-white/5 rounded-md border border-white/5" />
            <div className="mock-el w-1/3 h-12 md:h-16 bg-white/5 rounded-md border border-white/5" />
            <div className="mock-el w-1/3 h-12 md:h-16 bg-white/5 rounded-md border border-white/5" />
          </div>

          {/* Footer */}
          <div className="mock-footer mock-el h-5 bg-white/5 rounded-sm w-full flex items-center px-2 gap-2">
            <div className="w-8 h-1.5 bg-white/10 rounded" />
            <div className="w-8 h-1.5 bg-white/10 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import { useEffect, useRef, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  // Listen for reduced-motion preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // GSAP ticker sync - controls Lenis RAF
  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    // Enable lag smoothing to prevent jarring jumps on heavy frames
    // 500ms threshold, 33ms minimum frame time
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  // Compute Lenis options based on reduced-motion preference
  const lenisOptions = useMemo(() => {
    if (prefersReducedMotion) {
      // Disable smooth interpolation for reduced motion
      return {
        lerp: 1, // instant - no interpolation
        smoothWheel: false,
        syncTouch: false,
        touchMultiplier: 1,
        wheelMultiplier: 1,
        infinite: false,
        orientation: "vertical" as const,
        gestureOrientation: "vertical" as const,
      };
    }

    // Full smooth scroll experience
    return {
      lerp: 0.18, // Increased from 0.12 for tighter scroll-animation sync
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 1,
      infinite: false,
      autoResize: true, // Recalculate dimensions on resize to prevent stale measurements
      orientation: "vertical" as const,
      gestureOrientation: "vertical" as const,
    };
  }, [prefersReducedMotion]);

  // Route change scroll-to-top
  // NOTE: Do NOT kill ScrollTrigger instances here — useGSAP's scope cleanup
  // handles that automatically when components unmount. Killing them here
  // destroys triggers created by child components that mounted before this
  // useEffect runs (useLayoutEffect < useEffect timing).
  useEffect(() => {
    // Scroll to top instantly on route change
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true });

    // Clear cached scroll positions from previous route
    ScrollTrigger.clearScrollMemory();

    // Refresh ScrollTrigger after new page content loads
    // First refresh after initial render settles
    const timer1 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    // Safety refresh for lazy content (images, dynamic sections)
    const timer2 = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pathname]);

  return (
    <ReactLenis
      ref={lenisRef}
      autoRaf={false}
      options={lenisOptions}
      key={prefersReducedMotion ? 'reduced' : 'full'}
      root
    >
      {children}
    </ReactLenis>
  );
}

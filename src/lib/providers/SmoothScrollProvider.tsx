"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef, useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<any>(null);
  const pathname = usePathname();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect prefers-reduced-motion and listen for changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    // Set initial state
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
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
    gsap.ticker.lagSmoothing(0);

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
      lerp: 0.075,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.075,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
      infinite: false,
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

    // Refresh ScrollTrigger after new page content loads
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    return () => clearTimeout(timer);
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

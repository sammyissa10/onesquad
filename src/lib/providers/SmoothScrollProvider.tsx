"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<any>(null);
  const pathname = usePathname();

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

  // Route change scroll-to-top
  useEffect(() => {
    // Scroll to top instantly on route change
    lenisRef.current?.lenis?.scrollTo(0, { immediate: true });

    // Refresh ScrollTrigger after content loads
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <ReactLenis
      ref={lenisRef}
      autoRaf={false}
      options={{
        lerp: 0.075,
        smoothWheel: true,
        syncTouch: true,
        syncTouchLerp: 0.075,
        touchMultiplier: 1.5,
        wheelMultiplier: 1,
        infinite: false,
        orientation: "vertical",
        gestureOrientation: "vertical",
      }}
      root
    >
      {children}
    </ReactLenis>
  );
}

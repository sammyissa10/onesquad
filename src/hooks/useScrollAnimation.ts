/**
 * Reusable scroll animation hook with automatic cleanup and reduced-motion support.
 *
 * - Wraps useGSAP with `scope` for automatic ScrollTrigger cleanup on unmount (ANIM-06)
 * - Uses gsap.matchMedia to disable animations when prefers-reduced-motion is active (ANIM-05)
 * - Elements with `data-animate` attribute are made visible when animations are disabled
 *
 * @example
 * function MySection() {
 *   const { scope } = useScrollAnimation(({ gsap, ScrollTrigger }) => {
 *     gsap.from('.item', {
 *       opacity: 0, y: 50, stagger: 0.08,
 *       scrollTrigger: { trigger: '.items-container', start: 'top 80%' }
 *     });
 *   });
 *   return <section ref={scope}>...</section>;
 * }
 */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, MOTION_QUERIES } from "@/lib/gsap";

interface UseScrollAnimationOptions {
  // Pass false to disable the hook entirely (for conditional usage)
  enabled?: boolean;
  // Dependencies array for useGSAP (triggers re-run when changed)
  deps?: unknown[];
}

type AnimationCallback = (context: {
  gsap: typeof gsap;
  ScrollTrigger: typeof ScrollTrigger;
}) => void;

export function useScrollAnimation(
  // Called only when prefers-reduced-motion is NOT active
  animate: AnimationCallback,
  options?: UseScrollAnimationOptions
): {
  scope: React.RefObject<HTMLDivElement | null>;
  contextSafe: <T extends (...args: unknown[]) => void>(fn: T) => T;
} {
  const scopeRef = useRef<HTMLDivElement>(null);

  // useGSAP with scope parameter for automatic cleanup (ANIM-06)
  const { contextSafe } = useGSAP(
    () => {
      // Early return if disabled
      if (options?.enabled === false) {
        return;
      }

      // Create matchMedia instance for reduced-motion branching (ANIM-05)
      const mm = gsap.matchMedia();

      // Animation branch - runs only when reduced motion is NOT active
      mm.add(MOTION_QUERIES.noPreference, () => {
        // Promote animated elements to GPU layer before animations start
        // This prevents compositor thrashing when transforms/opacity change mid-scroll
        if (scopeRef.current) {
          gsap.set(scopeRef.current.querySelectorAll('[data-animate]'), {
            willChange: 'transform, opacity',
          });
        }

        animate({ gsap, ScrollTrigger });
      });

      // Reduced motion branch - make animated elements visible
      mm.add(MOTION_QUERIES.reduced, () => {
        // Make all potentially-animated elements visible
        // Future animations that start with opacity:0 or transforms
        // need their targets to be visible when animations are disabled
        if (scopeRef.current) {
          gsap.set(scopeRef.current.querySelectorAll('[data-animate]'), {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            clearProps: 'all',
          });
        }
      });

      // Cleanup handled by useGSAP context
      return () => mm.revert();
    },
    {
      scope: scopeRef, // KEY to ANIM-06 - automatic ScrollTrigger cleanup on unmount
      dependencies: options?.deps ?? [],
    }
  );

  return { scope: scopeRef, contextSafe };
}

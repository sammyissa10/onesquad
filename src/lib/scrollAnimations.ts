/**
 * Reusable GSAP scroll animation preset configurations
 *
 * These are NOT ScrollTrigger creators — they return animation config objects
 * that sections consume via useScrollAnimation hook.
 *
 * Each preset function returns { from, config } objects that gsap.from() can use.
 * Presets can be spread into gsap.from() calls: `gsap.from('.item', { ...fadeUp() })`
 *
 * Import pattern: `import { fadeUp, scaleReveal, TRIGGERS } from '@/lib/scrollAnimations'`
 */

import type { gsap } from "gsap";

/**
 * Animation configuration object shape
 * Matches GSAP's from() method parameters
 */
export interface AnimationConfig {
  opacity?: number;
  y?: number;
  x?: number;
  scale?: number;
  rotation?: number;
  clipPath?: string;
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: {
    each?: number;
    from?: number | "start" | "center" | "end" | "edges" | "random" | [number, number];
    ease?: string;
  };
  [key: string]: unknown; // Allow any GSAP property
}

/**
 * Common ScrollTrigger start positions
 * Use these for consistent trigger timing across sections
 */
export const TRIGGERS = {
  standard: 'top 80%', // Most sections — element is 80% from top of viewport
  early: 'top 85%', // Headlines — trigger slightly earlier for anticipation
  late: 'top 70%', // Grids, cards — delay until more visible
  hero: 'top 95%', // Near-immediate for above-fold content
} as const;

/**
 * Default reveal for text blocks
 * Fades in from below with slight upward movement
 *
 * @example
 * gsap.from('.headline', { ...fadeUp(), scrollTrigger: { trigger: '.section', start: TRIGGERS.early } });
 */
export function fadeUp(opts?: Partial<AnimationConfig>): AnimationConfig {
  return {
    opacity: 0,
    y: 50,
    duration: 0.6,
    ease: 'power2.out',
    ...opts,
  };
}

/**
 * Scale reveal for cards, grid items
 * Subtle scale + opacity creates depth perception
 *
 * @example
 * gsap.from('.card', { ...scaleReveal(), scrollTrigger: { trigger: '.cards', start: TRIGGERS.late } });
 */
export function scaleReveal(opts?: Partial<AnimationConfig>): AnimationConfig {
  return {
    opacity: 0,
    scale: 0.92,
    duration: 0.5,
    ease: 'power2.out',
    ...opts,
  };
}

/**
 * ClipPath reveal for images, hero accents
 * Creates wipe effect from various directions
 *
 * @param direction - 'top', 'left', 'bottom' (default: 'top')
 * @param opts - Additional GSAP properties
 *
 * @example
 * gsap.from('.image', { ...clipReveal('top'), scrollTrigger: { trigger: '.image', start: TRIGGERS.standard } });
 */
export function clipReveal(
  direction: 'top' | 'left' | 'bottom' = 'top',
  opts?: Partial<AnimationConfig>
): AnimationConfig {
  const clipPaths: Record<typeof direction, string> = {
    top: 'inset(0% 0% 100% 0%)', // Reveal from top down
    left: 'inset(0% 100% 0% 0%)', // Reveal from left to right
    bottom: 'inset(100% 0% 0% 0%)', // Reveal from bottom up
  };

  return {
    clipPath: clipPaths[direction],
    duration: 1.0,
    ease: 'power2.out',
    ...opts,
  };
}

/**
 * Slide from left for comparison columns, side content
 * Combines opacity + horizontal movement
 *
 * @example
 * gsap.from('.left-column', { ...slideFromLeft(), scrollTrigger: { trigger: '.grid', start: TRIGGERS.standard } });
 */
export function slideFromLeft(opts?: Partial<AnimationConfig>): AnimationConfig {
  return {
    opacity: 0,
    x: -60,
    duration: 0.7,
    ease: 'power3.out',
    ...opts,
  };
}

/**
 * Slide from right for comparison columns, side content
 * Combines opacity + horizontal movement (opposite direction)
 *
 * @example
 * gsap.from('.right-column', { ...slideFromRight(), scrollTrigger: { trigger: '.grid', start: TRIGGERS.standard } });
 */
export function slideFromRight(opts?: Partial<AnimationConfig>): AnimationConfig {
  return {
    opacity: 0,
    x: 60,
    duration: 0.7,
    ease: 'power3.out',
    ...opts,
  };
}

/**
 * Stagger configuration for sequential reveals
 * Returns stagger object that can be merged with other configs
 *
 * @example
 * gsap.from('.items', { ...fadeUp(), stagger: staggerFadeUp() });
 * gsap.from('.items', { ...fadeUp(), stagger: staggerFadeUp({ each: 0.12 }) });
 */
export function staggerFadeUp(opts?: {
  each?: number;
  from?: number | "start" | "center" | "end" | "edges" | "random" | [number, number];
  ease?: string;
}) {
  return {
    each: opts?.each ?? 0.08,
    from: opts?.from ?? 'start' as const,
    ...(opts?.ease ? { ease: opts.ease } : {}),
  };
}

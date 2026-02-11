/**
 * Centralized GSAP configuration and plugin registration
 *
 * IMPORTANT: Import gsap and ScrollTrigger from this file, NOT from 'gsap' directly.
 * This ensures plugins are registered globally and defaults are applied consistently.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
gsap.registerPlugin(ScrollTrigger);

// Set GSAP global defaults
gsap.defaults({
  ease: "power2.out",
  duration: 0.6,
});

// Set ScrollTrigger defaults
ScrollTrigger.defaults({
  toggleActions: "play none none none",
  markers: false, // Set to true manually in dev if needed; markers clutter viewport
});

// Named exports - use these in all components
export { gsap, ScrollTrigger };

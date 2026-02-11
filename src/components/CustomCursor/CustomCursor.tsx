"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, MOTION_QUERIES } from "@/lib/gsap";

export function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Touch device detection - check on mount to avoid SSR mismatch
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasTouch =
        "ontouchstart" in window || (navigator.maxTouchPoints || 0) > 0;
      setIsTouchDevice(hasTouch);
    }
  }, []);

  // Main cursor logic - mouse tracking and reduced-motion support
  useEffect(() => {
    // Don't render on touch devices
    if (isTouchDevice) return;

    const dotElement = cursorDotRef.current;
    const followerElement = cursorFollowerRef.current;

    if (!dotElement || !followerElement) return;

    // Use matchMedia for reduced-motion support
    const mm = gsap.matchMedia();

    mm.add(
      {
        reduced: MOTION_QUERIES.reduced,
        noPreference: MOTION_QUERIES.noPreference,
      },
      (context) => {
        const { reduced } = context.conditions as { reduced: boolean };

        if (reduced) {
          // Hide cursor when reduced motion is active
          gsap.set([dotElement, followerElement], { display: "none" });
          return;
        }

        // Add cursor-active class to html for native cursor hiding
        document.documentElement.classList.add("cursor-active");

        // Create quickTo functions for smooth tracking
        const xToDot = gsap.quickTo(dotElement, "x", {
          duration: 0.15,
          ease: "power2.out",
        });
        const yToDot = gsap.quickTo(dotElement, "y", {
          duration: 0.15,
          ease: "power2.out",
        });

        const xToFollower = gsap.quickTo(followerElement, "x", {
          duration: 0.5,
          ease: "power2.out",
        });
        const yToFollower = gsap.quickTo(followerElement, "y", {
          duration: 0.5,
          ease: "power2.out",
        });

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
          // Fade in on first movement
          if (!isVisible) {
            gsap.to([dotElement, followerElement], {
              opacity: 1,
              duration: 0.3,
            });
            setIsVisible(true);
          }

          // Update positions using quickTo
          xToDot(e.clientX);
          yToDot(e.clientY);
          xToFollower(e.clientX);
          yToFollower(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
          document.documentElement.classList.remove("cursor-active");
        };
      }
    );

    return () => {
      mm.revert();
    };
  }, [isTouchDevice, isVisible]);

  // Don't render on touch devices (JS fallback)
  if (isTouchDevice) {
    return null;
  }

  return (
    <>
      {/* Cursor dot - small, fast-following */}
      <div
        ref={cursorDotRef}
        className="custom-cursor"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          backgroundColor: "#E2795E",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Cursor follower - larger ring with slower lag */}
      <div
        ref={cursorFollowerRef}
        className="custom-cursor"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "32px",
          height: "32px",
          border: "2px solid #E2795E",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          transform: "translate(-50%, -50%)",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}

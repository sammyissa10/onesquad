"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, MOTION_QUERIES } from "@/lib/gsap";

export function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice] = useState(() => {
    if (typeof window === "undefined") return false;
    // Use pointer: coarse to detect actual touchscreens (phones/tablets).
    // ontouchstart/maxTouchPoints incorrectly flags Mac trackpads as touch devices.
    return window.matchMedia("(pointer: coarse)").matches;
  });

  // Cursor state refs - use refs to avoid re-renders on hover state changes
  const currentStateRef = useRef<string>("default");
  const currentTextRef = useRef<string>("");

  // Main cursor logic - mouse tracking and reduced-motion support
  useEffect(() => {
    // Don't render on touch devices
    if (isTouchDevice) return;

    const dotElement = cursorDotRef.current;
    const followerElement = cursorFollowerRef.current;
    const textElement = cursorTextRef.current;

    if (!dotElement || !followerElement || !textElement) return;

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

        // Cursor state transition function
        const setCursorState = (state: string, text: string = "") => {
          // Skip if state hasn't changed
          if (currentStateRef.current === state && currentTextRef.current === text) {
            return;
          }

          // Kill any in-progress animations
          gsap.killTweensOf([dotElement, followerElement, textElement]);

          // Update refs
          currentStateRef.current = state;
          currentTextRef.current = text;

          // Apply state-specific animations
          switch (state) {
            case "button":
              // Button state: shrink dot, compact follower with white fill + invert
              gsap.to(dotElement, {
                width: 4,
                height: 4,
                duration: 0.3,
                ease: "power2.out",
              });
              gsap.to(followerElement, {
                width: 20,
                height: 20,
                borderColor: "#E2795E",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                mixBlendMode: "difference",
                duration: 0.3,
                ease: "power2.out",
              });
              // Ensure text is hidden for button state
              if (textElement.textContent) {
                gsap.to(textElement, {
                  opacity: 0,
                  scale: 0.8,
                  duration: 0.2,
                  ease: "power2.out",
                  onComplete: () => {
                    textElement.textContent = "";
                  },
                });
              }
              break;

            case "card":
              // Card state: fade out dot, expand follower dramatically with coral fill
              gsap.to(dotElement, {
                opacity: 0,
                duration: 0.4,
                ease: "power3.out",
              });
              gsap.to(followerElement, {
                width: 80,
                height: 80,
                borderColor: "transparent",
                backgroundColor: "rgba(226, 121, 94, 0.3)",
                mixBlendMode: "normal",
                duration: 0.4,
                ease: "power3.out",
              });
              // If text is provided, show it inside the coral spotlight
              if (text) {
                textElement.textContent = text;
                gsap.fromTo(
                  textElement,
                  { opacity: 0, scale: 0.8 },
                  {
                    opacity: 1,
                    scale: 1,
                    duration: 0.2,
                    delay: 0.1,
                    ease: "power2.out",
                  }
                );
              } else if (textElement.textContent) {
                gsap.to(textElement, {
                  opacity: 0,
                  scale: 0.8,
                  duration: 0.2,
                  ease: "power2.out",
                  onComplete: () => {
                    textElement.textContent = "";
                  },
                });
              }
              break;

            case "text":
              // Text state: fade out dot, expand follower with navy fill + white text
              gsap.to(dotElement, {
                opacity: 0,
                duration: 0.4,
                ease: "power3.out",
              });
              gsap.to(followerElement, {
                width: 80,
                height: 80,
                borderColor: "transparent",
                backgroundColor: "rgba(5, 23, 51, 0.9)",
                mixBlendMode: "normal",
                duration: 0.4,
                ease: "power3.out",
              });
              // Show text label
              if (text) {
                textElement.textContent = text;
                gsap.fromTo(
                  textElement,
                  { opacity: 0, scale: 0.8 },
                  {
                    opacity: 1,
                    scale: 1,
                    duration: 0.2,
                    delay: 0.1,
                    ease: "power2.out",
                  }
                );
              }
              break;

            case "default":
            default:
              // Default state: restore original dot + ring
              gsap.to(dotElement, {
                width: 8,
                height: 8,
                opacity: 1,
                duration: 0.3,
                ease: "power2.out",
              });
              gsap.to(followerElement, {
                width: 32,
                height: 32,
                borderColor: "#E2795E",
                backgroundColor: "transparent",
                mixBlendMode: "difference",
                duration: 0.3,
                ease: "power2.out",
              });
              // Hide text
              if (textElement.textContent) {
                gsap.to(textElement, {
                  opacity: 0,
                  scale: 0.8,
                  duration: 0.2,
                  ease: "power2.out",
                  onComplete: () => {
                    textElement.textContent = "";
                  },
                });
              }
              break;
          }
        };

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

        // Hover state detection via event delegation
        const handleMouseOver = (e: MouseEvent) => {
          const target = e.target as HTMLElement;
          const cursorElement = target.closest("[data-cursor]") as HTMLElement | null;

          if (cursorElement) {
            const cursorType = cursorElement.getAttribute("data-cursor") || "default";
            const cursorText = cursorElement.getAttribute("data-cursor-text") || "";
            setCursorState(cursorType, cursorText);
          } else {
            // No data-cursor element found - revert to default
            setCursorState("default");
          }
        };

        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseover", handleMouseOver);

        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseover", handleMouseOver);
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Text label - appears on text/card states */}
        <span
          ref={cursorTextRef}
          style={{
            position: "absolute",
            fontSize: "12px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "white",
            pointerEvents: "none",
            whiteSpace: "nowrap",
            opacity: 0,
          }}
        />
      </div>
    </>
  );
}

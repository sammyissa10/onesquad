"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, MOTION_QUERIES } from "@/lib/gsap";

interface ResultsDashboardAnimationProps {
  className?: string;
}

export function ResultsDashboardAnimation({ className = "" }: ResultsDashboardAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [urlInput, setUrlInput] = useState("");
  const hasInteractedRef = useRef(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Animation branch - runs only when reduced motion is NOT active
      mm.add(MOTION_QUERIES.noPreference, () => {
        // Helper function to create the auto-animation timeline
        const createAutoTimeline = () => {
          const tl = gsap.timeline({
            repeat: -1,
            repeatDelay: 2,
            defaults: { ease: "power2.out" },
          });

          // Helper function to animate counter numbers
          function animateCounter(selector: string, target: number, format: (n: number) => string, duration: number) {
            const el = containerRef.current?.querySelector(selector);
            if (!el) return;
            const obj = { val: 0 };
            tl.to(obj, {
              val: target,
              duration,
              ease: "power1.out",
              snap: { val: target > 100 ? 1 : 0.1 },
              onUpdate: () => { el.textContent = format(obj.val); },
            }, "<");
          }

          // Animation sequence:
          // 1. Dashboard header fades in
          tl.from(".dash-header", {
            autoAlpha: 0,
            y: -10,
            duration: 0.3,
          });

          // 2. Metric cards stagger in
          tl.from(
            ".dash-metric",
            {
              autoAlpha: 0,
              y: 15,
              duration: 0.35,
              stagger: 0.12,
            },
            "-=0.1"
          );

          // 3. Counter numbers animate up (simultaneously with step 2)
          animateCounter(".dash-counter-traffic", 12847, (n) => Math.floor(n).toLocaleString(), 1.2);
          animateCounter(".dash-counter-conv", 8.7, (n) => n.toFixed(1) + "%", 1.0);
          animateCounter(".dash-counter-rev", 24500, (n) => "$" + Math.floor(n).toLocaleString(), 1.2);

          // 4. Graph bars grow from bottom
          tl.from(
            ".dash-bar",
            {
              scaleY: 0,
              transformOrigin: "bottom",
              duration: 0.4,
              stagger: 0.06,
            },
            "-=0.6"
          );

          // 5. Toast notification slides in after bars finish
          tl.from(
            ".dash-toast",
            {
              autoAlpha: 0,
              y: 10,
              duration: 0.3,
            },
            "+=0.3"
          );

          // 6. Hold for 3 seconds
          tl.to({}, { duration: 3 });

          // 7. Everything fades out
          tl.to(".dash-el", { autoAlpha: 0, duration: 0.4 });

          return tl;
        };

        // Set up 5-second fallback timeout
        fallbackTimeoutRef.current = setTimeout(() => {
          if (!hasInteractedRef.current) {
            const tl = createAutoTimeline();
            timelineRef.current = tl;

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
          }
        }, 5000);
      });

      // Reduced motion branch - show static completed state
      mm.add(MOTION_QUERIES.reduced, () => {
        gsap.set(".dash-el", { autoAlpha: 1 });

        // Set counter text to final values
        const trafficEl = containerRef.current?.querySelector(".dash-counter-traffic");
        const convEl = containerRef.current?.querySelector(".dash-counter-conv");
        const revEl = containerRef.current?.querySelector(".dash-counter-rev");

        if (trafficEl) trafficEl.textContent = "12,847";
        if (convEl) convEl.textContent = "8.7%";
        if (revEl) revEl.textContent = "$24,500";
      });

      return () => {
        mm.revert();
        if (fallbackTimeoutRef.current) {
          clearTimeout(fallbackTimeoutRef.current);
        }
      };
    },
    { scope: containerRef }
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUrlInput(value);

    // Trigger personalized animation on first keystroke
    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true;

      // Clear fallback timeout
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current);
        fallbackTimeoutRef.current = null;
      }

      // Kill auto-animation timeline if running
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }

      // Make all elements visible immediately
      gsap.set(".dash-el", { autoAlpha: 1 });

      // Randomized counter values
      const randomTraffic = Math.floor(Math.random() * 10000) + 8000;
      const randomConv = (Math.random() * 8 + 4).toFixed(1);
      const randomRev = Math.floor(Math.random() * 30000) + 15000;

      // Animate counters with random values
      const trafficEl = containerRef.current?.querySelector(".dash-counter-traffic");
      const convEl = containerRef.current?.querySelector(".dash-counter-conv");
      const revEl = containerRef.current?.querySelector(".dash-counter-rev");

      if (trafficEl) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: randomTraffic,
          duration: 1.2,
          ease: "power1.out",
          snap: { val: 1 },
          onUpdate: () => { trafficEl.textContent = Math.floor(obj.val).toLocaleString(); },
        });
      }

      if (convEl) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: parseFloat(randomConv),
          duration: 1.2,
          ease: "power1.out",
          snap: { val: 0.1 },
          onUpdate: () => { convEl.textContent = obj.val.toFixed(1) + "%"; },
        });
      }

      if (revEl) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: randomRev,
          duration: 1.2,
          ease: "power1.out",
          snap: { val: 1 },
          onUpdate: () => { revEl.textContent = "$" + Math.floor(obj.val).toLocaleString(); },
        });
      }

      // Animate bars growing from 0
      gsap.from(".dash-bar", {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.4,
        stagger: 0.06,
      });

      // Show toast after counters finish
      setTimeout(() => {
        gsap.from(".dash-toast", {
          autoAlpha: 0,
          y: 10,
          duration: 0.3,
        });
      }, 1500);
    }
  };

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

          {/* Interactive URL Bar */}
          <div className="flex-1 mx-3 h-4 bg-white/5 rounded-md flex items-center px-2">
            <span className="text-[10px] text-white/30 mr-1">🌐</span>
            <input
              type="text"
              value={urlInput}
              onChange={handleInputChange}
              placeholder="yourcompany.com"
              aria-label="Enter your website URL"
              className="bg-transparent text-[10px] text-white/60 placeholder:text-white/30 w-full outline-none border-none"
            />
          </div>
        </div>

        {/* Dashboard Content Area */}
        <div className="bg-[#0a1628] p-3 md:p-4">
          {/* Header Row */}
          <div className="dash-header dash-el flex justify-between items-center mb-3">
            <div className="text-white/60 text-xs font-medium">
              {urlInput ? (
                <>
                  <span className="text-white">{urlInput}</span> Dashboard
                </>
              ) : (
                "Dashboard"
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <div className="text-emerald-400 text-[10px] font-medium">Live</div>
            </div>
          </div>

          {/* Three Metric Cards */}
          <div className="flex gap-2 mb-3">
            {/* Card 1: Traffic */}
            <div className="dash-metric dash-el bg-white/5 rounded-lg p-2.5 flex-1 border border-white/5 flex flex-col gap-1">
              <div className="text-white/40 text-[10px] uppercase tracking-wider">Traffic</div>
              <div className="dash-counter-traffic text-white font-bold text-sm md:text-base">0</div>
              <div className="text-emerald-400 text-[10px]">+142% vs last month</div>
            </div>

            {/* Card 2: Conversions */}
            <div className="dash-metric dash-el bg-white/5 rounded-lg p-2.5 flex-1 border border-white/5 flex flex-col gap-1">
              <div className="text-white/40 text-[10px] uppercase tracking-wider">Conversions</div>
              <div className="dash-counter-conv text-white font-bold text-sm md:text-base">0%</div>
              <div className="text-emerald-400 text-[10px]">↑ trending up</div>
            </div>

            {/* Card 3: Revenue */}
            <div className="dash-metric dash-el bg-white/5 rounded-lg p-2.5 flex-1 border border-white/5 flex flex-col gap-1">
              <div className="text-white/40 text-[10px] uppercase tracking-wider">Revenue</div>
              <div className="dash-counter-rev text-white font-bold text-sm md:text-base">$0</div>
              <div className="text-emerald-400 text-[10px]">+$8.2k this week</div>
            </div>
          </div>

          {/* Traffic Graph Area */}
          <div className="dash-graph dash-el bg-white/5 rounded-lg p-3 border border-white/5 mb-3">
            <div className="text-white/50 text-[10px] mb-2">Traffic Overview</div>

            {/* Graph Bars */}
            <div className="flex items-end gap-1.5 h-16 md:h-20 mb-1.5">
              <div className="dash-bar flex-1 bg-coral/60 rounded-t" style={{ height: '30%' }} />
              <div className="dash-bar flex-1 bg-coral/60 rounded-t" style={{ height: '45%' }} />
              <div className="dash-bar flex-1 bg-coral/60 rounded-t" style={{ height: '35%' }} />
              <div className="dash-bar flex-1 bg-coral/60 rounded-t" style={{ height: '55%' }} />
              <div className="dash-bar flex-1 bg-coral/60 rounded-t" style={{ height: '50%' }} />
              <div className="dash-bar flex-1 bg-coral/60 rounded-t" style={{ height: '70%' }} />
              <div className="dash-bar flex-1 bg-coral/60 rounded-t" style={{ height: '85%' }} />
            </div>

            {/* Day Labels */}
            <div className="flex justify-between text-white/20 text-[8px] px-0.5">
              <span>M</span>
              <span>T</span>
              <span>W</span>
              <span>T</span>
              <span>F</span>
              <span>S</span>
              <span>S</span>
            </div>
          </div>

          {/* Notification Toast */}
          <div className="dash-toast dash-el bg-emerald-500/20 border border-emerald-500/30 rounded-lg px-3 py-1.5 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <div className="text-emerald-300 text-[11px] font-medium">New lead captured from Google!</div>
          </div>
        </div>
      </div>
    </div>
  );
}

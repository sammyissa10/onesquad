"use client";

import { ArrowRight, Star, TrendingUp, Users, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { TRIGGERS } from "@/lib/scrollAnimations";

export function Hero() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    gsap.from('.bento-cell', {
      autoAlpha: 0,
      y: 24,
      scale: 0.97,
      duration: 0.6,
      ease: 'power2.out',
      stagger: { each: 0.08, from: 'start' },
      scrollTrigger: { trigger: '.bento-grid', start: TRIGGERS.hero },
    });
  });

  return (
    <section ref={scope} className="relative bg-[#111827] overflow-hidden">
      {/* Subtle noise/grain texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '128px' }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-24">

        {/* Bento grid */}
        <div className="bento-grid grid grid-cols-12 grid-rows-[auto_auto_auto] gap-3">

          {/* ── CELL 1: Main headline — spans 8 cols, 2 rows ── */}
          <div className="bento-cell col-span-12 lg:col-span-8 bg-[#1a2640] rounded-2xl p-8 md:p-10 flex flex-col justify-between min-h-[280px] border border-white/5">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
              <span className="text-xs text-white/40 uppercase tracking-widest font-medium">NW Indiana Web Studio</span>
            </div>
            <div>
              <h1
                className="text-[2.6rem] sm:text-[3.4rem] lg:text-[4rem] xl:text-[4.8rem] font-bold leading-[0.92] tracking-[-0.03em] text-white"
                style={{ fontFamily: 'var(--font-display), var(--font-heading), sans-serif' }}
              >
                We build websites<br />
                <span className="text-coral">small businesses</span><br />
                are proud of.
              </h1>
              <p className="mt-5 text-base md:text-lg text-white/50 max-w-lg leading-relaxed">
                Custom-designed, fast, and built to convert — not cookie-cutter templates.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-8">
              <MagneticButton>
                <Link href="/pricing">
                  <Button variant="accent" size="lg" rightIcon={<ArrowRight size={18} />} data-cursor="button">
                    See Our Plans
                  </Button>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="border-white/15 text-white hover:bg-white hover:text-navy" data-cursor="button">
                    Free Quote
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </div>

          {/* ── CELL 2: Stat — clients ── */}
          <div className="bento-cell col-span-6 lg:col-span-4 bg-coral rounded-2xl p-7 flex flex-col justify-between border border-coral min-h-[140px]">
            <Users size={22} className="text-white/70" />
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">50+</div>
              <div className="text-white/70 text-sm mt-1 font-medium">Local clients served</div>
            </div>
          </div>

          {/* ── CELL 3: Stat — turnaround ── */}
          <div className="bento-cell col-span-6 lg:col-span-4 bg-[#1a2640] rounded-2xl p-7 flex flex-col justify-between border border-white/5 min-h-[140px]">
            <Clock size={22} className="text-coral" />
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">24hr</div>
              <div className="text-white/50 text-sm mt-1 font-medium">Response guarantee</div>
            </div>
          </div>

          {/* ── CELL 4: Google rating ── */}
          <div className="bento-cell col-span-12 sm:col-span-6 lg:col-span-4 bg-[#1a2640] rounded-2xl p-7 flex flex-col justify-between border border-white/5 min-h-[140px]">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />)}
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-white tracking-tight">5.0</div>
              <div className="text-white/50 text-sm mt-1 font-medium">Google rating</div>
            </div>
          </div>

          {/* ── CELL 5: Testimonial ── */}
          <div className="bento-cell col-span-12 sm:col-span-6 lg:col-span-5 bg-[#1a2640] rounded-2xl p-7 border border-white/5">
            <div className="text-coral text-4xl font-serif leading-none mb-3">&ldquo;</div>
            <p className="text-white/70 text-sm leading-relaxed">
              OneSquad completely transformed our online presence. We started getting calls within the first week of launch.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-coral/20 flex items-center justify-center text-coral text-xs font-bold">LD</div>
              <div>
                <div className="text-white text-xs font-semibold">Lakeside Dental</div>
                <div className="text-white/35 text-xs">Merrillville, IN</div>
              </div>
            </div>
          </div>

          {/* ── CELL 6: Traffic stat ── */}
          <div className="bento-cell col-span-6 lg:col-span-3 bg-[#1a2640] rounded-2xl p-7 flex flex-col justify-between border border-white/5 min-h-[140px]">
            <TrendingUp size={22} className="text-coral" />
            <div>
              <div className="text-4xl md:text-5xl font-bold text-coral tracking-tight">+142%</div>
              <div className="text-white/50 text-sm mt-1 font-medium">Avg traffic growth</div>
            </div>
          </div>

          {/* ── CELL 7: CTA prompt ── */}
          <div className="bento-cell col-span-6 lg:col-span-4 bg-gradient-to-br from-coral/20 to-transparent rounded-2xl p-7 border border-coral/20 flex flex-col justify-between min-h-[140px]">
            <div className="text-xs text-coral/80 uppercase tracking-widest font-medium">Get started today</div>
            <div>
              <div className="text-white font-semibold text-lg leading-snug">No contracts.<br />Cancel anytime.</div>
              <Link href="/contact" className="mt-3 inline-flex items-center gap-1.5 text-coral text-sm font-semibold hover:gap-2.5 transition-all">
                Talk to us <ArrowRight size={14} />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

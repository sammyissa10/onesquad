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

        {/* Bento grid — two column outer structure */}
        <div className="bento-grid flex flex-col lg:flex-row gap-3">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-3 lg:w-[58%]">

            {/* Headline cell */}
            <div className="bento-cell bg-[#1a2640] rounded-2xl p-8 md:p-10 flex flex-col justify-between border border-white/5 flex-1">
              <div className="flex items-center gap-2 mb-8">
                <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
                <span className="text-xs text-white/40 uppercase tracking-widest font-medium">NW Indiana Web Studio</span>
              </div>
              <div className="flex-1">
                <h1
                  className="text-[2.8rem] sm:text-[3.6rem] lg:text-[4.2rem] xl:text-[5rem] font-bold leading-[0.9] tracking-[-0.03em] text-white"
                  style={{ fontFamily: 'var(--font-display), var(--font-heading), sans-serif' }}
                >
                  We build websites<br />
                  <span className="text-coral">small businesses</span><br />
                  are proud of.
                </h1>
                <p className="mt-5 text-base md:text-lg text-white/50 max-w-lg leading-relaxed">
                  Custom-designed, fast, and built to convert visitors into paying customers.
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

            {/* Bottom row: 3 small stat cells */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bento-cell bg-[#1a2640] rounded-2xl p-5 border border-white/5 flex flex-col gap-3">
                <Clock size={18} className="text-coral" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">24hr</div>
                  <div className="text-white/45 text-xs mt-0.5">Response time</div>
                </div>
              </div>
              <div className="bento-cell bg-[#1a2640] rounded-2xl p-5 border border-white/5 flex flex-col gap-3">
                <TrendingUp size={18} className="text-coral" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-coral">+142%</div>
                  <div className="text-white/45 text-xs mt-0.5">Traffic growth</div>
                </div>
              </div>
              <div className="bento-cell bg-[#1a2640] rounded-2xl p-5 border border-white/5 flex flex-col gap-3">
                <div className="flex gap-px">
                  {[1,2,3,4,5].map(i => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white">5.0</div>
                  <div className="text-white/45 text-xs mt-0.5">Google rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-3 lg:w-[42%]">

            {/* Coral stat — 50+ clients */}
            <div className="bento-cell bg-coral rounded-2xl p-8 flex flex-col justify-between border border-coral min-h-[180px]">
              <Users size={24} className="text-white/60" />
              <div>
                <div className="text-6xl font-bold text-white tracking-tight leading-none">50+</div>
                <div className="text-white/70 text-sm mt-2 font-medium">Local businesses served across NW Indiana</div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bento-cell bg-[#1a2640] rounded-2xl p-7 border border-white/5 flex-1">
              <div className="text-coral text-5xl font-serif leading-none mb-3 opacity-60">&ldquo;</div>
              <p className="text-white/70 text-sm leading-relaxed">
                OneSquad completely transformed our online presence. We started getting calls within the first week of the new site launching.
              </p>
              <div className="mt-5 pt-5 border-t border-white/8 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-coral flex items-center justify-center text-white text-xs font-bold">LD</div>
                <div>
                  <div className="text-white text-sm font-semibold">Lakeside Dental</div>
                  <div className="text-white/35 text-xs">Merrillville, IN</div>
                </div>
              </div>
            </div>

            {/* CTA cell */}
            <div className="bento-cell bg-gradient-to-br from-[#1e3050] to-[#1a2640] rounded-2xl p-7 border border-white/8 flex items-center justify-between gap-4">
              <div>
                <div className="text-white font-semibold text-base leading-snug">No contracts.<br /><span className="text-coral">Cancel anytime.</span></div>
              </div>
              <Link href="/contact" className="shrink-0 flex items-center gap-2 bg-white/8 hover:bg-coral hover:text-white transition-colors text-white text-sm font-semibold px-4 py-2.5 rounded-full border border-white/10">
                Talk to us <ArrowRight size={14} />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

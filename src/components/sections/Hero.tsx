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
    <section ref={scope} className="relative bg-warm-white dark:bg-[#0d1525] overflow-hidden">

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 md:pb-20">

        {/* Bento grid */}
        <div className="bento-grid flex flex-col lg:flex-row gap-3">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-3 lg:w-[60%]">

            {/* Headline cell */}
            <div className="bento-cell bg-navy dark:bg-[#1a2640] rounded-2xl p-7 md:p-9 flex flex-col gap-6 border border-navy/10 dark:border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
                <span className="text-xs text-white/50 uppercase tracking-widest font-medium">NW Indiana Web Studio</span>
              </div>
              <h1
                className="text-[2.4rem] sm:text-[3rem] lg:text-[3.6rem] xl:text-[4.2rem] font-bold leading-[0.95] tracking-[-0.03em] text-white"
                style={{ fontFamily: 'var(--font-display), var(--font-heading), sans-serif' }}
              >
                We build websites<br />
                <span className="text-coral">small businesses</span><br />
                are proud of.
              </h1>
              <p className="text-sm md:text-base text-white/55 max-w-md leading-relaxed">
                Custom-designed, fast, and built to convert visitors into paying customers. No templates. Just results.
              </p>
              <div className="flex flex-wrap gap-3">
                <MagneticButton>
                  <Link href="/pricing">
                    <Button variant="accent" size="lg" rightIcon={<ArrowRight size={18} />} data-cursor="button">
                      See Our Plans
                    </Button>
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link href="/contact">
                    <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white hover:text-navy" data-cursor="button">
                      Free Quote
                    </Button>
                  </Link>
                </MagneticButton>
              </div>
            </div>

            {/* Bottom row: 3 stat cells */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: <Clock size={16} className="text-coral" />, value: '24hr', label: 'Response time', valueClass: 'text-foreground dark:text-white' },
                { icon: <TrendingUp size={16} className="text-coral" />, value: '+142%', label: 'Traffic growth', valueClass: 'text-coral' },
                { icon: <div className="flex gap-px">{[1,2,3,4,5].map(i=><Star key={i} size={10} className="text-yellow-400 fill-yellow-400"/>)}</div>, value: '5.0', label: 'Google rating', valueClass: 'text-foreground dark:text-white' },
              ].map(({ icon, value, label, valueClass }) => (
                <div key={label} className="bento-cell bg-white dark:bg-[#1a2640] rounded-2xl p-4 sm:p-5 border border-border dark:border-white/5 flex flex-col gap-2 shadow-sm dark:shadow-none">
                  {icon}
                  <div className={`text-xl sm:text-2xl font-bold tracking-tight ${valueClass}`}>{value}</div>
                  <div className="text-muted-foreground dark:text-white/40 text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-3 lg:w-[40%]">

            {/* Coral stat */}
            <div className="bento-cell bg-coral rounded-2xl p-7 flex flex-col justify-between gap-6 min-h-[160px]">
              <Users size={20} className="text-white/60" />
              <div>
                <div className="text-5xl font-bold text-white tracking-tight leading-none">50+</div>
                <div className="text-white/70 text-sm mt-2 font-medium">Local businesses served across NW Indiana</div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bento-cell bg-white dark:bg-[#1a2640] rounded-2xl p-6 border border-border dark:border-white/5 flex-1 shadow-sm dark:shadow-none flex flex-col justify-between">
              <div>
                <div className="text-coral text-4xl font-serif leading-none mb-3 opacity-70">&ldquo;</div>
                <p className="text-muted-foreground dark:text-white/65 text-sm leading-relaxed">
                  OneSquad completely transformed our online presence. We started getting calls within the first week of the new site launching.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-border dark:border-white/8 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-coral flex items-center justify-center text-white text-xs font-bold shrink-0">LD</div>
                <div>
                  <div className="text-foreground dark:text-white text-sm font-semibold">Lakeside Dental</div>
                  <div className="text-muted-foreground dark:text-white/35 text-xs">Merrillville, IN</div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="bento-cell bg-navy dark:bg-[#1e3050] rounded-2xl p-6 border border-navy/10 dark:border-white/8 flex items-center justify-between gap-4">
              <div className="text-white font-semibold text-sm leading-snug">
                No contracts.<br /><span className="text-coral">Cancel anytime.</span>
              </div>
              <Link href="/contact" className="shrink-0 flex items-center gap-1.5 bg-white/10 hover:bg-coral transition-colors text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/15">
                Talk to us <ArrowRight size={13} />
              </Link>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

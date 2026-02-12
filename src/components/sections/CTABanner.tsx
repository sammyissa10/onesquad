"use client";

import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, TRIGGERS } from "@/lib/scrollAnimations";

export function CTABanner() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    // Consolidate 4 ScrollTriggers into 1 timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.cta-content',
        start: TRIGGERS.standard,
      },
    });

    tl.from('.cta-heading', { ...fadeUp({ y: 40, duration: 0.8 }) })
      .from('.cta-subtext', { ...fadeUp() }, '-=0.45')
      .from('.cta-buttons', { ...fadeUp() }, '-=0.3')
      .from('.cta-badges', { ...fadeUp({ y: 30 }), scale: 0.95 }, '-=0.15');
  });

  return (
    <section ref={scope} className="bg-navy text-white py-20 md:py-28">
      <Container>
        <div className="cta-content text-center max-w-3xl mx-auto">
          <h2
            className="cta-heading text-3xl md:text-4xl font-bold text-white mb-4"
            data-animate
          >
            Ready To Get Your Website{" "}
            <span className="text-coral">Actually Working?</span>
          </h2>

          <p
            className="cta-subtext text-lg text-white/60 mb-8"
            data-animate
          >
            No 12-month contracts. No corporate jargon. Just results.
          </p>

          <div
            className="cta-buttons flex flex-col sm:flex-row items-center justify-center gap-4"
            data-animate
          >
            <MagneticButton>
              <Link href="/pricing">
                <Button
                  data-cursor="button"
                  variant="accent"
                  size="lg"
                  rightIcon={<ArrowRight size={20} />}
                >
                  Pick Your Plan — Cancel Anytime
                </Button>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/contact">
                <Button
                  data-cursor="button"
                  variant="outline"
                  size="lg"
                  leftIcon={<Calendar size={20} />}
                  className="border-white/30 text-white hover:bg-white hover:text-navy"
                >
                  Talk to a Human in 24hrs
                </Button>
              </Link>
            </MagneticButton>
          </div>

          <div
            className="cta-badges mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/50 text-sm"
            data-animate
          >
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span>No long-term contracts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span>Response within 24 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

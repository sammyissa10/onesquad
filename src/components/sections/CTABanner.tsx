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
    <section ref={scope} className="bg-[#0d1525] text-white border-t-2 border-coral py-24 md:py-36 overflow-hidden">
      <Container>
        <div className="cta-content max-w-4xl">
          <p className="text-xs text-coral uppercase tracking-[0.2em] font-semibold mb-6" data-animate>
            Get Started
          </p>
          <h2
            className="cta-heading text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight mb-8"
            data-animate
          >
            Ready To Get Your Website{" "}
            <span className="text-coral">Actually Working?</span>
          </h2>

          <p
            className="cta-subtext text-lg text-white/45 mb-10 max-w-xl"
            data-animate
          >
            No 12-month contracts. No corporate jargon. Just results.
          </p>

          <div
            className="cta-buttons flex flex-wrap gap-4"
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
                  See Our Plans
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
                  className="border-white/20 text-white hover:bg-white hover:text-navy"
                >
                  Schedule a Call
                </Button>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

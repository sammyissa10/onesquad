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
    // Heading: dramatic fadeUp
    gsap.from('.cta-heading', {
      ...fadeUp({ y: 40, duration: 0.8 }),
      scrollTrigger: {
        trigger: '.cta-content',
        start: TRIGGERS.standard,
      },
    });

    // Subtext: fadeUp with 0.15s delay
    gsap.from('.cta-subtext', {
      ...fadeUp(),
      delay: 0.15,
      scrollTrigger: {
        trigger: '.cta-content',
        start: TRIGGERS.standard,
      },
    });

    // Buttons: fadeUp with 0.3s delay
    gsap.from('.cta-buttons', {
      ...fadeUp(),
      delay: 0.3,
      scrollTrigger: {
        trigger: '.cta-content',
        start: TRIGGERS.standard,
      },
    });

    // Trust badges: fadeUp with 0.45s delay, slight scale
    gsap.from('.cta-badges', {
      ...fadeUp({ y: 30 }),
      scale: 0.95,
      delay: 0.45,
      scrollTrigger: {
        trigger: '.cta-content',
        start: TRIGGERS.standard,
      },
    });
  });

  return (
    <section ref={scope} className="bg-navy text-white py-24 md:py-36">
      <Container>
        <div className="cta-content text-center max-w-4xl mx-auto">
          <h2
            className="cta-heading text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
            data-animate
          >
            Ready To Stop Guessing And{" "}
            <span className="text-coral">Start Growing?</span>
          </h2>

          <p
            className="cta-subtext text-xl text-white/60 mb-10"
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
                  className="border-white/30 text-white hover:bg-white hover:text-navy"
                >
                  Schedule a Call
                </Button>
              </Link>
            </MagneticButton>
          </div>

          <div
            className="cta-badges mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/50"
            data-animate
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>No long-term contracts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>Response within 24 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

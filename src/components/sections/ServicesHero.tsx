"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, TRIGGERS } from "@/lib/scrollAnimations";

export function ServicesHero() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    // Headline: dramatic fadeUp with power3 easing
    gsap.from('.services-hero-headline', {
      opacity: 0,
      y: 60,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.services-hero-content',
        start: TRIGGERS.hero,
      },
    });

    // Subtext: fadeUp with 0.15s delay
    gsap.from('.services-hero-subtext', {
      ...fadeUp(),
      delay: 0.15,
      scrollTrigger: {
        trigger: '.services-hero-content',
        start: TRIGGERS.hero,
      },
    });

    // Buttons: fadeUp with 0.3s delay
    gsap.from('.services-hero-buttons', {
      ...fadeUp(),
      delay: 0.3,
      scrollTrigger: {
        trigger: '.services-hero-content',
        start: TRIGGERS.hero,
      },
    });
  });

  return (
    <section ref={scope} className="bg-navy text-white py-28 md:py-40">
      <Container>
        <div className="services-hero-content max-w-5xl">
          <h1
            className="services-hero-headline text-4xl md:text-6xl lg:text-7xl xl:text-display font-black leading-[0.9] mb-8"
            data-animate
          >
            Digital Services That Actually{" "}
            <span className="text-coral">Move The Needle</span>
          </h1>

          <p
            className="services-hero-subtext text-white/60 text-xl mb-12 max-w-2xl"
            data-animate
          >
            Two categories. Ten services. One team that knows your name.
          </p>

          <div
            className="services-hero-buttons flex flex-col sm:flex-row gap-4"
            data-animate
          >
            <MagneticButton>
              <Link href="#digital-marketing">
                <Button
                  variant="accent"
                  size="lg"
                  data-cursor="button"
                >
                  Digital Marketing
                </Button>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link href="#web-solutions">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white hover:text-navy"
                  data-cursor="button"
                >
                  Web Solutions
                </Button>
              </Link>
            </MagneticButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { ServicesHero, DigitalMarketingGrid, WebSolutionsGrid } from "@/components/sections";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, TRIGGERS } from "@/lib/scrollAnimations";

export default function ServicesPage() {
  const { scope } = useScrollAnimation(({ gsap }) => {
    // CTA section: simple fadeUp
    gsap.from('.services-cta', {
      ...fadeUp(),
      scrollTrigger: {
        trigger: '.services-cta',
        start: TRIGGERS.standard,
      },
    });
  });

  return (
    <>
      <Header />

      <main ref={scope}>
        {/* Hero Section - Dark (Navy) */}
        <ServicesHero />

        {/* Digital Marketing Section - Light (White) */}
        <DigitalMarketingGrid />

        {/* Web Solutions Section - Dark (Navy) */}
        <WebSolutionsGrid />

        {/* CTA Section - Light (Peach Tinted) */}
        <section className="bg-peach/10 text-navy py-20 md:py-28">
          <Container>
            <div
              className="services-cta text-center max-w-3xl mx-auto"
              data-animate
            >
              <h2 className="text-3xl md:text-5xl font-black mb-6">
                Ready To Stop{" "}
                <span className="text-coral">Doing Everything Yourself?</span>
              </h2>
              <p className="text-navy/60 text-lg mb-8">
                Tell us about your business. We'll show you what's possible.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticButton>
                  <Link href="/pricing">
                    <Button variant="accent" size="lg" data-cursor="button">
                      See Our Plans
                    </Button>
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      size="lg"
                      data-cursor="button"
                    >
                      Get a Free Quote
                    </Button>
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

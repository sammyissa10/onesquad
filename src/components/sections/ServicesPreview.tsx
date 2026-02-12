"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui/Icon";
import { services } from "@/lib/constants";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, TRIGGERS } from "@/lib/scrollAnimations";

export function ServicesPreview() {
  const digitalMarketing = services.filter(
    (s) => s.category === "digital-marketing"
  );
  const webSolutions = services.filter((s) => s.category === "web-solutions");

  const { scope } = useScrollAnimation(({ gsap }) => {
    // Section heading: fade up with early trigger
    gsap.from('.services-heading', {
      ...fadeUp(),
      scrollTrigger: {
        trigger: '.services-heading',
        start: TRIGGERS.early,
      },
    });

    // Web Solutions cards: staggered fadeUp from start
    gsap.from('.ws-card', {
      ...fadeUp(),
      stagger: { each: 0.08, from: 'start' },
      scrollTrigger: {
        trigger: '.ws-cards',
        start: TRIGGERS.standard,
      },
    });

    // Digital Marketing cards: staggered fadeUp from center
    gsap.from('.dm-card', {
      ...fadeUp(),
      stagger: { each: 0.1, from: 'center' },
      scrollTrigger: {
        trigger: '.dm-cards',
        start: TRIGGERS.standard,
      },
    });

    // CTA button: simple fadeUp
    gsap.from('.services-cta', {
      ...fadeUp(),
      scrollTrigger: {
        trigger: '.services-cta',
        start: TRIGGERS.standard,
      },
    });
  });

  return (
    <section ref={scope} className="bg-navy text-white py-20 md:py-28">
      <Container>
        {/* Section Header */}
        <div className="services-heading text-center max-w-2xl mx-auto mb-12" data-animate>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything You Need.{" "}
            <span className="text-coral">Zero Bloat.</span>
          </h2>
          <p className="text-white/60 text-lg">
            Your entire digital team on one monthly bill. No contracts. No surprises.
          </p>
        </div>

        {/* Services Categories */}
        <div className="space-y-12">
          {/* Web Solutions */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-4">
              <span className="w-10 h-0.5 bg-blue rounded-full flex-shrink-0" />
              Web Solutions
            </h3>
            <div className="ws-cards grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {webSolutions.map((service, index) => (
                <div key={service.slug} className={index === 0 ? "sm:col-span-2" : ""}>
                  <Link href={`/services/${service.slug}`}>
                    <div className="ws-card relative group" data-animate>
                      <div
                        data-cursor="card"
                        data-cursor-text="View"
                        className="relative bg-white/5 border border-white/10 rounded-2xl p-6 h-full hover:-translate-y-1 transition-transform duration-200"
                      >
                        <div className="w-12 h-12 rounded-xl bg-blue/15 flex items-center justify-center mb-4">
                          <DynamicIcon
                            name={service.icon}
                            className="w-6 h-6 text-blue"
                          />
                        </div>
                        <h4 className="font-bold text-white mb-2">
                          {service.title}
                        </h4>
                        <p className="text-sm text-white/60">
                          {service.shortDescription}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Digital Marketing */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-4">
              <span className="w-10 h-0.5 bg-coral rounded-full flex-shrink-0" />
              Digital Marketing
            </h3>
            <div className="dm-cards grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {digitalMarketing.map((service) => (
                <div key={service.slug}>
                  <Link href={`/services/${service.slug}`}>
                    <div className="dm-card relative group" data-animate>
                      <div
                        data-cursor="card"
                        data-cursor-text="View"
                        className="relative bg-white/5 border border-white/10 rounded-2xl p-6 h-full hover:-translate-y-1 transition-transform duration-200"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-coral/15 flex items-center justify-center flex-shrink-0">
                            <DynamicIcon
                              name={service.icon}
                              className="w-6 h-6 text-coral"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-white mb-2">
                              {service.title}
                            </h4>
                            <p className="text-sm text-white/60">
                              {service.shortDescription}
                            </p>
                          </div>
                          <ArrowRight
                            size={20}
                            className="text-white/40 group-hover:text-coral group-hover:translate-x-1 transition-all flex-shrink-0"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="services-cta text-center mt-10" data-animate>
          <Link href="/services">
            <Button variant="accent" size="lg" rightIcon={<ArrowRight />}>
              View All Services
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

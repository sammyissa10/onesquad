"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ChevronDown } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { DynamicIcon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, scaleReveal, slideFromRight, TRIGGERS } from "@/lib/scrollAnimations";

// Service-specific taglines
const serviceTaglines: Record<string, string> = {
  "digital-marketing": "Campaigns that fill your pipeline, not just your dashboard.",
  "seo": "Get found by people who are ready to buy.",
  "social-media": "Show up where your customers actually hang out.",
  "email-marketing": "The inbox is still king. We help you rule it.",
  "ppc": "Every dollar tracked. Every click counts.",
  "content-marketing": "Content that earns trust before you even shake hands.",
  "web-design": "Websites that look like you, not like a template.",
  "ecommerce": "Your 24/7 storefront, built to convert.",
  "hosting": "Fast, secure, always on. We handle the boring stuff.",
  "maintenance": "Updates, fixes, and peace of mind. On autopilot.",
};

function ServiceFAQItem({ faq, isLast }: { faq: { question: string; answer: string }; isLast: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("border-b border-navy/10", isLast && "border-0")}>
      <button
        data-cursor="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="font-bold text-navy group-hover:text-coral transition-colors pr-4">
          {faq.question}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 transition-all flex-shrink-0",
            isOpen ? "rotate-180 text-coral" : "text-navy/40"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-navy/70">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ServiceDetailClientProps {
  service: Service;
  relatedServices: Service[];
  categoryName: string;
}

export default function ServiceDetailClient({
  service,
  relatedServices,
  categoryName,
}: ServiceDetailClientProps) {
  const { scope } = useScrollAnimation(({ gsap }) => {
    // Hero section - fadeUp with power3 easing
    gsap.from('.detail-hero-headline', {
      ...fadeUp({ y: 60, duration: 0.9, ease: 'power3.out' }),
      scrollTrigger: { trigger: '.detail-hero', start: TRIGGERS.hero },
    });

    gsap.from('.detail-hero-badge', {
      ...scaleReveal({ delay: 0.2 }),
      scrollTrigger: { trigger: '.detail-hero', start: TRIGGERS.hero },
    });

    gsap.from('.detail-hero-icon', {
      ...scaleReveal({ delay: 0.2 }),
      scrollTrigger: { trigger: '.detail-hero', start: TRIGGERS.hero },
    });

    gsap.from('.detail-hero-subtext', {
      ...fadeUp({ delay: 0.15 }),
      scrollTrigger: { trigger: '.detail-hero', start: TRIGGERS.hero },
    });

    // Features section - cards stagger with scaleReveal
    gsap.from('.detail-feature-card', {
      ...scaleReveal(),
      stagger: 0.1,
      scrollTrigger: { trigger: '.detail-features', start: TRIGGERS.late },
    });

    // Results section - metrics fade up with stagger
    gsap.from('.detail-metric', {
      ...fadeUp(),
      stagger: 0.15,
      scrollTrigger: { trigger: '.detail-results', start: TRIGGERS.standard },
    });

    // Why Choose Us section - heading + stats stagger
    gsap.from('.detail-why-heading', {
      ...fadeUp(),
      scrollTrigger: { trigger: '.detail-why', start: TRIGGERS.early },
    });

    gsap.from('.detail-stat-card', {
      ...scaleReveal(),
      stagger: 0.1,
      scrollTrigger: { trigger: '.detail-why', start: TRIGGERS.standard },
    });

    // Related Services section - slideFromRight stagger
    gsap.from('.detail-related-card', {
      ...slideFromRight(),
      stagger: 0.12,
      scrollTrigger: { trigger: '.detail-related', start: TRIGGERS.standard },
    });

    // FAQ section - heading fadeUp, container scaleReveal
    gsap.from('.detail-faq-heading', {
      ...fadeUp(),
      scrollTrigger: { trigger: '.detail-faq', start: TRIGGERS.early },
    });

    gsap.from('.detail-faq-container', {
      ...scaleReveal(),
      scrollTrigger: { trigger: '.detail-faq', start: TRIGGERS.standard },
    });

    // CTA section - cascade (heading, text, buttons)
    gsap.from('.detail-cta-heading', {
      ...fadeUp(),
      scrollTrigger: { trigger: '.detail-cta', start: TRIGGERS.early },
    });

    gsap.from('.detail-cta-text', {
      ...fadeUp({ delay: 0.15 }),
      scrollTrigger: { trigger: '.detail-cta', start: TRIGGERS.early },
    });

    gsap.from('.detail-cta-buttons', {
      ...fadeUp({ delay: 0.3 }),
      scrollTrigger: { trigger: '.detail-cta', start: TRIGGERS.early },
    });
  });

  return (
    <>
      <Header />
      <main ref={scope}>
        {/* Section 1 — Hero (DARK - navy) */}
        <section className="bg-navy text-white py-24 md:py-36 detail-hero">
          <Container>
            <div>
              <div>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back to Services
                </Link>
              </div>

              <div className="detail-hero-badge" data-animate>
                <span className="inline-block bg-coral/20 text-coral text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                  {categoryName}
                </span>
              </div>

              <div className="flex items-start gap-6 mb-6 detail-hero-headline" data-animate>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl w-16 h-16 flex items-center justify-center flex-shrink-0 detail-hero-icon" data-animate>
                  <DynamicIcon
                    name={service.icon}
                    className="w-8 h-8 text-white"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
                    {service.title}
                  </h1>
                </div>
              </div>

              <div className="detail-hero-subtext" data-animate>
                <p className="text-xl text-white/60 max-w-2xl">
                  {serviceTaglines[service.slug]}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Section 2 — Features (LIGHT - white) */}
        <section className="bg-white text-navy py-20 md:py-28 detail-features">
          <Container>
            <div>
              <div className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-navy">
                  What You Get
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.features.map((feature) => (
                  <div
                    key={feature}
                    className="relative group detail-feature-card"
                    data-animate
                  >
                    {/* Glow hover effect */}
                    <div className="absolute inset-0 bg-coral/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                    <div className="relative bg-peach/5 border border-peach/20 rounded-2xl p-6 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-coral" />
                      </div>
                      <span className="font-medium text-navy">
                        {feature}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Section 3 — Results (DARK - navy) */}
        {service.results && service.results.length > 0 && (
          <section className="bg-navy text-white py-24 md:py-36 detail-results">
            <Container>
              <div>
                <div className="mb-12">
                  <h2 className="text-3xl md:text-5xl font-black text-white">
                    The Numbers Don&apos;t{" "}
                    <span className="text-coral">Lie</span>
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                  {service.results.map((result) => (
                    <div
                      key={result.description}
                      className="text-center md:text-left detail-metric"
                      data-animate
                    >
                      <div className="text-5xl md:text-7xl font-black text-coral mb-3">
                        {result.metric}
                      </div>
                      <p className="text-white/60 text-lg">{result.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* Section 4 — Why Choose Us (LIGHT - peach tinted) */}
        <section className="bg-peach/10 text-navy py-16 md:py-24 detail-why">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="detail-why-heading" data-animate>
                <h2 className="text-3xl md:text-4xl font-black text-navy mb-6">
                  Why OneSquad?
                </h2>
                <div className="space-y-4 mb-8">
                  <p className="text-navy/70 text-lg">
                    We&apos;re not a faceless agency with a ticket queue. We&apos;re a small team that actually picks up the phone and knows your business by name.
                  </p>
                  <p className="text-navy/70 text-lg">
                    No 12-month contracts. No jargon. No surprises on the invoice. Just results you can measure and a team you can trust.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <MagneticButton>
                    <Link href="/contact">
                      <Button variant="accent" size="lg" data-cursor="button">
                        Get Started
                      </Button>
                    </Link>
                  </MagneticButton>
                  <MagneticButton>
                    <Link href="/pricing">
                      <Button variant="outline" size="lg" data-cursor="button">
                        View Pricing
                      </Button>
                    </Link>
                  </MagneticButton>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "29+", label: "Websites Launched" },
                  { value: "24/7", label: "Support Available" },
                  { value: "2-4 wk", label: "Avg Launch Time" },
                  { value: "0", label: "Long-term Contracts" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white rounded-xl p-6 text-center shadow-lg detail-stat-card"
                    data-animate
                  >
                    <div className="text-3xl font-bold text-coral mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-navy/60">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        {/* Section 5 — Related Services (DARK - navy) */}
        {relatedServices.length > 0 && (
          <section className="bg-navy text-white py-20 md:py-28 detail-related">
            <Container>
              <div>
                <div className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    More From {categoryName}
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {relatedServices.map((relatedService) => (
                    <div
                      key={relatedService.slug}
                      className="detail-related-card"
                      data-animate
                    >
                      <Link href={`/services/${relatedService.slug}`}>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full hover:shadow-lg hover:shadow-coral/10 hover:-translate-y-1.5 transition-all duration-300">
                          <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-4">
                            <DynamicIcon
                              name={relatedService.icon}
                              className="w-6 h-6 text-coral"
                            />
                          </div>
                          <h3 className="text-lg font-bold text-white mb-2">
                            {relatedService.title}
                          </h3>
                          <p className="text-white/60 text-sm mb-4">
                            {relatedService.shortDescription}
                          </p>
                          <span className="inline-flex items-center gap-2 text-coral font-medium text-sm">
                            Learn More <ArrowRight size={14} />
                          </span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* Section 6 — Service FAQs (LIGHT - white) */}
        {service.serviceFaqs && service.serviceFaqs.length > 0 && (
          <section className="bg-white text-navy py-16 md:py-24 detail-faq">
            <Container size="md">
              <div>
                <div className="text-center mb-12 detail-faq-heading" data-animate>
                  <h2 className="text-3xl md:text-4xl font-black text-navy">
                    Questions About{" "}
                    <span className="text-coral">{service.title}</span>?
                  </h2>
                </div>

                <div className="detail-faq-container" data-animate>
                  <div className="bg-muted rounded-3xl p-6 md:p-10">
                    {service.serviceFaqs.map((faq, index) => (
                      <ServiceFAQItem
                        key={faq.question}
                        faq={faq}
                        isLast={index === service.serviceFaqs!.length - 1}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* Bottom CTA — inline in page (DARK - navy) */}
        <section className="bg-navy text-white py-24 md:py-36 detail-cta">
          <Container>
            <div className="text-center">
              <div className="detail-cta-heading" data-animate>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                  Ready To Get{" "}
                  <span className="text-coral">{service.title}</span>{" "}
                  Working For You?
                </h2>
              </div>

              <div className="detail-cta-text" data-animate>
                <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
                  No contracts. No jargon. Just results.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 detail-cta-buttons" data-animate>
                <MagneticButton>
                  <Link href="/contact">
                    <Button
                      variant="accent"
                      size="lg"
                      rightIcon={<ArrowRight size={20} />}
                      data-cursor="button"
                    >
                      Let&apos;s Talk
                    </Button>
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link href="/pricing">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/30 text-white hover:bg-white hover:text-navy"
                      data-cursor="button"
                    >
                      See Our Plans
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

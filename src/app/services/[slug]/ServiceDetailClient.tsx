"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui/Icon";
import type { Service } from "@/types";
import { fadeIn, stagger } from "@/lib/animations";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const accentColor = service.category === "digital-marketing" ? "coral" : "blue";

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-navy text-white py-20 md:py-28">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <Link
                  href="/services"
                  className="text-white/60 hover:text-white transition-colors"
                >
                  Services
                </Link>
                <span className="text-white/40">/</span>
                <span className={`text-${accentColor}`}>{categoryName}</span>
              </div>

              <div className="flex items-start gap-6 mb-6">
                <div className={`w-16 h-16 rounded-xl bg-${accentColor}/20 flex items-center justify-center flex-shrink-0`}>
                  <DynamicIcon
                    name={service.icon}
                    className={`w-8 h-8 text-${accentColor}`}
                  />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4">
                    {service.title}
                  </h1>
                  <p className="text-xl text-white/70">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Features & Results Section */}
        <section className="bg-white text-navy py-20 md:py-28">
          <Container>
            <motion.div
              ref={ref}
              variants={stagger(0.1)}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid lg:grid-cols-2 gap-12"
            >
              {/* Features */}
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl font-black mb-6">What's Included</h2>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 text-${accentColor} flex-shrink-0 mt-0.5`} />
                      <span className="text-navy/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Results */}
              {service.results && service.results.length > 0 && (
                <motion.div variants={fadeIn}>
                  <h2 className="text-3xl font-black mb-6">Results You Can Expect</h2>
                  <div className="space-y-6">
                    {service.results.map((result) => (
                      <div key={result.metric}>
                        <div className={`text-4xl font-black text-${accentColor} mb-2`}>
                          {result.metric}
                        </div>
                        <p className="text-navy/70">{result.description}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </Container>
        </section>

        {/* FAQs Section */}
        {service.serviceFaqs && service.serviceFaqs.length > 0 && (
          <section className="bg-gray-50 text-navy py-20 md:py-28">
            <Container>
              <h2 className="text-3xl md:text-4xl font-black mb-12">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6 max-w-3xl">
                {service.serviceFaqs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                  >
                    <h3 className="font-bold text-lg mb-3">{faq.question}</h3>
                    <p className="text-navy/70">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="bg-white text-navy py-20 md:py-28">
            <Container>
              <h2 className="text-3xl font-black mb-8">
                More {categoryName} Services
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedServices.map((relatedService) => (
                  <Link key={relatedService.slug} href={`/services/${relatedService.slug}`}>
                    <div className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-all">
                      <div className={`w-12 h-12 rounded-xl bg-${accentColor}/10 flex items-center justify-center mb-4`}>
                        <DynamicIcon
                          name={relatedService.icon}
                          className={`w-6 h-6 text-${accentColor}`}
                        />
                      </div>
                      <h3 className="font-bold mb-2 group-hover:text-${accentColor} transition-colors">
                        {relatedService.title}
                      </h3>
                      <p className="text-sm text-navy/60">
                        {relatedService.shortDescription}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-navy text-white py-20 md:py-28">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-white/70 text-lg mb-8">
                Let's talk about your business and how we can help you grow.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/pricing">
                  <Button variant="accent" size="lg" rightIcon={<ArrowRight />}>
                    See Our Plans
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white hover:text-navy"
                  >
                    Get a Free Quote
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { ServicesHero, DigitalMarketingGrid, WebSolutionsGrid } from "@/components/sections";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";

export default function ServicesPage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero Section - Dark (Navy) */}
        <ServicesHero />

        {/* Digital Marketing Section - Light (White) */}
        <DigitalMarketingGrid />

        {/* Web Solutions Section - Dark (Navy) */}
        <WebSolutionsGrid />

        {/* CTA Section - Light (Peach Tinted) */}
        <section className="bg-peach/10 text-navy py-20 md:py-28">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
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
            </motion.div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}

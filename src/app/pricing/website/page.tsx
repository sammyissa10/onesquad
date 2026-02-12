"use client";

import { motion, MotionConfig } from "framer-motion";
import { Globe } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import WebsiteCalculator from "@/components/pricing/WebsiteCalculator";

export default function WebsitePricingPage() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
          <Breadcrumb items={[{ label: "Pricing", href: "/pricing" }, { label: "Website Plans" }]} />
        {/* Hero - Dark Navy with generous spacing */}
        <section className="relative bg-navy py-32 md:py-40 overflow-hidden">
          {/* Subtle radial gradient overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(circle at 30% 70%, rgba(39, 89, 142, 0.2), transparent)'
            }}
          />

          <Container>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
              className="text-center max-w-4xl mx-auto relative z-10"
            >
              {/* Globe icon - larger, thin coral stroke outline */}
              <div className="w-24 h-24 rounded-full border-2 border-coral/30 flex items-center justify-center mx-auto mb-8">
                <Globe className="w-12 h-12 text-coral" strokeWidth={1.5} />
              </div>

              {/* Headline - confident, premium */}
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-heading text-white mb-6 leading-tight">
                Craft Your Digital <span className="text-coral">Presence</span>
              </h1>

              {/* Subtext - premium copy */}
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Every pixel placed with purpose. Every interaction designed to convert.
              </p>

              {/* Elegant divider */}
              <div className="w-24 h-px bg-coral/30 mx-auto" />
            </motion.div>
          </Container>
        </section>

        {/* Calculator - Light section with generous spacing */}
        <section className="bg-white py-28 md:py-36">
          <Container>
            <WebsiteCalculator />
          </Container>
        </section>
      </main>
      <Footer />
    </MotionConfig>
  );
}

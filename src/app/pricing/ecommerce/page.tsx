"use client";

import { motion, MotionConfig } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import EcommerceCalculator from "@/components/pricing/EcommerceCalculator";

export default function EcommercePricingPage() {
  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
          <Breadcrumb items={[{ label: "Pricing", href: "/pricing" }, { label: "E-Commerce Plans" }]} />
        {/* Hero - Gradient with navy/blue tones */}
        <section className="relative bg-navy py-28 md:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-blue/80" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
          <Container className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-coral to-peach flex items-center justify-center mx-auto mb-8 shadow-xl">
                <ShoppingCart className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-white mb-6">
                Built to <span className="text-coral">Sell</span>. Scaled to Grow.
              </h1>
              <p className="text-xl text-white/70 mb-8">
                Configure your online store. Every feature you add drives revenue.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white/60">
                  Avg 3x ROI
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white/60">
                  500+ stores launched
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Calculator - Split-screen layout */}
        <section className="bg-white">
          <EcommerceCalculator />
        </section>
      </main>
      <Footer />
    </MotionConfig>
  );
}

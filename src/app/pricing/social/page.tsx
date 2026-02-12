"use client";

import { useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import Link from "next/link";
import {
  Share2,
  Check,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import SocialCalculator from "@/components/pricing/SocialCalculator";

export default function SocialMediaPricingPage() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
          <Breadcrumb items={[{ label: "Pricing", href: "/pricing" }, { label: "Social Media Plans" }]} />
        {/* Hero - Light section with playful energy */}
        <section className="relative bg-gradient-to-br from-white to-peach/10 py-20 md:py-28 overflow-hidden">
          {/* Decorative social icons */}
          <div className="absolute top-10 left-10 opacity-5">
            <Instagram className="w-32 h-32 text-coral" />
          </div>
          <div className="absolute bottom-10 right-10 opacity-5">
            <Facebook className="w-40 h-40 text-coral" />
          </div>
          <div className="absolute top-1/2 right-1/4 opacity-5">
            <Twitter className="w-24 h-24 text-coral" />
          </div>

          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center max-w-4xl mx-auto relative z-10"
            >
              <Share2 className="w-16 h-16 text-coral mx-auto mb-6" />
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-navy mb-6">
                Build Your Social <span className="text-coral">Empire</span>
              </h1>
              <p className="text-xl md:text-2xl text-navy/70">
                Pick platforms. Add content. Get a price. It&apos;s that easy.
              </p>
            </motion.div>
          </Container>
        </section>

        {/* Calculator - Dark navy section */}
        <section className="relative bg-navy py-24 md:py-32">
          <Container>
            <SocialCalculator />
          </Container>
        </section>

      </main>
      <Footer />
    </MotionConfig>
  );
}

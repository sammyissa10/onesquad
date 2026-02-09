"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { fadeIn, stagger } from "@/lib/animations";

export function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <Section background="white" className="overflow-hidden">
      <Container>
        <motion.div
          ref={ref}
          variants={stagger(0.15)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          <div className="relative bg-gradient-to-br from-primary via-primary to-highlight rounded-3xl p-8 md:p-16 overflow-hidden">
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <motion.h2
                variants={fadeIn}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
              >
                Ready to Get Started?
              </motion.h2>

              <motion.p
                variants={fadeIn}
                className="text-lg text-white/80 mb-10"
              >
                No long pitch, no pressure. Let&apos;s talk about what you need and
                whether we&apos;re the right fit.
              </motion.p>

              <motion.div
                variants={fadeIn}
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Link href="/pricing">
                  <Button
                    variant="secondary"
                    size="lg"
                    rightIcon={<ArrowRight size={20} />}
                    className="text-primary"
                  >
                    View Pricing Plans
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    leftIcon={<Calendar size={20} />}
                    className="border-white/30 text-white hover:bg-white hover:text-primary"
                  >
                    Schedule a Call
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/70"
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
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

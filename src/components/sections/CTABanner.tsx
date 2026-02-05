"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone, Calendar } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <Section background="white" className="overflow-hidden">
      <Container>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          <div className="relative bg-gradient-to-br from-primary via-primary to-highlight rounded-3xl p-8 md:p-16 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 50,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -top-1/2 -right-1/2 w-full h-full"
              >
                <div className="absolute top-1/2 left-1/2 w-96 h-96 border border-white/10 rounded-full" />
                <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] border border-white/5 rounded-full" />
                <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] border border-white/5 rounded-full" />
              </motion.div>
            </div>

            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
              >
                Ready to Unlock Your{" "}
                <span className="text-secondary">Digital Potential?</span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="text-lg text-white/80 mb-10"
              >
                Join the growing number of SMBs who trust OneSquad to handle
                their digital presence. Let's start building your success story
                today.
              </motion.p>

              <motion.div
                variants={itemVariants}
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
                variants={itemVariants}
                className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/70"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span>No long-term contracts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span>24/7 support included</span>
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

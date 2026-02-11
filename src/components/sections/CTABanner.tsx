"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { fadeIn, stagger } from "@/lib/animations";

export function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="bg-navy text-white py-24 md:py-36">
      <Container>
        <motion.div
          ref={ref}
          variants={stagger(0.15)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.h2
            variants={fadeIn}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6"
          >
            Ready To Stop Guessing And{" "}
            <span className="text-coral">Start Growing?</span>
          </motion.h2>

          <motion.p
            variants={fadeIn}
            className="text-xl text-white/60 mb-10"
          >
            No 12-month contracts. No corporate jargon. Just results.
          </motion.p>

          <motion.div
            variants={fadeIn}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton>
              <Link href="/pricing">
                <Button
                  data-cursor="button"
                  variant="accent"
                  size="lg"
                  rightIcon={<ArrowRight size={20} />}
                >
                  See Our Plans
                </Button>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link href="/contact">
                <Button
                  data-cursor="button"
                  variant="outline"
                  size="lg"
                  leftIcon={<Calendar size={20} />}
                  className="border-white/30 text-white hover:bg-white hover:text-navy"
                >
                  Schedule a Call
                </Button>
              </Link>
            </MagneticButton>
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/50"
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
        </motion.div>
      </Container>
    </section>
  );
}

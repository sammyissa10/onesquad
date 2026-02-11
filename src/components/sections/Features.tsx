"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { DynamicIcon } from "@/components/ui/Icon";
import { valueProps } from "@/lib/constants";
import { fadeIn, scaleIn, stagger } from "@/lib/animations";

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="bg-navy text-white py-32 md:py-40">
      <Container>
        <motion.div
          ref={ref}
          variants={stagger(0.15)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Asymmetric layout: heading left, cards right */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left — heading and description */}
            <motion.div variants={fadeIn} className="lg:sticky lg:top-32">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                Why Businesses Ditch Their Old Agency For Us
              </h2>
              <p className="text-white/60 text-lg">
                Because we're faster, cheaper, and we actually give a damn about your results.
              </p>
            </motion.div>

            {/* Right — stacked cards */}
            <div className="space-y-6">
              {valueProps.map((prop) => (
                <motion.div
                  key={prop.title}
                  variants={scaleIn}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.2 }}
                  data-cursor="card"
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-coral/20 flex items-center justify-center flex-shrink-0">
                      <DynamicIcon name={prop.icon} className="w-7 h-7 text-coral" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {prop.title}
                      </h3>
                      <p className="text-white/70">{prop.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

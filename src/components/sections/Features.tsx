"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { DynamicIcon } from "@/components/ui/Icon";
import { valueProps } from "@/lib/constants";
import { fadeIn, scaleIn, stagger } from "@/lib/animations";

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section background="white">
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
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
                Why businesses switch to us
              </h2>
              <p className="text-muted-foreground text-lg">
                We understand the unique challenges small and medium businesses
                face online. Here&apos;s what makes working with us different.
              </p>
            </motion.div>

            {/* Right — stacked cards */}
            <div className="space-y-6">
              {valueProps.map((prop) => (
                <motion.div
                  key={prop.title}
                  variants={scaleIn}
                  className="bg-white rounded-2xl p-8 shadow-lg shadow-primary/5 border border-border hover:border-accent/50 transition-colors duration-300"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center flex-shrink-0">
                      <DynamicIcon name={prop.icon} className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">
                        {prop.title}
                      </h3>
                      <p className="text-muted-foreground">{prop.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Container, Section } from "@/components/ui/Container";
import { DynamicIcon } from "@/components/ui/Icon";
import { valueProps } from "@/lib/constants";

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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Section background="white" className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-muted to-transparent" />

      <Container>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
              Why SMBs Choose OneSquad
            </h2>
            <p className="text-muted-foreground text-lg">
              We understand the unique challenges small and medium businesses
              face in the digital world. That's why we've built a service model
              designed specifically for your success.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {valueProps.map((prop, index) => (
              <motion.div
                key={prop.title}
                variants={itemVariants}
                className="relative group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg shadow-primary/5 border border-border hover:border-accent/50 transition-all duration-300 h-full">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center mb-6"
                  >
                    <DynamicIcon name={prop.icon} className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-primary mb-4">
                    {prop.title}
                  </h3>
                  <p className="text-muted-foreground">{prop.description}</p>

                  {/* Number indicator */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-muted-foreground">
                    {index + 1}
                  </div>
                </div>

                {/* Hover effect bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  className="absolute bottom-0 left-4 right-4 h-1 bg-gradient-to-r from-accent to-secondary origin-left rounded-full"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

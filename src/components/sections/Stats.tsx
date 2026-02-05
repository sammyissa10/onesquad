"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { stats } from "@/lib/constants";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <Section background="gradient">
      <Container>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                className="inline-block"
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70 font-medium">{stat.label}</div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Container, Section } from "@/components/ui/Container";
import { Search, Lightbulb, Rocket, BarChart3 } from "lucide-react";

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
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start by understanding your business, goals, target audience, and competitive landscape through in-depth consultation.",
    icon: Search,
    color: "accent",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Based on our findings, we develop a tailored digital strategy with clear milestones and measurable objectives.",
    icon: Lightbulb,
    color: "secondary",
  },
  {
    number: "03",
    title: "Execution",
    description:
      "Our team brings the strategy to life with expert implementation, keeping you informed every step of the way.",
    icon: Rocket,
    color: "highlight",
  },
  {
    number: "04",
    title: "Optimization",
    description:
      "We continuously monitor, analyze, and optimize to ensure maximum results, adapting strategies based on data.",
    icon: BarChart3,
    color: "accent",
  },
];

export function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <Section background="white">
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
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
              A Proven Process for{" "}
              <span className="text-accent">Digital Success</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Our streamlined approach ensures you get results without the
              complexity. Here's how we turn your digital goals into reality.
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="relative">
            {/* Connecting line - desktop only */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-secondary to-highlight" />

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.number}
                  variants={itemVariants}
                  className="relative"
                >
                  <div className="bg-muted rounded-2xl p-6 h-full hover:shadow-lg transition-shadow">
                    {/* Step number with icon */}
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`w-14 h-14 rounded-2xl bg-${step.color}/10 flex items-center justify-center relative z-10`}
                        style={{
                          backgroundColor:
                            step.color === "accent"
                              ? "rgb(226 121 94 / 0.1)"
                              : step.color === "secondary"
                              ? "rgb(255 189 131 / 0.1)"
                              : "rgb(39 89 142 / 0.1)",
                        }}
                      >
                        <step.icon
                          className="w-7 h-7"
                          style={{
                            color:
                              step.color === "accent"
                                ? "#E2795E"
                                : step.color === "secondary"
                                ? "#FFBD83"
                                : "#27598E",
                          }}
                        />
                      </motion.div>
                      <span className="text-4xl font-bold text-muted-foreground/30">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-primary mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>

                  {/* Arrow connector for desktop */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-24 -right-4 w-8 h-8 z-20">
                      <div className="w-3 h-3 rotate-45 border-t-2 border-r-2 border-primary/20" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

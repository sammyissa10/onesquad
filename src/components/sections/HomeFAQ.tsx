"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const homeFAQs = [
  {
    question: "How much does it cost to work with OneSquad?",
    answer:
      "Our plans start at $150/month for basic website hosting and go up to $550/month for our full-service OneSquad package. We also offer custom solutions tailored to your specific needs. All plans include 24/7 support, security, and daily backups.",
  },
  {
    question: "What kind of results can I expect?",
    answer:
      "Results vary based on your industry and current digital presence, but our clients typically see 50-200% increases in website traffic within 3-6 months. We focus on measurable outcomes and provide monthly reports so you can track progress.",
  },
  {
    question: "How long does it take to get started?",
    answer:
      "You can be up and running in as little as 2-4 weeks for most website projects. We begin with a discovery call to understand your needs, then move quickly through strategy and execution phases while keeping you informed every step.",
  },
  {
    question: "Do I need to sign a long-term contract?",
    answer:
      "No! All our plans are month-to-month with no long-term commitment required. You can cancel anytime with 30 days notice. We believe in earning your business every month through results, not locking you into contracts.",
  },
  {
    question: "What makes OneSquad different from other agencies?",
    answer:
      "We're a true partner, not just a vendor. Our name says it all—when you work with us, your team and our team become one with a single mission: your digital success. Plus, we're an all-in-one solution, so you don't need to juggle multiple vendors.",
  },
];

function FAQItem({ faq, index }: { faq: typeof homeFAQs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="border-b border-border last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="font-semibold text-primary group-hover:text-accent transition-colors pr-4">
          {faq.question}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform flex-shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-muted-foreground">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function HomeFAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <Section background="muted">
      <Container size="md">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mt-4 mb-4">
              Common Questions
            </h2>
            <p className="text-muted-foreground text-lg">
              Quick answers to help you decide if we're the right fit.
            </p>
          </motion.div>

          {/* FAQ List */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
          >
            {homeFAQs.map((faq, index) => (
              <FAQItem key={faq.question} faq={faq} index={index} />
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Have more questions?
            </p>
            <Link href="/contact">
              <Button variant="accent" rightIcon={<ArrowRight size={18} />}>
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

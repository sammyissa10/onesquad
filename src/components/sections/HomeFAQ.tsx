"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const homeFAQs = [
  {
    question: "How much does it cost to work with OneSquad?",
    answer:
      "Plans start at $150/month for hosting and go up to $550/month for our full-service package. We also do custom quotes. Every plan includes support, security, and daily backups.",
  },
  {
    question: "What kind of results can I expect?",
    answer:
      "It depends on where you're starting from, but most clients see a noticeable jump in traffic within 3-6 months. We send monthly reports so you can see exactly what's moving.",
  },
  {
    question: "How long does it take to get started?",
    answer:
      "Most websites go live in 2-4 weeks. We start with a call to figure out what you need, then get moving. You'll have updates the whole way through.",
  },
  {
    question: "Do I need to sign a long-term contract?",
    answer:
      "Nope. Month-to-month, cancel anytime with 30 days notice. If we're not earning your business, you should be free to leave.",
  },
  {
    question: "What makes OneSquad different from other agencies?",
    answer:
      "Honestly? We're smaller and we like it that way. You won't get passed between departments. The person you talk to on day one is the same person managing your account on day 100.",
  },
];

function FAQItem({ faq }: { faq: typeof homeFAQs[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
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
    </div>
  );
}

export function HomeFAQ() {
  return (
    <Section background="muted" padding="sm">
      <Container size="md">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Common Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Quick answers to help you decide if we&apos;re the right fit.
          </p>
        </div>

        {/* FAQ List */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {homeFAQs.map((faq) => (
            <FAQItem key={faq.question} faq={faq} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <p className="text-muted-foreground mb-4">
            Have more questions?
          </p>
          <Link href="/contact">
            <Button variant="accent" rightIcon={<ArrowRight size={18} />}>
              Get in Touch
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
}

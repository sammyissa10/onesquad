"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const homeFAQs = [
  {
    question: "How much does it cost to work with OneSquad?",
    answer:
      "Plans start at $150/month for hosting and go up to $550/month for our full-service package. We also do custom quotes. Every plan includes support, security, and daily backups. No hidden fees, no surprises.",
  },
  {
    question: "What kind of results can I expect?",
    answer:
      "It depends on where you're starting from, but most clients see a noticeable jump in traffic within 3-6 months. We're not here to sell you on magic — we build stuff that works and track it obsessively.",
  },
  {
    question: "How long does it take to get started?",
    answer:
      "Most websites go live in 2-4 weeks. We start with a call to figure out what you actually need (not what we want to sell you), then get moving. You'll have updates the whole way through.",
  },
  {
    question: "Do I need to sign a long-term contract?",
    answer:
      "Nope. Month-to-month, cancel anytime with 30 days' notice. If we're not earning your business every month, you should be free to leave. Simple as that.",
  },
  {
    question: "What makes OneSquad different from other agencies?",
    answer:
      "We're smaller, and we like it that way. You won't get passed between departments or wait three days for a reply. The person you talk to on day one is the same person managing your account on day 100. That matters.",
  },
];

function FAQItem({ faq }: { faq: typeof homeFAQs[0] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-navy/10 last:border-0">
      <button
        data-cursor="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="font-bold text-navy group-hover:text-coral transition-colors pr-4">
          {faq.question}
        </span>
        <ChevronDown
          className={cn(
            "w-5 h-5 transition-all flex-shrink-0",
            isOpen ? "rotate-180 text-coral" : "text-navy/40"
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
            <p className="pb-5 text-navy/70">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function HomeFAQ() {
  return (
    <section className="bg-white text-navy py-20 md:py-28">
      <Container size="md">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
            The Stuff You&apos;re Probably{" "}
            <span className="text-coral">Wondering</span>
          </h2>
          <p className="text-navy/60 text-lg">
            Questions? We&apos;ve got answers. And honesty.
          </p>
        </div>

        {/* FAQ List */}
        <div className="bg-muted rounded-2xl p-6 md:p-8">
          {homeFAQs.map((faq) => (
            <FAQItem key={faq.question} faq={faq} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <p className="text-navy/60 mb-4">Still have questions?</p>
          <Link href="/contact">
            <Button data-cursor="button" variant="accent">
              Book a 15-Min Call (Free)
            </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}

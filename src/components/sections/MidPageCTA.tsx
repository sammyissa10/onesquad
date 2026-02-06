"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

interface MidPageCTAProps {
  heading: string;
  buttonText: string;
  buttonHref: string;
}

export function MidPageCTA({ heading, buttonText, buttonHref }: MidPageCTAProps) {
  return (
    <section className="py-12 bg-gradient-to-r from-primary-brand to-[#27598E]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <h3 className="text-xl md:text-2xl font-bold text-white text-center sm:text-left">
            {heading}
          </h3>
          <Link href={buttonHref} className="flex-shrink-0">
            <Button
              variant="secondary"
              size="lg"
              rightIcon={<ArrowRight size={18} />}
              className="text-primary"
            >
              {buttonText}
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

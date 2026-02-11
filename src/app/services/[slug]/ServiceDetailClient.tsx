"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ChevronDown } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { DynamicIcon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

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

// Service-specific taglines
const serviceTaglines: Record<string, string> = {
  "digital-marketing": "Campaigns that fill your pipeline, not just your dashboard.",
  "seo": "Get found by people who are ready to buy.",
  "social-media": "Show up where your customers actually hang out.",
  "email-marketing": "The inbox is still king. We help you rule it.",
  "ppc": "Every dollar tracked. Every click counts.",
  "content-marketing": "Content that earns trust before you even shake hands.",
  "web-design": "Websites that look like you, not like a template.",
  "ecommerce": "Your 24/7 storefront, built to convert.",
  "hosting": "Fast, secure, always on. We handle the boring stuff.",
  "maintenance": "Updates, fixes, and peace of mind. On autopilot.",
};

function ServiceFAQItem({ faq, isLast }: { faq: { question: string; answer: string }; isLast: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("border-b border-navy/10", isLast && "border-0")}>
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

interface ServiceDetailClientProps {
  service: Service;
  relatedServices: Service[];
  categoryName: string;
}

export default function ServiceDetailClient({
  service,
  relatedServices,
  categoryName,
}: ServiceDetailClientProps) {
  return (
    <>
      <Header />
      <main>
        {/* Section 1 — Hero (DARK - navy) */}
        <section className="bg-navy text-white py-24 md:py-36">
          <Container>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={itemVariants}>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-6 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back to Services
                </Link>
              </motion.div>

              <motion.div variants={itemVariants}>
                <span className="inline-block bg-coral/20 text-coral text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                  {categoryName}
                </span>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-start gap-6 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <DynamicIcon
                    name={service.icon}
                    className="w-8 h-8 text-white"
                  />
                </div>
                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white">
                    {service.title}
                  </h1>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <p className="text-xl text-white/60 max-w-2xl">
                  {serviceTaglines[service.slug]}
                </p>
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {/* Section 2 — Features (LIGHT - white) */}
        <section className="bg-white text-navy py-20 md:py-28">
          <Container>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-navy">
                  What You Get
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.features.map((feature) => (
                  <motion.div
                    key={feature}
                    variants={itemVariants}
                    className="relative group"
                  >
                    {/* Glow hover effect */}
                    <div className="absolute inset-0 bg-coral/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                    <div className="relative bg-peach/5 border border-peach/20 rounded-2xl p-6 flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-coral/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-coral" />
                      </div>
                      <span className="font-medium text-navy">
                        {feature}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Section 3 — Results (DARK - navy) */}
        {service.results && service.results.length > 0 && (
          <section className="bg-navy text-white py-24 md:py-36">
            <Container>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={itemVariants} className="mb-12">
                  <h2 className="text-3xl md:text-5xl font-black text-white">
                    The Numbers Don&apos;t{" "}
                    <span className="text-coral">Lie</span>
                  </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-12">
                  {service.results.map((result) => (
                    <motion.div
                      key={result.description}
                      variants={itemVariants}
                      className="text-center md:text-left"
                    >
                      <div className="text-5xl md:text-7xl font-black text-coral mb-3">
                        {result.metric}
                      </div>
                      <p className="text-white/60 text-lg">{result.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Container>
          </section>
        )}

        {/* Section 4 — Why Choose Us (LIGHT - peach tinted) */}
        <section className="bg-peach/10 text-navy py-16 md:py-24">
          <Container>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl md:text-4xl font-black text-navy mb-6">
                  Why OneSquad?
                </h2>
                <div className="space-y-4 mb-8">
                  <p className="text-navy/70 text-lg">
                    We&apos;re not a faceless agency with a ticket queue. We&apos;re a small team that actually picks up the phone and knows your business by name.
                  </p>
                  <p className="text-navy/70 text-lg">
                    No 12-month contracts. No jargon. No surprises on the invoice. Just results you can measure and a team you can trust.
                  </p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <MagneticButton>
                    <Link href="/contact">
                      <Button variant="accent" size="lg" data-cursor="button">
                        Get Started
                      </Button>
                    </Link>
                  </MagneticButton>
                  <MagneticButton>
                    <Link href="/pricing">
                      <Button variant="outline" size="lg" data-cursor="button">
                        View Pricing
                      </Button>
                    </Link>
                  </MagneticButton>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { value: "29+", label: "Websites Launched" },
                  { value: "24/7", label: "Support Available" },
                  { value: "2-4 wk", label: "Avg Launch Time" },
                  { value: "0", label: "Long-term Contracts" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white rounded-xl p-6 text-center shadow-lg"
                  >
                    <div className="text-3xl font-bold text-coral mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-navy/60">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {/* Section 5 — Related Services (DARK - navy) */}
        {relatedServices.length > 0 && (
          <section className="bg-navy text-white py-20 md:py-28">
            <Container>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={itemVariants} className="mb-12">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    More From {categoryName}
                  </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                  {relatedServices.map((relatedService) => (
                    <motion.div
                      key={relatedService.slug}
                      variants={itemVariants}
                      whileHover={{ y: -6 }}
                    >
                      <Link href={`/services/${relatedService.slug}`}>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 h-full hover:shadow-lg hover:shadow-coral/10 transition-shadow">
                          <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-4">
                            <DynamicIcon
                              name={relatedService.icon}
                              className="w-6 h-6 text-coral"
                            />
                          </div>
                          <h3 className="text-lg font-bold text-white mb-2">
                            {relatedService.title}
                          </h3>
                          <p className="text-white/60 text-sm mb-4">
                            {relatedService.shortDescription}
                          </p>
                          <span className="inline-flex items-center gap-2 text-coral font-medium text-sm">
                            Learn More <ArrowRight size={14} />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Container>
          </section>
        )}

        {/* Section 6 — Service FAQs (LIGHT - white) */}
        {service.serviceFaqs && service.serviceFaqs.length > 0 && (
          <section className="bg-white text-navy py-16 md:py-24">
            <Container size="md">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={itemVariants} className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-black text-navy">
                    Questions About{" "}
                    <span className="text-coral">{service.title}</span>?
                  </h2>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <div className="bg-muted rounded-3xl p-6 md:p-10">
                    {service.serviceFaqs.map((faq, index) => (
                      <ServiceFAQItem
                        key={faq.question}
                        faq={faq}
                        isLast={index === service.serviceFaqs!.length - 1}
                      />
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </Container>
          </section>
        )}

        {/* Bottom CTA — inline in page (DARK - navy) */}
        <section className="bg-navy text-white py-24 md:py-36">
          <Container>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
                  Ready To Get{" "}
                  <span className="text-coral">{service.title}</span>{" "}
                  Working For You?
                </h2>
              </motion.div>

              <motion.div variants={itemVariants}>
                <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
                  No contracts. No jargon. Just results.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <MagneticButton>
                  <Link href="/contact">
                    <Button
                      variant="accent"
                      size="lg"
                      rightIcon={<ArrowRight size={20} />}
                      data-cursor="button"
                    >
                      Let&apos;s Talk
                    </Button>
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link href="/pricing">
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/30 text-white hover:bg-white hover:text-navy"
                      data-cursor="button"
                    >
                      See Our Plans
                    </Button>
                  </Link>
                </MagneticButton>
              </motion.div>
            </motion.div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ChevronDown } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui/Icon";
import { services } from "@/lib/constants";
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

function ServiceFAQItem({ faq, index, isLast }: { faq: { question: string; answer: string }; index: number; isLast: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn(!isLast && "border-b border-border")}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
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
            <p className="pb-6 text-muted-foreground">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ServicePage() {
  const params = useParams();
  const slug = params.slug as string;

  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <>
        <Header />
        <main>
          <Section background="gradient" className="pb-20">
            <Container>
              <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-4">
                  Service Not Found
                </h1>
                <p className="text-white/80 mb-8">
                  The service you're looking for doesn't exist.
                </p>
                <Link href="/services">
                  <Button variant="accent">View All Services</Button>
                </Link>
              </div>
            </Container>
          </Section>
        </main>
        <Footer />
      </>
    );
  }

  const relatedServices = services
    .filter((s) => s.category === service.category && s.slug !== service.slug)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <Section background="gradient" className="pb-20">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Services
              </Link>

              <div className="flex items-start gap-6">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0"
                >
                  <DynamicIcon
                    name={service.icon}
                    className="w-10 h-10 text-secondary"
                  />
                </motion.div>
                <div>
                  <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                    {service.category === "digital-marketing"
                      ? "Digital Marketing"
                      : "Web Solutions"}
                  </span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-2 mb-4">
                    {service.title}
                  </h1>
                  <p className="text-xl text-white/80 max-w-2xl">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </Container>
        </Section>

        {/* Features */}
        <Section background="white">
          <Container>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                  What's Included
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Here&apos;s what you get with our {service.title.toLowerCase()} service.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    variants={itemVariants}
                    className="flex items-start gap-4 p-6 bg-muted rounded-xl"
                  >
                    <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-foreground font-medium">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Container>
        </Section>

        {/* Results Metrics */}
        {service.results && service.results.length > 0 && (
          <Section background="gradient">
            <Container>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={itemVariants} className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    Results That Speak for Themselves
                  </h2>
                  <p className="text-white/70 text-lg">
                    What our clients typically see with our {service.title.toLowerCase()} services.
                  </p>
                </motion.div>
                <div className="grid md:grid-cols-3 gap-8">
                  {service.results.map((result) => (
                    <motion.div
                      key={result.description}
                      variants={itemVariants}
                      className="text-center"
                    >
                      <div className="text-4xl md:text-5xl font-bold text-secondary mb-3">
                        {result.metric}
                      </div>
                      <p className="text-white/70">{result.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Container>
          </Section>
        )}

        {/* Why Choose Us */}
        <Section background="muted">
          <Container>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  Why Choose OneSquad for {service.title}?
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground text-lg">
                    We don&apos;t just check boxes — we focus on results. Our team
                    brings years of hands-on experience helping small and
                    midsize businesses grow their presence online.
                  </p>
                  <p className="text-muted-foreground text-lg">
                    We take the time to understand your goals and build a
                    strategy that actually works for your business — not a
                    one-size-fits-all approach.
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/contact">
                    <Button variant="accent" size="lg">
                      Get Started
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button variant="outline" size="lg">
                      View Pricing
                    </Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { value: "100%", label: "Client Satisfaction" },
                  { value: "24/7", label: "Support Available" },
                  { value: "50+", label: "Projects Delivered" },
                  { value: "5+", label: "Years Experience" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white rounded-xl p-6 text-center shadow-lg"
                  >
                    <div className="text-3xl font-bold text-accent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </Container>
        </Section>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <Section background="white">
            <Container>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <motion.div variants={itemVariants} className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                    Related Services
                  </h2>
                  <p className="text-muted-foreground text-lg">
                    Explore other services that complement {service.title}.
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                  {relatedServices.map((relatedService) => (
                    <motion.div
                      key={relatedService.slug}
                      variants={itemVariants}
                      whileHover={{ y: -8 }}
                    >
                      <Link href={`/services/${relatedService.slug}`}>
                        <div className="bg-muted rounded-xl p-6 h-full hover:shadow-lg transition-shadow">
                          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                            <DynamicIcon
                              name={relatedService.icon}
                              className="w-6 h-6 text-accent"
                            />
                          </div>
                          <h3 className="text-lg font-bold text-primary mb-2">
                            {relatedService.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            {relatedService.shortDescription}
                          </p>
                          <span className="inline-flex items-center gap-2 text-accent font-medium text-sm">
                            Learn More <ArrowRight size={14} />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </Container>
          </Section>
        )}

        {/* Service FAQ */}
        {service.serviceFaqs && service.serviceFaqs.length > 0 && (
          <Section background="white">
            <Container size="md">
              <div className="text-center mb-12">
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                  FAQ
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mt-4">
                  Common Questions About {service.title}
                </h2>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                {service.serviceFaqs.map((faq, index) => (
                  <ServiceFAQItem key={faq.question} faq={faq} index={index} isLast={index === (service.serviceFaqs?.length ?? 0) - 1} />
                ))}
              </div>
            </Container>
          </Section>
        )}

        {/* CTA */}
        <Section background="gradient">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Get Started with {service.title}?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Tell us about your business and we&apos;ll show you how
                {" "}{service.title.toLowerCase()} can make a difference.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <Button
                    variant="secondary"
                    size="lg"
                    rightIcon={<ArrowRight size={20} />}
                  >
                    Contact Us Today
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white hover:text-primary"
                  >
                    View Pricing Plans
                  </Button>
                </Link>
              </div>
            </motion.div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

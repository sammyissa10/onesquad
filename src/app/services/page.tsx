"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui/Icon";
import { services } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

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

function ServicesContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const digitalMarketing = services.filter(
    (s) => s.category === "digital-marketing"
  );
  const webSolutions = services.filter((s) => s.category === "web-solutions");

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Digital Marketing Section */}
      <motion.div variants={itemVariants} id="digital-marketing" className="mb-20">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-1 bg-accent rounded-full" />
          <h2 className="text-3xl font-bold text-primary">Digital Marketing</h2>
        </div>
        <p className="text-muted-foreground text-lg mb-10 max-w-3xl">
          Drive traffic, engagement, and conversions with our comprehensive
          digital marketing services. We create data-driven strategies tailored
          to your business goals.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {digitalMarketing.map((service) => (
            <motion.div
              key={service.slug}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg shadow-primary/5 border border-transparent hover:border-accent/30 transition-all duration-300 h-full">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
                  <DynamicIcon
                    name={service.icon}
                    className="w-7 h-7 text-accent group-hover:text-white transition-colors"
                  />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {service.shortDescription}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all"
                >
                  Learn More <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Web Solutions Section */}
      <motion.div variants={itemVariants} id="web-solutions">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-1 bg-highlight rounded-full" />
          <h2 className="text-3xl font-bold text-primary">Web Solutions</h2>
        </div>
        <p className="text-muted-foreground text-lg mb-10 max-w-3xl">
          Build and maintain a powerful online presence with our web solutions.
          From stunning designs to secure hosting, we've got you covered.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {webSolutions.map((service) => (
            <motion.div
              key={service.slug}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg shadow-primary/5 border border-transparent hover:border-highlight/30 transition-all duration-300 h-full flex gap-6">
                <div className="w-16 h-16 rounded-xl bg-highlight/10 flex items-center justify-center flex-shrink-0 group-hover:bg-highlight transition-colors">
                  <DynamicIcon
                    name={service.icon}
                    className="w-8 h-8 text-highlight group-hover:text-white transition-colors"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-highlight transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.slice(0, 4).map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-highlight font-medium hover:gap-3 transition-all"
                  >
                    Learn More <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: "Services" }]} />
      <main>
        {/* Hero */}
        <Section background="gradient">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                Our Services
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
                Digital Solutions That{" "}
                <span className="text-secondary">Drive Results</span>
              </h1>
              <p className="text-xl text-white/80">
                From your first website to a full-scale digital marketing
                operation, we deliver the expertise and support you need—all
                under one roof.
              </p>
            </motion.div>
          </Container>
        </Section>

        {/* Services List */}
        <Section background="muted">
          <Container>
            <ServicesContent />
          </Container>
        </Section>

        {/* CTA */}
        <Section background="white">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Let's discuss how our services can help your business grow.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/pricing">
                  <Button variant="accent" size="lg">
                    View Pricing
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Target, Heart, Zap, Users, Award, Clock } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig, stats } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

const values = [
  {
    icon: Heart,
    title: "Partnership Over Transactions",
    description:
      "We don't just deliver services—we build relationships. Your success is our success, and we're invested in your long-term growth.",
  },
  {
    icon: Award,
    title: "Quality Over Shortcuts",
    description:
      "We believe in doing things right. Every website, campaign, and strategy is crafted with attention to detail and best practices.",
  },
  {
    icon: Zap,
    title: "Growth Over Stagnation",
    description:
      "The digital world never stops evolving, and neither do we. We continuously learn, adapt, and innovate to keep you ahead.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start by understanding your business, goals, and challenges through in-depth consultation.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Based on our findings, we develop a tailored digital strategy that aligns with your objectives.",
  },
  {
    number: "03",
    title: "Execution",
    description:
      "Our team brings the strategy to life with expert implementation and attention to detail.",
  },
  {
    number: "04",
    title: "Optimization",
    description:
      "We continuously monitor, analyze, and optimize to ensure maximum results and ROI.",
  },
];

export default function AboutPage() {
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const processRef = useRef(null);
  const isStoryInView = useInView(storyRef, { once: true, margin: "-50px" });
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-50px" });
  const isProcessInView = useInView(processRef, { once: true, margin: "-50px" });

  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: "About Us" }]} />
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
                About Us
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
                Two Become <span className="text-secondary">One</span>
              </h1>
              <p className="text-xl text-white/80">
                The story behind our name, our mission, and why we're passionate
                about helping small businesses succeed in the digital world.
              </p>
            </motion.div>
          </Container>
        </Section>

        {/* Story Section */}
        <Section background="white">
          <Container>
            <motion.div
              ref={storyRef}
              variants={containerVariants}
              initial="hidden"
              animate={isStoryInView ? "visible" : "hidden"}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  The Meaning Behind Our Logo
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Our logo tells the story of who we are. Two number 1s merge
                    together to form the letter S in negative space—symbolizing
                    the union of two teams becoming one.
                  </p>
                  <p>
                    When you partner with OneSquad, your team and our team unite
                    with a single mission: your digital success. We're not just
                    another vendor or service provider. We become an extension
                    of your business.
                  </p>
                  <p>
                    This philosophy drives everything we do—from how we
                    communicate with you, to how we approach your projects, to
                    how we measure our success (hint: it's measured by yours).
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative"
              >
                <div className="aspect-square bg-gradient-to-br from-primary-brand to-[#27598E] rounded-3xl flex items-center justify-center p-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <Image
                      src="/onesquadlogo.png"
                      alt="OneSquad Logo"
                      width={400}
                      height={400}
                      className="w-full h-full object-contain"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </Container>
        </Section>

        {/* Mission Section */}
        <Section background="muted">
          <Container size="md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <Target className="w-16 h-16 text-accent mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                To deliver innovative digital solutions, drive transformation
                for small and midsize businesses, and foster long-term
                partnerships built on trust, transparency, and shared success.
              </p>
            </motion.div>
          </Container>
        </Section>

        {/* Values Section */}
        <Section background="white">
          <Container>
            <motion.div
              ref={valuesRef}
              variants={containerVariants}
              initial="hidden"
              animate={isValuesInView ? "visible" : "hidden"}
            >
              <motion.div
                variants={itemVariants}
                className="text-center max-w-2xl mx-auto mb-16"
              >
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                  Our Values
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mt-4">
                  What We Stand For
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    variants={itemVariants}
                    className="text-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center mx-auto mb-6"
                    >
                      <value.icon className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-primary mb-4">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Container>
        </Section>

        {/* Stats Section */}
        <Section background="gradient">
          <Container>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/70 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Process Section */}
        <Section background="white">
          <Container>
            <motion.div
              ref={processRef}
              variants={containerVariants}
              initial="hidden"
              animate={isProcessInView ? "visible" : "hidden"}
            >
              <motion.div
                variants={itemVariants}
                className="text-center max-w-2xl mx-auto mb-16"
              >
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                  Our Process
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mt-4 mb-6">
                  How We Work
                </h2>
                <p className="text-muted-foreground">
                  A proven approach that delivers results every time.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    variants={itemVariants}
                    className="relative"
                  >
                    <div className="text-6xl font-bold text-muted/50 mb-4">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground">{step.description}</p>

                    {/* Connector line */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-accent to-transparent" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Container>
        </Section>

        {/* CTA */}
        <Section background="muted">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Ready to Join the Squad?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Let's start a conversation about your digital goals.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <Button variant="accent" size="lg">
                    Get in Touch
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg">
                    View Our Plans
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

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Target, Heart, Award, Zap } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { stats } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { fadeIn, stagger } from "@/lib/animations";

const values = [
  {
    icon: Heart,
    title: "We remember your name",
    description:
      "You're not a ticket number. Your account manager knows your business, your goals, and what you had for lunch (okay, maybe not that last one).",
  },
  {
    icon: Award,
    title: "We'd rather say no",
    description:
      "If something won't work for your business, we'll tell you. We'd rather lose a sale than waste your money on something that won't deliver.",
  },
  {
    icon: Zap,
    title: "We keep learning",
    description:
      "The digital world changes fast. We stay on top of it so you don't have to. What worked last year might not work this year, and we adapt accordingly.",
  },
];

export default function AboutPage() {
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const isStoryInView = useInView(storyRef, { once: true, margin: "-50px" });
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-50px" });

  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: "About Us" }]} />
      <main>
        {/* Hero */}
        <Section background="gradient">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
                Two Become <span className="text-secondary">One</span>
              </h1>
              <p className="text-xl text-white/80">
                The story behind our name, our mission, and why we do what we do.
              </p>
            </motion.div>
          </Container>
        </Section>

        {/* Story Section */}
        <Section background="white">
          <Container>
            <motion.div
              ref={storyRef}
              variants={stagger(0.15)}
              initial="hidden"
              animate={isStoryInView ? "visible" : "hidden"}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={fadeIn}>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  The Meaning Behind Our Logo
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Our logo tells the story of who we are. Two number 1s merge
                    together to form the letter S in negative space — symbolizing
                    the union of two teams becoming one.
                  </p>
                  <p>
                    When you partner with OneSquad, your team and our team unite
                    with a single mission: your digital success. We&apos;re not just
                    another vendor or service provider. We become an extension
                    of your business.
                  </p>
                  <p>
                    This philosophy drives everything we do — from how we
                    communicate with you, to how we approach your projects, to
                    how we measure our success (hint: it&apos;s measured by yours).
                  </p>
                </div>
              </motion.div>

              <motion.div variants={fadeIn} className="relative">
                <div className="aspect-square bg-gradient-to-br from-primary-brand to-[#27598E] rounded-3xl flex items-center justify-center p-12">
                  <Image
                    src="/onesquadlogo.png"
                    alt="OneSquad Logo"
                    width={400}
                    height={400}
                    className="w-full h-full object-contain"
                  />
                </div>
              </motion.div>
            </motion.div>
          </Container>
        </Section>

        {/* Mission Section */}
        <Section background="muted">
          <Container size="md">
            <div className="text-center">
              <Target className="w-16 h-16 text-accent mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Help small businesses look and perform like big ones online —
                without needing a big budget or an in-house tech team.
              </p>
            </div>
          </Container>
        </Section>

        {/* Values Section */}
        <Section background="white">
          <Container>
            <motion.div
              ref={valuesRef}
              variants={stagger(0.15)}
              initial="hidden"
              animate={isValuesInView ? "visible" : "hidden"}
            >
              <motion.div
                variants={fadeIn}
                className="text-center max-w-2xl mx-auto mb-16"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-primary mt-4">
                  What We Stand For
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-8">
                {values.map((value) => (
                  <motion.div
                    key={value.title}
                    variants={fadeIn}
                    className="text-center"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-10 h-10 text-white" />
                    </div>
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
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/70 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
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
                Let&apos;s start a conversation about your digital goals.
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

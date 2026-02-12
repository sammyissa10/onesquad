"use client";

import { useRef } from "react";
import { motion, useInView, MotionConfig } from "framer-motion";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px" });

  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
        {/* Section 1: Dark Hero - Mission First */}
        <section className="bg-[#0F172A] py-28 md:py-40" data-cursor="text" data-cursor-text="Read On">
          <Container size="xl">
            <motion.div
              ref={heroRef}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                  },
                },
              }}
              initial="hidden"
              animate={isHeroInView ? "visible" : "hidden"}
            >
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className="text-5xl md:text-7xl lg:text-[6rem] xl:text-display font-black text-white leading-[0.9] tracking-tight"
              >
                We Don&apos;t Do Average.
              </motion.h1>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
                className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-3xl mt-8"
              >
                We&apos;re a small squad building digital empires for businesses that refuse to blend in. No templates. No shortcuts. Just work that actually works.
              </motion.p>
            </motion.div>
          </Container>
        </section>

        {/* Section 2: Logo Origin Story */}
        <section className="bg-card py-24 md:py-36">
          <Container size="xl">
            <motion.div
              ref={storyRef}
              initial={{ opacity: 0, y: 30 }}
              animate={isStoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16"
            >
              {/* Left column - Story */}
              <div className="lg:col-span-7">
                <p className="text-sm font-semibold text-coral uppercase tracking-widest mb-6">
                  The Story
                </p>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy leading-[0.9] tracking-tight mb-8">
                  Two Become One.
                </h2>
                <div className="space-y-6 text-lg text-navy/70 leading-relaxed">
                  <p>
                    Our logo tells the story of who we are. Two number 1s merge together to form the letter S in negative space — symbolizing the union of two teams becoming one.
                  </p>
                  <p>
                    When you partner with OneSquad, your team and our team unite with a single mission: your digital success. We&apos;re not just another vendor. We become an extension of your business.
                  </p>
                  <p>
                    This philosophy drives everything — how we communicate, how we approach projects, and how we measure success. Hint: we measure it by yours.
                  </p>
                </div>
              </div>

              {/* Right column - Decorative brand mark */}
              <div className="lg:col-span-5">
                <div
                  className="aspect-square bg-gradient-to-br from-coral to-peach rounded-3xl flex items-center justify-center"
                  data-cursor="card"
                >
                  <div className="text-[8rem] md:text-[10rem] font-black text-white/20 select-none">
                    1S
                  </div>
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Section 3: Values - Typography Statements */}
        <section className="bg-[#0F172A] py-28 md:py-40">
          <Container size="xl">
            <div className="space-y-20 md:space-y-28">
              {/* Value 1 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[0.9] tracking-tight">
                  We Remember <span className="text-coral">Your Name.</span>
                </h3>
                <p className="text-xl md:text-2xl text-white/50 max-w-3xl leading-relaxed mt-6">
                  You&apos;re not a ticket number. Your account manager knows your business, your goals, and what keeps you up at night. We build relationships, not just websites.
                </p>
              </motion.div>

              {/* Value 2 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[0.9] tracking-tight">
                  We&apos;d Rather <span className="text-coral">Say No.</span>
                </h3>
                <p className="text-xl md:text-2xl text-white/50 max-w-3xl leading-relaxed mt-6">
                  If something won&apos;t work for your business, we&apos;ll tell you straight. We&apos;d rather lose a sale than waste your money on something that won&apos;t deliver. That&apos;s not noble — it&apos;s just good business.
                </p>
              </motion.div>

              {/* Value 3 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white leading-[0.9] tracking-tight">
                  We Never Stop <span className="text-coral">Learning.</span>
                </h3>
                <p className="text-xl md:text-2xl text-white/50 max-w-3xl leading-relaxed mt-6">
                  The digital world moves fast and we move with it. What worked last year might not work today. We stay sharp so you don&apos;t have to — and we bring those insights to every project.
                </p>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* Section 4: What Makes Us Different */}
        <section className="bg-peach/10 py-20 md:py-28">
          <Container size="xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-navy leading-[0.9] tracking-tight text-center mb-10">
                Small Team. Big Standards.
              </h2>
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-navy/70 leading-relaxed">
                  We&apos;re deliberately small. No account managers playing telephone. No junior devs learning on your dime. When you hire OneSquad, you get the people who actually do the work.
                </p>
                <p className="text-lg md:text-xl text-navy/70 leading-relaxed">
                  We take on fewer projects so we can give each one the attention it deserves. Your business isn&apos;t a line item — it&apos;s our focus.
                </p>
                <p className="text-lg md:text-xl text-navy/70 leading-relaxed">
                  And yeah, we remember your name. Every single time.
                </p>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Section 5: Manifesto Closer / CTA */}
        <section className="bg-[#0F172A] py-24 md:py-36">
          <Container size="xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.9] tracking-tight">
                Ready to Join <span className="text-coral">the Squad</span>?
              </h2>
              <p className="text-xl text-white/60 mt-6 mb-10">
                Let&apos;s stop talking about what we could build and start building it.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <Button variant="accent" size="lg" data-cursor="button">
                    Start a Project
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-navy"
                    data-cursor="button"
                  >
                    See Our Work
                  </Button>
                </Link>
              </div>
            </motion.div>
          </Container>
        </section>
      </main>
      <Footer />
    </MotionConfig>
  );
}

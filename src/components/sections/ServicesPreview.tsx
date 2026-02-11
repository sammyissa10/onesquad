"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { DynamicIcon } from "@/components/ui/Icon";
import { services } from "@/lib/constants";

import { fadeIn, stagger } from "@/lib/animations";

const containerVariants = stagger(0.1);
const itemVariants = fadeIn;

export function ServicesPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const digitalMarketing = services.filter(
    (s) => s.category === "digital-marketing"
  );
  const webSolutions = services.filter((s) => s.category === "web-solutions");

  return (
    <Section background="muted" padding="lg">
      <Container>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              What We Do
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
              Everything you need.{" "}
              <span className="text-accent">Nothing you don&apos;t.</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              From your first website to a full-scale digital marketing
              operation, we deliver the expertise and support you need—all under
              one roof.
            </p>
          </motion.div>

          {/* Services Categories */}
          <div className="space-y-16">
            {/* Web Solutions */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
                <span className="w-12 h-1 bg-highlight rounded-full" />
                Web Solutions
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {webSolutions.map((service, index) => (
                  <motion.div
                    key={service.slug}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    className={index === 0 ? "sm:col-span-2" : ""}
                  >
                    <Link href={`/services/${service.slug}`}>
                      <div className="bg-white rounded-2xl p-6 shadow-lg shadow-primary/5 border border-transparent hover:border-highlight/30 transition-all duration-300 h-full group">
                        <div className="w-12 h-12 rounded-xl bg-highlight/10 flex items-center justify-center mb-4 group-hover:bg-highlight transition-colors">
                          <DynamicIcon
                            name={service.icon}
                            className="w-6 h-6 text-highlight group-hover:text-white transition-colors"
                          />
                        </div>
                        <h4 className="font-bold text-primary mb-2 group-hover:text-highlight transition-colors">
                          {service.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {service.shortDescription}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Digital Marketing */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-primary mb-8 flex items-center gap-3">
                <span className="w-12 h-1 bg-accent rounded-full" />
                Digital Marketing
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {digitalMarketing.map((service) => (
                  <motion.div
                    key={service.slug}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link href={`/services/${service.slug}`}>
                      <div className="bg-white rounded-2xl p-6 shadow-lg shadow-primary/5 border border-transparent hover:border-accent/30 transition-all duration-300 h-full group">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors">
                            <DynamicIcon
                              name={service.icon}
                              className="w-6 h-6 text-accent group-hover:text-white transition-colors"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                              {service.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {service.shortDescription}
                            </p>
                          </div>
                          <ArrowRight
                            size={20}
                            className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0"
                          />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <Link href="/services">
              <Button variant="primary" size="lg" rightIcon={<ArrowRight />}>
                View All Services
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

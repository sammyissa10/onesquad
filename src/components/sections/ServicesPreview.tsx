"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
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
    <section className="bg-white text-navy py-20 md:py-28">
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
            <h2 className="text-3xl md:text-5xl font-bold text-navy mb-6">
              Everything You Need.{" "}
              <span className="text-coral">Zero Bloat.</span>
            </h2>
            <p className="text-navy/70 text-lg">
              Your entire digital team on one monthly bill. No contracts. No surprises.
            </p>
          </motion.div>

          {/* Services Categories */}
          <div className="space-y-16">
            {/* Web Solutions */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-black text-navy mb-8 flex items-center gap-3">
                <span className="w-12 h-1 bg-blue rounded-full" />
                Web Solutions
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {webSolutions.map((service, index) => (
                  <div key={service.slug} className={index === 0 ? "sm:col-span-2" : ""}>
                    <Link href={`/services/${service.slug}`}>
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-coral/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div
                          data-cursor="card"
                          data-cursor-text="View"
                          className="relative bg-white rounded-2xl p-6 border border-gray-200 h-full"
                        >
                          <div className="w-12 h-12 rounded-xl bg-blue/10 flex items-center justify-center mb-4 group-hover:bg-blue transition-colors">
                            <DynamicIcon
                              name={service.icon}
                              className="w-6 h-6 text-blue group-hover:text-white transition-colors"
                            />
                          </div>
                          <h4 className="font-bold text-navy mb-2 group-hover:text-blue transition-colors">
                            {service.title}
                          </h4>
                          <p className="text-sm text-navy/60">
                            {service.shortDescription}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Digital Marketing */}
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold text-navy mb-8 flex items-center gap-3">
                <span className="w-12 h-1 bg-coral rounded-full" />
                Digital Marketing
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {digitalMarketing.map((service) => (
                  <div key={service.slug}>
                    <Link href={`/services/${service.slug}`}>
                      <div className="relative group">
                        <div className="absolute -inset-1 bg-coral/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div
                          data-cursor="card"
                          data-cursor-text="View"
                          className="relative bg-white rounded-2xl p-6 border border-gray-200 h-full"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center flex-shrink-0 group-hover:bg-coral transition-colors">
                              <DynamicIcon
                                name={service.icon}
                                className="w-6 h-6 text-coral group-hover:text-white transition-colors"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-navy mb-2 group-hover:text-coral transition-colors">
                                {service.title}
                              </h4>
                              <p className="text-sm text-navy/60">
                                {service.shortDescription}
                              </p>
                            </div>
                            <ArrowRight
                              size={20}
                              className="text-navy/40 group-hover:text-coral group-hover:translate-x-1 transition-all flex-shrink-0"
                            />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
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
    </section>
  );
}

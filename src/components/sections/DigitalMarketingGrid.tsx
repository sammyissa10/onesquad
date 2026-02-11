"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DynamicIcon } from "@/components/ui/Icon";
import { services } from "@/lib/constants";
import { fadeIn, stagger } from "@/lib/animations";

export function DigitalMarketingGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const digitalMarketing = services.filter(
    (s) => s.category === "digital-marketing"
  );

  return (
    <section id="digital-marketing" className="bg-white text-navy py-20 md:py-28">
      <Container>
        <motion.div
          ref={ref}
          variants={stagger(0.08)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Category Header */}
          <motion.div variants={fadeIn} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-1 bg-coral rounded-full" />
              <h2 className="text-3xl md:text-4xl font-black">
                Marketing That Actually Works
              </h2>
            </div>
            <p className="text-navy/60 text-lg max-w-2xl">
              Forget vanity metrics. We build campaigns that put people through your door.
            </p>
          </motion.div>

          {/* Service Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {digitalMarketing.map((service) => (
              <motion.div key={service.slug} variants={fadeIn}>
                <Link href={`/services/${service.slug}`}>
                  <div
                    className="group relative"
                    data-cursor="card"
                    data-cursor-text="View"
                  >
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-coral/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Card content */}
                    <div className="relative bg-white rounded-2xl p-6 border border-gray-200 h-full">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center mb-4 group-hover:bg-coral transition-colors">
                        <DynamicIcon
                          name={service.icon}
                          className="w-6 h-6 text-coral group-hover:text-white transition-colors"
                        />
                      </div>

                      {/* Service Title */}
                      <h3 className="font-bold text-navy mb-3 group-hover:text-coral transition-colors">
                        {service.title}
                      </h3>

                      {/* Short Description */}
                      <p className="text-sm text-navy/60 mb-4">
                        {service.shortDescription}
                      </p>

                      {/* Result Metrics as Pills */}
                      <div className="flex flex-wrap gap-2">
                        {service.results?.map((result) => (
                          <span
                            key={result.metric}
                            className="bg-coral/5 text-coral text-xs rounded-full px-2 py-0.5"
                          >
                            {result.metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { DynamicIcon } from "@/components/ui/Icon";
import { services } from "@/lib/constants";
import { fadeIn, stagger } from "@/lib/animations";

export function WebSolutionsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const webSolutions = services.filter((s) => s.category === "web-solutions");

  return (
    <section id="web-solutions" className="bg-navy text-white py-24 md:py-36">
      <Container>
        <motion.div
          ref={ref}
          variants={stagger(0.1)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Category Header */}
          <motion.div variants={fadeIn} className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-12 h-1 bg-blue rounded-full" />
              <h2 className="text-3xl md:text-5xl font-black">
                Web Solutions Built To Last
              </h2>
            </div>
            <p className="text-white/60 text-lg max-w-2xl">
              Your website is your 24/7 salesperson. We make sure it actually closes.
            </p>
          </motion.div>

          {/* Asymmetric Bento Grid */}
          <div className="grid grid-cols-2 gap-6">
            {webSolutions.map((service, index) => {
              const isHeroCard = index === 0; // Web Design spans 2 columns

              return (
                <motion.div
                  key={service.slug}
                  variants={fadeIn}
                  className={isHeroCard ? "col-span-2" : ""}
                >
                  <Link href={`/services/${service.slug}`}>
                    <motion.div
                      whileHover={{ y: -6 }}
                      className={`group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:shadow-lg hover:shadow-blue/10 transition-all duration-300 h-full ${
                        isHeroCard ? "p-10" : "p-8"
                      }`}
                      data-cursor="card"
                    >
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-blue/20 flex items-center justify-center mb-6">
                        <DynamicIcon
                          name={service.icon}
                          className="w-7 h-7 text-blue"
                        />
                      </div>

                      {/* Service Title */}
                      <h3
                        className={`text-white font-bold mb-4 ${
                          isHeroCard ? "text-2xl" : "text-xl"
                        }`}
                      >
                        {service.title}
                      </h3>

                      {/* Full Description */}
                      <p className="text-white/60 mb-6">{service.description}</p>

                      {/* Result Metrics */}
                      <div
                        className={`${
                          isHeroCard
                            ? "flex flex-wrap gap-8"
                            : "space-y-4"
                        }`}
                      >
                        {service.results?.map((result) => (
                          <div key={result.metric}>
                            <div className="text-2xl font-bold text-blue">
                              {result.metric}
                            </div>
                            <div className="text-white/50 text-sm">
                              {result.description}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { testimonials } from "@/lib/constants";

import { scaleIn, stagger } from "@/lib/animations";

const containerVariants = stagger(0.15);
const itemVariants = scaleIn;

// Define unique visual treatments for each testimonial
const testimonialStyles = [
  {
    bg: "bg-coral",
    text: "text-white",
    quoteColor: "text-white/30",
    nameColor: "text-white",
    roleColor: "text-white/70",
    colSpan: "md:col-span-2",  // wide card
    padding: "p-10 md:p-12",
    rounded: "rounded-3xl",
  },
  {
    bg: "bg-navy",
    text: "text-white",
    quoteColor: "text-white/20",
    nameColor: "text-white",
    roleColor: "text-white/60",
    colSpan: "md:col-span-1",  // narrow card
    padding: "p-8",
    rounded: "rounded-2xl",
  },
  {
    bg: "bg-white",
    text: "text-navy",
    quoteColor: "text-coral/20",
    nameColor: "text-navy",
    roleColor: "text-navy/60",
    colSpan: "md:col-span-3",  // full-width card
    padding: "p-10 md:p-14",
    rounded: "rounded-3xl",
  },
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="bg-peach/15 text-navy py-20 md:py-32">
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
            <h2 className="text-3xl md:text-5xl font-black text-navy mb-6">
              Don&apos;t Take Our Word For It.{" "}
              <span className="text-coral">Take Theirs.</span>
            </h2>
            <p className="text-navy/60 text-lg">
              No scripts. No stock photos. Just honest feedback.
            </p>
          </motion.div>

          {/* Testimonial Bento Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial, index) => {
              const style = testimonialStyles[index % testimonialStyles.length];

              return (
                <motion.div
                  key={testimonial.id}
                  data-cursor="card"
                  className={`${style.bg} ${style.text} ${style.padding} ${style.rounded} ${style.colSpan} hover:scale-[1.02] transition-transform duration-300`}
                >
                  {/* Large decorative quote mark */}
                  <div className={`text-6xl md:text-7xl font-serif leading-none mb-4 ${style.quoteColor}`}>
                    &ldquo;
                  </div>

                  {/* Testimonial content */}
                  <blockquote className="text-lg md:text-xl mb-6 leading-relaxed">
                    {testimonial.content}
                  </blockquote>

                  {/* Star rating */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          style.bg === "bg-white"
                            ? "fill-coral text-coral"
                            : "fill-white text-white"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Author */}
                  <div>
                    <div className={`font-bold ${style.nameColor}`}>
                      {testimonial.name}
                    </div>
                    <div className={style.roleColor}>
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

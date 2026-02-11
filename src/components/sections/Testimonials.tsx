"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { testimonials } from "@/lib/constants";

import { scaleIn, stagger } from "@/lib/animations";

const containerVariants = stagger(0.15);
const itemVariants = scaleIn;

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <Section background="white" padding="lg">
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
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
              Don&apos;t take our{" "}
              <span className="text-accent">word for it</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Real businesses. Real results.
            </p>
          </motion.div>

          {/* Testimonials Carousel */}
          <motion.div variants={itemVariants} className="relative max-w-4xl mx-auto">
            <div className="relative bg-muted rounded-3xl p-8 md:p-12">
              {/* Quote icon */}
              <div className="absolute -top-6 left-8 w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>

              {/* Testimonial content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="pt-4"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: testimonials[activeIndex].rating }).map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-secondary text-secondary"
                        />
                      )
                    )}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl text-primary font-medium mb-8 leading-relaxed">
                    "{testimonials[activeIndex].content}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-secondary flex items-center justify-center text-white font-bold text-xl">
                      {testimonials[activeIndex].name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-primary">
                        {testimonials[activeIndex].name}
                      </div>
                      <div className="text-muted-foreground">
                        {testimonials[activeIndex].role},{" "}
                        {testimonials[activeIndex].company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="absolute bottom-8 right-8 flex gap-2">
                <button
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-8 bg-accent"
                      : "bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { fadeIn, stagger } from "@/lib/animations";

export function ServicesHero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="bg-navy text-white py-28 md:py-40">
      <Container>
        <motion.div
          ref={ref}
          variants={stagger(0.12)}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-5xl"
        >
          <motion.h1
            variants={fadeIn}
            className="text-4xl md:text-6xl lg:text-7xl xl:text-display font-black leading-[0.9] mb-8"
          >
            Digital Services That Actually{" "}
            <span className="text-coral">Move The Needle</span>
          </motion.h1>

          <motion.p
            variants={fadeIn}
            className="text-white/60 text-xl mb-12 max-w-2xl"
          >
            Two categories. Ten services. One team that knows your name.
          </motion.p>

          <motion.div
            variants={fadeIn}
            className="flex flex-col sm:flex-row gap-4"
          >
            <MagneticButton>
              <Link href="#digital-marketing">
                <Button
                  variant="accent"
                  size="lg"
                  data-cursor="button"
                >
                  Digital Marketing
                </Button>
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link href="#web-solutions">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white hover:text-navy"
                  data-cursor="button"
                >
                  Web Solutions
                </Button>
              </Link>
            </MagneticButton>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

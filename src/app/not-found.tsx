"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <Section background="gradient" className="min-h-[calc(100vh-5rem)] flex items-center">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-2xl mx-auto"
            >
              {/* 404 Number */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative inline-block mb-8"
              >
                <span className="text-[150px] md:text-[200px] font-bold text-white/10 leading-none">
                  404
                </span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Search className="w-20 h-20 text-secondary" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Message */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Oops! Page Not Found
              </h1>
              <p className="text-xl text-white/80 mb-8">
                The page you're looking for seems to have wandered off into the
                digital void. Don't worry, it happens to the best of us!
              </p>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/">
                  <Button
                    variant="secondary"
                    size="lg"
                    leftIcon={<Home size={20} />}
                    className="text-primary"
                  >
                    Go Home
                  </Button>
                </Link>
                <button
                  onClick={() => window.history.back()}
                  className="inline-flex items-center gap-2 px-6 py-3 text-white/80 hover:text-white transition-colors font-medium"
                >
                  <ArrowLeft size={20} />
                  Go Back
                </button>
              </div>

              {/* Helpful Links */}
              <div className="mt-16 pt-8 border-t border-white/10">
                <p className="text-white/60 mb-4">
                  Maybe one of these can help:
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  {[
                    { label: "Services", href: "/services" },
                    { label: "Pricing", href: "/pricing" },
                    { label: "Contact", href: "/contact" },
                    { label: "Blog", href: "/blog" },
                  ].map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="px-4 py-2 bg-white/10 rounded-lg text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

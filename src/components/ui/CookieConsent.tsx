"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50"
        >
          <div className="bg-card border border-border rounded-xl shadow-2xl p-5">
            <p className="text-sm text-muted-foreground mb-4">
              We use cookies to improve your experience and analyze site usage.
              By continuing to use this site, you agree to our cookie policy.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAccept}
                className="px-5 py-2 bg-accent hover:bg-accent/90 text-white text-sm font-semibold rounded-lg transition-colors"
              >
                Accept
              </button>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

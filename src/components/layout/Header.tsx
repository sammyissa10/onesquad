"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/constants";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Logo } from "./Logo";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change — legitimate sync of React state with
  // external navigation events; not a cascading render concern.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Always use solid header — hero is no longer dark behind it
  const useDarkText = true;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        useDarkText
          ? "bg-card/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Logo variant={useDarkText ? "default" : "light"} />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.children && setOpenDropdown(item.label)
                }
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  onClick={undefined}
                  data-cursor="button"
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium transition-colors hover:text-accent",
                    pathname === item.href ? "text-accent" : useDarkText ? "text-foreground" : "text-white"
                  )}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition-transform",
                        openDropdown === item.label && "rotate-180"
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && openDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-card rounded-xl shadow-xl border border-border overflow-hidden"
                    >
                      <div className="py-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            data-cursor="button"
                            className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-accent transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/pricing-calculator">
              <button
                data-cursor="button"
                className={cn(
                  "flex items-center gap-1.5 p-2 rounded-lg transition-colors",
                  useDarkText
                    ? "text-accent hover:text-accent/80 hover:bg-muted"
                    : "text-white hover:text-white/80 hover:bg-white/10"
                )}
                title="Price Calculator"
              >
                <Calculator size={18} />
              </button>
            </Link>
            <ThemeToggle
              className={cn(
                useDarkText
                  ? "text-foreground hover:bg-muted"
                  : "text-white hover:bg-white/10"
              )}
            />
            <MagneticButton>
              <Link href="/contact">
                <Button variant="accent" size="md">
                  Hire Us
                </Button>
              </Link>
            </MagneticButton>
          </div>

          {/* Mobile Menu Button */}
          <button
            data-cursor="button"
            className={cn("lg:hidden p-3", useDarkText ? "text-foreground" : "text-white")}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </Container>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-card z-50 lg:hidden flex flex-col shadow-2xl"
            >
              {/* Top bar */}
              <div className="flex items-center justify-between p-5 border-b border-border">
                <Logo variant="default" />
                <button
                  data-cursor="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto py-4 px-5">
                {navItems.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <div>
                        <button
                          data-cursor="button"
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === item.label ? null : item.label
                            )
                          }
                          className="flex items-center justify-between w-full py-3 text-lg font-medium text-foreground hover:text-accent transition-colors"
                        >
                          {item.label}
                          <ChevronDown
                            size={16}
                            className={cn(
                              "transition-transform",
                              openDropdown === item.label && "rotate-180"
                            )}
                          />
                        </button>
                        <AnimatePresence>
                          {openDropdown === item.label && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pl-4 space-y-1 overflow-hidden"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  data-cursor="button"
                                  className="block py-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        data-cursor="button"
                        className={cn(
                          "block py-3 text-lg font-medium transition-colors",
                          pathname === item.href
                            ? "text-accent"
                            : "text-foreground hover:text-accent"
                        )}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Bottom CTA area */}
              <div className="p-5 border-t border-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground text-sm">Theme</span>
                  <ThemeToggle className="text-foreground hover:bg-muted" />
                </div>
                <Link href="/pricing-calculator">
                  <Button variant="outline" size="md" className="w-full border-accent text-accent">
                    <Calculator size={16} className="mr-2" />
                    Price Calculator
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="accent" size="md" className="w-full">
                    Hire Us
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

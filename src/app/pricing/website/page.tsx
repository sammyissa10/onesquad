"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence, MotionConfig } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Check,
  ArrowRight,
  ArrowLeft,
  Palette,
  FileText,
  Gauge,
  Settings,
  Sparkles,
  Languages,
  Headphones,
  Clock,
  Search,
  BarChart3,
} from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

// Premium animation variants - slower, smoother, more deliberate
const premiumFadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  }
};

const premiumStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const premiumItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
  }
};

// Website specific options (PRESERVED FROM ORIGINAL)
const designComplexity = [
  { id: "professional", label: "Professional", price: 500 },
  { id: "good", label: "Good", price: 200 },
  { id: "basic", label: "Basic", price: 0 },
];

const pageOptions = [
  { id: "20", label: "20+", price: 400 },
  { id: "15", label: "15", price: 250 },
  { id: "10", label: "10", price: 100 },
  { id: "5", label: "5", price: 0 },
];

const cmsOptions = [
  { id: "custom", label: "Custom Built", price: 300 },
  { id: "wordpress", label: "WordPress", price: 0 },
  { id: "none", label: "Static Site", price: -100 },
];

const additionalServices = [
  { id: "performance", label: "Performance Optimization", price: 200, icon: Gauge },
  { id: "analytics", label: "Google Analytics", price: 100, icon: BarChart3 },
  { id: "seo", label: "Search Optimization", price: 400, icon: Search },
];

const specialFeatures = [
  { id: "3", label: "3", price: 900 },
  { id: "2", label: "2", price: 600 },
  { id: "1", label: "1", price: 300 },
  { id: "0", label: "0", price: 0 },
];

const languageOptions = [
  { id: "4", label: "4", price: 600 },
  { id: "3", label: "3", price: 400 },
  { id: "2", label: "2", price: 200 },
  { id: "1", label: "1", price: 0 },
];

const supportPlans = [
  { id: "year", label: "Full Year", price: 500 },
  { id: "6months", label: "6 Months", price: 250 },
  { id: "free", label: "Free Month", price: 0 },
];

const deliveryTimes = [
  { id: "2months", label: "2 Months", price: -200 },
  { id: "1month", label: "1 Month", price: 0 },
  { id: "2weeks", label: "2 Weeks", price: 300 },
];

const BASE_PRICE = 700;

export default function WebsitePricingPage() {
  // State management (PRESERVED FROM ORIGINAL)
  const [currentStep, setCurrentStep] = useState(1);
  const [settings, setSettings] = useState({
    design: "basic",
    pages: "5",
    cms: "wordpress",
    additional: [] as string[],
    features: "0",
    languages: "1",
    support: "free",
    delivery: "1month",
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Helper functions (PRESERVED FROM ORIGINAL)
  const toggleAdditional = (id: string) => {
    setSettings((prev) => ({
      ...prev,
      additional: prev.additional.includes(id)
        ? prev.additional.filter((a) => a !== id)
        : [...prev.additional, id],
    }));
  };

  const calculateTotal = () => {
    let total = BASE_PRICE;
    total += designComplexity.find((d) => d.id === settings.design)?.price || 0;
    total += pageOptions.find((p) => p.id === settings.pages)?.price || 0;
    total += cmsOptions.find((c) => c.id === settings.cms)?.price || 0;
    settings.additional.forEach((id) => {
      total += additionalServices.find((a) => a.id === id)?.price || 0;
    });
    total += specialFeatures.find((f) => f.id === settings.features)?.price || 0;
    total += languageOptions.find((l) => l.id === settings.languages)?.price || 0;
    total += supportPlans.find((s) => s.id === settings.support)?.price || 0;
    total += deliveryTimes.find((d) => d.id === settings.delivery)?.price || 0;
    return total;
  };

  const totalSteps = 3;

  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <Breadcrumb items={[{ label: "Pricing", href: "/pricing" }, { label: "Website Plans" }]} />
      <main>
        {/* Hero - Dark Navy with generous spacing */}
        <section className="relative bg-navy py-32 md:py-40 overflow-hidden">
          {/* Subtle radial gradient overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: 'radial-gradient(circle at 30% 70%, rgba(39, 89, 142, 0.2), transparent)'
            }}
          />

          <Container>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
              className="text-center max-w-4xl mx-auto relative z-10"
            >
              {/* Globe icon - larger, thin coral stroke outline */}
              <div className="w-24 h-24 rounded-full border-2 border-coral/30 flex items-center justify-center mx-auto mb-8">
                <Globe className="w-12 h-12 text-coral" strokeWidth={1.5} />
              </div>

              {/* Headline - confident, premium */}
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-heading text-white mb-6 leading-tight">
                Craft Your Digital <span className="text-coral">Presence</span>
              </h1>

              {/* Subtext - premium copy */}
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Every pixel placed with purpose. Every interaction designed to convert.
              </p>

              {/* Elegant divider */}
              <div className="w-24 h-px bg-coral/30 mx-auto" />
            </motion.div>
          </Container>
        </section>

        {/* Calculator - Light section with generous spacing */}
        <section className="bg-white py-28 md:py-36">
          <Container>
            <motion.div
              ref={ref}
              variants={premiumStagger}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid lg:grid-cols-[340px_1fr] gap-12"
            >
              {/* Sidebar Summary - elegant with subtle border */}
              <motion.div
                variants={premiumItem}
                className="lg:sticky lg:top-24 h-fit"
              >
                <motion.div
                  className="bg-white border border-border/50 rounded-3xl p-8 transition-shadow duration-500"
                  whileHover={{
                    boxShadow: "0 0 60px rgba(226, 121, 94, 0.15)"
                  }}
                  data-cursor="card"
                >
                  <div className="flex items-center gap-3 mb-8">
                    <Globe className="w-6 h-6 text-coral" />
                    <h3 className="text-2xl font-heading text-navy">Your Project</h3>
                  </div>

                  {/* Base price - elegant, not boxed */}
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-1">Starting at</p>
                    <p className="text-3xl font-bold text-navy">${BASE_PRICE}</p>
                  </div>

                  {/* Line items with generous spacing */}
                  <div className="space-y-3 text-sm text-navy mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Design</span>
                      <span className="font-medium">${designComplexity.find((d) => d.id === settings.design)?.price || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Pages</span>
                      <span className="font-medium">${pageOptions.find((p) => p.id === settings.pages)?.price || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">CMS</span>
                      <span className="font-medium">${cmsOptions.find((c) => c.id === settings.cms)?.price || 0}</span>
                    </div>
                    {settings.additional.map((id) => (
                      <div key={id} className="flex justify-between items-center">
                        <span className="text-muted-foreground">{additionalServices.find((a) => a.id === id)?.label}</span>
                        <span className="font-medium">${additionalServices.find((a) => a.id === id)?.price}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Features</span>
                      <span className="font-medium">${specialFeatures.find((f) => f.id === settings.features)?.price || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Languages</span>
                      <span className="font-medium">${languageOptions.find((l) => l.id === settings.languages)?.price || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Support</span>
                      <span className="font-medium">${supportPlans.find((s) => s.id === settings.support)?.price || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Delivery</span>
                      <span className="font-medium">${deliveryTimes.find((d) => d.id === settings.delivery)?.price || 0}</span>
                    </div>
                  </div>

                  {/* Coral gradient divider */}
                  <div className="h-px bg-gradient-to-r from-coral to-peach mb-6" />

                  {/* Total - prominent */}
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Total Investment</p>
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={calculateTotal()}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="text-4xl font-bold text-coral"
                      >
                        ${calculateTotal()}
                      </motion.p>
                    </AnimatePresence>
                    <p className="text-sm text-muted-foreground mt-1">one-time</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Main Content Area */}
              <motion.div variants={premiumItem}>
                {currentStep < 3 && (
                  <div className="bg-white rounded-3xl border border-border/50 p-10">
                    {/* Step indicators - numbered badges */}
                    <div className="flex items-center justify-center gap-4 mb-12">
                      {Array.from({ length: totalSteps }).map((_, index) => (
                        <div key={index} className="flex items-center">
                          <motion.button
                            onClick={() => index + 1 <= currentStep && setCurrentStep(index + 1)}
                            animate={currentStep === index + 1 ? "active" : currentStep > index + 1 ? "completed" : "upcoming"}
                            variants={{
                              active: {
                                scale: 1,
                                boxShadow: "0 0 30px rgba(226, 121, 94, 0.3)"
                              },
                              completed: { scale: 1, boxShadow: "none" },
                              upcoming: { scale: 1, boxShadow: "none" }
                            }}
                            className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all",
                              currentStep === index + 1
                                ? "bg-white border-2 border-coral text-coral"
                                : currentStep > index + 1
                                ? "bg-coral/10 border border-coral/20 text-coral"
                                : "bg-muted border border-border text-muted-foreground"
                            )}
                            data-cursor="button"
                          >
                            {index + 1}
                          </motion.button>
                          {index < totalSteps - 1 && (
                            <div className="w-12 h-px bg-border mx-2" />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Step content with slower transitions */}
                    <AnimatePresence mode="wait">
                      {/* Step 1: Define Your Vision */}
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                        >
                          <h3 className="text-2xl font-heading text-navy text-center mb-10">
                            Define Your Vision
                          </h3>

                          <div className="space-y-6">
                            {/* Design Complexity */}
                            <div className="bg-muted/30 rounded-2xl p-6">
                              <div className="flex items-center gap-2 mb-4">
                                <Palette className="w-5 h-5 text-coral" />
                                <span className="text-lg font-semibold text-navy">Design Quality</span>
                              </div>
                              <div className="grid md:grid-cols-3 gap-4">
                                {designComplexity.map((option) => (
                                  <motion.button
                                    key={option.id}
                                    onClick={() => setSettings({ ...settings, design: option.id })}
                                    whileHover={{
                                      boxShadow: "0 0 40px rgba(226, 121, 94, 0.15)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={cn(
                                      "py-4 px-6 rounded-xl text-sm font-medium transition-all",
                                      settings.design === option.id
                                        ? "bg-coral/5 border border-coral text-coral"
                                        : "bg-white border border-border text-navy"
                                    )}
                                    data-cursor="card"
                                  >
                                    <div className="font-semibold mb-1">{option.label}</div>
                                    <div className="text-xs opacity-70">+${option.price}</div>
                                  </motion.button>
                                ))}
                              </div>
                            </div>

                            {/* Pages */}
                            <div className="bg-muted/30 rounded-2xl p-6">
                              <div className="flex items-center gap-2 mb-4">
                                <FileText className="w-5 h-5 text-coral" />
                                <span className="text-lg font-semibold text-navy">Number of Pages</span>
                              </div>
                              <div className="grid md:grid-cols-4 gap-4">
                                {pageOptions.map((option) => (
                                  <motion.button
                                    key={option.id}
                                    onClick={() => setSettings({ ...settings, pages: option.id })}
                                    whileHover={{
                                      boxShadow: "0 0 40px rgba(226, 121, 94, 0.15)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={cn(
                                      "py-4 px-6 rounded-xl text-sm font-medium transition-all",
                                      settings.pages === option.id
                                        ? "bg-coral/5 border border-coral text-coral"
                                        : "bg-white border border-border text-navy"
                                    )}
                                    data-cursor="card"
                                  >
                                    <div className="font-semibold mb-1">{option.label}</div>
                                    <div className="text-xs opacity-70">+${option.price}</div>
                                  </motion.button>
                                ))}
                              </div>
                            </div>

                            {/* CMS */}
                            <div className="bg-muted/30 rounded-2xl p-6">
                              <div className="flex items-center gap-2 mb-4">
                                <Settings className="w-5 h-5 text-coral" />
                                <span className="text-lg font-semibold text-navy">Content Management</span>
                              </div>
                              <div className="grid md:grid-cols-3 gap-4">
                                {cmsOptions.map((option) => (
                                  <motion.button
                                    key={option.id}
                                    onClick={() => setSettings({ ...settings, cms: option.id })}
                                    whileHover={{
                                      boxShadow: "0 0 40px rgba(226, 121, 94, 0.15)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={cn(
                                      "py-4 px-6 rounded-xl text-sm font-medium transition-all",
                                      settings.cms === option.id
                                        ? "bg-coral/5 border border-coral text-coral"
                                        : "bg-white border border-border text-navy"
                                    )}
                                    data-cursor="card"
                                  >
                                    <div className="font-semibold mb-1">{option.label}</div>
                                    <div className="text-xs opacity-70">
                                      {option.price >= 0 ? `+$${option.price}` : `$${option.price}`}
                                    </div>
                                  </motion.button>
                                ))}
                              </div>
                            </div>

                            {/* Special Features */}
                            <div className="bg-muted/30 rounded-2xl p-6">
                              <div className="flex items-center gap-2 mb-4">
                                <Sparkles className="w-5 h-5 text-coral" />
                                <span className="text-lg font-semibold text-navy">Custom Features</span>
                              </div>
                              <div className="grid md:grid-cols-4 gap-4">
                                {specialFeatures.map((option) => (
                                  <motion.button
                                    key={option.id}
                                    onClick={() => setSettings({ ...settings, features: option.id })}
                                    whileHover={{
                                      boxShadow: "0 0 40px rgba(226, 121, 94, 0.15)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={cn(
                                      "py-4 px-6 rounded-xl text-sm font-medium transition-all",
                                      settings.features === option.id
                                        ? "bg-coral/5 border border-coral text-coral"
                                        : "bg-white border border-border text-navy"
                                    )}
                                    data-cursor="card"
                                  >
                                    <div className="font-semibold mb-1">{option.label}</div>
                                    <div className="text-xs opacity-70">+${option.price}</div>
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2: Add Expertise */}
                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
                        >
                          <h3 className="text-2xl font-heading text-navy text-center mb-10">
                            Add Expertise
                          </h3>

                          <div className="space-y-6">
                            {/* Additional Services */}
                            <div className="bg-muted/30 rounded-2xl p-6">
                              <div className="flex items-center gap-2 mb-4">
                                <Gauge className="w-5 h-5 text-coral" />
                                <span className="text-lg font-semibold text-navy">Additional Services</span>
                              </div>
                              <div className="grid md:grid-cols-3 gap-4">
                                {additionalServices.map((service) => (
                                  <motion.button
                                    key={service.id}
                                    onClick={() => toggleAdditional(service.id)}
                                    whileHover={{
                                      boxShadow: "0 0 40px rgba(226, 121, 94, 0.15)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={cn(
                                      "flex flex-col items-center gap-2 p-6 rounded-xl text-sm font-medium transition-all",
                                      settings.additional.includes(service.id)
                                        ? "bg-coral/5 border border-coral text-coral"
                                        : "bg-white border border-border text-navy"
                                    )}
                                    data-cursor="card"
                                  >
                                    <service.icon className="w-6 h-6" />
                                    <div className="font-semibold text-center">{service.label}</div>
                                    <div className="text-xs opacity-70">+${service.price}</div>
                                  </motion.button>
                                ))}
                              </div>
                            </div>

                            {/* Languages */}
                            <div className="bg-muted/30 rounded-2xl p-6">
                              <div className="flex items-center gap-2 mb-4">
                                <Languages className="w-5 h-5 text-coral" />
                                <span className="text-lg font-semibold text-navy">Languages</span>
                              </div>
                              <div className="grid md:grid-cols-4 gap-4">
                                {languageOptions.map((option) => (
                                  <motion.button
                                    key={option.id}
                                    onClick={() => setSettings({ ...settings, languages: option.id })}
                                    whileHover={{
                                      boxShadow: "0 0 40px rgba(226, 121, 94, 0.15)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={cn(
                                      "py-4 px-6 rounded-xl text-sm font-medium transition-all",
                                      settings.languages === option.id
                                        ? "bg-coral/5 border border-coral text-coral"
                                        : "bg-white border border-border text-navy"
                                    )}
                                    data-cursor="card"
                                  >
                                    <div className="font-semibold mb-1">{option.label}</div>
                                    <div className="text-xs opacity-70">+${option.price}</div>
                                  </motion.button>
                                ))}
                              </div>
                            </div>

                            {/* Support */}
                            <div className="bg-muted/30 rounded-2xl p-6">
                              <div className="flex items-center gap-2 mb-4">
                                <Headphones className="w-5 h-5 text-coral" />
                                <span className="text-lg font-semibold text-navy">Support Plan</span>
                              </div>
                              <div className="grid md:grid-cols-3 gap-4">
                                {supportPlans.map((option) => (
                                  <motion.button
                                    key={option.id}
                                    onClick={() => setSettings({ ...settings, support: option.id })}
                                    whileHover={{
                                      boxShadow: "0 0 40px rgba(226, 121, 94, 0.15)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={cn(
                                      "py-4 px-6 rounded-xl text-sm font-medium transition-all",
                                      settings.support === option.id
                                        ? "bg-coral/5 border border-coral text-coral"
                                        : "bg-white border border-border text-navy"
                                    )}
                                    data-cursor="card"
                                  >
                                    <div className="font-semibold mb-1">{option.label}</div>
                                    <div className="text-xs opacity-70">+${option.price}</div>
                                  </motion.button>
                                ))}
                              </div>
                            </div>

                            {/* Delivery */}
                            <div className="bg-muted/30 rounded-2xl p-6">
                              <div className="flex items-center gap-2 mb-4">
                                <Clock className="w-5 h-5 text-coral" />
                                <span className="text-lg font-semibold text-navy">Delivery Timeline</span>
                              </div>
                              <div className="grid md:grid-cols-3 gap-4">
                                {deliveryTimes.map((option) => (
                                  <motion.button
                                    key={option.id}
                                    onClick={() => setSettings({ ...settings, delivery: option.id })}
                                    whileHover={{
                                      boxShadow: "0 0 40px rgba(226, 121, 94, 0.15)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={cn(
                                      "py-4 px-6 rounded-xl text-sm font-medium transition-all",
                                      settings.delivery === option.id
                                        ? "bg-coral/5 border border-coral text-coral"
                                        : "bg-white border border-border text-navy"
                                    )}
                                    data-cursor="card"
                                  >
                                    <div className="font-semibold mb-1">{option.label}</div>
                                    <div className="text-xs opacity-70">
                                      {option.price >= 0 ? `+$${option.price}` : `$${option.price}`}
                                    </div>
                                  </motion.button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation buttons */}
                    <div className="flex justify-center gap-4 mt-12">
                      {currentStep > 1 && (
                        <Button
                          variant="outline"
                          onClick={() => setCurrentStep(currentStep - 1)}
                          leftIcon={<ArrowLeft size={18} />}
                          data-cursor="button"
                        >
                          Back
                        </Button>
                      )}
                      {currentStep < totalSteps && (
                        <Button
                          variant="accent"
                          onClick={() => setCurrentStep(currentStep + 1)}
                          rightIcon={<ArrowRight size={18} />}
                          className="min-w-[200px]"
                          data-cursor="button"
                        >
                          Continue
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {/* Confirmation - Dark navy section */}
        {currentStep === 3 && (
          <section className="bg-navy py-24 md:py-32">
            <Container>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
                className="text-center max-w-2xl mx-auto"
              >
                {/* Elegant check icon */}
                <motion.div
                  className="w-24 h-24 rounded-full border-2 border-coral/30 flex items-center justify-center mx-auto mb-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
                >
                  <Check className="w-12 h-12 text-coral" strokeWidth={2} />
                </motion.div>

                <h3 className="text-3xl font-heading text-white mb-6">
                  Your Vision, Priced
                </h3>

                <div className="mb-10">
                  <p className="text-white/60 mb-3">Total investment:</p>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={calculateTotal()}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="text-5xl font-bold text-coral"
                    >
                      ${calculateTotal()}
                    </motion.p>
                  </AnimatePresence>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{
                        boxShadow: "0 0 40px rgba(226, 121, 94, 0.3)"
                      }}
                      className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:bg-coral hover:border-coral transition-all duration-300"
                      data-cursor="button"
                    >
                      Begin Your Project
                    </motion.button>
                  </Link>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-8 py-4 text-white/50 hover:text-white transition-colors"
                    data-cursor="button"
                  >
                    Refine Your Choices
                  </button>
                </div>
              </motion.div>
            </Container>
          </section>
        )}
      </main>
      <Footer />
    </MotionConfig>
  );
}

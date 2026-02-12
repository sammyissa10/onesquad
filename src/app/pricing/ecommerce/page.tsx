"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence, MotionConfig } from "framer-motion";
import Link from "next/link";
import {
  ShoppingCart,
  Check,
  ArrowRight,
  ArrowLeft,
  Palette,
  Gauge,
  Settings,
  Sparkles,
  Languages,
  Headphones,
  Clock,
  CreditCard,
  Package,
  Truck,
  Rocket,
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

// Spring animation variants for revenue/growth personality
const growthFadeIn = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 15 }
  }
};

const growthStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const growthItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 200, damping: 20 }
  }
};

// E-commerce specific options
const designComplexity = [
  { id: "professional", label: "Professional", price: 800 },
  { id: "good", label: "Good", price: 400 },
  { id: "basic", label: "Basic", price: 0 },
];

const productOptions = [
  { id: "unlimited", label: "Unlimited", price: 600 },
  { id: "500", label: "Up to 500", price: 400 },
  { id: "100", label: "Up to 100", price: 200 },
  { id: "50", label: "Up to 50", price: 0 },
];

const paymentGateways = [
  { id: "multiple", label: "Multiple Gateways", price: 300 },
  { id: "stripe", label: "Stripe Only", price: 150 },
  { id: "paypal", label: "PayPal Only", price: 100 },
  { id: "basic", label: "Basic Checkout", price: 0 },
];

const shippingOptions = [
  { id: "advanced", label: "Advanced (Multi-carrier)", price: 400 },
  { id: "standard", label: "Standard", price: 200 },
  { id: "basic", label: "Basic Flat Rate", price: 0 },
];

const additionalFeatures = [
  { id: "inventory", label: "Inventory Management", price: 300, icon: Package },
  { id: "analytics", label: "Sales Analytics", price: 200, icon: Gauge },
  { id: "seo", label: "Search Optimization", price: 400, icon: Settings },
  { id: "reviews", label: "Customer Reviews", price: 150, icon: Sparkles },
];

const languageOptions = [
  { id: "4", label: "4", price: 600 },
  { id: "3", label: "3", price: 400 },
  { id: "2", label: "2", price: 200 },
  { id: "1", label: "1", price: 0 },
];

const supportPlans = [
  { id: "year", label: "Full Year", price: 800 },
  { id: "6months", label: "6 Months", price: 400 },
  { id: "free", label: "Free Month", price: 0 },
];

const deliveryTimes = [
  { id: "3months", label: "3 Months", price: -400 },
  { id: "2months", label: "2 Months", price: 0 },
  { id: "1month", label: "1 Month", price: 500 },
];

const BASE_PRICE = 1500;

export default function EcommercePricingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [summaryExpanded, setSummaryExpanded] = useState(false);
  const [settings, setSettings] = useState({
    design: "basic",
    products: "50",
    payment: "basic",
    shipping: "basic",
    features: [] as string[],
    languages: "1",
    support: "free",
    delivery: "2months",
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const toggleFeature = (id: string) => {
    setSettings((prev) => ({
      ...prev,
      features: prev.features.includes(id)
        ? prev.features.filter((f) => f !== id)
        : [...prev.features, id],
    }));
  };

  const calculateTotal = () => {
    let total = BASE_PRICE;
    total += designComplexity.find((d) => d.id === settings.design)?.price || 0;
    total += productOptions.find((p) => p.id === settings.products)?.price || 0;
    total += paymentGateways.find((p) => p.id === settings.payment)?.price || 0;
    total += shippingOptions.find((s) => s.id === settings.shipping)?.price || 0;
    settings.features.forEach((id) => {
      total += additionalFeatures.find((f) => f.id === id)?.price || 0;
    });
    total += languageOptions.find((l) => l.id === settings.languages)?.price || 0;
    total += supportPlans.find((s) => s.id === settings.support)?.price || 0;
    total += deliveryTimes.find((d) => d.id === settings.delivery)?.price || 0;
    return total;
  };

  const totalSteps = 3;
  const progressPercent = (currentStep / totalSteps) * 100;

  // Get selected features for display
  const getSelectedFeatures = () => {
    const features = [];

    const design = designComplexity.find((d) => d.id === settings.design);
    if (design && design.id !== "basic") features.push(design.label + " Design");

    const products = productOptions.find((p) => p.id === settings.products);
    if (products) features.push(products.label + " Products");

    const payment = paymentGateways.find((p) => p.id === settings.payment);
    if (payment && payment.id !== "basic") features.push(payment.label);

    const shipping = shippingOptions.find((s) => s.id === settings.shipping);
    if (shipping && shipping.id !== "basic") features.push(shipping.label + " Shipping");

    settings.features.forEach((id) => {
      const feature = additionalFeatures.find((f) => f.id === id);
      if (feature) features.push(feature.label);
    });

    const languages = languageOptions.find((l) => l.id === settings.languages);
    if (languages && languages.id !== "1") features.push(languages.label + " Languages");

    const support = supportPlans.find((s) => s.id === settings.support);
    if (support && support.id !== "free") features.push(support.label + " Support");

    return features;
  };

  return (
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
          <Breadcrumb items={[{ label: "Pricing", href: "/pricing" }, { label: "E-Commerce Plans" }]} />
        {/* Hero - Gradient with navy/blue tones */}
        <section className="relative bg-navy py-28 md:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-blue/80" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
          <Container className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-coral to-peach flex items-center justify-center mx-auto mb-8 shadow-xl">
                <ShoppingCart className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-white mb-6">
                Built to <span className="text-coral">Sell</span>. Scaled to Grow.
              </h1>
              <p className="text-xl text-white/70 mb-8">
                Configure your online store. Every feature you add drives revenue.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white/60">
                  Avg 3x ROI
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white/60">
                  500+ stores launched
                </div>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Calculator - Split-screen layout */}
        <section className="bg-white">
          <div className="min-h-[calc(100vh-200px)]">
            {/* Mobile sticky summary bar */}
            <div className="lg:hidden sticky top-16 z-30 bg-navy">
              <div className="p-4">
                <button
                  onClick={() => setSummaryExpanded(!summaryExpanded)}
                  className="w-full flex items-center justify-between"
                  data-cursor="button"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="w-5 h-5 text-white" />
                    <span className="text-xl font-bold text-coral">${calculateTotal()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/50">Step {currentStep} of {totalSteps}</span>
                    {summaryExpanded ? (
                      <ChevronUp className="w-5 h-5 text-white/50" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white/50" />
                    )}
                  </div>
                </button>

                {summaryExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="mt-4 space-y-2"
                  >
                    {getSelectedFeatures().map((feature, index) => (
                      <motion.div
                        key={feature}
                        layout
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="bg-white/10 rounded-lg px-3 py-2 text-sm text-white/80"
                      >
                        {feature}
                      </motion.div>
                    ))}
                    <p className="text-xs text-white/40 pt-2">Starting at $1,500</p>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Desktop split-screen */}
            <div
              ref={ref}
              className="grid lg:grid-cols-2 gap-0"
            >
              {/* LEFT: Live preview/dashboard panel */}
              <div className="hidden lg:block bg-navy lg:rounded-none">
                <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)] p-8 lg:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <ShoppingCart className="w-6 h-6 text-coral" />
                      <h2 className="text-2xl font-heading text-white">Your Store</h2>
                    </div>

                    {/* Investment display */}
                    <div className="mb-8">
                      <p className="text-sm text-white/50 mb-2">Total Investment</p>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={calculateTotal()}
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: -10 }}
                          transition={{ type: "spring", stiffness: 200, damping: 20 }}
                          className="text-5xl font-bold text-coral"
                        >
                          ${calculateTotal()}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Feature breakdown */}
                    <div className="space-y-2">
                      <motion.div layout className="space-y-2">
                        <AnimatePresence>
                          {getSelectedFeatures().map((feature) => (
                            <motion.div
                              key={feature}
                              layout
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -10 }}
                              transition={{ type: "spring", stiffness: 200, damping: 20 }}
                              className="bg-white/10 rounded-lg px-3 py-2 text-sm text-white/80"
                            >
                              {feature}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                  </div>

                  {/* Progress indicator at bottom */}
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-white/50">Step {currentStep} of {totalSteps}</span>
                      <span className="text-sm text-white/50">{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-coral to-peach"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                      />
                    </div>
                    <p className="text-xs text-white/40 mt-4">Starting at $1,500</p>
                  </div>
                </div>
              </div>

              {/* RIGHT: Configuration panel */}
              <div className="bg-muted/30 p-8 lg:p-10 overflow-y-auto">
                <motion.div
                  variants={growthStagger}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  {/* Progress bar */}
                  <motion.div variants={growthItem} className="mb-8">
                    <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
                      <motion.div
                        className="h-full bg-gradient-to-r from-coral to-peach"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className={cn(
                        "font-semibold transition-colors",
                        currentStep >= 1 ? "text-coral" : "text-muted-foreground"
                      )}>
                        Build Your Foundation
                      </span>
                      <span className={cn(
                        "font-semibold transition-colors",
                        currentStep >= 2 ? "text-coral" : currentStep === 2 ? "text-navy" : "text-muted-foreground"
                      )}>
                        Add Growth Tools
                      </span>
                      <span className={cn(
                        "font-semibold transition-colors",
                        currentStep >= 3 ? "text-coral" : "text-muted-foreground"
                      )}>
                        Launch
                      </span>
                    </div>
                  </motion.div>

                  {/* Step content */}
                  <AnimatePresence mode="wait">
                    {/* Step 1: Build Your Foundation */}
                    {currentStep === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      >
                        <h3 className="text-3xl font-bold text-navy mb-8">
                          Build Your Foundation
                        </h3>

                        <div className="space-y-6">
                          {/* Design Complexity */}
                          <div className="bg-white rounded-2xl border border-border p-6" data-cursor="card">
                            <div className="flex items-center gap-2 mb-4">
                              <Palette className="w-5 h-5 text-navy" />
                              <span className="text-lg font-semibold text-navy">Design Complexity</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {designComplexity.map((option) => (
                                <motion.button
                                  key={option.id}
                                  onClick={() => setSettings({ ...settings, design: option.id })}
                                  whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(5, 23, 51, 0.1)" }}
                                  className={cn(
                                    "p-4 rounded-xl text-sm font-medium transition-all",
                                    settings.design === option.id
                                      ? "bg-navy text-white"
                                      : "bg-muted/50 border border-border text-navy"
                                  )}
                                  data-cursor="button"
                                >
                                  <div className="font-semibold mb-1">{option.label}</div>
                                  <div className="text-xs opacity-70">
                                    {option.price > 0 ? `+$${option.price}` : "Included"}
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>

                          {/* Products */}
                          <div className="bg-white rounded-2xl border border-border p-6" data-cursor="card">
                            <div className="flex items-center gap-2 mb-4">
                              <Package className="w-5 h-5 text-navy" />
                              <span className="text-lg font-semibold text-navy">Number of Products</span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                              {productOptions.map((option) => (
                                <motion.button
                                  key={option.id}
                                  onClick={() => setSettings({ ...settings, products: option.id })}
                                  whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(5, 23, 51, 0.1)" }}
                                  className={cn(
                                    "p-4 rounded-xl text-sm font-medium transition-all",
                                    settings.products === option.id
                                      ? "bg-navy text-white"
                                      : "bg-muted/50 border border-border text-navy"
                                  )}
                                  data-cursor="button"
                                >
                                  <div className="font-semibold mb-1">{option.label}</div>
                                  <div className="text-xs opacity-70">
                                    {option.price > 0 ? `+$${option.price}` : "Included"}
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>

                          {/* Payment */}
                          <div className="bg-white rounded-2xl border border-border p-6" data-cursor="card">
                            <div className="flex items-center gap-2 mb-4">
                              <CreditCard className="w-5 h-5 text-navy" />
                              <span className="text-lg font-semibold text-navy">Payment Method</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {paymentGateways.map((option) => (
                                <motion.button
                                  key={option.id}
                                  onClick={() => setSettings({ ...settings, payment: option.id })}
                                  whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(5, 23, 51, 0.1)" }}
                                  className={cn(
                                    "p-4 rounded-xl text-sm font-medium transition-all",
                                    settings.payment === option.id
                                      ? "bg-navy text-white"
                                      : "bg-muted/50 border border-border text-navy"
                                  )}
                                  data-cursor="button"
                                >
                                  <div className="font-semibold mb-1">{option.label}</div>
                                  <div className="text-xs opacity-70">
                                    {option.price > 0 ? `+$${option.price}` : "Included"}
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>

                          {/* Shipping */}
                          <div className="bg-white rounded-2xl border border-border p-6" data-cursor="card">
                            <div className="flex items-center gap-2 mb-4">
                              <Truck className="w-5 h-5 text-navy" />
                              <span className="text-lg font-semibold text-navy">Shipping Options</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {shippingOptions.map((option) => (
                                <motion.button
                                  key={option.id}
                                  onClick={() => setSettings({ ...settings, shipping: option.id })}
                                  whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(5, 23, 51, 0.1)" }}
                                  className={cn(
                                    "p-4 rounded-xl text-sm font-medium transition-all",
                                    settings.shipping === option.id
                                      ? "bg-navy text-white"
                                      : "bg-muted/50 border border-border text-navy"
                                  )}
                                  data-cursor="button"
                                >
                                  <div className="font-semibold mb-1">{option.label}</div>
                                  <div className="text-xs opacity-70">
                                    {option.price > 0 ? `+$${option.price}` : "Included"}
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Add Growth Tools */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      >
                        <h3 className="text-3xl font-bold text-navy mb-8">
                          Add Growth Tools
                        </h3>

                        <div className="space-y-6">
                          {/* Additional Features */}
                          <div className="bg-white rounded-2xl border border-border p-6" data-cursor="card">
                            <div className="flex items-center gap-2 mb-4">
                              <Sparkles className="w-5 h-5 text-navy" />
                              <span className="text-lg font-semibold text-navy">Additional Features</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {additionalFeatures.map((feature) => {
                                const Icon = feature.icon;
                                return (
                                  <motion.button
                                    key={feature.id}
                                    onClick={() => toggleFeature(feature.id)}
                                    whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(5, 23, 51, 0.1)" }}
                                    className={cn(
                                      "flex items-center gap-3 p-4 rounded-xl text-sm font-medium transition-all text-left",
                                      settings.features.includes(feature.id)
                                        ? "bg-navy text-white"
                                        : "bg-muted/50 border border-border text-navy"
                                    )}
                                    data-cursor="button"
                                  >
                                    <Icon className="w-5 h-5 flex-shrink-0" />
                                    <span className="flex-1">{feature.label}</span>
                                    <span className="text-xs opacity-70">+${feature.price}</span>
                                  </motion.button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Languages */}
                          <div className="bg-white rounded-2xl border border-border p-6" data-cursor="card">
                            <div className="flex items-center gap-2 mb-4">
                              <Languages className="w-5 h-5 text-navy" />
                              <span className="text-lg font-semibold text-navy">Languages</span>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {languageOptions.map((option) => (
                                <motion.button
                                  key={option.id}
                                  onClick={() => setSettings({ ...settings, languages: option.id })}
                                  whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(5, 23, 51, 0.1)" }}
                                  className={cn(
                                    "p-4 rounded-xl text-sm font-medium transition-all",
                                    settings.languages === option.id
                                      ? "bg-navy text-white"
                                      : "bg-muted/50 border border-border text-navy"
                                  )}
                                  data-cursor="button"
                                >
                                  <div className="font-semibold mb-1">{option.label}</div>
                                  <div className="text-xs opacity-70">
                                    {option.price > 0 ? `+$${option.price}` : "Base"}
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>

                          {/* Support */}
                          <div className="bg-white rounded-2xl border border-border p-6" data-cursor="card">
                            <div className="flex items-center gap-2 mb-4">
                              <Headphones className="w-5 h-5 text-navy" />
                              <span className="text-lg font-semibold text-navy">Support Plan</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {supportPlans.map((option) => (
                                <motion.button
                                  key={option.id}
                                  onClick={() => setSettings({ ...settings, support: option.id })}
                                  whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(5, 23, 51, 0.1)" }}
                                  className={cn(
                                    "p-4 rounded-xl text-sm font-medium transition-all",
                                    settings.support === option.id
                                      ? "bg-navy text-white"
                                      : "bg-muted/50 border border-border text-navy"
                                  )}
                                  data-cursor="button"
                                >
                                  <div className="font-semibold mb-1">{option.label}</div>
                                  <div className="text-xs opacity-70">
                                    {option.price > 0 ? `+$${option.price}` : "Included"}
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>

                          {/* Delivery */}
                          <div className="bg-white rounded-2xl border border-border p-6" data-cursor="card">
                            <div className="flex items-center gap-2 mb-4">
                              <Clock className="w-5 h-5 text-navy" />
                              <span className="text-lg font-semibold text-navy">Delivery Time</span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {deliveryTimes.map((option) => (
                                <motion.button
                                  key={option.id}
                                  onClick={() => setSettings({ ...settings, delivery: option.id })}
                                  whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(5, 23, 51, 0.1)" }}
                                  className={cn(
                                    "p-4 rounded-xl text-sm font-medium transition-all",
                                    settings.delivery === option.id
                                      ? "bg-navy text-white"
                                      : "bg-muted/50 border border-border text-navy"
                                  )}
                                  data-cursor="button"
                                >
                                  <div className="font-semibold mb-1">{option.label}</div>
                                  <div className="text-xs opacity-70">
                                    {option.price > 0 ? `+$${option.price}` : option.price < 0 ? `$${option.price}` : "Standard"}
                                  </div>
                                </motion.button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Launch */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="text-center max-w-xl mx-auto py-12"
                      >
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-coral to-peach flex items-center justify-center mx-auto mb-8 shadow-xl">
                          <Rocket className="w-10 h-10 text-white" />
                        </div>

                        <h3 className="text-3xl font-bold text-navy mb-6">
                          Ready to Launch
                        </h3>

                        {/* Key stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          <div className="bg-white rounded-xl border border-border p-4">
                            <div className="text-2xl font-bold text-navy mb-1">
                              {1 + settings.features.length}
                            </div>
                            <div className="text-xs text-muted-foreground">Features</div>
                          </div>
                          <div className="bg-white rounded-xl border border-border p-4">
                            <div className="text-2xl font-bold text-navy mb-1">
                              {settings.languages}
                            </div>
                            <div className="text-xs text-muted-foreground">Languages</div>
                          </div>
                          <div className="bg-white rounded-xl border border-border p-4">
                            <div className="text-2xl font-bold text-navy mb-1">
                              {supportPlans.find(s => s.id === settings.support)?.label.split(" ")[0]}
                            </div>
                            <div className="text-xs text-muted-foreground">Support</div>
                          </div>
                        </div>

                        {/* Total */}
                        <div className="bg-navy rounded-2xl p-8 mb-8">
                          <p className="text-sm text-white/50 mb-2">Total Investment</p>
                          <p className="text-5xl font-bold text-coral mb-4">${calculateTotal()}</p>
                          <p className="text-sm text-white/70">
                            Everything you need to start selling online and scale your business.
                          </p>
                        </div>

                        {/* CTAs */}
                        <Link href="/contact">
                          <motion.button
                            whileHover={{ y: -4, boxShadow: "0 20px 40px rgba(226, 121, 94, 0.3)" }}
                            className="bg-gradient-to-r from-coral to-peach text-white rounded-xl px-8 py-4 text-lg font-semibold mb-4 w-full flex items-center justify-center gap-2"
                            data-cursor="button"
                          >
                            Launch Your Store
                            <ArrowRight className="w-5 h-5" />
                          </motion.button>
                        </Link>

                        <button
                          onClick={() => setCurrentStep(1)}
                          className="text-muted-foreground hover:text-navy transition-colors text-sm"
                          data-cursor="button"
                        >
                          Adjust Configuration
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Navigation */}
                  {currentStep < 3 && (
                    <motion.div
                      variants={growthItem}
                      className="flex justify-center gap-4 mt-12"
                    >
                      {currentStep > 1 && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          onClick={() => setCurrentStep(currentStep - 1)}
                          className="px-6 py-3 rounded-xl border-2 border-navy text-navy font-medium flex items-center gap-2 transition-colors hover:bg-navy hover:text-white"
                          data-cursor="button"
                        >
                          <ArrowLeft size={18} />
                          Back
                        </motion.button>
                      )}
                      {currentStep < totalSteps && (
                        <motion.button
                          whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(5, 23, 51, 0.2)" }}
                          onClick={() => setCurrentStep(currentStep + 1)}
                          className="px-8 py-3 rounded-xl bg-navy text-white font-medium flex items-center gap-2 min-w-[200px] justify-center"
                          data-cursor="button"
                        >
                          Next
                          <ArrowRight size={18} />
                        </motion.button>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </MotionConfig>
  );
}

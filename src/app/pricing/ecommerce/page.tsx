"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ShoppingCart,
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
  Layers,
  CreditCard,
  Package,
  Truck,
} from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
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
  { id: "seo", label: "SEO Optimization", price: 400, icon: Settings },
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

  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: "Pricing", href: "/pricing" }, { label: "E-Commerce Plans" }]} />
      <main>
        {/* Hero */}
        <Section background="gradient">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Online Store <span className="text-secondary">Pricing</span>
              </h1>
              <p className="text-xl text-white/80">
                Build a professional e-commerce store with all the features you need
                to sell online. Configure your store below.
              </p>
            </motion.div>
          </Container>
        </Section>

        {/* Calculator */}
        <Section background="muted">
          <Container>
            <motion.div
              ref={ref}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid lg:grid-cols-[300px_1fr] gap-8"
            >
              {/* Summary Sidebar */}
              <motion.div variants={itemVariants} className="lg:sticky lg:top-24 h-fit">
                <div className="bg-white rounded-2xl shadow-xl border border-border p-6">
                  <h3 className="text-xl font-bold text-accent mb-6 flex items-center gap-2">
                    <Layers className="w-5 h-5" />
                    Summary
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-accent/5 rounded-xl">
                      <span className="font-semibold text-accent">Online Store</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-accent">${BASE_PRICE}</span>
                        <ShoppingCart className="w-5 h-5 text-accent" />
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>${designComplexity.find((d) => d.id === settings.design)?.price || 0} — {settings.design} design</span>
                      </div>
                      <div className="flex justify-between">
                        <span>${productOptions.find((p) => p.id === settings.products)?.price || 0} — {productOptions.find((p) => p.id === settings.products)?.label} products</span>
                      </div>
                      <div className="flex justify-between">
                        <span>${paymentGateways.find((p) => p.id === settings.payment)?.price || 0} — {paymentGateways.find((p) => p.id === settings.payment)?.label}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>${shippingOptions.find((s) => s.id === settings.shipping)?.price || 0} — {shippingOptions.find((s) => s.id === settings.shipping)?.label} shipping</span>
                      </div>
                      {settings.features.map((id) => (
                        <div key={id} className="flex justify-between">
                          <span>${additionalFeatures.find((f) => f.id === id)?.price} — {additionalFeatures.find((f) => f.id === id)?.label}</span>
                        </div>
                      ))}
                      <div className="flex justify-between">
                        <span>${languageOptions.find((l) => l.id === settings.languages)?.price || 0} — {settings.languages} language(s)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>${supportPlans.find((s) => s.id === settings.support)?.price || 0} — {supportPlans.find((s) => s.id === settings.support)?.label} support</span>
                      </div>
                      <div className="flex justify-between">
                        <span>${deliveryTimes.find((d) => d.id === settings.delivery)?.price || 0} — {deliveryTimes.find((d) => d.id === settings.delivery)?.label} delivery</span>
                      </div>
                    </div>

                    <div className="h-1 bg-gradient-to-r from-accent to-secondary rounded-full" />

                    <div className="bg-muted rounded-xl p-4 text-center">
                      <p className="text-3xl font-bold text-accent">${calculateTotal()}</p>
                      <p className="text-sm text-muted-foreground">Total Price</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Main Content */}
              <motion.div
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-xl border border-border p-8"
              >
                {/* Step indicators */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  {Array.from({ length: totalSteps }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => index + 1 <= currentStep && setCurrentStep(index + 1)}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all",
                        currentStep === index + 1
                          ? "bg-accent text-white"
                          : index + 1 < currentStep
                          ? "bg-accent/20 text-accent"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                {/* Step 1: Store Basics */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-primary text-center mb-8">
                      Store Configuration
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Design Complexity */}
                      <div className="bg-muted/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Palette className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Design Complexity</span>
                        </div>
                        <div className="flex gap-2">
                          {designComplexity.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => setSettings({ ...settings, design: option.id })}
                              className={cn(
                                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                                settings.design === option.id
                                  ? "bg-accent text-white"
                                  : "bg-white text-muted-foreground hover:bg-accent/10"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Products */}
                      <div className="bg-muted/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Package className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Number of Products</span>
                        </div>
                        <div className="flex gap-2">
                          {productOptions.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => setSettings({ ...settings, products: option.id })}
                              className={cn(
                                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                                settings.products === option.id
                                  ? "bg-accent text-white"
                                  : "bg-white text-muted-foreground hover:bg-accent/10"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Payment */}
                      <div className="bg-muted/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <CreditCard className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Payment Gateway</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {paymentGateways.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => setSettings({ ...settings, payment: option.id })}
                              className={cn(
                                "py-2 px-3 rounded-lg text-sm font-medium transition-all",
                                settings.payment === option.id
                                  ? "bg-accent text-white"
                                  : "bg-white text-muted-foreground hover:bg-accent/10"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Shipping */}
                      <div className="bg-muted/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Truck className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Shipping Integration</span>
                        </div>
                        <div className="flex gap-2">
                          {shippingOptions.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => setSettings({ ...settings, shipping: option.id })}
                              className={cn(
                                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                                settings.shipping === option.id
                                  ? "bg-accent text-white"
                                  : "bg-white text-muted-foreground hover:bg-accent/10"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Features & Support */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-primary text-center mb-8">
                      Features & Support
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Additional Features */}
                      <div className="bg-muted/50 rounded-xl p-4 md:col-span-2">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Additional Features</span>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {additionalFeatures.map((feature) => (
                            <button
                              key={feature.id}
                              onClick={() => toggleFeature(feature.id)}
                              className={cn(
                                "flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all text-left",
                                settings.features.includes(feature.id)
                                  ? "bg-accent text-white"
                                  : "bg-white text-muted-foreground hover:bg-accent/10"
                              )}
                            >
                              <feature.icon className="w-5 h-5" />
                              <span>{feature.label}</span>
                              <span className="ml-auto">+${feature.price}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Languages */}
                      <div className="bg-muted/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Languages className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Languages</span>
                        </div>
                        <div className="flex gap-2">
                          {languageOptions.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => setSettings({ ...settings, languages: option.id })}
                              className={cn(
                                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                                settings.languages === option.id
                                  ? "bg-accent text-white"
                                  : "bg-white text-muted-foreground hover:bg-accent/10"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Support */}
                      <div className="bg-muted/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Headphones className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Support Plan</span>
                        </div>
                        <div className="flex gap-2">
                          {supportPlans.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => setSettings({ ...settings, support: option.id })}
                              className={cn(
                                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                                settings.support === option.id
                                  ? "bg-accent text-white"
                                  : "bg-white text-muted-foreground hover:bg-accent/10"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Delivery */}
                      <div className="bg-muted/50 rounded-xl p-4 md:col-span-2">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Delivery Time</span>
                        </div>
                        <div className="flex gap-2">
                          {deliveryTimes.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => setSettings({ ...settings, delivery: option.id })}
                              className={cn(
                                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                                settings.delivery === option.id
                                  ? "bg-accent text-white"
                                  : "bg-white text-muted-foreground hover:bg-accent/10"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Confirmation */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center max-w-md mx-auto"
                  >
                    <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-accent" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-4">
                      Your Quote is Ready!
                    </h3>
                    <p className="text-muted-foreground mb-8">
                      Your estimated online store cost is{" "}
                      <strong className="text-accent">${calculateTotal()}</strong>.
                      Contact us to finalize your quote and get started.
                    </p>
                    <Link href="/contact">
                      <Button variant="accent" size="lg" rightIcon={<ArrowRight size={18} />}>
                        Get Started
                      </Button>
                    </Link>
                  </motion.div>
                )}

                {/* Navigation */}
                <div className="flex justify-center gap-4 mt-8">
                  {currentStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(currentStep - 1)}
                      leftIcon={<ArrowLeft size={18} />}
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
                    >
                      Next
                    </Button>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

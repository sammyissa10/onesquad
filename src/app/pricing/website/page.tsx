"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
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
  Layers,
  Search,
  BarChart3,
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

// Website specific options
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
  { id: "custom", label: "Custom CMS", price: 300 },
  { id: "wordpress", label: "WordPress", price: 0 },
  { id: "none", label: "No CMS", price: -100 },
];

const additionalServices = [
  { id: "performance", label: "Performance Optimization", price: 200, icon: Gauge },
  { id: "analytics", label: "Google Analytics", price: 100, icon: BarChart3 },
  { id: "seo", label: "SEO Optimization", price: 400, icon: Search },
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
    <>
      <Header />
      <Breadcrumb items={[{ label: "Pricing", href: "/pricing" }, { label: "Website Plans" }]} />
      <main>
        {/* Hero */}
        <Section background="gradient" className="pt-32">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-6">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Website <span className="text-secondary">Pricing</span>
              </h1>
              <p className="text-xl text-white/80">
                Create a stunning website that represents your brand perfectly.
                Configure your project below.
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
                      <span className="font-semibold text-accent">Website</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-accent">${BASE_PRICE}</span>
                        <Globe className="w-5 h-5 text-accent" />
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>${designComplexity.find((d) => d.id === settings.design)?.price || 0} — {settings.design} design</span>
                      </div>
                      <div className="flex justify-between">
                        <span>${pageOptions.find((p) => p.id === settings.pages)?.price || 0} — {settings.pages} pages</span>
                      </div>
                      <div className="flex justify-between">
                        <span>${cmsOptions.find((c) => c.id === settings.cms)?.price || 0} — {cmsOptions.find((c) => c.id === settings.cms)?.label}</span>
                      </div>
                      {settings.additional.map((id) => (
                        <div key={id} className="flex justify-between">
                          <span>${additionalServices.find((a) => a.id === id)?.price} — {additionalServices.find((a) => a.id === id)?.label}</span>
                        </div>
                      ))}
                      <div className="flex justify-between">
                        <span>${specialFeatures.find((f) => f.id === settings.features)?.price || 0} — {settings.features} custom features</span>
                      </div>
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

                {/* Step 1: Website Basics */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-primary text-center mb-8">
                      Website Configuration
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

                      {/* Pages */}
                      <div className="bg-muted/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Number of Pages</span>
                        </div>
                        <div className="flex gap-2">
                          {pageOptions.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => setSettings({ ...settings, pages: option.id })}
                              className={cn(
                                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                                settings.pages === option.id
                                  ? "bg-accent text-white"
                                  : "bg-white text-muted-foreground hover:bg-accent/10"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* CMS */}
                      <div className="bg-muted/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Settings className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Content Management</span>
                        </div>
                        <div className="flex gap-2">
                          {cmsOptions.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => setSettings({ ...settings, cms: option.id })}
                              className={cn(
                                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                                settings.cms === option.id
                                  ? "bg-accent text-white"
                                  : "bg-white text-muted-foreground hover:bg-accent/10"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Special Features */}
                      <div className="bg-muted/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Custom Features</span>
                        </div>
                        <div className="flex gap-2">
                          {specialFeatures.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => setSettings({ ...settings, features: option.id })}
                              className={cn(
                                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                                settings.features === option.id
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

                {/* Step 2: Services & Support */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-primary text-center mb-8">
                      Services & Support
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Additional Services */}
                      <div className="bg-muted/50 rounded-xl p-4 md:col-span-2">
                        <div className="flex items-center gap-2 mb-3">
                          <Gauge className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Additional Services</span>
                        </div>
                        <div className="grid sm:grid-cols-3 gap-3">
                          {additionalServices.map((service) => (
                            <button
                              key={service.id}
                              onClick={() => toggleAdditional(service.id)}
                              className={cn(
                                "flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all",
                                settings.additional.includes(service.id)
                                  ? "bg-accent text-white"
                                  : "bg-white text-muted-foreground hover:bg-accent/10"
                              )}
                            >
                              <service.icon className="w-5 h-5" />
                              <span>{service.label}</span>
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
                      Your estimated website cost is{" "}
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

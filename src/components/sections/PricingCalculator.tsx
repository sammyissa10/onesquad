"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  Layers,
  FileText,
  Gauge,
  Sparkles,
  Languages,
  Headphones,
  Clock,
  Palette,
  Settings,
} from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  services,
  designComplexity,
  pageOptions,
  additionalServices,
  cmsOptions,
  specialFeatures,
  languageOptions,
  supportPlans,
  deliveryTimes,
  defaultSettings,
  exampleQuotes,
  QUOTE_STORAGE_KEY,
  type ServiceId,
  type ServiceSettings,
  type QuoteData,
  type QuoteLineItem,
} from "@/lib/pricingData";

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

export function PricingCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<ServiceId[]>([]);
  const [settingsMap, setSettingsMap] = useState<Record<string, ServiceSettings>>({
    website: { ...defaultSettings },
    ecommerce: { ...defaultSettings },
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const router = useRouter();

  // Services that need configuration steps
  const configurableSelected = selectedServices.filter(
    (s) => s === "website" || s === "ecommerce"
  );

  // Step flow: Step 1 (select) + one config step per configurable service + final summary
  const configSteps = configurableSelected;
  const totalSteps = 1 + configSteps.length + 1;
  const isFinalStep = currentStep === totalSteps;

  const toggleService = (id: ServiceId) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const updateSetting = (serviceId: string, key: keyof ServiceSettings, value: string) => {
    setSettingsMap((prev) => ({
      ...prev,
      [serviceId]: { ...prev[serviceId], [key]: value },
    }));
  };

  const toggleAdditional = (serviceId: string, id: string) => {
    setSettingsMap((prev) => ({
      ...prev,
      [serviceId]: {
        ...prev[serviceId],
        additional: prev[serviceId].additional.includes(id)
          ? prev[serviceId].additional.filter((a: string) => a !== id)
          : [...prev[serviceId].additional, id],
      },
    }));
  };

  // Calculate total price across all selected services
  const calculateTotal = () => {
    let total = 0;
    for (const serviceId of selectedServices) {
      const service = services.find((s) => s.id === serviceId);
      total += service?.basePrice || 0;

      if (serviceId === "website" || serviceId === "ecommerce") {
        const s = settingsMap[serviceId];
        total += designComplexity.find((d) => d.id === s.design)?.price || 0;
        total += pageOptions.find((p) => p.id === s.pages)?.price || 0;
        s.additional.forEach((id: string) => {
          total += additionalServices.find((a) => a.id === id)?.price || 0;
        });
        total += cmsOptions.find((c) => c.id === s.cms)?.price || 0;
        total += specialFeatures.find((f) => f.id === s.features)?.price || 0;
        total += languageOptions.find((l) => l.id === s.languages)?.price || 0;
        total += supportPlans.find((sp) => sp.id === s.support)?.price || 0;
        total += deliveryTimes.find((d) => d.id === s.delivery)?.price || 0;
      }
    }
    return total;
  };

  // Build line items for a configurable service
  const getServiceLineItems = (serviceId: string): { label: string; price: number }[] => {
    if (serviceId !== "website" && serviceId !== "ecommerce") return [];
    const s = settingsMap[serviceId];
    const items: { label: string; price: number }[] = [];

    items.push({ label: `${designComplexity.find((d) => d.id === s.design)?.label} design`, price: designComplexity.find((d) => d.id === s.design)?.price || 0 });
    items.push({ label: `${s.pages} pages`, price: pageOptions.find((p) => p.id === s.pages)?.price || 0 });
    items.push({ label: cmsOptions.find((c) => c.id === s.cms)?.label || "", price: cmsOptions.find((c) => c.id === s.cms)?.price || 0 });

    s.additional.forEach((id: string) => {
      const svc = additionalServices.find((a) => a.id === id);
      if (svc) items.push({ label: svc.label, price: svc.price });
    });

    items.push({ label: `${s.features} special feature(s)`, price: specialFeatures.find((f) => f.id === s.features)?.price || 0 });
    items.push({ label: `${s.languages} language(s)`, price: languageOptions.find((l) => l.id === s.languages)?.price || 0 });
    items.push({ label: `${supportPlans.find((sp) => sp.id === s.support)?.label} support`, price: supportPlans.find((sp) => sp.id === s.support)?.price || 0 });
    items.push({ label: `${deliveryTimes.find((d) => d.id === s.delivery)?.label} delivery`, price: deliveryTimes.find((d) => d.id === s.delivery)?.price || 0 });

    return items;
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGetStarted = () => {
    const quoteData: QuoteData = {
      services: selectedServices.map((serviceId) => {
        const service = services.find((s) => s.id === serviceId)!;
        const lineItems: QuoteLineItem[] = getServiceLineItems(serviceId);
        let subtotal = service.basePrice;
        lineItems.forEach((item) => { subtotal += item.price; });

        return {
          serviceId,
          serviceName: service.name,
          basePrice: service.basePrice,
          lineItems,
          subtotal,
        };
      }),
      total: calculateTotal(),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify(quoteData));
    router.push("/contact");
  };

  // Determine which service the current config step is for
  const currentConfigServiceId = currentStep >= 2 && currentStep < totalSteps
    ? configSteps[currentStep - 2]
    : null;
  const currentConfigSettings = currentConfigServiceId
    ? settingsMap[currentConfigServiceId]
    : null;
  const currentConfigServiceName = currentConfigServiceId
    ? services.find((s) => s.id === currentConfigServiceId)?.name
    : null;

  return (
    <Section id="pricing-calculator" background="white" className="relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <Container>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              There are no hidden costs.
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
              Transparent <span className="text-accent">Pricing</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We offer fair and transparent pricing for all our digital solutions.
              Calculate your customized price below or choose from our packages.
            </p>
          </motion.div>

          {/* Calculator */}
          <motion.div
            variants={itemVariants}
            className="grid lg:grid-cols-[300px_1fr] gap-8 relative"
          >
            {/* Summary Sidebar */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white rounded-2xl shadow-xl border border-border p-6">
                <h3 className="text-xl font-bold text-accent mb-6 flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Summary
                </h3>

                {selectedServices.length > 0 ? (
                  <div className="space-y-4">
                    {/* Selected services */}
                    {selectedServices.map((serviceId) => {
                      const service = services.find((s) => s.id === serviceId);
                      if (!service) return null;
                      const Icon = service.icon;
                      return (
                        <div key={serviceId} className="p-3 bg-accent/5 rounded-xl">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-accent text-sm">
                              {service.name}
                            </span>
                            <div className="flex items-center gap-2">
                              {isFinalStep && (
                                <span className="font-bold text-accent text-sm">
                                  ${service.basePrice}
                                </span>
                              )}
                              <Icon className="w-4 h-4 text-accent" />
                            </div>
                          </div>

                          {/* Line items for configurable services */}
                          {(serviceId === "website" || serviceId === "ecommerce") && (
                            <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                              {getServiceLineItems(serviceId).filter((item) => item.price !== 0).map((item, i) => (
                                <div key={i} className="flex justify-between">
                                  <span>{item.label}</span>
                                  {isFinalStep && <span>${item.price}</span>}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {/* Divider */}
                    <div className="h-1 bg-gradient-to-r from-accent to-secondary rounded-full" />

                    {/* Total */}
                    <div className="bg-muted rounded-xl p-4 text-center">
                      {isFinalStep ? (
                        <>
                          <p className="text-3xl font-bold text-accent">
                            ${calculateTotal()}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Total (tax-free)
                          </p>
                        </>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          Complete all steps to see your price
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted rounded-xl p-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Select one or more services to get started
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-2xl shadow-xl border border-border p-8 relative">
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

              <AnimatePresence mode="wait">
                {/* Step 1: Service Selection */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-primary text-center mb-2">
                      What services are you interested in?
                    </h3>
                    <p className="text-sm text-muted-foreground text-center mb-8">
                      Select all that apply
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                      {services.map((service) => (
                        <button
                          key={service.id}
                          onClick={() => toggleService(service.id)}
                          className={cn(
                            "p-6 rounded-xl border-2 transition-all text-center group relative",
                            selectedServices.includes(service.id)
                              ? "border-accent bg-accent text-white"
                              : "border-border hover:border-accent/50 bg-white"
                          )}
                        >
                          {selectedServices.includes(service.id) && (
                            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                              <Check className="w-4 h-4 text-accent" />
                            </div>
                          )}
                          <service.icon
                            className={cn(
                              "w-10 h-10 mx-auto mb-3 transition-colors",
                              selectedServices.includes(service.id)
                                ? "text-white"
                                : "text-accent"
                            )}
                          />
                          <span
                            className={cn(
                              "font-semibold block",
                              selectedServices.includes(service.id)
                                ? "text-white"
                                : "text-primary"
                            )}
                          >
                            {service.name}
                          </span>
                          <span
                            className={cn(
                              "text-xs mt-1 block",
                              selectedServices.includes(service.id)
                                ? "text-white/80"
                                : "text-muted-foreground"
                            )}
                          >
                            {service.description}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Configuration Steps (one per configurable service) */}
                {currentConfigServiceId && currentConfigSettings && (
                  <motion.div
                    key={`step-config-${currentConfigServiceId}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-primary text-center mb-8">
                      {currentConfigServiceName} Settings
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
                              onClick={() => updateSetting(currentConfigServiceId, "design", option.id)}
                              className={cn(
                                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                                currentConfigSettings.design === option.id
                                  ? "bg-accent text-white"
                                  : "bg-white text-muted-foreground hover:bg-accent/10"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Number of Pages */}
                      <div className="bg-muted/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <FileText className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Number of Pages</span>
                        </div>
                        <div className="flex gap-2">
                          {pageOptions.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => updateSetting(currentConfigServiceId, "pages", option.id)}
                              className={cn(
                                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                                currentConfigSettings.pages === option.id
                                  ? "bg-accent text-white"
                                  : "bg-white text-muted-foreground hover:bg-accent/10"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Additional Services */}
                      <div className="bg-muted/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Gauge className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Additional Services</span>
                        </div>
                        <div className="flex flex-col gap-2">
                          {additionalServices.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => toggleAdditional(currentConfigServiceId, option.id)}
                              className={cn(
                                "py-2 px-3 rounded-lg text-sm font-medium transition-all text-left",
                                currentConfigSettings.additional.includes(option.id)
                                  ? "bg-accent text-white"
                                  : "bg-white text-muted-foreground hover:bg-accent/10"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* How will you update your site? */}
                      <div className="bg-muted/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Settings className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">How will you update your site?</span>
                        </div>
                        <div className="flex flex-col gap-2">
                          {cmsOptions.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => updateSetting(currentConfigServiceId, "cms", option.id)}
                              className={cn(
                                "py-2 px-3 rounded-lg text-sm font-medium transition-all text-left",
                                currentConfigSettings.cms === option.id
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
                        <div className="flex items-center gap-2 mb-1">
                          <Sparkles className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Special Features</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3">
                          Custom animations, interactive maps, booking systems, payment integrations, live chat, and more.
                        </p>
                        <div className="flex gap-2">
                          {specialFeatures.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => updateSetting(currentConfigServiceId, "features", option.id)}
                              className={cn(
                                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                                currentConfigSettings.features === option.id
                                  ? "bg-accent text-white"
                                  : "bg-white text-muted-foreground hover:bg-accent/10"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2 italic">
                          Final cost may vary based on feature complexity.
                        </p>
                      </div>

                      {/* Languages */}
                      <div className="bg-muted/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Languages className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Number of Languages</span>
                        </div>
                        <div className="flex gap-2">
                          {languageOptions.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => updateSetting(currentConfigServiceId, "languages", option.id)}
                              className={cn(
                                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                                currentConfigSettings.languages === option.id
                                  ? "bg-accent text-white"
                                  : "bg-white text-muted-foreground hover:bg-accent/10"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Support Plan */}
                      <div className="bg-muted/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Headphones className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Technical Support Plan</span>
                        </div>
                        <div className="flex gap-2">
                          {supportPlans.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => updateSetting(currentConfigServiceId, "support", option.id)}
                              className={cn(
                                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                                currentConfigSettings.support === option.id
                                  ? "bg-accent text-white"
                                  : "bg-white text-muted-foreground hover:bg-accent/10"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Delivery Time */}
                      <div className="bg-muted/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Delivery Time</span>
                        </div>
                        <div className="flex gap-2">
                          {deliveryTimes.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => updateSetting(currentConfigServiceId, "delivery", option.id)}
                              className={cn(
                                "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                                currentConfigSettings.delivery === option.id
                                  ? "bg-accent text-white"
                                  : "bg-white text-muted-foreground hover:bg-accent/10"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                        {currentConfigSettings.delivery === "2weeks" && (
                          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                            <p className="text-xs text-amber-800 font-semibold mb-1">Conditions for 2-week delivery:</p>
                            <ul className="text-xs text-amber-800 space-y-0.5 list-disc list-inside">
                              <li>Applies only if OneSquad has all required materials and approvals upfront.</li>
                              <li>Delays in client responses or clarifications can extend the timeline.</li>
                              <li>Website testing occurs on the client&apos;s timeline and is not included in the 2 weeks.</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Final Step: Quote Summary */}
                {isFinalStep && (
                  <motion.div
                    key="step-final"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="max-w-lg mx-auto"
                  >
                    <div className="text-center mb-6">
                      <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                        <Check className="w-10 h-10 text-accent" />
                      </div>
                      <h3 className="text-2xl font-bold text-primary mb-2">
                        Your Quote is Ready!
                      </h3>
                      <p className="text-muted-foreground">
                        Here&apos;s a breakdown of your estimated project cost.
                      </p>
                    </div>

                    {/* Itemized breakdown */}
                    <div className="bg-muted/50 rounded-xl p-6 mb-6 max-h-[400px] overflow-y-auto">
                      {selectedServices.map((serviceId) => {
                        const service = services.find((s) => s.id === serviceId);
                        if (!service) return null;
                        const lineItems = getServiceLineItems(serviceId);
                        let subtotal = service.basePrice;
                        lineItems.forEach((item) => { subtotal += item.price; });

                        return (
                          <div key={serviceId} className="mb-4 last:mb-0">
                            <div className="flex justify-between font-semibold text-primary mb-2">
                              <span>{service.name}</span>
                              <span>Base: ${service.basePrice}</span>
                            </div>
                            {lineItems.filter((item) => item.price !== 0).map((item, i) => (
                              <div key={i} className="flex justify-between text-sm text-muted-foreground py-0.5">
                                <span>{item.label}</span>
                                <span>{item.price > 0 ? `+$${item.price}` : `-$${Math.abs(item.price)}`}</span>
                              </div>
                            ))}
                            {(serviceId === "website" || serviceId === "ecommerce") && (
                              <div className="flex justify-between text-sm font-medium text-accent mt-1 pt-1 border-t border-border">
                                <span>Subtotal</span>
                                <span>${subtotal}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      <div className="border-t-2 border-accent pt-3 mt-3 flex justify-between text-lg font-bold text-accent">
                        <span>Total</span>
                        <span>${calculateTotal()}</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground mb-6">
                        Contact us to finalize your quote and get started.
                      </p>
                      <Button
                        variant="accent"
                        size="lg"
                        rightIcon={<ArrowRight size={18} />}
                        onClick={handleGetStarted}
                      >
                        Get Started
                      </Button>
                    </div>

                    {/* Example project estimates */}
                    <div className="mt-10 border-t pt-6">
                      <h4 className="font-semibold text-primary mb-4 text-center">Example project estimates</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {exampleQuotes.map((example) => (
                          <div key={example.title} className="bg-white rounded-xl p-4 border border-border">
                            <p className="font-medium text-primary text-sm">{example.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{example.description}</p>
                            <p className="text-accent font-bold mt-2">${example.total.toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-center gap-4 mt-8">
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    leftIcon={<ArrowLeft size={18} />}
                  >
                    Return
                  </Button>
                )}
                {currentStep < totalSteps && selectedServices.length > 0 && (
                  <Button
                    variant="accent"
                    onClick={handleNext}
                    rightIcon={<ArrowRight size={18} />}
                    className="min-w-[200px]"
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

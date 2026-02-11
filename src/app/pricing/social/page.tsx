"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  Share2,
  Check,
  ArrowRight,
  ArrowLeft,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Camera,
  Video,
  Calendar,
  BarChart3,
  MessageCircle,
  Layers,
  Clock,
  Headphones,
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

// Social Media specific options
const platforms = [
  { id: "instagram", label: "Instagram", price: 100, icon: Instagram },
  { id: "facebook", label: "Facebook", price: 100, icon: Facebook },
  { id: "twitter", label: "Twitter/X", price: 80, icon: Twitter },
  { id: "linkedin", label: "LinkedIn", price: 120, icon: Linkedin },
];

const postFrequency = [
  { id: "daily", label: "Daily (30/month)", price: 400 },
  { id: "5weekly", label: "5x per week", price: 300 },
  { id: "3weekly", label: "3x per week", price: 150 },
  { id: "weekly", label: "Weekly", price: 0 },
];

const contentTypes = [
  { id: "graphics", label: "Custom Graphics", price: 150, icon: Camera },
  { id: "video", label: "Video Content", price: 300, icon: Video },
  { id: "reels", label: "Reels/Stories", price: 200, icon: Video },
  { id: "carousel", label: "Carousel Posts", price: 100, icon: Layers },
];

const engagementServices = [
  { id: "comments", label: "Comment Management", price: 100, icon: MessageCircle },
  { id: "dms", label: "DM Management", price: 150, icon: MessageCircle },
  { id: "analytics", label: "Monthly Analytics", price: 100, icon: BarChart3 },
  { id: "strategy", label: "Content Strategy", price: 200, icon: Calendar },
];

const contractLength = [
  { id: "12months", label: "12 Months", price: -100 },
  { id: "6months", label: "6 Months", price: -50 },
  { id: "3months", label: "3 Months", price: 0 },
  { id: "monthly", label: "Monthly", price: 50 },
];

const supportLevel = [
  { id: "premium", label: "Premium (24/7)", price: 200 },
  { id: "business", label: "Business Hours", price: 100 },
  { id: "basic", label: "Email Only", price: 0 },
];

const BASE_PRICE = 300;

export default function SocialMediaPricingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [settings, setSettings] = useState({
    platforms: [] as string[],
    frequency: "weekly",
    content: [] as string[],
    engagement: [] as string[],
    contract: "3months",
    support: "basic",
  });

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const togglePlatform = (id: string) => {
    setSettings((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(id)
        ? prev.platforms.filter((p) => p !== id)
        : [...prev.platforms, id],
    }));
  };

  const toggleContent = (id: string) => {
    setSettings((prev) => ({
      ...prev,
      content: prev.content.includes(id)
        ? prev.content.filter((c) => c !== id)
        : [...prev.content, id],
    }));
  };

  const toggleEngagement = (id: string) => {
    setSettings((prev) => ({
      ...prev,
      engagement: prev.engagement.includes(id)
        ? prev.engagement.filter((e) => e !== id)
        : [...prev.engagement, id],
    }));
  };

  const calculateTotal = () => {
    let total = BASE_PRICE;
    settings.platforms.forEach((id) => {
      total += platforms.find((p) => p.id === id)?.price || 0;
    });
    total += postFrequency.find((f) => f.id === settings.frequency)?.price || 0;
    settings.content.forEach((id) => {
      total += contentTypes.find((c) => c.id === id)?.price || 0;
    });
    settings.engagement.forEach((id) => {
      total += engagementServices.find((e) => e.id === id)?.price || 0;
    });
    total += contractLength.find((c) => c.id === settings.contract)?.price || 0;
    total += supportLevel.find((s) => s.id === settings.support)?.price || 0;
    return total;
  };

  const totalSteps = 3;

  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: "Pricing", href: "/pricing" }, { label: "Social Media Plans" }]} />
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
                <Share2 className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Social Media <span className="text-secondary">Pricing</span>
              </h1>
              <p className="text-xl text-white/80">
                Build a social media package that fits your business.
                Pick your platforms, content, and support level below.
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
                      <span className="font-semibold text-accent">Social Media</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-accent">${BASE_PRICE}</span>
                        <Share2 className="w-5 h-5 text-accent" />
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      {settings.platforms.length > 0 && (
                        <div className="flex justify-between">
                          <span>Platforms: {settings.platforms.map(id => platforms.find(p => p.id === id)?.label).join(", ")}</span>
                        </div>
                      )}
                      {settings.platforms.map((id) => (
                        <div key={id} className="flex justify-between">
                          <span>${platforms.find((p) => p.id === id)?.price} — {platforms.find((p) => p.id === id)?.label}</span>
                        </div>
                      ))}
                      <div className="flex justify-between">
                        <span>${postFrequency.find((f) => f.id === settings.frequency)?.price || 0} — {postFrequency.find((f) => f.id === settings.frequency)?.label}</span>
                      </div>
                      {settings.content.map((id) => (
                        <div key={id} className="flex justify-between">
                          <span>${contentTypes.find((c) => c.id === id)?.price} — {contentTypes.find((c) => c.id === id)?.label}</span>
                        </div>
                      ))}
                      {settings.engagement.map((id) => (
                        <div key={id} className="flex justify-between">
                          <span>${engagementServices.find((e) => e.id === id)?.price} — {engagementServices.find((e) => e.id === id)?.label}</span>
                        </div>
                      ))}
                      <div className="flex justify-between">
                        <span>${contractLength.find((c) => c.id === settings.contract)?.price || 0} — {contractLength.find((c) => c.id === settings.contract)?.label} contract</span>
                      </div>
                      <div className="flex justify-between">
                        <span>${supportLevel.find((s) => s.id === settings.support)?.price || 0} — {supportLevel.find((s) => s.id === settings.support)?.label} support</span>
                      </div>
                    </div>

                    <div className="h-1 bg-gradient-to-r from-accent to-secondary rounded-full" />

                    <div className="bg-muted rounded-xl p-4 text-center">
                      <p className="text-3xl font-bold text-accent">${calculateTotal()}</p>
                      <p className="text-sm text-muted-foreground">per month</p>
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

                {/* Step 1: Platforms & Frequency */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-primary text-center mb-8">
                      Choose Your Platforms
                    </h3>

                    <div className="space-y-6">
                      {/* Platforms */}
                      <div className="bg-muted/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Share2 className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Social Platforms</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {platforms.map((platform) => (
                            <button
                              key={platform.id}
                              onClick={() => togglePlatform(platform.id)}
                              className={cn(
                                "flex flex-col items-center gap-2 p-4 rounded-lg text-sm font-medium transition-all",
                                settings.platforms.includes(platform.id)
                                  ? "bg-accent text-white"
                                  : "bg-white text-muted-foreground hover:bg-accent/10"
                              )}
                            >
                              <platform.icon className="w-6 h-6" />
                              <span>{platform.label}</span>
                              <span className="text-xs">+${platform.price}/mo</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Posting Frequency */}
                      <div className="bg-muted/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Calendar className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Posting Frequency</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {postFrequency.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => setSettings({ ...settings, frequency: option.id })}
                              className={cn(
                                "py-3 px-4 rounded-lg text-sm font-medium transition-all",
                                settings.frequency === option.id
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

                {/* Step 2: Content & Services */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-primary text-center mb-8">
                      Content & Engagement
                    </h3>

                    <div className="space-y-6">
                      {/* Content Types */}
                      <div className="bg-muted/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Camera className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Content Types</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {contentTypes.map((content) => (
                            <button
                              key={content.id}
                              onClick={() => toggleContent(content.id)}
                              className={cn(
                                "flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all",
                                settings.content.includes(content.id)
                                  ? "bg-accent text-white"
                                  : "bg-white text-muted-foreground hover:bg-accent/10"
                              )}
                            >
                              <content.icon className="w-5 h-5" />
                              <span>{content.label}</span>
                              <span className="ml-auto">+${content.price}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Engagement Services */}
                      <div className="bg-muted/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <MessageCircle className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Engagement Services</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {engagementServices.map((service) => (
                            <button
                              key={service.id}
                              onClick={() => toggleEngagement(service.id)}
                              className={cn(
                                "flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-all",
                                settings.engagement.includes(service.id)
                                  ? "bg-accent text-white"
                                  : "bg-white text-muted-foreground hover:bg-accent/10"
                              )}
                            >
                              <service.icon className="w-5 h-5" />
                              <span>{service.label}</span>
                              <span className="ml-auto">+${service.price}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Contract & Confirmation */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-primary text-center mb-8">
                      Contract & Support
                    </h3>

                    <div className="space-y-6 max-w-2xl mx-auto">
                      {/* Contract Length */}
                      <div className="bg-muted/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Clock className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Contract Length</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {contractLength.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => setSettings({ ...settings, contract: option.id })}
                              className={cn(
                                "py-3 px-4 rounded-lg text-sm font-medium transition-all",
                                settings.contract === option.id
                                  ? "bg-accent text-white"
                                  : "bg-white text-muted-foreground hover:bg-accent/10"
                              )}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Support Level */}
                      <div className="bg-muted/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Headphones className="w-5 h-5 text-accent" />
                          <span className="font-semibold text-primary">Support Level</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {supportLevel.map((option) => (
                            <button
                              key={option.id}
                              onClick={() => setSettings({ ...settings, support: option.id })}
                              className={cn(
                                "py-3 px-4 rounded-lg text-sm font-medium transition-all",
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

                      {/* CTA */}
                      <div className="text-center pt-6">
                        <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                          <Check className="w-10 h-10 text-accent" />
                        </div>
                        <h3 className="text-2xl font-bold text-primary mb-4">
                          Your Quote is Ready!
                        </h3>
                        <p className="text-muted-foreground mb-8">
                          Your estimated monthly cost is{" "}
                          <strong className="text-accent">${calculateTotal()}/month</strong>.
                          Reach out and we&apos;ll get your accounts set up.
                        </p>
                        <Link href="/contact">
                          <Button variant="accent" size="lg" rightIcon={<ArrowRight size={18} />}>
                            Get Started
                          </Button>
                        </Link>
                      </div>
                    </div>
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

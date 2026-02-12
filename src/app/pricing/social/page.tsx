"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence, MotionConfig } from "framer-motion";
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

// Animation variants - bold/playful personality
const socialFadeIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: "easeOut" as const }
  }
};

const socialStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const socialItem = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 400, damping: 20 }
  }
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
    <MotionConfig reducedMotion="user">
      <Header />
      <main>
          <Breadcrumb items={[{ label: "Pricing", href: "/pricing" }, { label: "Social Media Plans" }]} />
        {/* Hero - Light section with playful energy */}
        <section className="relative bg-gradient-to-br from-white to-peach/10 py-20 md:py-28 overflow-hidden">
          {/* Decorative social icons */}
          <div className="absolute top-10 left-10 opacity-5">
            <Instagram className="w-32 h-32 text-coral" />
          </div>
          <div className="absolute bottom-10 right-10 opacity-5">
            <Facebook className="w-40 h-40 text-coral" />
          </div>
          <div className="absolute top-1/2 right-1/4 opacity-5">
            <Twitter className="w-24 h-24 text-coral" />
          </div>

          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center max-w-4xl mx-auto relative z-10"
            >
              <Share2 className="w-16 h-16 text-coral mx-auto mb-6" />
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-navy mb-6">
                Build Your Social <span className="text-coral">Empire</span>
              </h1>
              <p className="text-xl md:text-2xl text-navy/70">
                Pick platforms. Add content. Get a price. It&apos;s that easy.
              </p>
            </motion.div>
          </Container>
        </section>

        {/* Calculator - Dark navy section */}
        <section className="relative bg-navy py-24 md:py-32">
          <Container>
            <motion.div
              ref={ref}
              variants={socialStagger}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="max-w-5xl mx-auto"
            >
              {/* Step indicators - filled circles with bounce */}
              <motion.div
                variants={socialItem}
                className="flex items-center justify-center gap-3 mb-12"
              >
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => index + 1 <= currentStep && setCurrentStep(index + 1)}
                    animate={currentStep === index + 1 ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ type: "spring" as const, stiffness: 400, damping: 15 }}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all",
                      currentStep === index + 1
                        ? "bg-coral text-white"
                        : index + 1 < currentStep
                        ? "bg-coral/30 text-white"
                        : "bg-white/10 text-white/50"
                    )}
                    data-cursor="button"
                  >
                    {index + 1 < currentStep ? <Check className="w-6 h-6" /> : index + 1}
                  </motion.button>
                ))}
              </motion.div>

              {/* Step content with AnimatePresence */}
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
                      Pick Your Platforms
                    </h3>

                    <div className="space-y-6">
                      {/* Platforms - 2x2 on mobile, 4-col on desktop */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {platforms.map((platform) => (
                          <motion.button
                            key={platform.id}
                            onClick={() => togglePlatform(platform.id)}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                            className={cn(
                              "flex flex-col items-center gap-3 p-4 rounded-xl text-sm font-medium transition-all",
                              settings.platforms.includes(platform.id)
                                ? "bg-coral text-white"
                                : "bg-white/10 text-white/70 hover:bg-white/15"
                            )}
                            data-cursor="card"
                          >
                            <platform.icon className="w-8 h-8" />
                            <span className="font-bold">{platform.label}</span>
                            <span className="text-xs opacity-70">+${platform.price}/mo</span>
                          </motion.button>
                        ))}
                      </div>

                      {/* Posting Frequency */}
                      <div className="pt-6">
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-coral" />
                          Choose Your Frequency
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {postFrequency.map((option) => (
                            <motion.button
                              key={option.id}
                              onClick={() => setSettings({ ...settings, frequency: option.id })}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                              className={cn(
                                "py-4 px-5 rounded-xl text-sm font-medium transition-all",
                                settings.frequency === option.id
                                  ? "bg-coral text-white"
                                  : "bg-white/10 text-white/70 hover:bg-white/15"
                              )}
                              data-cursor="button"
                            >
                              <span className="block font-bold">{option.label}</span>
                              <span className="text-xs opacity-70">
                                {option.price > 0 ? `+$${option.price}` : "Included"}
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
                      Add the Good Stuff
                    </h3>

                    <div className="space-y-6">
                      {/* Content Types */}
                      <div>
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <Camera className="w-5 h-5 text-coral" />
                          Content Types
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {contentTypes.map((content) => (
                            <motion.button
                              key={content.id}
                              onClick={() => toggleContent(content.id)}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                              className={cn(
                                "flex items-center gap-3 p-4 rounded-xl text-sm font-medium transition-all",
                                settings.content.includes(content.id)
                                  ? "bg-coral text-white"
                                  : "bg-white/10 text-white/70 hover:bg-white/15"
                              )}
                              data-cursor="card"
                            >
                              <content.icon className="w-6 h-6" />
                              <div className="flex-1 text-left">
                                <span className="block font-bold">{content.label}</span>
                                <span className="text-xs opacity-70">+${content.price}/mo</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Engagement Services */}
                      <div className="pt-6">
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <MessageCircle className="w-5 h-5 text-coral" />
                          Engagement Services
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {engagementServices.map((service) => (
                            <motion.button
                              key={service.id}
                              onClick={() => toggleEngagement(service.id)}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                              className={cn(
                                "flex items-center gap-3 p-4 rounded-xl text-sm font-medium transition-all",
                                settings.engagement.includes(service.id)
                                  ? "bg-coral text-white"
                                  : "bg-white/10 text-white/70 hover:bg-white/15"
                              )}
                              data-cursor="card"
                            >
                              <service.icon className="w-6 h-6" />
                              <div className="flex-1 text-left">
                                <span className="block font-bold">{service.label}</span>
                                <span className="text-xs opacity-70">+${service.price}/mo</span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8"
                  >
                    <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
                      Lock It In
                    </h3>

                    <div className="space-y-6">
                      {/* Contract Length */}
                      <div>
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <Clock className="w-5 h-5 text-coral" />
                          Contract Length
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {contractLength.map((option) => (
                            <motion.button
                              key={option.id}
                              onClick={() => setSettings({ ...settings, contract: option.id })}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                              className={cn(
                                "py-4 px-4 rounded-xl text-sm font-medium transition-all",
                                settings.contract === option.id
                                  ? "bg-coral text-white"
                                  : "bg-white/10 text-white/70 hover:bg-white/15"
                              )}
                              data-cursor="button"
                            >
                              <span className="block font-bold">{option.label}</span>
                              <span className="text-xs opacity-70">
                                {option.price < 0 ? `$${option.price}` : option.price > 0 ? `+$${option.price}` : "Standard"}
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Support Level */}
                      <div className="pt-6">
                        <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                          <Headphones className="w-5 h-5 text-coral" />
                          Support Level
                        </h4>
                        <div className="grid grid-cols-3 gap-3">
                          {supportLevel.map((option) => (
                            <motion.button
                              key={option.id}
                              onClick={() => setSettings({ ...settings, support: option.id })}
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.2 }}
                              className={cn(
                                "py-4 px-4 rounded-xl text-sm font-medium transition-all",
                                settings.support === option.id
                                  ? "bg-coral text-white"
                                  : "bg-white/10 text-white/70 hover:bg-white/15"
                              )}
                              data-cursor="button"
                            >
                              <span className="block font-bold">{option.label}</span>
                              <span className="text-xs opacity-70">
                                {option.price > 0 ? `+$${option.price}` : "Included"}
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Inline Summary - below wizard content */}
              <motion.div
                variants={socialItem}
                className="mt-8 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex-1 min-w-[200px]">
                    <h4 className="text-sm font-bold text-white/70 mb-2">Your Monthly Plan</h4>
                    <div className="flex flex-wrap items-baseline gap-3 text-white/60 text-sm">
                      <span>Base: ${BASE_PRICE}</span>
                      {settings.platforms.length > 0 && (
                        <span>• Platforms: {settings.platforms.length}</span>
                      )}
                      {settings.content.length > 0 && (
                        <span>• Content: {settings.content.length} types</span>
                      )}
                      {settings.engagement.length > 0 && (
                        <span>• Services: {settings.engagement.length}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={calculateTotal()}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
                      >
                        <p className="text-4xl md:text-5xl font-bold text-coral">${calculateTotal()}</p>
                        <p className="text-sm text-white/70 mt-1">per month</p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>

              {/* Navigation buttons */}
              <motion.div
                variants={socialItem}
                className="flex justify-center gap-4 mt-8"
              >
                {currentStep > 1 && (
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    leftIcon={<ArrowLeft size={18} />}
                    className="border-white/20 text-white hover:bg-white/10"
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
                    className="min-w-[200px] rounded-full"
                    data-cursor="button"
                  >
                    Next Step
                  </Button>
                )}
              </motion.div>
            </motion.div>
          </Container>
        </section>

        {/* Confirmation - Light section */}
        {currentStep === 3 && (
          <section className="bg-white py-20 md:py-28">
            <Container>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="text-center max-w-2xl mx-auto"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" as const, stiffness: 300, damping: 15, delay: 0.3 }}
                  className="w-24 h-24 rounded-full bg-coral/10 flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-12 h-12 text-coral" />
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
                  You&apos;re All Set!
                </h2>

                <p className="text-xl text-navy/70 mb-4">
                  Your monthly investment:
                </p>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={calculateTotal()}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ type: "spring" as const, stiffness: 300, damping: 20 }}
                    className="text-6xl md:text-7xl font-bold text-coral mb-8"
                  >
                    ${calculateTotal()}<span className="text-3xl text-coral/70">/mo</span>
                  </motion.div>
                </AnimatePresence>

                <p className="text-lg text-navy/60 mb-8">
                  Ready to dominate every feed? Let&apos;s make it happen.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/contact">
                    <Button
                      variant="accent"
                      size="lg"
                      rightIcon={<ArrowRight size={20} />}
                      className="rounded-full min-w-[240px]"
                      data-cursor="button"
                    >
                      Let&apos;s Make It Happen
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setCurrentStep(1)}
                    className="rounded-full"
                    data-cursor="button"
                  >
                    Or tweak your picks
                  </Button>
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

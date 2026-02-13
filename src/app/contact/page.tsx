"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Phone,
  Globe,
  Clock,
  Send,
  CheckCircle,
} from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { siteConfig, services } from "@/lib/constants";
import { QUOTE_STORAGE_KEY, type QuoteData } from "@/lib/pricingData";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fadeUp, scaleReveal, slideFromLeft, slideFromRight, TRIGGERS } from "@/lib/scrollAnimations";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const serviceOptions = [
  { value: "", label: "Select a service (optional)" },
  ...services.map((s) => ({ value: s.slug, label: s.title })),
];

const budgetOptions = [
  { value: "", label: "What's your budget range?" },
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-10k", label: "$5,000 - $10,000" },
  { value: "10k-25k", label: "$10,000 - $25,000" },
  { value: "25k-plus", label: "$25,000+" },
  { value: "not-sure", label: "Not sure yet" },
];

const timelineOptions = [
  { value: "", label: "When do you need this?" },
  { value: "asap", label: "As soon as possible" },
  { value: "1-2-months", label: "1-2 months" },
  { value: "2-3-months", label: "2-3 months" },
  { value: "flexible", label: "Flexible / No rush" },
];

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Call or Text",
    value: "Call, text, or email — your choice",
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Globe,
    label: "Location",
    value: siteConfig.address,
    href: "#",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Response within 24 hours",
    href: "#",
  },
];

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // Read quote data from localStorage (passed from Price Calculator)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(QUOTE_STORAGE_KEY);
      if (stored) {
        const quote: QuoteData = JSON.parse(stored);
        setQuoteData(quote);

        // Build itemized message text
        const lines: string[] = ["--- Quote from Price Calculator ---"];
        for (const svc of quote.services) {
          lines.push(`\n${svc.serviceName} (base: $${svc.basePrice})`);
          for (const item of svc.lineItems) {
            if (item.price !== 0) {
              lines.push(`  - ${item.label}: ${item.price > 0 ? `+$${item.price}` : `-$${Math.abs(item.price)}`}`);
            }
          }
          lines.push(`  Subtotal: $${svc.subtotal}`);
        }
        lines.push(`\nTotal: $${quote.total}`);
        lines.push("---\n");
        lines.push("Additional details about my project:\n");

        setValue("message", lines.join("\n"));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      // Clear quote data after submission
      localStorage.removeItem(QUOTE_STORAGE_KEY);
      setQuoteData(null);

      setIsSubmitted(true);
      reset();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Hero animations
  const { scope: heroScope } = useScrollAnimation(({ gsap }) => {
    gsap.from('.contact-hero-headline', {
      ...fadeUp({ y: 30, duration: 0.6 }),
      scrollTrigger: {
        trigger: '.contact-hero',
        start: TRIGGERS.hero,
      },
    });

    gsap.from('.contact-hero-subtitle', {
      ...fadeUp({ y: 30, duration: 0.6 }),
      delay: 0.15,
      scrollTrigger: {
        trigger: '.contact-hero',
        start: TRIGGERS.hero,
      },
    });
  });

  // Form section animations (asymmetric slide-in)
  const { scope: formScope } = useScrollAnimation(({ gsap }) => {
    // Sidebar slides from left
    gsap.from('.contact-sidebar', {
      ...slideFromLeft(),
      scrollTrigger: {
        trigger: '.contact-form-section',
        start: TRIGGERS.standard,
      },
    });

    // Form area slides from right with delay
    gsap.from('.contact-form-area', {
      ...slideFromRight(),
      delay: 0.15,
      scrollTrigger: {
        trigger: '.contact-form-section',
        start: TRIGGERS.standard,
      },
    });

    // Contact info items stagger
    gsap.from('.contact-info-item', {
      ...fadeUp(),
      stagger: 0.1,
      delay: 0.2,
      scrollTrigger: {
        trigger: '.contact-sidebar',
        start: TRIGGERS.standard,
      },
    });

    // Quick response badge
    gsap.from('.contact-badge', {
      ...scaleReveal(),
      delay: 0.5,
      scrollTrigger: {
        trigger: '.contact-sidebar',
        start: TRIGGERS.standard,
      },
    });
  });

  // CTA animations
  const { scope: ctaScope } = useScrollAnimation(({ gsap }) => {
    gsap.from('.contact-cta-heading', {
      ...fadeUp(),
      scrollTrigger: {
        trigger: '.contact-cta',
        start: TRIGGERS.standard,
      },
    });

    gsap.from('.contact-cta-text', {
      ...fadeUp(),
      delay: 0.15,
      scrollTrigger: {
        trigger: '.contact-cta',
        start: TRIGGERS.standard,
      },
    });

    gsap.from('.contact-cta-buttons', {
      ...fadeUp(),
      delay: 0.3,
      scrollTrigger: {
        trigger: '.contact-cta',
        start: TRIGGERS.standard,
      },
    });
  });

  return (
    <>
      <Header />
      <main>
        {/* Section 1: Dark Hero */}
        <section
          ref={heroScope}
          className="contact-hero bg-navy-section py-24 md:py-36"
          data-animate
        >
          <Container>
            <div
              className="max-w-3xl"
              data-cursor="text"
              data-cursor-text="Say Hi"
            >
              <h1
                className="contact-hero-headline text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[0.9] mb-6"
                data-animate
              >
                Have a Project? <span className="text-coral">Let&apos;s Talk.</span>
              </h1>
              <p
                className="contact-hero-subtitle text-xl text-white/70"
                data-animate
              >
                Tell us what you need and we&apos;ll send you a quote — or just your business name for a free website mockup within 24 hours.
              </p>
            </div>
          </Container>
        </section>

        {/* Section 2: Form + Sidebar */}
        <section
          ref={formScope}
          className="contact-form-section bg-card py-20 md:py-32"
          data-animate
        >
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Sidebar */}
              <div className="contact-sidebar lg:col-span-4" data-animate>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Other Ways to Reach Us
                </h2>
                <p className="text-muted-foreground mb-8">
                  Not a form person? We get it.
                </p>

                <div className="space-y-4">
                  {contactInfo.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="contact-info-item flex items-start gap-4 group"
                      data-cursor="card"
                      data-animate
                    >
                      <div className="w-12 h-12 rounded-xl bg-coral/10 flex items-center justify-center flex-shrink-0 group-hover:bg-coral transition-colors">
                        <item.icon className="w-5 h-5 text-coral group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="font-semibold text-foreground">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Quick response badge */}
                <div className="contact-badge mt-8 p-5 bg-muted rounded-2xl" data-animate>
                  <p className="font-bold text-foreground mb-1">
                    We Respond Within <span className="text-coral">24 Hours</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    No automated replies, just real people.
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Call, text, or email your OneSquad rep directly.
                  </p>
                </div>
              </div>

              {/* Form Area */}
              <div className="contact-form-area lg:col-span-8" data-animate>
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Tell Us About Your Project
                  </h2>
                  <p className="text-muted-foreground">
                    The more you tell us, the better we can help. No pressure — we&apos;ll get back to you within 24 hours.
                  </p>
                </div>

                {/* Restyled Quote Summary Card - Keep motion.div for conditional mount animation */}
                {quoteData && !isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-8 p-6 bg-coral/10 border-2 border-coral/20 rounded-2xl"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-coral flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xl font-bold">$</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-foreground">Your Quote Summary</h4>
                        <p className="text-sm text-muted-foreground">From the pricing calculator</p>
                      </div>
                    </div>
                    {quoteData.services.map((svc) => (
                      <div key={svc.serviceId} className="flex justify-between text-sm mb-2">
                        <span className="text-foreground/80">{svc.serviceName}</span>
                        <span className="font-semibold text-foreground">${svc.subtotal}</span>
                      </div>
                    ))}
                    <div className="border-t-2 border-coral/20 pt-3 mt-3 flex justify-between">
                      <span className="text-foreground font-bold text-lg">Estimated Total</span>
                      <span className="text-coral font-bold text-xl">${quoteData.total}</span>
                    </div>
                  </motion.div>
                )}

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-coral/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-coral" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      Message Sent!
                    </h3>
                    <p className="text-muted-foreground mb-8">
                      Thanks for reaching out. We&apos;ll get back to you within 24 hours with a real, human response.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Input
                        label="Your Name *"
                        placeholder="Jane Smith"
                        error={errors.name?.message}
                        helperText="What should we call you?"
                        {...register("name")}
                      />
                      <Input
                        label="Email Address *"
                        type="email"
                        placeholder="jane@yourcompany.com"
                        error={errors.email?.message}
                        {...register("email")}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        {...register("phone")}
                      />
                      <Input
                        label="Company Name"
                        placeholder="Acme Inc."
                        {...register("company")}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <Select
                        label="Service Interested In"
                        options={serviceOptions}
                        placeholder="Select a service (optional)"
                        {...register("service")}
                      />
                      <Select
                        label="Budget Range"
                        options={budgetOptions}
                        placeholder="What's your budget range?"
                        {...register("budget")}
                      />
                    </div>

                    <Select
                      label="Project Timeline"
                      options={timelineOptions}
                      placeholder="When do you need this?"
                      {...register("timeline")}
                    />

                    <Textarea
                      label="Your Message *"
                      placeholder="Tell us about your project — the more detail the better..."
                      rows={6}
                      error={errors.message?.message}
                      {...register("message")}
                    />

                    <Button
                      type="submit"
                      variant="accent"
                      size="lg"
                      className="w-full"
                      isLoading={isSubmitting}
                      rightIcon={!isSubmitting && <Send size={18} />}
                      data-cursor="button"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>

                    <p className="text-center text-sm text-muted-foreground">
                      By submitting, you agree to our Privacy Policy. We&apos;ll respond within 24 hours — no automated replies, just real people.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Section 3: Alternative CTA */}
        <section
          ref={ctaScope}
          className="contact-cta bg-navy-section py-20 md:py-28"
          data-animate
        >
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="contact-cta-heading text-3xl md:text-4xl font-bold text-white mb-4" data-animate>
                Not Ready to Commit?
              </h2>
              <p className="contact-cta-text text-white/70 text-lg mb-8" data-animate>
                That&apos;s cool. Browse our work or check the pricing calculator — no pressure, no sales pitch.
              </p>
              <div className="contact-cta-buttons flex flex-col sm:flex-row items-center justify-center gap-4" data-animate>
                <Link href="/portfolio">
                  <Button variant="accent" size="lg" data-cursor="button">
                    Explore Our Work
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-navy"
                    data-cursor="button"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

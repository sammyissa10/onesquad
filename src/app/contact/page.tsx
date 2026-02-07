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
  MessageSquare,
} from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { siteConfig, services } from "@/lib/constants";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { QUOTE_STORAGE_KEY, type QuoteData } from "@/lib/pricingData";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const serviceOptions = [
  { value: "", label: "Select a service (optional)" },
  ...services.map((s) => ({ value: s.slug, label: s.title })),
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
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone}`,
  },
  {
    icon: Globe,
    label: "Location",
    value: "We work with clients wherever you are",
    href: "#",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "24/7 Support Available",
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

    const subject = encodeURIComponent(
      `New inquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`
    );
    const bodyParts = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : "",
      data.company ? `Company: ${data.company}` : "",
      data.service ? `Service: ${data.service}` : "",
      "",
      `Message:`,
      data.message,
    ].filter(Boolean);
    const body = encodeURIComponent(bodyParts.join("\n"));

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;

    // Clear quote data after submission
    localStorage.removeItem(QUOTE_STORAGE_KEY);
    setQuoteData(null);

    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
  };

  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: "Contact" }]} />
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
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                Contact Us
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
                Let&apos;s Start a <span className="text-secondary">Conversation</span>
              </h1>
              <p className="text-xl text-white/80">
                Have a question or ready to get started? We&apos;d love to hear from
                you. Reach out and let&apos;s discuss how we can help your business
                grow.
              </p>
            </motion.div>
          </Container>
        </Section>

        {/* Contact Form Section */}
        <Section background="white">
          <Container>
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Get in Touch
                </h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form and our team will get back to you within 24
                  hours. Or, reach out directly through any of the channels
                  below.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent transition-colors">
                        <item.icon className="w-5 h-5 text-accent group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="font-medium text-primary group-hover:text-accent transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Quick response badge */}
                <div className="mt-10 p-4 bg-muted rounded-xl">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-semibold text-primary">
                        Quick Response Guaranteed
                      </p>
                      <p className="text-sm text-muted-foreground">
                        We respond to all inquiries within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-3"
              >
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-border">
                  {/* Quote summary card */}
                  {quoteData && !isSubmitted && (
                    <div className="mb-6 p-4 bg-accent/5 rounded-xl border border-accent/20">
                      <h4 className="font-semibold text-accent mb-2">Your Quote Summary</h4>
                      {quoteData.services.map((svc) => (
                        <div key={svc.serviceId} className="flex justify-between text-sm">
                          <span className="text-primary">{svc.serviceName}</span>
                          <span className="font-medium text-primary">${svc.subtotal}</span>
                        </div>
                      ))}
                      <div className="border-t border-accent/20 mt-2 pt-2 flex justify-between font-bold">
                        <span className="text-primary">Total</span>
                        <span className="text-accent">${quoteData.total}</span>
                      </div>
                    </div>
                  )}

                  {isSubmitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-primary mb-4">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground mb-8">
                        Thank you for reaching out. We&apos;ll get back to you within
                        24 hours.
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
                      <div className="grid sm:grid-cols-2 gap-6">
                        <Input
                          label="Your Name *"
                          placeholder="John Doe"
                          error={errors.name?.message}
                          {...register("name")}
                        />
                        <Input
                          label="Email Address *"
                          type="email"
                          placeholder="john@example.com"
                          error={errors.email?.message}
                          {...register("email")}
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <Input
                          label="Phone Number"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          {...register("phone")}
                        />
                        <Input
                          label="Company Name"
                          placeholder="Your Company"
                          {...register("company")}
                        />
                      </div>

                      <Select
                        label="Service Interested In"
                        options={serviceOptions}
                        placeholder="Select a service (optional)"
                        {...register("service")}
                      />

                      <Textarea
                        label="Your Message *"
                        placeholder="Tell us about your project or ask any questions..."
                        rows={5}
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
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>

                      <p className="text-center text-sm text-muted-foreground">
                        By submitting this form, you agree to our{" "}
                        <a href="/privacy" className="text-accent hover:underline">
                          Privacy Policy
                        </a>
                        .
                      </p>
                    </form>
                  )}
                </div>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* CTA Section */}
        <Section background="gradient">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Not Sure Where to Start?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Try our price calculator to get an instant estimate for your project,
                or browse our plans to find the perfect fit for your business.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/pricing-calculator">
                  <Button variant="secondary" size="lg">
                    Price Calculator
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                    View Plans
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

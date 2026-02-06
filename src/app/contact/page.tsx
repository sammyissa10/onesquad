"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Phone,
  MapPin,
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
    icon: MapPin,
    label: "Address",
    value: `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`,
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
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
        <Section background="gradient" className="pt-32">
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
                Let's Start a <span className="text-secondary">Conversation</span>
              </h1>
              <p className="text-xl text-white/80">
                Have a question or ready to get started? We'd love to hear from
                you. Reach out and let's discuss how we can help your business
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
                        Thank you for reaching out. We'll get back to you within
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

        {/* Map placeholder */}
        <Section background="muted" className="py-0">
          <div className="h-96 bg-gradient-to-br from-primary/10 to-highlight/10 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-accent mx-auto mb-4" />
              <p className="text-muted-foreground">
                Interactive map would go here
              </p>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}

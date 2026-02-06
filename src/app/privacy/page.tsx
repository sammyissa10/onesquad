"use client";

import { motion } from "framer-motion";
import { Header, Footer } from "@/components/layout";
import { Container, Section } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: "Privacy Policy" }]} />
      <main>
        {/* Hero */}
        <Section background="gradient" className="pb-16">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Privacy Policy
              </h1>
              <p className="text-white/80">
                Last updated: January 1, 2026
              </p>
            </motion.div>
          </Container>
        </Section>

        {/* Content */}
        <Section background="white">
          <Container size="md">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg max-w-none"
            >
              <h2 className="text-2xl font-bold text-primary mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-6">
                OneSquad ("we," "our," or "us") is committed to protecting your privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard
                your information when you visit our website or use our services.
              </p>

              <h2 className="text-2xl font-bold text-primary mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                We may collect information about you in various ways, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li><strong>Personal Data:</strong> Name, email address, phone number, and company name when you fill out our contact form or subscribe to our newsletter.</li>
                <li><strong>Usage Data:</strong> Information about how you access and use our website, including your IP address, browser type, pages visited, and time spent on pages.</li>
                <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to enhance your experience on our website.</li>
              </ul>

              <h2 className="text-2xl font-bold text-primary mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>Respond to your inquiries and provide customer support</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Analyze usage patterns and trends</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-2xl font-bold text-primary mb-4">4. Sharing Your Information</h2>
              <p className="text-muted-foreground mb-6">
                We do not sell your personal information. We may share your information
                with trusted third-party service providers who assist us in operating our
                website and conducting our business, provided they agree to keep your
                information confidential.
              </p>

              <h2 className="text-2xl font-bold text-primary mb-4">5. Data Security</h2>
              <p className="text-muted-foreground mb-6">
                We implement appropriate technical and organizational security measures
                to protect your personal information. However, no method of transmission
                over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-2xl font-bold text-primary mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>The right to access your personal data</li>
                <li>The right to correct inaccurate data</li>
                <li>The right to request deletion of your data</li>
                <li>The right to opt-out of marketing communications</li>
              </ul>

              <h2 className="text-2xl font-bold text-primary mb-4">7. Contact Us</h2>
              <p className="text-muted-foreground mb-6">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-muted rounded-xl p-6 mb-6">
                <p className="text-primary font-medium">OneSquad</p>
                <p className="text-muted-foreground">Email: hello@onesquads.com</p>
                <p className="text-muted-foreground">Phone: +1 (555) 123-4567</p>
              </div>
            </motion.div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

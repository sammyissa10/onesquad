"use client";

import { motion } from "framer-motion";
import { Header, Footer } from "@/components/layout";
import { Container, Section } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function TermsPage() {
  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: "Terms of Service" }]} />
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
                Terms of Service
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
              <h2 className="text-2xl font-bold text-primary mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground mb-6">
                By accessing or using OneSquad&apos;s website and services, you agree to be
                bound by these Terms of Service. If you do not agree to these terms,
                please do not use our services.
              </p>

              <h2 className="text-2xl font-bold text-primary mb-4">2. Services Description</h2>
              <p className="text-muted-foreground mb-6">
                OneSquad provides digital marketing, web design, hosting, and related
                services to small and medium-sized businesses. Our services are described
                in detail on our pricing page and in individual service agreements.
              </p>

              <h2 className="text-2xl font-bold text-primary mb-4">3. Account Responsibilities</h2>
              <p className="text-muted-foreground mb-4">
                When you engage our services, you are responsible for:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>Providing accurate and complete information</li>
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>Notifying us immediately of any unauthorized use of your account</li>
                <li>Ensuring your use of our services complies with applicable laws</li>
              </ul>

              <h2 className="text-2xl font-bold text-primary mb-4">4. Payment Terms</h2>
              <p className="text-muted-foreground mb-4">
                Our payment terms include:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
                <li>Monthly subscription fees are billed in advance</li>
                <li>Payment is due within 30 days of invoice date</li>
                <li>Late payments may result in service suspension</li>
                <li>All fees are non-refundable unless otherwise specified</li>
              </ul>

              <h2 className="text-2xl font-bold text-primary mb-4">5. Cancellation Policy</h2>
              <p className="text-muted-foreground mb-6">
                You may cancel your subscription at any time with 30 days written notice.
                Cancellation will be effective at the end of your current billing period.
                We do not provide refunds for partial months of service.
              </p>

              <h2 className="text-2xl font-bold text-primary mb-4">6. Intellectual Property</h2>
              <p className="text-muted-foreground mb-6">
                Upon full payment, you own all custom work created specifically for your
                business, including website designs, content, and graphics. OneSquad
                retains ownership of any pre-existing tools, templates, or proprietary
                systems used in delivering services.
              </p>

              <h2 className="text-2xl font-bold text-primary mb-4">7. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-6">
                OneSquad shall not be liable for any indirect, incidental, special,
                consequential, or punitive damages resulting from your use of our
                services. Our total liability shall not exceed the amount paid by you
                for services in the preceding 12 months.
              </p>

              <h2 className="text-2xl font-bold text-primary mb-4">8. Modifications</h2>
              <p className="text-muted-foreground mb-6">
                We reserve the right to modify these Terms of Service at any time.
                We will notify you of any material changes via email or through our
                website. Continued use of our services after changes constitutes
                acceptance of the modified terms.
              </p>

              <h2 className="text-2xl font-bold text-primary mb-4">9. Contact Information</h2>
              <p className="text-muted-foreground mb-6">
                For questions about these Terms of Service, please contact us:
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

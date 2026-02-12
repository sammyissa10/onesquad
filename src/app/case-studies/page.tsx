"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp, Users, Globe, ShoppingCart } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
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

const caseStudies = [
  {
    id: "bloom-boutique",
    title: "Bloom Boutique",
    subtitle: "E-commerce Transformation",
    description:
      "A local flower shop struggling with a dated Wix site came to us wanting to sell arrangements online. We built a custom Shopify store with local delivery integration, ran targeted Instagram ads, and optimized their Google Business Profile. Within 6 months, online orders became their primary revenue channel.",
    industry: "Retail / E-commerce",
    services: ["Web Design", "E-commerce", "SEO", "Social Media"],
    results: [
      { label: "Online Revenue", value: "+340%" },
      { label: "Monthly Orders", value: "1,200+" },
      { label: "Organic Traffic", value: "+180%" },
    ],
    icon: ShoppingCart,
  },
  {
    id: "techstart-solutions",
    title: "TechStart Solutions",
    subtitle: "B2B Lead Generation",
    description:
      "A SaaS startup burning $8K/month on unfocused Google Ads with almost no qualified leads. We rebuilt their landing pages, restructured ad campaigns around buyer intent keywords, and launched a content funnel with gated whitepapers. Cost per qualified lead dropped 45% while volume tripled.",
    industry: "Technology / B2B",
    services: ["SEO", "PPC", "Content Marketing", "Email Marketing"],
    results: [
      { label: "Qualified Leads", value: "500+" },
      { label: "Cost Per Lead", value: "-45%" },
      { label: "Google Rankings", value: "Top 3" },
    ],
    icon: TrendingUp,
  },
  {
    id: "green-living",
    title: "Green Living Co.",
    subtitle: "Brand Identity & Growth",
    description:
      "An eco-friendly home goods brand with great products but zero online presence. We designed a brand identity from scratch, built their website, and created a content-driven social media strategy focused on sustainability education. Their Instagram became a genuine community hub.",
    industry: "Sustainability / Lifestyle",
    services: ["Web Design", "Social Media", "Content Marketing"],
    results: [
      { label: "Social Following", value: "2x" },
      { label: "Engagement Rate", value: "+220%" },
      { label: "Brand Awareness", value: "+150%" },
    ],
    icon: Users,
  },
  {
    id: "metro-dental",
    title: "Metro Dental Group",
    subtitle: "Local SEO Dominance",
    description:
      "A multi-location dental practice invisible in local search results despite great patient reviews. We optimized all Google Business Profiles, fixed NAP inconsistencies across 40+ directories, built location-specific landing pages, and implemented a review generation system. They now own the top 3 spots for every target keyword in their city.",
    industry: "Healthcare / Dental",
    services: ["Local SEO", "Web Design", "PPC", "Reputation Management"],
    results: [
      { label: "New Patients/Mo", value: "80+" },
      { label: "Google Rankings", value: "#1" },
      { label: "Review Score", value: "4.9★" },
    ],
    icon: Globe,
  },
];

function CaseStudyCard({ study }: { study: typeof caseStudies[0] }) {
  return (
    <motion.div variants={itemVariants} whileHover={{ y: -8 }} className="group">
      <div
        className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
      >
        {/* Image Placeholder */}
        <div
          className="h-48 bg-gradient-to-br from-primary/10 to-highlight/10 flex items-center justify-center relative overflow-hidden"
        >
          <study.icon
            className="w-16 h-16 text-primary/20 group-hover:scale-110 transition-transform"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="accent">{study.industry}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-primary mb-1">{study.title}</h3>
          <p className="text-accent font-medium text-sm mb-3">{study.subtitle}</p>
          <p className="text-muted-foreground text-sm mb-4 flex-1">
            {study.description}
          </p>

          {/* Services */}
          <div className="flex flex-wrap gap-2 mb-4">
            {study.services.slice(0, 3).map((service) => (
              <span
                key={service}
                className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground"
              >
                {service}
              </span>
            ))}
            {study.services.length > 3 && (
              <span className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                +{study.services.length - 3}
              </span>
            )}
          </div>

          {/* Results */}
          <div className="grid grid-cols-3 gap-2 p-4 bg-muted rounded-xl mb-4">
            {study.results.map((result) => (
              <div key={result.label} className="text-center">
                <div className="text-lg font-bold text-accent">{result.value}</div>
                <div className="text-xs text-muted-foreground">{result.label}</div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-accent font-medium text-sm hover:gap-3 transition-all"
          >
            Get Similar Results <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function CaseStudiesPage() {
  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={[{ label: "Case Studies" }]} />
        {/* Hero */}
        <Section background="gradient">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                Case Studies
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
                Real Results for{" "}
                <span className="text-secondary">Real Businesses</span>
              </h1>
              <p className="text-xl text-white/80">
                See how we've helped businesses like yours achieve measurable
                growth through strategic digital solutions.
              </p>
            </motion.div>
          </Container>
        </Section>

        {/* Case Studies Grid */}
        <Section background="muted">
          <Container>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-8"
            >
              {caseStudies.map((study) => (
                <CaseStudyCard key={study.id} study={study} />
              ))}
            </motion.div>
          </Container>
        </Section>

        {/* CTA */}
        <Section background="white">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Ready to Be Our Next Success Story?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Let's discuss how we can help your business achieve similar
                results.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <Button variant="accent" size="lg">
                    Start Your Project
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button variant="outline" size="lg">
                    View Pricing
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

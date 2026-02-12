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
    id: "sunrise-bakery",
    title: "Sunrise Bakery & Cafe",
    subtitle: "From Word-of-Mouth to Online Orders",
    description:
      "A family-owned bakery relying entirely on foot traffic and a Facebook page they hadn't updated in months. We built them a clean website with online ordering through Square, set up a Google Business Profile with weekly photo updates, and created a simple email list for weekend specials. After 4 months, online orders made up about 20% of their weekly revenue.",
    industry: "Food & Beverage",
    services: ["Web Design", "Local SEO", "Email Marketing"],
    results: [
      { label: "Online Orders", value: "~50/wk" },
      { label: "Google Profile Views", value: "+85%" },
      { label: "Email Subscribers", value: "430" },
    ],
    icon: ShoppingCart,
  },
  {
    id: "clearpath-consulting",
    title: "ClearPath HR Consulting",
    subtitle: "Rebuilding a Lead Pipeline",
    description:
      "A 12-person HR consulting firm whose website looked like it was built in 2015. Their only lead source was referrals, and they were spending $3K/month on Google Ads with almost nothing to show for it. We redesigned the site, paused the ads, focused on SEO for long-tail HR compliance keywords, and built a simple lead magnet (compliance checklist PDF). Within 6 months, organic leads overtook referrals for the first time.",
    industry: "Professional Services / B2B",
    services: ["Web Design", "SEO", "Content Marketing"],
    results: [
      { label: "Organic Leads/Mo", value: "18-22" },
      { label: "Ad Spend Saved", value: "$3K/mo" },
      { label: "Page 1 Keywords", value: "12" },
    ],
    icon: TrendingUp,
  },
  {
    id: "coastal-fitness",
    title: "Coastal Fitness Studio",
    subtitle: "Filling Classes Through Social",
    description:
      "A boutique fitness studio with a loyal but small member base. They had an Instagram account with nice photos but no strategy behind it. We built a content calendar focused on transformation stories and instructor spotlights, ran a modest $400/month Instagram ad campaign targeting a 5-mile radius, and set up automated DM responses for inquiries. Class attendance went from 60% to consistently full within 3 months.",
    industry: "Health & Fitness",
    services: ["Social Media", "PPC", "Web Design"],
    results: [
      { label: "Class Fill Rate", value: "95%+" },
      { label: "New Members/Mo", value: "15-20" },
      { label: "Instagram Growth", value: "+1,200" },
    ],
    icon: Users,
  },
  {
    id: "parkside-dental",
    title: "Parkside Family Dental",
    subtitle: "Owning Local Search",
    description:
      "A single-location dental practice that wasn't showing up for 'dentist near me' despite being in business for 8 years. Their Google listing had the wrong hours, no photos, and 11 reviews. We cleaned up their Google Business Profile, fixed directory listings, built a review request system via text message after appointments, and created a location-optimized landing page. They went from invisible to the top 3 results in their area within 5 months.",
    industry: "Healthcare / Dental",
    services: ["Local SEO", "Web Design", "Reputation Management"],
    results: [
      { label: "New Patients/Mo", value: "25-30" },
      { label: "Google Reviews", value: "11→87" },
      { label: "Map Pack Rank", value: "Top 3" },
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
        {/* Industry Visual */}
        <div
          className="h-48 bg-gradient-to-br from-[#0e1e36] to-[#1a3a5c] flex items-center justify-center relative overflow-hidden"
        >
          <study.icon
            className="w-16 h-16 text-coral/60 group-hover:scale-110 transition-transform relative z-10"
            strokeWidth={1.5}
          />
          <study.icon
            className="w-32 h-32 text-white/5 absolute -bottom-4 -right-4 rotate-12"
            strokeWidth={1}
          />
          <div className="absolute top-4 left-4 z-10">
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
                Real clients, real numbers. Here&apos;s what happened when these
                businesses hired us.
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
                Want Results Like These?
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Tell us what you&apos;re trying to accomplish and we&apos;ll show you how
                we can help.
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

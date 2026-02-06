"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Linkedin, Twitter, Mail } from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
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

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "10+ years in digital marketing. Former agency director at a Fortune 500 company. Passionate about helping SMBs compete with enterprise brands.",
    specialties: ["Strategy", "Business Development", "Leadership"],
    image: "/team/alex.jpg",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "alex@onesquads.com",
    },
  },
  {
    name: "Sarah Mitchell",
    role: "Head of SEO",
    bio: "SEO specialist with a track record of ranking 200+ websites on page one. Google-certified with expertise in technical SEO and content strategy.",
    specialties: ["Technical SEO", "Content Strategy", "Analytics"],
    image: "/team/sarah.jpg",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "sarah@onesquads.com",
    },
  },
  {
    name: "James Chen",
    role: "Lead Web Developer",
    bio: "Full-stack developer specializing in modern web technologies. Has built 100+ websites ranging from simple portfolios to complex e-commerce platforms.",
    specialties: ["React", "Next.js", "E-commerce"],
    image: "/team/james.jpg",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "james@onesquads.com",
    },
  },
  {
    name: "Emily Rodriguez",
    role: "Social Media Manager",
    bio: "Creative strategist who has managed social accounts with 500K+ combined followers. Expert at turning engagement into conversions.",
    specialties: ["Content Creation", "Community Management", "Paid Social"],
    image: "/team/emily.jpg",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "emily@onesquads.com",
    },
  },
  {
    name: "Michael Torres",
    role: "PPC Specialist",
    bio: "Google Ads certified professional who has managed $2M+ in ad spend. Obsessed with optimizing campaigns for maximum ROI.",
    specialties: ["Google Ads", "Meta Ads", "Conversion Tracking"],
    image: "/team/michael.jpg",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "michael@onesquads.com",
    },
  },
  {
    name: "Lisa Park",
    role: "UX/UI Designer",
    bio: "Award-winning designer with a background in psychology. Creates user experiences that are both beautiful and conversion-focused.",
    specialties: ["UI Design", "UX Research", "Prototyping"],
    image: "/team/lisa.jpg",
    socials: {
      linkedin: "#",
      twitter: "#",
      email: "lisa@onesquads.com",
    },
  },
];

const values = [
  {
    title: "Partnership First",
    description: "Your success is our success. We're invested in long-term relationships, not quick transactions.",
  },
  {
    title: "Transparent Always",
    description: "No hidden fees, no jargon, no black boxes. You'll always know exactly what we're doing and why.",
  },
  {
    title: "Results Driven",
    description: "We measure our work by your outcomes. If it doesn't move the needle, we don't do it.",
  },
  {
    title: "Continuously Learning",
    description: "Digital never stops evolving. Neither do we. We stay ahead so you don't fall behind.",
  },
];

function TeamMemberCard({ member }: { member: typeof teamMembers[0] }) {
  return (
    <motion.div variants={itemVariants} whileHover={{ y: -8 }} className="group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
        {/* Avatar Placeholder */}
        <div className="h-48 bg-gradient-to-br from-primary to-highlight flex items-center justify-center">
          <span className="text-6xl font-bold text-white/30">
            {member.name.split(" ").map((n) => n[0]).join("")}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
          <p className="text-accent font-medium text-sm mb-4">{member.role}</p>
          <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2 mb-4">
            {member.specialties.map((specialty) => (
              <span
                key={specialty}
                className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground"
              >
                {specialty}
              </span>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            <a
              href={member.socials.linkedin}
              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-white transition-colors"
              aria-label={`${member.name}'s LinkedIn`}
            >
              <Linkedin size={16} />
            </a>
            <a
              href={member.socials.twitter}
              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-white transition-colors"
              aria-label={`${member.name}'s Twitter`}
            >
              <Twitter size={16} />
            </a>
            <a
              href={`mailto:${member.socials.email}`}
              className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-white transition-colors"
              aria-label={`Email ${member.name}`}
            >
              <Mail size={16} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TeamPage() {
  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: "Our Team" }]} />
      <main>
        {/* Hero */}
        <Section background="gradient" className="pt-32">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                Our Team
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
                Meet the <span className="text-secondary">Squad</span>
              </h1>
              <p className="text-xl text-white/80">
                A team of digital experts passionate about helping small
                businesses succeed online. Together, we bring decades of
                experience across every aspect of digital marketing.
              </p>
            </motion.div>
          </Container>
        </Section>

        {/* Team Grid */}
        <Section background="muted">
          <Container>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {teamMembers.map((member) => (
                <TeamMemberCard key={member.name} member={member} />
              ))}
            </motion.div>
          </Container>
        </Section>

        {/* Values */}
        <Section background="white">
          <Container>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.div variants={itemVariants} className="text-center mb-12">
                <span className="text-accent font-semibold text-sm uppercase tracking-wider">
                  Our Values
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-primary mt-4">
                  What Drives Us Every Day
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    variants={itemVariants}
                    className="text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Container>
        </Section>

        {/* Join CTA */}
        <Section background="gradient">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Want to Join the Squad?
              </h2>
              <p className="text-white/80 text-lg mb-8">
                We're always looking for talented individuals who share our
                passion for digital excellence.
              </p>
              <Link href="/contact">
                <Button variant="secondary" size="lg" className="text-primary">
                  Get in Touch
                </Button>
              </Link>
            </motion.div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

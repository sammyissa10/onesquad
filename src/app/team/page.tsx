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
    bio: "Started OneSquad after getting tired of seeing small businesses getting sold overpriced junk by agencies. Spent a decade running marketing at a Fortune 500 before deciding to do this instead.",
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
    bio: "Helped over 200 websites hit page one of Google. Used to work at an agency where clients never got straight answers — now I explain SEO like a normal person.",
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
    bio: "Built over 100 websites in the last 8 years — everything from simple landing pages to full online stores. I write code that works and doesn&apos;t break when you look at it wrong.",
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
    bio: "Managed accounts with over 500K followers total. I create posts that people actually want to see, not the boring corporate stuff that gets ignored.",
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
    bio: "Managed over $2M in ad spend without wasting a dime. I run campaigns like it&apos;s my own money on the line, because honestly that&apos;s how it should be done.",
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
    bio: "Psychology degree, design career. I figure out why people click what they click, then design sites that guide them exactly where you want them to go.",
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
    title: "No Contracts",
    description: "Month-to-month. If we&apos;re not earning your business every month, you shouldn&apos;t be stuck with us.",
  },
  {
    title: "Plain English",
    description: "We don&apos;t hide behind jargon. If you can&apos;t understand what we&apos;re doing, we&apos;re doing it wrong.",
  },
  {
    title: "Your Budget Matters",
    description: "We treat your money like it&apos;s ours. No upsells, no bloated proposals, no wasting budget on vanity metrics.",
  },
  {
    title: "We Pick Up",
    description: "Email, text, call — you&apos;ll reach a real person who knows your account. No ticket queues.",
  },
];

function TeamMemberCard({ member }: { member: typeof teamMembers[0] }) {
  return (
    <motion.div variants={itemVariants} whileHover={{ y: -8 }} className="group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
        {/* Avatar Placeholder */}
        <div className="h-48 bg-gradient-to-br from-[#0e1e36] to-[#1a3a5c] flex items-center justify-center relative overflow-hidden">
          <span className="text-6xl font-bold text-white/20 relative z-10 group-hover:text-coral/40 transition-colors duration-300">
            {member.name.split(" ").map((n) => n[0]).join("")}
          </span>
          <div className="absolute inset-0 bg-gradient-to-t from-coral/10 to-transparent" />
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
      <main>
        <Breadcrumb items={[{ label: "Our Team" }]} />
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
                Our Team
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
                Meet the <span className="text-secondary">Squad</span>
              </h1>
              <p className="text-xl text-white/80">
                Six people who left bigger agencies because we were tired of
                selling small businesses things they didn&apos;t need. Now we just
                build good websites and run marketing that works.
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
                We&apos;re always looking for people who know their stuff and don&apos;t
                talk like a LinkedIn post.
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

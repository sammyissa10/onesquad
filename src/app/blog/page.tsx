"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";
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

const blogPosts = [
  {
    id: "seo-trends-2026",
    title: "SEO Trends You Can't Ignore in 2026",
    excerpt:
      "From AI-powered search to voice optimization, discover the SEO strategies that will dominate this year and how to stay ahead of the curve.",
    category: "SEO",
    author: "Sarah Mitchell",
    date: "January 15, 2026",
    readTime: "8 min read",
    featured: true,
  },
  {
    id: "small-business-website-guide",
    title: "The Ultimate Small Business Website Guide",
    excerpt:
      "Everything you need to know about building a website that converts visitors into customers. From design principles to must-have features.",
    category: "Web Design",
    author: "James Chen",
    date: "January 10, 2026",
    readTime: "12 min read",
    featured: true,
  },
  {
    id: "social-media-roi",
    title: "How to Measure Social Media ROI (The Right Way)",
    excerpt:
      "Stop guessing and start measuring. Learn the metrics that actually matter and how to calculate your true return on social media investment.",
    category: "Social Media",
    author: "Emily Rodriguez",
    date: "January 5, 2026",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: "email-marketing-automation",
    title: "Email Marketing Automation: A Beginner's Guide",
    excerpt:
      "Set up your first email automation sequence in under an hour. We break down the process step by step with real examples.",
    category: "Email Marketing",
    author: "Michael Torres",
    date: "December 28, 2025",
    readTime: "10 min read",
    featured: false,
  },
  {
    id: "ppc-budget-optimization",
    title: "How to Get More From Your PPC Budget",
    excerpt:
      "Maximize every dollar you spend on ads. Discover proven optimization techniques that can reduce your cost per click by up to 40%.",
    category: "PPC",
    author: "Sarah Mitchell",
    date: "December 20, 2025",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: "content-marketing-strategy",
    title: "Building a Content Strategy That Actually Works",
    excerpt:
      "Content is king, but only if you have a strategy. Learn how to plan, create, and distribute content that drives real business results.",
    category: "Content Marketing",
    author: "James Chen",
    date: "December 15, 2025",
    readTime: "9 min read",
    featured: false,
  },
];

const categories = [
  "All",
  "SEO",
  "Web Design",
  "Social Media",
  "Email Marketing",
  "PPC",
  "Content Marketing",
];

function BlogCard({ post, featured = false }: { post: typeof blogPosts[0]; featured?: boolean }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8 }}
      className={`group ${featured ? "md:col-span-2" : ""}`}
    >
      <div
        className={`bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex ${
          featured ? "md:flex-row" : "flex-col"
        }`}
      >
        {/* Image Placeholder */}
        <div
          className={`bg-gradient-to-br from-primary/10 to-highlight/10 flex items-center justify-center ${
            featured ? "md:w-1/2 h-48 md:h-auto" : "h-48"
          }`}
        >
          <div className="text-6xl">📝</div>
        </div>

        {/* Content */}
        <div className={`p-6 flex flex-col ${featured ? "md:w-1/2" : ""}`}>
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="accent">{post.category}</Badge>
            {post.featured && <Badge variant="secondary">Featured</Badge>}
          </div>

          <h3
            className={`font-bold text-primary mb-3 group-hover:text-accent transition-colors ${
              featured ? "text-2xl" : "text-xl"
            }`}
          >
            {post.title}
          </h3>

          <p className="text-muted-foreground text-sm mb-4 flex-1">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* CTA */}
          <span className="inline-flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all cursor-pointer">
            Read Article <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((p) => p.featured);
  const regularPosts = blogPosts.filter((p) => !p.featured);

  return (
    <>
      <Header />
      <Breadcrumb items={[{ label: "Blog" }]} />
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
                Blog & Resources
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
                Digital Marketing{" "}
                <span className="text-secondary">Insights</span>
              </h1>
              <p className="text-xl text-white/80">
                Expert tips, industry trends, and actionable strategies to help
                your business thrive online.
              </p>
            </motion.div>
          </Container>
        </Section>

        {/* Category Filter */}
        <Section background="white" className="py-8">
          <Container>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === "All"
                      ? "bg-accent text-white"
                      : "bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </Container>
        </Section>

        {/* Featured Posts */}
        <Section background="muted">
          <Container>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2
                variants={itemVariants}
                className="text-2xl font-bold text-primary mb-8"
              >
                Featured Articles
              </motion.h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} featured />
                ))}
              </div>
            </motion.div>
          </Container>
        </Section>

        {/* Regular Posts */}
        <Section background="white">
          <Container>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2
                variants={itemVariants}
                className="text-2xl font-bold text-primary mb-8"
              >
                Latest Articles
              </motion.h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>

              {/* Load More */}
              <motion.div variants={itemVariants} className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Articles
                </Button>
              </motion.div>
            </motion.div>
          </Container>
        </Section>

        {/* Newsletter CTA */}
        <Section background="gradient">
          <Container size="md">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Get Marketing Tips in Your Inbox
              </h2>
              <p className="text-white/80 text-lg mb-8">
                Join 5,000+ business owners who receive weekly digital marketing
                insights.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                <Button variant="secondary" className="text-primary">
                  Subscribe
                </Button>
              </form>
              <p className="text-white/60 text-sm mt-4">
                No spam, unsubscribe anytime.
              </p>
            </motion.div>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}

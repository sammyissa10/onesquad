"use client";

import { motion } from "framer-motion";
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
    id: "google-ai-overviews-impact",
    title: "Google AI Overviews Impact On Publishers & How To Adapt Into 2026",
    excerpt:
      "Zero-click searches increased from 56% to 69% between 2024 and 2025. Learn how AI Overviews are reshaping organic search and what publishers need to do to maintain visibility.",
    category: "SEO",
    author: "Search Engine Journal",
    date: "January 15, 2026",
    readTime: "12 min read",
    featured: true,
    url: "https://www.searchenginejournal.com/impact-of-ai-overviews-how-publishers-need-to-adapt/556843/",
  },
  {
    id: "homepage-design-principles",
    title: "Homepage Design: 5 Fundamental Principles",
    excerpt:
      "Your homepage has seconds to communicate what users can do and why they should care. These five durable principles ensure easy access, clear value, and simplicity that converts.",
    category: "Web Design",
    author: "Nielsen Norman Group",
    date: "January 8, 2026",
    readTime: "10 min read",
    featured: true,
    url: "https://www.nngroup.com/articles/homepage-design-principles/",
  },
  {
    id: "social-media-marketing-strategy",
    title: "Social Media Marketing: What It Is and How to Build Your Strategy",
    excerpt:
      "Consumers want human-generated content, not AI slop. A complete guide to building a social media strategy that drives real engagement and revenue for your business.",
    category: "Social Media",
    author: "Sprout Social",
    date: "December 28, 2025",
    readTime: "15 min read",
    featured: false,
    url: "https://sproutsocial.com/insights/social-media-marketing-strategy/",
  },
  {
    id: "email-marketing-automation-guide",
    title: "What Is Email Marketing Automation? A Beginner's Guide",
    excerpt:
      "From welcome series to win-back campaigns, learn how to use predefined rules to trigger personalized email messages that save time and drive repeat purchases.",
    category: "Email Marketing",
    author: "Mailchimp",
    date: "December 15, 2025",
    readTime: "8 min read",
    featured: false,
    url: "https://mailchimp.com/marketing-glossary/email-automation/",
  },
  {
    id: "google-ads-small-business-guide",
    title: "The Complete Survival Guide to Google Ads for Small Business",
    excerpt:
      "Small budgets can absolutely compete with big spenders — you just have to know where to look. A practical guide to running Google Ads without wasting money.",
    category: "PPC",
    author: "WordStream",
    date: "December 5, 2025",
    readTime: "11 min read",
    featured: false,
    url: "https://www.wordstream.com/blog/ws/2022/01/19/google-ads-for-small-businesses",
  },
  {
    id: "content-marketing-roi-measurement",
    title: "How To Settle the Content ROI Question",
    excerpt:
      "56% of B2B marketers struggle to attribute ROI to content efforts. Here's a practical framework for measuring what content marketing actually delivers to your business.",
    category: "Content Marketing",
    author: "Content Marketing Institute",
    date: "November 28, 2025",
    readTime: "9 min read",
    featured: false,
    url: "https://contentmarketinginstitute.com/analytics-data/prove-content-roi",
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
      <a
        href={post.url}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-card rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col block"
      >
        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="accent">{post.category}</Badge>
            {post.featured && <Badge variant="secondary">Featured</Badge>}
          </div>

          <h3
            className={`font-bold text-foreground mb-3 group-hover:text-accent transition-colors ${
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
          <span className="inline-flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all">
            Read Article <ArrowRight size={16} />
          </span>
        </div>
      </a>
    </motion.div>
  );
}

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((p) => p.featured);
  const regularPosts = blogPosts.filter((p) => !p.featured);

  return (
    <>
      <Header />
      <main>
        <Breadcrumb items={[{ label: "Blog" }]} />
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
                Blog & Resources
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
                Digital Marketing{" "}
                <span className="text-secondary">Insights</span>
              </h1>
              <p className="text-xl text-white/80">
                Real articles about what&apos;s changing in SEO, social media, and
                web design. No fluff, no AI slop.
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
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
                Get Updates When We Publish
              </h2>
              <p className="text-white/80 text-lg mb-8">
                One email a week with new articles and what&apos;s actually changing
                in digital marketing. Unsubscribe anytime.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg border-0 bg-white dark:bg-white/10 text-foreground dark:text-white placeholder:text-muted-foreground dark:placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-secondary"
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

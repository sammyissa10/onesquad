"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Eye, Star } from "lucide-react";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

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

const categories = [
  { id: "all", label: "All Templates" },
  { id: "business", label: "Business" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "portfolio", label: "Portfolio" },
  { id: "restaurant", label: "Restaurant" },
  { id: "healthcare", label: "Healthcare" },
];

const templates = [
  {
    id: "modern-agency",
    name: "Modern Agency",
    category: "business",
    description: "Clean and professional template for digital agencies and consultants.",
    features: ["Responsive", "Fast Loading", "SEO Ready"],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
    popular: true,
    price: "Included",
  },
  {
    id: "shop-starter",
    name: "Shop Starter",
    category: "ecommerce",
    description: "Complete e-commerce solution with cart, checkout, and product pages.",
    features: ["Shopping Cart", "Payment Ready", "Inventory"],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
    popular: true,
    price: "Included",
  },
  {
    id: "creative-portfolio",
    name: "Creative Portfolio",
    category: "portfolio",
    description: "Showcase your work beautifully with this stunning portfolio template.",
    features: ["Gallery", "Animations", "Contact Form"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&h=400&fit=crop",
    popular: false,
    price: "Included",
  },
  {
    id: "tasty-bites",
    name: "Tasty Bites",
    category: "restaurant",
    description: "Perfect for restaurants, cafes, and food businesses.",
    features: ["Menu Display", "Reservations", "Gallery"],
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop",
    popular: false,
    price: "Included",
  },
  {
    id: "health-first",
    name: "Health First",
    category: "healthcare",
    description: "Professional template for clinics, doctors, and healthcare providers.",
    features: ["Appointments", "Services", "Team"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
    popular: true,
    price: "Included",
  },
  {
    id: "startup-launch",
    name: "Startup Launch",
    category: "business",
    description: "Modern landing page perfect for SaaS and tech startups.",
    features: ["Hero Section", "Pricing", "Testimonials"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    popular: false,
    price: "Included",
  },
  {
    id: "boutique-store",
    name: "Boutique Store",
    category: "ecommerce",
    description: "Elegant online store for fashion, jewelry, and lifestyle brands.",
    features: ["Lookbook", "Quick View", "Wishlist"],
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop",
    popular: false,
    price: "Included",
  },
  {
    id: "minimal-folio",
    name: "Minimal Folio",
    category: "portfolio",
    description: "Minimalist design that lets your work speak for itself.",
    features: ["Fullscreen", "Lightbox", "Blog"],
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&h=400&fit=crop",
    popular: false,
    price: "Included",
  },
];

function TemplateCard({ template }: { template: typeof templates[0] }) {
  return (
    <Link href={`/templates/${template.id}`}>
      <motion.div
        variants={itemVariants}
        whileHover={{ y: -8 }}
        className="group h-full"
      >
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
        {/* Template Preview */}
        <div className="h-48 relative overflow-hidden">
          <Image
            src={template.image}
            alt={template.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2 z-10">
            {template.popular && (
              <Badge variant="secondary" className="flex items-center gap-1 shadow-lg">
                <Star size={12} className="fill-current" /> Popular
              </Badge>
            )}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <Link
              href={`/templates/${template.id}`}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors"
            >
              <Eye size={18} />
            </Link>
            <Link
              href={`/templates/${template.id}`}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary hover:bg-accent hover:text-white transition-colors"
            >
              <ExternalLink size={18} />
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-primary group-hover:text-accent transition-colors">
              {template.name}
            </h3>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
              {template.price}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mb-4 flex-1">
            {template.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {template.features.map((feature) => (
              <span
                key={feature}
                className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
    </Link>
  );
}

export function TemplateShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const filteredTemplates =
    activeCategory === "all"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  return (
    <Section id="templates" background="muted">
      <Container>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <span className="text-accent font-semibold text-sm uppercase tracking-wider">
              Templates
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mt-4 mb-6">
              Professional Templates{" "}
              <span className="text-accent">Included Free</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose from our collection of professionally designed templates.
              All templates are fully customizable and included with every plan.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-accent text-white shadow-lg shadow-accent/30"
                    : "bg-white text-muted-foreground hover:bg-accent/10 hover:text-accent"
                }`}
              >
                {category.label}
              </button>
            ))}
          </motion.div>

          {/* Templates Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {filteredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* CTA */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for?
            </p>
            <Link href="/contact">
              <Button variant="accent" rightIcon={<ArrowRight size={18} />}>
                Request Custom Design
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

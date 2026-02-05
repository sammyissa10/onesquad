"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  Star,
  Smartphone,
  Monitor,
  Tablet,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { notFound } from "next/navigation";

// Template data - same as in TemplateShowcase
const templates = [
  {
    id: "modern-agency",
    name: "Modern Agency",
    category: "business",
    description: "Clean and professional template for digital agencies and consultants.",
    longDescription: "The Modern Agency template is designed for forward-thinking digital agencies, marketing firms, and consultants who want to make a strong first impression. With its clean lines, bold typography, and strategic use of whitespace, this template communicates professionalism and creativity in equal measure.",
    features: ["Responsive Design", "Fast Loading", "SEO Ready", "Contact Forms", "Portfolio Gallery", "Team Section"],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop",
    ],
    popular: true,
    price: "Included",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    pages: ["Home", "About", "Services", "Portfolio", "Team", "Contact"],
  },
  {
    id: "shop-starter",
    name: "Shop Starter",
    category: "ecommerce",
    description: "Complete e-commerce solution with cart, checkout, and product pages.",
    longDescription: "Shop Starter is your all-in-one e-commerce solution, perfect for businesses ready to sell online. From product catalogs to secure checkout, this template has everything you need to launch a successful online store.",
    features: ["Shopping Cart", "Payment Ready", "Inventory Management", "Product Filters", "Wishlist", "Order Tracking"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop",
    ],
    popular: true,
    price: "Included",
    techStack: ["Next.js", "Stripe", "Tailwind CSS"],
    pages: ["Home", "Shop", "Product Detail", "Cart", "Checkout", "Account"],
  },
  {
    id: "creative-portfolio",
    name: "Creative Portfolio",
    category: "portfolio",
    description: "Showcase your work beautifully with this stunning portfolio template.",
    longDescription: "Creative Portfolio is designed for artists, designers, photographers, and creatives who want their work to take center stage. With stunning galleries, smooth animations, and a minimalist aesthetic, your portfolio will leave a lasting impression.",
    features: ["Image Gallery", "Smooth Animations", "Contact Form", "Project Details", "Lightbox View", "Blog Section"],
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
    ],
    popular: false,
    price: "Included",
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS"],
    pages: ["Home", "Portfolio", "About", "Services", "Blog", "Contact"],
  },
  {
    id: "tasty-bites",
    name: "Tasty Bites",
    category: "restaurant",
    description: "Perfect for restaurants, cafes, and food businesses.",
    longDescription: "Tasty Bites brings the warmth and flavor of your restaurant to the digital world. With beautiful food photography sections, easy-to-read menus, and integrated reservation systems, your customers can discover and book their next meal with ease.",
    features: ["Menu Display", "Online Reservations", "Photo Gallery", "Location Map", "Opening Hours", "Special Offers"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&h=400&fit=crop",
    ],
    popular: false,
    price: "Included",
    techStack: ["Next.js", "Tailwind CSS", "Google Maps"],
    pages: ["Home", "Menu", "About", "Gallery", "Reservations", "Contact"],
  },
  {
    id: "health-first",
    name: "Health First",
    category: "healthcare",
    description: "Professional template for clinics, doctors, and healthcare providers.",
    longDescription: "Health First is tailored for medical professionals, clinics, and healthcare providers who need to establish trust and credibility online. With clean design, appointment booking features, and easy-to-navigate service pages, patients can find the care they need.",
    features: ["Appointment Booking", "Services Overview", "Doctor Profiles", "Patient Portal", "Insurance Info", "Blog/Resources"],
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop",
    ],
    popular: true,
    price: "Included",
    techStack: ["Next.js", "Tailwind CSS", "Calendly"],
    pages: ["Home", "Services", "Doctors", "Appointments", "Blog", "Contact"],
  },
  {
    id: "startup-launch",
    name: "Startup Launch",
    category: "business",
    description: "Modern landing page perfect for SaaS and tech startups.",
    longDescription: "Startup Launch is built for ambitious tech startups and SaaS companies looking to make a splash. With conversion-optimized layouts, feature showcases, pricing tables, and testimonial sections, this template helps you turn visitors into customers.",
    features: ["Hero Section", "Feature Showcase", "Pricing Tables", "Testimonials", "FAQ Section", "Newsletter Signup"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=600&h=400&fit=crop",
    ],
    popular: false,
    price: "Included",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    pages: ["Home", "Features", "Pricing", "About", "Blog", "Contact"],
  },
  {
    id: "boutique-store",
    name: "Boutique Store",
    category: "ecommerce",
    description: "Elegant online store for fashion, jewelry, and lifestyle brands.",
    longDescription: "Boutique Store is crafted for fashion brands, jewelry designers, and lifestyle businesses that value aesthetics. With elegant product displays, lookbook features, and a sophisticated checkout experience, your brand will shine.",
    features: ["Lookbook Galleries", "Quick View", "Wishlist", "Size Guides", "Related Products", "Customer Reviews"],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop",
    ],
    popular: false,
    price: "Included",
    techStack: ["Next.js", "Stripe", "Tailwind CSS"],
    pages: ["Home", "Shop", "Lookbook", "About", "Blog", "Contact"],
  },
  {
    id: "minimal-folio",
    name: "Minimal Folio",
    category: "portfolio",
    description: "Minimalist design that lets your work speak for itself.",
    longDescription: "Minimal Folio embraces the power of simplicity. With a clean, distraction-free design, this template puts your work front and center. Perfect for photographers, designers, and artists who believe less is more.",
    features: ["Fullscreen Gallery", "Lightbox View", "Blog Section", "About Page", "Contact Form", "Social Links"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=600&h=400&fit=crop",
    ],
    popular: false,
    price: "Included",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    pages: ["Home", "Portfolio", "About", "Blog", "Contact"],
  },
];

const categoryLabels: Record<string, string> = {
  business: "Business",
  ecommerce: "E-commerce",
  portfolio: "Portfolio",
  restaurant: "Restaurant",
  healthcare: "Healthcare",
};

export default function TemplatePage() {
  const params = useParams();
  const slug = params.slug as string;

  const template = templates.find((t) => t.id === slug);

  if (!template) {
    notFound();
  }

  const relatedTemplates = templates
    .filter((t) => t.category === template.category && t.id !== template.id)
    .slice(0, 3);

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <Section background="gradient" className="pt-32">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-white/60 text-sm mb-6">
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link href="/#templates" className="hover:text-white transition-colors">
                  Templates
                </Link>
                <span>/</span>
                <span className="text-white">{template.name}</span>
              </div>

              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="secondary">
                  {categoryLabels[template.category]}
                </Badge>
                {template.popular && (
                  <Badge variant="accent" className="flex items-center gap-1">
                    <Star size={12} className="fill-current" /> Popular
                  </Badge>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {template.name}
              </h1>
              <p className="text-xl text-white/80 max-w-2xl">
                {template.longDescription}
              </p>
            </motion.div>
          </Container>
        </Section>

        {/* Main Preview */}
        <Section background="white" className="-mt-20 pt-0">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl overflow-hidden shadow-2xl border border-border"
            >
              {/* Browser Chrome */}
              <div className="bg-muted px-4 py-3 flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white rounded-lg px-4 py-1.5 text-sm text-muted-foreground">
                  www.yoursite.com
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:bg-white/50 rounded transition-colors">
                    <Monitor size={16} className="text-muted-foreground" />
                  </button>
                  <button className="p-1 hover:bg-white/50 rounded transition-colors">
                    <Tablet size={16} className="text-muted-foreground" />
                  </button>
                  <button className="p-1 hover:bg-white/50 rounded transition-colors">
                    <Smartphone size={16} className="text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Preview Image */}
              <div className="relative aspect-[16/9]">
                <Image
                  src={template.image}
                  alt={template.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </motion.div>
          </Container>
        </Section>

        {/* Features & Details */}
        <Section background="muted">
          <Container>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Features */}
              <div className="lg:col-span-2 space-y-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold text-primary mb-6">
                    Template Features
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {template.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm"
                      >
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                          <Check className="w-4 h-4 text-accent" />
                        </div>
                        <span className="font-medium text-primary">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Pages Included */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold text-primary mb-6">
                    Pages Included
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {template.pages.map((page) => (
                      <span
                        key={page}
                        className="px-4 py-2 bg-white rounded-full text-sm font-medium text-muted-foreground shadow-sm"
                      >
                        {page}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Gallery */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-2xl font-bold text-primary mb-6">
                    More Screenshots
                  </h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {template.gallery.map((image, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="relative aspect-[3/2] rounded-xl overflow-hidden shadow-lg cursor-pointer"
                      >
                        <Image
                          src={image}
                          alt={`${template.name} screenshot ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-xl p-6 sticky top-24"
                >
                  <div className="text-center mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Price</p>
                    <p className="text-3xl font-bold text-accent">
                      {template.price}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      with any plan
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <Link href="/contact" className="block">
                      <Button variant="accent" className="w-full" size="lg">
                        Get This Template
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full"
                      size="lg"
                      rightIcon={<ExternalLink size={16} />}
                    >
                      Live Preview
                    </Button>
                  </div>

                  <div className="border-t border-border pt-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-primary">Fast Setup</p>
                        <p className="text-sm text-muted-foreground">
                          Ready in days
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-primary">Secure</p>
                        <p className="text-sm text-muted-foreground">
                          SSL included
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-primary">24/7 Support</p>
                        <p className="text-sm text-muted-foreground">
                          We&apos;re here to help
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6 mt-6">
                    <p className="text-sm text-muted-foreground mb-3">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {template.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Related Templates */}
        {relatedTemplates.length > 0 && (
          <Section background="white">
            <Container>
              <h2 className="text-2xl font-bold text-primary mb-8">
                Related Templates
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedTemplates.map((related) => (
                  <Link key={related.id} href={`/templates/${related.id}`}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-border"
                    >
                      <div className="relative aspect-[3/2]">
                        <Image
                          src={related.image}
                          alt={related.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-primary">{related.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {related.description}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </Container>
          </Section>
        )}

        {/* CTA */}
        <Section background="gradient">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                Get this template customized for your business with our expert team.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/contact">
                  <Button
                    variant="secondary"
                    size="lg"
                    rightIcon={<ArrowRight size={18} />}
                  >
                    Contact Us
                  </Button>
                </Link>
                <Link href="/#templates">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10"
                    leftIcon={<ArrowLeft size={18} />}
                  >
                    Browse More Templates
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

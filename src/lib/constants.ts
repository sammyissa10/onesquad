import type {
  Service,
  PricingPlan,
  NavItem,
  Testimonial,
  FAQ,
  ValueProp,
} from "@/types";

// Site Configuration
export const siteConfig = {
  name: "OneSquad",
  tagline: "Unlock your digital potential",
  description:
    "A one-stop-shop digital agency for small-to-midsize businesses to unlock their full potential in the digital world.",
  url: "https://www.onesquads.com",
  email: "ayaz.onesquad@outlook.com",
  phone: "+1 (555) 123-4567",
  address: {
    street: "123 Digital Avenue",
    city: "Tech City",
    state: "TC",
    zip: "12345",
  },
  socials: {
    facebook: "https://facebook.com/onesquad",
    twitter: "https://twitter.com/onesquad",
    instagram: "https://instagram.com/onesquad",
    linkedin: "https://linkedin.com/company/onesquad",
  },
};

// Navigation Items
export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Digital Marketing", href: "/services#digital-marketing" },
      { label: "SEO", href: "/services/seo" },
      { label: "Social Media Marketing", href: "/services/social-media" },
      { label: "Email Marketing", href: "/services/email-marketing" },
      { label: "PPC Advertising", href: "/services/ppc" },
      { label: "Content Marketing", href: "/services/content-marketing" },
      { label: "Web Design", href: "/services/web-design" },
      { label: "E-commerce Solutions", href: "/services/ecommerce" },
      { label: "Hosting & Security", href: "/services/hosting" },
      { label: "Ongoing Maintenance", href: "/services/maintenance" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    href: "/blog",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Team", href: "/team" },
    ],
  },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
];

// Services Data
export const services: Service[] = [
  // Digital Marketing Services
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    category: "digital-marketing",
    description:
      "Comprehensive digital marketing strategies that drive traffic, engagement, and conversions. We create data-driven campaigns tailored to your business goals.",
    shortDescription:
      "Strategic campaigns that drive growth and engagement.",
    icon: "Megaphone",
    features: [
      "Custom marketing strategy development",
      "Multi-channel campaign management",
      "Performance tracking and analytics",
      "Conversion rate optimization",
      "Competitor analysis",
      "Monthly reporting and insights",
    ],
  },
  {
    slug: "seo",
    title: "Search Engine Optimization",
    category: "digital-marketing",
    description:
      "Boost your online visibility and rank higher in search results. Our SEO experts use proven techniques to drive organic traffic to your website.",
    shortDescription:
      "Rank higher and get found by your target audience.",
    icon: "Search",
    features: [
      "Keyword research and strategy",
      "On-page SEO optimization",
      "Technical SEO audits",
      "Link building campaigns",
      "Local SEO optimization",
      "Monthly ranking reports",
    ],
  },
  {
    slug: "social-media",
    title: "Social Media Marketing",
    category: "digital-marketing",
    description:
      "Build your brand presence and engage with your audience across all major social platforms. We create content that resonates and converts.",
    shortDescription:
      "Grow your brand and connect with your audience.",
    icon: "Share2",
    features: [
      "Social media strategy development",
      "Content creation and scheduling",
      "Community management",
      "Paid social advertising",
      "Influencer partnerships",
      "Analytics and performance reports",
    ],
  },
  {
    slug: "email-marketing",
    title: "Email Marketing",
    category: "digital-marketing",
    description:
      "Connect directly with your customers through targeted email campaigns that nurture leads and drive sales.",
    shortDescription:
      "Nurture leads and drive conversions via email.",
    icon: "Mail",
    features: [
      "Email strategy and planning",
      "Template design and development",
      "List segmentation and management",
      "Automated email sequences",
      "A/B testing and optimization",
      "Detailed campaign analytics",
    ],
  },
  {
    slug: "ppc",
    title: "Pay-Per-Click Advertising",
    category: "digital-marketing",
    description:
      "Maximize your ROI with targeted PPC campaigns across Google, Bing, and social platforms. We optimize every click to drive results.",
    shortDescription:
      "Targeted ads that maximize your return on investment.",
    icon: "MousePointerClick",
    features: [
      "Google Ads management",
      "Social media advertising",
      "Display and retargeting campaigns",
      "Landing page optimization",
      "Bid management and optimization",
      "Conversion tracking setup",
    ],
  },
  {
    slug: "content-marketing",
    title: "Content Marketing",
    category: "digital-marketing",
    description:
      "Create compelling content that attracts, engages, and converts your target audience. From blog posts to videos, we tell your brand story.",
    shortDescription:
      "Compelling content that attracts and converts.",
    icon: "FileText",
    features: [
      "Content strategy development",
      "Blog writing and management",
      "Video content production",
      "Infographic design",
      "E-book and whitepaper creation",
      "Content calendar management",
    ],
  },
  // Web Solutions
  {
    slug: "web-design",
    title: "Web Design",
    category: "web-solutions",
    description:
      "Beautiful, responsive websites that capture your brand essence and convert visitors into customers. We design with purpose and precision.",
    shortDescription:
      "Stunning websites that convert visitors into customers.",
    icon: "Palette",
    features: [
      "Custom website design",
      "Mobile-responsive development",
      "UI/UX best practices",
      "Brand integration",
      "Speed optimization",
      "Cross-browser compatibility",
    ],
  },
  {
    slug: "ecommerce",
    title: "E-commerce Solutions",
    category: "web-solutions",
    description:
      "Launch and grow your online store with powerful e-commerce solutions. From product pages to checkout, we build stores that sell.",
    shortDescription:
      "Powerful online stores built to drive sales.",
    icon: "ShoppingCart",
    features: [
      "Custom e-commerce development",
      "Shopping cart integration",
      "Payment gateway setup",
      "Product catalog management",
      "Inventory tracking",
      "Order management systems",
    ],
  },
  {
    slug: "hosting",
    title: "Website Hosting & Security",
    category: "web-solutions",
    description:
      "Reliable, secure hosting that keeps your website fast and protected. We handle the technical details so you can focus on your business.",
    shortDescription:
      "Secure, reliable hosting with 24/7 monitoring.",
    icon: "Shield",
    features: [
      "Secure server hosting",
      "SSL certificate management",
      "Daily automated backups",
      "24/7 uptime monitoring",
      "DDoS protection",
      "Regular security updates",
    ],
  },
  {
    slug: "maintenance",
    title: "Ongoing Maintenance",
    category: "web-solutions",
    description:
      "Keep your website running smoothly with our proactive maintenance services. Updates, fixes, and improvements—all handled for you.",
    shortDescription:
      "Proactive updates to keep your site running smoothly.",
    icon: "Wrench",
    features: [
      "Regular software updates",
      "Security patches",
      "Performance optimization",
      "Content updates",
      "Bug fixes and troubleshooting",
      "Monthly health reports",
    ],
  },
];

// Pricing Plans
export const pricingPlans: PricingPlan[] = [
  // Website Hosting Plans
  {
    name: "Basic",
    price: 150,
    category: "hosting",
    focus: "Simple 5-10 page websites",
    storage: "15 GB",
    hours: "5 hrs/month",
    features: [
      "5-10 page website",
      "No OneSquad branding",
      "24/7 customer care",
      "24/7 website monitoring",
      "Free domain for 1 year",
      "Daily backups",
      "Website security",
      "15 GB storage (minimum)",
      "5 hours of work per month",
    ],
  },
  {
    name: "Pro",
    price: 220,
    category: "hosting",
    focus: "Basic + Analytics & SEO",
    storage: "40 GB",
    hours: "7 hrs/month",
    highlighted: true,
    badge: "Popular",
    features: [
      "Everything in Basic",
      "Standard analytics dashboard",
      "SEO management",
      "40 GB storage",
      "7 hours of work per month",
      "Performance optimization",
      "Monthly SEO reports",
    ],
  },
  {
    name: "Expert",
    price: 300,
    category: "hosting",
    focus: "Pro + Advanced Features",
    storage: "Unlimited",
    hours: "12 hrs/month",
    features: [
      "Everything in Pro",
      "Advanced analytics",
      "Content quality control",
      "Expert developer options",
      "Unlimited storage",
      "12 hours of work per month",
      "Priority support",
    ],
  },
  // Managed Service Plans
  {
    name: "WebSquad",
    price: 300,
    category: "managed",
    focus: "Manage Your Business Website",
    storage: "25 GB",
    hours: "10 hrs/month",
    features: [
      "Complete website design",
      "SEO management",
      "No OneSquad branding",
      "24/7 customer care",
      "24/7 website monitoring",
      "Free domain for 1 year",
      "Daily backups",
      "Website security",
      "25 GB storage",
      "10 hours of work per month",
    ],
  },
  {
    name: "DigitalSquad",
    price: 450,
    category: "managed",
    focus: "Website & Social Media Marketing",
    storage: "50 GB",
    hours: "5 hrs/month",
    highlighted: true,
    badge: "Best Value",
    features: [
      "Everything in WebSquad",
      "10 social media posts/month",
      "Free analytics dashboard",
      "Local SEO optimization",
      "50 GB total storage",
      "5 hours of extra work per month",
      "Social media management",
    ],
  },
  {
    name: "OneSquad",
    price: 550,
    category: "managed",
    focus: "Website, Social & Branding",
    storage: "50 GB",
    hours: "15 hrs/month",
    features: [
      "Everything in DigitalSquad",
      "Brand design package",
      "5 flyers per month",
      "5 custom images per month",
      "15 social media posts/month",
      "50 GB total storage",
      "15 hours of work per month",
      "Dedicated account manager",
    ],
  },
  {
    name: "CustomSquad",
    price: "custom",
    priceLabel: "Let's Talk",
    category: "managed",
    focus: "Pick and Choose Services",
    storage: "Varies",
    hours: "Varies",
    features: [
      "Tailored to your needs",
      "Mix and match any services",
      "Flexible pricing",
      "Custom SLA agreements",
      "Dedicated support team",
      "Enterprise-grade solutions",
    ],
  },
];

// Value Propositions
export const valueProps: ValueProp[] = [
  {
    title: "All-In-One Solution",
    description:
      "No juggling multiple vendors. Get everything you need—web design, marketing, hosting, and support—from one dedicated team.",
    icon: "Layers",
  },
  {
    title: "Built for Growth",
    description:
      "Scalable plans that grow with your business. Start small and expand your digital presence as your needs evolve.",
    icon: "TrendingUp",
  },
  {
    title: "True Partnership",
    description:
      "We're not just another vendor. With 24/7 support and dedicated account managers, we're invested in your success.",
    icon: "Users",
  },
];

// Testimonials
export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Owner",
    company: "Bloom Boutique",
    content:
      "OneSquad transformed our online presence completely. Our website traffic increased by 200% and our e-commerce sales have never been better. They truly understand small business needs.",
    rating: 5,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Marketing Director",
    company: "TechStart Solutions",
    content:
      "The team at OneSquad doesn't just deliver services—they deliver results. Their SEO expertise helped us rank on the first page of Google within 3 months.",
    rating: 5,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Founder",
    company: "Green Living Co.",
    content:
      "Finally, a digital agency that actually listens! OneSquad took the time to understand our brand and created a website that perfectly represents who we are.",
    rating: 5,
  },
];

// FAQs
export const faqs: FAQ[] = [
  {
    question: "What happens if I exceed my monthly work hours?",
    answer:
      "If you need additional work beyond your included hours, we bill at a competitive hourly rate. We'll always notify you before any extra charges are incurred, and you can easily upgrade your plan if you consistently need more hours.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Absolutely! You can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the start of your next billing cycle. We'll prorate any differences.",
  },
  {
    question: "What does '24/7 monitoring' include?",
    answer:
      "Our 24/7 monitoring includes uptime checks every minute, performance monitoring, security scanning, and instant alerts. If anything goes wrong, our team is notified immediately and begins resolution.",
  },
  {
    question: "Do I own my website if I cancel?",
    answer:
      "Yes! You own all your content and design. If you decide to leave, we'll provide all your files and assist with the transition to ensure a smooth handoff.",
  },
  {
    question: "How long does it take to build a new website?",
    answer:
      "Most websites are completed within 2-4 weeks, depending on complexity. E-commerce sites and custom projects may take 4-8 weeks. We'll provide a detailed timeline during our initial consultation.",
  },
  {
    question: "Is there a contract or commitment?",
    answer:
      "Our hosting and managed service plans are month-to-month with no long-term commitment required. You can cancel anytime with 30 days notice. We believe in earning your business every month.",
  },
];

// All services included with every plan
export const includedWithEveryPlan = [
  "No OneSquad branding",
  "24/7 customer care",
  "24/7 website monitoring",
  "Free domain for 1 year",
  "Daily backups",
  "Website security",
];

// Stats for social proof
export const stats = [
  { value: "500+", label: "Websites Launched" },
  { value: "98%", label: "Client Retention" },
  { value: "24/7", label: "Support Available" },
  { value: "50+", label: "Happy Clients" },
];

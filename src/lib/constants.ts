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
      { label: "Digital Marketing", href: "/services/digital-marketing" },
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
  { label: "Portfolio", href: "/portfolio" },
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
    results: [
      { metric: "150%", description: "Average increase in lead generation" },
      { metric: "3x", description: "Return on ad spend" },
      { metric: "40%", description: "Reduction in cost per acquisition" },
    ],
    serviceFaqs: [
      { question: "How long before I see results from digital marketing?", answer: "Most clients see measurable improvements within 60-90 days. PPC campaigns can generate leads immediately, while organic strategies like SEO build momentum over 3-6 months." },
      { question: "Do you work with businesses in my industry?", answer: "We work with SMBs across all industries. Our strategies are tailored to your specific market, audience, and business goals." },
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
    results: [
      { metric: "200%", description: "Average organic traffic increase" },
      { metric: "Top 10", description: "Google rankings for target keywords" },
      { metric: "85%", description: "Client keyword improvement rate" },
    ],
    serviceFaqs: [
      { question: "How long does SEO take to show results?", answer: "SEO is a long-term strategy. You'll typically see initial improvements in 3-4 months, with significant results in 6-12 months. We provide monthly reports so you can track progress." },
      { question: "Do you guarantee first page rankings?", answer: "No ethical SEO company can guarantee specific rankings. What we do guarantee is proven strategies, transparent reporting, and consistent improvement in your organic visibility." },
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
    results: [
      { metric: "300%", description: "Average follower growth" },
      { metric: "5x", description: "Increase in engagement rate" },
      { metric: "60%", description: "More website traffic from social" },
    ],
    serviceFaqs: [
      { question: "Which social media platforms should my business be on?", answer: "It depends on your target audience. We'll analyze where your customers spend time and focus efforts there. Most B2C businesses benefit from Instagram and Facebook, while B2B does well on LinkedIn." },
      { question: "How often will you post on my accounts?", answer: "Posting frequency depends on your plan. Our managed plans include 10-15 posts per month, with options to increase. We focus on quality and consistency over volume." },
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
    results: [
      { metric: "42%", description: "Average open rate" },
      { metric: "4x", description: "ROI on email campaigns" },
      { metric: "25%", description: "Increase in repeat purchases" },
    ],
    serviceFaqs: [
      { question: "How do you build an email list?", answer: "We use proven list-building strategies including opt-in forms, lead magnets, and landing pages. We never buy email lists — all subscribers are genuinely interested in your business." },
      { question: "How often should I email my customers?", answer: "We typically recommend 1-4 emails per month depending on your industry. We'll test different frequencies and optimize based on engagement metrics." },
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
    results: [
      { metric: "250%", description: "Average return on ad spend" },
      { metric: "35%", description: "Lower cost per click vs industry avg" },
      { metric: "2x", description: "Conversion rate improvement" },
    ],
    serviceFaqs: [
      { question: "How much should I budget for PPC?", answer: "We recommend starting with at least $500-$1,000/month in ad spend plus management fees. We'll optimize your budget to maximize ROI and scale up as results come in." },
      { question: "How quickly can PPC generate leads?", answer: "PPC can drive traffic and leads within days of launching. We typically see campaigns fully optimized within 2-4 weeks for best performance." },
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
    results: [
      { metric: "3x", description: "More leads than traditional marketing" },
      { metric: "70%", description: "Increase in website engagement" },
      { metric: "45%", description: "Growth in organic search traffic" },
    ],
    serviceFaqs: [
      { question: "What types of content do you create?", answer: "We create blog posts, articles, infographics, videos, case studies, whitepapers, and social media content. Everything is tailored to your brand voice and audience." },
      { question: "How do you measure content marketing success?", answer: "We track metrics like organic traffic, time on page, social shares, lead generation, and conversions. Monthly reports show exactly how content is impacting your business." },
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
    results: [
      { metric: "500+", description: "Websites designed and launched" },
      { metric: "95%", description: "Mobile responsiveness score" },
      { metric: "2-4 wks", description: "Average delivery time" },
    ],
    serviceFaqs: [
      { question: "How long does it take to build a website?", answer: "Most standard websites take 2-4 weeks. More complex sites with custom features may take 4-8 weeks. We'll provide a detailed timeline during our consultation." },
      { question: "Will my website work on mobile devices?", answer: "Absolutely. Every website we build is fully responsive and optimized for all devices — phones, tablets, and desktops. Mobile-first design is our standard approach." },
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
    results: [
      { metric: "180%", description: "Average increase in online sales" },
      { metric: "99.9%", description: "Uptime for all stores" },
      { metric: "3 sec", description: "Average page load time" },
    ],
    serviceFaqs: [
      { question: "Which e-commerce platform do you use?", answer: "We work with Shopify, WooCommerce, and custom solutions depending on your needs. We'll recommend the best platform based on your product catalog, budget, and growth plans." },
      { question: "Can you migrate my existing store?", answer: "Yes, we handle full store migrations including products, customer data, and order history. We ensure zero downtime and a seamless transition." },
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
    results: [
      { metric: "99.9%", description: "Uptime guarantee" },
      { metric: "24/7", description: "Security monitoring" },
      { metric: "<1 sec", description: "Average server response time" },
    ],
    serviceFaqs: [
      { question: "What happens if my site goes down?", answer: "Our 24/7 monitoring detects issues within seconds. Our team is automatically alerted and begins resolution immediately. Most issues are resolved within minutes." },
      { question: "Are backups included?", answer: "Yes, daily automated backups are included with all hosting plans. We retain backups for 30 days, so you can restore to any point within the last month." },
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
    results: [
      { metric: "100%", description: "Security patch compliance" },
      { metric: "40%", description: "Faster load times after optimization" },
      { metric: "0", description: "Downtime from missed updates" },
    ],
    serviceFaqs: [
      { question: "What does maintenance include?", answer: "Our maintenance covers software updates, security patches, performance optimization, content updates, bug fixes, and monthly health reports. Think of us as your website's dedicated IT team." },
      { question: "Can I request changes to my website anytime?", answer: "Yes! Your plan includes monthly work hours for updates and changes. Simply submit a request and our team will handle it, usually within 24-48 hours." },
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
  { value: "29+", label: "Websites Launched" },
  { value: "99%", label: "Client Retention" },
  { value: "24/7", label: "Support Available" },
  { value: "29+", label: "Happy Clients" },
];

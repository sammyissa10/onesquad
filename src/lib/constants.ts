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
    "We handle websites, marketing, and everything in between so you can focus on running your business. Think of us as the digital team you never had to hire.",
  url: "https://www.onesquads.com",
  email: "ayaz.onesquad@outlook.com",
  phone: "",
  address: "Remote-first, serving businesses nationwide",
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
      "Marketing that actually brings people through the door. We build campaigns around your goals, track what works, and cut what doesn't.",
    shortDescription:
      "Strategic campaigns that drive growth and engagement.",
    icon: "Megaphone",
    features: [
      "Custom marketing strategy development",
      "Multi-channel campaign management",
      "Performance tracking and analytics",
      "Turning more visitors into customers",
      "Competitor analysis",
      "Monthly reporting and insights",
    ],
    results: [
      { metric: "150%", description: "Average increase in new inquiries" },
      { metric: "3x", description: "Return on ad spend" },
      { metric: "40%", description: "Lower cost to acquire new customers" },
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
      "Help more customers find you when they search online. We optimize your website so it shows up higher in search results, bringing in more visitors without paying for ads.",
    shortDescription:
      "Get found by the right people when they search online.",
    icon: "Search",
    features: [
      "Keyword research and strategy",
      "Website content optimization",
      "Technical site health audits",
      "Building your site's reputation online",
      "Local search optimization",
      "Monthly ranking reports",
    ],
    results: [
      { metric: "200%", description: "Average increase in search traffic" },
      { metric: "Top 10", description: "Google rankings for key search terms" },
      { metric: "85%", description: "Of clients see ranking improvements" },
    ],
    serviceFaqs: [
      { question: "How long does SEO take to show results?", answer: "SEO is a long-term play. You'll typically see early improvements in 3-4 months, with stronger results building over 6-12 months. We send monthly reports so you can track progress along the way." },
      { question: "Do you guarantee first page rankings?", answer: "No one can honestly guarantee a specific ranking. What we do guarantee is a proven approach, transparent reporting, and steady improvement in how easily people find you online." },
    ],
  },
  {
    slug: "social-media",
    title: "Social Media Marketing",
    category: "digital-marketing",
    description:
      "Show up where your customers spend their time. We create and manage social media content that builds trust, starts conversations, and brings people back to your business.",
    shortDescription:
      "Grow your following and turn engagement into customers.",
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
      { metric: "5x", description: "More likes, comments, and shares" },
      { metric: "60%", description: "More website visits from social media" },
    ],
    serviceFaqs: [
      { question: "Which social media platforms should my business be on?", answer: "It depends on where your customers spend their time. We'll figure that out together and focus there. Most businesses that sell directly to consumers do well on Instagram and Facebook, while service-based and professional businesses often see better results on LinkedIn." },
      { question: "How often will you post on my accounts?", answer: "That depends on your plan. Our managed plans include 10-15 posts per month, with options to increase. We focus on quality and consistency over volume." },
    ],
  },
  {
    slug: "email-marketing",
    title: "Email Marketing",
    category: "digital-marketing",
    description:
      "Stay in touch with your customers through well-timed emails that keep them coming back. From welcome messages to promotions, we handle the strategy and execution.",
    shortDescription:
      "Keep customers engaged and coming back for more.",
    icon: "Mail",
    features: [
      "Email strategy and planning",
      "Template design and development",
      "Audience grouping and list management",
      "Automated email sequences",
      "Testing and optimizing for better results",
      "Clear campaign performance reports",
    ],
    results: [
      { metric: "42%", description: "Average email open rate" },
      { metric: "4x", description: "Return on email campaigns" },
      { metric: "25%", description: "Increase in repeat purchases" },
    ],
    serviceFaqs: [
      { question: "How do you build an email list?", answer: "We use signup forms, special offers, and other strategies to attract people who are genuinely interested in your business. We never buy email lists — every subscriber opts in." },
      { question: "How often should I email my customers?", answer: "We typically recommend 1-4 emails per month depending on your industry. We'll test different frequencies and adjust based on what gets the best response." },
    ],
  },
  {
    slug: "ppc",
    title: "Pay-Per-Click Advertising",
    category: "digital-marketing",
    description:
      "Get your business in front of the right people with paid ads on Google and social media. We manage every detail so your ad budget works harder for you.",
    shortDescription:
      "Paid ads that bring in real leads without wasting your budget.",
    icon: "MousePointerClick",
    features: [
      "Google Ads management",
      "Social media advertising",
      "Display ads and retargeting past visitors",
      "Landing page optimization",
      "Ad budget management and tuning",
      "Tracking what leads to actual customers",
    ],
    results: [
      { metric: "250%", description: "Average return on ad spend" },
      { metric: "35%", description: "Lower ad costs vs. industry average" },
      { metric: "2x", description: "More customers from the same budget" },
    ],
    serviceFaqs: [
      { question: "How much should I budget for paid ads?", answer: "We recommend starting with at least $500-$1,000/month in ad spend plus management fees. We'll make every dollar count and scale up as results come in." },
      { question: "How quickly can paid ads generate leads?", answer: "Paid ads can start driving visitors and inquiries within days of launching. We typically see campaigns fully dialed in within 2-4 weeks for the best results." },
    ],
  },
  {
    slug: "content-marketing",
    title: "Content Marketing",
    category: "digital-marketing",
    description:
      "Share your expertise and build trust with content that speaks to your audience. From blog posts to videos, we help you tell your story in a way that brings people in.",
    shortDescription:
      "Useful content that builds trust and brings in business.",
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
      { metric: "3x", description: "More inquiries than traditional marketing" },
      { metric: "70%", description: "Increase in time spent on site" },
      { metric: "45%", description: "Growth in search traffic" },
    ],
    serviceFaqs: [
      { question: "What types of content do you create?", answer: "We create blog posts, articles, infographics, videos, case studies, guides, and social media content. Everything is written in your brand's voice and tailored to your audience." },
      { question: "How do you measure if content is working?", answer: "We track website traffic, how long people stay on your pages, social shares, and new inquiries. Monthly reports show exactly how your content is performing and where we can improve." },
    ],
  },
  // Web Solutions
  {
    slug: "web-design",
    title: "Web Design",
    category: "web-solutions",
    description:
      "Websites that look like you, not like a template. We design fast, mobile-friendly sites that turn visitors into customers.",
    shortDescription:
      "Professional websites that turn visitors into customers.",
    icon: "Palette",
    features: [
      "Custom website design",
      "Mobile-responsive development",
      "Clean, intuitive layouts",
      "Your branding front and center",
      "Speed optimization",
      "Cross-browser compatibility",
    ],
    results: [
      { metric: "21+", description: "Websites designed and launched" },
      { metric: "95%", description: "Mobile-friendly score" },
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
      "Sell online with a store that's built to grow with you. From product pages to checkout, we handle the setup so you can focus on your products.",
    shortDescription:
      "Online stores built to make selling easy.",
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
      "Your website stays online, loads fast, and stays protected. We handle server management, backups, and security updates so you don't have to worry about the technical side.",
    shortDescription:
      "Fast, secure hosting with around-the-clock monitoring.",
    icon: "Shield",
    features: [
      "Secure server hosting",
      "Secure connection (SSL) included",
      "Daily automatic backups",
      "24/7 uptime monitoring",
      "Protection against online attacks",
      "Regular security updates",
    ],
    results: [
      { metric: "99.9%", description: "Uptime guarantee" },
      { metric: "24/7", description: "Security monitoring" },
      { metric: "<1 sec", description: "Average server response time" },
    ],
    serviceFaqs: [
      { question: "What happens if my site goes down?", answer: "Our monitoring catches issues within seconds and alerts our team right away. Most problems are resolved within minutes, often before you even notice." },
      { question: "Are backups included?", answer: "Yes, daily backups are included with all hosting plans. We keep 30 days of backups, so we can restore your site to any point within the last month if needed." },
    ],
  },
  {
    slug: "maintenance",
    title: "Ongoing Maintenance",
    category: "web-solutions",
    description:
      "We keep your website up to date, secure, and running smoothly. Software updates, fixes, and improvements are all taken care of so you never have to think about it.",
    shortDescription:
      "Regular updates and fixes so your site stays in top shape.",
    icon: "Wrench",
    features: [
      "Regular software updates",
      "Security updates",
      "Speed and performance improvements",
      "Content updates",
      "Bug fixes and troubleshooting",
      "Monthly health reports",
    ],
    results: [
      { metric: "100%", description: "Security updates applied on time" },
      { metric: "40%", description: "Faster load times after optimization" },
      { metric: "0", description: "Downtime from missed updates" },
    ],
    serviceFaqs: [
      { question: "What does maintenance include?", answer: "We handle software updates, security patches, speed improvements, content changes, bug fixes, and monthly health reports. Basically, we're your website's dedicated support team." },
      { question: "Can I request changes to my website anytime?", answer: "Absolutely. Your plan includes monthly work hours for updates and changes. Just send us a request and we'll take care of it, usually within 24-48 hours." },
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
    focus: "Basic + Analytics & Search Optimization",
    storage: "40 GB",
    hours: "7 hrs/month",
    highlighted: true,
    badge: "Popular",
    features: [
      "Everything in Basic",
      "Website analytics dashboard",
      "Search engine optimization",
      "Accept payments",
      "40 GB storage",
      "7 hours of work per month",
      "Speed optimization",
      "Monthly search ranking reports",
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
    hours: "15 hrs/month",
    highlighted: true,
    badge: "Most Popular",
    features: [
      "Everything in WebSquad",
      "10 social media posts/month",
      "Free analytics dashboard",
      "Local SEO optimization",
      "50 GB total storage",
      "15 hours of work per month",
      "Social media management",
    ],
  },
  {
    name: "OneSquad",
    price: 550,
    category: "managed",
    focus: "Website, Social & Branding",
    storage: "75 GB",
    hours: "15 hrs/month",
    badge: "Best Overall",
    features: [
      "Everything in DigitalSquad",
      "Brand design package",
      "5 flyers per month",
      "5 custom images per month",
      "15 social media posts/month",
      "75 GB total storage",
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
      "Custom service agreements",
      "Dedicated support team",
      "Scalable, professional solutions",
    ],
  },
];

// Value Propositions
export const valueProps: ValueProp[] = [
  {
    title: "One team. Everything handled.",
    description:
      "Website, search optimization, social media, email, hosting, maintenance — all from the same people who already know your business.",
    icon: "Layers",
  },
  {
    title: "Start small, scale when you're ready.",
    description:
      "Our plans grow with you. Most clients start with a website and add marketing later. No pressure, no upsells.",
    icon: "TrendingUp",
  },
  {
    title: "We actually pick up the phone.",
    description:
      "No ticket queues, no chatbots, no 'we'll get back to you in 3-5 business days.' Your account manager knows your name.",
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
      "OneSquad completely changed how we show up online. Our website traffic jumped by 200% and our online sales have never been better. They really get what small businesses need.",
    rating: 5,
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Operations Manager",
    company: "Relay Logistics",
    content:
      "We'd been burned by two agencies before. OneSquad actually explained what they were doing and why. Organic traffic is up about 180% since we started — took about 4 months to really kick in.",
    rating: 4,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Founder",
    company: "Hart & Home Interiors",
    content:
      "I'm not technical at all, and that used to stress me out. Now I just email my account manager and things get done. The site they built us actually looks like us, not like a template.",
    rating: 5,
  },
];

// FAQs
export const faqs: FAQ[] = [
  {
    question: "What happens if I exceed my monthly work hours?",
    answer:
      "If you need more work beyond your included hours, we charge a straightforward hourly rate. We'll always let you know before any extra charges come up, and you can upgrade your plan anytime if you consistently need more time.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Absolutely! You can change your plan at any time. Upgrades take effect immediately, and downgrades take effect at the start of your next billing cycle. We'll prorate any differences.",
  },
  {
    question: "What does '24/7 monitoring' include?",
    answer:
      "We check your site every minute around the clock for uptime, speed, and security threats. If anything goes wrong, our team is notified instantly and starts fixing it right away.",
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
      "No long-term contracts. It's month-to-month, and you can cancel anytime with 30 days' notice. If we're not earning your business, you should be free to leave.",
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
  { value: "21+", label: "Websites Launched" },
  { value: "2–4 wk", label: "Avg. Launch Time" },
  { value: "24/7", label: "Uptime Monitoring" },
  { value: "0", label: "Long-term Contracts" },
];

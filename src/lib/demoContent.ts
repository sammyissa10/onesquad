// Demo content for each template - drives the full demo page layout

export interface DemoNavItem {
  label: string;
  href: string;
}

export interface DemoHero {
  headline: string;
  highlightWord: string;
  subtext: string;
  cta: string;
  secondaryCta?: string;
}

export interface DemoFeature {
  title: string;
  description: string;
}

export interface DemoTestimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface DemoGalleryItem {
  title: string;
  category: string;
}

export interface DemoStat {
  value: string;
  label: string;
}

export interface DemoPricingTier {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
}

export interface DemoContent {
  templateId: string;
  businessName: string;
  tagline: string;
  primaryColor: string;
  accentColor: string;
  nav: DemoNavItem[];
  hero: DemoHero;
  stats: DemoStat[];
  features: DemoFeature[];
  aboutTitle: string;
  aboutText: string;
  galleryTitle: string;
  gallery: DemoGalleryItem[];
  testimonials: DemoTestimonial[];
  pricing?: DemoPricingTier[];
  ctaTitle: string;
  ctaText: string;
  footerText: string;
}

export const demoContents: Record<string, DemoContent> = {
  "modern-agency": {
    templateId: "modern-agency",
    businessName: "Nexus Digital",
    tagline: "Digital Agency",
    primaryColor: "#1a2744",
    accentColor: "#e8845c",
    nav: [
      { label: "Home", href: "#" },
      { label: "Services", href: "#services" },
      { label: "About", href: "#about" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "Team", href: "#team" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      headline: "We Build Digital Experiences That",
      highlightWord: "Convert",
      subtext: "Award-winning digital agency specializing in web design, branding, and marketing strategies that drive measurable results for ambitious businesses.",
      cta: "Start a Project",
      secondaryCta: "View Our Work",
    },
    stats: [
      { value: "200+", label: "Projects Delivered" },
      { value: "98%", label: "Client Satisfaction" },
      { value: "15+", label: "Years Experience" },
      { value: "50+", label: "Team Members" },
    ],
    features: [
      { title: "Web Design & Development", description: "Custom websites built with cutting-edge technology for maximum performance and conversion." },
      { title: "Brand Strategy", description: "Comprehensive brand identity that resonates with your target audience and stands out." },
      { title: "Digital Marketing", description: "Data-driven campaigns across search, social, and email that deliver real ROI." },
      { title: "SEO & Analytics", description: "Increase your visibility and understand your audience with advanced analytics." },
      { title: "UI/UX Design", description: "User-centered design that creates intuitive, engaging digital experiences." },
      { title: "Content Strategy", description: "Compelling content that tells your story and drives engagement." },
    ],
    aboutTitle: "We Believe Great Design Drives Business Growth",
    aboutText: "Founded in 2009, Nexus Digital has helped hundreds of businesses transform their digital presence. Our team of designers, developers, and strategists work together to create solutions that look stunning and perform even better.",
    galleryTitle: "Featured Projects",
    gallery: [
      { title: "TechFlow SaaS Redesign", category: "Web Design" },
      { title: "GreenLeaf Brand Identity", category: "Branding" },
      { title: "UrbanEats App", category: "Mobile" },
      { title: "Skyline Properties", category: "Web Design" },
      { title: "FitLife Campaign", category: "Marketing" },
      { title: "Nova Finance Platform", category: "Development" },
    ],
    testimonials: [
      { name: "Sarah Johnson", role: "CEO, TechFlow", text: "Nexus Digital transformed our online presence completely. Our conversions increased by 340% within three months.", rating: 5 },
      { name: "Michael Chen", role: "Founder, GreenLeaf", text: "The team understood our vision perfectly and delivered a brand identity that truly represents who we are.", rating: 5 },
      { name: "Emily Rodriguez", role: "Marketing Director, UrbanEats", text: "Professional, creative, and results-driven. The best agency we've ever worked with.", rating: 5 },
    ],
    ctaTitle: "Ready to Transform Your Digital Presence?",
    ctaText: "Let's discuss your project and create something extraordinary together.",
    footerText: "Building digital experiences since 2009.",
  },

  "shop-starter": {
    templateId: "shop-starter",
    businessName: "Urban Threads",
    tagline: "Online Fashion Store",
    primaryColor: "#0f172a",
    accentColor: "#8b5cf6",
    nav: [
      { label: "Home", href: "#" },
      { label: "Shop", href: "#shop" },
      { label: "Collections", href: "#collections" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      headline: "Discover Your",
      highlightWord: "Style",
      subtext: "Curated fashion for the modern individual. Free shipping on orders over $75.",
      cta: "Shop Now",
      secondaryCta: "New Arrivals",
    },
    stats: [
      { value: "10K+", label: "Happy Customers" },
      { value: "500+", label: "Products" },
      { value: "Free", label: "Shipping $75+" },
      { value: "30-Day", label: "Returns" },
    ],
    features: [
      { title: "New Arrivals", description: "Fresh styles added weekly. Be the first to discover the latest trends." },
      { title: "Best Sellers", description: "Our most loved pieces, rated 5 stars by thousands of customers." },
      { title: "Sustainable Fashion", description: "Eco-friendly materials and ethical manufacturing practices." },
      { title: "Custom Sizing", description: "Find your perfect fit with our detailed sizing guide and custom options." },
      { title: "Gift Cards", description: "Give the gift of style. Digital gift cards available instantly." },
      { title: "VIP Rewards", description: "Earn points on every purchase and unlock exclusive member perks." },
    ],
    aboutTitle: "Fashion That Feels Good",
    aboutText: "Urban Threads was born from a simple idea: fashion should be accessible, sustainable, and make you feel confident. We partner with ethical manufacturers to bring you premium quality at fair prices.",
    galleryTitle: "Shop by Category",
    gallery: [
      { title: "Women's Collection", category: "Clothing" },
      { title: "Men's Collection", category: "Clothing" },
      { title: "Accessories", category: "Accessories" },
      { title: "Footwear", category: "Shoes" },
      { title: "Activewear", category: "Sports" },
      { title: "Sale Items", category: "Deals" },
    ],
    testimonials: [
      { name: "Jessica M.", role: "Verified Buyer", text: "The quality is incredible for the price. I've ordered five times already and everything fits perfectly!", rating: 5 },
      { name: "David L.", role: "Verified Buyer", text: "Fast shipping, great packaging, and the clothes are even better in person. My new favorite store.", rating: 5 },
      { name: "Amanda K.", role: "Verified Buyer", text: "Love that they use sustainable materials. Finally a brand that cares about the planet AND style.", rating: 5 },
    ],
    ctaTitle: "Join the Urban Threads Community",
    ctaText: "Sign up for exclusive access to new arrivals, sales, and 15% off your first order.",
    footerText: "Sustainable fashion for the modern individual.",
  },

  "creative-portfolio": {
    templateId: "creative-portfolio",
    businessName: "Alex Rivera",
    tagline: "Creative Director & Designer",
    primaryColor: "#18181b",
    accentColor: "#f59e0b",
    nav: [
      { label: "Home", href: "#" },
      { label: "Work", href: "#work" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      headline: "Designing Brands That",
      highlightWord: "Inspire",
      subtext: "Award-winning creative director with 12+ years of experience crafting memorable brand experiences for Fortune 500 companies and innovative startups.",
      cta: "View My Work",
      secondaryCta: "Get in Touch",
    },
    stats: [
      { value: "150+", label: "Projects Completed" },
      { value: "12", label: "Design Awards" },
      { value: "40+", label: "Happy Clients" },
      { value: "12+", label: "Years Experience" },
    ],
    features: [
      { title: "Brand Identity", description: "Complete visual identity systems including logos, color palettes, and brand guidelines." },
      { title: "Web Design", description: "Beautiful, responsive websites that bring your brand to life online." },
      { title: "Art Direction", description: "Creative vision and direction for campaigns, photoshoots, and content." },
      { title: "Print Design", description: "From business cards to billboards, stunning print materials that get noticed." },
      { title: "Motion Graphics", description: "Dynamic animations and video content that captivate your audience." },
      { title: "Packaging Design", description: "Product packaging that stands out on shelves and delights customers." },
    ],
    aboutTitle: "Creativity With Purpose",
    aboutText: "I'm Alex Rivera, a creative director based in New York. I believe great design isn't just about looking good — it's about solving problems and creating meaningful connections between brands and people. Every project starts with understanding your story.",
    galleryTitle: "Selected Work",
    gallery: [
      { title: "Bloom Cosmetics Rebrand", category: "Branding" },
      { title: "Wave Music Festival", category: "Art Direction" },
      { title: "Vertex Tech Identity", category: "Brand Identity" },
      { title: "Ember Restaurant", category: "Web Design" },
      { title: "Lunar Watch Campaign", category: "Art Direction" },
      { title: "Horizon Travel App", category: "UI/UX" },
    ],
    testimonials: [
      { name: "Rachel Kim", role: "CEO, Bloom Cosmetics", text: "Alex completely transformed our brand. The new identity increased our brand recognition by 200%.", rating: 5 },
      { name: "James Porter", role: "Founder, Vertex Tech", text: "An incredible creative mind. Alex delivered a brand identity that perfectly captures our vision.", rating: 5 },
      { name: "Sofia Martinez", role: "Director, Wave Festival", text: "Working with Alex was seamless. The festival branding was our most praised visual identity ever.", rating: 5 },
    ],
    ctaTitle: "Let's Create Something Amazing",
    ctaText: "Have a project in mind? I'd love to hear about it.",
    footerText: "Creating meaningful design since 2012.",
  },

  "tasty-bites": {
    templateId: "tasty-bites",
    businessName: "The Olive Garden Bistro",
    tagline: "Italian Restaurant",
    primaryColor: "#1c1917",
    accentColor: "#dc2626",
    nav: [
      { label: "Home", href: "#" },
      { label: "Menu", href: "#menu" },
      { label: "About", href: "#about" },
      { label: "Gallery", href: "#gallery" },
      { label: "Reservations", href: "#reservations" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      headline: "Authentic Italian Cuisine Made With",
      highlightWord: "Love",
      subtext: "Family recipes passed down through generations, prepared fresh daily with locally sourced ingredients. Join us for an unforgettable dining experience.",
      cta: "Reserve a Table",
      secondaryCta: "View Menu",
    },
    stats: [
      { value: "25+", label: "Years Serving" },
      { value: "4.9", label: "Star Rating" },
      { value: "500+", label: "Reviews" },
      { value: "Fresh", label: "Daily Ingredients" },
    ],
    features: [
      { title: "Handmade Pasta", description: "Our pasta is made fresh in-house every morning using traditional Italian techniques." },
      { title: "Wood-Fired Pizza", description: "Authentic Neapolitan pizza baked at 900°F in our imported wood-fired oven." },
      { title: "Wine Selection", description: "Over 200 wines from Italy's finest vineyards, curated by our sommelier." },
      { title: "Private Dining", description: "Elegant private rooms for special occasions, parties, and corporate events." },
      { title: "Catering Service", description: "Bring the Italian experience to your event with our full-service catering." },
      { title: "Cooking Classes", description: "Learn the secrets of Italian cooking with our hands-on weekend classes." },
    ],
    aboutTitle: "A Family Tradition Since 1998",
    aboutText: "What started as a small family kitchen has grown into the city's most beloved Italian restaurant. Chef Marco Rossi continues his grandmother's legacy, bringing authentic Tuscan flavors to every dish. We believe food is more than sustenance — it's an experience that brings people together.",
    galleryTitle: "Our Dishes",
    gallery: [
      { title: "Truffle Risotto", category: "Pasta" },
      { title: "Margherita Pizza", category: "Pizza" },
      { title: "Tiramisu", category: "Dessert" },
      { title: "Osso Buco", category: "Main Course" },
      { title: "Bruschetta", category: "Appetizer" },
      { title: "Panna Cotta", category: "Dessert" },
    ],
    testimonials: [
      { name: "The Food Critic", role: "City Magazine", text: "The best Italian restaurant outside of Italy. Every dish is a masterpiece of flavor and presentation.", rating: 5 },
      { name: "Linda & Mark", role: "Regular Guests", text: "We've been coming here for 10 years and the quality never wavers. It feels like family.", rating: 5 },
      { name: "Chef's Table Blog", role: "Food Blogger", text: "The handmade pasta alone is worth the visit. A truly authentic and unforgettable experience.", rating: 5 },
    ],
    ctaTitle: "Reserve Your Table Tonight",
    ctaText: "Experience the taste of Italy. Book online or call us for reservations.",
    footerText: "Authentic Italian cuisine since 1998.",
  },

  "health-first": {
    templateId: "health-first",
    businessName: "Harmony Health Clinic",
    tagline: "Family Healthcare",
    primaryColor: "#0f4c5c",
    accentColor: "#2dd4bf",
    nav: [
      { label: "Home", href: "#" },
      { label: "Services", href: "#services" },
      { label: "Doctors", href: "#team" },
      { label: "About", href: "#about" },
      { label: "Appointments", href: "#appointments" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      headline: "Your Health Is Our",
      highlightWord: "Priority",
      subtext: "Comprehensive healthcare services for the whole family. Board-certified physicians, modern facilities, and a patient-first approach to wellness.",
      cta: "Book Appointment",
      secondaryCta: "Our Services",
    },
    stats: [
      { value: "15K+", label: "Patients Served" },
      { value: "20+", label: "Specialists" },
      { value: "4.8", label: "Star Rating" },
      { value: "24/7", label: "Emergency Care" },
    ],
    features: [
      { title: "Primary Care", description: "Comprehensive check-ups, preventive care, and chronic disease management for all ages." },
      { title: "Pediatrics", description: "Specialized care for children from newborns to adolescents in a friendly environment." },
      { title: "Cardiology", description: "Advanced cardiac care including diagnostics, treatment, and rehabilitation." },
      { title: "Dermatology", description: "Skin health services from acne treatment to skin cancer screening." },
      { title: "Mental Health", description: "Counseling, therapy, and psychiatric services for emotional well-being." },
      { title: "Lab & Imaging", description: "On-site laboratory and diagnostic imaging for quick, accurate results." },
    ],
    aboutTitle: "Caring for Our Community Since 2005",
    aboutText: "Harmony Health Clinic was founded with a simple mission: provide exceptional, compassionate healthcare that's accessible to everyone. Our team of 20+ specialists works together to ensure you receive comprehensive, coordinated care under one roof.",
    galleryTitle: "Our Departments",
    gallery: [
      { title: "General Medicine", category: "Primary" },
      { title: "Children's Health", category: "Pediatrics" },
      { title: "Heart Center", category: "Cardiology" },
      { title: "Skin Clinic", category: "Dermatology" },
      { title: "Wellness Center", category: "Mental Health" },
      { title: "Diagnostics Lab", category: "Lab" },
    ],
    testimonials: [
      { name: "Patricia L.", role: "Patient", text: "The doctors here genuinely care. They take time to listen and explain everything thoroughly.", rating: 5 },
      { name: "Robert & Family", role: "Patients", text: "Our whole family trusts Harmony Health. From pediatrics to my own care, they're exceptional.", rating: 5 },
      { name: "Maria S.", role: "Patient", text: "I was nervous about my procedure but the staff made me feel so comfortable. Incredible care.", rating: 5 },
    ],
    ctaTitle: "Schedule Your Visit Today",
    ctaText: "New patients welcome. Book your appointment online or call our front desk.",
    footerText: "Compassionate healthcare for every family.",
  },

  "startup-launch": {
    templateId: "startup-launch",
    businessName: "CloudSync",
    tagline: "SaaS Platform",
    primaryColor: "#0a0a0a",
    accentColor: "#3b82f6",
    nav: [
      { label: "Home", href: "#" },
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "About", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      headline: "Sync Your Team's Work in",
      highlightWord: "Real-Time",
      subtext: "The all-in-one collaboration platform that keeps your team aligned, productive, and connected — no matter where they work.",
      cta: "Start Free Trial",
      secondaryCta: "Watch Demo",
    },
    stats: [
      { value: "50K+", label: "Active Users" },
      { value: "99.9%", label: "Uptime" },
      { value: "150+", label: "Integrations" },
      { value: "4.9/5", label: "Rating" },
    ],
    features: [
      { title: "Real-Time Collaboration", description: "Edit documents, share files, and brainstorm together in real-time." },
      { title: "Smart Workflows", description: "Automate repetitive tasks and streamline your team's processes." },
      { title: "Advanced Analytics", description: "Track productivity, identify bottlenecks, and make data-driven decisions." },
      { title: "Enterprise Security", description: "SOC 2 certified with end-to-end encryption and role-based access." },
      { title: "150+ Integrations", description: "Connect with tools you already use — Slack, GitHub, Jira, and more." },
      { title: "Mobile Apps", description: "Stay connected on the go with native iOS and Android apps." },
    ],
    aboutTitle: "Built for Modern Teams",
    aboutText: "CloudSync was founded by a team of remote workers who understood the pain of disconnected tools. We built the platform we wished we had — one place for all your team's work. Today, over 50,000 users trust CloudSync to keep their teams aligned.",
    galleryTitle: "Trusted by Leading Companies",
    gallery: [
      { title: "Document Collaboration", category: "Feature" },
      { title: "Project Dashboards", category: "Feature" },
      { title: "Team Chat", category: "Feature" },
      { title: "File Management", category: "Feature" },
      { title: "Time Tracking", category: "Feature" },
      { title: "Reports & Analytics", category: "Feature" },
    ],
    testimonials: [
      { name: "Jason Park", role: "CTO, Stripe", text: "CloudSync replaced four different tools for our team. It's the best collaboration platform we've used.", rating: 5 },
      { name: "Sarah Miller", role: "PM, Shopify", text: "Our team productivity increased 40% after switching to CloudSync. The workflows are incredible.", rating: 5 },
      { name: "Alex Thompson", role: "CEO, StartupCo", text: "Simple, powerful, and reliable. CloudSync is essential to how our distributed team operates.", rating: 5 },
    ],
    pricing: [
      { name: "Starter", price: "$0", period: "/month", features: ["Up to 5 users", "5 GB storage", "Basic integrations", "Email support"] },
      { name: "Pro", price: "$12", period: "/user/month", features: ["Unlimited users", "100 GB storage", "All integrations", "Priority support", "Advanced analytics"], highlighted: true },
      { name: "Enterprise", price: "Custom", period: "", features: ["Unlimited everything", "Dedicated server", "Custom integrations", "24/7 phone support", "SLA guarantee", "On-premise option"] },
    ],
    ctaTitle: "Ready to Sync Your Team?",
    ctaText: "Start your free 14-day trial. No credit card required.",
    footerText: "Empowering teams to do their best work.",
  },

  "boutique-store": {
    templateId: "boutique-store",
    businessName: "Maison Belle",
    tagline: "Luxury Fashion Boutique",
    primaryColor: "#1a1a2e",
    accentColor: "#d4af37",
    nav: [
      { label: "Home", href: "#" },
      { label: "Shop", href: "#shop" },
      { label: "Lookbook", href: "#lookbook" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      headline: "Timeless",
      highlightWord: "Elegance",
      subtext: "Curated luxury fashion and accessories from the world's most prestigious designers. Every piece tells a story of craftsmanship and style.",
      cta: "Shop Collection",
      secondaryCta: "View Lookbook",
    },
    stats: [
      { value: "50+", label: "Designer Brands" },
      { value: "Premium", label: "Quality" },
      { value: "Free", label: "Personal Styling" },
      { value: "Worldwide", label: "Shipping" },
    ],
    features: [
      { title: "Designer Collections", description: "Exclusively curated pieces from renowned fashion houses and emerging designers." },
      { title: "Personal Styling", description: "Complimentary styling sessions with our expert fashion consultants." },
      { title: "Bespoke Tailoring", description: "Perfect fit guaranteed with our in-house tailoring and alteration service." },
      { title: "Private Shopping", description: "Book a private appointment for an exclusive, personalized shopping experience." },
      { title: "Gift Wrapping", description: "Luxury gift wrapping and personalized notes for every occasion." },
      { title: "VIP Membership", description: "Early access to collections, exclusive events, and member-only pricing." },
    ],
    aboutTitle: "Where Style Meets Substance",
    aboutText: "Maison Belle was founded with a passion for connecting discerning clients with exceptional fashion. We travel the globe to source pieces that embody quality, artistry, and timeless appeal. Each item in our boutique has been personally selected by our creative director.",
    galleryTitle: "Latest Collection",
    gallery: [
      { title: "Autumn/Winter '25", category: "Women" },
      { title: "Evening Wear", category: "Formal" },
      { title: "Accessories", category: "Accessories" },
      { title: "Men's Edit", category: "Men" },
      { title: "Resort Wear", category: "Casual" },
      { title: "Bridal", category: "Special" },
    ],
    testimonials: [
      { name: "Catherine R.", role: "VIP Client", text: "The personal styling service is extraordinary. Every visit feels like a luxury experience.", rating: 5 },
      { name: "Laurent D.", role: "Fashion Editor", text: "Maison Belle has an impeccable eye for quality. Their curation is unmatched in the city.", rating: 5 },
      { name: "Isabelle M.", role: "Client", text: "From the tailoring to the packaging, every detail shows they truly care about the customer.", rating: 5 },
    ],
    ctaTitle: "Experience Luxury Fashion",
    ctaText: "Visit our boutique or shop online. Personal styling available by appointment.",
    footerText: "Curating timeless fashion since 2015.",
  },

  "minimal-folio": {
    templateId: "minimal-folio",
    businessName: "Lens & Light",
    tagline: "Photography Studio",
    primaryColor: "#0a0a0a",
    accentColor: "#e5e5e5",
    nav: [
      { label: "Home", href: "#" },
      { label: "Portfolio", href: "#portfolio" },
      { label: "About", href: "#about" },
      { label: "Services", href: "#services" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      headline: "Capturing Moments That",
      highlightWord: "Last",
      subtext: "Fine art and commercial photography that tells your story with authenticity, emotion, and timeless beauty.",
      cta: "View Portfolio",
      secondaryCta: "Book a Session",
    },
    stats: [
      { value: "1,000+", label: "Sessions" },
      { value: "8", label: "Photo Awards" },
      { value: "100%", label: "Satisfaction" },
      { value: "10+", label: "Years" },
    ],
    features: [
      { title: "Wedding Photography", description: "Capturing every magical moment of your special day with artistry and care." },
      { title: "Portrait Sessions", description: "Professional portraits for individuals, families, and corporate headshots." },
      { title: "Commercial Work", description: "Product photography, editorial shoots, and brand content creation." },
      { title: "Event Coverage", description: "Full event documentation from corporate galas to intimate gatherings." },
      { title: "Fine Art Prints", description: "Gallery-quality prints on premium paper, available in limited editions." },
      { title: "Photo Editing", description: "Professional retouching and editing to bring out the best in every image." },
    ],
    aboutTitle: "Every Photo Tells a Story",
    aboutText: "I'm Maya Chen, a photographer who believes in the power of authentic moments. Whether it's a wedding, a portrait session, or a brand campaign, I approach every shoot with the same philosophy: capture the truth, find the beauty, and create images that resonate.",
    galleryTitle: "Selected Work",
    gallery: [
      { title: "Summer Wedding Series", category: "Weddings" },
      { title: "Urban Portraits", category: "Portraits" },
      { title: "Product Catalog", category: "Commercial" },
      { title: "Nature Collection", category: "Fine Art" },
      { title: "Corporate Event", category: "Events" },
      { title: "Fashion Editorial", category: "Editorial" },
    ],
    testimonials: [
      { name: "Kate & James", role: "Wedding Clients", text: "Maya captured our wedding day so beautifully. Every photo makes us relive those perfect moments.", rating: 5 },
      { name: "Vogue Local", role: "Magazine", text: "One of the most talented photographers in the city. Her eye for detail is extraordinary.", rating: 5 },
      { name: "Tom Harris", role: "Brand Director", text: "The commercial shoot exceeded our expectations. Maya's work elevated our entire brand image.", rating: 5 },
    ],
    ctaTitle: "Let's Create Something Beautiful",
    ctaText: "Ready to book a session? Get in touch to discuss your vision.",
    footerText: "Fine art and commercial photography.",
  },

  "build-pro": {
    templateId: "build-pro",
    businessName: "Summit Construction",
    tagline: "General Contractors",
    primaryColor: "#1e293b",
    accentColor: "#f97316",
    nav: [
      { label: "Home", href: "#" },
      { label: "Services", href: "#services" },
      { label: "Projects", href: "#projects" },
      { label: "About", href: "#about" },
      { label: "Quote", href: "#quote" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      headline: "Building Your Vision From the Ground",
      highlightWord: "Up",
      subtext: "Licensed and insured general contractors specializing in residential and commercial construction. Quality craftsmanship with on-time delivery, guaranteed.",
      cta: "Get a Free Quote",
      secondaryCta: "View Projects",
    },
    stats: [
      { value: "500+", label: "Projects Built" },
      { value: "30+", label: "Years Experience" },
      { value: "Licensed", label: "& Insured" },
      { value: "A+", label: "BBB Rating" },
    ],
    features: [
      { title: "New Construction", description: "Custom homes, commercial buildings, and ground-up construction projects of any scale." },
      { title: "Renovations", description: "Kitchen, bathroom, and whole-home renovations that transform your living space." },
      { title: "Commercial Build-Out", description: "Office spaces, retail stores, and restaurants built to your exact specifications." },
      { title: "Concrete & Foundation", description: "Solid foundations, driveways, patios, and structural concrete work." },
      { title: "Roofing & Siding", description: "Complete roofing solutions and exterior upgrades that protect and beautify." },
      { title: "Project Management", description: "Full-service project management from permits to final walkthrough." },
    ],
    aboutTitle: "Built on Trust, Delivered with Excellence",
    aboutText: "Summit Construction has been building homes and businesses since 1993. As a family-owned company, we treat every project like it's our own. Our commitment to quality craftsmanship, transparent pricing, and reliable timelines has earned us an A+ BBB rating and thousands of satisfied clients.",
    galleryTitle: "Recent Projects",
    gallery: [
      { title: "Lakeside Custom Home", category: "Residential" },
      { title: "Downtown Office Complex", category: "Commercial" },
      { title: "Modern Kitchen Remodel", category: "Renovation" },
      { title: "Retail Shopping Center", category: "Commercial" },
      { title: "Heritage Home Restoration", category: "Renovation" },
      { title: "Luxury Apartment Build", category: "Residential" },
    ],
    testimonials: [
      { name: "Tom & Lisa M.", role: "Homeowners", text: "Summit built our dream home and it exceeded every expectation. On time and on budget!", rating: 5 },
      { name: "Marcus J.", role: "Business Owner", text: "Professional from start to finish. Our new office space is exactly what we envisioned.", rating: 5 },
      { name: "Sarah K.", role: "Homeowner", text: "Our kitchen renovation was completed in just 3 weeks. The quality is outstanding.", rating: 5 },
    ],
    ctaTitle: "Start Your Project Today",
    ctaText: "Get a free, no-obligation quote for your construction or renovation project.",
    footerText: "Quality construction since 1993.",
  },

  "pipe-works": {
    templateId: "pipe-works",
    businessName: "FlowRight Plumbing",
    tagline: "Licensed Plumbers",
    primaryColor: "#0c4a6e",
    accentColor: "#06b6d4",
    nav: [
      { label: "Home", href: "#" },
      { label: "Services", href: "#services" },
      { label: "About", href: "#about" },
      { label: "Reviews", href: "#reviews" },
      { label: "Emergency", href: "#emergency" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      headline: "Fast, Reliable Plumbing You Can",
      highlightWord: "Trust",
      subtext: "Licensed, insured, and available 24/7 for all your plumbing needs. From leaky faucets to complete repiping — we've got you covered.",
      cta: "Call Now",
      secondaryCta: "Book Online",
    },
    stats: [
      { value: "24/7", label: "Emergency Service" },
      { value: "10K+", label: "Jobs Completed" },
      { value: "4.9★", label: "Google Rating" },
      { value: "Same Day", label: "Service Available" },
    ],
    features: [
      { title: "Emergency Repairs", description: "Burst pipes, overflows, and backups handled fast — 24 hours a day, 7 days a week." },
      { title: "Drain Cleaning", description: "Professional drain clearing and hydro-jetting to keep your pipes flowing freely." },
      { title: "Water Heater Service", description: "Installation, repair, and maintenance for all water heater types and brands." },
      { title: "Pipe Repair & Repiping", description: "Fix leaks, replace old pipes, and upgrade your plumbing system." },
      { title: "Bathroom & Kitchen", description: "Complete plumbing for renovations — fixtures, pipes, and appliance hookups." },
      { title: "Sewer Line Service", description: "Camera inspection, repair, and replacement for sewer and main lines." },
    ],
    aboutTitle: "Your Neighborhood Plumber Since 2010",
    aboutText: "FlowRight Plumbing was founded with one goal: provide honest, affordable plumbing service that our neighbors can depend on. Every one of our technicians is licensed, background-checked, and trained to handle any job with care. We charge fair prices with no hidden fees.",
    galleryTitle: "Our Services",
    gallery: [
      { title: "Emergency Response", category: "Emergency" },
      { title: "Bathroom Plumbing", category: "Residential" },
      { title: "Commercial Plumbing", category: "Commercial" },
      { title: "Drain Solutions", category: "Maintenance" },
      { title: "Water Systems", category: "Installation" },
      { title: "Inspections", category: "Preventive" },
    ],
    testimonials: [
      { name: "Karen B.", role: "Homeowner", text: "They came within an hour at 11 PM for a burst pipe. Professional, fast, and fairly priced.", rating: 5 },
      { name: "Mike T.", role: "Property Manager", text: "We use FlowRight for all our properties. Reliable, honest, and always do quality work.", rating: 5 },
      { name: "Jennifer H.", role: "Homeowner", text: "Finally a plumber who shows up on time, does great work, and doesn't overcharge!", rating: 5 },
    ],
    ctaTitle: "Need a Plumber? We're On Our Way",
    ctaText: "Call us now for same-day service or book your appointment online.",
    footerText: "Honest plumbing service since 2010.",
  },

  "shop-front": {
    templateId: "shop-front",
    businessName: "Ember & Oak",
    tagline: "Home & Lifestyle Store",
    primaryColor: "#292524",
    accentColor: "#c2410c",
    nav: [
      { label: "Home", href: "#" },
      { label: "Products", href: "#products" },
      { label: "About", href: "#about" },
      { label: "Location", href: "#location" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      headline: "Beautiful Things for Beautiful",
      highlightWord: "Spaces",
      subtext: "Hand-picked home décor, artisanal goods, and lifestyle essentials. Visit our store or shop online for thoughtfully curated products.",
      cta: "Shop Online",
      secondaryCta: "Visit Our Store",
    },
    stats: [
      { value: "1,000+", label: "Products" },
      { value: "200+", label: "Local Brands" },
      { value: "Est.", label: "2018" },
      { value: "Free", label: "Local Delivery" },
    ],
    features: [
      { title: "Home Décor", description: "Unique furniture, art prints, and decorative pieces that make your house a home." },
      { title: "Kitchen & Dining", description: "Artisanal cookware, ceramics, and table linens from local makers." },
      { title: "Bath & Body", description: "Natural soaps, candles, and skincare products crafted with care." },
      { title: "Gifts & Stationery", description: "Thoughtful gift sets and premium stationery for every occasion." },
      { title: "Seasonal Collections", description: "Rotating collections that celebrate each season's unique character." },
      { title: "Gift Registry", description: "Create a wish list for weddings, housewarmings, and special occasions." },
    ],
    aboutTitle: "Curated with Care, Sourced with Purpose",
    aboutText: "Ember & Oak began as a weekend market stall and grew into the neighborhood's favorite lifestyle store. We believe your home should reflect who you are. That's why we partner with local artisans and ethical brands to bring you products with character, quality, and a story behind them.",
    galleryTitle: "Shop by Room",
    gallery: [
      { title: "Living Room", category: "Décor" },
      { title: "Kitchen", category: "Dining" },
      { title: "Bedroom", category: "Textiles" },
      { title: "Bathroom", category: "Bath" },
      { title: "Outdoor", category: "Garden" },
      { title: "Gift Sets", category: "Gifts" },
    ],
    testimonials: [
      { name: "Rebecca L.", role: "Customer", text: "Every time I visit Ember & Oak, I find something beautiful. It's my go-to for gifts.", rating: 5 },
      { name: "Nathan P.", role: "Interior Designer", text: "The curation is impeccable. I bring all my clients here for unique home décor pieces.", rating: 5 },
      { name: "Olivia S.", role: "Customer", text: "The online shop is just as lovely as the physical store. Fast shipping and beautiful packaging.", rating: 5 },
    ],
    ctaTitle: "Visit Us Today",
    ctaText: "Open 7 days a week. Free local delivery on orders over $50.",
    footerText: "Curated home & lifestyle goods since 2018.",
  },

  "legal-edge": {
    templateId: "legal-edge",
    businessName: "Carter & Associates",
    tagline: "Attorneys at Law",
    primaryColor: "#1e1b4b",
    accentColor: "#7c3aed",
    nav: [
      { label: "Home", href: "#" },
      { label: "Practice Areas", href: "#practice" },
      { label: "Attorneys", href: "#team" },
      { label: "Results", href: "#results" },
      { label: "Blog", href: "#blog" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      headline: "Experienced Legal Counsel You Can",
      highlightWord: "Rely On",
      subtext: "For over 20 years, Carter & Associates has been fighting for our clients' rights. Whether you're facing a personal injury, business dispute, or family matter — we're here to help.",
      cta: "Free Consultation",
      secondaryCta: "Our Practice Areas",
    },
    stats: [
      { value: "$50M+", label: "Recovered" },
      { value: "5,000+", label: "Cases Won" },
      { value: "20+", label: "Years Practice" },
      { value: "Free", label: "Consultation" },
    ],
    features: [
      { title: "Personal Injury", description: "Car accidents, slip and falls, medical malpractice — we fight for the compensation you deserve." },
      { title: "Business Law", description: "Contract disputes, partnerships, LLC formation, and corporate litigation." },
      { title: "Family Law", description: "Divorce, custody, child support, and prenuptial agreements handled with care." },
      { title: "Real Estate Law", description: "Property transactions, landlord-tenant disputes, and zoning issues." },
      { title: "Employment Law", description: "Wrongful termination, discrimination, wage disputes, and workplace rights." },
      { title: "Estate Planning", description: "Wills, trusts, probate, and asset protection for your family's future." },
    ],
    aboutTitle: "Fighting for Justice Since 2003",
    aboutText: "Carter & Associates was founded on the principle that everyone deserves excellent legal representation. Our team of experienced attorneys brings decades of combined experience to every case. We don't get paid unless you win.",
    galleryTitle: "Practice Areas",
    gallery: [
      { title: "Personal Injury", category: "Litigation" },
      { title: "Business Law", category: "Corporate" },
      { title: "Family Law", category: "Family" },
      { title: "Real Estate", category: "Property" },
      { title: "Employment", category: "Labor" },
      { title: "Estate Planning", category: "Planning" },
    ],
    testimonials: [
      { name: "James R.", role: "Personal Injury Client", text: "Carter & Associates got me $2.1 million for my accident. They fought tirelessly on my behalf.", rating: 5 },
      { name: "Sandra M.", role: "Business Client", text: "Professional, thorough, and always available. They saved our business during a critical dispute.", rating: 5 },
      { name: "David & Anna", role: "Estate Planning Clients", text: "They made estate planning so simple and clear. We finally have peace of mind about our family's future.", rating: 5 },
    ],
    ctaTitle: "Get Your Free Consultation",
    ctaText: "Tell us about your case. We'll review it and advise you on your options — at no cost.",
    footerText: "Dedicated legal representation since 2003.",
  },

  "prime-property": {
    templateId: "prime-property",
    businessName: "Skyline Realty",
    tagline: "Real Estate Agency",
    primaryColor: "#0c0a09",
    accentColor: "#ea580c",
    nav: [
      { label: "Home", href: "#" },
      { label: "Listings", href: "#listings" },
      { label: "Agents", href: "#agents" },
      { label: "About", href: "#about" },
      { label: "Blog", href: "#blog" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      headline: "Find Your",
      highlightWord: "Dream Home",
      subtext: "Premier real estate agency specializing in luxury residential and commercial properties. Let our expert agents guide you to the perfect property.",
      cta: "Search Properties",
      secondaryCta: "Meet Our Agents",
    },
    stats: [
      { value: "$2B+", label: "Properties Sold" },
      { value: "1,200+", label: "Happy Clients" },
      { value: "15", label: "Expert Agents" },
      { value: "#1", label: "Agency in Region" },
    ],
    features: [
      { title: "Luxury Homes", description: "Exclusive access to premium residential properties in the city's finest neighborhoods." },
      { title: "Commercial Real Estate", description: "Office spaces, retail locations, and investment properties for savvy buyers." },
      { title: "Property Management", description: "Full-service management for rental properties — from tenant screening to maintenance." },
      { title: "Market Analysis", description: "Comprehensive market reports and property valuations powered by real-time data." },
      { title: "First-Time Buyers", description: "Dedicated guidance for first-time buyers navigating the real estate market." },
      { title: "Investment Advisory", description: "Strategic advice for real estate investors looking to build their portfolio." },
    ],
    aboutTitle: "Your Trusted Real Estate Partner",
    aboutText: "Skyline Realty has been connecting buyers and sellers since 2008. Our team of 15 expert agents brings deep local knowledge and a passion for helping you find the perfect property. With over $2 billion in total sales, we have the experience and network to deliver results.",
    galleryTitle: "Featured Listings",
    gallery: [
      { title: "Waterfront Penthouse", category: "Luxury" },
      { title: "Downtown Condo", category: "Residential" },
      { title: "Family Estate", category: "Suburban" },
      { title: "Commercial Office", category: "Commercial" },
      { title: "Investment Duplex", category: "Investment" },
      { title: "New Development", category: "Pre-sale" },
    ],
    testimonials: [
      { name: "Jennifer & Mark", role: "Home Buyers", text: "Our agent found us the perfect home in a competitive market. We couldn't have done it without Skyline.", rating: 5 },
      { name: "Robert C.", role: "Investor", text: "Skyline's market analysis helped me make smart investment decisions. My portfolio has doubled in value.", rating: 5 },
      { name: "Lisa T.", role: "Home Seller", text: "They sold our home for $50K over asking price in just two weeks. Incredible team!", rating: 5 },
    ],
    ctaTitle: "Ready to Make Your Move?",
    ctaText: "Whether you're buying, selling, or investing — our agents are ready to help.",
    footerText: "Premier real estate since 2008.",
  },

  "fit-zone": {
    templateId: "fit-zone",
    businessName: "IronCore Fitness",
    tagline: "Gym & Training Studio",
    primaryColor: "#0f172a",
    accentColor: "#ef4444",
    nav: [
      { label: "Home", href: "#" },
      { label: "Classes", href: "#classes" },
      { label: "Trainers", href: "#trainers" },
      { label: "Pricing", href: "#pricing" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      headline: "Transform Your Body, Transform Your",
      highlightWord: "Life",
      subtext: "State-of-the-art equipment, world-class trainers, and a community that pushes you to be your best. Your fitness journey starts here.",
      cta: "Start Free Trial",
      secondaryCta: "View Classes",
    },
    stats: [
      { value: "5,000+", label: "Members" },
      { value: "50+", label: "Weekly Classes" },
      { value: "20", label: "Expert Trainers" },
      { value: "24/7", label: "Access" },
    ],
    features: [
      { title: "Group Classes", description: "High-energy group fitness including HIIT, yoga, spin, boxing, and Pilates." },
      { title: "Personal Training", description: "One-on-one sessions with certified trainers tailored to your specific goals." },
      { title: "Strength Training", description: "Full range of free weights, machines, and functional training equipment." },
      { title: "Cardio Zone", description: "Premium treadmills, bikes, rowing machines, and ellipticals with entertainment." },
      { title: "Recovery Center", description: "Sauna, steam room, cold plunge, and foam rolling area for optimal recovery." },
      { title: "Nutrition Coaching", description: "Personalized meal plans and nutrition guidance to maximize your results." },
    ],
    aboutTitle: "Where Champions Are Made",
    aboutText: "IronCore Fitness was founded by former professional athletes who believe everyone deserves access to world-class training facilities. Our 20,000 sq ft facility is open 24/7, equipped with the latest technology, and staffed by trainers who genuinely care about your progress.",
    galleryTitle: "Classes & Programs",
    gallery: [
      { title: "HIIT Training", category: "Cardio" },
      { title: "Yoga & Mobility", category: "Flexibility" },
      { title: "Boxing Bootcamp", category: "Combat" },
      { title: "Spin Class", category: "Cardio" },
      { title: "Strength Lab", category: "Strength" },
      { title: "Pilates", category: "Core" },
    ],
    testimonials: [
      { name: "Chris R.", role: "Member", text: "Lost 40 lbs in 6 months with IronCore's program. The trainers and community are incredible.", rating: 5 },
      { name: "Amanda L.", role: "Member", text: "Best gym I've ever been to. The classes are challenging, fun, and the facilities are spotless.", rating: 5 },
      { name: "Derek P.", role: "Member", text: "The 24/7 access is a game-changer for my schedule. IronCore fits into my life, not the other way around.", rating: 5 },
    ],
    pricing: [
      { name: "Basic", price: "$29", period: "/month", features: ["Gym access", "Locker room", "2 classes/week", "Fitness assessment"] },
      { name: "Pro", price: "$59", period: "/month", features: ["Unlimited access", "All classes", "Recovery center", "Guest passes", "App tracking"], highlighted: true },
      { name: "Elite", price: "$99", period: "/month", features: ["Everything in Pro", "4 PT sessions/month", "Nutrition coaching", "Priority booking", "Towel service"] },
    ],
    ctaTitle: "Start Your Free 7-Day Trial",
    ctaText: "No commitment, no credit card required. Experience IronCore for yourself.",
    footerText: "Where champions are made.",
  },

  "bright-minds": {
    templateId: "bright-minds",
    businessName: "Apex Academy",
    tagline: "Learning Center",
    primaryColor: "#1e3a5f",
    accentColor: "#10b981",
    nav: [
      { label: "Home", href: "#" },
      { label: "Courses", href: "#courses" },
      { label: "Instructors", href: "#instructors" },
      { label: "About", href: "#about" },
      { label: "Events", href: "#events" },
      { label: "Contact", href: "#contact" },
    ],
    hero: {
      headline: "Unlock Your Potential Through",
      highlightWord: "Learning",
      subtext: "Expert-led courses for students of all ages. From academic tutoring to professional development — discover programs designed to help you succeed.",
      cta: "Browse Courses",
      secondaryCta: "Enroll Today",
    },
    stats: [
      { value: "10K+", label: "Students" },
      { value: "200+", label: "Courses" },
      { value: "50", label: "Expert Instructors" },
      { value: "95%", label: "Success Rate" },
    ],
    features: [
      { title: "Academic Tutoring", description: "One-on-one and small group tutoring in math, science, English, and test preparation." },
      { title: "Professional Development", description: "Career-boosting courses in business, technology, leadership, and communication." },
      { title: "Language Classes", description: "Learn Spanish, French, Mandarin, and more with native-speaking instructors." },
      { title: "STEM Programs", description: "Coding, robotics, engineering, and science programs for kids and teens." },
      { title: "Arts & Music", description: "Creative expression through painting, music lessons, drama, and digital media." },
      { title: "Online Learning", description: "Flexible online courses that let you learn at your own pace, from anywhere." },
    ],
    aboutTitle: "Inspiring Learners Since 2012",
    aboutText: "Apex Academy was founded by educators who believe learning should be engaging, accessible, and transformative. Our 50 expert instructors bring passion and real-world experience to every class. Whether you're a student preparing for exams or a professional growing your skills, we have a program for you.",
    galleryTitle: "Our Programs",
    gallery: [
      { title: "Academic Prep", category: "K-12" },
      { title: "Coding Bootcamp", category: "STEM" },
      { title: "Language Lab", category: "Languages" },
      { title: "Business Skills", category: "Professional" },
      { title: "Creative Arts", category: "Arts" },
      { title: "Summer Camp", category: "Youth" },
    ],
    testimonials: [
      { name: "Mrs. Johnson", role: "Parent", text: "My son's grades went from C's to A's after just one semester at Apex. The tutors are phenomenal.", rating: 5 },
      { name: "Kevin L.", role: "Adult Student", text: "The coding bootcamp changed my career. I landed a developer job within 3 months of completing the program.", rating: 5 },
      { name: "Sophia R.", role: "Student", text: "The instructors make learning fun. I actually look forward to my classes every week!", rating: 5 },
    ],
    pricing: [
      { name: "Single Class", price: "$25", period: "/class", features: ["Any one class", "Materials included", "Certificate", "Email support"] },
      { name: "Monthly", price: "$149", period: "/month", features: ["Unlimited classes", "All materials", "Progress tracking", "Instructor access", "Online resources"], highlighted: true },
      { name: "Annual", price: "$1,199", period: "/year", features: ["Everything in Monthly", "2 months free", "Priority enrollment", "1-on-1 sessions", "Career guidance"] },
    ],
    ctaTitle: "Begin Your Learning Journey",
    ctaText: "Enroll today and take the first step toward achieving your goals.",
    footerText: "Inspiring learners since 2012.",
  },
};

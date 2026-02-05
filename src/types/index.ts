// Service Types
export interface Service {
  slug: string;
  title: string;
  category: "digital-marketing" | "web-solutions";
  description: string;
  shortDescription: string;
  icon: string;
  features: string[];
}

// Pricing Types
export interface PricingPlan {
  name: string;
  price: number | "custom";
  priceLabel?: string;
  category: "hosting" | "managed";
  focus: string;
  storage: string;
  hours: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  image?: string;
  rating: number;
}

// FAQ Types
export interface FAQ {
  question: string;
  answer: string;
}

// Team Member Types
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

// Value Proposition Types
export interface ValueProp {
  title: string;
  description: string;
  icon: string;
}

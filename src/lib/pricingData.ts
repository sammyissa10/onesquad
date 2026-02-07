import {
  ShoppingCart,
  Globe,
  Share2,
  Palette,
} from "lucide-react";

// Service types
export type ServiceId = "ecommerce" | "website" | "social" | "branding";

export const services = [
  {
    id: "ecommerce" as ServiceId,
    name: "Online Store",
    icon: ShoppingCart,
    basePrice: 1200,
    description: "E-commerce website with products",
  },
  {
    id: "website" as ServiceId,
    name: "Website",
    icon: Globe,
    basePrice: 700,
    description: "Business or portfolio website",
  },
  {
    id: "social" as ServiceId,
    name: "Social Media Management",
    icon: Share2,
    basePrice: 300,
    description: "Monthly social media services",
  },
  {
    id: "branding" as ServiceId,
    name: "Identity Design",
    icon: Palette,
    basePrice: 500,
    description: "Logo and brand identity",
  },
];

// Website/ecommerce settings options
export const designComplexity = [
  { id: "professional", label: "Professional", price: 500 },
  { id: "good", label: "Good", price: 200 },
  { id: "basic", label: "Basic", price: 0 },
];

export const pageOptions = [
  { id: "20", label: "20", price: 400 },
  { id: "15", label: "15", price: 250 },
  { id: "10", label: "10", price: 100 },
  { id: "5", label: "5", price: 0 },
];

export const additionalServices = [
  { id: "performance", label: "Speed optimization (faster loading)", price: 200 },
  { id: "analytics", label: "Website visitor tracking", price: 100 },
  { id: "seo", label: "Search engine visibility (help people find you on Google)", price: 400 },
];

export const cmsOptions = [
  { id: "custom", label: "Custom-built editor (we build it for you)", price: 300 },
  { id: "wordpress", label: "WordPress (easy self-editing)", price: 0 },
  { id: "none", label: "No editor needed (we handle updates)", price: -100 },
];

export const specialFeatures = [
  { id: "3", label: "3", price: 900 },
  { id: "2", label: "2", price: 600 },
  { id: "1", label: "1", price: 300 },
  { id: "0", label: "0", price: 0 },
];

export const languageOptions = [
  { id: "4", label: "4", price: 600 },
  { id: "3", label: "3", price: 400 },
  { id: "2", label: "2", price: 200 },
  { id: "1", label: "1", price: 0 },
];

export const supportPlans = [
  { id: "year", label: "Full Year", price: 500 },
  { id: "6months", label: "6 Months", price: 250 },
  { id: "free", label: "Free Month", price: 0 },
];

export const deliveryTimes = [
  { id: "2months", label: "2 Months", price: -200 },
  { id: "1month", label: "1 Month", price: 0 },
  { id: "2weeks", label: "2 Weeks", price: 300 },
];

// Settings type for website/ecommerce configuration
export interface ServiceSettings {
  design: string;
  pages: string;
  additional: string[];
  cms: string;
  features: string;
  languages: string;
  support: string;
  delivery: string;
}

export const defaultSettings: ServiceSettings = {
  design: "basic",
  pages: "5",
  additional: [],
  cms: "wordpress",
  features: "0",
  languages: "1",
  support: "free",
  delivery: "1month",
};

// Quote data for localStorage passing to contact form
export interface QuoteLineItem {
  label: string;
  price: number;
}

export interface QuoteServiceBreakdown {
  serviceId: string;
  serviceName: string;
  basePrice: number;
  lineItems: QuoteLineItem[];
  subtotal: number;
}

export interface QuoteData {
  services: QuoteServiceBreakdown[];
  total: number;
  createdAt: string;
}

export const QUOTE_STORAGE_KEY = "onesquad_quote";

// Example project estimates for the final step
export const exampleQuotes = [
  {
    title: "Professional 10-page business site",
    description: "Professional design, 10 pages, WordPress, search engine visibility, 1 language, free support, 1 month delivery",
    total: 1700,
  },
  {
    title: "E-commerce store with custom design",
    description: "Professional design, 20 pages, WordPress, search engine visibility + visitor tracking, 2 languages, 6-month support",
    total: 3050,
  },
  {
    title: "Simple 5-page portfolio site",
    description: "Basic design, 5 pages, no editor, 1 language, free support, 2 month delivery",
    total: 400,
  },
  {
    title: "Full-service digital launch",
    description: "Website (Professional, 15 pages, custom editor) + Social Media Management + Identity Design",
    total: 2550,
  },
];

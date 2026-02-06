"use client";

import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Shield,
  Clock,
  FileCheck,
  ArrowRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import { siteConfig, services, navItems } from "@/lib/constants";

const socialLinks = [
  { icon: Facebook, href: siteConfig.socials.facebook, label: "Facebook" },
  { icon: Twitter, href: siteConfig.socials.twitter, label: "Twitter" },
  { icon: Instagram, href: siteConfig.socials.instagram, label: "Instagram" },
  { icon: Linkedin, href: siteConfig.socials.linkedin, label: "LinkedIn" },
];

const digitalMarketingServices = services.filter(
  (s) => s.category === "digital-marketing"
);
const webSolutionServices = services.filter(
  (s) => s.category === "web-solutions"
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-brand text-white">
      {/* Newsletter Signup */}
      <div className="border-b border-white/10">
        <Container>
          <div className="py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-bold text-lg">Get Digital Tips & Updates</h3>
              <p className="text-white/70 text-sm mt-1">
                Join our newsletter for the latest insights on growing your business online.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Newsletter Signup")}&body=${encodeURIComponent(`Please add me to the newsletter: ${email}`)}`;
              }}
              className="flex gap-2 w-full md:w-auto"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-accent w-full md:w-64"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-accent hover:bg-accent/90 text-white font-semibold text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                Subscribe
                <ArrowRight size={14} />
              </button>
            </form>
          </div>
        </Container>
      </div>

      {/* Main Footer */}
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Logo variant="light" showTagline className="mb-6" />
            <p className="text-white/70 mb-6">
              {siteConfig.description}
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-white/70 hover:text-accent transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-accent hover:text-secondary transition-colors font-medium"
                >
                  View All Services →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-accent mt-1 flex-shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-accent mt-1 flex-shrink-0" />
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-white/70 hover:text-accent transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-accent mt-1 flex-shrink-0" />
                <span className="text-white/70">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.city}, {siteConfig.address.state}{" "}
                  {siteConfig.address.zip}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Trust Signals */}
      <div className="border-t border-white/10">
        <Container>
          <div className="py-6 flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {[
              { icon: Shield, text: "SSL Secured" },
              { icon: Clock, text: "24/7 Monitoring" },
              { icon: FileCheck, text: "No Contracts" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-white/50 text-sm">
                <item.icon size={16} className="text-accent" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <Container>
          <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              © {currentYear} OneSquad. All rights reserved.
            </p>
            <p className="text-white/50 text-sm">
              Crafted with ❤️ for small businesses everywhere
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}

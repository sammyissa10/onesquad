"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star, ChevronRight, Phone, Mail, MapPin, Clock, Check, Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { demoContents, type DemoContent } from "@/lib/demoContent";
import { templates } from "@/lib/templateData";

function DemoNav({ content }: { content: DemoContent }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav style={{ backgroundColor: content.primaryColor }} className="sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: content.accentColor }}>
              {content.businessName[0]}
            </div>
            <span className="text-white font-bold text-lg">{content.businessName}</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {content.nav.map((item) => (
              <a key={item.label} href={item.href} className="text-white/80 hover:text-white text-sm font-medium transition-colors">
                {item.label}
              </a>
            ))}
            <button style={{ backgroundColor: content.accentColor }} className="text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
              {content.hero.cta}
            </button>
          </div>
          <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {content.nav.map((item) => (
              <a key={item.label} href={item.href} className="block text-white/80 hover:text-white py-2 text-sm" onClick={() => setMobileOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

function DemoHero({ content }: { content: DemoContent }) {
  return (
    <section style={{ backgroundColor: content.primaryColor }} className="relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl" style={{ backgroundColor: content.accentColor }} />
        <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: content.accentColor }} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider mb-4" style={{ color: content.accentColor }}>
            {content.tagline}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {content.hero.headline}{" "}
            <span style={{ color: content.accentColor }}>{content.hero.highlightWord}</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl">
            {content.hero.subtext}
          </p>
          <div className="flex flex-wrap gap-4">
            <button style={{ backgroundColor: content.accentColor }} className="text-white px-8 py-3 rounded-lg font-semibold text-lg hover:opacity-90 transition-opacity flex items-center gap-2">
              {content.hero.cta} <ArrowRight size={18} />
            </button>
            {content.hero.secondaryCta && (
              <button className="text-white border border-white/30 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors">
                {content.hero.secondaryCta}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoStats({ content }: { content: DemoContent }) {
  return (
    <section className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {content.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl md:text-4xl font-bold" style={{ color: content.accentColor }}>{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoFeatures({ content }: { content: DemoContent }) {
  return (
    <section id="services" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: content.accentColor }}>What We Offer</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Our Services</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.features.map((feature) => (
            <div key={feature.title} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${content.accentColor}15` }}>
                <ChevronRight size={20} style={{ color: content.accentColor }} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoAbout({ content }: { content: DemoContent }) {
  return (
    <section id="about" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: content.accentColor }}>About Us</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{content.aboutTitle}</h2>
            <p className="text-gray-600 leading-relaxed mb-6">{content.aboutText}</p>
            <div className="grid grid-cols-2 gap-4">
              {content.stats.slice(0, 4).map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: content.accentColor }} />
                  <span className="text-sm text-gray-700"><strong>{stat.value}</strong> {stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ backgroundColor: content.primaryColor }}>
            <div className="aspect-[4/3] flex items-center justify-center">
              <div className="text-center px-8">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white" style={{ backgroundColor: content.accentColor }}>
                  {content.businessName[0]}
                </div>
                <p className="text-white text-xl font-bold">{content.businessName}</p>
                <p className="text-white/60 text-sm mt-2">{content.tagline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DemoGallery({ content }: { content: DemoContent }) {
  const colors = ["#f3f4f6", "#fef3c7", "#dbeafe", "#fce7f3", "#d1fae5", "#ede9fe"];
  return (
    <section id="portfolio" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: content.accentColor }}>Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{content.galleryTitle}</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.gallery.map((item, i) => (
            <div key={item.title} className="group rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer border border-gray-100">
              <div className="aspect-[3/2] flex items-center justify-center" style={{ backgroundColor: colors[i % colors.length] }}>
                <div className="text-center px-4">
                  <p className="font-bold text-gray-800">{item.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                </div>
              </div>
              <div className="bg-white p-4">
                <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: `${content.accentColor}15`, color: content.accentColor }}>
                  {item.category}
                </span>
                <p className="font-semibold text-gray-900 mt-2">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoTestimonials({ content }: { content: DemoContent }) {
  return (
    <section id="reviews" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: content.accentColor }}>Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Clients Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {content.testimonials.map((t) => (
            <div key={t.name} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: content.accentColor }}>
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-500 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoPricing({ content }: { content: DemoContent }) {
  if (!content.pricing) return null;
  return (
    <section id="pricing" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: content.accentColor }}>Pricing</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Simple, Transparent Plans</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {content.pricing.map((tier) => (
            <div key={tier.name} className={`rounded-xl p-6 border-2 ${tier.highlighted ? "shadow-xl scale-105" : "shadow-sm"}`} style={{ borderColor: tier.highlighted ? content.accentColor : "#e5e7eb", backgroundColor: "white" }}>
              {tier.highlighted && (
                <span className="text-xs font-bold text-white px-3 py-1 rounded-full mb-4 inline-block" style={{ backgroundColor: content.accentColor }}>Most Popular</span>
              )}
              <h3 className="text-lg font-bold text-gray-900">{tier.name}</h3>
              <div className="mt-2 mb-6">
                <span className="text-4xl font-bold" style={{ color: content.primaryColor }}>{tier.price}</span>
                <span className="text-gray-500 text-sm">{tier.period}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                    <Check size={16} style={{ color: content.accentColor }} /> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90 ${tier.highlighted ? "text-white" : "text-gray-700 border border-gray-300"}`} style={tier.highlighted ? { backgroundColor: content.accentColor } : {}}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoCTA({ content }: { content: DemoContent }) {
  return (
    <section id="contact" style={{ backgroundColor: content.primaryColor }} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full blur-3xl" style={{ backgroundColor: content.accentColor }} />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{content.ctaTitle}</h2>
        <p className="text-white/70 text-lg mb-8">{content.ctaText}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button style={{ backgroundColor: content.accentColor }} className="text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
            Get Started <ArrowRight size={18} />
          </button>
          <button className="text-white border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2">
            <Phone size={16} /> Call Us
          </button>
        </div>
      </div>
    </section>
  );
}

function DemoFooter({ content }: { content: DemoContent }) {
  return (
    <footer style={{ backgroundColor: content.primaryColor }} className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: content.accentColor }}>
                {content.businessName[0]}
              </div>
              <span className="text-white font-bold text-lg">{content.businessName}</span>
            </div>
            <p className="text-white/50 text-sm max-w-sm">{content.footerText}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              {content.nav.slice(0, 4).map((item) => (
                <a key={item.label} href={item.href} className="block text-white/50 hover:text-white text-sm transition-colors">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-3 text-white/50 text-sm">
              <div className="flex items-center gap-2"><Mail size={14} /> hello@{content.businessName.toLowerCase().replace(/\s/g, "")}.com</div>
              <div className="flex items-center gap-2"><Phone size={14} /> (555) 123-4567</div>
              <div className="flex items-center gap-2"><MapPin size={14} /> 123 Main Street</div>
              <div className="flex items-center gap-2"><Clock size={14} /> Mon-Fri 9am-6pm</div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/30 text-xs">
          &copy; 2025 {content.businessName}. All rights reserved. | Template by OneSquad
        </div>
      </div>
    </footer>
  );
}

export default function TemplateDemoPage() {
  const params = useParams();
  const slug = params.slug as string;

  const template = templates.find((t) => t.id === slug);
  const content = demoContents[slug];

  if (!template || !content) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Back to OneSquad banner */}
      <div className="bg-gray-900 text-white text-sm py-2 px-4 flex items-center justify-between sticky top-0 z-[60]">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-accent">OneSquad</span>
          <span className="text-white/60">|</span>
          <span className="text-white/60">Template Preview: {template.name}</span>
        </div>
        <Link href={`/templates/${slug}`} className="flex items-center gap-1 text-white/80 hover:text-white transition-colors">
          <ArrowLeft size={14} /> Back to Details
        </Link>
      </div>

      {/* Demo website */}
      <DemoNav content={content} />
      <DemoHero content={content} />
      <DemoStats content={content} />
      <DemoFeatures content={content} />
      <DemoAbout content={content} />
      <DemoGallery content={content} />
      <DemoTestimonials content={content} />
      <DemoPricing content={content} />
      <DemoCTA content={content} />
      <DemoFooter content={content} />
    </div>
  );
}

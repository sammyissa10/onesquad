"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  Star,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import { Header, Footer } from "@/components/layout";
import { Container, Section } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { notFound } from "next/navigation";
import { templates, categoryLabels } from "@/lib/templateData";
import { TemplatePreview, TemplatePreviewThumbnail } from "@/components/ui/TemplatePreview";

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
        <Section background="gradient">
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
                  {categoryLabels[template.category] || template.category}
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
              </div>

              {/* Preview */}
              <Link href={`/templates/${slug}/demo`}>
                <TemplatePreview
                  templateId={slug}
                  className="w-full cursor-pointer"
                />
              </Link>
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
                    See It In Action
                  </h2>
                  <Link href={`/templates/${slug}/demo`}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="rounded-xl overflow-hidden shadow-lg cursor-pointer border border-border"
                    >
                      <TemplatePreview templateId={slug} className="w-full" />
                      <div className="bg-white p-4 text-center">
                        <span className="text-accent font-semibold text-sm flex items-center justify-center gap-2">
                          <ExternalLink size={14} /> View Full Live Demo
                        </span>
                      </div>
                    </motion.div>
                  </Link>
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
                    <Link href={`/templates/${slug}/demo`} className="block">
                      <Button
                        variant="outline"
                        className="w-full"
                        size="lg"
                        rightIcon={<ExternalLink size={16} />}
                      >
                        Live Preview
                      </Button>
                    </Link>
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
                      <TemplatePreviewThumbnail
                        templateId={related.id}
                        className="aspect-[3/2]"
                      />
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

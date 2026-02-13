"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { templates } from "@/lib/templateData";
import { Button } from "@/components/ui/Button";

export default function TemplateDemoPage() {
  const params = useParams();
  const slug = params.slug as string;

  const template = templates.find((t) => t.id === slug);

  if (!template) {
    notFound();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary to-highlight relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl bg-accent" />
        <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full blur-3xl bg-secondary" />
      </div>

      <div className="text-center p-8 relative z-10 max-w-lg mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-6">
          <ExternalLink size={28} className="text-accent" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-3">
          {template.name}
        </h1>
        <p className="text-white/70 mb-8 text-lg">
          View the full live demo of this template in a new tab.
        </p>
        <div className="flex flex-col gap-4 items-center">
          <a
            href={template.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <Button
              variant="accent"
              size="lg"
              rightIcon={<ExternalLink size={18} />}
            >
              Open Live Demo
            </Button>
          </a>
          <Link
            href={`/templates/${slug}`}
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={14} /> Back to Template Details
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Container } from "./Container";
import { siteConfig } from "@/lib/constants";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        ...(item.href ? { item: `${siteConfig.url}${item.href}` } : {}),
      })),
    ],
  };

  return (
    <div className="bg-muted border-b border-border pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 py-3 text-sm"
        >
          <Link
            href="/"
            className="text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
          >
            <Home size={14} />
            Home
          </Link>
          {items.map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              <ChevronRight size={14} className="text-muted-foreground/50" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">
                  {item.label}
                </span>
              )}
            </span>
          ))}
        </nav>
      </Container>
    </div>
  );
}
